# Task 345 - TMS Read-Only Runtime Worker Queue Adapter Operating Connection Plan Review Screen Flow

## 개요

이 문서는 Task 345의 Runtime / Worker / Queue / Adapter 운영 연결 계획 검토 화면 흐름 구현 결과를 기록합니다.

이 Task는 실제 Runtime 구성, Worker 실행, Queue enqueue, Redis 운영 연결, Adapter 연결, Naver API 호출이 아니라,
운영 배포 전 Next.js Runtime, Worker, Queue, Adapter 운영 연결 계획을 화면에서 read-only로 검토하는 단계입니다.

## 검토 항목

- Next.js 운영 Runtime 구성 계획
- Worker 운영 실행 계획
- Queue / Redis 운영 연결 계획
- Adapter 운영 연결 계획
- Naver API 운영 호출 계획
- 장애 / 복구 계획
- 실제 실행 전 승인 필요 항목

## 상태값

| Task 344 상태 | Task 345 상태 |
|---|---|
| TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY | TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY |
| TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY | TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY |
| TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED | TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED |
| TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED | TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED |

## 권장 모드 값

- recommendedRuntimeMode: RUNTIME_OPERATING_REVIEW_REQUIRED
- recommendedWorkerMode: WORKER_OPERATING_REVIEW_REQUIRED
- recommendedQueueMode: QUEUE_OPERATING_REVIEW_REQUIRED
- recommendedRedisMode: REDIS_OPERATING_CONNECTION_REVIEW_REQUIRED
- recommendedAdapterMode: ADAPTER_OPERATING_REVIEW_REQUIRED
- recommendedNaverApiOperatingMode: NAVER_API_OPERATING_CALL_PENDING_APPROVAL
- recommendedFailureRecoveryMode: RUNTIME_WORKER_QUEUE_ADAPTER_FAILURE_RECOVERY_PLAN_REQUIRED

## 안전 플래그

| 플래그 | 값 |
|---|---|
| isReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReview | true |
| requiresSeparateTask346Approval | true |
| runtimeWorkerQueueAdapterPlanReviewStarted | true |
| runtimeWorkerQueueAdapterPlanStillReadOnly | true |
| runtimeConfigurationStillReadOnly | true |
| workerExecutionStillBlocked | true |
| queueEnqueueStillBlocked | true |
| redisConnectionStillReadOnly | true |
| adapterConnectionStillBlocked | true |
| naverApiCallStillBlocked | true |
| operatingDbConnectionStillReadOnly | true |
| databaseUrlChangeStillBlocked | true |
| deploymentPreparationStillReadOnly | true |
| domainConnectionStillReadOnly | true |
| apiCallStillBlocked | true |
| dbWriteStillBlocked | true |
| workerQueueAdapterStillBlocked | true |
| tokenOrAuthStillHidden | true |
| rawApiResponseStillHidden | true |
| runtimeConfigured | false |
| workerStarted | false |
| queueEnqueued | false |
| redisOperatingConnectionChanged | false |
| adapterConnected | false |
| naverApiCalled | false |
| productLookupApiRecalled | false |
| productUpdateApiCalled | false |
| operatingDbConnectionChanged | false |
| databaseUrlChanged | false |
| envFileReadOrModified | false |
| dbWritePerformed | false |
| actualDomainConnected | false |
| dnsChanged | false |
| sslCertificateIssued | false |
| httpsEnabled | false |
| actualVpsServerCreated | false |
| actualDeploymentStarted | false |
| actualFinalExecutionApprovalGranted | false |
| actualExecutionApprovalGranted | false |
| actualExecutionStarted | false |
| executionButtonAdded | false |
| submitActionAdded | false |
| postApiAdded | false |
| priceChanged | false |
| stockChanged | false |
| tokenOrAuthValueExposed | false |
| rawApiResponseExposedOrStored | false |

## 신규 / 수정 파일

- src/services/tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service.ts (신규)
- src/services/tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.test.ts (신규)
- docs/tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-screen-flow-result.md (신규)
- app/api/sku-matching/draft-batch/[jobId]/route.ts (수정)
- app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx (수정)

## 절대 금지선 준수

- 실제 Runtime 구성 없음
- 실제 Worker 실행 없음
- 실제 Queue enqueue 없음
- 실제 Redis 운영 연결 변경 없음
- 실제 Adapter 연결 없음
- 실제 Naver API 호출 없음
- 실행 버튼 추가 없음
- POST API 추가 없음
- submit action 추가 없음

## 다음 Task

Task 346 - TMS Read-Only 운영 배포 실행 전 최종 Readiness 검토 화면
(사용자 별도 명시 승인 후에만 진행)
