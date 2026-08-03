import s from './PageCta.module.css';

export type CtaAction = {
  label: React.ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
  ymGoal?: string;
  ymParams?: string;
  external?: boolean; // target=_blank + rel
};

type Props = {
  title: string;
  lede: React.ReactNode;
  actions: CtaAction[];
};

// Тёмно-зелёный CTA-блок в конце сервисных страниц. Одинаковый паттерн
// повторялся с небольшими вариациями на 5+ страницах — унифицируем.
export default function PageCta({ title, lede, actions }: Props) {
  return (
    <section className={s.cta}>
      <div className={s.inner}>
        <h2 className={s.h2}>{title}</h2>
        <p className={s.lede}>{lede}</p>
        <div className={s.row}>
          {actions.map((a, i) => (
            <a
              key={i}
              href={a.href}
              className={a.variant === 'ghost' ? s.ghost : s.primary}
              {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(a.ymGoal ? { 'data-ym-goal': a.ymGoal } : {})}
              {...(a.ymParams ? { 'data-ym-params': a.ymParams } : {})}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
