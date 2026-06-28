import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverTokenIssuanceEnvAuthUserSetupChecklistView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-user-setup-checklist-view.service';

const mockJob = {};

describe('Task 249 Naver Token Issuance Env Auth User Setup Checklist View', () => {
  const secretValue = 'real-secret-value';
  const view = buildNaverTokenIssuanceEnvAuthUserSetupChecklistView(mockJob, {});

  it('status === ENV_AUTH_USER_SETUP_CHECKLIST_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_USER_SETUP_CHECKLIST_READY');
  });

  it('필수 상태/개수 플래그가 명세와 일치함', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthUserSetupChecklistReady, true);
    assert.strictEqual(view.isEnvAuthMissingRemediationGuideReady, true);
    assert.strictEqual(view.presencePresentCount, 0);
    assert.strictEqual(view.presenceMissingCount, 3);
    assert.strictEqual(view.isMissingEnvAuthDetected, true);
    assert.strictEqual(view.isUserSetupRequiredForEnvAuth, true);
    assert.strictEqual(view.isNextStepRecheckRequired, true);
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

  it('checklistItems에 모든 권장 상태값 포함', () => {
    const statuses = new Set(view.checklistItems.map((item) => item.status));
    assert.ok(statuses.has('REMEDIATION_GUIDE_CONFIRMED'));
    assert.ok(statuses.has('MISSING_DETECTED'));
    assert.ok(statuses.has('USER_SETUP_REQUIRED'));
    assert.ok(statuses.has('FORBIDDEN'));
    assert.ok(statuses.has('KEY_NAMES_ONLY'));
    assert.ok(statuses.has('NEXT_STEP_RECHECK_REQUIRED'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('사용자 직접 설정 필요 항목은 USER_SETUP_REQUIRED', () => {
    const item = view.checklistItems.find((entry) => entry.checklistItem === '사용자 직접 설정 필요');
    assert.ok(item);
    assert.strictEqual(item?.status, 'USER_SETUP_REQUIRED');
  });

  it('개발 에이전트 ".env" 열람/수정 항목은 FORBIDDEN', () => {
    const readItem = view.checklistItems.find((entry) => entry.checklistItem === '개발 에이전트 .env 열람');
    const writeItem = view.checklistItems.find((entry) => entry.checklistItem === '개발 에이전트 .env 수정');
    assert.ok(readItem);
    assert.ok(writeItem);
    assert.strictEqual(readItem?.status, 'FORBIDDEN');
    assert.strictEqual(writeItem?.status, 'FORBIDDEN');
  });

  it('필수 키 안내 항목은 KEY_NAMES_ONLY', () => {
    const item = view.checklistItems.find((entry) => entry.checklistItem === '필수 키 안내');
    assert.ok(item);
    assert.strictEqual(item?.status, 'KEY_NAMES_ONLY');
  });

  it('설정 후 재확인 항목은 NEXT_STEP_RECHECK_REQUIRED', () => {
    const item = view.checklistItems.find((entry) => entry.checklistItem === '설정 후 재확인');
    assert.ok(item);
    assert.strictEqual(item?.status, 'NEXT_STEP_RECHECK_REQUIRED');
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
      const item = view.checklistItems.find((entry) => entry.checklistItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED, 승인/실행 버튼은 NOT_PRESENT', () => {
    const postApi = view.checklistItems.find((item) => item.checklistItem === 'POST API 연결');
    const button = view.checklistItems.find((item) => item.checklistItem === '승인/실행 버튼');
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

  it('결과 객체에 실제 secret value가 포함되지 않음', () => {
    const secretView = buildNaverTokenIssuanceEnvAuthUserSetupChecklistView(mockJob, {
      NAVER_API_CLIENT_ID: '',
      NAVER_API_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: '',
    });
    assert.strictEqual(JSON.stringify(secretView).includes(secretValue), false);
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const secretView = buildNaverTokenIssuanceEnvAuthUserSetupChecklistView(mockJob, {
      NAVER_API_CLIENT_ID: '',
      NAVER_API_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: '',
    });
    const serialized = JSON.stringify(secretView);
    assert.strictEqual(serialized.includes(secretValue), false);
  });
});
