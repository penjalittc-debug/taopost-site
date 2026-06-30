import Header from '@/components/Header';
import { REVIEWS, AGGREGATE_RATING } from '@/lib/reviews';
import HeroV3 from '@/components/HeroV3';
import About from '@/components/About';
import PriceComparison from '@/components/PriceComparison';
import Marketplaces from '@/components/Marketplaces';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Tariffs from '@/components/Tariffs';
import Loyalty from '@/components/Loyalty';
import Features from '@/components/Features';
import WarehouseGallery from '@/components/WarehouseGallery';
import Reviews from '@/components/Reviews';
import CTAV2 from '@/components/CTAV2';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import Cities from '@/components/Cities';
import BlogPreview from '@/components/BlogPreview';
import LeadForm from '@/components/LeadForm';
import TgVsUs from '@/components/TgVsUs';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://taopost.ru/#organization",
  "name": "TaoPost",
  "legalName": "Guangzhou Yashiming Import & Export Co., Ltd. (广州亚世名进出口有限公司)",
  "url": "https://taopost.ru",
  "logo": "https://taopost.ru/logo.png",
  "image": "https://taopost.ru/og-image.png",
  "description": "Карго доставка товаров из Китая в Россию. Выкуп и доставка с Taobao, Poizon, Pinduoduo, 1688, Goofish. Официальное юр.лицо в КНР с бизнес-лицензией.",
  "telephone": "+7 977 276 77 78",
  "email": "info@taopost.ru",
  "foundingDate": "2025-04-09",
  "taxID": "91440100MAEGJX2C1Y",
  "iso6523Code": "0199:91440100MAEGJX2C1Y",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+7 977 276 77 78",
      "contactType": "customer service",
      "areaServed": "RU",
      "availableLanguage": ["Russian", "Chinese"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+86 185 2070 7778",
      "contactType": "warehouse",
      "areaServed": "CN",
      "availableLanguage": ["Chinese", "Russian"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Чжаньцянь, 90",
    "addressLocality": "Гуанчжоу",
    "addressRegion": "Ливань",
    "addressCountry": "CN"
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
    "https://t.me/taopostsupport"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": AGGREGATE_RATING.ratingValue,
    "reviewCount": AGGREGATE_RATING.reviewCount,
    "bestRating": AGGREGATE_RATING.bestRating,
    "worstRating": AGGREGATE_RATING.worstRating
  },
  "review": REVIEWS.map((r) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.name },
    "datePublished": r.isoDate,
    "reviewBody": r.text,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": r.rating,
      "bestRating": 5,
      "worstRating": 1
    }
  }))
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://taopost.ru/#service",
  "name": "Карго доставка из Китая в Россию",
  "serviceType": "Карго доставка и выкуп товаров",
  "provider": { "@id": "https://taopost.ru/#organization" },
  "areaServed": { "@type": "Country", "name": "Россия" },
  "url": "https://taopost.ru",
  "description": "Выкуп и доставка товаров с Taobao, Poizon, Pinduoduo, 1688, Tmall, Goofish. Авто 15-25 дней, авиа 3-5 дней. Собственный склад в Гуанчжоу, страховка груза, проверка качества.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "RUB",
    "lowPrice": "350",
    "highPrice": "2700",
    "offerCount": 2,
    "offers": [
      {
        "@type": "Offer",
        "name": "Автодоставка из Китая",
        "price": "350",
        "priceCurrency": "RUB",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "350",
          "priceCurrency": "RUB",
          "unitCode": "KGM",
          "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "KGM" }
        },
        "deliveryLeadTime": { "@type": "QuantitativeValue", "minValue": 15, "maxValue": 25, "unitCode": "DAY" }
      },
      {
        "@type": "Offer",
        "name": "Авиадоставка из Китая",
        "price": "2700",
        "priceCurrency": "RUB",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2700",
          "priceCurrency": "RUB",
          "unitCode": "KGM",
          "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "KGM" }
        },
        "deliveryLeadTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 5, "unitCode": "DAY" }
      }
    ]
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TaoPost",
  "url": "https://taopost.ru",
  "inLanguage": "ru-RU",
  "publisher": {
    "@type": "Organization",
    "name": "TaoPost",
    "logo": "https://taopost.ru/logo.png"
  }
};

// Плавающая кнопка Telegram
function TelegramFloat() {
  return (
    <a
      href="https://t.me/taopostsupport?start=site"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать менеджеру в Telegram"
      data-ym-goal="telegram_click"
      data-ym-params='{"place":"float"}'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main>
        <HeroV3 />
        <FadeIn><PriceComparison /></FadeIn>
        <FadeIn delay={50}><HowItWorks /></FadeIn>
        <FadeIn delay={50}><Calculator /></FadeIn>
        <FadeIn delay={50}><Marketplaces /></FadeIn>
        <FadeIn delay={50}><TgVsUs /></FadeIn>
        <FadeIn delay={50}><Tariffs /></FadeIn>
        <FadeIn delay={50}><Loyalty /></FadeIn>
        <FadeIn delay={50}><WarehouseGallery /></FadeIn>
        <FadeIn delay={50}><Reviews /></FadeIn>
        <FadeIn delay={50}><About /></FadeIn>
        <FadeIn delay={50}><Features /></FadeIn>
        <FadeIn delay={50}><Cities /></FadeIn>
        <FadeIn delay={50}><LeadForm /></FadeIn>
        <FadeIn delay={50}><BlogPreview /></FadeIn>
        <FadeIn delay={50}><CTAV2 /></FadeIn>
      </main>
      <Footer />
      <TelegramFloat />
    </>
  );
}
