// ── Доставка лида менеджеру ────────────────────────────────────────────────
// Каналов четыре, они дублируют друг друга, а не заменяют:
//   1) SMTP — ОСНОВНОЙ (выбор владельца 18.09.2026: «давай на почту пока без
//      телеграмма»). Работает на тех же кредах Selectel, что и почта самого
//      приложения TaoPost, — новый сервис заводить не нужно.
//   2) Telegram — если однажды зададут TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
//   3) Email через Resend — если задан RESEND_API_KEY.
//   4) Файл на диске — последний рубеж.
//
// ПОЧЕМУ ТАК. 18.09.2026 проверка прода показала, что RESEND_API_KEY не задан:
// /api/calculator отвечал 500 «Email service not configured», то есть формы на
// /kontakty и /business молча не работали, а человек видел «не удалось
// отправить». Единственный канал без резерва — это гарантированная потеря
// лидов. Теперь заявка считается принятой, если сработал ХОТЯ БЫ ОДИН канал,
// а если не сработал ни один — она всё равно ложится в файл, и клиенту не
// показывается ошибка (иначе он уйдёт, а контакт у нас уже есть).

import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import nodemailer from 'nodemailer';

export type LeadDelivery = {
  ok: boolean;
  channels: string[]; // куда реально доставлено
  failed: string[];   // что не сработало
};

const LEAD_LOG = process.env.LEAD_LOG_PATH || join(process.cwd(), 'leads.log');

/**
 * Отправка письма через SMTP — основной канал.
 * Переменные те же, что у приложения TaoPost (src/lib/email.ts): Selectel Mail,
 * порт 1127 с TLS. Яндекс-SMTP у Selectel заблокирован, поэтому порт нестандартный.
 */
async function sendSmtp(subject: string, text: string, html: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  // 1127 — TLS-порт Selectel Mail, его тоже считаем secure.
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465 || port === 1127;

  const to = process.env.LEAD_EMAIL_TO || process.env.RESEND_TO || 'support@taopost.ru';

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      // Лид важнее ожидания: не висим на неотвечающем сервере дольше 10 секунд.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });
    await transport.sendMail({
      from: process.env.SMTP_FROM || user,
      to,
      replyTo: 'support@taopost.ru',
      subject,
      text,
      html,
    });
    return true;
  } catch (e) {
    console.error('[lead] smtp error:', e);
    return false;
  }
}

/** Отправка в Telegram. Возвращает true только при подтверждении от API. */
async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      // лид важнее скорости ответа, но вечно ждать тоже нельзя
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('[lead] telegram HTTP', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (e) {
    console.error('[lead] telegram error:', e);
    return false;
  }
}

/** Последний рубеж: дописать заявку в файл, чтобы её можно было забрать руками. */
async function saveToFile(record: string): Promise<boolean> {
  try {
    await mkdir(dirname(LEAD_LOG), { recursive: true });
    await appendFile(LEAD_LOG, record + '\n', 'utf8');
    return true;
  } catch (e) {
    console.error('[lead] file fallback error:', e);
    return false;
  }
}

/**
 * Доставляет лид всеми доступными каналами.
 * @param sendEmail — отправка через Resend; используется, только если задан ключ.
 */
export async function deliverLead(opts: {
  subject: string;
  telegramText: string;
  plainText: string;
  html: string;
  sendEmail?: () => Promise<boolean>;
}): Promise<LeadDelivery> {
  const channels: string[] = [];
  const failed: string[] = [];

  // Все каналы идут параллельно — один медленный не задерживает остальные.
  const [smtp, tg, mail] = await Promise.all([
    sendSmtp(opts.subject, opts.plainText, opts.html),
    sendTelegram(opts.telegramText),
    opts.sendEmail
      ? opts.sendEmail().catch((e) => {
          console.error('[lead] resend error:', e);
          return false;
        })
      : Promise.resolve(false),
  ]);

  if (smtp) channels.push('smtp'); else failed.push('smtp');
  if (tg) channels.push('telegram'); else failed.push('telegram');
  if (mail) channels.push('resend'); else failed.push('resend');

  if (channels.length === 0) {
    const saved = await saveToFile(
      JSON.stringify({ at: new Date().toISOString(), lead: opts.plainText }),
    );
    if (saved) channels.push('file');
  }

  return { ok: channels.length > 0, channels, failed };
}
