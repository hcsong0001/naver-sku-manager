import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  RUNTIME_SCOPE_USER_INPUT_PLACEHOLDER,
  buildNaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-diagnosis-view.service';

const mockJob = {};

describe('Task 255 Naver Token Issuance Env Auth Runtime Scope Diagnosis View', () => {
  const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisView(mockJob);

  it('status === ENV_AUTH_RUNTIME_SCOPE_DIAGNOSIS_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_RUNTIME_SCOPE_DIAGNOSIS_READY');
  });

  it('필수 상태/개수 플래그가 명세와 일치함', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthRuntimeScopeDiagnosisReady, true);
    assert.strictEqual(view.isEnvAuthPresenceRecheckResultReady, true);
    assert.strictEqual(view.presencePresentCount, 0);
    assert.strictEqual(view.presenceMissingCount, 3);
    assert.strictEqual(view.targetPresentCount, 3);
    assert.strictEqual(view.targetMissingCount, 0);
    assert.strictEqual(view.isTargetPresenceResultMet, false);
    assert.strictEqual(view.isMissingEnvAuthDetected, true);
    assert.strictEqual(view.isMissingEnvAuthStillDetected, true);
    assert.strictEqual(view.isRuntimeScopeDiagnosisRequired, true);
    assert.strictEqual(view.isUserActionRequiredForRuntimeScope, true);
    assert.strictEqual(view.isUserSetupCompletionReported, true);
    assert.strictEqual(view.isEnvPresenceRecheckExecuted, false);
    assert.strictEqual(view.isAuthKeyPresenceRecheckExecuted, false);
    assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    assert.strictEqual(view.isEnvFileModified, false);
    assert.strictEqual(view.isEnvValueDisplayed, false);
    assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    assert.strictEqual(view.isSecretLogged, false);
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
    assert.strictEqual(view.isTokenIssued, false);
    assert.strictEqual(view.isTokenStored, false);
  });

  it('diagnosisItems에 모든 권장 상태값 포함', () => {
    const statuses = new Set(view.diagnosisItems.map((item) => item.status));
    assert.ok(statuses.has('RECHECK_RESULT_CONFIRMED'));
    assert.ok(statuses.has('MISSING_STILL_DETECTED'));
    assert.ok(statuses.has('TARGET_NOT_MET'));
    assert.ok(statuses.has('RUNTIME_SCOPE_DIAGNOSIS_REQUIRED'));
    assert.ok(statuses.has('USER_ACTION_REQUIRED'));
    assert.ok(statuses.has('FORBIDDEN'));
    assert.ok(statuses.has('NOT_EXECUTED'));
    assert.ok(statuses.has('BLOCKED_BY_MISSING_ENV_AUTH'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('현재 재확인 결과 항목은 MISSING_STILL_DETECTED', () => {
    const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === '현재 재확인 결과');
    assert.ok(item);
    assert.strictEqual(item?.status, 'MISSING_STILL_DETECTED');
  });

  it('목표 결과 항목은 TARGET_NOT_MET', () => {
    const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === '목표 결과');
    assert.ok(item);
    assert.strictEqual(item?.status, 'TARGET_NOT_MET');
  });

  it('Runtime Scope 진단 항목은 RUNTIME_SCOPE_DIAGNOSIS_REQUIRED', () => {
    const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === 'Runtime Scope 진단');
    assert.ok(item);
    assert.strictEqual(item?.status, 'RUNTIME_SCOPE_DIAGNOSIS_REQUIRED');
  });

  it('설정 위치/PowerShell/Next.js 실행 프로세스 확인 항목은 USER_ACTION_REQUIRED', () => {
    const targets = ['설정 위치 확인', 'PowerShell 세션 적용 여부', 'Next.js 실행 프로세스 적용 여부'];
    for (const target of targets) {
      const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'USER_ACTION_REQUIRED');
    }
  });

  it('".env" 열람/수정, 인증키 값 표시, Secret 로그 출력 항목은 FORBIDDEN', () => {
    const targets = ['".env" 직접 열람', '".env" 자동 수정', '인증키 값 표시', 'Secret 로그 출력'];
    for (const target of targets) {
      const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'FORBIDDEN');
    }
  });

  it('Env/Auth 재확인 항목은 NOT_EXECUTED', () => {
    const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === 'Env/Auth 재확인');
    assert.ok(item);
    assert.strictEqual(item?.status, 'NOT_EXECUTED');
  });

  it('Token 발급 가능 여부 항목은 BLOCKED_BY_MISSING_ENV_AUTH', () => {
    const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === 'Token 발급 가능 여부');
    assert.ok(item);
    assert.strictEqual(item?.status, 'BLOCKED_BY_MISSING_ENV_AUTH');
  });

  it('Token / Naver API / 상품 API / 가격·재고 / Worker / Queue / Adapter는 LOCKED', () => {
    const lockedTargets = [
      'Token 발급',
      'Token 저장',
      'Naver API 호출',
      '상품 조회/수정 API',
      '가격·재고 변경',
      'Worker / Queue / Adapter',
    ];

    for (const target of lockedTargets) {
      const item = view.diagnosisItems.find((entry) => entry.diagnosisItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED, 승인/실행 버튼은 NOT_PRESENT', () => {
    const postApi = view.diagnosisItems.find((item) => item.diagnosisItem === 'POST API 연결');
    const button = view.diagnosisItems.find((item) => item.diagnosisItem === '승인/실행 버튼');
    assert.ok(postApi);
    assert.ok(button);
    assert.strictEqual(postApi?.status, 'NOT_CONNECTED');
    assert.strictEqual(button?.status, 'NOT_PRESENT');
  });

  it('모든 실행 관련 플래그 false', () => {
    assert.strictEqual(view.isActualApprovalGranted, false);
    assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(view.isApprovalSubmitted, false);
    assert.strictEqual(view.isExecutionAllowed, false);
    assert.strictEqual(view.isApprovalSubmission, false);
    assert.strictEqual(view.isPostApiConnected, false);
    assert.strictEqual(view.isMutationConnected, false);
    assert.strictEqual(view.isLiveExecutionEnabled, false);
    assert.strictEqual(view.hasApprovalRequestButton, false);
    assert.strictEqual(view.hasExecutionButton, false);
    assert.strictEqual(view.hasSubmitAction, false);
    assert.strictEqual(view.hasWorkerTrigger, false);
    assert.strictEqual(view.hasQueueTrigger, false);
    assert.strictEqual(view.hasAdapterTrigger, false);
    assert.strictEqual(view.isNaverApiCalled, false);
    assert.strictEqual(view.isProductLookupApiCalled, false);
    assert.strictEqual(view.isProductUpdateApiCalled, false);
    assert.strictEqual(view.isPriceOrStockChanged, false);
  });

  it('placeholder는 <USER_INPUT_ONLY>만 사용하고 실제 값이 포함되지 않음', () => {
    const secretValue = 'real-secret-value';
    const commands = view.powerShellPlaceholderCommands.join('\n');
    assert.ok(commands.includes(RUNTIME_SCOPE_USER_INPUT_PLACEHOLDER));
    assert.strictEqual(commands.includes(secretValue), false);

    const assignmentCommands = view.powerShellPlaceholderCommands.filter((line) => line.startsWith('$env:'));
    assert.ok(assignmentCommands.length > 0);
    for (const command of assignmentCommands) {
      assert.ok(command.endsWith(`"${RUNTIME_SCOPE_USER_INPUT_PLACEHOLDER}"`));
    }
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const secretValue = 'real-secret-value';
    const serialized = JSON.stringify(view);
    assert.strictEqual(serialized.includes(secretValue), false);
  });
});
