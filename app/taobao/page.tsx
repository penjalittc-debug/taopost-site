import type { Metadata } from 'next';
import MarketplaceLanding from '@/components/MarketplaceLanding';
import { getMarketplaceBySlug } from '@/lib/marketplaces';

const mp = getMarketplaceBySlug('taobao')!;

export const metadata: Metadata = {
  title: mp.titleSeo,
  description: mp.descriptionSeo,
  keywords: 'доставка taobao, выкуп таобао, заказ с taobao, посредник taobao, taobao доставка в россию, taobao 淘宝',
  alternates: { canonical: `https://taopost.ru/${mp.slug}` },
  openGraph: {
    title: mp.titleSeo,
    description: mp.descriptionSeo,
    url: `https://taopost.ru/${mp.slug}`,
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: mp.titleSeo }],
  },
  twitter: {
    card: 'summary_large_image',
    title: mp.titleSeo,
    description: mp.descriptionSeo,
    images: ['https://taopost.ru/og-image.png'],
  },
};

export default function TaobaoPage() {
  return <MarketplaceLanding mp={mp} />;
}
