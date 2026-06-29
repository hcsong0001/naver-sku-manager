# Task 281 — Naver Basic Product Data Summary Review

## 목적

Task 280 승인 패킷 상태를 바탕으로, Task 276에서 캡처한 기존 read-only 상품 데이터를
요약 검토 패널로 표시합니다. 기존 캡처 데이터만 사용하며 신규 API 호출은 없습니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Summary Review 판정 규칙

| basicProductDataSummaryReviewApprovalPacketStatus | basicProductDataSummaryReviewStatus |
|---------------------------------------------------|-------------------------------------|
| APPROVAL_PACKET_READY_FOR_COMPLETE_DATA | SUMMARY_REVIEW_COMPLETE |
| APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE | SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE |
| APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED | SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE | SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING | SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING |
| APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## basicProductDataSummary 필드 정책

- channelProductNo, productName, productStatus, leafCategoryId: 실제 값 표시 (null 허용)
- salePricePresent, stockQuantityPresent, representativeImageUrlPresent: boolean 존재 여부만 표시
- salePrice(원본), stockQuantity(원본): 제외

## 화면 배치

```
Task 280: Basic Product Data Summary Review Approval Packet
↓
Task 281: Basic Product Data Summary Review  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-view.test.ts` (신규) — 15 pass
3. `docs/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 281 패널 삽입)

## 상태

- READ-ONLY Summary Review View 전용
- 기존 캡처 데이터만 사용 (신규 API 호출 없음)
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 276/277/278/279/280 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: 6621914 (Task 280)
