'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Loader2, MapPin, Mail, Package, Ruler, Send, Store, Truck, User, Warehouse, X, Footprints,
} from 'lucide-react';

// Калькулятор посылки «как в приложении» (решение владельца 22.08.2026):
// порт src/components/ParcelCalc.tsx из личного кабинета. Старый калькулятор
// показывал только цену Китай→Москва — этот считает под ключ до города
// клиента: карго + получение (самовывоз / СДЭК ПВЗ / СДЭК курьер / Почта).
// Города и тарифы СДЭК/Почты тянем с публичного API приложения
// (app.taopost.ru/api/public/calc/*, CORS открыт для taopost.ru).

const API_BASE = 'https://app.taopost.ru/api/public/calc';

// ── Тарифное ядро: копия констант src/lib/tariff.ts приложения ──
// Единый тариф 450 ₽/кг (21.08.2026), вес округляется вверх до 0,5 кг,
// объёмный вес НЕ применяется, упаковка включена.
const RATE_RUB = 450;
const WEIGHT_STEP_KG = 0.5;
const CARGO_DAYS_MIN = 20;
const CARGO_DAYS_MAX = 25;

function billableKg(actual: number): number {
  if (!actual || actual <= 0 || !Number.isFinite(actual)) return 0;
  const precise = Math.round(actual * 1000) / 1000;
  return Math.ceil(precise / WEIGHT_STEP_KG) * WEIGHT_STEP_KG;
}

// Стандартные коробки СДЭК — те же пресеты, что в приложении.
type BoxPreset = { id: string; name: string; l: number; w: number; h: number; maxKg: number; hint: string };
const BOX_PRESETS: BoxPreset[] = [
  { id: 'mini',  name: 'MINI',  l: 23, w: 17, h: 13, maxKg: 0.6, hint: 'Футболка, сумка, ремень' },
  { id: 'small', name: 'SMALL', l: 36, w: 26, h: 14, maxKg: 1.5, hint: 'Пара обуви в коробке' },
  { id: 'large', name: 'LARGE', l: 40, w: 29, h: 16, maxKg: 2.5, hint: 'Обувь + несколько вещей' },
  { id: 'y08',   name: 'Y-08',  l: 37, w: 29, h: 28, maxKg: 3.5, hint: 'Две пары обуви + вещи' },
];

type City = { code: number; city: string; region: string; fullName: string };
type Tariff = { sum: number; periodMin: number; periodMax: number; tariffCode: number; tariffName: string };
type PochtaQuote = { sum: number; periodMin: number; periodMax: number; name: string };
type RatesResponse = { pickup: Tariff | null; courier: Tariff | null; pochta: PochtaQuote | null };

const fmtRub = (n: number) => `${Math.round(n).toLocaleString('ru-RU')} ₽`;
const parseNum = (s: string) => parseFloat(s.replace(',', '.')) || 0;
function etaDate(extraDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + CARGO_DAYS_MAX + extraDays);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
}

export default function ParcelCalculator() {
  const [boxId, setBoxId] = useState<string>('small');
  const [weightStr, setWeightStr] = useState('');
  const [dimL, setDimL] = useState('');
  const [dimW, setDimW] = useState('');
  const [dimH, setDimH] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manual = boxId === 'manual';
  const box = BOX_PRESETS.find((b) => b.id === boxId) || null;
  const weightKg = manual ? parseNum(weightStr) : (box?.maxKg ?? 0);
  const dims = manual
    ? { l: parseNum(dimL) || undefined, w: parseNum(dimW) || undefined, h: parseNum(dimH) || undefined }
    : { l: box?.l, w: box?.w, h: box?.h };

  const billable = billableKg(weightKg);
  const cargoRub = billable * RATE_RUB;
  const weightG = Math.round(weightKg * 1000);
  const hasWeight = weightG >= 100;
  // Потолок стороны — 99 см (реш. владельца 01.09.2026). Крупногабарит
  // СДЭК-калькулятор считает по минимальному тарифу и цена врёт в меньшую
  // сторону. Больше 99 см — индивидуальный расчёт через менеджера.
  const MAX_SIDE_CM = 99;
  const oversize = manual && [dims.l, dims.w, dims.h].some((v) => (v ?? 0) > MAX_SIDE_CM);
  const isMoscow = !!city && (city.code === 44 || city.city.trim().toLowerCase() === 'москва');

  // Тарифы СДЭК + Почты на смену города/веса/габаритов, с дебаунсом.
  useEffect(() => {
    if (!city || weightG < 100 || oversize) { setRates(null); return; }
    let cancelled = false;
    setLoading(true); setError(null);
    const params = new URLSearchParams({ to: String(city.code), weightG: String(weightG) });
    if (dims.l) params.set('l', String(dims.l));
    if (dims.w) params.set('w', String(dims.w));
    if (dims.h) params.set('h', String(dims.h));
    const timer = setTimeout(() => {
      fetch(`${API_BASE}/rates?${params.toString()}`)
        .then((r) => r.json())
        .then((d: RatesResponse & { error?: string }) => {
          if (cancelled) return;
          if (d?.error) { setError(d.error); setRates(null); }
          else setRates(d);
        })
        .catch(() => { if (!cancelled) setError('Не удалось получить тарифы — попробуйте ещё раз'); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 350);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, weightG, dims.l, dims.w, dims.h, oversize]);

  const ymParams = JSON.stringify({
    place: 'calculator',
    weight: billable,
    city: city?.city ?? null,
    cargo: Math.round(cargoRub),
  });

  return (
    <section id="calculator" className="tp-section tp-section--muted">
      <div className="tp-mesh tp-mesh--coral tp-mesh--tl" />
      <div className="tp-mesh tp-mesh--green tp-mesh--br" />

      <div className="pc__wrap">
        <div className="tp-section__head">
          <span className="tp-eyebrow tp-eyebrow--coral">
            <span className="tp-eyebrow__dot" />
            Калькулятор
          </span>
          <h2 className="tp-h2">
            Цена под ключ <span className="tp-gradient-text">до вашего города</span>
          </h2>
          <p className="tp-lede">
            Карго из Китая + получение в России: самовывоз, СДЭК или Почта — сравните и выберите
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

        <div className="pc__grid">
          {/* LEFT: параметры */}
          <div className="tp-card pc__form">
            <div className="pc__block">
              <div className="pc__label">Размер посылки</div>
              <div className="pc__boxes">
                {BOX_PRESETS.map((b) => {
                  const active = boxId === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBoxId(b.id)}
                      className={`pc__box${active ? ' pc__box--active' : ''}`}
                    >
                      <div className="pc__boxHead">
                        <span className="pc__boxName">Коробка {b.name}</span>
                        <span className="pc__boxWeight">до {String(b.maxKg).replace('.', ',')} кг</span>
                      </div>
                      <div className="pc__boxDims">{b.l}×{b.w}×{b.h} см</div>
                      <div className="pc__boxDesc">{b.hint}</div>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setBoxId('manual')}
                  className={`pc__box pc__box--custom${manual ? ' pc__box--active' : ''}`}
                >
                  <div className="pc__boxHead">
                    <span className="pc__boxName">
                      <Ruler size={14} strokeWidth={2.4} />
                      Свои габариты
                    </span>
                  </div>
                  <div className="pc__boxDesc">Укажите вес и размеры вручную</div>
                </button>
              </div>

              {manual && (
                <div className="pc__customRow">
                  <label className="pc__field">
                    <span className="pc__fieldLabel">Вес, кг</span>
                    <input
                      type="text" inputMode="decimal" value={weightStr}
                      onChange={(e) => setWeightStr(e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="1.5" className="pc__input"
                    />
                  </label>
                  <label className="pc__field">
                    <span className="pc__fieldLabel">Длина, см</span>
                    <input
                      type="text" inputMode="numeric" value={dimL}
                      onChange={(e) => setDimL(e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="40" className="pc__input"
                    />
                  </label>
                  <label className="pc__field">
                    <span className="pc__fieldLabel">Ширина, см</span>
                    <input
                      type="text" inputMode="numeric" value={dimW}
                      onChange={(e) => setDimW(e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="30" className="pc__input"
                    />
                  </label>
                  <label className="pc__field">
                    <span className="pc__fieldLabel">Высота, см</span>
                    <input
                      type="text" inputMode="numeric" value={dimH}
                      onChange={(e) => setDimH(e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="20" className="pc__input"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="pc__block">
              <div className="pc__label">Куда доставить</div>
              <CityInput city={city} onSelect={setCity} />
            </div>

            {oversize && (
              <div className="pc__oversize">
                📏 Сторона больше {MAX_SIDE_CM} см — это крупногабарит,
                автоматический расчёт для него не работает. Стоимость посчитает
                менеджер индивидуально — напишите нам в Telegram.
                <a
                  href="https://t.me/Taopostchat_official?start=oversize"
                  target="_blank" rel="noopener noreferrer"
                  className="pc__oversizeBtn"
                >
                  Написать в Telegram
                </a>
              </div>
            )}

            {hasWeight && !oversize && (
              <div className="pc__cargo">
                <div className="pc__cargoRow">
                  <span>Доставка из Китая</span>
                  <b>{fmtRub(cargoRub)}</b>
                </div>
                <div className="pc__cargoSub">
                  До распределительного центра в РФ · к оплате{' '}
                  {String(billable).replace('.', ',')} кг × {RATE_RUB} ₽/кг · срок{' '}
                  {CARGO_DAYS_MIN}–{CARGO_DAYS_MAX} дней · упаковка включена
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: получение в России */}
          <div className="pc__result">
            <div className="pc__resultCard">
              <div className="pc__resultLabel">Получение в России</div>

              {!hasWeight && (
                <div className="pc__hint">Укажите размер или вес посылки — покажем стоимость.</div>
              )}
              {hasWeight && !oversize && !city && (
                <div className="pc__hint">Выберите город — покажем стоимость получения.</div>
              )}
              {oversize && (
                <div className="pc__hint">Крупногабарит — индивидуальный расчёт, напишите менеджеру.</div>
              )}
              {error && !loading && <div className="pc__err">{error}</div>}

              {hasWeight && !oversize && city && (
                <div className="pc__cards">
                  {/* Самовывоз — только для Москвы: клиентам из регионов не
                      показываем, что груз идёт через Москву (реш. 22.08.2026). */}
                  {isMoscow && (
                    <CarrierCard
                      icon={<Warehouse size={16} strokeWidth={2.3} />}
                      name="Самовывоз"
                      note="со склада TaoPost, ТЯК «Москва»"
                      rfCost={0}
                      total={cargoRub}
                      dateTo={etaDate(0)}
                      free
                    />
                  )}
                  {loading && (
                    <div className="pc__cardLoading">
                      <Loader2 size={16} className="pc__spin" /> Считаем СДЭК и Почту…
                    </div>
                  )}
                  {!loading && rates?.pickup && (
                    <CarrierCard
                      icon={<Store size={16} strokeWidth={2.3} />}
                      name="СДЭК — пункт выдачи"
                      note={`${rates.pickup.periodMin}–${rates.pickup.periodMax} дн. по РФ`}
                      rfCost={rates.pickup.sum}
                      total={cargoRub + rates.pickup.sum}
                      dateTo={etaDate(rates.pickup.periodMax)}
                    />
                  )}
                  {!loading && rates?.courier && (
                    <CarrierCard
                      icon={<Truck size={16} strokeWidth={2.3} />}
                      name="СДЭК — курьер"
                      note={`до двери · ${rates.courier.periodMin}–${rates.courier.periodMax} дн. по РФ`}
                      rfCost={rates.courier.sum}
                      total={cargoRub + rates.courier.sum}
                      dateTo={etaDate(rates.courier.periodMax)}
                    />
                  )}
                  {!loading && rates?.pochta && (
                    <CarrierCard
                      icon={<Mail size={16} strokeWidth={2.3} />}
                      name="Почта России"
                      note={`в отделение · ${rates.pochta.periodMin === rates.pochta.periodMax
                        ? rates.pochta.periodMax
                        : `${rates.pochta.periodMin}–${rates.pochta.periodMax}`} дн. по РФ`}
                      rfCost={rates.pochta.sum}
                      total={cargoRub + rates.pochta.sum}
                      dateTo={etaDate(rates.pochta.periodMax)}
                    />
                  )}
                </div>
              )}

              <div className="pc__ctaRow">
                <a
                  href="https://app.taopost.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-btn tp-btn--primary tp-btn--lg pc__cta"
                  data-ym-goal="cabinet_click"
                  data-ym-params={ymParams}
                >
                  <User size={18} strokeWidth={2.5} />
                  Оформить в личном кабинете
                </a>
                <a
                  href="https://t.me/Taopostchat_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-btn tp-btn--ghost tp-btn--lg pc__cta pc__cta--secondary"
                  data-ym-goal="telegram_click"
                  data-ym-params={ymParams}
                >
                  <Send size={18} strokeWidth={2.5} />
                  Спросить в чате TaoPost
                </a>
              </div>

              <div className="pc__note">
                Цена приблизительная: точная сумма зависит от фактического веса при упаковке
                на складе. Почта России принимает посылки до 10 кг. Доставку по РФ
                оплачиваете при получении.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pc__wrap {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }
        .pc__grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .pc__form { padding: 28px; }
        .pc__block { margin-bottom: 22px; }
        .pc__block:last-child { margin-bottom: 0; }
        .pc__label {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 10px;
        }

        .pc__boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .pc__box {
          text-align: left;
          padding: 12px 14px;
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          background: #fff;
          font-family: inherit;
          cursor: pointer;
          transition: border-color .14s, background .14s, box-shadow .14s;
        }
        .pc__box:hover { border-color: #c9d2cd; }
        .pc__box--active {
          border-color: var(--green);
          background: var(--green-light);
          box-shadow: 0 6px 18px -10px rgba(0,92,67,0.35);
        }
        .pc__box--custom { grid-column: 1 / -1; }
        .pc__boxHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }
        .pc__boxName {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 800;
          font-size: 14px;
          color: var(--text-dark);
        }
        .pc__boxWeight {
          font-size: 12px;
          font-weight: 700;
          color: var(--green);
          white-space: nowrap;
        }
        .pc__boxDims {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 3px;
        }
        .pc__boxDesc {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .pc__customRow {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .pc__field { display: flex; flex-direction: column; gap: 5px; }
        .pc__fieldLabel {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .pc__input {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          color: var(--text-dark);
          outline: none;
          transition: border-color .12s;
        }
        .pc__input:focus { border-color: var(--green); }

        .pc__cargo {
          background: var(--gray-bg);
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 12px 16px;
        }
        .pc__cargoRow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 14px;
          color: var(--text-dark);
        }
        .pc__cargoSub {
          margin-top: 3px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .pc__resultCard {
          background: #fff;
          border: 1px solid #ECEEF1;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 18px 40px -24px rgba(11,15,26,0.18);
        }
        .pc__resultLabel {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .pc__hint {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .pc__err {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--coral-dark);
          background: var(--coral-light);
          border-radius: 10px;
          padding: 8px 12px;
          margin-bottom: 10px;
        }
        .pc__oversize {
          background: #FFF7ED; border: 1px solid #FDBA74; color: #9A3412;
          border-radius: 14px; padding: 14px 16px; font-size: 14px;
          line-height: 1.5; font-weight: 600;
        }
        .pc__oversizeBtn {
          display: inline-block; margin-top: 10px; text-decoration: none;
          background: #EA580C; color: #fff; border-radius: 10px;
          padding: 9px 16px; font-size: 13.5px; font-weight: 800;
        }
        .pc__cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .pc__cardLoading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1.5px dashed #E5E7EB;
          border-radius: 12px;
          padding: 16px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-muted);
        }
        :global(.pc__spin) { animation: pcSpin 0.9s linear infinite; }
        @keyframes pcSpin { to { transform: rotate(360deg); } }

        .pc__ctaRow {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 16px;
        }
        .pc__cta { width: 100%; justify-content: center; }
        .pc__note {
          margin-top: 14px;
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .pc__grid { grid-template-columns: 1fr; gap: 16px; }
          .pc__form { padding: 20px; }
          .pc__customRow { grid-template-columns: 1fr 1fr; }
          .pc__resultCard { padding: 20px; }
        }
      `}</style>
    </section>
  );
}

// ── Автокомплит города СДЭК (порт CityAutocomplete из приложения) ──
// При фокусе в пустое поле — популярные города, при вводе — поиск по
// названию, цифры (3+) — по почтовому индексу.
function CityInput({ city, onSelect }: { city: City | null; onSelect: (c: City | null) => void }) {
  const [query, setQuery] = useState(city?.fullName ?? '');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isPopular, setIsPopular] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const popularRef = useRef<City[] | null>(null);
  const loadingPopularRef = useRef(false);

  async function fetchCities(q: string): Promise<{ cities: City[]; popular?: boolean }> {
    const r = await fetch(`${API_BASE}/cities?q=${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error(`cities ${r.status}`);
    return r.json();
  }

  async function loadPopular() {
    if (popularRef.current?.length) {
      setSuggestions(popularRef.current);
      setIsPopular(true);
      return;
    }
    if (loadingPopularRef.current) return;
    loadingPopularRef.current = true;
    setLoading(true); setFailed(false);
    try {
      const d = await fetchCities('');
      popularRef.current = d?.cities || [];
      setSuggestions(popularRef.current);
      setIsPopular(true);
      setFailed(popularRef.current.length === 0);
    } catch {
      setFailed(true);
    } finally {
      loadingPopularRef.current = false;
      setLoading(false);
    }
  }

  useEffect(() => {
    const q = query.trim();
    if (city && city.fullName === q) return;
    if (q.length < 2 && !/^\d{3,}$/.test(q)) {
      void loadPopular();
      return;
    }
    let cancelled = false;
    setLoading(true); setFailed(false);
    const timer = setTimeout(async () => {
      try {
        const d = await fetchCities(q);
        if (!cancelled) { setSuggestions(d?.cities || []); setIsPopular(false); }
      } catch { if (!cancelled) { setSuggestions([]); setFailed(true); } }
      finally { if (!cancelled) setLoading(false); }
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, city]);

  function pick(c: City) {
    onSelect(c);
    setQuery(c.fullName);
    setOpen(false);
  }
  function clear() {
    onSelect(null);
    setQuery('');
    setSuggestions(popularRef.current || []);
    setIsPopular(true);
  }

  return (
    <div className="ci">
      <MapPin size={15} strokeWidth={2.3} className="ci__icon" />
      <input
        type="text"
        className="ci__input"
        value={query}
        placeholder="Город или индекс (например: Казань)"
        onChange={(e) => {
          setQuery(e.target.value);
          if (city) onSelect(null);
          setOpen(true);
        }}
        onFocus={() => { setOpen(true); void loadPopular(); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {loading && <Loader2 size={15} className="pc__spin ci__spin" />}
      {city && !loading && (
        <button type="button" onClick={clear} className="ci__clear" aria-label="Очистить">
          <X size={13} strokeWidth={2.3} />
        </button>
      )}
      {open && (loading || failed || suggestions.length > 0) && (
        <div className="ci__dropdown" role="listbox">
          {loading && suggestions.length === 0 && (
            <div className="ci__status">Загружаем города…</div>
          )}
          {failed && !loading && suggestions.length === 0 && (
            <div className="ci__status">Не удалось загрузить список — попробуйте ещё раз.</div>
          )}
          {isPopular && suggestions.length > 0 && (
            <div className="ci__popularLbl">Популярные города</div>
          )}
          {suggestions.map((c) => (
            <button
              key={c.code}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); pick(c); }}
              className="ci__item"
            >
              <span className="ci__city">{c.city}</span>
              {c.region && <span className="ci__region">{c.region}</span>}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .ci { position: relative; display: flex; align-items: center; }
        :global(.ci__icon) {
          position: absolute;
          left: 13px;
          pointer-events: none;
          color: #9CA3AF;
        }
        .ci__input {
          width: 100%;
          padding: 12px 38px;
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          color: var(--text-dark);
          outline: none;
          transition: border-color .12s;
        }
        .ci__input:focus { border-color: var(--green); }
        :global(.ci__spin) { position: absolute; right: 12px; color: #9CA3AF; }
        .ci__clear {
          position: absolute;
          right: 9px;
          width: 24px; height: 24px;
          border-radius: 7px;
          border: none;
          background: var(--gray-bg);
          color: var(--text-muted);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .ci__dropdown {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          margin-top: 5px;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          box-shadow: 0 14px 30px -12px rgba(11,15,26,0.22);
          max-height: 280px;
          overflow-y: auto;
          z-index: 50;
        }
        .ci__status {
          padding: 12px 14px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-muted);
        }
        .ci__popularLbl {
          padding: 9px 14px 4px;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .ci__item {
          width: 100%;
          padding: 10px 14px;
          background: none;
          border: none;
          text-align: left;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 7px;
          transition: background .1s;
        }
        .ci__item:hover { background: var(--gray-bg); }
        .ci__city { font-weight: 700; font-size: 13.5px; color: var(--text-dark); }
        .ci__region { font-size: 11.5px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}

// ── Карточка способа получения ──
function CarrierCard({
  icon, name, note, rfCost, total, dateTo, free,
}: {
  icon: React.ReactNode;
  name: string;
  note: string;
  rfCost: number;
  total: number;
  dateTo: string;
  free?: boolean;
}) {
  return (
    <div className="cc">
      <div className="cc__left">
        <div className="cc__head">
          <span className="cc__icon">{icon}</span>
          <span className="cc__name">{name}</span>
        </div>
        <div className="cc__note">{note}</div>
        <div className="cc__breakdown">
          {free
            ? <span className="cc__free">получение бесплатно</span>
            : <span>+ {fmtRub(rfCost)} по РФ при получении</span>}
          {' · '}примерно до {dateTo}
        </div>
      </div>
      <div className="cc__right">
        <div className="cc__total">{fmtRub(total)}</div>
        <div className="cc__totalLbl">под ключ</div>
      </div>
      <style jsx>{`
        .cc {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          padding: 12px 14px;
          background: #fff;
        }
        .cc__left { min-width: 0; }
        .cc__head { display: flex; align-items: center; gap: 7px; }
        .cc__icon { display: flex; color: var(--green); }
        .cc__name { font-weight: 800; font-size: 13.5px; color: var(--text-dark); }
        .cc__note {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .cc__breakdown {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          margin-top: 3px;
          line-height: 1.45;
        }
        .cc__free { color: var(--green); font-weight: 700; }
        .cc__right { text-align: right; flex-shrink: 0; }
        .cc__total {
          font-weight: 900;
          font-size: 16.5px;
          color: var(--text-dark);
          white-space: nowrap;
        }
        .cc__totalLbl {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
      `}</style>
    </div>
  );
}
