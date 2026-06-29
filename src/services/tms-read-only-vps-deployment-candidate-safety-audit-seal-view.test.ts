import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_325_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeOutcomeInput(statusOverride?: Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView>[0]['deploymentTargetEnvironmentSelectionComparison']['deploymentTargetEnvironmentSelectionComparisonStatus']) {
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

  return buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView({
    vpsDeploymentCandidateDetailReview: detailReview,
  });
}

test('Task 323 CERTIFIED_READY → Task 324 SEAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_READY',
  );
});

test('CERTIFIED_PARTIAL_READY → SEAL_PARTIAL_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_PARTIAL_READY',
  );
});

test('OUTCOME_BLOCKED → SEAL_BLOCKED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_BLOCKED',
  );
});

test('OUTCOME_NOT_STARTED → SEAL_NOT_STARTED', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    ),
  });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_NOT_STARTED',
  );
});

test('vpsCandidateSafetySealed true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.vpsCandidateSafetySealed, true);
});

test('deploymentSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.deploymentSafetySealItems.length > 0);
});

test('domainSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.domainSafetySealItems.length > 0);
});

test('serverSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.serverSafetySealItems.length > 0);
});

test('operatingDbSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.operatingDbSafetySealItems.length > 0);
});

test('apiDbWorkerSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.apiDbWorkerSafetySealItems.length > 0);
});

test('secretExposureSafetySealItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.ok(view.secretExposureSafetySealItems.length > 0);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('Naver API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.productUpdateApiCalled, false);
});

test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('DB write/upsert/update false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.dbWritePerformed, false);
});

test('Worker / Queue / Adapter 연결 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.workerStarted, false);
  assert.equal(view.queueEnqueued, false);
  assert.equal(view.adapterConnected, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.envFileReadOrModified, false);
});

test('Task 325 승인 문구 포함', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: makeOutcomeInput(),
  });
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_325_APPROVAL_PHRASE);
});
