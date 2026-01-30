import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://pickforme.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/mypage',
          '/_next/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yeti', // Naver
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
