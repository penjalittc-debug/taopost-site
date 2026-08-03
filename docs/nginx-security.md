# Nginx: CSP и rate-limit для taopost.ru

Оба фрагмента добавляются в `server { … }` блок для taopost.ru.
Проверять после каждой правки: `nginx -t && systemctl reload nginx`.

---

## 1. Content-Security-Policy

**Зачем.** У нас несколько `dangerouslySetInnerHTML` (JSON-LD, HTML статей блога). Пока контент только наш — риск теоретический, но с внешним источником (headless-CMS) без CSP XSS будет боевым.

**Что нужно разрешить:**

- `script-src`: собственный домен (`'self'`), inline (`'unsafe-inline'` — Next.js часто их использует), Яндекс.Метрика (`mc.yandex.ru`, `mc.yandex.com`, `yastatic.net`).
- `img-src`: свой домен, `data:` (иконки), Яндекс.Метрика pixel.
- `connect-src`: свой домен + Яндекс (Метрика делает XHR/beacons).
- `frame-src` / `frame-ancestors`: заблокировать вставку в чужой iframe.
- `form-action`: только `'self'` (у нас нет форм на внешние домены).

```nginx
# CSP: относительно строгий; при подключении GA4/Sentry — расширить script-src/connect-src
set $csp "default-src 'self'; \
script-src 'self' 'unsafe-inline' mc.yandex.ru mc.yandex.com yastatic.net; \
style-src 'self' 'unsafe-inline' fonts.googleapis.com; \
font-src 'self' data: fonts.gstatic.com; \
img-src 'self' data: blob: mc.yandex.ru mc.yandex.com yandex.ru avatars.mds.yandex.net; \
connect-src 'self' mc.yandex.ru mc.yandex.com yandex.ru; \
media-src 'self' blob:; \
frame-src 'self' mc.yandex.ru mc.yandex.com; \
frame-ancestors 'self'; \
form-action 'self'; \
base-uri 'self'; \
object-src 'none'; \
upgrade-insecure-requests";

add_header Content-Security-Policy $csp always;
```

**Как тестировать перед прод-релизом:**

1. Первый раз подать в режиме отчёта: `add_header Content-Security-Policy-Report-Only $csp always;`.
2. Открыть главную и 3-4 внутренних страницы (главная, `/tarify`, `/blog/[любая]`, `/kontakty`), проверить консоль браузера — если увидите блокированные ресурсы, добавить их в соответствующий src.
3. Пожить в Report-Only 1-2 дня, посмотреть жалобы, потом переключить на боевой заголовок.

---

## 2. Rate-limit на `/api/calculator`

**Проблема.** In-memory rate-limit в [`app/api/calculator/route.ts:10-33`](../app/api/calculator/route.ts#L10) работает per-worker. При PM2 в cluster-режиме реальный порог = `RL_MAX × workers` — защита слабая.

**Решение без Redis** — вынести на nginx `limit_req_zone` (быстро, без новых зависимостей).

```nginx
# В http { } блок (обычно /etc/nginx/nginx.conf) один раз для всего сервера:
limit_req_zone $binary_remote_addr zone=taopost_api:10m rate=6r/m;
# 10m ≈ 160 000 IP, rate 6r/m = 5-6 запросов в минуту с одного IP

# В server { } блок taopost.ru:
location = /api/calculator {
    limit_req zone=taopost_api burst=3 nodelay;
    limit_req_status 429;

    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

**Что делает:**
- `rate=6r/m` — 6 запросов в минуту с одного IP.
- `burst=3 nodelay` — принять до 3 запросов в короткий всплеск (не откладывая), дальше 429.
- In-memory rate-limit в коде остаётся как второй эшелон (защита от прямых обращений мимо nginx).

**Проверка после релоада:**

```bash
for i in 1 2 3 4 5 6 7 8 9 10; do
  curl -s -X POST -H "Content-Type: application/json" -d '{}' \
    https://taopost.ru/api/calculator -o /dev/null -w "$i: %{http_code}\n"
done
# Первые 3-4 → 400, дальше должны пойти 429.
```
