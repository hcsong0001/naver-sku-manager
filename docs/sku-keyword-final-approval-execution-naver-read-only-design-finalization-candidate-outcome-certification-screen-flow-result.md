# Task 295 - Naver Read-Only Design Finalization Candidate Outcome Certification Screen Flow Result

## 개요

Task 295는 Task 293 read-only 설계 확정 후보 표시 결과와 Task 294 안전 감사 봉인을 바탕으로
다음 read-only 실행 승인 패킷 후보 여부를 인증하는 단계입니다.

## 핵심 상태

- status: `NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_READY`
- currentTaskNumber: 295
- referenceTaskNumbers: [294, 293, 292, 291, 290, 289, 276]

## Outcome Certification 판정 규칙

| 입력 (candidateStatus) | 출력 (outcomeCertificationStatus) |
|---|---|
| FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT | CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT |
| FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE | CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE |
| FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP | CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP |
| FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN | CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN |
| FINALIZATION_CANDIDATE_BLOCKED_BY_ENV | CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV |
| FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL | CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL |
| FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP | CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP |

## 다음 단계 진입 조건

- COMPLETE → isReadyForNextReadOnlyExecutionApprovalPacket: true
- PARTIAL → isReadyForNextReadOnlyExecutionApprovalPacket: true (missing field notice 유지)
- BLOCKED → isNextReadOnlyExecutionApprovalPacketBlocked: true

## 이번 Task에서 수행하지 않은 항목

- Token 재발급 / Naver API 호출 / 상품 조회 API 재호출
- 설계 확정 / 실행 승인 / 상품 변경 승인
- 설계안 DB 저장 / 실행용 복사
- 옵션/추가상품 구조 임의 추정
- 가격/재고 원본 값 표시
- raw API response 표시 또는 저장
- Token/Auth/Signature/Authorization 값 표시
- 상품 수정 API 호출 / 가격/재고 변경
- DB write / upsert / update

## 수정 파일

### 신규

- `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-outcome-certification-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-outcome-certification-view.test.ts`
- `docs/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-outcome-certification-screen-flow-result.md`

### 수정

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`

## 테스트 결과

- 총 20개 테스트 통과
- TypeScript 컴파일 오류 없음
- Next.js 빌드 성공
- Prisma validate 통과
- git diff --check 통과 (오류 없음)

## 다음 단계

Task 295 완료. 다음 단계는 별도 승인이 필요합니다.
