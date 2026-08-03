import { NextRequest, NextResponse } from 'next/server';

// 301-редирект www.taopost.ru → taopost.ru.
// Дублирует поведение, которое обычно вешают на nginx, но работает и без него —
// чтобы sitemap / canonical и реальная страница не расходились с индексом Google/Яндекса.
//
// ВАЖНО: за nginx `req.nextUrl` держит внутренний адрес Node (localhost:3000, http).
// Если склонировать его и подменить только host — редирект уедёт на порт 3000 с http.
// Поэтому Location собираем вручную из внешнего Host + X-Forwarded-Proto (со значением по умолчанию https).
export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (!host.startsWith('www.')) return NextResponse.next();

  const apex = host.slice(4).replace(/:\d+$/, '');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const target = `${proto}://${apex}${req.nextUrl.pathname}${req.nextUrl.search}`;
  return NextResponse.redirect(target, 301);
}

export const config = {
  matcher: [
    // Пропускаем статику Next и /public — не тратим на неё middleware.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm|woff2|woff|txt|xml|html)$).*)',
  ],
};
