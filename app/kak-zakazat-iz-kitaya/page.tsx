import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { CITIES } from '@/lib/cities';
import s from './guide.module.css';

export const metadata: Metadata = {
  title: `Как заказать из Китая — Инструкции по Taobao, Poizon, 1688 | TaoPost`,
  description: `Пошаговые инструкции как заказать товары из Китая через TaoPost. Гайды по Taobao, Poizon, Pinduoduo, 1688. Сроки и тарифы для ${CITIES.length} городов России.`,
  alternates: {
    canonical: 'https://taopost.ru/kak-zakazat-iz-kitaya',
  },
  openGraph: {
    title: 'Как заказать из Китая — Инструкции по Taobao, Poizon, 1688',
    description: `Пошаговые гайды по китайским маркетплейсам и сроки доставки по ${CITIES.length} городам России.`,
    url: 'https://taopost.ru/kak-zakazat-iz-kitaya',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'TaoPost — Как заказать из Китая' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Как заказать из Китая — Инструкции TaoPost',
    description: 'Пошаговые гайды по Taobao, Poizon, 1688 и сроки доставки по России.',
    images: ['https://taopost.ru/og-image.png'],
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Как заказать из Китая', item: 'https://taopost.ru/kak-zakazat-iz-kitaya' },
  ],
};

type Guide = {
  id: number;
  platform: string;
  slug: string | null;
  color: string;
  logo: string;
  logoBg: string;
  title: string;
  description: string;
  steps: string[];
};

const GUIDES: Guide[] = [
  {
    id: 1,
    platform: 'Taobao',
    slug: 'taobao',
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
    slug: 'poizon',
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
    slug: 'pinduoduo',
    color: '#e4003a',
    logo: '/mp/pinduoduo.jpg',
    logoBg: '#e4003a',
    title: 'Как заказать с Pinduoduo',
    description: 'Самые низкие цены на китайские товары — одежда, электроника, аксессуары',
    steps: ['Найдите товар на Pinduoduo', 'Скопируйте ссылку', 'Создайте заказ в TaoPost', 'Получите товар в вашем городе'],
  },
  {
    id: 4,
    platform: '1688',
    slug: '1688',
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
    slug: 'tmall',
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
    slug: null,
    color: '#d97706',
    logo: '/mp/gofish.webp',
    logoBg: '#d97706',
    title: 'Как заказать с Goofish (闲鱼)',
    description: 'Выкуп товаров со вторичного рынка Китая — редкие вещи по низким ценам',
    steps: ['Найдите лот на Goofish', 'Скопируйте ссылку', 'Оставьте заявку в TaoPost', 'Менеджер свяжется с продавцом и выкупит'],
  },
];

const MATERIALS = [
  { emoji: '📏', title: 'Размерная сетка китайской одежды', desc: 'Таблицы соответствия китайских и российских размеров с реальными замерами', href: '/blog/razmernaya-setka-kitayskoy-odezhdy' },
  { emoji: '⚖️', title: 'Нормы беспошлинного ввоза 2026', desc: 'Лимиты по весу и стоимости посылок из Китая — что изменилось', href: '/blog/normy-besposhlinogo-vvoza-2026' },
  { emoji: '🚫', title: 'Что нельзя везти из Китая', desc: 'Запрещённые товары для ввоза в Россию — полный актуальный список', href: '/blog/chto-nelzya-vezti-iz-kitaya' },
  { emoji: '🔍', title: 'Как найти товар на Taobao по фото', desc: 'Гайд по поиску по картинке: приложение, расширения, лайфхаки', href: '/blog/kak-nayti-tovar-na-taobao-po-foto' },
];

function GuideCard({ guide }: { guide: Guide }) {
  const vars = { ['--gd-color' as string]: guide.color, ['--gd-bg' as string]: guide.logoBg } as React.CSSProperties;
  const inner = (
    <>
      <div className={s.cardHead}>
        <div className={s.logoBox}>
          <Image src={guide.logo} alt={guide.platform} width={44} height={44} />
        </div>
        <span className={s.platformBadge}>{guide.platform}</span>
      </div>
      <h3 className={s.cardTitle}>{guide.title}</h3>
      <p className={s.cardDesc}>{guide.description}</p>
      <ol className={s.stepsList}>
        {guide.steps.map((step, i) => (
          <li key={i} className={s.stepItem}>
            <span className={s.stepNum}>{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      {guide.slug && <div className={s.cardMore}>Узнать больше →</div>}
    </>
  );

  return guide.slug ? (
    <Link
      href={`/${guide.slug}`}
      data-ym-goal="marketplace_card_click"
      data-ym-params={`{"slug":"${guide.slug}","place":"guide_index"}`}
      className={s.card}
      style={vars}
    >
      {inner}
    </Link>
  ) : (
    <article className={s.card} style={vars}>{inner}</article>
  );
}

export default function GuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main>
        <PageHero
          currentCrumb="Как заказать из Китая"
          pill="📚 Обучающие материалы"
          title={<>Как заказать товары<br /><span className={s.titleAccent}>из Китая</span></>}
          lede={
            <>
              Видео-инструкции, пошаговые гайды и полезные материалы для тех,
              кто заказывает из Китая впервые и для опытных покупателей
              <br />
              <a
                href="https://t.me/Taopostchat_official"
                target="_blank"
                rel="noopener noreferrer"
                className={s.heroCta}
              >
                Начать первый заказ →
              </a>
            </>
          }
        />

        <section className={s.guides}>
          <div className={s.guidesInner}>
            <h2 className={s.h2Big}>Инструкции по маркетплейсам</h2>
            <p className={s.lede}>Пошаговые гайды как заказать с каждого китайского маркетплейса</p>
            <div className={s.grid}>
              {GUIDES.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        <section className={s.materials}>
          <div className={s.materialsInner}>
            <h2 className={s.h2Big}>Полезные материалы</h2>
            <p className={`${s.lede} ${s.ledeWide}`}>Всё что нужно знать о доставке из Китая в Россию</p>
            <div className={s.materialsGrid}>
              {MATERIALS.map((mat, i) => (
                <Link key={i} href={mat.href} className={s.material}>
                  <div className={s.matEmoji}>{mat.emoji}</div>
                  <h3 className={s.matTitle}>{mat.title}</h3>
                  <p className={s.matDesc}>{mat.desc}</p>
                  <div className={s.matMore}>Читать →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={s.cities}>
          <div className={s.citiesInner}>
            <h2 className={s.h2Big}>Доставка из Китая по городам России</h2>
            <p className={s.citiesLede}>Сроки, цены и пункты выдачи для вашего города</p>
            <div className={s.citiesGrid}>
              {CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kak-zakazat-iz-kitaya/${c.slug}`}
                  data-ym-goal="city_card_click"
                  data-ym-params={JSON.stringify({ slug: c.slug, place: 'cities_index' })}
                  className={s.cityCard}
                >
                  <span>{c.name}</span>
                  <span className={s.cityArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PageCta
          title="Готовы сделать первый заказ?"
          lede="Наши менеджеры помогут с любым вопросом — от выбора товара до получения посылки"
          actions={[
            {
              label: 'Начать заказ →',
              href: 'https://t.me/Taopostchat_official',
              external: true,
              ymGoal: 'telegram_click',
              ymParams: '{"place":"guide_index_cta"}',
            },
            {
              label: 'Написать в Telegram',
              href: 'https://t.me/Taopostchat_official',
              variant: 'ghost',
              external: true,
              ymGoal: 'channel_click',
              ymParams: '{"place":"guide_index_cta"}',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
