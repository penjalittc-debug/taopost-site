import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    // Permissions-Policy отсутствовал в ответах — добавляем в репозиторий как
    // источник правды. HSTS/X-Frame-Options/nosniff/Referrer-Policy уже ставит
    // nginx; здесь их не дублируем, чтобы не было двойных заголовков.
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // Локальные шрифты (app/fonts.css) не меняются: при обновлении
        // шрифта файл кладём под новым именем. Кешируем на год.
        source: "/fonts/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
