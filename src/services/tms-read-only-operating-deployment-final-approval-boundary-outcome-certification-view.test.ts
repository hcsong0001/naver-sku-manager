import { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView,
  NEXT_TASK_355_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-boundary-outcome-certification-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
} from './tms-read-only-operating-deployment-final-approval-boundary-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView,
} from './tms-read-only-operating-deployment-go-no-go-outcome-certification-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

type Task352Status =
  TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus;

function makeTask352View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
): TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView {
  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION_VIEW',
    taskId: 352,
    taskName:
      'TMS Read-Only Operating Deployment Go/No-Go Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 Go/No-Go 결과 인증',
    description: 'Task 354 테스트용 Task 352 View',
    currentTaskNumber: 352,
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentGoNoGoReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY' as const,
    sourceRecommendedGoNoGoDecision: certDecision,
    sourceRecommendedGoNoGoDecisionLabel: certDecisionLabel,
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
    nextTaskApprovalPhrase: 'Task 353 승인 문구',
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

function buildTask353View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
): TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView({
    operatingDeploymentGoNoGoOutcomeCertification: makeTask352View(
      certStatus,
      certDecision,
      certDecisionLabel,
    ),
  });
}

function buildTask354View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
) {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView(
    {
      operatingDeploymentFinalApprovalBoundaryReview: buildTask353View(
        certStatus,
        certDecision,
        certDecisionLabel,
      ),
    },
  );
}

let viewReady: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView;
let viewPartialReady: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView;
let viewBlocked: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView;
let viewNotStarted: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView;

describe(
  'buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView',
  () => {
    before(() => {
      viewReady = buildTask354View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY',
        'GO_CANDIDATE_REVIEW_ONLY',
        'Go 후보 - 최종 승인 경계 검토 전용',
      );
      viewPartialReady = buildTask354View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY',
        'HOLD_CANDIDATE_REVIEW_ONLY',
        'Hold 후보 - 최종 승인 경계 검토 전용',
      );
      viewBlocked = buildTask354View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED',
        'NO_GO_CANDIDATE_REVIEW_ONLY',
        'No-Go 후보 - 최종 승인 경계 검토 전용',
      );
      viewNotStarted = buildTask354View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED',
        'NOT_READY_CANDIDATE_REVIEW_ONLY',
        '준비 미완료 후보 - 최종 승인 경계 검토 전용',
      );
    });

    it('1. Task 353 READY → Task 354 CERTIFIED_READY', () => {
      assert.equal(
        viewReady.operatingDeploymentFinalApprovalBoundaryOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
      );
    });

    it('2. PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
      assert.equal(
        viewPartialReady.operatingDeploymentFinalApprovalBoundaryOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      );
    });

    it('3. BLOCKED → OUTCOME_BLOCKED', () => {
      assert.equal(
        viewBlocked.operatingDeploymentFinalApprovalBoundaryOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_BLOCKED',
      );
    });

    it('4. NOT_STARTED → OUTCOME_NOT_STARTED', () => {
      assert.equal(
        viewNotStarted.operatingDeploymentFinalApprovalBoundaryOutcomeCertificationStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED',
      );
    });

    it('5. outcomeCertifiedGoNoGoDecision 전파 검증', () => {
      assert.equal(viewReady.outcomeCertifiedGoNoGoDecision, 'GO_CANDIDATE_REVIEW_ONLY');
    });

    it('6. outcomeCertifiedGoNoGoDecisionLabel 전파 검증', () => {
      assert.equal(
        viewReady.outcomeCertifiedGoNoGoDecisionLabel,
        'Go 후보 - 최종 승인 경계 검토 전용',
      );
    });

    it('7. 10개 outcome certification group 생성 검증', () => {
      assert.equal(viewReady.goNoGoBoundaryOutcomeCertificationItems.length > 0, true);
      assert.equal(
        viewReady.deploymentApprovalBoundaryOutcomeCertificationItems.length > 0,
        true,
      );
      assert.equal(
        viewReady.deploymentExecutionBoundaryOutcomeCertificationItems.length > 0,
        true,
      );
      assert.equal(
        viewReady.infrastructureBoundaryOutcomeCertificationItems.length > 0,
        true,
      );
      assert.equal(
        viewReady.domainDnsHttpsBoundaryOutcomeCertificationItems.length > 0,
        true,
      );
      assert.equal(viewReady.operatingDbBoundaryOutcomeCertificationItems.length > 0, true);
      assert.equal(
        viewReady.runtimeWorkerQueueAdapterBoundaryOutcomeCertificationItems.length >
          0,
        true,
      );
      assert.equal(viewReady.apiAndSecretBoundaryOutcomeCertificationItems.length > 0, true);
      assert.equal(viewReady.uiActionBoundaryOutcomeCertificationItems.length > 0, true);
      assert.equal(
        viewReady.finalBoundaryRequirementOutcomeCertificationItems.length > 0,
        true,
      );
    });

    it('8. 총 인증 항목 수 41개 검증', () => {
      assert.equal(viewReady.totalFinalApprovalBoundaryOutcomeCertificationItemCount, 41);
    });

    it('9. recommendedNextStep = OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_REVIEW', () => {
      assert.equal(
        viewReady.recommendedNextStep,
        'OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_REVIEW',
      );
    });

    it('10. recommendedApprovalMode = SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(
        viewReady.recommendedApprovalMode,
        'SEPARATE_USER_APPROVAL_REQUIRED',
      );
    });

    it('11. recommendedExecutionMode = EXECUTION_STILL_BLOCKED', () => {
      assert.equal(viewReady.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });

    it('12. recommendedDeploymentMode = FINAL_APPROVAL_BOUNDARY_CERTIFICATION_ONLY', () => {
      assert.equal(
        viewReady.recommendedDeploymentMode,
        'FINAL_APPROVAL_BOUNDARY_CERTIFICATION_ONLY',
      );
    });

    it('13. recommendedSafetyMode = SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(
        viewReady.recommendedSafetyMode,
        'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
      );
    });

    it('14. finalApprovalBoundaryOutcomeCertified true', () => {
      assert.equal(viewReady.finalApprovalBoundaryOutcomeCertified, true);
    });

    it('15. finalApprovalBoundaryItemsCertified true', () => {
      assert.equal(viewReady.finalApprovalBoundaryItemsCertified, true);
    });

    it('16. actualFinalApprovalGranted false', () => {
      assert.equal(viewReady.actualFinalApprovalGranted, false);
    });

    it('17. actualDeploymentApprovalGranted false', () => {
      assert.equal(viewReady.actualDeploymentApprovalGranted, false);
    });

    it('18. actualDeploymentStarted false', () => {
      assert.equal(viewReady.actualDeploymentStarted, false);
    });

    it('19. actualGoDecisionGranted false', () => {
      assert.equal(viewReady.actualGoDecisionGranted, false);
    });

    it('20. actualNoGoDecisionGranted false', () => {
      assert.equal(viewReady.actualNoGoDecisionGranted, false);
    });

    it('21. actualGoNoGoDecisionSaved false', () => {
      assert.equal(viewReady.actualGoNoGoDecisionSaved, false);
    });

    it('22. actualVpsServerCreated false', () => {
      assert.equal(viewReady.actualVpsServerCreated, false);
    });

    it('23. actualDomainConnected false', () => {
      assert.equal(viewReady.actualDomainConnected, false);
    });

    it('24. dnsChanged false', () => {
      assert.equal(viewReady.dnsChanged, false);
    });

    it('25. sslCertificateIssued false', () => {
      assert.equal(viewReady.sslCertificateIssued, false);
    });

    it('26. runtimeConfigured false', () => {
      assert.equal(viewReady.runtimeConfigured, false);
    });

    it('27. workerStarted false', () => {
      assert.equal(viewReady.workerStarted, false);
    });

    it('28. queueEnqueued false', () => {
      assert.equal(viewReady.queueEnqueued, false);
    });

    it('29. adapterConnected false', () => {
      assert.equal(viewReady.adapterConnected, false);
    });

    it('30. operatingDbConnectionChanged false', () => {
      assert.equal(viewReady.operatingDbConnectionChanged, false);
    });

    it('31. databaseUrlChanged false', () => {
      assert.equal(viewReady.databaseUrlChanged, false);
    });

    it('32. envFileReadOrModified false', () => {
      assert.equal(viewReady.envFileReadOrModified, false);
    });

    it('33. dbWritePerformed false', () => {
      assert.equal(viewReady.dbWritePerformed, false);
    });

    it('34. naverApiCalled false', () => {
      assert.equal(viewReady.naverApiCalled, false);
    });

    it('35. productLookupApiRecalled false', () => {
      assert.equal(viewReady.productLookupApiRecalled, false);
    });

    it('36. productUpdateApiCalled false', () => {
      assert.equal(viewReady.productUpdateApiCalled, false);
    });

    it('37. executionButtonAdded false', () => {
      assert.equal(viewReady.executionButtonAdded, false);
    });

    it('38. submitActionAdded false', () => {
      assert.equal(viewReady.submitActionAdded, false);
    });

    it('39. postApiAdded false', () => {
      assert.equal(viewReady.postApiAdded, false);
    });

    it('40. priceChanged false', () => {
      assert.equal(viewReady.priceChanged, false);
    });

    it('41. stockChanged false', () => {
      assert.equal(viewReady.stockChanged, false);
    });

    it('42. tokenOrAuthValueExposed false', () => {
      assert.equal(viewReady.tokenOrAuthValueExposed, false);
    });

    it('43. rawApiResponseExposedOrStored false', () => {
      assert.equal(viewReady.rawApiResponseExposedOrStored, false);
    });

    it('44. Task 355 승인 문구 포함', () => {
      assert.equal(viewReady.nextTaskApprovalPhrase, NEXT_TASK_355_APPROVAL_PHRASE);
      assert.match(viewReady.nextTaskApprovalPhrase, /Task 355/);
    });
  },
);
