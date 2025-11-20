# Firebase Authentication 설정 가이드

## 🔴 현재 발생 중인 오류

**오류 메시지**: `Firebase: Error (auth/configuration-not-found)`

이 오류는 Firebase Console에서 Authentication이 활성화되지 않았거나, 이메일/비밀번호 인증 방법이 활성화되지 않았을 때 발생합니다.

---

## ✅ 해결 방법

### 1. Firebase Console에서 Authentication 활성화

1. **Firebase Console 접속**
   - https://console.firebase.google.com/project/aicoco-5f8e6 접속

2. **Authentication 메뉴로 이동**
   - 왼쪽 사이드바에서 "Authentication" 클릭
   - 또는 직접 링크: https://console.firebase.google.com/project/aicoco-5f8e6/authentication

3. **Sign-in method 활성화**
   - "Sign-in method" 탭 클릭
   - "Email/Password" 제공업체 찾기
   - "Email/Password" 클릭하여 편집
   - "Enable" 토글을 켜기
   - "Save" 클릭

4. **추가 설정 (선택사항)**
   - "Email link (passwordless sign-in)" 활성화 여부 선택
   - "Save" 클릭

---

## 📋 단계별 체크리스트

### Firebase Console 설정 확인

- [ ] Firebase 프로젝트에 접속 가능
- [ ] Authentication 메뉴가 보임
- [ ] "Sign-in method" 탭 접근 가능
- [ ] "Email/Password" 제공업체가 목록에 있음
- [ ] "Email/Password"가 "Enabled" 상태임

### 코드 설정 확인

- [ ] `firebaseConfig`가 올바르게 설정됨
- [ ] `apiKey`가 정확함
- [ ] `authDomain`이 정확함
- [ ] `projectId`가 정확함

---

## 🔗 필요한 링크

### Firebase Console
- **프로젝트 홈**: https://console.firebase.google.com/project/aicoco-5f8e6
- **Authentication**: https://console.firebase.google.com/project/aicoco-5f8e6/authentication
- **Sign-in method**: https://console.firebase.google.com/project/aicoco-5f8e6/authentication/providers

### 현재 프로젝트 설정
- **프로젝트 ID**: `aicoco-5f8e6`
- **Auth Domain**: `aicoco-5f8e6.firebaseapp.com`

---

## 🛠️ 문제 해결

### 문제 1: Authentication 메뉴가 보이지 않음

**해결 방법**:
1. Firebase 프로젝트가 올바르게 선택되었는지 확인
2. 프로젝트 권한이 있는지 확인
3. 브라우저 캐시를 지우고 다시 시도

### 문제 2: Email/Password가 활성화되지 않음

**해결 방법**:
1. "Sign-in method" 탭에서 "Email/Password" 클릭
2. "Enable" 토글을 켜기
3. "Save" 버튼 클릭
4. 페이지를 새로고침하고 다시 시도

### 문제 3: 여전히 오류가 발생함

**해결 방법**:
1. 브라우저 개발자 도구에서 네트워크 탭 확인
2. Firebase API 호출이 성공하는지 확인
3. Firebase 설정이 올바른지 재확인
4. Firebase 프로젝트가 활성 상태인지 확인

---

## 📝 참고 사항

1. **Firebase Authentication 활성화**는 프로젝트 생성 후 한 번만 설정하면 됩니다.
2. **이메일/비밀번호 인증**은 기본적으로 제공되는 인증 방법입니다.
3. **다른 인증 방법** (Google, Facebook 등)도 필요시 활성화할 수 있습니다.

---

## ✅ 설정 완료 후 확인

설정이 완료되면 다음을 확인하세요:

1. Firebase Console에서 "Email/Password"가 "Enabled" 상태인지 확인
2. 웹 애플리케이션에서 회원가입/로그인 시도
3. 오류 없이 작동하는지 확인

---

**마지막 업데이트**: 2025-01-27

