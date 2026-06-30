import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView,
  NEXT_TASK_350_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentSafetyLockReviewView,
} from './tms-read-only-operating-deployment-safety-lock-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-approval-packet-outcome-certification-view.service';

function makeTask348View(
  status:
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED',
): TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION_VIEW',
    taskId: 348,
    taskName: 'TMS Read-Only Operating Deployment Approval Packet Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 승인 패킷 결과 인증',
    description: 'Mock Task 348 view for Task 349 tests',
    currentTaskNumber: 348,
    referenceTaskNumbers: [347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentApprovalPacketReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
    operatingDeploymentApprovalPacketOutcomeCertificationStatus: status,
    approvalPacketOutcomeCertified: true,
    approvalPacketItemsCertified: true,
    approvalPacketOutcomeCertificationStarted: true,
    approvalPacketOutcomeCertificationStillReadOnly: true,
    outcomeCertificationItems: [],
    vpsCreationOutcomeCertificationItems: [],
    runtimeConfigurationOutcomeCertificationItems: [],
    operatingDbOutcomeCertificationItems: [],
    domainDnsHttpsOutcomeCertificationItems: [],
    workerQueueAdapterOutcomeCertificationItems: [],
    naverApiOutcomeCertificationItems: [],
    deploymentExecutionOutcomeCertificationItems: [],
    preExecutionSafetyLockOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    vpsCreationCertificationItemCount: 4,
    runtimeConfigurationCertificationItemCount: 4,
    operatingDbCertificationItemCount: 4,
    domainDnsHttpsCertificationItemCount: 4,
    workerQueueAdapterCertificationItemCount: 4,
    naverApiCertificationItemCount: 4,
    deploymentExecutionCertificationItemCount: 4,
    preExecutionSafetyLockCertificationItemCount: 6,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalOutcomeCertificationItemCount: 34,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_PACKET_CERTIFICATION_ONLY',
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
    approvalPacketStillDisplayOnly: true,
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
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
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentApprovalPacketOutcomeCertification: true,
    requiresSeparateTask349Approval: true,
    nextTaskApprovalPhrase: 'Task 349에서 TMS read-only 운영 배포 Safety Lock 검토 화면 구현을 승인합니다.',
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
  } as unknown as TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
}

describe('TmsReadOnlyOperatingDeploymentSafetyLockReviewView — Task 349', () => {
  // ── 1-4. Status 1:1 mapping ───────────────────────────────────────────────────

  describe('1-4. 1:1 status mapping', () => {
    it('1. Task 348 CERTIFIED_READY → Task 349 SAFETY_LOCK_REVIEW_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
      );
    });

    it('2. Task 348 CERTIFIED_PARTIAL_READY → Task 349 PARTIAL_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY',
      );
    });

    it('3. Task 348 OUTCOME_BLOCKED → Task 349 BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
      );
    });

    it('4. Task 348 OUTCOME_NOT_STARTED → Task 349 NOT_STARTED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED',
        ),
      });
      assert.equal(
        view.operatingDeploymentSafetyLockReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED',
      );
    });
  });

  // ── 5-13. Lock 그룹 생성 검증 ─────────────────────────────────────────────────

  describe('5-13. safetyLockItems 그룹 생성 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('5. safetyLockItems 생성 검증', () => {
      assert.ok(view.safetyLockItems.length > 0);
    });

    it('6. deploymentExecutionLockItems 생성 검증 (4개)', () => {
      assert.equal(view.deploymentExecutionLockItems.length, 4);
    });

    it('7. vpsServerLockItems 생성 검증 (4개)', () => {
      assert.equal(view.vpsServerLockItems.length, 4);
    });

    it('8. domainDnsHttpsLockItems 생성 검증 (4개)', () => {
      assert.equal(view.domainDnsHttpsLockItems.length, 4);
    });

    it('9. operatingDbLockItems 생성 검증 (4개)', () => {
      assert.equal(view.operatingDbLockItems.length, 4);
    });

    it('10. runtimeWorkerQueueAdapterLockItems 생성 검증 (5개)', () => {
      assert.equal(view.runtimeWorkerQueueAdapterLockItems.length, 5);
    });

    it('11. naverApiLockItems 생성 검증 (4개)', () => {
      assert.equal(view.naverApiLockItems.length, 4);
    });

    it('12. uiActionLockItems 생성 검증 (4개)', () => {
      assert.equal(view.uiActionLockItems.length, 4);
    });

    it('13. secretExposureLockItems 생성 검증 (4개)', () => {
      assert.equal(view.secretExposureLockItems.length, 4);
    });
  });

  // ── 14-18. recommended 값 검증 ────────────────────────────────────────────────

  describe('14-18. recommended 값 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('14. recommendedNextStep === OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION', () => {
      assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION');
    });

    it('15. recommendedApprovalMode === SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });

    it('16. recommendedExecutionMode === EXECUTION_STILL_BLOCKED', () => {
      assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });

    it('17. recommendedDeploymentMode === SAFETY_LOCK_REVIEW_ONLY', () => {
      assert.equal(view.recommendedDeploymentMode, 'SAFETY_LOCK_REVIEW_ONLY');
    });

    it('18. recommendedSafetyMode === SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  // ── 19-20. 시작 플래그 true ───────────────────────────────────────────────────

  describe('19-20. 시작 플래그 true', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('19. safetyLockReviewStarted === true', () => {
      assert.equal(view.safetyLockReviewStarted, true);
    });

    it('20. safetyLockStillReadOnly === true', () => {
      assert.equal(view.safetyLockStillReadOnly, true);
    });
  });

  // ── 21-47. actual* false 플래그 ───────────────────────────────────────────────

  describe('21-47. actual* false 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('21. actualApprovalPacketSubmitted === false', () => { assert.equal(view.actualApprovalPacketSubmitted, false); });
    it('22. actualDeploymentApprovalGranted === false', () => { assert.equal(view.actualDeploymentApprovalGranted, false); });
    it('23. actualDeploymentStarted === false', () => { assert.equal(view.actualDeploymentStarted, false); });
    it('24. actualProductionTransitionStarted === false', () => { assert.equal(view.actualProductionTransitionStarted, false); });
    it('25. actualVpsServerCreated === false', () => { assert.equal(view.actualVpsServerCreated, false); });
    it('26. actualVpsConfigChanged === false', () => { assert.equal(view.actualVpsConfigChanged, false); });
    it('27. actualDomainConnected === false', () => { assert.equal(view.actualDomainConnected, false); });
    it('28. dnsChanged === false', () => { assert.equal(view.dnsChanged, false); });
    it('29. dnsRecordCreatedOrModified === false', () => { assert.equal(view.dnsRecordCreatedOrModified, false); });
    it('30. sslCertificateIssued === false', () => { assert.equal(view.sslCertificateIssued, false); });
    it('31. httpsEnabled === false', () => { assert.equal(view.httpsEnabled, false); });
    it('32. runtimeConfigured === false', () => { assert.equal(view.runtimeConfigured, false); });
    it('33. workerStarted === false', () => { assert.equal(view.workerStarted, false); });
    it('34. queueEnqueued === false', () => { assert.equal(view.queueEnqueued, false); });
    it('35. redisOperatingConnectionChanged === false', () => { assert.equal(view.redisOperatingConnectionChanged, false); });
    it('36. adapterConnected === false', () => { assert.equal(view.adapterConnected, false); });
    it('37. operatingDbConnectionChanged === false', () => { assert.equal(view.operatingDbConnectionChanged, false); });
    it('38. databaseUrlChanged === false', () => { assert.equal(view.databaseUrlChanged, false); });
    it('39. envFileReadOrModified === false', () => { assert.equal(view.envFileReadOrModified, false); });
    it('40. dbWritePerformed === false', () => { assert.equal(view.dbWritePerformed, false); });
    it('41. dbBackupExecuted === false', () => { assert.equal(view.dbBackupExecuted, false); });
    it('42. dbRestoreExecuted === false', () => { assert.equal(view.dbRestoreExecuted, false); });
    it('43. rollbackExecuted === false', () => { assert.equal(view.rollbackExecuted, false); });
    it('44. migrationExecuted === false', () => { assert.equal(view.migrationExecuted, false); });
    it('45. naverApiCalled === false', () => { assert.equal(view.naverApiCalled, false); });
    it('46. productLookupApiRecalled === false', () => { assert.equal(view.productLookupApiRecalled, false); });
    it('47. productUpdateApiCalled === false', () => { assert.equal(view.productUpdateApiCalled, false); });
  });

  // ── 48-67. still-blocked true 플래그 ─────────────────────────────────────────

  describe('48-67. still-blocked true 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('48. approvalSubmissionStillBlocked === true', () => { assert.equal(view.approvalSubmissionStillBlocked, true); });
    it('49. deploymentApprovalStillBlocked === true', () => { assert.equal(view.deploymentApprovalStillBlocked, true); });
    it('50. deploymentExecutionStillBlocked === true', () => { assert.equal(view.deploymentExecutionStillBlocked, true); });
    it('51. productionTransitionStillBlocked === true', () => { assert.equal(view.productionTransitionStillBlocked, true); });
    it('52. vpsServerCreationStillBlocked === true', () => { assert.equal(view.vpsServerCreationStillBlocked, true); });
    it('53. vpsConfigChangeStillBlocked === true', () => { assert.equal(view.vpsConfigChangeStillBlocked, true); });
    it('54. runtimeConfigurationStillReadOnly === true', () => { assert.equal(view.runtimeConfigurationStillReadOnly, true); });
    it('55. workerExecutionStillBlocked === true', () => { assert.equal(view.workerExecutionStillBlocked, true); });
    it('56. queueEnqueueStillBlocked === true', () => { assert.equal(view.queueEnqueueStillBlocked, true); });
    it('57. adapterConnectionStillBlocked === true', () => { assert.equal(view.adapterConnectionStillBlocked, true); });
    it('58. domainConnectionStillReadOnly === true', () => { assert.equal(view.domainConnectionStillReadOnly, true); });
    it('59. dnsChangeStillBlocked === true', () => { assert.equal(view.dnsChangeStillBlocked, true); });
    it('60. sslIssueStillBlocked === true', () => { assert.equal(view.sslIssueStillBlocked, true); });
    it('61. operatingDbConnectionStillReadOnly === true', () => { assert.equal(view.operatingDbConnectionStillReadOnly, true); });
    it('62. databaseUrlChangeStillBlocked === true', () => { assert.equal(view.databaseUrlChangeStillBlocked, true); });
    it('63. apiCallStillBlocked === true', () => { assert.equal(view.apiCallStillBlocked, true); });
    it('64. dbWriteStillBlocked === true', () => { assert.equal(view.dbWriteStillBlocked, true); });
    it('65. uiExecutionActionStillBlocked === true', () => { assert.equal(view.uiExecutionActionStillBlocked, true); });
    it('66. tokenOrAuthStillHidden === true', () => { assert.equal(view.tokenOrAuthStillHidden, true); });
    it('67. rawApiResponseStillHidden === true', () => { assert.equal(view.rawApiResponseStillHidden, true); });
  });

  // ── 68-73. 실행/버튼/가격/토큰 false ─────────────────────────────────────────

  describe('68-73. 실행/버튼/가격/토큰 false 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('68. actualFinalExecutionApprovalGranted === false', () => { assert.equal(view.actualFinalExecutionApprovalGranted, false); });
    it('69. executionButtonAdded === false', () => { assert.equal(view.executionButtonAdded, false); });
    it('70. postApiAdded === false && submitActionAdded === false', () => {
      assert.equal(view.postApiAdded, false);
      assert.equal(view.submitActionAdded, false);
    });
    it('71. priceChanged === false && stockChanged === false', () => {
      assert.equal(view.priceChanged, false);
      assert.equal(view.stockChanged, false);
    });
    it('72. tokenOrAuthValueExposed === false', () => { assert.equal(view.tokenOrAuthValueExposed, false); });
    it('73. rawApiResponseExposedOrStored === false', () => { assert.equal(view.rawApiResponseExposedOrStored, false); });
  });

  // ── 74. Task 350 승인 문구 ────────────────────────────────────────────────────

  describe('74. Task 350 승인 문구', () => {
    it('74. nextTaskApprovalPhrase contains Task 350 and equals NEXT_TASK_350_APPROVAL_PHRASE', () => {
      const view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.ok(view.nextTaskApprovalPhrase.includes('Task 350'));
      assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_350_APPROVAL_PHRASE);
    });
  });

  // ── 추가 검증 ─────────────────────────────────────────────────────────────────

  describe('추가 검증: totalCount, isReadOnly, category, UI/SECRET 항목 항상 READY', () => {
    let view: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
        ),
      });
    });

    it('totalSafetyLockItemCount === 33', () => {
      assert.equal(view.totalSafetyLockItemCount, 33);
    });

    it('모든 item isReadOnly === true', () => {
      for (const item of view.safetyLockItems) {
        assert.equal(item.isReadOnly, true);
      }
    });

    it('모든 item actualChangePerformed === false', () => {
      for (const item of view.safetyLockItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });

    it('uiActionLockItems 항상 READY', () => {
      for (const item of view.uiActionLockItems) {
        assert.equal(item.lockStatus, 'READY');
      }
    });

    it('secretExposureLockItems 항상 READY', () => {
      for (const item of view.secretExposureLockItems) {
        assert.equal(item.lockStatus, 'READY');
      }
    });

    it('deploymentExecutionLockItems all DEPLOYMENT_EXECUTION_LOCK category', () => {
      for (const item of view.deploymentExecutionLockItems) {
        assert.equal(item.category, 'DEPLOYMENT_EXECUTION_LOCK');
      }
    });

    it('naverApiLockItems all NAVER_API_LOCK category', () => {
      for (const item of view.naverApiLockItems) {
        assert.equal(item.category, 'NAVER_API_LOCK');
      }
    });

    it('BLOCKED 상태에서도 uiActionLockItems READY', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED',
        ),
      });
      for (const item of blockedView.uiActionLockItems) {
        assert.equal(item.lockStatus, 'READY');
      }
    });

    it('BLOCKED 상태에서도 secretExposureLockItems READY', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED',
        ),
      });
      for (const item of blockedView.secretExposureLockItems) {
        assert.equal(item.lockStatus, 'READY');
      }
    });

    it('requiresSeparateTask350Approval === true', () => {
      assert.equal(view.requiresSeparateTask350Approval, true);
    });

    it('taskId === 349', () => {
      assert.equal(view.taskId, 349);
    });

    it('status === TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_VIEW', () => {
      assert.equal(view.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_VIEW');
    });

    it('isReadOnlyOperatingDeploymentSafetyLockReview === true', () => {
      assert.equal(view.isReadOnlyOperatingDeploymentSafetyLockReview, true);
    });

    it('safetyLockSummaryCards.length === 4', () => {
      assert.equal(view.safetyLockSummaryCards.length, 4);
    });

    it('itemCount 합계 === totalSafetyLockItemCount', () => {
      const sum =
        view.deploymentExecutionLockItemCount +
        view.vpsServerLockItemCount +
        view.domainDnsHttpsLockItemCount +
        view.operatingDbLockItemCount +
        view.runtimeWorkerQueueAdapterLockItemCount +
        view.naverApiLockItemCount +
        view.uiActionLockItemCount +
        view.secretExposureLockItemCount;
      assert.equal(sum, view.totalSafetyLockItemCount);
    });

    it('sourceOperatingDeploymentApprovalPacketOutcomeCertificationStatus 전파', () => {
      assert.equal(
        view.sourceOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
      );
    });

    it('safetyLockReviewReady true when READY', () => {
      assert.equal(view.safetyLockReviewReady, true);
      assert.equal(view.safetyLockReviewPartialReady, false);
      assert.equal(view.safetyLockReviewBlocked, false);
      assert.equal(view.safetyLockReviewNotStarted, false);
    });

    it('safetyLockReviewBlocked true when BLOCKED', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView({
        operatingDeploymentApprovalPacketOutcomeCertification: makeTask348View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED',
        ),
      });
      assert.equal(blockedView.safetyLockReviewBlocked, true);
      assert.equal(blockedView.safetyLockReviewReady, false);
    });
  });
});
