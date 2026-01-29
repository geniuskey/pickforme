'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl',
      secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 active:bg-gray-100',
      accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-lg shadow-accent-500/25',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
      outline: 'bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100',
    }

    const sizes = {
      sm: 'h-10 px-4 text-sm rounded-lg',
      md: 'h-12 px-6 text-base rounded-xl',
      lg: 'h-14 px-8 text-lg rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            로딩중...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
