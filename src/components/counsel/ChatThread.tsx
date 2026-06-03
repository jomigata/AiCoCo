'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { subscribeSessionMessages } from '@/lib/firestore/sessions'
import { sendCounselMessage } from '@/lib/counsel/api'
import { getCallableErrorMessage } from '@/lib/counsel/errors'
import type { MessageDoc } from '@/types/firestore'

interface ChatThreadProps {
  sessionId: string
}

export function ChatThread({ sessionId }: ChatThreadProps) {
  const [messages, setMessages] = useState<(MessageDoc & { id: string })[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = subscribeSessionMessages(sessionId, setMessages, (err) => {
      setError(err.message)
    })
    return () => unsub()
  }, [sessionId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    setSending(true)
    setError(null)
    setInput('')

    try {
      await sendCounselMessage(sessionId, text)
    } catch (err) {
      setError(getCallableErrorMessage(err))
      setInput(text)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-[min(70vh,640px)] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-8">
            편하게 마음을 나눠 보세요. AI는 전문 치료를 대체하지 않습니다.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="px-4 py-2 text-sm text-red-600 bg-red-50 border-t border-red-100">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-4 border-t border-gray-100 bg-gray-50"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          maxLength={2000}
          disabled={sending}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 disabled:opacity-50"
          aria-label="전송"
        >
          {sending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  )
}
