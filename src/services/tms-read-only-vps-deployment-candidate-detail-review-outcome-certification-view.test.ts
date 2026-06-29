import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_324_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';
import { buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView } from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeSource(
  overrides: Partial<
    Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView>[0]['deploymentTargetEnvironmentSelectionComparison']
  > = {},
) {
  return buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView({
    deploymentTargetEnvironmentSelectionComparison: {
      deploymentTargetEnvironmentSelectionComparisonStatus:
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY',
      recommendedEnvironmentKey: 'VPS',
      recommendedEnvironmentLabel: 'VPS',
      candidateFlowReadOnlyClosed: true,
      ...overrides,
    },
  });
}

function makeInput(
  overrides: Partial<
    Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView>[0]['vpsDeploymentCandidateDetailReview']
  > = {},
): Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView>[0] {
  return {
    vpsDeploymentCandidateDetailReview: {
      ...makeSource(),
      ...overrides,
    },
  };
}

test('Task 322 READY → Task 323 CERTIFIED_READY', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
  );
});

test('PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
  const source = makeSource({
    deploymentTargetEnvironmentSelectionComparisonStatus:
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
  });
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput({ ...source }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  );
});

test('BLOCKED → OUTCOME_BLOCKED', () => {
  const source = makeSource({
    deploymentTargetEnvironmentSelectionComparisonStatus:
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
  });
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput({ ...source }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
  );
});

test('NOT_STARTED → OUTCOME_NOT_STARTED', () => {
  const source = makeSource({
    deploymentTargetEnvironmentSelectionComparisonStatus:
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
  });
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput({ ...source }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_NOT_STARTED',
  );
});

test('vpsCandidateCertifiedForReview true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsCandidateCertifiedForReview, true);
});

test('requirementOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.requirementOutcomeCertificationItems.length > 0);
});

test('costOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.costOutcomeCertificationItems.length > 0);
});

test('securityOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.securityOutcomeCertificationItems.length > 0);
});

test('backupOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.backupOutcomeCertificationItems.length > 0);
});

test('domainHttpsOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.domainHttpsOutcomeCertificationItems.length > 0);
});

test('operationRiskOutcomeCertificationItems 생성 검증', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.ok(view.operationRiskOutcomeCertificationItems.length > 0);
});

test('vpsRequirementReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsRequirementReviewCertified, true);
});

test('vpsCostReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsCostReviewCertified, true);
});

test('vpsSecurityReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsSecurityReviewCertified, true);
});

test('vpsBackupReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsBackupReviewCertified, true);
});

test('vpsDomainHttpsReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsDomainHttpsReviewCertified, true);
});

test('vpsOperationRiskReviewCertified true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.vpsOperationRiskReviewCertified, true);
});

test('actualVpsServerCreated false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('deploymentPreparationStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly true', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('actual final/execution flags false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('Naver API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.productUpdateApiCalled, false);
});

test('가격/재고 변경 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('DB write/upsert/update false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.dbWritePerformed, false);
});

test('Worker / Queue / Adapter 연결 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.workerStarted, false);
  assert.equal(view.queueEnqueued, false);
  assert.equal(view.adapterConnected, false);
});

test('Token/Auth/Signature/Authorization 비노출 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 유지', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('.env/.env.local 열람/수정 false', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.envFileReadOrModified, false);
});

test('Task 324 승인 문구 포함', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(
    makeInput(),
  );
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_324_APPROVAL_PHRASE);
});
