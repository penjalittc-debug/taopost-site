import Link from 'next/link';
import s from './ServiceLanding.module.css';

/** Плашка «Закупка от 50 000 ₽ → опт» (04.11.2026): главная и страницы услуг. */
export default function OptBand({ place }: { place: string }) {
  return (
    <section className={s.optBand}>
      <div className={s.optInner}>
        <div>
          <strong className={s.optTitle}>Закупка от 50 000 ₽? Это уже опт</strong>
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
          Тарифы на опт →
        </Link>
      </div>
    </section>
  );
}
