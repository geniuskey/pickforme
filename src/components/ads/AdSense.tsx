'use client'

import { useEffect, useRef } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

// Google AdSense publisher ID - replace with your actual ID
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'

export function AdSense({
  adSlot,
  adFormat = 'auto',
  style,
  className,
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    // Prevent double loading
    if (isLoaded.current) {
      return
    }

    try {
      // Push ad to Google
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      isLoaded.current = true
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  // Show placeholder in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        AdSense 광고 영역 (개발 모드)
      </div>
    )
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}

// Banner ad (horizontal, typically for header/footer)
export function BannerAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // Replace with your ad slot
      adFormat="horizontal"
      className={className}
      style={{ minHeight: 90 }}
    />
  )
}

// In-feed ad (for between list items)
export function InFeedAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // Replace with your ad slot
      adFormat="fluid"
      className={className}
    />
  )
}

// Sidebar ad (vertical)
export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // Replace with your ad slot
      adFormat="vertical"
      className={className}
      style={{ minHeight: 250 }}
    />
  )
}
