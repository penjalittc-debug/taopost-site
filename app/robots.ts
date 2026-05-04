import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/v2', '/v2/'],
    },
    sitemap: 'https://taopost.ru/sitemap.xml',
  };
}
