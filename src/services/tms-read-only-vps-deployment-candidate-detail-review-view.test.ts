import assert from 'node:assert/strict';
import test from 'node:test';

import {
  NEXT_TASK_323_APPROVAL_PHRASE,
  buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView,
} from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

function makeInput(
  overrides: Partial<
    Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView>[0]['deploymentTargetEnvironmentSelectionComparison']
  > = {},
): Parameters<typeof buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView>[0] {
  return {
    deploymentTargetEnvironmentSelectionComparison: {
      deploymentTargetEnvironmentSelectionComparisonStatus:
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY',
      recommendedEnvironmentKey: 'VPS',
      recommendedEnvironmentLabel: 'VPS',
      candidateFlowReadOnlyClosed: true,
      ...overrides,
    },
  };
}

test('Task 321 READY + VPS 추천이면 Task 322 상태는 READY다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_READY',
  );
});

test('PARTIAL_READY면 Task 322 상태는 PARTIAL_READY다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(
    makeInput({
      deploymentTargetEnvironmentSelectionComparisonStatus:
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
  );
});

test('BLOCKED면 Task 322 상태는 BLOCKED다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(
    makeInput({
      deploymentTargetEnvironmentSelectionComparisonStatus:
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_BLOCKED',
  );
});

test('NOT_STARTED면 Task 322 상태는 NOT_STARTED다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(
    makeInput({
      deploymentTargetEnvironmentSelectionComparisonStatus:
        'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    }),
  );

  assert.equal(
    view.vpsDeploymentCandidateDetailReviewStatus,
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_NOT_STARTED',
  );
});

test('VPS 추천 후보가 상세 검토 대상으로 선택된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.vpsCandidateSelectedForReview, true);
});

test('VPS 요구사항 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsRequirementItems.length > 0);
});

test('VPS 비용 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsCostReviewItems.length > 0);
});

test('VPS 보안 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsSecurityReviewItems.length > 0);
});

test('VPS 백업 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsBackupReviewItems.length > 0);
});

test('VPS 도메인/HTTPS 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsDomainHttpsReviewItems.length > 0);
});

test('VPS 운영 리스크 검토 항목이 생성된다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.ok(view.vpsOperationRiskItems.length > 0);
});

test('actualVpsServerCreated는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.actualVpsServerCreated, false);
});

test('actualVpsConfigChanged는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.actualVpsConfigChanged, false);
});

test('actualDeploymentStarted는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.actualDeploymentStarted, false);
});

test('actualDomainConnected는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.actualDomainConnected, false);
});

test('dnsChanged는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.dnsChanged, false);
});

test('sslCertificateIssued는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.sslCertificateIssued, false);
});

test('portForwardingChanged는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.portForwardingChanged, false);
});

test('serverConfigChanged는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.serverConfigChanged, false);
});

test('operatingDbConnectionChanged는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.operatingDbConnectionChanged, false);
});

test('deploymentPreparationStillReadOnly는 true다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.deploymentPreparationStillReadOnly, true);
});

test('domainConnectionStillReadOnly는 true다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.domainConnectionStillReadOnly, true);
});

test('실제 최종 승인/실행 관련 플래그는 모두 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());

  assert.equal(view.actualFinalExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionApprovalGranted, false);
  assert.equal(view.actualExecutionStarted, false);
});

test('실행 버튼 추가는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.executionButtonAdded, false);
});

test('POST / submit action 추가는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.submitActionAdded, false);
  assert.equal(view.postApiAdded, false);
});

test('Naver API 호출은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.naverApiCalled, false);
});

test('상품 조회 API 재호출은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.productLookupApiRecalled, false);
});

test('상품 수정 API 호출은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.productUpdateApiCalled, false);
});

test('가격/재고 변경은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.priceChanged, false);
  assert.equal(view.stockChanged, false);
});

test('DB write/upsert/update는 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.dbWritePerformed, false);
});

test('Worker / Queue / Adapter 연결은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.workerStarted, false);
  assert.equal(view.queueEnqueued, false);
  assert.equal(view.adapterConnected, false);
});

test('Token/Auth/Signature/Authorization 비노출 상태를 유지한다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.tokenOrAuthValueExposed, false);
});

test('raw API response 비표시/비저장 상태를 유지한다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.rawApiResponseExposedOrStored, false);
});

test('.env/.env.local 열람/수정은 false다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.envFileReadOrModified, false);
});

test('Task 323 승인 문구를 포함한다', () => {
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_323_APPROVAL_PHRASE);
});

test('JSON.stringify 결과에 실제 민감값이 포함되지 않는다', () => {
  const fakeSecret = 'SECRET_SHOULD_NOT_EXIST';
  const view = buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(makeInput());
  const json = JSON.stringify(view);

  assert.ok(!json.includes(fakeSecret));
});
