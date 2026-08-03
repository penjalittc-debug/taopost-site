import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import B2BForm from '@/components/B2BForm';
import { CheckCircle2, Factory, FileCheck2, ShieldCheck, Container, Users } from 'lucide-react';
import s from './business.module.css';

export const metadata: Metadata = {
  title: 'Опт из Китая для бизнеса — закупки на 1688 под ключ | TaoPost',
  description:
    'Оптовые закупки в Китае под ключ: поиск фабрики на 1688, минимальные партии, сертификация, контейнерные перевозки, документы для импорта в РФ. Выделенный менеджер.',
  alternates: { canonical: 'https://taopost.ru/business' },
  openGraph: {
    title: 'TaoPost для бизнеса — опт из Китая под ключ',
    description: 'Поиск фабрики, переговоры, контроль качества, документы и логистика для импорта в РФ.',
    url: 'https://taopost.ru/business',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
  },
};

const POINTS = [
  {
    Icon: Factory,
    title: 'Поиск фабрики и переговоры',
    text: 'Подбираем поставщика на 1688 под ваши требования, договариваемся о цене, партии, упаковке и сроках. Все коммуникации на китайском — на стороне TaoPost.',
  },
  {
    Icon: ShieldCheck,
    title: 'Контроль качества и образцы',
    text: 'Запрашиваем образцы, фотографируем партию на складе перед отгрузкой, проверяем по чек-листу. По итогам — отчёт с фото и видео.',
  },
  {
    Icon: FileCheck2,
    title: 'Документы для импорта',
    text: 'Договор поставки, инвойс, упаковочный лист, сертификаты EAC / соответствия, маркировка для маркетплейсов РФ.',
  },
  {
    Icon: Container,
    title: 'Контейнерные перевозки',
    text: 'Сборные грузы (LCL) от 100 кг, полные контейнеры (FCL) 20/40 футов. Маршруты: Гуанчжоу/Иу → Москва, Шэньчжэнь → Уссурийск.',
  },
  {
    Icon: Users,
    title: 'Выделенный менеджер',
    text: 'За B2B-клиентом закрепляется отдельный менеджер: ведёт сделку от поиска фабрики до доставки на ваш склад в РФ.',
  },
  {
    Icon: CheckCircle2,
    title: 'Прозрачная смета',
    text: 'Заранее показываем структуру затрат: товар, логистика, страховка, услуги. Без скрытых комиссий.',
  },
];

const STEPS = [
  { num: '01', title: 'Заявка', text: 'Заполните форму — мы свяжемся в течение рабочего дня и уточним детали.' },
  { num: '02', title: 'Подбор фабрики', text: 'Подбираем 2–3 поставщика, согласовываем образцы, цену и партию.' },
  { num: '03', title: 'Контроль и отгрузка', text: 'Принимаем партию на склад, проверяем, готовим к отправке.' },
  { num: '04', title: 'Доставка в РФ', text: 'Логистика, таможня, документы. Передаём груз на ваш склад.' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Для бизнеса', item: 'https://taopost.ru/business' },
  ],
};

export default function BusinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className={s.wrap}>
        <section className={s.hero}>
          <div className={s.heroInner}>
            <span className={s.eyebrow}>
              <span className={s.eyebrowDot} />
              TaoPost для бизнеса
            </span>
            <h1 className={s.title}>
              Оптовые закупки <span className={s.accent}>в Китае под ключ</span>
            </h1>
            <p className={s.lede}>
              Поиск фабрики на 1688, переговоры, контроль качества, документы и контейнерная
              логистика — за B2B-клиентом закрепляется отдельный менеджер. Работаем с ИП, ООО и
              самозанятыми, помогаем выйти на маркетплейсы РФ.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.h2}>Что входит в оптовую услугу</h2>
            <div className={s.grid}>
              {POINTS.map(({ Icon, title, text }) => (
                <div key={title} className={s.card}>
                  <div className={s.cardIcon}>
                    <Icon size={22} strokeWidth={2.3} />
                  </div>
                  <h3 className={s.cardTitle}>{title}</h3>
                  <p className={s.cardText}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionMuted}`}>
          <div className={s.container}>
            <h2 className={s.h2}>Как мы работаем</h2>
            <div className={s.steps}>
              {STEPS.map((step) => (
                <div key={step.num} className={s.step}>
                  <span className={s.stepNum}>{step.num}</span>
                  <div>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                    <p className={s.stepText}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="form" className={s.section}>
          <div className={`${s.container} ${s.formWrap}`}>
            <B2BForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
