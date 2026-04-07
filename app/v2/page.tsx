import Link from 'next/link';
import Header from '@/components/Header';
import HeroV2 from '@/components/HeroV2';
import PriceComparison from '@/components/PriceComparison';
import Marketplaces from '@/components/Marketplaces';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Tariffs from '@/components/Tariffs';
import Features from '@/components/Features';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import WarehouseGallery from '@/components/WarehouseGallery';
import CTAV2 from '@/components/CTAV2';
import Footer from '@/components/Footer';

// Floating WhatsApp button (sticky)
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
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export const metadata = {
  title: 'TaoPost v2 — Новая воронка (тест)',
  robots: { index: false, follow: false },
};

export default function HomeV2() {
  return (
    <>
      <Header />
      {/* Плашка — это тест страница */}
      <div style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        right: 0,
        background: '#1B9E7E',
        color: 'white',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: 600,
        zIndex: 99,
      }}>
        🧪 Тест-версия воронки v2 · <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>Смотреть текущий сайт →</Link>
      </div>
      <main style={{ paddingTop: '36px' }}>
        {/* 1. Зацепить — выгода в заголовке, WhatsApp как CTA */}
        <HeroV2 />
        {/* 2. Боль — ты переплачиваешь в России */}
        <PriceComparison />
        {/* 3. Откуда берём — маркетплейсы */}
        <Marketplaces />
        {/* 4. Снять страх — как просто это работает */}
        <HowItWorks />
        {/* 5. Вовлечение — посчитай сам */}
        <Calculator />
        {/* 6. Конкретика — тарифы */}
        <Tariffs />
        {/* 7. Почему мы — преимущества */}
        <Features />
        {/* 8. Фото склада — живое доверие */}
        <WarehouseGallery />
        {/* 9. Доверие — отзывы */}
        <Reviews />
        {/* 9. Закрыть возражения — FAQ */}
        <FAQ />
        {/* 10. Финальный призыв */}
        <CTAV2 />
      </main>
      <Footer />
      {/* Плавающая кнопка WhatsApp */}
      <WhatsAppFloat />
    </>
  );
}
