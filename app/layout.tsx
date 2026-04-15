import type { Metadata } from "next";
import Script from "next/script";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaoPost — Доставка из Китая в Россию | Taobao, Poizon, 1688, Pinduoduo",
  description: "Карго доставка из Китая в Россию. Выкупаем и доставляем одежду, обувь, электронику с Taobao, Poizon, Pinduoduo, 1688, Goofish. Авиа от 750₽/кг, авто от 599₽/кг. Москва, СПб, Новосибирск, Екатеринбург, Казань и все города РФ.",
  keywords: [
    "доставка из Китая",
    "карго из Китая в Россию",
    "доставка с Taobao",
    "доставка с Poizon",
    "доставка с Pinduoduo",
    "доставка с 1688",
    "выкуп товаров из Китая",
    "заказать с Taobao",
    "доставка кроссовок из Китая",
    "доставка одежды из Китая",
    "доставка электроники из Китая",
    "посредник Taobao",
    "посредник Poizon",
    "карго Китай Россия",
    "доставка из Китая Москва",
    "доставка из Китая Санкт-Петербург",
    "доставка из Китая Новосибирск",
    "доставка из Китая Екатеринбург",
    "доставка из Китая Казань",
    "доставка из Китая Красноярск",
    "доставка из Китая Нижний Новгород",
    "доставка из Китая Челябинск",
    "доставка из Китая Уфа",
    "доставка из Китая Краснодар",
    "доставка из Китая Воронеж",
    "TaoPost",
    "тао пост",
  ].join(", "),
  metadataBase: new URL("https://taopost.ru"),
  alternates: {
    canonical: "https://taopost.ru",
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
  verification: {
    yandex: "3645f89ced68555a",
  },
  openGraph: {
    title: "TaoPost — Доставка из Китая в Россию | Taobao, Poizon, 1688",
    description: "Карго доставка из Китая в Россию. Одежда, обувь, электроника с Taobao, Poizon, Pinduoduo, 1688. Авиа от 750₽/кг, авто от 599₽/кг. Доставляем по всей России.",
    url: "https://taopost.ru",
    siteName: "TaoPost",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual'; if (!location.hash) window.scrollTo(0, 0);` }} />
      </head>
      <body className={outfit.className}>
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108426590', 'ym');
          ym(108426590, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}</Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108426590" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
