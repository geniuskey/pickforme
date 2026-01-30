import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

// SVG 아이콘 템플릿
function createIconSvg(size: number): string {
  const borderRadius = Math.round(size * 0.2)
  const fontSize = Math.round(size * 0.6)

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#grad)"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="white"
      >P</text>
    </svg>
  `.trim()
}

async function generateIcons() {
  // public 폴더 확인
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  const sizes = [
    { name: 'favicon.ico', size: 32 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ]

  for (const { name, size } of sizes) {
    const svg = createIconSvg(size)
    const outputPath = path.join(PUBLIC_DIR, name)

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath)

    console.log(`✅ Generated: ${name}`)
  }

  // OG Image 생성 (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0f9ff;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e0f2fe;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f5f3ff;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Logo box -->
      <rect x="460" y="150" width="80" height="80" rx="16" fill="url(#logo)"/>
      <text x="500" y="205" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold" fill="white">P</text>

      <!-- PickForMe text -->
      <text x="560" y="205" font-family="Arial" font-size="40" font-weight="bold" fill="#0ea5e9">PickForMe</text>

      <!-- Main title -->
      <text x="600" y="320" text-anchor="middle" font-family="Arial" font-size="56" font-weight="bold" fill="#1f2937">나에게 딱 맞는 제품 찾기</text>

      <!-- Subtitle -->
      <text x="600" y="380" text-anchor="middle" font-family="Arial" font-size="24" fill="#6b7280">심리테스트 형식의 질문에 답하면 맞춤 추천 TOP 10</text>

      <!-- Emojis -->
      <text x="520" y="480" font-size="40">🎯</text>
      <text x="580" y="480" font-size="40">🛒</text>
      <text x="640" y="480" font-size="40">✨</text>
    </svg>
  `.trim()

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'))

  console.log('✅ Generated: og-image.png')
  console.log('\n🎉 All icons generated successfully!')
}

generateIcons().catch(console.error)
