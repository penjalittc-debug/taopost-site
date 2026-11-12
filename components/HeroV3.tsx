'use client';
import { useState } from 'react';
import { CARGO_MIN_KG, MIN_USD_PER_KG } from '@/lib/cargoTariffs';
import { AIR_DAYS_TEXT, AIR_FROM_RUB, CONSOLIDATED_FROM_RUB } from '@/lib/retailTariff';

const AIR_PRICE = AIR_FROM_RUB.toLocaleString('ru-RU');
import { Calculator as CalcIcon, ShieldCheck, Package, MapPin, Plane, Truck, Sparkles, Star, Boxes, Phone, FileCheck2, Shirt, Footprints, User } from 'lucide-react';

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
  /** Без «от» перед ценой (базовая ставка до 35 кг; лесенка — в cardFoot). */
  priceFixed?: boolean;
  priceUnit: string;
  route: { from: string; to: string };
  cardFoot: string;
  ctaLabel: string;
  /** Куда ведут кнопки: розница — в кабинет и калькулятор, карго — на /kargo-dostavka. */
  cta: { href: string; text: string; external: boolean };
  cta2: { href: string; text: string };
};

const CARGO_RATE = MIN_USD_PER_KG.toLocaleString('ru-RU');
const APP_CTA = { href: 'https://app.taopost.ru/?src=site', text: 'Оформить в личном кабинете', external: true };
const CALC_CTA = { href: '#calculator', text: 'Рассчитать стоимость' };

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
    priceFrom: '450',
    priceFixed: true,
    priceUnit: '₽/кг',
    route: { from: 'Гуанчжоу', to: 'Москва' },
    cardFoot: 'до 35 кг · от 35 кг — 420 ₽ · от 60 кг — 390 ₽',
    ctaLabel: 'Заказать с Taobao',
    cta: APP_CTA,
    cta2: CALC_CTA,
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
    priceFrom: '2 400',
    priceUnit: '₽/кг',
    route: { from: 'Гуанчжоу', to: 'Москва' },
    cardFoot: '3–5 дней авиа · от 1 пары · аутентификация',
    ctaLabel: 'Заказать с Poizon',
    cta: APP_CTA,
    cta2: CALC_CTA,
  },
  {
    // До 06.11.2026 вкладка «Опт с 1688» показывала 450 ₽/кг — оптовик видел
    // розничную цену. Теперь это карго по сетке опта (владелец 12.11: от 50 кг).
    id: 'wholesale',
    label: 'Карго оптом',
    Icon: Boxes,
    mp: '1688',
    mpSlug: '1688',
    mpColor: '#005C43',
    subtitle: `Карго для селлеров и магазинов: груз от ${CARGO_MIN_KG} кг, ставка по плотности, выкуп с 1688 от 3 %, документы для Wildberries и Ozon.`,
    cardTag: `Карго · от ${CARGO_MIN_KG} кг`,
    cardBadge: 'Для бизнеса',
    CardBadgeIcon: Truck,
    priceFrom: CARGO_RATE,
    priceUnit: '$/кг',
    route: { from: 'Гуанчжоу', to: 'Москва' },
    cardFoot: '15–20 дней · по плотности груза · с документами',
    ctaLabel: 'Карго оптом',
    cta: { href: '/kargo-dostavka#calc', text: 'Рассчитать карго', external: false },
    cta2: { href: '/kargo-dostavka', text: 'Тарифы карго' },
  },
];

const TRUST = [
  { Icon: FileCheck2, text: 'Лицензия КНР' },
  { Icon: ShieldCheck, text: 'Без предоплаты' },
  { Icon: Package, text: 'Отслеживание' },
  { Icon: Sparkles, text: 'Гарантия сохранности' },
];

const PHONE_NUMBER = '+7 977 696-77-78';
const PHONE_HREF = 'tel:+79776967778';

const STATS = [
  { Icon: Boxes, value: '200 000+', label: 'Посылок с 2019 года', accent: '#005C43' },
  { Icon: Star, value: '4.9 / 5', label: 'Рейтинг клиентов', accent: '#F59E0B' },
];

export default function HeroV3() {
  const [activeId, setActiveId] = useState<Segment['id']>('clothing');
  const seg = SEGMENTS.find((s) => s.id === activeId) || SEGMENTS[0];
  const isCargo = seg.id === 'wholesale';

  // Четыре цены первого экрана; 'm' — компактно (телефон), 'd' — крупно, с подписью (компьютер).
  const priceTiles = (v: 'm' | 'd') => {
    const cls = (mod: string, on: boolean) =>
      `hero3__tile hero3__tile--${v}${mod ? ` hero3__tile--${mod}` : ''}${on ? ' hero3__tile--on' : ''}`;
    return (
      <>
        <button type="button" onClick={() => setActiveId('clothing')} className={cls('', seg.id === 'clothing')}
          data-ym-goal="hero_segment_click" data-ym-params={`{"segment":"clothing","place":"${v}_tiles"}`}>
          <span>Посылки от 1 кг</span><b>450 ₽/кг</b>
          {v === 'd' && <small>от 35 кг — 420 ₽ · от 60 кг — 390 ₽</small>}
        </button>
        <button type="button" onClick={() => setActiveId('wholesale')} className={cls('cons', isCargo)}
          data-ym-goal="hero_segment_click" data-ym-params={`{"segment":"wholesale","place":"${v}_tiles"}`}>
          <span>Сборные от {CARGO_MIN_KG} кг</span><b>от {CONSOLIDATED_FROM_RUB} ₽/кг</b>
          {v === 'd' && <small>товары от разных продавцов в одной отправке</small>}
        </button>
        <a href="/kargo-dostavka" className={cls('opt', false)}
          data-ym-goal="opt_open_page" data-ym-params={`{"place":"${v}_tiles_cargo"}`}>
          <span>Карго оптом</span><b>от {CARGO_RATE} $/кг</b>
          {v === 'd' && <small>по плотности груза · документы для WB и Ozon →</small>}
        </a>
        <button type="button" onClick={() => setActiveId('sneakers')} className={cls('air', seg.id === 'sneakers')}
          data-ym-goal="hero_segment_click" data-ym-params={`{"segment":"sneakers","place":"${v}_tiles_air"}`}>
          <span>Авиа · {AIR_DAYS_TEXT}</span><b>от {AIR_PRICE} ₽/кг</b>
          {v === 'd' && <small>для срочных и дорогих товаров</small>}
        </button>
      </>
    );
  };

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
              Доставка и карго из Китая —<br />
              <span className="hero3__titleAccent">от 1&nbsp;кг до&nbsp;тонны</span>
            </h1>

            {/* Телефон и узкое окно: те же 4 цены сразу под заголовком (на широком экране — справа). */}
            <div className="hero3__mPrices">{priceTiles('m')}</div>

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
                href={seg.cta.href}
                {...(seg.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hero3__btn hero3__btn--primary"
                data-ym-goal={isCargo ? 'opt_open_page' : 'cabinet_click'}
                data-ym-params={`{"place":"hero","segment":"${seg.id}"}`}
              >
                {isCargo ? <CalcIcon size={18} strokeWidth={2.5} /> : <User size={18} strokeWidth={2.5} />}
                {seg.cta.text}
              </a>
              <a
                href={seg.cta2.href}
                className="hero3__btn hero3__btn--ghost"
                data-ym-goal={isCargo ? 'opt_open_page' : 'scroll_to_calculator'}
                data-ym-params={`{"place":"hero2","segment":"${seg.id}"}`}
              >
                {isCargo ? <Boxes size={18} strokeWidth={2.5} /> : <CalcIcon size={18} strokeWidth={2.5} />}
                {seg.cta2.text}
              </a>
            </div>

            <div className="hero3__trust">
              <a
                href={PHONE_HREF}
                className="hero3__trustItem hero3__trustItem--link"
                data-ym-goal="phone_click"
                data-ym-params='{"place":"hero"}'
              >
                <Phone size={16} strokeWidth={2.5} />
                {PHONE_NUMBER}
              </a>
              {TRUST.map(({ Icon, text }) => (
                <span key={text} className="hero3__trustItem">
                  <Icon size={16} strokeWidth={2.2} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Широкий экран (06.11.2026, владелец: «450 прям в глаза бьёт»): вместо одной
              огромной цены — четыре равных блока: посылки, сборные, карго, авиа. */}
          <div className="hero3__visual">
            <div className="hero3__dPrices">{priceTiles('d')}</div>
            <div className="hero3__dRoute">
              <MapPin size={15} strokeWidth={2.5} /> Гуанчжоу → Москва · авто 2 рейса в неделю, авиа пн и чт
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
        .hero3__trustItem--link {
          color: #0A0F1C; font-weight: 700; text-decoration: none;
          transition: color .15s ease;
        }
        .hero3__trustItem--link:hover { color: #005C43; }

        .hero3__visual { position: relative; }
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

        .hero3__mPrices { display: none; }
        .hero3__dPrices { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .hero3 :global(.hero3__tile) {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px; text-align: left;
          background: #fff; border: 1.5px solid #E5E7EB; font-family: inherit; cursor: pointer;
          text-decoration: none; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .hero3 :global(.hero3__tile:hover) { transform: translateY(-3px); }
        .hero3 :global(.hero3__tile span) { font-weight: 600; color: #6B7280; }
        .hero3 :global(.hero3__tile b) { font-weight: 700; letter-spacing: -0.5px; color: #0A0F1C; white-space: nowrap; }
        .hero3 :global(.hero3__tile small) { font-size: 13px; line-height: 1.4; color: #6B7280; font-weight: 500; }
        .hero3 :global(.hero3__tile--m) { padding: 12px 14px; border-radius: 16px; }
        .hero3 :global(.hero3__tile--m span) { font-size: 12px; }
        .hero3 :global(.hero3__tile--m b) { font-size: clamp(17px, 5.2vw, 22px); }
        .hero3 :global(.hero3__tile--d) {
          padding: 24px 22px; border-radius: 22px; min-height: 172px;
          box-shadow: 0 1px 2px rgba(10,15,28,0.04), 0 24px 60px -24px rgba(10,15,28,0.14);
        }
        .hero3 :global(.hero3__tile--d span) { font-size: 14px; }
        .hero3 :global(.hero3__tile--d b) { font-size: clamp(30px, 2.8vw, 42px); line-height: 1.1; margin: 4px 0 6px; }
        .hero3 :global(.hero3__tile--cons) { background: #0A0F1C; border-color: #0A0F1C; }
        .hero3 :global(.hero3__tile--cons span), .hero3 :global(.hero3__tile--cons small) { color: #9CA3AF; }
        .hero3 :global(.hero3__tile--cons b) { color: #5DCAA5; }
        .hero3 :global(.hero3__tile--opt) { background: #E8F7F3; border-color: #C6EDE4; }
        .hero3 :global(.hero3__tile--opt span), .hero3 :global(.hero3__tile--opt small) { color: #004232; }
        .hero3 :global(.hero3__tile--opt b) { color: #005C43; }
        .hero3 :global(.hero3__tile--air) { background: #FFF1EE; border-color: #FFD9D2; }
        .hero3 :global(.hero3__tile--air span), .hero3 :global(.hero3__tile--air small) { color: #B23A2A; }
        .hero3 :global(.hero3__tile--air b) { color: #E54632; }
        .hero3 :global(.hero3__tile--on) { border-color: #005C43; box-shadow: 0 0 0 2px rgba(0,92,67,0.25); }
        .hero3__dRoute {
          display: flex; align-items: center; gap: 8px; margin-top: 16px; padding: 12px 16px;
          border-radius: 14px; background: #F9FAFB; font-size: 13.5px; font-weight: 600; color: #374151;
        }
        .hero3__dRoute :global(svg) { color: #005C43; }
        .hero3__card--alt {
          top: -8px; right: 0;
          padding: 16px 20px;
          z-index: 3;
          background: #0A0F1C;
          color: #fff;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          transition: transform .2s ease;
        }
        .hero3__card--alt:hover { transform: translateY(-3px); }
        .hero3__altLabel { font-size: 12px; color: #9CA3AF; font-weight: 600; }
        .hero3__altValue {
          font-size: 30px; font-weight: 700; letter-spacing: -1px; line-height: 1.1; color: #5DCAA5; margin: 4px 0 2px;
        }
        .hero3__altValue small { font-size: 14px; font-weight: 500; color: #9CA3AF; letter-spacing: 0; }
        .hero3__altValue span { font-size: 15px; letter-spacing: 0; }
        .hero3__altMore { font-size: 12px; color: #D1D5DB; font-weight: 500; }

        .hero3__stats {
          margin-top: 80px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
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
        @media (max-width: 960px) {
          .hero3__mPrices { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: -6px 0 20px; }
          .hero3__visual { display: none; }
        }
        @media (max-width: 560px) {
          .hero3__visual { height: 420px; }
          .hero3__card--main { padding: 22px; right: 30px; }
          .hero3__priceValue { font-size: 52px; }
          .hero3__card--avia { padding: 14px 16px; }
          .hero3__card--alt { padding: 12px 16px; right: 8px; }
          .hero3__altValue { font-size: 24px; }
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
