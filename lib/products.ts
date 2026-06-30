export type Product = {
  name: string;
  category: string;
  priceRU: number; // ₽ — средняя розница в РФ
  priceCN: number; // ₽ — цена в Китае с учётом нашей логистики
  img: string;
  marketplace: 'Taobao' | 'Poizon' | '1688' | 'Pinduoduo';
};

// Источник данных для блока «Китай vs Россия» и для Product/Offer JSON-LD.
// Цены актуализировать раз в квартал — старые данные снижают доверие.
export const PRODUCTS: Product[] = [
  { name: 'Nike Air Force 1', category: 'Кроссовки', priceRU: 12990, priceCN: 5200, img: '/products/nike-air-force-1.webp', marketplace: 'Poizon' },
  { name: 'Adidas Samba OG', category: 'Кроссовки', priceRU: 21040, priceCN: 9276, img: '/products/adidas-samba-og.avif', marketplace: 'Poizon' },
  { name: 'Jordan Air Jordan 1', category: 'Кроссовки', priceRU: 23999, priceCN: 8688, img: '/products/air-jordan-1.webp', marketplace: 'Poizon' },
  { name: "Levi's 501 Джинсы", category: 'Одежда', priceRU: 11899, priceCN: 6321, img: '/products/levis-501.jpg', marketplace: '1688' },
  { name: 'Carhartt WIP Куртка', category: 'Одежда', priceRU: 19795, priceCN: 13507, img: '/products/carhartt-wip-jacket.jpg', marketplace: 'Taobao' },
  { name: 'Samsung Galaxy Fit 3', category: 'Электроника', priceRU: 7621, priceCN: 5352, img: '/products/samsung-galaxy-fit-3.webp', marketplace: '1688' },
];
