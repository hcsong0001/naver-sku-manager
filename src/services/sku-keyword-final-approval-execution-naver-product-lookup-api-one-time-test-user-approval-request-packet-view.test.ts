import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView } from './sku-keyword-final-approval-execution-naver-product-lookup-api-one-time-test-user-approval-request-packet-view.service';

const mockJob = { id: 'test-job-266', status: 'PENDING' };

const ALL_PACKET_STATUSES = [
  'READINESS_GATE_CONFIRMED',
  'TOKEN_TEST_RESULT_CONFIRMED',
  'NON_RETENTION_AUDIT_CONFIRMED',
  'READY_IF_READINESS_GATE_READY',
  'BLOCKED_IF_READINESS_GATE_BLOCKED',
  'PENDING_USER_APPROVAL',
  'LOCKED_UNTIL_USER_APPROVAL',
  'LOCKED',
  'FORBIDDEN',
  'NOT_ACCESSED',
  'NOT_MODIFIED',
  'NOT_CONNECTED',
  'NOT_PRESENT',
  'PENDING_SEPARATE_APPROVAL',
  'READ_ONLY_INFO',
] as const;

describe('buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView - Task 266', () => {
  describe('Status and identity flags', () => {
    it('status is NAVER_PRODUCT_LOOKUP_API_ONE_TIME_TEST_USER_APPROVAL_REQUEST_PACKET_READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.status, 'NAVER_PRODUCT_LOOKUP_API_ONE_TIME_TEST_USER_APPROVAL_REQUEST_PACKET_READY');
    });

    it('isNaverProductLookupApiOneTimeTestUserApprovalRequestPacketReady is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isNaverProductLookupApiOneTimeTestUserApprovalRequestPacketReady, true);
    });

    it('isNaverProductLookupApiReadinessGateReady is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isNaverProductLookupApiReadinessGateReady, true);
    });

    it('isTokenIssuanceOneTimeTestResultReady is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestResultReady, true);
    });

    it('isTokenIssuanceOneTimeTestNonRetentionAuditSealed is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenIssuanceOneTimeTestNonRetentionAuditSealed, true);
    });

    it('isBatchJobResultDisplayOnly is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    });
  });

  describe('productLookupApprovalRequestPacketStatus - READY case', () => {
    it('productLookupApprovalRequestPacketStatus is APPROVAL_REQUEST_PACKET_READY when READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'SUCCESS', 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      );
      assert.strictEqual(view.productLookupApprovalRequestPacketStatus, 'APPROVAL_REQUEST_PACKET_READY');
    });

    it('isProductLookupApprovalRequestPacketReady is true when READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'SUCCESS', 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketReady, true);
    });

    it('isProductLookupApprovalRequestPacketBlockedByTokenFailure is false when READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'SUCCESS', 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByTokenFailure, false);
    });

    it('isProductLookupApprovalRequestPacketBlockedByEnvMissing is false when READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'SUCCESS', 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByEnvMissing, false);
    });
  });

  describe('productLookupApprovalRequestPacketStatus - TOKEN FAILURE case', () => {
    it('productLookupApprovalRequestPacketStatus is BLOCKED_BY_TOKEN_ISSUANCE_FAILURE when token failed', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      assert.strictEqual(view.productLookupApprovalRequestPacketStatus, 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_TOKEN_ISSUANCE_FAILURE');
    });

    it('isProductLookupApprovalRequestPacketReady is false when token failed', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketReady, false);
    });

    it('isProductLookupApprovalRequestPacketBlockedByTokenFailure is true when token failed', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByTokenFailure, true);
    });

    it('isProductLookupApprovalRequestPacketBlockedByEnvMissing is false when token failed', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByEnvMissing, false);
    });
  });

  describe('productLookupApprovalRequestPacketStatus - ENV MISSING case', () => {
    it('productLookupApprovalRequestPacketStatus is BLOCKED_BY_ENV_MISSING when env missing', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'ENV_MISSING', 'BLOCKED_BY_ENV_MISSING'
      );
      assert.strictEqual(view.productLookupApprovalRequestPacketStatus, 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_ENV_MISSING');
    });

    it('isProductLookupApprovalRequestPacketReady is false when env missing', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'ENV_MISSING', 'BLOCKED_BY_ENV_MISSING'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketReady, false);
    });

    it('isProductLookupApprovalRequestPacketBlockedByTokenFailure is false when env missing', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'ENV_MISSING', 'BLOCKED_BY_ENV_MISSING'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByTokenFailure, false);
    });

    it('isProductLookupApprovalRequestPacketBlockedByEnvMissing is true when env missing', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'ENV_MISSING', 'BLOCKED_BY_ENV_MISSING'
      );
      assert.strictEqual(view.isProductLookupApprovalRequestPacketBlockedByEnvMissing, true);
    });
  });

  describe('Approval flags', () => {
    it('isProductLookupApiApprovalRequired is true', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isProductLookupApiApprovalRequired, true);
    });

    it('isProductLookupApiApprovalGranted is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isProductLookupApiApprovalGranted, false);
    });

    it('isUserApprovalPhraseReceivedForProductLookupApiTest is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isUserApprovalPhraseReceivedForProductLookupApiTest, false);
    });
  });

  describe('Token non-issuance flags', () => {
    it('isTokenIssuanceExecutedInThisTask is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenIssuanceExecutedInThisTask, false);
    });

    it('isTokenIssued is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenIssued, false);
    });

    it('isTokenValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('isTokenReturnedToClient is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenReturnedToClient, false);
    });

    it('isTokenLoggedToConsole is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenLoggedToConsole, false);
    });

    it('isTokenStoredInDb is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenStoredInDb, false);
    });

    it('isTokenValueIncludedInView is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isTokenValueIncludedInView, false);
    });
  });

  describe('Env/Auth non-exposure flags', () => {
    it('isEnvFileDirectlyAccessed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    });

    it('isEnvFileModified is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isEnvFileModified, false);
    });

    it('isAuthKeyValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    });

    it('isSecretLogged is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isSecretLogged, false);
    });

    it('isEnvValueDisplayed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isEnvValueDisplayed, false);
    });

    it('hasEnvFileAccess is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasEnvFileAccess, false);
    });

    it('hasAuthKeyAccess is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasAuthKeyAccess, false);
    });
  });

  describe('API non-call flags', () => {
    it('isNaverApiCalledInThisTask is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isNaverApiCalledInThisTask, false);
    });

    it('isProductLookupApiCalled is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isProductLookupApiCalled, false);
    });

    it('isProductUpdateApiCalled is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isProductUpdateApiCalled, false);
    });

    it('isPriceOrStockChanged is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isPriceOrStockChanged, false);
    });
  });

  describe('Execution safety flags', () => {
    it('isPostApiConnected is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isPostApiConnected, false);
    });

    it('hasExecutionButton is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasExecutionButton, false);
    });

    it('hasSubmitAction is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasSubmitAction, false);
    });

    it('isActualApprovalSubmissionAllowed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    });

    it('isApprovalSubmitted is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isApprovalSubmitted, false);
    });

    it('isExecutionAllowed is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isExecutionAllowed, false);
    });

    it('isMutationConnected is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isMutationConnected, false);
    });

    it('isLiveExecutionEnabled is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.isLiveExecutionEnabled, false);
    });

    it('hasApprovalRequestButton is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasApprovalRequestButton, false);
    });

    it('hasWorkerTrigger is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasWorkerTrigger, false);
    });

    it('hasQueueTrigger is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasQueueTrigger, false);
    });

    it('hasAdapterTrigger is false', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.hasAdapterTrigger, false);
    });
  });

  describe('packetItems structure', () => {
    it('packetItems has 20 items', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.packetItems.length, 20);
    });

    it('all packetItems have packetItem, status, meaning fields', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      view.packetItems.forEach((item, i) => {
        assert.ok(typeof item.packetItem === 'string' && item.packetItem.length > 0, `item[${i}].packetItem missing`);
        assert.ok(typeof item.status === 'string' && item.status.length > 0, `item[${i}].status missing`);
        assert.ok(typeof item.meaning === 'string' && item.meaning.length > 0, `item[${i}].meaning missing`);
      });
    });

    it('packetItems contains all recommended status values', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const statuses = view.packetItems.map(i => i.status);
      for (const expected of ALL_PACKET_STATUSES) {
        assert.ok(statuses.includes(expected), `Missing status: ${expected}`);
      }
    });

    it('실제 상품 조회 API 호출 항목은 LOCKED_UNTIL_USER_APPROVAL', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const item = view.packetItems.find(i => i.packetItem.includes('실제 상품 조회 API'));
      assert.ok(item, '실제 상품 조회 API 항목 없음');
      assert.strictEqual(item!.status, 'LOCKED_UNTIL_USER_APPROVAL');
    });

    it('다음 단계 항목은 PENDING_SEPARATE_APPROVAL', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const item = view.packetItems.find(i => i.packetItem.includes('다음 단계'));
      assert.ok(item, '다음 단계 항목 없음');
      assert.strictEqual(item!.status, 'PENDING_SEPARATE_APPROVAL');
    });

    it('READY 상태일 때 승인 요청 패킷 항목은 READY_IF_READINESS_GATE_READY', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'SUCCESS', 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      );
      const item = view.packetItems.find(i => i.packetItem.includes('상품 조회 승인 요청 패킷'));
      assert.ok(item, '상품 조회 승인 요청 패킷 항목 없음');
      assert.strictEqual(item!.status, 'READY_IF_READINESS_GATE_READY');
    });

    it('BLOCKED 상태일 때 승인 요청 패킷 항목은 BLOCKED_IF_READINESS_GATE_BLOCKED', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      const item = view.packetItems.find(i => i.packetItem.includes('상품 조회 승인 요청 패킷'));
      assert.ok(item, '상품 조회 승인 요청 패킷 항목 없음');
      assert.strictEqual(item!.status, 'BLOCKED_IF_READINESS_GATE_BLOCKED');
    });

    it('packetItems count remains 20 on BLOCKED case', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      assert.strictEqual(view.packetItems.length, 20);
    });

    it('packetItems count remains 20 on ENV_MISSING case', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'ENV_MISSING', 'BLOCKED_BY_ENV_MISSING'
      );
      assert.strictEqual(view.packetItems.length, 20);
    });
  });

  describe('User approval script', () => {
    it('userApprovalScriptForNextTask contains Task 267', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.ok(view.userApprovalScriptForNextTask.includes('Task 267'), 'Script should reference Task 267');
    });

    it('userApprovalScriptForNextTask contains read-only keyword', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.ok(view.userApprovalScriptForNextTask.includes('read-only'), 'Script should mention read-only');
    });

    it('userApprovalScriptForNextTask contains non-exposure reporting requirement', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.ok(view.userApprovalScriptForNextTask.includes('비노출 방식'), 'Script should mention non-exposure reporting');
    });

    it('userApprovalNotice is a non-empty string', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.ok(typeof view.userApprovalNotice === 'string' && view.userApprovalNotice.length > 0);
    });

    it('userApprovalNotice says this is notice only, not actual approval', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.ok(view.userApprovalNotice.includes('안내'), 'Notice should clarify it is just a notice');
    });
  });

  describe('JSON output security', () => {
    it('JSON output does not contain access_token key', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('"access_token"'), 'JSON must not contain access_token field');
    });

    it('JSON output does not contain base64-padded values', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), 'JSON must not contain base64-padded values');
    });

    it('JSON output does not contain Bearer token pattern', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/Bearer\s+[A-Za-z0-9._-]{10,}/), 'JSON must not contain Bearer token');
    });

    it('JSON output does not expose raw error', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
        mockJob, 'FAILURE', 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      );
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('client_secret='), 'JSON must not expose client_secret value');
    });
  });

  describe('Default parameters', () => {
    it('default productLookupReadinessStatus is READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.productLookupReadinessStatus, 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE');
    });

    it('default issuanceTestStatus is SUCCESS', () => {
      const view = buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(mockJob);
      assert.strictEqual(view.issuanceTestStatus, 'SUCCESS');
    });
  });
});
