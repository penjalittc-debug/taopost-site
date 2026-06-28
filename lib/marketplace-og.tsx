import { ImageResponse } from 'next/og';
import { Marketplace } from './marketplaces';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function marketplaceOgImage(mp: Marketplace) {
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
          <div style={{
            display: 'flex',
            background: mp.color,
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            padding: '10px 22px',
            borderRadius: 999,
          }}>
            {mp.pill}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            color: '#6B7280',
            marginBottom: 16,
          }}>
            Доставка из Китая в Россию
          </div>
          <div style={{
            display: 'flex',
            fontSize: 110,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-3px',
            color: '#0A0F1C',
            marginBottom: 28,
          }}>
            {mp.name}
          </div>
          <div style={{
            display: 'flex',
            gap: 24,
            fontSize: 22,
            color: '#374151',
            fontWeight: 600,
          }}>
            <div style={{ display: 'flex' }}>от 350 ₽/кг</div>
            <div style={{ display: 'flex', color: '#9CA3AF' }}>·</div>
            <div style={{ display: 'flex' }}>15-25 дней</div>
            <div style={{ display: 'flex', color: '#9CA3AF' }}>·</div>
            <div style={{ display: 'flex' }}>{mp.minOrder.split('—')[0]?.trim() || 'без предоплаты'}</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#6B7280',
        }}>
          <div style={{ display: 'flex' }}>taopost.ru/{mp.slug}</div>
          <div style={{ display: 'flex' }}>Лицензия КНР · Свой склад в Гуанчжоу</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
