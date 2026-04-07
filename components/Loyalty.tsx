'use client';

const LEVELS = [
  { name: 'Базовый', icon: '🌱', kg: 'До 5 кг/мес', cashback: '0 ₽/кг', color: '#9CA3AF', bg: '#F9FAFB', border: '#E5E7EB' },
  { name: 'Серебро', icon: '🥈', kg: '5–30 кг/мес', cashback: '30 ₽/кг', color: '#6B7280', bg: '#F3F4F6', border: '#D1D5DB' },
  { name: 'Золото', icon: '🥇', kg: '30–50 кг/мес', cashback: '50 ₽/кг', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', popular: true },
  { name: 'Бриллиант', icon: '💎', kg: 'От 50 кг/мес', cashback: '70 ₽/кг', color: '#1B9E7E', bg: '#E8F7F3', border: '#C6EDE4' },
];

export default function Loyalty() {
  return (
    <section id="loyalty" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700, marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Программа лояльности
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Чем больше отправляешь —<br />
            <span style={{ color: '#1B9E7E' }}>тем больше бонусов</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Получайте кешбэк за каждый килограмм. Уровень обновляется каждый месяц
          </p>
        </div>

        <div className="loyalty-grid four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {LEVELS.map((level) => (
            <div key={level.name} style={{
              background: level.bg,
              borderRadius: '20px',
              padding: '28px 20px',
              border: `2px solid ${level.popular ? level.color : level.border}`,
              textAlign: 'center',
              position: 'relative',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {level.popular && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: '#D97706', color: 'white', borderRadius: '20px',
                  padding: '4px 14px', fontSize: '11px', fontWeight: 800, whiteSpace: 'nowrap',
                }}>
                  Популярный
                </div>
              )}
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{level.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: level.color, marginBottom: '8px' }}>
                {level.name}
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px', lineHeight: 1.5 }}>
                {level.kg}
              </div>
              <div style={{
                background: 'white', borderRadius: '12px', padding: '12px',
                border: `1px solid ${level.border}`,
              }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>Кешбэк</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: level.color }}>
                  {level.cashback}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How it works note */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '24px 32px',
          border: '1px solid #E5E7EB',
          display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '28px' }}>💡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
              Как считается уровень?
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
              Уровень считается по общему весу за месяц. Например: в январе вы отправили 35 кг — значит в феврале вам присваивается «Золото» и кешбэк 50 ₽ с каждого кг.
            </div>
          </div>
          <a href="https://taopost.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            padding: '12px 24px', background: '#1B9E7E', color: 'white',
            borderRadius: '50px', textDecoration: 'none', fontWeight: 700,
            fontSize: '14px', whiteSpace: 'nowrap',
          }}>
            Начать копить →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .loyalty-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .loyalty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
