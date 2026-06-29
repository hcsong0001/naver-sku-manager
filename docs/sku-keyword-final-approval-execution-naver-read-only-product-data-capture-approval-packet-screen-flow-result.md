# Task 275 — Naver Read-Only Product Data Capture Approval Packet

## 목적

Task 274 Outcome Certification에서 인증된 `outcomeCertificationStatus`를 바탕으로,
다음 단계인 read-only 상품 데이터 캡처 진입 가능 여부를 승인 패킷 패널로 정리합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## Approval Packet 판정 규칙

| outcomeCertificationStatus | readOnlyProductDataCaptureApprovalPacketStatus |
|---------------------------|-----------------------------------------------|
| CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE | APPROVAL_PACKET_READY |
| CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED | APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED |
| CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE | APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE |
| CERTIFIED_BLOCKED_BY_ENV_MISSING | APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING |
| CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO | APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO |
| CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE | APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE |

## 화면 배치

```
Task 274: Live 재시도 결과 Outcome Certification
↓
Task 275: Read-Only Product Data Capture Approval Packet  ← 이번 추가
↓
BatchJob 실행 결과
```

## 사용자 승인 문구 안내 (다음 단계 진입 시 필요)

```
"Task 276에서 Naver 상품 조회 결과의 read-only 데이터 캡처를 승인합니다.
상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 말고,
Token/Auth/Signature/Authorization 값은 출력하지 마세요."
```

이번 Task에서는 위 문구를 안내만 하고 승인으로 처리하지 않습니다.

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-approval-packet-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-approval-packet-view.test.ts` (신규) — 16 pass
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-approval-packet-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 275 패널 삽입)

## 상태

- READ-ONLY Approval Packet View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- 기준 커밋: 9bd0e18 (Task 274)
