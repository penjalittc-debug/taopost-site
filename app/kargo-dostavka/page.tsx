import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Truck, ShoppingCart, Search, FileText, Package, MessageCircle, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import B2BForm from '@/components/B2BForm';
import CargoCalc from '@/components/CargoCalc';
import CountUp from '@/components/CountUp';
import TariffTabs from '@/components/TariffTabs';
import WarehouseGallery from '@/components/WarehouseGallery';
import {
  BUYER_PACKAGING,
  MIN_USD_PER_KG,
  CARGO_MIN_KG,
  USD_MARKUP_RUB,
} from '@/lib/cargoTariffs';
import sl from '@/components/ServiceLanding.module.css';
import s from '@/components/CargoOpt.module.css';

// ── /kargo-dostavka — опт и карго (04.11.2026, v2 после разбора топ-5) ──────
// Wordstat 08.09–07.10.2026: «карго из китая» 9 522/мес, «доставка грузов из
// китая» 4 171, «товары из китая оптом» 3 272. Структура собрана по пяти
// сайтам из выдачи (1kargo, Aurora, ChinaSpace, Глобал-Альянс, China Star):
// расчёт в первом экране, цена-якорь, карго против документов, способы работы,
// факты вместо лозунгов. Разбор — org/08-growth/21-kargo-competitors-top5.md
// (репо taopost). Все цифры — решения владельца или уже опубликованы на сайте.

const MIN_RATE = MIN_USD_PER_KG.toLocaleString('ru-RU');
const MIN_KG = CARGO_MIN_KG;
const TG = 'https://t.me/taopostsupport?start=opt';

const TITLE = `Карго из Китая в Россию оптом — от ${MIN_RATE} $/кг, свой склад | TaoPost`;
const DESCRIPTION =
  `Карго доставка из Китая в Россию и Москву: ставка по плотности груза от ${MIN_RATE} $/кг, ` +
  `выкуп с 1688 от 3 %, документы для Wildberries и Ozon. Карго от ${MIN_KG} кг. Свой склад в Гуанчжоу.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://taopost.ru/kargo-dostavka' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://taopost.ru/kargo-dostavka',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
  },
};

const HERO_POINTS = [
  'Ставка по плотности груза — платите меньше за плотный груз',
  'Выкуп с 1688, Taobao, Pinduoduo и поиск фабрики',
  'Документы и маркировка для Wildberries и Ozon',
];

const WAYS = [
  {
    Icon: Truck,
    title: 'У меня есть поставщик',
    text: 'Даём адрес склада в Гуанчжоу. Поставщик отгружает туда, мы принимаем, пересчитываем, фотографируем и везём.',
    tag: 'Только доставка',
  },
  {
    Icon: ShoppingCart,
    title: 'Выкупите за меня',
    text: 'Присылаете ссылки с 1688, Taobao или Pinduoduo. Договариваемся с продавцом, платим в юанях, контролируем отгрузку.',
    tag: 'Комиссия 3–8 %',
  },
  {
    Icon: Search,
    title: 'Найдите фабрику',
    text: 'Ищем производителя по фото или образцу, сравниваем цены, заказываем образцы перед партией.',
    tag: 'Под ваш товар',
  },
];

const COMPARE = {
  cargo: [
    'Платите за кг по ставке, пошлины уже внутри',
    'Таможней занимается перевозчик, не вы',
    'Подходит для физлиц, ИП на УСН и тестовых партий',
    'Можно смешанный груз от разных поставщиков',
  ],
  docs: [
    'Договор, инвойс, упаковочный лист',
    'Помощь с сертификатом или декларацией соответствия',
    'Маркировка и упаковка под требования WB и Ozon',
    'Полностью «белый» ввоз с декларацией на товары — отдельный расчёт',
  ],
};

const STEPS = [
  { title: 'Заявка', text: 'Пишете, что и сколько везёте. Менеджер считает доставку, выкуп и документы.' },
  { title: 'Выкуп или отгрузка', text: 'Выкупаем у поставщика или он сам отправляет груз на наш склад в Гуанчжоу.' },
  { title: 'Приёмка и проверка', text: 'Пересчитываем, фотографируем, проверяем брак. Упаковываем и маркируем.' },
  { title: 'Рейс в Москву', text: 'Ближайшим из двух рейсов в неделю. Статус — в личном кабинете.' },
  { title: 'Выдача', text: `Самовывоз в Москве или отправка по России. Оплата в рублях по курсу ЦБ + ${USD_MARKUP_RUB} ₽ за $.` },
];

const GOODS = [
  'Одежда', 'Обувь', 'Сумки', 'Аксессуары', 'Электроника', 'Товары для дома', 'Мебель', 'Текстиль',
  'Игрушки', 'Спорттовары', 'Автозапчасти', 'Канцелярия', 'Инструменты', 'Посуда', 'Мототехника',
];

const NOT_CARRIED = 'Не возим: оружие, лекарства и БАДы, опасные грузы, часть жидкостей и аэрозолей, бренды-подделки в коммерческих объёмах.';

const FAQ = [
  {
    q: 'Что такое карго доставка из Китая?',
    a: 'Карго — это доставка товара по весу, когда таможенным оформлением занимается перевозчик, а не вы. Вы отправляете товар на наш склад в Гуанчжоу, мы принимаем, проверяем, упаковываем и везём его в Москву. Платите за килограмм и не рассчитываете пошлины сами.',
  },
  {
    q: 'Как считается стоимость карго?',
    a: `По плотности груза: вес делим на объём. Например, 300 кг в 1,5 м³ — это 200 кг/м³. Для каждой плотности своя ставка в долларах за кг, от ${MIN_RATE} $. Если плотность ниже 100 кг/м³, груз лёгкий и считается за кубометр. Отдельно — разгрузка и упаковка за место.`,
  },
  {
    q: 'С какого веса действует карго?',
    a: `От ${MIN_KG} кг в одной отправке. Если груз легче — действует розничный тариф от 1 кг: до 10 кг — 450 ₽/кг, от 10 кг — 400, от 20 кг — 350, без объёмного веса.`,
  },
  {
    q: 'Сколько стоит выкуп с 1688?',
    a: 'Комиссия 3–8 % от суммы закупки: чем больше закупка, тем ниже процент. Точную ступень менеджер назовёт по вашему заказу. В комиссию входят переговоры с поставщиком, оплата в юанях и контроль отгрузки.',
  },
  {
    q: 'Чем карго отличается от белой доставки?',
    a: 'При карго вы платите фиксированную ставку за кг, а оформлением занимается перевозчик. При белой доставке груз оформляется с декларацией на товары, пошлинами и НДС, и вы получаете полный пакет закрывающих документов. Белая нужна, если вы принимаете НДС к вычету или везёте товар с обязательной маркировкой.',
  },
  {
    q: 'Можно ли с документами для Wildberries и Ozon?',
    a: 'Да. Подготовим договор, инвойс, упаковочный лист, поможем с сертификатами и декларацией соответствия, промаркируем товар под маркетплейс. Если нужен полностью «белый» ввоз с декларацией на товары, менеджер посчитает его отдельно.',
  },
  {
    q: 'Как оплачивать?',
    a: `Цены в долларах, оплата в рублях по курсу ЦБ + ${USD_MARKUP_RUB} ₽ за $ на день оплаты. Счёт за доставку выставляем после взвешивания груза на складе.`,
  },
  {
    q: 'Сколько идёт груз?',
    a: 'До Москвы 15–20 дней авто, до регионов ещё 2–7 дней транспортной компанией. Срочное — авиа за 3–5 дней.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://taopost.ru' },
    { '@type': 'ListItem', position: 2, name: 'Карго доставка', item: 'https://taopost.ru/kargo-dostavka' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function KargoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        {/* ── Первый экран: оффер слева, калькулятор справа ─────────── */}
        <section className={s.hero}>
          <div className={s.heroGlow} aria-hidden="true" />
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <nav aria-label="breadcrumb" className={s.crumbs}>
                <Link href="/">Главная</Link>
                <span>›</span>
                <span>Карго доставка</span>
              </nav>
              <span className={s.heroPill}><span className={s.pulseDot} /> Опт и карго · от {MIN_KG} кг</span>
              <h1 className={s.heroTitle}>
                Карго доставка из Китая в Россию <span className={s.heroAccent}>оптом от {MIN_RATE} $/кг</span>
              </h1>
              <ul className={s.heroPoints}>
                {HERO_POINTS.map((p) => (
                  <li key={p}><Check size={18} strokeWidth={3} /> {p}</li>
                ))}
              </ul>
              <div className={s.heroBtns}>
                <a href="#opt-form" className={s.btnPrimary}>Получить расчёт</a>
                <a href={TG} target="_blank" rel="noopener noreferrer" className={s.btnLight}>
                  <MessageCircle size={18} strokeWidth={2.4} /> Написать в Telegram
                </a>
              </div>

              <div className={s.route} aria-label="Маршрут Гуанчжоу — Москва">
                <div className={s.routePoint}>
                  <span className={s.routeDot} />
                  <b>Гуанчжоу</b>
                  <small>наш склад</small>
                </div>
                <div className={s.routeLine}>
                  <span className={s.routeTruck}><Truck size={18} strokeWidth={2.4} /></span>
                </div>
                <div className={s.routePoint}>
                  <span className={`${s.routeDot} ${s.routeDotEnd}`} />
                  <b>Москва</b>
                  <small>15–20 дней</small>
                </div>
              </div>
            </div>

            <div id="calc" className={s.heroCalc}>
              <CargoCalc />
            </div>
          </div>
        </section>

        {/* ── Цифры ────────────────────────────────────────────────── */}
        <section className={s.stats}>
          <div className={s.statsGrid}>
            <div className={s.stat}><b><CountUp to={200000} suffix="+" /></b><span>посылок доставили с 2019 года</span></div>
            <div className={s.stat}><b><CountUp to={2} /></b><span>рейса в неделю из Гуанчжоу</span></div>
            <div className={s.stat}><b>15–20</b><span>дней до Москвы авто</span></div>
            <div className={s.stat}><b><CountUp to={MIN_USD_PER_KG} decimals={1} suffix=" $" /></b><span>минимальная ставка за кг</span></div>
          </div>
        </section>

        {/* ── Способы работы ───────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={s.section}>
            <div className={s.inner}>
              <span className={s.kicker}>Как работаем</span>
              <h2 className={sl.h2}>Три способа привезти товар из Китая</h2>
              <div className={s.ways}>
                {WAYS.map(({ Icon, title, text, tag }) => (
                  <article key={title} className={s.way}>
                    <span className={s.wayIcon}><Icon size={24} strokeWidth={2.2} /></span>
                    <h3 className={s.wayTitle}>{title}</h3>
                    <p className={s.wayText}>{text}</p>
                    <span className={s.wayTag}>{tag}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Тарифы ───────────────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={`${s.section} ${s.muted}`}>
            <div className={s.inner}>
              <span className={s.kicker}>Тарифы</span>
              <h2 className={sl.h2}>Сколько стоит карго из Китая</h2>
              <p className={s.sub}>
                Ставки до Москвы в $. Плотность = вес ÷ объём. Чем плотнее груз, тем дешевле килограмм.
                Оплата в рублях по курсу ЦБ + {USD_MARKUP_RUB} ₽ за $.
              </p>
              <TariffTabs />

              <h3 className={s.h3}>Упаковка и разгрузка</h3>
              <div className={s.packGrid}>
                {BUYER_PACKAGING.map((p) => (
                  <div key={p.id} className={s.packItem}>
                    <span>{p.name}</span>
                    <b>{p.usd} $</b>
                  </div>
                ))}
              </div>
              <p className={s.sub}>
                Упаковка — за место. Разгрузка на складе — от 4,30 $ (0,03 м³) до 22 $ (1,5 м³). Фотоотчёт бесплатно.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ── Карго или с документами ──────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={s.section}>
            <div className={s.inner}>
              <span className={s.kicker}>Документы</span>
              <h2 className={sl.h2}>Карго или с документами — что выбрать</h2>
              <div className={s.compare}>
                <div className={s.compareCol}>
                  <div className={s.compareHead}><Package size={22} strokeWidth={2.3} /> Карго</div>
                  <ul>{COMPARE.cargo.map((t) => <li key={t}><Check size={16} strokeWidth={3} /> {t}</li>)}</ul>
                  <p className={s.compareFoot}>Быстро и дешевле. Для селлеров, магазинов, тестовых партий.</p>
                </div>
                <div className={`${s.compareCol} ${s.compareColDark}`}>
                  <div className={s.compareHead}><FileText size={22} strokeWidth={2.3} /> С документами</div>
                  <ul>{COMPARE.docs.map((t) => <li key={t}><Check size={16} strokeWidth={3} /> {t}</li>)}</ul>
                  <p className={s.compareFoot}>Для продажи на маркетплейсах и компаний, которым нужны бумаги.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Шаги ─────────────────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={`${s.section} ${s.muted}`}>
            <div className={s.inner}>
              <span className={s.kicker}>Этапы</span>
              <h2 className={sl.h2}>Как работает карго TaoPost</h2>
              <ol className={s.timeline}>
                {STEPS.map((step, i) => (
                  <li key={step.title} className={s.tlStep} style={{ animationDelay: `${i * 120}ms` }}>
                    <span className={s.tlNum}>{i + 1}</span>
                    <h3 className={s.tlTitle}>{step.title}</h3>
                    <p className={s.tlText}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </FadeIn>

        {/* ── Что возим ────────────────────────────────────────────── */}
        <section className={s.goods} aria-label="Что возим">
          <div className={s.marquee}>
            <div className={s.marqueeTrack}>
              {[...GOODS, ...GOODS].map((g, i) => (
                <span key={`${g}-${i}`} className={s.goodsChip} aria-hidden={i >= GOODS.length}>{g}</span>
              ))}
            </div>
          </div>
          <p className={s.notCarried}><X size={15} strokeWidth={3} /> {NOT_CARRIED}</p>
        </section>

        {/* ── Склад ────────────────────────────────────────────────── */}
        <FadeIn delay={50}><WarehouseGallery /></FadeIn>

        {/* ── Заявка ───────────────────────────────────────────────── */}
        <section id="opt-form" className={s.formSection}>
          <div className={s.formGrid}>
            <div className={s.formAside}>
              <span className={s.kickerLight}>Заявка на опт</span>
              <h2 className={s.formTitle}>Посчитаем вашу партию</h2>
              <p className={s.formLede}>Ответим в течение рабочего дня, с 9:00 до 19:00 по Москве. Пришлём:</p>
              <ul className={s.formList}>
                <li><Check size={18} strokeWidth={3} /> расчёт доставки по плотности</li>
                <li><Check size={18} strokeWidth={3} /> расчёт выкупа и комиссии</li>
                <li><Check size={18} strokeWidth={3} /> какие документы нужны под ваш товар</li>
              </ul>
              <a href={TG} target="_blank" rel="noopener noreferrer" className={s.btnLight}>
                <MessageCircle size={18} strokeWidth={2.4} /> Быстрее — в Telegram
              </a>
            </div>
            <B2BForm variant="opt" />
          </div>
        </section>

        {/* ── Розница ──────────────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={s.section}>
            <div className={s.inner}>
              <div className={s.retail}>
                <div>
                  <h2 className={s.retailTitle}>Груз легче {MIN_KG} кг?</h2>
                  <p className={s.retailText}>
                    Для небольших заказов — розничное карго из Китая от 1 кг: до 10 кг — 450 ₽/кг, от 10 кг — 400, от 20 кг — 350,
                    объёмный вес не считаем, упаковка входит в цену.
                  </p>
                </div>
                <Link href="/tarify" className={s.btnGhost}>Розничные тарифы</Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── SEO-текст ────────────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={`${s.section} ${s.muted}`}>
            <div className={s.inner}>
              <h2 className={sl.h2}>Карго компания со своим складом в Китае</h2>
              <div className={s.seo}>
                <p>
                  TaoPost — карго компания из Китая в Россию со своим складом в Гуанчжоу. Возим карго
                  в Москву, а дальше — в Санкт-Петербург, Екатеринбург, Казань, Новосибирск, Краснодар
                  и любой город России через СДЭК и транспортные компании.
                </p>
                <p>
                  Карго доставка грузов из Китая подходит для товаров для маркетплейсов, одежды, обуви,
                  электроники, товаров для дома, мебели и мототехники. Сборные грузы из разных магазинов
                  и фабрик объединяем на складе в одну отправку.
                </p>
                <p>
                  Работаем с 1688, Taobao, Pinduoduo и фабриками напрямую: выкупаем товар, проверяем
                  качество и отправляем в Россию с документами для продажи на Wildberries и Ozon.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <FadeIn delay={50}>
          <section className={sl.faq}>
            <div className={sl.faqInner}>
              <h2 className={sl.h2}>Частые вопросы про карго</h2>
              <div className={sl.faqList}>
                {FAQ.map((item) => (
                  <details key={item.q} className={sl.faqItem}>
                    <summary className={sl.faqQ}>{item.q}</summary>
                    <p className={sl.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
