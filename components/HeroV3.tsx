'use client';
import { useState } from 'react';
import { Send, Calculator as CalcIcon, ShieldCheck, Package, MapPin, Plane, Truck, Sparkles, Star, Boxes, Award, Phone, FileCheck2, Shirt, Footprints } from 'lucide-react';

type Segment = {
  id: 'clothing' | 'sneakers' | 'wholesale';
  label: string;
  Icon: typeof Shirt;
  mp: string;
  mpSlug: string;
  mpColor: string;
  subtitle: string;
  cardTag: string;
  cardBadge: string;
  CardBadgeIcon: typeof Truck;
  priceFrom: string;
  priceUnit: string;
  route: { from: string; to: string };
  cardFoot: string;
  ctaLabel: string;
};

const SEGMENTS: Segment[] = [
  {
    id: 'clothing',
    label: 'Одежда и товары',
    Icon: Shirt,
    mp: 'Taobao',
    mpSlug: 'taobao',
    mpColor: '#ff4400',
    subtitle: 'Выкупаем и доставляем одежду, аксессуары и электронику с Taobao, Pinduoduo, Tmall. До вашего города — или прямо до двери.',
    cardTag: 'Авто · Taobao',
    cardBadge: 'Гуанчжоу',
    CardBadgeIcon: Truck,
    priceFrom: '350',
    priceUnit: '₽/кг',
    route: { from: 'Гуанчжоу', to: 'Москва' },
    cardFoot: '15–25 дней · от 5 кг · с отслеживанием',
    ctaLabel: 'Заказать с Taobao',
  },
  {
    id: 'sneakers',
    label: 'Кроссовки и бренды',
    Icon: Footprints,
    mp: 'Poizon',
    mpSlug: 'poizon',
    mpColor: '#1a1a2e',
    subtitle: 'Оригинальные кроссовки и брендовая одежда с Poizon (得物). С проверкой подлинности, от 1 пары, авиа за 3-5 дней.',
    cardTag: 'Авиа · Poizon',
    cardBadge: 'От 1 пары',
    CardBadgeIcon: Plane,
    priceFrom: '2 700',
    priceUnit: '₽/кг',
    route: { from: 'Гуанчжоу', to: 'Москва' },
    cardFoot: '3–5 дней авиа · от 1 пары · аутентификация',
    ctaLabel: 'Заказать с Poizon',
  },
  {
    id: 'wholesale',
    label: 'Опт с 1688',
    Icon: Boxes,
    mp: '1688',
    mpSlug: '1688',
    mpColor: '#ff6600',
    subtitle: 'Оптовые партии напрямую с фабрик Китая через 1688. Контроль качества, документы для бизнеса, консолидация заказов.',
    cardTag: 'Опт · 1688',
    cardBadge: 'Иу/Гуанчжоу',
    CardBadgeIcon: Truck,
    priceFrom: '350',
    priceUnit: '₽/кг',
    route: { from: 'Иу', to: 'Москва' },
    cardFoot: '15–25 дней · от 50 шт · фото-отчёт',
    ctaLabel: 'Опт с 1688',
  },
];

const TRUST = [
  { Icon: FileCheck2, text: 'Лицензия КНР' },
  { Icon: ShieldCheck, text: 'Без предоплаты' },
  { Icon: Package, text: 'Отслеживание' },
  { Icon: Sparkles, text: 'Страховка груза' },
];

const STATS = [
  { Icon: Boxes, value: '200 000+', label: 'Посылок доставлено', accent: '#005C43' },
  { Icon: Award, value: '6+ лет', label: 'На рынке КНР → РФ', accent: '#FF5A47' },
  { Icon: Star, value: '4.9 / 5', label: 'Рейтинг клиентов', accent: '#F59E0B' },
];

export default function HeroV3() {
  const [activeId, setActiveId] = useState<Segment['id']>('clothing');
  const seg = SEGMENTS.find((s) => s.id === activeId) || SEGMENTS[0];
  const BadgeIcon = seg.CardBadgeIcon;

  return (
    <section className="hero3">
      <div className="hero3__mesh hero3__mesh--green" />
      <div className="hero3__mesh hero3__mesh--coral" />
      <div className="hero3__grid" />

      <div className="hero3__container">
        <div className="hero3__layout">
          <div className="hero3__copy">
            <span className="hero3__pill">
              <span className="hero3__pillDot" />
              Лицензия КНР · Собственный склад в Гуанчжоу
            </span>

            <h1 className="hero3__title">
              Товары из Китая<br />
              <span className="hero3__titleAccent">дешевле до&nbsp;60%</span>
            </h1>

            <div className="hero3__chips" role="tablist" aria-label="Что вы хотите заказать">
              {SEGMENTS.map((s) => {
                const Icon = s.Icon;
                const active = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveId(s.id)}
                    className={`hero3__chip${active ? ' hero3__chip--active' : ''}`}
                    data-ym-goal="hero_segment_click"
                    data-ym-params={`{"segment":"${s.id}"}`}
                  >
                    <Icon size={16} strokeWidth={2.4} />
                    {s.label}
                  </button>
                );
              })}
            </div>

            <p className="hero3__lede">{seg.subtitle}</p>

            <div className="hero3__ctas">
              <a
                href={`/${seg.mpSlug}`}
                className="hero3__btn hero3__btn--primary"
                data-ym-goal="hero_segment_cta_click"
                data-ym-params={`{"segment":"${seg.id}","slug":"${seg.mpSlug}"}`}
              >
                <Send size={18} strokeWidth={2.5} />
                {seg.ctaLabel} →
              </a>
              <a
                href="tel:+79772767778"
                className="hero3__btn hero3__btn--ghost"
                data-ym-goal="phone_click"
                data-ym-params='{"place":"hero"}'
              >
                <Phone size={18} strokeWidth={2.5} />
                Позвонить
              </a>
              <a
                href="#calculator"
                className="hero3__btn hero3__btn--link"
                data-ym-goal="scroll_to_calculator"
                data-ym-params='{"place":"hero"}'
              >
                <CalcIcon size={16} strokeWidth={2.5} />
                Рассчитать стоимость
              </a>
            </div>

            <div className="hero3__trust">
              {TRUST.map(({ Icon, text }) => (
                <span key={text} className="hero3__trustItem">
                  <Icon size={16} strokeWidth={2.2} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="hero3__visual">
            <div className="hero3__card hero3__card--main" key={seg.id}>
              <div className="hero3__cardHead">
                <span className="hero3__cardTag" style={{ color: seg.mpColor }}>{seg.cardTag}</span>
                <span className="hero3__cardBadge">
                  <BadgeIcon size={14} strokeWidth={2.5} />
                  {seg.cardBadge}
                </span>
              </div>
              <div className="hero3__price">
                <span className="hero3__priceFrom">от</span>
                <span className="hero3__priceValue">{seg.priceFrom}</span>
                <span className="hero3__priceCur">{seg.priceUnit}</span>
              </div>
              <div className="hero3__route">
                <div className="hero3__routePoint">
                  <MapPin size={14} strokeWidth={2.5} />
                  {seg.route.from}
                </div>
                <div className="hero3__routeLine">
                  <span className="hero3__routeDot" />
                  <span className="hero3__routeDot" />
                  <span className="hero3__routeDot" />
                </div>
                <div className="hero3__routePoint hero3__routePoint--end">
                  <MapPin size={14} strokeWidth={2.5} />
                  {seg.route.to}
                </div>
              </div>
              <div className="hero3__cardFoot">{seg.cardFoot}</div>
            </div>

            <div className="hero3__card hero3__card--avia">
              <div className="hero3__aviaIcon">
                <Plane size={20} strokeWidth={2.3} />
              </div>
              <div>
                <div className="hero3__aviaTitle">Авиа от 2 700 ₽/кг</div>
                <div className="hero3__aviaSub">3–5 дней</div>
              </div>
            </div>

            <div className="hero3__card hero3__card--save">
              <div className="hero3__saveValue">−60%</div>
              <div className="hero3__saveLabel">к розничной цене в РФ</div>
            </div>
          </div>
        </div>

        <div className="hero3__stats">
          {STATS.map(({ Icon, value, label, accent }) => (
            <div key={label} className="hero3__stat">
              <div className="hero3__statIcon" style={{ color: accent, background: `${accent}14` }}>
                <Icon size={20} strokeWidth={2.3} />
              </div>
              <div className="hero3__statBody">
                <div className="hero3__statValue" style={{ color: accent }}>{value}</div>
                <div className="hero3__statLabel">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero3 {
          position: relative;
          min-height: 100vh;
          padding: 120px 24px 60px;
          overflow: hidden;
          background: #fff;
          isolation: isolate;
        }
        .hero3__mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.65;
        }
        .hero3__mesh--green {
          top: -180px; right: -120px;
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(0, 92, 67,0.35), transparent 65%);
        }
        .hero3__mesh--coral {
          bottom: -200px; left: -140px;
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(255, 90, 71,0.30), transparent 65%);
        }
        .hero3__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(10,15,28,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,15,28,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 45%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 45%, transparent 75%);
          z-index: -1;
          pointer-events: none;
        }

        .hero3__container {
          max-width: 1440px; margin: 0 auto; width: 100%;
          position: relative;
        }
        .hero3__layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 64px;
          align-items: center;
        }

        .hero3__pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: #004232;
          background: rgba(0, 92, 67,0.08);
          border: 1px solid rgba(0, 92, 67,0.18);
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
        }
        .hero3__pillDot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #005C43;
          box-shadow: 0 0 0 4px rgba(0, 92, 67,0.18);
        }
        .hero3__title {
          font-size: clamp(40px, 5.6vw, 76px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -2px;
          color: #0A0F1C;
          margin: 0 0 22px;
        }
        .hero3__titleAccent {
          background: #005C43;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero3__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 22px;
        }
        .hero3__chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          color: #4B5563;
          background: #fff;
          border: 1.5px solid #E5E7EB;
          cursor: pointer;
          transition: color .15s, background .15s, border-color .15s, transform .15s;
          font-family: inherit;
        }
        .hero3__chip:hover {
          border-color: #005C43;
          color: #005C43;
          transform: translateY(-1px);
        }
        .hero3__chip--active {
          background: #005C43;
          color: #fff;
          border-color: #005C43;
          box-shadow: 0 6px 18px -6px rgba(0,92,67,0.45);
        }
        .hero3__chip--active :global(svg) { color: #fff; }

        .hero3__lede {
          font-size: 18px;
          line-height: 1.55;
          color: #4B5563;
          max-width: 540px;
          margin: 0 0 28px;
          min-height: 80px;
        }

        .hero3__ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .hero3__btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
          will-change: transform;
        }
        .hero3__btn--primary {
          background: #FF5A47;
          color: #fff;
          box-shadow: 0 12px 30px -10px rgba(255, 90, 71,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
        }
        .hero3__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 38px -10px rgba(255, 90, 71,0.65), inset 0 -2px 0 rgba(0,0,0,0.12);
        }
        .hero3__btn--ghost {
          background: #fff;
          color: #0A0F1C;
          border: 1.5px solid #E5E7EB;
        }
        .hero3__btn--ghost:hover {
          border-color: #005C43;
          color: #005C43;
          transform: translateY(-2px);
        }
        .hero3__btn--link {
          background: transparent;
          color: #4B5563;
          padding: 14px 18px;
          font-size: 15px;
          font-weight: 600;
        }
        .hero3__btn--link:hover {
          color: #005C43;
        }

        .hero3__trust {
          display: flex; gap: 22px; flex-wrap: wrap;
        }
        .hero3__trustItem {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13.5px; color: #4B5563; font-weight: 500;
        }
        .hero3__trustItem :global(svg) { color: #005C43; }

        .hero3__visual {
          position: relative;
          height: 480px;
        }
        .hero3__card {
          position: absolute;
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(10,15,28,0.05);
          box-shadow:
            0 1px 2px rgba(10,15,28,0.04),
            0 24px 60px -20px rgba(10,15,28,0.12);
        }
        .hero3__card--main {
          top: 40px; left: 0; right: 60px;
          padding: 28px;
          z-index: 2;
          animation: heroCardFade .35s ease;
        }
        @keyframes heroCardFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero3__cardHead {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 18px;
        }
        .hero3__cardTag {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
        }
        .hero3__cardBadge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px; border-radius: 999px;
          background: rgba(0, 92, 67,0.1); color: #004232;
          font-size: 12px; font-weight: 600;
        }
        .hero3__price {
          display: flex; align-items: baseline; gap: 6px;
          margin-bottom: 22px;
        }
        .hero3__priceFrom { font-size: 16px; color: #6B7280; font-weight: 500; }
        .hero3__priceValue {
          font-size: 64px; font-weight: 700; line-height: 1;
          color: #0A0F1C; letter-spacing: -2px;
        }
        .hero3__priceCur { font-size: 18px; color: #6B7280; font-weight: 700; }

        .hero3__route {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          background: #F9FAFB; border-radius: 14px;
          margin-bottom: 14px;
        }
        .hero3__routePoint {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #0A0F1C;
        }
        .hero3__routePoint :global(svg) { color: #FF5A47; }
        .hero3__routePoint--end :global(svg) { color: #005C43; }
        .hero3__routeLine {
          flex: 1; display: flex; justify-content: space-between;
          padding: 0 6px;
        }
        .hero3__routeDot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #D1D5DB;
        }
        .hero3__cardFoot { font-size: 13px; color: #6B7280; }

        .hero3__card--avia {
          bottom: 60px; right: 0;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          z-index: 3;
        }
        .hero3__aviaIcon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #FF5A47, #E54632);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px -6px rgba(255, 90, 71,0.5);
        }
        .hero3__aviaTitle { font-size: 15px; font-weight: 700; color: #0A0F1C; }
        .hero3__aviaSub { font-size: 12px; color: #6B7280; margin-top: 2px; }

        .hero3__card--save {
          top: 0; right: 20px;
          padding: 16px 20px;
          z-index: 3;
          background: linear-gradient(135deg, #0A0F1C 0%, #1F2937 100%);
          color: #fff;
          border: none;
        }
        .hero3__saveValue {
          font-size: 28px; font-weight: 700; letter-spacing: -1px;
          background: #005C43;
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero3__saveLabel { font-size: 11px; color: #9CA3AF; margin-top: 2px; font-weight: 500; }

        .hero3__stats {
          margin-top: 80px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 28px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(10,15,28,0.06);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px -10px rgba(10,15,28,0.08);
        }
        .hero3__stat {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
        }
        .hero3__statIcon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hero3__statBody { text-align: left; }
        .hero3__statValue {
          font-size: clamp(22px, 2.6vw, 32px);
          font-weight: 700; letter-spacing: -1px; line-height: 1;
        }
        .hero3__statLabel {
          font-size: 13px; color: #6B7280; font-weight: 500;
          margin-top: 6px;
        }

        @media (max-width: 960px) {
          .hero3 { padding: 100px 20px 40px; min-height: auto; }
          .hero3__layout { grid-template-columns: 1fr; gap: 48px; }
          .hero3__visual { height: 440px; max-width: 480px; margin: 0 auto; width: 100%; }
          .hero3__card--main { right: 40px; }
          .hero3__lede { min-height: 0; }
        }
        @media (max-width: 560px) {
          .hero3__visual { height: 420px; }
          .hero3__card--main { padding: 22px; right: 30px; }
          .hero3__priceValue { font-size: 52px; }
          .hero3__card--avia { padding: 14px 16px; }
          .hero3__card--save { padding: 12px 16px; right: 12px; }
          .hero3__saveValue { font-size: 22px; }
          .hero3__stats { grid-template-columns: 1fr; padding: 20px; margin-top: 60px; }
          .hero3__ctas { flex-direction: column; }
          .hero3__btn { justify-content: center; }
          .hero3__chips { gap: 6px; }
          .hero3__chip { font-size: 13px; padding: 8px 12px; }
        }
      `}</style>
    </section>
  );
}
