import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Answer, Question } from '@/types/database'

interface TestState {
  // Current test state
  categoryId: string | null
  categorySlug: string | null
  questions: Question[]
  currentIndex: number
  answers: Answer[]
  isCompleted: boolean

  // Actions
  startTest: (categoryId: string, categorySlug: string, questions: Question[]) => void
  setAnswer: (questionId: string, answer: string) => void
  goToNext: () => void
  goToPrevious: () => void
  goToQuestion: (index: number) => void
  completeTest: () => void
  resetTest: () => void

  // Getters
  getCurrentQuestion: () => Question | null
  getProgress: () => number
  getAnswerForQuestion: (questionId: string) => string | null
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      categoryId: null,
      categorySlug: null,
      questions: [],
      currentIndex: 0,
      answers: [],
      isCompleted: false,

      startTest: (categoryId, categorySlug, questions) => {
        set({
          categoryId,
          categorySlug,
          questions,
          currentIndex: 0,
          answers: [],
          isCompleted: false,
        })
      },

      setAnswer: (questionId, answer) => {
        const { answers } = get()
        const existingIndex = answers.findIndex(a => a.question_id === questionId)

        if (existingIndex >= 0) {
          const newAnswers = [...answers]
          newAnswers[existingIndex] = { question_id: questionId, answer }
          set({ answers: newAnswers })
        } else {
          set({ answers: [...answers, { question_id: questionId, answer }] })
        }
      },

      goToNext: () => {
        const { currentIndex, questions } = get()
        if (currentIndex < questions.length - 1) {
          set({ currentIndex: currentIndex + 1 })
        }
      },

      goToPrevious: () => {
        const { currentIndex } = get()
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 })
        }
      },

      goToQuestion: (index) => {
        const { questions } = get()
        if (index >= 0 && index < questions.length) {
          set({ currentIndex: index })
        }
      },

      completeTest: () => {
        set({ isCompleted: true })
      },

      resetTest: () => {
        set({
          categoryId: null,
          categorySlug: null,
          questions: [],
          currentIndex: 0,
          answers: [],
          isCompleted: false,
        })
      },

      getCurrentQuestion: () => {
        const { questions, currentIndex } = get()
        return questions[currentIndex] || null
      },

      getProgress: () => {
        const { questions, answers } = get()
        if (questions.length === 0) return 0
        return (answers.length / questions.length) * 100
      },

      getAnswerForQuestion: (questionId) => {
        const { answers } = get()
        const answer = answers.find(a => a.question_id === questionId)
        return answer?.answer || null
      },
    }),
    {
      name: 'pickforme-test-storage',
      partialize: (state) => ({
        categoryId: state.categoryId,
        categorySlug: state.categorySlug,
        answers: state.answers,
        currentIndex: state.currentIndex,
      }),
    }
  )
)
