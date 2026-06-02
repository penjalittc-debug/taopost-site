'use client';
import Image from 'next/image';
import { CalendarDays, Globe2, Package, Warehouse } from 'lucide-react';

const STATS = [
  { value: '6+', label: 'лет на рынке', Icon: CalendarDays },
  { value: '200 000+', label: 'посылок в год', Icon: Package },
  { value: 'Гуанчжоу', label: 'собственный склад в Китае', Icon: Warehouse },
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
                <strong>Прозрачные цены.</strong> Тариф 350 ₽/кг (авто) — фиксированный.
                Без скрытых комиссий за выкуп.
              </li>
              <li>
                <strong>Поддержка 24/7.</strong> Менеджер на связи в Telegram —
                ответ в течение 5 минут.
              </li>
            </ul>
          </div>
        </div>

        <div className="abt__cert">
          <a
            className="abt__certThumb"
            href="/certificate.jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть бизнес-лицензию в полном размере"
          >
            <Image
              src="/certificate.jpg"
              alt="Бизнес-лицензия КНР (营业执照) компании 广州亚世名进出口有限公司"
              width={1200}
              height={883}
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <span className="abt__certZoom" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
                <path d="M11 8v6M8 11h6" />
              </svg>
              Открыть полностью
            </span>
          </a>

          <div className="abt__certContent">
            <span className="abt__certBadge">
              <span className="abt__certBadgeDot" />
              营业执照 · Бизнес-лицензия КНР
            </span>
            <h3 className="abt__certTitle">Официально зарегистрированы в Китае</h3>
            <p className="abt__certText">
              TaoPost — это юридическое лицо в КНР с собственной бизнес-лицензией,
              выданной Управлением по надзору за рынком г. Гуанчжоу.
              Все операции на территории Китая проходят легально, через расчётный счёт компании.
            </p>
            <dl className="abt__certFacts">
              <div>
                <dt>Компания</dt>
                <dd>广州亚世名进出口有限公司<br />(Guangzhou Yashiming Import &amp; Export Co., Ltd.)</dd>
              </div>
              <div>
                <dt>Регистрационный код</dt>
                <dd>91440100MAEGJX2C1Y</dd>
              </div>
              <div>
                <dt>Дата регистрации</dt>
                <dd>09.04.2025</dd>
              </div>
              <div>
                <dt>Юридический адрес</dt>
                <dd>Гуанчжоу, район Ливань, ул. Чжаньцянь, 90</dd>
              </div>
            </dl>
            <a
              className="abt__certVerify"
              href="https://www.gsxt.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Проверить в гос. реестре КНР (gsxt.gov.cn) →
            </a>
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
          max-width: 1440px;
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
          font-size: clamp(32px, 4.6vw, 56px);
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

        .abt__cert {
          display: grid;
          grid-template-columns: minmax(280px, 420px) 1fr;
          gap: 36px;
          align-items: center;
          background: linear-gradient(135deg, #FFF8F4 0%, #F0FDF9 100%);
          border: 1px solid #FCE4D6;
          border-radius: 24px;
          padding: 36px;
          margin-bottom: 56px;
        }
        .abt__certThumb {
          position: relative;
          display: block;
          background: #fff;
          border-radius: 14px;
          padding: 10px;
          box-shadow: 0 12px 32px rgba(180, 60, 30, 0.10);
          border: 1px solid rgba(255, 107, 71, 0.18);
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .abt__certThumb img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .abt__certThumb:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(180, 60, 30, 0.18);
        }
        .abt__certZoom {
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: rgba(15, 23, 42, 0.85);
          color: #fff;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity .2s ease;
        }
        .abt__certThumb:hover .abt__certZoom { opacity: 1; }

        .abt__certBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 107, 71, 0.10);
          color: var(--coral);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 16px;
          border: 1px solid rgba(255, 107, 71, 0.22);
        }
        .abt__certBadgeDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--coral);
        }
        .abt__certTitle {
          font-size: 26px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 12px;
          letter-spacing: -0.5px;
          line-height: 1.25;
        }
        .abt__certText {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0 0 22px;
        }
        .abt__certFacts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 24px;
          margin: 0 0 22px;
        }
        .abt__certFacts > div { margin: 0; }
        .abt__certFacts dt {
          font-size: 11.5px;
          color: #6B7280;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 600;
        }
        .abt__certFacts dd {
          font-size: 14px;
          color: var(--ink);
          margin: 0;
          font-weight: 600;
          line-height: 1.45;
        }
        .abt__certVerify {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: var(--green-dark);
          text-decoration: none;
          border-bottom: 1px dashed rgba(15, 109, 92, 0.4);
          padding-bottom: 2px;
          transition: color .15s, border-color .15s;
        }
        .abt__certVerify:hover {
          color: var(--green);
          border-color: var(--green);
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
          .abt__cert {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 28px;
          }
          .abt__certFacts { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .abt { padding: 64px 18px; }
          .abt__textBlock { padding: 22px; }
          .abt__statValue { font-size: 24px; }
          .abt__cert { padding: 22px; border-radius: 20px; }
          .abt__certTitle { font-size: 22px; }
          .abt__certFacts { grid-template-columns: 1fr; gap: 14px; }
          .abt__certZoom { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
