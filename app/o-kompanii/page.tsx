import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import WarehouseGallery from '@/components/WarehouseGallery';

export const metadata: Metadata = {
  title: 'О компании TaoPost — официальная карго-доставка из Китая',
  description: 'TaoPost — китайское юр.лицо с бизнес-лицензией КНР. Свой склад в Гуанчжоу, 200 000+ посылок с 2019 года. Команда на двух языках, легальные операции.',
  keywords: 'taopost о компании, официальная карго компания, доставка из китая компания, юр лицо китай, бизнес лицензия кнр',
  alternates: { canonical: 'https://taopost.ru/o-kompanii' },
  openGraph: {
    title: 'О компании TaoPost — карго из Китая с китайской лицензией',
    description: 'Официальная карго-компания с юр.лицом в КНР и собственным складом в Гуанчжоу. С 2019 года, 200 000+ посылок.',
    url: 'https://taopost.ru/o-kompanii',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'О компании TaoPost' }],
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'О компании', item: 'https://taopost.ru/o-kompanii' },
  ],
};

const TIMELINE = [
  { year: '2019', title: 'Старт работы', text: 'Первые отправки между Гуанчжоу и Москвой. Команда из 3 человек.' },
  { year: '2021', title: 'Свой склад в Гуанчжоу', text: 'Открыли собственный склад приёмки и упаковки в районе Ливань.' },
  { year: '2023', title: 'Авиа-маршрут', text: 'Запустили авиа-доставку Пекин → Москва за 3-5 дней.' },
  { year: '2025', title: 'Лицензия КНР', text: 'Получили официальную бизнес-лицензию (营业执照) в Гуанчжоу. Все операции — через китайское юр.лицо.' },
  { year: '2026', title: '200 000+ посылок', text: 'Более 200 тысяч успешных отправок, география — 85+ городов России и Беларуси.' },
];

export default function OKompaniiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main>
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '120px 24px 60px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <nav aria-label="breadcrumb" style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Главная</Link>
              <span>›</span>
              <span style={{ color: '#374151' }}>О компании</span>
            </nav>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#005C43', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              🇨🇳 Юр.лицо в КНР · Лицензия 营业执照
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900, color: '#111827',
              lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px',
            }}>
              О компании <span style={{ color: '#005C43' }}>TaoPost</span>
            </h1>
            <p style={{
              fontSize: '18px', color: '#6B7280',
              lineHeight: 1.7, maxWidth: '620px', margin: '0 auto',
            }}>
              Официальная карго-компания с китайской бизнес-лицензией, собственным складом в Гуанчжоу
              и командой на двух языках. Доставляем товары из Китая в Россию с 2019 года.
            </p>
          </div>
        </section>

        <About />

        {/* Timeline */}
        <section style={{ padding: '70px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '40px',
            }}>
              Как мы росли
            </h2>
            <div style={{ position: 'relative', paddingLeft: '40px' }}>
              <div style={{
                position: 'absolute', left: '12px', top: '12px', bottom: '12px',
                width: '2px', background: 'linear-gradient(180deg, #005C43, #FF5A47)',
              }} />
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: '32px' }}>
                  <span style={{
                    position: 'absolute', left: '-34px', top: '4px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#005C43', border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #005C43',
                  }} />
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#005C43', marginBottom: '4px' }}>
                    {item.year}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WarehouseGallery />
        <Reviews />

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Начать работу
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>
              Напишите менеджеру — расскажем больше, ответим на вопросы и поможем оформить первую отправку
            </p>
            <a
              href="https://t.me/taopostsupport?start=site"
              target="_blank"
              rel="noopener noreferrer"
              data-ym-goal="telegram_click"
              data-ym-params='{"place":"o_kompanii_cta"}'
              style={{
                padding: '16px 36px',
                background: '#fff', color: '#005C43',
                fontWeight: 800, fontSize: '16px',
                borderRadius: '50px', textDecoration: 'none',
                display: 'inline-block',
              }}
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
