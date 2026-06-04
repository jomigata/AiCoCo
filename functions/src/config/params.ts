import { defineString } from 'firebase-functions/params'

/** Google Sheets 문서 ID (URL의 /d/ 다음 문자열) */
export const counselFaqSheetId = defineString('COUNSEL_FAQ_SHEET_ID', { default: '' })

/** 시트 탭 gid (주소 #gid= 값, 기본 0) */
export const counselFaqSheetGid = defineString('COUNSEL_FAQ_SHEET_GID', { default: '0' })
