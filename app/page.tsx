import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marketplaces from '@/components/Marketplaces';
import PriceComparison from '@/components/PriceComparison';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Tracking from '@/components/Tracking';
import Tariffs from '@/components/Tariffs';
import Loyalty from '@/components/Loyalty';
import WarehouseGallery from '@/components/WarehouseGallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TaoPost",
  "url": "https://taopost.ru",
  "logo": "https://taopost.ru/logo.png",
  "description": "Карго доставка товаров из Китая в Россию. Выкуп и доставка с Taobao, Poizon, Pinduoduo, 1688, Goofish.",
  "telephone": "+7 (XXX) XXX-XX-XX",
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
        "text": "Зарегистрируйтесь на taopost.ru, вставьте ссылку на товар с Taobao, Poizon, Pinduoduo или 1688, и наш менеджер оформит выкуп и доставку."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Авиадоставка из Китая — от 750₽/кг, автодоставка — от 599₽/кг. Точная стоимость зависит от веса и объёма товара."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько идёт доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Авиадоставка из Китая занимает 10–14 дней, автодоставка — 20–35 дней до вашего города в России."
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
        <Hero />
        <Marketplaces />
        <PriceComparison />
        <Features />
        <HowItWorks />
        <Calculator />
        <Tracking />
        <Tariffs />
        <Loyalty />
        <WarehouseGallery />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
