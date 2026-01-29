import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null): string {
  if (price === null) return '가격 미정'
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천'
  }
  return num.toString()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateShareUrl(slug: string, resultTypeCode?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pickforme.vercel.app'
  if (resultTypeCode) {
    return `${baseUrl}/result/${slug}?type=${resultTypeCode}`
  }
  return `${baseUrl}/test/${slug}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
