'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    question: 'Как долго идёт доставка из Китая?',
    answer: 'В среднем 15–25 дней с момента отправки с нашего склада в Гуанчжоу. Срок зависит от выбранного способа доставки и вашего региона. Авиадоставка быстрее (3–5 дней), автодоставка дешевле.',
  },
  {
    question: 'Сколько стоит доставка из Китая?',
    answer: 'Автодоставка — от 350 ₽/кг, авиадоставка — от 2 700 ₽/кг. Точная стоимость зависит от веса, объёма и категории товара. Стоимость считается по большему из фактического и объёмного веса.',
  },
  {
    question: 'Как оплатить товары на китайских маркетплейсах?',
    answer: 'Вам не нужна китайская карта или аккаунт — мы делаем всё за вас. Вы оплачиваете нам в рублях по выставленному счёту, а мы выкупаем товар в Китае на наши юани.',
  },
  {
    question: 'Платится ли таможенная пошлина?',
    answer: 'Для большинства посылок физлиц до 200 € стоимости и до 31 кг веса пошлина не взимается. Если порог превышен — оплачивается 15% с суммы превышения. Все вопросы по таможне берём на себя: рассчитаем заранее и подскажем, как разделить заказы выгоднее.',
  },
  {
    question: 'Можно ли заказать несколько товаров из разных магазинов?',
    answer: 'Да, мы объединяем несколько заказов из разных магазинов в одну посылку. Это называется консолидация — платите за доставку один раз, экономите на упаковке и тарифе.',
  },
  {
    question: 'Что если товар пришёл повреждённым или не тем?',
    answer: 'Мы проверяем товары на складе в Гуанчжоу и фотографируем их по запросу до отправки. Если что-то не так — поможем оформить возврат продавцу или компенсацию. Все посылки идут со страховкой 2%.',
  },
  {
    question: 'Можно ли вернуть товар или поменять размер?',
    answer: 'До отправки со склада в Китае — да, поможем вернуть или обменять у продавца. После выезда из Китая возврат возможен только в случае повреждения или брака по страховке.',
  },
  {
    question: 'Что делать, если посылка задержалась или потерялась?',
    answer: 'Все посылки отслеживаются — статус виден в личном кабинете. При задержке свыше срока менеджер сам выходит на связь и разбирается с перевозчиком. В случае утери страховка покрывает стоимость товара.',
  },
  {
    question: 'Какие товары нельзя привезти?',
    answer: 'Не перевозим товары, запрещённые к ввозу в РФ: оружие, наркотические вещества, поддельный люкс с явными признаками контрафакта, скоропортящиеся продукты, литий-ионные аккумуляторы свыше нормы. Полный список уточняйте у менеджера.',
  },
  {
    question: 'С каких маркетплейсов вы выкупаете?',
    answer: 'Taobao, Tmall, Poizon (得物), Pinduoduo, 1688, Goofish (Xianyu) и другие китайские площадки. Если ссылка ведёт на любой китайский сайт — мы скорее всего сможем выкупить.',
  },
  {
    question: 'Есть ли ограничение по весу?',
    answer: 'Минимальный вес посылки — 0,5 кг (тариф рассчитывается от 1 кг). Максимального ограничения нет — везём как маленькие посылки, так и контейнеры под бизнес.',
  },
  {
    question: 'Как отследить мою посылку?',
    answer: 'В личном кабинете приложения TaoPost вы видите статус каждого заказа в реальном времени: выкуп, приёмка на складе в Китае, отправка, прохождение границы, доставка по РФ.',
  },
  {
    question: 'В какие города России доставляете?',
    answer: 'Доставляем по всей России: Москва, Санкт-Петербург, Новосибирск, Екатеринбург, Казань, Красноярск, Нижний Новгород, Челябинск, Уфа, Ростов-на-Дону, Краснодар, Воронеж и другие города — через СДЭК, Boxberry или курьером до двери.',
  },
  {
    question: 'Как с вами связаться?',
    answer: 'Пишите нам в Telegram — отвечаем в среднем за 5 минут. Также можно оставить заявку через калькулятор на сайте или зарегистрироваться в личном кабинете, чтобы оформить заказ онлайн.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="tp-section">
      <div className="tp-mesh tp-mesh--green tp-mesh--tl" />
      <div className="tp-mesh tp-mesh--coral tp-mesh--br" />

      <div className="faq__wrap">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            FAQ
          </span>
          <h2 className="tp-h2">
            Частые <span className="tp-gradient-text">вопросы</span>
          </h2>
          <p className="tp-lede">
            Не нашли ответ? Напишите нам в Telegram — ответим за несколько минут
          </p>
        </div>

        <div className="faq__list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="faq__trigger"
                  aria-expanded={isOpen}
                >
                  <span className="faq__q">{faq.question}</span>
                  <span className="faq__toggle" aria-hidden>
                    <Plus size={20} strokeWidth={2.5} />
                  </span>
                </button>
                <div className={`faq__panel${isOpen ? ' faq__panel--open' : ''}`}>
                  <div className="faq__a">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .faq__wrap {
          max-width: 820px;
          margin: 0 auto;
          position: relative;
        }
        .faq__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq__item {
          background: #fff;
          border-radius: 18px;
          border: 1px solid rgba(10,15,28,0.06);
          overflow: hidden;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .faq__item--open {
          border-color: rgba(27,158,126,0.25);
          box-shadow: 0 18px 42px -22px rgba(10,15,28,0.18);
        }

        .faq__trigger {
          width: 100%;
          padding: 22px 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          text-align: left;
          font-family: inherit;
        }
        .faq__q {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.4;
          letter-spacing: -0.2px;
          transition: color .2s;
        }
        .faq__item--open .faq__q { color: var(--green-dark); }

        .faq__toggle {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: #F3F4F6;
          color: #6B7280;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all .25s ease;
        }
        .faq__item--open .faq__toggle {
          background: linear-gradient(135deg, var(--green), var(--green-dark));
          color: #fff;
          transform: rotate(45deg);
        }

        .faq__panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .28s ease;
        }
        .faq__panel--open { grid-template-rows: 1fr; }
        .faq__panel > .faq__a {
          overflow: hidden;
        }
        .faq__a {
          padding: 0 24px 22px;
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .faq__trigger { padding: 20px 20px; }
          .faq__a { padding: 0 20px 20px; }
        }
      `}</style>
    </section>
  );
}
