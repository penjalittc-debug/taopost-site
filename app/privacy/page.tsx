import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Политика конфиденциальности — TaoPost',
  description: 'Политика конфиденциальности сервиса TaoPost — как мы обрабатываем персональные данные клиентов.',
  alternates: { canonical: 'https://taopost.ru/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Политика конфиденциальности — TaoPost',
    description: 'Как TaoPost обрабатывает персональные данные клиентов.',
    url: 'https://taopost.ru/privacy',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Title */}
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
              Политика конфиденциальности
            </h1>
            <p style={{ fontSize: '15px', color: '#9CA3AF' }}>
              Последнее обновление: апрель 2026 года
            </p>
          </div>

          {/* Content */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', border: '1px solid #F3F4F6', lineHeight: 1.8 }}>

            <Section title="1. Общие положения">
              <p>Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сервиса TaoPost (далее — «Сервис»), доступного по адресу taopost.ru, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
              <p><strong>Оператор персональных данных:</strong> Общество с ограниченной ответственностью «АЗИЗОВ ГРУПП» (сокращённо — ООО «АЗИЗОВ ГРУПП»), ИНН 9721235929, ОГРН 1247700473921, юридический адрес: 109428, г. Москва, ул. 2-я Институтская, д. 6, стр. 15.</p>
              <p><strong>Партнёр по логистике (выкуп и приёмка товара в КНР):</strong> Guangzhou Yashiming Import &amp; Export Co., Ltd. (广州亚世名进出口有限公司), регистрационный код КНР 91440100MAEGJX2C1Y. Персональные данные передаются партнёру только в объёме, необходимом для выкупа и доставки конкретной посылки (ФИО получателя, контактный телефон, адрес доставки).</p>
              <p>Оформляя заявку или ставя отметку о согласии в форме на сайте, вы предоставляете Оператору согласие на обработку персональных данных в объёме и на условиях, изложенных в настоящей Политике.</p>
            </Section>

            <Section title="2. Какие данные мы собираем">
              <p>Мы можем собирать следующие виды персональных данных:</p>
              <ul>
                <li><strong>Контактные данные:</strong> имя, номер телефона, адрес электронной почты.</li>
                <li><strong>Данные для доставки:</strong> почтовый адрес, индекс, город.</li>
                <li><strong>Данные об использовании:</strong> IP-адрес, тип браузера, страницы сайта, время посещения.</li>
                <li><strong>Данные о заказах:</strong> состав заказа, история доставок, переписка с менеджерами.</li>
              </ul>
            </Section>

            <Section title="3. Цели обработки данных">
              <p>Ваши персональные данные используются в следующих целях:</p>
              <ul>
                <li>Оформление и доставка заказов;</li>
                <li>Информирование о статусе заказа;</li>
                <li>Поддержка и ответы на обращения;</li>
                <li>Улучшение качества Сервиса;</li>
                <li>Направление информационных сообщений (с вашего согласия).</li>
              </ul>
            </Section>

            <Section title="4. Хранение и защита данных">
              <p>Мы принимаем необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
              <p>Данные хранятся на защищённых серверах. Доступ к данным имеют только уполномоченные сотрудники компании.</p>
            </Section>

            <Section title="5. Передача данных третьим лицам">
              <p>Мы не продаём, не обмениваем и не передаём ваши персональные данные третьим лицам, за исключением:</p>
              <ul>
                <li>Транспортных компаний, осуществляющих доставку;</li>
                <li>Платёжных систем для проведения оплаты;</li>
                <li>Государственных органов по требованию законодательства.</li>
              </ul>
            </Section>

            <Section title="6. Cookies">
              <p>Сайт использует файлы cookies для улучшения работы и персонализации контента. Вы можете отключить cookies в настройках браузера, однако это может ограничить некоторые функции Сервиса.</p>
            </Section>

            <Section title="7. Права пользователя">
              <p>Вы имеете право:</p>
              <ul>
                <li>Запросить информацию о хранящихся данных;</li>
                <li>Потребовать исправления неточных данных;</li>
                <li>Потребовать удаления ваших данных;</li>
                <li>Отозвать согласие на обработку данных.</li>
              </ul>
              <p>Для реализации прав обратитесь к нам по адресу: <a href="mailto:info@taopost.ru" style={{ color: '#005C43' }}>info@taopost.ru</a></p>
            </Section>

            <Section title="8. Контакты">
              <p>По вопросам, связанным с обработкой персональных данных, вы можете обратиться:</p>
              <ul>
                <li>Email: <a href="mailto:info@taopost.ru" style={{ color: '#005C43' }}>info@taopost.ru</a></li>
                <li>Telegram: <a href="https://t.me/taopostsupport" style={{ color: '#005C43' }}>@taopostsupport</a></li>
              </ul>
            </Section>

            <Section title="9. Изменения политики">
              <p>Мы оставляем за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на странице taopost.ru/privacy.</p>
            </Section>

            <Section title="10. Реквизиты оператора">
              <p><strong>Оператор персональных данных:</strong></p>
              <ul>
                <li><strong>Полное наименование:</strong> Общество с ограниченной ответственностью «АЗИЗОВ ГРУПП»</li>
                <li><strong>Сокращённое наименование:</strong> ООО «АЗИЗОВ ГРУПП»</li>
                <li><strong>ИНН / КПП:</strong> 9721235929 / 772101001</li>
                <li><strong>ОГРН:</strong> 1247700473921</li>
                <li><strong>Юридический адрес:</strong> 109428, г. Москва, вн. тер. г. муниципальный округ Рязанский, ул. 2-я Институтская, д. 6, стр. 15</li>
                <li><strong>Email:</strong> <a href="mailto:info@taopost.ru" style={{ color: '#005C43' }}>info@taopost.ru</a></li>
              </ul>
              <p><strong>Партнёр по логистике в КНР:</strong></p>
              <ul>
                <li><strong>Компания:</strong> 广州亚世名进出口有限公司 (Guangzhou Yashiming Import &amp; Export Co., Ltd.)</li>
                <li><strong>Регистрационный код (КНР):</strong> 91440100MAEGJX2C1Y</li>
                <li><strong>Юридический адрес:</strong> Гуанчжоу, район Ливань, ул. Чжаньцянь, 90</li>
                <li><strong>Адрес склада:</strong> 广东省佛山市南海区里水镇流潮社区水口大道西3号 · 905百货旁 (Гуанчжоу / Фошань, КНР)</li>
              </ul>
              <p>Реестровая информация о партнёре в КНР доступна для проверки на сайте <a href="https://www.gsxt.gov.cn/" target="_blank" rel="noopener noreferrer" style={{ color: '#005C43' }}>gsxt.gov.cn</a>.</p>
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
