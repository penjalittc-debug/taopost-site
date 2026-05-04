import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CITIES, getCityBySlug } from '@/lib/cities';

type Params = { gorod: string };

export function generateStaticParams() {
  return CITIES.map((c) => ({ gorod: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { gorod } = await params;
  const city = getCityBySlug(gorod);
  if (!city) return {};
  return {
    title: `Как заказать из Китая ${city.nameIn} — доставка с Taobao, Poizon, 1688 | TaoPost`,
    description: `Пошаговая инструкция как заказать товары из Китая ${city.nameIn}. Доставка с Taobao, Poizon, Pinduoduo, 1688 ${city.nameIn} — ${city.deliveryDays}. Выкуп, проверка, страховка.`,
    keywords: `как заказать из китая ${city.name.toLowerCase()}, доставка из китая ${city.nameIn.toLowerCase()}, taobao ${city.name.toLowerCase()}, poizon ${city.name.toLowerCase()}, карго ${city.name.toLowerCase()}, выкуп товаров китай ${city.name.toLowerCase()}`,
    alternates: {
      canonical: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}`,
    },
    openGraph: {
      title: `Как заказать из Китая ${city.nameIn} — TaoPost`,
      description: `Доставка ${city.nameIn} за ${city.deliveryDays}. Выкуп с Taobao, Poizon, 1688, Pinduoduo.`,
      url: `https://taopost.ru/kak-zakazat-iz-kitaya/${city.slug}`,
    },
  };
}

const GUIDES = [
  {
    id: 1,
    platform: 'Taobao',
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

  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              📦 Доставка {city.nameIn}
            </div>
            <h1 style={{
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}>
              Как заказать из Китая<br />
              <span style={{ color: '#1B9E7E' }}>{city.nameIn}</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              lineHeight: 1.7,
              maxWidth: '620px',
              margin: '0 auto 32px',
            }}>
              Выкуп и доставка товаров с Taobao, Poizon, 1688, Pinduoduo {city.nameIn} —
              срок {city.deliveryDays} (авто) или {city.deliveryDaysAvia} (авиа).
              Полное сопровождение, страховка и проверка качества.
            </p>

            {/* Quick stats */}
            <div className="city-stats" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
              maxWidth: '640px', margin: '0 auto 36px',
            }}>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '18px 12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#1B9E7E', marginBottom: '4px' }}>
                  {city.deliveryDays}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Авто-доставка</div>
              </div>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '18px 12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#1B9E7E', marginBottom: '4px' }}>
                  240 ₽/кг
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Цена за кг</div>
              </div>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '18px 12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#1B9E7E', marginBottom: '4px' }}>
                  0%
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Комиссия выкупа</div>
              </div>
            </div>

            <a
              href="https://t.me/taopostmaneger?start=site"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
                color: 'white', fontWeight: 800, fontSize: '16px',
                borderRadius: '50px', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(27,158,126,0.35)',
              }}
            >
              Заказать {city.nameIn} →
            </a>
          </div>
        </section>

        {/* How it works in this city */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Как работает доставка {city.nameIn}
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '17px', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
              4 простых шага — от заказа в Китае до получения {city.nameLocative}
            </p>

            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[
                { n: 1, t: 'Заказ', d: 'Отправляете ссылки на товары в личном кабинете или менеджеру' },
                { n: 2, t: 'Выкуп', d: 'Мы выкупаем товар у продавца в Китае без комиссии за выкуп' },
                { n: 3, t: 'Склад', d: 'Товар приходит на наш склад в Гуанчжоу — проверка, фото, упаковка' },
                { n: 4, t: 'Доставка', d: `Отправка ${city.nameIn} — авто (${city.deliveryDays}) или авиа (${city.deliveryDaysAvia})` },
              ].map((s) => (
                <div key={s.n} style={{
                  background: '#F9FAFB', borderRadius: '16px', padding: '24px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: '#1B9E7E', color: 'white',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, marginBottom: '12px',
                  }}>{s.n}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    {s.t}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery info card */}
        <section style={{ padding: '60px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '40px',
              border: '1px solid #E5E7EB',
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '24px' }}>
                Доставка {city.nameIn} — условия
              </h2>
              <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>Срок (авто)</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827' }}>{city.deliveryDays}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>Срок (авиа)</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827' }}>{city.deliveryDaysAvia}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>Тариф авто</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827' }}>от 240 ₽/кг</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>Тариф авиа</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827' }}>от 6 $/кг</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>Получение {city.nameLocative}</div>
                  <div style={{ fontSize: '15px', color: '#111827', lineHeight: 1.6 }}>{city.pvz}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides by platform */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Откуда заказывать {city.nameIn}
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '17px', marginBottom: '56px' }}>
              Поддерживаем все популярные китайские маркетплейсы
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {GUIDES.map((guide) => (
                <article key={guide.id} style={{
                  background: '#F9FAFB',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '44px', height: '44px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: guide.logoBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}>
                      <Image
                        src={guide.logo}
                        alt={guide.platform}
                        width={44}
                        height={44}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <span style={{
                      background: guide.color + '15',
                      color: guide.color,
                      fontWeight: 800, fontSize: '13px',
                      padding: '4px 12px', borderRadius: '50px',
                      border: `1px solid ${guide.color}30`,
                    }}>{guide.platform}</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '20px' }}>
                    {guide.description}
                  </p>

                  <ol style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                    {guide.steps.map((step, i) => (
                      <li key={i} style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        marginBottom: '10px', fontSize: '14px', color: '#374151',
                      }}>
                        <span style={{
                          minWidth: '24px', height: '24px',
                          background: guide.color,
                          color: 'white', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: 800, flexShrink: 0,
                        }}>{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '40px',
            }}>
              Частые вопросы о доставке {city.nameIn}
            </h2>

            {[
              {
                q: `Сколько идёт посылка из Китая ${city.nameIn}?`,
                a: `Авто-доставка занимает ${city.deliveryDays} с момента отправки нашим складом. Авиа — ${city.deliveryDaysAvia}. К этому добавьте 1–3 дня на выкуп товара продавцом и приёмку на нашем складе в Гуанчжоу.`,
              },
              {
                q: `Сколько стоит доставка из Китая ${city.nameIn}?`,
                a: `Авто-тариф — от 240 ₽/кг. Авиа — от 6 $/кг. Минимальный вес посылки 0,5 кг. Стоимость доставки до пункта выдачи ${city.nameLocative} рассчитывается отдельно (СДЭК/Boxberry).`,
              },
              {
                q: `Как получить посылку ${city.nameLocative}?`,
                a: city.pvz + '. Также возможна курьерская доставка до двери — оформляется при создании заказа.',
              },
              {
                q: 'Берёте ли вы комиссию за выкуп?',
                a: 'Нет, выкуп товара в Китае мы делаем без комиссии. Вы платите только стоимость самого товара продавцу и доставку до России.',
              },
              {
                q: 'Что если товар придёт бракованным?',
                a: 'Мы делаем фото каждой посылки на складе в Китае перед отправкой. Если вы заметите брак до отправки — вернём продавцу и вернём вам деньги. Также есть страховка груза.',
              },
              {
                q: `Можно ли заказать опт ${city.nameIn} с 1688?`,
                a: 'Да, через 1688 — это основная B2B-площадка Китая. Оформляем оптовые партии напрямую от производителей с минимальным заказом.',
              },
            ].map((item, i) => (
              <details key={i} style={{
                background: '#fff', borderRadius: '14px',
                padding: '20px 24px', marginBottom: '12px',
                border: '1px solid #E5E7EB', cursor: 'pointer',
              }}>
                <summary style={{
                  fontSize: '16px', fontWeight: 700, color: '#111827',
                  listStyle: 'none', cursor: 'pointer',
                }}>
                  {item.q}
                </summary>
                <p style={{
                  fontSize: '15px', color: '#6B7280', lineHeight: 1.7,
                  marginTop: '12px', marginBottom: 0,
                }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Other cities */}
        <section style={{ padding: '60px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '32px',
            }}>
              Доставка из Китая в другие города
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '8px',
            }}>
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  style={{
                    padding: '12px 16px',
                    background: '#F9FAFB',
                    borderRadius: '10px',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid #F3F4F6',
                    textAlign: 'center',
                  }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #1B9E7E 0%, #0D7A5F 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Заказать из Китая {city.nameIn}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.6 }}>
              Менеджер ответит за 5 минут — поможет с выбором товара, оформлением и доставкой
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/taopostmaneger?start=site"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 36px',
                  background: '#fff', color: '#1B9E7E',
                  fontWeight: 800, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                }}
              >
                Начать заказ →
              </a>
              <a
                href="https://t.me/taopost"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  borderRadius: '50px', textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                Telegram канал
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .city-stats { grid-template-columns: 1fr !important; max-width: 320px !important; }
        }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
