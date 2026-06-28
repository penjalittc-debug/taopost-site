import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles, getArticleBySlug } from '@/lib/blog';
import { CITIES } from '@/lib/cities';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Блог TaoPost`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://taopost.ru/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://taopost.ru/blog/${article.slug}`,
      siteName: 'TaoPost',
      locale: 'ru_RU',
      type: 'article',
      images: [{ url: article.image ? `https://taopost.ru${article.image}` : 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image ? `https://taopost.ru${article.image}` : 'https://taopost.ru/og-image.png'],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const popularCities = CITIES.filter((c) =>
    ['moskva', 'sankt-peterburg', 'ekaterinburg', 'novosibirsk', 'kazan', 'krasnodar', 'rostov-na-donu', 'nizhniy-novgorod'].includes(c.slug),
  );
  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `https://taopost.ru${article.image}` : 'https://taopost.ru/og-image.png',
    author: {
      '@type': 'Organization',
      name: 'TaoPost',
      url: 'https://taopost.ru',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TaoPost',
      url: 'https://taopost.ru',
      logo: {
        '@type': 'ImageObject',
        url: 'https://taopost.ru/logo.png',
      },
    },
    datePublished: article.date,
    url: `https://taopost.ru/blog/${article.slug}`,
    mainEntityOfPage: `https://taopost.ru/blog/${article.slug}`,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://taopost.ru/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://taopost.ru/blog/${article.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 100%)',
          padding: '120px 24px 60px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Breadcrumbs */}
            <nav style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Главная</Link>
              <span>→</span>
              <Link href="/blog" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Блог</Link>
              <span>→</span>
              <span style={{ color: '#374151' }}>{article.category}</span>
            </nav>

            {/* Category badge */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                background: article.categoryColor + '18',
                color: article.categoryColor,
                fontWeight: 700, fontSize: '13px',
                padding: '5px 14px', borderRadius: '50px',
                border: `1px solid ${article.categoryColor}30`,
              }}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '-0.5px',
            }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                📅 {article.date}
              </span>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                ⏱ {article.readTime} чтения
              </span>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                ✍️ TaoPost
              </span>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {article.image && (
          <section style={{ padding: '0 24px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <Image
                src={article.image}
                alt={article.title}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  display: 'block',
                  marginTop: '20px',
                }}
              />
            </div>
          </section>
        )}

        {/* Article content */}
        <section style={{ padding: '60px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Divider */}
            <div style={{ height: '1px', background: '#E5E7EB', margin: '60px 0 40px' }} />

            {/* Back link */}
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: 700, color: '#005C43',
              textDecoration: 'none',
            }}>
              ← Все статьи
            </Link>
          </div>
        </section>

        {/* Related articles */}
        {otherArticles.length > 0 && (
          <section style={{ padding: '60px 24px', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#111827', marginBottom: '24px' }}>
                Читайте также
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    style={{
                      display: 'block', padding: '24px',
                      background: '#fff', borderRadius: '14px',
                      border: '1px solid #E5E7EB',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{
                      display: 'inline-block', marginBottom: '12px',
                      background: a.categoryColor + '18', color: a.categoryColor,
                      fontWeight: 700, fontSize: '11px',
                      padding: '3px 10px', borderRadius: '50px',
                    }}>
                      {a.category}
                    </span>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827', lineHeight: 1.4, marginBottom: '8px' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      {a.readTime} чтения
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cities cross-link */}
        <section style={{ padding: '60px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#111827', marginBottom: '8px' }}>
              Доставка в популярные города
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
              Сроки и тарифы для вашего города
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
              {popularCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  data-ym-goal="city_card_click"
                  data-ym-params={`{"slug":"${c.slug}","place":"article_${article.slug}"}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#F9FAFB',
                    borderRadius: '10px',
                    color: '#111827',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <span>Доставка {c.nameIn}</span>
                  <span style={{ color: '#005C43', fontSize: '13px' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Заказать доставку из Китая
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.6 }}>
              Наши менеджеры помогут с выбором товара, расчётом стоимости и оформлением заказа
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 36px',
                  background: '#fff', color: '#005C43',
                  fontWeight: 800, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                }}
              >
                Написать в Telegram →
              </a>
              <a
                href="tel:+79772767778"
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                +7 977 276 77 78
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .article-content h2 {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #111827;
          margin: 40px 0 16px;
          line-height: 1.3;
        }
        .article-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 28px 0 12px;
        }
        .article-content p {
          font-size: 16px;
          color: #374151;
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .article-content ul, .article-content ol {
          padding-left: 24px;
          margin-bottom: 20px;
        }
        .article-content li {
          font-size: 16px;
          color: #374151;
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .article-content strong {
          color: #111827;
          font-weight: 700;
        }
        .article-content em {
          color: #6B7280;
          font-style: italic;
        }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0 32px;
          font-size: 14px;
          overflow-x: auto;
          display: block;
        }
        .article-content table thead tr {
          background: #005C43;
          color: white;
        }
        .article-content table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 700;
          white-space: nowrap;
        }
        .article-content table td {
          padding: 11px 16px;
          border-bottom: 1px solid #E5E7EB;
          color: #374151;
        }
        .article-content table tbody tr:nth-child(even) {
          background: #F9FAFB;
        }
        .article-content table tbody tr:hover {
          background: #e8f7f3;
        }
      `}</style>
    </>
  );
}
