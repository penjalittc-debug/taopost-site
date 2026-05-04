'use client';
import { Building2, Globe2, Package, Users } from 'lucide-react';

const STATS = [
  { value: '6+', label: 'лет на рынке', Icon: Building2 },
  { value: '50 000+', label: 'довольных клиентов', Icon: Users },
  { value: '1,2 млн', label: 'доставленных посылок', Icon: Package },
  { value: '85+', label: 'городов России', Icon: Globe2 },
];

export default function About() {
  return (
    <section id="about" className="abt">
      <div className="abt__container">

        <div className="abt__head">
          <span className="abt__eyebrow">
            <span className="abt__dot" />
            О компании
          </span>
          <h2 className="abt__title">
            TaoPost — ваш партнёр<br />
            <span className="abt__accent">в торговле с Китаем</span>
          </h2>
          <p className="abt__lede">
            Мы официальная карго-компания по доставке товаров из Китая в Россию.
            Работаем с 2019 года, имеем собственный склад в Гуанчжоу и команду
            на двух языках — русском и китайском.
          </p>
        </div>

        <div className="abt__grid">
          <div className="abt__textBlock">
            <h3 className="abt__h3">Что мы делаем</h3>
            <p className="abt__text">
              Помогаем заказывать товары с китайских маркетплейсов — Taobao, Poizon, 1688,
              Pinduoduo, Goofish — без китайской карты, китайского адреса и знания
              языка. Выкупаем товар у продавца, принимаем на наш склад в Гуанчжоу,
              проверяем, упаковываем и доставляем в Россию автомобильным или
              авиа-маршрутом.
            </p>
            <p className="abt__text">
              Работаем с физлицами и бизнесом. Для предпринимателей — оптовые
              закупки на 1688 напрямую от фабрик с минимальной партией и сертификацией.
            </p>
          </div>

          <div className="abt__textBlock">
            <h3 className="abt__h3">Почему нам доверяют</h3>
            <ul className="abt__list">
              <li>
                <strong>Официальная доставка.</strong> Соблюдаем нормы таможенного
                и налогового законодательства РФ. Никаких серых схем.
              </li>
              <li>
                <strong>Собственный склад в Гуанчжоу.</strong> Принимаем товар у
                продавца, делаем фото и проверку перед отправкой.
              </li>
              <li>
                <strong>Прозрачные цены.</strong> Тариф 240 ₽/кг (авто) — фиксированный.
                Без скрытых комиссий за выкуп.
              </li>
              <li>
                <strong>Поддержка 24/7.</strong> Менеджер на связи в Telegram —
                ответ в течение 5 минут.
              </li>
            </ul>
          </div>
        </div>

        <div className="abt__stats">
          {STATS.map((s) => (
            <div key={s.label} className="abt__stat">
              <div className="abt__statIcon">
                <s.Icon size={20} strokeWidth={2.3} />
              </div>
              <div className="abt__statValue">{s.value}</div>
              <div className="abt__statLabel">{s.label}</div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .abt {
          position: relative;
          padding: 96px 24px;
          background: #fff;
        }
        .abt__container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .abt__head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 56px;
        }
        .abt__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(27,158,126,0.08);
          color: var(--green-dark);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 18px;
          border: 1px solid rgba(27,158,126,0.18);
        }
        .abt__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
        }
        .abt__title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 900;
          color: var(--ink);
          margin: 0 0 18px;
          letter-spacing: -1px;
          line-height: 1.15;
        }
        .abt__accent {
          background: linear-gradient(90deg, var(--green), var(--coral));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .abt__lede {
          font-size: 17px;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0;
        }

        .abt__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 56px;
        }
        .abt__textBlock {
          background: #F9FAFB;
          border: 1px solid #F3F4F6;
          border-radius: 20px;
          padding: 32px;
        }
        .abt__h3 {
          font-size: 20px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 14px;
          letter-spacing: -0.3px;
        }
        .abt__text {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .abt__text:last-child { margin-bottom: 0; }
        .abt__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .abt__list li {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          padding-left: 22px;
          position: relative;
          margin-bottom: 12px;
        }
        .abt__list li:last-child { margin-bottom: 0; }
        .abt__list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
        }
        .abt__list strong {
          color: var(--ink);
          font-weight: 700;
        }

        .abt__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .abt__stat {
          background: linear-gradient(160deg, #f0fdf9 0%, #ffffff 100%);
          border: 1px solid #E5F4EE;
          border-radius: 16px;
          padding: 24px 20px;
          text-align: left;
        }
        .abt__statIcon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(27,158,126,0.12);
          color: var(--green-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .abt__statValue {
          font-size: 28px;
          font-weight: 900;
          color: var(--ink);
          letter-spacing: -0.6px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .abt__statLabel {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .abt__grid { grid-template-columns: 1fr; gap: 16px; }
          .abt__stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .abt { padding: 64px 18px; }
          .abt__textBlock { padding: 22px; }
          .abt__statValue { font-size: 24px; }
        }
      `}</style>
    </section>
  );
}
