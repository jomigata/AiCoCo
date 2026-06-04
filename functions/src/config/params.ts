import { defineString } from 'firebase-functions/params'

/** Placeholder when FAQ sheet is not configured (CI deploy without secrets). */
export const FAQ_SHEET_UNSET = 'unset'

/** Google Sheets 문서 ID (URL의 /d/ 다음 문자열) */
export const counselFaqSheetId = defineString('COUNSEL_FAQ_SHEET_ID', {
  default: FAQ_SHEET_UNSET,
  description: 'Google Sheets document ID for counsel FAQ sync',
})

/** 시트 탭 gid (주소 #gid= 값, 기본 0) */
export const counselFaqSheetGid = defineString('COUNSEL_FAQ_SHEET_GID', {
  default: '0',
  description: 'Google Sheets tab gid for counsel FAQ CSV export',
})

export function isCounselFaqSheetConfigured(sheetId?: string): boolean {
  const id = (sheetId ?? counselFaqSheetId.value()).trim()
  return id.length > 0 && id !== FAQ_SHEET_UNSET
}
