import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tariffs from '@/components/Tariffs';
import CargoChecklist from '@/components/CargoChecklist';
import Calculator from '@/components/Calculator';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import s from './tarify.module.css';

export const metadata: Metadata = {
  title: 'Тарифы TaoPost — авто 450 ₽/кг, авиа от 2 700 ₽/кг',
  description: 'Прозрачные тарифы на доставку из Китая в Россию. Авто 15-25 дней 450 ₽/кг, авиа 3-5 дней от 2 700 ₽/кг. Калькулятор стоимости, страховка, честный единый тариф.',
  alternates: { canonical: 'https://taopost.ru/tarify' },
  openGraph: {
    title: 'Тарифы доставки из Китая в Россию | TaoPost',
    description: 'Авто 15-25 дней 450 ₽/кг, авиа 3-5 дней от 2 700 ₽/кг. Калькулятор стоимости и прозрачные условия.',
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
    a: 'Объёмный вес = (длина × ширина × высота в см) ÷ 6000. Например, коробка 60×50×40 см имеет объёмный вес (60×50×40)/6000 = 20 кг. Если фактический вес меньше объёмного — оплата за больший из двух.',
  },
  {
    q: 'Какой минимальный заказ?',
    a: 'Минимальная отправка из Китая в Россию — 5 кг. Это правило не действует для Poizon: с этой площадки выкупаем от 1 пары кроссовок (минимум по весу отменяется).',
  },
  {
    q: 'Сколько стоит выкуп товара?',
    a: 'Комиссия за выкуп — 5% от суммы заказа (минимум 1 000 ₽). Для опта с 1688 — от 3% от суммы партии (минимум 1 500 ₽). Это покрывает работу менеджера по переговорам с поставщиком, проверке партии и оформлению.',
  },
  {
    q: 'Есть ли скидки на большие заказы?',
    a: 'Тариф единый — 450 ₽/кг при любом весе и объёме, без порогов. Для оптовых партий с 1688 условия считаем индивидуально — напишите менеджеру.',
  },
  {
    q: 'Есть ли скрытые комиссии?',
    a: 'Нет. В чеке всегда указаны: цена товара, доставка (по тарифу за кг), страховка 2%, и комиссия за выкуп (5%, мин. 1 000 ₽; для опта с 1688 — от 3%), упаковка, фото со склада. Менеджер пришлёт смету до оплаты — без сюрпризов.',
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
    lowPrice: '450',
    highPrice: '2700',
    offerCount: 2,
    offers: [
      { '@type': 'Offer', name: 'Автодоставка', price: '450', priceCurrency: 'RUB' },
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
        <PageHero
          currentCrumb="Тарифы"
          pill="💰 Прозрачные тарифы"
          title={<>Тарифы доставки<br /><span style={{ color: '#005C43' }}>из Китая в Россию</span></>}
          lede="Авто 450 ₽/кг (15-25 дней) или авиа от 2 700 ₽/кг (3-5 дней). Калькулятор ниже."
        />

        <Tariffs />
        <CargoChecklist />
        <Calculator />

        <section className={s.faqSection}>
          <div className={s.faqInner}>
            <h2 className={s.faqH2}>Вопросы о тарифах</h2>
            {TARIFFS_FAQ.map((item, i) => (
              <details key={i} className={s.faqItem}>
                <summary className={s.faqSummary}>{item.q}</summary>
                <p className={s.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <PageCta
          title="Рассчитать стоимость"
          lede="Менеджер посчитает точную стоимость под ваш товар и пришлёт смету"
          actions={[
            {
              label: 'Написать в Telegram →',
              href: 'https://t.me/Taopostchat_official',
              external: true,
              ymGoal: 'telegram_click',
              ymParams: '{"place":"tarify_cta"}',
            },
            {
              label: '+7 977 276 77 78',
              href: 'tel:+79772767778',
              variant: 'ghost',
              ymGoal: 'phone_click',
              ymParams: '{"place":"tarify_cta"}',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
