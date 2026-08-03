import Link from 'next/link';
import s from './PageHero.module.css';

type Props = {
  pill?: React.ReactNode;
  currentCrumb: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'center' | 'left';
};

// Общий hero для сервисных страниц: /o-kompanii, /kontakty, /garantii, /tarify, /oferta и т.д.
// Замена копипасту inline-styles, который раньше жил в каждой page.tsx.
export default function PageHero({ pill, currentCrumb, title, lede, align = 'center' }: Props) {
  return (
    <section className={`${s.hero} ${align === 'left' ? s.leftHero : ''}`}>
      <div className={s.inner}>
        <nav aria-label="breadcrumb" className={s.crumbs}>
          <Link href="/">Главная</Link>
          <span>›</span>
          <span className={s.crumbCurrent}>{currentCrumb}</span>
        </nav>
        {pill && <div className={s.pill}>{pill}</div>}
        <h1 className={s.h1}>{title}</h1>
        {lede && <p className={s.lede}>{lede}</p>}
      </div>
    </section>
  );
}
