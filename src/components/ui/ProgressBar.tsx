'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number // 0-100
  showLabel?: boolean
  className?: string
  color?: 'primary' | 'accent' | 'gradient'
}

export function ProgressBar({
  progress,
  showLabel = false,
  className,
  color = 'primary',
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  const colorClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    gradient: 'bg-gradient-to-r from-primary-500 to-accent-500',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-600">진행률</span>
          <span className="font-medium text-primary-600">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
