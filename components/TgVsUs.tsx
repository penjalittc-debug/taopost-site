import { CheckCircle2, XCircle } from 'lucide-react';

type Row = { topic: string; us: string; them: string };

const ROWS: Row[] = [
  { topic: 'Юр. лицо', us: 'Зарегистрированная компания в КНР с бизнес-лицензией (营业执照)', them: 'Анонимный аккаунт, юридически — никто' },
  { topic: 'Склад', us: 'Собственный склад в Гуанчжоу (район Ливань) — приёмка, фото, упаковка', them: 'Чужие склады или перекуп через цепочку посредников' },
  { topic: 'Страховка груза', us: 'Обязательная 2% — компенсация по факту в течение 14 дней', them: 'Без гарантий: пропала посылка — твои проблемы' },
  { topic: 'Прозрачность цены', us: 'Смета до оплаты с разбивкой: товар + доставка + страховка', them: 'Часто скрытые комиссии за выкуп, конвертацию, обработку' },
  { topic: 'Контроль качества', us: 'Фото каждой посылки на складе до отправки — видишь товар в Китае', them: 'Только слова продавца' },
  { topic: 'Проверка', us: 'Реестр КНР gsxt.gov.cn — регистрационный код 91440100MAEGJX2C1Y', them: 'Невозможно проверить' },
  { topic: 'Канал связи', us: 'Telegram + телефон +7 977 276 77 78 + email + сайт', them: 'Только Telegram, аккаунт может исчезнуть' },
  { topic: 'Опыт', us: '200 000+ доставленных посылок с 2019 года', them: 'Может быть 0 — не узнаешь' },
];

export default function TgVsUs() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#e8f7f3', color: '#005C43', borderRadius: '50px',
            padding: '6px 14px', fontSize: '13px', fontWeight: 700,
            marginBottom: '16px', border: '1px solid #c6ede4',
          }}>
            Почему не просто Telegram-посредник
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#111827',
            letterSpacing: '-0.5px', marginBottom: '12px',
            lineHeight: 1.15,
          }}>
            TaoPost vs <span style={{ color: '#9CA3AF' }}>обычный карго-канал</span>
          </h2>
          <p style={{
            fontSize: '17px', color: '#6B7280',
            maxWidth: '620px', margin: '0 auto', lineHeight: 1.7,
          }}>
            В нише доставки из Китая полно безымянных TG-каналов «выкуплю всё».
            Вот в чём разница для вас как клиента.
          </p>
        </div>

        <div className="tgvs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 180px) 1fr 1fr',
          gap: '12px',
          background: '#F9FAFB',
          borderRadius: '20px',
          padding: '20px',
          border: '1px solid #F3F4F6',
        }}>
          <div className="tgvs-header" />
          <div className="tgvs-header" style={{
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #005C43 0%, #004232 100%)',
            color: '#fff',
            fontWeight: 800, fontSize: '16px',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            TaoPost
          </div>
          <div className="tgvs-header" style={{
            padding: '14px 20px',
            background: '#E5E7EB',
            color: '#6B7280',
            fontWeight: 700, fontSize: '16px',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            TG-посредник
          </div>

          {ROWS.map((r) => (
            <div key={r.topic} style={{ display: 'contents' }}>
              <div className="tgvs-topic" style={{
                padding: '16px 14px',
                fontSize: '14px', fontWeight: 800,
                color: '#111827',
                display: 'flex', alignItems: 'center',
              }}>
                {r.topic}
              </div>
              <div className="tgvs-cell" style={{
                padding: '16px 18px',
                background: '#fff',
                borderRadius: '10px',
                fontSize: '14px', color: '#111827',
                lineHeight: 1.5,
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                border: '1px solid #E8F7F3',
              }}>
                <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: '#005C43', flexShrink: 0, marginTop: 1 }} />
                <span>{r.us}</span>
              </div>
              <div className="tgvs-cell" style={{
                padding: '16px 18px',
                background: '#fff',
                borderRadius: '10px',
                fontSize: '14px', color: '#6B7280',
                lineHeight: 1.5,
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                border: '1px solid #F3F4F6',
              }}>
                <XCircle size={18} strokeWidth={2.5} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 1 }} />
                <span>{r.them}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#6B7280',
        }}>
          Проверить нас в государственном реестре КНР:{' '}
          <a
            href="https://www.gsxt.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#005C43', fontWeight: 700, textDecoration: 'none' }}
          >
            gsxt.gov.cn →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tgvs-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .tgvs-grid > .tgvs-header:first-child {
            display: none;
          }
          .tgvs-topic {
            margin-top: 12px;
            padding: 8px 14px !important;
            background: #F3F4F6;
            border-radius: 8px;
            font-size: 13px !important;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }
      `}</style>
    </section>
  );
}
