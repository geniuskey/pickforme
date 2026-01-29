'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { formatNumber } from '@/lib/utils'
import { Category } from '@/types/database'

interface CategoryGridProps {
  categories: Pick<Category, 'id' | 'slug' | 'name_ko' | 'name_en' | 'icon' | 'view_count' | 'description'>[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">아직 등록된 카테고리가 없습니다.</p>
      </div>
    )
  }

  return (
    <div id="categories" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Link href={`/test/${category.slug}`}>
            <Card hover className="p-6 text-center h-full">
              <div className="text-4xl mb-4">{category.icon || '📦'}</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {category.name_ko}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {category.name_en}
              </p>
              <div className="text-xs text-primary-600 font-medium">
                {formatNumber(category.view_count)}명 참여
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
