# Task 269 — Naver Token Issuance HTTP 403 Credential Auth Read-Only Checklist

## 목적

Task 268에서 정리된 Token 발급 단계 HTTP 403 실패를 기반으로
자격증명/전자서명/권한 상태를 값 노출 없는 read-only 체크리스트로 점검합니다.

## 점검 대상

| 항목 | 방식 |
|------|------|
| Env key 존재 여부 | `PRESENT` / `MISSING` 만 표시 (값 비출력) |
| Base URL Host | `MATCH` / `MISMATCH` 만 표시 (실제 값 비출력) |
| Token URL Path | 예상 경로(`/external/v1/oauth2/token`) 일치 여부만 |
| Timestamp 단위 | millisecond 단위 필요 여부 |
| 전자서명 구조 | `client_id + "_" + timestamp`, bcrypt, base64 |
| client_secret 전송 | 원문 직접 전송 금지 확인 |
| 앱 승인/권한 상태 | 사용자 포털 직접 확인 필요 |

## 화면 배치

```
Task 268: HTTP 403 Token Issuance Failure Diagnosis
↓
Task 269: HTTP 403 Credential Auth Read-Only Checklist  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-token-issuance-http-403-credential-auth-read-only-checklist-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-token-issuance-http-403-credential-auth-read-only-checklist-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-token-issuance-http-403-credential-auth-read-only-checklist-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 269 패널 삽입)

## 상태

- READ-ONLY 체크리스트 View Contract 전용
- 실행 권한: 닫혀 있음
- 기준 커밋: 7240c52 (Task 268)
