'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ProductWithRank } from '@/types/api'
import { RankBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

interface ProductListProps {
  products: ProductWithRank[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl font-bold text-gray-900 mb-6"
      >
        🛒 당신을 위한 추천 TOP 10
      </motion.h2>

      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.05 }}
        >
          <a
            href={product.coupang_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
          >
            <div className="flex gap-4">
              {/* Rank badge */}
              <div className="flex-shrink-0 flex items-start pt-1">
                <RankBadge rank={product.rank} />
              </div>

              {/* Product image */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                    📦
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {product.brand && (
                  <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                )}

                <p className="text-primary-600 font-bold">
                  {formatPrice(product.price)}
                </p>

                {/* Match reason */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                    {product.match_reason}
                  </span>
                  {product.rating && (
                    <span className="text-xs text-gray-500">
                      ⭐ {product.rating}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 flex items-center text-gray-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  )
}
