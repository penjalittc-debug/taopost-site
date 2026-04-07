'use client';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'О компании', href: '#about' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Маркетплейсы', href: '#marketplaces' },
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'FAQ', href: '#faq' },
  { label: '📚 Как заказать из Китая', href: '/kak-zakazat-iz-kitaya' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contacts" style={{ background: '#111827', color: 'white', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}
        className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Image src="/logo.png" alt="TaoPost" width={36} height={36} style={{ objectFit: 'contain' }} />
              <span style={{ fontWeight: 800, fontSize: '20px' }}>
                Tao<span style={{ color: '#1B9E7E' }}>Post</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: 1.7, maxWidth: '300px', marginBottom: '24px' }}>
              Официальная доставка товаров из Китая в Россию. Работаем с крупнейшими китайскими маркетплейсами.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://t.me/taopost"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px', height: '40px',
                  background: '#1d2433',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#0088cc'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#1d2433'}
                aria-label="Telegram"
              >
                ✈️
              </a>
              <a
                href="https://wa.me/79999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px', height: '40px',
                  background: '#1d2433',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#25d366'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#1d2433'}
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#F9FAFB', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Навигация
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    color: '#9CA3AF',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#1B9E7E'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#9CA3AF'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#F9FAFB', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Контакты
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Telegram</div>
                <a
                  href="https://t.me/taopost"
                  style={{ fontSize: '14px', color: '#1B9E7E', textDecoration: 'none', fontWeight: 600 }}
                >
                  @taopost
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>WhatsApp / Телефон</div>
                <a
                  href="tel:+79999999999"
                  style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  +7 (999) 999-99-99
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Email</div>
                <a
                  href="mailto:info@taopost.ru"
                  style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  info@taopost.ru
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Сайт приложения</div>
                <a
                  href="https://taopost.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#1B9E7E', textDecoration: 'none', fontWeight: 600 }}
                >
                  taopost.vercel.app →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1F2937', marginBottom: '24px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#6B7280' }}>
            © {year} TaoPost. Все права защищены.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/privacy" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>
              Политика конфиденциальности
            </a>
            <a href="/terms" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
