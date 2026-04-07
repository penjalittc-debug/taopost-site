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

          {/* CTA Buttons — WhatsApp first */}
          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a
              href="https://wa.me/79772767778?text=Привет! Хочу заказать товар из Китая"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '18px 36px',
                background: '#25D366',
                color: 'white',
                fontWeight: 800,
                fontSize: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(37,211,102,0.40)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(37,211,102,0.50)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(37,211,102,0.40)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Написать в WhatsApp
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
