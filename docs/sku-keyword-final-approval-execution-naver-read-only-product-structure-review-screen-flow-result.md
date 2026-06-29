# Task 285 — Naver Read-Only Product Structure Review

## 목적

Task 284 승인 이후, 기존 캡처 데이터와 기존 요약 검토 결과만 사용해
read-only 상품 구조를 검토하는 패널을 추가합니다.

이번 Task에서는 Token 재발급, Naver API 호출, 상품 조회 API 재호출,
상품 수정 API 호출, 가격 변경, 재고 변경, DB write/upsert/update를 수행하지 않습니다.

## 구조 검토 기준

- 입력 기준: Task 284 `readOnlyProductStructureReviewApprovalPacketStatus`
- 데이터 기준: Task 276 캡처 결과 + Task 281 요약 검토 결과
- 표시 범위: `channelProductNo`, `productName`, `productStatus`, `leafCategoryId`,
  `salePricePresent`, `stockQuantityPresent`, `representativeImageUrlPresent`
- 비표시 항목: 가격/재고 원본 값, raw API response 전체, Token/Auth/Signature/Authorization 값

## 상태 매핑

| Task 284 승인 패킷 상태 | Task 285 구조 검토 상태 |
|---|---|
| `APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE` |
| `APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE` |
| `APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED` |
| `APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE` |
| `APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING` |
| `APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` |
| `APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` | `READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` |

## 화면 배치

```text
Task 284 Naver Read-Only Product Structure Review Approval Packet
Task 285 Naver Read-Only Product Structure Review
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (연결 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 285 패널 추가)
