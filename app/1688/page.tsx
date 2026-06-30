import type { Metadata } from 'next';
import MarketplaceLanding from '@/components/MarketplaceLanding';
import Wholesale1688Calc from '@/components/Wholesale1688Calc';
import { getMarketplaceBySlug } from '@/lib/marketplaces';

const mp = getMarketplaceBySlug('1688')!;

export const metadata: Metadata = {
  title: mp.titleSeo,
  description: mp.descriptionSeo,
  keywords: 'опт с 1688, 1688 доставка, alibaba b2b, опт из китая, поставщики 1688, выкуп с 1688',
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

export default function Page1688() {
  return (
    <>
      <MarketplaceLanding mp={mp} calculator={<Wholesale1688Calc />} />
    </>
  );
}
