/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnail*.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'image*.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: '*.11st.co.kr',
      },
    ],
    // 이미지 최적화
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24시간
  },
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  // 번들 최적화
  experimental: {
    optimizePackageImports: ['framer-motion', 'zustand'],
  },
}

module.exports = nextConfig
