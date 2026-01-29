'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  // 테스트 페이지에서는 Footer 숨김
  if (pathname?.startsWith('/test/')) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <span className="text-xl font-bold text-white">PickForMe</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md">
              나에게 맞는 제품 찾기 - 심리테스트 형식의 질문에 답하면
              개인화된 상품 추천 TOP 10을 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  제품 테스트
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  카테고리
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">정보</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">
              © {new Date().getFullYear()} PickForMe. All rights reserved.
            </p>
            <p className="text-xs">
              이 페이지는 쿠팡 파트너스 활동의 일환으로, 일정액의 수수료를 제공받습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
