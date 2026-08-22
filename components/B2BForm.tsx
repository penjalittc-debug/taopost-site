'use client';
import { useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, Boxes, Tag } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';
import { collectTraffic } from '@/lib/traffic';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function B2BForm() {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [consent, setConsent] = useState(false); // 152-ФЗ: явное согласие на обработку ПДн
  const [status, setStatus] = useState<Status>('idle');

  const canSend =
    company.trim().length > 1 &&
    phone.trim().length > 4 &&
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
          company,
          contact,
          phone,
          volume,
          category,
          description,
          website,
          traffic: collectTraffic(),
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      ymReachGoal('b2b_form_submit', { category: category || 'не указана' });
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
            Менеджер по оптовому направлению свяжется в течение рабочего дня (с&nbsp;9:00 до&nbsp;19:00 МСК),
            пришлёт подборку фабрик и предварительную смету.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="b2bf__form" noValidate>
          <h2 className="b2bf__title">Запрос оптового расчёта</h2>
          <p className="b2bf__lede">Расскажите про задачу — отправим смету с фабрикой, ценой и сроками.</p>

          <div className="b2bf__row">
            <label className="b2bf__field">
              <span className="b2bf__label"><Building2 size={14} strokeWidth={2.4} /> Компания / ИП</span>
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
              <span className="b2bf__label">Контактное лицо</span>
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
            <span className="b2bf__label"><Phone size={14} strokeWidth={2.4} /> Телефон или Telegram</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___ __ __ или @username"
              className="b2bf__input"
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

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

          <label className="b2bf__field">
            <span className="b2bf__label">Что нужно сделать? <span className="b2bf__opt">— необязательно</span></span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Например: помочь найти фабрику по образцу, протестировать партию, оформить документы для импорта…"
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
              {' '}и принимаю условия{' '}
              <a href="/oferta" target="_blank" rel="noopener noreferrer">договора-оферты</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={!canSend || status === 'sending'}
            className="b2bf__submit"
          >
            <Send size={18} strokeWidth={2.5} />
            {status === 'sending' ? 'Отправляем…' : 'Запросить расчёт'}
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
