import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';
import B2BForm from '@/components/B2BForm';
import CargoCalc from '@/components/CargoCalc';
import {
  BUYER_TARIFFS,
  BUYER_PACKAGING,
  MIN_USD_PER_KG,
  OPT_MIN_GOODS_RUB,
  USD_MARKUP_RUB,
  bandLabel,
} from '@/lib/cargoTariffs';
import sl from '@/components/ServiceLanding.module.css';
import s from '@/components/CargoOpt.module.css';

// ── /kargo-dostavka — опт и карго (переделана 04.11.2026) ──────────────────
// Раньше страница продавала розницу 450 ₽/кг. По Wordstat (08.09–07.10.2026)
// «карго из китая» — 9 522 запроса/мес, «доставка грузов из китая» — 4 171,
// «товары из китая оптом» — 3 272: это спрос оптовиков и селлеров, поэтому
// страница теперь про опт по сетке в $, а розница — одним блоком со ссылкой.
// Решения владельца и риски — org/08-growth/20-opt-cargo-launch.md (репо taopost).

const MIN_RATE = MIN_USD_PER_KG.toLocaleString('ru-RU');
const MIN_GOODS = OPT_MIN_GOODS_RUB.toLocaleString('ru-RU');

const TITLE = `Карго из Китая в Россию оптом — от ${MIN_RATE} $/кг, свой склад | TaoPost`;
const DESCRIPTION =
  `Карго доставка из Китая в Россию и Москву: ставка по плотности груза от ${MIN_RATE} $/кг, ` +
  `выкуп с 1688 от 3 %, документы для Wildberries и Ozon. Опт от ${MIN_GOODS} ₽. Свой склад в Гуанчжоу.`;

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

const CONDITIONS = [
  { emoji: '⚖️', title: `От ${MIN_RATE} $ за кг`, text: 'Ставка зависит от плотности груза: чем плотнее, тем дешевле килограмм. Лёгкий объёмный груз — по кубу.' },
  { emoji: '📦', title: `Опт от ${MIN_GOODS} ₽`, text: 'Оптовые ставки действуют, когда сумма товара в закупке от 50 000 ₽. Можно собрать её из разных поставщиков.' },
  { emoji: '🏭', title: 'Выкуп и поиск поставщика', text: 'Выкупаем на 1688, Taobao, Pinduoduo, ищем фабрику по фото. Комиссия 3–8 % от суммы — чем больше закупка, тем ниже.' },
  { emoji: '📄', title: 'Документы', text: 'Договор, инвойс, упаковочный лист, помощь с сертификацией и маркировкой для Wildberries и Ozon.' },
  { emoji: '🔍', title: 'Свой склад в Гуанчжоу', text: 'Принимаем, пересчитываем, фотографируем и проверяем товар. Брак возвращаем продавцу, пока груз в Китае.' },
  { emoji: '🚚', title: 'До Москвы 15–20 дней', text: 'Рейсы два раза в неделю. Из Москвы — самовывоз, СДЭК или любая транспортная компания по России.' },
];

const STEPS = [
  { title: 'Заявка', text: 'Пишете, что и сколько везёте. Менеджер считает доставку, выкуп и документы.' },
  { title: 'Выкуп или отгрузка', text: 'Выкупаем товар у поставщика или он сам отправляет груз на наш склад в Гуанчжоу.' },
  { title: 'Приёмка и проверка', text: 'Пересчитываем, фотографируем, проверяем брак. Упаковываем и маркируем под маркетплейс, если нужно.' },
  { title: 'Рейс в Москву', text: 'Груз уходит ближайшим рейсом. Статус видно в личном кабинете.' },
  { title: 'Выдача', text: `Забираете в Москве или отправляем по России. Оплата доставки — в рублях по курсу ЦБ + ${USD_MARKUP_RUB} ₽ за $.` },
];

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
    q: 'С какой суммы считается опт?',
    a: `От ${MIN_GOODS} ₽ суммы товара в закупке. Если меньше — действует розничный тариф 450 ₽/кг от 1 кг, без объёмного веса.`,
  },
  {
    q: 'Сколько стоит выкуп с 1688?',
    a: 'Комиссия 3–8 % от суммы закупки: чем больше закупка, тем ниже процент. Точную ступень менеджер назовёт по вашему заказу. В комиссию входят переговоры с поставщиком, оплата в юанях и контроль отгрузки.',
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
    a: 'До Москвы 15–20 дней авто, до регионов ещё 2–7 дней транспортной компанией. Срочное — авиа за 5–7 дней.',
  },
  {
    q: 'Что нельзя везти карго?',
    a: 'Товары, запрещённые к ввозу в РФ: оружие, лекарства, часть жидкостей и аэрозолей, бренды-подделки в коммерческих объёмах. Перед отправкой уточните у менеджера — подскажем по вашему товару.',
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

const rate = (usd: number, perM3?: boolean) =>
  `${usd.toLocaleString('ru-RU')} $/${perM3 ? 'м³' : 'кг'}`;

export default function KargoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <PageHero
          currentCrumb="Карго доставка"
          pill="📦 Опт и карго"
          title={
            <>
              Карго доставка из Китая в Россию{' — '}
              <span style={{ color: '#005C43' }}>оптом от {MIN_RATE} $/кг</span>
            </>
          }
          lede={`Для селлеров Wildberries и Ozon, магазинов и закупщиков. Свой склад в Гуанчжоу, ставка по плотности груза, выкуп с 1688 и документы. Опт — от ${MIN_GOODS} ₽ закупки.`}
        />

        <div className={s.heroCta}>
          <a href="#opt-form" className={s.btnPrimary}>Оставить заявку на опт</a>
          <a href="#calc" className={s.btnGhost}>Посчитать доставку</a>
        </div>

        <FadeIn delay={50}>
          <section className={sl.highlights}>
            <div className={sl.hlInner}>
              <h2 className={sl.h2}>Условия опта</h2>
              <div className={sl.hlGrid}>
                {CONDITIONS.map((c) => (
                  <article key={c.title} className={sl.hlCard}>
                    <span className={sl.hlEmoji} aria-hidden="true">{c.emoji}</span>
                    <h3 className={sl.hlTitle}>{c.title}</h3>
                    <p className={sl.hlText}>{c.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <section id="calc" className={s.section}>
          <div className={s.inner}>
            <h2 className={sl.h2}>Сколько стоит карго из Китая</h2>
            <p className={s.sub}>
              Введите вес и объём — посчитаем доставку до Москвы. Расчёт можно сразу отправить менеджеру.
            </p>
            <CargoCalc />
          </div>
        </section>

        <FadeIn delay={50}>
          <section className={`${s.section} ${s.muted}`}>
            <div className={s.inner}>
              <h2 className={sl.h2}>Тарифы на карго доставку</h2>
              <p className={s.sub}>
                Ставки до Москвы, $. Для тарифов по плотности: вес груза ÷ объём = кг/м³.
                Оплата в рублях по курсу ЦБ + {USD_MARKUP_RUB} ₽ за $.
              </p>
              <div className={s.tariffs}>
                {BUYER_TARIFFS.map((t, i) => (
                  <details key={t.id} className={s.tariff} open={i < 2}>
                    <summary className={s.tariffHead}>
                      <span>{t.name}</span>
                      <span className={s.tariffFrom}>
                        от {rate(Math.min(...t.bands.filter((b) => !b.perM3).map((b) => b.usd)))}
                      </span>
                    </summary>
                    <table className={s.table}>
                      <thead>
                        <tr>
                          <th>{t.kind === 'density' ? 'Плотность' : 'Вес груза'}</th>
                          <th>Ставка</th>
                        </tr>
                      </thead>
                      <tbody>
                        {t.bands.map((b) => (
                          <tr key={`${b.from}-${b.to}`}>
                            <td>{bandLabel(b, t.kind)}</td>
                            <td>{rate(b.usd, b.perM3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </details>
                ))}
              </div>

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
                Упаковка — за место. Разгрузка на складе — от 4,30 $ (0,03 м³) до 22 $ (1,5 м³).
                Фотоотчёт бесплатно.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}>
          <section className={sl.steps}>
            <div className={sl.stepsInner}>
              <h2 className={sl.h2}>Как работает карго TaoPost</h2>
              <ol className={sl.stepsList}>
                {STEPS.map((step, i) => (
                  <li key={step.title} className={sl.step}>
                    <span className={sl.stepNum}>{i + 1}</span>
                    <div>
                      <h3 className={sl.stepTitle}>{step.title}</h3>
                      <p className={sl.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </FadeIn>

        <section id="opt-form" className={s.section}>
          <div className={s.formWrap}>
            <B2BForm variant="opt" />
          </div>
        </section>

        <FadeIn delay={50}>
          <section className={s.section}>
            <div className={s.inner}>
              <div className={s.retail}>
                <div>
                  <h2 className={s.retailTitle}>Закупка меньше {MIN_GOODS} ₽?</h2>
                  <p className={s.retailText}>
                    Для небольших заказов — розничное карго из Китая от 1 кг: 450 ₽/кг на любой вес,
                    объёмный вес не считаем, упаковка входит в цену.
                  </p>
                </div>
                <Link href="/tarify" className={s.btnGhost}>Розничные тарифы</Link>
              </div>
            </div>
          </section>
        </FadeIn>

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
