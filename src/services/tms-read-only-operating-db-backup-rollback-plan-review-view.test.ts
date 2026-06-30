import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView,
  NEXT_TASK_345_APPROVAL_PHRASE,
} from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import type { TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView } from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import { NEXT_TASK_344_APPROVAL_PHRASE } from './tms-read-only-domain-dns-https-connection-plan-review-view.service';

function makeTask343View(
  domainDnsHttpsConnectionPlanReviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView['domainDnsHttpsConnectionPlanReviewStatus'],
): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView {
  return {
    status: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_VIEW',
    taskId: 343,
    taskName: 'TMS Read-Only Domain DNS HTTPS Connection Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 도메인 / DNS / HTTPS 연결 계획 검토',
    description: '이 패널은 도메인/DNS/HTTPS 연결 계획을 read-only로 검토하는 화면입니다.',
    currentTaskNumber: 343,
    referenceTaskNumbers: [342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    domainDnsHttpsConnectionPlanReviewStatus,
    domainDnsHttpsConnectionPlanReviewReady:
      domainDnsHttpsConnectionPlanReviewStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    domainDnsHttpsConnectionPlanReviewPartialReady:
      domainDnsHttpsConnectionPlanReviewStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    domainDnsHttpsConnectionPlanReviewBlocked:
      domainDnsHttpsConnectionPlanReviewStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED',
    domainDnsHttpsConnectionPlanReviewNotStarted:
      domainDnsHttpsConnectionPlanReviewStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED',
    domainDnsHttpsPlanReviewStarted: true,
    domainDnsHttpsPlanStillReadOnly: true,
    domainConnectionPlanItems: [],
    dnsRecordPlanItems: [],
    httpsSslPlanItems: [],
    domainPreconditionItems: [],
    domainRiskReviewItems: [],
    domainApprovalRequirementItems: [],
    domainDnsHttpsPlanSummaryCards: [],
    recommendedDomainConnectionMode: 'DOMAIN_CONNECTION_REVIEW_REQUIRED',
    recommendedDnsRecordMode: 'DNS_RECORD_REVIEW_REQUIRED',
    recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED',
    recommendedSslCertificateMode: 'SSL_CERTIFICATE_ISSUE_PENDING_APPROVAL',
    recommendedDomainProviderActionMode: 'DOMAIN_PROVIDER_ACTION_PENDING_APPROVAL',
    recommendedVpsIngressMode: 'VPS_INGRESS_REVIEW_REQUIRED',
    recommendedConnectionValidationMode: 'CONNECTION_VALIDATION_PLAN_REQUIRED',
    domainConnectionPlanItemCount: 0,
    dnsRecordPlanItemCount: 0,
    httpsSslPlanItemCount: 0,
    domainPreconditionItemCount: 0,
    domainRiskReviewItemCount: 0,
    domainApprovalRequirementItemCount: 0,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    operatingDbConnectionChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    dbWritePerformed: false,
    envFileReadOrModified: false,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyDomainDnsHttpsConnectionPlanReview: true,
    requiresSeparateTask344Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_344_APPROVAL_PHRASE,
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

describe('buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView', () => {
  it('1. Task 343 READY → Task 344 READY', () => {
    const view = buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView({
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
    });
    assert.equal(view.operatingDbBackupRollbackPlanReviewStatus, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY');
    assert.equal(view.operatingDbBackupRollbackPlanReviewReady, true);
    assert.equal(view.operatingDbBackupRollbackPlanReviewPartialReady, false);
    assert.equal(view.operatingDbBackupRollbackPlanReviewBlocked, false);
    assert.equal(view.operatingDbBackupRollbackPlanReviewNotStarted, false);
  });

  it('2. PARTIAL_READY → PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView({
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY'),
    });
    assert.equal(view.operatingDbBackupRollbackPlanReviewStatus, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY');
    assert.equal(view.operatingDbBackupRollbackPlanReviewPartialReady, true);
    assert.equal(view.operatingDbBackupRollbackPlanReviewReady, false);
  });

  it('3. BLOCKED → BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView({
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED'),
    });
    assert.equal(view.operatingDbBackupRollbackPlanReviewStatus, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED');
    assert.equal(view.operatingDbBackupRollbackPlanReviewBlocked, true);
  });

  it('4. NOT_STARTED → NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView({
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
    });
    assert.equal(view.operatingDbBackupRollbackPlanReviewStatus, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED');
    assert.equal(view.operatingDbBackupRollbackPlanReviewNotStarted, true);
  });

  const baseView = buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView({
    domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
  });

  it('5. operatingDbSeparationPlanItems 생성 검증', () => {
    assert.ok(baseView.operatingDbSeparationPlanItems.length > 0);
    assert.equal(baseView.operatingDbSeparationPlanItemCount, baseView.operatingDbSeparationPlanItems.length);
    for (const item of baseView.operatingDbSeparationPlanItems) {
      assert.equal(item.category, 'OPERATING_DB_SEPARATION');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('6. operatingDbConnectionPlanItems 생성 검증', () => {
    assert.ok(baseView.operatingDbConnectionPlanItems.length > 0);
    assert.equal(baseView.operatingDbConnectionPlanItemCount, baseView.operatingDbConnectionPlanItems.length);
    for (const item of baseView.operatingDbConnectionPlanItems) {
      assert.equal(item.category, 'OPERATING_DB_CONNECTION');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('7. dbBackupPlanItems 생성 검증', () => {
    assert.ok(baseView.dbBackupPlanItems.length > 0);
    assert.equal(baseView.dbBackupPlanItemCount, baseView.dbBackupPlanItems.length);
    for (const item of baseView.dbBackupPlanItems) {
      assert.equal(item.category, 'DB_BACKUP');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('8. dbRestorePlanItems 생성 검증', () => {
    assert.ok(baseView.dbRestorePlanItems.length > 0);
    assert.equal(baseView.dbRestorePlanItemCount, baseView.dbRestorePlanItems.length);
    for (const item of baseView.dbRestorePlanItems) {
      assert.equal(item.category, 'DB_RESTORE');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('9. codeRollbackPlanItems 생성 검증', () => {
    assert.ok(baseView.codeRollbackPlanItems.length > 0);
    assert.equal(baseView.codeRollbackPlanItemCount, baseView.codeRollbackPlanItems.length);
    for (const item of baseView.codeRollbackPlanItems) {
      assert.equal(item.category, 'CODE_ROLLBACK');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('10. deploymentFailureRecoveryPlanItems 생성 검증', () => {
    assert.ok(baseView.deploymentFailureRecoveryPlanItems.length > 0);
    assert.equal(baseView.deploymentFailureRecoveryPlanItemCount, baseView.deploymentFailureRecoveryPlanItems.length);
    for (const item of baseView.deploymentFailureRecoveryPlanItems) {
      assert.equal(item.category, 'DEPLOYMENT_FAILURE_RECOVERY');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('11. dbApprovalRequirementItems 생성 검증', () => {
    assert.ok(baseView.dbApprovalRequirementItems.length > 0);
    assert.equal(baseView.dbApprovalRequirementItemCount, baseView.dbApprovalRequirementItems.length);
    for (const item of baseView.dbApprovalRequirementItems) {
      assert.equal(item.category, 'APPROVAL_REQUIREMENT');
      assert.equal(item.requiresSeparateApproval, true);
    }
  });

  it('12. recommendedOperatingDbMode 검증', () => {
    assert.equal(baseView.recommendedOperatingDbMode, 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED');
  });

  it('13. recommendedDatabaseUrlHandlingMode 검증', () => {
    assert.equal(baseView.recommendedDatabaseUrlHandlingMode, 'DATABASE_URL_CHANGE_PENDING_APPROVAL');
  });

  it('14. recommendedDbBackupMode 검증', () => {
    assert.equal(baseView.recommendedDbBackupMode, 'DB_BACKUP_PLAN_REQUIRED');
  });

  it('15. recommendedDbRestoreMode 검증', () => {
    assert.equal(baseView.recommendedDbRestoreMode, 'DB_RESTORE_PLAN_REQUIRED');
  });

  it('16. recommendedCodeRollbackMode 검증', () => {
    assert.equal(baseView.recommendedCodeRollbackMode, 'GIT_ROLLBACK_PLAN_REQUIRED');
  });

  it('17. recommendedDeploymentFailureRecoveryMode 검증', () => {
    assert.equal(baseView.recommendedDeploymentFailureRecoveryMode, 'DEPLOYMENT_FAILURE_RECOVERY_PLAN_REQUIRED');
  });

  it('18. recommendedEnvSecretHandlingMode 검증', () => {
    assert.equal(baseView.recommendedEnvSecretHandlingMode, 'ENV_SECRET_REVIEW_REQUIRED_WITHOUT_EXPOSURE');
  });

  it('19. operatingDbBackupRollbackPlanReviewStarted true', () => {
    assert.equal(baseView.operatingDbBackupRollbackPlanReviewStarted, true);
  });

  it('20. operatingDbBackupRollbackPlanStillReadOnly true', () => {
    assert.equal(baseView.operatingDbBackupRollbackPlanStillReadOnly, true);
  });

  it('21. operatingDbConnectionChanged false', () => {
    assert.equal(baseView.operatingDbConnectionChanged, false);
  });

  it('22. databaseUrlChanged false', () => {
    assert.equal(baseView.databaseUrlChanged, false);
  });

  it('23. envFileReadOrModified false', () => {
    assert.equal(baseView.envFileReadOrModified, false);
  });

  it('24. dbWritePerformed false', () => {
    assert.equal(baseView.dbWritePerformed, false);
  });

  it('25. dbBackupExecuted false', () => {
    assert.equal(baseView.dbBackupExecuted, false);
  });

  it('26. dbRestoreExecuted false', () => {
    assert.equal(baseView.dbRestoreExecuted, false);
  });

  it('27. rollbackExecuted false', () => {
    assert.equal(baseView.rollbackExecuted, false);
  });

  it('28. migrationExecuted false', () => {
    assert.equal(baseView.migrationExecuted, false);
  });

  it('29. actualDomainConnected false', () => {
    assert.equal(baseView.actualDomainConnected, false);
  });

  it('30. dnsChanged false', () => {
    assert.equal(baseView.dnsChanged, false);
  });

  it('31. sslCertificateIssued false', () => {
    assert.equal(baseView.sslCertificateIssued, false);
  });

  it('32. httpsEnabled false', () => {
    assert.equal(baseView.httpsEnabled, false);
  });

  it('33. actualVpsServerCreated false', () => {
    assert.equal(baseView.actualVpsServerCreated, false);
  });

  it('34. actualVpsConfigChanged false', () => {
    assert.equal(baseView.actualVpsConfigChanged, false);
  });

  it('35. actualDeploymentStarted false', () => {
    assert.equal(baseView.actualDeploymentStarted, false);
  });

  it('36. runtimeConfigured false', () => {
    assert.equal(baseView.runtimeConfigured, false);
  });

  it('37. workerStarted false', () => {
    assert.equal(baseView.workerStarted, false);
  });

  it('38. queueEnqueued false', () => {
    assert.equal(baseView.queueEnqueued, false);
  });

  it('39. adapterConnected false', () => {
    assert.equal(baseView.adapterConnected, false);
  });

  it('40. Naver API 호출 false', () => {
    assert.equal(baseView.naverApiCalled, false);
  });

  it('41. 상품 조회 API 재호출 false', () => {
    assert.equal(baseView.productLookupApiRecalled, false);
  });

  it('42. 상품 수정 API 호출 false', () => {
    assert.equal(baseView.productUpdateApiCalled, false);
  });

  it('43. operatingDbConnectionStillReadOnly true', () => {
    assert.equal(baseView.operatingDbConnectionStillReadOnly, true);
  });

  it('44. databaseUrlChangeStillBlocked true', () => {
    assert.equal(baseView.databaseUrlChangeStillBlocked, true);
  });

  it('45. dbBackupStillReadOnly true', () => {
    assert.equal(baseView.dbBackupStillReadOnly, true);
  });

  it('46. dbRestoreStillReadOnly true', () => {
    assert.equal(baseView.dbRestoreStillReadOnly, true);
  });

  it('47. rollbackStillReadOnly true', () => {
    assert.equal(baseView.rollbackStillReadOnly, true);
  });

  it('48. migrationStillBlocked true', () => {
    assert.equal(baseView.migrationStillBlocked, true);
  });

  it('49. apiCallStillBlocked true', () => {
    assert.equal(baseView.apiCallStillBlocked, true);
  });

  it('50. dbWriteStillBlocked true', () => {
    assert.equal(baseView.dbWriteStillBlocked, true);
  });

  it('51. workerQueueAdapterStillBlocked true', () => {
    assert.equal(baseView.workerQueueAdapterStillBlocked, true);
  });

  it('52. tokenOrAuthStillHidden true', () => {
    assert.equal(baseView.tokenOrAuthStillHidden, true);
  });

  it('53. rawApiResponseStillHidden true', () => {
    assert.equal(baseView.rawApiResponseStillHidden, true);
  });

  it('54. actual final/execution flags false', () => {
    assert.equal(baseView.actualFinalExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionStarted, false);
  });

  it('55. 실행 버튼 추가 false', () => {
    assert.equal(baseView.executionButtonAdded, false);
  });

  it('56. POST / submit action false', () => {
    assert.equal(baseView.submitActionAdded, false);
    assert.equal(baseView.postApiAdded, false);
  });

  it('57. 가격/재고 변경 false', () => {
    assert.equal(baseView.priceChanged, false);
    assert.equal(baseView.stockChanged, false);
  });

  it('58. Token/Auth/Signature/Authorization 비노출 false', () => {
    assert.equal(baseView.tokenOrAuthValueExposed, false);
  });

  it('59. raw API response 비표시/비저장 유지', () => {
    assert.equal(baseView.rawApiResponseExposedOrStored, false);
  });

  it('60. Task 345 승인 문구 포함', () => {
    assert.equal(baseView.nextTaskApprovalPhrase, NEXT_TASK_345_APPROVAL_PHRASE);
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Task 345'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Runtime'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Worker'));
    assert.equal(baseView.requiresSeparateTask345Approval, true);
  });

  it('taskId 및 status 필드 검증', () => {
    assert.equal(baseView.taskId, 344);
    assert.equal(baseView.status, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_VIEW');
    assert.equal(baseView.currentTaskNumber, 344);
    assert.equal(baseView.isBatchJobResultDisplayOnly, true);
    assert.equal(baseView.isReadOnlyOperatingDbBackupRollbackPlanReview, true);
  });

  it('summaryCards 생성 검증', () => {
    assert.ok(baseView.operatingDbBackupRollbackSummaryCards.length > 0);
  });
});
