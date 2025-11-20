# WizCoCo - GitHub & Firebase 설정 가이드

## 📋 목차
1. [GitHub Secrets 설정](#github-secrets-설정)
2. [Firebase 설정 확인](#firebase-설정-확인)
3. [CI/CD 파이프라인 확인](#cicd-파이프라인-확인)
4. [배포 프로세스](#배포-프로세스)

---

## 🔐 GitHub Secrets 설정

GitHub Actions가 Firebase에 배포하기 위해서는 다음 Secret이 설정되어 있어야 합니다.

### 필수 Secret: `FIREBASE_SERVICE_ACCOUNT_AICOCO`

1. **GitHub 저장소로 이동**
   - https://github.com/jomigata/AiCoCo 접속
   - Settings → Secrets and variables → Actions 클릭

2. **Firebase 서비스 계정 키 생성**
   - Firebase Console (https://console.firebase.google.com) 접속
   - 프로젝트: `aicoco-5f8e6` 선택
   - 프로젝트 설정 (⚙️) → 서비스 계정 탭
   - "새 비공개 키 생성" 클릭
   - JSON 파일 다운로드

3. **GitHub Secret 추가**
   - GitHub 저장소의 Settings → Secrets and variables → Actions
   - "New repository secret" 클릭
   - Name: `FIREBASE_SERVICE_ACCOUNT_AICOCO`
   - Value: 다운로드한 JSON 파일의 전체 내용을 복사하여 붙여넣기
   - "Add secret" 클릭

### 확인 사항
- ✅ Secret 이름이 정확히 `FIREBASE_SERVICE_ACCOUNT_AICOCO`인지 확인
- ✅ JSON 내용이 완전히 복사되었는지 확인 (중괄호 포함)

---

## 🔥 Firebase 설정 확인

### 현재 Firebase 프로젝트 정보
- **Project ID**: `aicoco-5f8e6`
- **Project Number**: `563549872890`
- **Web App ID**: `1:563549872890:web:cc0a085819a4b728ed9f43`

### Firebase 설정 파일 확인

#### `.firebaserc`
```json
{
  "projects": {
    "default": "aicoco-5f8e6"
  }
}
```

#### `firebase.json`
- Hosting 설정: `dist` 폴더 배포
- Firestore Rules: `firestore.rules` 파일 사용
- SPA 라우팅: 모든 경로를 `index.html`로 리다이렉트

#### `firestore.rules`
- 인증된 사용자만 데이터 접근 가능
- 사용자는 자신의 데이터만 읽기/쓰기 가능
- 그룹 멤버만 그룹 데이터 접근 가능

---

## 🚀 CI/CD 파이프라인 확인

### GitHub Actions 워크플로우

**파일 위치**: `.github/workflows/deploy.yml`

**트리거 조건**:
- `main` 브랜치에 push 시 자동 실행
- 수동 실행 가능 (workflow_dispatch)

**작업 단계**:
1. 코드 체크아웃
2. Node.js 20 설정 및 npm 캐시
3. 의존성 설치 (`npm ci`)
4. 프로젝트 빌드 (`npm run build`)
5. Firebase Hosting 배포 (main 브랜치만)

### 워크플로우 실행 확인
- GitHub 저장소의 Actions 탭에서 실행 내역 확인
- 최근 실행: https://github.com/jomigata/AiCoCo/actions

---

## 📦 배포 프로세스

### 자동 배포
1. `main` 브랜치에 코드 push
2. GitHub Actions 자동 실행
3. 빌드 및 Firebase Hosting 배포
4. 배포 완료 후 사이트 자동 업데이트

### 배포 URL
- **기본 도메인**: https://aicoco-5f8e6.web.app
- **Firebase 도메인**: https://aicoco-5f8e6.firebaseapp.com

### 수동 배포 (로컬)
```bash
# Firebase CLI 설치 (최초 1회)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 확인
firebase projects:list

# 빌드
npm run build

# 배포
firebase deploy --only hosting
```

---

## ✅ 설정 체크리스트

### GitHub 설정
- [x] GitHub Actions 활성화
- [x] 워크플로우 파일 존재 (`.github/workflows/deploy.yml`)
- [ ] `FIREBASE_SERVICE_ACCOUNT_AICOCO` Secret 설정 확인 필요

### Firebase 설정
- [x] Firebase 프로젝트 생성 완료 (`aicoco-5f8e6`)
- [x] Firebase Hosting 활성화
- [x] Firestore Database 설정
- [x] Firebase 설정 파일 존재 (`.firebaserc`, `firebase.json`)
- [x] Firestore Rules 설정 (`firestore.rules`)

### 보안 설정
- [x] `.gitignore`에 서비스 계정 키 파일 제외 설정
- [x] Firebase 서비스 계정 키 파일 보안 처리

---

## 🔧 문제 해결

### 배포 실패 시 확인 사항

1. **Secret 설정 확인**
   - GitHub Secrets에 `FIREBASE_SERVICE_ACCOUNT_AICOCO`가 올바르게 설정되었는지 확인
   - JSON 형식이 올바른지 확인

2. **빌드 오류 확인**
   - 로컬에서 `npm run build` 실행하여 빌드 오류 확인
   - GitHub Actions 로그에서 빌드 단계 오류 확인

3. **Firebase 권한 확인**
   - Firebase Console에서 서비스 계정 권한 확인
   - Firebase Hosting API 활성화 확인

4. **네트워크 문제**
   - GitHub Actions 실행 환경의 네트워크 상태 확인
   - Firebase 서비스 상태 확인

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. GitHub Actions 로그 확인
2. Firebase Console의 배포 내역 확인
3. 프로젝트 팀원과 협의

---

**마지막 업데이트**: 2025-01-27

