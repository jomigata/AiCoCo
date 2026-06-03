import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

export const FUNCTIONS_REGION = 'asia-northeast3'
/** Firestore Console에 생성한 데이터베이스 ID */
export const FIRESTORE_DATABASE_ID = 'aicoco-db'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp
if (!getApps().length) {
    app = initializeApp(firebaseConfig)
} else {
    app = getApps()[0]!
}

export const auth = getAuth(app)
export const db = getFirestore(app, FIRESTORE_DATABASE_ID)
export const storage = getStorage(app)
export const functions = getFunctions(app, FUNCTIONS_REGION)
export default app
