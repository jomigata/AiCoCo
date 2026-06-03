import { HttpsError } from 'firebase-functions/v2/https'
import type { CallableRequest } from 'firebase-functions/v2/https'
import { getApp } from 'firebase-admin/app'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'

const FIRESTORE_DATABASE_ID = 'aicoco-db'

const db = () => getFirestore(getApp(), FIRESTORE_DATABASE_ID)

export function requireAuth<T>(request: CallableRequest<T>): string {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', '로그인이 필요합니다.')
  }
  return request.auth.uid
}

export async function assertSessionOwner(sessionId: string, uid: string) {
  const snap = await db().collection('sessions').doc(sessionId).get()
  if (!snap.exists) {
    throw new HttpsError('not-found', '상담 세션을 찾을 수 없습니다.')
  }
  const data = snap.data()!
  if (data.clientId !== uid) {
    throw new HttpsError('permission-denied', '이 세션에 접근할 수 없습니다.')
  }
  if (data.status !== 'active') {
    throw new HttpsError('failed-precondition', '종료되었거나 에스컬레이션된 세션입니다.')
  }
  return { ref: snap.ref, data }
}

export async function assertSessionClient(sessionId: string, uid: string) {
  const snap = await db().collection('sessions').doc(sessionId).get()
  if (!snap.exists) {
    throw new HttpsError('not-found', '상담 세션을 찾을 수 없습니다.')
  }
  const data = snap.data()!
  if (data.clientId !== uid) {
    throw new HttpsError('permission-denied', '이 세션에 접근할 수 없습니다.')
  }
  return { ref: snap.ref, data }
}

export async function loadRecentMessages(sessionId: string, limit = 20) {
  const snap = await db()
    .collection('sessions')
    .doc(sessionId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .limitToLast(limit)
    .get()

  return snap.docs.map((d) => d.data())
}

export function toGeminiHistory(
  messages: Record<string, unknown>[]
): { role: 'user' | 'model'; parts: { text: string }[] }[] {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: String(m.content) }],
    }))
}

export { db, FieldValue, Timestamp }
