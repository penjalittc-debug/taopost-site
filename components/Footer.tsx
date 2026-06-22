'use client';
import Image from 'next/image';
import { Send, MessageCircle, BookOpen, Smartphone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'О компании', href: '#about' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Маркетплейсы', href: '#marketplaces' },
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Как заказать из Китая', href: '/kak-zakazat-iz-kitaya', Icon: BookOpen },
  { label: 'Блог', href: '/blog', Icon: BookOpen },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contacts" className="ftr">
      <div className="ftr__orb ftr__orb--tr" />
      <div className="ftr__orb ftr__orb--bl" />

      <div className="ftr__inner">
        <div className="ftr__grid">
          <div className="ftr__brandCol">
            <div className="ftr__brand">
              <Image src="/logo.png" alt="TaoPost" width={40} height={40} style={{ objectFit: 'contain' }} />
              <span className="ftr__brandName">
                Tao<span className="ftr__brandAccent">Post</span>
              </span>
            </div>
            <p className="ftr__about">
              Официальная доставка товаров из Китая в Россию. Работаем с крупнейшими китайскими маркетплейсами.
            </p>
            <div className="ftr__socials">
              <a
                href="https://t.me/taopostsupport"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr__socBtn ftr__socBtn--tg"
                aria-label="Telegram"
                data-ym-goal="channel_click"
                data-ym-params='{"place":"footer"}'
              >
                <Send size={18} strokeWidth={2.3} />
              </a>
              <a
                href="https://t.me/taopostsupport?start=site"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr__socBtn ftr__socBtn--msg"
                aria-label="Написать менеджеру"
                data-ym-goal="telegram_click"
                data-ym-params='{"place":"footer"}'
              >
                <MessageCircle size={18} strokeWidth={2.3} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="ftr__colTitle">Навигация</h4>
            <div className="ftr__links">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="ftr__link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="ftr__colTitle">Контакты</h4>
            <div className="ftr__contacts">
              <div className="ftr__contact">
                <div className="ftr__contactLabel">Телефон</div>
                <a href="tel:+79772767778" className="ftr__contactValue" data-ym-goal="phone_click" data-ym-params='{"place":"footer"}'>+7 977 276 77 78</a>
              </div>
              <div className="ftr__contact">
                <div className="ftr__contactLabel">Telegram (менеджер)</div>
                <a
                  href="https://t.me/taopostsupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr__contactValue ftr__contactValue--accent"
                  data-ym-goal="telegram_click"
                  data-ym-params='{"place":"footer_contacts"}'
                >
                  @taopostsupport
                </a>
              </div>
              <div className="ftr__contact">
                <div className="ftr__contactLabel">Email — сотрудничество</div>
                <a href="mailto:info@taopost.ru" className="ftr__contactValue">info@taopost.ru</a>
              </div>
              <div className="ftr__contact">
                <div className="ftr__contactLabel">Email — обращения и жалобы</div>
                <a href="mailto:help@taopost.ru" className="ftr__contactValue">help@taopost.ru</a>
              </div>

              <div className="ftr__warehouse">
                <div className="ftr__warehouseHead">
                  <span className="ftr__warehouseFlag" aria-hidden="true">🇨🇳</span>
                  <div>
                    <div className="ftr__warehouseTitle">Склад в Китае · Карго 778</div>
                    <div className="ftr__warehouseSub">Офис TaoPost · Гуанчжоу / Фошань</div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=广东省佛山市南海区里水镇流潮社区水口大道西3号"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr__warehouseAddr"
                >
                  广东省佛山市南海区里水镇流潮社区水口大道西3号 · 905百货旁<br />
                  <span>志洋国际货运 · Открыть на карте →</span>
                </a>
                <div className="ftr__warehousePhones">
                  <a href="tel:+8618520707778" className="ftr__warehousePhone">
                    <span className="ftr__warehousePhoneLabel">Телефон офиса (Китай)</span>
                    <span className="ftr__warehousePhoneValue">+86 185 2070 7778</span>
                  </a>
                  <a href="tel:+8618302004584" className="ftr__warehousePhone">
                    <span className="ftr__warehousePhoneLabel">Для курьеров (Китай)</span>
                    <span className="ftr__warehousePhoneValue">+86 183 0200 4584</span>
                  </a>
                </div>
              </div>

              <div className="ftr__contact">
                <div className="ftr__contactLabel">
                  <Smartphone size={12} strokeWidth={2.3} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  Скачать приложение
                </div>
                <div className="ftr__apps">
                  <a href="#" className="ftr__app" aria-label="App Store">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <div>
                      <div className="ftr__appHint">Загрузить в</div>
                      <div className="ftr__appName">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="ftr__app" aria-label="Google Play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.22.99.14l.09-.05 11.29-6.52-2.5-2.5-9.87 8.93zm-1.1-19.74A1.7 1.7 0 0 0 2 4.87v14.26c0 .43.14.82.37 1.13l.07.08 7.99-7.99v-.19L2.08 4.02zm16.04 9.39-2.73-1.58-2.77 2.77 2.77 2.77 2.75-1.59c.78-.45.78-1.92-.02-2.37zM4.17.24 15.46 6.76l-2.5 2.5L2.27.38A1.16 1.16 0 0 1 4.17.24z"/></svg>
                    <div>
                      <div className="ftr__appHint">Доступно в</div>
                      <div className="ftr__appName">Google Play</div>
                    </div>
                  </a>
                  <a href="#" className="ftr__app" aria-label="AppGallery">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    <div>
                      <div className="ftr__appHint">Доступно в</div>
                      <div className="ftr__appName">AppGallery</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="ftr__certCol">
            <h4 className="ftr__colTitle">Лицензия</h4>
            <a
              href="/certificate.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="ftr__certBox"
              aria-label="Бизнес-лицензия КНР — открыть в полном размере"
            >
              <Image
                src="/certificate.jpg"
                alt="营业执照 — Бизнес-лицензия КНР компании TaoPost"
                width={1200}
                height={883}
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </a>
            <div className="ftr__certCaption">
              营业执照<br />
              <span>Бизнес-лицензия КНР</span>
            </div>
          </div>
        </div>

        <div className="ftr__divider" />

        <div className="ftr__bottom">
          <div className="ftr__copy">© {year} TaoPost. Все права защищены.</div>
          <div className="ftr__legal">
            <a href="/privacy" className="ftr__legalLink">Политика конфиденциальности</a>
            <a href="/terms" className="ftr__legalLink">Пользовательское соглашение</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ftr {
          position: relative;
          background: linear-gradient(135deg, #0A0F1C 0%, #1F2937 100%);
          color: #fff;
          padding: 72px 24px 36px;
          overflow: hidden;
          isolation: isolate;
        }
        .ftr__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          pointer-events: none;
        }
        .ftr__orb--tr {
          top: -160px; right: -140px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(0, 92, 67,0.25), transparent 65%);
        }
        .ftr__orb--bl {
          bottom: -180px; left: -120px;
          width: 460px; height: 460px;
          background: radial-gradient(circle, rgba(255, 90, 71,0.18), transparent 65%);
        }
        .ftr__inner {
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ftr__grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr auto;
          gap: 48px;
          margin-bottom: 48px;
          align-items: start;
        }
        .ftr__certCol {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .ftr__certBox {
          display: block;
          width: 140px;
          background: #fff;
          border-radius: 10px;
          padding: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transition: transform .2s ease, box-shadow .2s ease;
          overflow: hidden;
        }
        .ftr__certBox img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 6px;
        }
        .ftr__certBox:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.35);
        }
        .ftr__certCaption {
          margin-top: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #D1D5DB;
          line-height: 1.4;
        }
        .ftr__certCaption span {
          font-size: 11px;
          font-weight: 500;
          color: #9CA3AF;
        }

        .ftr__brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .ftr__brandName {
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.6px;
        }
        .ftr__brandAccent {
          background: var(--green);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .ftr__about {
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.7;
          max-width: 340px;
          margin: 0 0 24px;
        }
        .ftr__socials {
          display: flex;
          gap: 10px;
        }
        .ftr__socBtn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #D1D5DB;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all .2s ease;
        }
        .ftr__socBtn:hover {
          transform: translateY(-2px);
          color: #fff;
        }
        .ftr__socBtn--tg:hover { background: #0088cc; border-color: transparent; }
        .ftr__socBtn--msg:hover { background: var(--coral); border-color: transparent; }

        .ftr__colTitle {
          font-size: 12px;
          font-weight: 700;
          color: #F9FAFB;
          margin: 0 0 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .ftr__links {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .ftr__link {
          font-size: 14px;
          color: #9CA3AF;
          text-decoration: none;
          transition: color .15s;
        }
        .ftr__link:hover { color: var(--green); }

        .ftr__contacts {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ftr__contactLabel {
          font-size: 11.5px;
          color: #6B7280;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 600;
        }
        .ftr__contactValue {
          font-size: 14px;
          color: #D1D5DB;
          text-decoration: none;
          transition: color .15s;
        }
        .ftr__contactValue:hover { color: #fff; }
        .ftr__contactValue--accent {
          color: var(--green);
          font-weight: 600;
        }
        .ftr__contactValue--accent:hover { color: #23b892; }

        .ftr__warehouse {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 16px;
          margin-top: 4px;
        }
        .ftr__warehouseHead {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .ftr__warehouseFlag {
          font-size: 20px;
          line-height: 1;
        }
        .ftr__warehouseTitle {
          font-size: 13px;
          font-weight: 700;
          color: #F9FAFB;
          line-height: 1.3;
        }
        .ftr__warehouseSub {
          font-size: 11px;
          color: #9CA3AF;
          margin-top: 2px;
        }
        .ftr__warehouseAddr {
          display: block;
          font-size: 12.5px;
          color: #D1D5DB;
          line-height: 1.55;
          text-decoration: none;
          padding: 10px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color .15s;
        }
        .ftr__warehouseAddr:hover { color: #fff; }
        .ftr__warehouseAddr span {
          display: inline-block;
          margin-top: 4px;
          font-size: 11.5px;
          color: var(--green);
          font-weight: 600;
        }
        .ftr__warehousePhones {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }
        .ftr__warehousePhone {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .ftr__warehousePhoneLabel {
          font-size: 10.5px;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .ftr__warehousePhoneValue {
          font-size: 14px;
          color: #D1D5DB;
          font-weight: 600;
          transition: color .15s;
        }
        .ftr__warehousePhone:hover .ftr__warehousePhoneValue { color: #fff; }

        .ftr__apps {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 6px;
        }
        .ftr__app {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 9px 13px;
          text-decoration: none;
          color: #fff;
          transition: all .2s ease;
        }
        .ftr__app:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
        .ftr__appHint {
          font-size: 9px;
          color: #9CA3AF;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .ftr__appName {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 3px;
        }

        .ftr__divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 24px;
        }

        .ftr__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }
        .ftr__copy {
          font-size: 13px;
          color: #6B7280;
        }
        .ftr__legal {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        .ftr__legalLink {
          font-size: 13px;
          color: #6B7280;
          text-decoration: none;
          transition: color .15s;
        }
        .ftr__legalLink:hover { color: #D1D5DB; }

        @media (max-width: 900px) {
          .ftr__grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .ftr__brandCol { grid-column: 1 / -1; }
          .ftr__certCol { grid-column: 1 / -1; }
          .ftr__certBox { width: 120px; }
        }
        @media (max-width: 560px) {
          .ftr__grid { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>
    </footer>
  );
}
