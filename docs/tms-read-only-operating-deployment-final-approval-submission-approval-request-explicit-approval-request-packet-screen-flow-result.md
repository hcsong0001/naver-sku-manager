# Task 388 - 운영 배포 최종 승인 제출 Explicit Approval Request Packet

## 목적

Task 387의 `Approval Request Submission Pre-Approval Lock Outcome Certification` 결과를 기반으로,
실제 명시 승인 요청을 생성하거나 제출하지 않고 사용자에게 보여줄 수 있는 read-only Explicit Approval Request Packet 화면을 구성한다.

이번 Task는 실제 승인 요청 생성, 실제 승인 요청 제출, 실제 승인 수락, 실제 사전 승인, 실제 최종 승인 제출이 아니다.

## 입력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView`

## 출력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView`

## Task 387 → Task 388 상태 매핑

- `SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY` → `EXPLICIT_APPROVAL_REQUEST_PACKET_READY`
- `SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY` → `EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY`
- `SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED` → `EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED`
- `SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED` → `EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 14개 Explicit Approval Request Packet 그룹

1. `EXPLICIT_APPROVAL_REQUEST_PACKET_READINESS`
2. `PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PACKET`
3. `APPROVAL_REQUEST_SCOPE_PACKET`
4. `EXPLICIT_USER_APPROVAL_PHRASE_PACKET`
5. `APPROVAL_REQUEST_CREATION_NON_EXECUTION_PACKET`
6. `APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PACKET`
7. `FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PACKET`
8. `FINAL_APPROVAL_GRANT_NON_EXECUTION_PACKET`
9. `DEPLOYMENT_APPROVAL_NON_EXECUTION_PACKET`
10. `DEPLOYMENT_EXECUTION_NON_EXECUTION_PACKET`
11. `OPERATING_TRANSITION_NON_EXECUTION_PACKET`
12. `INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_PACKET`
13. `OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_PACKET`
14. `API_SECRET_UI_ACTION_POST_NON_EXECUTION_PACKET`

모든 그룹은 Task 387 결과를 read-only로 참조하며, 실제 승인 요청 제출이나 실제 실행으로 해석되지 않도록 표시한다.

## 명시 승인 문구 안내

- `explicitApprovalPhraseRequired: true`
- `explicitApprovalPhraseAccepted: false`
- `actualExplicitApprovalPhraseSubmitted: false`
- `actualExplicitApprovalGranted: false`

안내 문구:

> 아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.

승인 문구 예시:

> TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.

이번 Task에서는 입력창, 버튼, submit action, POST API를 추가하지 않는다.

## route/page 연결

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 387 ViewModel을 입력으로 Task 388 ViewModel 생성
  - GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView` 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 388 타입 필드 추가
  - Task 387 바로 아래, Task 332 바로 위에 Task 388 패널 추가
  - 명시 승인 문구는 read-only 안내와 예시만 표시

## 실제 승인 요청 생성/제출 없음

- 실제 승인 요청 생성 없음
- 실제 승인 요청 제출 없음
- 실제 명시 승인 요청 생성 없음
- 실제 명시 승인 요청 제출 없음
- 실제 명시 승인 문구 입력/제출 없음
- 실제 승인 수락 없음

## Explicit Approval Request Packet이 실제 승인/제출이 아님

- 현재 화면은 read-only Packet 표시 전용이다.
- 문구 예시를 보여주더라도 실제 승인 또는 제출은 발생하지 않는다.
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
- 실행 버튼 / submit action / POST API 추가 없음

## 검증 결과

- Task 388 신규 테스트 추가
- 인접 Task 387 / 386 / 385 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 389 방향

- `Task 389 - 운영 배포 최종 승인 제출 Explicit Approval Request Packet Review 화면`
