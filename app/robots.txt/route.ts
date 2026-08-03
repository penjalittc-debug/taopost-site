export const dynamic = 'force-static';

// Ручной robots.txt: MetadataRoute.Robots в Next 15 не поддерживает Clean-param,
// а он важен для Яндекса — иначе UTM-хвосты индексируются как дубли.
const BODY = `User-agent: *
Allow: /
Disallow: /api/

User-agent: Yandex
Allow: /
Disallow: /api/
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&yclid&gclid&_openstat&fbclid&from&ref /

Host: https://taopost.ru
Sitemap: https://taopost.ru/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
