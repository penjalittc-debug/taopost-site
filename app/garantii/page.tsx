import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { ShieldCheck, Camera, Package, RefreshCcw, FileCheck2, AlertCircle, Wallet, Clock } from 'lucide-react';
import s from './garantii.module.css';

export const metadata: Metadata = {
  title: 'Гарантии TaoPost — страховка, проверка качества, возврат при браке',
  description: 'Конкретные гарантии TaoPost: страховка груза 2%, фото каждой посылки на складе, возврат при браке, отслеживание на всём маршруте. Что покрывается и что нет.',
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
        <PageHero
          currentCrumb="Гарантии"
          pill="🛡 Что мы обещаем"
          title={<>Гарантии <span style={{ color: '#005C43' }}>TaoPost</span></>}
          lede="Конкретные обязательства — со сроками, обстоятельствами и компенсацией. Без размытых формулировок и юридического тумана."
        />

        <section className={s.grid}>
          <div className={s.gridInner}>
            {GUARANTEES.map((g, i) => {
              const Icon = g.Icon;
              const vars = { ['--gt-color' as string]: g.color, ['--gt-bg' as string]: g.bg } as React.CSSProperties;
              return (
                <div key={i} className={s.card}>
                  <div className={s.cardIcon} style={vars}>
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h2 className={s.cardTitle}>{g.title}</h2>
                  <p className={s.cardText}>{g.text}</p>
                  <p className={s.cardDetail}>{g.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className={s.claim}>
          <div className={s.claimInner}>
            <h2 className={s.claimH2}>Как воспользоваться гарантией</h2>
            <p className={s.claimLede}>Простой процесс — 4 шага, без бюрократии</p>
            <div className={s.claimGrid}>
              {STEPS.map((step) => (
                <div key={step.n} className={s.claimCard}>
                  <div className={s.claimNum}>{step.n}</div>
                  <p className={s.claimText}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={s.notCovered}>
          <div className={s.notCoveredInner}>
            <div className={s.notCoveredBox}>
              <div className={s.notCoveredHead}>
                <AlertCircle size={28} strokeWidth={2.2} className={s.notCoveredIcon} />
                <h2 className={s.notCoveredH2}>Что НЕ покрывается</h2>
              </div>
              <p className={s.notCoveredIntro}>
                Чтобы избежать недоразумений — честно говорим, чего не везём и за что не отвечаем:
              </p>
              <ul className={s.notCoveredList}>
                {NOT_COVERED.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <PageCta
          title="Остались вопросы по гарантиям?"
          lede="Менеджер ответит на любой вопрос — что покрывается, как оформить случай, какие сроки"
          actions={[
            {
              label: 'Написать в Telegram →',
              href: 'https://t.me/Taopostchat_official',
              external: true,
              ymGoal: 'telegram_click',
              ymParams: '{"place":"garantii_cta"}',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
