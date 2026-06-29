# Task 297 - Naver Read-Only Execution Approval Review Screen Flow Result

## 개요

Task 297은 Task 296에서 준비된 readOnlyExecutionApprovalPacketStatus를 바탕으로 실행 승인 가능 여부를 read-only로 검토하는 단계입니다.
이 단계는 실제 실행 승인이나 실제 실행이 아닙니다.

## 사용자 승인 범위

"Task 297에서 Naver read-only 실행 승인 검토를 승인합니다. 이 단계는 실제 실행이나 상품 변경이 아니라 실행 승인 가능 여부를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요."

## 핵심 상태

- status: `NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_READY`
- currentTaskNumber: 297
- referenceTaskNumbers: [296, 295, 294, 293, 289, 276]
- isUserApprovalConfirmedForTask297: true

## Approval Review 판정 규칙

| 입력 (packetStatus) | 출력 (readOnlyExecutionApprovalReviewStatus) |
|---|---|
| APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE | EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE |
| APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE | EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE |
| APPROVAL_PACKET_BLOCKED_BY_GW_IP | EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP |
| APPROVAL_PACKET_BLOCKED_BY_TOKEN | EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN |
| APPROVAL_PACKET_BLOCKED_BY_ENV | EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV |
| APPROVAL_PACKET_BLOCKED_BY_CHANNEL | EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL |
| APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP | EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP |

## 검토 가능 조건

- COMPLETE/PARTIAL → isReadOnlyExecutionApprovalReviewAvailable: true
- BLOCKED → isReadOnlyExecutionApprovalReviewBlocked: true

## 이번 Task에서 수행하지 않은 항목

- Token 재발급 / Naver API 호출 / 상품 조회 API 재호출
- 실제 실행 승인 / 실제 실행 / 실행 버튼 추가
- 상품 변경 승인 / Worker 실행 / Queue enqueue / Adapter 연결
- 설계 확정 / 설계안 DB 저장 / 설계안 실행용 복사
- 가격/재고 원본 값 표시
- raw API response 표시 또는 저장
- Token/Auth/Signature/Authorization 값 표시
- 상품 수정 API 호출 / 가격/재고 변경
- DB write / upsert / update

## 수정 파일

### 신규

- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-view.test.ts`
- `docs/sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-screen-flow-result.md`

### 수정

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`

## 테스트 결과

- 총 25개 테스트 통과
- TypeScript 컴파일 오류 없음
- Next.js 빌드 성공
- Prisma validate 통과
- git diff --check 통과 (오류 없음)

## 다음 단계

Task 297 완료. 다음 Task는 별도 지시 대기.
