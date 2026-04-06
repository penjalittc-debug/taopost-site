'use client';

const TARIFF_ROWS = [
  { route: 'Гуанчжоу → Москва', time: '15–20 дней', price: 'Уточняется', note: 'Авиа' },
  { route: 'Гуанчжоу → Москва', time: '20–30 дней', price: 'Уточняется', note: 'Авто' },
  { route: 'Гуанчжоу → Регионы РФ', time: '+3–7 дней', price: 'Уточняется', note: 'ТК' },
];

const SERVICES = [
  { name: 'Выкуп товара', price: 'от 3%', desc: 'от стоимости товара' },
  { name: 'Фото со склада', price: 'Бесплатно', desc: 'до 5 фото' },
  { name: 'Консолидация', price: 'Бесплатно', desc: 'объединение посылок' },
  { name: 'Страховка', price: 'Уточняется', desc: 'по запросу' },
];

export default function Tariffs() {
  return (
    <section id="tariffs" style={{ padding: '80px 24px', background: 'white' }}>
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
            Тарифы
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}>
            Стоимость доставки
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Тарифы рассчитываются индивидуально в зависимости от веса, габаритов и типа товара
          </p>
        </div>

        <div className="tariffs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Delivery rates table */}
          <div style={{
            background: '#F9FAFB',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #F3F4F6',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '20px' }}>
              🚀 Сроки и стоимость
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TARIFF_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{row.route}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{row.note} · {row.time}</div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#1B9E7E',
                    background: '#e8f7f3',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '16px',
              padding: '14px',
              background: '#fffbeb',
              borderRadius: '12px',
              fontSize: '13px',
              color: '#92400e',
              fontWeight: 500,
              border: '1px solid #fde68a',
            }}>
              💡 Точный расчёт стоимости доставки — в нашем Telegram или личном кабинете
            </div>
          </div>

          {/* Services */}
          <div style={{
            background: '#F9FAFB',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #F3F4F6',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '20px' }}>
              🛠 Дополнительные услуги
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SERVICES.map((svc) => (
                <div
                  key={svc.name}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{svc.name}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{svc.desc}</div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: svc.price === 'Бесплатно' ? '#1B9E7E' : '#CB3234',
                    background: svc.price === 'Бесплатно' ? '#e8f7f3' : '#fff0f0',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {svc.price}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://taopost.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                marginTop: '20px',
                padding: '14px',
                background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                color: 'white',
                borderRadius: '14px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(27,158,126,0.3)',
              }}
            >
              Рассчитать стоимость →
            </a>
          </div>
        </div>

        {/* Notice */}
        <div style={{
          marginTop: '24px',
          padding: '20px 24px',
          background: '#F9FAFB',
          borderRadius: '16px',
          border: '1px solid #F3F4F6',
          fontSize: '14px',
          color: '#6B7280',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          Стоимость доставки зависит от веса, объёма и типа товара. Запрещённые к ввозу товары не принимаем.
          Для расчёта точной цены напишите нам — ответим в течение нескольких минут.
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .tariffs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
