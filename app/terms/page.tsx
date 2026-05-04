import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Пользовательское соглашение — TaoPost',
  description: 'Пользовательское соглашение сервиса TaoPost — условия предоставления услуг доставки из Китая в Россию',
};

export default function TermsPage() {
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
              Tao<span style={{ color: '#1B9E7E' }}>Post</span>
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e8f7f3', color: '#1B9E7E',
              borderRadius: '50px', padding: '6px 14px',
              fontSize: '13px', fontWeight: 700, marginBottom: '16px',
              border: '1px solid #c6ede4',
            }}>
              Документ
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '12px' }}>
              Пользовательское соглашение
            </h1>
            <p style={{ fontSize: '15px', color: '#9CA3AF' }}>
              Последнее обновление: апрель 2026 года
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', border: '1px solid #F3F4F6', lineHeight: 1.8 }}>

            <Section title="1. Общие положения">
              <p>Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между сервисом TaoPost (далее — «Сервис»), доступным по адресу taopost.ru, и пользователем (далее — «Пользователь»), возникающие при использовании Сервиса.</p>
              <p>Используя Сервис, Пользователь подтверждает согласие с условиями настоящего Соглашения. В случае несогласия использование Сервиса должно быть прекращено.</p>
            </Section>

            <Section title="2. Предмет соглашения">
              <p>Сервис оказывает услуги по выкупу и доставке товаров с китайских маркетплейсов (Taobao, Poizon, Pinduoduo, 1688, Tmall, Goofish и др.) в Россию.</p>
              <p>В рамках оказываемых услуг Сервис:</p>
              <ul>
                <li>Принимает заявки на выкуп товаров от Пользователя;</li>
                <li>Осуществляет покупку товара у продавца в Китае;</li>
                <li>Принимает товар на свой склад в Гуанчжоу;</li>
                <li>Производит проверку и упаковку товара;</li>
                <li>Доставляет товар Пользователю в Россию автомобильным или авиа-маршрутом.</li>
              </ul>
            </Section>

            <Section title="3. Стоимость услуг">
              <p>Стоимость услуг включает:</p>
              <ul>
                <li>Стоимость самого товара у продавца в Китае;</li>
                <li>Доставку до склада Сервиса в Китае (если применимо);</li>
                <li>Доставку из Китая в Россию по тарифу, действующему на момент оформления заказа;</li>
                <li>Доставку до пункта выдачи или адреса Пользователя в России.</li>
              </ul>
              <p>Сервис не взимает комиссию за выкуп товара. Актуальные тарифы публикуются на сайте taopost.ru.</p>
            </Section>

            <Section title="4. Права и обязанности Сервиса">
              <p>Сервис обязуется:</p>
              <ul>
                <li>Качественно и своевременно оказывать услуги;</li>
                <li>Информировать Пользователя о статусе заказа;</li>
                <li>Сохранять конфиденциальность данных Пользователя;</li>
                <li>Соблюдать таможенное и налоговое законодательство РФ.</li>
              </ul>
              <p>Сервис вправе:</p>
              <ul>
                <li>Отказать в выкупе товара, если он попадает под ограничения для ввоза в РФ;</li>
                <li>Изменять тарифы, уведомив Пользователя до оформления нового заказа;</li>
                <li>Приостановить оказание услуг при нарушении Пользователем условий Соглашения.</li>
              </ul>
            </Section>

            <Section title="5. Права и обязанности Пользователя">
              <p>Пользователь обязуется:</p>
              <ul>
                <li>Предоставлять достоверные данные при оформлении заказа;</li>
                <li>Своевременно оплачивать услуги Сервиса;</li>
                <li>Не заказывать товары, запрещённые к ввозу в РФ;</li>
                <li>Получать посылку в установленные сроки.</li>
              </ul>
              <p>Пользователь вправе:</p>
              <ul>
                <li>Получать актуальную информацию о статусе заказа;</li>
                <li>Запросить фото-проверку товара перед отправкой;</li>
                <li>Обратиться в поддержку в любое время.</li>
              </ul>
            </Section>

            <Section title="6. Доставка и сроки">
              <p>Сроки доставки зависят от выбранного маршрута:</p>
              <ul>
                <li>Автомобильная доставка из Китая в Россию — 12–25 дней, в зависимости от города назначения;</li>
                <li>Авиа-доставка — 7–15 дней.</li>
              </ul>
              <p>Указанные сроки являются ориентировочными и могут быть изменены вследствие обстоятельств, не зависящих от Сервиса (задержки на таможне, форс-мажор и пр.).</p>
            </Section>

            <Section title="7. Ответственность сторон">
              <p>Сервис несёт ответственность за сохранность товара с момента приёмки на склад в Китае до момента передачи транспортной компании в России.</p>
              <p>В случае утраты или повреждения товара по вине Сервиса возмещение производится в пределах объявленной стоимости товара или на условиях оформленной страховки.</p>
              <p>Сервис не несёт ответственности за качество товара, поставленного китайским продавцом, если брак не был выявлен при приёмке на склад.</p>
            </Section>

            <Section title="8. Возвраты и отказы">
              <p>Возврат товара осуществляется в соответствии с правилами китайского продавца. Сервис содействует в организации возврата, но не гарантирует его выполнение.</p>
              <p>Стоимость доставки в случае возврата товара несёт Пользователь, если иное не предусмотрено отдельным соглашением.</p>
            </Section>

            <Section title="9. Запрещённые к доставке товары">
              <p>Сервис не доставляет:</p>
              <ul>
                <li>Оружие, боеприпасы, взрывчатые и легковоспламеняющиеся вещества;</li>
                <li>Наркотические средства и психотропные вещества;</li>
                <li>Контрафактные и поддельные товары;</li>
                <li>Товары, запрещённые к ввозу в РФ согласно действующему законодательству.</li>
              </ul>
            </Section>

            <Section title="10. Контакты">
              <p>По вопросам, связанным с оказанием услуг, обращайтесь:</p>
              <ul>
                <li>Email: <a href="mailto:info@taopost.ru" style={{ color: '#1B9E7E' }}>info@taopost.ru</a></li>
                <li>Email (обращения и жалобы): <a href="mailto:help@taopost.ru" style={{ color: '#1B9E7E' }}>help@taopost.ru</a></li>
                <li>Telegram: <a href="https://t.me/taopost" style={{ color: '#1B9E7E' }}>@taopost</a></li>
              </ul>
            </Section>

            <Section title="11. Изменения соглашения">
              <p>Сервис оставляет за собой право вносить изменения в настоящее Соглашение. Актуальная версия всегда доступна по адресу taopost.ru/terms.</p>
            </Section>

          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/" style={{
              display: 'inline-block', padding: '14px 32px',
              background: 'linear-gradient(135deg, #1B9E7E, #0D7A5F)',
              color: 'white', fontWeight: 700, fontSize: '15px',
              borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(27,158,126,0.3)',
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
