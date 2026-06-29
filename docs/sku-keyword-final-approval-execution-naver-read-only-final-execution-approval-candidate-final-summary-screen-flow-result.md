# Task 315 - Naver Read-Only Final Execution Approval Candidate Final Summary Screen Flow

## 구현 목적

Task 310~314에서 생성한 후보 목록, 상세 검토, 결과 인증, Safety Audit Seal, Seal 결과 인증 ViewModel을 재사용해 후보 최종 요약 패널을 read-only로 표시합니다.

이 화면은 실제 승인, 실제 실행, 상품 변경 승인이 아닙니다.

## 상태 판정 규칙

- `BLOCKED` 계열이 하나라도 있으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED`
- `EMPTY` 계열이 하나라도 있으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY`
- `PARTIAL_READY` 계열이 하나라도 있고 `BLOCKED`가 없으면 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY`
- 그 외에는 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY`

## 요약 대상 Task

- Task 310 - Candidate List
- Task 311 - Candidate Detail Review
- Task 312 - Candidate Detail Review Outcome Certification
- Task 313 - Candidate Detail Review Safety Audit Seal
- Task 314 - Candidate Detail Review Safety Audit Seal Outcome Certification

## 화면 표시 요소

- 전체 후보 최종 요약 상태 배지
- Task 310~314 흐름 요약 카드
- READY / PARTIAL / BLOCKED / EMPTY / LOCKED 카운트
- read-only 완료 여부
- safeDisplayFields / excludedFields 유지 여부
- 실행 / mutation / API 호출 잠금 유지 여부
- Task 316 별도 승인 안내 문구

## 안전 경계

다음 플래그는 항상 고정됩니다.

- `candidateFlowStillDisplayOnly: true`
- `safeDisplayFieldsStillCertified: true`
- `excludedFieldsStillCertified: true`
- `executionStillLocked: true`
- `mutationStillBlocked: true`
- `apiCallStillBlocked: true`
- `isReadOnlyCandidateFinalSummary: true`
- `requiresSeparateTask316Approval: true`

다음 동작은 모두 수행하지 않습니다.

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

Task 316은 사용자 별도 명시 승인 후에만 진행합니다.
