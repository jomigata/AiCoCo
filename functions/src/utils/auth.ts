import { HttpsError } from 'firebase-functions/v2/https'
import type { CallableRequest } from 'firebase-functions/v2/https'

export function requireAuth<T>(request: CallableRequest<T>): string {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', '로그인이 필요합니다.')
  }
  return request.auth.uid
}

export function requireAdmin<T>(request: CallableRequest<T>): string {
  const uid = requireAuth(request)
  const role = request.auth?.token?.role
  if (role !== 'admin') {
    throw new HttpsError('permission-denied', '관리자만 실행할 수 있습니다.')
  }
  return uid
}
