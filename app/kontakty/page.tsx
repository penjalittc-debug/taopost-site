import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { Phone, Mail, Send, MessageCircle, MapPin, Clock, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Контакты TaoPost — телефон, Telegram, email, склад в Китае',
  description: 'Связаться с TaoPost: +7 977 276 77 78, Telegram @taopostsupport, info@taopost.ru. Склад в Гуанчжоу — 广州亚世名进出口有限公司. Поддержка 9:00-22:00 МСК.',
  keywords: 'taopost контакты, taopost телефон, taopost telegram, taopost email, taopost склад китай гуанчжоу',
  alternates: { canonical: 'https://taopost.ru/kontakty' },
  openGraph: {
    title: 'Контакты TaoPost',
    description: 'Телефон +7 977 276 77 78, Telegram @taopostsupport, склад в Гуанчжоу.',
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
  email: 'info@taopost.ru',
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
  { Icon: Send, title: 'Telegram (главный)', value: '@taopostsupport', href: 'https://t.me/taopostsupport?start=site', note: 'Ответ в среднем за 5 минут · 9:00-22:00 МСК', goal: 'telegram_click', external: true },
  { Icon: Phone, title: 'Телефон', value: '+7 977 276 77 78', href: 'tel:+79772767778', note: 'Звонки в рабочее время', goal: 'phone_click' },
  { Icon: Mail, title: 'Email · сотрудничество', value: 'info@taopost.ru', href: 'mailto:info@taopost.ru', note: 'Для партнёров и бизнеса', goal: 'email_click' },
  { Icon: Mail, title: 'Email · жалобы и спорные вопросы', value: 'help@taopost.ru', href: 'mailto:help@taopost.ru', note: 'Для срочных обращений по заказам', goal: 'email_click' },
  { Icon: MessageCircle, title: 'Telegram-канал', value: '@taopost', href: 'https://t.me/taopostsupport', note: 'Новости, акции, выгрузка склада', goal: 'channel_click', external: true },
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
        <section style={{
          background: 'linear-gradient(160deg, #f0fdf9 0%, #ffffff 60%, #fff5f5 100%)',
          padding: '120px 24px 60px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <nav aria-label="breadcrumb" style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Главная</Link>
              <span>›</span>
              <span style={{ color: '#374151' }}>Контакты</span>
            </nav>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900, color: '#111827',
              lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px',
            }}>
              Контакты <span style={{ color: '#005C43' }}>TaoPost</span>
            </h1>
            <p style={{
              fontSize: '18px', color: '#6B7280',
              lineHeight: 1.7, maxWidth: '600px', margin: '0 auto',
            }}>
              Напишите менеджеру — ответим в среднем за 5 минут, ежедневно с 9:00 до 22:00 МСК.
              Telegram, телефон, email и форма заявки ниже.
            </p>
          </div>
        </section>

        {/* Channels */}
        <section style={{ padding: '70px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {CHANNELS.map((c, i) => {
                const Icon = c.Icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-ym-goal={c.goal}
                    data-ym-params='{"place":"kontakty_page"}'
                    style={{
                      display: 'block',
                      padding: '28px',
                      background: '#F9FAFB',
                      borderRadius: '20px',
                      border: '1px solid #F3F4F6',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color .15s, transform .15s',
                    }}
                    className="contact-card"
                  >
                    <div style={{
                      width: '48px', height: '48px',
                      background: '#e8f7f3',
                      color: '#005C43',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '16px',
                    }}>
                      <Icon size={22} strokeWidth={2.2} />
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, marginBottom: '4px' }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                      {c.value}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                      {c.note}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Hours and warehouse */}
        <section style={{ padding: '60px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #F3F4F6' }}>
              <div style={{
                width: '48px', height: '48px',
                background: '#FFEEEC', color: '#FF5A47',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Clock size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>Часы работы</h3>
              <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
                <strong>Поддержка в Telegram:</strong> ежедневно 9:00-22:00 МСК<br />
                <strong>Телефон:</strong> пн-пт 10:00-19:00 МСК<br />
                <strong>Склад в Китае:</strong> пн-сб 9:00-18:00 (UTC+8)
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #F3F4F6' }}>
              <div style={{
                width: '48px', height: '48px',
                background: '#FFF7E8', color: '#F59E0B',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <MapPin size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>Склад в Гуанчжоу 🇨🇳</h3>
              <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
                广州市荔湾区站前路90号<br />
                <span style={{ color: '#6B7280', fontSize: '14px' }}>Гуанчжоу, район Ливань, ул. Чжаньцянь, 90</span>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #E5E7EB' }}>
                  {CHINA_CONTACTS.map((cc, i) => (
                    <div key={i} style={{ fontSize: '14px', marginBottom: '6px' }}>
                      <span style={{ color: '#6B7280' }}>{cc.label}: </span>
                      <a href={cc.href} style={{ color: '#005C43', fontWeight: 700, textDecoration: 'none' }}>{cc.value}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #F3F4F6' }}>
              <div style={{
                width: '48px', height: '48px',
                background: '#e8f7f3', color: '#005C43',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Building2 size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>Юр.лицо в КНР</h3>
              <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
                <strong>广州亚世名进出口有限公司</strong><br />
                <span style={{ color: '#6B7280', fontSize: '13px' }}>Guangzhou Yashiming Import &amp; Export Co., Ltd.</span>
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#6B7280' }}>
                  Регистрационный код:<br />
                  <span style={{ fontFamily: 'monospace', color: '#111827', fontWeight: 700 }}>91440100MAEGJX2C1Y</span>
                </div>
                <a
                  href="https://www.gsxt.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', fontWeight: 700, color: '#005C43', textDecoration: 'none' }}
                >
                  Проверить в реестре КНР →
                </a>
              </div>
            </div>
          </div>
        </section>

        <LeadForm />

        <style>{`
          .contact-card:hover {
            border-color: #005C43 !important;
            transform: translateY(-2px);
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
