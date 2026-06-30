import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView,
  NEXT_TASK_346_APPROVAL_PHRASE,
} from './tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service';
import type { TmsReadOnlyOperatingDbBackupRollbackPlanReviewView } from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import { NEXT_TASK_345_APPROVAL_PHRASE } from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';

function makeTask344View(
  operatingDbBackupRollbackPlanReviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView['operatingDbBackupRollbackPlanReviewStatus'],
): TmsReadOnlyOperatingDbBackupRollbackPlanReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_VIEW',
    taskId: 344,
    taskName: 'TMS Read-Only Operating DB Backup Rollback Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 DB / 백업 / 롤백 계획 검토',
    description: '이 패널은 운영 DB / 백업 / 롤백 계획을 read-only로 검토하는 화면입니다.',
    currentTaskNumber: 344,
    referenceTaskNumbers: [343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceDomainDnsHttpsConnectionPlanReviewStatus: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    operatingDbBackupRollbackPlanReviewStatus,
    operatingDbBackupRollbackPlanReviewReady:
      operatingDbBackupRollbackPlanReviewStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    operatingDbBackupRollbackPlanReviewPartialReady:
      operatingDbBackupRollbackPlanReviewStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY',
    operatingDbBackupRollbackPlanReviewBlocked:
      operatingDbBackupRollbackPlanReviewStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED',
    operatingDbBackupRollbackPlanReviewNotStarted:
      operatingDbBackupRollbackPlanReviewStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED',
    operatingDbBackupRollbackPlanReviewStarted: true,
    operatingDbBackupRollbackPlanStillReadOnly: true,
    operatingDbSeparationPlanItems: [],
    operatingDbConnectionPlanItems: [],
    dbBackupPlanItems: [],
    dbRestorePlanItems: [],
    codeRollbackPlanItems: [],
    deploymentFailureRecoveryPlanItems: [],
    dbApprovalRequirementItems: [],
    operatingDbBackupRollbackSummaryCards: [],
    recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED',
    recommendedDatabaseUrlHandlingMode: 'DATABASE_URL_CHANGE_PENDING_APPROVAL',
    recommendedDbBackupMode: 'DB_BACKUP_PLAN_REQUIRED',
    recommendedDbRestoreMode: 'DB_RESTORE_PLAN_REQUIRED',
    recommendedCodeRollbackMode: 'GIT_ROLLBACK_PLAN_REQUIRED',
    recommendedDeploymentFailureRecoveryMode: 'DEPLOYMENT_FAILURE_RECOVERY_PLAN_REQUIRED',
    recommendedEnvSecretHandlingMode: 'ENV_SECRET_REVIEW_REQUIRED_WITHOUT_EXPOSURE',
    operatingDbSeparationPlanItemCount: 0,
    operatingDbConnectionPlanItemCount: 0,
    dbBackupPlanItemCount: 0,
    dbRestorePlanItemCount: 0,
    codeRollbackPlanItemCount: 0,
    deploymentFailureRecoveryPlanItemCount: 0,
    dbApprovalRequirementItemCount: 0,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    dbBackupStillReadOnly: true,
    dbRestoreStillReadOnly: true,
    rollbackStillReadOnly: true,
    migrationStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDbBackupRollbackPlanReview: true,
    requiresSeparateTask345Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_345_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    priceChanged: false,
    stockChanged: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
  };
}

describe('buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView', () => {
  it('1. Task 344 READY → Task 345 READY', () => {
    const view = buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView({
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
    });
    assert.equal(
      view.runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    );
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewReady, true);
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewPartialReady, false);
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewBlocked, false);
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewNotStarted, false);
  });

  it('2. PARTIAL_READY → PARTIAL_READY', () => {
    const view = buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView({
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY'),
    });
    assert.equal(
      view.runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    );
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewPartialReady, true);
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewReady, false);
  });

  it('3. BLOCKED → BLOCKED', () => {
    const view = buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView({
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED'),
    });
    assert.equal(
      view.runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED',
    );
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewBlocked, true);
  });

  it('4. NOT_STARTED → NOT_STARTED', () => {
    const view = buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView({
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED'),
    });
    assert.equal(
      view.runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED',
    );
    assert.equal(view.runtimeWorkerQueueAdapterPlanReviewNotStarted, true);
  });

  const baseView = buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView({
    operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
  });

  it('5. runtimeOperatingPlanItems 생성 검증', () => {
    assert.ok(baseView.runtimeOperatingPlanItems.length > 0);
    assert.equal(baseView.runtimeOperatingPlanItemCount, baseView.runtimeOperatingPlanItems.length);
    for (const item of baseView.runtimeOperatingPlanItems) {
      assert.equal(item.category, 'RUNTIME_OPERATING');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('6. workerOperatingPlanItems 생성 검증', () => {
    assert.ok(baseView.workerOperatingPlanItems.length > 0);
    assert.equal(baseView.workerOperatingPlanItemCount, baseView.workerOperatingPlanItems.length);
    for (const item of baseView.workerOperatingPlanItems) {
      assert.equal(item.category, 'WORKER_OPERATING');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('7. queueRedisOperatingPlanItems 생성 검증', () => {
    assert.ok(baseView.queueRedisOperatingPlanItems.length > 0);
    assert.equal(baseView.queueRedisOperatingPlanItemCount, baseView.queueRedisOperatingPlanItems.length);
    for (const item of baseView.queueRedisOperatingPlanItems) {
      assert.equal(item.category, 'QUEUE_REDIS_OPERATING');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('8. adapterOperatingPlanItems 생성 검증', () => {
    assert.ok(baseView.adapterOperatingPlanItems.length > 0);
    assert.equal(baseView.adapterOperatingPlanItemCount, baseView.adapterOperatingPlanItems.length);
    for (const item of baseView.adapterOperatingPlanItems) {
      assert.equal(item.category, 'ADAPTER_OPERATING');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('9. naverApiOperatingCallPlanItems 생성 검증', () => {
    assert.ok(baseView.naverApiOperatingCallPlanItems.length > 0);
    assert.equal(baseView.naverApiOperatingCallPlanItemCount, baseView.naverApiOperatingCallPlanItems.length);
    for (const item of baseView.naverApiOperatingCallPlanItems) {
      assert.equal(item.category, 'NAVER_API_OPERATING_CALL');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('10. runtimeFailureRecoveryPlanItems 생성 검증', () => {
    assert.ok(baseView.runtimeFailureRecoveryPlanItems.length > 0);
    assert.equal(baseView.runtimeFailureRecoveryPlanItemCount, baseView.runtimeFailureRecoveryPlanItems.length);
    for (const item of baseView.runtimeFailureRecoveryPlanItems) {
      assert.equal(item.category, 'FAILURE_RECOVERY');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('11. runtimeApprovalRequirementItems 생성 검증', () => {
    assert.ok(baseView.runtimeApprovalRequirementItems.length > 0);
    assert.equal(baseView.runtimeApprovalRequirementItemCount, baseView.runtimeApprovalRequirementItems.length);
    for (const item of baseView.runtimeApprovalRequirementItems) {
      assert.equal(item.category, 'APPROVAL_REQUIREMENT');
      assert.equal(item.requiresSeparateApproval, true);
    }
  });

  it('12. recommendedRuntimeMode 검증', () => {
    assert.equal(baseView.recommendedRuntimeMode, 'RUNTIME_OPERATING_REVIEW_REQUIRED');
  });

  it('13. recommendedWorkerMode 검증', () => {
    assert.equal(baseView.recommendedWorkerMode, 'WORKER_OPERATING_REVIEW_REQUIRED');
  });

  it('14. recommendedQueueMode 검증', () => {
    assert.equal(baseView.recommendedQueueMode, 'QUEUE_OPERATING_REVIEW_REQUIRED');
  });

  it('15. recommendedRedisMode 검증', () => {
    assert.equal(baseView.recommendedRedisMode, 'REDIS_OPERATING_CONNECTION_REVIEW_REQUIRED');
  });

  it('16. recommendedAdapterMode 검증', () => {
    assert.equal(baseView.recommendedAdapterMode, 'ADAPTER_OPERATING_REVIEW_REQUIRED');
  });

  it('17. recommendedNaverApiOperatingMode 검증', () => {
    assert.equal(baseView.recommendedNaverApiOperatingMode, 'NAVER_API_OPERATING_CALL_PENDING_APPROVAL');
  });

  it('18. recommendedFailureRecoveryMode 검증', () => {
    assert.equal(baseView.recommendedFailureRecoveryMode, 'RUNTIME_WORKER_QUEUE_ADAPTER_FAILURE_RECOVERY_PLAN_REQUIRED');
  });

  it('19. runtimeWorkerQueueAdapterPlanReviewStarted true', () => {
    assert.equal(baseView.runtimeWorkerQueueAdapterPlanReviewStarted, true);
  });

  it('20. runtimeWorkerQueueAdapterPlanStillReadOnly true', () => {
    assert.equal(baseView.runtimeWorkerQueueAdapterPlanStillReadOnly, true);
  });

  it('21. runtimeConfigured false', () => {
    assert.equal(baseView.runtimeConfigured, false);
  });

  it('22. workerStarted false', () => {
    assert.equal(baseView.workerStarted, false);
  });

  it('23. queueEnqueued false', () => {
    assert.equal(baseView.queueEnqueued, false);
  });

  it('24. redisOperatingConnectionChanged false', () => {
    assert.equal(baseView.redisOperatingConnectionChanged, false);
  });

  it('25. adapterConnected false', () => {
    assert.equal(baseView.adapterConnected, false);
  });

  it('26. naverApiCalled false', () => {
    assert.equal(baseView.naverApiCalled, false);
  });

  it('27. productLookupApiRecalled false', () => {
    assert.equal(baseView.productLookupApiRecalled, false);
  });

  it('28. productUpdateApiCalled false', () => {
    assert.equal(baseView.productUpdateApiCalled, false);
  });

  it('29. operatingDbConnectionChanged false', () => {
    assert.equal(baseView.operatingDbConnectionChanged, false);
  });

  it('30. databaseUrlChanged false', () => {
    assert.equal(baseView.databaseUrlChanged, false);
  });

  it('31. envFileReadOrModified false', () => {
    assert.equal(baseView.envFileReadOrModified, false);
  });

  it('32. dbWritePerformed false', () => {
    assert.equal(baseView.dbWritePerformed, false);
  });

  it('33. actualDomainConnected false', () => {
    assert.equal(baseView.actualDomainConnected, false);
  });

  it('34. dnsChanged false', () => {
    assert.equal(baseView.dnsChanged, false);
  });

  it('35. sslCertificateIssued false', () => {
    assert.equal(baseView.sslCertificateIssued, false);
  });

  it('36. httpsEnabled false', () => {
    assert.equal(baseView.httpsEnabled, false);
  });

  it('37. actualVpsServerCreated false', () => {
    assert.equal(baseView.actualVpsServerCreated, false);
  });

  it('38. actualVpsConfigChanged false', () => {
    assert.equal(baseView.actualVpsConfigChanged, false);
  });

  it('39. actualDeploymentStarted false', () => {
    assert.equal(baseView.actualDeploymentStarted, false);
  });

  it('40. runtimeConfigurationStillReadOnly true', () => {
    assert.equal(baseView.runtimeConfigurationStillReadOnly, true);
  });

  it('41. workerExecutionStillBlocked true', () => {
    assert.equal(baseView.workerExecutionStillBlocked, true);
  });

  it('42. queueEnqueueStillBlocked true', () => {
    assert.equal(baseView.queueEnqueueStillBlocked, true);
  });

  it('43. redisConnectionStillReadOnly true', () => {
    assert.equal(baseView.redisConnectionStillReadOnly, true);
  });

  it('44. adapterConnectionStillBlocked true', () => {
    assert.equal(baseView.adapterConnectionStillBlocked, true);
  });

  it('45. naverApiCallStillBlocked true', () => {
    assert.equal(baseView.naverApiCallStillBlocked, true);
  });

  it('46. operatingDbConnectionStillReadOnly true', () => {
    assert.equal(baseView.operatingDbConnectionStillReadOnly, true);
  });

  it('47. databaseUrlChangeStillBlocked true', () => {
    assert.equal(baseView.databaseUrlChangeStillBlocked, true);
  });

  it('48. apiCallStillBlocked true', () => {
    assert.equal(baseView.apiCallStillBlocked, true);
  });

  it('49. dbWriteStillBlocked true', () => {
    assert.equal(baseView.dbWriteStillBlocked, true);
  });

  it('50. workerQueueAdapterStillBlocked true', () => {
    assert.equal(baseView.workerQueueAdapterStillBlocked, true);
  });

  it('51. tokenOrAuthStillHidden true', () => {
    assert.equal(baseView.tokenOrAuthStillHidden, true);
  });

  it('52. rawApiResponseStillHidden true', () => {
    assert.equal(baseView.rawApiResponseStillHidden, true);
  });

  it('53. actual final/execution flags false', () => {
    assert.equal(baseView.actualFinalExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionStarted, false);
  });

  it('54. 실행 버튼 추가 false', () => {
    assert.equal(baseView.executionButtonAdded, false);
  });

  it('55. POST / submit action false', () => {
    assert.equal(baseView.submitActionAdded, false);
    assert.equal(baseView.postApiAdded, false);
  });

  it('56. 가격/재고 변경 false', () => {
    assert.equal(baseView.priceChanged, false);
    assert.equal(baseView.stockChanged, false);
  });

  it('57. Token/Auth/Signature/Authorization 비노출 false', () => {
    assert.equal(baseView.tokenOrAuthValueExposed, false);
  });

  it('58. raw API response 비표시/비저장 유지', () => {
    assert.equal(baseView.rawApiResponseExposedOrStored, false);
  });

  it('59. Task 346 승인 문구 포함', () => {
    assert.equal(baseView.nextTaskApprovalPhrase, NEXT_TASK_346_APPROVAL_PHRASE);
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Task 346'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Runtime'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Worker'));
    assert.equal(baseView.requiresSeparateTask346Approval, true);
  });

  it('taskId 및 status 필드 검증', () => {
    assert.equal(baseView.taskId, 345);
    assert.equal(baseView.status, 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_VIEW');
    assert.equal(baseView.currentTaskNumber, 345);
    assert.equal(baseView.isBatchJobResultDisplayOnly, true);
    assert.equal(baseView.isReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReview, true);
  });

  it('summaryCards 생성 검증', () => {
    assert.ok(baseView.runtimeWorkerQueueAdapterSummaryCards.length > 0);
  });
});
