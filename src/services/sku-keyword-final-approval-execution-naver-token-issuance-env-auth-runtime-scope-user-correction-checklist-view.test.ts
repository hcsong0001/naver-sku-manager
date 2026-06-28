import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistView } from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-user-correction-checklist-view.service';

const mockJob = {};

describe('Task 256 Naver Token Issuance Env Auth Runtime Scope User Correction Checklist View', () => {
  const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistView(mockJob);

  it('status === ENV_AUTH_RUNTIME_SCOPE_USER_CORRECTION_CHECKLIST_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_RUNTIME_SCOPE_USER_CORRECTION_CHECKLIST_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isEnvAuthRuntimeScopeUserCorrectionChecklistReady === true', () => {
    assert.strictEqual(view.isEnvAuthRuntimeScopeUserCorrectionChecklistReady, true);
  });

  it('isEnvAuthRuntimeScopeDiagnosisReady === true', () => {
    assert.strictEqual(view.isEnvAuthRuntimeScopeDiagnosisReady, true);
  });

  it('isEnvAuthPresenceRecheckResultReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresenceRecheckResultReady, true);
  });

  it('presencePresentCount === 0', () => {
    assert.strictEqual(view.presencePresentCount, 0);
  });

  it('presenceMissingCount === 3', () => {
    assert.strictEqual(view.presenceMissingCount, 3);
  });

  it('targetPresentCount === 3', () => {
    assert.strictEqual(view.targetPresentCount, 3);
  });

  it('targetMissingCount === 0', () => {
    assert.strictEqual(view.targetMissingCount, 0);
  });

  it('isTargetPresenceResultMet === false', () => {
    assert.strictEqual(view.isTargetPresenceResultMet, false);
  });

  it('isMissingEnvAuthDetected === true', () => {
    assert.strictEqual(view.isMissingEnvAuthDetected, true);
  });

  it('isMissingEnvAuthStillDetected === true', () => {
    assert.strictEqual(view.isMissingEnvAuthStillDetected, true);
  });

  it('isRuntimeScopeDiagnosisRequired === true', () => {
    assert.strictEqual(view.isRuntimeScopeDiagnosisRequired, true);
  });

  it('isUserActionRequiredForRuntimeScope === true', () => {
    assert.strictEqual(view.isUserActionRequiredForRuntimeScope, true);
  });

  it('isUserRuntimeScopeCorrectionRequired === true', () => {
    assert.strictEqual(view.isUserRuntimeScopeCorrectionRequired, true);
  });

  it('isPowerShellSessionCheckRequired === true', () => {
    assert.strictEqual(view.isPowerShellSessionCheckRequired, true);
  });

  it('isNextJsProcessScopeCheckRequired === true', () => {
    assert.strictEqual(view.isNextJsProcessScopeCheckRequired, true);
  });

  it('isProjectRootCheckRequired === true', () => {
    assert.strictEqual(view.isProjectRootCheckRequired, true);
  });

  it('isServerRestartRequiredAfterCorrection === true', () => {
    assert.strictEqual(view.isServerRestartRequiredAfterCorrection, true);
  });

  it('isEnvPresenceRecheckExecuted === false', () => {
    assert.strictEqual(view.isEnvPresenceRecheckExecuted, false);
  });

  it('isAuthKeyPresenceRecheckExecuted === false', () => {
    assert.strictEqual(view.isAuthKeyPresenceRecheckExecuted, false);
  });

  it('isEnvFileDirectlyAccessed === false', () => {
    assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
  });

  it('isEnvFileModified === false', () => {
    assert.strictEqual(view.isEnvFileModified, false);
  });

  it('isEnvValueDisplayed === false', () => {
    assert.strictEqual(view.isEnvValueDisplayed, false);
  });

  it('isAuthKeyValueDisplayed === false', () => {
    assert.strictEqual(view.isAuthKeyValueDisplayed, false);
  });

  it('isSecretLogged === false', () => {
    assert.strictEqual(view.isSecretLogged, false);
  });

  it('hasEnvFileAccess === false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
  });

  it('hasAuthKeyAccess === false', () => {
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });

  it('isTokenIssuanceAllowed === false', () => {
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
  });

  it('isTokenIssued === false', () => {
    assert.strictEqual(view.isTokenIssued, false);
  });

  it('isTokenStored === false', () => {
    assert.strictEqual(view.isTokenStored, false);
  });

  it('checklistItems에 23개 이상 항목이 있음', () => {
    assert.ok(view.checklistItems.length >= 23);
  });

  it('checklistItems에 RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED');
    assert.ok(found, 'RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED 상태가 없습니다.');
  });

  it('checklistItems에 MISSING_STILL_DETECTED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'MISSING_STILL_DETECTED');
    assert.ok(found, 'MISSING_STILL_DETECTED 상태가 없습니다.');
  });

  it('checklistItems에 TARGET_NOT_MET 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'TARGET_NOT_MET');
    assert.ok(found, 'TARGET_NOT_MET 상태가 없습니다.');
  });

  it('checklistItems에 USER_CORRECTION_REQUIRED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'USER_CORRECTION_REQUIRED');
    assert.ok(found, 'USER_CORRECTION_REQUIRED 상태가 없습니다.');
  });

  it('checklistItems에 USER_ACTION_REQUIRED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'USER_ACTION_REQUIRED');
    assert.ok(found, 'USER_ACTION_REQUIRED 상태가 없습니다.');
  });

  it('checklistItems에 FORBIDDEN 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'FORBIDDEN');
    assert.ok(found, 'FORBIDDEN 상태가 없습니다.');
  });

  it('checklistItems에 NOT_EXECUTED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'NOT_EXECUTED');
    assert.ok(found, 'NOT_EXECUTED 상태가 없습니다.');
  });

  it('checklistItems에 BLOCKED_BY_MISSING_ENV_AUTH 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'BLOCKED_BY_MISSING_ENV_AUTH');
    assert.ok(found, 'BLOCKED_BY_MISSING_ENV_AUTH 상태가 없습니다.');
  });

  it('checklistItems에 LOCKED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 없습니다.');
  });

  it('checklistItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 없습니다.');
  });

  it('checklistItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 없습니다.');
  });

  it('checklistItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.checklistItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 없습니다.');
  });

  it('사용자 보정 필요 항목은 USER_CORRECTION_REQUIRED', () => {
    const found = view.checklistItems.some(i =>
      (i.checklistItem.includes('보정') || i.checklistItem.includes('correction')) && i.status === 'USER_CORRECTION_REQUIRED'
    );
    assert.ok(found, '사용자 보정 USER_CORRECTION_REQUIRED 항목이 없습니다.');
  });

  it('PowerShell 세션 확인 항목은 USER_ACTION_REQUIRED', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('PowerShell') && i.status === 'USER_ACTION_REQUIRED'
    );
    assert.ok(found, 'PowerShell 세션 USER_ACTION_REQUIRED 항목이 없습니다.');
  });

  it('Next.js 실행 프로세스 확인 항목은 USER_ACTION_REQUIRED', () => {
    const found = view.checklistItems.some(i =>
      (i.checklistItem.includes('Next.js') || i.checklistItem.includes('프로세스')) && i.status === 'USER_ACTION_REQUIRED'
    );
    assert.ok(found, 'Next.js 프로세스 USER_ACTION_REQUIRED 항목이 없습니다.');
  });

  it('프로젝트 루트 확인 항목은 USER_ACTION_REQUIRED', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('루트') && i.status === 'USER_ACTION_REQUIRED'
    );
    assert.ok(found, '프로젝트 루트 USER_ACTION_REQUIRED 항목이 없습니다.');
  });

  it('서버 재시작 확인 항목은 USER_ACTION_REQUIRED', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('재시작') && i.status === 'USER_ACTION_REQUIRED'
    );
    assert.ok(found, '서버 재시작 USER_ACTION_REQUIRED 항목이 없습니다.');
  });

  it('".env" 열람/수정 항목은 FORBIDDEN', () => {
    const found = view.checklistItems.some(i =>
      (i.checklistItem.includes('.env') || i.checklistItem.includes('열람') || i.checklistItem.includes('수정')) && i.status === 'FORBIDDEN'
    );
    assert.ok(found, '".env" 열람/수정 FORBIDDEN 항목이 없습니다.');
  });

  it('인증키 값 표시 항목은 FORBIDDEN', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('인증키') && i.status === 'FORBIDDEN'
    );
    assert.ok(found, '인증키 값 표시 FORBIDDEN 항목이 없습니다.');
  });

  it('Secret 로그 출력 항목은 FORBIDDEN', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('Secret') && i.status === 'FORBIDDEN'
    );
    assert.ok(found, 'Secret 로그 FORBIDDEN 항목이 없습니다.');
  });

  it('Env/Auth 재확인 항목은 NOT_EXECUTED', () => {
    const found = view.checklistItems.some(i =>
      (i.checklistItem.includes('재확인') || i.checklistItem.includes('Recheck')) && i.status === 'NOT_EXECUTED'
    );
    assert.ok(found, 'Env/Auth 재확인 NOT_EXECUTED 항목이 없습니다.');
  });

  it('Token 발급 가능 여부 항목은 BLOCKED_BY_MISSING_ENV_AUTH', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('Token 발급 가능') && i.status === 'BLOCKED_BY_MISSING_ENV_AUTH'
    );
    assert.ok(found, 'Token 발급 가능 여부 BLOCKED_BY_MISSING_ENV_AUTH 항목이 없습니다.');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem === 'Token 발급' && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 발급 LOCKED 항목이 없습니다.');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('POST') && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    const found = view.checklistItems.some(i =>
      i.checklistItem.includes('버튼') && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '승인/실행 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('모든 실행 관련 플래그가 false', () => {
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
    const guideStr = view.powershellPlaceholderGuide.join('\n');
    assert.ok(guideStr.includes('<USER_INPUT_ONLY>'), 'placeholder 형식이 없습니다.');
    assert.ok(!guideStr.match(/=\s*"[A-Za-z0-9+/=]{20,}"/), '실제 시크릿 값이 포함된 것으로 의심됩니다.');
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes('Bearer '), 'Bearer 토큰이 포함되어 있습니다.');
    // 콜론(:) 뒤 값으로 나타나는 실제 base64(+/= 포함) 패턴만 검사 — camelCase 프로퍼티명 오탐지 방지
    assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), '실제 base64 인코딩 값이 포함된 것으로 의심됩니다.');
  });
});
