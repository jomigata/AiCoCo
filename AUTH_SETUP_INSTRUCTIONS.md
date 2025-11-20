# Firebase Authentication 설정 완료 가이드

## 🔴 현재 문제

**오류**: `Firebase: Error (auth/configuration-not-found)`

이 오류는 Firebase Console에서 Email/Password 인증 방법이 활성화되지 않았을 때 발생합니다.

---

## ✅ 해결 방법 (필수)

Firebase Console에서 Email/Password 인증을 활성화해야 합니다. **코드로는 자동 활성화가 불가능**하며, Firebase Console에서 수동으로 설정해야 합니다.

### 단계별 가이드

#### 1단계: Firebase Console 접속

**직접 링크**: 
👉 **[Firebase Authentication 설정 페이지](https://console.firebase.google.com/project/aicoco-5f8e6/authentication/providers)**

또는:
1. https://console.firebase.google.com 접속
2. 프로젝트 `aicoco-5f8e6` 선택
3. 왼쪽 메뉴에서 "Authentication" 클릭

#### 2단계: Sign-in method 활성화

1. **"Sign-in method" 탭 클릭**
   - Authentication 페이지 상단의 탭 중 "Sign-in method" 선택

2. **"Email/Password" 찾기**
   - 제공업체 목록에서 "Email/Password" 찾기
   - 기본적으로 목록에 표시됩니다

3. **"Email/Password" 클릭하여 편집**
   - "Email/Password" 행을 클릭

4. **"Enable" 토글 켜기**
   - 상단의 "Enable" 토글을 켜기 (ON 상태로 변경)

5. **"Save" 버튼 클릭**
   - 페이지 하단의 "Save" 버튼 클릭

#### 3단계: 확인

설정이 완료되면:
- "Email/Password" 행에 "Enabled" 상태 표시
- 웹 애플리케이션에서 회원가입/로그인 시도
- 오류 없이 작동하는지 확인

---

## 🔗 빠른 링크

### Firebase Console 링크
- **Authentication 메인**: https://console.firebase.google.com/project/aicoco-5f8e6/authentication
- **Sign-in method 설정**: https://console.firebase.google.com/project/aicoco-5f8e6/authentication/providers
- **프로젝트 홈**: https://console.firebase.google.com/project/aicoco-5f8e6

### 웹 애플리케이션 링크
- **회원가입 페이지**: https://aicoco-5f8e6.web.app/signup
- **로그인 페이지**: https://aicoco-5f8e6.web.app/login

---

## 📸 시각적 가이드

### Firebase Console 화면 구성

```
Firebase Console
├── 프로젝트: aicoco-5f8e6
└── Authentication
    ├── Users (탭)
    ├── Sign-in method (탭) ← 여기 클릭!
    └── Templates (탭)
```

### Sign-in method 화면

```
Sign-in method 탭
├── Email/Password ← 클릭하여 편집
│   ├── Enable: [OFF] → [ON]으로 변경
│   └── Save 버튼 클릭
├── Google (선택사항)
├── Facebook (선택사항)
└── ...
```

---

## ⚠️ 중요 사항

1. **수동 설정 필요**: Firebase Authentication 활성화는 Firebase Console에서만 가능합니다.
2. **프로젝트 권한**: Firebase 프로젝트의 소유자 또는 편집 권한이 필요합니다.
3. **즉시 적용**: 설정 저장 후 즉시 적용되며, 페이지 새로고침 없이 바로 사용 가능합니다.

---

## 🛠️ 문제 해결

### 문제 1: "Sign-in method" 탭이 보이지 않음

**해결 방법**:
- Firebase 프로젝트가 올바르게 선택되었는지 확인
- 브라우저를 새로고침
- 다른 브라우저에서 시도

### 문제 2: "Email/Password"가 목록에 없음

**해결 방법**:
- Firebase 프로젝트가 활성 상태인지 확인
- Firebase 지원팀에 문의

### 문제 3: 설정 후에도 오류 발생

**해결 방법**:
1. Firebase Console에서 설정이 저장되었는지 확인
2. 웹 애플리케이션 페이지를 완전히 새로고침 (Ctrl+F5 또는 Cmd+Shift+R)
3. 브라우저 캐시 삭제
4. 개발자 도구 콘솔에서 오류 메시지 확인

---

## ✅ 설정 완료 체크리스트

- [ ] Firebase Console에 접속 가능
- [ ] Authentication 메뉴 접근 가능
- [ ] "Sign-in method" 탭 접근 가능
- [ ] "Email/Password" 제공업체 확인
- [ ] "Email/Password" 활성화 완료
- [ ] 웹 애플리케이션에서 회원가입 테스트 성공
- [ ] 웹 애플리케이션에서 로그인 테스트 성공

---

## 📞 추가 도움말

설정 중 문제가 발생하면:
1. Firebase 문서 참조: https://firebase.google.com/docs/auth/web/start
2. Firebase 지원: https://firebase.google.com/support

---

**마지막 업데이트**: 2025-01-27

