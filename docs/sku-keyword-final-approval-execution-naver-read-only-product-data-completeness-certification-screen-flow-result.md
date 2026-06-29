# Task 279 — Naver Read-Only Product Data Completeness Certification

## 목적

Task 278의 `readOnlyProductDataCompletenessStatus`를 바탕으로 완성도 인증 상태를 계산하고,
기본 상품 데이터 요약 검토 후보 여부를 read-only 패널로 확인합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Certification 판정 규칙

| readOnlyProductDataCompletenessStatus | readOnlyProductDataCompletenessCertificationStatus |
|---------------------------------------|---------------------------------------------------|
| BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW | CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW |
| BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW | CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW |
| BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED | CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE | CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING | CERTIFIED_BLOCKED_BY_ENV_MISSING |
| BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 검토 후보 판정

- `isReadyForBasicProductDataSummaryReview`: COMPLETE 또는 PARTIAL이면 true
- `isBasicProductDataSummaryReviewBlocked`: BLOCKED이면 true
- `isMissingFieldNoticeRequired`: PARTIAL이면 true

## 화면 배치

```
Task 278: Read-Only Product Data Capture Completeness Review
↓
Task 279: Read-Only Product Data Completeness Certification  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-completeness-certification-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-completeness-certification-view.test.ts` (신규) — 15 pass
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-data-completeness-certification-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 279 패널 삽입)

## 상태

- READ-ONLY Completeness Certification View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 276/277/278 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: 50c3141 (Task 278)
