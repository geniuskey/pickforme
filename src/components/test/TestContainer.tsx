'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useTestStore } from '@/store/testStore'
import { Question, Category } from '@/types/database'
import { QuestionCard } from './QuestionCard'
import { TestProgress } from './TestProgress'
import { TestHeader } from './TestHeader'

interface TestContainerProps {
  category: Pick<Category, 'id' | 'name_ko' | 'name_en' | 'icon' | 'description'>
  questions: Pick<Question, 'id' | 'order_num' | 'question_text' | 'question_type' | 'options' | 'tags_yes' | 'tags_no'>[]
  slug: string
}

export function TestContainer({ category, questions, slug }: TestContainerProps) {
  const router = useRouter()
  const {
    startTest,
    currentIndex,
    answers,
    setAnswer,
    goToNext,
    goToPrevious,
    getProgress,
    categorySlug,
  } = useTestStore()

  // Initialize test on mount
  useEffect(() => {
    // If the category is different, start a new test
    if (categorySlug !== slug) {
      startTest(category.id, slug, questions as Question[])
    }
  }, [category.id, slug, questions, categorySlug, startTest])

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const hasAnswered = answers.some(a => a.question_id === currentQuestion?.id)

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return

    setAnswer(currentQuestion.id, answer)

    // Auto advance after answering
    setTimeout(() => {
      if (isLastQuestion) {
        // Go to result page
        router.push(`/result/${slug}`)
      } else {
        goToNext()
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      goToPrevious()
    }
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <TestHeader
        categoryName={category.name_ko}
        categoryIcon={category.icon}
        onBack={handleBack}
        canGoBack={currentIndex > 0}
      />

      <TestProgress
        current={currentIndex + 1}
        total={questions.length}
        progress={getProgress()}
      />

      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          selectedAnswer={answers.find(a => a.question_id === currentQuestion.id)?.answer}
        />
      </AnimatePresence>
    </div>
  )
}
