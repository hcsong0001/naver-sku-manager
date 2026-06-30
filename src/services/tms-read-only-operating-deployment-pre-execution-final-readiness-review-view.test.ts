import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView,
  NEXT_TASK_347_APPROVAL_PHRASE,
} from './tms-read-only-operating-deployment-pre-execution-final-readiness-review-view.service';
import type {
  TmsReadOnlyOperatingDeploymentDesignReviewView,
} from './tms-read-only-operating-deployment-design-review-view.service';
import type {
  TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView,
} from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import type {
  TmsReadOnlyOperatingDbBackupRollbackPlanReviewView,
} from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import type {
  TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView,
} from './tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service';
import { NEXT_TASK_343_APPROVAL_PHRASE } from './tms-read-only-operating-deployment-design-review-view.service';
import { NEXT_TASK_344_APPROVAL_PHRASE } from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import { NEXT_TASK_345_APPROVAL_PHRASE } from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import { NEXT_TASK_346_APPROVAL_PHRASE } from './tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service';

function makeTask342View(
  status: TmsReadOnlyOperatingDeploymentDesignReviewView['operatingDeploymentDesignReviewStatus'],
): TmsReadOnlyOperatingDeploymentDesignReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_VIEW',
    taskId: 342,
    taskName: 'TMS Read-Only Operating Deployment Design Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 설계 검토',
    description: 'Task 342 description',
    currentTaskNumber: 342,
    referenceTaskNumbers: [341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus:
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
    operatingDeploymentDesignReviewStatus: status,
    operatingDeploymentDesignReviewReady: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    operatingDeploymentDesignReviewPartialReady: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY',
    operatingDeploymentDesignReviewBlocked: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED',
    operatingDeploymentDesignReviewNotStarted: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED',
    deploymentDesignReviewStarted: true,
    deploymentDesignStillReadOnly: true,
    vpsOperatingDesignItems: [],
    domainDnsHttpsDesignItems: [],
    operatingDbDesignItems: [],
    backupRollbackDesignItems: [],
    securityAccessDesignItems: [],
    deploymentApprovalRequirementItems: [],
    operatingDeploymentDesignSummaryCards: [],
    recommendedDeploymentTarget: 'VPS',
    recommendedDeploymentTargetLabel: 'VPS 운영 배포 후보',
    recommendedDomainConnectionMode: 'DOMAIN_DNS_REVIEW_REQUIRED',
    recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED',
    recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED',
    recommendedBackupMode: 'DB_AND_CODE_BACKUP_REQUIRED',
    recommendedRollbackMode: 'GIT_AND_DB_ROLLBACK_PLAN_REQUIRED',
    designReviewItemCount: 0,
    vpsDesignItemCount: 0,
    domainDnsHttpsDesignItemCount: 0,
    operatingDbDesignItemCount: 0,
    backupRollbackDesignItemCount: 0,
    securityAccessDesignItemCount: 0,
    approvalRequirementItemCount: 0,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
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
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentDesignReview: true,
    requiresSeparateTask343Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_343_APPROVAL_PHRASE,
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

function makeTask343View(
  status: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView['domainDnsHttpsConnectionPlanReviewStatus'],
): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView {
  return {
    status: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_VIEW',
    taskId: 343,
    taskName: 'TMS Read-Only Domain DNS HTTPS Connection Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 도메인 / DNS / HTTPS 연결 계획 검토',
    description: 'Task 343 description',
    currentTaskNumber: 343,
    referenceTaskNumbers: [342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    domainDnsHttpsConnectionPlanReviewStatus: status,
    domainDnsHttpsConnectionPlanReviewReady: status === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    domainDnsHttpsConnectionPlanReviewPartialReady: status === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    domainDnsHttpsConnectionPlanReviewBlocked: status === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED',
    domainDnsHttpsConnectionPlanReviewNotStarted: status === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED',
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

function makeTask344View(
  status: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView['operatingDbBackupRollbackPlanReviewStatus'],
): TmsReadOnlyOperatingDbBackupRollbackPlanReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_VIEW',
    taskId: 344,
    taskName: 'TMS Read-Only Operating DB Backup Rollback Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 DB / 백업 / 롤백 계획 검토',
    description: 'Task 344 description',
    currentTaskNumber: 344,
    referenceTaskNumbers: [343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceDomainDnsHttpsConnectionPlanReviewStatus: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    operatingDbBackupRollbackPlanReviewStatus: status,
    operatingDbBackupRollbackPlanReviewReady: status === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    operatingDbBackupRollbackPlanReviewPartialReady: status === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY',
    operatingDbBackupRollbackPlanReviewBlocked: status === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED',
    operatingDbBackupRollbackPlanReviewNotStarted: status === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED',
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

function makeTask345View(
  status: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView['runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus'],
): TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView {
  return {
    status: 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_VIEW',
    taskId: 345,
    taskName: 'TMS Read-Only Runtime Worker Queue Adapter Operating Connection Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only Runtime / Worker / Queue / Adapter 운영 연결 계획 검토',
    description: 'Task 345 description',
    currentTaskNumber: 345,
    referenceTaskNumbers: [344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDbBackupRollbackPlanReviewStatus: 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: status,
    runtimeWorkerQueueAdapterPlanReviewReady:
      status === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    runtimeWorkerQueueAdapterPlanReviewPartialReady:
      status === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    runtimeWorkerQueueAdapterPlanReviewBlocked:
      status === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED',
    runtimeWorkerQueueAdapterPlanReviewNotStarted:
      status === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED',
    runtimeWorkerQueueAdapterPlanReviewStarted: true,
    runtimeWorkerQueueAdapterPlanStillReadOnly: true,
    runtimeOperatingPlanItems: [],
    workerOperatingPlanItems: [],
    queueRedisOperatingPlanItems: [],
    adapterOperatingPlanItems: [],
    naverApiOperatingCallPlanItems: [],
    runtimeFailureRecoveryPlanItems: [],
    runtimeApprovalRequirementItems: [],
    runtimeWorkerQueueAdapterSummaryCards: [],
    recommendedRuntimeMode: 'RUNTIME_OPERATING_REVIEW_REQUIRED',
    recommendedWorkerMode: 'WORKER_OPERATING_REVIEW_REQUIRED',
    recommendedQueueMode: 'QUEUE_OPERATING_REVIEW_REQUIRED',
    recommendedRedisMode: 'REDIS_OPERATING_CONNECTION_REVIEW_REQUIRED',
    recommendedAdapterMode: 'ADAPTER_OPERATING_REVIEW_REQUIRED',
    recommendedNaverApiOperatingMode: 'NAVER_API_OPERATING_CALL_PENDING_APPROVAL',
    recommendedFailureRecoveryMode: 'RUNTIME_WORKER_QUEUE_ADAPTER_FAILURE_RECOVERY_PLAN_REQUIRED',
    runtimeOperatingPlanItemCount: 0,
    workerOperatingPlanItemCount: 0,
    queueRedisOperatingPlanItemCount: 0,
    adapterOperatingPlanItemCount: 0,
    naverApiOperatingCallPlanItemCount: 0,
    runtimeFailureRecoveryPlanItemCount: 0,
    runtimeApprovalRequirementItemCount: 0,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    redisConnectionStillReadOnly: true,
    adapterConnectionStillBlocked: true,
    naverApiCallStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReview: true,
    requiresSeparateTask346Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_346_APPROVAL_PHRASE,
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

function makeAllReadyInput() {
  return {
    operatingDeploymentDesignReview: makeTask342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
    domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
    operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
    runtimeWorkerQueueAdapterOperatingConnectionPlanReview: makeTask345View(
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    ),
  };
}

describe('buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView', () => {
  it('1. Task 342~345 모두 READY → Task 346 READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView(makeAllReadyInput());
    assert.equal(
      view.operatingDeploymentPreExecutionFinalReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
    );
    assert.equal(view.finalReadinessReady, true);
    assert.equal(view.finalReadinessPartialReady, false);
    assert.equal(view.finalReadinessBlocked, false);
    assert.equal(view.finalReadinessNotStarted, false);
  });

  it('2. 하나 이상 PARTIAL_READY이고 BLOCKED/NOT_STARTED가 없으면 PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView({
      operatingDeploymentDesignReview: makeTask342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY'),
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
      runtimeWorkerQueueAdapterOperatingConnectionPlanReview: makeTask345View(
        'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
      ),
    });
    assert.equal(
      view.operatingDeploymentPreExecutionFinalReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
    );
    assert.equal(view.finalReadinessPartialReady, true);
    assert.equal(view.finalReadinessReady, false);
  });

  it('3. 하나 이상 BLOCKED이면 BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView({
      operatingDeploymentDesignReview: makeTask342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED'),
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
      runtimeWorkerQueueAdapterOperatingConnectionPlanReview: makeTask345View(
        'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
      ),
    });
    assert.equal(
      view.operatingDeploymentPreExecutionFinalReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
    );
    assert.equal(view.finalReadinessBlocked, true);
  });

  it('3-b. BLOCKED 우선순위: BLOCKED와 NOT_STARTED 혼재 시 BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView({
      operatingDeploymentDesignReview: makeTask342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'),
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
      runtimeWorkerQueueAdapterOperatingConnectionPlanReview: makeTask345View(
        'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
      ),
    });
    assert.equal(
      view.operatingDeploymentPreExecutionFinalReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
    );
  });

  it('4. 하나 이상 NOT_STARTED이면 NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView({
      operatingDeploymentDesignReview: makeTask342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
      domainDnsHttpsConnectionPlanReview: makeTask343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
      operatingDbBackupRollbackPlanReview: makeTask344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
      runtimeWorkerQueueAdapterOperatingConnectionPlanReview: makeTask345View(
        'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED',
      ),
    });
    assert.equal(
      view.operatingDeploymentPreExecutionFinalReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
    );
    assert.equal(view.finalReadinessNotStarted, true);
  });

  const baseView = buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView(makeAllReadyInput());

  it('5. operatingDeploymentDesignReadinessItems 생성 검증', () => {
    assert.ok(baseView.operatingDeploymentDesignReadinessItems.length > 0);
    assert.equal(
      baseView.operatingDeploymentDesignReadinessItemCount,
      baseView.operatingDeploymentDesignReadinessItems.length,
    );
    for (const item of baseView.operatingDeploymentDesignReadinessItems) {
      assert.equal(item.category, 'OPERATING_DEPLOYMENT_DESIGN');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
      assert.equal(item.sourceTaskId, 342);
    }
  });

  it('6. domainDnsHttpsReadinessItems 생성 검증', () => {
    assert.ok(baseView.domainDnsHttpsReadinessItems.length > 0);
    assert.equal(baseView.domainDnsHttpsReadinessItemCount, baseView.domainDnsHttpsReadinessItems.length);
    for (const item of baseView.domainDnsHttpsReadinessItems) {
      assert.equal(item.category, 'DOMAIN_DNS_HTTPS');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
      assert.equal(item.sourceTaskId, 343);
    }
  });

  it('7. operatingDbBackupRollbackReadinessItems 생성 검증', () => {
    assert.ok(baseView.operatingDbBackupRollbackReadinessItems.length > 0);
    assert.equal(
      baseView.operatingDbBackupRollbackReadinessItemCount,
      baseView.operatingDbBackupRollbackReadinessItems.length,
    );
    for (const item of baseView.operatingDbBackupRollbackReadinessItems) {
      assert.equal(item.category, 'OPERATING_DB_BACKUP_ROLLBACK');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
      assert.equal(item.sourceTaskId, 344);
    }
  });

  it('8. runtimeWorkerQueueAdapterReadinessItems 생성 검증', () => {
    assert.ok(baseView.runtimeWorkerQueueAdapterReadinessItems.length > 0);
    assert.equal(
      baseView.runtimeWorkerQueueAdapterReadinessItemCount,
      baseView.runtimeWorkerQueueAdapterReadinessItems.length,
    );
    for (const item of baseView.runtimeWorkerQueueAdapterReadinessItems) {
      assert.equal(item.category, 'RUNTIME_WORKER_QUEUE_ADAPTER');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
      assert.equal(item.sourceTaskId, 345);
    }
  });

  it('9. finalApprovalRequirementItems 생성 검증', () => {
    assert.ok(baseView.finalApprovalRequirementItems.length > 0);
    assert.equal(baseView.finalApprovalRequirementItemCount, baseView.finalApprovalRequirementItems.length);
    for (const item of baseView.finalApprovalRequirementItems) {
      assert.equal(item.category, 'FINAL_APPROVAL_REQUIREMENT');
      assert.equal(item.requiresSeparateApproval, true);
    }
  });

  it('10. preExecutionSafetyLockItems 생성 검증', () => {
    assert.ok(baseView.preExecutionSafetyLockItems.length > 0);
    assert.equal(baseView.preExecutionSafetyLockItemCount, baseView.preExecutionSafetyLockItems.length);
    for (const item of baseView.preExecutionSafetyLockItems) {
      assert.equal(item.category, 'PRE_EXECUTION_SAFETY_LOCK');
      assert.equal(item.isReadOnly, true);
      assert.equal(item.actualChangePerformed, false);
    }
  });

  it('11. recommendedNextStep 검증', () => {
    assert.equal(baseView.recommendedNextStep, 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW');
  });

  it('12. recommendedApprovalMode 검증', () => {
    assert.equal(baseView.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('13. recommendedExecutionMode 검증', () => {
    assert.equal(baseView.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('14. recommendedDeploymentMode 검증', () => {
    assert.equal(baseView.recommendedDeploymentMode, 'READ_ONLY_PRE_EXECUTION_REVIEW');
  });

  it('15. recommendedSafetyMode 검증', () => {
    assert.equal(baseView.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('16. preExecutionFinalReadinessReviewStarted true', () => {
    assert.equal(baseView.preExecutionFinalReadinessReviewStarted, true);
  });

  it('17. preExecutionFinalReadinessStillReadOnly true', () => {
    assert.equal(baseView.preExecutionFinalReadinessStillReadOnly, true);
  });

  it('18. actualDeploymentStarted false', () => {
    assert.equal(baseView.actualDeploymentStarted, false);
  });

  it('19. actualProductionTransitionStarted false', () => {
    assert.equal(baseView.actualProductionTransitionStarted, false);
  });

  it('20. actualVpsServerCreated false', () => {
    assert.equal(baseView.actualVpsServerCreated, false);
  });

  it('21. actualDomainConnected false', () => {
    assert.equal(baseView.actualDomainConnected, false);
  });

  it('22. dnsChanged false', () => {
    assert.equal(baseView.dnsChanged, false);
  });

  it('23. dnsRecordCreatedOrModified false', () => {
    assert.equal(baseView.dnsRecordCreatedOrModified, false);
  });

  it('24. sslCertificateIssued false', () => {
    assert.equal(baseView.sslCertificateIssued, false);
  });

  it('25. httpsEnabled false', () => {
    assert.equal(baseView.httpsEnabled, false);
  });

  it('26. runtimeConfigured false', () => {
    assert.equal(baseView.runtimeConfigured, false);
  });

  it('27. workerStarted false', () => {
    assert.equal(baseView.workerStarted, false);
  });

  it('28. queueEnqueued false', () => {
    assert.equal(baseView.queueEnqueued, false);
  });

  it('29. redisOperatingConnectionChanged false', () => {
    assert.equal(baseView.redisOperatingConnectionChanged, false);
  });

  it('30. adapterConnected false', () => {
    assert.equal(baseView.adapterConnected, false);
  });

  it('31. operatingDbConnectionChanged false', () => {
    assert.equal(baseView.operatingDbConnectionChanged, false);
  });

  it('32. databaseUrlChanged false', () => {
    assert.equal(baseView.databaseUrlChanged, false);
  });

  it('33. envFileReadOrModified false', () => {
    assert.equal(baseView.envFileReadOrModified, false);
  });

  it('34. dbWritePerformed false', () => {
    assert.equal(baseView.dbWritePerformed, false);
  });

  it('35. dbBackupExecuted false', () => {
    assert.equal(baseView.dbBackupExecuted, false);
  });

  it('36. dbRestoreExecuted false', () => {
    assert.equal(baseView.dbRestoreExecuted, false);
  });

  it('37. rollbackExecuted false', () => {
    assert.equal(baseView.rollbackExecuted, false);
  });

  it('38. migrationExecuted false', () => {
    assert.equal(baseView.migrationExecuted, false);
  });

  it('39. naverApiCalled false', () => {
    assert.equal(baseView.naverApiCalled, false);
  });

  it('40. productLookupApiRecalled false', () => {
    assert.equal(baseView.productLookupApiRecalled, false);
  });

  it('41. productUpdateApiCalled false', () => {
    assert.equal(baseView.productUpdateApiCalled, false);
  });

  it('42. deploymentExecutionStillBlocked true', () => {
    assert.equal(baseView.deploymentExecutionStillBlocked, true);
  });

  it('43. productionTransitionStillBlocked true', () => {
    assert.equal(baseView.productionTransitionStillBlocked, true);
  });

  it('44. runtimeConfigurationStillReadOnly true', () => {
    assert.equal(baseView.runtimeConfigurationStillReadOnly, true);
  });

  it('45. workerExecutionStillBlocked true', () => {
    assert.equal(baseView.workerExecutionStillBlocked, true);
  });

  it('46. queueEnqueueStillBlocked true', () => {
    assert.equal(baseView.queueEnqueueStillBlocked, true);
  });

  it('47. adapterConnectionStillBlocked true', () => {
    assert.equal(baseView.adapterConnectionStillBlocked, true);
  });

  it('48. domainConnectionStillReadOnly true', () => {
    assert.equal(baseView.domainConnectionStillReadOnly, true);
  });

  it('49. dnsChangeStillBlocked true', () => {
    assert.equal(baseView.dnsChangeStillBlocked, true);
  });

  it('50. sslIssueStillBlocked true', () => {
    assert.equal(baseView.sslIssueStillBlocked, true);
  });

  it('51. operatingDbConnectionStillReadOnly true', () => {
    assert.equal(baseView.operatingDbConnectionStillReadOnly, true);
  });

  it('52. databaseUrlChangeStillBlocked true', () => {
    assert.equal(baseView.databaseUrlChangeStillBlocked, true);
  });

  it('53. apiCallStillBlocked true', () => {
    assert.equal(baseView.apiCallStillBlocked, true);
  });

  it('54. dbWriteStillBlocked true', () => {
    assert.equal(baseView.dbWriteStillBlocked, true);
  });

  it('55. tokenOrAuthStillHidden true', () => {
    assert.equal(baseView.tokenOrAuthStillHidden, true);
  });

  it('56. rawApiResponseStillHidden true', () => {
    assert.equal(baseView.rawApiResponseStillHidden, true);
  });

  it('57. actual final/execution flags false', () => {
    assert.equal(baseView.actualFinalExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionApprovalGranted, false);
    assert.equal(baseView.actualExecutionStarted, false);
  });

  it('58. 실행 버튼 추가 false', () => {
    assert.equal(baseView.executionButtonAdded, false);
  });

  it('59. POST / submit action false', () => {
    assert.equal(baseView.submitActionAdded, false);
    assert.equal(baseView.postApiAdded, false);
  });

  it('60. 가격/재고 변경 false', () => {
    assert.equal(baseView.priceChanged, false);
    assert.equal(baseView.stockChanged, false);
  });

  it('61. Token/Auth/Signature/Authorization 비노출 false', () => {
    assert.equal(baseView.tokenOrAuthValueExposed, false);
  });

  it('62. raw API response 비표시/비저장 유지', () => {
    assert.equal(baseView.rawApiResponseExposedOrStored, false);
  });

  it('63. Task 347 승인 문구 포함', () => {
    assert.equal(baseView.nextTaskApprovalPhrase, NEXT_TASK_347_APPROVAL_PHRASE);
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Task 347'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('Runtime'));
    assert.ok(baseView.nextTaskApprovalPhrase.includes('배포'));
    assert.equal(baseView.requiresSeparateTask347Approval, true);
  });

  it('taskId 및 status 필드 검증', () => {
    assert.equal(baseView.taskId, 346);
    assert.equal(baseView.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_VIEW');
    assert.equal(baseView.currentTaskNumber, 346);
    assert.equal(baseView.isBatchJobResultDisplayOnly, true);
    assert.equal(baseView.isReadOnlyOperatingDeploymentPreExecutionFinalReadinessReview, true);
  });

  it('summaryCards 생성 검증', () => {
    assert.ok(baseView.preExecutionReadinessSummaryCards.length > 0);
  });

  it('totalReadinessItemCount 검증', () => {
    const expected =
      baseView.operatingDeploymentDesignReadinessItemCount +
      baseView.domainDnsHttpsReadinessItemCount +
      baseView.operatingDbBackupRollbackReadinessItemCount +
      baseView.runtimeWorkerQueueAdapterReadinessItemCount +
      baseView.finalApprovalRequirementItemCount +
      baseView.preExecutionSafetyLockItemCount;
    assert.equal(baseView.totalReadinessItemCount, expected);
  });

  it('source status 필드 검증', () => {
    assert.equal(
      baseView.sourceOperatingDeploymentDesignReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    );
    assert.equal(
      baseView.sourceDomainDnsHttpsConnectionPlanReviewStatus,
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    );
    assert.equal(
      baseView.sourceOperatingDbBackupRollbackPlanReviewStatus,
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    );
    assert.equal(
      baseView.sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    );
  });

  it('portForwardingChanged / serverConfigChanged false', () => {
    assert.equal(baseView.portForwardingChanged, false);
    assert.equal(baseView.serverConfigChanged, false);
  });

  it('preExecutionReviewStillReadOnly true', () => {
    assert.equal(baseView.preExecutionReviewStillReadOnly, true);
  });
});
