'use client';
import Image from 'next/image';

const MARKETPLACES = [
  {
    name: 'Pinduoduo',
    description: 'Лучшие цены от китайских производителей напрямую',
    img: '/mp/pinduoduo.jpg',
    color: '#e4003a',
    tag: 'Дешевле всего',
    tagColor: '#e4003a',
  },
  {
    name: 'Taobao',
    description: 'Крупнейший ритейл-маркетплейс Китая с миллионами товаров',
    img: '/mp/taobao.svg',
    color: '#ff4400',
    tag: 'Огромный выбор',
    tagColor: '#ff4400',
  },
  {
    name: '1688',
    description: 'Оптовые закупки напрямую от производителей по заводским ценам',
    img: '/mp/1688.png',
    color: '#ff6600',
    tag: 'Оптом',
    tagColor: '#ff6600',
  },
  {
    name: 'Poizon',
    description: 'Оригинальные кроссовки и уличная мода с гарантией подлинности',
    img: '/mp/poizon.png',
    color: '#1a1a2e',
    tag: 'Оригинал',
    tagColor: '#6366f1',
  },
  {
    name: 'Goofish',
    description: 'Б/у товары и раритеты по выгодным ценам',
    img: '/mp/gofish.webp',
    color: '#d97706',
    tag: 'Секонд-хенд',
    tagColor: '#d97706',
  },
];

export default function Marketplaces() {
  return (
    <section id="marketplaces" style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700,
            marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Маркетплейсы
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}>
            Везём с любого<br />
            <span style={{ color: '#1B9E7E' }}>китайского маркетплейса</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Просто скопируйте ссылку на товар и отправьте нам — всё остальное сделаем мы
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {MARKETPLACES.map((mp) => (
            <div
              key={mp.name}
              style={{
                background: '#F9FAFB',
                borderRadius: '20px',
                padding: '24px 20px',
                border: '1px solid #F3F4F6',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                cursor: 'default',
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
              <div style={{
                width: '64px', height: '64px',
                background: mp.color,
                borderRadius: '20px',
                overflow: 'hidden',
                margin: '0 auto 14px',
                boxShadow: `0 8px 20px ${mp.color}40`,
              }}>
                <Image
                  src={mp.img}
                  alt={mp.name}
                  width={64}
                  height={64}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{
                display: 'inline-block',
                background: mp.tagColor + '15',
                color: mp.tagColor,
                borderRadius: '20px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '10px',
              }}>
                {mp.tag}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                {mp.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                {mp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '32px',
          background: 'linear-gradient(135deg, #e8f7f3, #f0fdf9)',
          borderRadius: '20px',
          border: '1px solid #c6ede4',
        }}>
          <p style={{ fontSize: '17px', fontWeight: 700, color: '#374151', marginBottom: '16px' }}>
            Не нашли нужный маркетплейс? Мы работаем и с другими площадками — напишите нам
          </p>
          <a
            href="#contacts"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: '#1B9E7E',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '15px',
            }}
          >
            Написать в Telegram →
          </a>
        </div>
      </div>
    </section>
  );
}
