import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AiCoCo - AI 심리상담 플랫폼',
    description: '전문 심리상담가와 AI가 함께하는 혁신적인 심리상담 플랫폼',
    keywords: '심리상담, AI상담, 온라인상담, 심리테스트, 정신건강',
    authors: [{ name: 'AiCoCo Team' }],
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                    {children}
                </div>
            </body>
        </html>
    )
}
