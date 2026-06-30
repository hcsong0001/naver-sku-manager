import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_344_APPROVAL_PHRASE,
  buildTmsReadOnlyDomainDnsHttpsConnectionPlanReviewView,
} from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import { buildTmsReadOnlyOperatingDeploymentDesignReviewView } from './tms-read-only-operating-deployment-design-review-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-final-closure-summary-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-final-closure-summary-safety-audit-seal-view.service';
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

function buildTask342(statusOverride?: StatusOverride) {
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
  const finalClosureSummaryOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummaryOutcomeCertificationView({
      vpsDeploymentCandidateFinalClosureSummary: finalClosureSummary,
    });
  const finalClosureSummarySafetyAuditSeal =
    buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealView({
      vpsDeploymentCandidateFinalClosureSummaryOutcomeCertification:
        finalClosureSummaryOutcomeCertification,
    });
  const finalClosureSummarySafetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationView(
      {
        vpsDeploymentCandidateFinalClosureSummarySafetyAuditSeal:
          finalClosureSummarySafetyAuditSeal,
      },
    );

  return buildTmsReadOnlyOperatingDeploymentDesignReviewView({
    finalClosureSummarySafetyAuditSealOutcomeCertification:
      finalClosureSummarySafetyAuditSealOutcomeCertification,
  });
}

function buildView(statusOverride?: StatusOverride) {
  return buildTmsReadOnlyDomainDnsHttpsConnectionPlanReviewView({
    operatingDeploymentDesignReview: buildTask342(statusOverride),
  });
}

test('Task 342 READY → Task 343 READY', () => {
  const view = buildView();
  assert.equal(
    view.domainDnsHttpsConnectionPlanReviewStatus,
    'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
  );
});

test('PARTIAL_READY → PARTIAL_READY', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  );
  assert.equal(
    view.domainDnsHttpsConnectionPlanReviewStatus,
    'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
  );
});

test('BLOCKED → BLOCKED', () => {
  const view = buildView('TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED');
  assert.equal(
    view.domainDnsHttpsConnectionPlanReviewStatus,
    'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED',
  );
});

test('NOT_STARTED → NOT_STARTED', () => {
  const view = buildView(
    'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  );
  assert.equal(
    view.domainDnsHttpsConnectionPlanReviewStatus,
    'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED',
  );
});

test('domainConnectionPlanItems 생성 검증', () => {
  const view = buildView();
  assert.ok(view.domainConnectionPlanItems.length > 0);
});

test('dnsRecordPlanItems 생성 검증', () => {
  const view = buildView();
  assert.ok(view.dnsRecordPlanItems.length > 0);
});

test('httpsSslPlanItems 생성 검증', () => {
  const view = buildView();
  assert.ok(view.httpsSslPlanItems.length > 0);
});

test('domainPreconditionItems 생성 검증', () => {
  const view = buildView();
  assert.ok(view.domainPreconditionItems.length > 0);
});

test('domainRiskReviewItems 생성 검증', () => {
  const view = buildView();
  assert.ok(view.domainRiskReviewItems.length > 0);
});

test('domainApprovalRequirementItems 생성 검증', () => {
  const view = buildView();
  assert.equal(view.domainApprovalRequirementItems.length, 6);
});

test('recommendedDomainConnectionMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedDomainConnectionMode, 'DOMAIN_CONNECTION_REVIEW_REQUIRED');
});

test('recommendedDnsRecordMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedDnsRecordMode, 'DNS_RECORD_REVIEW_REQUIRED');
});

test('recommendedHttpsMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedHttpsMode, 'HTTPS_SSL_REVIEW_REQUIRED');
});

test('recommendedSslCertificateMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedSslCertificateMode, 'SSL_CERTIFICATE_ISSUE_PENDING_APPROVAL');
});

test('recommendedDomainProviderActionMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedDomainProviderActionMode, 'DOMAIN_PROVIDER_ACTION_PENDING_APPROVAL');
});

test('recommendedVpsIngressMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedVpsIngressMode, 'VPS_INGRESS_REVIEW_REQUIRED');
});

test('recommendedConnectionValidationMode 검증', () => {
  const view = buildView();
  assert.equal(view.recommendedConnectionValidationMode, 'CONNECTION_VALIDATION_PLAN_REQUIRED');
});

test('domainDnsHttpsPlanReviewStarted true', () => {
  const view = buildView();
  assert.equal(view.domainDnsHttpsPlanReviewStarted, true);
});

test('domainDnsHttpsPlanStillReadOnly true', () => {
  const view = buildView();
  assert.equal(view.domainDnsHttpsPlanStillReadOnly, true);
});

test('actualDomainConnected false', () => {
  const view = buildView();
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildView();
  assert.equal(view.dnsChanged, false);
});

test('dnsRecordCreatedOrModified false', () => {
  const view = buildView();
  assert.equal(view.dnsRecordCreatedOrModified, false);
});

test('sslCertificateIssued false', () => {
  const view = buildView();
  assert.equal(view.sslCertificateIssued, false);
});

test('httpsEnabled false', () => {
  const view = buildView();
  assert.equal(view.httpsEnabled, false);
});

test('portForwardingChanged false', () => {
  const view = buildView();
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildView();
  assert.equal(view.serverConfigChanged, false);
});

test('actualVpsServerCreated false', () => {
  const view = buildView();
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildView();
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildView();
  assert.equal(view.actualDeploymentStarted, false);
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

test('domainConnectionStillReadOnly true', () => {
  const view = buildView();
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('dnsChangeStillBlocked true', () => {
  const view = buildView();
  assert.equal(view.dnsChangeStillBlocked, true);
});

test('sslIssueStillBlocked true', () => {
  const view = buildView();
  assert.equal(view.sslIssueStillBlocked, true);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildView();
  assert.equal(view.deploymentPreparationStillReadOnly, true);
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

test('Task 344 승인 문구 포함', () => {
  const view = buildView();
  assert.ok(view.nextTaskApprovalPhrase.includes('Task 344'));
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_344_APPROVAL_PHRASE);
});
