import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PickForMe - 나에게 맞는 제품 찾기'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f5f3ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 48,
              fontWeight: 'bold',
              marginRight: 20,
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            PickForMe
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          나에게 딱 맞는 제품 찾기
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          심리테스트 형식의 질문에 답하면 맞춤 추천 TOP 10
        </div>

        {/* Decorative elements */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 50,
            fontSize: 48,
          }}
        >
          <span>🎯</span>
          <span>🛒</span>
          <span>✨</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
