import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_337_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-closure-summary-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView } from './tms-read-only-vps-deployment-candidate-closure-summary-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-final-summary-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView } from './tms-read-only-vps-deployment-candidate-final-summary-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-readiness-review-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-readiness-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView } from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

type StatusOverride = Parameters<
  typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView
>[0]['deploymentTargetEnvironmentSelectionComparison']['deploymentTargetEnvironmentSelectionComparisonStatus'];

function buildOutcomeCertification(statusOverride?: StatusOverride) {
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

  const detailReviewOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView({
      vpsDeploymentCandidateDetailReview: detailReview,
    });

  const safetyAuditSeal = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: detailReviewOutcomeCertification,
  });

  const safetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
    });

  const readinessReview = buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: safetyAuditSealOutcomeCertification,
  });

  const readinessReviewOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: readinessReview,
    });

  const readinessReviewSafetyAuditSeal =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealView({
      vpsDeploymentCandidateReadinessReviewOutcomeCertification:
        readinessReviewOutcomeCertification,
    });

  const readinessReviewSafetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: readinessReviewSafetyAuditSeal,
    });

  const finalSummary = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView({
    vpsDeploymentCandidateDetailReview: detailReview,
    vpsDeploymentCandidateDetailReviewOutcomeCertification: detailReviewOutcomeCertification,
    vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: safetyAuditSealOutcomeCertification,
    vpsDeploymentCandidateReadinessReview: readinessReview,
    vpsDeploymentCandidateReadinessReviewOutcomeCertification: readinessReviewOutcomeCertification,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: readinessReviewSafetyAuditSeal,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification:
      readinessReviewSafetyAuditSealOutcomeCertification,
  });

  const finalSummaryOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView({
      vpsDeploymentCandidateFinalSummary: finalSummary,
    });

  const finalSummarySafetyAuditSeal =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView({
      vpsDeploymentCandidateFinalSummaryOutcomeCertification: finalSummaryOutcomeCertification,
    });

  const finalSummarySafetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateFinalSummarySafetyAuditSeal: finalSummarySafetyAuditSeal,
    });

  const closureSummary = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView({
    vpsDeploymentCandidateDetailReview: detailReview,
    vpsDeploymentCandidateDetailReviewOutcomeCertification: detailReviewOutcomeCertification,
    vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: safetyAuditSealOutcomeCertification,
    vpsDeploymentCandidateReadinessReview: readinessReview,
    vpsDeploymentCandidateReadinessReviewOutcomeCertification: readinessReviewOutcomeCertification,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: readinessReviewSafetyAuditSeal,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification:
      readinessReviewSafetyAuditSealOutcomeCertification,
    vpsDeploymentCandidateFinalSummary: finalSummary,
    vpsDeploymentCandidateFinalSummaryOutcomeCertification: finalSummaryOutcomeCertification,
    vpsDeploymentCandidateFinalSummarySafetyAuditSeal: finalSummarySafetyAuditSeal,
    vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertification:
      finalSummarySafetyAuditSealOutcomeCertification,
  });

  return buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView({
    vpsDeploymentCandidateClosureSummary: closureSummary,
  });
}

function buildView(statusOverride?: StatusOverride) {
  return buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView({
    vpsDeploymentCandidateClosureSummaryOutcomeCertification:
      buildOutcomeCertification(statusOverride),
  });
}

test('Task 335 CERTIFIED_READY → Task 336 SEAL_READY', () => {
  const view = buildView();
  assert.equal(
    view.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → SEAL_PARTIAL_READY', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(
    view.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → SEAL_BLOCKED', () => {
  const view = buildView('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED');
  assert.equal(
    view.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → SEAL_NOT_STARTED', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  );
  assert.equal(
    view.vpsDeploymentCandidateClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED',
  );
});

test('Task 322~333 closureSummaryItems 12개 유지', () => {
  const view = buildView();
  assert.equal(view.closureSummaryItems.length, 12);
});

test('readyCount / partialReadyCount / blockedCount / notStartedCount 전달 검증', () => {
  const readyView = buildView();
  assert.equal(readyView.readyCount, 12);
  assert.equal(readyView.partialReadyCount, 0);
  assert.equal(readyView.blockedCount, 0);
  assert.equal(readyView.notStartedCount, 0);

  const blockedView = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
  );
  assert.equal(blockedView.readyCount, 0);
  assert.equal(blockedView.partialReadyCount, 0);
  assert.equal(blockedView.blockedCount, 12);
  assert.equal(blockedView.notStartedCount, 0);
});

test('closureSummarySafetySealed true', () => {
  const view = buildView();
  assert.equal(view.closureSummarySafetySealed, true);
});

test('vpsCandidateFlowClosureCompleted true', () => {
  const view = buildView();
  assert.equal(view.vpsCandidateFlowClosureCompleted, true);
});

test('vpsCandidateFlowReadOnlyCompleted true', () => {
  const view = buildView();
  assert.equal(view.vpsCandidateFlowReadOnlyCompleted, true);
});

test('vpsCandidateFlowStillDisplayOnly true', () => {
  const view = buildView();
  assert.equal(view.vpsCandidateFlowStillDisplayOnly, true);
});

test('vpsCandidateFlowSafeForNextReview true', () => {
  const view = buildView();
  assert.equal(view.vpsCandidateFlowSafeForNextReview, true);
});

test('vpsCandidateFlowClosedWithoutActualDeployment true', () => {
  const view = buildView();
  assert.equal(view.vpsCandidateFlowClosedWithoutActualDeployment, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildView();
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildView();
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualProductionTransitionStarted false', () => {
  const view = buildView();
  assert.equal(view.actualProductionTransitionStarted, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildView();
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildView();
  assert.equal(view.actualDomainConnected, false);
});

test('runtimeConfigured false', () => {
  const view = buildView();
  assert.equal(view.runtimeConfigured, false);
});

test('workerStarted false', () => {
  const view = buildView();
  assert.equal(view.workerStarted, false);
});

test('queueEnqueued false', () => {
  const view = buildView();
  assert.equal(view.queueEnqueued, false);
});

test('adapterConnected false', () => {
  const view = buildView();
  assert.equal(view.adapterConnected, false);
});

test('naverApiCalled false', () => {
  const view = buildView();
  assert.equal(view.naverApiCalled, false);
});

test('productLookupApiRecalled false', () => {
  const view = buildView();
  assert.equal(view.productLookupApiRecalled, false);
});

test('productUpdateApiCalled false', () => {
  const view = buildView();
  assert.equal(view.productUpdateApiCalled, false);
});

test('dbWritePerformed false', () => {
  const view = buildView();
  assert.equal(view.dbWritePerformed, false);
});

test('envFileReadOrModified false', () => {
  const view = buildView();
  assert.equal(view.envFileReadOrModified, false);
});

test('actual final/execution flags false', () => {
  const view = buildView();
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildView();
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildView();
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('가격/재고 변경 false', () => {
  const view = buildView();
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildView();
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildView();
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('isReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSeal true', () => {
  const view = buildView();
  assert.equal(view.isReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSeal, true);
});

test('requiresSeparateTask337Approval true', () => {
  const view = buildView();
  assert.equal(view.requiresSeparateTask337Approval, true);
});

test('Task 337 승인 문구 포함', () => {
  const view = buildView();
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 337'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_337_APPROVAL_PHRASE);
});

test('safetySealItems가 12개 이상 생성되는지 확인', () => {
  const view = buildView();
  assert.ok(view.safetySealItems.length >= 12);
});

test('각 item이 read-only이고 actualChangePerformed false인지 확인', () => {
  const view = buildView();
  assert.ok(
    view.safetySealItems.every(
      (item) => item.isReadOnly === true && item.actualChangePerformed === false,
    ),
  );
});
