'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { ChatThread } from '@/components/counsel/ChatThread'
import { startAiSession, endAiSession } from '@/lib/counsel/api'

export default function CounselPage() {
  const { user, loading } = useRequireAuth()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [initError, setInitError] = useState<string | null>(null)
  const [initializing, setInitializing] = useState(true)
  const [ending, setEnding] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  const initSession = useCallback(async () => {
    setInitializing(true)
    setInitError(null)
    try {
      const { sessionId: id } = await startAiSession('AI 상담')
      setSessionId(id)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : '상담 세션을 시작할 수 없습니다. Functions 배포 및 로그인을 확인하세요.'
      setInitError(message)
    } finally {
      setInitializing(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && user) {
      initSession()
    }
  }, [loading, user, initSession])

  async function handleEndSession() {
    if (!sessionId) return
    setEnding(true)
    try {
      const { summary: s } = await endAiSession(sessionId)
      setSummary(s)
      setSessionId(null)
    } catch (err) {
      setInitError(
        err instanceof Error ? err.message : '세션 종료에 실패했습니다.'
      )
    } finally {
      setEnding(false)
    }
  }

  async function handleLogout() {
    await signOut(auth)
    router.replace('/login/')
  }

  if (loading || initializing) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">상담 준비 중...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI 상담</h1>
            <p className="text-sm text-gray-500 mt-1">
              {user?.email} · AI는 전문 치료를 대체하지 않습니다
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/"
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
            >
              내 상담
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        </header>

        {summary && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-gray-700">
            <p className="font-semibold text-blue-800 mb-2">상담 요약</p>
            <p className="whitespace-pre-wrap">{summary}</p>
            <button
              type="button"
              onClick={() => {
                setSummary(null)
                initSession()
              }}
              className="mt-4 text-blue-600 font-medium text-sm hover:underline"
            >
              새 상담 시작
            </button>
          </div>
        )}

        {initError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
            <p>{initError}</p>
            <p className="mt-2 text-xs text-amber-800">
              AI 응답 실패 시: Secret 갱신 후{' '}
              <code className="bg-amber-100 px-1 rounded">npm run deploy:functions</code>
            </p>
            <button
              type="button"
              onClick={initSession}
              className="mt-2 text-amber-800 font-medium hover:underline"
            >
              다시 시도
            </button>
          </div>
        )}

        {sessionId && !summary && (
          <>
            <ChatThread sessionId={sessionId} />
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleEndSession}
                disabled={ending}
                className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                {ending ? '종료 중...' : '상담 종료'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
