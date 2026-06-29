# Task 274 — Naver Product Lookup Live Retry Outcome Certification

## 목적

Task 273에서 계산된 `nextDecisionStatus`를 바탕으로, 현재 TMS가 다음 단계로 갈 수 있는지
또는 어떤 보정이 필요한지 read-only Outcome Certification 패널로 정리합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Certification 판정 규칙

| nextDecisionStatus | outcomeCertificationStatus |
|-------------------|---------------------------|
| READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE | CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE |
| BLOCKED_BY_GW_IP_NOT_ALLOWED | CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| BLOCKED_BY_TOKEN_RETRY_FAILURE | CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| BLOCKED_BY_ENV_MISSING | CERTIFIED_BLOCKED_BY_ENV_MISSING |
| BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 화면 배치

```
Task 273: Live 재시도 결과 Decision Gate
↓
Task 274: Live 재시도 결과 Outcome Certification  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-certification-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-certification-view.test.ts` (신규) — 15 pass
3. `docs/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-certification-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 274 패널 삽입)

## 상태

- READ-ONLY Outcome Certification View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- 기준 커밋: 5cd0d89 (Task 273)
