import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { MessageDoc, SessionDoc } from '@/types/firestore'

export function subscribeSessionMessages(
  sessionId: string,
  onMessages: (messages: (MessageDoc & { id: string })[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, 'sessions', sessionId, 'messages'),
    orderBy('createdAt', 'asc')
  )

  return onSnapshot(
    q,
    (snap) => {
      const messages = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as MessageDoc),
      }))
      onMessages(messages)
    },
    (err) => onError?.(err)
  )
}

export function subscribeClientSessions(
  clientId: string,
  onSessions: (sessions: (SessionDoc & { id: string })[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'sessions'),
    where('clientId', '==', clientId),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, (snap) => {
    onSessions(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as SessionDoc),
      }))
    )
  })
}
