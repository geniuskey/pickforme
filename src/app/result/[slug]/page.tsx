'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestStore } from '@/store/testStore'
import { ResultResponse } from '@/types/api'
import { ResultHeader } from '@/components/result/ResultHeader'
import { ResultType } from '@/components/result/ResultType'
import { ProductList } from '@/components/result/ProductList'
import { ShareButtons } from '@/components/result/ShareButtons'
import { FullPageLoader } from '@/components/ui/LoadingSpinner'
import { use } from 'react'

interface Props {
  params: Promise<{ slug: string }>
}

export default function ResultPage({ params }: Props) {
  const { slug } = use(params)
  const router = useRouter()
  const { categoryId, answers, categorySlug, resetTest } = useTestStore()
  const [result, setResult] = useState<ResultResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if no test data
    if (!categoryId || answers.length === 0 || categorySlug !== slug) {
      router.push(`/test/${slug}`)
      return
    }

    // Fetch result
    const fetchResult = async () => {
      try {
        const response = await fetch('/api/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category_id: categoryId,
            answers: answers,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch result')
        }

        const data: ResultResponse = await response.json()
        setResult(data)
      } catch (err) {
        setError('결과를 불러오는데 실패했습니다.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResult()
  }, [categoryId, answers, categorySlug, slug, router])

  const handleRetry = () => {
    resetTest()
    router.push(`/test/${slug}`)
  }

  if (isLoading) {
    return <FullPageLoader text="결과를 분석하고 있어요..." />
  }

  if (error || !result) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || '결과를 불러올 수 없습니다.'}</p>
          <button
            onClick={handleRetry}
            className="btn-primary btn-md"
          >
            다시 테스트하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg pb-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <ResultHeader />

        <ResultType
          typeName={result.result_type.type_name}
          description={result.result_type.description}
          emoji={result.result_type.emoji}
        />

        <ShareButtons
          typeName={result.result_type.type_name}
          slug={slug}
        />

        <ProductList products={result.products} />

        <div className="mt-12 text-center space-y-4">
          <button
            onClick={handleRetry}
            className="btn-secondary btn-lg w-full max-w-sm mx-auto"
          >
            다시 테스트하기
          </button>
          <p className="text-xs text-gray-400">
            이 페이지의 링크를 통해 구매 시 일정 수수료를 받을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
