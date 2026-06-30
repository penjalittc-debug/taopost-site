import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tariffs from '@/components/Tariffs';
import Calculator from '@/components/Calculator';
import Loyalty from '@/components/Loyalty';

export const metadata: Metadata = {
  title: 'Тарифы доставки из Китая — авто 350 ₽/кг, авиа 2 700 ₽/кг | TaoPost',
  description: 'Прозрачные тарифы на доставку из Китая в Россию. Авто 15-25 дней от 350 ₽/кг, авиа 3-5 дней от 2 700 ₽/кг. Калькулятор стоимости, страховка, программа лояльности.',
  alternates: { canonical: 'https://taopost.ru/tarify' },
  openGraph: {
    title: 'Тарифы доставки из Китая в Россию | TaoPost',
    description: 'Авто 15-25 дней от 350 ₽/кг, авиа 3-5 дней от 2 700 ₽/кг. Калькулятор стоимости и программа кешбэка.',
    url: 'https://taopost.ru/tarify',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'Тарифы TaoPost' }],
  },
};

const TARIFFS_FAQ = [
  {
    q: 'От чего зависит стоимость доставки из Китая?',
    a: 'Базовая стоимость — это цена за килограмм по выбранному маршруту (авто или авиа). Также учитывается объёмный вес для лёгких/громоздких товаров (если объёмный вес больше фактического — считаем по нему). Дополнительно: страховка груза 2% от стоимости товара, упаковка от 450 ₽, выкуп от 3% (если самостоятельный заказ невозможен).',
  },
  {
    q: 'Что такое объёмный вес и как он считается?',
    a: 'Объёмный вес = (длина × ширина × высота в см) ÷ 5000. Например, коробка 60×40×30 см имеет объёмный вес (60×40×30)/5000 = 14,4 кг. Если фактический вес меньше — оплата за объёмный.',
  },
  {
    q: 'Какой минимальный заказ?',
    a: 'Минимальная отправка из Китая в Россию — 5 кг. Это правило не действует для Poizon: с этой площадки выкупаем от 1 пары кроссовок (минимум по весу отменяется).',
  },
  {
    q: 'Сколько стоит выкуп товара?',
    a: 'Для одиночных заказов с Taobao, Poizon, Pinduoduo, Tmall — выкуп бесплатный. Для опта с 1688 — комиссия от 3% от суммы партии (минимум 1500 ₽). Это покрывает работу менеджера по переговорам с поставщиком, проверке партии и оформлению.',
  },
  {
    q: 'Есть ли скидки на большие заказы?',
    a: 'Да, действует программа лояльности с кешбэком и сниженными тарифами для постоянных клиентов. Чем больше отправок — тем ниже стоимость килограмма. Подробности в разделе "Программа лояльности" ниже.',
  },
  {
    q: 'Есть ли скрытые комиссии?',
    a: 'Нет. В чеке всегда указаны: цена товара, доставка (по тарифу за кг), страховка 2%, и при необходимости — выкуп (3% для опта), упаковка, фото со склада. Менеджер пришлёт смету до оплаты — без сюрпризов.',
  },
];

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Тарифы', item: 'https://taopost.ru/tarify' },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TARIFFS_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Карго доставка из Китая',
  name: 'Тарифы карго доставки TaoPost',
  provider: { '@type': 'Organization', name: 'TaoPost', url: 'https://taopost.ru' },
  areaServed: { '@type': 'Country', name: 'Россия' },
  url: 'https://taopost.ru/tarify',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'RUB',
    lowPrice: '350',
    highPrice: '2700',
    offerCount: 2,
    offers: [
      { '@type': 'Offer', name: 'Автодоставка', price: '350', priceCurrency: 'RUB' },
      { '@type': 'Offer', name: 'Авиадоставка', price: '2700', priceCurrency: 'RUB' },
    ],
  },
};

export default function TarifyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
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
              <span style={{ color: '#374151' }}>Тарифы</span>
            </nav>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#005C43', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              💰 Прозрачные тарифы
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900, color: '#111827',
              lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px',
            }}>
              Тарифы доставки<br />
              <span style={{ color: '#005C43' }}>из Китая в Россию</span>
            </h1>
            <p style={{
              fontSize: '18px', color: '#6B7280',
              lineHeight: 1.7, maxWidth: '620px', margin: '0 auto',
            }}>
              Авто от 350 ₽/кг (15-25 дней) или авиа от 2 700 ₽/кг (3-5 дней).
              Без комиссии за выкуп с маркетплейсов. Калькулятор и программа лояльности ниже.
            </p>
          </div>
        </section>

        <Tariffs />
        <Calculator />
        <Loyalty />

        {/* FAQ */}
        <section style={{ padding: '70px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '32px',
            }}>
              Вопросы о тарифах
            </h2>
            {TARIFFS_FAQ.map((item, i) => (
              <details key={i} style={{
                background: '#fff', borderRadius: '14px',
                padding: '20px 24px', marginBottom: '12px',
                border: '1px solid #E5E7EB',
              }}>
                <summary style={{
                  fontSize: '16px', fontWeight: 700, color: '#111827',
                  listStyle: 'none', cursor: 'pointer',
                }}>
                  {item.q}
                </summary>
                <p style={{
                  fontSize: '15px', color: '#4B5563', lineHeight: 1.7,
                  marginTop: '12px', marginBottom: 0,
                }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Рассчитать стоимость
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>
              Менеджер посчитает точную стоимость под ваш товар и пришлёт смету
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params='{"place":"tarify_cta"}'
                style={{
                  padding: '16px 36px',
                  background: '#fff', color: '#005C43',
                  fontWeight: 800, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                }}
              >
                Написать в Telegram →
              </a>
              <a
                href="tel:+79772767778"
                data-ym-goal="phone_click"
                data-ym-params='{"place":"tarify_cta"}'
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                +7 977 276 77 78
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
