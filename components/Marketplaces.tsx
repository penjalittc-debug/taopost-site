'use client';
import Image from 'next/image';
import { Send } from 'lucide-react';

const MARKETPLACES = [
  {
    name: 'Pinduoduo',
    description: 'Лучшие цены от китайских производителей напрямую',
    img: '/mp/pinduoduo.jpg',
    color: '#e4003a',
    tag: 'Дешевле всего',
    tagColor: '#e4003a',
  },
  {
    name: 'Taobao',
    description: 'Крупнейший ритейл-маркетплейс Китая с миллионами товаров',
    img: '/mp/taobao.svg',
    color: '#ff4400',
    tag: 'Огромный выбор',
    tagColor: '#ff4400',
  },
  {
    name: '1688',
    description: 'Оптовые закупки напрямую от производителей по заводским ценам',
    img: '/mp/1688.png',
    color: '#ff6600',
    tag: 'Оптом',
    tagColor: '#ff6600',
  },
  {
    name: 'Poizon',
    description: 'Оригинальные кроссовки и уличная мода с гарантией подлинности',
    img: '/mp/poizon.png',
    color: '#1a1a2e',
    tag: 'Оригинал',
    tagColor: '#6366f1',
  },
  {
    name: 'Tmall',
    description: 'Брендовые товары и официальные магазины Китая (天猫)',
    img: '/mp/tmall.jpg',
    color: '#ffffff',
    tag: 'Бренды',
    tagColor: '#ff0036',
  },
  {
    name: 'Goofish',
    description: 'Б/у товары и раритеты по выгодным ценам',
    img: '/mp/gofish.webp',
    color: '#d97706',
    tag: 'Секонд-хенд',
    tagColor: '#d97706',
  },
];

export default function Marketplaces() {
  return (
    <section id="marketplaces" className="tp-section">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--green tp-mesh--bl" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            Маркетплейсы
          </span>
          <h2 className="tp-h2">
            Везём с любого<br />
            <span className="tp-gradient-text">китайского маркетплейса</span>
          </h2>
          <p className="tp-lede">
            Просто скопируйте ссылку на товар и отправьте нам — всё остальное сделаем мы
          </p>
        </div>

        <div className="mp__grid">
          {MARKETPLACES.map((mp) => (
            <div key={mp.name} className="tp-card tp-card--hover mp__card">
              <div className="mp__logo" style={{ background: mp.color, boxShadow: `0 10px 24px -6px ${mp.color}60` }}>
                <Image
                  src={mp.img}
                  alt={mp.name}
                  width={64}
                  height={64}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span
                className="mp__tag"
                style={{ background: mp.tagColor + '15', color: mp.tagColor }}
              >
                {mp.tag}
              </span>

              <h3 className="mp__name">{mp.name}</h3>
              <p className="mp__desc">{mp.description}</p>
            </div>
          ))}
        </div>

        <div className="tp-card tp-card--glass mp__cta">
          <p className="mp__ctaText">
            Не нашли нужный маркетплейс? Мы работаем и с другими площадками — напишите нам
          </p>
          <a
            href="https://t.me/taopostmaneger?start=site"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-btn tp-btn--primary"
          >
            <Send size={18} strokeWidth={2.5} />
            Написать в Telegram
          </a>
        </div>
      </div>

      <style jsx>{`
        .mp__grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }
        .mp__card {
          padding: 28px 22px;
          text-align: center;
        }
        .mp__logo {
          width: 64px; height: 64px;
          border-radius: 20px;
          overflow: hidden;
          margin: 0 auto 16px;
        }
        .mp__tag {
          display: inline-block;
          border-radius: 999px;
          padding: 4px 11px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .mp__name {
          font-size: 17px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 8px;
          letter-spacing: -0.3px;
        }
        .mp__desc {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        .mp__cta {
          margin-top: 48px;
          padding: 36px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .mp__ctaText {
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
          flex: 1;
          min-width: 260px;
          line-height: 1.5;
        }

        @media (max-width: 1180px) {
          .mp__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 680px) {
          .mp__grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .mp__card { padding: 22px 16px; }
          .mp__cta { flex-direction: column; text-align: center; padding: 28px 22px; }
          .mp__ctaText { text-align: center; }
        }
        @media (max-width: 400px) {
          .mp__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
