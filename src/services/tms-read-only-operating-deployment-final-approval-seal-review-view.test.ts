import { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-boundary-outcome-certification-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView,
} from './tms-read-only-operating-deployment-final-approval-boundary-review-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-packet-outcome-certification-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalPacketReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalPacketReviewView,
} from './tms-read-only-operating-deployment-final-approval-packet-review-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView,
  NEXT_TASK_358_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView,
} from './tms-read-only-operating-deployment-final-approval-seal-review-view.service';
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
    description: 'Task 357 테스트용 Task 352 View',
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
): TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryOutcomeCertificationView {
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

function buildTask355View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
): TmsReadOnlyOperatingDeploymentFinalApprovalPacketReviewView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalPacketReviewView({
    operatingDeploymentFinalApprovalBoundaryOutcomeCertification: buildTask354View(
      certStatus,
      certDecision,
      certDecisionLabel,
    ),
  });
}

function buildTask356View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
): TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView(
    {
      operatingDeploymentFinalApprovalPacketReview: buildTask355View(
        certStatus,
        certDecision,
        certDecisionLabel,
      ),
    },
  );
}

function buildTask357View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
) {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView({
    operatingDeploymentFinalApprovalPacketOutcomeCertification: buildTask356View(
      certStatus,
      certDecision,
      certDecisionLabel,
    ),
  });
}

let viewReady: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView;
let viewPartialReady: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView;
let viewBlocked: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView;
let viewNotStarted: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView;

describe(
  'buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView',
  () => {
    before(() => {
      viewReady = buildTask357View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY',
        'GO_CANDIDATE_REVIEW_ONLY',
        'Go 후보 - Seal 소스 전파 검증',
      );
      viewPartialReady = buildTask357View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY',
        'HOLD_CANDIDATE_REVIEW_ONLY',
        'Hold 후보 - Seal 소스 전파 검증',
      );
      viewBlocked = buildTask357View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED',
        'NO_GO_CANDIDATE_REVIEW_ONLY',
        'No-Go 후보 - Seal 소스 전파 검증',
      );
      viewNotStarted = buildTask357View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED',
        'NOT_READY_CANDIDATE_REVIEW_ONLY',
        '준비 미완료 후보 - Seal 소스 전파 검증',
      );
    });

    it('1. Task 356 CERTIFIED_READY → Task 357 READY', () => {
      assert.equal(
        viewReady.operatingDeploymentFinalApprovalSealReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY',
      );
    });

    it('2. CERTIFIED_PARTIAL_READY → PARTIAL_READY', () => {
      assert.equal(
        viewPartialReady.operatingDeploymentFinalApprovalSealReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY',
      );
    });

    it('3. OUTCOME_BLOCKED → BLOCKED', () => {
      assert.equal(
        viewBlocked.operatingDeploymentFinalApprovalSealReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED',
      );
    });

    it('4. OUTCOME_NOT_STARTED → NOT_STARTED', () => {
      assert.equal(
        viewNotStarted.operatingDeploymentFinalApprovalSealReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED',
      );
    });

    it('5. sealCertifiedGoNoGoDecision 전파 검증', () => {
      assert.equal(
        viewReady.sealCertifiedGoNoGoDecision,
        'GO_CANDIDATE_REVIEW_ONLY',
      );
    });

    it('6. sealCertifiedGoNoGoDecisionLabel 전파 검증', () => {
      assert.equal(
        viewReady.sealCertifiedGoNoGoDecisionLabel,
        viewReady.sourceOutcomeCertifiedGoNoGoDecisionLabel,
      );
      assert.equal(
        viewReady.sealCertifiedGoNoGoDecisionLabel,
        'Go 후보 - 최종 승인 경계 검토 전용',
      );
    });

    it('7. 10개 seal group 생성 검증', () => {
      assert.equal(viewReady.finalApprovalSealLockItems.length, 4);
      assert.equal(viewReady.deploymentApprovalSealLockItems.length, 4);
      assert.equal(viewReady.deploymentExecutionSealLockItems.length, 4);
      assert.equal(viewReady.infrastructureSealLockItems.length, 4);
      assert.equal(viewReady.domainDnsHttpsSealLockItems.length, 4);
      assert.equal(viewReady.operatingDbSealLockItems.length, 4);
      assert.equal(viewReady.runtimeWorkerQueueAdapterSealLockItems.length, 5);
      assert.equal(viewReady.apiAndSecretSealLockItems.length, 5);
      assert.equal(viewReady.uiActionSealLockItems.length, 4);
      assert.equal(viewReady.finalSealRequirementItems.length, 4);
      assert.equal(viewReady.totalFinalApprovalSealItemCount, 42);
    });

    it('8. recommendedNextStep = OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFICATION', () => {
      assert.equal(
        viewReady.recommendedNextStep,
        'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFICATION',
      );
    });

    it('9. recommendedApprovalMode = SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(
        viewReady.recommendedApprovalMode,
        'SEPARATE_USER_APPROVAL_REQUIRED',
      );
    });

    it('10. recommendedExecutionMode = EXECUTION_STILL_BLOCKED', () => {
      assert.equal(
        viewReady.recommendedExecutionMode,
        'EXECUTION_STILL_BLOCKED',
      );
    });

    it('11. recommendedDeploymentMode = FINAL_APPROVAL_SEAL_REVIEW_ONLY', () => {
      assert.equal(
        viewReady.recommendedDeploymentMode,
        'FINAL_APPROVAL_SEAL_REVIEW_ONLY',
      );
    });

    it('12. recommendedSafetyMode = SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(
        viewReady.recommendedSafetyMode,
        'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
      );
    });

    it('13. finalApprovalSealReviewStarted true', () => {
      assert.equal(viewReady.finalApprovalSealReviewStarted, true);
    });

    it('14. finalApprovalSealStillReadOnly true', () => {
      assert.equal(viewReady.finalApprovalSealStillReadOnly, true);
    });

    it('15. finalApprovalSealStillLocked true', () => {
      assert.equal(viewReady.finalApprovalSealStillLocked, true);
    });

    it('16. actualFinalApprovalGranted false', () => {
      assert.equal(viewReady.actualFinalApprovalGranted, false);
    });

    it('17. actualFinalApprovalPacketSubmitted false', () => {
      assert.equal(viewReady.actualFinalApprovalPacketSubmitted, false);
    });

    it('18. actualDeploymentApprovalGranted false', () => {
      assert.equal(viewReady.actualDeploymentApprovalGranted, false);
    });

    it('19. actualDeploymentStarted false', () => {
      assert.equal(viewReady.actualDeploymentStarted, false);
    });

    it('20. actualGoDecisionGranted false', () => {
      assert.equal(viewReady.actualGoDecisionGranted, false);
    });

    it('21. actualNoGoDecisionGranted false', () => {
      assert.equal(viewReady.actualNoGoDecisionGranted, false);
    });

    it('22. actualGoNoGoDecisionSaved false', () => {
      assert.equal(viewReady.actualGoNoGoDecisionSaved, false);
    });

    it('23. actualVpsServerCreated false', () => {
      assert.equal(viewReady.actualVpsServerCreated, false);
    });

    it('24. actualDomainConnected false', () => {
      assert.equal(viewReady.actualDomainConnected, false);
    });

    it('25. dnsChanged false', () => {
      assert.equal(viewReady.dnsChanged, false);
    });

    it('26. sslCertificateIssued false', () => {
      assert.equal(viewReady.sslCertificateIssued, false);
    });

    it('27. runtimeConfigured false', () => {
      assert.equal(viewReady.runtimeConfigured, false);
    });

    it('28. workerStarted false', () => {
      assert.equal(viewReady.workerStarted, false);
    });

    it('29. queueEnqueued false', () => {
      assert.equal(viewReady.queueEnqueued, false);
    });

    it('30. adapterConnected false', () => {
      assert.equal(viewReady.adapterConnected, false);
    });

    it('31. operatingDbConnectionChanged false', () => {
      assert.equal(viewReady.operatingDbConnectionChanged, false);
    });

    it('32. databaseUrlChanged false', () => {
      assert.equal(viewReady.databaseUrlChanged, false);
    });

    it('33. envFileReadOrModified false', () => {
      assert.equal(viewReady.envFileReadOrModified, false);
    });

    it('34. dbWritePerformed false', () => {
      assert.equal(viewReady.dbWritePerformed, false);
    });

    it('35. naverApiCalled false', () => {
      assert.equal(viewReady.naverApiCalled, false);
    });

    it('36. productLookupApiRecalled false', () => {
      assert.equal(viewReady.productLookupApiRecalled, false);
    });

    it('37. productUpdateApiCalled false', () => {
      assert.equal(viewReady.productUpdateApiCalled, false);
    });

    it('38. executionButtonAdded false', () => {
      assert.equal(viewReady.executionButtonAdded, false);
    });

    it('39. submitActionAdded false', () => {
      assert.equal(viewReady.submitActionAdded, false);
    });

    it('40. postApiAdded false', () => {
      assert.equal(viewReady.postApiAdded, false);
    });

    it('41. priceChanged false', () => {
      assert.equal(viewReady.priceChanged, false);
    });

    it('42. stockChanged false', () => {
      assert.equal(viewReady.stockChanged, false);
    });

    it('43. tokenOrAuthValueExposed false', () => {
      assert.equal(viewReady.tokenOrAuthValueExposed, false);
    });

    it('44. rawApiResponseExposedOrStored false', () => {
      assert.equal(viewReady.rawApiResponseExposedOrStored, false);
    });

    it('45. Task 358 승인 문구 포함', () => {
      assert.equal(viewReady.nextTaskApprovalPhrase, NEXT_TASK_358_APPROVAL_PHRASE);
      assert.match(viewReady.nextTaskApprovalPhrase, /Task 358/);
    });
  },
);
