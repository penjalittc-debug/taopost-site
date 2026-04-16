import { MetadataRoute } from 'next';
import { articles } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogArticles: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://taopost.ru/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://taopost.ru',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://taopost.ru/kak-zakazat-iz-kitaya',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
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
  ];
}
