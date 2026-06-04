'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { signInWithGoogle } from '@/lib/auth/googleSignIn'
import { touchLastLogin } from '@/lib/firestore/users'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
      await touchLastLogin(cred.user.uid)
      router.replace('/counsel/')
    } catch {
      setError('이메일 또는 비밀번호를 확인해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
      router.replace('/counsel/')
    } catch (err) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code !== 'auth/popup-closed-by-user') {
        setError('Google 로그인에 실패했습니다. 다시 시도해 주세요.')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">로그인</h1>
        <p className="text-gray-600 text-sm mb-8">AiCoCo AI 상담을 시작하세요</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">또는</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 disabled:opacity-60"
        >
          {googleLoading ? 'Google 로그인 중...' : 'Google로 로그인'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link href="/signup/" className="text-blue-600 font-medium hover:underline">
            회원가입
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            홈으로
          </Link>
        </p>
      </div>
    </main>
  )
}
