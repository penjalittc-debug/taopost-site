'use client';
import Image from 'next/image';

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
      {/* Dragon background */}
      <div className="dragon-bg" style={{
        position: 'absolute', bottom: '-60px', right: '-80px',
        width: '720px', height: '720px',
        pointerEvents: 'none',
        opacity: 0.13,
        zIndex: 0,
      }}>
        <Image src="/dragon.png" alt="" fill style={{ objectFit: 'contain', objectPosition: 'right bottom' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center', maxWidth: '700px' }}>

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


        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-right { display: none !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a { text-align: center !important; justify-content: center !important; }
          .hero-stats { gap: 20px !important; }
          .dragon-bg { width: 380px !important; height: 380px !important; bottom: -20px !important; right: -40px !important; opacity: 0.10 !important; }
        }
      `}</style>
    </section>
  );
}
