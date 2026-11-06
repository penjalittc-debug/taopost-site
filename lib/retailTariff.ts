// ── Розничный тариф лесенкой — копия src/lib/tariff.ts приложения ─────────
// Решение владельца 06.11.2026: до 10 кг — 450 ₽/кг, от 10 кг — 400, от 20 кг —
// 350 (и дальше 350; дешевле — карго по сетке опта, /kargo-dostavka). Ступень —
// по оплачиваемому весу всей отправки (шаг 0,5 кг, минимум 1 кг), весь вес по
// одной ставке. Менять — в ОБОИХ репо, иначе сайт назовёт не ту цену, что счёт.

export const RETAIL_TIERS = [
  { fromKg: 0, toKg: 10, rateRub: 450 },
  { fromKg: 10, toKg: 20, rateRub: 400 },
  { fromKg: 20, toKg: null, rateRub: 350 },
] as const;

export const RETAIL_BASE_RUB = 450;
export const RETAIL_MIN_RUB = 350;

export function retailRate(billableKg: number): number {
  for (let i = RETAIL_TIERS.length - 1; i >= 0; i--) {
    if (billableKg >= RETAIL_TIERS[i].fromKg) return RETAIL_TIERS[i].rateRub;
  }
  return RETAIL_BASE_RUB;
}

/** «до 10 кг — 450 ₽/кг, от 10 кг — 400 ₽/кг, от 20 кг — 350 ₽/кг» */
export const RETAIL_LADDER_TEXT = 'до 10 кг — 450 ₽/кг, от 10 кг — 400 ₽/кг, от 20 кг — 350 ₽/кг';

/** Авиа (владелец 06.11.2026): от 2 400 ₽/кг, 3–5 дней. Копия AIR_RATE_RUB / AIR_DAYS_* приложения. */
export const AIR_FROM_RUB = 2400;
export const AIR_DAYS_TEXT = '3–5 дней';

/** Сборные грузы от 30 кг — «от 300 ₽/кг» (владелец 06.11.2026): это сборный груз по
 *  сетке карго (3,1 $ и ниже + упаковка), считает менеджер; розница ниже 350 не опускается. */
export const CONSOLIDATED_FROM_RUB = 300;
