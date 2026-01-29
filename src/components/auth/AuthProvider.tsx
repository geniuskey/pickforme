'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            setUser(profile)
          } else {
            // Create user profile if doesn't exist
            const newUser = {
              id: session.user.id,
              email: session.user.email!,
              nickname: session.user.user_metadata?.full_name || null,
              avatar_url: session.user.user_metadata?.avatar_url || null,
            }
            await supabase.from('users').insert(newUser)
            setUser({ ...newUser, created_at: new Date().toISOString() })
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            setUser(profile)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setLoading])

  return <>{children}</>
}
