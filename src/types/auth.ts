export type UserRole = 'client' | 'counselor' | 'admin'

export interface AuthClaims {
  role: UserRole
  counselorId?: string
}
