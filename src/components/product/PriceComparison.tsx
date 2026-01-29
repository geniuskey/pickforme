'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface PriceComparisonProps {
  productName: string
}

interface ComparisonData {
  coupang?: { price: number; url: string }
  naver?: { price: number; url: string }
  elevenst?: { price: number; url: string }
  savings?: number
  recommendation?: 'coupang' | 'naver' | 'elevenst'
}

const platformInfo = {
  coupang: { name: '쿠팡', color: 'bg-red-500', logo: '🔴' },
  naver: { name: '네이버', color: 'bg-green-500', logo: '🟢' },
  elevenst: { name: '11번가', color: 'bg-orange-500', logo: '🟠' },
}

export function PriceComparison({ productName }: PriceComparisonProps) {
  const [comparison, setComparison] = useState<ComparisonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const response = await fetch(
          `/api/products/compare?name=${encodeURIComponent(productName)}&mode=compare`
        )
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setComparison(data.comparison)
      } catch (err) {
        setError('가격 비교를 불러올 수 없습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComparison()
  }, [productName])

  if (isLoading) {
    return (
      <Card className="p-4">
        <LoadingSpinner size="sm" text="가격 비교 중..." />
      </Card>
    )
  }

  if (error || !comparison) {
    return null
  }

  const platforms = ['coupang', 'naver', 'elevenst'] as const
  const availablePlatforms = platforms.filter((p) => comparison[p])

  if (availablePlatforms.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>💰</span>
          가격 비교
        </h4>

        <div className="space-y-2">
          {availablePlatforms.map((platform) => {
            const data = comparison[platform]!
            const info = platformInfo[platform]
            const isLowest = comparison.recommendation === platform

            return (
              <a
                key={platform}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center justify-between p-3 rounded-lg
                  transition-colors hover:bg-gray-50
                  ${isLowest ? 'ring-2 ring-primary-500 bg-primary-50' : 'bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-2">
                  <span>{info.logo}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {info.name}
                  </span>
                  {isLowest && (
                    <span className="text-xs px-2 py-0.5 bg-primary-500 text-white rounded-full">
                      최저가
                    </span>
                  )}
                </div>
                <span className={`font-bold ${isLowest ? 'text-primary-600' : 'text-gray-900'}`}>
                  {formatPrice(data.price)}
                </span>
              </a>
            )
          })}
        </div>

        {comparison.savings && comparison.savings > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-500">
              최대 <span className="font-bold text-primary-600">{formatPrice(comparison.savings)}</span> 절약 가능!
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}
