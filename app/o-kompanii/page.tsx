import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import WarehouseGallery from '@/components/WarehouseGallery';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import s from './o-kompanii.module.css';

export const metadata: Metadata = {
  title: 'О компании TaoPost — официальная карго-доставка из Китая',
  description: 'TaoPost — китайское юр.лицо с бизнес-лицензией КНР. Свой склад в Гуанчжоу, 200 000+ посылок с 2019 года. Команда на двух языках, легальные операции.',
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

const aboutPageLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://taopost.ru/o-kompanii#aboutpage',
  url: 'https://taopost.ru/o-kompanii',
  name: 'О компании TaoPost',
  description: 'История TaoPost с 2019 года: собственный склад в Гуанчжоу, бизнес-лицензия КНР с 2025 года, 200 000+ доставленных посылок.',
  mainEntity: { '@id': 'https://taopost.ru/#organization' },
  inLanguage: 'ru-RU',
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://taopost.ru/#organization',
  name: 'TaoPost',
  legalName: 'Guangzhou Yashiming Import & Export Co., Ltd. (广州亚世名进出口有限公司)',
  url: 'https://taopost.ru',
  logo: 'https://taopost.ru/logo.png',
  image: 'https://taopost.ru/og-image.png',
  description: 'Карго доставка из Китая в Россию. Бренд работает с 2019 года; юр.лицо в КНР зарегистрировано в апреле 2025 года. Представитель в РФ — ООО «АЗИЗОВ ГРУПП».',
  telephone: '+7 977 276 77 78',
  email: 'info@taopost.ru',
  foundingDate: '2019',
  taxID: '91440100MAEGJX2C1Y',
  identifier: [
    { '@type': 'PropertyValue', name: 'CN Unified Social Credit Code', value: '91440100MAEGJX2C1Y' },
    { '@type': 'PropertyValue', name: 'RU Legal Entity INN', value: '9721235929' },
    { '@type': 'PropertyValue', name: 'RU Legal Entity OGRN', value: '1247700473921' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Чжаньцянь, 90',
    addressLocality: 'Гуанчжоу',
    addressRegion: 'Ливань',
    addressCountry: 'CN',
  },
};

const TIMELINE = [
  { year: '2019', title: 'Старт бренда', text: 'Первые отправки между Гуанчжоу и Москвой. Команда из 3 человек, работа как ИП/партнёрство.' },
  { year: '2021', title: 'Свой склад в Гуанчжоу', text: 'Открыли собственный склад приёмки и упаковки в районе Ливань.' },
  { year: '2023', title: 'Авиа-маршрут', text: 'Запустили авиа-доставку Пекин → Москва за 3-5 дней.' },
  { year: '2025', title: 'Регистрация юр.лица КНР', text: 'Оформили официальную бизнес-лицензию (营业执照) в Гуанчжоу — все операции идут через китайское юр.лицо. В РФ работает представитель ООО «АЗИЗОВ ГРУПП».' },
  { year: '2026', title: '200 000+ посылок', text: 'Более 200 тысяч успешных отправок, география — 85+ городов России и Беларуси.' },
];

export default function OKompaniiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }} />
      <Header />
      <main>
        <PageHero
          currentCrumb="О компании"
          pill="🇨🇳 Юр.лицо в КНР · Лицензия 营业执照"
          title={<>О компании <span style={{ color: '#005C43' }}>TaoPost</span></>}
          lede="Официальная карго-компания с китайской бизнес-лицензией, собственным складом в Гуанчжоу и командой на двух языках. Доставляем товары из Китая в Россию с 2019 года."
        />

        <About />

        <section className={s.timeline}>
          <div className={s.timelineInner}>
            <h2 className={s.timelineH2}>Как мы росли</h2>
            <div className={s.timelineList}>
              {TIMELINE.map((item, i) => (
                <div key={i} className={s.timelineItem}>
                  <span className={s.timelineDot} />
                  <div className={s.timelineYear}>{item.year}</div>
                  <h3 className={s.timelineTitle}>{item.title}</h3>
                  <p className={s.timelineText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WarehouseGallery />
        <Reviews />

        <PageCta
          title="Начать работу"
          lede="Напишите менеджеру — расскажем больше, ответим на вопросы и поможем оформить первую отправку"
          actions={[
            {
              label: 'Написать в Telegram →',
              href: 'https://t.me/taopostsupport?start=site',
              external: true,
              ymGoal: 'telegram_click',
              ymParams: '{"place":"o_kompanii_cta"}',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
