import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebase'
import type {
  EndAiSessionRequest,
  EndAiSessionResponse,
  SendCounselMessageRequest,
  SendCounselMessageResponse,
  StartAiSessionRequest,
  StartAiSessionResponse,
  SyncCounselFaqResponse,
} from '@/types/counsel-api'

export async function startAiSession(title?: string) {
  const fn = httpsCallable<StartAiSessionRequest, StartAiSessionResponse>(
    functions,
    'startAiSession'
  )
  const { data } = await fn({ title })
  return data
}

export async function sendCounselMessage(sessionId: string, content: string) {
  const fn = httpsCallable<
    SendCounselMessageRequest,
    SendCounselMessageResponse
  >(functions, 'sendCounselMessage')
  const { data } = await fn({ sessionId, content })
  return data
}

export async function endAiSession(sessionId: string) {
  const fn = httpsCallable<EndAiSessionRequest, EndAiSessionResponse>(
    functions,
    'endAiSession'
  )
  const { data } = await fn({ sessionId })
  return data
}

export async function syncCounselFaqFromSheet() {
  const fn = httpsCallable<void, SyncCounselFaqResponse>(
    functions,
    'syncCounselFaqFromSheet'
  )
  const { data } = await fn()
  return data
}

export async function ensureUserProfile() {
  const fn = httpsCallable<void, { ok: boolean; role: string }>(
    functions,
    'ensureUserProfile'
  )
  const { data } = await fn()
  return data
}
