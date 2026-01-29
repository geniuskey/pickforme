'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">😵</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          문제가 발생했어요
        </h1>
        <p className="text-gray-600 mb-8">
          일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary btn-md"
          >
            다시 시도
          </button>
          <Link href="/" className="btn-secondary btn-md">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
