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
  "email": "info@taopost.ru",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+7 977 276 77 78",
      "contactType": "customer service",
      "areaServed": "RU",
      "availableLanguage": ["Russian", "Chinese"],
      "contactOption": "TollFree"
    }
  ],
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
    "https://t.me/taopostmanager"
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как долго идёт доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В среднем 15–25 дней с момента отправки с нашего склада в Гуанчжоу. Авиадоставка занимает 3–5 дней, автодоставка дешевле."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит доставка из Китая?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Автодоставка — от 350 ₽/кг, авиадоставка — от 2 700 ₽/кг. Стоимость считается по большему из фактического и объёмного веса."
      }
    },
    {
      "@type": "Question",
      "name": "Как оплатить товары на китайских маркетплейсах?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вам не нужна китайская карта или аккаунт — мы делаем всё за вас. Вы оплачиваете нам в рублях, а мы выкупаем товар в Китае на наши юани."
      }
    },
    {
      "@type": "Question",
      "name": "Платится ли таможенная пошлина?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Для посылок физлиц до 200 € и до 31 кг пошлина не взимается. При превышении — 15% с суммы превышения. Расчёт берём на себя и подскажем, как разделить заказы выгоднее."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли заказать несколько товаров из разных магазинов?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, мы объединяем заказы из разных магазинов в одну посылку (консолидация) — платите за доставку один раз."
      }
    },
    {
      "@type": "Question",
      "name": "Что если товар пришёл повреждённым или не тем?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Проверяем товары на складе в Гуанчжоу и фотографируем по запросу до отправки. Все посылки идут со страховкой 2% — поможем оформить возврат или компенсацию."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли вернуть товар или поменять размер?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "До отправки со склада в Китае — да, поможем вернуть или обменять. После выезда из Китая возврат возможен только при повреждении или браке по страховке."
      }
    },
    {
      "@type": "Question",
      "name": "Что делать, если посылка задержалась или потерялась?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Все посылки отслеживаются в личном кабинете. При задержке менеджер сам выходит на связь. В случае утери страховка покрывает стоимость товара."
      }
    },
    {
      "@type": "Question",
      "name": "Какие товары нельзя привезти?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Не перевозим товары, запрещённые к ввозу в РФ: оружие, наркотические вещества, явный контрафакт, скоропортящиеся продукты, литий-ионные аккумуляторы свыше нормы."
      }
    },
    {
      "@type": "Question",
      "name": "С каких маркетплейсов вы выкупаете?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taobao, Tmall, Poizon (得物), Pinduoduo, 1688, Goofish (Xianyu) и другие китайские площадки."
      }
    },
    {
      "@type": "Question",
      "name": "Есть ли ограничение по весу?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Минимальный вес посылки — 0,5 кг (тариф от 1 кг). Максимального ограничения нет — везём и маленькие посылки, и контейнеры под бизнес."
      }
    },
    {
      "@type": "Question",
      "name": "Как отследить мою посылку?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В личном кабинете приложения TaoPost виден статус заказа в реальном времени: выкуп, приёмка на складе в Китае, отправка, граница, доставка по РФ."
      }
    },
    {
      "@type": "Question",
      "name": "В какие города России вы доставляете?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "По всей России: Москва, Санкт-Петербург, Новосибирск, Екатеринбург, Казань, Красноярск, Нижний Новгород, Челябинск, Уфа, Ростов-на-Дону, Краснодар, Воронеж и другие — через СДЭК, Boxberry или курьером до двери."
      }
    },
    {
      "@type": "Question",
      "name": "Как с вами связаться?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Пишите нам в Telegram — отвечаем в среднем за 5 минут. Также можно оставить заявку через калькулятор на сайте или зарегистрироваться в личном кабинете."
      }
    }
  ]
};

// Плавающая кнопка Telegram
function TelegramFloat() {
  return (
    <a
      href="https://t.me/taopostmanager?start=site"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <HeroV3 />
        <FadeIn><About /></FadeIn>
        <FadeIn><Marketplaces /></FadeIn>
        <FadeIn delay={50}><PriceComparison /></FadeIn>
        <FadeIn delay={50}><HowItWorks /></FadeIn>
        <FadeIn delay={50}><Calculator /></FadeIn>
        <FadeIn delay={50}><Tariffs /></FadeIn>
        <FadeIn delay={50}><Loyalty /></FadeIn>
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
