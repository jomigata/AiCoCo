# AiCoCo 개발 현황

**프로젝트:** AiCoCo — AI 심리상담 플랫폼  
**Firebase:** `aicoco-5f8e6` · Firestore DB: `aicoco-db`  
**최종 갱신:** 2026-05-31

---

## ✅ 완료

### 인프라·배포
| 항목 | 상태 |
|------|------|
| Firebase 프로젝트 연결 (Blaze) | ✅ |
| Firestore DB `aicoco-db` 생성 | ✅ |
| Firestore Rules / Indexes 파일 | ✅ |
| `firebase deploy --only firestore` | ✅ (사용자 확인) |
| Firebase Hosting (랜딩·로그인·상담 UI) | ✅ |
| GitHub Actions 워크플로우 (Hosting+Functions+Firestore) | ✅ 코드 반영 |

### 인증·데이터
| 항목 | 상태 |
|------|
| Authentication 이메일/비밀번호 | ✅ |
| 회원가입 → `users` / `profiles` 저장 | ✅ |
| Firestore Security Rules | ✅ |
| TypeScript 타입 (`src/types/`) | ✅ |

### Cloud Functions
| 함수 | 상태 |
|------|------|
| `startAiSession` | ✅ 배포됨 |
| `sendCounselMessage` | ✅ 배포됨 (Gemini 연동) |
| `endAiSession` | ✅ 배포됨 |
| `ensureUserProfile` | ✅ 코드 완료 (재배포 필요) |
| `onUserCreate` | ⚠️ IAM 오류로 배포 실패 이력 |

### 프론트엔드
| 페이지 | 경로 | 상태 |
|--------|------|------|
| 랜딩 | `/` | ✅ |
| 로그인 | `/login/` | ✅ |
| 회원가입 | `/signup/` | ✅ |
| AI 상담 | `/counsel/` | ✅ UI·연동 |
| 내 상담 | `/dashboard/` | ✅ |

---

## ⏳ 미완료

### P0 — 즉시 (AI 상담 500 오류)
| # | 작업 | 담당 | 비고 |
|---|------|------|------|
| 1 | Generative Language API 활성화 | 콘솔 | [API Enable](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=aicoco-5f8e6) |
| 2 | AI Studio **AiCoCo** 프로젝트 새 API 키 | 콘솔 | [API Keys](https://aistudio.google.com/app/apikey) |
| 3 | `GEMINI_API_KEY` Secret 갱신 (`--force`) | 터미널 | |
| 4 | Functions 재배포 (코드 개선본) | 터미널 | `npm run deploy:functions` |
| 5 | `/counsel/` AI 응답 E2E 테스트 | 브라우저 | |

### P1 — 안정화
| # | 작업 | 비고 |
|---|------|------|
| 6 | GitHub Secret `GEMINI_API_KEY` 등록 | CI 자동 배포 |
| 7 | `ensureUserProfile` Functions 배포 | onUserCreate 대체 |
| 8 | `onUserCreate` IAM 수정 (선택) | [GCP IAM](https://console.cloud.google.com/iam-admin/iam?project=aicoco-5f8e6) → Compute SA에 Storage Object Viewer |
| 9 | Hosting 최신 빌드 재배포 | `npm run deploy:hosting` |

### P2 — 기능 확장 (미착수)
| 항목 | 상태 |
|------|------|
| Google 소셜 로그인 | ❌ |
| 인간 상담사 예약 (`bookings`) | ❌ |
| 심리 검사 (`tests` / `testResults`) | ❌ |
| 관리자 대시보드 | ❌ |
| FAQ / 문의 / 블로그 | ❌ |

---

## 🔧 P0 작업 명령 (순서대로)

```powershell
# 1) 프로젝트 폴더
cd "e:\04. Cursor\AiCoCo"

# 2) gemini-key.txt에 새 키만 저장 (메모장, 빈 줄 없이)

# 3) Secret 갱신
firebase functions:secrets:set GEMINI_API_KEY --data-file gemini-key.txt --force
Remove-Item gemini-key.txt

# 4) Functions 빌드·배포
npm run build:functions
npm run deploy:functions

# 5) (선택) 프론트+호스팅
npm run deploy:hosting
```

---

## 🔗 바로가기

| 용도 | URL |
|------|-----|
| 사이트 | https://aicoco-5f8e6.web.app |
| AI 상담 | https://aicoco-5f8e6.web.app/counsel/ |
| Functions 로그 | https://console.firebase.google.com/project/aicoco-5f8e6/functions/logs |
| Firestore | https://console.firebase.google.com/project/aicoco-5f8e6/firestore/databases/aicoco-db/data |
| GitHub Actions | https://github.com/jomigata/AiCoCo/actions |
| GitHub Secrets | https://github.com/jomigata/AiCoCo/settings/secrets/actions |

---

## 📁 코드 구조 (요약)

```
AiCoCo/
├── src/app/          # login, signup, counsel, dashboard
├── src/lib/          # firebase, counsel API, firestore helpers
├── functions/src/    # Callable + Gemini + Auth
├── firestore.rules
└── firebase.json
```

---

**다음 마일스톤:** P0 완료 → AI 상담 정상 응답 확인 → P2 기능 우선순위 결정
