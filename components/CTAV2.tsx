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
                href="https://wa.me/79772767778?text=Привет! Хочу заказать товар из Китая"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 32px',
                  background: '#25D366',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '16px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Написать в WhatsApp
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
