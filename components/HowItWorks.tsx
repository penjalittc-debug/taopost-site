'use client';

const STEPS = [
  {
    number: '01',
    icon: '🛒',
    title: 'Оформление покупки',
    color: '#1B9E7E',
    bg: '#e8f7f3',
    description: null,
    options: [
      {
        label: 'Самостоятельный выкуп',
        text: 'Создайте заявку через «Добавить выкуп». Укажите трек-номер, прикрепите фото и ссылку. Как только груз поступит на склад — вы получите уведомление.',
      },
      {
        label: 'Выкуп через нас',
        text: 'Нет Alipay или WeChat Pay? Нажмите «Заявка на выкуп», вставьте ссылку, укажите название, количество и цену — мы выкупим сами.',
      },
    ],
  },
  {
    number: '02',
    icon: '💳',
    title: 'Расчёт и оплата',
    color: '#6366f1',
    bg: '#eef2ff',
    description: 'Рассчитаем итоговую стоимость товара и логистики. Оплата любым удобным способом — банковской картой или переводом.',
    options: null,
  },
  {
    number: '03',
    icon: '🏭',
    title: 'Склад и консолидация',
    color: '#f59e0b',
    bg: '#fffbeb',
    description: 'Вы полностью контролируете товары в приложении. Объединяйте несколько заказов в один ящик или разделяйте их для отправки в разные пункты.',
    options: null,
  },
  {
    number: '04',
    icon: '🚛',
    title: 'Доставка в РФ и Беларусь',
    color: '#CB3234',
    bg: '#fff0f0',
    description: 'После подтверждения отправляем груз. Средний срок — 15–20 дней, максимальный — до 25 дней.',
    options: null,
  },
  {
    number: '05',
    icon: '📬',
    title: 'Получение и доставка до адреса',
    color: '#0891b2',
    bg: '#e0f7fa',
    description: 'Когда груз прибудет в Россию — вы получите уведомление. Оформите доставку до конечного адреса прямо в приложении.',
    options: null,
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
            Как сделать заказ
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
            5 простых шагов — от выбора товара до получения посылки у вас дома
          </p>
        </div>

        {/* Steps — first row 3, second row 2 centered */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }} className="steps-row-3">
            {STEPS.slice(0, 3).map((step, idx) => (
              <StepCard key={step.number} step={step} idx={idx} total={3} />
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
          }} className="steps-row-2">
            {STEPS.slice(3).map((step, idx) => (
              <StepCard key={step.number} step={step} idx={idx} total={2} />
            ))}
          </div>
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
        @media (max-width: 900px) {
          .steps-row-3 { grid-template-columns: 1fr !important; }
          .steps-row-2 { grid-template-columns: 1fr !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

function StepCard({ step, idx, total }: { step: typeof STEPS[0]; idx: number; total: number }) {
  return (
    <div style={{ position: 'relative' }}>
      {idx < total - 1 && (
        <div
          className="step-connector"
          style={{
            position: 'absolute',
            top: '36px',
            right: '-20px',
            width: '40px',
            height: '2px',
            background: step.color,
            zIndex: 1,
            opacity: 0.3,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
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

        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
          {step.title}
        </h3>

        {step.description && (
          <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
            {step.description}
          </p>
        )}

        {step.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {step.options.map((opt) => (
              <div key={opt.label} style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '12px 14px',
                borderLeft: `3px solid ${step.color}`,
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.55 }}>
                  {opt.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
