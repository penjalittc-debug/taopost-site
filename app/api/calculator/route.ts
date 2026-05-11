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

  const fromCity = (data.fromCity || '').trim().slice(0, 80);
  const toCity = (data.toCity || '').trim().slice(0, 80);
  const transport = data.transport === 'air' ? 'air' : 'auto';
  const weight = (data.weight || '').trim().slice(0, 20);
  const volume = (data.volume || '').trim().slice(0, 20);
  const phone = (data.phone || '').trim().slice(0, 40);

  if (!fromCity || !toCity || !weight || !phone) {
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
    <div style="background:linear-gradient(135deg,#1B9E7E,#FF6B47);padding:22px 26px;color:#fff">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85">TaoPost · Калькулятор</div>
      <div style="font-size:22px;font-weight:800;margin-top:6px">Новая заявка на расчёт</div>
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
            <td style="padding:14px 26px;font-weight:700;font-size:16px;color:#1B9E7E"><a href="tel:${esc(phone)}" style="color:#1B9E7E;text-decoration:none">${esc(phone)}</a></td></tr>
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
