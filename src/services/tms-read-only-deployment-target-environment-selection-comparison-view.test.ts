import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView,
  NEXT_TASK_322_APPROVAL_PHRASE,
} from './tms-read-only-deployment-target-environment-selection-comparison-view.service';

type ComparisonBuilderInput = Parameters<
  typeof buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView
>[0];

function makeInput(input?: {
  deploymentDomainPreparationStatus?: ComparisonBuilderInput['deploymentDomainPreparation']['deploymentDomainPreparationStatus'];
  candidateFlowReadOnlyClosed?: boolean;
  deploymentNotStarted?: boolean;
  domainConnectionNotStarted?: boolean;
}): ComparisonBuilderInput {
  return {
    deploymentDomainPreparation: {
      deploymentDomainPreparationStatus:
        input?.deploymentDomainPreparationStatus ??
        'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY',
      candidateFlowReadOnlyClosed: input?.candidateFlowReadOnlyClosed ?? true,
      deploymentNotStarted: input?.deploymentNotStarted ?? true,
      domainConnectionNotStarted: input?.domainConnectionNotStarted ?? true,
    },
  };
}

describe('buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView', () => {
  it('Task 320 READY → Task 321 READY', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(
      result.deploymentTargetEnvironmentSelectionComparisonStatus,
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY',
    );
    assert.equal(result.deploymentTargetSelectionReady, true);
  });

  it('PARTIAL_READY → PARTIAL_READY', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(
      makeInput({
        deploymentDomainPreparationStatus:
          'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY',
      }),
    );
    assert.equal(
      result.deploymentTargetEnvironmentSelectionComparisonStatus,
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY',
    );
    assert.equal(result.deploymentTargetSelectionPartialReady, true);
  });

  it('BLOCKED → BLOCKED', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(
      makeInput({
        deploymentDomainPreparationStatus:
          'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED',
      }),
    );
    assert.equal(
      result.deploymentTargetEnvironmentSelectionComparisonStatus,
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED',
    );
    assert.equal(result.deploymentTargetSelectionBlocked, true);
  });

  it('NOT_STARTED → NOT_STARTED', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(
      makeInput({
        deploymentDomainPreparationStatus:
          'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED',
      }),
    );
    assert.equal(
      result.deploymentTargetEnvironmentSelectionComparisonStatus,
      'TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED',
    );
    assert.equal(result.deploymentTargetSelectionNotStarted, true);
  });

  it('environmentOptions 4개 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.environmentOptions.length, 4);
  });

  it('NAS 옵션 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.nasOption.environmentKey, 'NAS');
    assert.equal(result.nasOption.actualConfigChanged, false);
  });

  it('회사 PC 옵션 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.companyPcOption.environmentKey, 'COMPANY_PC');
    assert.equal(result.companyPcOption.actualConfigChanged, false);
  });

  it('집 PC 옵션 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.homePcOption.environmentKey, 'HOME_PC');
    assert.equal(result.homePcOption.actualConfigChanged, false);
  });

  it('VPS 옵션 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.vpsOption.environmentKey, 'VPS');
    assert.equal(result.vpsOption.actualConfigChanged, false);
  });

  it('VPS가 recommendedEnvironmentKey인지 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.recommendedEnvironmentKey, 'VPS');
    assert.equal(result.recommendedEnvironmentLabel, 'VPS');
  });

  it('comparisonCriteria 생성 검증', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.comparisonCriteria.length >= 8, true);
    assert.equal(result.comparisonCriteria.some((item) => item.label === '안정성'), true);
    assert.equal(result.comparisonCriteria.some((item) => item.label === '도메인 연결 적합성'), true);
  });

  it('actualDeploymentTargetSelected false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.actualDeploymentTargetSelected, false);
  });

  it('actualDeploymentStarted false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.actualDeploymentStarted, false);
  });

  it('actualDomainConnected false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.actualDomainConnected, false);
  });

  it('dnsChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.dnsChanged, false);
  });

  it('sslCertificateIssued false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.sslCertificateIssued, false);
  });

  it('portForwardingChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.portForwardingChanged, false);
  });

  it('serverConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.serverConfigChanged, false);
  });

  it('nasConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.nasConfigChanged, false);
  });

  it('companyPcConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.companyPcConfigChanged, false);
  });

  it('homePcConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.homePcConfigChanged, false);
  });

  it('vpsConfigChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.vpsConfigChanged, false);
  });

  it('operatingDbConnectionChanged false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.operatingDbConnectionChanged, false);
  });

  it('deploymentPreparationStillReadOnly true', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.deploymentPreparationStillReadOnly, true);
  });

  it('domainConnectionStillReadOnly true', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.domainConnectionStillReadOnly, true);
  });

  it('actual final/execution flags false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.actualFinalExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionStarted, false);
  });

  it('실행 버튼 추가 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.executionButtonAdded, false);
  });

  it('POST / submit action false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.submitActionAdded, false);
    assert.equal(result.postApiAdded, false);
  });

  it('Naver API 호출 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.naverApiCalled, false);
  });

  it('상품 조회 API 재호출 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.productLookupApiRecalled, false);
  });

  it('상품 수정 API 호출 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.productUpdateApiCalled, false);
  });

  it('가격/재고 변경 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.priceChanged, false);
    assert.equal(result.stockChanged, false);
  });

  it('DB write/upsert/update false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.dbWritePerformed, false);
  });

  it('Worker / Queue / Adapter 연결 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.workerStarted, false);
    assert.equal(result.queueEnqueued, false);
    assert.equal(result.adapterConnected, false);
  });

  it('Token/Auth/Signature/Authorization 비노출 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.tokenOrAuthValueExposed, false);
  });

  it('raw API response 비표시/비저장 유지', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.rawApiResponseExposedOrStored, false);
  });

  it('.env/.env.local 열람/수정 false', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.envFileReadOrModified, false);
  });

  it('Task 322 승인 문구 포함', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_322_APPROVAL_PHRASE);
    assert.equal(result.requiresSeparateTask322Approval, true);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildTmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonView(makeInput());
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('Bearer real-token'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
  });
});
