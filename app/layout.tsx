import type { Metadata } from "next";
import Image from "next/image";
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
