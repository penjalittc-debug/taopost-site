'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'taopost.cookie_notice.v1';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch { /* приватный режим — просто закрываем */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cn" role="region" aria-label="Уведомление об использовании cookies">
      <div className="cn__text">
        Сайт использует cookies и обрабатывает персональные данные в соответствии с{' '}
        <a href="/privacy">политикой конфиденциальности</a>. Продолжая пользоваться сайтом,
        вы соглашаетесь с этим.
      </div>
      <div className="cn__actions">
        <button type="button" onClick={accept} className="cn__btn cn__btn--accept">
          Согласен
        </button>
        <button
          type="button"
          onClick={accept}
          className="cn__close"
          aria-label="Закрыть уведомление"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      <style jsx>{`
        .cn {
          position: fixed;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 95;
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 14px 16px;
          background: rgba(10, 15, 28, 0.95);
          color: #fff;
          border-radius: 14px;
          box-shadow: 0 20px 50px -20px rgba(10, 15, 28, 0.4);
          backdrop-filter: blur(10px);
          max-width: 720px;
          margin: 0 auto;
          animation: cnFadeUp .28s ease;
        }
        @keyframes cnFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cn { animation: none; }
        }
        .cn__text {
          flex: 1;
          font-size: 13.5px;
          line-height: 1.55;
          color: #E5E7EB;
        }
        .cn__text a {
          color: #fff;
          text-decoration: underline;
        }
        .cn__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .cn__btn {
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 18px;
          border-radius: 10px;
        }
        .cn__btn--accept {
          background: #FF5A47;
          color: #fff;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.14);
        }
        .cn__close {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: transparent;
          color: #D1D5DB;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cn__close:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }

        @media (max-width: 560px) {
          .cn {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 14px;
          }
          .cn__actions { justify-content: space-between; }
          .cn__btn--accept { flex: 1; }
        }
      `}</style>
    </div>
  );
}
