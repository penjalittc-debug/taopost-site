import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import FadeIn from '@/components/FadeIn';
import { FAQS } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Частые вопросы (FAQ) — TaoPost доставка из Китая',
  description:
    'Ответы на популярные вопросы о доставке из Китая в Россию: сроки, стоимость, оплата, таможня, страховка, выкуп с Taobao, Poizon, 1688, Pinduoduo.',
  keywords:
    'faq taopost, вопросы и ответы доставка из китая, сроки доставки китай, сколько стоит карго, как оплатить таобао',
  alternates: { canonical: 'https://taopost.ru/faq' },
  openGraph: {
    title: 'Частые вопросы о доставке из Китая — TaoPost',
    description:
      'Сроки, цены, таможня, страховка, оплата и выкуп — всё, что нужно знать перед первым заказом.',
    url: 'https://taopost.ru/faq',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'FAQ TaoPost' }],
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Частые вопросы', item: 'https://taopost.ru/faq' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <section
          style={{
            background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
            padding: '120px 24px 40px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <nav
              aria-label="breadcrumb"
              style={{
                fontSize: '13px',
                color: '#9CA3AF',
                marginBottom: '20px',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
                Главная
              </Link>
              <span>›</span>
              <span style={{ color: '#374151' }}>Частые вопросы</span>
            </nav>
          </div>
        </section>

        <FadeIn>
          <FAQ />
        </FadeIn>

        <section
          style={{
            padding: '80px 24px',
            background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 38px)',
                fontWeight: 900,
                color: '#fff',
                marginBottom: '16px',
              }}
            >
              Не нашли ответ?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '17px',
                marginBottom: '32px',
                lineHeight: 1.6,
              }}
            >
              Напишите менеджеру в Telegram — ответим за несколько минут
            </p>
            <a
              href="https://t.me/taopostsupport?start=site"
              target="_blank"
              rel="noopener noreferrer"
              data-ym-goal="telegram_click"
              data-ym-params='{"place":"faq_cta"}'
              style={{
                padding: '16px 36px',
                background: '#fff',
                color: '#005C43',
                fontWeight: 800,
                fontSize: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
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
