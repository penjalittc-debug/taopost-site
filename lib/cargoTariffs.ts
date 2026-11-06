// ── Оптовые тарифы карго (решение владельца 04.11.2026) ───────────────────
// Копия src/lib/buyerTariffs.ts из приложения TaoPost — сетка 2A на 03.11:
// виды груза, ставки по плотности или весу, упаковка, разгрузка. Всё в $.
// Менять ставки — в ОБОИХ файлах (приложение и сайт), иначе сайт и кабинет
// байера назовут разную цену.
//
// Условия опта (владелец 04.11.2026):
//   • карго — от 30 кг в одной отправке (решение владельца 06.11.2026, было
//     «от 50 000 ₽ закупки»); легче 30 кг — розничный тариф 450 ₽/кг;
//   • оплата в рублях по курсу ЦБ + 5 ₽ за $ на день оплаты;
//   • выкуп и поиск поставщика — комиссия 3–8 % от суммы, ступень считает менеджер;
//   • документы для маркетплейсов и импорта — по запросу.
// Источник и сравнение — org/08-growth/20-opt-cargo-launch.md (репо taopost).

export type BuyerTariffKind = 'density' | 'weight';

/** Ступень: [from, to) кг/м³ (или кг для weight); to = null — без верхней границы. */
export interface TariffBand {
  from: number;
  to: number | null;
  /** $ за кг или, если perM3, $ за м³. */
  usd: number;
  perM3?: boolean;
}

export interface BuyerTariff {
  id: string;
  name: string;
  kind: BuyerTariffKind;
  bands: TariffBand[];
}

const d = (from: number, to: number | null, usd: number, perM3 = false): TariffBand => ({ from, to, usd, ...(perM3 ? { perM3 } : {}) });

export const BUYER_TARIFFS: BuyerTariff[] = [
  {
    id: 'consolidated', name: 'Сборный груз', kind: 'weight',
    // Легче 5 кг — по первой ступени [ДОПУЩЕНИЕ A143].
    bands: [d(0, 30, 3.3), d(30, 100, 3.1), d(100, 300, 2.9), d(300, null, 2.7)],
  },
  {
    id: 'clothes', name: 'Одежда', kind: 'density',
    bands: [d(0, 200, 3.0), d(200, 300, 2.9), d(300, 350, 2.8), d(350, 400, 2.8), d(400, null, 2.8)],
  },
  {
    id: 'shoes', name: 'Обувь', kind: 'density',
    bands: [
      d(0, 100, 320, true), d(100, 110, 3.9), d(110, 120, 3.8), d(120, 130, 3.7), d(130, 140, 3.6),
      d(140, 150, 3.5), d(150, 160, 3.4), d(160, 170, 3.3), d(170, 180, 3.2), d(180, 190, 3.1),
      d(190, 200, 3.0), d(200, null, 2.9),
    ],
  },
  {
    id: 'special', name: 'Спец. тариф / моно-товары / мелкий опт', kind: 'density',
    bands: [
      d(0, 100, 320, true), d(100, 110, 3.3), d(110, 120, 3.2), d(120, 130, 3.1), d(130, 140, 3.0),
      d(140, 150, 2.9), d(150, 160, 2.8), d(160, 170, 2.7), d(170, 180, 2.6), d(180, 190, 2.5),
      d(190, 200, 2.4), d(200, 230, 2.3), d(230, 260, 2.2), d(260, 300, 2.1), d(300, 400, 2.0),
      d(400, 500, 1.9), d(500, 600, 1.8), d(600, 800, 1.75), d(800, 1000, 1.7), d(1000, null, 1.3), // 1.3 — решение владельца 04.11.2026 (у 2A 1.6)
    ],
  },
  {
    id: 'moto', name: 'Квадроциклы / мотоциклы', kind: 'density',
    bands: [
      d(0, 100, 360, true), d(100, 110, 3.8), d(110, 120, 3.7), d(120, 130, 3.6), d(130, 140, 3.5),
      d(140, 150, 3.4), d(150, 160, 3.3), d(160, 170, 3.2), d(170, 180, 3.1), d(180, 190, 3.0),
      d(190, 200, 2.9), d(200, 250, 2.8), d(250, 300, 2.7), d(300, 400, 2.6), d(400, 600, 2.5),
      d(600, 800, 2.5), d(800, 1000, 2.5), d(1000, null, 2.5),
    ],
  },
];

export interface BuyerPackaging {
  id: string;
  name: string;
  /** $ за единицу на место. */
  usd: number;
}

export const BUYER_PACKAGING: BuyerPackaging[] = [
  { id: 'box', name: 'Картонная коробка', usd: 7 },
  { id: 'box-s', name: 'Картонная коробка S', usd: 5 },
  { id: 'box-m', name: 'Картонная коробка M', usd: 6 },
  { id: 'box-xl', name: 'Картонная коробка XL', usd: 8 },
  { id: 'bag', name: 'Мешок', usd: 4 },
  { id: 'corners', name: 'Картонные уголки', usd: 7 },
  { id: 'foam', name: 'Пенопласт', usd: 5 },
  { id: 'bubble', name: 'Пупырчатая плёнка', usd: 5 },
  { id: 'crate', name: 'Деревянная обрешётка', usd: 8 },
  { id: 'pallet', name: 'Деревянный поддон', usd: 35 },
  { id: 'wood-box', name: 'Закрытый деревянный короб', usd: 65 },
];

/** Основная упаковка (обязательна, одна на место) — коробки и мешок; остальное — защита сверху. */
export const MAIN_PACKAGING_IDS = ['box', 'box-s', 'box-m', 'box-xl', 'bag'];

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Разгрузка, $: ≈ 4 + 12 × объём [ДОПУЩЕНИЕ A142]. */
export function unloadingUsd(volumeM3: number): number {
  return round2(4 + 12 * Math.max(0, volumeM3));
}

export function findBand(bands: TariffBand[], value: number): TariffBand {
  return bands.find((b) => value >= b.from && (b.to == null || value < b.to)) ?? bands[bands.length - 1];
}

export interface BuyerQuoteInput {
  tariffId: string;
  weightKg: number;
  volumeM3: number;
  places: number;
  mainPackagingId: string;
  extraPackagingIds: string[];
}

export interface BuyerQuote {
  tariff: BuyerTariff;
  /** Плотность, кг/м³ (для тарифов по плотности). */
  density: number | null;
  band: TariffBand;
  deliveryUsd: number;
  unloadingUsd: number;
  packagingUsd: number;
  packagingLines: Array<{ name: string; usd: number; qty: number }>;
  totalUsd: number;
}

/** Предварительный расчёт как в калькуляторе 2A. null — не хватает данных. */
export function buyerQuote(input: BuyerQuoteInput): BuyerQuote | null {
  const tariff = BUYER_TARIFFS.find((t) => t.id === input.tariffId);
  if (!tariff) return null;
  const w = input.weightKg;
  const v = input.volumeM3;
  if (!(w > 0)) return null;
  // Для плотности нужен объём; для сборного груза объём нужен только разгрузке.
  if (tariff.kind === 'density' && !(v > 0)) return null;
  const places = Math.max(1, Math.round(input.places || 1));

  const density = tariff.kind === 'density' ? w / v : null;
  const band = findBand(tariff.bands, density ?? w);
  const deliveryUsd = round2(band.perM3 ? band.usd * v : band.usd * w);
  const unloading = unloadingUsd(v > 0 ? v : 0);

  const lines: BuyerQuote['packagingLines'] = [];
  for (const id of [input.mainPackagingId, ...input.extraPackagingIds]) {
    const p = BUYER_PACKAGING.find((x) => x.id === id);
    if (p && !lines.some((l) => l.name === p.name)) lines.push({ name: p.name, usd: p.usd, qty: places });
  }
  const packagingUsd = round2(lines.reduce((a, l) => a + l.usd * l.qty, 0));

  return {
    tariff, density: density == null ? null : Math.round(density), band,
    deliveryUsd, unloadingUsd: unloading, packagingUsd, packagingLines: lines,
    totalUsd: round2(deliveryUsd + unloading + packagingUsd),
  };
}

/** Подпись ступени: «100 – 110 кг/м³», «от 300 кг». */
export function bandLabel(b: TariffBand, kind: BuyerTariffKind): string {
  const unit = kind === 'density' ? 'кг/м³' : 'кг';
  if (b.to == null) return `от ${b.from} ${unit}`;
  if (b.from === 0 && kind === 'weight') return `до ${b.to} ${unit}`;
  return `${b.from} – ${b.to} ${unit}`;
}

/** Порог карго: вес отправки, кг. Легче — розница 450 ₽/кг (владелец 06.11.2026). */
export const CARGO_MIN_KG = 30;
/** Надбавка к курсу ЦБ, ₽ за $. */
export const USD_MARKUP_RUB = 5;
/** Минимальная ставка по сетке, $/кг — для заголовков «от …». */
export const MIN_USD_PER_KG = Math.min(
  ...BUYER_TARIFFS.flatMap((t) => t.bands.filter((b) => !b.perM3).map((b) => b.usd)),
);
