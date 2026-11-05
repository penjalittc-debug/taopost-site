'use client';
import { Send, Phone, MessageCircle, MessageSquare, AtSign } from 'lucide-react';

// Где клиенту удобнее получить ответ (с 05.11.2026 — четыре варианта).
// Значения совпадают с contactVia в /api/calculator и в админке приложения.
export type ContactVia = 'telegram' | 'whatsapp' | 'max' | 'call';

export const CONTACT_VIA_NAME: Record<ContactVia, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  max: 'Max',
  call: 'Звонок',
};

const OPTIONS: Array<{ id: ContactVia; Icon: typeof Send }> = [
  { id: 'telegram', Icon: Send },
  { id: 'whatsapp', Icon: MessageCircle },
  { id: 'max', Icon: MessageSquare },
  { id: 'call', Icon: Phone },
];

/**
 * Четыре кнопки «Telegram · WhatsApp · Max · Звонок» и поле под выбранный
 * мессенджер: ник для Telegram, номер для WhatsApp/Max (если не тот же, что
 * телефон). Для звонка дополнительного поля нет.
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
            <AtSign size={14} strokeWidth={2.4} /> Ник в Telegram <span className="cvp__opt">— необязательно</span>
          </span>
          <input
            type="text"
            value={messenger}
            onChange={(e) => onMessengerChange(e.target.value.replace(/\s/g, '').slice(0, 64))}
            placeholder="@username"
            className="cvp__input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
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
        .cvp__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .cvp__btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 12px; border-radius: 12px; border: 2px solid #E5E7EB;
          background: #fff; cursor: pointer; font-family: inherit;
          font-size: 14px; font-weight: 700; color: #374151; transition: all .15s;
        }
        .cvp__btn :global(svg) { flex-shrink: 0; }
        .cvp__btn--active { border-color: #005C43; background: rgba(0,92,67,0.06); color: #004232; }
        .cvp__input {
          width: 100%; padding: 14px 16px; border-radius: 12px;
          border: 2px solid #E5E7EB; font-size: 15px; outline: none;
          transition: border-color .15s, box-shadow .15s; box-sizing: border-box;
          font-family: inherit; color: #0A0F1C; background: #fff;
        }
        .cvp__input:focus { border-color: #005C43; box-shadow: 0 0 0 4px rgba(0,92,67,0.12); }
      `}</style>
    </>
  );
}
