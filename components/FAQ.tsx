'use client';
import { useState } from 'react';

const FAQS = [
  {
    question: 'Как долго идёт доставка из Китая?',
    answer: 'В среднем 15–25 дней с момента отправки с нашего склада в Гуанчжоу. Срок зависит от выбранного способа доставки и вашего региона. Авиадоставка быстрее, автодоставка дешевле.',
  },
  {
    question: 'Как оплатить товары на китайских маркетплейсах?',
    answer: 'Вам не нужна китайская карта или аккаунт — мы делаем всё за вас. Вы оплачиваете нам рублями или долларами, а мы выкупаем товар в Китае.',
  },
  {
    question: 'Можно ли заказать несколько товаров из разных магазинов?',
    answer: 'Да, мы объединяем несколько заказов из разных магазинов в одну посылку. Это называется консолидация — платите за доставку один раз.',
  },
  {
    question: 'Что если товар пришёл повреждённым или не тем?',
    answer: 'Мы проверяем товары на складе в Китае и фотографируем их по запросу. В случае проблем поможем оформить возврат или компенсацию у продавца.',
  },
  {
    question: 'Какие товары нельзя привезти?',
    answer: 'Не перевозим товары, запрещённые к ввозу в Россию: оружие, наркотики, поддельные брендовые товары с подозрительными сертификатами, скоропортящиеся продукты. Полный список уточняйте у менеджера.',
  },
  {
    question: 'Есть ли ограничение по весу?',
    answer: 'Принимаем посылки любого веса. Минимального и максимального ограничений нет — уточняйте стоимость в зависимости от веса у менеджера.',
  },
  {
    question: 'Как отследить мою посылку?',
    answer: 'В личном кабинете приложения TaoPost вы видите статус каждого заказа в реальном времени: от склада в Китае до доставки вам на руки.',
  },
  {
    question: 'Как с вами связаться?',
    answer: 'Пишите нам в Telegram — отвечаем быстро. Также можно оставить заявку через форму на сайте или зарегистрироваться в личном кабинете.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '80px 24px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700,
            marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            FAQ
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}>
            Частые вопросы
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.7 }}>
            Не нашли ответ? Напишите нам в Telegram — ответим за несколько минут
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: isOpen ? '1px solid #c6ede4' : '1px solid #F3F4F6',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: isOpen ? '#1B9E7E' : '#111827',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    fontSize: '20px',
                    color: isOpen ? '#1B9E7E' : '#9CA3AF',
                    transition: 'transform 0.2s, color 0.2s',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    flexShrink: 0,
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px',
                    fontSize: '15px',
                    color: '#6B7280',
                    lineHeight: 1.7,
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
