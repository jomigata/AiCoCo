// Firebase Admin SDK 설정
// 서버 사이드에서 Firebase 서비스를 사용하기 위한 설정

import type { App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';
import type { Storage } from 'firebase-admin/storage';

// 정적 내보내기 환경에서는 Firebase Admin SDK를 사용하지 않음
let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;

// 서버 환경에서만 Firebase Admin SDK 초기화
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    const { initializeApp, getApps, cert } = require('firebase-admin/app');
    const { getAuth } = require('firebase-admin/auth');
    const { getFirestore } = require('firebase-admin/firestore');
    const { getStorage } = require('firebase-admin/storage');

    // 환경 변수에서 Firebase Admin SDK 설정 로드
    const getFirebaseAdminConfig = () => {
      // 환경 변수가 설정되어 있으면 사용
      if (process.env.FIREBASE_ADMIN_PROJECT_ID) {
        return {
          type: 'service_account',
          project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
          private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
          auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
          token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI || 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
          universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN || 'googleapis.com'
        };
      }
      
      // 개발 환경에서만 기본 설정 사용 (실제 배포에서는 환경 변수 사용)
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ 개발 환경에서 기본 Firebase Admin 설정을 사용합니다. 프로덕션에서는 환경 변수를 설정하세요.');
        return {
          type: 'service_account',
          project_id: 'aicoco-5f8e6',
          private_key_id: '20e6d4762c7234812e4d647e79077d8c96b29acb',
          private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDwqpj5vMtN26Mm\nXt3ExdwTAvUcoN/kefNKLWDrkbkiL2wUHSP1TPWWDIwxXsST80SY2l5njVy+KtMf\npMYwvVysauQvpAXuv8HB6mszWIfhax9uORwDwwn5mNMocBGL531yQbJt+AFTRowQ\nJGk6is3kKtiz4XpaMqLprxJHfVEHDxxhUXxyFvoIUB5lhBZ/bU2p1NFTS4NRHaXJ\nfMF0w49KUfOGaH6CTOoF45/pQt8YT31uXhReoOX5IxPWpmW5teiiMd4PZfSlFCZY\nSrSKV/7/6AocEBBU5qITx9Zhq2YSeW+kwO4xQleIkpE0Wi8BA99d3gN0hF8Sy1tj\nrO1EXYhrAgMBAAECggEAZFygQrUqiyNm3B9/mAlzBzKaiP/FnoAEpxBZdKNmcw0X\noyOr1SXs3FALPqNoktJF7wBRkhlvbZZqSK3sQHMXbId+9ScPmkq5QGbDobvvnl+P\n0eVa+26ggEfs9tYVWySEOduPzzA3TUUEL88fWtx7lAUSLaF/5pFrQsxRcSKfYbNq\nel34UtWwbnTmO78Z8g+Lwm4rqMSRntnjB5hu9jjsjyA2c1fQcc7pFGCZg3euMdjh\nFElzvbujvDoN3fxAWgtxcqehfbJFRGnygCYIWAP2eaKCbuN3ELppB3gVpwxGxAER\nigBiTI8JaiWZDekT4eYOoc68Yfe+NX6pnfoMFoZLcQKBgQD5BMJOzn+ewjlL5Ts1\n9aMKzNULVcGB2+Om0ft0vJ4+hYqpj7UMVAc0f0QcymkUbgNJhVQgm91z2aXHIvDk\nrDiNxbyHnNKcowJ9ev7jdKWPcpGWuxiBU23aVFStVYkWtgpqIe38ES2u0dhW0JAI\nIvp5qP3XqWt20dpqUBAsJP0urwKBgQD3aeTJQTgLe/48n4U9rDpZLPmlg/2loRst\n/nXd4gRuFj7Q1XbhigTJmL3rIYmJ1NBTL2YV8HFW9cCI+Aff0z9jO/3Z1dlmXuJw\n/6/QbbmkzEGGMX78sQOjjg59+gmjmu6MT5GK6TJCTX04DXsddCcavAAhJVZ3Keiw\nNqqxHk4RBQKBgQDrq51ZiAUv8xDWyzOmdbrAVeqqt5ZTmA9zqfcZHAmHkksQ/niS\nGlRXUrrbpJSeSR/DTPO5iMmlAq7qMB9by8IaKrGqhrislXmd1/GywoqNoBg5Vwhy\nHMsyfe1FvlXnsJFasJHSpU9ezCq6vtgRW0lCKrVSjXyvDxxu0Sb9IGSc8QKBgQCW\n4t3EXyHu3w+NqTt5ATAUcnlNl9F40WfiBO2dA9nvyWFFuullYubIi35Hh4x5om/q\nS13Ww2xbvERPQ/SJbCucOVn3H5QV+ofeohB27HPrLSZI0KbBNLMja98qtPJr9HDG\n4T/Bl7Yu+VMEfDQ5Ij028LCjhkHVKpnd3Xj7y5+QgQKBgHpPo1cSx3kie3w77RNb\nr+M0znmETOazBFvyO8Sr3Dtd3xMdqlhoEM9Fik9H1CH22rJTlgGDkQrcddLvEYqD\naAQfXq5O8VvVTQrgiI3q2NV2XXphDDuFoBf51uFrIrYcQfoxBsHuuKgLQtoBtt64\n0W/+kPIITm6TuJ52R9HVPWtY\n-----END PRIVATE KEY-----\n',
          client_email: 'firebase-adminsdk-fbsvc@aicoco-5f8e6.iam.gserviceaccount.com',
          client_id: '110626054295868770313',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40aicoco-5f8e6.iam.gserviceaccount.com',
          universe_domain: 'googleapis.com'
        };
      }
      
      throw new Error('Firebase Admin SDK 설정이 필요합니다. 환경 변수를 설정하거나 개발 환경에서 실행하세요.');
    };

    // Firebase Admin 앱 초기화 (중복 방지)
    try {
      const firebaseAdminConfig = getFirebaseAdminConfig();
      adminApp = !getApps().length 
        ? initializeApp({
            credential: cert(firebaseAdminConfig as any),
            storageBucket: 'aicoco-5f8e6.firebasestorage.app',
          })
        : getApps()[0];
      
      adminAuth = getAuth(adminApp);
      adminDb = getFirestore(adminApp);
      adminStorage = getStorage(adminApp);
    } catch (error) {
      console.error('❌ Firebase Admin SDK 초기화 실패:', error);
      // 개발 환경에서는 null로 설정하여 앱이 계속 작동하도록 함
      adminApp = null;
      adminAuth = null;
      adminDb = null;
      adminStorage = null;
    }
  } catch (error) {
    console.warn('⚠️ Firebase Admin SDK를 사용할 수 없습니다:', error);
  }
}

// Firebase Admin 서비스 인스턴스 (안전한 접근)
export { adminAuth, adminDb, adminStorage };
export default adminApp; 