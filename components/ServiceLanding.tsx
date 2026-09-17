import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import PageCta from '@/components/PageCta';
import FadeIn from '@/components/FadeIn';
import type { ServiceLanding as Service } from '@/lib/services';
import s from './ServiceLanding.module.css';

/**
 * Шаблон страницы услуги (карго, авиа, выкуп, сборный груз).
 * Отличается от MarketplaceLanding осью: там площадка, здесь услуга.
 *
 * Форма стоит в середине страницы, а не только в конце: разбор конкурента
 * показал, что единственный способ не потерять посетителя — дать ему оставить
 * телефон там, где он дочитал, а не требовать дойти до низа.
 */
export default function ServiceLanding({ service }: { service: Service }) {
  return (
    <>
      <Header />
      <main>
        <PageHero
          currentCrumb={service.name}
          pill={service.pill}
          title={
            <>
              {service.h1}
              {' — '}
              <span style={{ color: '#005C43' }}>{service.hAccent}</span>
            </>
          }
          lede={service.lede}
        />

        <FadeIn delay={50}>
          <section className={s.intro}>
            <div className={s.introInner}>
              {service.intro.map((p, i) => (
                <p key={i} className={s.introP}>{p}</p>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}>
          <section className={s.highlights}>
            <div className={s.hlInner}>
              <h2 className={s.h2}>Что вы получаете</h2>
              <div className={s.hlGrid}>
                {service.highlights.map((h) => (
                  <article key={h.title} className={s.hlCard}>
                    <span className={s.hlEmoji} aria-hidden="true">{h.emoji}</span>
                    <h3 className={s.hlTitle}>{h.title}</h3>
                    <p className={s.hlText}>{h.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}>
          <section className={s.steps}>
            <div className={s.stepsInner}>
              <h2 className={s.h2}>Как это работает</h2>
              <ol className={s.stepsList}>
                {service.steps.map((step, i) => (
                  <li key={step.title} className={s.step}>
                    <span className={s.stepNum}>{i + 1}</span>
                    <div>
                      <h3 className={s.stepTitle}>{step.title}</h3>
                      <p className={s.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}>
          <section className={s.price}>
            <div className={s.priceInner}>
              <h2 className={s.h2}>{service.priceTitle}</h2>
              <div className={s.priceTable}>
                {service.priceRows.map((row) => (
                  <div key={row.label} className={s.priceRow}>
                    <span className={s.priceLabel}>{row.label}</span>
                    <span className={s.priceValue}>{row.value}</span>
                    {row.note && <span className={s.priceNote}>{row.note}</span>}
                  </div>
                ))}
              </div>
              <p className={s.priceFoot}>{service.priceNote}</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}><LeadForm /></FadeIn>

        <FadeIn delay={50}>
          <section className={s.faq}>
            <div className={s.faqInner}>
              <h2 className={s.h2}>Частые вопросы</h2>
              <div className={s.faqList}>
                {service.faq.map((item) => (
                  <details key={item.q} className={s.faqItem}>
                    <summary className={s.faqQ}>{item.q}</summary>
                    <p className={s.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={50}>
          <PageCta
            title="Посчитаем ваш заказ"
            lede="Напишите, что нужно привезти — ответим за несколько минут и назовём точную сумму."
            actions={[
              { href: 'https://app.taopost.ru/?src=site', label: 'Личный кабинет', variant: 'primary' },
              { href: 'https://t.me/Taopostchat_official', label: 'Написать в Telegram', variant: 'ghost' },
            ]}
          />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
