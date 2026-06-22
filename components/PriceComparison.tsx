'use client';
import Image from 'next/image';
import { ArrowRight, Send, TrendingDown } from 'lucide-react';

const PRODUCTS = [
  { name: 'Nike Air Force 1', category: 'Кроссовки', priceRU: 12990, priceCN: 5200, img: '/products/nike-air-force-1.webp', marketplace: 'Poizon' },
  { name: 'Adidas Samba OG', category: 'Кроссовки', priceRU: 21040, priceCN: 9276, img: '/products/adidas-samba-og.avif', marketplace: 'Poizon' },
  { name: 'Jordan Air Jordan 1', category: 'Кроссовки', priceRU: 23999, priceCN: 8688, img: '/products/air-jordan-1.webp', marketplace: 'Poizon' },
  { name: 'Levi\'s 501 Джинсы', category: 'Одежда', priceRU: 11899, priceCN: 6321, img: '/products/levis-501.jpg', marketplace: '1688' },
  { name: 'Carhartt WIP Куртка', category: 'Одежда', priceRU: 19795, priceCN: 13507, img: '/products/carhartt-wip-jacket.jpg', marketplace: 'Taobao' },
  { name: 'Samsung Galaxy Fit 3', category: 'Электроника', priceRU: 7621, priceCN: 5352, img: '/products/samsung-galaxy-fit-3.webp', marketplace: '1688' },
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
                  <div className="pc__photo">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={176}
                      height={176}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
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
            href="https://t.me/taopostsupport?start=site"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-btn tp-btn--primary"
            data-ym-goal="telegram_click"
            data-ym-params='{"place":"price_comparison"}'
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
          gap: 24px;
        }

        .pc__card { padding: 32px; }

        .pc__head {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .pc__photo {
          width: 88px; height: 88px;
          border-radius: 16px;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 1px solid #E5E7EB;
          padding: 8px;
          overflow: hidden;
        }
        .pc__meta { min-width: 0; }
        .pc__name {
          font-size: 17px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .pc__cat {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
          font-weight: 500;
        }

        .pc__prices {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .pc__price {
          flex: 1;
          padding: 14px 12px;
          border-radius: 14px;
          text-align: center;
          background: #F9FAFB;
          border: 1px solid #F0F1F3;
        }
        .pc__price--cn {
          background: #fff;
          border: 1px solid #E5F4EE;
          box-shadow: inset 0 0 0 1px rgba(0, 92, 67,0.05);
        }
        .pc__priceLabel {
          font-size: 11px;
          color: #9CA3AF;
          font-weight: 600;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .pc__priceValue {
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.4px;
        }
        .pc__price--ru .pc__priceValue {
          color: #9CA3AF;
          text-decoration: line-through;
          text-decoration-thickness: 1.5px;
        }
        .pc__price--cn .pc__priceValue { color: var(--green-dark); }
        .pc__arrow { color: #9CA3AF; flex-shrink: 0; }

        .pc__savings {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--ink) 0%, #1F2937 100%);
          color: #fff;
        }
        .pc__savingsLabel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .pc__savingsValue {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .pc__savingsPct {
          background: #005C43;
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
