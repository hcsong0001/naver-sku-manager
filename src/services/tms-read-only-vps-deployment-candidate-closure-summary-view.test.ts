import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_335_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView,
} from './tms-read-only-vps-deployment-candidate-closure-summary-view.service';
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
    vpsDeploymentCandidateFinalSummary: finalSummary,
    vpsDeploymentCandidateFinalSummaryOutcomeCertification: finalSummaryOutcomeCertification,
    vpsDeploymentCandidateFinalSummarySafetyAuditSeal: finalSummarySafetyAuditSeal,
    vpsDeploymentCandidateFinalSummarySafetyAuditSealOutcomeCertification:
      finalSummarySafetyAuditSealOutcomeCertification,
  };
}

// 1. 모두 READY 계열 → CLOSURE_SUMMARY_READY
test('Task 322~333 모두 READY 계열이면 Closure Summary READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(
    view.vpsDeploymentCandidateClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_READY',
  );
});

// 2. PARTIAL 계열 (BLOCKED 없음) → PARTIAL_READY
test('하나 이상 PARTIAL 계열이고 BLOCKED 없으면 PARTIAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(
    buildAllViewModels(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_PARTIAL_READY',
  );
});

// 3. BLOCKED 계열 → CLOSURE_SUMMARY_BLOCKED
test('하나 이상 BLOCKED 계열이면 BLOCKED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(
    buildAllViewModels(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_BLOCKED',
  );
});

// 4. NOT_STARTED 계열 → CLOSURE_SUMMARY_NOT_STARTED
test('하나 이상 NOT_STARTED 계열이면 NOT_STARTED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(
    buildAllViewModels(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    ),
  );
  assert.equal(
    view.vpsDeploymentCandidateClosureSummaryStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_CLOSURE_SUMMARY_NOT_STARTED',
  );
});

// 5. closureSummaryItems 12개
test('closureSummaryItems 12개 생성', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.closureSummaryItems.length, 12);
});

// 6. readyItemCount 계산
test('readyItemCount 계산 (READY 케이스)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.readyItemCount, 12);
  assert.equal(view.partialReadyItemCount, 0);
  assert.equal(view.blockedItemCount, 0);
  assert.equal(view.notStartedItemCount, 0);
});

test('blockedItemCount 계산 (BLOCKED 케이스)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(
    buildAllViewModels(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    ),
  );
  assert.equal(view.blockedItemCount, 12);
  assert.equal(view.readyItemCount, 0);
});

// 7. totalClosureItemCount = 12
test('totalClosureItemCount 12', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.totalClosureItemCount, 12);
});

// 8. vpsCandidateFlowClosureCompleted true
test('vpsCandidateFlowClosureCompleted true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowClosureCompleted, true);
});

// 9. vpsCandidateFlowReadOnlyCompleted true
test('vpsCandidateFlowReadOnlyCompleted true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowReadOnlyCompleted, true);
});

// 10. vpsCandidateFlowStillDisplayOnly true
test('vpsCandidateFlowStillDisplayOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowStillDisplayOnly, true);
});

// 11. vpsCandidateFlowSafeForNextReview true
test('vpsCandidateFlowSafeForNextReview true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowSafeForNextReview, true);
});

// 12. vpsCandidateFlowClosedWithoutActualDeployment true
test('vpsCandidateFlowClosedWithoutActualDeployment true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.vpsCandidateFlowClosedWithoutActualDeployment, true);
});

// 13. actualVpsServerCreated false
test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualVpsServerCreated, false);
});

// 14. actualVpsConfigChanged false
test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualVpsConfigChanged, false);
});

// 15. actualProductionTransitionStarted false
test('actualProductionTransitionStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualProductionTransitionStarted, false);
});

// 16. actualDeploymentStarted false
test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualDeploymentStarted, false);
});

// 17. actualDomainConnected false
test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualDomainConnected, false);
});

// 18. dnsChanged false
test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.dnsChanged, false);
});

// 19. sslCertificateIssued false
test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.sslCertificateIssued, false);
});

// 20. portForwardingChanged false
test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.portForwardingChanged, false);
});

// 21. serverConfigChanged false
test('serverConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.serverConfigChanged, false);
});

// 22. operatingDbConnectionChanged false
test('operatingDbConnectionChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.operatingDbConnectionChanged, false);
});

// 23. runtimeConfigured false
test('runtimeConfigured false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.runtimeConfigured, false);
});

// 24. workerStarted false
test('workerStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.workerStarted, false);
});

// 25. queueEnqueued false
test('queueEnqueued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.queueEnqueued, false);
});

// 26. adapterConnected false
test('adapterConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.adapterConnected, false);
});

// 27. naverApiCalled false
test('Naver API 호출 false (naverApiCalled)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.naverApiCalled, false);
});

// 28. productLookupApiRecalled false
test('상품 조회 API 재호출 false (productLookupApiRecalled)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.productLookupApiRecalled, false);
});

// 29. productUpdateApiCalled false
test('상품 수정 API 호출 false (productUpdateApiCalled)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.productUpdateApiCalled, false);
});

// 30. dbWritePerformed false
test('DB write/upsert/update false (dbWritePerformed)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.dbWritePerformed, false);
});

// 31. envFileReadOrModified false
test('.env/.env.local 열람/수정 false (envFileReadOrModified)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.envFileReadOrModified, false);
});

// 32. deploymentPreparationStillReadOnly true
test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

// 33. domainConnectionStillReadOnly true
test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.domainConnectionStillReadOnly, true);
});

// 34. apiCallStillBlocked true
test('apiCallStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.apiCallStillBlocked, true);
});

// 35. dbWriteStillBlocked true
test('dbWriteStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.dbWriteStillBlocked, true);
});

// 36. workerQueueAdapterStillBlocked true
test('workerQueueAdapterStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

// 37. tokenOrAuthStillHidden true
test('tokenOrAuthStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.tokenOrAuthStillHidden, true);
});

// 38. rawApiResponseStillHidden true
test('rawApiResponseStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.rawApiResponseStillHidden, true);
});

// 39. actual final/execution flags false
test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

// 40. executionButtonAdded false
test('실행 버튼 추가 false (executionButtonAdded)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.executionButtonAdded, false);
});

// 41. submitActionAdded / postApiAdded false
test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

// 42. priceChanged / stockChanged false
test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

// 43. tokenOrAuthValueExposed false
test('Token/Auth/Signature/Authorization 비노출 false (tokenOrAuthValueExposed)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.tokenOrAuthValueExposed, false);
});

// 44. rawApiResponseExposedOrStored false
test('raw API response 비표시/비저장 유지 (rawApiResponseExposedOrStored)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

// 45. Task 335 승인 문구 포함
test('Task 335 승인 문구 포함 (nextTaskApprovalPhrase)', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateClosureSummaryView(buildAllViewModels());
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 335'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_335_APPROVAL_PHRASE);
  assert.equal(view.requiresSeparateTask335Approval, true);
});
