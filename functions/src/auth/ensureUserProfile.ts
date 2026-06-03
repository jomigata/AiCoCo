import { onCall } from 'firebase-functions/v2/https'
import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { requireAuth } from '../utils/session'

const FIRESTORE_DATABASE_ID = 'aicoco-db'

/** onUserCreate 배포 실패 시 클라이언트에서 호출하는 보조 초기화 */
export const ensureUserProfile = onCall({ region: 'asia-northeast3' }, async (request) => {
  const uid = requireAuth(request)
  const auth = getAuth()
  const db = getFirestore(getApp(), FIRESTORE_DATABASE_ID)
  const authUser = await auth.getUser(uid)

  const claims = authUser.customClaims ?? {}
  if (claims.role !== 'client' && claims.role !== 'counselor' && claims.role !== 'admin') {
    await auth.setCustomUserClaims(uid, { ...claims, role: 'client' })
  }

  const userRef = db.collection('users').doc(uid)
  const userSnap = await userRef.get()
  if (!userSnap.exists) {
    await userRef.set({
      email: authUser.email ?? '',
      displayName: authUser.displayName ?? '회원',
      role: 'client',
      status: 'active',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }

  const profileRef = db.collection('profiles').doc(uid)
  const profileSnap = await profileRef.get()
  if (!profileSnap.exists) {
    await profileRef.set({
      uid,
      concerns: [],
      preferredLanguage: 'ko',
      marketingConsent: false,
      termsAcceptedAt: FieldValue.serverTimestamp(),
      privacyAcceptedAt: FieldValue.serverTimestamp(),
    })
  }

  return { ok: true, role: 'client' as const }
})
