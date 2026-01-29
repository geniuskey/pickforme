'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export function RankBadge({ rank }: { rank: number }) {
  const colors = {
    1: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white',
    2: 'bg-gradient-to-r from-gray-300 to-gray-400 text-white',
    3: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white',
  }

  const bgColor = colors[rank as keyof typeof colors] || 'bg-primary-500 text-white'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-md',
        bgColor
      )}
    >
      {rank}
    </span>
  )
}
