import { ImageResponse } from 'next/og';
import { CITIES, getCityBySlug } from '@/lib/cities';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'TaoPost — Доставка из Китая';

export async function generateImageMetadata() {
  return CITIES.map((c) => ({ id: c.slug, alt: `Доставка из Китая ${c.nameIn}`, size, contentType }));
}

type Props = { params: Promise<{ gorod: string }> };

export default async function Image({ params }: Props) {
  const { gorod } = await params;
  const city = getCityBySlug(gorod);
  const cityName = city?.name || 'Россия';
  const cityIn = city?.nameIn || 'в Россию';
  const days = city?.deliveryDays || '15-25 дней';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          padding: '70px 80px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.12)',
            fontSize: 28,
            fontWeight: 800,
            padding: '12px 24px',
            borderRadius: 14,
            color: '#fff',
          }}>
            Tao<span style={{ color: '#FF5A47' }}>Post</span>
          </div>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.12)',
            fontSize: 20,
            fontWeight: 700,
            padding: '10px 18px',
            borderRadius: 999,
          }}>
            🇨🇳 → 🇷🇺
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 600,
            opacity: 0.75,
            marginBottom: 16,
          }}>
            Доставка из Китая
          </div>
          <div style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: 28,
          }}>
            {cityIn}
          </div>
          <div style={{
            display: 'flex',
            gap: 32,
            fontSize: 22,
            color: 'rgba(255,255,255,0.85)',
          }}>
            <div style={{ display: 'flex' }}>Авто {days}</div>
            <div style={{ display: 'flex' }}>·</div>
            <div style={{ display: 'flex' }}>от 350 ₽/кг</div>
            <div style={{ display: 'flex' }}>·</div>
            <div style={{ display: 'flex' }}>Taobao · Poizon · 1688</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          color: 'rgba(255,255,255,0.7)',
        }}>
          <div style={{ display: 'flex' }}>taopost.ru</div>
          <div style={{ display: 'flex' }}>{cityName}</div>
        </div>
      </div>
    ),
    size,
  );
}
