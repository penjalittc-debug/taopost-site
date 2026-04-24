'use client';
import { Truck, Plane, Shield, Package, ShoppingCart, Camera, Boxes, Send, Info, Lightbulb, type LucideIcon } from 'lucide-react';

const AUTO_ROWS = [
  { route: 'Иу → Москва', time: '15–20 дней', price: '2.7–3.3 $/кг', note: 'Автодоставка' },
  { route: 'Гуанчжоу → Москва', time: '18–25 дней', price: '2.7–3.3 $/кг', note: 'Автодоставка' },
  { route: 'Цзиси → Уссурийск', time: 'Скоро', price: 'Скоро', note: 'Новый маршрут' },
];

const AIR_ROWS = [
  { route: 'Пекин → Москва', time: '3–5 дней', price: 'от 25 $/кг', note: 'Авиадоставка' },
];

type Service = {
  Icon: LucideIcon;
  name: string;
  price: string;
  desc: string;
  tone: 'coral' | 'green' | 'ink';
};

const SERVICES: Service[] = [
  { Icon: Shield, name: 'Страховка груза', price: '2%', desc: 'Обязательная. Защищает товар от потери и повреждения на всём маршруте', tone: 'coral' },
  { Icon: Package, name: 'Упаковка', price: 'от 5 $', desc: 'Надёжная упаковка под любой тип товара. Цена зависит от объёма и вида упаковки', tone: 'ink' },
  { Icon: ShoppingCart, name: 'Выкуп товара', price: 'от 3%', desc: 'Выкупаем с любого китайского маркетплейса без китайской карты и аккаунта', tone: 'coral' },
  { Icon: Camera, name: 'Фото со склада', price: 'Бесплатно', desc: 'До 5 фото вашего товара на нашем складе в Китае перед отправкой', tone: 'green' },
  { Icon: Boxes, name: 'Консолидация', price: 'Бесплатно', desc: 'Объединяем несколько заказов из разных магазинов в одну посылку', tone: 'green' },
];

export default function Tariffs() {
  return (
    <section id="tariffs" className="tp-section">
      <div className="tp-mesh tp-mesh--green tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--coral tp-mesh--bl" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            Тарифы
          </span>
          <h2 className="tp-h2">
            Стоимость <span className="tp-gradient-text">доставки</span>
          </h2>
          <p className="tp-lede">
            Прозрачные тарифы без скрытых платежей. Цена зависит от веса, габаритов и типа товара
          </p>
        </div>

        <div className="tar__grid">
          <div className="tp-card tar__block">
            <div className="tar__head">
              <div className="tp-icon-tile tp-icon-tile--coral"><Truck size={20} strokeWidth={2.3} /></div>
              <div>
                <h3 className="tar__title">Автодоставка</h3>
                <p className="tar__sub">Выгодная цена · Минимальный вес 5 кг</p>
              </div>
            </div>
            <div className="tar__rows">
              {AUTO_ROWS.map((row, i) => (
                <div key={i} className="tar__row">
                  <div>
                    <div className="tar__routeName">{row.route}</div>
                    <div className="tar__routeMeta">{row.note} · {row.time}</div>
                  </div>
                  <div className={`tar__price${row.price === 'Скоро' ? ' tar__price--soon' : ''}`}>
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tp-card tar__block">
            <div className="tar__head">
              <div className="tp-icon-tile tp-icon-tile--green"><Plane size={20} strokeWidth={2.3} /></div>
              <div>
                <h3 className="tar__title">Авиадоставка</h3>
                <p className="tar__sub">Когда нужно быстро · Экспресс за 3–5 дней</p>
              </div>
            </div>
            <div className="tar__rows">
              {AIR_ROWS.map((row, i) => (
                <div key={i} className="tar__row">
                  <div>
                    <div className="tar__routeName">{row.route}</div>
                    <div className="tar__routeMeta">{row.note} · {row.time}</div>
                  </div>
                  <div className="tar__price tar__price--air">{row.price}</div>
                </div>
              ))}
            </div>
            <div className="tar__hint">
              <Lightbulb size={16} strokeWidth={2.3} />
              Точная стоимость рассчитывается индивидуально — напишите нам, ответим за несколько минут
            </div>
          </div>

          <div className="tp-card tar__block tar__services">
            <div className="tar__head">
              <div className="tp-icon-tile tp-icon-tile--ink"><Boxes size={20} strokeWidth={2.3} /></div>
              <h3 className="tar__title">Дополнительные услуги</h3>
            </div>
            <div className="tar__servicesGrid">
              {SERVICES.map((svc) => (
                <div key={svc.name} className="tar__svc">
                  <div className={`tp-icon-tile tp-icon-tile--${svc.tone} tar__svcIcon`}>
                    <svc.Icon size={18} strokeWidth={2.3} />
                  </div>
                  <div className="tar__svcPrice">{svc.price}</div>
                  <div className="tar__svcName">{svc.name}</div>
                  <div className="tar__svcDesc">{svc.desc}</div>
                </div>
              ))}
            </div>
            <a
              href="https://t.me/taopostmaneger?start=site"
              target="_blank"
              rel="noopener noreferrer"
              className="tp-btn tp-btn--primary tar__cta"
            >
              <Send size={18} strokeWidth={2.5} />
              Рассчитать стоимость
            </a>
          </div>
        </div>

        <div className="tar__notice">
          <Info size={16} strokeWidth={2.3} />
          Стоимость доставки рассчитывается по фактическому или объёмному весу — в зависимости от того, какой больше.
          Товары, запрещённые к ввозу в РФ, не принимаем.
        </div>
      </div>

      <style jsx>{`
        .tar__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .tar__block { padding: 28px; }
        .tar__services { grid-column: 1 / -1; }

        .tar__head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }
        .tar__title {
          font-size: 19px;
          font-weight: 800;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.3px;
        }
        .tar__sub {
          font-size: 13px;
          color: var(--text-muted);
          margin: 3px 0 0;
        }

        .tar__rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tar__row {
          background: #F9FAFB;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #F3F4F6;
          gap: 12px;
        }
        .tar__routeName {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
        }
        .tar__routeMeta {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .tar__price {
          font-size: 13px;
          font-weight: 800;
          color: var(--green-dark);
          background: rgba(27,158,126,0.10);
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
          border: 1px solid rgba(27,158,126,0.18);
        }
        .tar__price--air {
          color: var(--coral-dark);
          background: rgba(255,107,71,0.10);
          border-color: rgba(255,107,71,0.22);
        }
        .tar__price--soon {
          color: #9CA3AF;
          background: #F3F4F6;
          border-color: #E5E7EB;
        }

        .tar__hint {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 16px;
          padding: 14px 16px;
          background: rgba(255,107,71,0.08);
          border: 1px solid rgba(255,107,71,0.18);
          border-radius: 12px;
          font-size: 13px;
          color: var(--coral-dark);
          font-weight: 500;
          line-height: 1.5;
        }
        .tar__hint :global(svg) { flex-shrink: 0; margin-top: 1px; }

        .tar__servicesGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .tar__svc {
          background: #F9FAFB;
          border: 1px solid #F3F4F6;
          border-radius: 16px;
          padding: 18px;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .tar__svc:hover {
          transform: translateY(-3px);
          border-color: rgba(27,158,126,0.22);
          box-shadow: 0 12px 28px -14px rgba(10,15,28,0.15);
        }
        .tar__svcIcon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .tar__svcPrice {
          font-size: 16px;
          font-weight: 900;
          color: var(--ink);
          letter-spacing: -0.3px;
          margin-bottom: 4px;
        }
        .tar__svcName {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .tar__svcDesc {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .tar__cta { margin-top: 24px; }

        .tar__notice {
          margin-top: 28px;
          padding: 18px 22px;
          background: #F9FAFB;
          border: 1px solid #F3F4F6;
          border-radius: 16px;
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          justify-content: center;
          text-align: left;
        }
        .tar__notice :global(svg) { flex-shrink: 0; margin-top: 2px; color: var(--green); }

        @media (max-width: 1024px) {
          .tar__servicesGrid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .tar__grid { grid-template-columns: 1fr; }
          .tar__services { grid-column: 1; }
          .tar__servicesGrid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .tar__servicesGrid { grid-template-columns: 1fr; }
          .tar__block { padding: 22px; }
        }
      `}</style>
    </section>
  );
}
