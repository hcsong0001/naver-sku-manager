# Task 389 - 운영 배포 최종 승인 제출 Explicit Approval Request Packet Review

## 목적

Task 388의 `Explicit Approval Request Packet`을 기반으로,
명시 승인 요청 패킷이 실제 승인 요청 또는 실제 제출로 오해되지 않도록 read-only 검토 화면을 추가한다.

이번 Task는 실제 승인 요청 생성, 실제 승인 요청 제출, 실제 승인 수락, 실제 사전 승인, 실제 최종 승인 제출이 아니다.

## 입력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView`

## 출력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView`

## Task 388 → Task 389 상태 매핑

- `EXPLICIT_APPROVAL_REQUEST_PACKET_READY` → `EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY`
- `EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY` → `EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY`
- `EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED` → `EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED`
- `EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED` → `EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 14개 Explicit Approval Request Packet Review 그룹

1. `EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READINESS`
2. `EXPLICIT_APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW`
3. `EXPLICIT_APPROVAL_PHRASE_GUIDANCE_REVIEW`
4. `EXPLICIT_APPROVAL_PHRASE_NON_ACCEPTANCE_REVIEW`
5. `APPROVAL_REQUEST_CREATION_NON_EXECUTION_REVIEW`
6. `APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_REVIEW`
7. `FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_REVIEW`
8. `FINAL_APPROVAL_GRANT_NON_EXECUTION_REVIEW`
9. `DEPLOYMENT_APPROVAL_NON_EXECUTION_REVIEW`
10. `DEPLOYMENT_EXECUTION_NON_EXECUTION_REVIEW`
11. `OPERATING_TRANSITION_NON_EXECUTION_REVIEW`
12. `INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_REVIEW`
13. `OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_REVIEW`
14. `API_SECRET_UI_ACTION_POST_NON_EXECUTION_REVIEW`

모든 그룹은 Task 388 Packet을 read-only로 참조하며, 실제 사용자 승인 요청 제출이나 실제 실행으로 해석되지 않도록 표시한다.

## 명시 승인 문구 검토는 read-only

- `explicitApprovalPhraseRequired: true`
- `explicitApprovalPhraseAccepted: false`
- `actualExplicitApprovalPhraseInputAdded: false`
- `actualExplicitApprovalPhraseSubmitted: false`
- `actualExplicitApprovalGranted: false`

검토 화면에서는 승인 문구가 이후 별도 승인 단계에서만 사용된다는 점만 표시한다.
입력창, 승인 버튼, 제출 버튼, form submit, POST API는 추가하지 않는다.

## 승인 문구 입력/제출/수락 없음

- 이번 화면에서 승인 문구 입력 없음
- 이번 화면에서 승인 문구 제출 없음
- 이번 화면에서 승인 수락 없음
- 이번 화면에서 approval accepted를 true로 만들지 않음

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 388 ViewModel을 입력으로 Task 389 ViewModel 생성
  - GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView` 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 389 타입 필드 추가
  - Task 388 바로 아래, Task 332 바로 위에 Task 389 패널 추가
  - 명시 승인 문구는 검토 안내만 표시

## 실제 승인 요청 생성/제출 없음

- 실제 승인 요청 생성 없음
- 실제 승인 요청 제출 없음
- 실제 명시 승인 요청 생성 없음
- 실제 명시 승인 요청 제출 없음
- 실제 명시 승인 수락 없음

## Packet Review가 실제 승인/제출이 아님

- 현재 화면은 read-only Packet Review 표시 전용이다.
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

- Task 389 신규 테스트 추가
- 인접 Task 388 / 387 / 386 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 390 방향

- `Task 390 - 운영 배포 최종 승인 제출 Explicit Approval Request Packet Review 결과 인증 화면`
