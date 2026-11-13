// ── Розничный тариф лесенкой — копия src/lib/tariff.ts приложения ─────────
// Решение владельца 10.11.2026: до 35 кг — 450 ₽/кг, от 35 кг — 420, от 60 кг —
// 390 (и дальше 390, в том числе свыше 100 кг; дешевле — карго по сетке опта, /kargo-dostavka). Ступень —
// по оплачиваемому весу всей отправки (шаг 0,5 кг, минимум 1 кг), весь вес по
// одной ставке. Менять — в ОБОИХ репо, иначе сайт назовёт не ту цену, что счёт.

export const RETAIL_TIERS = [
  { fromKg: 0, toKg: 35, rateRub: 450 },
  { fromKg: 35, toKg: 60, rateRub: 420 },
  { fromKg: 60, toKg: null, rateRub: 390 },
] as const;

export const RETAIL_BASE_RUB = 450;
export const RETAIL_MIN_RUB = 390;

export function retailRate(billableKg: number): number {
  for (let i = RETAIL_TIERS.length - 1; i >= 0; i--) {
    if (billableKg >= RETAIL_TIERS[i].fromKg) return RETAIL_TIERS[i].rateRub;
  }
  return RETAIL_BASE_RUB;
}

/** «до 35 кг — 450 ₽/кг, от 35 кг — 420 ₽/кг, от 60 кг — 390 ₽/кг» */
export const RETAIL_LADDER_TEXT = 'до 35 кг — 450 ₽/кг, от 35 кг — 420 ₽/кг, от 60 кг — 390 ₽/кг';

/** Авиа через курьеров (владелец 12.11.2026; с 06.11 было «от 2 400»): от 2 500 ₽/кг,
 *  3–5 дней. Точную ставку менеджер называет по фото товара (зависит от категории
 *  и бренда), вес по факту без минимума, дату вылета назначает менеджер.
 *  Копия AIR_RATE_RUB / AIR_DAYS_* приложения. */
export const AIR_FROM_RUB = 2500;
export const AIR_DAYS_TEXT = '3–5 дней';

/** Сборные грузы от 50 кг — «от 330 ₽/кг» (владелец 12.11.2026; с 06.11 было
 *  «от 30 кг — от 300 ₽/кг»): это сборный груз по
 *  сетке карго (3,1 $ и ниже + упаковка), считает менеджер; розница ниже 390 не опускается. */
export const CONSOLIDATED_FROM_RUB = 330;
