# 상담 FAQ Google Sheets 연동

AiCoCo는 **Google Sheets**에 정리한 상담 FAQ를 Firestore에 동기화한 뒤, AI 답변 시 **관련 FAQ만** Gemini에 전달합니다.

## 1. 시트 만들기

첫 행(헤더) 예시:

| category | keywords | answer |
|----------|----------|--------|
| 우울 | 우울, 무기력, 허전 | 날씨와 기분이 함께 무거워질 수 있어요. 지금 가장 힘든 감정이 무엇인지… |
| 불안 | 불안, 걱정, 긴장 | 불안할 때 몸이 먼저 반응하기도 해요. 최근에 특히 걱정되는 일이… |

- **category** (또는 `카테고리`): 필수  
- **answer** (또는 `답변`, `답변템플릿`): 필수  
- **keywords** (또는 `키워드`): 선택, 쉼표로 구분  

## 2. 시트 공개

1. 시트 **공유** → **링크가 있는 모든 사용자** → **뷰어**  
2. URL에서 **문서 ID** 복사: `https://docs.google.com/spreadsheets/d/【이부분】/edit`  
3. 탭마다 **gid**가 다르면 URL `#gid=123456` 값도 복사  

## 3. Firebase Functions 환경 변수

`functions/.env` 또는 GitHub Actions Secrets:

```env
COUNSEL_FAQ_SHEET_ID=스프레드시트_ID
COUNSEL_FAQ_SHEET_GID=0
```

**CI/CD:** [GitHub Secrets](https://github.com/jomigata/AiCoCo/settings/secrets/actions)에  
`COUNSEL_FAQ_SHEET_ID`, `COUNSEL_FAQ_SHEET_GID`(선택)를 등록하면 배포 시 자동 반영됩니다.  
미등록 시 `unset`으로 배포되며 FAQ 동기화는 스킵됩니다.

로컬 배포 예:

```powershell
cd functions
"COUNSEL_FAQ_SHEET_ID=your_id`nCOUNSEL_FAQ_SHEET_GID=0" | Out-File -Encoding utf8 .env
cd ..
firebase deploy --only functions,firestore --project aicoco-5f8e6
```

## 4. 동기화 실행

- **자동:** 매일 1회 (`scheduledSyncCounselFaq`)  
- **수동:** 관리자 로그인 → **내 상담** 페이지 → **FAQ 시트 동기화** 버튼  
- 또는 Callable: `syncCounselFaqFromSheet`  

## 5. 동작 방식

1. 시트 CSV 다운로드 → `counselFaqs` 컬렉션 저장  
2. 사용자 메시지와 **keywords/category** 매칭 → 상위 3건  
3. Flash-Lite에 **짧은 참고 블록만** 전달 (전체 시트 X)  

## 6. 비용

- 시트 동기화: Functions 1회/일 + Firestore 쓰기 (FAQ 행 수만큼)  
- 상담 1회: Flash-Lite 1회 + FAQ 검색 (Firestore 읽기, FAQ 100건 이하 권장)  
