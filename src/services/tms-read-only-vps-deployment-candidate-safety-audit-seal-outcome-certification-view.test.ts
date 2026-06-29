import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_326_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView } from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView } from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeSafetyInput(
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

  return buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView({
    vpsDeploymentCandidateDetailReviewOutcomeCertification: outcomeCertification,
  });
}

test('Task 324 SEAL_READY → Task 325 CERTIFIED_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
  );
});

test('SEAL_PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
  );
});

test('SEAL_BLOCKED → OUTCOME_BLOCKED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
  );
});

test('SEAL_NOT_STARTED → OUTCOME_NOT_STARTED', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
      ),
    });

  assert.equal(
    view.vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED',
  );
});

test('vpsCandidateSafetySealOutcomeCertified true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.vpsCandidateSafetySealOutcomeCertified, true);
});

test('deploymentOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.deploymentOutcomeCertificationItems.length > 0);
});

test('domainOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.domainOutcomeCertificationItems.length > 0);
});

test('serverOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.serverOutcomeCertificationItems.length > 0);
});

test('operatingDbOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.operatingDbOutcomeCertificationItems.length > 0);
});

test('apiDbWorkerOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.apiDbWorkerOutcomeCertificationItems.length > 0);
});

test('secretExposureOutcomeCertificationItems 생성 검증', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.ok(view.secretExposureOutcomeCertificationItems.length > 0);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('apiCallStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.apiCallStillBlocked, true);
});

test('dbWriteStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.dbWriteStillBlocked, true);
});

test('workerQueueAdapterStillBlocked true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.workerQueueAdapterStillBlocked, true);
});

test('tokenOrAuthStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.tokenOrAuthStillHidden, true);
});

test('rawApiResponseStillHidden true', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.rawApiResponseStillHidden, true);
});

test('actualVpsServerCreated false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('actual final/execution flags false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('Naver API 호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.productUpdateApiCalled, false);
});

test('가격/재고 변경 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('DB write/upsert/update false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.dbWritePerformed, false);
});

test('Worker / Queue / Adapter 연결 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.workerStarted, false);
  assert.equal(view.queueEnqueued, false);
  assert.equal(view.adapterConnected, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.envFileReadOrModified, false);
});

test('Task 326 승인 문구 포함', () => {
  const view =
    buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView({
      vpsDeploymentCandidateSafetyAuditSeal: makeSafetyInput(),
    });
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_326_APPROVAL_PHRASE);
});
