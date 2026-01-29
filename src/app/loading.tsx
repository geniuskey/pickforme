import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <LoadingSpinner size="lg" text="로딩중..." />
    </div>
  )
}
