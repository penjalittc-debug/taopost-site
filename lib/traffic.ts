// Собирает информацию об источнике перехода для передачи в лид.
// Читаем UTM/click-id из URL + document.referrer. Yandex.Metrika отдельно
// пишет свой visit-id (первый параметр функции yaCounter... hit), но нам для
// email-уведомления достаточно UTM — этого хватает, чтобы менеджер понял,
// с какого канала пришёл клиент.

export type Traffic = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  yclid?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing?: string;
};

const UTM_KEYS: ReadonlyArray<[keyof Traffic, string]> = [
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmContent', 'utm_content'],
  ['utmTerm', 'utm_term'],
  ['yclid', 'yclid'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
];

export function collectTraffic(): Traffic | undefined {
  if (typeof window === 'undefined') return undefined;
  const t: Traffic = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const [key, param] of UTM_KEYS) {
      const v = params.get(param);
      if (v) t[key] = v.slice(0, 120);
    }
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.host)) {
      t.referrer = ref.slice(0, 200);
    }
    t.landing = `${window.location.pathname}${window.location.search}`.slice(0, 200);
  } catch {
    /* игнорируем — traffic необязательный */
  }
  return Object.keys(t).length ? t : undefined;
}
