# Task 280 — Naver Basic Product Data Summary Review Approval Packet

## 목적

Task 279의 `readOnlyProductDataCompletenessCertificationStatus`를 바탕으로,
기본 상품 데이터 요약 검토 진입 가능 여부를 판단하고 승인 요청 패킷을 read-only 패널로 표시합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write,
기본 상품 데이터 요약 검토 실제 수행을 하지 않습니다.

## Approval Packet 판정 규칙

| readOnlyProductDataCompletenessCertificationStatus | basicProductDataSummaryReviewApprovalPacketStatus |
|----------------------------------------------------|---------------------------------------------------|
| CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW | APPROVAL_PACKET_READY_FOR_COMPLETE_DATA |
| CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW | APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE |
| CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED | APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE | APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| CERTIFIED_BLOCKED_BY_ENV_MISSING | APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING |
| CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 사용자 승인 문구 (Task 281 기준, 이번 Task에서는 안내만)

> "Task 281에서 Naver read-only 기본 상품 데이터 요약 검토를 승인합니다. 기존 캡처 데이터만 사용하고, Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요."

## 화면 배치

```
Task 279: Read-Only Product Data Completeness Certification
↓
Task 280: Basic Product Data Summary Review Approval Packet  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-approval-packet-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-approval-packet-view.test.ts` (신규) — 16 pass
3. `docs/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-approval-packet-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 280 패널 삽입)

## 상태

- READ-ONLY Approval Packet View 전용
- Token 재발급/API 재호출/DB write/상품 수정/요약 검토 실제 수행: 없음
- Task 276/277/278/279 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: e04b46d (Task 279)
