'use client';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'О компании', href: '#about' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Маркетплейсы', href: '#marketplaces' },
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'FAQ', href: '#faq' },
  { label: '📚 Как заказать из Китая', href: '/kak-zakazat-iz-kitaya' },
  { label: '📖 Блог', href: '/blog' },
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
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Телефон</div>
                <a
                  href="tel:+79772767778"
                  style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  +7 977 276 77 78
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Telegram (менеджер)</div>
                <a
                  href="https://t.me/taopostmaneger"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#1B9E7E', textDecoration: 'none', fontWeight: 600 }}
                >
                  @taopostmaneger
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Email — сотрудничество</div>
                <a
                  href="mailto:info@taopost.ru"
                  style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  info@taopost.ru
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '3px' }}>Email — обращения и жалобы</div>
                <a
                  href="mailto:help@taopost.ru"
                  style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  help@taopost.ru
                </a>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Скачать приложение</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* App Store */}
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1d2433', borderRadius: '10px', padding: '8px 12px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#2d3748'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#1d2433'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <div>
                      <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1 }}>Загрузить в</div>
                      <div style={{ fontSize: '13px', color: 'white', fontWeight: 700, lineHeight: 1.3 }}>App Store</div>
                    </div>
                  </a>
                  {/* Google Play */}
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1d2433', borderRadius: '10px', padding: '8px 12px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#2d3748'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#1d2433'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.3.17.64.22.99.14l.09-.05 11.29-6.52-2.5-2.5-9.87 8.93zm-1.1-19.74A1.7 1.7 0 0 0 2 4.87v14.26c0 .43.14.82.37 1.13l.07.08 7.99-7.99v-.19L2.08 4.02zm16.04 9.39-2.73-1.58-2.77 2.77 2.77 2.77 2.75-1.59c.78-.45.78-1.92-.02-2.37zM4.17.24 15.46 6.76l-2.5 2.5L2.27.38A1.16 1.16 0 0 1 4.17.24z"/></svg>
                    <div>
                      <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1 }}>Доступно в</div>
                      <div style={{ fontSize: '13px', color: 'white', fontWeight: 700, lineHeight: 1.3 }}>Google Play</div>
                    </div>
                  </a>
                  {/* AppGallery */}
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1d2433', borderRadius: '10px', padding: '8px 12px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#2d3748'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#1d2433'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    <div>
                      <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1 }}>Доступно в</div>
                      <div style={{ fontSize: '13px', color: 'white', fontWeight: 700, lineHeight: 1.3 }}>AppGallery</div>
                    </div>
                  </a>
                </div>
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
