# Task 344 - TMS Read-Only Operating DB Backup Rollback Plan Review Screen Flow

## 개요

이 문서는 Task 344의 운영 DB / 백업 / 롤백 계획 검토 화면 흐름 구현 결과를 기록합니다.

이 Task는 실제 운영 DB 연결 변경, DB write, DB 백업 실행, DB 복구 실행, rollback 실행이 아니라,
운영 배포 전 운영 DB 분리·백업·복구·롤백 절차를 화면에서 read-only로 검토하는 단계입니다.

## 검토 항목

- 운영 DB 분리 계획
- 운영 DB 연결 / DATABASE_URL 처리 계획
- DB 백업 계획
- DB 복구 계획
- 코드 롤백 계획
- 배포 실패 복구 계획
- 실제 실행 전 승인 필요 항목

## 상태값

| Task 343 상태 | Task 344 상태 |
|---|---|
| TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY | TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY |
| TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY | TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY |
| TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED | TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED |
| TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED | TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED |

## 권장 모드 값

- recommendedOperatingDbMode: OPERATING_DB_SEPARATE_REVIEW_REQUIRED
- recommendedDatabaseUrlHandlingMode: DATABASE_URL_CHANGE_PENDING_APPROVAL
- recommendedDbBackupMode: DB_BACKUP_PLAN_REQUIRED
- recommendedDbRestoreMode: DB_RESTORE_PLAN_REQUIRED
- recommendedCodeRollbackMode: GIT_ROLLBACK_PLAN_REQUIRED
- recommendedDeploymentFailureRecoveryMode: DEPLOYMENT_FAILURE_RECOVERY_PLAN_REQUIRED
- recommendedEnvSecretHandlingMode: ENV_SECRET_REVIEW_REQUIRED_WITHOUT_EXPOSURE

## 안전 플래그

| 플래그 | 값 |
|---|---|
| isReadOnlyOperatingDbBackupRollbackPlanReview | true |
| requiresSeparateTask345Approval | true |
| operatingDbBackupRollbackPlanReviewStarted | true |
| operatingDbBackupRollbackPlanStillReadOnly | true |
| operatingDbConnectionStillReadOnly | true |
| databaseUrlChangeStillBlocked | true |
| dbBackupStillReadOnly | true |
| dbRestoreStillReadOnly | true |
| rollbackStillReadOnly | true |
| migrationStillBlocked | true |
| deploymentPreparationStillReadOnly | true |
| domainConnectionStillReadOnly | true |
| apiCallStillBlocked | true |
| dbWriteStillBlocked | true |
| workerQueueAdapterStillBlocked | true |
| tokenOrAuthStillHidden | true |
| rawApiResponseStillHidden | true |
| operatingDbConnectionChanged | false |
| databaseUrlChanged | false |
| envFileReadOrModified | false |
| dbWritePerformed | false |
| dbBackupExecuted | false |
| dbRestoreExecuted | false |
| rollbackExecuted | false |
| migrationExecuted | false |
| actualDomainConnected | false |
| dnsChanged | false |
| sslCertificateIssued | false |
| httpsEnabled | false |
| actualVpsServerCreated | false |
| actualDeploymentStarted | false |
| runtimeConfigured | false |
| workerStarted | false |
| queueEnqueued | false |
| adapterConnected | false |
| naverApiCalled | false |
| productLookupApiRecalled | false |
| productUpdateApiCalled | false |
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

- src/services/tms-read-only-operating-db-backup-rollback-plan-review-view.service.ts (신규)
- src/services/tms-read-only-operating-db-backup-rollback-plan-review-view.test.ts (신규)
- docs/tms-read-only-operating-db-backup-rollback-plan-review-screen-flow-result.md (신규)
- app/api/sku-matching/draft-batch/[jobId]/route.ts (수정)
- app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx (수정)

## 절대 금지선 준수

- 실제 운영 DB 연결 변경 없음
- DATABASE_URL 변경 없음
- .env / .env.local 열람 또는 수정 없음
- DB write / upsert / update 없음
- DB backup 실행 없음
- DB restore 실행 없음
- rollback 실행 없음
- migration 실행 없음
- Naver API 호출 없음
- 실행 버튼 추가 없음
- POST API 추가 없음
- submit action 추가 없음

## 다음 Task

Task 345 - TMS Read-Only Runtime / Worker / Queue / Adapter 운영 연결 계획 검토 화면
(사용자 별도 명시 승인 후에만 진행)
