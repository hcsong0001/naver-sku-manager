import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView } from './sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-non-retention-audit-seal-view.service';

const mockJob = { id: 'test-job-264', status: 'PENDING' };

const ALL_AUDIT_STATUSES = [
  'TOKEN_TEST_RESULT_CONFIRMED',
  'USER_APPROVAL_CONFIRMED',
  'ONE_TIME_TEST_EXECUTED',
  'RESULT_STATUS_RECORDED',
  'NOT_INCLUDED',
  'NOT_RETURNED_TO_CLIENT',
  'NOT_STORED_IN_DB',
  'NOT_LOGGED',
  'NOT_DISPLAYED',
  'NOT_ACCESSED',
  'REDACTED',
  'NOT_PROPAGATED',
  'LOCKED',
  'NOT_CONNECTED',
  'NOT_PRESENT',
  'PENDING_SEPARATE_APPROVAL',
  'READ_ONLY_INFO',
] as const;

describe('buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView - Task 264', () => {
  describe('Status and identity flags', () => {
    it('status is TOKEN_ISSUANCE_ONE_TIME_TEST_NON_RETENTION_AUDIT_SEALED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.status, 'TOKEN_ISSUANCE_ONE_TIME_TEST_NON_RETENTION_AUDIT_SEALED');
    });

    it('isTokenIssuanceOneTimeTestResultReady is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestResultReady, true);
    });

    it('isTokenIssuanceOneTimeTestNonRetentionAuditSealed is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestNonRetentionAuditSealed, true);
    });

    it('isOneTimeTokenIssuanceTestExecuted is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isOneTimeTokenIssuanceTestExecuted, true);
    });

    it('isUserFinalApprovalReceivedForTokenIssuanceTest is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isUserFinalApprovalReceivedForTokenIssuanceTest, true);
    });

    it('isBatchJobResultDisplayOnly is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    });
  });

  describe('issuanceTestStatus variations', () => {
    it('default issuanceTestStatus is SUCCESS', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.issuanceTestStatus, 'SUCCESS');
    });

    it('accepts FAILURE as issuanceTestStatus', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'FAILURE');
      assert.strictEqual(view.issuanceTestStatus, 'FAILURE');
    });

    it('accepts ENV_MISSING as issuanceTestStatus', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
    });

    it('issuanceTestStatus is one of SUCCESS | FAILURE | ENV_MISSING', () => {
      const allowed = ['SUCCESS', 'FAILURE', 'ENV_MISSING'];
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.ok(allowed.includes(view.issuanceTestStatus));
    });

    it('isIssuanceTestStatusRecorded is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isIssuanceTestStatusRecorded, true);
    });

    it('isErrorReasonRedacted is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isErrorReasonRedacted, true);
    });
  });

  describe('Token non-retention flags', () => {
    it('isTokenIssuanceExecutedInThisTask is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenIssuanceExecutedInThisTask, false);
    });

    it('isTokenIssued is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenIssued, false);
    });

    it('isTokenValueIncludedInView is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenValueIncludedInView, false);
    });

    it('isTokenValueDisplayed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('isTokenReturnedToClient is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenReturnedToClient, false);
    });

    it('isTokenLoggedToConsole is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenLoggedToConsole, false);
    });

    it('isTokenStored is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenStored, false);
    });

    it('isTokenStoredInDb is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isTokenStoredInDb, false);
    });
  });

  describe('Env/Auth non-exposure flags', () => {
    it('isEnvFileDirectlyAccessed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    });

    it('isEnvFileModified is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isEnvFileModified, false);
    });

    it('isEnvValueDisplayed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isEnvValueDisplayed, false);
    });

    it('isAuthKeyValueDisplayed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    });

    it('isSecretLogged is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isSecretLogged, false);
    });

    it('hasEnvFileAccess is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasEnvFileAccess, false);
    });

    it('hasAuthKeyAccess is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasAuthKeyAccess, false);
    });
  });

  describe('API non-propagation flags', () => {
    it('isNaverApiCalledInThisTask is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isNaverApiCalledInThisTask, false);
    });

    it('isProductLookupApiCalled is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isProductLookupApiCalled, false);
    });

    it('isProductUpdateApiCalled is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isProductUpdateApiCalled, false);
    });

    it('isPriceOrStockChanged is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isPriceOrStockChanged, false);
    });
  });

  describe('Execution safety flags', () => {
    it('isActualApprovalSubmissionAllowed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    });

    it('isApprovalSubmitted is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isApprovalSubmitted, false);
    });

    it('isExecutionAllowed is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isExecutionAllowed, false);
    });

    it('isPostApiConnected is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isPostApiConnected, false);
    });

    it('isMutationConnected is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isMutationConnected, false);
    });

    it('isLiveExecutionEnabled is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isLiveExecutionEnabled, false);
    });

    it('hasApprovalRequestButton is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasApprovalRequestButton, false);
    });

    it('hasExecutionButton is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasExecutionButton, false);
    });

    it('hasSubmitAction is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasSubmitAction, false);
    });

    it('hasWorkerTrigger is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasWorkerTrigger, false);
    });

    it('hasQueueTrigger is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasQueueTrigger, false);
    });

    it('hasAdapterTrigger is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.hasAdapterTrigger, false);
    });
  });

  describe('Product API Gate flags', () => {
    it('isReadyForProductApiGate is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isReadyForProductApiGate, true);
    });

    it('isProductApiGateApprovalRequired is true', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isProductApiGateApprovalRequired, true);
    });

    it('isProductApiGateApprovalGranted is false', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.isProductApiGateApprovalGranted, false);
    });
  });

  describe('auditItems structure', () => {
    it('auditItems has 20 items', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      assert.strictEqual(view.auditItems.length, 20);
    });

    it('all auditItems have auditItem, status, meaning fields', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      view.auditItems.forEach((item, i) => {
        assert.ok(typeof item.auditItem === 'string' && item.auditItem.length > 0, `item[${i}].auditItem missing`);
        assert.ok(typeof item.status === 'string' && item.status.length > 0, `item[${i}].status missing`);
        assert.ok(typeof item.meaning === 'string' && item.meaning.length > 0, `item[${i}].meaning missing`);
      });
    });

    it('auditItems contains all recommended status values', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const statuses = view.auditItems.map(i => i.status);
      for (const expected of ALL_AUDIT_STATUSES) {
        assert.ok(statuses.includes(expected), `Missing status: ${expected}`);
      }
    });

    it('Token 값 view 포함 여부 항목은 NOT_INCLUDED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('Token 값 view 포함'));
      assert.ok(item, 'Token 값 view 포함 항목 없음');
      assert.strictEqual(item!.status, 'NOT_INCLUDED');
    });

    it('Token 클라이언트 반환 여부 항목은 NOT_RETURNED_TO_CLIENT', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('클라이언트 반환'));
      assert.ok(item, 'Token 클라이언트 반환 항목 없음');
      assert.strictEqual(item!.status, 'NOT_RETURNED_TO_CLIENT');
    });

    it('Token DB 저장 여부 항목은 NOT_STORED_IN_DB', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('DB 저장'));
      assert.ok(item, 'Token DB 저장 항목 없음');
      assert.strictEqual(item!.status, 'NOT_STORED_IN_DB');
    });

    it('Token 로그 출력 여부 항목은 NOT_LOGGED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('로그 출력'));
      assert.ok(item, 'Token 로그 출력 항목 없음');
      assert.strictEqual(item!.status, 'NOT_LOGGED');
    });

    it('Error Reason 처리 항목은 REDACTED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('Error Reason'));
      assert.ok(item, 'Error Reason 항목 없음');
      assert.strictEqual(item!.status, 'REDACTED');
    });

    it('상품 조회 API 전파 항목은 NOT_PROPAGATED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('상품 조회 API'));
      assert.ok(item, '상품 조회 API 항목 없음');
      assert.strictEqual(item!.status, 'NOT_PROPAGATED');
    });

    it('상품 수정 API 전파 항목은 NOT_PROPAGATED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('상품 수정 API'));
      assert.ok(item, '상품 수정 API 항목 없음');
      assert.strictEqual(item!.status, 'NOT_PROPAGATED');
    });

    it('다음 단계 항목은 PENDING_SEPARATE_APPROVAL', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const item = view.auditItems.find(i => i.auditItem.includes('다음 단계'));
      assert.ok(item, '다음 단계 항목 없음');
      assert.strictEqual(item!.status, 'PENDING_SEPARATE_APPROVAL');
    });
  });

  describe('JSON output security', () => {
    it('JSON output does not contain access_token key-value', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('"access_token"'), 'JSON output must not contain access_token field');
    });

    it('JSON output does not contain base64-padded values', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), 'JSON must not contain base64-padded values');
    });

    it('JSON output does not contain Authorization header pattern', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/Bearer\s+[A-Za-z0-9._-]{10,}/), 'JSON must not contain Bearer token');
    });

    it('JSON output does not contain client_secret pattern', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/client_secret=[^"&\s]{5,}/i), 'JSON must not contain client_secret value');
    });
  });

  describe('FAILURE issuanceTestStatus variant', () => {
    it('all non-retention flags remain false on FAILURE', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'FAILURE');
      assert.strictEqual(view.isTokenValueDisplayed, false);
      assert.strictEqual(view.isTokenStoredInDb, false);
      assert.strictEqual(view.isTokenReturnedToClient, false);
      assert.strictEqual(view.isTokenLoggedToConsole, false);
      assert.strictEqual(view.isTokenIssuanceExecutedInThisTask, false);
    });

    it('FAILURE variant still has 20 auditItems', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'FAILURE');
      assert.strictEqual(view.auditItems.length, 20);
    });

    it('FAILURE variant auditItems still contain RESULT_STATUS_RECORDED', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'FAILURE');
      const item = view.auditItems.find(i => i.status === 'RESULT_STATUS_RECORDED');
      assert.ok(item, 'RESULT_STATUS_RECORDED missing in FAILURE variant');
      assert.ok(item!.meaning.includes('FAILURE'), 'FAILURE variant meaning should mention FAILURE');
    });
  });

  describe('ENV_MISSING issuanceTestStatus variant', () => {
    it('ENV_MISSING variant still has 20 auditItems', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.auditItems.length, 20);
    });

    it('ENV_MISSING variant issuanceTestStatus is ENV_MISSING', () => {
      const view = buildNaverTokenIssuanceOneTimeTestNonRetentionAuditSealView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
    });
  });
});
