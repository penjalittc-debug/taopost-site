'use client';
import Link from 'next/link';
import { Boxes, Factory, FileCheck2, Truck, ArrowRight, BadgeCheck } from 'lucide-react';

const POINTS = [
  {
    Icon: Factory,
    title: 'Опт напрямую с 1688',
    text: 'Помогаем найти производителя, договориться о цене и партии. Работаем с фабриками Гуанчжоу, Иу, Шэньчжэня.',
  },
  {
    Icon: Boxes,
    title: 'Минимальные партии',
    text: 'От 1 пары на пробу — берём небольшой образец, проверяем качество, потом расширяем заказ.',
  },
  {
    Icon: FileCheck2,
    title: 'Сертификация и документы',
    text: 'Договор, инвойс, упаковочный лист, сертификаты соответствия и пожарной безопасности — для импорта и маркетплейсов РФ.',
  },
  {
    Icon: Truck,
    title: 'Свой логист и менеджер',
    text: 'Контейнерные перевозки, консолидация партий, отслеживание на каждом этапе. Выделенный менеджер ведёт сделку от и до.',
  },
];

export default function B2B() {
  return (
    <section id="b2b" className="b2b">
      <div className="b2b__container">
        <div className="b2b__head">
          <span className="b2b__eyebrow">
            <BadgeCheck size={14} strokeWidth={2.5} />
            Для бизнеса
          </span>
          <h2 className="b2b__title">
            Оптовые закупки <span className="b2b__accent">в Китае под ключ</span>
          </h2>
          <p className="b2b__lede">
            Помогаем предпринимателям и бизнесу импортировать партии напрямую с фабрик —
            от поиска поставщика до растаможки и доставки до склада в РФ.
          </p>
        </div>

        <div className="b2b__grid">
          {POINTS.map(({ Icon, title, text }) => (
            <div key={title} className="b2b__card">
              <div className="b2b__icon">
                <Icon size={22} strokeWidth={2.3} />
              </div>
              <h3 className="b2b__cardTitle">{title}</h3>
              <p className="b2b__cardText">{text}</p>
            </div>
          ))}
        </div>

        <div className="b2b__cta">
          <div className="b2b__ctaText">
            <strong>Запросите оптовый расчёт</strong>
            <span>Опишите задачу — пришлём смету по фабрике, логистике и срокам.</span>
          </div>
          <Link
            href="/business"
            className="b2b__btn"
            data-ym-goal="b2b_open_page"
            data-ym-params='{"place":"home"}'
          >
            Подробнее и форма
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .b2b {
          padding: 96px 24px;
          background: #0A0F1C;
          color: #fff;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .b2b::before, .b2b::after {
          content: '';
          position: absolute;
          width: 540px;
          height: 540px;
          border-radius: 50%;
          filter: blur(110px);
          z-index: -1;
        }
        .b2b::before {
          top: -180px;
          right: -160px;
          background: radial-gradient(circle, rgba(0,92,67,0.55), transparent 70%);
        }
        .b2b::after {
          bottom: -200px;
          left: -180px;
          background: radial-gradient(circle, rgba(255,90,71,0.35), transparent 70%);
        }
        .b2b__container {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
        }
        .b2b__head { max-width: 760px; margin: 0 auto 48px; text-align: center; }
        .b2b__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #E5E7EB;
          margin-bottom: 18px;
        }
        .b2b__title {
          font-size: clamp(30px, 4.4vw, 48px);
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.1;
          margin: 0 0 18px;
        }
        .b2b__accent {
          background: linear-gradient(120deg, #FF5A47 20%, #FFB388 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .b2b__lede {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }

        .b2b__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .b2b__card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          transition: border-color .2s ease, transform .2s ease, background .2s ease;
        }
        .b2b__card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,90,71,0.4);
          background: rgba(255,255,255,0.06);
        }
        .b2b__icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,90,71,0.18);
          color: #FFA694;
          margin-bottom: 14px;
        }
        .b2b__cardTitle {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #fff;
        }
        .b2b__cardText {
          font-size: 13.5px;
          color: rgba(255,255,255,0.66);
          line-height: 1.6;
          margin: 0;
        }

        .b2b__cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 26px 32px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 20px;
          flex-wrap: wrap;
        }
        .b2b__ctaText { display: flex; flex-direction: column; gap: 4px; }
        .b2b__ctaText strong {
          font-size: 17px;
          font-weight: 700;
        }
        .b2b__ctaText span {
          font-size: 14px;
          color: rgba(255,255,255,0.62);
        }
        .b2b__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          background: #FF5A47;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 14px 28px -10px rgba(255,90,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.14);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .b2b__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -10px rgba(255,90,71,0.65), inset 0 -2px 0 rgba(0,0,0,0.14);
        }

        @media (max-width: 1080px) {
          .b2b__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .b2b { padding: 72px 18px; }
          .b2b__grid { grid-template-columns: 1fr; }
          .b2b__cta { padding: 22px; }
        }
      `}</style>
    </section>
  );
}
