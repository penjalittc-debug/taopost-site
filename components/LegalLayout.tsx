import Link from 'next/link';
import Image from 'next/image';
import s from './LegalLayout.module.css';

type Props = {
  pill?: string;
  title: string;
  date?: string;
  wide?: boolean; // максимальная ширина контейнера 820px (oferta)
  children: React.ReactNode;
};

// Единый макет для юридических страниц: /privacy, /terms, /oferta.
// Раньше каждая страница копировала header, main-обёртку, title-блок и CTA.
export default function LegalLayout({ pill = 'Документ', title, date, wide, children }: Props) {
  return (
    <>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link href="/" className={s.logoLink}>
            <Image src="/logo.png" alt="TaoPost" width={36} height={36} className={s.logo} priority />
            <span className={s.brand}>
              Tao<span className={s.brandAccent}>Post</span>
            </span>
          </Link>
          <Link href="/" className={s.homeBtn}>← На главную</Link>
        </div>
      </header>

      <main className={s.main}>
        <div className={`${s.wrap} ${wide ? s.wrapWide : ''}`}>
          <div className={s.titleBlock}>
            <div className={s.pill}>{pill}</div>
            <h1 className={s.h1}>{title}</h1>
            {date && <p className={s.date}>{date}</p>}
          </div>

          <div className={s.card}>{children}</div>

          <div className={s.bottomWrap}>
            <Link href="/" className={s.bottomCta}>← Вернуться на главную</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={s.section}>
      <h2>{title}</h2>
      <div className={s.sectionBody}>{children}</div>
    </div>
  );
}
