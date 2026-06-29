import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_327_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeReadinessInput(
  statusOverride?: Parameters<
    typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView
  >[0]['deploymentTargetEnvironmentSelectionComparison']['deploymentTargetEnvironmentSelectionComparisonStatus'],
) {
  const detailReview = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView({
    deploymentTargetEnvironmentSelectionComparison: {
      deploymentTargetEnvironmentSelectionComparisonStatus:
        statusOverride ??
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY',
      recommendedEnvironmentKey: 'VPS',
      recommendedEnvironmentLabel: 'VPS',
      candidateFlowReadOnlyClosed: true,
    },
  });

  const outcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView({
      vpsDeploymentCandidateDetailReview: detailReview,
    });

  const safetyAuditSeal = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: outcomeCertification,
  });

  return buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
    vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
  });
}

test('Task 325 CERTIFIED_READY → Task 326 READINESS_REVIEW_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → READINESS_REVIEW_PARTIAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → READINESS_REVIEW_BLOCKED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → READINESS_REVIEW_NOT_STARTED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_NOT_STARTED',
  );
});

test('vpsCandidateReadinessReviewCompleted true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.vpsCandidateReadinessReviewCompleted, true);
});

test('completedItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.ok(view.completedItems.length > 0);
  assert.ok(view.completedItems.every((item) => item.isCompleted));
  assert.ok(view.completedItems.every((item) => item.reviewState === 'COMPLETED'));
});

test('blockedItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.ok(view.blockedItems.length > 0);
  assert.ok(view.blockedItems.every((item) => item.isBlocked));
  assert.ok(view.blockedItems.every((item) => item.reviewState === 'BLOCKED'));
});

test('pendingApprovalItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.ok(view.pendingApprovalItems.length > 0);
  assert.ok(view.pendingApprovalItems.every((item) => item.isPendingApproval));
  assert.ok(view.pendingApprovalItems.every((item) => item.reviewState === 'PENDING_APPROVAL'));
});

test('allReadinessItems = completedItems + blockedItems + pendingApprovalItems', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(
    view.allReadinessItems.length,
    view.completedItems.length + view.blockedItems.length + view.pendingApprovalItems.length,
  );
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('isCurrentlyDeploymentReadinessReview true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.isCurrentlyDeploymentReadinessReview, true);
});

test('isNotActualDeploymentStart true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.isNotActualDeploymentStart, true);
});

test('isNotActualProductionTransition true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.isNotActualProductionTransition, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.portForwardingChanged, false);
});

test('runtimeConfigured false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.runtimeConfigured, false);
});

test('workerConnected / queueConnected / adapterConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.workerConnected, false);
  assert.equal(view.queueConnected, false);
  assert.equal(view.adapterConnected, false);
});

test('tokenIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.tokenIssued, false);
});

test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('Naver API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회/수정 API false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.productLookupApiRecalled, false);
  assert.equal(view.productUpdateApiCalled, false);
});

test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('DB write false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.dbWritePerformed, false);
});

test('Worker / Queue / Adapter 연결 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.workerStarted, false);
  assert.equal(view.queueEnqueued, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.envFileReadOrModified, false);
});

test('Task 327 승인 문구 포함', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_327_APPROVAL_PHRASE);
});

test('readinessReviewSummaryCards 4개', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: makeReadinessInput(),
  });
  assert.equal(view.readinessReviewSummaryCards.length, 4);
});
