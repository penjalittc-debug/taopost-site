'use client';
import Image from 'next/image';

const STATS = [
  { value: '50 000+', label: 'Доставленных товаров в 2025 году' },
  { value: '15–25', label: 'Дней доставки' },
  { value: '100%', label: 'Официально' },
];

const TRUST_BADGES = [
  { icon: '✅', text: 'Без предоплаты' },
  { icon: '📦', text: 'Отслеживание в реальном времени' },
  { icon: '🛡️', text: 'Страховка товара' },
];

export default function HeroV2() {
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
      {/* Dragon background */}
      <div className="dragon-bg" style={{
        position: 'absolute',
        top: '50%',
        right: '0px',
        transform: 'translateY(-50%)',
        width: '680px',
        height: '680px',
        pointerEvents: 'none',
        opacity: 0.18,
        zIndex: 0,
      }}>
        <Image src="/dragon.webp" alt="" fill style={{ objectFit: 'contain' }} />
      </div>

      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,158,126,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '680px' }}>

          {/* Headline - benefit focused */}
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontWeight: 900,
            lineHeight: 1.08,
            color: '#111827',
            marginBottom: '20px',
            letterSpacing: '-1.5px',
          }}>
            Сэкономьте до 75%<br />
            на товарах<br />
            <span style={{ color: '#1B9E7E' }}>из Китая</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            lineHeight: 1.7,
            marginBottom: '12px',
            maxWidth: '500px',
          }}>
            Выкупаем с{' '}
            <span style={{ color: '#e4003a', fontWeight: 700 }}>Pinduoduo</span>,{' '}
            <span style={{ color: '#ff4400', fontWeight: 700 }}>Taobao</span>,{' '}
            <span style={{ color: '#ff6600', fontWeight: 700 }}>1688</span>,{' '}
            <span style={{ color: '#CB3234', fontWeight: 700 }}>Poizon</span>{' '}
            и других китайских площадок — и доставляем до вашего города или прямо до порога
          </p>

          {/* Trust badges row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {TRUST_BADGES.map((b) => (
              <span key={b.text} style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {b.icon} {b.text}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a
              href="https://t.me/taopostmaneger"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '18px 36px',
                background: '#0088cc',
                color: 'white',
                fontWeight: 800,
                fontSize: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,136,204,0.40)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,136,204,0.50)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,136,204,0.40)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Написать в Telegram
            </a>
            <a
              href="#calculator"
              style={{
                padding: '18px 32px',
                background: 'white',
                color: '#374151',
                fontWeight: 700,
                fontSize: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
                border: '2px solid #e5e7eb',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'border-color 0.15s, color 0.15s',
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
              Рассчитать стоимость
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

      <style>{`
        @media (max-width: 768px) {
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a { text-align: center !important; justify-content: center !important; }
          .hero-stats { gap: 20px !important; }
          .dragon-bg {
            width: 320px !important;
            height: 320px !important;
            top: auto !important;
            bottom: 0px !important;
            right: -40px !important;
            transform: none !important;
            opacity: 0.12 !important;
          }
        }
      `}</style>
    </section>
  );
}
