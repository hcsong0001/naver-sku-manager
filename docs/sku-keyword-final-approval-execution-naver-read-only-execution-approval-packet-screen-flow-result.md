# Task 296 - Naver Read-Only Execution Approval Packet Screen Flow Result

## 개요

Task 296은 Task 295에서 인증된 readOnlyDesignFinalizationCandidateOutcomeCertificationStatus를 바탕으로
다음 단계인 read-only 실행 승인 검토로 진입할 수 있는지 판단하고, 사용자 승인 요청 패킷을 read-only 패널로 추가하는 단계입니다.

이번 Task는 승인 요청 패킷 표시 전용입니다.

## 핵심 상태

- status: `NAVER_READ_ONLY_EXECUTION_APPROVAL_PACKET_READY`
- currentTaskNumber: 296
- referenceTaskNumbers: [295, 294, 293, 292, 289, 276]

## Approval Packet 판정 규칙

| 입력 (outcomeCertificationStatus) | 출력 (readOnlyExecutionApprovalPacketStatus) |
|---|---|
| CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT | APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE |
| CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE | APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE |
| CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP | APPROVAL_PACKET_BLOCKED_BY_GW_IP |
| CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN | APPROVAL_PACKET_BLOCKED_BY_TOKEN |
| CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV | APPROVAL_PACKET_BLOCKED_BY_ENV |
| CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL | APPROVAL_PACKET_BLOCKED_BY_CHANNEL |
| CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP | APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP |

## Task 297 진입 조건

- COMPLETE → isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate: true → 사용자 별도 승인 후 Task 297 진행 가능
- PARTIAL → isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice: true → 사용자 별도 승인 후 Task 297 진행 가능 (missing field notice 유지)
- BLOCKED → 원인별 보정 필요

## 사용자 승인 문구 (Task 297 기준)

"Task 297에서 Naver read-only 실행 승인 검토를 승인합니다. 이 단계는 실제 실행이나 상품 변경이 아니라 실행 승인 가능 여부를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요."

이번 Task에서는 위 문구를 안내만 하고 승인으로 처리하지 않습니다.

## 이번 Task에서 수행하지 않은 항목

- Token 재발급 / Naver API 호출 / 상품 조회 API 재호출
- 실제 실행 승인 / 실제 실행 / 실행 버튼 추가
- 상품 변경 승인
- Worker 실행 / Queue enqueue / Adapter 연결
- 설계 확정 / 설계안 DB 저장 / 설계안 실행용 복사
- 가격/재고 원본 값 표시
- raw API response 표시 또는 저장
- Token/Auth/Signature/Authorization 값 표시
- 상품 수정 API 호출 / 가격/재고 변경
- DB write / upsert / update

## 수정 파일

### 신규

- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-approval-packet-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-approval-packet-view.test.ts`
- `docs/sku-keyword-final-approval-execution-naver-read-only-execution-approval-packet-screen-flow-result.md`

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

Task 296 완료. Task 297 실행 승인 검토를 진행하려면 사용자의 별도 명시 승인이 필요합니다.
