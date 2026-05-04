'use client';
import { ShieldCheck, ShoppingCart, MapPin, Zap, Package, Camera, Users, TrendingUp, type LucideIcon } from 'lucide-react';

type Feature = {
  Icon: LucideIcon;
  title: string;
  description: string;
  tone: 'coral' | 'green' | 'ink';
};

const FEATURES: Feature[] = [
  {
    Icon: ShieldCheck,
    title: 'Официальная доставка',
    description: 'Соблюдаем все нормы таможенного и налогового законодательства РФ. Никаких сюрпризов на таможне.',
    tone: 'green',
  },
  {
    Icon: ShoppingCart,
    title: 'Выкуп товаров',
    description: 'Поможем купить товар, если у вас нет китайской карты или аккаунта на маркетплейсе.',
    tone: 'coral',
  },
  {
    Icon: MapPin,
    title: 'Отслеживание посылок',
    description: 'Следите за статусом заказа в реальном времени через наше приложение — от склада до двери.',
    tone: 'ink',
  },
  {
    Icon: Zap,
    title: 'Быстрая доставка',
    description: 'Доставляем за 15–25 дней. Регулярные рейсы из Гуанчжоу напрямую в Россию.',
    tone: 'coral',
  },
  {
    Icon: Package,
    title: 'Консолидация',
    description: 'Объединяем несколько заказов из разных магазинов в одну посылку — платите за доставку один раз.',
    tone: 'green',
  },
  {
    Icon: Camera,
    title: 'Фото товара',
    description: 'По запросу сделаем фотографии вашего товара на складе в Китае перед отправкой.',
    tone: 'ink',
  },
  {
    Icon: Users,
    title: 'Совместный выкуп',
    description: 'Не хватает до минимальных 5 кг? Объединяем вас с другими заказчиками — платите только за свой вес.',
    tone: 'coral',
  },
  {
    Icon: TrendingUp,
    title: 'Выгодный курс юаня',
    description: 'Быстрая конвертация рублей в юани по выгодному курсу. Оплатили — менеджер сразу оформляет заказ.',
    tone: 'green',
  },
];

export default function Features() {
  return (
    <section className="tp-section tp-section--muted">
      <div className="tp-mesh tp-mesh--green tp-mesh--tl" />
      <div className="tp-mesh tp-mesh--coral tp-mesh--br" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            Почему TaoPost
          </span>
          <h2 className="tp-h2">
            Всё что нужно для<br />
            <span className="tp-gradient-text">удобной доставки</span>
          </h2>
          <p className="tp-lede">
            Мы берём на себя все этапы — от покупки товара в Китае до доставки к вашей двери
          </p>
        </div>

        <div className="feat__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="tp-card tp-card--hover feat__card">
              <div className={`tp-icon-tile tp-icon-tile--${f.tone}`}>
                <f.Icon size={22} strokeWidth={2.3} />
              </div>
              <h3 className="feat__title">{f.title}</h3>
              <p className="feat__desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feat__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .feat__card {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }
        .feat__card :global(.tp-icon-tile) { margin-bottom: 18px; }
        .feat__title {
          font-size: 17px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 10px;
          letter-spacing: -0.3px;
        }
        .feat__desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .feat__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 760px) {
          .feat__grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .feat__card { padding: 22px; }
        }
        @media (max-width: 440px) {
          .feat__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
