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

// Плавающая кнопка WhatsApp
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/79772767778?text=Привет! Хочу заказать товар из Китая"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.50)',
        zIndex: 999,
        textDecoration: 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
        <PriceComparison />
        <Marketplaces />
        <HowItWorks />
        <Calculator />
        <Tariffs />
        <Features />
        <WarehouseGallery />
        <Reviews />
        <FAQ />
        <CTAV2 />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
