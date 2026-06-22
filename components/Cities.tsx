import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { CITIES } from '@/lib/cities';

const TOP_CITY_SLUGS = [
  'moskva', 'sankt-peterburg', 'novosibirsk', 'ekaterinburg',
  'kazan', 'nizhniy-novgorod', 'chelyabinsk', 'samara',
  'ufa', 'rostov-na-donu', 'krasnodar', 'voronezh',
  'krasnoyarsk', 'perm', 'volgograd', 'tyumen',
];

export default function Cities() {
  const top = TOP_CITY_SLUGS
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="tp-section" id="cities">
      <div className="tp-mesh tp-mesh--coral tp-mesh--br" />

      <div className="cit__wrap">
        <div className="tp-section__head">
          <span className="tp-eyebrow tp-eyebrow--coral">
            <span className="tp-eyebrow__dot" />
            География доставки
          </span>
          <h2 className="tp-h2">
            Доставка <span className="tp-gradient-text">по всей России</span>
          </h2>
          <p className="tp-lede">
            Из Гуанчжоу в любой город — СДЭК, Boxberry, 5Post или курьером до двери
          </p>
        </div>

        <div className="cit__grid">
          {top.map((c) => (
            <Link
              key={c.slug}
              href={`/kak-zakazat-iz-kitaya/${c.slug}`}
              className="cit__card"
              data-ym-goal="city_card_click"
              data-ym-params={JSON.stringify({ slug: c.slug })}
            >
              <div className="cit__cardHead">
                <MapPin size={16} strokeWidth={2.5} />
                <span className="cit__name">{c.name}</span>
              </div>
              <div className="cit__days">{c.deliveryDays}</div>
              <div className="cit__more">Как заказать <ArrowRight size={12} strokeWidth={2.5} /></div>
            </Link>
          ))}
        </div>

        <div className="cit__all">
          <Link href="/kak-zakazat-iz-kitaya" className="tp-btn tp-btn--ghost" data-ym-goal="cities_all_click">
            Все {CITIES.length} городов
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style>{`
        .cit__wrap { max-width: 1200px; margin: 0 auto; position: relative; }
        .cit__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
          margin-top: 36px;
        }
        .cit__card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 20px;
          border-radius: 16px;
          background: #fff;
          border: 1.5px solid #E5E7EB;
          text-decoration: none;
          color: inherit;
          transition: border-color .15s, transform .15s, box-shadow .15s;
        }
        .cit__card:hover {
          border-color: var(--green);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -10px rgba(0, 92, 67, 0.18);
        }
        .cit__cardHead {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cit__cardHead :global(svg) { color: var(--coral); flex-shrink: 0; }
        .cit__name {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .cit__days {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
          padding-left: 24px;
        }
        .cit__more {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--green-dark);
          padding-left: 24px;
        }
        .cit__all {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
