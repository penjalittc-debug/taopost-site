'use client';

const STEPS = [
  {
    number: '01',
    icon: '🔗',
    title: 'Отправьте ссылку',
    description: 'Найдите товар на любом китайском маркетплейсе и скопируйте ссылку. Отправьте её нам в личный кабинет или Telegram.',
    color: '#1B9E7E',
    bg: '#e8f7f3',
  },
  {
    number: '02',
    icon: '💳',
    title: 'Оплатите заказ',
    description: 'Мы рассчитаем точную стоимость товара и доставки. Оплатите удобным способом — картой или переводом.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Мы выкупаем и отправляем',
    description: 'Покупаем товар на маркетплейсе, получаем его на наш склад в Гуанчжоу, проверяем и отправляем в Россию.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    number: '04',
    icon: '🚪',
    title: 'Получайте дома',
    description: 'Посылка приезжает в Россию. Вы получаете уведомление и забираете заказ удобным способом.',
    color: '#CB3234',
    bg: '#fff0f0',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
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
            Процесс
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}>
            Как это работает
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
            Всего 4 шага — от выбора товара до получения посылки у вас дома
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          position: 'relative',
        }}>
          {STEPS.map((step, idx) => (
            <div key={step.number} style={{ position: 'relative' }}>
              {/* Connector line for desktop */}
              {idx < STEPS.length - 1 && (
                <div
                  className="step-connector"
                  style={{
                    position: 'absolute',
                    top: '36px',
                    right: '-20px',
                    width: '40px',
                    height: '2px',
                    background: `linear-gradient(90deg, ${step.color}, ${STEPS[idx + 1].color})`,
                    zIndex: 1,
                  }}
                />
              )}

              <div
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  border: '1px solid #F3F4F6',
                  height: '100%',
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
                {/* Step number */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: step.bg,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: step.color,
                    opacity: 0.25,
                    lineHeight: 1,
                  }}>
                    {step.number}
                  </div>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '✅', text: 'Без предоплаты за выкуп' },
            { icon: '✅', text: 'Трекинг на каждом этапе' },
            { icon: '✅', text: 'Поддержка в Telegram' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 600, color: '#374151' }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
