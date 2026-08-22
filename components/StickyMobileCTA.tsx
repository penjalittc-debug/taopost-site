'use client';
import { useEffect, useState } from 'react';
import { Calculator as CalcIcon, Send, X } from 'lucide-react';

const SHOW_AFTER_PX = 600;
const DISMISS_KEY = 'taopost.sticky_cta_dismissed';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) {
        setDismissed(true);
        return;
      }
    } catch { /* приватный режим — просто продолжаем */ }
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch { /* ignore */ }
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className={`smc${visible ? ' smc--visible' : ''}`} aria-hidden={!visible}>
      <a
        href="#calculator"
        className="smc__btn smc__btn--primary"
        data-ym-goal="sticky_calc_click"
      >
        <CalcIcon size={18} strokeWidth={2.5} />
        Рассчитать
      </a>
      <a
        href="https://t.me/Taopostchat_official"
        target="_blank"
        rel="noopener noreferrer"
        className="smc__btn smc__btn--tg"
        data-ym-goal="telegram_click"
        data-ym-params='{"place":"sticky_mobile"}'
      >
        <Send size={18} strokeWidth={2.5} />
        Telegram
      </a>
      <button
        type="button"
        onClick={dismiss}
        className="smc__close"
        aria-label="Скрыть панель"
        data-ym-goal="sticky_dismiss"
      >
        <X size={16} strokeWidth={2.5} />
      </button>

      <style jsx>{`
        .smc {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 90;
          display: none;
          gap: 8px;
          padding: 8px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(10,15,28,0.08);
          border-radius: 16px;
          box-shadow: 0 14px 36px -12px rgba(10,15,28,0.25);
          backdrop-filter: blur(10px);
          transform: translateY(140%);
          transition: transform .25s ease, opacity .25s ease;
          opacity: 0;
          align-items: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .smc { transition: none; }
        }
        .smc--visible {
          transform: translateY(0);
          opacity: 1;
        }
        .smc__btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 12px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          font-family: inherit;
        }
        .smc__btn--primary {
          background: #FF5A47;
          color: #fff;
          box-shadow: 0 8px 18px -8px rgba(255,90,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.14);
        }
        .smc__btn--tg {
          background: #0088cc;
          color: #fff;
          box-shadow: 0 8px 18px -8px rgba(0,136,204,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
        }
        .smc__close {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border: 1px solid rgba(10,15,28,0.10);
          background: #fff;
          color: #6B7280;
          border-radius: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
        }
        .smc__close:hover { color: #0A0F1C; background: #F3F4F6; }

        @media (max-width: 767px) {
          .smc { display: flex; }
        }
        /* убираем нижний оверлей плавающего Telegram-круга, чтобы не пересекались */
        @media (max-width: 767px) {
          :global(a[aria-label="Написать менеджеру в Telegram"]) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
