# Task 382 - 운영 배포 최종 승인 제출 Approval Request Final Submission Lock Review 화면

## 목적

Task 381의 Approval Request Final Submission Boundary 결과 인증 이후,
실제 최종 승인 요청 제출 전에 최종 제출 Lock이 유지되는지 read-only로 검토하는 화면입니다.

이 화면은 실제 승인 요청 생성, 실제 승인 요청 제출, 실제 최종 승인 제출, 실제 배포 실행이 아닙니다.
오직 read-only Final Submission Lock Review 표시만 수행합니다.

## 입력 ViewModel

```ts
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView
```

## 출력 ViewModel

```ts
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView
```

빌더 함수:

```ts
buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView
```

## Task 381 → Task 382 상태 매핑

상태 매핑은 `Record<...>` 방식으로 exhaustive하게 구현되어 있습니다.

| Task 381 상태 | Task 382 상태 |
|---|---|
| FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY | FINAL_SUBMISSION_LOCK_REVIEW_READY |
| FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY | FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY |
| FINAL_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED | FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED |
| FINAL_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED | FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED |

전체 상태값 (Task 382):

- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED`

## 14개 Final Submission Lock Review 그룹

1. `FINAL_SUBMISSION_LOCK_REVIEW_READINESS`
2. `FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW`
3. `APPROVAL_REQUEST_CREATION_FINAL_LOCK_REVIEW`
4. `APPROVAL_REQUEST_REVIEW_SUBMISSION_FINAL_LOCK_REVIEW`
5. `APPROVAL_REQUEST_SUBMISSION_FINAL_LOCK_REVIEW`
6. `FINAL_APPROVAL_SUBMISSION_FINAL_LOCK_REVIEW`
7. `FINAL_APPROVAL_GRANT_FINAL_LOCK_REVIEW`
8. `DEPLOYMENT_APPROVAL_FINAL_LOCK_REVIEW`
9. `DEPLOYMENT_EXECUTION_FINAL_LOCK_REVIEW`
10. `OPERATING_TRANSITION_FINAL_LOCK_REVIEW`
11. `INFRASTRUCTURE_DOMAIN_DNS_HTTPS_FINAL_LOCK_REVIEW`
12. `OPERATING_DB_FINAL_LOCK_REVIEW`
13. `RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_LOCK_REVIEW`
14. `API_SECRET_UI_ACTION_POST_FINAL_LOCK_REVIEW`

## 추천값

| 필드 | 값 |
|---|---|
| recommendedFinalSubmissionLockReviewDecision | `FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_ONLY` |
| recommendedFinalSubmissionLockReviewDecisionLabel | `최종 승인 제출 Approval Request Final Submission Lock Review - read-only 최종 제출 Lock 검토 전용` |
| recommendedNextStep | `OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION` |
| recommendedApprovalMode | `SEPARATE_USER_APPROVAL_REQUIRED` |
| recommendedExecutionMode | `EXECUTION_STILL_BLOCKED` |
| recommendedDeploymentMode | `FINAL_SUBMISSION_LOCK_REVIEW_ONLY` |
| recommendedSafetyMode | `SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL` |

## route/page 연결 내용

### route.ts

- 파일: `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- Task 381 ViewModel을 입력으로 Task 382 ViewModel 생성
- GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView` 필드 추가
- POST API 추가 없음
- DB write 없음

### page.tsx

- 파일: `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
- Task 382 타입 필드 추가
- Task 382 read-only 패널 추가
- 패널 위치: Task 381 바로 아래, Task 332 바로 위
- 실행 버튼, 제출 버튼, 승인 버튼 없음
- form submit/action 없음
- POST 호출 없음

## 실제 승인 요청 생성/제출이 없다는 점

아래 작업은 모두 수행하지 않습니다.

- 실제 승인 요청 생성
- 실제 승인 요청 검토 제출
- 실제 승인 요청 제출
- 실제 Submission Readiness Review 제출
- 실제 Submission Readiness Outcome Certification 제출
- 실제 Submission Lock Review 제출
- 실제 Submission Lock Outcome Certification 제출
- 실제 Final Submission Boundary Review 제출
- 실제 Final Submission Boundary Outcome Certification 제출
- 실제 Final Submission Lock Review 제출
- 실제 최종 승인 제출
- 실제 최종 승인 부여

## Final Submission Lock Review가 실제 제출로 해석되지 않는다는 점

- `actualApprovalRequestCreated: false`
- `actualApprovalRequestReviewedAsSubmission: false`
- `actualApprovalRequestSubmitted: false`
- `actualFinalSubmissionLockReviewSubmitted: false`
- `actualFinalApprovalSubmission: false`

## 실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST가 없다는 점

모든 안전 플래그가 `false`로 고정되어 있습니다.

- 실제 Naver API 호출 없음
- 실제 상품 조회 API 재호출 없음
- 실제 상품 수정 API 호출 없음
- 실제 Token 재발급 없음
- 실제 가격 변경 없음
- 실제 재고 변경 없음
- 실제 DB write 없음
- 실제 운영 DB 연결 변경 없음
- 실제 `.env / .env.local` 열람/수정 없음
- 실제 Secret 노출 없음
- 실제 raw API response 노출/저장 없음
- 실제 Worker 실행 없음
- 실제 Queue enqueue 없음
- 실제 Adapter 연결 없음
- 실제 Runtime 구성 없음
- 실제 배포 승인 없음
- 실제 배포 실행 없음
- 실제 운영 전환 없음
- 실제 VPS 생성 없음
- 실제 도메인 연결 없음
- 실제 DNS 변경 없음
- 실제 SSL 인증서 발급 없음
- 실행 버튼 추가 없음
- submit action 추가 없음
- POST API 추가 없음

## 검증 결과

- Task 382 테스트 통과
- Task 381 테스트 통과
- Task 380 테스트 통과
- Task 379 테스트 통과
- `npx.cmd tsc --noEmit` 통과
- `npm.cmd run build` 통과
- `npx.cmd prisma validate` 통과
- `npx.cmd prisma generate` 통과
- `git diff --check` 통과

## 다음 Task 383 방향

```ts
Task 383 - 운영 배포 최종 승인 제출 Approval Request Final Submission Lock 결과 인증 화면
```
