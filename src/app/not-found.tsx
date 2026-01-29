import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
        </p>
        <Link
          href="/"
          className="btn-primary btn-lg"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
