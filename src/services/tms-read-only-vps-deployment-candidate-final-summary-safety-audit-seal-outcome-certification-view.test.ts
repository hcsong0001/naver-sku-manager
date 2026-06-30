import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_334_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-final-summary-safety-audit-seal-outcome-certification-view.service';
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

function buildSafetyAuditSealView(statusOverride?: StatusOverride) {
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

  return buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealView({
    vpsDeploymentCandidateFinalSummaryOutcomeCertification: finalSummaryOutcomeCertification,
  });
}

function buildInput(statusOverride?: StatusOverride) {
  return {
    vpsDeploymentCandidateFinalSummarySafetyAuditSeal: buildSafetyAuditSealView(statusOverride),
  };
}

// 1. SEAL_READY → CERTIFIED_READY
test('Task 332 SEAL_READY → Task 333 OUTCOME_CERTIFIED_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
  );
});

// 2. SEAL_PARTIAL_READY → CERTIFIED_PARTIAL_READY
test('SEAL_PARTIAL_READY → OUTCOME_CERTIFIED_PARTIAL_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
      ),
    );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
  );
});

// 3. SEAL_BLOCKED → OUTCOME_BLOCKED
test('SEAL_BLOCKED → OUTCOME_BLOCKED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED'),
    );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
  );
});

// 4. SEAL_NOT_STARTED → OUTCOME_NOT_STARTED
test('SEAL_NOT_STARTED → OUTCOME_NOT_STARTED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED'),
    );
  assert.equal(
    view.vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED',
  );
});

// 5. outcomeCertificationItems 8개 생성
test('outcomeCertificationItems 8개 생성', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.outcomeCertificationItems.length, 8);
});

// 6. readyItemCount / partialReadyItemCount / blockedItemCount / notStartedItemCount
test('readyItemCount 계산 (READY 케이스)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.readyItemCount, 8);
  assert.equal(view.partialReadyItemCount, 0);
  assert.equal(view.blockedItemCount, 0);
  assert.equal(view.notStartedItemCount, 0);
});

test('blockedItemCount 계산 (BLOCKED 케이스)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED'),
    );
  assert.equal(view.blockedItemCount, 8);
  assert.equal(view.readyItemCount, 0);
});

// 7. totalOutcomeCertificationItemCount = 8
test('totalOutcomeCertificationItemCount 8', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.totalOutcomeCertificationItemCount, 8);
});

// 8. finalSummarySafetySealOutcomeCertified true
test('finalSummarySafetySealOutcomeCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.finalSummarySafetySealOutcomeCertified, true);
});

// 9. finalSummarySafetySealItemsCertified true
test('finalSummarySafetySealItemsCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.finalSummarySafetySealItemsCertified, true);
});

// 10. vpsCandidateFlowReadOnlyCompleted true
test('vpsCandidateFlowReadOnlyCompleted true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.vpsCandidateFlowReadOnlyCompleted, true);
});

// 11. vpsCandidateFlowStillDisplayOnly true
test('vpsCandidateFlowStillDisplayOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.vpsCandidateFlowStillDisplayOnly, true);
});

// 12. vpsCandidateFlowSafeForNextReview true
test('vpsCandidateFlowSafeForNextReview true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.vpsCandidateFlowSafeForNextReview, true);
});

// 13. actualVpsServerCreated false
test('actualVpsServerCreated false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualVpsServerCreated, false);
});

// 14. actualVpsConfigChanged false
test('actualVpsConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualVpsConfigChanged, false);
});

// 15. actualProductionTransitionStarted false
test('actualProductionTransitionStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualProductionTransitionStarted, false);
});

// 16. actualDeploymentStarted false
test('actualDeploymentStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualDeploymentStarted, false);
});

// 17. actualDomainConnected false
test('actualDomainConnected false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualDomainConnected, false);
});

// 18. dnsChanged false
test('dnsChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.dnsChanged, false);
});

// 19. sslCertificateIssued false
test('sslCertificateIssued false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.sslCertificateIssued, false);
});

// 20. portForwardingChanged false
test('portForwardingChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.portForwardingChanged, false);
});

// 21. serverConfigChanged false
test('serverConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.serverConfigChanged, false);
});

// 22. operatingDbConnectionChanged false
test('operatingDbConnectionChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.operatingDbConnectionChanged, false);
});

// 23. runtimeConfigured false
test('runtimeConfigured false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.runtimeConfigured, false);
});

// 24. workerStarted false
test('workerStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.workerStarted, false);
});

// 25. queueEnqueued false
test('queueEnqueued false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.queueEnqueued, false);
});

// 26. adapterConnected false
test('adapterConnected false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.adapterConnected, false);
});

// 27. naverApiCalled false
test('Naver API 호출 false (naverApiCalled)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.naverApiCalled, false);
});

// 28. productLookupApiRecalled false
test('상품 조회 API 재호출 false (productLookupApiRecalled)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.productLookupApiRecalled, false);
});

// 29. productUpdateApiCalled false
test('상품 수정 API 호출 false (productUpdateApiCalled)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.productUpdateApiCalled, false);
});

// 30. dbWritePerformed false
test('DB write/upsert/update false (dbWritePerformed)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.dbWritePerformed, false);
});

// 31. envFileReadOrModified false
test('.env/.env.local 열람/수정 false (envFileReadOrModified)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.envFileReadOrModified, false);
});

// 32. deploymentPreparationStillReadOnly true
test('deploymentPreparationStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

// 33. domainConnectionStillReadOnly true
test('domainConnectionStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.domainConnectionStillReadOnly, true);
});

// 34. apiCallStillBlocked true
test('apiCallStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.apiCallStillBlocked, true);
});

// 35. dbWriteStillBlocked true
test('dbWriteStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.dbWriteStillBlocked, true);
});

// 36. workerQueueAdapterStillBlocked true
test('workerQueueAdapterStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

// 37. tokenOrAuthStillHidden true
test('tokenOrAuthStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.tokenOrAuthStillHidden, true);
});

// 38. rawApiResponseStillHidden true
test('rawApiResponseStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.rawApiResponseStillHidden, true);
});

// 39. actualFinalExecutionApprovalGranted / actualExecutionApprovalGranted / actualExecutionStarted false
test('actual final/execution flags false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

// 40. executionButtonAdded false
test('실행 버튼 추가 false (executionButtonAdded)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.executionButtonAdded, false);
});

// 41. submitActionAdded / postApiAdded false
test('POST / submit action false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

// 42. priceChanged / stockChanged false
test('가격/재고 변경 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

// 43. tokenOrAuthValueExposed false
test('Token/Auth/Signature/Authorization 비노출 false (tokenOrAuthValueExposed)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.tokenOrAuthValueExposed, false);
});

// 44. rawApiResponseExposedOrStored false
test('raw API response 비표시/비저장 유지 (rawApiResponseExposedOrStored)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

// 45. Task 334 승인 문구 포함
test('Task 334 승인 문구 포함 (nextTaskApprovalPhrase)', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertificationView(
      buildInput(),
    );
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 334'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_334_APPROVAL_PHRASE);
  assert.equal(view.requiresSeparateTask334Approval, true);
});
