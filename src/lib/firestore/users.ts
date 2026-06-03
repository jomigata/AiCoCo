import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ProfileDoc, UserDoc } from '@/types/firestore'
import type { UserRole } from '@/types/auth'

export async function createUserDocuments(params: {
  uid: string
  email: string
  displayName: string
}) {
  const { uid, email, displayName } = params
  const now = serverTimestamp()

  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, {
    email,
    displayName,
    role: 'client' as UserRole,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  })

  const profileRef = doc(db, 'profiles', uid)
  await setDoc(profileRef, {
    uid,
    concerns: [] as ProfileDoc['concerns'],
    preferredLanguage: 'ko' as const,
    marketingConsent: false,
    termsAcceptedAt: now,
    privacyAcceptedAt: now,
  })
}

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return snap.data() as UserDoc
}

export async function touchLastLogin(uid: string) {
  await updateDoc(doc(db, 'users', uid), {
    lastLoginAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
