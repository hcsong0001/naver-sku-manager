# Task 371 - 운영 배포 최종 승인 제출 Approval Request Packet Review 결과 인증 화면

## 목적

Task 370의 Approval Request Packet Review 결과를 기반으로, 실제 최종 승인 요청 제출 전에 요청 패킷 검토 결과가 인증 가능한 상태인지 read-only로 확정 표시하는 결과 인증 화면을 제공합니다.

이 화면은 실제 승인 요청 생성, 승인 요청 제출, 최종 승인 제출, 배포 실행이 아닙니다. 오직 read-only Outcome Certification 표시만 수행합니다.

## 입력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView (Task 370)
```

## 출력 ViewModel

```
TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView (Task 371)
```

빌더 함수:
```
buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView
```

## Task 370 → Task 371 상태 매핑

상태 매핑은 `Record<...>` 방식으로 exhaustive하게 구현되어 있습니다.

| Task 370 상태 | Task 371 상태 |
|---|---|
| APPROVAL_REQUEST_PACKET_REVIEW_READY | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY |
| APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY |
| APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED |
| APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED |

전체 상태값 (Task 371):
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED`
- `TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED`

## 14개 Approval Request Packet Review Outcome Certification 그룹

| # | 그룹 카테고리 |
|---|---|
| 1 | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_READINESS |
| 2 | APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW_OUTCOME_CERTIFICATION |
| 3 | FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_REVIEW_OUTCOME_CERTIFICATION |
| 4 | FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION |
| 5 | FINAL_APPROVAL_GRANT_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION |
| 6 | DEPLOYMENT_APPROVAL_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION |
| 7 | DEPLOYMENT_EXECUTION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION |
| 8 | OPERATING_TRANSITION_REQUEST_SCOPE_REVIEW_OUTCOME_CERTIFICATION |
| 9 | INFRASTRUCTURE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |
| 10 | DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |
| 11 | OPERATING_DB_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |
| 12 | RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |
| 13 | API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |
| 14 | UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_REVIEW_OUTCOME_CERTIFICATION |

## 추천값

| 필드 | 값 |
|---|---|
| recommendedOutcomeCertificationDecision | FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY |
| recommendedOutcomeCertificationDecisionLabel | 최종 승인 제출 Approval Request Packet Review 결과 인증 - read-only 인증 전용 |
| recommendedNextStep | OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW |
| recommendedApprovalMode | SEPARATE_USER_APPROVAL_REQUIRED |
| recommendedExecutionMode | EXECUTION_STILL_BLOCKED |
| recommendedDeploymentMode | APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY |
| recommendedSafetyMode | SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL |

## route/page 연결

### route.ts
- 파일: `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- Task 370 ViewModel을 입력으로 Task 371 ViewModel 생성
- GET 응답에 `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView` 필드 추가
- POST API 추가 없음, DB write 없음

### page.tsx
- 파일: `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
- Task 371 타입 필드 추가: `tmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView?: any`
- Task 371 read-only 패널 추가
- 패널 위치: Task 370 바로 아래, Task 332 바로 위
- 실행 버튼, 제출 버튼, 승인 버튼 없음
- form submit/action 없음, POST 호출 없음

## 실제 승인 요청 생성/제출이 없다는 점

이 Task는 다음을 수행하지 않습니다:
- 실제 승인 요청 생성
- 실제 승인 요청 검토 제출
- 실제 승인 요청 제출
- 실제 최종 승인 제출
- 실제 최종 승인 부여

## Review 결과 인증이 실제 제출로 해석되지 않는다는 점

- `reviewOutcomeCertificationNotInterpretedAsSubmission: true`
- `approvalRequestStillNotCreated: true`
- `approvalRequestReviewOutcomeCertificationStillNotSubmitted: true`
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

- Task 371 테스트: 17개 pass (fail 0)
- Task 370 테스트: 17개 pass (fail 0)
- Task 369 테스트: 17개 pass (fail 0)
- Task 368 테스트: 18개 pass (fail 0)
- tsc --noEmit: 통과
- npm run build: 통과
- prisma validate: 통과
- prisma generate: 통과
- git diff --check: 통과

## 다음 Task 372 방향

```
Task 372 - 운영 배포 최종 승인 제출 Approval Request Packet Seal Review 화면
```

Task 371 완료 후 다음 단계는 Approval Request Packet Seal Review 화면 구현입니다.
Task 372 진행은 사용자 별도 명시 승인이 필요합니다.
