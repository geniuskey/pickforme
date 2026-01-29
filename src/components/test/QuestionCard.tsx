'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Question } from '@/types/database'

interface QuestionCardProps {
  question: Pick<Question, 'id' | 'question_text' | 'question_type' | 'options'>
  questionNumber: number
  totalQuestions: number
  onAnswer: (answer: string) => void
  selectedAnswer?: string
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
}: QuestionCardProps) {
  const isYesNo = question.question_type === 'yes_no'

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
    >
      {/* Question number */}
      <div className="text-sm text-gray-400 mb-4">
        Q{questionNumber} / {totalQuestions}
      </div>

      {/* Question text */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
        {question.question_text}
      </h2>

      {/* Answer buttons */}
      <div className="space-y-4">
        {isYesNo ? (
          <>
            <AnswerButton
              label="네 🙆"
              value="yes"
              isSelected={selectedAnswer === 'yes'}
              onClick={() => onAnswer('yes')}
            />
            <AnswerButton
              label="아니요 🙅"
              value="no"
              isSelected={selectedAnswer === 'no'}
              onClick={() => onAnswer('no')}
            />
          </>
        ) : (
          question.options?.map((option, index) => (
            <AnswerButton
              key={index}
              label={option}
              value={option}
              isSelected={selectedAnswer === option}
              onClick={() => onAnswer(option)}
            />
          ))
        )}
      </div>
    </motion.div>
  )
}

interface AnswerButtonProps {
  label: string
  value: string
  isSelected: boolean
  onClick: () => void
}

function AnswerButton({ label, isSelected, onClick }: AnswerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-2xl text-lg font-medium transition-all duration-200',
        'border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isSelected
          ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/30'
          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
      )}
    >
      {label}
    </motion.button>
  )
}
