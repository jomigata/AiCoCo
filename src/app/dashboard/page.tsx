'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useAuthContext } from '@/components/auth/AuthProvider'
import { syncCounselFaqFromSheet } from '@/lib/counsel/api'
import { getCallableErrorMessage } from '@/lib/counsel/errors'
import { subscribeClientSessions } from '@/lib/firestore/sessions'
import type { SessionDoc } from '@/types/firestore'

export default function DashboardPage() {
  const { user, loading } = useRequireAuth()
  const { role } = useAuthContext()
  const [sessions, setSessions] = useState<(SessionDoc & { id: string })[]>([])
  const [syncingFaq, setSyncingFaq] = useState(false)
  const [faqSyncMsg, setFaqSyncMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    return subscribeClientSessions(user.uid, setSessions)
  }, [user])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">불러오는 중...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">내 상담</h1>
          <p className="text-sm text-gray-500 mt-1">지금까지의 상담 세션 목록</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            href="/counsel/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm"
          >
            새 AI 상담 시작
          </Link>
          {role === 'admin' && (
            <button
              type="button"
              disabled={syncingFaq}
              onClick={async () => {
                setSyncingFaq(true)
                setFaqSyncMsg(null)
                try {
                  const r = await syncCounselFaqFromSheet()
                  setFaqSyncMsg(`FAQ 동기화 완료: ${r.synced}건 (삭제 ${r.deleted}건)`)
                } catch (err) {
                  setFaqSyncMsg(getCallableErrorMessage(err))
                } finally {
                  setSyncingFaq(false)
                }
              }}
              className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 disabled:opacity-60"
            >
              {syncingFaq ? '동기화 중...' : 'FAQ 시트 동기화'}
            </button>
          )}
        </div>
        {faqSyncMsg && (
          <p className="mb-4 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            {faqSyncMsg}
          </p>
        )}

        <ul className="space-y-3">
          {sessions.length === 0 && (
            <li className="text-gray-500 text-sm py-8 text-center border border-dashed border-gray-200 rounded-xl">
              아직 상담 기록이 없습니다.
            </li>
          )}
          {sessions.map((s) => (
            <li
              key={s.id}
              className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <p className="font-medium text-gray-800">{s.title ?? 'AI 상담'}</p>
              <p className="text-xs text-gray-500 mt-1">
                {s.type.toUpperCase()} · {s.status} · 위험도 {s.riskLevel}
              </p>
              {s.summary && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{s.summary}</p>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            홈으로
          </Link>
        </p>
      </div>
    </main>
  )
}
