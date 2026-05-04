import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CITIES } from '@/lib/cities';

export const metadata: Metadata = {
  title: 'Как заказать из Китая — Инструкции и видео | TaoPost',
  description: 'Пошаговые инструкции как заказать товары из Китая через TaoPost. Видео-гайды по Taobao, Poizon, Pinduoduo, 1688. Бесплатные обучающие материалы.',
  keywords: 'как заказать с taobao, как купить с poizon, как пользоваться pinduoduo, инструкция заказ из китая, видео как заказать из китая, обучение карго',
  alternates: {
    canonical: 'https://taopost.ru/kak-zakazat-iz-kitaya',
  },
};

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
    videoUrl: null,
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
    videoUrl: null,
  },
  {
    id: 3,
    platform: 'Pinduoduo',
    color: '#e4003a',
    logo: '/mp/pinduoduo.jpg',
    logoBg: '#e4003a',
    title: 'Как заказать с Pinduoduo',
    description: 'Самые низкие цены на китайские товары — одежда, электроника, аксессуары',
    steps: ['Найдите товар на Pinduoduo', 'Скопируйте ссылку', 'Создайте заказ в TaoPost', 'Получите товар в вашем городе'],
    videoUrl: null,
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
    videoUrl: null,
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
    videoUrl: null,
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
    videoUrl: null,
  },
];

const MATERIALS = [
  { emoji: '📋', title: 'Памятка новичка', desc: 'Всё что нужно знать перед первым заказом из Китая', tag: 'PDF' },
  { emoji: '📦', title: 'Что можно везти из Китая', desc: 'Список запрещённых и разрешённых товаров для ввоза в Россию', tag: 'Статья' },
  { emoji: '⚖️', title: 'Нормы беспошлинного ввоза', desc: 'Лимиты на 2026 год — вес, стоимость, количество посылок', tag: 'PDF' },
  { emoji: '💰', title: 'Как сэкономить на доставке', desc: 'Советы по консолидации, выбору маршрута и упаковке', tag: 'Статья' },
];

export default function GuidePage() {
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
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              📚 Обучающие материалы
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}>
              Как заказать товары<br />
              <span style={{ color: '#1B9E7E' }}>из Китая</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto 40px',
            }}>
              Видео-инструкции, пошаговые гайды и полезные материалы для тех,
              кто заказывает из Китая впервые и для опытных покупателей
            </p>
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
              Начать первый заказ →
            </a>
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
              Инструкции по маркетплейсам
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '17px', marginBottom: '56px' }}>
              Пошаговые гайды как заказать с каждого китайского маркетплейса
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {GUIDES.map((guide) => (
                <article key={guide.id} style={{
                  background: '#F9FAFB',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid #F3F4F6',
                  transition: 'box-shadow 0.2s',
                }}>
                  {/* Platform badge */}
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

                  {/* Video placeholder */}
                  <div style={{
                    background: '#111827',
                    borderRadius: '12px',
                    height: '160px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <div style={{
                        width: '52px', height: '52px',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 8px',
                        fontSize: '20px',
                      }}>▶</div>
                      <div style={{ fontSize: '13px', opacity: 0.6 }}>Видео скоро появится</div>
                    </div>
                  </div>

                  {/* Steps */}
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

        {/* Materials */}
        <section style={{ padding: '80px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Полезные материалы
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '17px', marginBottom: '48px' }}>
              Всё что нужно знать о доставке из Китая в Россию
            </p>

            <div className="materials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {MATERIALS.map((mat, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  border: '1px solid #E5E7EB',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{mat.emoji}</div>
                  <div style={{
                    display: 'inline-block',
                    background: '#e8f7f3', color: '#1B9E7E',
                    fontSize: '11px', fontWeight: 700,
                    padding: '2px 10px', borderRadius: '50px',
                    marginBottom: '10px',
                  }}>{mat.tag}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                    {mat.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginBottom: '16px' }}>
                    {mat.desc}
                  </p>
                  <div style={{
                    fontSize: '13px', fontWeight: 700, color: '#1B9E7E',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    Скоро →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '12px',
            }}>
              Доставка из Китая по городам России
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '17px', marginBottom: '40px', maxWidth: '620px', margin: '0 auto 40px' }}>
              Сроки, цены и пункты выдачи для вашего города
            </p>
            <div className="cities-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '12px',
            }}>
              {CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    color: '#111827',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <span>{c.name}</span>
                  <span style={{ color: '#1B9E7E', fontSize: '13px', fontWeight: 700 }}>→</span>
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
              Готовы сделать первый заказ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.6 }}>
              Наши менеджеры помогут с любым вопросом — от выбора товара до получения посылки
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
                Написать в Telegram
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .materials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .materials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
