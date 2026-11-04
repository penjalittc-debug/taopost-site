'use client';
import { useState } from 'react';
import { BUYER_TARIFFS, bandLabel } from '@/lib/cargoTariffs';
import s from './CargoOpt.module.css';

const fmt = (n: number) => n.toLocaleString('ru-RU');

/**
 * Тарифы вкладками: вид груза → ступени. Полоска показывает ставку
 * относительно самой дорогой ступени тарифа — видно, как дешевеет кг с ростом
 * плотности. Ступени «за м³» (лёгкий груз) идут отдельной строкой без полоски.
 */
export default function TariffTabs() {
  const [active, setActive] = useState(BUYER_TARIFFS[0].id);
  const tariff = BUYER_TARIFFS.find((t) => t.id === active)!;
  const perKg = tariff.bands.filter((b) => !b.perM3);
  const max = Math.max(...perKg.map((b) => b.usd));

  return (
    <div className={s.tabs}>
      <div className={s.tabList} role="tablist" aria-label="Вид груза">
        {BUYER_TARIFFS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            className={`${s.tab} ${t.id === active ? s.tabActive : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className={s.tabPanel} role="tabpanel" key={tariff.id}>
        <div className={s.tabMeta}>
          <span>{tariff.kind === 'density' ? 'Ставка по плотности груза (кг/м³)' : 'Ставка по весу груза'}</span>
          <b>от {fmt(Math.min(...perKg.map((b) => b.usd)))} $/кг</b>
        </div>
        <ul className={s.bars}>
          {tariff.bands.map((b, i) => (
            <li key={`${b.from}-${b.to}`} className={s.bar} style={{ animationDelay: `${i * 35}ms` }}>
              <span className={s.barLabel}>{bandLabel(b, tariff.kind)}</span>
              <span className={s.barTrack}>
                {b.perM3 ? (
                  <span className={s.barM3}>лёгкий груз — за кубометр</span>
                ) : (
                  <span
                    className={s.barFill}
                    style={{ width: `${Math.max(18, (b.usd / max) * 100)}%`, animationDelay: `${i * 35}ms` }}
                  />
                )}
              </span>
              <span className={s.barValue}>{fmt(b.usd)} $/{b.perM3 ? 'м³' : 'кг'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
