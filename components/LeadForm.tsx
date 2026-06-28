'use client';
import { useState } from 'react';
import { Send, CheckCircle2, Phone, MapPin, Truck, Plane } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';

type Transport = 'auto' | 'air';
type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function LeadForm() {
  const [toCity, setToCity] = useState('');
  const [phone, setPhone] = useState('');
  const [transport, setTransport] = useState<Transport>('auto');
  const [weight, setWeight] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — должно остаться пустым
  const [status, setStatus] = useState<Status>('idle');

  const canSend = toCity.trim().length > 1 && phone.trim().length > 4;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toCity, phone, transport, weight, website }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      ymReachGoal('lead_form_submit', { transport });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="zayavka" className="lf">
      <div className="lf__wrap">
        <div className="lf__copy">
          <span className="lf__eyebrow">
            <span className="lf__dot" />
            Заявка без Telegram
          </span>
          <h2 className="lf__title">
            Оставьте заявку — <span className="lf__accent">перезвоним за 5 минут</span>
          </h2>
          <p className="lf__lede">
            Не пользуетесь Telegram? Оставьте город и телефон — менеджер сам свяжется,
            рассчитает стоимость и поможет оформить первый заказ. Ежедневно с 9:00 до 22:00 МСК.
          </p>
          <ul className="lf__benefits">
            <li><CheckCircle2 size={18} strokeWidth={2.4} /> Без предоплаты и обязательств</li>
            <li><CheckCircle2 size={18} strokeWidth={2.4} /> Расчёт по вашему городу и весу</li>
            <li><CheckCircle2 size={18} strokeWidth={2.4} /> Поможем выбрать тариф — авто или авиа</li>
          </ul>
        </div>

        <div className="lf__card">
          {status === 'ok' ? (
            <div className="lf__success">
              <span className="lf__successIcon"><CheckCircle2 size={40} strokeWidth={2.2} /></span>
              <h3>Заявка принята!</h3>
              <p>Менеджер свяжется с вами в ближайшее время. Если удобнее — можно написать нам в&nbsp;Telegram прямо сейчас.</p>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                className="lf__tg"
                data-ym-goal="telegram_click"
                data-ym-params='{"place":"lead_form_success"}'
              >
                <Send size={16} strokeWidth={2.5} /> Написать в Telegram
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="lf__form" noValidate>
              <label className="lf__field">
                <span className="lf__label"><MapPin size={14} strokeWidth={2.4} /> Город получения</span>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="Например, Казань"
                  className="lf__input"
                  autoComplete="address-level2"
                />
              </label>

              <label className="lf__field">
                <span className="lf__label"><Phone size={14} strokeWidth={2.4} /> Телефон</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 ___ ___ __ __"
                  className="lf__input"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              <div className="lf__field">
                <span className="lf__label">Способ доставки</span>
                <div className="lf__transport">
                  <button
                    type="button"
                    onClick={() => setTransport('auto')}
                    className={`lf__transportBtn${transport === 'auto' ? ' lf__transportBtn--active' : ''}`}
                  >
                    <Truck size={16} strokeWidth={2.3} /> Авто
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransport('air')}
                    className={`lf__transportBtn${transport === 'air' ? ' lf__transportBtn--active' : ''}`}
                  >
                    <Plane size={16} strokeWidth={2.3} /> Авиа
                  </button>
                </div>
              </div>

              <label className="lf__field">
                <span className="lf__label">Примерный вес, кг <span className="lf__opt">— необязательно</span></span>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ''))}
                  placeholder="5"
                  className="lf__input"
                  inputMode="decimal"
                />
              </label>

              {/* honeypot для ботов — скрыт от людей */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="lf__hp"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={!canSend || status === 'sending'}
                className="lf__submit"
                data-ym-goal="lead_form_submit"
              >
                <Send size={18} strokeWidth={2.5} />
                {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
              </button>

              {status === 'error' && (
                <p className="lf__err">
                  Не удалось отправить. Напишите нам в{' '}
                  <a href="https://t.me/taopostsupport?start=site" target="_blank" rel="noopener noreferrer">Telegram</a>{' '}
                  или позвоните <a href="tel:+79772767778">+7 977 276 77 78</a>.
                </p>
              )}

              <p className="lf__note">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy">политикой конфиденциальности</a>.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .lf {
          padding: 96px 24px;
          background: linear-gradient(160deg, #f0fdf9 0%, #ffffff 55%, #fff5f5 100%);
        }
        .lf__wrap {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .lf__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 50px;
          background: rgba(255, 90, 71, 0.10); color: var(--coral, #FF5A47);
          font-size: 13px; font-weight: 700; margin-bottom: 18px;
          border: 1px solid rgba(255, 90, 71, 0.22);
        }
        .lf__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--coral, #FF5A47); }
        .lf__title {
          font-size: clamp(28px, 4vw, 44px); font-weight: 700;
          color: #0A0F1C; line-height: 1.15; letter-spacing: -1px; margin: 0 0 18px;
        }
        .lf__accent {
          background: #005C43; -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lf__lede { font-size: 17px; color: #4B5563; line-height: 1.7; margin: 0 0 24px; }
        .lf__benefits { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .lf__benefits li {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; color: #374151; font-weight: 500;
        }
        .lf__benefits li :global(svg) { color: #005C43; flex-shrink: 0; }

        .lf__card {
          background: #fff; border-radius: 24px; padding: 32px;
          border: 1px solid rgba(10,15,28,0.06);
          box-shadow: 0 24px 60px -24px rgba(10,15,28,0.18);
        }
        .lf__form { display: flex; flex-direction: column; gap: 18px; }
        .lf__field { display: flex; flex-direction: column; gap: 8px; }
        .lf__label {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 700; color: #374151;
        }
        .lf__label :global(svg) { color: #6B7280; }
        .lf__opt { font-weight: 500; color: #9CA3AF; }
        .lf__input {
          width: 100%; padding: 14px 16px; border-radius: 12px;
          border: 2px solid #E5E7EB; font-size: 15px; outline: none;
          transition: border-color .15s, box-shadow .15s; box-sizing: border-box;
          font-family: inherit; color: #0A0F1C; background: #fff;
        }
        .lf__input:focus { border-color: #005C43; box-shadow: 0 0 0 4px rgba(0,92,67,0.12); }

        .lf__transport { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .lf__transportBtn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 16px; border-radius: 12px; border: 2px solid #E5E7EB;
          background: #fff; cursor: pointer; font-family: inherit;
          font-size: 14px; font-weight: 700; color: #374151; transition: all .15s;
        }
        .lf__transportBtn--active { border-color: #005C43; background: rgba(0,92,67,0.06); color: #004232; }

        .lf__hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

        .lf__submit {
          margin-top: 4px; width: 100%;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 28px; border: none; border-radius: 14px;
          background: var(--coral, #FF5A47); color: #fff;
          font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit;
          box-shadow: 0 12px 30px -10px rgba(255,90,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
          transition: transform .15s, box-shadow .15s, opacity .15s;
        }
        .lf__submit:hover:not(:disabled) { transform: translateY(-2px); }
        .lf__submit:disabled { opacity: .55; cursor: not-allowed; }

        .lf__err {
          font-size: 13.5px; color: #b91c1c; line-height: 1.5; margin: 0;
        }
        .lf__err a { color: #005C43; font-weight: 600; }
        .lf__note { font-size: 12px; color: #9CA3AF; line-height: 1.5; margin: 0; text-align: center; }
        .lf__note a { color: #6B7280; }

        .lf__success { text-align: center; padding: 12px 4px; }
        .lf__successIcon {
          display: inline-flex; width: 72px; height: 72px; border-radius: 50%;
          align-items: center; justify-content: center; margin-bottom: 16px;
          background: rgba(0,92,67,0.10); color: #005C43;
        }
        .lf__success h3 { font-size: 22px; font-weight: 700; color: #0A0F1C; margin: 0 0 10px; }
        .lf__success p { font-size: 15px; color: #4B5563; line-height: 1.65; margin: 0 0 20px; }
        .lf__tg {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; border-radius: 12px; background: #0088cc; color: #fff;
          font-weight: 700; font-size: 15px; text-decoration: none;
        }

        @media (max-width: 880px) {
          .lf { padding: 64px 18px; }
          .lf__wrap { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
}
