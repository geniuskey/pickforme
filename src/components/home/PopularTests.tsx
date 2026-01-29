'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatNumber } from '@/lib/utils'
import { Category } from '@/types/database'

interface PopularTestsProps {
  categories: Pick<Category, 'id' | 'slug' | 'name_ko' | 'icon' | 'view_count' | 'description'>[]
}

export function PopularTests({ categories }: PopularTestsProps) {
  if (categories.length === 0) {
    return null
  }

  const rankEmojis = ['🥇', '🥈', '🥉']

  return (
    <div id="popular">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          🔥 인기 테스트 TOP 3
        </h2>
        <p className="text-gray-600">
          지금 가장 많이 참여하는 테스트를 확인해보세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/test/${category.slug}`}>
              <Card hover className="relative overflow-visible">
                {/* Rank badge */}
                <div className="absolute -top-3 -left-3 text-3xl z-10">
                  {rankEmojis[index]}
                </div>

                <div className="p-6 pt-8">
                  <div className="text-5xl mb-4 text-center">
                    {category.icon || '📦'}
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2">
                    나에게 맞는
                    <br />
                    <span className="gradient-text">{category.name_ko}</span> 찾기
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 text-center mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <Badge variant="primary">
                      {formatNumber(category.view_count)}명 참여
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
