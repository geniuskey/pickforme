import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: {
    default: 'PickForMe - 나에게 맞는 제품 찾기',
    template: '%s | PickForMe',
  },
  description: '심리테스트 형식의 질문에 답하면 개인화된 상품 추천 TOP 10을 제공하는 쇼핑 큐레이션 서비스',
  keywords: ['제품추천', '쇼핑', '심리테스트', '맞춤추천', '가전제품', '쿠팡'],
  authors: [{ name: 'PickForMe' }],
  creator: 'PickForMe',
  publisher: 'PickForMe',
  metadataBase: new URL('https://pickforme.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pickforme.vercel.app',
    siteName: 'PickForMe',
    title: 'PickForMe - 나에게 맞는 제품 찾기',
    description: '심리테스트 형식의 질문에 답하면 개인화된 상품 추천 TOP 10을 제공합니다',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PickForMe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PickForMe - 나에게 맞는 제품 찾기',
    description: '심리테스트 형식의 질문에 답하면 개인화된 상품 추천 TOP 10을 제공합니다',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
