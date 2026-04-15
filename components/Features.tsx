'use client';
import { ShieldCheck, ShoppingCart, MapPin, Zap, Package, Camera, Users, TrendingUp } from 'lucide-react';

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: 'Официальная доставка',
    description: 'Соблюдаем все нормы таможенного и налогового законодательства РФ. Никаких сюрпризов на таможне.',
    color: '#1B9E7E',
    bg: '#e8f7f3',
  },
  {
    Icon: ShoppingCart,
    title: 'Выкуп товаров',
    description: 'Поможем купить товар, если у вас нет китайской карты или аккаунта на маркетплейсе.',
    color: '#CB3234',
    bg: '#fff0f0',
  },
  {
    Icon: MapPin,
    title: 'Отслеживание посылок',
    description: 'Следите за статусом заказа в реальном времени через наше приложение — от склада до двери.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    Icon: Zap,
    title: 'Быстрая доставка',
    description: 'Доставляем за 15–25 дней. Регулярные рейсы из Гуанчжоу напрямую в Россию.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    Icon: Package,
    title: 'Консолидация',
    description: 'Объединяем несколько заказов из разных магазинов в одну посылку — платите за доставку один раз.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    Icon: Camera,
    title: 'Фото товара',
    description: 'По запросу сделаем фотографии вашего товара на складе в Китае перед отправкой.',
    color: '#ec4899',
    bg: '#fdf2f8',
  },
  {
    Icon: Users,
    title: 'Совместный выкуп',
    description: 'Не хватает до минимальных 5 кг? Объединяем вас с другими заказчиками — платите только за свой вес.',
    color: '#0ea5e9',
    bg: '#e0f2fe',
  },
  {
    Icon: TrendingUp,
    title: 'Выгодный курс юаня',
    description: 'Быстрая конвертация рублей в юани по выгодному курсу. Оплатили — менеджер сразу оформляет заказ.',
    color: '#16a34a',
    bg: '#dcfce7',
  },
];

export default function Features() {
  return (
    <section id="about" className="section-pad" style={{ background: '#F9FAFB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#1B9E7E',
            borderRadius: '50px', padding: '6px 14px',
            fontSize: '13px', fontWeight: 700,
            marginBottom: '16px',
            border: '1px solid #c6ede4',
          }}>
            Почему TaoPost
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}>
            Всё что нужно для<br />
            <span style={{ color: '#1B9E7E' }}>удобной доставки</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Мы берём на себя все этапы — от покупки товара в Китае до доставки к вашей двери
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid #F3F4F6',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '52px', height: '52px',
                background: f.bg,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px',
              }}>
                <f.Icon size={24} color={f.color} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
