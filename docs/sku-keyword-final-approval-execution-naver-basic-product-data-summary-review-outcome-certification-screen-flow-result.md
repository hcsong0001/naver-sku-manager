# Task 283 — Naver Basic Product Data Summary Review Outcome Certification

## 목적

Task 281 기본 상품 데이터 요약 검토 결과와 Task 282 안전 감사 봉인을 바탕으로,
현재 요약 검토 결과가 다음 read-only 상품 구조 검토 후보로 사용할 수 있는지
read-only Outcome Certification 패널로 인증합니다.

이번 Task는 결과 인증 표시 전용이며, Token 재발급, Naver API 호출, 상품 조회 API 재호출,
상품 수정 API 호출, 가격 변경, 재고 변경, DB write/upsert/update, raw API response 표시/저장을 수행하지 않습니다.

## 실제 상태명 기준

Task 281 구현의 실제 상태명을 기준으로 인증 상태를 계산합니다.

| Task 281 상태 | Task 283 인증 상태 |
|---|---|
| `SUMMARY_REVIEW_COMPLETE` | `CERTIFIED_SUMMARY_REVIEW_COMPLETE` |
| `SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE` | `CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE` |
| `SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED` | `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED` |
| `SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE` | `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE` |
| `SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING` | `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING` |
| `SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` | `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO` |
| `SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` | `CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE` |

## 핵심 플래그

- `status: NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_OUTCOME_CERTIFICATION_READY`
- `isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true`
- `isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true`
- `isNaverBasicProductDataSummaryReviewReady: true`
- `isNaverBasicProductDataSummaryReviewApprovalPacketReady: true`
- `isNaverReadOnlyProductDataCaptureResultReady: true`
- `isReadyForNextReadOnlyProductStructureReview: COMPLETE/PARTIAL일 때 true`
- `isNextReadOnlyProductStructureReviewBlocked: BLOCKED일 때 true`
- `isMissingFieldNoticeRequired: PARTIAL일 때 true`

## certificationItems 요약

| 항목 | 상태 |
|---|---|
| Task 282 Safety Audit Seal | `SAFETY_AUDIT_SEAL_CONFIRMED` |
| Task 281 Summary Review | `SUMMARY_REVIEW_CONFIRMED` |
| Task 280 Approval Packet | `APPROVAL_PACKET_CONFIRMED` |
| Task 276 Capture Result | `CAPTURE_RESULT_CONFIRMED` |
| Outcome Certification | `OUTCOME_CERTIFICATION_STATUS_RECORDED` |
| COMPLETE 요약 | `CERTIFIED_READY_IF_COMPLETE` |
| PARTIAL 요약 | `CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE` |
| 각 BLOCKED 원인 | `CERTIFIED_BLOCKED_RECHECK_*` |
| 기존 캡처 데이터만 사용 | `CAPTURED_DATA_ONLY_CONFIRMED` |
| 가격/재고/raw 응답 | `NOT_INCLUDED` |
| Token/Auth/Signature/Authorization | `NOT_DISPLAYED` |
| Token 재발급/API 재호출/수정/변경/DB write | `NOT_EXECUTED` |
| Worker / Queue / Adapter | `LOCKED` |
| 다음 단계 | `PENDING_SEPARATE_APPROVAL` |
| 현재 Task 상태 | `READ_ONLY_INFO` |

## 화면 배치

```
Task 282: Naver Basic Product Data Summary Review Safety Audit Seal
↓
Task 283: Naver Basic Product Data Summary Review Outcome Certification  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-outcome-certification-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-outcome-certification-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-outcome-certification-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import/조립/response payload 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 283 패널 추가)
