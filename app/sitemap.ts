import { MetadataRoute } from 'next';
import { articles } from '@/lib/blog';
import { CITIES } from '@/lib/cities';
import { MARKETPLACES } from '@/lib/marketplaces';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogArticles: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://taopost.ru/blog/${article.slug}`,
    lastModified: new Date(article.isoDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `https://taopost.ru/kak-zakazat-iz-kitaya/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const marketplacePages: MetadataRoute.Sitemap = MARKETPLACES.map((m) => ({
    url: `https://taopost.ru/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: 'https://taopost.ru',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...marketplacePages,
    {
      url: 'https://taopost.ru/tarify',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://taopost.ru/o-kompanii',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/kontakty',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/garantii',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://taopost.ru/kak-zakazat-iz-kitaya',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...cityPages,
    {
      url: 'https://taopost.ru/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogArticles,
    {
      url: 'https://taopost.ru/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://taopost.ru/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
