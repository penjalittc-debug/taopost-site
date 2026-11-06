import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { deliverLead, sendToApp, parseContactVia, type ContactVia } from '@/lib/leadNotify';

export const runtime = 'nodejs';

// ── Простой in-memory rate-limit по IP ──────────────────────────────────────
// Защита канала лидов от ботов/спама и выжигания квоты Resend.
// Достаточно для одного PM2-инстанса (fork). В cluster-режиме лимит действует
// per-worker — при масштабировании вынести в Redis/Upstash.
const RL_WINDOW_MS = 60_000; // окно
const RL_MAX = 5;            // запросов на IP за окно
const rlHits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

function rateLimited(req: NextRequest): boolean {
  const ip = clientIp(req);
  const now = Date.now();
  const recent = (rlHits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  recent.push(now);
  rlHits.set(ip, recent);
  // не даём Map расти бесконечно
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) {
      if (v.every((t) => now - t >= RL_WINDOW_MS)) rlHits.delete(k);
    }
  }
  return recent.length > RL_MAX;
}

// Валидный телефон: 10–15 цифр (E.164-совместимо), допускаем + и разделители.
function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

type Traffic = {
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

type Payload = {
  fromCity?: string;
  toCity?: string;
  transport?: 'auto' | 'air';
  weight?: string;
  volume?: string;
  phone?: string;
  website?: string;
  traffic?: Traffic;
  // Где клиент хочет получить ответ (LeadForm с 10.10.2026, B2BForm с 05.11.2026):
  // telegram | whatsapp | max. «call» от старых страниц игнорируем. messenger — ник в Telegram или номер в
  // WhatsApp/Max; tg — старое имя поля для ника (страницы, открытые до выкладки).
  contactVia?: string;
  messenger?: string;
  tg?: string;
  page?: string; // путь страницы, с которой отправлена заявка
  // ExitIntent (с 05.11.2026 — отдельная ветка, раньше ник в Telegram отсекался как «неверный телефон»)
  exit?: boolean;
  reason?: string;
  otherText?: string;
  // B2B-поля
  b2b?: boolean;
  company?: string;
  contact?: string;
  category?: string;
  description?: string;
  // Опт/карго (форма на /kargo-dostavka, с 04.11.2026)
  opt?: boolean;
  budget?: string;
  needBuyout?: boolean;
  needDocs?: boolean;
};

// Куда LeadForm отправляет клиента писать после заявки — см. LEAD_TG_USERNAME там.
const LEAD_TG_USERNAME = 'taopostsupport';

/** Ник в Telegram из «@nick», «nick» или ссылки t.me/nick; иначе — как ввели (бывает, пишут номер). */
function normalizeTg(raw?: string): { nick: string | null; text: string } {
  const text = (raw || '').trim().slice(0, 64);
  const m = text.match(/^(?:https?:\/\/)?(?:t\.me\/|@)?([A-Za-z][A-Za-z0-9_]{3,31})$/);
  return { nick: m ? m[1] : null, text };
}

type ContactInfo = {
  via: ContactVia | null;
  viaLabel: string;      // «в Telegram», «в WhatsApp», «в Max»
  hint: string;          // подсказка менеджеру
  messenger: string;     // что уходит в приложение: @ник или номер
  rowLabel: string;      // подпись строки с ником/номером: Telegram / WhatsApp / Max
  rowText: string;       // ник/номер для текста письма
  rowHtml: string;       // то же, со ссылкой, для HTML
};

const VIA_LABEL: Record<ContactVia, string> = {
  telegram: 'в Telegram',
  whatsapp: 'в WhatsApp',
  max: 'в Max',
};

/** Способ связи и ник/номер в мессенджере — одинаково для всех веток. */
function contactInfo(rawVia: unknown, rawMessenger: string | undefined, phone: string): ContactInfo {
  const via = parseContactVia(rawVia);
  const base = { via, viaLabel: via ? VIA_LABEL[via] : '', hint: '', messenger: '', rowLabel: '', rowText: '', rowHtml: '' };
  const raw = (rawMessenger || '').trim().slice(0, 64);

  if (via === 'telegram' || (!via && raw)) {
    // В поле ника вписали тот же телефон (06.11.2026 — так почти в каждой
    // заявке): это не контакт в Telegram, менеджер видит телефон и так.
    const rawDigits = raw.replace(/\D/g, '');
    const samePhone = /^[+\d\s()-]+$/.test(raw) && rawDigits.length >= 7 &&
      rawDigits.slice(-10) === phone.replace(/\D/g, '').slice(-10);
    const tg = normalizeTg(samePhone ? '' : raw);
    const shown = tg.nick ? `@${tg.nick}` : tg.text;
    return {
      ...base,
      hint: via ? `клиенту предложено написать в @${LEAD_TG_USERNAME} — сначала проверьте личку, звонить не нужно` : '',
      messenger: shown,
      rowLabel: shown ? 'Telegram' : '',
      rowText: shown,
      rowHtml: tg.nick
        ? `<a href="https://t.me/${esc(tg.nick)}" style="color:#0088cc;text-decoration:none">@${esc(tg.nick)}</a>`
        : esc(shown),
    };
  }
  if (via === 'whatsapp' || via === 'max') {
    const name = via === 'whatsapp' ? 'WhatsApp' : 'Max';
    // Номер в мессенджере не указали — значит, тот же, что телефон.
    const number = raw || phone;
    const digits = number.replace(/\D/g, '');
    return {
      ...base,
      hint: `клиенту обещали написать в ${name} в рабочее время`,
      messenger: number,
      rowLabel: name,
      rowText: raw ? number : `${number} (тот же, что телефон)`,
      rowHtml: via === 'whatsapp' && digits.length >= 10
        ? `<a href="https://wa.me/${digits}" style="color:#128C7E;text-decoration:none">${esc(number)}</a>${raw ? '' : ' <span style="font-weight:400;color:#6b7280;font-size:13px">(тот же, что телефон)</span>'}`
        : `${esc(number)}${raw ? '' : ' <span style="font-weight:400;color:#6b7280;font-size:13px">(тот же, что телефон)</span>'}`,
    };
  }
  return base;
}

const ROW_LABEL_TD = 'padding:14px 26px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;vertical-align:top';
const ROW_VALUE_TD = 'padding:14px 26px;border-top:1px solid #f3f4f6';

function contactText(ci: ContactInfo): Array<string | null> {
  return [
    ci.viaLabel ? `Ответ: ${ci.viaLabel}${ci.hint ? ` — ${ci.hint}` : ''}` : null,
    ci.rowLabel ? `${ci.rowLabel}: ${ci.rowText}` : null,
  ];
}

function contactHtml(ci: ContactInfo): string {
  return [
    ci.viaLabel ? `<tr><td style="${ROW_LABEL_TD}">Ответ</td>
            <td style="${ROW_VALUE_TD};font-weight:600">${ci.viaLabel}${ci.hint ? `<div style="font-weight:400;font-size:13px;color:#6b7280;margin-top:4px">${esc(ci.hint)}</div>` : ''}</td></tr>` : '',
    ci.rowLabel ? `<tr><td style="${ROW_LABEL_TD}">${ci.rowLabel}</td>
            <td style="${ROW_VALUE_TD};font-weight:700;font-size:16px">${ci.rowHtml}</td></tr>` : '',
  ].join('\n');
}

function contactTg(ci: ContactInfo): Array<string | null> {
  return [
    ci.viaLabel ? `<b>Ответ:</b> ${ci.viaLabel}${ci.hint ? ` — <i>${esc(ci.hint)}</i>` : ''}` : null,
    ci.rowLabel ? `<b>${ci.rowLabel}:</b> ${esc(ci.rowText)}` : null,
  ];
}

function cutStr(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const TRAFFIC_LABELS: Array<[keyof Traffic, string]> = [
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmContent', 'utm_content'],
  ['utmTerm', 'utm_term'],
  ['yclid', 'yclid'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
  ['referrer', 'referrer'],
  ['landing', 'landing'],
];

function formatTrafficText(t?: Traffic): string {
  if (!t) return '';
  const lines = TRAFFIC_LABELS
    .map(([k, label]) => (t[k] ? `${label}: ${t[k]}` : null))
    .filter(Boolean);
  if (!lines.length) return '';
  return ['', '── Источник ──', ...lines].join('\n');
}

function formatTrafficHtml(t?: Traffic): string {
  if (!t) return '';
  const rows = TRAFFIC_LABELS
    .map(([k, label]) => t[k]
      ? `<tr><td style="padding:8px 26px;color:#9CA3AF;font-size:11px;text-transform:uppercase;letter-spacing:0.4px">${esc(label)}</td>
             <td style="padding:8px 26px;font-size:13px;color:#374151">${esc(String(t[k]))}</td></tr>`
      : null)
    .filter(Boolean);
  if (!rows.length) return '';
  return `
    <tr><td colspan="2" style="padding:14px 26px 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;border-top:1px solid #f3f4f6">Источник</td></tr>
    ${rows.join('\n')}`;
}

export async function POST(req: NextRequest) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(req)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (data.b2b) {
    return handleB2B(data, data.traffic);
  }

  if (data.exit) {
    return handleExit(data, data.traffic);
  }

  const fromCity = (data.fromCity || '').trim().slice(0, 80) || 'Китай (маркетплейсы)';
  const toCity = (data.toCity || '').trim().slice(0, 80);
  const transport = data.transport === 'air' ? 'air' : 'auto';
  const weight = (data.weight || '').trim().slice(0, 20) || 'не указан';
  const volume = (data.volume || '').trim().slice(0, 20);
  const phone = (data.phone || '').trim().slice(0, 40);
  // Старые формы поле не шлют — тогда строку «Ответ» не показываем.
  const ci = contactInfo(data.contactVia, data.messenger ?? data.tg, phone);
  const page = cutStr(data.page, 300);

  // Обязательны только город получения и телефон — минимум трения для лида.
  if (!toCity || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Отсекаем мусорные лиды с невалидным телефоном.
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
  }

  // 1) Главный канал — админка приложения. Приняла — письмо не шлём.
  const appNumber = await sendToApp({
    kind: 'calc',
    phone,
    contactVia: ci.via,
    messenger: ci.messenger,
    toCity,
    transport,
    weight: data.weight ? weight : undefined,
    volume,
    details: data.fromCity ? { 'Откуда': fromCity } : undefined,
    traffic: data.traffic,
    page,
  });
  if (appNumber !== null) {
    return NextResponse.json({ ok: true });
  }

  // 2) Резерв: почта / Telegram / файл — как было до приложения.
  const apiKey = process.env.RESEND_API_KEY;
  const transportLabel = transport === 'auto' ? 'Автодоставка' : 'Авиадоставка';
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const text = [
    'Новая заявка на расчёт доставки',
    '',
    `Откуда: ${fromCity} (Китай)`,
    `Куда: ${toCity} (Россия)`,
    `Транспорт: ${transportLabel}`,
    `Вес: ${weight} кг`,
    volume ? `Объём: ${volume} м³` : null,
    `Телефон: ${phone}`,
    ...contactText(ci),
    '',
    `Получено: ${submittedAt} МСК · taopost.ru${page}`,
    formatTrafficText(data.traffic),
  ].filter(Boolean).join('\n');

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7f9;padding:24px;margin:0;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#005C43;padding:22px 26px;color:#fff">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85">TaoPost · Калькулятор</div>
      <div style="font-size:22px;font-weight: 700;margin-top:6px">Новая заявка на расчёт</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Маршрут</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(fromCity)} (Китай) → ${esc(toCity)} (Россия)</td></tr>
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Транспорт</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${transportLabel}</td></tr>
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Вес</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(weight)} кг</td></tr>
        ${volume ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Объём</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(volume)} м³</td></tr>` : ''}
        <tr><td style="padding:14px 26px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Телефон</td>
            <td style="padding:14px 26px;font-weight:700;font-size:16px;color:#005C43"><a href="tel:${esc(phone)}" style="color:#005C43;text-decoration:none">${esc(phone)}</a></td></tr>
        ${contactHtml(ci)}
        ${formatTrafficHtml(data.traffic)}
      </tbody>
    </table>
    <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px">Получено: ${esc(submittedAt)} МСК · taopost.ru${esc(page)}</div>
  </div>
</body></html>`;

  const from = process.env.RESEND_FROM || 'TaoPost <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'support@taopost.ru';

  const tgText = [
    '🚚 <b>Новая заявка с сайта</b>',
    '',
    `<b>Куда:</b> ${esc(toCity)}`,
    `<b>Транспорт:</b> ${transportLabel}`,
    `<b>Вес:</b> ${esc(weight)} кг`,
    volume ? `<b>Объём:</b> ${esc(volume)} м³` : null,
    `<b>Телефон:</b> <a href="tel:${esc(phone)}">${esc(phone)}</a>`,
    ...contactTg(ci),
    '',
    `<i>${esc(submittedAt)} МСК · taopost.ru</i>`,
    formatTrafficText(data.traffic) ? `<code>${esc(formatTrafficText(data.traffic))}</code>` : null,
  ].filter(Boolean).join('\n');

  const subjectVia = ci.via ? ` · ответ ${ci.viaLabel}` : '';

  const result = await deliverLead({
    subject: `Заявка: ${fromCity} → ${toCity}, ${weight} кг, ${transportLabel}${subjectVia}`,
    telegramText: tgText,
    plainText: text,
    html,
    sendEmail: apiKey
      ? async () => {
          const { error } = await new Resend(apiKey).emails.send({
            from,
            to,
            replyTo: 'support@taopost.ru',
            subject: `Заявка: ${fromCity} → ${toCity}, ${weight} кг, ${transportLabel}${subjectVia}`,
            text,
            html,
          });
          if (error) {
            console.error('[calculator] Resend error:', error);
            return false;
          }
          return true;
        }
      : undefined,
  });

  if (!result.ok) {
    // Ни один канал не принял и файл не записался — только тогда честно говорим клиенту об ошибке.
    console.error('[calculator] lead delivery failed entirely', result.failed);
    return NextResponse.json({ error: 'Failed to deliver lead' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function handleB2B(data: Payload, traffic?: Traffic) {
  const company = (data.company || '').trim().slice(0, 120);
  const contact = (data.contact || '').trim().slice(0, 80);
  const phone = (data.phone || '').trim().slice(0, 60);
  const volume = (data.volume || '').trim().slice(0, 60);
  const category = (data.category || '').trim().slice(0, 80);
  const description = (data.description || '').trim().slice(0, 2000);
  const isOpt = data.opt === true;
  const budget = (data.budget || '').trim().slice(0, 60);
  const needs = isOpt
    ? [data.needBuyout ? 'выкуп / поиск поставщика' : null, data.needDocs ? 'документы' : null]
        .filter(Boolean).join(', ')
    : '';
  // Для опта компания не обязательна: пишут и физлица-селлеры. Нужен хоть кто-то по имени.
  const who = company || contact;
  const tag = isOpt ? 'ОПТ' : 'B2B';
  const pagePath = cutStr(data.page, 300) || (isOpt ? '/kargo-dostavka' : '/business');
  const page = `taopost.ru${pagePath}`;
  const ci = contactInfo(data.contactVia, data.messenger, phone);

  if (!who || !phone || !volume) {
    return NextResponse.json({ error: 'Missing required B2B fields' }, { status: 400 });
  }

  // 1) Главный канал — админка приложения. Приняла — письмо не шлём.
  const appNumber = await sendToApp({
    kind: isOpt ? 'opt' : 'b2b',
    phone,
    contactVia: ci.via,
    messenger: ci.messenger,
    name: contact,
    company,
    volume,
    details: {
      'Категория': category,
      'Сумма закупки': budget,
      'Нужно': needs,
      [isOpt ? 'Комментарий' : 'Задача']: description,
    },
    traffic,
    page: pagePath,
  });
  if (appNumber !== null) {
    return NextResponse.json({ ok: true });
  }

  // 2) Резерв: почта / Telegram / файл.

  const apiKey = process.env.RESEND_API_KEY;
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const text = [
    isOpt ? 'Новая заявка ОПТ (карго)' : 'Новая B2B-заявка на оптовый расчёт',
    '',
    company ? `Компания: ${company}` : null,
    contact ? `Контактное лицо: ${contact}` : null,
    `Телефон: ${phone}`,
    ...contactText(ci),
    `Объём: ${volume}`,
    category ? `Категория: ${category}` : null,
    budget ? `Сумма закупки: ${budget}` : null,
    needs ? `Нужно: ${needs}` : null,
    description ? `Описание: ${description}` : null,
    '',
    `Получено: ${submittedAt} МСК · ${page}`,
    formatTrafficText(traffic),
  ].filter(Boolean).join('\n');

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7f9;padding:24px;margin:0;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#0A0F1C;padding:22px 26px;color:#fff">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85">TaoPost · ${tag}</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px">${isOpt ? 'Новая заявка ОПТ (карго)' : 'Новая оптовая заявка'}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        ${company ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Компания</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(company)}</td></tr>` : ''}
        ${contact ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Контакт</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(contact)}</td></tr>` : ''}
        <tr><td style="padding:14px 26px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">${ci.via ? 'Телефон' : 'Телефон / TG'}</td>
            <td style="padding:14px 26px;font-weight:700;color:#005C43">${esc(phone)}</td></tr>
        ${contactHtml(ci)}
        <tr><td style="padding:14px 26px;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Объём</td>
            <td style="padding:14px 26px;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(volume)}</td></tr>
        ${category ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Категория</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(category)}</td></tr>` : ''}
        ${budget ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Сумма закупки</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(budget)}</td></tr>` : ''}
        ${needs ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Нужно</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(needs)}</td></tr>` : ''}
        ${description ? `<tr><td style="padding:14px 26px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;vertical-align:top">Задача</td>
            <td style="padding:14px 26px;line-height:1.55;white-space:pre-wrap">${esc(description)}</td></tr>` : ''}
        ${formatTrafficHtml(traffic)}
      </tbody>
    </table>
    <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px">Получено: ${esc(submittedAt)} МСК · ${page}</div>
  </div>
</body></html>`;

  const from = process.env.RESEND_FROM || 'TaoPost <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'support@taopost.ru';

  const tgText = [
    isOpt ? '📦 <b>Новая заявка ОПТ (карго)</b>' : '🏭 <b>Новая B2B-заявка (опт)</b>',
    '',
    company ? `<b>Компания:</b> ${esc(company)}` : null,
    contact ? `<b>Контактное лицо:</b> ${esc(contact)}` : null,
    `<b>Телефон:</b> ${esc(phone)}`,
    ...contactTg(ci),
    `<b>Объём:</b> ${esc(volume)}`,
    category ? `<b>Категория:</b> ${esc(category)}` : null,
    budget ? `<b>Сумма закупки:</b> ${esc(budget)}` : null,
    needs ? `<b>Нужно:</b> ${esc(needs)}` : null,
    description ? `<b>Задача:</b> ${esc(description)}` : null,
    '',
    `<i>${esc(submittedAt)} МСК · ${page}</i>`,
  ].filter(Boolean).join('\n');

  const viaSubject = ci.via ? ` · ответ ${ci.viaLabel}` : '';
  const result = await deliverLead({
    subject: `${tag}: ${who} — ${volume}${category ? ', ' + category : ''}${budget ? ', ' + budget : ''}${viaSubject}`,
    telegramText: tgText,
    plainText: text,
    html,
    sendEmail: apiKey
      ? async () => {
          const { error } = await new Resend(apiKey).emails.send({
            from,
            to,
            replyTo: 'support@taopost.ru',
            subject: `${tag}: ${who} — ${volume}${category ? ', ' + category : ''}${budget ? ', ' + budget : ''}${viaSubject}`,
            text,
            html,
          });
          if (error) {
            console.error('[calculator/b2b] Resend error:', error);
            return false;
          }
          return true;
        }
      : undefined,
  });

  if (!result.ok) {
    console.error('[calculator/b2b] lead delivery failed entirely', result.failed);
    return NextResponse.json({ error: 'Failed to deliver lead' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

// ── ExitIntent: «Уходите? Подскажите, почему» ───────────────────────────────
// Поле одно — «Telegram или телефон». Похоже на номер — это телефон, иначе
// считаем ником в Telegram. Причина ухода уходит в details.
const EXIT_REASONS: Record<string, string> = {
  expensive: 'Дорого',
  unclear: 'Не понял, как это работает',
  no_trust: 'Не доверяю',
  just_browsing: 'Просто смотрю',
  other: 'Другое',
};

async function handleExit(data: Payload, traffic?: Traffic) {
  const raw = cutStr(data.contact, 80);
  const isPhone = /^[+\d\s().-]+$/.test(raw) && isValidPhone(raw);
  const phone = isPhone ? raw : '';
  const tg = isPhone ? null : normalizeTg(raw);
  const messenger = tg ? (tg.nick ? `@${tg.nick}` : tg.text) : '';

  // Ни номера, ни чего-то похожего на ник — это мусор.
  if (!isPhone && !(tg && (tg.nick || /[A-Za-z]/.test(raw)))) {
    return NextResponse.json({ error: 'Invalid contact' }, { status: 400 });
  }

  const reason = EXIT_REASONS[cutStr(data.reason, 20)] || '';
  const otherText = cutStr(data.otherText, 140);
  const pagePath = cutStr(data.page, 300);

  const appNumber = await sendToApp({
    kind: 'exit',
    phone: phone || undefined,
    contactVia: tg ? 'telegram' : null,
    messenger: messenger || undefined,
    details: { 'Причина ухода': reason, 'Комментарий': otherText },
    traffic,
    page: pagePath,
  });
  if (appNumber !== null) {
    return NextResponse.json({ ok: true });
  }

  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const contactLine = phone ? `Телефон: ${phone}` : `Telegram: ${messenger}`;
  const text = [
    'Уход с сайта — оставили контакт (гайд «Как заказать из Китая»)',
    '',
    contactLine,
    reason ? `Причина ухода: ${reason}` : null,
    otherText ? `Комментарий: ${otherText}` : null,
    '',
    `Получено: ${submittedAt} МСК · taopost.ru${pagePath}`,
    formatTrafficText(traffic),
  ].filter(Boolean).join('\n');

  const contactHtmlValue = phone
    ? `<a href="tel:${esc(phone)}" style="color:#005C43;text-decoration:none">${esc(phone)}</a>`
    : tg?.nick
      ? `<a href="https://t.me/${esc(tg.nick)}" style="color:#0088cc;text-decoration:none">@${esc(tg.nick)}</a>`
      : esc(messenger);

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7f9;padding:24px;margin:0;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#005C43;padding:22px 26px;color:#fff">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85">TaoPost · Уход с сайта</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px">Оставили контакт за гайдом</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        <tr><td style="padding:14px 26px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">${phone ? 'Телефон' : 'Telegram'}</td>
            <td style="padding:14px 26px;font-weight:700;font-size:16px">${contactHtmlValue}</td></tr>
        ${reason ? `<tr><td style="${ROW_LABEL_TD}">Причина</td><td style="${ROW_VALUE_TD};font-weight:600">${esc(reason)}</td></tr>` : ''}
        ${otherText ? `<tr><td style="${ROW_LABEL_TD}">Комментарий</td><td style="${ROW_VALUE_TD}">${esc(otherText)}</td></tr>` : ''}
        ${formatTrafficHtml(traffic)}
      </tbody>
    </table>
    <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px">Получено: ${esc(submittedAt)} МСК · taopost.ru${esc(pagePath)}</div>
  </div>
</body></html>`;

  const tgText = [
    '👋 <b>Уход с сайта — оставили контакт</b>',
    '',
    phone ? `<b>Телефон:</b> ${esc(phone)}` : `<b>Telegram:</b> ${esc(messenger)}`,
    reason ? `<b>Причина:</b> ${esc(reason)}` : null,
    otherText ? `<b>Комментарий:</b> ${esc(otherText)}` : null,
    '',
    `<i>${esc(submittedAt)} МСК · taopost.ru${esc(pagePath)}</i>`,
  ].filter(Boolean).join('\n');

  const result = await deliverLead({
    subject: `Уход с сайта: ${phone || messenger}${reason ? ' — ' + reason : ''}`,
    telegramText: tgText,
    plainText: text,
    html,
  });

  if (!result.ok) {
    console.error('[calculator/exit] lead delivery failed entirely', result.failed);
    return NextResponse.json({ error: 'Failed to deliver lead' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
