# Task 284 — Naver Read-Only Product Structure Review Approval Packet

## 목적

Task 283에서 인증된 `basicProductDataSummaryReviewOutcomeCertificationStatus`를 바탕으로,
다음 단계인 read-only 상품 구조 검토로 진입할 수 있는지 판단하고
사용자 승인 요청 패킷을 read-only 패널로 표시합니다.

이번 Task는 승인 요청 패킷 표시 전용이며,
Token 재발급, Naver API 호출, 상품 조회 API 재호출, 실제 상품 구조 검토 수행,
상품 수정 API 호출, 가격 변경, 재고 변경, DB write/upsert/update,
raw API response 표시 또는 저장을 수행하지 않습니다.

## 상태 매핑

| Task 283 인증 상태 | Task 284 승인 패킷 상태 |
|---|---|
| `CERTIFIED_SUMMARY_REVIEW_COMPLETE` | `APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY` |
| `CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE` | `APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE` |
| `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED` | `APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED` |
| `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE` | `APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE` |
| `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING` | `APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING` |
| `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` | `APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` |
| `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` | `APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` |

## 핵심 의미

- COMPLETE면 read-only 상품 구조 검토 승인 패킷 READY
- PARTIAL이면 누락 필드 안내 포함 승인 패킷 READY
- BLOCKED면 원인별 보정 필요
- 사용자 승인 전까지 실제 상품 구조 검토는 수행하지 않음
- 기존 캡처 데이터와 기존 요약 검토 결과만 사용
- 새 API 호출 없음
- 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값 비표시

## 사용자 승인 문구 안내

```text
실제 read-only 상품 구조 검토 단계를 진행하려면 사용자가 아래 문구로 별도 승인해야 합니다.

"Task 285에서 Naver read-only 상품 구조 검토를 승인합니다. 기존 캡처 데이터와 기존 요약 검토 결과만 사용하고, Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요."
```

이번 Task에서는 안내만 하며 승인으로 처리하지 않습니다.

## 화면 배치

```text
Task 283 Naver Basic Product Data Summary Review Outcome Certification
Task 284 Naver Read-Only Product Structure Review Approval Packet
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-approval-packet-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-approval-packet-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-approval-packet-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (연결 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 284 패널 추가)
