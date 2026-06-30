'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';

const REASONS = [
  { value: 'price', label: 'Дорого' },
  { value: 'unclear', label: 'Не понял как заказывать' },
  { value: 'trust', label: 'Не доверяю' },
  { value: 'looking', label: 'Просто смотрю' },
  { value: 'other', label: 'Другое' },
] as const;

type ReasonValue = (typeof REASONS)[number]['value'];

const STORAGE_KEY = 'taopost_exit_shown';

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReasonValue | null>(null);
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const isTouch = window.matchMedia('(hover: none)').matches;

    const show = () => {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
      window.sessionStorage.setItem(STORAGE_KEY, '1');
      setOpen(true);
      ymReachGoal('exit_intent_shown');
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };

    let scrollFallback: number | null = null;
    if (isTouch) {
      // На мобильных — fallback: показ через 45 секунд при достаточной прокрутке
      scrollFallback = window.setTimeout(() => {
        const scrolled = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        if (scrolled > 0.35) show();
      }, 45_000);
    } else {
      document.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      if (scrollFallback !== null) window.clearTimeout(scrollFallback);
    };
  }, []);

  const close = () => setOpen(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    ymReachGoal('exit_intent_submit', { reason, hasContact: Boolean(contact.trim()) });
    setSent(true);
  };

  if (!open) return null;

  return (
    <div className="ei" role="dialog" aria-modal="true" aria-labelledby="ei-title">
      <div className="ei__backdrop" onClick={close} />
      <div className="ei__card">
        <button type="button" onClick={close} className="ei__close" aria-label="Закрыть">
          <X size={18} strokeWidth={2.4} />
        </button>

        {sent ? (
          <div className="ei__thanks">
            <h2 className="ei__title">Спасибо!</h2>
            <p className="ei__lede">
              {contact.trim()
                ? 'Менеджер свяжется с вами в ближайшее время и поможет с заказом.'
                : 'Ваш ответ поможет нам сделать сервис лучше.'}
            </p>
            <button type="button" onClick={close} className="ei__btn">
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 id="ei-title" className="ei__title">Уходите? Подскажите, что вас остановило</h2>
            <p className="ei__lede">Ответ анонимный — поможет нам сделать сервис лучше.</p>

            <div className="ei__reasons">
              {REASONS.map((r) => (
                <label
                  key={r.value}
                  className={`ei__reason${reason === r.value ? ' ei__reason--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="exit-reason"
                    value={r.value}
                    checked={reason === r.value}
                    onChange={() => setReason(r.value)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>

            <label className="ei__field">
              <span className="ei__fieldLabel">Контакт (необязательно)</span>
              <input
                type="text"
                inputMode="tel"
                placeholder="Telegram или телефон"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="ei__input"
              />
              <span className="ei__hint">Если оставите контакт — менеджер свяжется и поможет.</span>
            </label>

            <button type="submit" className="ei__btn" disabled={!reason}>
              Отправить
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .ei {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .ei__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(10, 15, 28, 0.55);
          backdrop-filter: blur(4px);
          animation: eiFadeIn .2s ease;
        }
        @keyframes eiFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .ei__card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: #fff;
          border-radius: 22px;
          padding: 36px 32px 28px;
          box-shadow: 0 40px 80px -20px rgba(10,15,28,0.5);
          animation: eiSlideUp .25s cubic-bezier(.2,.7,.3,1);
        }
        @keyframes eiSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .ei__close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #F3F4F6;
          color: #6B7280;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .15s, color .15s;
        }
        .ei__close:hover { background: #E5E7EB; color: #0A0F1C; }

        .ei__title {
          font-size: 22px;
          font-weight: 800;
          color: #0A0F1C;
          line-height: 1.25;
          letter-spacing: -0.4px;
          margin: 0 0 10px;
        }
        .ei__lede {
          font-size: 14.5px;
          color: #4B5563;
          line-height: 1.55;
          margin: 0 0 22px;
        }
        .ei__reasons {
          display: grid;
          gap: 8px;
          margin-bottom: 18px;
        }
        .ei__reason {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14.5px;
          font-weight: 600;
          color: #1F2937;
          cursor: pointer;
          transition: border-color .15s, background .15s;
        }
        .ei__reason input { accent-color: var(--green); }
        .ei__reason:hover { border-color: #C5E5DA; background: #F4FAF7; }
        .ei__reason--active {
          border-color: var(--green);
          background: rgba(0, 92, 67, 0.06);
        }

        .ei__field {
          display: block;
          margin-bottom: 18px;
        }
        .ei__fieldLabel {
          display: block;
          font-size: 12.5px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .ei__input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1.5px solid #E5E7EB;
          font-size: 15px;
          font-family: inherit;
          color: #0A0F1C;
          outline: none;
          transition: border-color .15s;
        }
        .ei__input:focus { border-color: var(--green); }
        .ei__hint {
          display: block;
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 6px;
          line-height: 1.5;
        }

        .ei__btn {
          width: 100%;
          padding: 14px 22px;
          background: var(--coral);
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: background .15s, transform .15s;
          font-family: inherit;
        }
        .ei__btn:hover:not(:disabled) { background: #E54632; transform: translateY(-1px); }
        .ei__btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ei__thanks { text-align: center; padding: 8px 0; }
        .ei__thanks .ei__btn { margin-top: 22px; }

        @media (max-width: 480px) {
          .ei { padding: 16px; }
          .ei__card { padding: 30px 22px 24px; border-radius: 18px; }
          .ei__title { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}
