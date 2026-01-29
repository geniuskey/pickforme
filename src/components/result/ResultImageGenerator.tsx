'use client'

import { useRef, useState, useCallback } from 'react'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/Button'

interface ResultImageGeneratorProps {
  typeName: string
  description: string
  emoji?: string | null
  categoryName: string
}

export function ResultImageGenerator({
  typeName,
  description,
  emoji,
  categoryName,
}: ResultImageGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return

    setIsGenerating(true)

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })

      // Create download link
      const link = document.createElement('a')
      link.download = `pickforme-${categoryName}-result.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [categoryName])

  return (
    <div>
      {/* Hidden card for image generation */}
      <div className="absolute -left-[9999px]">
        <div
          ref={cardRef}
          className="w-[600px] p-12 bg-gradient-to-br from-primary-50 via-white to-accent-50"
        >
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl font-bold text-primary-600">PickForMe</span>
            </div>

            {/* Category */}
            <p className="text-gray-500 mb-4">
              나에게 맞는 {categoryName} 찾기
            </p>

            {/* Emoji */}
            <div className="text-8xl mb-6">{emoji || '🎉'}</div>

            {/* Type name */}
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              당신의 유형은
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-6">
              {typeName}
            </h1>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
              {description}
            </p>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                pickforme.vercel.app
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={generateImage}
        isLoading={isGenerating}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        이미지 저장
      </Button>
    </div>
  )
}
