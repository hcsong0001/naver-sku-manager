# Task 265: Naver Product Lookup API Readiness Gate Screen Flow Result

## 목적
Task 264 Token 비노출·비저장·비전파 감사 봉인 완료 후, 다음 단계인 Naver 상품 조회 API 연결 전 Readiness Gate 상태를 read-only 패널로 표시. 이번 Task는 실제 상품 조회 API 호출이 아님.

## 추가된 패널 위치
```
Task 264 Token Issuance One-Time Test Non-Retention Audit Seal
Task 265 Naver Product Lookup API Readiness Gate   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-product-lookup-api-readiness-gate-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-product-lookup-api-readiness-gate-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-product-lookup-api-readiness-gate-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: NAVER_PRODUCT_LOOKUP_API_READINESS_GATE_READY
- isNaverProductLookupApiReadinessGateReady: true
- issuanceTestStatus: SUCCESS | FAILURE | ENV_MISSING (Task 263 결과 참조, 동적)
- productLookupReadinessStatus: 동적 판정 (아래 규칙 적용)
- isProductLookupApiApprovalRequired: true
- isProductLookupApiApprovalGranted: false (항상)
- isProductLookupApiCalled: false (항상)
- isNaverApiCalledInThisTask: false (항상)

## productLookupReadinessStatus 판정 규칙
| issuanceTestStatus | productLookupReadinessStatus | isReadyForProductLookupApiApprovalGate |
|---|---|---|
| SUCCESS | READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE | true |
| FAILURE | BLOCKED_BY_TOKEN_ISSUANCE_FAILURE | false |
| ENV_MISSING | BLOCKED_BY_ENV_MISSING | false |

## Gate Items (22개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Token Test Result (Task 263) | TOKEN_TEST_RESULT_CONFIRMED | Task 263 결과 확인 |
| Token Non-Retention Audit Seal (Task 264) | NON_RETENTION_AUDIT_CONFIRMED | Task 264 감사 봉인 확인 |
| Token 값 비포함 | TOKEN_VALUE_NOT_INCLUDED | Token 값 view/API/client/log/DB 비포함 |
| Token DB 저장 여부 | TOKEN_NOT_STORED_IN_DB | 저장 없음 |
| Token 로그 출력 여부 | TOKEN_NOT_LOGGED | 로그 없음 |
| Error Reason 처리 | ERROR_REASON_REDACTED | 실패 사유 redacted |
| 상품 조회 API 준비 상태 | READY_IF_TOKEN_TEST_SUCCESS (동적) | SUCCESS인 경우만 Gate 후보 |
| 상품 조회 API 차단 조건 | BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS | FAILURE/ENV_MISSING이면 차단 |
| 실제 상품 조회 API 호출 | LOCKED_UNTIL_SEPARATE_APPROVAL | 별도 승인 전 호출 금지 |
| 상품 수정 API 호출 | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Token 재발급 | LOCKED | 이번 Task에서 재발급 없음 |
| Token 값 표시 | FORBIDDEN | 값 출력 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| ".env" 직접 열람 | NOT_ACCESSED | 파일 직접 열람 없음 |
| ".env" 자동 수정 | NOT_MODIFIED | 파일 수정 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| 다음 단계 | PENDING_SEPARATE_APPROVAL | 상품 조회 API 별도 승인 필요 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 265는 Readiness Gate 표시 전용 |

## 다음 단계 진행 조건
사용자가 별도 지시로 Task 266을 지정해야 다음 단계가 진행됩니다. 자동 진행 금지.
