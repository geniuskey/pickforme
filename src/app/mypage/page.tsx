'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { UserHistory, Category, ResultType } from '@/types/database'

interface HistoryWithDetails extends UserHistory {
  categories: Pick<Category, 'name_ko' | 'icon' | 'slug'>
  result_types: Pick<ResultType, 'type_name' | 'emoji'>
}

export default function MyPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [history, setHistory] = useState<HistoryWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchHistory = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('user_history')
        .select(`
          *,
          categories (name_ko, icon, slug),
          result_types (type_name, emoji)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (!error && data) {
        setHistory(data as unknown as HistoryWithDetails[])
      }
      setIsLoading(false)
    }

    fetchHistory()
  }, [user, router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    logout()
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.nickname?.[0] || user.email[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {user.nickname || '사용자'}
              </h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/mypage/edit')}
            >
              프로필 수정
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            테스트 히스토리
          </h2>

          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner text="불러오는 중..." />
            </div>
          ) : history.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-500 mb-4">아직 테스트 기록이 없어요</p>
              <Button
                variant="primary"
                onClick={() => router.push('/')}
              >
                테스트 하러 가기
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link href={`/test/${item.categories.slug}`}>
                    <Card hover className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          {item.categories.icon || '📦'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.categories.name_ko}
                          </h3>
                          <p className="text-sm text-primary-600">
                            {item.result_types.emoji} {item.result_types.type_name}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.created_at).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
