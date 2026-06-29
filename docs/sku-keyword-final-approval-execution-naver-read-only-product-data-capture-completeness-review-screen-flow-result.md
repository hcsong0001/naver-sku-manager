# Task 278 — Naver Read-Only Product Data Capture Completeness Review

## 목적

Task 276에서 구성한 `capturedProductData`와 Task 277 안전 감사 봉인을 바탕으로,
현재 확보된 read-only 상품 데이터가 기본 상품 식별/상태 검토에 충분한지 read-only 패널로 리뷰합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Completeness 판정 규칙

| 조건 | readOnlyProductDataCompletenessStatus |
|------|---------------------------------------|
| CAPTURED + channelProductNo, productName, productStatus 모두 존재 | BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW |
| CAPTURED + 필수 필드 일부 누락 | BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW |
| CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED | BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE | BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| CAPTURE_BLOCKED_BY_ENV_MISSING | BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING |
| CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 필드 리뷰 정책

- channelProductNo, productName, productStatus, leafCategoryId: PRESENT / MISSING
- representativeImageUrlPresent, salePricePresent, stockQuantityPresent: PRESENCE_FLAG_ONLY (원본 값 미포함)

## 화면 배치

```
Task 277: Read-Only Product Data Capture Safety Audit Seal
↓
Task 278: Read-Only Product Data Capture Completeness Review  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-completeness-review-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-completeness-review-view.test.ts` (신규) — 16 pass
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-completeness-review-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 278 패널 삽입)

## 상태

- READ-ONLY Completeness Review View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 276/277 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: 9f2354c (Task 277)
