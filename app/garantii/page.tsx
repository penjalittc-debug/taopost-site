import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Camera, Package, RefreshCcw, FileCheck2, AlertCircle, Wallet, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Гарантии TaoPost — страховка, проверка качества, возврат при браке',
  description: 'Конкретные гарантии TaoPost: страховка груза 2%, фото каждой посылки на складе, возврат при браке, отслеживание на всём маршруте. Что покрывается и что нет.',
  keywords: 'гарантии taopost, страховка карго из китая, возврат брак китай, проверка качества доставка китай',
  alternates: { canonical: 'https://taopost.ru/garantii' },
  openGraph: {
    title: 'Гарантии TaoPost — что мы обещаем и за что отвечаем',
    description: 'Страховка 2%, проверка качества, фото со склада, возврат при браке. Конкретные обязательства.',
    url: 'https://taopost.ru/garantii',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://taopost.ru/og-image.png', width: 1200, height: 630, alt: 'Гарантии TaoPost' }],
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Гарантии', item: 'https://taopost.ru/garantii' },
  ],
};

const GUARANTEES = [
  {
    Icon: ShieldCheck,
    color: '#005C43',
    bg: '#e8f7f3',
    title: 'Страховка груза 2%',
    text: 'Обязательная для каждой отправки. Покрывает потерю и физические повреждения товара на всём маршруте: от приёмки на нашем складе в Гуанчжоу до выдачи в России.',
    detail: 'Возмещение по факту, в течение 14 рабочих дней после подтверждения страхового случая. Размер компенсации — заявленная стоимость товара по инвойсу.',
  },
  {
    Icon: Camera,
    color: '#FF5A47',
    bg: '#FFEEEC',
    title: 'Фото каждой посылки',
    text: 'Перед отправкой из Китая мы фотографируем содержимое и упаковку. До 5 фото бесплатно — этого достаточно, чтобы вы могли проверить товар до того, как он уехал в Россию.',
    detail: 'Если на фото видно брак или несоответствие — возвращаем продавцу и оплату вам, посылка не уходит в Россию.',
  },
  {
    Icon: Package,
    color: '#F59E0B',
    bg: '#FFF7E8',
    title: 'Проверка качества',
    text: 'Для опта с 1688 — выборочная проверка партии перед отправкой. Считаем штуки, проверяем целостность упаковки, делаем фото-отчёт. Для одиночных заказов — визуальная проверка.',
    detail: 'Для контрактов от 50 000 ₽ возможна полная проверка партии (платная услуга от 1500 ₽).',
  },
  {
    Icon: RefreshCcw,
    color: '#6366f1',
    bg: '#EEEEFF',
    title: 'Возврат при браке',
    text: 'Если до отправки в Россию вы обнаружили брак на фото — возвращаем товар продавцу и оплату вам в течение 5-10 рабочих дней. Без скрытых условий.',
    detail: 'Если товар уже прибыл в Россию и вы обнаружили скрытый дефект — оформляем страховой случай (см. п. 1).',
  },
  {
    Icon: FileCheck2,
    color: '#005C43',
    bg: '#e8f7f3',
    title: 'Официальное юр.лицо в КНР',
    text: 'TaoPost — это китайское юридическое лицо с бизнес-лицензией (营业执照), а не Telegram-канал. Все операции в Китае идут через расчётный счёт компании.',
    detail: 'Реестр КНР подтверждает наличие компании — регистрационный код 91440100MAEGJX2C1Y, проверка на gsxt.gov.cn.',
  },
  {
    Icon: Clock,
    color: '#FF5A47',
    bg: '#FFEEEC',
    title: 'Сроки доставки — обязательство',
    text: 'Авто 15-25 дней, авиа 3-5 дней. Если посылка задерживается без объективных причин (таможня, праздники в КНР) более чем на 5 дней — компенсируем 10% от стоимости доставки.',
    detail: 'Объективные причины: таможенный досмотр, китайские национальные праздники, форс-мажоры. Они увеличивают срок, но не отменяют доставку.',
  },
  {
    Icon: Wallet,
    color: '#F59E0B',
    bg: '#FFF7E8',
    title: 'Без скрытых платежей',
    text: 'Финальная стоимость всегда указана в смете до оплаты. После приёмки на складе мы пришлём финальный вес и итоговый счёт. Если фактический вес меньше расчётного — пересчитаем в вашу пользу.',
    detail: 'Услуги, оплачиваемые отдельно (упаковка от 450 ₽, фото от 0 ₽, выкуп от 3% для опта) всегда обсуждаются заранее.',
  },
];

const NOT_COVERED = [
  'Скоропортящиеся товары (продукты, лекарства) — не везём',
  'Запрещённые к ввозу в РФ товары (см. список в нашем блоге)',
  'Косметика дороже 200 €/единица — может потребовать декларации',
  'Износ при нормальной эксплуатации после получения',
  'Несоответствие цвета между фото продавца и реальным товаром (всегда уточняйте у менеджера)',
];

const STEPS = [
  { n: 1, text: 'Заметили проблему — пишете менеджеру в Telegram с фото/видео' },
  { n: 2, text: 'В течение 24 часов открываем кейс и собираем документы' },
  { n: 3, text: 'Решение по случаю — в течение 5 рабочих дней (для очевидных кейсов — быстрее)' },
  { n: 4, text: 'Компенсация — возврат денег или повторная отправка за наш счёт' },
];

export default function GarantiiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
              <span style={{ color: '#374151' }}>Гарантии</span>
            </nav>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#005C43', borderRadius: '50px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 700,
              marginBottom: '24px', border: '1px solid #c6ede4',
            }}>
              🛡 Что мы обещаем
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900, color: '#111827',
              lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px',
            }}>
              Гарантии <span style={{ color: '#005C43' }}>TaoPost</span>
            </h1>
            <p style={{
              fontSize: '18px', color: '#6B7280',
              lineHeight: 1.7, maxWidth: '620px', margin: '0 auto',
            }}>
              Конкретные обязательства — со сроками, обстоятельствами и компенсацией.
              Без размытых формулировок и юридического тумана.
            </p>
          </div>
        </section>

        {/* Guarantees grid */}
        <section style={{ padding: '60px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {GUARANTEES.map((g, i) => {
              const Icon = g.Icon;
              return (
                <div key={i} style={{
                  background: '#F9FAFB',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    width: '52px', height: '52px',
                    background: g.bg, color: g.color,
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '18px',
                  }}>
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                    {g.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '12px' }}>
                    {g.text}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                    {g.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How to claim */}
        <section style={{ padding: '70px 24px', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 900, color: '#111827',
              textAlign: 'center', marginBottom: '16px',
            }}>
              Как воспользоваться гарантией
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
              Простой процесс — 4 шага, без бюрократии
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: '#005C43', color: 'white',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, marginBottom: '14px',
                  }}>{s.n}</div>
                  <p style={{ fontSize: '15px', color: '#111827', lineHeight: 1.6, margin: 0 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Not covered */}
        <section style={{ padding: '60px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{
              background: '#FFF7E8',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #FCD34D',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <AlertCircle size={28} strokeWidth={2.2} style={{ color: '#D97706' }} />
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Что НЕ покрывается
                </h2>
              </div>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
                Чтобы избежать недоразумений — честно говорим, чего не везём и за что не отвечаем:
              </p>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {NOT_COVERED.map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '8px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
              Остались вопросы по гарантиям?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>
              Менеджер ответит на любой вопрос — что покрывается, как оформить случай, какие сроки
            </p>
            <a
              href="https://t.me/taopostsupport?start=site"
              target="_blank"
              rel="noopener noreferrer"
              data-ym-goal="telegram_click"
              data-ym-params='{"place":"garantii_cta"}'
              style={{
                padding: '16px 36px',
                background: '#fff', color: '#005C43',
                fontWeight: 800, fontSize: '16px',
                borderRadius: '50px', textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Написать в Telegram →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
