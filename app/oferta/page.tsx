import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Договор-оферта — TaoPost',
  description: 'Публичный договор-оферта на оказание услуг по выкупу и доставке товаров из Китая в Россию. ООО «АЗИЗОВ ГРУПП», ИНН 9721235929.',
  alternates: { canonical: 'https://taopost.ru/oferta' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Договор-оферта — TaoPost',
    description: 'Публичный договор на оказание услуг доставки из Китая.',
    url: 'https://taopost.ru/oferta',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function OfertaPage() {
  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image src="/logo.png" alt="TaoPost" width={36} height={36} style={{ objectFit: 'contain' }} priority />
            <span style={{ fontWeight: 800, fontSize: '20px', color: '#111827', letterSpacing: '-0.5px' }}>
              Tao<span style={{ color: '#005C43' }}>Post</span>
            </span>
          </Link>
          <Link href="/" style={{
            padding: '10px 22px',
            background: '#F9FAFB',
            color: '#374151',
            fontWeight: 700,
            fontSize: '14px',
            borderRadius: '50px',
            textDecoration: 'none',
            border: '2px solid #E5E7EB',
          }}>
            ← На главную
          </Link>
        </div>
      </header>

      <main style={{ padding: '60px 24px 80px', background: '#F9FAFB', minHeight: '100vh' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#005C43',
              borderRadius: '50px', padding: '6px 14px',
              fontSize: '13px', fontWeight: 700, marginBottom: '16px',
              border: '1px solid #c6ede4',
            }}>
              Документ
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '12px' }}>
              Публичный договор-оферта
            </h1>
            <p style={{ fontSize: '15px', color: '#9CA3AF' }}>
              Действует с 1 августа 2026 года
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', border: '1px solid #F3F4F6', lineHeight: 1.8 }}>

            <Section title="1. Общие положения">
              <p>
                Настоящий документ является публичной офертой (далее — «Оферта») в соответствии со ст. 435, 437 Гражданского кодекса РФ и адресован любому физическому или юридическому лицу (далее — «Заказчик»),
                выразившему намерение воспользоваться услугами Исполнителя.
              </p>
              <p>
                <strong>Исполнитель:</strong> ООО «АЗИЗОВ ГРУПП» (ИНН 9721235929, ОГРН 1247700473921),
                выступающий представителем и партнёром компании 广州亚世名进出口有限公司
                (Guangzhou Yashiming Import &amp; Export Co., Ltd., регистрационный код КНР 91440100MAEGJX2C1Y),
                осуществляющей физический выкуп и перевозку товаров на территории КНР.
              </p>
              <p>
                Акцептом настоящей Оферты (полным и безоговорочным принятием её условий) является совершение Заказчиком одного из действий:
                оформление заявки на сайте taopost.ru, направление сообщения менеджеру в Telegram
                @taopostsupport или оплата счёта, выставленного Исполнителем.
              </p>
            </Section>

            <Section title="2. Предмет договора">
              <p>Исполнитель обязуется по поручению Заказчика:</p>
              <ul>
                <li>принять заявку на выкуп и доставку товара с китайских маркетплейсов
                  (Taobao, Poizon, Pinduoduo, 1688, Tmall, Goofish и др.);</li>
                <li>организовать выкуп товара у продавца в КНР;</li>
                <li>принять товар на склад партнёра в Гуанчжоу / Фошани, произвести проверку и упаковку;</li>
                <li>организовать доставку товара в Российскую Федерацию до пункта выдачи или адреса Заказчика.</li>
              </ul>
              <p>Заказчик обязуется принять и оплатить услуги на условиях настоящей Оферты.</p>
            </Section>

            <Section title="3. Стоимость услуг и порядок расчётов">
              <p>Стоимость услуг рассчитывается индивидуально по каждой заявке и включает:</p>
              <ul>
                <li>стоимость товара у продавца в КНР;</li>
                <li>внутрикитайскую доставку до склада (если применимо);</li>
                <li>международную доставку по действующему тарифу (автомобильная — от 350 ₽/кг, авиа — от 2 700 ₽/кг);</li>
                <li>страховку 2 % от заявленной стоимости товара (по желанию Заказчика);</li>
                <li>доставку по территории РФ до пункта выдачи или адреса Заказчика.</li>
              </ul>
              <p>Актуальные тарифы публикуются на странице <Link href="/tarify" style={{ color: '#005C43' }}>taopost.ru/tarify</Link>. Оплата производится в рублях РФ на реквизиты Исполнителя после согласования сметы. Комиссия за выкуп для одиночных заказов с Taobao, Poizon, Pinduoduo, Tmall не взимается; для оптовых закупок с 1688 применяется комиссия от 3 % (мин. 1 500 ₽).</p>
            </Section>

            <Section title="4. Сроки оказания услуг">
              <p>Сроки доставки от склада в Гуанчжоу до Заказчика в РФ:</p>
              <ul>
                <li>автомобильная — 15–25 календарных дней;</li>
                <li>авиа — 3–5 календарных дней;</li>
                <li>внутренняя доставка по РФ — согласно тарифам транспортных компаний.</li>
              </ul>
              <p>Указанные сроки ориентировочные и могут быть увеличены вследствие таможенных проверок, задержек транспортных компаний, форс-мажорных обстоятельств.</p>
            </Section>

            <Section title="5. Права и обязанности сторон">
              <p><strong>Исполнитель обязуется:</strong></p>
              <ul>
                <li>качественно и в согласованные сроки оказать услуги;</li>
                <li>информировать Заказчика о статусе заказа;</li>
                <li>сохранять конфиденциальность персональных данных Заказчика в соответствии с
                  <Link href="/privacy" style={{ color: '#005C43' }}> Политикой конфиденциальности</Link>;</li>
                <li>по запросу предоставлять фото-отчёт со склада до отправки в РФ.</li>
              </ul>
              <p><strong>Исполнитель вправе:</strong></p>
              <ul>
                <li>отказать в оказании услуги, если товар запрещён к ввозу в РФ или относится к категории риска;</li>
                <li>изменять тарифы с обязательным уведомлением до подтверждения новой заявки;</li>
                <li>приостановить оказание услуг при нарушении условий Оферты Заказчиком.</li>
              </ul>
              <p><strong>Заказчик обязуется:</strong></p>
              <ul>
                <li>предоставлять достоверные контактные и адресные данные;</li>
                <li>своевременно оплачивать выставленные счета;</li>
                <li>не заказывать товары, запрещённые к ввозу в РФ действующим законодательством;</li>
                <li>получить посылку в пункте выдачи в установленные сроки.</li>
              </ul>
            </Section>

            <Section title="6. Ответственность сторон">
              <p>Исполнитель несёт ответственность за сохранность товара с момента приёмки на склад в КНР до передачи транспортной компании в РФ. При утрате/повреждении по вине Исполнителя возмещение производится в пределах объявленной стоимости товара или в размере оформленной страховки.</p>
              <p>Исполнитель не несёт ответственности за качество товара, поставленного китайским продавцом, если брак не мог быть выявлен визуальным осмотром при приёмке; за задержки таможенных органов; за отказы транспортных компаний, вызванные форс-мажором.</p>
              <p>Заказчик несёт ответственность за достоверность предоставленных данных и за законность заказанных к перевозке товаров.</p>
            </Section>

            <Section title="7. Возвраты и претензии">
              <p>Претензии по качеству и комплектности принимаются на email
                <a href="mailto:help@taopost.ru" style={{ color: '#005C43' }}> help@taopost.ru</a> в течение
                14 календарных дней с даты получения посылки Заказчиком. К обращению прилагаются фото/видео товара
                и упаковки. Возврат товара китайскому продавцу осуществляется по правилам последнего;
                Исполнитель содействует в организации возврата, но не гарантирует его.</p>
            </Section>

            <Section title="8. Персональные данные">
              <p>Оператор персональных данных — ООО «АЗИЗОВ ГРУПП». Обработка производится в соответствии с
                Федеральным законом № 152-ФЗ и
                <Link href="/privacy" style={{ color: '#005C43' }}> Политикой конфиденциальности</Link>, размещённой
                на сайте taopost.ru/privacy.</p>
            </Section>

            <Section title="9. Срок действия и изменения">
              <p>Оферта действует бессрочно с даты, указанной в её начале. Исполнитель вправе вносить изменения — новая редакция публикуется на taopost.ru/oferta и вступает в силу с даты публикации. По уже принятым к исполнению заявкам действуют условия редакции, актуальной на момент акцепта.</p>
            </Section>

            <Section title="10. Реквизиты Исполнителя">
              <ul>
                <li><strong>Полное наименование:</strong> Общество с ограниченной ответственностью «АЗИЗОВ ГРУПП»</li>
                <li><strong>Сокращённое наименование:</strong> ООО «АЗИЗОВ ГРУПП»</li>
                <li><strong>ИНН / КПП:</strong> 9721235929 / 772101001</li>
                <li><strong>ОГРН:</strong> 1247700473921</li>
                <li><strong>Юридический адрес:</strong> 109428, г. Москва, вн. тер. г. муниципальный округ Рязанский, ул. 2-я Институтская, д. 6, стр. 15</li>
                <li><strong>Email:</strong> <a href="mailto:info@taopost.ru" style={{ color: '#005C43' }}>info@taopost.ru</a></li>
                <li><strong>Партнёр в КНР (выкуп/склад):</strong> Guangzhou Yashiming Import &amp; Export Co., Ltd. (广州亚世名进出口有限公司), рег. код КНР 91440100MAEGJX2C1Y</li>
              </ul>
            </Section>

          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/" style={{
              display: 'inline-block', padding: '14px 32px',
              background: 'linear-gradient(135deg, #005C43, #004232)',
              color: 'white', fontWeight: 700, fontSize: '15px',
              borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 92, 67,0.3)',
            }}>
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #F3F4F6' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>
    </div>
  );
}
