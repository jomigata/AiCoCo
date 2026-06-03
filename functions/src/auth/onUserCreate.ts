import * as functions from 'firebase-functions/v1'
import type { UserRecord } from 'firebase-admin/auth'
import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

export const onUserCreate = functions
  .region('asia-northeast3')
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    const uid = user.uid
    const auth = getAuth()
    const db = getFirestore(getApp(), 'aicoco-db')

    await auth.setCustomUserClaims(uid, { role: 'client' })

    const profileRef = db.collection('profiles').doc(uid)
    const profileSnap = await profileRef.get()
    if (!profileSnap.exists) {
      await profileRef.set(
        {
          uid,
          concerns: [],
          preferredLanguage: 'ko',
          marketingConsent: false,
          termsAcceptedAt: FieldValue.serverTimestamp(),
          privacyAcceptedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    }

    const userRef = db.collection('users').doc(uid)
    const userSnap = await userRef.get()
    if (!userSnap.exists) {
      await userRef.set({
        email: user.email ?? '',
        displayName: user.displayName ?? '회원',
        role: 'client',
        status: 'active',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }
  })
