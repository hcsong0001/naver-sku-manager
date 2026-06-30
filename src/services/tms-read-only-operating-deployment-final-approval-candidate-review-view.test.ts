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
  buildTmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView,
  NEXT_TASK_360_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView,
} from './tms-read-only-operating-deployment-final-approval-candidate-review-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-seal-outcome-certification-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView,
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
    description: 'Task 359 테스트용 Task 352 View',
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
): TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView({
    operatingDeploymentFinalApprovalPacketOutcomeCertification: buildTask356View(
      certStatus,
      certDecision,
      certDecisionLabel,
    ),
  });
}

function buildTask358View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
): TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView(
    {
      operatingDeploymentFinalApprovalSealReview: buildTask357View(
        certStatus,
        certDecision,
        certDecisionLabel,
      ),
    },
  );
}

function buildTask359View(
  certStatus: Task352Status,
  certDecision: TmsReadOnlyGoNoGoDecision,
  certDecisionLabel: string,
) {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView({
    operatingDeploymentFinalApprovalSealOutcomeCertification: buildTask358View(
      certStatus,
      certDecision,
      certDecisionLabel,
    ),
  });
}

let viewReady: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView;
let viewPartialReady: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView;
let viewBlocked: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView;
let viewNotStarted: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView;

describe(
  'buildTmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView',
  () => {
    before(() => {
      viewReady = buildTask359View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY',
        'GO_CANDIDATE_REVIEW_ONLY',
        'Go 후보 - Candidate 소스 전파 검증',
      );
      viewPartialReady = buildTask359View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY',
        'HOLD_CANDIDATE_REVIEW_ONLY',
        'Hold 후보 - Candidate 소스 전파 검증',
      );
      viewBlocked = buildTask359View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED',
        'NO_GO_CANDIDATE_REVIEW_ONLY',
        'No-Go 후보 - Candidate 소스 전파 검증',
      );
      viewNotStarted = buildTask359View(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED',
        'NOT_READY_CANDIDATE_REVIEW_ONLY',
        '준비 미완료 후보 - Candidate 소스 전파 검증',
      );
    });

    it('1. Task 358 CERTIFIED_READY → Task 359 READY', () => {
      assert.equal(
        viewReady.operatingDeploymentFinalApprovalCandidateReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY',
      );
    });

    it('2. CERTIFIED_PARTIAL_READY → PARTIAL_READY', () => {
      assert.equal(
        viewPartialReady.operatingDeploymentFinalApprovalCandidateReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY',
      );
    });

    it('3. OUTCOME_BLOCKED → BLOCKED', () => {
      assert.equal(
        viewBlocked.operatingDeploymentFinalApprovalCandidateReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED',
      );
    });

    it('4. OUTCOME_NOT_STARTED → NOT_STARTED', () => {
      assert.equal(
        viewNotStarted.operatingDeploymentFinalApprovalCandidateReviewStatus,
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED',
      );
    });

    it('5. candidateCertifiedGoNoGoDecision 전파 검증', () => {
      assert.equal(
        viewReady.candidateCertifiedGoNoGoDecision,
        'GO_CANDIDATE_REVIEW_ONLY',
      );
    });

    it('6. candidateCertifiedGoNoGoDecisionLabel 전파 검증', () => {
      assert.equal(
        viewReady.candidateCertifiedGoNoGoDecisionLabel,
        viewReady.sourceOutcomeCertifiedGoNoGoDecisionLabel,
      );
      assert.equal(
        viewReady.candidateCertifiedGoNoGoDecisionLabel,
        'Go 후보 - 최종 승인 경계 검토 전용',
      );
    });

    it('7. recommendedFinalApprovalCandidateDecision 검증', () => {
      assert.equal(
        viewReady.recommendedFinalApprovalCandidateDecision,
        'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
      );
    });

    it('8. recommendedFinalApprovalCandidateDecisionLabel 검증', () => {
      assert.equal(
        viewReady.recommendedFinalApprovalCandidateDecisionLabel,
        '최종 승인 후보 - read-only 검토 전용',
      );
    });

    it('9. 12개 candidate group 생성 검증', () => {
      assert.equal(viewReady.candidateReadinessItems.length, 4);
      assert.equal(viewReady.candidateBoundaryItems.length, 4);
      assert.equal(viewReady.candidateSealItems.length, 4);
      assert.equal(viewReady.candidateApprovalPrerequisiteItems.length, 4);
      assert.equal(viewReady.candidateExecutionBlockItems.length, 4);
      assert.equal(viewReady.candidateInfrastructureBlockItems.length, 4);
      assert.equal(viewReady.candidateDomainDnsHttpsBlockItems.length, 4);
      assert.equal(viewReady.candidateOperatingDbBlockItems.length, 4);
      assert.equal(
        viewReady.candidateRuntimeWorkerQueueAdapterBlockItems.length,
        5,
      );
      assert.equal(viewReady.candidateApiAndSecretBlockItems.length, 5);
      assert.equal(viewReady.candidateUiActionBlockItems.length, 4);
      assert.equal(viewReady.candidateFinalRequirementItems.length, 4);
      assert.equal(viewReady.totalFinalApprovalCandidateItemCount, 50);
    });

    it('10. recommendedNextStep = OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION', () => {
      assert.equal(
        viewReady.recommendedNextStep,
        'OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION',
      );
    });

    it('11. recommendedApprovalMode = SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(
        viewReady.recommendedApprovalMode,
        'SEPARATE_USER_APPROVAL_REQUIRED',
      );
    });

    it('12. recommendedExecutionMode = EXECUTION_STILL_BLOCKED', () => {
      assert.equal(
        viewReady.recommendedExecutionMode,
        'EXECUTION_STILL_BLOCKED',
      );
    });

    it('13. recommendedDeploymentMode = FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(
        viewReady.recommendedDeploymentMode,
        'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
      );
    });

    it('14. recommendedSafetyMode = SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(
        viewReady.recommendedSafetyMode,
        'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
      );
    });

    it('15. finalApprovalCandidateReviewStarted true', () => {
      assert.equal(viewReady.finalApprovalCandidateReviewStarted, true);
    });

    it('16. finalApprovalCandidateStillReadOnly true', () => {
      assert.equal(viewReady.finalApprovalCandidateStillReadOnly, true);
    });

    it('17. finalApprovalCandidateStillNotApproved true', () => {
      assert.equal(viewReady.finalApprovalCandidateStillNotApproved, true);
    });

    it('18. actualFinalApprovalGranted false', () => {
      assert.equal(viewReady.actualFinalApprovalGranted, false);
    });

    it('19. actualFinalApprovalCandidateSaved false', () => {
      assert.equal(viewReady.actualFinalApprovalCandidateSaved, false);
    });

    it('20. actualFinalApprovalPacketSubmitted false', () => {
      assert.equal(viewReady.actualFinalApprovalPacketSubmitted, false);
    });

    it('21. actualDeploymentApprovalGranted false', () => {
      assert.equal(viewReady.actualDeploymentApprovalGranted, false);
    });

    it('22. actualDeploymentStarted false', () => {
      assert.equal(viewReady.actualDeploymentStarted, false);
    });

    it('23. actualGoDecisionGranted false', () => {
      assert.equal(viewReady.actualGoDecisionGranted, false);
    });

    it('24. actualNoGoDecisionGranted false', () => {
      assert.equal(viewReady.actualNoGoDecisionGranted, false);
    });

    it('25. actualGoNoGoDecisionSaved false', () => {
      assert.equal(viewReady.actualGoNoGoDecisionSaved, false);
    });

    it('26. actualVpsServerCreated false', () => {
      assert.equal(viewReady.actualVpsServerCreated, false);
    });

    it('27. actualDomainConnected false', () => {
      assert.equal(viewReady.actualDomainConnected, false);
    });

    it('28. dnsChanged false', () => {
      assert.equal(viewReady.dnsChanged, false);
    });

    it('29. sslCertificateIssued false', () => {
      assert.equal(viewReady.sslCertificateIssued, false);
    });

    it('30. runtimeConfigured false', () => {
      assert.equal(viewReady.runtimeConfigured, false);
    });

    it('31. workerStarted false', () => {
      assert.equal(viewReady.workerStarted, false);
    });

    it('32. queueEnqueued false', () => {
      assert.equal(viewReady.queueEnqueued, false);
    });

    it('33. adapterConnected false', () => {
      assert.equal(viewReady.adapterConnected, false);
    });

    it('34. operatingDbConnectionChanged false', () => {
      assert.equal(viewReady.operatingDbConnectionChanged, false);
    });

    it('35. databaseUrlChanged false', () => {
      assert.equal(viewReady.databaseUrlChanged, false);
    });

    it('36. envFileReadOrModified false', () => {
      assert.equal(viewReady.envFileReadOrModified, false);
    });

    it('37. dbWritePerformed false', () => {
      assert.equal(viewReady.dbWritePerformed, false);
    });

    it('38. naverApiCalled false', () => {
      assert.equal(viewReady.naverApiCalled, false);
    });

    it('39. productLookupApiRecalled false', () => {
      assert.equal(viewReady.productLookupApiRecalled, false);
    });

    it('40. productUpdateApiCalled false', () => {
      assert.equal(viewReady.productUpdateApiCalled, false);
    });

    it('41. executionButtonAdded false', () => {
      assert.equal(viewReady.executionButtonAdded, false);
    });

    it('42. submitActionAdded false', () => {
      assert.equal(viewReady.submitActionAdded, false);
    });

    it('43. postApiAdded false', () => {
      assert.equal(viewReady.postApiAdded, false);
    });

    it('44. priceChanged false', () => {
      assert.equal(viewReady.priceChanged, false);
    });

    it('45. stockChanged false', () => {
      assert.equal(viewReady.stockChanged, false);
    });

    it('46. tokenOrAuthValueExposed false', () => {
      assert.equal(viewReady.tokenOrAuthValueExposed, false);
    });

    it('47. rawApiResponseExposedOrStored false', () => {
      assert.equal(viewReady.rawApiResponseExposedOrStored, false);
    });

    it('48. Task 360 승인 문구 포함', () => {
      assert.equal(viewReady.nextTaskApprovalPhrase, NEXT_TASK_360_APPROVAL_PHRASE);
      assert.match(viewReady.nextTaskApprovalPhrase, /Task 360/);
    });
  },
);
