'use client';

import { useEffect } from 'react';
import { ymHit, ymReachGoal } from '@/lib/metrika';

const SECTIONS: Record<string, { title: string; goal?: string }> = {
  about:        { title: 'TaoPost — О компании',     goal: 'view_about' },
  marketplaces: { title: 'TaoPost — Маркетплейсы',   goal: 'view_marketplaces' },
  how:          { title: 'TaoPost — Как заказать',   goal: 'view_how' },
  calculator:   { title: 'TaoPost — Калькулятор',    goal: 'view_calculator' },
  tariffs:      { title: 'TaoPost — Тарифы',         goal: 'view_tariffs' },
  loyalty:      { title: 'TaoPost — Программа лояльности', goal: 'view_loyalty' },
  reviews:      { title: 'TaoPost — Отзывы',         goal: 'view_reviews' },
  faq:          { title: 'TaoPost — FAQ',            goal: 'view_faq' },
  contacts:     { title: 'TaoPost — Контакты',       goal: 'view_contacts' },
};

export default function MetrikaTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const fire = (id: string) => {
      if (seen.has(id)) return;
      const cfg = SECTIONS[id];
      if (!cfg) return;
      seen.add(id);
      ymHit(`${location.origin}/#${id}`, { title: cfg.title, referer: location.href });
      if (cfg.goal) ymReachGoal(cfg.goal);
    };

    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => fire(id));
    }

    const onHash = () => {
      const id = location.hash.slice(1);
      if (id) fire(id);
    };
    window.addEventListener('hashchange', onHash);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) fire(entry.target.id);
        }
      },
      { threshold: 0.4 },
    );

    const observed: Element[] = [];
    Object.keys(SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>('[data-ym-goal]');
      if (!el) return;
      const goal = el.dataset.ymGoal;
      if (!goal) return;
      let params: Record<string, unknown> | undefined;
      const raw = el.dataset.ymParams;
      if (raw) {
        try { params = JSON.parse(raw); } catch { /* ignore */ }
      }
      ymReachGoal(goal, params);
    };
    document.addEventListener('click', onClick, { capture: true });

    return () => {
      window.removeEventListener('hashchange', onHash);
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      document.removeEventListener('click', onClick, { capture: true });
    };
  }, []);

  return null;
}
