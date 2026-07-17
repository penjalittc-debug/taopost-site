'use client';
import { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

// 'shown'  — контент виден (SSR / no-JS / prefers-reduced-motion / уже в вьюпорте).
//            Так контент НИКОГДА не остаётся невидимым без JS и не тормозит LCP.
// 'hidden' — только для секций ниже первого экрана: прячем после mount и плавно
//            показываем при попадании в вьюпорт.
type Phase = 'shown' | 'hidden';

export default function FadeIn({ children, delay = 0, className, style }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('shown');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Уважаем системную настройку «меньше движения» — просто оставляем видимым.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Если элемент уже в зоне видимости на момент загрузки (первый экран) —
    // не анимируем, чтобы не мигал и не задерживал LCP.
    const rect = el.getBoundingClientRect();
    const inViewOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewOnLoad) return;

    // Ниже первого экрана — можно спрятать и анимировать появление.
    setAnimate(true);
    setPhase('hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('shown');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = phase === 'hidden';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(24px)' : 'translateY(0)',
        transition: animate
          ? `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
