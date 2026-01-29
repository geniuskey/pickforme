'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ShareButtonsProps {
  typeName: string
  slug: string
}

export function ShareButtons({ typeName, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/test/${slug}`
    : `https://pickforme.vercel.app/test/${slug}`

  const shareText = `나의 유형은 "${typeName}"! 나에게 맞는 제품 찾기 테스트 해보세요 🎯`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShareKakao = () => {
    // Kakao SDK share (requires Kakao SDK initialization)
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      const Kakao = (window as any).Kakao
      if (!Kakao.isInitialized()) {
        // Initialize with your Kakao app key
        // Kakao.init('YOUR_KAKAO_APP_KEY')
      }
      // Kakao.Share.sendDefault({...})
    }
    // Fallback to web share
    handleWebShare()
  }

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PickForMe - 나에게 맞는 제품 찾기',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="flex justify-center gap-3 mb-8"
    >
      {/* Kakao */}
      <button
        onClick={handleShareKakao}
        className="flex items-center gap-2 px-4 py-2 bg-[#FEE500] text-[#3C1E1E] rounded-full text-sm font-medium hover:bg-[#FFD700] transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.78 5.18 4.44 6.54-.14.5-.9 3.24-.93 3.46 0 0-.02.16.08.22.1.06.22.02.22.02.29-.04 3.36-2.2 3.89-2.58.76.1 1.54.16 2.3.16 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
        </svg>
        카카오톡
      </button>

      {/* Twitter */}
      <button
        onClick={handleShareTwitter}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-full text-sm font-medium hover:bg-[#1a8cd8] transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        트위터
      </button>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        {copied ? '복사됨!' : '링크 복사'}
      </button>
    </motion.div>
  )
}
