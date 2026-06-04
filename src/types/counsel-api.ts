import type { RiskLevel } from './firestore'

export interface StartAiSessionRequest {
  title?: string
}

export interface StartAiSessionResponse {
  sessionId: string
}

export interface SendCounselMessageRequest {
  sessionId: string
  content: string
}

export interface SendCounselMessageResponse {
  reply: string
  riskLevel: RiskLevel
  escalated: boolean
  messageId: string
}

export interface EndAiSessionRequest {
  sessionId: string
}

export interface EndAiSessionResponse {
  summary: string
}

export interface SyncCounselFaqResponse {
  ok: boolean
  synced: number
  deleted: number
}
