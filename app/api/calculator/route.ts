import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

type Payload = {
  fromCity?: string;
  toCity?: string;
  transport?: 'auto' | 'air';
  weight?: string;
  volume?: string;
  phone?: string;
  website?: string;
  // B2B-поля
  b2b?: boolean;
  company?: string;
  contact?: string;
  category?: string;
  description?: string;
};

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

  if (data.b2b) {
    return handleB2B(data);
  }

  const fromCity = (data.fromCity || '').trim().slice(0, 80) || 'Китай (маркетплейсы)';
  const toCity = (data.toCity || '').trim().slice(0, 80);
  const transport = data.transport === 'air' ? 'air' : 'auto';
  const weight = (data.weight || '').trim().slice(0, 20) || 'не указан';
  const volume = (data.volume || '').trim().slice(0, 20);
  const phone = (data.phone || '').trim().slice(0, 40);

  // Обязательны только город получения и телефон — минимум трения для лида.
  if (!toCity || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[calculator] RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
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
    '',
    `Получено: ${submittedAt} МСК`,
  ].filter(Boolean).join('\n');

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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
      </tbody>
    </table>
    <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px">Получено: ${esc(submittedAt)} МСК · taopost.ru</div>
  </div>
</body></html>`;

  const from = process.env.RESEND_FROM || 'TaoPost <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'info@taopost.ru';

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: 'info@taopost.ru',
    subject: `Заявка: ${fromCity} → ${toCity}, ${weight} кг, ${transportLabel}`,
    text,
    html,
  });

  if (error) {
    console.error('[calculator] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function handleB2B(data: Payload) {
  const company = (data.company || '').trim().slice(0, 120);
  const contact = (data.contact || '').trim().slice(0, 80);
  const phone = (data.phone || '').trim().slice(0, 60);
  const volume = (data.volume || '').trim().slice(0, 60);
  const category = (data.category || '').trim().slice(0, 80);
  const description = (data.description || '').trim().slice(0, 2000);

  if (!company || !phone || !volume) {
    return NextResponse.json({ error: 'Missing required B2B fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[calculator/b2b] RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const text = [
    'Новая B2B-заявка на оптовый расчёт',
    '',
    `Компания: ${company}`,
    contact ? `Контактное лицо: ${contact}` : null,
    `Контакт: ${phone}`,
    `Объём: ${volume}`,
    category ? `Категория: ${category}` : null,
    description ? `Описание: ${description}` : null,
    '',
    `Получено: ${submittedAt} МСК`,
  ].filter(Boolean).join('\n');

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7f9;padding:24px;margin:0;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#0A0F1C;padding:22px 26px;color:#fff">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85">TaoPost · B2B</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px">Новая оптовая заявка</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Компания</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(company)}</td></tr>
        ${contact ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Контакт</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(contact)}</td></tr>` : ''}
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Телефон / TG</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:700;color:#005C43">${esc(phone)}</td></tr>
        <tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Объём</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(volume)}</td></tr>
        ${category ? `<tr><td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Категория</td>
            <td style="padding:14px 26px;border-bottom:1px solid #f3f4f6;font-weight:600">${esc(category)}</td></tr>` : ''}
        ${description ? `<tr><td style="padding:14px 26px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;vertical-align:top">Задача</td>
            <td style="padding:14px 26px;line-height:1.55;white-space:pre-wrap">${esc(description)}</td></tr>` : ''}
      </tbody>
    </table>
    <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px">Получено: ${esc(submittedAt)} МСК · taopost.ru/business</div>
  </div>
</body></html>`;

  const from = process.env.RESEND_FROM || 'TaoPost <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'info@taopost.ru';

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: 'info@taopost.ru',
    subject: `B2B: ${company} — ${volume}${category ? ', ' + category : ''}`,
    text,
    html,
  });

  if (error) {
    console.error('[calculator/b2b] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
