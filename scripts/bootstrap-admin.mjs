/**
 * 관리자 계정 부트스트랩 (로컬 1회 실행)
 *
 *   $env:ADMIN_EMAIL="your@email.com"
 *   $env:ADMIN_PASSWORD="your-password"
 *   npm run bootstrap:admin
 */

import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { initFirebaseAdmin, FIRESTORE_DATABASE_ID } from './lib/firebase-admin-init.mjs'

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.')
  process.exit(1)
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.')
  process.exit(1)
}

initFirebaseAdmin()
const auth = getAuth()
const db = getFirestore(FIRESTORE_DATABASE_ID)

let user
try {
  user = await auth.getUserByEmail(email)
  await auth.updateUser(user.uid, {
    password,
    emailVerified: true,
    providersToUnlink: ['google.com'],
  })
  console.log(`Updated password for existing user: ${email}`)
} catch (err) {
  if (err && typeof err === 'object' && 'code' in err && err.code === 'auth/user-not-found') {
    user = await auth.createUser({
      email,
      password,
      emailVerified: true,
      displayName: '관리자',
    })
    console.log(`Created new user: ${email}`)
  } else {
    throw err
  }
}

await auth.setCustomUserClaims(user.uid, { role: 'admin' })

await db.collection('users').doc(user.uid).set(
  {
    email,
    displayName: user.displayName || '관리자',
    role: 'admin',
    status: 'active',
    updatedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
)

await db.collection('profiles').doc(user.uid).set(
  {
    uid: user.uid,
    concerns: [],
    preferredLanguage: 'ko',
    marketingConsent: false,
    termsAcceptedAt: FieldValue.serverTimestamp(),
    privacyAcceptedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
)

console.log('Done.')
console.log(`- uid: ${user.uid}`)
console.log('- role: admin (customClaims + Firestore)')
console.log('- Sign out and sign in again to refresh token.')
