'use client';
import Image from 'next/image';

const MARKETPLACES = [
  { name: 'Pinduoduo', img: '/mp/pinduoduo.jpg', color: '#e4003a' },
  { name: 'Taobao',    img: '/mp/taobao.svg',    color: '#ff4400' },
  { name: '1688',      img: '/mp/1688.png',       color: '#ff6600' },
  { name: 'Poizon',    img: '/mp/poizon.png',     color: '#1a1a2e' },
  { name: 'Goofish',   img: '/mp/gofish.webp',    color: '#ffd600' },
];

const STATS = [
  { value: '5 000+', label: 'Довольных клиентов' },
  { value: '15–25', label: 'Дней доставки' },
  { value: '100%', label: 'Официально' },
];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 50%, #fff5f5 100%)',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,158,126,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(203,50,52,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E', borderRadius: '50px',
              padding: '6px 14px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px',
              border: '1px solid #c6ede4',
            }}>
              <span>✈️</span> Официальная доставка из Китая
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#111827',
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}>
              Доставка товаров<br />
              из Китая<br />
              <span style={{ color: '#1B9E7E' }}>в Россию</span>
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '460px',
            }}>
              Любимые бренды без наценок с{' '}
              <span style={{ color: '#e4003a', fontWeight: 700 }}>Pinduoduo</span>,{' '}
              <span style={{ color: '#ff4400', fontWeight: 700 }}>Taobao</span>,{' '}
              <span style={{ color: '#ff6600', fontWeight: 700 }}>1688</span>,{' '}
              <span style={{ color: '#CB3234', fontWeight: 700 }}>Poizon</span>{' '}
              и других китайских маркетплейсов
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a
                href="https://taopost.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(27,158,126,0.35)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(27,158,126,0.45)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(27,158,126,0.35)';
                }}
              >
                Начать заказ <span>→</span>
              </a>
              <a
                href="#how"
                style={{
                  padding: '16px 32px',
                  background: 'white',
                  color: '#374151',
                  fontWeight: 700,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: '2px solid #e5e7eb',
                  transition: 'border-color 0.15s, color 0.15s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1B9E7E';
                  (e.currentTarget as HTMLElement).style.color = '#1B9E7E';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
                  (e.currentTarget as HTMLElement).style.color = '#374151';
                }}
              >
                Как это работает
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#111827' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500, marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-right">
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
              width: '100%',
              maxWidth: '420px',
              border: '1px solid #f0f0f0',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#6B7280', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Поддерживаемые площадки
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {MARKETPLACES.map((mp) => (
                  <div
                    key={mp.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      background: '#F9FAFB',
                      borderRadius: '12px',
                      border: '1px solid #F3F4F6',
                    }}
                  >
                    <div style={{
                      width: '36px', height: '36px',
                      borderRadius: '10px',
                      background: mp.color,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}>
                      <Image src={mp.img} alt={mp.name} width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{mp.name}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  border: '1px dashed #D1D5DB',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#9CA3AF',
                }}>
                  + другие
                </div>
              </div>

              {/* Route indicator */}
              <div style={{
                background: 'linear-gradient(135deg, #e8f7f3, #f0fdf9)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px' }}>🇨🇳</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginTop: '4px' }}>Китай</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ flex: 1, height: '2px', background: '#1B9E7E', borderRadius: '2px' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1B9E7E', whiteSpace: 'nowrap', padding: '3px 8px', background: 'white', borderRadius: '20px', border: '1px solid #c6ede4' }}>
                    15–25 дней
                  </div>
                  <div style={{ flex: 1, height: '2px', background: '#1B9E7E', borderRadius: '2px' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px' }}>🇷🇺</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginTop: '4px' }}>Россия</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-right { display: none !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a { text-align: center !important; justify-content: center !important; }
          .hero-stats { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
