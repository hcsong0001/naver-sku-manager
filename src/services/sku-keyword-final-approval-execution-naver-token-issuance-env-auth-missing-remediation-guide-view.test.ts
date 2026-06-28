import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverTokenIssuanceEnvAuthMissingRemediationGuideView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-missing-remediation-guide-view.service';

const mockJob = {};

describe('Task 248 Naver Token Issuance Env Auth Missing Remediation Guide View', () => {
  const view = buildNaverTokenIssuanceEnvAuthMissingRemediationGuideView(mockJob, {});

  it('status === ENV_AUTH_MISSING_REMEDIATION_GUIDE_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_MISSING_REMEDIATION_GUIDE_READY');
  });

  it('필수 상태/개수 플래그가 명세와 일치함', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthMissingRemediationGuideReady, true);
    assert.strictEqual(view.isEnvAuthPresenceCheckResultReady, true);
    assert.strictEqual(view.presencePresentCount, 0);
    assert.strictEqual(view.presenceMissingCount, 3);
    assert.strictEqual(view.isMissingEnvAuthDetected, true);
    assert.strictEqual(view.isTokenIssuanceBlockedByMissingEnvAuth, true);
    assert.strictEqual(view.isUserActionRequiredForEnvAuth, true);
    assert.strictEqual(view.isEnvPresenceCheckExecuted, true);
    assert.strictEqual(view.isAuthKeyPresenceCheckExecuted, true);
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

  it('guideItems에 모든 권장 상태값 포함', () => {
    const statuses = new Set(view.guideItems.map((item) => item.status));
    assert.ok(statuses.has('PRESENCE_RESULT_CONFIRMED'));
    assert.ok(statuses.has('MISSING_DETECTED'));
    assert.ok(statuses.has('BLOCKED_BY_MISSING_ENV_AUTH'));
    assert.ok(statuses.has('USER_ACTION_REQUIRED'));
    assert.ok(statuses.has('NOT_ACCESSED'));
    assert.ok(statuses.has('NOT_MODIFIED'));
    assert.ok(statuses.has('NOT_DISPLAYED'));
    assert.ok(statuses.has('NOT_LOGGED'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('현재 확인 결과 / Token 발급 가능 여부 / 사용자 보정 필요 항목 상태가 맞음', () => {
    const currentResult = view.guideItems.find((item) => item.guideItem === '현재 확인 결과');
    const tokenEligibility = view.guideItems.find((item) => item.guideItem === 'Token 발급 가능 여부');
    const userAction = view.guideItems.find((item) => item.guideItem === '사용자 보정 필요');

    assert.ok(currentResult);
    assert.ok(tokenEligibility);
    assert.ok(userAction);
    assert.strictEqual(currentResult?.status, 'MISSING_DETECTED');
    assert.strictEqual(tokenEligibility?.status, 'BLOCKED_BY_MISSING_ENV_AUTH');
    assert.strictEqual(userAction?.status, 'USER_ACTION_REQUIRED');
  });

  it('".env" 직접 열람 / 자동 수정 항목 상태가 맞음', () => {
    const accessed = view.guideItems.find((item) => item.guideItem === '".env" 직접 열람');
    const modified = view.guideItems.find((item) => item.guideItem === '".env" 자동 수정');

    assert.ok(accessed);
    assert.ok(modified);
    assert.strictEqual(accessed?.status, 'NOT_ACCESSED');
    assert.strictEqual(modified?.status, 'NOT_MODIFIED');
  });

  it('인증키 값 표시 / Secret 로그 출력 상태가 맞음', () => {
    const authValue = view.guideItems.find((item) => item.guideItem === '인증키 값 표시');
    const secretLog = view.guideItems.find((item) => item.guideItem === 'Secret 로그 출력');

    assert.ok(authValue);
    assert.ok(secretLog);
    assert.strictEqual(authValue?.status, 'NOT_DISPLAYED');
    assert.strictEqual(secretLog?.status, 'NOT_LOGGED');
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
      const item = view.guideItems.find((entry) => entry.guideItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED, 승인/실행 버튼은 NOT_PRESENT', () => {
    const postApi = view.guideItems.find((item) => item.guideItem === 'POST API 연결');
    const button = view.guideItems.find((item) => item.guideItem === '승인/실행 버튼');

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
});
