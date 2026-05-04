'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'Алина М.', city: 'Москва', text: 'Заказывала кроссовки с Poizon — пришли за 18 дней, всё оригинальное, упаковка целая. Очень довольна сервисом!', rating: 5, date: 'март 2026' },
  { name: 'Дмитрий К.', city: 'Санкт-Петербург', text: 'Уже 4-й заказ через TaoPost. Каждый раз всё чётко: трекинг работает, менеджер отвечает быстро. Рекомендую!', rating: 5, date: 'март 2026' },
  { name: 'Сабина Р.', city: 'Казань', text: 'Заказала одежду с Taobao, помогли с выкупом. До Казани доехало за 22 дня. Цены в 2 раза дешевле чем в России.', rating: 5, date: 'февраль 2026' },
  { name: 'Иван Т.', city: 'Екатеринбург', text: 'Быстро, надёжно, недорого. Всё пришло в целости. Буду заказывать ещё!', rating: 5, date: 'февраль 2026' },
  { name: 'Наталья В.', city: 'Новосибирск', text: 'Первый раз заказывала — переживала. Но всё прошло отлично! Менеджер помог разобраться, посылка пришла вовремя.', rating: 5, date: 'январь 2026' },
  { name: 'Артём С.', city: 'Краснодар', text: 'Удобный личный кабинет, всё понятно. Посылка пришла раньше срока. Спасибо команде TaoPost!', rating: 5, date: 'январь 2026' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="rev__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={1.5}
          fill={i < count ? '#FFC93C' : 'transparent'}
          color={i < count ? '#FFC93C' : '#E5E7EB'}
        />
      ))}
      <style jsx>{`
        .rev__stars { display: inline-flex; gap: 3px; }
      `}</style>
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = REVIEWS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(REVIEWS[(current + i) % total]);
    }
    return items;
  };

  return (
    <section id="reviews" className="tp-section tp-section--muted">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--green tp-mesh--bl" />

      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            Отзывы
          </span>
          <h2 className="tp-h2">
            Нам доверяют клиенты<br />
            <span className="tp-gradient-text">по всей России</span>
          </h2>
          <p className="tp-lede">
            Более 200 000 доставленных посылок в год — отзывы наших клиентов
          </p>
        </div>

        <div className="rev__grid">
          {getVisible().map((review, i) => (
            <div key={i} className="tp-card rev__card">
              <Quote size={28} strokeWidth={2.3} className="rev__quote" />
              <Stars count={review.rating} />
              <p className="rev__text">{review.text}</p>
              <div className="rev__foot">
                <div>
                  <div className="rev__name">{review.name}</div>
                  <div className="rev__city">{review.city}</div>
                </div>
                <div className="rev__date">{review.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rev__controls">
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий отзыв"
            className="rev__navBtn"
          >
            <ArrowLeft size={18} strokeWidth={2.3} />
          </button>
          <div className="rev__dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Отзыв ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`rev__dot${i === current ? ' rev__dot--active' : ''}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Следующий отзыв"
            className="rev__navBtn"
          >
            <ArrowRight size={18} strokeWidth={2.3} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .rev__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .rev__card {
          padding: 30px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .rev__card :global(.rev__quote) {
          position: absolute;
          top: 22px;
          right: 22px;
          color: rgba(255,107,71,0.22);
        }

        .rev__text {
          font-size: 15px;
          color: #374151;
          line-height: 1.65;
          margin: 14px 0 22px;
        }
        .rev__foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #F3F4F6;
        }
        .rev__name {
          font-size: 14.5px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.2px;
        }
        .rev__city {
          font-size: 12.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .rev__date {
          font-size: 12px;
          color: #9CA3AF;
          font-weight: 500;
        }

        .rev__controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
        }
        .rev__navBtn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: all .2s ease;
          font-family: inherit;
        }
        .rev__navBtn:hover {
          border-color: var(--green);
          background: rgba(27,158,126,0.08);
          color: var(--green-dark);
          transform: translateY(-2px);
        }

        .rev__dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .rev__dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #D1D5DB;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all .25s ease;
        }
        .rev__dot--active {
          width: 28px;
          background: linear-gradient(90deg, var(--green), var(--coral));
        }

        @media (max-width: 960px) {
          .rev__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .rev__grid { grid-template-columns: 1fr; }
          .rev__card { padding: 26px 22px; }
        }
      `}</style>
    </section>
  );
}
