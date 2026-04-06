'use client';

export default function CTA() {
  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1B9E7E 0%, #0D7A5F 100%)',
          borderRadius: '28px',
          padding: '60px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorations */}
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
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🚀</div>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}>
              Готовы заказать товары<br />из Китая?
            </h2>
            <p style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '36px',
              lineHeight: 1.6,
              maxWidth: '460px',
              margin: '0 auto 36px',
            }}>
              Регистрируйтесь в личном кабинете и получите адрес нашего склада в Китае уже через минуту
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://taopost.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 36px',
                  background: 'white',
                  color: '#1B9E7E',
                  fontWeight: 800,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  transition: 'transform 0.15s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                Зарегистрироваться →
              </a>
              <a
                href="#contacts"
                style={{
                  padding: '16px 36px',
                  background: 'transparent',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.4)',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'white';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                Написать нам
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
