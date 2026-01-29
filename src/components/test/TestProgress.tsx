'use client'

import { motion } from 'framer-motion'

interface TestProgressProps {
  current: number
  total: number
  progress: number
}

export function TestProgress({ current, total, progress }: TestProgressProps) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Progress text */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          {current}번 질문
        </span>
        <span className="text-primary-600 font-medium">
          {Math.round(progress)}% 완료
        </span>
      </div>
    </div>
  )
}
