'use client';
import { useEffect, useState } from 'react';
import { Calculator as CalcIcon, Send } from 'lucide-react';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (!isTouch) return;

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="smcta" role="region" aria-label="Быстрые действия">
      <a
        href="#calculator"
        className="smcta__btn smcta__btn--primary"
        data-ym-goal="scroll_to_calculator"
        data-ym-params='{"place":"sticky_mobile"}'
      >
        <CalcIcon size={18} strokeWidth={2.5} />
        Рассчитать
      </a>
      <a
        href="https://t.me/taopostsupport?start=site"
        target="_blank"
        rel="noopener noreferrer"
        className="smcta__btn smcta__btn--ghost"
        data-ym-goal="telegram_click"
        data-ym-params='{"place":"sticky_mobile"}'
      >
        <Send size={16} strokeWidth={2.5} />
        Написать
      </a>

      <style jsx>{`
        .smcta {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 900;
          display: none;
          gap: 8px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 14px 32px -8px rgba(10, 15, 28, 0.25);
          border: 1px solid rgba(10, 15, 28, 0.06);
          animation: smctaUp .25s ease;
        }
        @keyframes smctaUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .smcta__btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 12px 10px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.1px;
        }
        .smcta__btn--primary {
          background: var(--coral);
          color: #fff;
          box-shadow: 0 8px 18px -6px rgba(255, 90, 71, 0.5);
        }
        .smcta__btn--ghost {
          background: #F3F4F6;
          color: var(--ink);
        }
        @media (hover: none) and (max-width: 900px) {
          .smcta { display: flex; }
        }
      `}</style>
    </div>
  );
}
