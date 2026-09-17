import type { Metadata } from 'next';
import ServiceLanding from '@/components/ServiceLanding';
import { getServiceBySlug } from '@/lib/services';

const service = getServiceBySlug('vykup-tovarov')!;

export const metadata: Metadata = {
  title: service.titleSeo,
  description: service.descriptionSeo,
  alternates: { canonical: 'https://taopost.ru/vykup-tovarov' },
  openGraph: {
    title: service.titleSeo,
    description: service.descriptionSeo,
    url: 'https://taopost.ru/vykup-tovarov',
    type: 'website',
  },
};

export default function Page() {
  return <ServiceLanding service={service} />;
}
