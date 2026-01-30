import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PickForMe - 나에게 맞는 제품 찾기',
    short_name: 'PickForMe',
    description: '심리테스트 형식의 질문에 답하면 개인화된 상품 추천 TOP 10을 제공합니다',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#0ea5e9',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['shopping', 'lifestyle'],
    lang: 'ko',
  }
}
