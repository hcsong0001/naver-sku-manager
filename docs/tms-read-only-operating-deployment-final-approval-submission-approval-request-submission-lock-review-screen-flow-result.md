# Task 378 - 운영 배포 최종 승인 제출 Approval Request Submission Lock Review 화면

## 목적

Task 377의 Approval Request Submission Readiness 결과 인증 이후, 실제 최종 승인 요청 제출 전에 승인 요청 제출 Lock이 유지되는지 read-only로 검토하는 Lock Review 화면을 제공합니다.

이 화면은 실제 승인 요청 생성, 승인 요청 제출, 최종 승인 제출, 배포 실행이 아닙니다. 오직 read-only Approval Request Submission Lock Review 표시만 수행합니다.

## 입력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView (Task 377)
```

## 출력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView (Task 378)
```

빌더 함수:
```
buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView
```

## Task 377 → Task 378 상태 매핑

상태 매핑은 `Record<...>` 방식으로 exhaustive하게 구현되어 있습니다.

| Task 377 상태 | Task 378 상태 |
|---|---|
| SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY | SUBMISSION_LOCK_REVIEW_READY |
| SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY | SUBMISSION_LOCK_REVIEW_PARTIAL_READY |
| SUBMISSION_READINESS_OUTCOME_BLOCKED | SUBMISSION_LOCK_REVIEW_BLOCKED |
| SUBMISSION_READINESS_OUTCOME_NOT_STARTED | SUBMISSION_LOCK_REVIEW_NOT_STARTED |

전체 상태값 (Task 378):
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED`

## 14개 Submission Lock Review 그룹

| # | 그룹 카테고리 |
|---|---|
| 1 | APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS |
| 2 | APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_LOCK_REVIEW |
| 3 | APPROVAL_REQUEST_CREATION_LOCK_REVIEW |
| 4 | APPROVAL_REQUEST_REVIEW_SUBMISSION_LOCK_REVIEW |
| 5 | APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW |
| 6 | FINAL_APPROVAL_SUBMISSION_LOCK_REVIEW |
| 7 | FINAL_APPROVAL_GRANT_LOCK_REVIEW |
| 8 | DEPLOYMENT_APPROVAL_LOCK_REVIEW |
| 9 | DEPLOYMENT_EXECUTION_LOCK_REVIEW |
| 10 | OPERATING_TRANSITION_LOCK_REVIEW |
| 11 | INFRASTRUCTURE_DOMAIN_DNS_HTTPS_LOCK_REVIEW |
| 12 | OPERATING_DB_LOCK_REVIEW |
| 13 | RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW |
| 14 | API_SECRET_UI_ACTION_POST_LOCK_REVIEW |

## 추천값

| 필드 | 값 |
|---|---|
| recommendedSubmissionLockReviewDecision | FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY |
| recommendedSubmissionLockReviewDecisionLabel | 최종 승인 제출 Approval Request Submission Lock Review - read-only 제출 Lock 검토 전용 |
| recommendedNextStep | OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION |
| recommendedApprovalMode | SEPARATE_USER_APPROVAL_REQUIRED |
| recommendedExecutionMode | EXECUTION_STILL_BLOCKED |
| recommendedDeploymentMode | APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY |
| recommendedSafetyMode | SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL |

## route/page 연결

### route.ts
- 파일: `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- Task 377 ViewModel을 입력으로 Task 378 ViewModel 생성
- GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView` 필드 추가
- POST API 추가 없음, DB write 없음

### page.tsx
- 파일: `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
- Task 378 타입 필드 추가: `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView?: any`
- Task 378 read-only 패널 추가 (cyan 테마)
- 패널 위치: Task 377 바로 아래, Task 332 바로 위
- 실행 버튼, 제출 버튼, 승인 버튼 없음
- form submit/action 없음, POST 호출 없음

## 신규 안전 플래그

Task 378에서 추가된 신규 플래그:
- `actualSubmissionLockReviewSubmitted: false` — Submission Lock Review가 실제로 제출되지 않았음을 명시

## 실제 승인 요청 생성/제출이 없다는 점

이 Task는 다음을 수행하지 않습니다:
- 실제 승인 요청 생성
- 실제 승인 요청 검토 제출
- 실제 승인 요청 제출
- 실제 최종 승인 제출
- 실제 최종 승인 부여

## Submission Lock Review가 실제 제출로 해석되지 않는다는 점

- `submissionLockReviewNotInterpretedAsSubmission: true`
- `approvalRequestStillNotCreated: true`
- `submissionLockReviewStillNotSubmitted: true`
- `finalApprovalSubmissionStillNotPerformed: true`

## 실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST가 없다는 점

모든 안전 플래그가 `false`로 고정 (33개 — Task 378에서 `actualSubmissionLockReviewSubmitted` 신규 추가):

| 플래그 | 값 |
|---|---|
| actualNaverApiCall | false |
| actualProductLookupApiCall | false |
| actualProductUpdateApiCall | false |
| actualTokenReissue | false |
| actualPriceChange | false |
| actualStockChange | false |
| actualDbWrite | false |
| actualOperatingDbConnectionChange | false |
| actualEnvReadOrWrite | false |
| actualSecretExposure | false |
| actualRawApiResponseExposure | false |
| actualWorkerRun | false |
| actualQueueEnqueue | false |
| actualAdapterConnection | false |
| actualRuntimeConfiguration | false |
| actualApprovalRequestCreated | false |
| actualApprovalRequestReviewedAsSubmission | false |
| actualApprovalRequestSubmitted | false |
| actualSubmissionReadinessReviewSubmitted | false |
| actualSubmissionReadinessOutcomeCertificationSubmitted | false |
| actualSubmissionLockReviewSubmitted | false |
| actualFinalApprovalGrant | false |
| actualFinalApprovalSubmission | false |
| actualDeploymentApproval | false |
| actualDeploymentExecution | false |
| actualOperatingTransition | false |
| actualVpsCreation | false |
| actualDomainConnection | false |
| actualDnsChange | false |
| actualSslCertificateIssue | false |
| actualExecutionButtonAdded | false |
| actualSubmitActionAdded | false |
| actualPostApiAdded | false |

## 검증 결과

- Task 378 테스트: 17개 pass (fail 0)
- Task 377 테스트: 17개 pass (fail 0)
- Task 376 테스트: 17개 pass (fail 0)
- Task 375 테스트: 17개 pass (fail 0)
- tsc --noEmit: 통과
- npm run build: 통과
- prisma validate: 통과
- prisma generate: 통과
- git diff --check: 통과

## 다음 Task 379 방향

```
Task 379 - 운영 배포 최종 승인 제출 Approval Request Submission Lock 결과 인증 화면
```

Task 378 완료 후 다음 단계는 Approval Request Submission Lock 결과 인증 화면 구현입니다.
Task 379 진행은 사용자 별도 명시 승인이 필요합니다.
