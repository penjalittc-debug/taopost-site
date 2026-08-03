import { MetadataRoute } from 'next';
import { articles } from '@/lib/blog';
import { CITIES } from '@/lib/cities';
import { MARKETPLACES } from '@/lib/marketplaces';

// Одна общая дата последнего контентного обновления. Обновлять вручную при
// заметных правках макета/контента — тогда Google/Яндекс получают правдивый
// сигнал вместо всегда-текущего `new Date()`, которому они перестают доверять.
const CONTENT_UPDATED = new Date('2026-08-03');

export default function sitemap(): MetadataRoute.Sitemap {
  const blogArticles: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://taopost.ru/blog/${article.slug}`,
    lastModified: new Date(article.isoDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `https://taopost.ru/kak-zakazat-iz-kitaya/${c.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const marketplacePages: MetadataRoute.Sitemap = MARKETPLACES.map((m) => ({
    url: `https://taopost.ru/${m.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: 'https://taopost.ru',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...marketplacePages,
    {
      url: 'https://taopost.ru/tarify',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://taopost.ru/o-kompanii',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/kontakty',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/garantii',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/business',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://taopost.ru/faq',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/kak-zakazat-iz-kitaya',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...cityPages,
    {
      url: 'https://taopost.ru/blog',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogArticles,
    {
      url: 'https://taopost.ru/privacy',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://taopost.ru/terms',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://taopost.ru/oferta',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
