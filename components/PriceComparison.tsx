'use client';

const PRODUCTS = [
  { name: 'Nike Air Force 1', category: 'Кроссовки', priceRU: 12990, priceCN: 5200, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Adidas Samba OG', category: 'Кроссовки', priceRU: 21040, priceCN: 9276, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Jordan Air Jordan 1', category: 'Кроссовки', priceRU: 23999, priceCN: 8688, emoji: '👟', marketplace: 'Poizon' },
  { name: 'Levi\'s 501 Джинсы', category: 'Одежда', priceRU: 11899, priceCN: 6321, emoji: '👖', marketplace: '1688' },
  { name: 'Carhartt WIP Куртка', category: 'Одежда', priceRU: 19795, priceCN: 13507, emoji: '🧥', marketplace: 'Taobao' },
  { name: 'Samsung Galaxy Fit 3', category: 'Электроника', priceRU: 7621, priceCN: 5352, emoji: '⌚', marketplace: '1688' },
];

export default function PriceComparison() {
  return (
    <section id="prices" style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700, marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Выгода
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Сравните цены:<br />
            <span style={{ color: '#1B9E7E' }}>Китай vs Россия</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Реальная экономия на популярных товарах — от 30% до 60%
          </p>
        </div>

        <div className="prices-grid three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {PRODUCTS.map((p) => {
            const savings = p.priceRU - p.priceCN;
            const savingsPct = Math.round((savings / p.priceRU) * 100);
            return (
              <div key={p.name} style={{
                background: '#F9FAFB',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #F3F4F6',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: '#e8f7f3', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                    flexShrink: 0,
                  }}>
                    {p.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{p.category} · {p.marketplace}</div>
                  </div>
                </div>

                {/* Price comparison */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    flex: 1, background: '#fff0f0', borderRadius: '12px',
                    padding: '12px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>В России</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#E4003A' }}>
                      {p.priceRU.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#9CA3AF', fontSize: '16px' }}>→</div>
                  <div style={{
                    flex: 1, background: '#e8f7f3', borderRadius: '12px',
                    padding: '12px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>Из Китая</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#1B9E7E' }}>
                      ~{p.priceCN.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>

                {/* Savings badge */}
                <div style={{
                  background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                  borderRadius: '10px', padding: '10px 14px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Экономия</span>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: 'white' }}>
                    {savings.toLocaleString('ru-RU')} ₽ · {savingsPct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '20px' }}>
            Хотите узнать цену конкретного товара?
          </p>
          <a href="https://taopost.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', padding: '16px 40px',
            background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
            color: 'white', fontWeight: 800, fontSize: '16px',
            borderRadius: '50px', textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(27,158,126,0.35)',
          }}>
            Узнать стоимость →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
