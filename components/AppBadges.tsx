import { APP_STORE_URL } from '@/lib/appStore';
import { ANDROID_URL } from '@/lib/androidApp';
import st from './AppBadges.module.css';

// Значки «App Store» и «Android» (20.11.2026, владелец: «чтобы люди сразу
// понимали», и выше, а не в самом конце футера). Один компонент — футер,
// первый экран и нижний блок главной.
// theme: 'dark' — на тёмном фоне (футер, нижний блок), 'light' — на светлом (hero).
export default function AppBadges({ place, theme = 'dark', center = false }: { place: string; theme?: 'dark' | 'light'; center?: boolean }) {
  return (
    <div className={`${st.root} ${theme === 'light' ? st.light : st.dark}${center ? ` ${st.center}` : ''}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={st.badge}
        aria-label="Загрузите в App Store"
        data-ym-goal="app_store_click"
        data-ym-params={`{"place":"${place}"}`}
      >
        <svg className={st.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
          />
        </svg>
        <span className={st.text}>
          <span className={st.hint}>Загрузите в</span>
          <span className={st.name}>App Store</span>
        </span>
      </a>
      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={st.badge}
        aria-label="Скачать приложение для Android"
        data-ym-goal="android_click"
        data-ym-params={`{"place":"${place}"}`}
      >
        <svg className={`${st.icon} ${st.iconAndroid}`} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
          />
        </svg>
        <span className={st.text}>
          <span className={st.hint}>Скачать для</span>
          <span className={st.name}>Android</span>
        </span>
      </a>

    </div>
  );
}
