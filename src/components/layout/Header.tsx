'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

export function Header() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  // 테스트 페이지에서는 미니멀 헤더
  const isTestPage = pathname?.startsWith('/test/')
  const isResultPage = pathname?.startsWith('/result/')

  if (isTestPage) {
    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary-600">
            PickForMe
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            홈으로
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-xl font-bold gradient-text">PickForMe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
            )}
          >
            홈
          </Link>
          <Link
            href="/categories"
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === '/categories' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
            )}
          >
            카테고리
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/mypage"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm font-medium">{user.nickname || '마이페이지'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
