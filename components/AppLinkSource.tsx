'use client';

import { useEffect } from 'react';

/**
 * Пробрасывает источник посетителя с сайта в приложение.
 *
 * Зачем: сайт — не канал привлечения, а пересадочная станция. Человек пришёл
 * на taopost.ru с Авито, из поиска или по ссылке в Telegram-канале, а оттуда
 * уходит регистрироваться в app.taopost.ru. Без проброса в приложении все
 * такие регистрации сольются в один «сайт», и понять, за какой канал мы
 * заплатили, будет нельзя.
 *
 * Работает так: смотрим, с какой меткой человек пришёл на сайт (utm_source
 * или ?src), запоминаем её на 30 дней и подставляем во все ссылки на
 * приложение. Если метки нет — остаётся `src=site`, то есть «через сайт,
 * канал неизвестен»; верх воронки в этом случае смотрим в Метрике.
 *
 * Ссылки правим уже после отрисовки, а не в разметке: их шесть штук в разных
 * компонентах, и держать источник в каждом — лишний повод забыть про один.
 */

const KEY = 'tp_site_src';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Stored = { s: string; c?: string; t: number };

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.s || !parsed?.t) return null;
    if (Date.now() - parsed.t > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function AppLinkSource() {
  useEffect(() => {
    let stored = readStored();

    try {
      const params = new URLSearchParams(window.location.search);
      const incoming = params.get('src') || params.get('utm_source');
      // First-touch: первую метку не перезаписываем — привёл человека тот
      // канал, по которому он пришёл впервые.
      if (incoming && !stored) {
        stored = { s: incoming.slice(0, 50), t: Date.now() };
        const campaign = params.get('utm_campaign');
        if (campaign) stored.c = campaign.slice(0, 100);
        localStorage.setItem(KEY, JSON.stringify(stored));
      }
    } catch {
      // Приватный режим или отключённое хранилище — просто оставим src=site.
    }

    if (!stored) return;

    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="app.taopost.ru"]').forEach((a) => {
        try {
          const url = new URL(a.href);
          if (url.searchParams.get('src') && url.searchParams.get('src') !== 'site') return;
          url.searchParams.set('src', stored!.s);
          if (stored!.c) url.searchParams.set('utm_campaign', stored!.c);
          a.href = url.toString();
        } catch {
          // Ссылку, которую не удалось разобрать, оставляем как есть.
        }
      });
    };

    apply();
    // Часть ссылок появляется позже: калькулятор показывает кнопку после
    // расчёта, меню открывается по клику.
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
