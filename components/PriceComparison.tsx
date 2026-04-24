'use client';
import { ArrowRight, Send, TrendingDown } from 'lucide-react';

const PRODUCTS = [
  { name: 'Nike Air Force 1', category: 'Кроссовки', priceRU: 12990, priceCN: 5200, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Adidas Samba OG', category: 'Кроссовки', priceRU: 21040, priceCN: 9276, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Jordan Air Jordan 1', category: 'Кроссовки', priceRU: 23999, priceCN: 8688, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Levi\'s 501 Джинсы', category: 'Одежда', priceRU: 11899, priceCN: 6321, emoji: '👖', marketplace: '1688' },
  { name: 'Carhartt WIP Куртка', category: 'Одежда', priceRU: 19795, priceCN: 13507, emoji: '🧥', marketplace: 'Taobao' },
  { name: 'Samsung Galaxy Fit 3', category: 'Электроника', priceRU: 7621, priceCN: 5352, emoji: '⌚', marketplace: '1688' },
];

export default function PriceComparison() {
  return (
    <section id="prices" className="tp-section tp-section--muted">
      <div className="tp-mesh tp-mesh--green tp-mesh--tl" />
      <div className="tp-mesh tp-mesh--coral tp-mesh--br" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow tp-eyebrow--coral">
            <span className="tp-eyebrow__dot" />
            Выгода
          </span>
          <h2 className="tp-h2">
            Сравните цены:<br />
            <span className="tp-gradient-text">Китай vs Россия</span>
          </h2>
          <p className="tp-lede">
            Реальная экономия на популярных товарах — от 30% до 60%
          </p>
        </div>

        <div className="pc__grid">
          {PRODUCTS.map((p) => {
            const savings = p.priceRU - p.priceCN;
            const savingsPct = Math.round((savings / p.priceRU) * 100);
            return (
              <div key={p.name} className="tp-card tp-card--hover pc__card">
                <div className="pc__head">
                  <div className="pc__emoji">{p.emoji}</div>
                  <div className="pc__meta">
                    <div className="pc__name">{p.name}</div>
                    <div className="pc__cat">{p.category} · {p.marketplace}</div>
                  </div>
                </div>

                <div className="pc__prices">
                  <div className="pc__price pc__price--ru">
                    <div className="pc__priceLabel">В России</div>
                    <div className="pc__priceValue">{p.priceRU.toLocaleString('ru-RU')} ₽</div>
                  </div>
                  <ArrowRight size={18} strokeWidth={2.5} className="pc__arrow" />
                  <div className="pc__price pc__price--cn">
                    <div className="pc__priceLabel">Из Китая</div>
                    <div className="pc__priceValue">~{p.priceCN.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>

                <div className="pc__savings">
                  <span className="pc__savingsLabel">
                    <TrendingDown size={14} strokeWidth={2.5} />
                    Экономия
                  </span>
                  <span className="pc__savingsValue">
                    {savings.toLocaleString('ru-RU')} ₽ · <span className="pc__savingsPct">−{savingsPct}%</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pc__cta">
          <p className="pc__ctaText">Хотите узнать цену конкретного товара?</p>
          <a
            href="https://t.me/taopostmaneger?start=site"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-btn tp-btn--primary"
          >
            <Send size={18} strokeWidth={2.5} />
            Узнать стоимость
          </a>
        </div>
      </div>

      <style jsx>{`
        .pc__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .pc__card { padding: 24px; }

        .pc__head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .pc__emoji {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(27,158,126,0.12), rgba(255,107,71,0.12));
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          border: 1px solid rgba(10,15,28,0.04);
        }
        .pc__meta { min-width: 0; }
        .pc__name {
          font-size: 15px;
          font-weight: 800;
          color: var(--ink);
          line-height: 1.3;
          letter-spacing: -0.2px;
        }
        .pc__cat {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 3px;
          font-weight: 500;
        }

        .pc__prices {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .pc__price {
          flex: 1;
          padding: 12px 10px;
          border-radius: 12px;
          text-align: center;
        }
        .pc__price--ru {
          background: #FFF0F0;
          border: 1px solid rgba(203,50,52,0.12);
        }
        .pc__price--cn {
          background: rgba(27,158,126,0.08);
          border: 1px solid rgba(27,158,126,0.18);
        }
        .pc__priceLabel {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .pc__priceValue {
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.3px;
        }
        .pc__price--ru .pc__priceValue { color: var(--red); }
        .pc__price--cn .pc__priceValue { color: var(--green-dark); }
        .pc__arrow { color: #9CA3AF; flex-shrink: 0; }

        .pc__savings {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--ink) 0%, #1F2937 100%);
          color: #fff;
        }
        .pc__savingsLabel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .pc__savingsValue {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .pc__savingsPct {
          background: linear-gradient(90deg, #1B9E7E, #FF6B47);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .pc__cta {
          margin-top: 56px;
          text-align: center;
        }
        .pc__ctaText {
          font-size: 16px;
          color: var(--text-muted);
          margin: 0 0 20px;
        }

        @media (max-width: 960px) {
          .pc__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pc__grid { grid-template-columns: 1fr; }
          .pc__card { padding: 20px; }
        }
      `}</style>
    </section>
  );
}
