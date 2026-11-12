import Link from 'next/link';
import s from './ServiceLanding.module.css';

/** Плашка «Груз от 50 кг → карго» (04.11.2026, порог 30 кг с 06.11, 50 кг с 12.11): главная и страницы услуг. */
export default function OptBand({ place }: { place: string }) {
  return (
    <section className={s.optBand}>
      <div className={s.optInner}>
        <div>
          <strong className={s.optTitle}>Груз от 50 кг? Это уже карго</strong>
          <p className={s.optText}>
            Карго из Китая оптом — от 1,3 $/кг по плотности груза, выкуп с 1688 от 3 %,
            документы для Wildberries и Ozon.
          </p>
        </div>
        <Link
          href="/kargo-dostavka"
          className={s.optBtn}
          data-ym-goal="opt_open_page"
          data-ym-params={`{"place":"${place}"}`}
        >
          Тарифы карго →
        </Link>
      </div>
    </section>
  );
}
