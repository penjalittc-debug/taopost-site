'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star, Quote, ImageIcon, Play, X } from 'lucide-react';
import { REVIEWS, type Review } from '@/lib/reviews';

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
  const [zoom, setZoom] = useState<Review | null>(null);
  const visible = 3;
  const total = REVIEWS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const closeZoom = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoom, closeZoom]);

  const getVisible = () => {
    const items: Review[] = [];
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
            Более 200 000 доставленных посылок за всё время работы — отзывы наших клиентов
          </p>
        </div>

        <div className="rev__grid">
          {getVisible().map((review, i) => (
            <div key={`${current}-${i}`} className="tp-card rev__card">
              <Quote size={28} strokeWidth={2.3} className="rev__quote" />
              <Stars count={review.rating} />
              <p className="rev__text">{review.text}</p>
              {(review.photo || review.video) && (
                <button
                  type="button"
                  className="rev__media"
                  onClick={() => setZoom(review)}
                  aria-label={review.video ? 'Открыть видео-отзыв' : 'Открыть фото к отзыву'}
                  data-ym-goal="review_media_open"
                  data-ym-params={`{"type":"${review.video ? 'video' : 'photo'}"}`}
                >
                  {review.photo && (
                    <Image
                      src={review.photo}
                      alt=""
                      width={120}
                      height={84}
                      className="rev__mediaImg"
                    />
                  )}
                  <span className="rev__mediaIcon">
                    {review.video
                      ? <Play size={14} strokeWidth={2.5} />
                      : <ImageIcon size={14} strokeWidth={2.5} />}
                  </span>
                </button>
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

      {zoom && (
        <div
          className="rev__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Медиа отзыва: ${zoom.name}, ${zoom.city}`}
          onClick={closeZoom}
        >
          <button
            type="button"
            className="rev__lightboxClose"
            onClick={closeZoom}
            aria-label="Закрыть"
          >
            <X size={22} strokeWidth={2.4} />
          </button>
          <div className="rev__lightboxInner" onClick={(e) => e.stopPropagation()}>
            {zoom.video ? (
              <video
                src={zoom.video}
                controls
                autoPlay
                playsInline
                className="rev__lightboxMedia"
              />
            ) : zoom.photo ? (
              <Image
                src={zoom.photo}
                alt={`Фото к отзыву ${zoom.name}, ${zoom.city}`}
                width={800}
                height={560}
                className="rev__lightboxMedia"
              />
            ) : null}
            <div className="rev__lightboxCaption">
              <strong>{zoom.name}</strong> · {zoom.city} · {zoom.date}
            </div>
          </div>
        </div>
      )}

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
          margin: 14px 0 14px;
        }

        .rev__media {
          position: relative;
          align-self: flex-start;
          display: inline-block;
          margin: 0 0 14px;
          padding: 0;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          background: #F9FAFB;
          cursor: pointer;
          overflow: hidden;
          line-height: 0;
          transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
          font-family: inherit;
        }
        .rev__media:hover {
          transform: translateY(-2px);
          border-color: var(--green, #005C43);
          box-shadow: 0 10px 22px -12px rgba(10,15,28,0.18);
        }
        .rev__mediaImg {
          display: block;
          width: 120px;
          height: 84px;
          object-fit: cover;
          border-radius: 12px;
        }
        .rev__mediaIcon {
          position: absolute;
          bottom: 8px;
          right: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(10,15,28,0.78);
          color: #fff;
          backdrop-filter: blur(6px);
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
          flex-wrap: wrap;
          max-width: 260px;
          justify-content: center;
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

        .rev__lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(10,15,28,0.78);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(6px);
        }
        .rev__lightboxInner {
          position: relative;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          max-width: min(840px, 100%);
          max-height: 86vh;
          display: flex;
          flex-direction: column;
        }
        .rev__lightboxMedia {
          display: block;
          width: 100%;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          background: #0A0F1C;
        }
        .rev__lightboxCaption {
          padding: 14px 18px;
          font-size: 13px;
          color: #4B5563;
          background: #F9FAFB;
        }
        .rev__lightboxCaption strong {
          color: var(--ink, #0A0F1C);
          font-weight: 700;
        }
        .rev__lightboxClose {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.92);
          color: #0A0F1C;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          font-family: inherit;
        }
        .rev__lightboxClose:hover { background: #fff; }

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
