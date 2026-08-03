# Кеш статики nginx для taopost.ru

## Проблема

`/public/*` файлы (`/logo.png`, `/warehouse/*.mp4`, `/certificate.jpg` и др.)
отдаются с `Cache-Control: public, max-age=0` — каждый визит тянет заново.

## Готовый nginx-фрагмент

Добавить в `server { … }` блок для taopost.ru:

```nginx
# ── Статика из /public (Next.js отдаёт как есть) ─────────────────
# Immutable-хеш здесь не гарантирован (файлы редко меняют имя),
# поэтому max-age 30 дней + must-revalidate — компромисс между
# скоростью повторных визитов и возможностью обновить логотип.
location ~* ^/(logo|certificate|dragon|og-image)\.(png|jpg|jpeg|webp|avif|svg)$ {
    add_header Cache-Control "public, max-age=2592000, must-revalidate" always;
    add_header Vary "Accept-Encoding" always;
    try_files $uri @nextjs;
}

# Каталоги с большими медиа — 30 дней, разрешаем range-запросы для видео
location ~* ^/(warehouse|products|blog|reviews|mp)/ {
    add_header Cache-Control "public, max-age=2592000, must-revalidate" always;
    try_files $uri @nextjs;
}

# Шрифты и SVG-иконки (иконки/файлы)
location ~* \.(woff2|woff|ttf|eot|otf)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header Access-Control-Allow-Origin "*" always;
    try_files $uri @nextjs;
}

# Fallback: Next.js
location @nextjs {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Ожидаемый эффект

- `/logo.png` (59 KB) — сейчас грузится на каждой странице; после — из кеша.
- `/warehouse/*.mp4` (0.5–1.3 MB) — грузится при попадании в вьюпорт;
  после первого визита клиент не тянет заново.
- Экономия трафика Selectel ~20–40 % на повторных визитах.

## Проверка после деплоя

```bash
curl -sI https://taopost.ru/logo.png | grep -i cache
# Ожидаем: cache-control: public, max-age=2592000, must-revalidate

curl -sI https://taopost.ru/warehouse/video-1.mp4 | grep -i cache
# Ожидаем то же
```

## Что уже кешируется корректно (не трогать)

- `/_next/static/*` → `public, max-age=31536000, immutable` ✓ (Next.js сам)
- `/_next/image?url=…` → `public, max-age=2592000, must-revalidate` ✓ (см. `next.config.ts:minimumCacheTTL`)
- `/api/*` → без кеша (правильно)
- HTML-страницы → `s-maxage=31536000` через SSR-кеш ✓
