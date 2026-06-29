# Task 273 — Naver Product Lookup Live Retry Outcome Decision Gate

## 목적

Task 271의 Token 재시도/상품 조회 read-only 결과와 Task 272의 비수정 감사 봉인을 바탕으로,
다음 단계로 무엇을 해야 하는지 read-only Decision Gate 패널을 추가합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Decision 판정 규칙

| 조건 | nextDecisionStatus |
|------|-------------------|
| tokenRetryStatus=SUCCESS + productLookupRetryStatus=SUCCESS | READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE |
| tokenRetryStatus=FAILURE + isGwIpNotAllowedResolved=false | BLOCKED_BY_GW_IP_NOT_ALLOWED |
| tokenRetryStatus=FAILURE + isGwIpNotAllowedResolved=true | BLOCKED_BY_TOKEN_RETRY_FAILURE |
| tokenRetryStatus=ENV_MISSING | BLOCKED_BY_ENV_MISSING |
| productLookupRetryStatus=SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO | BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| tokenRetryStatus=SUCCESS + productLookupRetryStatus=FAILURE | BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 화면 배치

```
Task 272: Live 재시도 결과 비수정 감사 봉인
↓
Task 273: Live 재시도 결과 Decision Gate  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-decision-gate-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-decision-gate-view.test.ts` (신규) — 16 pass
3. `docs/sku-keyword-final-approval-execution-naver-product-lookup-live-retry-outcome-decision-gate-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 273 패널 삽입)

## 상태

- READ-ONLY Decision Gate View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- 기준 커밋: 2a92628 (Task 272)
