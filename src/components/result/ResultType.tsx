'use client'

import { motion } from 'framer-motion'

interface ResultTypeProps {
  typeName: string
  description: string
  emoji?: string | null
}

export function ResultType({ typeName, description, emoji }: ResultTypeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center mb-8"
    >
      {/* Celebration animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
        className="text-6xl mb-6"
      >
        {emoji || '🎉'}
      </motion.div>

      {/* Type name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          당신의 유형은
        </span>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
          {typeName}
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 leading-relaxed max-w-md mx-auto"
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
