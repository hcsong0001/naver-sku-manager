# Task 394 - 운영 배포 최종 승인 제출 Explicit Approval Request Submission Lock 결과 인증

## 목적

Task 393의 `Explicit Approval Request Submission Lock Review` 결과를 기반으로,
명시 승인 요청 제출 Lock 결과가 인증 가능한 상태인지 read-only로 확정 표시하는 결과 인증 화면을 추가한다.

이번 Task는 실제 명시 승인 요청 생성, 실제 명시 승인 요청 제출, 실제 승인 수락, 실제 사전 승인, 실제 최종 승인 제출이 아니다.

## 입력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView`

## 출력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView`

## Task 393 → Task 394 상태 매핑

- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY` → `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY` → `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED` → `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED` → `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 14개 Explicit Approval Request Submission Lock Outcome Certification 그룹

1. `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS`
2. `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION`
3. `EXPLICIT_APPROVAL_PHRASE_NON_INPUT_LOCK_OUTCOME_CERTIFICATION`
4. `EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_OUTCOME_CERTIFICATION`
5. `EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_OUTCOME_CERTIFICATION`
6. `EXPLICIT_APPROVAL_REQUEST_CREATION_LOCK_OUTCOME_CERTIFICATION`
7. `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION`
8. `APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION`
9. `APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION`
10. `FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION`
11. `FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION`
12. `DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_OUTCOME_CERTIFICATION`
13. `OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_OUTCOME_CERTIFICATION`
14. `API_SECRET_UI_ACTION_POST_LOCK_OUTCOME_CERTIFICATION`

모든 그룹은 Task 393 결과를 read-only로 인증하며, 실제 명시 승인 요청 제출로 해석되지 않도록 표시한다.

## 명시 승인 요청 제출 Lock 결과 인증은 read-only

- `explicitApprovalPhraseRequired: true`
- `explicitApprovalPhraseAccepted: false`
- `actualExplicitApprovalPhraseInputAdded: false`
- `actualExplicitApprovalPhraseSubmitted: false`
- `actualExplicitApprovalGranted: false`
- `actualExplicitApprovalRequestCreated: false`
- `actualExplicitApprovalRequestSubmitted: false`
- `actualExplicitApprovalRequestSubmissionBoundarySubmitted: false`
- `actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false`
- `actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false`
- `actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false`

이번 화면은 명시 승인 요청 제출 Lock 결과 인증 화면이다.
승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면에는 입력창과 POST API가 없다.

## 승인 문구 입력/제출/수락 없음

- 이번 화면에서 승인 문구 입력 없음
- 이번 화면에서 승인 문구 제출 없음
- 이번 화면에서 승인 수락 없음
- 이번 화면에서 approval accepted를 true로 만들지 않음

## 명시 승인 요청 생성/제출 없음

- 이번 화면에서 명시 승인 요청 생성 없음
- 이번 화면에서 명시 승인 요청 제출 없음
- 실제 승인 요청 생성 없음
- 실제 승인 요청 제출 없음

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 393 ViewModel을 입력으로 Task 394 ViewModel 생성
  - GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView` 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 394 타입 필드 추가
  - Task 393 바로 아래, Task 332 바로 위에 Task 394 패널 추가
  - Lock 결과 인증 상태, 명시 승인 문구 비입력/비제출 상태, 명시 승인 요청 비생성/비제출 상태를 표시

## Submission Lock 결과 인증이 실제 승인/제출이 아님

- 현재 화면은 read-only Submission Lock 결과 인증 전용이다.
- 승인 문구 안내를 보여주더라도 실제 승인 또는 제출은 발생하지 않는다.
- 다음 단계는 별도 사용자 승인 후 진행한다.

## 실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 없음

- 실제 Naver API 호출 없음
- 실제 상품 조회/수정 API 호출 없음
- 실제 Token 재발급 없음
- 실제 DB write 없음
- 실제 운영 DB 연결 변경 없음
- `.env` / `.env.local` 열람 또는 수정 없음
- 실제 Worker / Queue / Adapter / Runtime 구성 없음
- 실제 VPS / 도메인 / DNS / SSL 작업 없음
- 실행 버튼 / 승인 버튼 / submit action / POST API 추가 없음

## 검증 결과

- Task 394 신규 테스트 추가
- 인접 Task 393 / 392 / 391 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 395 방향

- `Task 395 - 운영 배포 최종 승인 제출 User Approval Phrase Preparation Boundary 화면`
