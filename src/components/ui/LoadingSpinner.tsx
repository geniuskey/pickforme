'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className={cn(
          'rounded-full border-primary-200 border-t-primary-500 animate-spin',
          sizes[size]
        )}
      />
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  )
}

export function FullPageLoader({ text = '로딩중...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}
