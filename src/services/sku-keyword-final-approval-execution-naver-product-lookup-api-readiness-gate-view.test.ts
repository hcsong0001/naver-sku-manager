import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverProductLookupApiReadinessGateView } from './sku-keyword-final-approval-execution-naver-product-lookup-api-readiness-gate-view.service';

const mockJob = { id: 'test-job-265', status: 'PENDING' };

const ALL_GATE_STATUSES = [
  'TOKEN_TEST_RESULT_CONFIRMED',
  'NON_RETENTION_AUDIT_CONFIRMED',
  'TOKEN_VALUE_NOT_INCLUDED',
  'TOKEN_NOT_STORED_IN_DB',
  'TOKEN_NOT_LOGGED',
  'ERROR_REASON_REDACTED',
  'READY_IF_TOKEN_TEST_SUCCESS',
  'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS',
  'LOCKED_UNTIL_SEPARATE_APPROVAL',
  'LOCKED',
  'FORBIDDEN',
  'NOT_ACCESSED',
  'NOT_MODIFIED',
  'NOT_CONNECTED',
  'NOT_PRESENT',
  'PENDING_SEPARATE_APPROVAL',
  'READ_ONLY_INFO',
] as const;

describe('buildNaverProductLookupApiReadinessGateView - Task 265', () => {
  describe('Status and identity flags', () => {
    it('status is NAVER_PRODUCT_LOOKUP_API_READINESS_GATE_READY', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.status, 'NAVER_PRODUCT_LOOKUP_API_READINESS_GATE_READY');
    });

    it('isNaverProductLookupApiReadinessGateReady is true', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isNaverProductLookupApiReadinessGateReady, true);
    });

    it('isTokenIssuanceOneTimeTestResultReady is true', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestResultReady, true);
    });

    it('isTokenIssuanceOneTimeTestNonRetentionAuditSealed is true', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestNonRetentionAuditSealed, true);
    });

    it('isBatchJobResultDisplayOnly is true', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    });

    it('default issuanceTestStatus is SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.issuanceTestStatus, 'SUCCESS');
    });
  });

  describe('productLookupReadinessStatus - SUCCESS case', () => {
    it('productLookupReadinessStatus is READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE on SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      assert.strictEqual(view.productLookupReadinessStatus, 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE');
    });

    it('isReadyForProductLookupApiApprovalGate is true on SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      assert.strictEqual(view.isReadyForProductLookupApiApprovalGate, true);
    });

    it('isProductLookupApiBlockedByTokenFailure is false on SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      assert.strictEqual(view.isProductLookupApiBlockedByTokenFailure, false);
    });

    it('isProductLookupApiBlockedByEnvMissing is false on SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      assert.strictEqual(view.isProductLookupApiBlockedByEnvMissing, false);
    });
  });

  describe('productLookupReadinessStatus - FAILURE case', () => {
    it('productLookupReadinessStatus is BLOCKED_BY_TOKEN_ISSUANCE_FAILURE on FAILURE', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.productLookupReadinessStatus, 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE');
    });

    it('isReadyForProductLookupApiApprovalGate is false on FAILURE', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.isReadyForProductLookupApiApprovalGate, false);
    });

    it('isProductLookupApiBlockedByTokenFailure is true on FAILURE', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.isProductLookupApiBlockedByTokenFailure, true);
    });

    it('isProductLookupApiBlockedByEnvMissing is false on FAILURE', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.isProductLookupApiBlockedByEnvMissing, false);
    });
  });

  describe('productLookupReadinessStatus - ENV_MISSING case', () => {
    it('productLookupReadinessStatus is BLOCKED_BY_ENV_MISSING on ENV_MISSING', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.productLookupReadinessStatus, 'BLOCKED_BY_ENV_MISSING');
    });

    it('isReadyForProductLookupApiApprovalGate is false on ENV_MISSING', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.isReadyForProductLookupApiApprovalGate, false);
    });

    it('isProductLookupApiBlockedByTokenFailure is false on ENV_MISSING', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.isProductLookupApiBlockedByTokenFailure, false);
    });

    it('isProductLookupApiBlockedByEnvMissing is true on ENV_MISSING', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.isProductLookupApiBlockedByEnvMissing, true);
    });
  });

  describe('Product Lookup API approval flags', () => {
    it('isProductLookupApiApprovalRequired is true', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isProductLookupApiApprovalRequired, true);
    });

    it('isProductLookupApiApprovalGranted is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isProductLookupApiApprovalGranted, false);
    });
  });

  describe('Token non-issuance flags', () => {
    it('isTokenIssuanceExecutedInThisTask is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenIssuanceExecutedInThisTask, false);
    });

    it('isTokenIssued is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenIssued, false);
    });

    it('isTokenValueIncludedInView is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenValueIncludedInView, false);
    });

    it('isTokenValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('isTokenReturnedToClient is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenReturnedToClient, false);
    });

    it('isTokenLoggedToConsole is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenLoggedToConsole, false);
    });

    it('isTokenStoredInDb is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isTokenStoredInDb, false);
    });
  });

  describe('Env/Auth non-exposure flags', () => {
    it('isEnvFileDirectlyAccessed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    });

    it('isEnvFileModified is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isEnvFileModified, false);
    });

    it('isAuthKeyValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    });

    it('isSecretLogged is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isSecretLogged, false);
    });

    it('isEnvValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isEnvValueDisplayed, false);
    });

    it('hasEnvFileAccess is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasEnvFileAccess, false);
    });

    it('hasAuthKeyAccess is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasAuthKeyAccess, false);
    });
  });

  describe('API non-call flags', () => {
    it('isNaverApiCalledInThisTask is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isNaverApiCalledInThisTask, false);
    });

    it('isProductLookupApiCalled is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isProductLookupApiCalled, false);
    });

    it('isProductUpdateApiCalled is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isProductUpdateApiCalled, false);
    });

    it('isPriceOrStockChanged is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isPriceOrStockChanged, false);
    });
  });

  describe('Execution safety flags', () => {
    it('isPostApiConnected is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isPostApiConnected, false);
    });

    it('hasExecutionButton is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasExecutionButton, false);
    });

    it('hasSubmitAction is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasSubmitAction, false);
    });

    it('isActualApprovalSubmissionAllowed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    });

    it('isApprovalSubmitted is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isApprovalSubmitted, false);
    });

    it('isExecutionAllowed is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isExecutionAllowed, false);
    });

    it('isMutationConnected is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isMutationConnected, false);
    });

    it('isLiveExecutionEnabled is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.isLiveExecutionEnabled, false);
    });

    it('hasApprovalRequestButton is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasApprovalRequestButton, false);
    });

    it('hasWorkerTrigger is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasWorkerTrigger, false);
    });

    it('hasQueueTrigger is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasQueueTrigger, false);
    });

    it('hasAdapterTrigger is false', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.hasAdapterTrigger, false);
    });
  });

  describe('gateItems structure', () => {
    it('gateItems has 22 items', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.strictEqual(view.gateItems.length, 22);
    });

    it('all gateItems have gateItem, status, meaning fields', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      view.gateItems.forEach((item, i) => {
        assert.ok(typeof item.gateItem === 'string' && item.gateItem.length > 0, `item[${i}].gateItem missing`);
        assert.ok(typeof item.status === 'string' && item.status.length > 0, `item[${i}].status missing`);
        assert.ok(typeof item.meaning === 'string' && item.meaning.length > 0, `item[${i}].meaning missing`);
      });
    });

    it('gateItems contains all recommended status values', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const statuses = view.gateItems.map(i => i.status);
      for (const expected of ALL_GATE_STATUSES) {
        assert.ok(statuses.includes(expected), `Missing status: ${expected}`);
      }
    });

    it('상품 조회 API 호출 항목은 LOCKED_UNTIL_SEPARATE_APPROVAL', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const item = view.gateItems.find(i => i.gateItem.includes('실제 상품 조회 API'));
      assert.ok(item, '실제 상품 조회 API 항목 없음');
      assert.strictEqual(item!.status, 'LOCKED_UNTIL_SEPARATE_APPROVAL');
    });

    it('다음 단계 항목은 PENDING_SEPARATE_APPROVAL', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const item = view.gateItems.find(i => i.gateItem.includes('다음 단계'));
      assert.ok(item, '다음 단계 항목 없음');
      assert.strictEqual(item!.status, 'PENDING_SEPARATE_APPROVAL');
    });

    it('BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS 항목 존재', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const item = view.gateItems.find(i => i.status === 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS');
      assert.ok(item, 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS 항목 없음');
    });

    it('SUCCESS일 때 상품 조회 준비 상태 항목은 READY_IF_TOKEN_TEST_SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      const item = view.gateItems.find(i => i.gateItem.includes('상품 조회 API 준비 상태'));
      assert.ok(item, '상품 조회 API 준비 상태 항목 없음');
      assert.strictEqual(item!.status, 'READY_IF_TOKEN_TEST_SUCCESS');
    });

    it('FAILURE일 때 상품 조회 준비 상태 항목은 BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      const item = view.gateItems.find(i => i.gateItem.includes('상품 조회 API 준비 상태'));
      assert.ok(item, '상품 조회 API 준비 상태 항목 없음');
      assert.strictEqual(item!.status, 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS');
    });

    it('gateItems count remains 22 on FAILURE', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.gateItems.length, 22);
    });

    it('gateItems count remains 22 on ENV_MISSING', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.gateItems.length, 22);
    });
  });

  describe('JSON output security', () => {
    it('JSON output does not contain access_token key', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('"access_token"'), 'JSON output must not contain access_token field');
    });

    it('JSON output does not contain base64-padded values', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), 'JSON must not contain base64-padded values');
    });

    it('JSON output does not contain Bearer token pattern', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/Bearer\s+[A-Za-z0-9._-]{10,}/), 'JSON must not contain Bearer token');
    });

    it('JSON output does not contain raw error', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('client_secret='), 'JSON must not expose client_secret value');
    });
  });

  describe('issuanceTestStatus reflected in view', () => {
    it('issuanceTestStatus === SUCCESS is reflected', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'SUCCESS');
      assert.strictEqual(view.issuanceTestStatus, 'SUCCESS');
    });

    it('issuanceTestStatus === FAILURE is reflected', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'FAILURE');
      assert.strictEqual(view.issuanceTestStatus, 'FAILURE');
    });

    it('issuanceTestStatus === ENV_MISSING is reflected', () => {
      const view = buildNaverProductLookupApiReadinessGateView(mockJob, 'ENV_MISSING');
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
    });

    it('issuanceTestStatus is one of SUCCESS|FAILURE|ENV_MISSING', () => {
      const allowed = ['SUCCESS', 'FAILURE', 'ENV_MISSING'];
      const view = buildNaverProductLookupApiReadinessGateView(mockJob);
      assert.ok(allowed.includes(view.issuanceTestStatus));
    });
  });
});
