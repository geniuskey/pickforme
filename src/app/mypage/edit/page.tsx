'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    setNickname(user.nickname || '')
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('users')
        .update({ nickname: nickname.trim() })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, nickname: nickname.trim() })
      setMessage({ type: 'success', text: '프로필이 수정되었습니다.' })

      setTimeout(() => {
        router.push('/mypage')
      }, 1000)
    } catch (error) {
      setMessage({ type: 'error', text: '수정 중 오류가 발생했습니다.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return

    const confirmed = window.confirm(
      '정말 계정을 삭제하시겠습니까?\n모든 테스트 기록이 삭제되며 복구할 수 없습니다.'
    )

    if (!confirmed) return

    setIsLoading(true)
    try {
      const supabase = createClient()

      // Delete user data
      await supabase.from('user_history').delete().eq('user_id', user.id)
      await supabase.from('users').delete().eq('id', user.id)

      // Sign out
      await supabase.auth.signOut()
      setUser(null)

      router.push('/')
    } catch (error) {
      setMessage({ type: 'error', text: '계정 삭제 중 오류가 발생했습니다.' })
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 md:p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-6">프로필 수정</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                />
              </div>

              {/* Nickname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-sm ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? '저장 중...' : '저장'}
                </Button>
              </div>
            </form>

            {/* Delete Account */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                계정 삭제
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
