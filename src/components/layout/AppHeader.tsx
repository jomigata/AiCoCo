'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { useAuth } from '@/hooks/useAuth'
import { auth } from '@/lib/firebase'

const navItems = [
  { href: '/', label: '홈' },
  { href: '/counsel/', label: 'AI 상담', auth: true },
  { href: '/dashboard/', label: '내 상담', auth: true },
]

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  async function handleLogout() {
    await signOut(auth)
    router.replace('/login/')
  }

  return (
    <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-gray-800 shrink-0">
          AiCoCo
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {navItems.map((item) => {
            if (item.auth && !user) return null
            const active = pathname === item.href || pathname === item.href.slice(0, -1)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 whitespace-nowrap"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href="/login/" className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                로그인
              </Link>
              <Link
                href="/signup/"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
