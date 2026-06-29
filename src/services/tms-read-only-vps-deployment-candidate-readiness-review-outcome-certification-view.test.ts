import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_328_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-readiness-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView } from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeOutcomeCertInput(
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

  const safetyAuditSealOutcomeCertification =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: safetyAuditSeal,
    });

  return buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView({
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: safetyAuditSealOutcomeCertification,
  });
}

test('Task 326 READY → Task 327 CERTIFIED_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_READY',
  );
});

test('PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  );
});

test('BLOCKED → OUTCOME_BLOCKED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_BLOCKED',
  );
});

test('NOT_STARTED → OUTCOME_NOT_STARTED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_NOT_STARTED',
  );
});

test('readinessReviewOutcomeCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.readinessReviewOutcomeCertified, true);
});

test('readinessReadyItemsCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.readinessReadyItemsCertified, true);
});

test('readinessBlockedItemsCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.readinessBlockedItemsCertified, true);
});

test('readinessRequiredApprovalItemsCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.readinessRequiredApprovalItemsCertified, true);
});

test('readyOutcomeCertificationItems 4개 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.readyOutcomeCertificationItems.length, 4);
  assert.equal(view.readyItemCount, 4);
});

test('blockedOutcomeCertificationItems 15개 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.blockedOutcomeCertificationItems.length, 15);
  assert.equal(view.blockedItemCount, 15);
});

test('requiredApprovalOutcomeCertificationItems 6개 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.requiredApprovalOutcomeCertificationItems.length, 6);
  assert.equal(view.requiredApprovalItemCount, 6);
});

test('totalCertificationItemCount = 4 + 15 + 6 + 6', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.totalCertificationItemCount, view.outcomeCertificationItems.length);
  assert.equal(view.totalCertificationItemCount, 4 + 15 + 6 + view.safetyOutcomeCertificationItems.length);
});

test('actualVpsServerCreated false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualProductionTransitionStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualProductionTransitionStarted, false);
});

test('actualDeploymentStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('runtimeConfigured false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.runtimeConfigured, false);
});

test('workerStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.workerStarted, false);
});

test('queueEnqueued false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.queueEnqueued, false);
});

test('adapterConnected false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.adapterConnected, false);
});

test('Naver API 호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.productUpdateApiCalled, false);
});

test('DB write/upsert/update false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.dbWritePerformed, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.envFileReadOrModified, false);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('actual final/execution flags false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('가격/재고 변경 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('Task 328 승인 문구 포함', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView({
      vpsDeploymentCandidateReadinessReview: makeOutcomeCertInput(),
    });
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_328_APPROVAL_PHRASE);
});
