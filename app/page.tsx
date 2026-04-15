import Header from '@/components/Header';
import HeroV2 from '@/components/HeroV2';
import PriceComparison from '@/components/PriceComparison';
import Marketplaces from '@/components/Marketplaces';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Tariffs from '@/components/Tariffs';
import Features from '@/components/Features';
import WarehouseGallery from '@/components/WarehouseGallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CTAV2 from '@/components/CTAV2';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TaoPost",
  "url": "https://taopost.ru",
  "logo": "https://taopost.ru/logo.png",
  "description": "Карго доставка товаров из Китая в Россию. Выкуп и доставка с Taobao, Poizon, Pinduoduo, 1688, Goofish.",
  "telephone": "+7 977 276 77 78",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU"
  },
  "areaServed": [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург",
    "Казань", "Красноярск", "Нижний Новгород", "Челябинск",
    "Уфа", "Ростов-на-Дону", "Краснодар", "Воронеж"
  ],
  "serviceType": [
    "Доставка из Китая",
    "Карго доставка",
    "Выкуп товаров",
    "Доставка с Taobao",
    "Доставка с Poizon",
    "Доставка с Pinduoduo",
    "Доставка с 1688"
  ],
  "sameAs": [
    "https://t.me/taopost"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как заказать доставку из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Напишите нам в WhatsApp или Telegram, вставьте ссылку на товар с Taobao, Poizon, Pinduoduo или 1688, и наш менеджер оформит выкуп и доставку."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Автодоставка из Китая — от 2.7$/кг, авиадоставка — от 25$/кг. Точная стоимость зависит от веса, объёма и маршрута."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько идёт доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Автодоставка из Иу или Гуанчжоу занимает 15–25 дней, авиадоставка из Пекина — 3–5 дней до Москвы."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли заказать с Poizon (得物) в Россию?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, TaoPost выкупает и доставляет товары с Poizon (得物) в Россию. Мы проверяем оригинальность товара перед отправкой."
      }
    },
    {
      "@type": "Question",
      "name": "В какие города России вы доставляете?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы доставляем по всей России: Москва, Санкт-Петербург, Новосибирск, Екатеринбург, Казань, Красноярск, Нижний Новгород, Челябинск, Уфа, Ростов-на-Дону, Краснодар, Воронеж и другие города."
      }
    }
  ]
};

// Плавающая кнопка Telegram
function TelegramFloat() {
  return (
    <a
      href="https://t.me/taopostmaneger?start=site"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать менеджеру в Telegram"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#0088cc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,136,204,0.50)',
        zIndex: 999,
        textDecoration: 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <HeroV2 />
        <FadeIn><Marketplaces /></FadeIn>
        <FadeIn delay={50}><PriceComparison /></FadeIn>
        <FadeIn delay={50}><HowItWorks /></FadeIn>
        <FadeIn delay={50}><Calculator /></FadeIn>
        <FadeIn delay={50}><Tariffs /></FadeIn>
        <FadeIn delay={50}><Features /></FadeIn>
        <FadeIn delay={50}><WarehouseGallery /></FadeIn>
        <FadeIn delay={50}><Reviews /></FadeIn>
        <FadeIn delay={50}><FAQ /></FadeIn>
        <FadeIn delay={50}><CTAV2 /></FadeIn>
      </main>
      <Footer />
      <TelegramFloat />
    </>
  );
}
