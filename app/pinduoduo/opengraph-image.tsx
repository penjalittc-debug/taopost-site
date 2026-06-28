import { marketplaceOgImage, ogSize, ogContentType } from '@/lib/marketplace-og';
import { getMarketplaceBySlug } from '@/lib/marketplaces';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'TaoPost — Доставка с Pinduoduo в Россию';

export default function Image() {
  return marketplaceOgImage(getMarketplaceBySlug('pinduoduo')!);
}
