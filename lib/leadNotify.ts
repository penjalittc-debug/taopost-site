// ── Доставка лида менеджеру ────────────────────────────────────────────────
// Каналов три, они дублируют друг друга, а не заменяют:
//   1) Telegram — основной. Мгновенно, без чужих квот, менеджер уже сидит там.
//   2) Email через Resend — резервный, для архива и пересылки.
//   3) Файл на диске — последний рубеж.
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

export type LeadDelivery = {
  ok: boolean;
  channels: string[]; // куда реально доставлено
  failed: string[];   // что не сработало
};

const LEAD_LOG = process.env.LEAD_LOG_PATH || join(process.cwd(), 'leads.log');

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
 * @param sendEmail — функция отправки письма; кидает или возвращает false при неудаче.
 */
export async function deliverLead(opts: {
  telegramText: string;
  plainText: string;
  sendEmail?: () => Promise<boolean>;
}): Promise<LeadDelivery> {
  const channels: string[] = [];
  const failed: string[] = [];

  // Telegram и почта идут параллельно — один медленный канал не задерживает другой.
  const [tg, mail] = await Promise.all([
    sendTelegram(opts.telegramText),
    opts.sendEmail
      ? opts.sendEmail().catch((e) => {
          console.error('[lead] email error:', e);
          return false;
        })
      : Promise.resolve(false),
  ]);

  if (tg) channels.push('telegram'); else failed.push('telegram');
  if (mail) channels.push('email'); else failed.push('email');

  if (channels.length === 0) {
    const saved = await saveToFile(
      JSON.stringify({ at: new Date().toISOString(), lead: opts.plainText }),
    );
    if (saved) channels.push('file');
  }

  return { ok: channels.length > 0, channels, failed };
}
