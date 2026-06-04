/**
 * 모든 Auth/Firestore 회원 데이터 삭제 후 이메일·비밀번호 관리자 1명만 생성
 *
 *   $env:ADMIN_EMAIL="jomigata@gmail.com"
 *   $env:ADMIN_PASSWORD="your-password"
 *   npm run reset:auth
 */

import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { initFirebaseAdmin, FIRESTORE_DATABASE_ID } from './lib/firebase-admin-init.mjs'

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'jomigata@gmail.com').trim().toLowerCase()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const ROOT_COLLECTIONS = [
  'users',
  'profiles',
  'sessions',
  'crisisEvents',
  'bookings',
  'tests',
  'testResults',
]

if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
  console.error('ADMIN_PASSWORD (8자 이상) 환경 변수가 필요합니다.')
  process.exit(1)
}

initFirebaseAdmin()
const auth = getAuth()
const db = getFirestore(FIRESTORE_DATABASE_ID)

async function deleteAllAuthUsers() {
  let deleted = 0
  let pageToken

  do {
    const result = await auth.listUsers(1000, pageToken)
    for (const user of result.users) {
      await auth.deleteUser(user.uid)
      deleted++
      console.log(`Deleted auth user: ${user.email || user.uid}`)
    }
    pageToken = result.pageToken
  } while (pageToken)

  return deleted
}

async function deleteCollectionRecursive(collectionRef, batchSize = 100) {
  const snapshot = await collectionRef.limit(batchSize).get()
  if (snapshot.empty) {
    return 0
  }

  let count = 0
  for (const doc of snapshot.docs) {
    const subcollections = await doc.ref.listCollections()
    for (const sub of subcollections) {
      count += await deleteCollectionRecursive(sub, batchSize)
    }
    await doc.ref.delete()
    count++
  }

  count += await deleteCollectionRecursive(collectionRef, batchSize)
  return count
}

async function wipeFirestore() {
  let total = 0
  for (const name of ROOT_COLLECTIONS) {
    const n = await deleteCollectionRecursive(db.collection(name))
    if (n > 0) {
      console.log(`Deleted ${n} docs from ${name}`)
    }
    total += n
  }
  return total
}

async function createEmailOnlyAdmin() {
  const user = await auth.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    emailVerified: true,
    displayName: '관리자',
  })

  await auth.setCustomUserClaims(user.uid, { role: 'admin' })

  await db.collection('users').doc(user.uid).set({
    email: ADMIN_EMAIL,
    displayName: '관리자',
    role: 'admin',
    status: 'active',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })

  await db.collection('profiles').doc(user.uid).set({
    uid: user.uid,
    concerns: [],
    preferredLanguage: 'ko',
    marketingConsent: false,
    termsAcceptedAt: FieldValue.serverTimestamp(),
    privacyAcceptedAt: FieldValue.serverTimestamp(),
  })

  return user
}

console.log('=== Reset Auth & Firestore ===')
const authDeleted = await deleteAllAuthUsers()
console.log(`Auth users deleted: ${authDeleted}`)

const docsDeleted = await wipeFirestore()
console.log(`Firestore docs deleted: ${docsDeleted}`)

const admin = await createEmailOnlyAdmin()
console.log('=== Admin created (email + password only) ===')
console.log(`- email: ${ADMIN_EMAIL}`)
console.log(`- uid: ${admin.uid}`)
console.log('- role: admin')
