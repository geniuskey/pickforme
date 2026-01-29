'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'

interface PriceHistoryProps {
  productId: string
}

interface PriceStats {
  current: number
  lowest: number
  highest: number
  average: number
  trend: 'up' | 'down' | 'stable'
  lowestDate: string
  history: { date: string; price: number }[]
}

export function PriceHistory({ productId }: PriceHistoryProps) {
  const [stats, setStats] = useState<PriceStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/products/price-history?productId=${productId}`)
        if (!response.ok) {
          setStats(null)
          return
        }
        const data = await response.json()
        setStats(data.priceStats)
      } catch (err) {
        setStats(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [productId])

  if (isLoading || !stats) {
    return null
  }

  const trendInfo = {
    up: { icon: '📈', text: '상승세', color: 'text-red-500' },
    down: { icon: '📉', text: '하락세', color: 'text-green-500' },
    stable: { icon: '➡️', text: '안정', color: 'text-gray-500' },
  }

  const trend = trendInfo[stats.trend]
  const isAtLowest = stats.current <= stats.lowest * 1.05

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📊</span>
          가격 변동
        </h4>

        {/* Price stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">최저가</div>
            <div className="text-sm font-bold text-green-600">
              {formatPrice(stats.lowest)}
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">현재가</div>
            <div className="text-sm font-bold">
              {formatPrice(stats.current)}
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">최고가</div>
            <div className="text-sm font-bold text-red-500">
              {formatPrice(stats.highest)}
            </div>
          </div>
        </div>

        {/* Trend and alert */}
        <div className="flex items-center justify-between text-xs">
          <span className={`flex items-center gap-1 ${trend.color}`}>
            {trend.icon} {trend.text}
          </span>
          {isAtLowest && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
              🔥 최저가 근접!
            </span>
          )}
        </div>

        {/* Simple price chart */}
        {stats.history.length > 1 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-end gap-1 h-12">
              {stats.history.slice(-14).map((point, i) => {
                const height =
                  ((point.price - stats.lowest) / (stats.highest - stats.lowest)) * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary-200 rounded-t transition-all hover:bg-primary-400"
                    style={{ height: `${Math.max(10, height)}%` }}
                    title={`${point.date}: ${formatPrice(point.price)}`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>14일 전</span>
              <span>오늘</span>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}
