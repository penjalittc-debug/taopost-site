import Link from 'next/link';
import LegalLayout, { LegalSection as Section } from '@/components/LegalLayout';

export const metadata = {
  title: 'Мобильное приложение — TaoPost',
  description: 'Официальное мобильное приложение TaoPost для iPhone и Android: заказы, отслеживание посылок, оплата и чат с поддержкой.',
  alternates: { canonical: 'https://taopost.ru/prilozhenie' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Мобильное приложение — TaoPost',
    description: 'Официальное приложение TaoPost для iPhone и Android.',
    url: 'https://taopost.ru/prilozhenie',
    siteName: 'TaoPost',
    locale: 'ru_RU',
    type: 'website',
  },
};

// Страница-подтверждение для App Review (Guideline 4.1(b), 01.11.2026): связывает
// приложение в магазинах с компанией с сайта. Разбор — org/06-it/14-app-store-relaunch.md
// в репо приложения. Когда приложение появится в магазинах — заменить «готовится
// к публикации» на ссылки.
export default function PrilozheniePage() {
  return (
    <LegalLayout pill="Приложение" title="Мобильное приложение TaoPost" wide>
      <Section title="Официальное приложение">
        <p>
          «TaoPost — доставка из Китая» — официальное мобильное приложение сервиса TaoPost для iPhone и Android.
          Правообладатель и оператор сервиса — компания 广州亚世名进出口有限公司 (Guangzhou Yashiming Import &amp;
          Export Co., Ltd., регистрационный код КНР 91440100MAEGJX2C1Y). <a href="/certificate.jpg" target="_blank"
          rel="noopener noreferrer">Бизнес-лицензия компании</a>.
        </p>
        <p>
          Приложение работает только с нашим собственным сервером app.taopost.ru — это тот же личный кабинет,
          что и на сайте.
        </p>
      </Section>

      <Section title="Где скачать">
        <ul>
          <li><strong>iPhone</strong> — App Store, готовится к публикации.</li>
          <li><strong>Android</strong> — Google Play и RuStore, готовится к публикации.</li>
          <li>
            <strong>Уже сейчас</strong> — веб-версия <a href="https://app.taopost.ru/?src=site" target="_blank"
            rel="noopener noreferrer">app.taopost.ru</a>. Её можно добавить на экран «Домой» и пользоваться как
            приложением.
          </li>
        </ul>
      </Section>

      <Section title="Что можно делать в приложении">
        <ul>
          <li>Оформить выкуп товара с китайских площадок или доставку своих посылок.</li>
          <li>Отслеживать каждую посылку: от склада в Китае до выдачи в России.</li>
          <li>Смотреть фото товаров со склада, оплачивать счета, получать уведомления.</li>
          <li>Писать в поддержку в чате.</li>
        </ul>
      </Section>

      <Section title="Независимость">
        <p>
          TaoPost — независимый агент по выкупу и доставке. Мы не связаны с Taobao, Tmall, 1688, Pinduoduo, Poizon,
          Alibaba и другими площадками и не являемся их представителем.
        </p>
      </Section>

      <Section title="Поддержка">
        <p>
          Вопросы по приложению — <a href="mailto:support@taopost.ru">support@taopost.ru</a> или в чате приложения.
          Реквизиты и адреса — на странице <Link href="/kontakty">«Контакты»</Link>.
        </p>
      </Section>

      <Section title="In English">
        <p>
          &laquo;TaoPost&raquo; is the official mobile app of the TaoPost service for iPhone and Android. The service and
          the TaoPost brand are operated by Guangzhou Yashiming Import &amp; Export Co., Ltd. (Unified Social Credit Code
          91440100MAEGJX2C1Y), see the <a href="/certificate.jpg" target="_blank" rel="noopener noreferrer">business
          license</a>. The app connects only to our own backend at app.taopost.ru. TaoPost is an independent purchasing
          and shipping agent and is not affiliated with Taobao, Tmall, 1688, Pinduoduo, Poizon or Alibaba.
          Contact: support@taopost.ru.
        </p>
      </Section>
    </LegalLayout>
  );
}
