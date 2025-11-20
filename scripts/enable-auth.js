/**
 * Firebase Authentication 활성화 스크립트
 * 
 * 이 스크립트는 Firebase Admin SDK를 사용하여
 * Email/Password 인증 방법을 자동으로 활성화합니다.
 * 
 * 사용법: node scripts/enable-auth.js
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase Admin SDK 초기화
const serviceAccountPath = join(__dirname, '../wh/aicoco-5f8e6-firebase-adminsdk-fbsvc-20e6d4762c.json');

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'aicoco-5f8e6'
  });

  console.log('✅ Firebase Admin SDK 초기화 완료');
} catch (error) {
  console.error('❌ Firebase Admin SDK 초기화 실패:', error.message);
  console.log('\n📝 참고: Firebase Console에서 수동으로 활성화해야 합니다.');
  console.log('   링크: https://console.firebase.google.com/project/aicoco-5f8e6/authentication/providers');
  process.exit(1);
}

/**
 * Email/Password 인증 방법 활성화
 * 
 * 참고: Firebase Admin SDK는 직접적으로 인증 방법을 활성화하는 API를 제공하지 않습니다.
 * 이는 Firebase Console에서만 가능합니다.
 * 
 * 대신, 이 스크립트는 설정을 확인하고 안내를 제공합니다.
 */
async function enableEmailPasswordAuth() {
  try {
    console.log('\n🔍 Firebase Authentication 설정 확인 중...\n');
    
    // Firebase Admin SDK로는 직접 인증 방법을 활성화할 수 없습니다.
    // 대신 사용자에게 안내를 제공합니다.
    
    console.log('⚠️  Firebase Admin SDK는 인증 방법을 직접 활성화할 수 없습니다.');
    console.log('   Firebase Console에서 수동으로 활성화해야 합니다.\n');
    
    console.log('📋 다음 단계를 따라주세요:\n');
    console.log('1. Firebase Console 접속:');
    console.log('   https://console.firebase.google.com/project/aicoco-5f8e6/authentication\n');
    console.log('2. "Sign-in method" 탭 클릭\n');
    console.log('3. "Email/Password" 제공업체 찾기\n');
    console.log('4. "Email/Password" 클릭하여 편집\n');
    console.log('5. "Enable" 토글을 켜기\n');
    console.log('6. "Save" 클릭\n');
    
    console.log('✅ 설정이 완료되면 웹 애플리케이션에서 회원가입을 다시 시도하세요.\n');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

// 스크립트 실행
enableEmailPasswordAuth()
  .then(() => {
    console.log('✅ 스크립트 실행 완료');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ 스크립트 실행 실패:', error);
    process.exit(1);
  });

