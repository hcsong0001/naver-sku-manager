import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_331_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView,
} from './tms-read-only-vps-deployment-candidate-final-summary-view.service';
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

function buildAllViewModels(statusOverride?: StatusOverride) {
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

  return {
    vpsDeploymentCandidateDetailReview: detailReview,
    vpsDeploymentCandidateDetailReviewOutcomeCertification: detailReviewOutcomeCertification,
    vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: safetyAuditSealOutcomeCertification,
    vpsDeploymentCandidateReadinessReview: readinessReview,
    vpsDeploymentCandidateReadinessReviewOutcomeCertification: readinessReviewOutcomeCertification,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSeal: readinessReviewSafetyAuditSeal,
    vpsDeploymentCandidateReadinessReviewSafetyAuditSealOutcomeCertification:
      readinessReviewSafetyAuditSealOutcomeCertification,
  };
}

test('Task 322~329 모두 READY 계열이면 Final Summary READY', () => {
  const vms = buildAllViewModels();
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(vms);
  assert.equal(
    view.vpsDeploymentCandidateFinalSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_READY',
  );
});

test('하나 이상 PARTIAL 계열이고 BLOCKED가 없으면 PARTIAL_READY', () => {
  const vms = buildAllViewModels(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(vms);
  assert.equal(
    view.vpsDeploymentCandidateFinalSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY',
  );
});

test('하나 이상 BLOCKED 계열이면 BLOCKED', () => {
  const vms = buildAllViewModels(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
  );
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(vms);
  assert.equal(
    view.vpsDeploymentCandidateFinalSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_BLOCKED',
  );
});

test('하나 이상 NOT_STARTED 계열이면 NOT_STARTED', () => {
  const vms = buildAllViewModels(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  );
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(vms);
  assert.equal(
    view.vpsDeploymentCandidateFinalSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_NOT_STARTED',
  );
});

test('finalSummaryItems 8개 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.finalSummaryItems.length, 8);
});

test('readyItemCount / partialReadyItemCount / blockedItemCount / notStartedItemCount 계산 검증 (READY 케이스)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.readyItemCount, 8);
  assert.equal(view.partialReadyItemCount, 0);
  assert.equal(view.blockedItemCount, 0);
  assert.equal(view.notStartedItemCount, 0);
});

test('totalSummaryItemCount 8 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.totalSummaryItemCount, 8);
});

test('vpsCandidateFlowReadOnlyCompleted true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowReadOnlyCompleted, true);
});

test('vpsCandidateFlowStillDisplayOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowStillDisplayOnly, true);
});

test('vpsCandidateFlowSafeForNextReview true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowSafeForNextReview, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualProductionTransitionStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualProductionTransitionStarted, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('runtimeConfigured false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.runtimeConfigured, false);
});

test('workerStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.workerStarted, false);
});

test('queueEnqueued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.queueEnqueued, false);
});

test('adapterConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.adapterConnected, false);
});

test('Naver API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.productUpdateApiCalled, false);
});

test('DB write/upsert/update false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.dbWritePerformed, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.envFileReadOrModified, false);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('Task 331 승인 문구 포함', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryView(buildAllViewModels());
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_331_APPROVAL_PHRASE);
});
