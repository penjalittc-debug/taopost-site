import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '@/lib/blog';
import s from './blog.module.css';

export const metadata: Metadata = {
  title: 'Блог TaoPost — Гайды и советы по доставке из Китая',
  description: 'Полезные статьи о доставке из Китая: размерные сетки, таможенные нормы, инструкции по Taobao и Pinduoduo, сравнения маркетплейсов.',
  alternates: {
    canonical: 'https://taopost.ru/blog',
  },
  openGraph: {
    title: 'Блог TaoPost — Гайды по доставке из Китая',
    description: 'Полезные статьи о доставке из Китая: размерные сетки, таможенные нормы, инструкции по Taobao и Pinduoduo.',
    url: 'https://taopost.ru/blog',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'Блог TaoPost' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог TaoPost — Гайды по доставке из Китая',
    description: 'Полезные статьи о доставке из Китая: размерные сетки, таможенные нормы, инструкции по Taobao и Pinduoduo.',
    images: ['https://taopost.ru/og-image.png'],
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.pill}>📖 Полезные материалы</div>
            <h1 className={s.h1}>
              Блог Tao<span className={s.h1Accent}>Post</span>
            </h1>
            <p className={s.lede}>
              Гайды, инструкции и советы — всё что нужно знать о доставке товаров из Китая в Россию
            </p>
          </div>
        </section>

        <section className={s.grid}>
          <div className={s.gridInner}>
            <div className={s.gridList}>
              {articles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className={s.cardLink}>
                  <article
                    className={s.card}
                    style={{ ['--cat-color' as string]: article.categoryColor }}
                  >
                    {article.image && (
                      <div className={s.cover}>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 360px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    <div className={s.body}>
                      <div className={s.category}>
                        <span className={s.categoryBadge}>{article.category}</span>
                      </div>

                      <h2 className={s.cardH2}>{article.title}</h2>

                      <p className={s.cardText}>{article.description}</p>

                      <div className={s.cardFoot}>
                        <div className={s.cardMeta}>
                          {article.date} · {article.readTime} чтения
                        </div>
                        <span className={s.cardMore}>Читать →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={s.ctaSection}>
          <div className={s.ctaInner}>
            <h2 className={s.ctaH2}>Готовы сделать заказ?</h2>
            <p className={s.ctaLede}>
              Менеджеры TaoPost помогут с любым вопросом и оформят доставку из Китая
            </p>
            <a
              href="https://t.me/Taopostchat_official"
              target="_blank"
              rel="noopener noreferrer"
              className={s.ctaLink}
            >
              Написать в Telegram →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
