import type { Metadata } from "next";
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
      <body>
        {children}
      </body>
    </html>
  );
}
