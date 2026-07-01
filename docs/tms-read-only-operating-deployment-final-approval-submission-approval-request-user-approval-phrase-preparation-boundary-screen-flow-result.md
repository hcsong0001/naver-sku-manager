# Task 395 - 운영 배포 최종 승인 제출 User Approval Phrase Preparation Boundary 화면

## 목적

Task 394의 `Explicit Approval Request Submission Lock Outcome Certification` 결과를 기반으로,
실제 승인 문구 입력 단계로 넘어가기 전 사용자 승인 문구 준비 경계가 유지되는지 read-only로 표시하는 화면을 추가한다.

이번 Task는 실제 승인 문구 입력, 실제 승인 문구 제출, 실제 사용자 승인 수락, 실제 명시 승인 요청 생성/제출, 실제 최종 승인 제출이 아니다.

## 집 PC 작업 기준

- 작업 경로: `C:\Users\Z390TAICHI\Documents\erp\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 3b5ffcdc77089904950232adc2ee31fb63b4d002`
- 워킹 트리: clean
- 정리 방식: 기존 untracked 파일은 repo 밖 백업 폴더로 이동 후 작업

## 입력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView`

## 출력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView`

## Task 394 → Task 395 상태 매핑

- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY`
  → `USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY`
  → `USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED`
  → `USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED`
- `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED`
  → `USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 14개 User Approval Phrase Preparation Boundary 그룹

1. `USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READINESS`
2. `SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PREPARATION_BOUNDARY`
3. `USER_APPROVAL_PHRASE_REQUIRED_PREPARATION_BOUNDARY`
4. `USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_PREPARATION_BOUNDARY`
5. `USER_APPROVAL_PHRASE_NON_INPUT_PREPARATION_BOUNDARY`
6. `USER_APPROVAL_PHRASE_NON_SUBMISSION_PREPARATION_BOUNDARY`
7. `USER_APPROVAL_ACCEPTANCE_NON_GRANT_PREPARATION_BOUNDARY`
8. `EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_PREPARATION_BOUNDARY`
9. `EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY`
10. `FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY`
11. `FINAL_APPROVAL_GRANT_NON_EXECUTION_PREPARATION_BOUNDARY`
12. `DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_PREPARATION_BOUNDARY`
13. `OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PREPARATION_BOUNDARY`
14. `API_SECRET_UI_ACTION_POST_PREPARATION_BOUNDARY`

모든 그룹은 Task 394 결과를 read-only로 참조하며, 실제 승인 문구 입력/제출 또는 실제 승인 요청 생성/제출로 해석되지 않도록 고정한다.

## 승인 문구 준비 경계는 read-only

- `explicitApprovalPhraseRequired: true`
- `explicitApprovalPhraseAccepted: false`
- `actualUserApprovalPhraseInputAdded: false`
- `actualUserApprovalPhraseSubmitted: false`
- `actualUserApprovalPhraseAccepted: false`
- `actualExplicitApprovalPhraseInputAdded: false`
- `actualExplicitApprovalPhraseSubmitted: false`
- `actualExplicitApprovalGranted: false`
- `actualExplicitApprovalRequestCreated: false`
- `actualExplicitApprovalRequestSubmitted: false`

권장 승인 문구 예시는 아래 값으로 read-only 안내만 제공한다.

- `TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.`

이번 화면은 사용자 승인 문구 준비 경계 화면이다.
승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면에는 입력창과 제출 버튼과 POST API가 없다.

## 승인 문구 입력/제출/수락 없음

- 이번 화면에서 승인 문구 입력 없음
- 이번 화면에서 승인 문구 제출 없음
- 이번 화면에서 승인 문구 수락 없음
- 이번 화면에서 사용자 승인 수락 없음
- 이번 화면에서 approval accepted를 true로 만들지 않음

## 명시 승인 요청 생성/제출 없음

- 이번 화면에서 명시 승인 요청 생성 없음
- 이번 화면에서 명시 승인 요청 제출 없음
- 실제 승인 요청 생성 없음
- 실제 승인 요청 제출 없음

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 394 ViewModel을 입력으로 Task 395 ViewModel 생성
  - GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 395 타입 필드 추가
  - Task 394 바로 아래, Task 332 바로 위에 Task 395 패널 추가
  - 상태, 결정값, 14개 그룹 요약, 승인 문구 예시 read-only 안내, 안전 모드를 표시

## 실제 승인 요청 생성/제출 없음

- 실제 사용자 승인 문구 입력/제출 없음
- 실제 명시 승인 요청 생성/제출 없음
- 실제 승인 요청 생성/제출 없음
- 실제 최종 승인 제출/부여 없음

## User Approval Phrase Preparation Boundary는 실제 승인/제출이 아님

- 현재 화면은 read-only 사용자 승인 문구 준비 경계 전용이다.
- 승인 문구 예시를 보여주더라도 실제 승인 또는 제출은 발생하지 않는다.
- 다음 단계는 별도 사용자 승인이 필요하다.

## 실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 없음

- 실제 Naver API 호출 없음
- 실제 상품 조회/수정 API 호출 없음
- 실제 Token 재발급 없음
- 실제 가격/재고 변경 없음
- 실제 DB write 없음
- 실제 운영 DB 연결 변경 없음
- `.env` / `.env.local` 열람 또는 수정 없음
- 실제 Worker / Queue / Adapter / Runtime 구성 없음
- 실제 VPS / 도메인 / DNS / SSL 작업 없음
- 실행 버튼 / 승인 버튼 / 승인 문구 입력창 / submit action / POST API 추가 없음

## 검증 결과

- Task 395 신규 테스트 추가
- 인접 Task 394 / 393 / 392 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 396 방향

- `Task 396 - 운영 배포 최종 승인 제출 User Approval Phrase Preparation Boundary 결과 인증 화면`
