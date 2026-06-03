'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ensureUserProfile } from '@/lib/counsel/api'
import type { AuthClaims } from '@/types/auth'
import type { UserRole } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  role: UserRole | null
  loading: boolean
  refreshClaims: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshClaims = useCallback(async () => {
    if (!auth.currentUser) {
      setRole(null)
      return
    }
    const token = await auth.currentUser.getIdTokenResult(true)
    const claims = token.claims as AuthClaims
    setRole(claims.role ?? 'client')
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      if (nextUser) {
        try {
          await ensureUserProfile()
          await nextUser.getIdToken(true)
        } catch {
          // Functions 미배포 시에도 기본 로그인은 유지
        }
        const token = await nextUser.getIdTokenResult()
        const claims = token.claims as AuthClaims
        setRole(claims.role ?? 'client')
      } else {
        setRole(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const value = useMemo(
    () => ({ user, role, loading, refreshClaims }),
    [user, role, loading, refreshClaims]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return ctx
}
