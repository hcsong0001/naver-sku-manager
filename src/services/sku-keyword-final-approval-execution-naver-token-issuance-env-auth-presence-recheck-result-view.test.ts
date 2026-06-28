import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  REQUIRED_NAVER_TOKEN_ENV_RECHECK_KEYS,
  buildNaverTokenIssuanceEnvAuthPresenceRecheckResultView,
  buildNaverTokenIssuanceEnvAuthPresenceRecheckResults,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-recheck-result-view.service';

const mockJob = {};

describe('Task 254 Naver Token Issuance Env/Auth Presence Recheck Result View', () => {
  const presentEnv = {
    NAVER_COMMERCE_CLIENT_ID: 'client-id-value',
    NAVER_COMMERCE_CLIENT_SECRET: 'client-secret-value',
    NAVER_COMMERCE_API_BASE_URL: 'https://example.test',
  };
  const view = buildNaverTokenIssuanceEnvAuthPresenceRecheckResultView(mockJob, presentEnv);

  it('status === ENV_AUTH_PRESENCE_RECHECK_RESULT_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_PRESENCE_RECHECK_RESULT_READY');
  });

  it('비노출 재확인 필수 플래그가 명세와 일치함', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthPresenceRecheckResultReady, true);
    assert.strictEqual(view.isEnvAuthUserSetupCompletionReportWaitingReady, true);
    assert.strictEqual(view.isEnvAuthUserSetupProcedureGuideReady, true);
    assert.strictEqual(view.presencePresentCount, 3);
    assert.strictEqual(view.presenceMissingCount, 0);
    assert.strictEqual(view.isMissingEnvAuthDetected, false);
    assert.strictEqual(view.isPresenceRecheckTargetReached, true);
    assert.strictEqual(view.isTokenIssuanceGateReleaseCandidate, true);
    assert.strictEqual(view.isEnvPresenceRecheckExecuted, true);
    assert.strictEqual(view.isAuthKeyPresenceRecheckExecuted, true);
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

  it('presenceResults는 키 이름과 PRESENT/MISSING만 포함', () => {
    assert.deepStrictEqual(
      view.presenceResults.map((item) => item.key),
      [...REQUIRED_NAVER_TOKEN_ENV_RECHECK_KEYS]
    );
    assert.deepStrictEqual(
      view.presenceResults.map((item) => item.status),
      ['PRESENT', 'PRESENT', 'PRESENT']
    );
  });

  it('mock env에 빈 문자열이나 누락된 key가 있으면 MISSING', () => {
    const results = buildNaverTokenIssuanceEnvAuthPresenceRecheckResults({
      NAVER_COMMERCE_CLIENT_ID: '',
      NAVER_COMMERCE_CLIENT_SECRET: '   ',
    });
    assert.deepStrictEqual(
      results.map((item) => item.status),
      ['MISSING', 'MISSING', 'MISSING']
    );
  });

  it('recheckItems에 모든 권장 상태값 포함', () => {
    const statuses = new Set(view.recheckItems.map((item) => item.status));
    assert.ok(statuses.has('COMPLETION_REPORT_CONFIRMED'));
    assert.ok(statuses.has('RECHECK_EXECUTED_NON_EXPOSURE'));
    assert.ok(statuses.has('PRESENT_OR_MISSING_ONLY'));
    assert.ok(statuses.has('TARGET_REACHED'));
    assert.ok(statuses.has('NOT_ACCESSED'));
    assert.ok(statuses.has('NOT_DISPLAYED'));
    assert.ok(statuses.has('NOT_LOGGED'));
    assert.ok(statuses.has('TOKEN_GATE_NOT_RELEASED'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('누락이 남으면 MISSING_STILL_DETECTED 상태를 표시', () => {
    const missingView = buildNaverTokenIssuanceEnvAuthPresenceRecheckResultView(mockJob, {});
    const item = missingView.recheckItems.find((entry) => entry.recheckItem === '현재 재확인 결과');
    assert.strictEqual(missingView.presencePresentCount, 0);
    assert.strictEqual(missingView.presenceMissingCount, 3);
    assert.strictEqual(missingView.isMissingEnvAuthDetected, true);
    assert.strictEqual(missingView.isPresenceRecheckTargetReached, false);
    assert.strictEqual(item?.status, 'MISSING_STILL_DETECTED');
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
      const item = view.recheckItems.find((entry) => entry.recheckItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED, 승인/실행 버튼은 NOT_PRESENT', () => {
    const postApi = view.recheckItems.find((item) => item.recheckItem === 'POST API 연결');
    const button = view.recheckItems.find((item) => item.recheckItem === '승인/실행 버튼');
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

  it('결과 객체와 JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const secretValue = 'real-secret-value';
    const secretView = buildNaverTokenIssuanceEnvAuthPresenceRecheckResultView(mockJob, {
      NAVER_COMMERCE_CLIENT_ID: 'id',
      NAVER_COMMERCE_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: 'https://example.test',
    });
    const serialized = JSON.stringify(secretView);
    assert.strictEqual(serialized.includes(secretValue), false);
  });
});
