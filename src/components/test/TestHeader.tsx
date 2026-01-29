'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface TestHeaderProps {
  categoryName: string
  categoryIcon: string | null
  onBack: () => void
  canGoBack: boolean
}

export function TestHeader({ categoryName, categoryIcon, onBack, canGoBack }: TestHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Back button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        disabled={!canGoBack}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
          ${canGoBack
            ? 'text-gray-600 hover:bg-gray-100 cursor-pointer'
            : 'text-gray-300 cursor-not-allowed'
          }
        `}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">이전</span>
      </motion.button>

      {/* Category info */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">{categoryIcon || '📦'}</span>
        <span className="font-semibold text-gray-900">{categoryName}</span>
      </div>

      {/* Exit button */}
      <Link
        href="/"
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
    </div>
  )
}
