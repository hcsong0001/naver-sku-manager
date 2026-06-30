import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView,
  NEXT_TASK_351_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-safety-lock-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentSafetyLockReviewView,
} from './tms-read-only-operating-deployment-safety-lock-review-view.service';

function makeTask349View(
  status:
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED',
): TmsReadOnlyOperatingDeploymentSafetyLockReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_VIEW',
    taskId: 349,
    taskName: 'TMS Read-Only Operating Deployment Safety Lock Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 Safety Lock 검토',
    description: 'Mock Task 349 view for Task 350 tests',
    currentTaskNumber: 349,
    referenceTaskNumbers: [348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentApprovalPacketOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
    operatingDeploymentSafetyLockReviewStatus: status,
    safetyLockReviewReady: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
    safetyLockReviewPartialReady: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY',
    safetyLockReviewBlocked: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
    safetyLockReviewNotStarted: status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED',
    safetyLockReviewStarted: true,
    safetyLockStillReadOnly: true,
    safetyLockItems: [],
    deploymentExecutionLockItems: [],
    vpsServerLockItems: [],
    domainDnsHttpsLockItems: [],
    operatingDbLockItems: [],
    runtimeWorkerQueueAdapterLockItems: [],
    naverApiLockItems: [],
    uiActionLockItems: [],
    secretExposureLockItems: [],
    safetyLockSummaryCards: [],
    readySafetyLockItems: [],
    partialReadySafetyLockItems: [],
    blockedSafetyLockItems: [],
    notStartedSafetyLockItems: [],
    deploymentExecutionLockItemCount: 4,
    vpsServerLockItemCount: 4,
    domainDnsHttpsLockItemCount: 4,
    operatingDbLockItemCount: 4,
    runtimeWorkerQueueAdapterLockItemCount: 5,
    naverApiLockItemCount: 4,
    uiActionLockItemCount: 4,
    secretExposureLockItemCount: 4,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalSafetyLockItemCount: 33,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SAFETY_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    actualApprovalPacketSubmitted: false,
    actualDeploymentApprovalGranted: false,
    actualDeploymentStarted: false,
    actualProductionTransitionStarted: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
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
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    vpsServerCreationStillBlocked: true,
    vpsConfigChangeStillBlocked: true,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    adapterConnectionStillBlocked: true,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    uiExecutionActionStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentSafetyLockReview: true,
    requiresSeparateTask350Approval: true,
    nextTaskApprovalPhrase: 'Task 350에서 TMS read-only 운영 배포 Safety Lock 결과 인증 화면 구현을 승인합니다.',
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
  } as unknown as TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
}

describe('TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView — Task 350', () => {
  // ── 1-4. Status 1:1 mapping ───────────────────────────────────────────────────

  describe('1-4. 1:1 status mapping', () => {
    it('1. Task 349 READY → Task 350 CERTIFIED_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY',
      );
    });

    it('2. Task 349 PARTIAL_READY → Task 350 CERTIFIED_PARTIAL_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      );
    });

    it('3. Task 349 BLOCKED → Task 350 OUTCOME_BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_BLOCKED',
      );
    });

    it('4. Task 349 NOT_STARTED → Task 350 OUTCOME_NOT_STARTED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_NOT_STARTED',
      );
    });
  });

  // ── 5-13. Certification Item 그룹 생성 검증 ───────────────────────────────────

  describe('5-13. outcomeCertificationItems 그룹 생성 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('5. outcomeCertificationItems 생성 검증', () => {
      assert.ok(view.outcomeCertificationItems.length > 0);
    });

    it('6. deploymentExecutionLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.deploymentExecutionLockOutcomeCertificationItems.length, 4);
    });

    it('7. vpsServerLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.vpsServerLockOutcomeCertificationItems.length, 4);
    });

    it('8. domainDnsHttpsLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.domainDnsHttpsLockOutcomeCertificationItems.length, 4);
    });

    it('9. operatingDbLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.operatingDbLockOutcomeCertificationItems.length, 4);
    });

    it('10. runtimeWorkerQueueAdapterLockOutcomeCertificationItems 생성 검증 (5개)', () => {
      assert.equal(view.runtimeWorkerQueueAdapterLockOutcomeCertificationItems.length, 5);
    });

    it('11. naverApiLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.naverApiLockOutcomeCertificationItems.length, 4);
    });

    it('12. uiActionLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.uiActionLockOutcomeCertificationItems.length, 4);
    });

    it('13. secretExposureLockOutcomeCertificationItems 생성 검증 (4개)', () => {
      assert.equal(view.secretExposureLockOutcomeCertificationItems.length, 4);
    });
  });

  // ── 14-18. recommended 값 검증 ────────────────────────────────────────────────

  describe('14-18. recommended 값 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('14. recommendedNextStep === OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW', () => {
      assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW');
    });

    it('15. recommendedApprovalMode === SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });

    it('16. recommendedExecutionMode === EXECUTION_STILL_BLOCKED', () => {
      assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });

    it('17. recommendedDeploymentMode === SAFETY_LOCK_CERTIFICATION_ONLY', () => {
      assert.equal(view.recommendedDeploymentMode, 'SAFETY_LOCK_CERTIFICATION_ONLY');
    });

    it('18. recommendedSafetyMode === SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  // ── 19-22. 인증 고정 true 플래그 ─────────────────────────────────────────────

  describe('19-22. 인증 고정 true 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('19. safetyLockOutcomeCertified === true', () => { assert.equal(view.safetyLockOutcomeCertified, true); });
    it('20. safetyLockItemsCertified === true', () => { assert.equal(view.safetyLockItemsCertified, true); });
    it('21. safetyLockOutcomeCertificationStarted === true', () => { assert.equal(view.safetyLockOutcomeCertificationStarted, true); });
    it('22. safetyLockOutcomeCertificationStillReadOnly === true', () => { assert.equal(view.safetyLockOutcomeCertificationStillReadOnly, true); });
  });

  // ── 23-49. actual* false 플래그 ───────────────────────────────────────────────

  describe('23-49. actual* false 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('23. actualApprovalPacketSubmitted === false', () => { assert.equal(view.actualApprovalPacketSubmitted, false); });
    it('24. actualDeploymentApprovalGranted === false', () => { assert.equal(view.actualDeploymentApprovalGranted, false); });
    it('25. actualDeploymentStarted === false', () => { assert.equal(view.actualDeploymentStarted, false); });
    it('26. actualProductionTransitionStarted === false', () => { assert.equal(view.actualProductionTransitionStarted, false); });
    it('27. actualVpsServerCreated === false', () => { assert.equal(view.actualVpsServerCreated, false); });
    it('28. actualVpsConfigChanged === false', () => { assert.equal(view.actualVpsConfigChanged, false); });
    it('29. actualDomainConnected === false', () => { assert.equal(view.actualDomainConnected, false); });
    it('30. dnsChanged === false', () => { assert.equal(view.dnsChanged, false); });
    it('31. dnsRecordCreatedOrModified === false', () => { assert.equal(view.dnsRecordCreatedOrModified, false); });
    it('32. sslCertificateIssued === false', () => { assert.equal(view.sslCertificateIssued, false); });
    it('33. httpsEnabled === false', () => { assert.equal(view.httpsEnabled, false); });
    it('34. runtimeConfigured === false', () => { assert.equal(view.runtimeConfigured, false); });
    it('35. workerStarted === false', () => { assert.equal(view.workerStarted, false); });
    it('36. queueEnqueued === false', () => { assert.equal(view.queueEnqueued, false); });
    it('37. redisOperatingConnectionChanged === false', () => { assert.equal(view.redisOperatingConnectionChanged, false); });
    it('38. adapterConnected === false', () => { assert.equal(view.adapterConnected, false); });
    it('39. operatingDbConnectionChanged === false', () => { assert.equal(view.operatingDbConnectionChanged, false); });
    it('40. databaseUrlChanged === false', () => { assert.equal(view.databaseUrlChanged, false); });
    it('41. envFileReadOrModified === false', () => { assert.equal(view.envFileReadOrModified, false); });
    it('42. dbWritePerformed === false', () => { assert.equal(view.dbWritePerformed, false); });
    it('43. dbBackupExecuted === false', () => { assert.equal(view.dbBackupExecuted, false); });
    it('44. dbRestoreExecuted === false', () => { assert.equal(view.dbRestoreExecuted, false); });
    it('45. rollbackExecuted === false', () => { assert.equal(view.rollbackExecuted, false); });
    it('46. migrationExecuted === false', () => { assert.equal(view.migrationExecuted, false); });
    it('47. naverApiCalled === false', () => { assert.equal(view.naverApiCalled, false); });
    it('48. productLookupApiRecalled === false', () => { assert.equal(view.productLookupApiRecalled, false); });
    it('49. productUpdateApiCalled === false', () => { assert.equal(view.productUpdateApiCalled, false); });
  });

  // ── 50-69. still-blocked true 플래그 ─────────────────────────────────────────

  describe('50-69. still-blocked true 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('50. approvalSubmissionStillBlocked === true', () => { assert.equal(view.approvalSubmissionStillBlocked, true); });
    it('51. deploymentApprovalStillBlocked === true', () => { assert.equal(view.deploymentApprovalStillBlocked, true); });
    it('52. deploymentExecutionStillBlocked === true', () => { assert.equal(view.deploymentExecutionStillBlocked, true); });
    it('53. productionTransitionStillBlocked === true', () => { assert.equal(view.productionTransitionStillBlocked, true); });
    it('54. vpsServerCreationStillBlocked === true', () => { assert.equal(view.vpsServerCreationStillBlocked, true); });
    it('55. vpsConfigChangeStillBlocked === true', () => { assert.equal(view.vpsConfigChangeStillBlocked, true); });
    it('56. runtimeConfigurationStillReadOnly === true', () => { assert.equal(view.runtimeConfigurationStillReadOnly, true); });
    it('57. workerExecutionStillBlocked === true', () => { assert.equal(view.workerExecutionStillBlocked, true); });
    it('58. queueEnqueueStillBlocked === true', () => { assert.equal(view.queueEnqueueStillBlocked, true); });
    it('59. adapterConnectionStillBlocked === true', () => { assert.equal(view.adapterConnectionStillBlocked, true); });
    it('60. domainConnectionStillReadOnly === true', () => { assert.equal(view.domainConnectionStillReadOnly, true); });
    it('61. dnsChangeStillBlocked === true', () => { assert.equal(view.dnsChangeStillBlocked, true); });
    it('62. sslIssueStillBlocked === true', () => { assert.equal(view.sslIssueStillBlocked, true); });
    it('63. operatingDbConnectionStillReadOnly === true', () => { assert.equal(view.operatingDbConnectionStillReadOnly, true); });
    it('64. databaseUrlChangeStillBlocked === true', () => { assert.equal(view.databaseUrlChangeStillBlocked, true); });
    it('65. apiCallStillBlocked === true', () => { assert.equal(view.apiCallStillBlocked, true); });
    it('66. dbWriteStillBlocked === true', () => { assert.equal(view.dbWriteStillBlocked, true); });
    it('67. uiExecutionActionStillBlocked === true', () => { assert.equal(view.uiExecutionActionStillBlocked, true); });
    it('68. tokenOrAuthStillHidden === true', () => { assert.equal(view.tokenOrAuthStillHidden, true); });
    it('69. rawApiResponseStillHidden === true', () => { assert.equal(view.rawApiResponseStillHidden, true); });
  });

  // ── 70-75. 실행/버튼/가격/토큰 false ─────────────────────────────────────────

  describe('70-75. 실행/버튼/가격/토큰 false 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('70. actualFinalExecutionApprovalGranted === false && actualExecutionApprovalGranted === false && actualExecutionStarted === false', () => {
      assert.equal(view.actualFinalExecutionApprovalGranted, false);
      assert.equal(view.actualExecutionApprovalGranted, false);
      assert.equal(view.actualExecutionStarted, false);
    });

    it('71. executionButtonAdded === false', () => { assert.equal(view.executionButtonAdded, false); });

    it('72. postApiAdded === false && submitActionAdded === false', () => {
      assert.equal(view.postApiAdded, false);
      assert.equal(view.submitActionAdded, false);
    });

    it('73. priceChanged === false && stockChanged === false', () => {
      assert.equal(view.priceChanged, false);
      assert.equal(view.stockChanged, false);
    });

    it('74. tokenOrAuthValueExposed === false', () => { assert.equal(view.tokenOrAuthValueExposed, false); });

    it('75. rawApiResponseExposedOrStored === false', () => { assert.equal(view.rawApiResponseExposedOrStored, false); });
  });

  // ── 76. Task 351 승인 문구 ────────────────────────────────────────────────────

  describe('76. Task 351 승인 문구', () => {
    it('76. nextTaskApprovalPhrase contains Task 351 and equals NEXT_TASK_351_APPROVAL_PHRASE', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
      assert.ok(view.nextTaskApprovalPhrase.includes('Task 351'));
      assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_351_APPROVAL_PHRASE);
    });
  });

  // ── 추가 검증 ─────────────────────────────────────────────────────────────────

  describe('추가 검증: totalCount, isReadOnly, category, UI/Secret 항목 항상 CERTIFIED_READY', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
        ),
      });
    });

    it('totalOutcomeCertificationItemCount === 33', () => {
      assert.equal(view.totalOutcomeCertificationItemCount, 33);
    });

    it('모든 item isReadOnly === true', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.equal(item.isReadOnly, true);
      }
    });

    it('모든 item actualChangePerformed === false', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });

    it('uiActionLockOutcomeCertificationItems 항상 CERTIFIED_READY', () => {
      for (const item of view.uiActionLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'CERTIFIED_READY');
      }
    });

    it('secretExposureLockOutcomeCertificationItems 항상 CERTIFIED_READY', () => {
      for (const item of view.secretExposureLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'CERTIFIED_READY');
      }
    });

    it('deploymentExecutionLockOutcomeCertificationItems all DEPLOYMENT_EXECUTION_LOCK_OUTCOME category', () => {
      for (const item of view.deploymentExecutionLockOutcomeCertificationItems) {
        assert.equal(item.category, 'DEPLOYMENT_EXECUTION_LOCK_OUTCOME');
      }
    });

    it('naverApiLockOutcomeCertificationItems all NAVER_API_LOCK_OUTCOME category', () => {
      for (const item of view.naverApiLockOutcomeCertificationItems) {
        assert.equal(item.category, 'NAVER_API_LOCK_OUTCOME');
      }
    });

    it('BLOCKED 상태에서도 uiActionLockOutcomeCertificationItems CERTIFIED_READY', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
        ),
      });
      for (const item of blockedView.uiActionLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'CERTIFIED_READY');
      }
    });

    it('BLOCKED 상태에서도 secretExposureLockOutcomeCertificationItems CERTIFIED_READY', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
        ),
      });
      for (const item of blockedView.secretExposureLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'CERTIFIED_READY');
      }
    });

    it('requiresSeparateTask351Approval === true', () => {
      assert.equal(view.requiresSeparateTask351Approval, true);
    });

    it('taskId === 350', () => {
      assert.equal(view.taskId, 350);
    });

    it('status === TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION_VIEW', () => {
      assert.equal(view.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION_VIEW');
    });

    it('isReadOnlyOperatingDeploymentSafetyLockOutcomeCertification === true', () => {
      assert.equal(view.isReadOnlyOperatingDeploymentSafetyLockOutcomeCertification, true);
    });

    it('outcomeCertificationSummaryCards.length === 4', () => {
      assert.equal(view.outcomeCertificationSummaryCards.length, 4);
    });

    it('itemCount 합계 === totalOutcomeCertificationItemCount', () => {
      const sum =
        view.deploymentExecutionLockCertificationItemCount +
        view.vpsServerLockCertificationItemCount +
        view.domainDnsHttpsLockCertificationItemCount +
        view.operatingDbLockCertificationItemCount +
        view.runtimeWorkerQueueAdapterLockCertificationItemCount +
        view.naverApiLockCertificationItemCount +
        view.uiActionLockCertificationItemCount +
        view.secretExposureLockCertificationItemCount;
      assert.equal(sum, view.totalOutcomeCertificationItemCount);
    });

    it('sourceOperatingDeploymentSafetyLockReviewStatus 전파', () => {
      assert.equal(
        view.sourceOperatingDeploymentSafetyLockReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
      );
    });

    it('outcomeCertificationCertifiedReady true when CERTIFIED_READY', () => {
      assert.equal(view.outcomeCertificationCertifiedReady, true);
      assert.equal(view.outcomeCertificationCertifiedPartialReady, false);
      assert.equal(view.outcomeCertificationBlocked, false);
      assert.equal(view.outcomeCertificationNotStarted, false);
    });

    it('outcomeCertificationBlocked true when BLOCKED', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView({
        operatingDeploymentSafetyLockReview: makeTask349View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
        ),
      });
      assert.equal(blockedView.outcomeCertificationBlocked, true);
      assert.equal(blockedView.outcomeCertificationCertifiedReady, false);
    });

    it('각 item에 certificationItemId, sourceLockItemId, category 필드 존재', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.ok(item.certificationItemId.length > 0);
        assert.ok(item.sourceLockItemId.length > 0);
        assert.ok(item.category.length > 0);
      }
    });
  });
});
