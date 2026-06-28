import { ImageResponse } from 'next/og';
import { articles, getArticleBySlug } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'TaoPost';

export async function generateImageMetadata() {
  return articles.map((a) => ({ id: a.slug, alt: a.title, size, contentType }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title || 'TaoPost — Блог';
  const category = article?.category || 'Блог';
  const categoryColor = article?.categoryColor || '#005C43';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '70px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            color: '#005C43',
            fontSize: 28,
            fontWeight: 800,
            padding: '12px 24px',
            borderRadius: 14,
            border: '2px solid #005C43',
          }}>
            Tao<span style={{ color: '#FF5A47' }}>Post</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: `${categoryColor}22`,
            color: categoryColor,
            fontSize: 22,
            fontWeight: 700,
            padding: '8px 20px',
            borderRadius: 999,
            marginBottom: 28,
            border: `1px solid ${categoryColor}44`,
          }}>
            {category}
          </div>
          <div style={{
            display: 'flex',
            fontSize: title.length > 60 ? 52 : 64,
            fontWeight: 800,
            color: '#0A0F1C',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            maxWidth: 1040,
          }}>
            {title}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#6B7280',
        }}>
          <div style={{ display: 'flex' }}>taopost.ru</div>
          <div style={{ display: 'flex' }}>Карго из Китая в Россию</div>
        </div>
      </div>
    ),
    size,
  );
}
