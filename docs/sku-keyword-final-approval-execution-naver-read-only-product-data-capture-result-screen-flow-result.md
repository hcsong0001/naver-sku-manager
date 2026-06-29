# Task 276 — Naver Read-Only Product Data Capture Result

## 목적

Task 275 승인 패킷과 Task 271의 기존 read-only 상품 조회 결과를 바탕으로,
화면 표시용 read-only 상품 데이터 캡처 결과 패널을 추가합니다.

이번 Task는 DB 저장이 아닙니다.
이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Capture 판정 규칙

| 조건 | readOnlyProductDataCaptureStatus |
|------|----------------------------------|
| APPROVAL_PACKET_READY + tokenRetry=SUCCESS + productLookup=SUCCESS | CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT |
| APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED | CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE | CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING | CAPTURE_BLOCKED_BY_ENV_MISSING |
| APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 허용 캡처 필드

Task 271 `productLookupReadOnlyInfo`에서 아래 필드만 추출:
- channelProductNo, productName, productStatus (statusType rename)
- salePricePresent (boolean — 원본 가격 값 미포함)
- stockQuantityPresent (boolean — 원본 재고 값 미포함)
- leafCategoryId, representativeImageUrlPresent

원본 API 응답 전체, 가격/재고 원본 값, Token/Auth/Signature/Authorization 값 포함 금지.

## 화면 배치

```
Task 275: Read-Only Product Data Capture Approval Packet
↓
Task 276: Read-Only Product Data Capture Result  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-result-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-result-view.test.ts` (신규) — 16 pass
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-result-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 276 패널 삽입)

## 상태

- READ-ONLY Data Capture Result View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 271 기존 변수 재사용 (중복 API 호출 없음)
- 기준 커밋: 23ac3f7 (Task 275)
