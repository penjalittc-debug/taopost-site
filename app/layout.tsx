import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaoPost — Доставка товаров из Китая в Россию",
  description: "Официальная доставка товаров из Китая в Россию. Pinduoduo, Taobao, 1688, Poizon, Goofish и другие маркетплейсы. Выкуп, отслеживание, быстрая доставка.",
  keywords: "доставка из Китая, Taobao, Pinduoduo, 1688, Poizon, карго, TaoPost",
  openGraph: {
    title: "TaoPost — Доставка товаров из Китая в Россию",
    description: "Официальная доставка товаров из Китая в Россию. Pinduoduo, Taobao, 1688, Poizon, Goofish.",
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
      <body>{children}</body>
    </html>
  );
}
