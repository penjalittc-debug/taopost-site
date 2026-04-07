'use client';
import { useRef } from 'react';
import Image from 'next/image';

// Замените null на '/warehouse/photo1.jpg' и т.д. когда добавите фото
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
    const card = trackRef.current.querySelector('.gallery-card') as HTMLElement;
    const gap = 16;
    const step = card ? card.offsetWidth + gap : 320;
    trackRef.current.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '80px 0', background: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E',
              borderRadius: '50px', padding: '6px 14px',
              fontSize: '13px', fontWeight: 700, marginBottom: '12px',
              border: '1px solid #c6ede4',
            }}>
              📸 Наш склад
            </div>
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 900, color: '#111827',
              letterSpacing: '-0.5px', lineHeight: 1.15,
            }}>
              Как проходит процесс<br />
              <span style={{ color: '#1B9E7E' }}>на складе</span>
            </h2>
          </div>

          {/* Arrow buttons */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            {(['left', 'right'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                aria-label={dir === 'left' ? 'Назад' : 'Вперёд'}
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '50%',
                  border: '2px solid #E5E7EB',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                  transition: 'border-color 0.15s, background 0.15s',
                  color: '#374151',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1B9E7E';
                  (e.currentTarget as HTMLElement).style.background = '#e8f7f3';
                  (e.currentTarget as HTMLElement).style.color = '#1B9E7E';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                  (e.currentTarget as HTMLElement).style.color = '#374151';
                }}
              >
                {dir === 'left' ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable track — full width */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
        }}
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
          <div
            key={i}
            className="gallery-card"
            style={{
              flexShrink: 0,
              width: '480px',
              height: '290px',
              borderRadius: '20px',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
              position: 'relative',
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              userSelect: 'none',
            }}
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            ) : (
              /* Плейсхолдер — замените на <Image> когда добавите фото */
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                gap: '12px',
              }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: '#e8f7f3', borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px',
                }}>📷</div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>Фото #{i + 1}</div>
              </div>
            )}

            {/* Caption overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(17,24,39,0.75) 0%, transparent 100%)',
              padding: '32px 20px 16px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                {photo.caption}
              </div>
            </div>

            {/* Number badge */}
            <div style={{
              position: 'absolute', top: '14px', left: '14px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '20px', padding: '4px 12px',
              fontSize: '12px', fontWeight: 700, color: '#374151',
            }}>
              {i + 1} / {PHOTOS.length}
            </div>
          </div>
        ))}

        {/* Add photo card */}
        <div style={{
          flexShrink: 0,
          width: '200px', height: '290px',
          borderRadius: '20px',
          border: '2px dashed #D1D5DB',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '10px', color: '#9CA3AF',
          scrollSnapAlign: 'start',
          background: '#FAFAFA',
        }}>
          <div style={{ fontSize: '32px' }}>+</div>
          <div style={{ fontSize: '13px', fontWeight: 600, textAlign: 'center', padding: '0 16px' }}>
            Добавить фото
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
        @media (max-width: 600px) {
          .gallery-card { width: 85vw !important; height: 240px !important; }
        }
      `}</style>
    </section>
  );
}
