import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_339_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView,
} from './tms-read-only-vps-deployment-candidate-final-closure-summary-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-closure-summary-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-closure-summary-safety-audit-seal-view.service';
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

function buildTask337(statusOverride?: StatusOverride) {
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

  const outcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView({
      vpsDeploymentCandidateClosureSummary: closureSummary,
    });

  const closureSummarySafetyAuditSeal =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView({
      vpsDeploymentCandidateClosureSummaryOutcomeCertification: outcomeCertification,
    });

  const closureSummarySafetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateClosureSummarySafetyAuditSeal: closureSummarySafetyAuditSeal,
    });

  return {
    vpsDeploymentCandidateClosureSummary: closureSummary,
    vpsDeploymentCandidateClosureSummaryOutcomeCertification: outcomeCertification,
    vpsDeploymentCandidateClosureSummarySafetyAuditSeal: closureSummarySafetyAuditSeal,
    vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertification:
      closureSummarySafetyAuditSealOutcomeCertification,
  };
}

function buildView(statusOverride?: StatusOverride) {
  return buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView(
    buildTask337(statusOverride),
  );
}

test('Task 337 CERTIFIED_READY → Task 338 FINAL_CLOSURE_SUMMARY_READY', () => {
  const view = buildView();
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → FINAL_CLOSURE_SUMMARY_PARTIAL_READY', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → FINAL_CLOSURE_SUMMARY_BLOCKED', () => {
  const view = buildView('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED');
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → FINAL_CLOSURE_SUMMARY_NOT_STARTED', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_NOT_STARTED',
  );
});

test('Task 322~333 closureSummaryItems 12개 유지', () => {
  const view = buildView();
  assert.equal(view.closureSummaryItems.length, 12);
});

test('Task 334~337 postClosureSummaryItems 4개 생성', () => {
  const view = buildView();
  assert.equal(view.postClosureSummaryItems.length, 4);
});

test('finalClosureSummaryItems 총 16개 생성', () => {
  const view = buildView();
  assert.equal(view.finalClosureSummaryItems.length, 16);
});

test('readyCount / partialReadyCount / blockedCount / notStartedCount 집계 검증', () => {
  const readyView = buildView();
  assert.equal(readyView.readyCount, 16);
  assert.equal(readyView.partialReadyCount, 0);
  assert.equal(readyView.blockedCount, 0);
  assert.equal(readyView.notStartedCount, 0);

  const partialView = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(partialView.readyCount, 0);
  assert.equal(partialView.partialReadyCount, 16);
  assert.equal(partialView.blockedCount, 0);
  assert.equal(partialView.notStartedCount, 0);

  const blockedView = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
  );
  assert.equal(blockedView.readyCount, 0);
  assert.equal(blockedView.partialReadyCount, 0);
  assert.equal(blockedView.blockedCount, 16);
  assert.equal(blockedView.notStartedCount, 0);
});

test('totalFinalClosureTargetCount 16', () => {
  const view = buildView();
  assert.equal(view.totalFinalClosureTargetCount, 16);
});

test('totalClosureTargetCount 12', () => {
  const view = buildView();
  assert.equal(view.totalClosureTargetCount, 12);
});

test('totalPostClosureTargetCount 4', () => {
  const view = buildView();
  assert.equal(view.totalPostClosureTargetCount, 4);
});

test('finalClosureSummaryCompleted true', () => {
  const view = buildView();
  assert.equal(view.finalClosureSummaryCompleted, true);
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

test('isReadOnlyVpsDeploymentCandidateFinalClosureSummary true', () => {
  const view = buildView();
  assert.equal(view.isReadOnlyVpsDeploymentCandidateFinalClosureSummary, true);
});

test('requiresSeparateTask339Approval true', () => {
  const view = buildView();
  assert.equal(view.requiresSeparateTask339Approval, true);
});

test('Task 339 승인 문구 포함', () => {
  const view = buildView();
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 339'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_339_APPROVAL_PHRASE);
});

test('각 item이 read-only이고 actualChangePerformed false인지 확인', () => {
  const view = buildView();
  assert.ok(
    view.finalClosureSummaryItems.every(
      (item) => item.isReadOnly === true && item.actualChangePerformed === false,
    ),
  );
});

test('Task 334~337 후속 항목 category가 올바른지 확인', () => {
  const view = buildView();
  assert.deepEqual(
    view.postClosureSummaryItems.map((item) => item.category),
    [
      'CLOSURE_SUMMARY',
      'CLOSURE_OUTCOME_CERTIFICATION',
      'CLOSURE_SAFETY_AUDIT_SEAL',
      'CLOSURE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION',
    ],
  );
});
