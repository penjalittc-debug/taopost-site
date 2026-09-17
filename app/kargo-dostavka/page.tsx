import type { Metadata } from 'next';
import ServiceLanding from '@/components/ServiceLanding';
import { getServiceBySlug } from '@/lib/services';

const service = getServiceBySlug('kargo-dostavka')!;

export const metadata: Metadata = {
  title: service.titleSeo,
  description: service.descriptionSeo,
  alternates: { canonical: 'https://taopost.ru/kargo-dostavka' },
  openGraph: {
    title: service.titleSeo,
    description: service.descriptionSeo,
    url: 'https://taopost.ru/kargo-dostavka',
    type: 'website',
  },
};

export default function Page() {
  return <ServiceLanding service={service} />;
}
