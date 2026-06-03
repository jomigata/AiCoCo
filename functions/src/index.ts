import { initializeApp } from 'firebase-admin/app'
import { setGlobalOptions } from 'firebase-functions/v2'

initializeApp()
setGlobalOptions({ region: 'asia-northeast3' })

export { onUserCreate } from './auth/onUserCreate'
export { ensureUserProfile } from './auth/ensureUserProfile'
export { startAiSession } from './counsel/startAiSession'
export { sendCounselMessage } from './counsel/sendCounselMessage'
export { endAiSession } from './counsel/endAiSession'
