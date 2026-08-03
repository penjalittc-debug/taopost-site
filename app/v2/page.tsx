import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V2() {
  // 308 Permanent — чтобы Google/Яндекс перенесли сигналы старой промо-страницы на главную.
  permanentRedirect('/');
}
