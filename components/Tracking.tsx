'use client';
import { useState } from 'react';

export default function Tracking() {
  const [trackingNum, setTrackingNum] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleTrack = () => {
    if (!trackingNum.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="tracking" style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700, marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Отслеживание
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Отследить посылку
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            Введите номер заказа (формат: TP01-1234-A) чтобы узнать статус
          </p>
        </div>

        <div style={{
          background: '#F9FAFB',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid #F3F4F6',
        }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }} className="tracking-input">
            <input
              type="text"
              value={trackingNum}
              onChange={(e) => { setTrackingNum(e.target.value); setSubmitted(false); }}
              placeholder="TP01-1234-A"
              style={{
                flex: 1, padding: '16px 20px',
                borderRadius: '14px',
                border: '2px solid #E5E7EB',
                fontSize: '16px',
                outline: 'none',
                background: 'white',
                fontFamily: 'Nunito, sans-serif',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#1B9E7E'}
              onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#E5E7EB'}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button onClick={handleTrack} style={{
              padding: '16px 28px',
              background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
              color: 'white', fontWeight: 800, fontSize: '15px',
              borderRadius: '14px', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(27,158,126,0.35)',
              fontFamily: 'Nunito, sans-serif',
              whiteSpace: 'nowrap',
            }}>
              Отследить
            </button>
          </div>

          {submitted && (
            <div style={{
              background: 'white', borderRadius: '16px', padding: '24px',
              border: '1px solid #E5E7EB', textAlign: 'left',
            }}>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
                Номер заказа: <strong style={{ color: '#111827' }}>{trackingNum}</strong>
              </div>
              <div style={{
                padding: '16px', background: '#fffbeb', borderRadius: '12px',
                border: '1px solid #fde68a', fontSize: '14px', color: '#92400e',
                fontWeight: 600,
              }}>
                📦 Для отслеживания войдите в личный кабинет или напишите нам в Telegram
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                <a href="https://taopost.vercel.app" target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, padding: '12px', background: '#1B9E7E', color: 'white',
                  borderRadius: '12px', textDecoration: 'none', fontWeight: 700,
                  fontSize: '14px', textAlign: 'center',
                }}>
                  Личный кабинет
                </a>
                <a href="https://t.me/taopost" target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, padding: '12px', background: '#e8f7f3', color: '#1B9E7E',
                  borderRadius: '12px', textDecoration: 'none', fontWeight: 700,
                  fontSize: '14px', textAlign: 'center', border: '1px solid #c6ede4',
                }}>
                  Написать в Telegram
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .tracking-input { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
