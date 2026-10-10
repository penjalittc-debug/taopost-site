'use client';
import { useState } from 'react';
import { Send, CheckCircle2, Phone, MapPin, Truck, Plane, AtSign } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';
import { collectTraffic } from '@/lib/traffic';

type Transport = 'auto' | 'air';
type ContactVia = 'telegram' | 'call';
type Status = 'idle' | 'sending' | 'ok' | 'error';

// Куда ведёт кнопка после заявки — личка менеджера, к которой через
// Telegram Business подключена Лиза. Звонить каждому команда не успевает,
// а Лиза отвечает сразу и круглосуточно. Но Telegram не даёт Business-боту
// писать первым: он отвечает только тем, кто написал сам. Поэтому ник в форме
// — запасной вариант для менеджера, а главное — чтобы клиент написал первым.
const LEAD_TG_USERNAME = 'taopostsupport';

/** Сообщение, которое клиент отправит одной кнопкой: Лизе хватит его, чтобы сразу посчитать. */
function leadMessage(city: string, transport: Transport, weight: string): string {
  const parts = [`доставка в ${city.trim()}`, transport === 'air' ? 'авиа' : 'авто'];
  if (weight.trim()) parts.push(`примерно ${weight.trim()} кг`);
  return `Здравствуйте! Заявка с сайта taopost.ru: ${parts.join(', ')}. Подскажите, сколько будет стоить?`;
}

function tgLink(text: string): string {
  return `https://t.me/${LEAD_TG_USERNAME}?text=${encodeURIComponent(text)}`;
}

export default function LeadForm() {
  const [toCity, setToCity] = useState('');
  const [phone, setPhone] = useState('');
  const [transport, setTransport] = useState<Transport>('auto');
  const [weight, setWeight] = useState('');
  const [contactVia, setContactVia] = useState<ContactVia>('telegram');
  const [tg, setTg] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — должно остаться пустым
  const [consent, setConsent] = useState(false); // 152-ФЗ: явное согласие на обработку ПДн
  const [status, setStatus] = useState<Status>('idle');

  const canSend =
    toCity.trim().length > 1 &&
    phone.replace(/\D/g, '').length >= 10 &&
    consent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toCity, phone, transport, weight, website, contactVia,
          tg: contactVia === 'telegram' ? tg : '',
          traffic: collectTraffic(),
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      ymReachGoal('lead_form_submit', { transport, contactVia });
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
            Отвечаем в Telegram круглосуточно
          </span>
          <h2 className="lf__title">
            Оставьте заявку — <span className="lf__accent">пришлём расчёт в Telegram</span>
          </h2>
          <p className="lf__lede">
            Укажите город и телефон — посчитаем стоимость и поможем оформить первый заказ.
            Быстрее всего в Telegram: отвечаем за пару минут в любое время. Нет Telegram —
            перезвоним с 9:00 до 22:00 МСК.
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
              {contactVia === 'telegram' ? (
                <>
                  <h3>Заявка принята — остался один шаг</h3>
                  <p>
                    Откройте Telegram и отправьте сообщение — текст уже набран. Ответим
                    с&nbsp;расчётом за пару минут, в&nbsp;любое время суток.
                  </p>
                </>
              ) : (
                <>
                  <h3>Заявка принята!</h3>
                  <p>
                    Перезвоним с 9:00 до 22:00 МСК. Если удобнее — напишите в&nbsp;Telegram,
                    там ответим быстрее.
                  </p>
                </>
              )}
              <a
                href={tgLink(leadMessage(toCity, transport, weight))}
                target="_blank"
                rel="noopener noreferrer"
                className={`lf__tg${contactVia === 'telegram' ? ' lf__tg--main' : ''}`}
                data-ym-goal="telegram_click"
                data-ym-params='{"place":"lead_form_success"}'
              >
                <Send size={18} strokeWidth={2.5} />
                {contactVia === 'telegram' ? 'Получить расчёт в Telegram' : 'Написать в Telegram'}
              </a>
              {contactVia === 'telegram' && (
                <p className="lf__successNote">Нет Telegram? Ничего страшного — перезвоним с 9:00 до 22:00 МСК.</p>
              )}
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
                <span className="lf__label">Где удобнее получить ответ</span>
                <div className="lf__transport">
                  <button
                    type="button"
                    onClick={() => setContactVia('telegram')}
                    className={`lf__transportBtn${contactVia === 'telegram' ? ' lf__transportBtn--active' : ''}`}
                  >
                    <Send size={16} strokeWidth={2.3} /> Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactVia('call')}
                    className={`lf__transportBtn${contactVia === 'call' ? ' lf__transportBtn--active' : ''}`}
                  >
                    <Phone size={16} strokeWidth={2.3} /> Звонок
                  </button>
                </div>
              </div>

              {contactVia === 'telegram' && (
                <label className="lf__field">
                  <span className="lf__label">
                    <AtSign size={14} strokeWidth={2.4} /> Ник в Telegram <span className="lf__opt">— необязательно</span>
                  </span>
                  <input
                    type="text"
                    value={tg}
                    onChange={(e) => setTg(e.target.value.replace(/\s/g, '').slice(0, 64))}
                    placeholder="@username"
                    className="lf__input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </label>
              )}

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

              <label className="lf__consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  Даю согласие на обработку персональных данных согласно{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">политике конфиденциальности</a>
                  {' '}и принимаю условия оферт{' '}
                  <a href="/oferta-vykup" target="_blank" rel="noopener noreferrer">на выкуп</a> и{' '}
                  <a href="/oferta" target="_blank" rel="noopener noreferrer">на доставку</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={!canSend || status === 'sending'}
                className="lf__submit"
              >
                <Send size={18} strokeWidth={2.5} />
                {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
              </button>

              {status === 'error' && (
                <p className="lf__err">
                  Не удалось отправить. Напишите нам в{' '}
                  <a href={tgLink(leadMessage(toCity, transport, weight))} target="_blank" rel="noopener noreferrer">Telegram</a>{' '}
                  или позвоните <a href="tel:+79772767778">+7 977 276 77 78</a>.
                </p>
              )}
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
        .lf__opt { font-weight: 500; color: #6B7280; }
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

        .lf__consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
          color: #4B5563;
          line-height: 1.55;
          cursor: pointer;
        }
        .lf__consent input {
          margin-top: 3px;
          width: 16px;
          height: 16px;
          accent-color: #005C43;
          flex-shrink: 0;
          cursor: pointer;
        }
        .lf__consent a { color: #005C43; text-decoration: underline; font-weight: 600; }

        .lf__success { text-align: center; padding: 12px 4px; }
        .lf__successIcon {
          display: inline-flex; width: 72px; height: 72px; border-radius: 50%;
          align-items: center; justify-content: center; margin-bottom: 16px;
          background: rgba(0,92,67,0.10); color: #005C43;
        }
        .lf__success h3 { font-size: 22px; font-weight: 700; color: #0A0F1C; margin: 0 0 10px; }
        .lf__success p { font-size: 15px; color: #4B5563; line-height: 1.65; margin: 0 0 20px; }
        .lf__tg {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; border-radius: 12px; background: #0088cc; color: #fff;
          font-weight: 700; font-size: 15px; text-decoration: none;
        }
        .lf__tg--main {
          width: 100%; box-sizing: border-box; padding: 16px 14px; border-radius: 14px; font-size: 16px; white-space: nowrap;
          box-shadow: 0 12px 30px -10px rgba(0,136,204,0.55);
        }
        .lf__successNote { font-size: 13.5px !important; color: #6B7280 !important; margin: 14px 0 0 !important; }

        @media (max-width: 880px) {
          .lf { padding: 64px 18px; }
          .lf__wrap { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
}
