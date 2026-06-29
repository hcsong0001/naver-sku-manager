# Task 317 - Naver Read-Only Final Execution Approval Candidate Final Summary Safety Audit Seal Screen Flow

## 구현 목적

Task 316 후보 최종 요약 결과 인증 이후에도 안전 조건이 그대로 유지되는지를 read-only로 봉인하는 Safety Audit Seal 패널을 추가합니다.

이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.

## 상태 매핑 규칙

Task 316 `candidateFinalSummaryOutcomeCertificationStatus`를 아래처럼 1:1로 매핑합니다.

- `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY`
  → `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY`
- `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY`
  → `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY`
- `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED`
  → `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED`
- `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY`
  → `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY`

누락 상태가 있으면 TypeScript 단계에서 실패하도록 exhaustive `switch`로 구현합니다.

## 봉인 대상 흐름

Task 316의 `outcomeCertificationItems`를 그대로 재사용합니다.

- Task 310 Candidate List
- Task 311 Candidate Detail Review
- Task 312 Candidate Detail Review Outcome Certification
- Task 313 Candidate Detail Review Safety Audit Seal
- Task 314 Candidate Detail Review Safety Audit Seal Outcome Certification

## 화면 표시 요소

- 전체 Safety Audit Seal 상태 배지
- READY / PARTIAL / BLOCKED / EMPTY / LOCKED 봉인 카드
- 봉인 대상 흐름 테이블
- read-only 완료 상태 유지 여부
- safeDisplayFields / excludedFields 유지 여부
- 실행 / mutation / API 호출 잠금 유지 여부
- Task 318 별도 승인 안내 문구

## 안전 경계

다음 플래그는 항상 고정됩니다.

- `candidateReadOnlyFlowStillCompleted: true`
- `candidateFlowStillDisplayOnly: true`
- `safeDisplayFieldsStillCertified: true`
- `excludedFieldsStillCertified: true`
- `executionStillLocked: true`
- `mutationStillBlocked: true`
- `apiCallStillBlocked: true`
- `isReadOnlyCandidateFinalSummarySafetyAuditSeal: true`
- `requiresSeparateTask318Approval: true`

이번 Task에서도 아래 동작은 수행하지 않습니다.

- 실제 최종 실행 승인
- 실제 실행 승인
- 실제 실행
- 실행 버튼 / submit / POST API 추가
- Naver API 호출
- 상품 조회 API 재호출
- 상품 수정 API 호출
- 가격 / 재고 변경
- DB write / upsert / update
- Worker 실행 / Queue enqueue / Adapter 연결
- Token/Auth/Signature/Authorization 값 출력
- raw API response 표시 또는 저장
- `.env` / `.env.local` 열람 또는 수정

## 다음 단계

Task 318은 사용자 별도 명시 승인 후에만 진행합니다.
