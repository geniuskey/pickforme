'use client'

import { motion } from 'framer-motion'

interface Stats {
  categories: number
  products: number
  tests: number
}

interface HeroSectionProps {
  stats: Stats
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-200" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            🎯 심리테스트 형식의 쇼핑 큐레이션
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">나에게 딱 맞는</span>
          <br />
          제품 찾기
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          간단한 질문에 답하면
          <br className="md:hidden" />
          <strong className="text-gray-900"> 나만을 위한 TOP 10</strong>을 추천해드려요
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#categories"
            className="btn-primary btn-lg"
          >
            테스트 시작하기
          </a>
          <a
            href="#popular"
            className="btn-secondary btn-lg"
          >
            인기 테스트 보기
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div>
            <div className="text-3xl font-bold text-primary-600">{stats.categories}</div>
            <div className="text-sm text-gray-500">카테고리</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">{stats.products}</div>
            <div className="text-sm text-gray-500">추천 제품</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">{stats.tests.toLocaleString()}</div>
            <div className="text-sm text-gray-500">테스트 완료</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
