'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Camera, Plus } from 'lucide-react';

const PHOTOS: { src: string | null; caption: string }[] = [
  { src: null, caption: 'Приёмка груза на складе в Китае' },
  { src: null, caption: 'Проверка и взвешивание товара' },
  { src: null, caption: 'Сортировка и маркировка посылок' },
  { src: null, caption: 'Упаковка груза перед отправкой' },
  { src: null, caption: 'Погрузка в транспортное средство' },
  { src: null, caption: 'Склад в Москве — выдача товара' },
];

export default function WarehouseGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.wg__card') as HTMLElement;
    const gap = 16;
    const step = card ? card.offsetWidth + gap : 320;
    trackRef.current.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
  };

  return (
    <section className="tp-section wg__section">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tr" />
      <div className="tp-mesh tp-mesh--green tp-mesh--bl" />

      <div className="tp-container wg__head">
        <div>
          <span className="tp-eyebrow tp-eyebrow--coral">
            <Camera size={14} strokeWidth={2.3} />
            Наш склад
          </span>
          <h2 className="tp-h2 wg__title">
            Как проходит процесс<br />
            <span className="tp-gradient-text">на складе</span>
          </h2>
        </div>

        <div className="wg__nav">
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir === 'left' ? 'Назад' : 'Вперёд'}
              className="wg__navBtn"
            >
              {dir === 'left'
                ? <ArrowLeft size={18} strokeWidth={2.3} />
                : <ArrowRight size={18} strokeWidth={2.3} />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="wg__track"
        onMouseDown={e => {
          const el = e.currentTarget;
          el.style.cursor = 'grabbing';
          const startX = e.pageX - el.offsetLeft;
          const startScroll = el.scrollLeft;
          const onMove = (ev: MouseEvent) => {
            el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
          };
          const onUp = () => {
            el.style.cursor = 'grab';
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
          };
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }}
      >
        {PHOTOS.map((photo, i) => (
          <div key={i} className="wg__card">
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            ) : (
              <div className="wg__placeholder">
                <div className="tp-icon-tile tp-icon-tile--coral">
                  <Camera size={22} strokeWidth={2.3} />
                </div>
                <div className="wg__placeholderLabel">Фото #{i + 1}</div>
              </div>
            )}

            <div className="wg__caption">
              <div className="wg__captionText">{photo.caption}</div>
            </div>

            <div className="wg__badge">{i + 1} / {PHOTOS.length}</div>
          </div>
        ))}

        <div className="wg__addCard">
          <Plus size={28} strokeWidth={2.3} />
          <div className="wg__addLabel">Добавить фото</div>
        </div>
      </div>

      <style jsx>{`
        .wg__section {
          padding-left: 0;
          padding-right: 0;
          overflow: hidden;
        }
        .wg__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
          padding: 0 24px;
        }
        .wg__title { margin: 0; }

        .wg__nav {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .wg__navBtn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease;
          color: var(--ink);
          font-family: inherit;
        }
        .wg__navBtn:hover {
          border-color: var(--green);
          background: rgba(27,158,126,0.08);
          color: var(--green-dark);
          transform: translateY(-2px);
        }

        .wg__track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 24px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }
        .wg__track::-webkit-scrollbar { display: none; }

        .wg__card {
          flex-shrink: 0;
          width: 480px;
          height: 300px;
          border-radius: 24px;
          overflow: hidden;
          scroll-snap-align: start;
          position: relative;
          background: #F3F4F6;
          border: 1px solid rgba(10,15,28,0.05);
          box-shadow:
            0 1px 2px rgba(10,15,28,0.04),
            0 24px 60px -20px rgba(10,15,28,0.12);
          user-select: none;
        }
        .wg__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background: linear-gradient(135deg, #FAFBFC 0%, #F3F4F6 100%);
        }
        .wg__placeholderLabel {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .wg__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(10,15,28,0.8) 0%, transparent 100%);
          padding: 40px 22px 18px;
          pointer-events: none;
        }
        .wg__captionText {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.2px;
        }

        .wg__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(6px);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 700;
          color: var(--ink);
        }

        .wg__addCard {
          flex-shrink: 0;
          width: 220px;
          height: 300px;
          border-radius: 24px;
          border: 2px dashed #D1D5DB;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #9CA3AF;
          scroll-snap-align: start;
          background: rgba(255,255,255,0.5);
          transition: border-color .2s, color .2s, background .2s;
        }
        .wg__addCard:hover {
          border-color: var(--green);
          color: var(--green);
          background: rgba(27,158,126,0.04);
        }
        .wg__addLabel {
          font-size: 13.5px;
          font-weight: 600;
          text-align: center;
          padding: 0 16px;
        }

        @media (max-width: 1024px) {
          .wg__card { width: 420px; height: 270px; }
        }
        @media (max-width: 768px) {
          .wg__card { width: 78vw; height: 240px; }
          .wg__addCard { height: 240px; width: 180px; }
        }
        @media (max-width: 480px) {
          .wg__card { width: 88vw; height: 210px; }
          .wg__addCard { height: 210px; width: 160px; }
        }
      `}</style>
    </section>
  );
}
