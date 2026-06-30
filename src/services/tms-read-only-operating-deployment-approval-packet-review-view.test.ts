import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView,
  NEXT_TASK_348_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewView,
} from './tms-read-only-operating-deployment-approval-packet-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView,
} from './tms-read-only-operating-deployment-pre-execution-final-readiness-review-view.service';

function makeTask346View(
  status:
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
): TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_VIEW',
    taskId: 346,
    taskName: 'TMS Read-Only Operating Deployment Pre-Execution Final Readiness Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 사전 최종 준비 상태 검토',
    description: 'Mock Task 346 view for Task 347 tests',
    currentTaskNumber: 346,
    referenceTaskNumbers: [345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    sourceDomainDnsHttpsConnectionPlanReviewStatus:
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    sourceOperatingDbBackupRollbackPlanReviewStatus:
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus:
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    operatingDeploymentPreExecutionFinalReadinessReviewStatus: status,
    preExecutionFinalReadinessReviewReady:
      status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
    preExecutionFinalReadinessReviewPartialReady:
      status ===
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
    preExecutionFinalReadinessReviewBlocked:
      status ===
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
    preExecutionFinalReadinessReviewNotStarted:
      status ===
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
    preExecutionFinalReadinessReviewStarted: true,
    preExecutionFinalReadinessStillReadOnly: true,
    finalReadinessItems: [],
    operatingDeploymentDesignReadinessItems: [],
    domainDnsHttpsReadinessItems: [],
    operatingDbBackupRollbackReadinessItems: [],
    runtimeWorkerQueueAdapterReadinessItems: [],
    finalApprovalRequirementItems: [],
    preExecutionSafetyLockItems: [],
    readinessCards: [],
    readyFinalReadinessItems: [],
    partialReadyFinalReadinessItems: [],
    blockedFinalReadinessItems: [],
    notStartedFinalReadinessItems: [],
    operatingDeploymentDesignReadinessItemCount: 4,
    domainDnsHttpsReadinessItemCount: 4,
    operatingDbBackupRollbackReadinessItemCount: 4,
    runtimeWorkerQueueAdapterReadinessItemCount: 5,
    finalApprovalRequirementItemCount: 7,
    preExecutionSafetyLockItemCount: 6,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalReadinessItemCount: 30,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'READ_ONLY_PRE_EXECUTION_REVIEW',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    actualApprovalGranted: false,
    actualDeploymentStarted: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    finalReadinessStillDisplayOnly: true,
    approvalSubmissionStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    vpsCreationStillBlocked: true,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    adapterConnectionStillBlocked: true,
    redisOperatingConnectionStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentPreExecutionFinalReadinessReview: true,
    requiresSeparateTask347Approval: true,
    nextTaskApprovalPhrase:
      'Task 347에서 TMS read-only 운영 배포 승인 패킷 검토 화면 구현을 승인합니다.',
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
  } as unknown as TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView;
}

describe('TmsReadOnlyOperatingDeploymentApprovalPacketReviewView — Task 347', () => {
  // ── 1. Status 1:1 mapping tests ───────────────────────────────────────────────

  describe('1. 1:1 status mapping', () => {
    it('1-1. Task 346 READY → Task 347 READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
      );
    });

    it('1-2. Task 346 PARTIAL_READY → Task 347 PARTIAL_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY',
      );
    });

    it('1-3. Task 346 BLOCKED → Task 347 BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED',
      );
    });

    it('1-4. Task 346 NOT_STARTED → Task 347 NOT_STARTED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED',
      );
    });
  });

  // ── 2. Fixed structural fields ────────────────────────────────────────────────

  describe('2. 고정 구조 필드', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('2-1. status === TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_VIEW', () => {
      assert.equal(view.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_VIEW');
    });

    it('2-2. taskId === 347', () => {
      assert.equal(view.taskId, 347);
    });

    it('2-3. currentTaskNumber === 347', () => {
      assert.equal(view.currentTaskNumber, 347);
    });

    it('2-4. isBatchJobResultDisplayOnly === true', () => {
      assert.equal(view.isBatchJobResultDisplayOnly, true);
    });

    it('2-5. approvalPacketReviewStarted === true', () => {
      assert.equal(view.approvalPacketReviewStarted, true);
    });

    it('2-6. approvalPacketStillReadOnly === true', () => {
      assert.equal(view.approvalPacketStillReadOnly, true);
    });

    it('2-7. isReadOnlyOperatingDeploymentApprovalPacketReview === true', () => {
      assert.equal(view.isReadOnlyOperatingDeploymentApprovalPacketReview, true);
    });

    it('2-8. requiresSeparateTask348Approval === true', () => {
      assert.equal(view.requiresSeparateTask348Approval, true);
    });

    it('2-9. recommendedNextStep === OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION', () => {
      assert.equal(
        view.recommendedNextStep,
        'OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION',
      );
    });

    it('2-10. recommendedApprovalMode === SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });

    it('2-11. recommendedExecutionMode === EXECUTION_STILL_BLOCKED', () => {
      assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });

    it('2-12. recommendedDeploymentMode === APPROVAL_PACKET_REVIEW_ONLY', () => {
      assert.equal(view.recommendedDeploymentMode, 'APPROVAL_PACKET_REVIEW_ONLY');
    });

    it('2-13. recommendedSafetyMode === SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  // ── 3. Approval category item counts ─────────────────────────────────────────

  describe('3. 승인 카테고리별 항목 수', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('3-1. vpsCreationApprovalItems.length === 4', () => {
      assert.equal(view.vpsCreationApprovalItems.length, 4);
    });

    it('3-2. runtimeConfigurationApprovalItems.length === 4', () => {
      assert.equal(view.runtimeConfigurationApprovalItems.length, 4);
    });

    it('3-3. operatingDbApprovalItems.length === 4', () => {
      assert.equal(view.operatingDbApprovalItems.length, 4);
    });

    it('3-4. domainDnsHttpsApprovalItems.length === 4', () => {
      assert.equal(view.domainDnsHttpsApprovalItems.length, 4);
    });

    it('3-5. workerQueueAdapterApprovalItems.length === 4', () => {
      assert.equal(view.workerQueueAdapterApprovalItems.length, 4);
    });

    it('3-6. naverApiApprovalItems.length === 4', () => {
      assert.equal(view.naverApiApprovalItems.length, 4);
    });

    it('3-7. deploymentExecutionApprovalItems.length === 4', () => {
      assert.equal(view.deploymentExecutionApprovalItems.length, 4);
    });

    it('3-8. preExecutionSafetyLockItems.length === 6', () => {
      assert.equal(view.preExecutionSafetyLockItems.length, 6);
    });

    it('3-9. totalApprovalPacketItemCount === 34', () => {
      assert.equal(view.totalApprovalPacketItemCount, 34);
    });
  });

  // ── 4. Boolean flag checks ────────────────────────────────────────────────────

  describe('4. boolean safety/execution 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('4-1. actualApprovalPacketSubmitted === false', () => {
      assert.equal(view.actualApprovalPacketSubmitted, false);
    });

    it('4-2. actualDeploymentApprovalGranted === false', () => {
      assert.equal(view.actualDeploymentApprovalGranted, false);
    });

    it('4-3. actualDeploymentStarted === false', () => {
      assert.equal(view.actualDeploymentStarted, false);
    });

    it('4-4. actualVpsServerCreated === false', () => {
      assert.equal(view.actualVpsServerCreated, false);
    });

    it('4-5. actualDomainConnected === false', () => {
      assert.equal(view.actualDomainConnected, false);
    });

    it('4-6. dnsChanged === false', () => {
      assert.equal(view.dnsChanged, false);
    });

    it('4-7. sslCertificateIssued === false', () => {
      assert.equal(view.sslCertificateIssued, false);
    });

    it('4-8. runtimeConfigured === false', () => {
      assert.equal(view.runtimeConfigured, false);
    });

    it('4-9. workerStarted === false', () => {
      assert.equal(view.workerStarted, false);
    });

    it('4-10. queueEnqueued === false', () => {
      assert.equal(view.queueEnqueued, false);
    });

    it('4-11. redisOperatingConnectionChanged === false', () => {
      assert.equal(view.redisOperatingConnectionChanged, false);
    });

    it('4-12. adapterConnected === false', () => {
      assert.equal(view.adapterConnected, false);
    });

    it('4-13. operatingDbConnectionChanged === false', () => {
      assert.equal(view.operatingDbConnectionChanged, false);
    });

    it('4-14. databaseUrlChanged === false', () => {
      assert.equal(view.databaseUrlChanged, false);
    });

    it('4-15. envFileReadOrModified === false', () => {
      assert.equal(view.envFileReadOrModified, false);
    });

    it('4-16. naverApiCalled === false', () => {
      assert.equal(view.naverApiCalled, false);
    });

    it('4-17. dbWritePerformed === false', () => {
      assert.equal(view.dbWritePerformed, false);
    });

    it('4-18. executionButtonAdded === false', () => {
      assert.equal(view.executionButtonAdded, false);
    });

    it('4-19. submitActionAdded === false', () => {
      assert.equal(view.submitActionAdded, false);
    });

    it('4-20. postApiAdded === false', () => {
      assert.equal(view.postApiAdded, false);
    });
  });

  // ── 5. Still-blocked flag checks ─────────────────────────────────────────────

  describe('5. still-blocked/still-read-only 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('5-1. approvalPacketStillDisplayOnly === true', () => {
      assert.equal(view.approvalPacketStillDisplayOnly, true);
    });

    it('5-2. approvalSubmissionStillBlocked === true', () => {
      assert.equal(view.approvalSubmissionStillBlocked, true);
    });

    it('5-3. deploymentExecutionStillBlocked === true', () => {
      assert.equal(view.deploymentExecutionStillBlocked, true);
    });

    it('5-4. runtimeConfigurationStillReadOnly === true', () => {
      assert.equal(view.runtimeConfigurationStillReadOnly, true);
    });

    it('5-5. workerExecutionStillBlocked === true', () => {
      assert.equal(view.workerExecutionStillBlocked, true);
    });

    it('5-6. queueEnqueueStillBlocked === true', () => {
      assert.equal(view.queueEnqueueStillBlocked, true);
    });

    it('5-7. adapterConnectionStillBlocked === true', () => {
      assert.equal(view.adapterConnectionStillBlocked, true);
    });

    it('5-8. domainConnectionStillReadOnly === true', () => {
      assert.equal(view.domainConnectionStillReadOnly, true);
    });

    it('5-9. dnsChangeStillBlocked === true', () => {
      assert.equal(view.dnsChangeStillBlocked, true);
    });

    it('5-10. sslIssueStillBlocked === true', () => {
      assert.equal(view.sslIssueStillBlocked, true);
    });

    it('5-11. operatingDbConnectionStillReadOnly === true', () => {
      assert.equal(view.operatingDbConnectionStillReadOnly, true);
    });

    it('5-12. databaseUrlChangeStillBlocked === true', () => {
      assert.equal(view.databaseUrlChangeStillBlocked, true);
    });

    it('5-13. apiCallStillBlocked === true', () => {
      assert.equal(view.apiCallStillBlocked, true);
    });

    it('5-14. dbWriteStillBlocked === true', () => {
      assert.equal(view.dbWriteStillBlocked, true);
    });

    it('5-15. tokenOrAuthStillHidden === true', () => {
      assert.equal(view.tokenOrAuthStillHidden, true);
    });

    it('5-16. rawApiResponseStillHidden === true', () => {
      assert.equal(view.rawApiResponseStillHidden, true);
    });
  });

  // ── 6. approval boolean derivations ──────────────────────────────────────────

  describe('6. approvalPacketReview 불리언 파생 필드', () => {
    it('6-1. READY: approvalPacketReviewReady true, others false', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.approvalPacketReviewReady, true);
      assert.equal(view.approvalPacketReviewPartialReady, false);
      assert.equal(view.approvalPacketReviewBlocked, false);
      assert.equal(view.approvalPacketReviewNotStarted, false);
    });

    it('6-2. PARTIAL_READY: approvalPacketReviewPartialReady true, others false', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
        ),
      });
      assert.equal(view.approvalPacketReviewReady, false);
      assert.equal(view.approvalPacketReviewPartialReady, true);
      assert.equal(view.approvalPacketReviewBlocked, false);
      assert.equal(view.approvalPacketReviewNotStarted, false);
    });

    it('6-3. BLOCKED: approvalPacketReviewBlocked true, others false', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
        ),
      });
      assert.equal(view.approvalPacketReviewReady, false);
      assert.equal(view.approvalPacketReviewPartialReady, false);
      assert.equal(view.approvalPacketReviewBlocked, true);
      assert.equal(view.approvalPacketReviewNotStarted, false);
    });

    it('6-4. NOT_STARTED: approvalPacketReviewNotStarted true, others false', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
        ),
      });
      assert.equal(view.approvalPacketReviewReady, false);
      assert.equal(view.approvalPacketReviewPartialReady, false);
      assert.equal(view.approvalPacketReviewBlocked, false);
      assert.equal(view.approvalPacketReviewNotStarted, true);
    });
  });

  // ── 7. Item status derivations ────────────────────────────────────────────────

  describe('7. item 별 status 파생 — isReady/isPartialReady/isBlocked/isNotStarted', () => {
    it('7-1. READY → vpsCreationApprovalItems first item isReady true', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      const item = view.vpsCreationApprovalItems[0];
      assert.equal(item.isReady, true);
      assert.equal(item.isPartialReady, false);
      assert.equal(item.isBlocked, false);
      assert.equal(item.isNotStarted, false);
    });

    it('7-2. BLOCKED → runtimeConfigurationApprovalItems first item isBlocked true', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
        ),
      });
      const item = view.runtimeConfigurationApprovalItems[0];
      assert.equal(item.isBlocked, true);
      assert.equal(item.isReady, false);
    });

    it('7-3. NOT_STARTED → operatingDbApprovalItems first item isNotStarted true', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
        ),
      });
      const item = view.operatingDbApprovalItems[0];
      assert.equal(item.isNotStarted, true);
      assert.equal(item.isReady, false);
    });

    it('7-4. PARTIAL_READY → domainDnsHttpsApprovalItems first item isPartialReady true', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
        ),
      });
      const item = view.domainDnsHttpsApprovalItems[0];
      assert.equal(item.isPartialReady, true);
      assert.equal(item.isReady, false);
    });
  });

  // ── 8. preExecutionSafetyLockItems always READY ───────────────────────────────

  describe('8. preExecutionSafetyLockItems 항상 READY', () => {
    (['TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
    ] as const).forEach((srcStatus, idx) => {
      it(`8-${idx + 1}. preExecutionSafetyLockItems all READY when Task 346 is ${srcStatus.split('_').slice(-1)[0]}`, () => {
        const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
          operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(srcStatus),
        });
        for (const item of view.preExecutionSafetyLockItems) {
          assert.equal(item.approvalReviewStatus, 'READY');
          assert.equal(item.isReady, true);
          assert.equal(item.isBlocked, false);
        }
      });
    });
  });

  // ── 9. isReadOnly / actualApprovalGranted / actualChangePerformed ────────────

  describe('9. isReadOnly, actualApprovalGranted, actualChangePerformed', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('9-1. 모든 item isReadOnly === true', () => {
      for (const item of view.approvalPacketItems) {
        assert.equal(item.isReadOnly, true);
      }
    });

    it('9-2. 모든 item actualApprovalGranted === false', () => {
      for (const item of view.approvalPacketItems) {
        assert.equal(item.actualApprovalGranted, false);
      }
    });

    it('9-3. 모든 item actualChangePerformed === false', () => {
      for (const item of view.approvalPacketItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });
  });

  // ── 10. nextTaskApprovalPhrase ───────────────────────────────────────────────

  describe('10. nextTaskApprovalPhrase', () => {
    it('10-1. nextTaskApprovalPhrase contains Task 348', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.ok(view.nextTaskApprovalPhrase.includes('Task 348'));
    });

    it('10-2. NEXT_TASK_348_APPROVAL_PHRASE contains Task 348', () => {
      assert.ok(NEXT_TASK_348_APPROVAL_PHRASE.includes('Task 348'));
    });

    it('10-3. nextTaskApprovalPhrase === NEXT_TASK_348_APPROVAL_PHRASE', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_348_APPROVAL_PHRASE);
    });
  });

  // ── 11. summaryCards ─────────────────────────────────────────────────────────

  describe('11. approvalPacketSummaryCards', () => {
    it('11-1. summaryCards 4개', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.approvalPacketSummaryCards.length, 4);
    });

    it('11-2. first card label 승인 패킷 상태', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.approvalPacketSummaryCards[0].label, '승인 패킷 상태');
    });

    it('11-3. READY → first card tone positive', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.approvalPacketSummaryCards[0].tone, 'positive');
    });

    it('11-4. BLOCKED → first card tone warning', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
        ),
      });
      assert.equal(view.approvalPacketSummaryCards[0].tone, 'warning');
    });
  });

  // ── 12. category field checks ─────────────────────────────────────────────────

  describe('12. 카테고리 필드 일치 확인', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
    });

    it('12-1. vpsCreationApprovalItems all have category VPS_CREATION_APPROVAL', () => {
      for (const item of view.vpsCreationApprovalItems) {
        assert.equal(item.category, 'VPS_CREATION_APPROVAL');
      }
    });

    it('12-2. runtimeConfigurationApprovalItems all have category RUNTIME_CONFIGURATION_APPROVAL', () => {
      for (const item of view.runtimeConfigurationApprovalItems) {
        assert.equal(item.category, 'RUNTIME_CONFIGURATION_APPROVAL');
      }
    });

    it('12-3. operatingDbApprovalItems all have category OPERATING_DB_APPROVAL', () => {
      for (const item of view.operatingDbApprovalItems) {
        assert.equal(item.category, 'OPERATING_DB_APPROVAL');
      }
    });

    it('12-4. domainDnsHttpsApprovalItems all have category DOMAIN_DNS_HTTPS_APPROVAL', () => {
      for (const item of view.domainDnsHttpsApprovalItems) {
        assert.equal(item.category, 'DOMAIN_DNS_HTTPS_APPROVAL');
      }
    });

    it('12-5. workerQueueAdapterApprovalItems all have category WORKER_QUEUE_ADAPTER_APPROVAL', () => {
      for (const item of view.workerQueueAdapterApprovalItems) {
        assert.equal(item.category, 'WORKER_QUEUE_ADAPTER_APPROVAL');
      }
    });

    it('12-6. naverApiApprovalItems all have category NAVER_API_APPROVAL', () => {
      for (const item of view.naverApiApprovalItems) {
        assert.equal(item.category, 'NAVER_API_APPROVAL');
      }
    });

    it('12-7. deploymentExecutionApprovalItems all have category DEPLOYMENT_EXECUTION_APPROVAL', () => {
      for (const item of view.deploymentExecutionApprovalItems) {
        assert.equal(item.category, 'DEPLOYMENT_EXECUTION_APPROVAL');
      }
    });

    it('12-8. preExecutionSafetyLockItems all have category PRE_EXECUTION_SAFETY_LOCK', () => {
      for (const item of view.preExecutionSafetyLockItems) {
        assert.equal(item.category, 'PRE_EXECUTION_SAFETY_LOCK');
      }
    });
  });

  // ── 13. approvalPacketItems aggregation ──────────────────────────────────────

  describe('13. approvalPacketItems aggregation', () => {
    it('13-1. approvalPacketItems.length === totalApprovalPacketItemCount', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.approvalPacketItems.length, view.totalApprovalPacketItemCount);
    });

    it('13-2. readyApprovalItems + partialReadyApprovalItems + blockedApprovalItems + notStartedApprovalItems === totalApprovalPacketItemCount', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      const total =
        view.readyApprovalItems.length +
        view.partialReadyApprovalItems.length +
        view.blockedApprovalItems.length +
        view.notStartedApprovalItems.length;
      assert.equal(total, view.totalApprovalPacketItemCount);
    });

    it('13-3. itemCount fields sum === totalApprovalPacketItemCount', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      const sum =
        view.vpsCreationApprovalItemCount +
        view.runtimeConfigurationApprovalItemCount +
        view.operatingDbApprovalItemCount +
        view.domainDnsHttpsApprovalItemCount +
        view.workerQueueAdapterApprovalItemCount +
        view.naverApiApprovalItemCount +
        view.deploymentExecutionApprovalItemCount +
        view.preExecutionSafetyLockItemCount;
      assert.equal(sum, view.totalApprovalPacketItemCount);
    });
  });

  // ── 14. sourceStatus propagation ─────────────────────────────────────────────

  describe('14. sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus 전파', () => {
    it('14-1. READY → sourceStatus === READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(
        view.sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
      );
    });

    it('14-2. BLOCKED → sourceStatus === BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
        ),
      });
      assert.equal(
        view.sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
      );
    });
  });

  // ── 15. requiresSeparateApproval on safety lock items ────────────────────────

  describe('15. preExecutionSafetyLockItems requiresSeparateApproval === false', () => {
    it('15-1. 모든 safety lock item requiresSeparateApproval === false', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      for (const item of view.preExecutionSafetyLockItems) {
        assert.equal(item.requiresSeparateApproval, false);
      }
    });
  });

  // ── 16. referenceTaskNumbers ─────────────────────────────────────────────────

  describe('16. referenceTaskNumbers', () => {
    it('16-1. referenceTaskNumbers[0] === 346', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView({
        operatingDeploymentPreExecutionFinalReadinessReview: makeTask346View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
        ),
      });
      assert.equal(view.referenceTaskNumbers[0], 346);
    });
  });
});
