'use client';
import { useMemo, useRef, useState } from 'react';
import { Calculator, ArrowDown } from 'lucide-react';
import {
  BUYER_TARIFFS,
  BUYER_PACKAGING,
  MAIN_PACKAGING_IDS,
  USD_MARKUP_RUB,
  bandLabel,
  buyerQuote,
} from '@/lib/cargoTariffs';
import { ymReachGoal } from '@/lib/metrika';
import { OPT_CALC_EVENT, type OptCalcDetail } from '@/components/B2BForm';
import s from './CargoOpt.module.css';

const usd = (n: number) => `${n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`;
const num = (v: string) => Number(v.replace(',', '.'));

/**
 * Калькулятор опта по сетке 2A (как в кабинете байера приложения).
 * Считает доставку, разгрузку и упаковку в $; кнопка переносит расчёт в
 * форму заявки (событие OPT_CALC_EVENT), чтобы менеджер видел, что считал клиент.
 */
export default function CargoCalc() {
  const [tariffId, setTariffId] = useState('special');
  const [weight, setWeight] = useState('300');
  const [volume, setVolume] = useState('1.5');
  const [places, setPlaces] = useState('10');
  const [packId, setPackId] = useState('box');
  const used = useRef(false);

  const tariff = BUYER_TARIFFS.find((t) => t.id === tariffId)!;
  const quote = useMemo(
    () => buyerQuote({
      tariffId,
      weightKg: num(weight),
      volumeM3: num(volume),
      places: num(places),
      mainPackagingId: packId,
      extraPackagingIds: [],
    }),
    [tariffId, weight, volume, places, packId],
  );

  function touch() {
    if (used.current) return;
    used.current = true;
    ymReachGoal('opt_calc_used');
  }

  function sendToForm() {
    if (!quote) return;
    const w = num(weight);
    const v = num(volume);
    const detail: OptCalcDetail = {
      volume: `${w} кг${v > 0 ? `, ${v} м³` : ''}, мест: ${Math.max(1, Math.round(num(places) || 1))}`,
      category: tariff.name,
      summary: [
        `Расчёт с сайта: ${tariff.name}`,
        quote.density != null ? `плотность ${quote.density} кг/м³` : null,
        `доставка ${usd(quote.deliveryUsd)}, разгрузка ${usd(quote.unloadingUsd)}, упаковка ${usd(quote.packagingUsd)}`,
        `итого ≈ ${usd(quote.totalUsd)}`,
      ].filter(Boolean).join('; '),
    };
    window.dispatchEvent(new CustomEvent(OPT_CALC_EVENT, { detail }));
    ymReachGoal('opt_calc_to_form', { tariff: tariff.name });
    document.getElementById('opt-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const w = num(weight);
  const perKg = quote && w > 0 ? quote.totalUsd / w : null;

  return (
    <div className={s.calc} onInput={touch}>
      <div className={s.calcHead}>
        <Calculator size={22} strokeWidth={2.3} />
        <h3 className={s.calcTitle}>Калькулятор оптовой доставки</h3>
      </div>

      <div className={s.calcGrid}>
        <label className={s.field}>
          <span className={s.label}>Вид груза</span>
          <select className={s.input} value={tariffId} onChange={(e) => setTariffId(e.target.value)}>
            {BUYER_TARIFFS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>
        <label className={s.field}>
          <span className={s.label}>Упаковка</span>
          <select className={s.input} value={packId} onChange={(e) => setPackId(e.target.value)}>
            {BUYER_PACKAGING.filter((p) => MAIN_PACKAGING_IDS.includes(p.id)).map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.usd} $/место</option>
            ))}
          </select>
        </label>
        <label className={s.field}>
          <span className={s.label}>Вес, кг</span>
          <input className={s.input} inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label className={s.field}>
          <span className={s.label}>Объём, м³</span>
          <input className={s.input} inputMode="decimal" value={volume} onChange={(e) => setVolume(e.target.value)} />
        </label>
        <label className={s.field}>
          <span className={s.label}>Мест (коробок)</span>
          <input className={s.input} inputMode="numeric" value={places} onChange={(e) => setPlaces(e.target.value)} />
        </label>
      </div>

      {quote ? (
        <div className={s.result}>
          <div className={s.resRow}>
            <span>
              Доставка
              {quote.density != null && <> · плотность {quote.density} кг/м³</>}
              {' · '}ставка {quote.band.usd.toLocaleString('ru-RU')} {quote.band.perM3 ? '$/м³' : '$/кг'}
              <span className={s.resHint}> ({bandLabel(quote.band, tariff.kind)})</span>
            </span>
            <b>{usd(quote.deliveryUsd)}</b>
          </div>
          <div className={s.resRow}><span>Разгрузка на складе</span><b>{usd(quote.unloadingUsd)}</b></div>
          <div className={s.resRow}>
            <span>Упаковка{quote.packagingLines[0] ? ` · ${quote.packagingLines[0].qty} × ${quote.packagingLines[0].usd} $` : ''}</span>
            <b>{usd(quote.packagingUsd)}</b>
          </div>
          <div className={`${s.resRow} ${s.resTotal}`}>
            <span>Итого до Москвы{perKg ? <span className={s.resHint}> ≈ {perKg.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} $/кг</span> : null}</span>
            <b key={quote.totalUsd}>{usd(quote.totalUsd)}</b>
          </div>
          <p className={s.resNote}>
            Предварительный расчёт. Оплата в рублях по курсу ЦБ + {USD_MARKUP_RUB} ₽ за $ на день оплаты.
            Точную сумму менеджер назовёт после взвешивания на складе.
          </p>
          <button type="button" className={s.calcBtn} onClick={sendToForm}>
            Отправить расчёт менеджеру <ArrowDown size={18} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <p className={s.resNote}>
          Укажите вес{tariff.kind === 'density' ? ' и объём — ставка зависит от плотности груза' : ''}.
        </p>
      )}
    </div>
  );
}
