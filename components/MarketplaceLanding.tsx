import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import { Marketplace, MARKETPLACES } from '@/lib/marketplaces';
import { CITIES } from '@/lib/cities';
import { articles } from '@/lib/blog';
import s from './MarketplaceLanding.module.css';

type Props = {
  mp: Marketplace;
  calculator?: React.ReactNode;
};

export default function MarketplaceLanding({ mp, calculator }: Props) {
  const popularCities = CITIES.filter((c) =>
    ['moskva', 'sankt-peterburg', 'ekaterinburg', 'novosibirsk', 'kazan', 'krasnodar', 'rostov-na-donu', 'nizhniy-novgorod'].includes(c.slug),
  );
  const linkedArticles = mp.relatedArticles
    ? mp.relatedArticles.map((s) => articles.find((a) => a.slug === s)).filter(Boolean)
    : [];
  const otherMarketplaces = MARKETPLACES.filter((m) => m.slug !== mp.slug);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
      { '@type': 'ListItem', position: 2, name: mp.name, item: `https://taopost.ru/${mp.slug}` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mp.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Доставка с ${mp.name} в Россию`,
    name: `Выкуп и доставка с ${mp.name}`,
    provider: {
      '@type': 'Organization',
      name: 'TaoPost',
      url: 'https://taopost.ru',
      telephone: '+7 977 276 77 78',
    },
    areaServed: { '@type': 'Country', name: 'Россия' },
    description: mp.descriptionSeo,
    url: `https://taopost.ru/${mp.slug}`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: '350',
      highPrice: '2700',
      offerCount: 2,
    },
  };

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Как заказать с ${mp.name}`,
    description: `Пошаговая инструкция: как выкупить и доставить товары с ${mp.name} (${mp.chineseName}) в Россию через TaoPost.`,
    image: `https://taopost.ru/${mp.slug}/opengraph-image`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'RUB',
      value: '350',
    },
    totalTime: 'P25D',
    supply: [{ '@type': 'HowToSupply', name: `Ссылка на товар на ${mp.name}` }],
    tool: [{ '@type': 'HowToTool', name: 'Telegram (@taopostsupport)' }],
    step: mp.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.text,
      url: `https://taopost.ru/${mp.slug}#step-${i + 1}`,
    })),
  };

  // Цвета маркетплейса пробрасываем в CSS-переменные, чтобы модуль оставался общим для всех 5 роутов.
  const brandVars = { '--mp-color': mp.color, '--mp-logo-bg': mp.logoBg } as React.CSSProperties;

  return (
    <div style={brandVars}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <Header />
      <main>
        <section className={s.hero}>
          <div className={s.container}>
            <nav aria-label="breadcrumb" className={s.breadcrumb}>
              <Link href="/">Главная</Link>
              <span>›</span>
              <span className={s.breadcrumbCurrent}>{mp.name}</span>
            </nav>

            <div className={s.heroLayout}>
              <div>
                <div className={s.pill}>
                  <span className={s.pillLogo}>
                    <Image src={mp.logo} alt={mp.name} width={26} height={26} style={{ objectFit: 'cover' }} />
                  </span>
                  <span className={s.pillText}>{mp.pill}</span>
                </div>

                <h1 className={s.h1}>{mp.h1}</h1>
                <p className={s.subtitle}>{mp.hSubtitle}</p>

                <div className={s.ctaRow}>
                  <a
                    href="https://t.me/taopostsupport?start=site"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ym-goal="telegram_click"
                    data-ym-params={`{"place":"marketplace_${mp.slug}_hero"}`}
                    className={s.ctaPrimary}
                  >
                    Заказать с {mp.name} →
                  </a>
                  <a
                    href="tel:+79772767778"
                    data-ym-goal="phone_click"
                    data-ym-params={`{"place":"marketplace_${mp.slug}_hero"}`}
                    className={s.ctaGhost}
                  >
                    Позвонить
                  </a>
                </div>
              </div>

              <div className={s.factCard}>
                <div className={s.factLabel}>Что важно знать</div>
                <div className={s.factList}>
                  <div className={s.factRow}>
                    <span className={s.factKey}>Минимальный заказ</span>
                    <span className={s.factVal}>{mp.minOrder.split('—')[0]?.trim() || mp.minOrder}</span>
                  </div>
                  <div className={s.factRow}>
                    <span className={s.factKey}>Срок доставки</span>
                    <span className={s.factVal}>15-25 дней (авто)</span>
                  </div>
                  <div className={s.factRow}>
                    <span className={s.factKey}>Тариф</span>
                    <span className={s.factVal}>от 350 ₽/кг</span>
                  </div>
                  <div className={s.factRow}>
                    <span className={s.factKey}>Комиссия выкупа</span>
                    <span className={`${s.factVal} ${s.factValAccent}`}>0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.narrow}>
            <h2 className={s.h2}>Что такое {mp.name} ({mp.chineseName})</h2>
            <p className={s.intro}>{mp.intro}</p>
          </div>
        </section>

        <section className={s.sectionAlt}>
          <div className={s.container}>
            <h2 className={s.h2Center}>Что заказывают с {mp.name}</h2>
            <p className={s.subHint}>Популярные категории среди наших клиентов</p>
            <div className={s.catGrid}>
              {mp.categories.map((c, i) => (
                <div key={i} className={s.catCard}>
                  <div className={s.catEmoji}>{c.emoji}</div>
                  <h3 className={s.catTitle}>{c.name}</h3>
                  {c.note && <p className={s.catNote}>{c.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.mid}>
            <h2 className={s.h2Center} style={{ marginBottom: 40 }}>Почему {mp.name} через TaoPost</h2>
            <div className={s.whyList}>
              {mp.whyTaopost.map((w, i) => (
                <div key={i} className={s.whyItem}>
                  <span className={s.whyNum}>{i + 1}</span>
                  <span className={s.whyText}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={s.sectionSteps}>
          <div className={s.wide}>
            <h2 className={s.h2Steps}>Как заказать с {mp.name}</h2>
            <p className={s.subHint}>Пошаговый процесс — от поиска товара до получения в России</p>
            <div className={s.stepsGrid}>
              {mp.steps.map((step, i) => (
                <div key={i} className={s.stepCard}>
                  <div className={s.stepNum}>{i + 1}</div>
                  <h3 className={s.stepTitle}>{step.title}</h3>
                  <p className={s.stepText}>{step.text}</p>
                </div>
              ))}
            </div>

            <div className={s.priceNote}>
              <div className={s.priceNoteLabel}>Как считается итог</div>
              <div className={s.priceNoteText}>{mp.priceNote}</div>
              <div className={s.priceNoteMin}>{mp.minOrder}</div>
            </div>
          </div>
        </section>

        {calculator}

        <section className={s.sectionCtaMid}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 className={s.h2CtaMid}>Готовы заказать с {mp.name}?</h2>
            <p className={s.subHintCtaMid}>
              Менеджер посчитает стоимость и оформит заявку — ответ в среднем за 5 минут
            </p>
            <div className={s.ctaMidRow}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_mid"}`}
                className={s.ctaMidPrimary}
              >
                Написать в Telegram →
              </a>
              <Link href="/#calculator" className={s.ctaMidGhost}>
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </section>

        <section className={s.sectionAlt}>
          <div className={s.narrow}>
            <h2 className={s.faqH2}>Частые вопросы о {mp.name}</h2>
            {mp.faq.map((item, i) => (
              <details key={i} className={s.faqItem}>
                <summary className={s.faqSummary}>{item.q}</summary>
                <p className={s.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wide}>
            <h2 className={s.h2Steps} style={{ marginBottom: 8 }}>Доставка с {mp.name} по городам</h2>
            <p className={s.subHintCities}>Сроки и тарифы для популярных городов</p>
            <div className={s.citiesGrid}>
              {popularCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  data-ym-goal="city_card_click"
                  data-ym-params={`{"slug":"${c.slug}","place":"marketplace_${mp.slug}"}`}
                  className={s.cityCard}
                >
                  <span>Доставка {c.nameIn}</span>
                  <span className={s.cityArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {linkedArticles.length > 0 && (
          <section className={s.sectionArticles}>
            <div className={s.wide}>
              <h2 className={s.h2Articles}>Полезные статьи о {mp.name}</h2>
              <div className={s.artGrid}>
                {linkedArticles.map((a) => a && (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    data-ym-goal="blog_card_click"
                    data-ym-params={`{"slug":"${a.slug}","place":"marketplace_${mp.slug}"}`}
                    className={s.artCard}
                  >
                    <span
                      className={s.artBadge}
                      style={{ background: `${a.categoryColor}18`, color: a.categoryColor }}
                    >
                      {a.category}
                    </span>
                    <div className={s.artTitle}>{a.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.sectionOtherMp}>
          <div className={s.wide}>
            <h2 className={s.h2Articles} style={{ textAlign: 'center' }}>Другие маркетплейсы</h2>
            <div className={s.mpGrid}>
              {otherMarketplaces.map((m) => (
                <Link key={m.slug} href={`/${m.slug}`} className={s.mpItem}>
                  <span className={s.mpLogo} style={{ background: m.logoBg }}>
                    <Image src={m.logo} alt={m.name} width={32} height={32} style={{ objectFit: 'cover' }} />
                  </span>
                  <span>{m.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={s.sectionCtaFinal}>
          <div className={s.ctaFinalNarrow}>
            <h2 className={s.h2CtaFinal}>Заказать с {mp.name}</h2>
            <p className={s.subHintCtaFinal}>
              Менеджер свяжется в течение 5 минут — посчитаем стоимость, поможем с поиском товара и оформим заказ
            </p>
            <div className={s.ctaFinalRow}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_final"}`}
                className={s.ctaFinalPrimary}
              >
                Начать заказ →
              </a>
              <a
                href="tel:+79772767778"
                data-ym-goal="phone_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_final"}`}
                className={s.ctaFinalGhost}
              >
                Позвонить
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
