'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function ResultHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        <span className="text-xl font-bold gradient-text">PickForMe</span>
      </Link>
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        홈으로
      </Link>
    </motion.div>
  )
}
