import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Блог TaoPost — Гайды и советы по доставке из Китая',
  description: 'Полезные статьи о доставке из Китая: размерные сетки, таможенные нормы, инструкции по Taobao и Pinduoduo, сравнения маркетплейсов.',
  keywords: 'блог доставка из китая, гайды taobao, советы заказ из китая, таможня китай россия',
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
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              📖 Полезные материалы
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}>
              Блог Tao<span style={{ color: '#1B9E7E' }}>Post</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto',
            }}>
              Гайды, инструкции и советы — всё что нужно знать о доставке товаров из Китая в Россию
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
            }}
            className="blog-grid"
            >
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article style={{
                    background: '#F9FAFB',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid #F3F4F6',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'pointer',
                  }}
                  className="blog-card"
                  >
                    {/* Category */}
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        background: article.categoryColor + '18',
                        color: article.categoryColor,
                        fontWeight: 700, fontSize: '12px',
                        padding: '4px 12px', borderRadius: '50px',
                        border: `1px solid ${article.categoryColor}30`,
                      }}>
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontSize: '19px',
                      fontWeight: 800,
                      color: '#111827',
                      lineHeight: 1.35,
                      marginBottom: '12px',
                      flex: 1,
                    }}>
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      lineHeight: 1.65,
                      marginBottom: '24px',
                    }}>
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #E5E7EB',
                    }}>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {article.date} · {article.readTime} чтения
                      </div>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1B9E7E',
                      }}>
                        Читать →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #1B9E7E 0%, #0D7A5F 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Готовы сделать заказ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.6 }}>
              Менеджеры TaoPost помогут с любым вопросом и оформят доставку из Китая
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostmaneger?start=site"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 36px',
                  background: '#fff', color: '#1B9E7E',
                  fontWeight: 800, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                }}
              >
                Написать в Telegram →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .blog-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
