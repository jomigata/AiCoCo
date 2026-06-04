import { initializeApp, cert, applicationDefault } from 'firebase-admin/app'
import { readFileSync, existsSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir, homedir } from 'os'
import { join } from 'path'

export const FIRESTORE_DATABASE_ID = 'aicoco-db'
export const DEFAULT_PROJECT_ID = 'aicoco-5f8e6'

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

export function initFirebaseAdmin() {
  const credPath = resolveCredentialPath()
  const projectId = process.env.FIREBASE_PROJECT_ID || DEFAULT_PROJECT_ID

  if (!credPath) {
    throw new Error(
      'Credentials required: run "firebase login" or set GOOGLE_APPLICATION_CREDENTIALS.'
    )
  }

  if (credPath.endsWith('firebase-cli-adc.json')) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath
    return initializeApp({
      credential: applicationDefault(),
      projectId,
    })
  }

  const serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'))
  return initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id || projectId,
  })
}
