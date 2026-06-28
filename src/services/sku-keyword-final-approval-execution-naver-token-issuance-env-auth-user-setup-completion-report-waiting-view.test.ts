import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-user-setup-completion-report-waiting-view.service';

const mockJob = {};

describe('Task 252 Naver Token Issuance Env Auth User Setup Completion Report Waiting View', () => {
  const view = buildNaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingView(mockJob);

  it('status === ENV_AUTH_USER_SETUP_COMPLETION_REPORT_WAITING', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_USER_SETUP_COMPLETION_REPORT_WAITING');
  });

  it('필수 상태/개수 플래그가 명세와 일치함', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthUserSetupCompletionReportWaitingReady, true);
    assert.strictEqual(view.isEnvAuthUserSetupProcedureGuideReady, true);
    assert.strictEqual(view.isEnvAuthUserSetupCompletionWaitingGateReady, true);
    assert.strictEqual(view.presencePresentCount, 0);
    assert.strictEqual(view.presenceMissingCount, 3);
    assert.strictEqual(view.isMissingEnvAuthDetected, true);
    assert.strictEqual(view.isUserSetupRequiredForEnvAuth, true);
    assert.strictEqual(view.isUserSetupProcedureReady, true);
    assert.strictEqual(view.isUserSetupCompletionReported, false);
    assert.strictEqual(view.isWaitingUserSetupCompletionReport, true);
    assert.strictEqual(view.isRecheckBlockedUntilUserSetup, true);
    assert.strictEqual(view.isNextStepRecheckRequired, true);
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

  it('waitingItems에 모든 권장 상태값 포함', () => {
    const statuses = new Set(view.waitingItems.map((item) => item.status));
    assert.ok(statuses.has('PROCEDURE_GUIDE_CONFIRMED'));
    assert.ok(statuses.has('MISSING_DETECTED'));
    assert.ok(statuses.has('WAITING_USER_COMPLETION_REPORT'));
    assert.ok(statuses.has('RECHECK_NOT_ALLOWED_YET'));
    assert.ok(statuses.has('USER_ONLY_ACTION'));
    assert.ok(statuses.has('KEY_NAMES_ONLY'));
    assert.ok(statuses.has('FORBIDDEN'));
    assert.ok(statuses.has('BLOCKED_BY_MISSING_ENV_AUTH'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('사용자 설정 완료 보고 항목은 WAITING_USER_COMPLETION_REPORT', () => {
    const item = view.waitingItems.find((entry) => entry.waitingItem === '사용자 설정 완료 보고');
    assert.ok(item);
    assert.strictEqual(item?.status, 'WAITING_USER_COMPLETION_REPORT');
  });

  it('Env/Auth 재확인 항목은 RECHECK_NOT_ALLOWED_YET', () => {
    const item = view.waitingItems.find((entry) => entry.waitingItem === 'Env/Auth 재확인');
    assert.ok(item);
    assert.strictEqual(item?.status, 'RECHECK_NOT_ALLOWED_YET');
  });

  it('실제 값 입력 항목은 USER_ONLY_ACTION', () => {
    const item = view.waitingItems.find((entry) => entry.waitingItem === '실제 값 입력');
    assert.ok(item);
    assert.strictEqual(item?.status, 'USER_ONLY_ACTION');
  });

  it('개발 에이전트 ".env" 열람/수정 항목은 FORBIDDEN', () => {
    const readItem = view.waitingItems.find((entry) => entry.waitingItem === '개발 에이전트 .env 열람');
    const writeItem = view.waitingItems.find((entry) => entry.waitingItem === '개발 에이전트 .env 수정');
    assert.ok(readItem);
    assert.ok(writeItem);
    assert.strictEqual(readItem?.status, 'FORBIDDEN');
    assert.strictEqual(writeItem?.status, 'FORBIDDEN');
  });

  it('필수 키 이름 안내 항목은 KEY_NAMES_ONLY', () => {
    const item = view.waitingItems.find((entry) => entry.waitingItem === '필수 키 이름 안내');
    assert.ok(item);
    assert.strictEqual(item?.status, 'KEY_NAMES_ONLY');
  });

  it('Token 발급 가능 여부 항목은 BLOCKED_BY_MISSING_ENV_AUTH', () => {
    const item = view.waitingItems.find((entry) => entry.waitingItem === 'Token 발급 가능 여부');
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
      const item = view.waitingItems.find((entry) => entry.waitingItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED, 승인/실행 버튼은 NOT_PRESENT', () => {
    const postApi = view.waitingItems.find((item) => item.waitingItem === 'POST API 연결');
    const button = view.waitingItems.find((item) => item.waitingItem === '승인/실행 버튼');
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

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const secretValue = 'real-secret-value';
    const serialized = JSON.stringify(view);
    assert.strictEqual(serialized.includes(secretValue), false);
  });
});
