'use client';
import { Send, Phone, MessageCircle, MessageSquare, AtSign } from 'lucide-react';

// Где клиенту удобнее получить ответ — только мессенджеры. Звонка нет
// (решение владельца 05.11.2026: звонить клиентам некому, заявки с одним
// телефоном терялись). Значения совпадают с contactVia в /api/calculator и в
// админке приложения.
export type ContactVia = 'telegram' | 'whatsapp' | 'max';

/**
 * В поле «Ник в Telegram» часто вписывают телефон (06.11.2026: все заявки за
 * день — с номером вместо ника). По номеру Telegram находит человека, только
 * если тот сам это разрешил, поэтому номер там бесполезен — подсказываем.
 */
export function looksLikePhone(v: string): boolean {
  const t = v.trim();
  return /^[+\d\s()-]+$/.test(t) && t.replace(/\D/g, '').length >= 7;
}

export const CONTACT_VIA_NAME: Record<ContactVia, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  max: 'Max',
};

const OPTIONS: Array<{ id: ContactVia; Icon: typeof Send }> = [
  { id: 'telegram', Icon: Send },
  { id: 'whatsapp', Icon: MessageCircle },
  { id: 'max', Icon: MessageSquare },
];

/**
 * Три кнопки «Telegram · WhatsApp · Max» (выбор обязателен, по умолчанию
 * Telegram) и поле под выбранный мессенджер: ник для Telegram, номер для
 * WhatsApp/Max (если не тот же, что телефон).
 */
export default function ContactViaPicker({
  value,
  onChange,
  messenger,
  onMessengerChange,
}: {
  value: ContactVia;
  onChange: (v: ContactVia) => void;
  messenger: string;
  onMessengerChange: (v: string) => void;
}) {
  const isNumber = value === 'whatsapp' || value === 'max';
  const nickIsPhone = value === 'telegram' && looksLikePhone(messenger);

  return (
    <>
      <div className="cvp__field" role="group" aria-label="Где удобнее получить ответ">
        <span className="cvp__label">Где удобнее получить ответ</span>
        <div className="cvp__grid">
          {OPTIONS.map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                if (id !== value) onMessengerChange(''); // ник ≠ номер — не переносим
                onChange(id);
              }}
              aria-pressed={value === id}
              className={`cvp__btn${value === id ? ' cvp__btn--active' : ''}`}
            >
              <Icon size={16} strokeWidth={2.3} /> {CONTACT_VIA_NAME[id]}
            </button>
          ))}
        </div>
      </div>

      {value === 'telegram' && (
        <label className="cvp__field">
          <span className="cvp__label">
            <AtSign size={14} strokeWidth={2.4} /> Ник в Telegram <span className="cvp__opt">— по нику мы точно вас найдём</span>
          </span>
          <input
            type="text"
            value={messenger}
            onChange={(e) => onMessengerChange(e.target.value.replace(/\s/g, '').slice(0, 64))}
            placeholder="@username"
            className={`cvp__input${nickIsPhone ? ' cvp__input--warn' : ''}`}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-invalid={nickIsPhone || undefined}
          />
          {nickIsPhone ? (
            <span className="cvp__hint cvp__hint--warn" role="alert">
              Это номер, а нужен ник — вида @ivan. Он есть в Telegram: Настройки → Имя пользователя.
              Нет ника — оставьте поле пустым или выберите WhatsApp / Max.
            </span>
          ) : (
            <span className="cvp__hint">
              Ник — в Telegram: Настройки → Имя пользователя. Нет ника — оставьте пустым,
              после заявки просто напишите нам.
            </span>
          )}
        </label>
      )}

      {isNumber && (
        <label className="cvp__field">
          <span className="cvp__label">
            <Phone size={14} strokeWidth={2.4} /> Номер в {CONTACT_VIA_NAME[value]}, если другой{' '}
            <span className="cvp__opt">— необязательно</span>
          </span>
          <input
            type="tel"
            value={messenger}
            onChange={(e) => onMessengerChange(e.target.value.slice(0, 40))}
            placeholder="По умолчанию — телефон выше"
            className="cvp__input"
            autoComplete="off"
            inputMode="tel"
          />
        </label>
      )}

      <style jsx>{`
        .cvp__field { display: flex; flex-direction: column; gap: 8px; }
        .cvp__label {
          display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0 7px;
          font-size: 13px; font-weight: 700; color: #374151;
        }
        .cvp__label :global(svg) { color: #6B7280; }
        .cvp__opt { font-weight: 500; color: #6B7280; }
        .cvp__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cvp__btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 12px; border-radius: 12px; border: 2px solid #E5E7EB;
          background: #fff; cursor: pointer; font-family: inherit;
          font-size: 14px; font-weight: 700; color: #374151; transition: all .15s;
        }
        .cvp__btn :global(svg) { flex-shrink: 0; }
        .cvp__btn--active { border-color: #005C43; background: rgba(0,92,67,0.06); color: #004232; }
        /* Узкая карточка: три кнопки в ряд не влезают с иконкой сбоку — ставим её над подписью. */
        @media (max-width: 520px) {
          .cvp__grid { gap: 8px; }
          .cvp__btn { flex-direction: column; gap: 4px; padding: 10px 4px; font-size: 13px; }
        }
        .cvp__input {
          width: 100%; padding: 14px 16px; border-radius: 12px;
          border: 2px solid #E5E7EB; font-size: 15px; outline: none;
          transition: border-color .15s, box-shadow .15s; box-sizing: border-box;
          font-family: inherit; color: #0A0F1C; background: #fff;
        }
        .cvp__input:focus { border-color: #005C43; box-shadow: 0 0 0 4px rgba(0,92,67,0.12); }
        .cvp__input--warn, .cvp__input--warn:focus { border-color: #F59E0B; box-shadow: 0 0 0 4px rgba(245,158,11,0.14); }
        .cvp__hint { font-size: 12.5px; color: #6B7280; line-height: 1.5; }
        .cvp__hint--warn { color: #92400E; font-weight: 600; }
      `}</style>
    </>
  );
}
