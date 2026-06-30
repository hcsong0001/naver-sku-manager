import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
  NEXT_TASK_354_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
} from './tms-read-only-operating-deployment-final-approval-boundary-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView,
} from './tms-read-only-operating-deployment-go-no-go-outcome-certification-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

type CertStatus = TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus;

function makeCert352View(
  certStatus: CertStatus,
  certDecision: TmsReadOnlyGoNoGoDecision = 'GO_CANDIDATE_REVIEW_ONLY',
  certDecisionLabel = 'Go 후보 - 최종 승인 경계 검토 전용',
): TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION_VIEW' as any,
    taskId: 352,
    taskName: 'TMS Read-Only Operating Deployment Go/No-Go Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 Go/No-Go 결과 인증',
    description: 'Test cert view',
    currentTaskNumber: 352,
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentGoNoGoReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY' as any,
    sourceRecommendedGoNoGoDecision: certDecision,
    sourceRecommendedGoNoGoDecisionLabel: 'Go 후보 - 검토 전용',
    operatingDeploymentGoNoGoOutcomeCertificationStatus: certStatus,
    goNoGoOutcomeCertified: true,
    goNoGoItemsCertified: true,
    goNoGoOutcomeCertificationStarted: true,
    goNoGoOutcomeCertificationStillReadOnly: true,
    certifiedGoNoGoDecision: certDecision,
    certifiedGoNoGoDecisionLabel: certDecisionLabel,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'GO_NO_GO_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems: [],
    operatingDesignGoNoGoOutcomeCertificationItems: [],
    domainDnsHttpsGoNoGoOutcomeCertificationItems: [],
    operatingDbBackupRollbackGoNoGoOutcomeCertificationItems: [],
    runtimeWorkerQueueAdapterGoNoGoOutcomeCertificationItems: [],
    readinessGoNoGoOutcomeCertificationItems: [],
    approvalPacketGoNoGoOutcomeCertificationItems: [],
    safetyLockGoNoGoOutcomeCertificationItems: [],
    finalDecisionRequirementOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    operatingDesignCertificationItemCount: 4,
    domainDnsHttpsCertificationItemCount: 4,
    operatingDbBackupRollbackCertificationItemCount: 4,
    runtimeWorkerQueueAdapterCertificationItemCount: 5,
    readinessCertificationItemCount: 4,
    approvalPacketCertificationItemCount: 4,
    safetyLockCertificationItemCount: 4,
    finalDecisionRequirementCertificationItemCount: 5,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalOutcomeCertificationItemCount: 34,
    actualFinalExecutionApprovalGranted: false,
    actualGoDecisionGranted: false,
    actualNoGoDecisionGranted: false,
    actualGoNoGoDecisionSaved: false,
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
    goNoGoOutcomeStillReadOnly: true,
    goNoGoDecisionStillReadOnly: true,
    goDecisionStillBlocked: true,
    noGoDecisionStillBlocked: true,
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
    isReadOnlyOperatingDeploymentGoNoGoOutcomeCertification: true,
    requiresSeparateTask353Approval: true,
    nextTaskApprovalPhrase: 'Task 353에서 TMS read-only 운영 배포 최종 승인 경계 검토 화면 구현을 승인합니다.' as any,
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

const statusMap: Record<CertStatus, TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus> = {
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY':
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY':
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_PARTIAL_READY',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED':
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED':
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_NOT_STARTED',
};

const allCertStatuses: CertStatus[] = [
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED',
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED',
];

const allGoNoGoDecisions: TmsReadOnlyGoNoGoDecision[] = [
  'GO_CANDIDATE_REVIEW_ONLY',
  'HOLD_CANDIDATE_REVIEW_ONLY',
  'NO_GO_CANDIDATE_REVIEW_ONLY',
  'NOT_READY_CANDIDATE_REVIEW_ONLY',
];

function buildView(certStatus: CertStatus, decision: TmsReadOnlyGoNoGoDecision = 'GO_CANDIDATE_REVIEW_ONLY'): TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView({
    operatingDeploymentGoNoGoOutcomeCertification: makeCert352View(certStatus, decision),
  });
}

describe('Task 353: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView', () => {

  describe('1. 기본 식별자 및 메타 필드', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('status가 TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_VIEW 이어야 한다', () => {
      assert.equal(view.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_VIEW');
    });
    it('taskId가 353이어야 한다', () => {
      assert.equal(view.taskId, 353);
    });
    it('currentTaskNumber가 353이어야 한다', () => {
      assert.equal(view.currentTaskNumber, 353);
    });
    it('taskName이 정의되어 있어야 한다', () => {
      assert.ok(view.taskName.length > 0);
    });
    it('panelTitle이 정의되어 있어야 한다', () => {
      assert.ok(view.panelTitle.length > 0);
    });
    it('description이 정의되어 있어야 한다', () => {
      assert.ok(view.description.length > 0);
    });
    it('isBatchJobResultDisplayOnly가 true이어야 한다', () => {
      assert.equal(view.isBatchJobResultDisplayOnly, true);
    });
  });

  describe('2. 1:1 Status 매핑 검증', () => {
    for (const certStatus of allCertStatuses) {
      it(`${certStatus} → ${statusMap[certStatus]}`, () => {
        const v = buildView(certStatus);
        assert.equal(v.operatingDeploymentFinalApprovalBoundaryReviewStatus, statusMap[certStatus]);
      });
    }

    it('CERTIFIED_READY → finalApprovalBoundaryReviewReady=true', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
      assert.equal(v.finalApprovalBoundaryReviewReady, true);
      assert.equal(v.finalApprovalBoundaryReviewPartialReady, false);
      assert.equal(v.finalApprovalBoundaryReviewBlocked, false);
      assert.equal(v.finalApprovalBoundaryReviewNotStarted, false);
    });

    it('CERTIFIED_PARTIAL_READY → finalApprovalBoundaryReviewPartialReady=true', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY');
      assert.equal(v.finalApprovalBoundaryReviewReady, false);
      assert.equal(v.finalApprovalBoundaryReviewPartialReady, true);
      assert.equal(v.finalApprovalBoundaryReviewBlocked, false);
      assert.equal(v.finalApprovalBoundaryReviewNotStarted, false);
    });

    it('OUTCOME_BLOCKED → finalApprovalBoundaryReviewBlocked=true', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED');
      assert.equal(v.finalApprovalBoundaryReviewReady, false);
      assert.equal(v.finalApprovalBoundaryReviewPartialReady, false);
      assert.equal(v.finalApprovalBoundaryReviewBlocked, true);
      assert.equal(v.finalApprovalBoundaryReviewNotStarted, false);
    });

    it('OUTCOME_NOT_STARTED → finalApprovalBoundaryReviewNotStarted=true', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED');
      assert.equal(v.finalApprovalBoundaryReviewReady, false);
      assert.equal(v.finalApprovalBoundaryReviewPartialReady, false);
      assert.equal(v.finalApprovalBoundaryReviewBlocked, false);
      assert.equal(v.finalApprovalBoundaryReviewNotStarted, true);
    });
  });

  describe('3. 소스 상태 전파 검증', () => {
    it('sourceOperatingDeploymentGoNoGoOutcomeCertificationStatus가 입력 certStatus와 같아야 한다', () => {
      const certStatus = 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY' as const;
      const v = buildView(certStatus);
      assert.equal(v.sourceOperatingDeploymentGoNoGoOutcomeCertificationStatus, certStatus);
    });

    for (const decision of allGoNoGoDecisions) {
      it(`boundaryCertifiedGoNoGoDecision이 ${decision}로 전파되어야 한다`, () => {
        const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY', decision);
        assert.equal(v.boundaryCertifiedGoNoGoDecision, decision);
        assert.equal(v.sourceCertifiedGoNoGoDecision, decision);
      });
    }

    it('boundaryCertifiedGoNoGoDecisionLabel이 비어있지 않아야 한다', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY', 'GO_CANDIDATE_REVIEW_ONLY');
      assert.ok(v.boundaryCertifiedGoNoGoDecisionLabel.length > 0);
    });
  });

  describe('4. 경계 항목 그룹 수 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('goNoGoBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.goNoGoBoundaryItems.length, 4);
    });
    it('deploymentApprovalBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.deploymentApprovalBoundaryItems.length, 4);
    });
    it('deploymentExecutionBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.deploymentExecutionBoundaryItems.length, 4);
    });
    it('infrastructureBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.infrastructureBoundaryItems.length, 4);
    });
    it('domainDnsHttpsBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.domainDnsHttpsBoundaryItems.length, 4);
    });
    it('operatingDbBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.operatingDbBoundaryItems.length, 4);
    });
    it('runtimeWorkerQueueAdapterBoundaryItems가 5개이어야 한다', () => {
      assert.equal(view.runtimeWorkerQueueAdapterBoundaryItems.length, 5);
    });
    it('apiAndSecretBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.apiAndSecretBoundaryItems.length, 4);
    });
    it('uiActionBoundaryItems가 4개이어야 한다', () => {
      assert.equal(view.uiActionBoundaryItems.length, 4);
    });
    it('finalBoundaryRequirementItems가 4개이어야 한다', () => {
      assert.equal(view.finalBoundaryRequirementItems.length, 4);
    });
    it('totalFinalApprovalBoundaryItemCount가 41이어야 한다 (4+4+4+4+4+4+5+4+4+4)', () => {
      assert.equal(view.totalFinalApprovalBoundaryItemCount, 41);
    });
    it('finalApprovalBoundaryItems 배열 길이도 41이어야 한다', () => {
      assert.equal(view.finalApprovalBoundaryItems.length, 41);
    });
  });

  describe('5. 항목 수 필드 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('goNoGoBoundaryItemCount===4', () => assert.equal(view.goNoGoBoundaryItemCount, 4));
    it('deploymentApprovalBoundaryItemCount===4', () => assert.equal(view.deploymentApprovalBoundaryItemCount, 4));
    it('deploymentExecutionBoundaryItemCount===4', () => assert.equal(view.deploymentExecutionBoundaryItemCount, 4));
    it('infrastructureBoundaryItemCount===4', () => assert.equal(view.infrastructureBoundaryItemCount, 4));
    it('domainDnsHttpsBoundaryItemCount===4', () => assert.equal(view.domainDnsHttpsBoundaryItemCount, 4));
    it('operatingDbBoundaryItemCount===4', () => assert.equal(view.operatingDbBoundaryItemCount, 4));
    it('runtimeWorkerQueueAdapterBoundaryItemCount===5', () => assert.equal(view.runtimeWorkerQueueAdapterBoundaryItemCount, 5));
    it('apiAndSecretBoundaryItemCount===4', () => assert.equal(view.apiAndSecretBoundaryItemCount, 4));
    it('uiActionBoundaryItemCount===4', () => assert.equal(view.uiActionBoundaryItemCount, 4));
    it('finalBoundaryRequirementItemCount===4', () => assert.equal(view.finalBoundaryRequirementItemCount, 4));
  });

  describe('6. 경계 항목 구조 검증 (goNoGoBoundaryItems)', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('모든 goNoGoBoundaryItems의 category가 GO_NO_GO_BOUNDARY이어야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.equal(item.category, 'GO_NO_GO_BOUNDARY');
      }
    });
    it('모든 goNoGoBoundaryItems의 isReadOnly가 true이어야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.equal(item.isReadOnly, true);
      }
    });
    it('모든 goNoGoBoundaryItems의 actualApprovalGranted가 false이어야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.equal(item.actualApprovalGranted, false);
      }
    });
    it('모든 goNoGoBoundaryItems의 actualDecisionSaved가 false이어야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.equal(item.actualDecisionSaved, false);
      }
    });
    it('모든 goNoGoBoundaryItems의 actualChangePerformed가 false이어야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });
    it('모든 goNoGoBoundaryItems의 boundaryItemId가 비어있지 않아야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.ok(item.boundaryItemId.length > 0);
      }
    });
    it('모든 goNoGoBoundaryItems의 label이 비어있지 않아야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.ok(item.label.length > 0);
      }
    });
    it('모든 goNoGoBoundaryItems의 description이 비어있지 않아야 한다', () => {
      for (const item of view.goNoGoBoundaryItems) {
        assert.ok(item.description.length > 0);
      }
    });
  });

  describe('7. 전체 경계 항목 공통 구조 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('모든 항목의 isReadOnly가 true이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        assert.equal(item.isReadOnly, true);
      }
    });
    it('모든 항목의 actualApprovalGranted가 false이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        assert.equal(item.actualApprovalGranted, false);
      }
    });
    it('모든 항목의 actualDecisionSaved가 false이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        assert.equal(item.actualDecisionSaved, false);
      }
    });
    it('모든 항목의 actualChangePerformed가 false이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        assert.equal(item.actualChangePerformed, false);
      }
    });
    it('모든 항목의 boundaryItemId가 고유해야 한다', () => {
      const ids = view.finalApprovalBoundaryItems.map((i) => i.boundaryItemId);
      const uniqueIds = new Set(ids);
      assert.equal(uniqueIds.size, ids.length);
    });
    it('각 항목의 isReady/isPartialReady/isBlocked/isNotStarted가 정확히 하나만 true이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        const trueCount = [item.isReady, item.isPartialReady, item.isBlocked, item.isNotStarted].filter(Boolean).length;
        assert.equal(trueCount, 1);
      }
    });
  });

  describe('8. Ready 케이스: readyBoundaryItems 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('CERTIFIED_READY 시 readyItemCount > 0이어야 한다', () => {
      assert.ok(view.readyItemCount > 0);
    });
    it('CERTIFIED_READY 시 partialReadyItemCount === 0이어야 한다', () => {
      assert.equal(view.partialReadyItemCount, 0);
    });
    it('CERTIFIED_READY 시 blockedItemCount === 0이어야 한다', () => {
      assert.equal(view.blockedItemCount, 0);
    });
    it('CERTIFIED_READY 시 notStartedItemCount === 0이어야 한다', () => {
      assert.equal(view.notStartedItemCount, 0);
    });
    it('readyItemCount + partialReadyItemCount + blockedItemCount + notStartedItemCount === totalFinalApprovalBoundaryItemCount', () => {
      assert.equal(
        view.readyItemCount + view.partialReadyItemCount + view.blockedItemCount + view.notStartedItemCount,
        view.totalFinalApprovalBoundaryItemCount,
      );
    });
  });

  describe('9. Partial Ready 케이스 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY');
    });
    it('CERTIFIED_PARTIAL_READY 시 finalApprovalBoundaryReviewPartialReady === true', () => {
      assert.equal(view.finalApprovalBoundaryReviewPartialReady, true);
    });
    it('CERTIFIED_PARTIAL_READY 시 partialReadyItemCount > 0이어야 한다', () => {
      assert.ok(view.partialReadyItemCount > 0);
    });
    it('카운트 합계 === totalFinalApprovalBoundaryItemCount', () => {
      assert.equal(
        view.readyItemCount + view.partialReadyItemCount + view.blockedItemCount + view.notStartedItemCount,
        view.totalFinalApprovalBoundaryItemCount,
      );
    });
  });

  describe('10. Blocked 케이스 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED');
    });
    it('OUTCOME_BLOCKED 시 finalApprovalBoundaryReviewBlocked === true', () => {
      assert.equal(view.finalApprovalBoundaryReviewBlocked, true);
    });
    it('OUTCOME_BLOCKED 시 blockedItemCount > 0이어야 한다', () => {
      assert.ok(view.blockedItemCount > 0);
    });
    it('카운트 합계 === totalFinalApprovalBoundaryItemCount', () => {
      assert.equal(
        view.readyItemCount + view.partialReadyItemCount + view.blockedItemCount + view.notStartedItemCount,
        view.totalFinalApprovalBoundaryItemCount,
      );
    });
  });

  describe('11. Not Started 케이스 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED');
    });
    it('OUTCOME_NOT_STARTED 시 finalApprovalBoundaryReviewNotStarted === true', () => {
      assert.equal(view.finalApprovalBoundaryReviewNotStarted, true);
    });
    it('OUTCOME_NOT_STARTED 시 notStartedItemCount > 0이어야 한다', () => {
      assert.ok(view.notStartedItemCount > 0);
    });
    it('카운트 합계 === totalFinalApprovalBoundaryItemCount', () => {
      assert.equal(
        view.readyItemCount + view.partialReadyItemCount + view.blockedItemCount + view.notStartedItemCount,
        view.totalFinalApprovalBoundaryItemCount,
      );
    });
  });

  describe('12. 고정 read-only 플래그 검증 (true 플래그)', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('finalApprovalBoundaryReviewStarted === true', () => assert.equal(view.finalApprovalBoundaryReviewStarted, true));
    it('finalApprovalBoundaryStillReadOnly === true', () => assert.equal(view.finalApprovalBoundaryStillReadOnly, true));
    it('finalApprovalStillReadOnly === true', () => assert.equal(view.finalApprovalStillReadOnly, true));
    it('finalApprovalStillBlocked === true', () => assert.equal(view.finalApprovalStillBlocked, true));
    it('goNoGoDecisionStillReadOnly === true', () => assert.equal(view.goNoGoDecisionStillReadOnly, true));
    it('goDecisionStillBlocked === true', () => assert.equal(view.goDecisionStillBlocked, true));
    it('noGoDecisionStillBlocked === true', () => assert.equal(view.noGoDecisionStillBlocked, true));
    it('approvalSubmissionStillBlocked === true', () => assert.equal(view.approvalSubmissionStillBlocked, true));
    it('deploymentApprovalStillBlocked === true', () => assert.equal(view.deploymentApprovalStillBlocked, true));
    it('deploymentExecutionStillBlocked === true', () => assert.equal(view.deploymentExecutionStillBlocked, true));
    it('productionTransitionStillBlocked === true', () => assert.equal(view.productionTransitionStillBlocked, true));
    it('vpsServerCreationStillBlocked === true', () => assert.equal(view.vpsServerCreationStillBlocked, true));
    it('vpsConfigChangeStillBlocked === true', () => assert.equal(view.vpsConfigChangeStillBlocked, true));
    it('runtimeConfigurationStillReadOnly === true', () => assert.equal(view.runtimeConfigurationStillReadOnly, true));
    it('workerExecutionStillBlocked === true', () => assert.equal(view.workerExecutionStillBlocked, true));
    it('queueEnqueueStillBlocked === true', () => assert.equal(view.queueEnqueueStillBlocked, true));
    it('adapterConnectionStillBlocked === true', () => assert.equal(view.adapterConnectionStillBlocked, true));
    it('domainConnectionStillReadOnly === true', () => assert.equal(view.domainConnectionStillReadOnly, true));
    it('dnsChangeStillBlocked === true', () => assert.equal(view.dnsChangeStillBlocked, true));
    it('sslIssueStillBlocked === true', () => assert.equal(view.sslIssueStillBlocked, true));
    it('operatingDbConnectionStillReadOnly === true', () => assert.equal(view.operatingDbConnectionStillReadOnly, true));
    it('databaseUrlChangeStillBlocked === true', () => assert.equal(view.databaseUrlChangeStillBlocked, true));
    it('apiCallStillBlocked === true', () => assert.equal(view.apiCallStillBlocked, true));
    it('dbWriteStillBlocked === true', () => assert.equal(view.dbWriteStillBlocked, true));
    it('uiExecutionActionStillBlocked === true', () => assert.equal(view.uiExecutionActionStillBlocked, true));
    it('tokenOrAuthStillHidden === true', () => assert.equal(view.tokenOrAuthStillHidden, true));
    it('rawApiResponseStillHidden === true', () => assert.equal(view.rawApiResponseStillHidden, true));
    it('isReadOnlyOperatingDeploymentFinalApprovalBoundaryReview === true', () => assert.equal(view.isReadOnlyOperatingDeploymentFinalApprovalBoundaryReview, true));
    it('requiresSeparateTask354Approval === true', () => assert.equal(view.requiresSeparateTask354Approval, true));
  });

  describe('13. 고정 false 플래그 검증 (실제 실행 금지)', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('actualFinalApprovalGranted === false', () => assert.equal(view.actualFinalApprovalGranted, false));
    it('actualDeploymentApprovalGranted === false', () => assert.equal(view.actualDeploymentApprovalGranted, false));
    it('actualDeploymentStarted === false', () => assert.equal(view.actualDeploymentStarted, false));
    it('actualProductionTransitionStarted === false', () => assert.equal(view.actualProductionTransitionStarted, false));
    it('actualGoDecisionGranted === false', () => assert.equal(view.actualGoDecisionGranted, false));
    it('actualNoGoDecisionGranted === false', () => assert.equal(view.actualNoGoDecisionGranted, false));
    it('actualGoNoGoDecisionSaved === false', () => assert.equal(view.actualGoNoGoDecisionSaved, false));
    it('actualApprovalPacketSubmitted === false', () => assert.equal(view.actualApprovalPacketSubmitted, false));
    it('actualVpsServerCreated === false', () => assert.equal(view.actualVpsServerCreated, false));
    it('actualVpsConfigChanged === false', () => assert.equal(view.actualVpsConfigChanged, false));
    it('actualDomainConnected === false', () => assert.equal(view.actualDomainConnected, false));
    it('dnsChanged === false', () => assert.equal(view.dnsChanged, false));
    it('dnsRecordCreatedOrModified === false', () => assert.equal(view.dnsRecordCreatedOrModified, false));
    it('sslCertificateIssued === false', () => assert.equal(view.sslCertificateIssued, false));
    it('httpsEnabled === false', () => assert.equal(view.httpsEnabled, false));
    it('portForwardingChanged === false', () => assert.equal(view.portForwardingChanged, false));
    it('serverConfigChanged === false', () => assert.equal(view.serverConfigChanged, false));
    it('runtimeConfigured === false', () => assert.equal(view.runtimeConfigured, false));
    it('workerStarted === false', () => assert.equal(view.workerStarted, false));
    it('queueEnqueued === false', () => assert.equal(view.queueEnqueued, false));
    it('redisOperatingConnectionChanged === false', () => assert.equal(view.redisOperatingConnectionChanged, false));
    it('adapterConnected === false', () => assert.equal(view.adapterConnected, false));
    it('operatingDbConnectionChanged === false', () => assert.equal(view.operatingDbConnectionChanged, false));
    it('databaseUrlChanged === false', () => assert.equal(view.databaseUrlChanged, false));
    it('envFileReadOrModified === false', () => assert.equal(view.envFileReadOrModified, false));
    it('dbWritePerformed === false', () => assert.equal(view.dbWritePerformed, false));
    it('dbBackupExecuted === false', () => assert.equal(view.dbBackupExecuted, false));
    it('dbRestoreExecuted === false', () => assert.equal(view.dbRestoreExecuted, false));
    it('rollbackExecuted === false', () => assert.equal(view.rollbackExecuted, false));
    it('migrationExecuted === false', () => assert.equal(view.migrationExecuted, false));
    it('naverApiCalled === false', () => assert.equal(view.naverApiCalled, false));
    it('productLookupApiRecalled === false', () => assert.equal(view.productLookupApiRecalled, false));
    it('productUpdateApiCalled === false', () => assert.equal(view.productUpdateApiCalled, false));
    it('actualExecutionApprovalGranted === false', () => assert.equal(view.actualExecutionApprovalGranted, false));
    it('actualExecutionStarted === false', () => assert.equal(view.actualExecutionStarted, false));
    it('executionButtonAdded === false', () => assert.equal(view.executionButtonAdded, false));
    it('submitActionAdded === false', () => assert.equal(view.submitActionAdded, false));
    it('postApiAdded === false', () => assert.equal(view.postApiAdded, false));
    it('priceChanged === false', () => assert.equal(view.priceChanged, false));
    it('stockChanged === false', () => assert.equal(view.stockChanged, false));
    it('tokenOrAuthValueExposed === false', () => assert.equal(view.tokenOrAuthValueExposed, false));
    it('rawApiResponseExposedOrStored === false', () => assert.equal(view.rawApiResponseExposedOrStored, false));
  });

  describe('14. Recommended 필드 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('recommendedNextStep === OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION', () => {
      assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION');
    });
    it('recommendedApprovalMode === SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });
    it('recommendedExecutionMode === EXECUTION_STILL_BLOCKED', () => {
      assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });
    it('recommendedDeploymentMode === FINAL_APPROVAL_BOUNDARY_REVIEW_ONLY', () => {
      assert.equal(view.recommendedDeploymentMode, 'FINAL_APPROVAL_BOUNDARY_REVIEW_ONLY');
    });
    it('recommendedSafetyMode === SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  describe('15. NEXT_TASK_354_APPROVAL_PHRASE 검증', () => {
    it('NEXT_TASK_354_APPROVAL_PHRASE가 정의되어 있어야 한다', () => {
      assert.ok(NEXT_TASK_354_APPROVAL_PHRASE.length > 0);
    });
    it('NEXT_TASK_354_APPROVAL_PHRASE가 Task 354를 언급해야 한다', () => {
      assert.ok(NEXT_TASK_354_APPROVAL_PHRASE.includes('Task 354'));
    });
    it('NEXT_TASK_354_APPROVAL_PHRASE가 read-only를 언급해야 한다', () => {
      assert.ok(NEXT_TASK_354_APPROVAL_PHRASE.includes('read-only'));
    });
    it('view.nextTaskApprovalPhrase === NEXT_TASK_354_APPROVAL_PHRASE', () => {
      const v = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
      assert.equal(v.nextTaskApprovalPhrase, NEXT_TASK_354_APPROVAL_PHRASE);
    });
  });

  describe('16. boundarySummaryCards 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('boundarySummaryCards 길이가 4이어야 한다', () => {
      assert.equal(view.boundarySummaryCards.length, 4);
    });
    it('모든 boundarySummaryCards의 label이 비어있지 않아야 한다', () => {
      for (const card of view.boundarySummaryCards) {
        assert.ok(card.label.length > 0);
      }
    });
    it('모든 boundarySummaryCards의 value가 비어있지 않아야 한다', () => {
      for (const card of view.boundarySummaryCards) {
        assert.ok(card.value.length > 0);
      }
    });
    it('모든 boundarySummaryCards의 tone이 positive/neutral/warning 중 하나이어야 한다', () => {
      const validTones = ['positive', 'neutral', 'warning'];
      for (const card of view.boundarySummaryCards) {
        assert.ok(validTones.includes(card.tone));
      }
    });
  });

  describe('17. 카테고리별 경계 항목 구조 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('deploymentApprovalBoundaryItems의 category가 DEPLOYMENT_APPROVAL_BOUNDARY이어야 한다', () => {
      for (const item of view.deploymentApprovalBoundaryItems) {
        assert.equal(item.category, 'DEPLOYMENT_APPROVAL_BOUNDARY');
      }
    });
    it('deploymentExecutionBoundaryItems의 category가 DEPLOYMENT_EXECUTION_BOUNDARY이어야 한다', () => {
      for (const item of view.deploymentExecutionBoundaryItems) {
        assert.equal(item.category, 'DEPLOYMENT_EXECUTION_BOUNDARY');
      }
    });
    it('infrastructureBoundaryItems의 category가 INFRASTRUCTURE_BOUNDARY이어야 한다', () => {
      for (const item of view.infrastructureBoundaryItems) {
        assert.equal(item.category, 'INFRASTRUCTURE_BOUNDARY');
      }
    });
    it('domainDnsHttpsBoundaryItems의 category가 DOMAIN_DNS_HTTPS_BOUNDARY이어야 한다', () => {
      for (const item of view.domainDnsHttpsBoundaryItems) {
        assert.equal(item.category, 'DOMAIN_DNS_HTTPS_BOUNDARY');
      }
    });
    it('operatingDbBoundaryItems의 category가 OPERATING_DB_BOUNDARY이어야 한다', () => {
      for (const item of view.operatingDbBoundaryItems) {
        assert.equal(item.category, 'OPERATING_DB_BOUNDARY');
      }
    });
    it('runtimeWorkerQueueAdapterBoundaryItems의 category가 RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY이어야 한다', () => {
      for (const item of view.runtimeWorkerQueueAdapterBoundaryItems) {
        assert.equal(item.category, 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY');
      }
    });
    it('apiAndSecretBoundaryItems의 category가 API_AND_SECRET_BOUNDARY이어야 한다', () => {
      for (const item of view.apiAndSecretBoundaryItems) {
        assert.equal(item.category, 'API_AND_SECRET_BOUNDARY');
      }
    });
    it('uiActionBoundaryItems의 category가 UI_ACTION_BOUNDARY이어야 한다', () => {
      for (const item of view.uiActionBoundaryItems) {
        assert.equal(item.category, 'UI_ACTION_BOUNDARY');
      }
    });
    it('finalBoundaryRequirementItems의 category가 FINAL_BOUNDARY_REQUIREMENT이어야 한다', () => {
      for (const item of view.finalBoundaryRequirementItems) {
        assert.equal(item.category, 'FINAL_BOUNDARY_REQUIREMENT');
      }
    });
  });

  describe('18. Go/No-Go 결정 조합 전파 검증', () => {
    for (const certStatus of allCertStatuses) {
      for (const decision of allGoNoGoDecisions) {
        it(`status=${certStatus.slice(-8)}, decision=${decision} → 정상 빌드`, () => {
          const v = buildView(certStatus, decision);
          assert.equal(v.boundaryCertifiedGoNoGoDecision, decision);
          assert.equal(v.operatingDeploymentFinalApprovalBoundaryReviewStatus, statusMap[certStatus]);
        });
      }
    }
  });

  describe('19. 하위 그룹 항목 배열 분류 정확성', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('readyBoundaryItems의 모든 항목이 isReady === true이어야 한다', () => {
      for (const item of view.readyBoundaryItems) {
        assert.equal(item.isReady, true);
      }
    });
    it('partialReadyBoundaryItems의 모든 항목이 isPartialReady === true이어야 한다', () => {
      for (const item of view.partialReadyBoundaryItems) {
        assert.equal(item.isPartialReady, true);
      }
    });
    it('blockedBoundaryItems의 모든 항목이 isBlocked === true이어야 한다', () => {
      for (const item of view.blockedBoundaryItems) {
        assert.equal(item.isBlocked, true);
      }
    });
    it('notStartedBoundaryItems의 모든 항목이 isNotStarted === true이어야 한다', () => {
      for (const item of view.notStartedBoundaryItems) {
        assert.equal(item.isNotStarted, true);
      }
    });
  });

  describe('20. sourceTaskId 검증', () => {
    let view: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView;
    before(() => {
      view = buildView('TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY');
    });
    it('모든 항목의 sourceTaskId가 352 또는 353이어야 한다', () => {
      for (const item of view.finalApprovalBoundaryItems) {
        assert.ok(item.sourceTaskId === 352 || item.sourceTaskId === 353);
      }
    });
  });
});
