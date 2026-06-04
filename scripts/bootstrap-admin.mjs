/**
 * 관리자 계정 부트스트랩 (로컬 1회 실행)
 *
 * 사용법 (PowerShell) — 서비스 계정 없이 firebase login만 되어 있어도 실행 가능:
 *   $env:ADMIN_EMAIL="your@email.com"
 *   $env:ADMIN_PASSWORD="your-password"
 *   npm run bootstrap:admin
 *
 * 또는 서비스 계정 JSON:
 *   $env:GOOGLE_APPLICATION_CREDENTIALS="경로\service-account.json"
 */

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { readFileSync, existsSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir, homedir } from 'os'
import { join } from 'path'

const FIREBASE_CLI_CLIENT_ID =
  process.env.FIREBASE_CLIENT_ID ||
  '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com'
const FIREBASE_CLI_CLIENT_SECRET = process.env.FIREBASE_CLIENT_SECRET || 'j9iVZfS8kkCEFUPaAeJV0sAi'

function resolveCredentialPath() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (credPath && existsSync(credPath)) {
    return credPath
  }

  const cliConfigPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json')
  if (!existsSync(cliConfigPath)) {
    return null
  }

  const cliConfig = JSON.parse(readFileSync(cliConfigPath, 'utf8'))
  const refreshToken = cliConfig?.tokens?.refresh_token
  if (!refreshToken) {
    return null
  }

  const tempDir = mkdtempSync(join(tmpdir(), 'aicoco-admin-'))
  const tempCredPath = join(tempDir, 'firebase-cli-adc.json')
  writeFileSync(
    tempCredPath,
    JSON.stringify(
      {
        type: 'authorized_user',
        client_id: FIREBASE_CLI_CLIENT_ID,
        client_secret: FIREBASE_CLI_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      null,
      2
    )
  )
  console.log('Using Firebase CLI login credentials.')
  return tempCredPath
}

const FIRESTORE_DATABASE_ID = 'aicoco-db'
const email = process.env.ADMIN_EMAIL?.trim()
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.')
  process.exit(1)
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.')
  process.exit(1)
}

const credPath = resolveCredentialPath()
const projectId = process.env.FIREBASE_PROJECT_ID || 'aicoco-5f8e6'

if (!credPath) {
  console.error(
    'Credentials required: run "firebase login" or set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON.'
  )
  process.exit(1)
}

if (credPath.endsWith('firebase-cli-adc.json')) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath
  initializeApp({
    credential: applicationDefault(),
    projectId,
  })
} else {
  const serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'))
  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id || projectId,
  })
}

const auth = getAuth()
const db = getFirestore(FIRESTORE_DATABASE_ID)

let user
try {
  user = await auth.getUserByEmail(email)
  await auth.updateUser(user.uid, { password, emailVerified: true })
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
