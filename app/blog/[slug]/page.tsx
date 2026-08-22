import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles, getArticleBySlug } from '@/lib/blog';
import { CITIES } from '@/lib/cities';
import s from '../blog.module.css';

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

  const catVar = { ['--cat-color' as string]: article.categoryColor } as React.CSSProperties;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main>
        <section className={s.articleHero}>
          <div className={s.articleHeroInner}>
            <nav className={s.crumbs}>
              <Link href="/">Главная</Link>
              <span>→</span>
              <Link href="/blog">Блог</Link>
              <span>→</span>
              <span className={s.crumbCurrent}>{article.category}</span>
            </nav>

            <div className={s.articleCategory}>
              <span className={s.articleCategoryBadge} style={catVar}>
                {article.category}
              </span>
            </div>

            <h1 className={s.articleH1}>{article.title}</h1>

            <div className={s.articleMeta}>
              <span>📅 {article.date}</span>
              <span>⏱ {article.readTime} чтения</span>
              <span>✍️ TaoPost</span>
            </div>
          </div>
        </section>

        {article.image && (
          <section className={s.coverSection}>
            <div className={s.coverInner}>
              <Image
                src={article.image}
                alt={article.title}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                className={s.coverImage}
              />
            </div>
          </section>
        )}

        <section className={s.content}>
          <div className={s.contentInner}>
            <div
              className={s.articleContent}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className={s.divider} />

            <Link href="/blog" className={s.backLink}>← Все статьи</Link>
          </div>
        </section>

        {otherArticles.length > 0 && (
          <section className={s.related}>
            <div className={s.relatedInner}>
              <h2 className={s.relatedH2}>Читайте также</h2>
              <div className={s.relatedGrid}>
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className={s.relatedCard}
                    style={{ ['--cat-color' as string]: a.categoryColor } as React.CSSProperties}
                  >
                    <span className={s.relatedBadge}>{a.category}</span>
                    <div className={s.relatedTitle}>{a.title}</div>
                    <div className={s.relatedTime}>{a.readTime} чтения</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.crossCities}>
          <div className={s.crossCitiesInner}>
            <h2 className={s.crossH2}>Доставка в популярные города</h2>
            <p className={s.crossLede}>Сроки и тарифы для вашего города</p>
            <div className={s.crossGrid}>
              {popularCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  data-ym-goal="city_card_click"
                  data-ym-params={`{"slug":"${c.slug}","place":"article_${article.slug}"}`}
                  className={s.crossCard}
                >
                  <span>Доставка {c.nameIn}</span>
                  <span className={s.crossArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={s.articleCta}>
          <div className={s.articleCtaInner}>
            <h2 className={s.articleCtaH2}>Заказать доставку из Китая</h2>
            <p className={s.articleCtaLede}>
              Наши менеджеры помогут с выбором товара, расчётом стоимости и оформлением заказа
            </p>
            <div className={s.articleCtaRow}>
              <Link
                href="/#calculator"
                data-ym-goal="article_cta_calc"
                data-ym-params={`{"slug":"${article.slug}"}`}
                className={s.articleCtaPrimary}
              >
                Рассчитать стоимость →
              </Link>
              <Link
                href="/#marketplaces"
                data-ym-goal="article_cta_marketplaces"
                data-ym-params={`{"slug":"${article.slug}"}`}
                className={s.articleCtaGhost}
              >
                Все маркетплейсы
              </Link>
              <a
                href="https://t.me/Taopostchat_official"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params={`{"place":"article_${article.slug}"}`}
                className={s.articleCtaGhost}
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
