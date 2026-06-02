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
  title: "TaoPost — Доставка из Китая: Taobao, Poizon, 1688 от 350 ₽/кг",
  description: "Карго из Китая в Россию: выкуп и доставка с Taobao, Poizon, Pinduoduo, 1688. Авто от 350 ₽/кг, авиа от 2 700 ₽/кг. Москва, СПб и вся РФ за 12–20 дней.",
  keywords: [
    "доставка из Китая",
    "карго из Китая в Россию",
    "выкуп товаров из Китая",
    "доставка с Taobao",
    "доставка с Poizon",
    "доставка с 1688",
    "посредник Taobao",
    "TaoPost",
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
    description: "Карго доставка из Китая в Россию. Одежда, обувь, электроника с Taobao, Poizon, Pinduoduo, 1688. Авто от 350 ₽/кг, авиа от 2 700 ₽/кг. Доставляем по всей России.",
    url: "https://taopost.ru",
    siteName: "TaoPost",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://taopost.ru/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaoPost — Доставка из Китая в Россию",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaoPost — Доставка из Китая в Россию",
    description: "Карго доставка из Китая в Россию. Taobao, Poizon, Pinduoduo, 1688. Авто от 350 ₽/кг, авиа от 2 700 ₽/кг.",
    images: ["https://taopost.ru/og-image.png"],
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://mc.yandex.ru/watch/108426590" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
