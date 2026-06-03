import type { Timestamp } from 'firebase/firestore'
import type { UserRole } from './auth'

export type UserStatus = 'active' | 'suspended' | 'pending'
export type SessionType = 'ai' | 'human'
export type SessionStatus = 'active' | 'ended' | 'escalated'
export type MessageRole = 'user' | 'assistant' | 'system' | 'counselor'
export type RiskLevel = 'none' | 'low' | 'medium' | 'high'

export interface UserDoc {
  email: string
  displayName: string
  role: UserRole
  status: UserStatus
  photoURL?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLoginAt?: Timestamp
}

export interface ProfileDoc {
  uid: string
  birthYear?: number
  gender?: 'male' | 'female' | 'other' | 'prefer_not'
  concerns: string[]
  preferredLanguage: 'ko'
  marketingConsent: boolean
  termsAcceptedAt: Timestamp
  privacyAcceptedAt: Timestamp
}

export interface CounselorDoc {
  uid: string
  displayName: string
  specialties: string[]
  experienceYears: number
  bio: string
  isAvailable: boolean
  ratingAvg?: number
  approvedAt: Timestamp
  approvedBy: string
}

export interface SessionDoc {
  clientId: string
  type: SessionType
  status: SessionStatus
  counselorId?: string
  title?: string
  summary?: string
  riskLevel: RiskLevel
  messageCount: number
  createdAt: Timestamp
  updatedAt: Timestamp
  endedAt?: Timestamp
}

export interface MessageDoc {
  role: MessageRole
  content: string
  tokenCount?: number
  model?: string
  createdAt: Timestamp
  flagged?: boolean
}

export interface TestResultDoc {
  clientId: string
  testId: string
  answers: Record<string, number | string>
  score?: number
  interpretation?: string
  createdAt: Timestamp
}

export interface CrisisEventDoc {
  sessionId: string
  clientId: string
  triggerKeywords: string[]
  riskLevel: RiskLevel
  actionTaken: 'logged' | 'notified' | 'human_handoff'
  createdAt: Timestamp
}

export interface BookingDoc {
  clientId: string
  counselorId?: string
  sessionId?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  scheduledAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}
