// App Router + TS + Carbon workspace; hardened & cached; minimal & safe; no custom loaders.
const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,

  // DEV’de basePath/assetPrefix/rewrites KULLANMA
  // (404'lara yol açar; prod’da gerekiyorsa ayrı ele alırız)
  // buraya hiçbir basePath, assetPrefix, rewrites, redirects ekleme
  ...(isProd && process.env.NEXT_BASE_PATH ? { basePath: process.env.NEXT_BASE_PATH } : {}),
  ...(isProd && process.env.NEXT_ASSET_PREFIX ? { assetPrefix: process.env.NEXT_ASSET_PREFIX } : {}),

  // (İsteğe bağlı) Sass uyarılarını sustur
  sassOptions: { silenceDeprecations: ['legacy-js-api'] },

  // Next Image için güvenli, minimal ayar
  images: { formats: ['image/avif', 'image/webp'] },

  // Kırıcı olmayan minimal güvenlik başlıkları
  async headers() {
    return [
      // Strong caching for Next static assets
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Favicons get a week
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
      },
      // Manifest is short-lived
      {
        source: '/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      // Media (videos/images) with SWR and range support
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      // Global security headers
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default nextConfig;

// CSP intentionally omitted here to avoid breakage; handle via a separate review if needed.
// PWA (next-pwa) not configured here by design.
