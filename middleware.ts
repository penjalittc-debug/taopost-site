import { NextRequest, NextResponse } from 'next/server';

// 301-редирект www.taopost.ru → taopost.ru.
// Дублирует поведение, которое обычно вешают на nginx, но работает и без него —
// чтобы sitemap / canonical и реальная страница не расходились с индексом Google/Яндекса.
export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const url = req.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Пропускаем статику Next и /public — не тратим на неё middleware.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm|woff2|woff|txt|xml|html)$).*)',
  ],
};
