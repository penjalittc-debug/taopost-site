import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import PageHero from '@/components/PageHero';
import { Phone, Mail, Send, MessageCircle, MapPin, Clock, Building2 } from 'lucide-react';
import s from './kontakty.module.css';

export const metadata: Metadata = {
  title: 'Контакты TaoPost — телефон, Telegram, email, склад в Китае',
  description: 'Связаться с TaoPost: +7 977 276 77 78, Telegram @Taopostchat_official, support@taopost.ru. Склад в Гуанчжоу — 广州亚世名进出口有限公司. Поддержка 9:00-22:00 МСК.',
  alternates: { canonical: 'https://taopost.ru/kontakty' },
  openGraph: {
    title: 'Контакты TaoPost',
    description: 'Телефон +7 977 276 77 78, Telegram @Taopostchat_official, склад в Гуанчжоу.',
    url: 'https://taopost.ru/kontakty',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'Контакты TaoPost' }],
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Контакты', item: 'https://taopost.ru/kontakty' },
  ],
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://taopost.ru/#organization',
  name: 'TaoPost',
  legalName: 'Guangzhou Yashiming Import & Export Co., Ltd. (广州亚世名进出口有限公司)',
  url: 'https://taopost.ru',
  telephone: '+7 977 276 77 78',
  email: 'support@taopost.ru',
  taxID: '91440100MAEGJX2C1Y',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Чжаньцянь, 90',
    addressLocality: 'Гуанчжоу',
    addressRegion: 'Ливань',
    addressCountry: 'CN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+7 977 276 77 78',
      contactType: 'customer service',
      areaServed: 'RU',
      availableLanguage: ['Russian', 'Chinese'],
      hoursAvailable: 'Mo-Su 09:00-22:00',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+86 185 2070 7778',
      contactType: 'warehouse',
      areaServed: 'CN',
      availableLanguage: ['Chinese', 'Russian'],
    },
  ],
};

type Channel = {
  Icon: typeof Phone;
  title: string;
  value: string;
  href: string;
  note: string;
  goal: string;
  external?: boolean;
};

const CHANNELS: Channel[] = [
  { Icon: Send, title: 'Telegram (главный)', value: '@Taopostchat_official', href: 'https://t.me/Taopostchat_official', note: 'Ответ в среднем за 5 минут · 9:00-22:00 МСК', goal: 'telegram_click', external: true },
  { Icon: Phone, title: 'Телефон', value: '+7 977 276 77 78', href: 'tel:+79772767778', note: 'Звонки в рабочее время', goal: 'phone_click' },
  { Icon: Mail, title: 'Email', value: 'support@taopost.ru', href: 'mailto:support@taopost.ru', note: 'Сотрудничество, обращения и спорные вопросы', goal: 'email_click' },
  { Icon: MessageCircle, title: 'Telegram-канал', value: '@taopost', href: 'https://t.me/taopost', note: 'Новости, акции, выгрузка склада', goal: 'channel_click', external: true },
];

const CHINA_CONTACTS = [
  { label: 'Офис в Китае', value: '+86 185 2070 7778', href: 'tel:+8618520707778' },
  { label: 'Для курьеров (приёмка)', value: '+86 183 0200 4584', href: 'tel:+8618302004584' },
];

export default function KontaktyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Header />
      <main>
        <PageHero
          currentCrumb="Контакты"
          title={<>Контакты <span style={{ color: '#005C43' }}>TaoPost</span></>}
          lede="Напишите менеджеру — ответим в среднем за 5 минут, ежедневно с 9:00 до 22:00 МСК. Telegram, телефон, email и форма заявки ниже."
        />

        <section className={s.channels}>
          <div className={s.channelsInner}>
            <div className={s.channelsGrid}>
              {CHANNELS.map((c, i) => {
                const Icon = c.Icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-ym-goal={c.goal}
                    data-ym-params='{"place":"kontakty_page"}'
                    className={s.channelCard}
                  >
                    <div className={s.channelIcon}>
                      <Icon size={22} strokeWidth={2.2} />
                    </div>
                    <div className={s.channelTitle}>{c.title}</div>
                    <div className={s.channelValue}>{c.value}</div>
                    <div className={s.channelNote}>{c.note}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className={s.info}>
          <div className={s.infoGrid}>
            <div className={s.infoCard}>
              <div
                className={s.infoIcon}
                style={{ ['--ch-bg' as string]: '#FFEEEC', ['--ch-color' as string]: '#FF5A47' } as React.CSSProperties}
              >
                <Clock size={22} strokeWidth={2.2} />
              </div>
              <h3 className={s.infoTitle}>Часы работы</h3>
              <div className={s.infoBody}>
                <strong>Поддержка в Telegram:</strong> ежедневно 9:00-22:00 МСК<br />
                <strong>Телефон:</strong> пн-пт 10:00-19:00 МСК<br />
                <strong>Склад в Китае:</strong> пн-сб 9:00-18:00 (UTC+8)
              </div>
            </div>

            <div className={s.infoCard}>
              <div
                className={s.infoIcon}
                style={{ ['--ch-bg' as string]: '#FFF7E8', ['--ch-color' as string]: '#F59E0B' } as React.CSSProperties}
              >
                <MapPin size={22} strokeWidth={2.2} />
              </div>
              <h3 className={s.infoTitle}>Склад в Гуанчжоу 🇨🇳</h3>
              <div className={s.infoBody}>
                广州市荔湾区站前路90号<br />
                <span className={s.infoSubtle}>Гуанчжоу, район Ливань, ул. Чжаньцянь, 90</span>
                <div className={s.infoDivider}>
                  {CHINA_CONTACTS.map((cc, i) => (
                    <div key={i} className={s.infoContactRow}>
                      <span style={{ color: '#6B7280' }}>{cc.label}: </span>
                      <a href={cc.href}>{cc.value}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.infoCard}>
              <div
                className={s.infoIcon}
                style={{ ['--ch-bg' as string]: '#e8f7f3', ['--ch-color' as string]: '#005C43' } as React.CSSProperties}
              >
                <Building2 size={22} strokeWidth={2.2} />
              </div>
              <h3 className={s.infoTitle}>Юр.лицо в КНР</h3>
              <div className={s.infoBody}>
                <strong>广州亚世名进出口有限公司</strong><br />
                <span className={s.infoTiny}>Guangzhou Yashiming Import &amp; Export Co., Ltd.</span>
                <div style={{ marginTop: 12 }} className={s.infoTiny}>
                  Регистрационный код:<br />
                  <span className={s.infoMono}>91440100MAEGJX2C1Y</span>
                </div>
                <a
                  href="https://www.gsxt.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.infoLinkRow}
                >
                  Проверить в реестре КНР →
                </a>
              </div>
            </div>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
