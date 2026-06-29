# Task 319 - Naver Read-Only Final Execution Approval Candidate Flow Closure Summary Screen Flow

## 구현 목적

Task 310~318 후보 목록, 상세 검토, 인증, 안전 봉인 흐름을 read-only로 닫고 다음 배포/도메인 준비 전 상태를 요약하는 Closure Summary 패널을 추가합니다.

이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아니며, 아직 배포 실행이나 도메인 연결 작업도 시작하지 않습니다.

## 상태 판정 규칙

- `BLOCKED` 계열이 하나라도 있으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED`
- `EMPTY` 계열이 하나라도 있으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY`
- `PARTIAL_READY` 계열이 하나라도 있고 `BLOCKED`가 없으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY`
- 그 외에는 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY`

## Closure 대상 Task

- Task 310 Candidate List
- Task 311 Candidate Detail Review
- Task 312 Candidate Detail Review Outcome Certification
- Task 313 Candidate Detail Review Safety Audit Seal
- Task 314 Candidate Detail Review Safety Audit Seal Outcome Certification
- Task 315 Candidate Final Summary
- Task 316 Candidate Final Summary Outcome Certification
- Task 317 Candidate Final Summary Safety Audit Seal
- Task 318 Candidate Final Summary Safety Audit Seal Outcome Certification

## 화면 표시 요소

- 전체 Closure 상태 배지
- READY / PARTIAL / BLOCKED / EMPTY / LOCKED 요약 카드
- 9개 후보 흐름 종료 상태 테이블
- read-only 종료 여부
- 배포/도메인 준비 미시작 상태
- safeDisplayFields / excludedFields 유지 여부
- 실행 / mutation / API / DB / Worker / Queue / Adapter 차단 유지 여부
- Task 320 별도 승인 안내 문구

## 안전 경계

다음 플래그는 항상 고정됩니다.

- `candidateFlowReadOnlyClosed: true`
- `candidateFlowStillDisplayOnly: true`
- `candidateFlowSafeForDeploymentPreparation: true`
- `deploymentPreparationNotStarted: true`
- `domainConnectionNotStarted: true`
- `safeDisplayFieldsStillCertified: true`
- `excludedFieldsStillCertified: true`
- `executionStillLocked: true`
- `mutationStillBlocked: true`
- `apiCallStillBlocked: true`
- `dbWriteStillBlocked: true`
- `workerQueueAdapterStillBlocked: true`
- `isReadOnlyCandidateFlowClosureSummary: true`
- `requiresSeparateTask320Approval: true`

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
- 실제 배포 실행
- 실제 도메인 연결
- Token/Auth/Signature/Authorization 값 출력
- raw API response 표시 또는 저장
- `.env` / `.env.local` 열람 또는 수정

## 다음 단계

Task 320은 사용자 별도 명시 승인 후에만 진행합니다.
