import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceOneTimeTestResultView } from './sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-result-view.service';
import type { NaverTokenResponse } from '@/src/types/naver-product.types';

const mockJob = { id: 'test-job-263', status: 'PENDING' };

const mockSuccessTokenFetcher = async (_clientId: string, _clientSecret: string): Promise<NaverTokenResponse> => ({
  access_token: 'MOCK_TOKEN_DO_NOT_EXPOSE',
  token_type: 'Bearer',
  expires_in: 86400,
});

const mockFailureTokenFetcher = async (_clientId: string, _clientSecret: string): Promise<NaverTokenResponse> => {
  throw new Error('네이버 토큰 발급 실패 (401): Unauthorized');
};

const mockEnvPresent: Record<string, string | undefined> = {
  NAVER_COMMERCE_CLIENT_ID: 'mock-client-id',
  NAVER_COMMERCE_CLIENT_SECRET: 'mock-client-secret',
  NAVER_COMMERCE_API_BASE_URL: 'https://api.commerce.naver.com',
};

const mockEnvMissing: Record<string, string | undefined> = {};

describe('buildNaverTokenIssuanceOneTimeTestResultView - Task 263', () => {
  describe('ENV_MISSING case', () => {
    it('returns ENV_MISSING when CLIENT_ID is absent', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        {}
      );
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
      assert.strictEqual(view.isNaverTokenIssuanceTestExecuted, false);
      assert.strictEqual(view.isTokenIssuedForTest, false);
    });

    it('returns ENV_MISSING when CLIENT_SECRET is absent', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        { NAVER_COMMERCE_CLIENT_ID: 'some-id' }
      );
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
    });

    it('returns ENV_MISSING when values are whitespace-only', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        { NAVER_COMMERCE_CLIENT_ID: '   ', NAVER_COMMERCE_CLIENT_SECRET: '\t' }
      );
      assert.strictEqual(view.issuanceTestStatus, 'ENV_MISSING');
    });
  });

  describe('SUCCESS case', () => {
    it('returns SUCCESS when tokenFetcher resolves', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.issuanceTestStatus, 'SUCCESS');
      assert.strictEqual(view.isNaverTokenIssuanceTestExecuted, true);
      assert.strictEqual(view.isTokenIssuedForTest, true);
    });

    it('tokenTypePresent is true when token_type is Bearer', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.tokenTypePresent, true);
    });

    it('expiresInPresent is true when expires_in is positive', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.expiresInPresent, true);
    });

    it('httpStatusSuccessful is true on success', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.httpStatusSuccessful, true);
    });

    it('errorReason is null on success', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.errorReason, null);
    });
  });

  describe('FAILURE case', () => {
    it('returns FAILURE when tokenFetcher throws', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.issuanceTestStatus, 'FAILURE');
      assert.strictEqual(view.isNaverTokenIssuanceTestExecuted, true);
      assert.strictEqual(view.isTokenIssuedForTest, false);
    });

    it('tokenTypePresent is false on failure', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.tokenTypePresent, false);
    });

    it('httpStatusSuccessful is false on failure', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.httpStatusSuccessful, false);
    });

    it('errorReason is non-null on failure', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.ok(typeof view.errorReason === 'string' && view.errorReason.length > 0);
    });

    it('errorReason does not contain client_secret value', async () => {
      const sensitiveTokenFetcher = async (): Promise<NaverTokenResponse> => {
        throw new Error('auth failed client_id=real-id client_secret=real-secret-value Bearer real-token');
      };
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        sensitiveTokenFetcher,
        mockEnvPresent
      );
      assert.ok(!view.errorReason?.includes('real-secret-value'), 'errorReason must not expose secret');
      assert.ok(!view.errorReason?.includes('real-token'), 'errorReason must not expose token');
    });
  });

  describe('Security constraints - Token value never exposed', () => {
    it('isTokenValueDisplayed is always false on SUCCESS', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('isTokenValueDisplayed is always false on FAILURE', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('isTokenValueDisplayed is always false on ENV_MISSING', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvMissing
      );
      assert.strictEqual(view.isTokenValueDisplayed, false);
    });

    it('JSON output does not contain mock token value', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.includes('MOCK_TOKEN_DO_NOT_EXPOSE'), 'JSON output must not contain the mock token value');
    });

    it('JSON output does not contain base64-padded values', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      const jsonStr = JSON.stringify(view);
      assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), 'JSON output must not contain base64-padded values');
    });

    it('isTokenStoredInDb is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenStoredInDb, false);
    });

    it('isTokenReturnedToClient is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenReturnedToClient, false);
    });

    it('isTokenLoggedToConsole is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenLoggedToConsole, false);
    });

    it('isAuthKeyValueDisplayed is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    });

    it('isSecretLogged is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isSecretLogged, false);
    });

    it('isEnvFileDirectlyAccessed is always false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    });
  });

  describe('testItems structure', () => {
    it('testItems has 19 items on SUCCESS', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.testItems.length, 19);
    });

    it('testItems has 19 items on FAILURE', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockFailureTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.testItems.length, 19);
    });

    it('testItems has 19 items on ENV_MISSING', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvMissing
      );
      assert.strictEqual(view.testItems.length, 19);
    });

    it('all testItems have testItem and status and meaning fields', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      view.testItems.forEach((item, i) => {
        assert.ok(typeof item.testItem === 'string' && item.testItem.length > 0, `item[${i}].testItem missing`);
        assert.ok(typeof item.status === 'string' && item.status.length > 0, `item[${i}].status missing`);
        assert.ok(typeof item.meaning === 'string' && item.meaning.length > 0, `item[${i}].meaning missing`);
      });
    });
  });

  describe('Execution safety flags', () => {
    it('isBatchJobResultDisplayOnly is true', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    });

    it('isActualApprovalSubmissionAllowed is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    });

    it('isApprovalSubmitted is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isApprovalSubmitted, false);
    });

    it('isPostApiConnected is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isPostApiConnected, false);
    });

    it('isMutationConnected is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isMutationConnected, false);
    });

    it('isLiveExecutionEnabled is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isLiveExecutionEnabled, false);
    });

    it('hasApprovalRequestButton is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.hasApprovalRequestButton, false);
    });

    it('hasExecutionButton is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.hasExecutionButton, false);
    });

    it('hasSubmitAction is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.hasSubmitAction, false);
    });

    it('hasWorkerTrigger is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.hasWorkerTrigger, false);
    });

    it('isProductLookupApiCalled is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isProductLookupApiCalled, false);
    });

    it('isProductUpdateApiCalled is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isProductUpdateApiCalled, false);
    });

    it('isPriceOrStockChanged is false', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isPriceOrStockChanged, false);
    });
  });

  describe('User approval flags', () => {
    it('isUserFinalApprovalGrantedForTokenIssuance is always true', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isUserFinalApprovalGrantedForTokenIssuance, true);
    });

    it('isUserFinalApprovalPhraseReceived is always true', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isUserFinalApprovalPhraseReceived, true);
    });

    it('isTokenIssuanceOneTimeTestFinalApprovalPendingSealed is always true', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.isTokenIssuanceOneTimeTestFinalApprovalPendingSealed, true);
    });

    it('status is NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED', async () => {
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        mockSuccessTokenFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.status, 'NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED');
    });
  });

  describe('tokenFetcher is not called when env is missing', () => {
    it('tokenFetcher is never called when CLIENT_ID absent', async () => {
      let called = false;
      const trackingFetcher = async (): Promise<NaverTokenResponse> => {
        called = true;
        return mockSuccessTokenFetcher('', '');
      };
      await buildNaverTokenIssuanceOneTimeTestResultView(mockJob, trackingFetcher, {});
      assert.strictEqual(called, false, 'tokenFetcher must not be called when env is missing');
    });
  });

  describe('tokenTypePresent false when token_type is empty', () => {
    it('tokenTypePresent is false when token_type is empty string', async () => {
      const emptyTypeFetcher = async (): Promise<NaverTokenResponse> => ({
        access_token: 'MOCK',
        token_type: '',
        expires_in: 86400,
      });
      const view = await buildNaverTokenIssuanceOneTimeTestResultView(
        mockJob,
        emptyTypeFetcher,
        mockEnvPresent
      );
      assert.strictEqual(view.tokenTypePresent, false);
    });
  });
});
