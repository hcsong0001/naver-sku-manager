import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_341_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-final-closure-summary-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-final-closure-summary-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView } from './tms-read-only-vps-deployment-candidate-final-closure-summary-view.service';
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

function buildTask339(statusOverride?: StatusOverride) {
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
  const closureSummaryOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryOutcomeCertificationView({
      vpsDeploymentCandidateClosureSummary: closureSummary,
    });
  const closureSummarySafetyAuditSeal =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealView({
      vpsDeploymentCandidateClosureSummaryOutcomeCertification:
        closureSummaryOutcomeCertification,
    });
  const closureSummarySafetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateClosureSummarySafetyAuditSeal: closureSummarySafetyAuditSeal,
    });
  const finalClosureSummary = buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryView({
    vpsDeploymentCandidateClosureSummary: closureSummary,
    vpsDeploymentCandidateClosureSummaryOutcomeCertification:
      closureSummaryOutcomeCertification,
    vpsDeploymentCandidateClosureSummarySafetyAuditSeal: closureSummarySafetyAuditSeal,
    vpsDeploymentCandidateClosureSummarySafetyAuditSealOutcomeCertification:
      closureSummarySafetyAuditSealOutcomeCertification,
  });

  return buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryOutcomeCertificationView({
    vpsDeploymentCandidateFinalClosureSummary: finalClosureSummary,
  });
}

function buildView(statusOverride?: StatusOverride) {
  return buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealView({
    vpsDeploymentCandidateFinalClosureSummaryOutcomeCertification:
      buildTask339(statusOverride),
  });
}

test('Task 339 CERTIFIED_READY → Task 340 SEAL_READY', () => {
  const view = buildView();
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → SEAL_PARTIAL_READY', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → SEAL_BLOCKED', () => {
  const view = buildView('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED');
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → SEAL_NOT_STARTED', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED',
  );
});

test('safetySealItems 16개 생성 검증', () => {
  const view = buildView();
  assert.equal(view.safetySealItems.length, 16);
});

test('primaryClosureSafetySealItems 12개 생성 검증', () => {
  const view = buildView();
  assert.equal(view.primaryClosureSafetySealItems.length, 12);
});

test('subsequentClosureSafetySealItems 4개 생성 검증', () => {
  const view = buildView();
  assert.equal(view.subsequentClosureSafetySealItems.length, 4);
});

test('readyItemCount / partialReadyItemCount / blockedItemCount / notStartedItemCount 계산 검증', () => {
  const readyView = buildView();
  assert.equal(readyView.readyItemCount, 16);
  assert.equal(readyView.partialReadyItemCount, 0);
  assert.equal(readyView.blockedItemCount, 0);
  assert.equal(readyView.notStartedItemCount, 0);

  const partialView = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(partialView.readyItemCount, 0);
  assert.equal(partialView.partialReadyItemCount, 16);
  assert.equal(partialView.blockedItemCount, 0);
  assert.equal(partialView.notStartedItemCount, 0);
});

test('totalSafetySealItemCount 16 검증', () => {
  const view = buildView();
  assert.equal(view.totalSafetySealItemCount, 16);
});

test('finalClosureSummarySafetySealed true', () => {
  const view = buildView();
  assert.equal(view.finalClosureSummarySafetySealed, true);
});

test('finalClosureSummaryItemsSafetySealed true', () => {
  const view = buildView();
  assert.equal(view.finalClosureSummaryItemsSafetySealed, true);
});

test('primaryClosureItemsSafetySealed true', () => {
  const view = buildView();
  assert.equal(view.primaryClosureItemsSafetySealed, true);
});

test('subsequentClosureItemsSafetySealed true', () => {
  const view = buildView();
  assert.equal(view.subsequentClosureItemsSafetySealed, true);
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

test('dnsChanged false', () => {
  const view = buildView();
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildView();
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildView();
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildView();
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view = buildView();
  assert.equal(view.operatingDbConnectionChanged, false);
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

test('Naver API 호출 false', () => {
  const view = buildView();
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view = buildView();
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view = buildView();
  assert.equal(view.productUpdateApiCalled, false);
});

test('DB write/upsert/update false', () => {
  const view = buildView();
  assert.equal(view.dbWritePerformed, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildView();
  assert.equal(view.envFileReadOrModified, false);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildView();
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildView();
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view = buildView();
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view = buildView();
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view = buildView();
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view = buildView();
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view = buildView();
  assert.equal(view.rawApiResponseStillHidden, true);
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

test('Task 341 승인 문구 포함', () => {
  const view = buildView();
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 341'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_341_APPROVAL_PHRASE);
});

test('각 봉인 항목이 read-only이고 actualChangePerformed false인지 확인', () => {
  const view = buildView();
  assert.ok(
    view.safetySealItems.every(
      (item) => item.isReadOnly === true && item.actualChangePerformed === false,
    ),
  );
});
