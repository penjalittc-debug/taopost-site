import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import { Marketplace, MARKETPLACES } from '@/lib/marketplaces';
import { CITIES } from '@/lib/cities';
import { articles } from '@/lib/blog';

type Props = { mp: Marketplace };

export default function MarketplaceLanding({ mp }: Props) {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Header />
      <main>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '120px 24px 70px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <nav aria-label="breadcrumb" style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Главная</Link>
              <span>›</span>
              <span style={{ color: '#374151' }}>{mp.name}</span>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '48px', alignItems: 'center' }} className="mp-hero-layout">
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: '#fff',
                  border: `1px solid ${mp.color}30`,
                  borderRadius: '50px',
                  padding: '6px 14px 6px 6px',
                  fontSize: '13px', fontWeight: 700,
                  marginBottom: '20px',
                }}>
                  <span style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: mp.logoBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    <Image src={mp.logo} alt={mp.name} width={26} height={26} style={{ objectFit: 'cover' }} />
                  </span>
                  <span style={{ color: mp.color }}>{mp.pill}</span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(32px, 5vw, 54px)',
                  fontWeight: 900,
                  color: '#0A0F1C',
                  lineHeight: 1.1,
                  letterSpacing: '-1.2px',
                  marginBottom: '20px',
                }}>
                  {mp.h1}
                </h1>
                <p style={{
                  fontSize: '18px',
                  color: '#4B5563',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                  maxWidth: '600px',
                }}>
                  {mp.hSubtitle}
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://t.me/taopostsupport?start=site"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ym-goal="telegram_click"
                    data-ym-params={`{"place":"marketplace_${mp.slug}_hero"}`}
                    style={{
                      padding: '16px 28px',
                      background: '#FF5A47',
                      color: '#fff',
                      fontWeight: 800, fontSize: '16px',
                      borderRadius: '14px', textDecoration: 'none',
                      boxShadow: '0 12px 30px -10px rgba(255,90,71,0.55)',
                    }}
                  >
                    Заказать с {mp.name} →
                  </a>
                  <a
                    href="tel:+79772767778"
                    data-ym-goal="phone_click"
                    data-ym-params={`{"place":"marketplace_${mp.slug}_hero"}`}
                    style={{
                      padding: '16px 28px',
                      background: '#fff',
                      color: '#0A0F1C',
                      fontWeight: 700, fontSize: '16px',
                      borderRadius: '14px', textDecoration: 'none',
                      border: '1.5px solid #E5E7EB',
                    }}
                  >
                    Позвонить
                  </a>
                </div>
              </div>

              <div style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(10,15,28,0.05)',
                boxShadow: '0 24px 60px -20px rgba(10,15,28,0.12)',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', marginBottom: '20px' }}>
                  Что важно знать
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Минимальный заказ</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', textAlign: 'right', maxWidth: '60%' }}>
                      {mp.minOrder.split('—')[0]?.trim() || mp.minOrder}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Срок доставки</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>15-25 дней (авто)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Тариф</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>от 350 ₽/кг</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Комиссия выкупа</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#005C43' }}>0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section style={{ padding: '70px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 900, color: '#111827',
              marginBottom: '20px', lineHeight: 1.25,
            }}>
              Что такое {mp.name} ({mp.chineseName})
            </h2>
            <p style={{
              fontSize: '17px', color: '#374151',
              lineHeight: 1.8, marginBottom: 0,
            }}>
              {mp.intro}
            </p>
          </div>
        </section>

        {/* Categories */}
        <section style={{ padding: '70px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Что заказывают с {mp.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
              Популярные категории среди наших клиентов
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}>
              {mp.categories.map((c, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{c.emoji}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    {c.name}
                  </h3>
                  {c.note && (
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                      {c.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why TaoPost */}
        <section style={{ padding: '70px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '40px',
            }}>
              Почему {mp.name} через TaoPost
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mp.whyTaopost.map((w, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '20px 24px',
                  background: '#F9FAFB',
                  borderRadius: '14px',
                  border: '1px solid #F3F4F6',
                }}>
                  <span style={{
                    minWidth: '28px', height: '28px',
                    background: mp.color,
                    color: 'white', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '16px', color: '#111827', lineHeight: 1.6 }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ padding: '80px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Как заказать с {mp.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '16px', marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px' }}>
              Пошаговый процесс — от поиска товара до получения в России
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {mp.steps.map((s, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: mp.color, color: 'white',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, marginBottom: '14px',
                  }}>{i + 1}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Price note */}
            <div style={{
              marginTop: '36px',
              padding: '24px',
              background: '#fff',
              borderRadius: '14px',
              border: `2px solid ${mp.color}22`,
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Как считается итог
              </div>
              <div style={{ fontSize: '16px', color: '#111827', lineHeight: 1.6 }}>
                {mp.priceNote}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
                {mp.minOrder}
              </div>
            </div>
          </div>
        </section>

        {/* CTA mid */}
        <section style={{
          padding: '60px 24px',
          background: '#fff',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#111827', marginBottom: '12px' }}>
              Готовы заказать с {mp.name}?
            </h2>
            <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '24px', lineHeight: 1.6 }}>
              Менеджер посчитает стоимость и оформит заявку — ответ в среднем за 5 минут
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_mid"}`}
                style={{
                  padding: '14px 28px',
                  background: '#005C43', color: '#fff',
                  fontWeight: 800, fontSize: '15px',
                  borderRadius: '12px', textDecoration: 'none',
                }}
              >
                Написать в Telegram →
              </a>
              <Link
                href="/#calculator"
                style={{
                  padding: '14px 28px',
                  background: '#fff', color: '#0A0F1C',
                  fontWeight: 700, fontSize: '15px',
                  borderRadius: '12px', textDecoration: 'none',
                  border: '1.5px solid #E5E7EB',
                }}
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '70px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '32px',
            }}>
              Частые вопросы о {mp.name}
            </h2>
            {mp.faq.map((item, i) => (
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

        {/* Cities */}
        <section style={{ padding: '70px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '8px',
            }}>
              Доставка с {mp.name} по городам
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '15px', marginBottom: '32px' }}>
              Сроки и тарифы для популярных городов
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '10px',
            }}>
              {popularCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  data-ym-goal="city_card_click"
                  data-ym-params={`{"slug":"${c.slug}","place":"marketplace_${mp.slug}"}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#F9FAFB',
                    borderRadius: '10px',
                    color: '#111827',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <span>Доставка {c.nameIn}</span>
                  <span style={{ color: mp.color, fontSize: '13px' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        {linkedArticles.length > 0 && (
          <section style={{ padding: '60px 24px', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 900, color: '#111827',
                marginBottom: '24px',
              }}>
                Полезные статьи о {mp.name}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}>
                {linkedArticles.map((a) => a && (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    data-ym-goal="blog_card_click"
                    data-ym-params={`{"slug":"${a.slug}","place":"marketplace_${mp.slug}"}`}
                    style={{
                      display: 'block', padding: '20px',
                      background: '#fff', borderRadius: '14px',
                      border: '1px solid #E5E7EB',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{
                      display: 'inline-block', marginBottom: '10px',
                      background: a.categoryColor + '18', color: a.categoryColor,
                      fontWeight: 700, fontSize: '11px',
                      padding: '3px 10px', borderRadius: '50px',
                    }}>
                      {a.category}
                    </span>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', lineHeight: 1.4 }}>
                      {a.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other marketplaces */}
        <section style={{ padding: '60px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 900, color: '#111827',
              marginBottom: '24px', textAlign: 'center',
            }}>
              Другие маркетплейсы
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '14px',
            }}>
              {otherMarketplaces.map((m) => (
                <Link
                  key={m.slug}
                  href={`/${m.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '16px 18px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    color: '#111827',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: m.logoBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    <Image src={m.logo} alt={m.name} width={32} height={32} style={{ objectFit: 'cover' }} />
                  </span>
                  <span>{m.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Заказать с {mp.name}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>
              Менеджер свяжется в течение 5 минут — посчитаем стоимость, поможем с поиском товара и оформим заказ
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                data-ym-goal="telegram_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_final"}`}
                style={{
                  padding: '16px 36px',
                  background: '#fff', color: '#005C43',
                  fontWeight: 800, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                }}
              >
                Начать заказ →
              </a>
              <a
                href="tel:+79772767778"
                data-ym-goal="phone_click"
                data-ym-params={`{"place":"marketplace_${mp.slug}_final"}`}
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                Позвонить
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 880px) {
          .mp-hero-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
