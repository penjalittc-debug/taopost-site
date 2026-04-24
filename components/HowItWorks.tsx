'use client';
import { ShoppingCart, CreditCard, Warehouse, Truck, PackageCheck, CheckCircle2, type LucideIcon } from 'lucide-react';

type Step = {
  number: string;
  Icon: LucideIcon;
  title: string;
  tile: 'coral' | 'green' | 'ink';
  description: string | null;
  options: { label: string; text: string }[] | null;
};

const STEPS: Step[] = [
  {
    number: '01',
    Icon: ShoppingCart,
    title: 'Оформление покупки',
    tile: 'coral',
    description: null,
    options: [
      {
        label: 'Самостоятельный выкуп',
        text: 'Создайте заявку через «Добавить выкуп». Укажите трек-номер, прикрепите фото и ссылку. Как только груз поступит на склад — вы получите уведомление.',
      },
      {
        label: 'Выкуп через нас',
        text: 'Нет Alipay или WeChat Pay? Нажмите «Заявка на выкуп», вставьте ссылку, укажите название, количество и цену — мы выкупим сами.',
      },
    ],
  },
  {
    number: '02',
    Icon: CreditCard,
    title: 'Расчёт и оплата',
    tile: 'green',
    description: 'Рассчитаем итоговую стоимость товара и логистики. Оплата любым удобным способом — банковской картой или переводом.',
    options: null,
  },
  {
    number: '03',
    Icon: Warehouse,
    title: 'Склад и консолидация',
    tile: 'ink',
    description: 'Вы полностью контролируете товары в приложении. Объединяйте несколько заказов в один ящик или разделяйте их для отправки в разные пункты.',
    options: null,
  },
  {
    number: '04',
    Icon: Truck,
    title: 'Доставка в РФ и Беларусь',
    tile: 'coral',
    description: 'После подтверждения отправляем груз. Средний срок — 15–20 дней, максимальный — до 25 дней.',
    options: null,
  },
  {
    number: '05',
    Icon: PackageCheck,
    title: 'Получение и доставка до адреса',
    tile: 'green',
    description: 'Когда груз прибудет в Россию — вы получите уведомление. Оформите доставку до конечного адреса прямо в приложении.',
    options: null,
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="tp-section">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--green tp-mesh--bl" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            Процесс
          </span>
          <h2 className="tp-h2">
            Как сделать <span className="tp-gradient-text">заказ</span>
          </h2>
          <p className="tp-lede">
            5 простых шагов — от выбора товара до получения посылки у вас дома
          </p>
        </div>

        <div className="hiw__rows">
          <div className="hiw__row hiw__row--3">
            {STEPS.slice(0, 3).map((step) => <StepCard key={step.number} step={step} />)}
          </div>
          <div className="hiw__row hiw__row--2">
            {STEPS.slice(3).map((step) => <StepCard key={step.number} step={step} />)}
          </div>
        </div>

        <div className="hiw__note">
          {[
            'Без предоплаты за выкуп',
            'Трекинг на каждом этапе',
            'Поддержка в Telegram',
          ].map((text) => (
            <span key={text} className="hiw__noteItem">
              <CheckCircle2 size={18} strokeWidth={2.5} />
              {text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hiw__rows {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hiw__row {
          display: grid;
          gap: 24px;
        }
        .hiw__row--3 { grid-template-columns: repeat(3, 1fr); }
        .hiw__row--2 {
          grid-template-columns: repeat(2, 1fr);
          max-width: 820px;
          margin: 0 auto;
          width: 100%;
        }

        .hiw__note {
          margin-top: 56px;
          display: flex;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .hiw__noteItem {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          font-weight: 600;
          color: #374151;
        }
        .hiw__noteItem :global(svg) { color: var(--green); }

        @media (max-width: 900px) {
          .hiw__row--3, .hiw__row--2 {
            grid-template-columns: 1fr;
            max-width: 560px;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  const tileClass = `tp-icon-tile tp-icon-tile--${step.tile}`;
  return (
    <div className="tp-card tp-card--hover hiw__card">
      <div className="hiw__head">
        <div className={tileClass}>
          <step.Icon size={22} strokeWidth={2.3} />
        </div>
        <span className="hiw__num">{step.number}</span>
      </div>

      <h3 className="hiw__title">{step.title}</h3>

      {step.description && <p className="hiw__desc">{step.description}</p>}

      {step.options && (
        <div className="hiw__options">
          {step.options.map((opt) => (
            <div key={opt.label} className="hiw__option">
              <div className="hiw__optLabel">{opt.label}</div>
              <div className="hiw__optText">{opt.text}</div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .hiw__card {
          padding: 28px 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hiw__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .hiw__num {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          background: linear-gradient(135deg, rgba(27,158,126,0.15), rgba(255,107,71,0.15));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hiw__title {
          font-size: 18px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 10px;
          letter-spacing: -0.3px;
        }
        .hiw__desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }
        .hiw__options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hiw__option {
          background: #F9FAFB;
          border-radius: 12px;
          padding: 12px 14px;
          border-left: 3px solid var(--coral);
        }
        .hiw__optLabel {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .hiw__optText {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
