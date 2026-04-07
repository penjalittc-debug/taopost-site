'use client';

const AUTO_ROWS = [
  { route: 'Иу → Москва', time: '15–20 дней', price: '2.7–3.3 $/кг', note: 'Автодоставка' },
  { route: 'Гуанчжоу → Москва', time: '18–25 дней', price: '2.7–3.3 $/кг', note: 'Автодоставка' },
  { route: 'Цзиси → Уссурийск', time: 'Скоро', price: 'Скоро', note: '🆕 Новый маршрут' },
];

const AIR_ROWS = [
  { route: 'Пекин → Москва', time: '3–5 дней', price: 'от 25 $/кг', note: 'Авиадоставка' },
];

const SERVICES = [
  { name: '🛡️ Страховка груза', price: '2%', desc: 'Обязательная. Защищает товар от потери и повреждения на всём маршруте', color: '#CB3234', bg: '#fff0f0' },
  { name: '📦 Упаковка', price: 'от 5 $', desc: 'Надёжная упаковка под любой тип товара. Цена зависит от объёма и вида упаковки', color: '#f59e0b', bg: '#fffbeb' },
  { name: '🛒 Выкуп товара', price: 'от 3%', desc: 'Выкупаем с любого китайского маркетплейса без китайской карты и аккаунта', color: '#6366f1', bg: '#eef2ff' },
  { name: '📸 Фото со склада', price: 'Бесплатно', desc: 'До 5 фото вашего товара на нашем складе в Китае перед отправкой', color: '#1B9E7E', bg: '#e8f7f3' },
  { name: '📬 Консолидация', price: 'Бесплатно', desc: 'Объединяем несколько заказов из разных магазинов в одну посылку', color: '#1B9E7E', bg: '#e8f7f3' },
];

export default function Tariffs() {
  return (
    <section id="tariffs" className="section-pad" style={{ background: 'white' }}>
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
            Прозрачные тарифы без скрытых платежей. Цена зависит от веса, габаритов и типа товара
          </p>
        </div>

        <div className="tariffs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Auto delivery */}
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '28px', border: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
              🚛 Автодоставка
            </h3>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>Выгодная цена · Минимальный вес 5 кг</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AUTO_ROWS.map((row, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: '12px', padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #F3F4F6',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{row.route}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{row.note} · {row.time}</div>
                  </div>
                  <div style={{
                    fontSize: '13px', fontWeight: 800,
                    color: row.price === 'Скоро' ? '#9CA3AF' : '#1B9E7E',
                    background: row.price === 'Скоро' ? '#F3F4F6' : '#e8f7f3',
                    padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap',
                  }}>
                    {row.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Air delivery */}
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '28px', border: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
              ✈️ Авиадоставка
            </h3>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>Когда нужно быстро · Экспресс за 3–5 дней</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {AIR_ROWS.map((row, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: '12px', padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #F3F4F6',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{row.route}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{row.note} · {row.time}</div>
                  </div>
                  <div style={{
                    fontSize: '13px', fontWeight: 800,
                    color: '#6366f1', background: '#eef2ff',
                    padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap',
                  }}>
                    {row.price}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '14px',
              background: '#fffbeb', borderRadius: '12px',
              fontSize: '13px', color: '#92400e', fontWeight: 500,
              border: '1px solid #fde68a',
            }}>
              💡 Точная стоимость рассчитывается индивидуально — напишите нам, ответим за несколько минут
            </div>
          </div>

          {/* Services */}
          <div style={{
            background: '#F9FAFB', borderRadius: '20px', padding: '28px',
            border: '1px solid #F3F4F6', gridColumn: '1 / -1',
          }}
          className="tariffs-services"
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '20px' }}>
              🛠 Дополнительные услуги
            </h3>
            <div className="services-grid five-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {SERVICES.map((svc) => (
                <div key={svc.name} style={{
                  background: 'white', borderRadius: '14px', padding: '16px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    fontSize: '15px', fontWeight: 800,
                    color: svc.color, background: svc.bg,
                    padding: '4px 10px', borderRadius: '20px',
                    display: 'inline-block', marginBottom: '10px',
                  }}>
                    {svc.price}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{svc.name}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>{svc.desc}</div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/79772767778?text=Привет! Хочу рассчитать стоимость доставки"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginTop: '20px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                color: 'white', borderRadius: '14px',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
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
          Стоимость доставки рассчитывается по фактическому или объёмному весу — в зависимости от того, какой больше.
          Товары, запрещённые к ввозу в РФ, не принимаем. Остались вопросы? Напишите нам — ответим быстро.
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .tariffs-grid { grid-template-columns: 1fr !important; }
          .tariffs-services { grid-column: 1 !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
