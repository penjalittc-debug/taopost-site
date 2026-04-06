'use client';
import { useState } from 'react';

const REVIEWS = [
  { name: 'Алина М.', city: 'Москва', text: 'Заказывала кроссовки с Poizon — пришли за 18 дней, всё оригинальное, упаковка целая. Очень довольна сервисом!', rating: 5, date: 'март 2026' },
  { name: 'Дмитрий К.', city: 'Санкт-Петербург', text: 'Уже 4-й заказ через TaoPost. Каждый раз всё чётко: трекинг работает, менеджер отвечает быстро. Рекомендую!', rating: 5, date: 'март 2026' },
  { name: 'Сабина Р.', city: 'Казань', text: 'Заказала одежду с Taobao, помогли с выкупом. До Казани доехало за 22 дня. Цены в 2 раза дешевле чем в России.', rating: 5, date: 'февраль 2026' },
  { name: 'Иван Т.', city: 'Екатеринбург', text: 'Быстро, надёжно, недорого. Всё пришло в целости. Буду заказывать ещё!', rating: 5, date: 'февраль 2026' },
  { name: 'Наталья В.', city: 'Новосибирск', text: 'Первый раз заказывала — переживала. Но всё прошло отлично! Менеджер помог разобраться, посылка пришла вовремя.', rating: 5, date: 'январь 2026' },
  { name: 'Артём С.', city: 'Краснодар', text: 'Удобный личный кабинет, всё понятно. Посылка пришла раньше срока. Спасибо команде TaoPost!', rating: 5, date: 'январь 2026' },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? '#FFD600' : '#E5E7EB', fontSize: '16px' }}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = REVIEWS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(REVIEWS[(current + i) % total]);
    }
    return items;
  };

  return (
    <section id="reviews" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700, marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Отзывы
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Нам доверяют клиенты<br />
            <span style={{ color: '#1B9E7E' }}>по всей России</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
            Более 5 000 довольных клиентов уже получили свои заказы из Китая
          </p>
        </div>

        {/* Cards */}
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {getVisible().map((review, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <Stars count={review.rating} />
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, margin: '16px 0 20px', fontStyle: 'italic' }}>
                "{review.text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>{review.name}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{review.city}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#D1D5DB' }}>{review.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <button onClick={prev} style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: '2px solid #E5E7EB', background: 'white',
            cursor: 'pointer', fontSize: '18px', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1B9E7E'; (e.currentTarget as HTMLElement).style.color = '#1B9E7E'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
          >←</button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {REVIEWS.map((_, i) => (
              <div key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? '24px' : '8px', height: '8px',
                borderRadius: '4px',
                background: i === current ? '#1B9E7E' : '#D1D5DB',
                cursor: 'pointer', transition: 'all 0.2s',
              }} />
            ))}
          </div>
          <button onClick={next} style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: '2px solid #E5E7EB', background: 'white',
            cursor: 'pointer', fontSize: '18px', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1B9E7E'; (e.currentTarget as HTMLElement).style.color = '#1B9E7E'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
          >→</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
