import { CheckCircle2 } from 'lucide-react';
import s from './CargoChecklist.module.css';

type Item = { q: string; a: string };

// Чек-лист для нижней воронки: юзер уже сравнивает нас с другими карго.
// Формат — вопрос + наш конкретный ответ. Про конкурентов ничего не заявляем
// (юридически чисто), но по каждому пункту клиент сам увидит разницу.
const ITEMS: Item[] = [
  {
    q: 'Есть ли у карго юр. лицо в КНР, которое можно проверить?',
    a: 'Guangzhou Yashiming Import & Export Co., Ltd. — код 91440100MAEGJX2C1Y, проверка на gsxt.gov.cn.',
  },
  {
    q: 'Свой склад в Китае или пересылка через посредников?',
    a: 'Собственный склад в Гуанчжоу (район Ливань) — приёмка, взвешивание, фото, упаковка.',
  },
  {
    q: 'Пришлют ли фото каждой посылки до отправки в РФ?',
    a: 'Да, по каждому заказу — до передачи в международную доставку. Брак вернём продавцу.',
  },
  {
    q: 'Какая комиссия за выкуп с Taobao, Poizon, Pinduoduo?',
    a: '0% для одиночных заказов. Только с 1688 (опт) — от 3% (мин. 1 500 ₽).',
  },
  {
    q: 'Есть ли онлайн-кабинет со статусами заказов и трекингом?',
    a: 'app.taopost.ru — заявки, оплаты, статус на каждом этапе, история посылок.',
  },
  {
    q: 'На какое юр. лицо в России переводить деньги?',
    a: 'ООО «АЗИЗОВ ГРУПП», ИНН 9721235929 — счёт в РФ, договор-оферта, чек.',
  },
  {
    q: 'Что со страховкой груза?',
    a: 'Обязательная 2% — возмещение по факту в течение 14 дней. Не «по желанию» и не «звоните».',
  },
];

export default function CargoChecklist() {
  return (
    <section className={s.section} aria-labelledby="cargo-checklist-title">
      <div className={s.inner}>
        <div className={s.head}>
          <div className={s.pill}>Что важно спросить у любого карго</div>
          <h2 id="cargo-checklist-title" className={s.h2}>
            7 вопросов <span className={s.h2Muted}>и наши ответы</span>
          </h2>
          <p className={s.lede}>
            Если планируете сравнивать нас с другими компаниями — задайте им эти же
            вопросы. Разницу увидите сразу.
          </p>
        </div>

        <div className={s.grid}>
          {ITEMS.map((it, i) => (
            <article key={i} className={s.card}>
              <div className={s.qRow}>
                <div className={s.qN}>{i + 1}</div>
                <div className={s.q}>{it.q}</div>
              </div>
              <div className={s.a}>
                <CheckCircle2 size={18} strokeWidth={2.5} className={s.aIcon} />
                <span>{it.a}</span>
              </div>
            </article>
          ))}
        </div>

        <p className={s.foot}>
          <span className={s.footStrong}>Совет.</span>{' '}
          Если по какому-то вопросу карго уходит от прямого ответа —
          скорее всего, это ответ сам по себе.
        </p>
      </div>
    </section>
  );
}
