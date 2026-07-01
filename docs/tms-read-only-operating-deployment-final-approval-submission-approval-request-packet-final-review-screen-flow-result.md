# Task 374 - 운영 배포 최종 승인 제출 Approval Request Packet Final Review 화면

## 목적

Task 373의 Approval Request Packet Seal 결과 인증 이후, 실제 최종 승인 요청 제출 전에 Approval Request Packet 전체 상태를 마지막으로 read-only 검토하는 Final Review 화면을 제공합니다.

이 화면은 실제 승인 요청 생성, 승인 요청 제출, 최종 승인 제출, 배포 실행이 아닙니다. 오직 read-only Approval Request Packet Final Review 표시만 수행합니다.

## 입력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView (Task 373)
```

## 출력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView (Task 374)
```

빌더 함수:
```
buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView
```

## Task 373 → Task 374 상태 매핑

상태 매핑은 `Record<...>` 방식으로 exhaustive하게 구현되어 있습니다.

| Task 373 상태 | Task 374 상태 |
|---|---|
| APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY |
| APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY |
| APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED |
| APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED |

전체 상태값 (Task 374):
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED`

## 14개 Approval Request Packet Final Review 그룹

| # | 그룹 카테고리 |
|---|---|
| 1 | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READINESS |
| 2 | APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_FINAL_REVIEW |
| 3 | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_FINAL_REVIEW |
| 4 | FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_FINAL_REVIEW |
| 5 | FINAL_APPROVAL_GRANT_REQUEST_SCOPE_FINAL_REVIEW |
| 6 | DEPLOYMENT_APPROVAL_REQUEST_SCOPE_FINAL_REVIEW |
| 7 | DEPLOYMENT_EXECUTION_REQUEST_SCOPE_FINAL_REVIEW |
| 8 | OPERATING_TRANSITION_REQUEST_SCOPE_FINAL_REVIEW |
| 9 | INFRASTRUCTURE_REQUEST_BOUNDARY_FINAL_REVIEW |
| 10 | DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_FINAL_REVIEW |
| 11 | OPERATING_DB_REQUEST_BOUNDARY_FINAL_REVIEW |
| 12 | RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_FINAL_REVIEW |
| 13 | API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_FINAL_REVIEW |
| 14 | UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_FINAL_REVIEW |

## 추천값

| 필드 | 값 |
|---|---|
| recommendedFinalReviewDecision | FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY |
| recommendedFinalReviewDecisionLabel | 최종 승인 제출 Approval Request Packet Final Review - read-only 최종 검토 전용 |
| recommendedNextStep | OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION |
| recommendedApprovalMode | SEPARATE_USER_APPROVAL_REQUIRED |
| recommendedExecutionMode | EXECUTION_STILL_BLOCKED |
| recommendedDeploymentMode | APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY |
| recommendedSafetyMode | SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL |

## route/page 연결

### route.ts
- 파일: `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- Task 373 ViewModel을 입력으로 Task 374 ViewModel 생성
- GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView` 필드 추가
- POST API 추가 없음, DB write 없음

### page.tsx
- 파일: `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
- Task 374 타입 필드 추가: `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView?: any`
- Task 374 read-only 패널 추가 (violet 테마)
- 패널 위치: Task 373 바로 아래, Task 332 바로 위
- 실행 버튼, 제출 버튼, 승인 버튼 없음
- form submit/action 없음, POST 호출 없음

## 실제 승인 요청 생성/제출이 없다는 점

이 Task는 다음을 수행하지 않습니다:
- 실제 승인 요청 생성
- 실제 승인 요청 검토 제출
- 실제 승인 요청 제출
- 실제 최종 승인 제출
- 실제 최종 승인 부여

## Final Review가 실제 제출로 해석되지 않는다는 점

- `finalReviewNotInterpretedAsSubmission: true`
- `approvalRequestStillNotCreated: true`
- `finalReviewStillNotSubmitted: true`
- `finalApprovalSubmissionStillNotPerformed: true`

## 실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST가 없다는 점

모든 안전 플래그가 `false`로 고정:

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

- Task 374 테스트: 17개 pass (fail 0)
- Task 373 테스트: 17개 pass (fail 0)
- Task 372 테스트: 17개 pass (fail 0)
- Task 371 테스트: 17개 pass (fail 0)
- tsc --noEmit: 통과
- npm run build: 통과
- prisma validate: 통과
- prisma generate: 통과
- git diff --check: 통과

## 다음 Task 375 방향

```
Task 375 - 운영 배포 최종 승인 제출 Approval Request Packet Final Review 결과 인증 화면
```

Task 374 완료 후 다음 단계는 Approval Request Packet Final Review 결과 인증 화면 구현입니다.
Task 375 진행은 사용자 별도 명시 승인이 필요합니다.
