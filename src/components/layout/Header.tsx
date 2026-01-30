'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

export function Header() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 테스트 페이지에서는 미니멀 헤더
  const isTestPage = pathname?.startsWith('/test/')

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

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/categories', label: '카테고리' },
  ]

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-bold gradient-text">PickForMe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* User/Login */}
            {user ? (
              <Link
                href="/mypage"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <span className="text-sm font-medium">{user.nickname || '마이페이지'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                로그인
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="메뉴"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50 md:hidden"
            >
              <nav className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-2">
                  {user ? (
                    <Link
                      href="/mypage"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      마이페이지
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50"
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
