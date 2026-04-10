'use client';
import { useState } from 'react';

const ROUTES = [
  { city: 'Иу', label: 'Иу (Yiwu)', auto: { days: '15–20 дней', price: '2.7–3.3 $/кг' }, air: null },
  { city: 'Гуанчжоу', label: 'Гуанчжоу (Guangzhou)', auto: { days: '18–25 дней', price: '2.7–3.3 $/кг' }, air: null },
  { city: 'Пекин', label: 'Пекин (Beijing)', auto: null, air: { days: '3–5 дней', price: 'от 25 $/кг' } },
  { city: 'Цзиси', label: 'Цзиси (Jixi) — скоро', auto: { days: 'уточняется', price: 'скоро' }, air: null },
];

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '2px solid #E5E7EB',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.15s',
  background: 'white',
  color: '#111827',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#374151',
  display: 'block',
  marginBottom: '8px',
};

export default function Calculator() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [transport, setTransport] = useState<'auto' | 'air'>('auto');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const selectedRoute = ROUTES.find(r => r.city === fromCity);
  const routeInfo = selectedRoute?.[transport];

  const handleSubmit = () => {
    if (!fromCity || !toCity || !weight || !phone) return;

    const transportLabel = transport === 'auto' ? 'Автодоставка' : 'Авиадоставка';
    const lines = [
      '📦 *Запрос расчёта доставки*',
      '',
      `🏙 Откуда: ${fromCity} (Китай)`,
      `📍 Куда: ${toCity} (Россия)`,
      `🚛 Вид транспорта: ${transportLabel}`,
      `⚖️ Вес: ${weight} кг`,
      volume ? `📐 Объём: ${volume} м³` : null,
      routeInfo ? `⏱ Примерный срок: ${routeInfo.days}` : null,
      routeInfo ? `💰 Ориентировочная цена: ${routeInfo.price}` : null,
      '',
      `📞 Телефон: ${phone}`,
    ].filter(Boolean).join('\n');

    const url = `https://t.me/taopostmaneger?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
    setSent(true);
  };

  const isValid = fromCity && toCity && weight && phone;

  return (
    <section id="calculator" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

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
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Рассчитай стоимость<br />
            <span style={{ color: '#1B9E7E' }}>доставки</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Заполните форму — менеджер свяжется и назовёт точную цену
          </p>
        </div>

        <div className="form-box" style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid #F3F4F6',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>

          {/* Row 1: from / to */}
          <div className="calc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Город отправки в Китае</label>
              <select
                value={fromCity}
                onChange={e => { setFromCity(e.target.value); setTransport('auto'); }}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = '#1B9E7E'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              >
                <option value="">Выберите город</option>
                {ROUTES.map(r => (
                  <option key={r.city} value={r.city}>{r.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Город получения в России</label>
              <input
                type="text"
                value={toCity}
                onChange={e => setToCity(e.target.value)}
                placeholder="Например: Москва"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1B9E7E'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          {/* Row 2: transport */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Вид транспорта</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { key: 'auto', icon: '🚛', label: 'Автодоставка', disabled: fromCity ? !selectedRoute?.auto : false },
                { key: 'air', icon: '✈️', label: 'Авиадоставка', disabled: fromCity ? !selectedRoute?.air : false },
              ].map(({ key, icon, label, disabled }) => (
                <button
                  key={key}
                  onClick={() => !disabled && setTransport(key as 'auto' | 'air')}
                  disabled={disabled}
                  style={{
                    flex: 1, padding: '14px 16px',
                    borderRadius: '14px',
                    border: transport === key ? '2px solid #1B9E7E' : '2px solid #E5E7EB',
                    background: transport === key ? '#e8f7f3' : disabled ? '#F9FAFB' : 'white',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                    textAlign: 'left' as const,
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 800, color: transport === key ? '#1B9E7E' : '#374151' }}>
                    {icon} {label}
                  </div>
                  {fromCity && !disabled && (selectedRoute?.[key as 'auto' | 'air']) && (
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                      {selectedRoute![key as 'auto' | 'air']!.days} · {selectedRoute![key as 'auto' | 'air']!.price}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: weight / volume */}
          <div className="calc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Общий вес (кг) *</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Например: 10"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1B9E7E'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div>
              <label style={labelStyle}>Общий объём (м³) <span style={{ color: '#9CA3AF', fontWeight: 400 }}>необязательно</span></label>
              <input
                type="number"
                min="0.001"
                step="0.001"
                value={volume}
                onChange={e => setVolume(e.target.value)}
                placeholder="Например: 0.5"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1B9E7E'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          {/* Row 4: phone */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Номер телефона *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+7 (999) 000-00-00"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1B9E7E'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Delivery info block */}
          {fromCity && routeInfo && (
            <div style={{
              background: 'linear-gradient(135deg, #e8f7f3, #f0fdf9)',
              borderRadius: '14px', padding: '18px 20px',
              border: '1px solid #c6ede4',
              display: 'flex', gap: '24px', flexWrap: 'wrap',
              marginBottom: '24px',
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>Маршрут</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>{fromCity} → {toCity || '...'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>Срок доставки</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1B9E7E' }}>{routeInfo.days}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>Ориентировочная цена</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1B9E7E' }}>{routeInfo.price}</div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            style={{
              width: '100%',
              padding: '18px',
              background: isValid ? 'linear-gradient(135deg, #1B9E7E, #0D7A5F)' : '#E5E7EB',
              color: isValid ? 'white' : '#9CA3AF',
              fontWeight: 800, fontSize: '16px',
              borderRadius: '14px', border: 'none',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 4px 14px rgba(27,158,126,0.35)' : 'none',
              transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Запросить расчёт доставки
          </button>

          {sent && (
            <div style={{
              marginTop: '16px', padding: '14px',
              background: '#e8f7f3', borderRadius: '12px',
              fontSize: '14px', color: '#1B9E7E', fontWeight: 600,
              textAlign: 'center', border: '1px solid #c6ede4',
            }}>
              ✅ Заявка отправлена! Менеджер свяжется с вами в ближайшее время.
            </div>
          )}

          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '16px', textAlign: 'center', lineHeight: 1.6 }}>
            * Итоговая стоимость уточняется менеджером. Цена зависит от объёмного веса и характера груза.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .calc-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
