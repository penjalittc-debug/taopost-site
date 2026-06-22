export const YM_ID = 108426590;

type YMArgs = unknown[];
type YM = ((...args: YMArgs) => void) & { a?: YMArgs[]; l?: number };

declare global {
  interface Window {
    ym?: YM;
  }
}

function call(...args: YMArgs) {
  if (typeof window === 'undefined') return;
  const ym = window.ym;
  if (typeof ym === 'function') {
    try {
      ym(YM_ID, ...args);
    } catch {
      /* noop */
    }
  }
}

export function ymReachGoal(goal: string, params?: Record<string, unknown>) {
  call('reachGoal', goal, params);
}

export function ymHit(url: string, options?: { title?: string; referer?: string; params?: Record<string, unknown> }) {
  call('hit', url, options);
}

export function ymParams(params: Record<string, unknown>) {
  call('params', params);
}
