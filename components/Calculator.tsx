'use client';
import { useState } from 'react';

const RATE_PER_KG = 599;
const RATES = {
  air: { label: 'Авиа', days: '15–20', ratePerKg: 750 },
  auto: { label: 'Авто', days: '20–30', ratePerKg: 599 },
};

export default function Calculator() {
  const [weight, setWeight] = useState('');
  const [mode, setMode] = useState<'air' | 'auto'>('auto');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    setResult(Math.round(w * RATES[mode].ratePerKg));
  };

  return (
    <section id="calculator" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700, marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Калькулятор
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Рассчитай стоимость<br />
            <span style={{ color: '#1B9E7E' }}>доставки</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            Введите вес посылки и выберите тип доставки
          </p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid #F3F4F6',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {/* Mode selector */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '12px' }}>
              Тип доставки
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {(Object.entries(RATES) as [string, typeof RATES.air][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => { setMode(key as 'air' | 'auto'); setResult(null); }}
                  style={{
                    flex: 1, padding: '16px',
                    borderRadius: '14px',
                    border: mode === key ? '2px solid #1B9E7E' : '2px solid #E5E7EB',
                    background: mode === key ? '#e8f7f3' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 800, color: mode === key ? '#1B9E7E' : '#111827' }}>
                    ✈️ {val.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                    {val.days} дней · от {val.ratePerKg} ₽/кг
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight input */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '12px' }}>
              Вес посылки (кг)
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                placeholder="Например: 2.5"
                style={{
                  flex: 1, padding: '16px 20px',
                  borderRadius: '14px',
                  border: '2px solid #E5E7EB',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                  fontFamily: 'Nunito, sans-serif',
                }}
                onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#1B9E7E'}
                onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#E5E7EB'}
              />
              <button
                onClick={calculate}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                  color: 'white', fontWeight: 800, fontSize: '15px',
                  borderRadius: '14px', border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(27,158,126,0.35)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                Рассчитать
              </button>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div style={{
              background: 'linear-gradient(135deg, #e8f7f3, #f0fdf9)',
              borderRadius: '16px', padding: '24px',
              border: '1px solid #c6ede4',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '12px',
            }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Стоимость доставки</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#1B9E7E' }}>
                  ~{result.toLocaleString('ru-RU')} ₽
                </div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
                  {weight} кг · {RATES[mode].label} · {RATES[mode].days} дней
                </div>
              </div>
              <a href="https://taopost.vercel.app" target="_blank" rel="noopener noreferrer" style={{
                padding: '14px 28px',
                background: '#1B9E7E', color: 'white',
                borderRadius: '50px', textDecoration: 'none',
                fontWeight: 700, fontSize: '14px',
              }}>
                Оформить заказ →
              </a>
            </div>
          )}

          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '16px', textAlign: 'center' }}>
            * Итоговая стоимость уточняется у менеджера. Цена зависит от объёмного веса и типа товара.
          </p>
        </div>
      </div>
    </section>
  );
}
