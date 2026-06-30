import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import B2BForm from '@/components/B2BForm';
import { CheckCircle2, Factory, FileCheck2, ShieldCheck, Container, Users } from 'lucide-react';

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
      <main className="biz">
        <section className="biz__hero">
          <div className="biz__heroInner">
            <span className="biz__eyebrow">
              <span className="biz__eyebrowDot" />
              TaoPost для бизнеса
            </span>
            <h1 className="biz__title">
              Оптовые закупки <span className="biz__accent">в Китае под ключ</span>
            </h1>
            <p className="biz__lede">
              Поиск фабрики на 1688, переговоры, контроль качества, документы и контейнерная
              логистика — за B2B-клиентом закрепляется отдельный менеджер. Работаем с ИП, ООО и
              самозанятыми, помогаем выйти на маркетплейсы РФ.
            </p>
          </div>
        </section>

        <section className="biz__section">
          <div className="biz__container">
            <h2 className="biz__h2">Что входит в оптовую услугу</h2>
            <div className="biz__grid">
              {POINTS.map(({ Icon, title, text }) => (
                <div key={title} className="biz__card">
                  <div className="biz__cardIcon">
                    <Icon size={22} strokeWidth={2.3} />
                  </div>
                  <h3 className="biz__cardTitle">{title}</h3>
                  <p className="biz__cardText">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="biz__section biz__section--muted">
          <div className="biz__container">
            <h2 className="biz__h2">Как мы работаем</h2>
            <div className="biz__steps">
              {STEPS.map((s) => (
                <div key={s.num} className="biz__step">
                  <span className="biz__stepNum">{s.num}</span>
                  <div>
                    <h3 className="biz__stepTitle">{s.title}</h3>
                    <p className="biz__stepText">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="form" className="biz__section">
          <div className="biz__container biz__formWrap">
            <B2BForm />
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .biz { padding-top: 72px; background: #fff; }
        .biz__hero {
          padding: 80px 24px 56px;
          background: linear-gradient(160deg, #F0FDF9 0%, #ffffff 60%, #FFF5F5 100%);
        }
        .biz__heroInner { max-width: 880px; margin: 0 auto; text-align: center; }
        .biz__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 999px;
          background: rgba(0,92,67,0.10);
          color: #004232;
          border: 1px solid rgba(0,92,67,0.20);
          font-size: 13px; font-weight: 700;
          margin-bottom: 18px;
        }
        .biz__eyebrowDot {
          width: 6px; height: 6px; border-radius: 50%; background: #005C43;
        }
        .biz__title {
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -1.5px;
          color: #0A0F1C;
          margin: 0 0 18px;
        }
        .biz__accent {
          background: #005C43;
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .biz__lede {
          font-size: 17px; color: #4B5563; line-height: 1.7; margin: 0;
        }
        .biz__section { padding: 72px 24px; }
        .biz__section--muted { background: #F9FAFB; }
        .biz__container { max-width: 1180px; margin: 0 auto; }
        .biz__h2 {
          font-size: clamp(26px, 3.4vw, 36px);
          font-weight: 700;
          letter-spacing: -0.8px;
          color: #0A0F1C;
          margin: 0 0 32px;
          text-align: center;
        }
        .biz__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .biz__card {
          background: #fff;
          border: 1px solid #F3F4F6;
          border-radius: 18px;
          padding: 24px;
          transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
        }
        .biz__card:hover {
          transform: translateY(-2px);
          border-color: rgba(0,92,67,0.22);
          box-shadow: 0 14px 30px -16px rgba(10,15,28,0.16);
        }
        .biz__cardIcon {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: rgba(0,92,67,0.10);
          color: #004232;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .biz__cardTitle { font-size: 17px; font-weight: 700; color: #0A0F1C; margin: 0 0 8px; }
        .biz__cardText { font-size: 14px; color: #4B5563; line-height: 1.6; margin: 0; }

        .biz__steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .biz__step {
          display: flex; gap: 16px;
          background: #fff;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid #F3F4F6;
        }
        .biz__stepNum {
          font-size: 26px;
          font-weight: 700;
          color: #FF5A47;
          line-height: 1;
          min-width: 36px;
        }
        .biz__stepTitle { font-size: 15px; font-weight: 700; margin: 0 0 6px; color: #0A0F1C; }
        .biz__stepText { font-size: 13.5px; color: #4B5563; line-height: 1.55; margin: 0; }

        .biz__formWrap { max-width: 720px; }

        @media (max-width: 980px) {
          .biz__grid { grid-template-columns: repeat(2, 1fr); }
          .biz__steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .biz__hero { padding: 64px 18px 40px; }
          .biz__section { padding: 56px 18px; }
          .biz__grid { grid-template-columns: 1fr; }
          .biz__steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
