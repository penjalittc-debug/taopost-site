'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star, Quote, PlayCircle, ImageIcon } from 'lucide-react';
import { REVIEWS } from '@/lib/reviews';

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
            Реальные истории клиентов, которые уже заказывают с нами из Китая
          </p>
        </div>

        <div className="rev__grid">
          {getVisible().map((review, i) => (
            <div key={i} className="tp-card rev__card">
              <Quote size={28} strokeWidth={2.3} className="rev__quote" />
              <Stars count={review.rating} />
              <p className="rev__text">{review.text}</p>

              {(review.screenshot || review.video) && (
                <div className="rev__media">
                  {review.video ? (
                    <a
                      href={review.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rev__mediaBtn"
                      aria-label="Видео-отзыв"
                    >
                      <PlayCircle size={18} strokeWidth={2.2} />
                      Видео-отзыв
                    </a>
                  ) : null}
                  {review.screenshot ? (
                    <a
                      href={review.screenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rev__mediaThumb"
                      aria-label="Скриншот переписки / фото посылки"
                    >
                      <Image
                        src={review.screenshot}
                        alt={`Скриншот отзыва от ${review.name}`}
                        width={120}
                        height={120}
                        sizes="120px"
                      />
                      <span className="rev__mediaThumbIcon">
                        <ImageIcon size={14} strokeWidth={2.5} />
                      </span>
                    </a>
                  ) : null}
                </div>
              )}

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
          color: rgba(255, 90, 71,0.22);
        }

        .rev__text {
          font-size: 15px;
          color: #374151;
          line-height: 1.65;
          margin: 14px 0 18px;
        }

        .rev__media {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .rev__mediaBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 10px;
          background: rgba(255, 90, 71, 0.10);
          color: var(--coral);
          font-size: 12.5px;
          font-weight: 700;
          text-decoration: none;
          transition: background .2s;
        }
        .rev__mediaBtn:hover { background: rgba(255, 90, 71, 0.18); }
        .rev__mediaThumb {
          position: relative;
          display: block;
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #F3F4F6;
        }
        .rev__mediaThumb :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rev__mediaThumbIcon {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: rgba(10,15,28,0.78);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
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
          font-weight: 700;
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
          background: rgba(0, 92, 67,0.08);
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
          background: var(--green);
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
