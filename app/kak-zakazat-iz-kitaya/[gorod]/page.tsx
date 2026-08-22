import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageCta from '@/components/PageCta';
import { CITIES, getCityBySlug } from '@/lib/cities';
import { articles } from '@/lib/blog';
import s from './city.module.css';

type Params = { gorod: string };

export function generateStaticParams() {
  return CITIES.map((c) => ({ gorod: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { gorod } = await params;
  const city = getCityBySlug(gorod);
  if (!city) return {};
  // Уникальное описание из локального текста города — чтобы Google не считал
  // страницы городов дубликатами. Берём первое предложение localText.
  const firstSentence = city.localText ? city.localText.split('. ')[0].trim() + '.' : '';
  const description = firstSentence
    ? `${firstSentence} Срок — ${city.deliveryDays} (авто) или ${city.deliveryDaysAvia} (авиа). Выкуп с Taobao, Poizon, 1688 — комиссия 5% (мин. 1 000 ₽).`
    : `Пошаговая инструкция как заказать товары из Китая ${city.nameIn}. Доставка с Taobao, Poizon, Pinduoduo, 1688 ${city.nameIn} — ${city.deliveryDays}. Выкуп, проверка, страховка.`;
  return {
    title: `Доставка из Китая ${city.nameIn} — Taobao, Poizon, 1688 | TaoPost`,
    description,
    alternates: {
      canonical: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}`,
    },
    openGraph: {
      title: `Доставка из Китая ${city.nameIn} — TaoPost`,
      description: `Доставка ${city.nameIn} за ${city.deliveryDays}. Выкуп с Taobao, Poizon, 1688, Pinduoduo.`,
      url: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}`,
    },
  };
}

const GUIDES = [
  {
    id: 1,
    platform: 'Taobao',
    slug: 'taobao' as string | null,
    color: '#ff4400',
    logo: '/mp/taobao.svg',
    logoBg: '#ff4400',
    title: 'Как заказать с Taobao',
    description: 'Пошаговая инструкция: регистрация, поиск товара, оформление заказа через TaoPost',
    steps: ['Найдите товар на Taobao', 'Скопируйте ссылку на товар', 'Вставьте ссылку в личном кабинете TaoPost', 'Менеджер оформит выкуп и доставку'],
  },
  {
    id: 2,
    platform: 'Poizon',
    slug: 'poizon' as string | null,
    color: '#1a1a2e',
    logo: '/mp/poizon.png',
    logoBg: '#1a1a2e',
    title: 'Как заказать с Poizon (得物)',
    description: 'Выкуп оригинальных кроссовок и одежды с Poizon с проверкой подлинности',
    steps: ['Найдите кроссовки или одежду на Poizon', 'Скопируйте ссылку', 'Оставьте заявку в TaoPost', 'Мы проверим оригинальность и доставим'],
  },
  {
    id: 3,
    platform: 'Pinduoduo',
    slug: 'pinduoduo' as string | null,
    color: '#e4003a',
    logo: '/mp/pinduoduo.jpg',
    logoBg: '#e4003a',
    title: 'Как заказать с Pinduoduo',
    description: 'Самые низкие цены на китайские товары — одежда, электроника, аксессуары',
    steps: ['Найдите товар на Pinduoduo', 'Скопируйте ссылку', 'Создайте заказ в TaoPost', 'Получите товар'],
  },
  {
    id: 4,
    platform: '1688',
    slug: '1688' as string | null,
    color: '#ff6600',
    logo: '/mp/1688.png',
    logoBg: '#ff6600',
    title: 'Как заказать с 1688',
    description: 'Оптовые закупки напрямую от производителей Китая через TaoPost',
    steps: ['Найдите товар на 1688', 'Скопируйте ссылку', 'Укажите количество в заявке TaoPost', 'Доставим оптом по выгодной цене'],
  },
  {
    id: 5,
    platform: 'Tmall',
    slug: 'tmall' as string | null,
    color: '#ff0036',
    logo: '/mp/tmall.jpg',
    logoBg: '#ffffff',
    title: 'Как заказать с Tmall (天猫)',
    description: 'Брендовые товары и официальные магазины Китая через TaoPost',
    steps: ['Найдите товар на Tmall', 'Скопируйте ссылку', 'Оставьте заявку в TaoPost', 'Получите оригинальный брендовый товар'],
  },
  {
    id: 6,
    platform: 'Goofish',
    slug: null as string | null,
    color: '#d97706',
    logo: '/mp/gofish.webp',
    logoBg: '#d97706',
    title: 'Как заказать с Goofish (闲鱼)',
    description: 'Выкуп товаров со вторичного рынка Китая — редкие вещи по низким ценам',
    steps: ['Найдите лот на Goofish', 'Скопируйте ссылку', 'Оставьте заявку в TaoPost', 'Менеджер свяжется с продавцом и выкупит'],
  },
];

export default async function CityGuidePage({ params }: { params: Promise<Params> }) {
  const { gorod } = await params;
  const city = getCityBySlug(gorod);
  if (!city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 12);
  const featuredArticles = articles.slice(0, 4);

  const cityFaq = [
    {
      q: `Сколько идёт посылка из Китая ${city.nameIn}?`,
      a: `Авто-доставка занимает ${city.deliveryDays} с момента отправки нашим складом. Авиа — ${city.deliveryDaysAvia}. К этому добавьте 1–3 дня на выкуп товара продавцом и приёмку на нашем складе в Гуанчжоу.`,
    },
    {
      q: `Сколько стоит доставка из Китая ${city.nameIn}?`,
      a: `Авто-тариф — 450 ₽/кг. Авиа — от 2 700 ₽/кг. Минимум с Taobao и Pinduoduo — 5 кг. С Poizon выкупаем от 1 пары кроссовок. Стоимость доставки до пункта выдачи ${city.nameLocative} рассчитывается отдельно (СДЭК/Boxberry).`,
    },
    {
      q: `Как получить посылку ${city.nameLocative}?`,
      a: city.pvz + '. Также возможна курьерская доставка до двери — оформляется при создании заказа.',
    },
    {
      q: 'Берёте ли вы комиссию за выкуп?',
      a: 'Комиссия за выкуп — 5% от стоимости товаров, минимум 1 000 ₽. Плюс вы платите стоимость товара и доставку до России.',
    },
    {
      q: 'Что если товар придёт бракованным?',
      a: 'Мы делаем фото каждой посылки на складе в Китае перед отправкой. Если вы заметите брак до отправки — вернём продавцу и вернём вам деньги. Также есть страховка груза.',
    },
    {
      q: `Можно ли заказать опт ${city.nameIn} с 1688?`,
      a: 'Да, через 1688 — это основная B2B-площадка Китая. Оформляем оптовые партии напрямую от производителей с минимальным заказом.',
    },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
      { '@type': 'ListItem', position: 2, name: 'Как заказать из Китая', item: 'https://taopost.ru/kak-zakazat-iz-kitaya' },
      { '@type': 'ListItem', position: 3, name: city.nameIn, item: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityFaq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Доставка из Китая ${city.nameIn}`,
    provider: {
      '@type': 'Organization',
      name: 'TaoPost',
      url: 'https://taopost.ru',
      telephone: '+7 977 276 77 78',
    },
    areaServed: { '@type': 'City', name: city.name },
    description: `Карго доставка товаров из Китая ${city.nameIn} с Taobao, Poizon, Pinduoduo, 1688. Срок ${city.deliveryDays} (авто) или ${city.deliveryDaysAvia} (авиа).`,
    offers: [
      { '@type': 'Offer', name: 'Автодоставка', price: '450', priceCurrency: 'RUB', priceSpecification: { '@type': 'UnitPriceSpecification', price: '450', priceCurrency: 'RUB', unitCode: 'KGM' } },
      { '@type': 'Offer', name: 'Авиадоставка', price: '2700', priceCurrency: 'RUB', priceSpecification: { '@type': 'UnitPriceSpecification', price: '2700', priceCurrency: 'RUB', unitCode: 'KGM' } },
    ],
    url: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Header />
      <main>

        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <nav aria-label="breadcrumb" className={s.crumbs}>
              <Link href="/">Главная</Link>
              <span>›</span>
              <Link href="/kak-zakazat-iz-kitaya">Как заказать из Китая</Link>
              <span>›</span>
              <span className={s.crumbCurrent}>{city.nameIn}</span>
            </nav>
            <div className={s.pill}>📦 Доставка {city.nameIn}</div>
            <h1 className={s.h1}>
              Как заказать из Китая<br />
              <span className={s.h1Accent}>{city.nameIn}</span>
            </h1>
            <p className={s.lede}>
              Выкуп и доставка товаров с Taobao, Poizon, 1688, Pinduoduo {city.nameIn} —
              срок {city.deliveryDays} (авто) или {city.deliveryDaysAvia} (авиа).
              Полное сопровождение, страховка и проверка качества.
            </p>

            <div className={s.statsGrid}>
              <div className={s.statCard}>
                <div className={s.statValue}>{city.deliveryDays}</div>
                <div className={s.statLabel}>Авто-доставка</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statValue}>450 ₽/кг</div>
                <div className={s.statLabel}>Цена за кг</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statValue}>5%</div>
                <div className={s.statLabel}>Комиссия выкупа (мин. 1 000 ₽)</div>
              </div>
            </div>

            <a
              href="https://t.me/Taopostchat_official"
              target="_blank"
              rel="noopener noreferrer"
              className={s.heroCta}
            >
              Заказать {city.nameIn} →
            </a>
          </div>
        </section>

        {/* Local context block — uniqueness for SEO */}
        {city.localText && (
          <section className={s.local}>
            <div className={s.localInner}>
              {city.region && <div className={s.regionBadge}>{city.region}</div>}
              <h2 className={s.localH2}>Доставка из Китая {city.nameIn} — особенности города</h2>
              <p className={s.localText}>{city.localText}</p>
            </div>
          </section>
        )}

        {/* How it works in this city */}
        <section className={s.steps}>
          <div className={s.stepsInner}>
            <h2 className={s.h2Big}>Как работает доставка {city.nameIn}</h2>
            <p className={s.sectionLede}>
              4 простых шага — от заказа в Китае до получения {city.nameLocative}
            </p>

            <div className={s.stepsGrid}>
              {[
                { n: 1, t: 'Заказ', d: 'Отправляете ссылки на товары в личном кабинете или менеджеру' },
                { n: 2, t: 'Выкуп', d: 'Мы выкупаем товар у продавца в Китае — комиссия 5% (мин. 1 000 ₽)' },
                { n: 3, t: 'Склад', d: 'Товар приходит на наш склад в Гуанчжоу — проверка, фото, упаковка' },
                { n: 4, t: 'Доставка', d: `Отправка ${city.nameIn} — авто (${city.deliveryDays}) или авиа (${city.deliveryDaysAvia})` },
              ].map((st) => (
                <div key={st.n} className={s.step}>
                  <div className={s.stepN}>{st.n}</div>
                  <h3 className={s.stepT}>{st.t}</h3>
                  <p className={s.stepD}>{st.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery info card */}
        <section className={s.delivery}>
          <div className={s.deliveryInner}>
            <div className={s.deliveryCard}>
              <h2 className={s.deliveryH2}>Доставка {city.nameIn} — условия</h2>
              <div className={s.infoGrid}>
                <div>
                  <div className={s.infoLabel}>Срок (авто)</div>
                  <div className={s.infoValue}>{city.deliveryDays}</div>
                </div>
                <div>
                  <div className={s.infoLabel}>Срок (авиа)</div>
                  <div className={s.infoValue}>{city.deliveryDaysAvia}</div>
                </div>
                <div>
                  <div className={s.infoLabel}>Тариф авто</div>
                  <div className={s.infoValue}>450 ₽/кг</div>
                </div>
                <div>
                  <div className={s.infoLabel}>Тариф авиа</div>
                  <div className={s.infoValue}>от 2 700 ₽/кг</div>
                </div>
                <div className={s.infoFull}>
                  <div className={s.infoLabel}>Получение {city.nameLocative}</div>
                  <div className={s.infoValueSm}>{city.pvz}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides by platform */}
        <section className={s.guides}>
          <div className={s.guidesInner}>
            <h2 className={s.h2Big}>Откуда заказывать {city.nameIn}</h2>
            <p className={s.guidesLede}>Поддерживаем все популярные китайские маркетплейсы</p>

            <div className={s.guidesGrid}>
              {GUIDES.map((guide) => {
                const vars = { '--mp-color': guide.color, '--mp-bg': guide.logoBg } as React.CSSProperties;
                const inner = (
                  <>
                    <div className={s.cardHead}>
                      <div className={s.logo}>
                        <Image src={guide.logo} alt={guide.platform} width={44} height={44} />
                      </div>
                      <span className={s.tag}>{guide.platform}</span>
                    </div>

                    <h3 className={s.cardTitle}>{guide.title}</h3>
                    <p className={s.cardDesc}>{guide.description}</p>

                    <ol className={s.cardSteps}>
                      {guide.steps.map((step, i) => (
                        <li key={i} className={s.cardStep}>
                          <span className={s.stepBadge}>{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>

                    {guide.slug && <div className={s.more}>Подробный гайд →</div>}
                  </>
                );

                return guide.slug ? (
                  <Link
                    key={guide.id}
                    href={`/${guide.slug}`}
                    data-ym-goal="marketplace_card_click"
                    data-ym-params={`{"slug":"${guide.slug}","place":"city_${city.slug}"}`}
                    className={s.card}
                    style={vars}
                  >
                    {inner}
                  </Link>
                ) : (
                  <article key={guide.id} className={s.card} style={vars}>{inner}</article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={s.faq}>
          <div className={s.faqInner}>
            <h2 className={s.faqH2}>Частые вопросы о доставке {city.nameIn}</h2>

            {cityFaq.map((item, i) => (
              <details key={i} className={s.faqItem}>
                <summary className={s.faqSummary}>{item.q}</summary>
                <p className={s.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Useful articles */}
        <section className={s.articles}>
          <div className={s.articlesInner}>
            <h2 className={s.articlesH2}>Полезные статьи перед заказом</h2>
            <p className={s.articlesLede}>Что почитать перед первой покупкой в Китае</p>
            <div className={s.articlesGrid}>
              {featuredArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  data-ym-goal="blog_card_click"
                  data-ym-params={`{"slug":"${a.slug}","place":"city_${city.slug}"}`}
                  className={s.article}
                  style={{ '--cat-color': a.categoryColor } as React.CSSProperties}
                >
                  <span className={s.articleCat}>{a.category}</span>
                  <div className={s.articleTitle}>{a.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section className={s.otherCities}>
          <div className={s.otherInner}>
            <h2 className={s.otherH2}>Доставка из Китая в другие города</h2>
            <div className={s.otherGrid}>
              {otherCities.map((c) => (
                <Link key={c.slug} href={`/kak-zakazat-iz-kitaya/${c.slug}`} className={s.otherLink}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PageCta
          title={`Заказать из Китая ${city.nameIn}`}
          lede="Менеджер ответит за 5 минут — поможет с выбором товара, оформлением и доставкой"
          actions={[
            { label: 'Начать заказ →', href: 'https://t.me/Taopostchat_official', variant: 'primary', external: true },
            { label: 'Telegram канал', href: 'https://t.me/Taopostchat_official', variant: 'ghost', external: true },
          ]}
        />

      </main>
      <Footer />
    </>
  );
}
