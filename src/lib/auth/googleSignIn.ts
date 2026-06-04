import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { touchLastLogin } from '@/lib/firestore/users'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  await touchLastLogin(cred.user.uid)
  return cred
}
