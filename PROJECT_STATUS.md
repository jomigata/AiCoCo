# AiCoCo 개발 현황

**프로젝트:** AiCoCo — AI 심리상담 플랫폼  
**Firebase:** `aicoco-5f8e6` · Firestore DB: `aicoco-db`  
**최종 갱신:** 2026-06-04

---

## ✅ 완료

### 인프라·배포
| 항목 | 상태 |
|------|------|
| Firebase Blaze | ✅ |
| Firestore `aicoco-db` + Rules/Indexes | ✅ |
| Functions 5종 배포 | ✅ |
| Hosting (랜딩·로그인·상담 UI) | ✅ |
| GitHub Actions CI/CD (#14 Success) | ✅ |
| `FIREBASE_TOKEN` GitHub Secret | ✅ |

### 인증·Functions·프론트
| 항목 | 상태 |
|------|------|
| 이메일 회원가입/로그인 | ✅ |
| `startAiSession` / `sendCounselMessage` / `endAiSession` | ✅ |
| `ensureUserProfile` (onUserCreate 대체) | ✅ |
| `/`, `/login/`, `/signup/`, `/counsel/`, `/dashboard/` | ✅ |
| 로컬 `GEMINI_API_KEY` Secret | ✅ (사용자 설정) |

---

## ⏳ 미완료

### P0 — AI 상담 E2E 확인 (마지막 1건)
| # | 작업 | 상태 |
|---|------|------|
| 5 | `/counsel/` 메시지 → AI 응답 확인 | 🔲 브라우저 테스트 필요 |

### P1 — CI 보완
| # | 작업 | 상태 |
|---|------|------|
| 7 | GitHub Secret `GEMINI_API_KEY` | 🔲 미등록 (CI Secret 동기화용) |
| 8 | `onUserCreate` IAM (선택) | 🔲 Storage Object Viewer |

### P2 — 기능 확장 (다음 단계)
| 우선순위 | 기능 |
|----------|------|
| 1 | Google 소셜 로그인 |
| 2 | 심리 검사 (`tests` / `testResults`) |
| 3 | 인간 상담 예약 (`bookings`) |
| 4 | 관리자 대시보드 |

---

## 🔧 P0 #5 테스트 (지금)

1. https://aicoco-5f8e6.web.app/counsel/ 로그인
2. `오늘 기분이 가라앉아요` 전송
3. **회색 AI 말풍선** 응답 확인

실패 시: [Functions 로그](https://console.firebase.google.com/project/aicoco-5f8e6/functions/logs) → `sendCounselMessage`

---

## 🔗 바로가기

| 용도 | URL |
|------|-----|
| AI 상담 | https://aicoco-5f8e6.web.app/counsel/ |
| GitHub Actions | https://github.com/jomigata/AiCoCo/actions |
| GitHub Secrets | https://github.com/jomigata/AiCoCo/settings/secrets/actions |

---

**다음 마일스톤:** P0 #5 E2E 확인 → P2 Google 로그인
