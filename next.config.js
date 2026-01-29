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
  },
}

module.exports = nextConfig
