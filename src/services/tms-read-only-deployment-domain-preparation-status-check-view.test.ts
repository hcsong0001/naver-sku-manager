import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView,
  NEXT_TASK_321_APPROVAL_PHRASE,
} from './tms-read-only-deployment-domain-preparation-status-check-view.service';

type PreparationBuilderInput = Parameters<
  typeof buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView
>[0];

function makeInput(input?: {
  candidateFlowClosureSummaryStatus?: PreparationBuilderInput['candidateFlowClosureSummary']['candidateFlowClosureSummaryStatus'];
  candidateFlowReadOnlyClosed?: boolean;
  candidateFlowSafeForDeploymentPreparation?: boolean;
  executionStillLocked?: boolean;
  mutationStillBlocked?: boolean;
  apiCallStillBlocked?: boolean;
  dbWriteStillBlocked?: boolean;
  workerQueueAdapterStillBlocked?: boolean;
}): PreparationBuilderInput {
  return {
    candidateFlowClosureSummary: {
      candidateFlowClosureSummaryStatus:
        input?.candidateFlowClosureSummaryStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY',
      candidateFlowReadOnlyClosed: input?.candidateFlowReadOnlyClosed ?? true,
      candidateFlowSafeForDeploymentPreparation:
        input?.candidateFlowSafeForDeploymentPreparation ?? true,
      executionStillLocked: input?.executionStillLocked ?? true,
      mutationStillBlocked: input?.mutationStillBlocked ?? true,
      apiCallStillBlocked: input?.apiCallStillBlocked ?? true,
      dbWriteStillBlocked: input?.dbWriteStillBlocked ?? true,
      workerQueueAdapterStillBlocked: input?.workerQueueAdapterStillBlocked ?? true,
    },
  };
}

describe('buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView', () => {
  it('Task 319 closure READY + safeForDeploymentPreparation true → preparationStatus READY', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(
      result.deploymentDomainPreparationStatus,
      'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY',
    );
    assert.equal(result.deploymentPreparationReady, true);
    assert.equal(result.domainPreparationReady, true);
  });

  it('PARTIAL_READY → preparationStatus PARTIAL_READY', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(
      makeInput({
        candidateFlowClosureSummaryStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY',
      }),
    );
    assert.equal(
      result.deploymentDomainPreparationStatus,
      'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY',
    );
    assert.equal(result.deploymentPreparationPartialReady, true);
    assert.equal(result.domainPreparationPartialReady, true);
  });

  it('BLOCKED → preparationStatus BLOCKED', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(
      makeInput({
        candidateFlowClosureSummaryStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED',
      }),
    );
    assert.equal(
      result.deploymentDomainPreparationStatus,
      'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED',
    );
    assert.equal(result.deploymentPreparationBlocked, true);
    assert.equal(result.domainPreparationBlocked, true);
  });

  it('EMPTY 또는 not started → preparationStatus NOT_STARTED', () => {
    const emptyResult = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(
      makeInput({
        candidateFlowClosureSummaryStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY',
      }),
    );
    assert.equal(
      emptyResult.deploymentDomainPreparationStatus,
      'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED',
    );

    const unsafeResult = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(
      makeInput({
        candidateFlowSafeForDeploymentPreparation: false,
      }),
    );
    assert.equal(
      unsafeResult.deploymentDomainPreparationStatus,
      'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED',
    );
    assert.equal(unsafeResult.deploymentPreparationNotStarted, true);
  });

  it('preparationCheckItems 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.preparationCheckItems.length > 0, true);
    assert.equal(result.preparationCheckItems.every((item) => item.isReadOnly), true);
    assert.equal(result.preparationCheckItems.every((item) => item.actualChangePerformed === false), true);
  });

  it('deploymentPreparationItems 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.deploymentPreparationItems.length >= 2, true);
    assert.equal(result.deploymentPreparationItems.every((item) => item.category === 'DEPLOYMENT' || item.category === 'SERVER'), true);
  });

  it('domainPreparationItems 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.domainPreparationItems.length >= 2, true);
    assert.equal(result.domainPreparationItems.every((item) => item.category === 'DOMAIN'), true);
  });

  it('securityPreparationItems 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.securityPreparationItems.length >= 2, true);
    assert.equal(result.securityPreparationItems.every((item) => item.category === 'SECURITY'), true);
  });

  it('readOnlySafetyItems 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.readOnlySafetyItems.length >= 2, true);
    assert.equal(result.readOnlySafetyItems.every((item) => item.category === 'SAFETY_LOCK'), true);
  });

  it('deploymentNotStarted true', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.deploymentNotStarted, true);
  });

  it('domainConnectionNotStarted true', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.domainConnectionNotStarted, true);
  });

  it('actualDeploymentStarted false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.actualDeploymentStarted, false);
  });

  it('actualDomainConnected false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.actualDomainConnected, false);
  });

  it('dnsChanged false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.dnsChanged, false);
  });

  it('sslCertificateIssued false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.sslCertificateIssued, false);
  });

  it('portForwardingChanged false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.portForwardingChanged, false);
  });

  it('serverConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.serverConfigChanged, false);
  });

  it('nasConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.nasConfigChanged, false);
  });

  it('vpsConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.vpsConfigChanged, false);
  });

  it('actual final/execution flags false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.actualFinalExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionStarted, false);
  });

  it('executionButtonAdded false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.executionButtonAdded, false);
  });

  it('POST / submit action false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.submitActionAdded, false);
    assert.equal(result.postApiAdded, false);
  });

  it('Naver API 호출 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.naverApiCalled, false);
  });

  it('상품 조회 API 재호출 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.productLookupApiRecalled, false);
  });

  it('상품 수정 API 호출 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.productUpdateApiCalled, false);
  });

  it('가격/재고 변경 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.priceChanged, false);
    assert.equal(result.stockChanged, false);
  });

  it('DB write/upsert/update false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.dbWritePerformed, false);
  });

  it('Worker / Queue / Adapter 연결 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.workerStarted, false);
    assert.equal(result.queueEnqueued, false);
    assert.equal(result.adapterConnected, false);
  });

  it('Token/Auth/Signature/Authorization 비노출 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.tokenOrAuthValueExposed, false);
  });

  it('raw API response 비표시/비저장 유지', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.rawApiResponseExposedOrStored, false);
  });

  it('.env/.env.local 열람/수정 false', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.envFileReadOrModified, false);
  });

  it('Task 321 승인 문구 포함', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_321_APPROVAL_PHRASE);
    assert.equal(result.requiresSeparateTask321Approval, true);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(makeInput());
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('Bearer real-token'), false);
    assert.equal(serialized.includes('live-client-secret-value'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
  });
});
