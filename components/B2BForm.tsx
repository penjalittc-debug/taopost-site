'use client';
import { useEffect, useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, Boxes, Tag, Wallet } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';
import { collectTraffic } from '@/lib/traffic';
import ContactViaPicker, { type ContactVia } from './ContactViaPicker';

type Status = 'idle' | 'sending' | 'ok' | 'error';

/** Как менеджер свяжется — для текста после отправки. */
const VIA_PHRASE: Record<ContactVia, string> = {
  telegram: 'напишет вам в\u00a0Telegram',
  whatsapp: 'напишет вам в\u00a0WhatsApp',
  max: 'напишет вам в\u00a0Max',
  call: 'перезвонит',
};

/** Событие калькулятора карго: подставляет расчёт в форму опта. */
export const OPT_CALC_EVENT = 'taopost:opt-calc';
export type OptCalcDetail = { volume: string; category: string; summary: string };

export const OPT_BUDGETS = [
  'до 50 000 ₽',
  '50 000 – 300 000 ₽',
  '300 000 – 1 000 000 ₽',
  'больше 1 000 000 ₽',
];

/**
 * variant="b2b" — закупки под ключ (/business), как было.
 * variant="opt" — карго оптом (/kargo-dostavka, с 04.11.2026): компания не
 * обязательна (часто пишут физлица-селлеры), плюс сумма закупки, нужен ли
 * выкуп и документы. Заявка помечается «ОПТ».
 */
export default function B2BForm({ variant = 'b2b' }: { variant?: 'b2b' | 'opt' }) {
  const isOpt = variant === 'opt';
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [contactVia, setContactVia] = useState<ContactVia>('telegram');
  const [messenger, setMessenger] = useState(''); // ник в Telegram или номер в WhatsApp/Max
  const [volume, setVolume] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [needBuyout, setNeedBuyout] = useState(false);
  const [needDocs, setNeedDocs] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [consent, setConsent] = useState(false); // 152-ФЗ: явное согласие на обработку ПДн
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!isOpt) return;
    const onCalc = (e: Event) => {
      const d = (e as CustomEvent<OptCalcDetail>).detail;
      if (!d) return;
      setVolume(d.volume);
      setCategory((c) => c || d.category);
      setDescription((t) => (t ? `${t}\n\n${d.summary}` : d.summary));
    };
    window.addEventListener(OPT_CALC_EVENT, onCalc);
    return () => window.removeEventListener(OPT_CALC_EVENT, onCalc);
  }, [isOpt]);

  const canSend =
    (isOpt ? contact.trim().length > 1 : company.trim().length > 1) &&
    phone.replace(/\D/g, '').length >= 10 &&
    volume.trim().length > 0 &&
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
          b2b: true,
          opt: isOpt,
          company,
          contact,
          phone,
          contactVia,
          messenger: contactVia === 'call' ? '' : messenger,
          volume,
          category,
          description,
          ...(isOpt ? { budget, needBuyout, needDocs } : {}),
          website,
          traffic: collectTraffic(),
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      if (isOpt) {
        ymReachGoal('opt_form_submit', { category: category || 'не указана', budget: budget || 'не указана', contactVia });
      } else {
        ymReachGoal('b2b_form_submit', { category: category || 'не указана', contactVia });
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="b2bf__card">
      {status === 'ok' ? (
        <div className="b2bf__success">
          <span className="b2bf__successIcon"><CheckCircle2 size={40} strokeWidth={2.2} /></span>
          <h3>Заявка принята</h3>
          <p>
            {isOpt
              ? <>Менеджер по опту {VIA_PHRASE[contactVia]} в течение рабочего дня (с&nbsp;9:00 до&nbsp;19:00 МСК) и пришлёт точный расчёт доставки.</>
              : <>Менеджер по оптовому направлению {VIA_PHRASE[contactVia]} в течение рабочего дня (с&nbsp;9:00 до&nbsp;19:00 МСК),
                пришлёт подборку фабрик и предварительную смету.</>}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="b2bf__form" noValidate>
          <h2 className="b2bf__title">{isOpt ? 'Заявка на оптовую доставку' : 'Запрос оптового расчёта'}</h2>
          <p className="b2bf__lede">
            {isOpt
              ? 'Опишите груз — посчитаем доставку по плотности, выкуп и документы.'
              : 'Расскажите про задачу — отправим смету с фабрикой, ценой и сроками.'}
          </p>

          <div className="b2bf__row">
            <label className="b2bf__field">
              <span className="b2bf__label">
                <Building2 size={14} strokeWidth={2.4} /> Компания / ИП
                {isOpt && <span className="b2bf__opt">— необязательно</span>}
              </span>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="ООО / ИП / самозанятый"
                className="b2bf__input"
                autoComplete="organization"
              />
            </label>
            <label className="b2bf__field">
              <span className="b2bf__label">{isOpt ? 'Ваше имя' : 'Контактное лицо'}</span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Имя"
                className="b2bf__input"
                autoComplete="name"
              />
            </label>
          </div>

          <label className="b2bf__field">
            <span className="b2bf__label"><Phone size={14} strokeWidth={2.4} /> Телефон</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___ __ __"
              className="b2bf__input"
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

          <ContactViaPicker
            value={contactVia}
            onChange={setContactVia}
            messenger={messenger}
            onMessengerChange={setMessenger}
          />

          <div className="b2bf__row">
            <label className="b2bf__field">
              <span className="b2bf__label"><Boxes size={14} strokeWidth={2.4} /> Объём партии</span>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="напр. 200 кг или 5 м³"
                className="b2bf__input"
              />
            </label>
            <label className="b2bf__field">
              <span className="b2bf__label"><Tag size={14} strokeWidth={2.4} /> Категория товара</span>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="одежда, электроника, мебель…"
                className="b2bf__input"
              />
            </label>
          </div>

          {isOpt && (
            <>
              <label className="b2bf__field">
                <span className="b2bf__label"><Wallet size={14} strokeWidth={2.4} /> Сумма закупки товара</span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="b2bf__input"
                >
                  <option value="">Выберите</option>
                  {OPT_BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
              <div className="b2bf__checks">
                <label className="b2bf__check">
                  <input type="checkbox" checked={needBuyout} onChange={(e) => setNeedBuyout(e.target.checked)} />
                  <span>Нужен выкуп или поиск поставщика</span>
                </label>
                <label className="b2bf__check">
                  <input type="checkbox" checked={needDocs} onChange={(e) => setNeedDocs(e.target.checked)} />
                  <span>Нужны документы (для маркетплейсов / импорта)</span>
                </label>
              </div>
            </>
          )}

          <label className="b2bf__field">
            <span className="b2bf__label">
              {isOpt ? 'Комментарий' : 'Что нужно сделать?'} <span className="b2bf__opt">— необязательно</span>
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isOpt
                ? 'Например: 300 кг одежды из Гуанчжоу, 2 м³, нужна маркировка для Wildberries…'
                : 'Например: помочь найти фабрику по образцу, протестировать партию, оформить документы для импорта…'}
              className="b2bf__input b2bf__textarea"
              rows={4}
            />
          </label>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="b2bf__hp"
            aria-hidden="true"
          />

          <label className="b2bf__consent">
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
            className="b2bf__submit"
          >
            <Send size={18} strokeWidth={2.5} />
            {status === 'sending' ? 'Отправляем…' : isOpt ? 'Отправить заявку на опт' : 'Запросить расчёт'}
          </button>

          {status === 'error' && (
            <p className="b2bf__err">
              Не удалось отправить. Напишите нам в{' '}
              <a href="https://t.me/Taopostchat_official?start=b2b" target="_blank" rel="noopener noreferrer">Telegram</a>{' '}
              или на <a href="mailto:support@taopost.ru">support@taopost.ru</a>.
            </p>
          )}
        </form>
      )}

      <style jsx>{`
        .b2bf__card {
          background: #fff;
          border-radius: 24px;
          padding: 36px;
          border: 1px solid rgba(10,15,28,0.06);
          box-shadow: 0 24px 60px -24px rgba(10,15,28,0.18);
        }
        .b2bf__form { display: flex; flex-direction: column; gap: 18px; }
        .b2bf__title {
          font-size: 24px;
          font-weight: 700;
          color: #0A0F1C;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .b2bf__lede {
          font-size: 15px;
          color: #4B5563;
          margin: -6px 0 8px;
          line-height: 1.6;
        }
        .b2bf__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .b2bf__field { display: flex; flex-direction: column; gap: 8px; }
        .b2bf__label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
        }
        .b2bf__label :global(svg) { color: #6B7280; }
        .b2bf__opt { font-weight: 500; color: #6B7280; }
        .b2bf__input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          font-size: 15px;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          box-sizing: border-box;
          font-family: inherit;
          color: #0A0F1C;
          background: #fff;
        }
        .b2bf__input:focus {
          border-color: #005C43;
          box-shadow: 0 0 0 4px rgba(0,92,67,0.12);
        }
        .b2bf__textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.5;
        }
        .b2bf__hp {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        .b2bf__submit {
          margin-top: 4px;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 28px;
          border: none;
          border-radius: 14px;
          background: #FF5A47;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 12px 30px -10px rgba(255,90,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
          transition: transform .15s, box-shadow .15s, opacity .15s;
        }
        .b2bf__submit:hover:not(:disabled) { transform: translateY(-2px); }
        .b2bf__submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .b2bf__err {
          font-size: 13.5px;
          color: #b91c1c;
          line-height: 1.5;
          margin: 0;
        }
        .b2bf__err a { color: #005C43; font-weight: 600; }
        .b2bf__checks { display: flex; flex-direction: column; gap: 10px; }
        .b2bf__check {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          color: #374151;
          cursor: pointer;
        }
        .b2bf__check input {
          width: 18px;
          height: 18px;
          accent-color: #005C43;
          flex-shrink: 0;
          cursor: pointer;
        }
        .b2bf__consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
          color: #4B5563;
          line-height: 1.55;
          cursor: pointer;
        }
        .b2bf__consent input {
          margin-top: 3px;
          width: 16px;
          height: 16px;
          accent-color: #005C43;
          flex-shrink: 0;
          cursor: pointer;
        }
        .b2bf__consent a { color: #005C43; text-decoration: underline; font-weight: 600; }
        .b2bf__success { text-align: center; padding: 12px 4px; }
        .b2bf__successIcon {
          display: inline-flex;
          width: 72px; height: 72px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: rgba(0,92,67,0.10);
          color: #005C43;
        }
        .b2bf__success h3 {
          font-size: 22px;
          font-weight: 700;
          color: #0A0F1C;
          margin: 0 0 10px;
        }
        .b2bf__success p {
          font-size: 15px;
          color: #4B5563;
          line-height: 1.65;
          margin: 0;
        }

        @media (max-width: 560px) {
          .b2bf__card { padding: 24px; }
          .b2bf__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
