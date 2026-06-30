import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_333_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-view.service';
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

function buildOutcomeCertView(statusOverride?: StatusOverride) {
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

  return buildTmsReadOnlyVpsDeploymentCandidateFinalSummaryOutcomeCertificationView({
    vpsDeploymentCandidateFinalSummary: finalSummary,
  });
}

function buildInput(statusOverride?: StatusOverride) {
  return {
    vpsDeploymentCandidateFinalSummaryOutcomeCertification:
      buildOutcomeCertView(statusOverride),
  };
}

test('Task 331 CERTIFIED_READY → Task 332 SEAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → SEAL_PARTIAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → SEAL_BLOCKED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → SEAL_NOT_STARTED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_NOT_STARTED',
  );
});

test('safetySealItems 8개 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.safetySealItems.length, 8);
});

test('readyItemCount / partialReadyItemCount / blockedItemCount / notStartedItemCount 계산 검증 (READY 케이스)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.readyItemCount, 8);
  assert.equal(view.partialReadyItemCount, 0);
  assert.equal(view.blockedItemCount, 0);
  assert.equal(view.notStartedItemCount, 0);
});

test('totalSafetySealItemCount 8 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.totalSafetySealItemCount, 8);
});

test('finalSummarySafetySealed true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.finalSummarySafetySealed, true);
});

test('finalSummaryItemsSafetySealed true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.finalSummaryItemsSafetySealed, true);
});

test('vpsCandidateFlowReadOnlyCompleted true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.vpsCandidateFlowReadOnlyCompleted, true);
});

test('vpsCandidateFlowStillDisplayOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.vpsCandidateFlowStillDisplayOnly, true);
});

test('vpsCandidateFlowSafeForNextReview true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.vpsCandidateFlowSafeForNextReview, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualProductionTransitionStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualProductionTransitionStarted, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('runtimeConfigured false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.runtimeConfigured, false);
});

test('workerStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.workerStarted, false);
});

test('queueEnqueued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.queueEnqueued, false);
});

test('adapterConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.adapterConnected, false);
});

test('Naver API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.productUpdateApiCalled, false);
});

test('DB write/upsert/update false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.dbWritePerformed, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.envFileReadOrModified, false);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('Task 333 승인 문구 포함', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView(
    buildInput(),
  );
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_333_APPROVAL_PHRASE);
});
