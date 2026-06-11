'use client';
import { useState, useMemo } from 'react';
import { Send, Truck, Plane, Ruler, Coins, Sparkles, Clock, Package, Footprints } from 'lucide-react';

type Transport = 'auto' | 'air';

const RATES: Record<Transport, number> = { auto: 350, air: 2700 };
const TERMS: Record<Transport, string> = { auto: '15–25 дней', air: '3–5 дней' };
const INSURANCE_RATE = 0.02;
const VOL_DIVISOR = 6000;

type BoxPreset = {
  id: string;
  name: string;
  dims: [number, number, number];
  maxWeight: number;
  desc: string;
};

const MIN_WEIGHT = 5;

// Минимальная отправка от 5 кг. Габариты — типичные для соответствующего веса.
const BOXES: BoxPreset[] = [
  { id: 'base', name: '5 кг', dims: [40, 30, 25], maxWeight: 5, desc: 'Одежда, обувь, аксессуары' },
  { id: 'm', name: '10 кг', dims: [50, 40, 30], maxWeight: 10, desc: 'Несколько вещей, электроника' },
  { id: 'l', name: '20 кг', dims: [60, 50, 40], maxWeight: 20, desc: 'Объёмный заказ, текстиль' },
  { id: 'xl', name: '30 кг', dims: [70, 60, 50], maxWeight: 30, desc: 'Малый опт, бизнес' },
];

const formatRub = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n));

export default function Calculator() {
  const [transport, setTransport] = useState<Transport>('auto');
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [selectedBox, setSelectedBox] = useState('base');
  const [customWeight, setCustomWeight] = useState('');
  const [customL, setCustomL] = useState('');
  const [customW, setCustomW] = useState('');
  const [customH, setCustomH] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const calc = useMemo(() => {
    let weight = 0;
    let volWeight = 0;
    if (mode === 'preset') {
      const box = BOXES.find(b => b.id === selectedBox);
      if (box) {
        weight = box.maxWeight;
        volWeight = (box.dims[0] * box.dims[1] * box.dims[2]) / VOL_DIVISOR;
      }
    } else {
      weight = parseFloat(customWeight.replace(',', '.')) || 0;
      const l = parseFloat(customL.replace(',', '.')) || 0;
      const w = parseFloat(customW.replace(',', '.')) || 0;
      const h = parseFloat(customH.replace(',', '.')) || 0;
      volWeight = (l * w * h) / VOL_DIVISOR;
    }
    const chargeable = Math.max(weight, volWeight);
    const shipping = chargeable * RATES[transport];
    const insurance = (parseFloat(itemPrice.replace(/\s/g, '').replace(',', '.')) || 0) * INSURANCE_RATE;
    const total = shipping + insurance;
    return { weight, volWeight, chargeable, shipping, insurance, total };
  }, [transport, mode, selectedBox, customWeight, customL, customW, customH, itemPrice]);

  const hasResult = calc.chargeable > 0;

  const tgUrl = useMemo(() => {
    const box = BOXES.find(b => b.id === selectedBox);
    const lines = [
      '📦 *Запрос на доставку из Китая*',
      '',
      `🚛 ${transport === 'auto' ? 'Автодоставка' : 'Авиадоставка'} (${TERMS[transport]})`,
      mode === 'preset' && box
        ? `📐 Размер: ${box.name} — ${box.dims.join('×')} см, до ${box.maxWeight} кг`
        : `⚖ Вес: ${customWeight || '?'} кг · Габариты: ${customL || '?'}×${customW || '?'}×${customH || '?'} см`,
      itemPrice ? `💰 Стоимость товара: ${formatRub(parseFloat(itemPrice.replace(/\s/g, '').replace(',', '.')) || 0)} ₽` : null,
      hasResult ? `📊 Предварительный расчёт: ≈ ${formatRub(calc.total)} ₽` : null,
    ].filter(Boolean).join('\n');
    return `https://t.me/taopostsupport?text=${encodeURIComponent(lines)}`;
  }, [transport, mode, selectedBox, customWeight, customL, customW, customH, itemPrice, calc.total, hasResult]);

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
            Рассчитайте стоимость <span className="tp-gradient-text">за секунду</span>
          </h2>
          <p className="tp-lede">
            Мгновенный расчёт по объёмному весу. Без формы и ожидания менеджера
          </p>
          <div className="tp-min-policy">
            <div className="tp-min-policy__item">
              <span className="tp-min-policy__icon tp-min-policy__icon--coral">
                <Package size={18} strokeWidth={2.5} />
              </span>
              <span>
                <strong>Taobao</strong> и <strong>Pinduoduo</strong>
                <span className="tp-min-policy__val"> — от 5 кг</span>
              </span>
            </div>
            <div className="tp-min-policy__sep" />
            <div className="tp-min-policy__item">
              <span className="tp-min-policy__icon tp-min-policy__icon--green">
                <Footprints size={18} strokeWidth={2.5} />
              </span>
              <span>
                <strong>Poizon</strong>
                <span className="tp-min-policy__val"> — от 1 пары кроссовок</span>
              </span>
            </div>
          </div>
        </div>

        <div className="calc__grid">
          {/* LEFT: form */}
          <div className="tp-card calc__form">
            <div className="calc__block">
              <div className="calc__label">Способ доставки</div>
              <div className="calc__transport">
                {([
                  { key: 'auto' as const, Icon: Truck, title: 'Автодоставка', meta: 'от 350 ₽/кг · 15–25 дней' },
                  { key: 'air' as const, Icon: Plane, title: 'Авиадоставка', meta: 'от 2 700 ₽/кг · 3–5 дней' },
                ]).map(({ key, Icon, title, meta }) => {
                  const active = transport === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTransport(key)}
                      className={`calc__transportBtn${active ? ' calc__transportBtn--active' : ''}`}
                    >
                      <div className="calc__transportTitle">
                        <Icon size={18} strokeWidth={2.3} />
                        {title}
                      </div>
                      <div className="calc__transportInfo">{meta}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="calc__block">
              <div className="calc__label">Размер посылки</div>
              <div className="calc__boxes">
                {BOXES.map(box => {
                  const active = mode === 'preset' && selectedBox === box.id;
                  return (
                    <button
                      key={box.id}
                      type="button"
                      onClick={() => { setMode('preset'); setSelectedBox(box.id); }}
                      className={`calc__box${active ? ' calc__box--active' : ''}`}
                    >
                      <div className="calc__boxHead">
                        <span className="calc__boxName">{box.name}</span>
                        <span className="calc__boxWeight">до {box.maxWeight} кг</span>
                      </div>
                      <div className="calc__boxDims">{box.dims.join('×')} см</div>
                      <div className="calc__boxDesc">{box.desc}</div>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setMode('custom')}
                  className={`calc__box calc__box--custom${mode === 'custom' ? ' calc__box--active' : ''}`}
                >
                  <div className="calc__boxHead">
                    <span className="calc__boxName">
                      <Ruler size={14} strokeWidth={2.4} />
                      Свои габариты
                    </span>
                  </div>
                  <div className="calc__boxDesc">Укажите вес и размеры вручную</div>
                </button>
              </div>

              {mode === 'custom' && (
                <div className="calc__custom">
                  <div className="calc__customRow">
                    <label className="calc__field">
                      <span className="calc__fieldLabel">Вес, кг</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={customWeight}
                        onChange={e => setCustomWeight(e.target.value.replace(/[^\d.,]/g, ''))}
                        placeholder="5"
                        className="calc__input"
                      />
                    </label>
                    <label className="calc__field">
                      <span className="calc__fieldLabel">Длина, см</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={customL}
                        onChange={e => setCustomL(e.target.value.replace(/[^\d.,]/g, ''))}
                        placeholder="40"
                        className="calc__input"
                      />
                    </label>
                    <label className="calc__field">
                      <span className="calc__fieldLabel">Ширина, см</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={customW}
                        onChange={e => setCustomW(e.target.value.replace(/[^\d.,]/g, ''))}
                        placeholder="30"
                        className="calc__input"
                      />
                    </label>
                    <label className="calc__field">
                      <span className="calc__fieldLabel">Высота, см</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={customH}
                        onChange={e => setCustomH(e.target.value.replace(/[^\d.,]/g, ''))}
                        placeholder="20"
                        className="calc__input"
                      />
                    </label>
                  </div>
                  {calc.chargeable > 0 && calc.chargeable < MIN_WEIGHT && (
                    <div className="calc__warn">
                      Минимальная отправка — {MIN_WEIGHT} кг. Совместный выкуп поможет добрать вес — напишите нам.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="calc__block">
              <label className="calc__field calc__field--full">
                <span className="calc__label">
                  Стоимость товара
                  <span className="calc__labelHint">для расчёта страховки 2%</span>
                </span>
                <div className="calc__priceInputWrap">
                  <Coins size={16} strokeWidth={2.4} className="calc__priceIcon" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value.replace(/[^\d.,\s]/g, ''))}
                    placeholder="Например, 15 000"
                    className="calc__input calc__input--price"
                  />
                  <span className="calc__priceCur">₽</span>
                </div>
              </label>
            </div>
          </div>

          {/* RIGHT: live result */}
          <div className="calc__result">
            <div className="calc__resultCard">
              <div className="calc__resultLabel">Стоимость доставки</div>
              <div className="calc__resultTotal">
                {hasResult ? (
                  <>
                    <span className="calc__approx">≈</span>
                    <span className="calc__totalValue">{formatRub(calc.total)}</span>
                    <span className="calc__totalCur">₽</span>
                  </>
                ) : (
                  <span className="calc__totalEmpty">— ₽</span>
                )}
              </div>

              {hasResult && (
                <div className="calc__resultMeta">
                  <div className="calc__metaRow">
                    <Clock size={14} strokeWidth={2.4} />
                    <span>Срок: <b>{TERMS[transport]}</b> до Москвы</span>
                  </div>
                  <div className="calc__metaRow">
                    <Sparkles size={14} strokeWidth={2.4} />
                    <span>Расчётный вес: <b>{calc.chargeable.toFixed(2)} кг</b></span>
                  </div>
                  {calc.insurance > 0 && (
                    <div className="calc__metaRow">
                      <span className="calc__metaDot" />
                      <span>В т.ч. страховка: <b>{formatRub(calc.insurance)} ₽</b></span>
                    </div>
                  )}
                </div>
              )}

              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`tp-btn tp-btn--primary tp-btn--lg calc__cta${!hasResult ? ' calc__cta--muted' : ''}`}
              >
                <Send size={18} strokeWidth={2.5} />
                {hasResult ? 'Оформить заявку' : 'Уточнить у менеджера'}
              </a>

              <div className="calc__note">
                Доставка по РФ от Москвы (СДЭК, Boxberry, курьер) оплачивается отдельно — рассчитаем при оформлении.
                Точная цена зависит от категории товара и подтверждается менеджером.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calc__wrap {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }
        .calc__warn {
          margin-top: 14px;
          padding: 12px 16px;
          background: rgba(255, 90, 71,0.10);
          border: 1px solid rgba(255, 90, 71,0.22);
          border-radius: 12px;
          color: var(--coral-dark);
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.5;
        }
        .calc__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .calc__form {
          padding: 32px;
        }
        .calc__block {
          margin-bottom: 26px;
        }
        .calc__block:last-child { margin-bottom: 0; }

        .calc__label {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 10px;
        }
        .calc__labelHint {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .calc__transport {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .calc__transportBtn {
          padding: 14px 16px;
          border-radius: 14px;
          border: 2px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          text-align: left;
          transition: all .15s;
          font-family: inherit;
        }
        .calc__transportBtn:hover:not(.calc__transportBtn--active) {
          border-color: #D1D5DB;
        }
        .calc__transportBtn--active {
          border-color: var(--green);
          background: rgba(0, 92, 67,0.06);
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
          font-size: 12.5px;
          color: var(--text-muted);
          margin-top: 4px;
          padding-left: 26px;
        }

        .calc__boxes {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
        }
        .calc__box {
          padding: 14px;
          background: #fff;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          transition: all .15s;
          font-family: inherit;
        }
        .calc__box:hover:not(.calc__box--active) {
          border-color: #D1D5DB;
        }
        .calc__box--active {
          border-color: var(--green);
          background: rgba(0, 92, 67,0.06);
        }
        .calc__box--custom { grid-column: 1 / -1; }
        .calc__boxHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }
        .calc__boxName {
          font-size: 14px;
          font-weight: 800;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .calc__boxWeight {
          font-size: 11.5px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .calc__boxDims {
          font-size: 12.5px;
          color: var(--green-dark);
          font-weight: 700;
          margin-bottom: 2px;
        }
        .calc__boxDesc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .calc__custom {
          margin-top: 14px;
        }
        .calc__customRow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .calc__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .calc__field--full { width: 100%; }
        .calc__fieldLabel {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .calc__input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 2px solid #E5E7EB;
          font-size: 14px;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          background: #fff;
          color: var(--ink);
          box-sizing: border-box;
          font-family: inherit;
        }
        .calc__input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(0, 92, 67,0.12);
        }

        .calc__priceInputWrap {
          position: relative;
        }
        .calc__priceIcon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .calc__input--price {
          padding-left: 38px;
          padding-right: 32px;
          font-size: 15px;
        }
        .calc__priceCur {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-weight: 700;
          font-size: 14px;
          pointer-events: none;
        }

        /* Result */
        .calc__result {
          position: sticky;
          top: 88px;
        }
        .calc__resultCard {
          background: linear-gradient(160deg, #fff 0%, rgba(0, 92, 67,0.04) 100%);
          border: 1px solid rgba(0, 92, 67,0.18);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 18px 50px -20px rgba(10,15,28,0.18);
        }
        .calc__resultLabel {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .calc__resultTotal {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 18px;
          min-height: 56px;
        }
        .calc__approx {
          font-size: 22px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .calc__totalValue {
          font-size: clamp(40px, 5vw, 54px);
          font-weight: 900;
          color: var(--ink);
          letter-spacing: -2px;
          line-height: 1;
          background: linear-gradient(90deg, var(--green-dark), var(--coral-dark));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .calc__totalCur {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-muted);
        }
        .calc__totalEmpty {
          font-size: 40px;
          font-weight: 900;
          color: #D1D5DB;
          letter-spacing: -1px;
        }

        .calc__resultMeta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          padding: 14px 16px;
          background: rgba(0, 92, 67,0.06);
          border-radius: 12px;
        }
        .calc__metaRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--text-muted);
        }
        .calc__metaRow b {
          color: var(--ink);
          font-weight: 700;
        }
        .calc__metaRow :global(svg) { color: var(--green-dark); flex-shrink: 0; }
        .calc__metaDot {
          width: 14px;
          height: 14px;
          display: inline-block;
          flex-shrink: 0;
          position: relative;
        }
        .calc__metaDot::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--coral);
        }

        .calc__cta {
          width: 100%;
          justify-content: center;
        }
        .calc__cta--muted {
          background: var(--ink);
          box-shadow: none;
        }

        .calc__note {
          margin-top: 14px;
          font-size: 12px;
          color: #9CA3AF;
          line-height: 1.55;
          text-align: center;
        }

        @media (max-width: 900px) {
          .calc__grid { grid-template-columns: 1fr; }
          .calc__result { position: static; }
        }
        @media (max-width: 600px) {
          .calc__form { padding: 24px 20px; }
          .calc__resultCard { padding: 22px; }
          .calc__transport { grid-template-columns: 1fr; }
          .calc__customRow { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
