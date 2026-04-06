import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

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
      <body style={{ position: 'relative' }}>
        {/* Fixed dragon background */}
        <div style={{
          position: 'fixed',
          top: '50%',
          right: '-80px',
          transform: 'translateY(-50%)',
          width: '680px',
          height: '680px',
          pointerEvents: 'none',
          opacity: 0.09,
          zIndex: 10,
        }}>
          <Image src="/dragon.webp" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
