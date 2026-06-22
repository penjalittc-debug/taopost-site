import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { articles } from '@/lib/blog';

export default function BlogPreview() {
  const preview = articles.slice(0, 3);

  return (
    <section className="tp-section tp-section--muted" id="blog-preview">
      <div className="tp-mesh tp-mesh--green tp-mesh--tl" />

      <div className="bp__wrap">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <BookOpen size={14} strokeWidth={2.5} />
            Блог TaoPost
          </span>
          <h2 className="tp-h2">
            Полезные <span className="tp-gradient-text">гайды и инструкции</span>
          </h2>
          <p className="tp-lede">
            Как заказывать с Taobao, Poizon, 1688 — разбираем размеры, таможню, поиск товаров
          </p>
        </div>

        <div className="bp__grid">
          {preview.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="bp__card" data-ym-goal="blog_card_click" data-ym-params={JSON.stringify({ slug: a.slug })}>
              {a.image && (
                <div className="bp__cover">
                  <Image src={a.image} alt={a.title} fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 360px" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div className="bp__body">
                <span className="bp__cat" style={{ background: a.categoryColor + '18', color: a.categoryColor, borderColor: a.categoryColor + '30' }}>
                  {a.category}
                </span>
                <h3 className="bp__title">{a.title}</h3>
                <p className="bp__desc">{a.description}</p>
                <div className="bp__foot">
                  <span className="bp__meta">{a.date} · {a.readTime}</span>
                  <span className="bp__more">Читать <ArrowRight size={14} strokeWidth={2.5} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bp__all">
          <Link href="/blog" className="tp-btn tp-btn--ghost" data-ym-goal="blog_all_click">
            Все статьи блога
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style>{`
        .bp__wrap { max-width: 1200px; margin: 0 auto; position: relative; }
        .bp__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 36px;
        }
        .bp__card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 20px;
          border: 1px solid #F3F4F6;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow .2s, transform .2s;
          height: 100%;
        }
        .bp__card:hover {
          box-shadow: 0 14px 40px -14px rgba(10,15,28,0.14);
          transform: translateY(-3px);
        }
        .bp__cover {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #E5E7EB;
        }
        .bp__body {
          padding: 24px 24px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bp__cat {
          display: inline-block;
          align-self: flex-start;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid transparent;
          margin-bottom: 14px;
        }
        .bp__title {
          font-size: 18px;
          font-weight: 800;
          color: var(--ink);
          line-height: 1.35;
          margin: 0 0 10px;
          flex: 1;
        }
        .bp__desc {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0 0 18px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bp__foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid #F3F4F6;
        }
        .bp__meta {
          font-size: 12px;
          color: #9CA3AF;
        }
        .bp__more {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 700;
          color: var(--green-dark);
        }
        .bp__all {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
