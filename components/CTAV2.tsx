'use client';

export default function CTAV2() {
  return (
    <section className="section-pad" style={{ background: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="cta-inner" style={{
          background: 'linear-gradient(135deg, #1B9E7E 0%, #0D7A5F 100%)',
          borderRadius: '28px',
          padding: '60px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '-40px',
            width: '150px', height: '150px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}>
              Готовы сэкономить<br />на следующей покупке?
            </h2>
            <p style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              maxWidth: '440px',
              margin: '0 auto 36px',
            }}>
              Напишите нам прямо сейчас — ответим за 5 минут, подберём оптимальный тариф и поможем оформить первый заказ
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostmaneger"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 32px',
                  background: '#0088cc',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,136,204,0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Написать в Telegram
              </a>
              <a
                href="https://t.me/taopost"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 32px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.15s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'}
              >
                ✈️ Telegram
              </a>
            </div>

            <p style={{ marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              Отвечаем ежедневно с 9:00 до 22:00 МСК
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .ctav2-buttons { flex-direction: column !important; }
          .ctav2-buttons a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
