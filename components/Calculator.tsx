'use client';
import { useState } from 'react';
import { Send, Truck, Plane, MapPin, Clock, Coins, CheckCircle2 } from 'lucide-react';

const ROUTES = [
  { city: 'Иу', label: 'Иу (Yiwu)', auto: { days: '15–20 дней', price: '2.7–3.3 $/кг' }, air: null },
  { city: 'Гуанчжоу', label: 'Гуанчжоу (Guangzhou)', auto: { days: '18–25 дней', price: '2.7–3.3 $/кг' }, air: null },
  { city: 'Пекин', label: 'Пекин (Beijing)', auto: null, air: { days: '3–5 дней', price: 'от 25 $/кг' } },
  { city: 'Цзиси', label: 'Цзиси (Jixi) — скоро', auto: { days: 'уточняется', price: 'скоро' }, air: null },
];

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

  const isValid = Boolean(fromCity && toCity && weight && phone);

  return (
    <section id="calculator" className="tp-section tp-section--muted">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tl" />
      <div className="tp-mesh tp-mesh--green tp-mesh--br" />

      <div className="calc__wrap">
        <div className="tp-section__head">
          <span className="tp-eyebrow tp-eyebrow--coral">
            <span className="tp-eyebrow__dot" />
            Калькулятор
          </span>
          <h2 className="tp-h2">
            Рассчитай стоимость<br />
            <span className="tp-gradient-text">доставки</span>
          </h2>
          <p className="tp-lede">
            Заполните форму — менеджер свяжется и назовёт точную цену
          </p>
        </div>

        <div className="tp-card calc__form">
          <div className="calc__row">
            <div className="calc__field">
              <label className="calc__label">Город отправки в Китае</label>
              <select
                value={fromCity}
                onChange={e => { setFromCity(e.target.value); setTransport('auto'); }}
                className="calc__input calc__input--select"
              >
                <option value="">Выберите город</option>
                {ROUTES.map(r => (
                  <option key={r.city} value={r.city}>{r.label}</option>
                ))}
              </select>
            </div>
            <div className="calc__field">
              <label className="calc__label">Город получения в России</label>
              <input
                type="text"
                value={toCity}
                onChange={e => setToCity(e.target.value)}
                placeholder="Например: Москва"
                className="calc__input"
              />
            </div>
          </div>

          <div className="calc__field calc__field--full">
            <label className="calc__label">Вид транспорта</label>
            <div className="calc__transport">
              {[
                { key: 'auto' as const, Icon: Truck, label: 'Автодоставка' },
                { key: 'air' as const, Icon: Plane, label: 'Авиадоставка' },
              ].map(({ key, Icon, label }) => {
                const disabled = fromCity ? !selectedRoute?.[key] : false;
                const active = transport === key;
                const info = fromCity && !disabled ? selectedRoute?.[key] : null;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !disabled && setTransport(key)}
                    disabled={disabled}
                    className={`calc__transportBtn${active ? ' calc__transportBtn--active' : ''}${disabled ? ' calc__transportBtn--disabled' : ''}`}
                  >
                    <div className="calc__transportTitle">
                      <Icon size={18} strokeWidth={2.3} />
                      {label}
                    </div>
                    {info && (
                      <div className="calc__transportInfo">
                        {info.days} · {info.price}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calc__row">
            <div className="calc__field">
              <label className="calc__label">Общий вес (кг) *</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Например: 10"
                className="calc__input"
              />
            </div>
            <div className="calc__field">
              <label className="calc__label">
                Общий объём (м³) <span className="calc__labelMuted">необязательно</span>
              </label>
              <input
                type="number"
                min="0.001"
                step="0.001"
                value={volume}
                onChange={e => setVolume(e.target.value)}
                placeholder="Например: 0.5"
                className="calc__input"
              />
            </div>
          </div>

          <div className="calc__field calc__field--full">
            <label className="calc__label">Номер телефона *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+7 (999) 000-00-00"
              className="calc__input"
            />
          </div>

          {fromCity && routeInfo && (
            <div className="calc__summary">
              <div className="calc__summaryItem">
                <MapPin size={14} strokeWidth={2.5} />
                <div>
                  <div className="calc__summaryLabel">Маршрут</div>
                  <div className="calc__summaryValue">{fromCity} → {toCity || '...'}</div>
                </div>
              </div>
              <div className="calc__summaryItem">
                <Clock size={14} strokeWidth={2.5} />
                <div>
                  <div className="calc__summaryLabel">Срок</div>
                  <div className="calc__summaryValue calc__summaryValue--accent">{routeInfo.days}</div>
                </div>
              </div>
              <div className="calc__summaryItem">
                <Coins size={14} strokeWidth={2.5} />
                <div>
                  <div className="calc__summaryLabel">Цена</div>
                  <div className="calc__summaryValue calc__summaryValue--accent">{routeInfo.price}</div>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className={`tp-btn tp-btn--primary tp-btn--lg calc__submit${!isValid ? ' calc__submit--disabled' : ''}`}
          >
            <Send size={18} strokeWidth={2.5} />
            Запросить расчёт доставки
          </button>

          {sent && (
            <div className="calc__sent">
              <CheckCircle2 size={18} strokeWidth={2.5} />
              Заявка отправлена! Менеджер свяжется с вами в ближайшее время.
            </div>
          )}

          <p className="calc__note">
            * Итоговая стоимость уточняется менеджером. Цена зависит от объёмного веса и характера груза.
          </p>
        </div>
      </div>

      <style jsx>{`
        .calc__wrap {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
        }
        .calc__form {
          padding: 40px;
        }
        .calc__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .calc__field { min-width: 0; }
        .calc__field--full { margin-bottom: 18px; }
        .calc__label {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          display: block;
          margin-bottom: 8px;
        }
        .calc__labelMuted {
          color: var(--text-muted);
          font-weight: 400;
        }
        .calc__input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          font-size: 15px;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          background: #fff;
          color: var(--ink);
          box-sizing: border-box;
          font-family: inherit;
        }
        .calc__input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(27,158,126,0.12);
        }
        .calc__input--select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 44px;
        }

        .calc__transport {
          display: flex;
          gap: 12px;
        }
        .calc__transportBtn {
          flex: 1;
          padding: 14px 16px;
          border-radius: 14px;
          border: 2px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          text-align: left;
          transition: all .15s;
          font-family: inherit;
        }
        .calc__transportBtn--active {
          border-color: var(--green);
          background: rgba(27,158,126,0.06);
        }
        .calc__transportBtn--disabled {
          background: #F9FAFB;
          cursor: not-allowed;
          opacity: .4;
        }
        .calc__transportTitle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 800;
          color: #374151;
        }
        .calc__transportBtn--active .calc__transportTitle { color: var(--green-dark); }
        .calc__transportInfo {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          padding-left: 26px;
        }

        .calc__summary {
          background: linear-gradient(135deg, rgba(27,158,126,0.08), rgba(255,107,71,0.08));
          border: 1px solid rgba(27,158,126,0.18);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .calc__summaryItem {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .calc__summaryItem :global(svg) {
          color: var(--green-dark);
          margin-top: 3px;
        }
        .calc__summaryLabel {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 600;
        }
        .calc__summaryValue {
          font-size: 15px;
          font-weight: 800;
          color: var(--ink);
          margin-top: 2px;
        }
        .calc__summaryValue--accent { color: var(--green-dark); }

        .calc__submit {
          width: 100%;
          margin-top: 4px;
        }
        .calc__submit--disabled {
          background: #E5E7EB;
          color: #9CA3AF;
          box-shadow: none;
          cursor: not-allowed;
          pointer-events: none;
        }

        .calc__sent {
          margin-top: 16px;
          padding: 14px 16px;
          background: rgba(27,158,126,0.08);
          border: 1px solid rgba(27,158,126,0.22);
          border-radius: 12px;
          font-size: 14px;
          color: var(--green-dark);
          font-weight: 600;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          box-sizing: border-box;
        }
        .calc__note {
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 16px;
          text-align: center;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .calc__row { grid-template-columns: 1fr; gap: 18px; }
          .calc__form { padding: 28px 22px; }
          .calc__transport { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
