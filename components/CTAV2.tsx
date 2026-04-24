'use client';
import { Send, MessageCircle, Clock } from 'lucide-react';

export default function CTAV2() {
  return (
    <section className="tp-section">
      <div className="tp-mesh tp-mesh--green tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--coral tp-mesh--bl" />

      <div className="ctav2__wrap">
        <div className="ctav2__card">
          <div className="ctav2__orb ctav2__orb--tr" />
          <div className="ctav2__orb ctav2__orb--bl" />
          <div className="ctav2__grid" />

          <div className="ctav2__inner">
            <span className="ctav2__pill">
              <span className="ctav2__pillDot" />
              Мы на связи
            </span>

            <h2 className="ctav2__title">
              Готовы сэкономить<br />
              на <span className="ctav2__titleAccent">следующей покупке?</span>
            </h2>

            <p className="ctav2__lede">
              Напишите прямо сейчас — ответим за 5 минут, подберём оптимальный тариф и поможем оформить первый заказ
            </p>

            <div className="ctav2__buttons">
              <a
                href="https://t.me/taopostmaneger?start=site"
                target="_blank"
                rel="noopener noreferrer"
                className="ctav2__btn ctav2__btn--primary"
              >
                <Send size={18} strokeWidth={2.5} />
                Написать в Telegram
              </a>
              <a
                href="https://t.me/taopost"
                target="_blank"
                rel="noopener noreferrer"
                className="ctav2__btn ctav2__btn--ghost"
              >
                <MessageCircle size={18} strokeWidth={2.3} />
                Наш канал
              </a>
            </div>

            <div className="ctav2__note">
              <Clock size={14} strokeWidth={2.3} />
              Отвечаем ежедневно с 9:00 до 22:00 МСК
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ctav2__wrap {
          max-width: 960px;
          margin: 0 auto;
          position: relative;
        }
        .ctav2__card {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          padding: 72px 56px;
          background: linear-gradient(135deg, #0A0F1C 0%, #1F2937 100%);
          color: #fff;
          isolation: isolate;
          box-shadow:
            0 40px 80px -30px rgba(10,15,28,0.45),
            0 1px 2px rgba(10,15,28,0.1);
        }

        .ctav2__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
          pointer-events: none;
        }
        .ctav2__orb--tr {
          top: -120px; right: -100px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(27,158,126,0.55), transparent 65%);
        }
        .ctav2__orb--bl {
          bottom: -140px; left: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(255,107,71,0.45), transparent 65%);
        }
        .ctav2__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          z-index: 0;
          pointer-events: none;
        }

        .ctav2__inner {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .ctav2__pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 600;
          color: #E5E7EB;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          margin-bottom: 22px;
        }
        .ctav2__pillDot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 0 4px rgba(27,158,126,0.25);
        }

        .ctav2__title {
          font-size: clamp(28px, 4.2vw, 44px);
          font-weight: 900;
          letter-spacing: -1.2px;
          line-height: 1.1;
          margin: 0 0 18px;
        }
        .ctav2__titleAccent {
          background: linear-gradient(90deg, var(--green) 0%, var(--coral) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .ctav2__lede {
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto 36px;
        }

        .ctav2__buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ctav2__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 30px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .ctav2__btn--primary {
          background: var(--coral);
          color: #fff;
          box-shadow: 0 14px 32px -10px rgba(255,107,71,0.6), inset 0 -2px 0 rgba(0,0,0,0.14);
        }
        .ctav2__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px -10px rgba(255,107,71,0.7), inset 0 -2px 0 rgba(0,0,0,0.14);
        }
        .ctav2__btn--ghost {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
        }
        .ctav2__btn--ghost:hover {
          background: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }

        .ctav2__note {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .ctav2__card { padding: 52px 28px; border-radius: 24px; }
          .ctav2__buttons { flex-direction: column; }
          .ctav2__btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
