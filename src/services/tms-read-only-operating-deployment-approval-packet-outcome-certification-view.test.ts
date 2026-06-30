import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView,
  NEXT_TASK_349_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-approval-packet-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewView,
} from './tms-read-only-operating-deployment-approval-packet-review-view.service';

function makeTask347View(
  status:
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED'
    | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED',
): TmsReadOnlyOperatingDeploymentApprovalPacketReviewView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_VIEW',
    taskId: 347,
    taskName: 'TMS Read-Only Operating Deployment Approval Packet Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 승인 패킷 검토',
    description: 'Mock Task 347 view for Task 348 tests',
    currentTaskNumber: 347,
    referenceTaskNumbers: [346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
    operatingDeploymentApprovalPacketReviewStatus: status,
    approvalPacketReviewReady:
      status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
    approvalPacketReviewPartialReady:
      status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY',
    approvalPacketReviewBlocked:
      status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED',
    approvalPacketReviewNotStarted:
      status === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED',
    approvalPacketReviewStarted: true,
    approvalPacketStillReadOnly: true,
    approvalPacketItems: [],
    vpsCreationApprovalItems: [],
    runtimeConfigurationApprovalItems: [],
    operatingDbApprovalItems: [],
    domainDnsHttpsApprovalItems: [],
    workerQueueAdapterApprovalItems: [],
    naverApiApprovalItems: [],
    deploymentExecutionApprovalItems: [],
    preExecutionSafetyLockItems: [],
    approvalPacketSummaryCards: [],
    readyApprovalItems: [],
    partialReadyApprovalItems: [],
    blockedApprovalItems: [],
    notStartedApprovalItems: [],
    vpsCreationApprovalItemCount: 4,
    runtimeConfigurationApprovalItemCount: 4,
    operatingDbApprovalItemCount: 4,
    domainDnsHttpsApprovalItemCount: 4,
    workerQueueAdapterApprovalItemCount: 4,
    naverApiApprovalItemCount: 4,
    deploymentExecutionApprovalItemCount: 4,
    preExecutionSafetyLockItemCount: 6,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalPacketItemCount: 34,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_PACKET_REVIEW_ONLY',
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
    isReadOnlyOperatingDeploymentApprovalPacketReview: true,
    requiresSeparateTask348Approval: true,
    nextTaskApprovalPhrase: 'Task 348에서 TMS read-only 운영 배포 승인 패킷 결과 인증 화면 구현을 승인합니다.',
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
  } as unknown as TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
}

describe('TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView — Task 348', () => {
  // ── 1. Status 1:1 mapping ─────────────────────────────────────────────────────

  describe('1. 1:1 status mapping', () => {
    it('1. Task 347 READY → Task 348 CERTIFIED_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY',
      );
    });

    it('2. Task 347 PARTIAL_READY → Task 348 CERTIFIED_PARTIAL_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY',
      );
    });

    it('3. Task 347 BLOCKED → Task 348 OUTCOME_BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED',
      );
    });

    it('4. Task 347 NOT_STARTED → Task 348 OUTCOME_NOT_STARTED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED',
        ),
      });
      assert.equal(
        view.operatingDeploymentApprovalPacketOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED',
      );
    });
  });

  // ── 2-4. outcomeCertificationItems 생성 검증 ──────────────────────────────────

  describe('2-13. outcomeCertificationItems 생성 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('5. outcomeCertificationItems 생성 검증', () => {
      assert.ok(view.outcomeCertificationItems.length > 0);
    });

    it('6. vpsCreationOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.vpsCreationOutcomeCertificationItems.length, 4);
    });

    it('7. runtimeConfigurationOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.runtimeConfigurationOutcomeCertificationItems.length, 4);
    });

    it('8. operatingDbOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.operatingDbOutcomeCertificationItems.length, 4);
    });

    it('9. domainDnsHttpsOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.domainDnsHttpsOutcomeCertificationItems.length, 4);
    });

    it('10. workerQueueAdapterOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.workerQueueAdapterOutcomeCertificationItems.length, 4);
    });

    it('11. naverApiOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.naverApiOutcomeCertificationItems.length, 4);
    });

    it('12. deploymentExecutionOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.deploymentExecutionOutcomeCertificationItems.length, 4);
    });

    it('13. preExecutionSafetyLockOutcomeCertificationItems 생성 검증', () => {
      assert.equal(view.preExecutionSafetyLockOutcomeCertificationItems.length, 6);
    });
  });

  // ── 14-18. recommendedNextStep / Mode 검증 ────────────────────────────────────

  describe('14-18. recommended 값 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('14. recommendedNextStep === OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW', () => {
      assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW');
    });

    it('15. recommendedApprovalMode === SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });

    it('16. recommendedExecutionMode === EXECUTION_STILL_BLOCKED', () => {
      assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });

    it('17. recommendedDeploymentMode === APPROVAL_PACKET_CERTIFICATION_ONLY', () => {
      assert.equal(view.recommendedDeploymentMode, 'APPROVAL_PACKET_CERTIFICATION_ONLY');
    });

    it('18. recommendedSafetyMode === SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  // ── 19-22. Certification 플래그 true ─────────────────────────────────────────

  describe('19-22. 인증 true 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('19. approvalPacketOutcomeCertified === true', () => {
      assert.equal(view.approvalPacketOutcomeCertified, true);
    });

    it('20. approvalPacketItemsCertified === true', () => {
      assert.equal(view.approvalPacketItemsCertified, true);
    });

    it('21. approvalPacketOutcomeCertificationStarted === true', () => {
      assert.equal(view.approvalPacketOutcomeCertificationStarted, true);
    });

    it('22. approvalPacketOutcomeCertificationStillReadOnly === true', () => {
      assert.equal(view.approvalPacketOutcomeCertificationStillReadOnly, true);
    });
  });

  // ── 23-48. actual* false 플래그 ───────────────────────────────────────────────

  describe('23-48. actual* false 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('23. actualApprovalPacketSubmitted === false', () => {
      assert.equal(view.actualApprovalPacketSubmitted, false);
    });

    it('24. actualDeploymentApprovalGranted === false', () => {
      assert.equal(view.actualDeploymentApprovalGranted, false);
    });

    it('25. actualDeploymentStarted === false', () => {
      assert.equal(view.actualDeploymentStarted, false);
    });

    it('26. actualProductionTransitionStarted === false', () => {
      assert.equal(view.actualProductionTransitionStarted, false);
    });

    it('27. actualVpsServerCreated === false', () => {
      assert.equal(view.actualVpsServerCreated, false);
    });

    it('28. actualDomainConnected === false', () => {
      assert.equal(view.actualDomainConnected, false);
    });

    it('29. dnsChanged === false', () => {
      assert.equal(view.dnsChanged, false);
    });

    it('30. dnsRecordCreatedOrModified === false', () => {
      assert.equal(view.dnsRecordCreatedOrModified, false);
    });

    it('31. sslCertificateIssued === false', () => {
      assert.equal(view.sslCertificateIssued, false);
    });

    it('32. httpsEnabled === false', () => {
      assert.equal(view.httpsEnabled, false);
    });

    it('33. runtimeConfigured === false', () => {
      assert.equal(view.runtimeConfigured, false);
    });

    it('34. workerStarted === false', () => {
      assert.equal(view.workerStarted, false);
    });

    it('35. queueEnqueued === false', () => {
      assert.equal(view.queueEnqueued, false);
    });

    it('36. redisOperatingConnectionChanged === false', () => {
      assert.equal(view.redisOperatingConnectionChanged, false);
    });

    it('37. adapterConnected === false', () => {
      assert.equal(view.adapterConnected, false);
    });

    it('38. operatingDbConnectionChanged === false', () => {
      assert.equal(view.operatingDbConnectionChanged, false);
    });

    it('39. databaseUrlChanged === false', () => {
      assert.equal(view.databaseUrlChanged, false);
    });

    it('40. envFileReadOrModified === false', () => {
      assert.equal(view.envFileReadOrModified, false);
    });

    it('41. dbWritePerformed === false', () => {
      assert.equal(view.dbWritePerformed, false);
    });

    it('42. dbBackupExecuted === false', () => {
      assert.equal(view.dbBackupExecuted, false);
    });

    it('43. dbRestoreExecuted === false', () => {
      assert.equal(view.dbRestoreExecuted, false);
    });

    it('44. rollbackExecuted === false', () => {
      assert.equal(view.rollbackExecuted, false);
    });

    it('45. migrationExecuted === false', () => {
      assert.equal(view.migrationExecuted, false);
    });

    it('46. naverApiCalled === false', () => {
      assert.equal(view.naverApiCalled, false);
    });

    it('47. productLookupApiRecalled === false', () => {
      assert.equal(view.productLookupApiRecalled, false);
    });

    it('48. productUpdateApiCalled === false', () => {
      assert.equal(view.productUpdateApiCalled, false);
    });
  });

  // ── 49-65. still-blocked true 플래그 ─────────────────────────────────────────

  describe('49-65. still-blocked true 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('49. approvalSubmissionStillBlocked === true', () => {
      assert.equal(view.approvalSubmissionStillBlocked, true);
    });

    it('50. deploymentApprovalStillBlocked === true', () => {
      assert.equal(view.deploymentApprovalStillBlocked, true);
    });

    it('51. deploymentExecutionStillBlocked === true', () => {
      assert.equal(view.deploymentExecutionStillBlocked, true);
    });

    it('52. productionTransitionStillBlocked === true', () => {
      assert.equal(view.productionTransitionStillBlocked, true);
    });

    it('53. runtimeConfigurationStillReadOnly === true', () => {
      assert.equal(view.runtimeConfigurationStillReadOnly, true);
    });

    it('54. workerExecutionStillBlocked === true', () => {
      assert.equal(view.workerExecutionStillBlocked, true);
    });

    it('55. queueEnqueueStillBlocked === true', () => {
      assert.equal(view.queueEnqueueStillBlocked, true);
    });

    it('56. adapterConnectionStillBlocked === true', () => {
      assert.equal(view.adapterConnectionStillBlocked, true);
    });

    it('57. domainConnectionStillReadOnly === true', () => {
      assert.equal(view.domainConnectionStillReadOnly, true);
    });

    it('58. dnsChangeStillBlocked === true', () => {
      assert.equal(view.dnsChangeStillBlocked, true);
    });

    it('59. sslIssueStillBlocked === true', () => {
      assert.equal(view.sslIssueStillBlocked, true);
    });

    it('60. operatingDbConnectionStillReadOnly === true', () => {
      assert.equal(view.operatingDbConnectionStillReadOnly, true);
    });

    it('61. databaseUrlChangeStillBlocked === true', () => {
      assert.equal(view.databaseUrlChangeStillBlocked, true);
    });

    it('62. apiCallStillBlocked === true', () => {
      assert.equal(view.apiCallStillBlocked, true);
    });

    it('63. dbWriteStillBlocked === true', () => {
      assert.equal(view.dbWriteStillBlocked, true);
    });

    it('64. tokenOrAuthStillHidden === true', () => {
      assert.equal(view.tokenOrAuthStillHidden, true);
    });

    it('65. rawApiResponseStillHidden === true', () => {
      assert.equal(view.rawApiResponseStillHidden, true);
    });
  });

  // ── 66-71. actual final/execution 플래그 false ────────────────────────────────

  describe('66-71. 실행/버튼/가격/토큰 플래그', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('66. actualFinalExecutionApprovalGranted === false', () => {
      assert.equal(view.actualFinalExecutionApprovalGranted, false);
    });

    it('67. executionButtonAdded === false', () => {
      assert.equal(view.executionButtonAdded, false);
    });

    it('68. postApiAdded === false && submitActionAdded === false', () => {
      assert.equal(view.postApiAdded, false);
      assert.equal(view.submitActionAdded, false);
    });

    it('69. priceChanged === false && stockChanged === false', () => {
      assert.equal(view.priceChanged, false);
      assert.equal(view.stockChanged, false);
    });

    it('70. tokenOrAuthValueExposed === false', () => {
      assert.equal(view.tokenOrAuthValueExposed, false);
    });

    it('71. rawApiResponseExposedOrStored === false', () => {
      assert.equal(view.rawApiResponseExposedOrStored, false);
    });
  });

  // ── 72. Task 349 승인 문구 ────────────────────────────────────────────────────

  describe('72. Task 349 승인 문구', () => {
    it('72. nextTaskApprovalPhrase contains Task 349', () => {
      const view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
      assert.ok(view.nextTaskApprovalPhrase.includes('Task 349'));
      assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_349_APPROVAL_PHRASE);
    });
  });

  // ── 추가: totalCount / isReadOnly / category 검증 ─────────────────────────────

  describe('추가 검증: totalCount, isReadOnly, category', () => {
    let view: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
    before(() => {
      view = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
        ),
      });
    });

    it('totalOutcomeCertificationItemCount === 34', () => {
      assert.equal(view.totalOutcomeCertificationItemCount, 34);
    });

    it('모든 item isReadOnly === true', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.equal(item.isReadOnly, true);
      }
    });

    it('모든 item actualApprovalGranted === false', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.equal(item.actualApprovalGranted, false);
      }
    });

    it('모든 item actualChangePerformed === false', () => {
      for (const item of view.outcomeCertificationItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });

    it('preExecutionSafetyLockOutcomeCertificationItems 항상 READY', () => {
      for (const item of view.preExecutionSafetyLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'READY');
      }
    });

    it('vpsCreationOutcomeCertificationItems 모두 VPS_CREATION_APPROVAL_OUTCOME 카테고리', () => {
      for (const item of view.vpsCreationOutcomeCertificationItems) {
        assert.equal(item.category, 'VPS_CREATION_APPROVAL_OUTCOME');
      }
    });

    it('naverApiOutcomeCertificationItems 모두 NAVER_API_APPROVAL_OUTCOME 카테고리', () => {
      for (const item of view.naverApiOutcomeCertificationItems) {
        assert.equal(item.category, 'NAVER_API_APPROVAL_OUTCOME');
      }
    });

    it('BLOCKED 상태: preExecutionSafetyLockOutcomeCertificationItems 여전히 READY', () => {
      const blockedView = buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView({
        operatingDeploymentApprovalPacketReview: makeTask347View(
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED',
        ),
      });
      for (const item of blockedView.preExecutionSafetyLockOutcomeCertificationItems) {
        assert.equal(item.outcomeCertificationStatus, 'READY');
      }
    });

    it('requiresSeparateTask349Approval === true', () => {
      assert.equal(view.requiresSeparateTask349Approval, true);
    });

    it('taskId === 348', () => {
      assert.equal(view.taskId, 348);
    });

    it('status === TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION_VIEW', () => {
      assert.equal(view.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION_VIEW');
    });

    it('isReadOnlyOperatingDeploymentApprovalPacketOutcomeCertification === true', () => {
      assert.equal(view.isReadOnlyOperatingDeploymentApprovalPacketOutcomeCertification, true);
    });

    it('outcomeCertificationSummaryCards.length === 4', () => {
      assert.equal(view.outcomeCertificationSummaryCards.length, 4);
    });

    it('itemCount 합계 === totalOutcomeCertificationItemCount', () => {
      const sum =
        view.vpsCreationCertificationItemCount +
        view.runtimeConfigurationCertificationItemCount +
        view.operatingDbCertificationItemCount +
        view.domainDnsHttpsCertificationItemCount +
        view.workerQueueAdapterCertificationItemCount +
        view.naverApiCertificationItemCount +
        view.deploymentExecutionCertificationItemCount +
        view.preExecutionSafetyLockCertificationItemCount;
      assert.equal(sum, view.totalOutcomeCertificationItemCount);
    });

    it('sourceOperatingDeploymentApprovalPacketReviewStatus 전파', () => {
      assert.equal(
        view.sourceOperatingDeploymentApprovalPacketReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
      );
    });
  });
});
