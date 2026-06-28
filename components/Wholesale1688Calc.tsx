'use client';

import { useState, useMemo } from 'react';
import { Calculator as CalcIcon, TrendingUp, AlertTriangle } from 'lucide-react';

const DEFAULT_CNY_RATE = 13;
const COMMISSION_PERCENT = 3;
const INSURANCE_PERCENT = 2;
const AUTO_RATE_RUB_KG = 350;
const AIR_RATE_RUB_KG = 2700;

function rub(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return '0 ₽';
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`;
}

function pct(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return '0%';
  return `${Math.round(value)}%`;
}

export default function Wholesale1688Calc() {
  const [pricePerUnitCNY, setPricePerUnitCNY] = useState<number>(50);
  const [quantity, setQuantity] = useState<number>(100);
  const [weightPerUnitKg, setWeightPerUnitKg] = useState<number>(0.3);
  const [sellPriceRUB, setSellPriceRUB] = useState<number>(2500);
  const [transport, setTransport] = useState<'auto' | 'air'>('auto');
  const [cnyRate, setCnyRate] = useState<number>(DEFAULT_CNY_RATE);

  const calc = useMemo(() => {
    const purchaseCNY = pricePerUnitCNY * quantity;
    const purchaseRUB = purchaseCNY * cnyRate;
    const commissionRUB = purchaseRUB * (COMMISSION_PERCENT / 100);
    const insuranceRUB = purchaseRUB * (INSURANCE_PERCENT / 100);
    const totalWeight = weightPerUnitKg * quantity;
    const tariff = transport === 'auto' ? AUTO_RATE_RUB_KG : AIR_RATE_RUB_KG;
    const deliveryRUB = totalWeight * tariff;
    const totalCostRUB = purchaseRUB + commissionRUB + insuranceRUB + deliveryRUB;
    const costPerUnitRUB = totalCostRUB / Math.max(quantity, 1);
    const revenueRUB = sellPriceRUB * quantity;
    const profitRUB = revenueRUB - totalCostRUB;
    const marginPercent = totalCostRUB > 0 ? (profitRUB / totalCostRUB) * 100 : 0;
    const marginPerUnitRUB = sellPriceRUB - costPerUnitRUB;
    return {
      purchaseRUB,
      commissionRUB,
      insuranceRUB,
      totalWeight,
      deliveryRUB,
      totalCostRUB,
      costPerUnitRUB,
      revenueRUB,
      profitRUB,
      marginPercent,
      marginPerUnitRUB,
      minOrderWarning: totalWeight < 5,
    };
  }, [pricePerUnitCNY, quantity, weightPerUnitKg, sellPriceRUB, transport, cnyRate]);

  const profitable = calc.profitRUB > 0;

  return (
    <section style={{ padding: '70px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#FFEEEC', color: '#FF5A47', borderRadius: '50px',
            padding: '6px 14px', fontSize: '13px', fontWeight: 700,
            marginBottom: '14px', border: '1px solid #FFD7CF',
          }}>
            <CalcIcon size={14} strokeWidth={2.5} />
            Калькулятор окупаемости партии
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 900, color: '#111827',
            letterSpacing: '-0.5px', marginBottom: '10px',
          }}>
            Сколько вы заработаете на партии с 1688
          </h2>
          <p style={{
            fontSize: '16px', color: '#6B7280',
            maxWidth: '620px', margin: '0 auto', lineHeight: 1.6,
          }}>
            Прикиньте маржу до того, как делать заказ. Введите 4 параметра — увидите полную смету
            с закупкой, доставкой, комиссией выкупа и страховкой.
          </p>
        </div>

        <div className="w1688-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* Inputs */}
          <div style={{
            background: '#F9FAFB',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #F3F4F6',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B7280', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Параметры партии
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Field
                label="Цена за единицу на 1688"
                suffix="¥"
                value={pricePerUnitCNY}
                onChange={setPricePerUnitCNY}
                hint={`~ ${rub(pricePerUnitCNY * cnyRate)} по курсу ${cnyRate} ₽/¥`}
              />
              <Field
                label="Количество в партии"
                suffix="шт"
                value={quantity}
                onChange={setQuantity}
                hint="Минимальная партия (MOQ) на 1688 обычно от 10-100 шт"
              />
              <Field
                label="Вес одной единицы"
                suffix="кг"
                value={weightPerUnitKg}
                onChange={setWeightPerUnitKg}
                step={0.05}
                hint={`Партия в сумме весит ~ ${calc.totalWeight.toFixed(1)} кг`}
              />
              <Field
                label="Ваша цена продажи в РФ"
                suffix="₽"
                value={sellPriceRUB}
                onChange={setSellPriceRUB}
                hint="За единицу — для расчёта маржи"
              />

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Способ доставки
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setTransport('auto')}
                    style={{
                      flex: 1, padding: '12px',
                      background: transport === 'auto' ? '#005C43' : '#fff',
                      color: transport === 'auto' ? '#fff' : '#374151',
                      border: `1.5px solid ${transport === 'auto' ? '#005C43' : '#E5E7EB'}`,
                      borderRadius: '10px',
                      fontSize: '14px', fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    Авто · 350 ₽/кг
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransport('air')}
                    style={{
                      flex: 1, padding: '12px',
                      background: transport === 'air' ? '#005C43' : '#fff',
                      color: transport === 'air' ? '#fff' : '#374151',
                      border: `1.5px solid ${transport === 'air' ? '#005C43' : '#E5E7EB'}`,
                      borderRadius: '10px',
                      fontSize: '14px', fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    Авиа · 2 700 ₽/кг
                  </button>
                </div>
              </div>

              <details style={{ fontSize: '13px', color: '#6B7280' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Курс юаня: {cnyRate} ₽/¥</summary>
                <div style={{ marginTop: '8px' }}>
                  <Field
                    label="Курс юаня"
                    suffix="₽/¥"
                    value={cnyRate}
                    onChange={setCnyRate}
                    step={0.1}
                    compact
                  />
                </div>
              </details>
            </div>
          </div>

          {/* Output */}
          <div style={{
            background: profitable
              ? 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 100%)'
              : 'linear-gradient(160deg, #FFF7E8 0%, #ffffff 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: `2px solid ${profitable ? '#c6ede4' : '#FCD34D'}`,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B7280', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Расчёт партии
            </div>

            {calc.minOrderWarning && (
              <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                padding: '12px 14px',
                background: '#FFF7E8',
                border: '1px solid #FCD34D',
                borderRadius: '10px',
                marginBottom: '14px',
                fontSize: '13px', color: '#92400E',
                lineHeight: 1.5,
              }}>
                <AlertTriangle size={16} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Партия меньше 5 кг — минимума для отправки. Увеличьте количество или ищите более тяжёлые товары.</span>
              </div>
            )}

            <Row label="Закупка партии" value={rub(calc.purchaseRUB)} muted />
            <Row label={`Комиссия выкупа ${COMMISSION_PERCENT}%`} value={rub(calc.commissionRUB)} muted />
            <Row label={`Страховка ${INSURANCE_PERCENT}%`} value={rub(calc.insuranceRUB)} muted />
            <Row label={`Доставка (${calc.totalWeight.toFixed(1)} кг)`} value={rub(calc.deliveryRUB)} muted />

            <div style={{
              margin: '14px 0',
              padding: '14px 0',
              borderTop: '1px solid #E5E7EB',
              borderBottom: '1px solid #E5E7EB',
            }}>
              <Row label="Полная себестоимость" value={rub(calc.totalCostRUB)} bold />
              <Row label="На единицу" value={rub(calc.costPerUnitRUB)} small />
            </div>

            <Row label="Выручка от продажи" value={rub(calc.revenueRUB)} muted />

            <div style={{ marginTop: '18px' }}>
              <div style={{
                padding: '20px',
                background: profitable ? 'linear-gradient(135deg, #005C43, #004232)' : '#9CA3AF',
                borderRadius: '14px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <TrendingUp size={22} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '2px' }}>
                    {profitable ? 'Чистая прибыль' : 'Убыток'}
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px' }}>
                    {rub(calc.profitRUB)}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
                    Маржа {pct(calc.marginPercent)} · {rub(calc.marginPerUnitRUB)}/шт
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://t.me/taopostsupport?start=site"
              target="_blank"
              rel="noopener noreferrer"
              data-ym-goal="telegram_click"
              data-ym-params='{"place":"wholesale_calc_1688"}'
              style={{
                marginTop: '18px',
                padding: '14px 24px',
                background: '#FF5A47',
                color: '#fff',
                fontWeight: 800, fontSize: '15px',
                borderRadius: '12px',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 8px 20px -6px rgba(255,90,71,0.45)',
              }}
            >
              Отправить смету менеджеру →
            </a>
            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#6B7280',
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              Расчёт ориентировочный. Финальная смета — после подбора конкретного товара и фабрики.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .w1688-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  step?: number;
  hint?: string;
  compact?: boolean;
};

function Field({ label, value, onChange, suffix, step = 1, hint, compact }: FieldProps) {
  return (
    <div>
      {!compact && (
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#fff',
        border: '1.5px solid #E5E7EB',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          min={0}
          style={{
            flex: 1,
            padding: '12px 14px',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            background: 'transparent',
            width: '100%',
          }}
        />
        {suffix && (
          <span style={{
            padding: '0 14px',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 600,
            background: '#F9FAFB',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
          }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '6px', lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

type RowProps = {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  small?: boolean;
};

function Row({ label, value, muted, bold, small }: RowProps) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: small ? '4px 0' : '8px 0',
    }}>
      <span style={{
        fontSize: small ? '12px' : '14px',
        color: muted ? '#6B7280' : '#111827',
        fontWeight: bold ? 800 : 500,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: small ? '12px' : (bold ? '17px' : '14px'),
        color: muted ? '#374151' : '#111827',
        fontWeight: bold ? 900 : 700,
        letterSpacing: bold ? '-0.3px' : 0,
      }}>
        {value}
      </span>
    </div>
  );
}
