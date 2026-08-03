'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Gift, Send } from 'lucide-react';
import { ymReachGoal } from '@/lib/metrika';

type Reason = 'expensive' | 'unclear' | 'no_trust' | 'just_browsing' | 'other';

const REASONS: { id: Reason; label: string }[] = [
  { id: 'expensive', label: 'Дорого' },
  { id: 'unclear', label: 'Не понял, как это работает' },
  { id: 'no_trust', label: 'Не доверяю' },
  { id: 'just_browsing', label: 'Просто смотрю' },
  { id: 'other', label: 'Другое' },
];

const SESSION_KEY = 'taopost.exit_intent_shown';
const ARMED_DELAY_MS = 8000; // не показывать в первые 8 сек посещения

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason | null>(null);
  const [otherText, setOtherText] = useState('');
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const armedRef = useRef(false);

  const show = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!armedRef.current) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    setOpen(true);
    ymReachGoal('exit_intent_open');
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, ARMED_DELAY_MS);

    // Desktop: mouse покинул верхнюю границу окна
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener('mouseleave', onMouseLeave);

    // Mobile: ловим back-навигацию через history-trap
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let popHandler: ((e: PopStateEvent) => void) | null = null;
    if (isMobile && typeof history.pushState === 'function') {
      history.pushState({ taopost_exit: true }, '');
      popHandler = () => {
        if (!armedRef.current) return;
        if (sessionStorage.getItem(SESSION_KEY)) return;
        show();
        // удерживаем пользователя на странице ещё одним state, чтобы попап успел показаться
        history.pushState({ taopost_exit: true }, '');
      };
      window.addEventListener('popstate', popHandler);
    }

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (popHandler) window.removeEventListener('popstate', popHandler);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Focus-trap: пока модалка открыта, Tab не должен уводить фокус за её пределы.
  useEffect(() => {
    if (!open) return;
    const root = document.querySelector<HTMLElement>('.ei__card');
    if (!root) return;
    const selector = 'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const nodes = root.querySelectorAll<HTMLElement>(selector);
      const focusable = Array.from(nodes).filter((n) => !n.hasAttribute('disabled') && n.getAttribute('aria-hidden') !== 'true');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trap);
    // При открытии переносим фокус внутрь модалки
    const t = window.setTimeout(() => {
      const nodes = root.querySelectorAll<HTMLElement>(selector);
      nodes[0]?.focus();
    }, 40);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', trap);
    };
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason || sent) return;
    setSent(true);
    ymReachGoal('exit_intent_reason', {
      reason,
      otherText: reason === 'other' ? otherText.slice(0, 140) : undefined,
      hasContact: contact.trim().length > 3,
    });
    // отправка контакта — мягкая, чтобы не блокировать, ошибку игнорируем
    if (contact.trim().length > 3) {
      fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toCity: 'exit-intent',
          phone: contact.trim().slice(0, 80),
          weight: '',
          transport: 'auto',
          website: '',
        }),
      }).catch(() => {});
    }
  }

  if (!open) return null;

  return (
    <div
      className="ei"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ei-title"
      onClick={close}
    >
      <div className="ei__card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="ei__close"
          onClick={close}
          aria-label="Закрыть"
          data-ym-goal="exit_intent_close"
        >
          <X size={20} strokeWidth={2.4} />
        </button>

        {sent ? (
          <div className="ei__thanks">
            <div className="ei__giftIcon"><Gift size={32} strokeWidth={2.2} /></div>
            <h3 id="ei-title">Спасибо за ответ!</h3>
            <p>
              {contact
                ? 'Отправили мини-гайд по выкупу из Китая и пометили вашу заявку. Менеджер свяжется в течение рабочего дня.'
                : 'Учтём ваш ответ — это поможет нам сделать сервис понятнее.'}
            </p>
            <a
              href="https://t.me/taopostsupport?start=exit"
              target="_blank"
              rel="noopener noreferrer"
              className="ei__tg"
              data-ym-goal="telegram_click"
              data-ym-params='{"place":"exit_intent"}'
            >
              <Send size={16} strokeWidth={2.5} />
              Написать в Telegram
            </a>
          </div>
        ) : (
          <form className="ei__form" onSubmit={submit} noValidate>
            <div className="ei__giftIcon ei__giftIcon--accent"><Gift size={28} strokeWidth={2.2} /></div>
            <h3 id="ei-title">Уходите? Подскажите, почему</h3>
            <p className="ei__lede">
              Пара секунд — и мы пришлём короткий гайд «Как заказать из Китая без ошибок» в подарок.
            </p>

            <fieldset className="ei__reasons">
              <legend className="ei__legend">Что вас остановило?</legend>
              {REASONS.map((r) => (
                <label key={r.id} className={`ei__reason${reason === r.id ? ' ei__reason--active' : ''}`}>
                  <input
                    type="radio"
                    name="ei_reason"
                    value={r.id}
                    checked={reason === r.id}
                    onChange={() => setReason(r.id)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </fieldset>

            {reason === 'other' && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                className="ei__input"
                placeholder="Опишите коротко"
                aria-label="Другая причина"
                maxLength={140}
              />
            )}

            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="ei__input"
              placeholder="Telegram или телефон — пришлём гайд (необязательно)"
              aria-label="Контакт для отправки гайда"
              inputMode="tel"
              autoComplete="tel"
            />

            <button
              type="submit"
              className="ei__submit"
              disabled={!reason}
            >
              <Gift size={16} strokeWidth={2.5} />
              Получить гайд и закрыть
            </button>
            <p className="ei__note">Без спама. Один ответ — одна отправка.</p>
          </form>
        )}
      </div>

      <style jsx>{`
        .ei {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(10,15,28,0.78);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(6px);
          animation: eiFade .18s ease;
        }
        @keyframes eiFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ei__card {
          position: relative;
          background: #fff;
          border-radius: 22px;
          padding: 32px 28px;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 40px 80px -30px rgba(10,15,28,0.45);
          animation: eiPop .22s ease;
        }
        @keyframes eiPop {
          from { opacity: 0; transform: translateY(10px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ei { animation: none; }
          .ei__card { animation: none; }
        }
        .ei__close {
          position: absolute;
          top: 14px; right: 14px;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: none;
          background: #F3F4F6;
          color: #6B7280;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
        }
        .ei__close:hover { background: #E5E7EB; color: #0A0F1C; }

        .ei__giftIcon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(0,92,67,0.10);
          color: #005C43;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .ei__giftIcon--accent {
          background: rgba(255,90,71,0.14);
          color: #FF5A47;
        }

        .ei__form, .ei__thanks { display: flex; flex-direction: column; gap: 12px; }
        h3 {
          font-size: 22px;
          font-weight: 700;
          color: #0A0F1C;
          margin: 0;
          letter-spacing: -0.4px;
          line-height: 1.25;
        }
        .ei__lede {
          font-size: 14.5px;
          color: #4B5563;
          line-height: 1.55;
          margin: 0;
        }
        .ei__reasons {
          border: none;
          padding: 0;
          margin: 4px 0 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .ei__legend {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          padding: 0;
          margin-bottom: 4px;
        }
        .ei__reason {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1.5px solid #E5E7EB;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: border-color .15s, background .15s, color .15s;
        }
        .ei__reason:hover { border-color: #9CA3AF; }
        .ei__reason input[type="radio"] {
          appearance: none;
          width: 18px; height: 18px;
          border: 2px solid #D1D5DB;
          border-radius: 50%;
          margin: 0;
          flex-shrink: 0;
          transition: border-color .15s, background .15s;
          position: relative;
        }
        .ei__reason input[type="radio"]:checked {
          border-color: #005C43;
        }
        .ei__reason input[type="radio"]:checked::after {
          content: '';
          position: absolute;
          inset: 3px;
          background: #005C43;
          border-radius: 50%;
        }
        .ei__reason--active {
          border-color: #005C43;
          background: rgba(0,92,67,0.06);
          color: #004232;
        }

        .ei__input {
          width: 100%;
          padding: 13px 14px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .ei__input:focus {
          border-color: #005C43;
          box-shadow: 0 0 0 4px rgba(0,92,67,0.12);
        }

        .ei__submit {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 22px;
          border: none;
          border-radius: 12px;
          background: #FF5A47;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 10px 24px -10px rgba(255,90,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
          transition: transform .15s, opacity .15s;
        }
        .ei__submit:hover:not(:disabled) { transform: translateY(-1px); }
        .ei__submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .ei__note {
          font-size: 12px;
          color: #6B7280;
          text-align: center;
          margin: 0;
        }

        .ei__thanks p {
          font-size: 14.5px;
          color: #4B5563;
          line-height: 1.6;
          margin: 0;
        }
        .ei__tg {
          margin-top: 8px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 12px;
          background: #0088cc;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
