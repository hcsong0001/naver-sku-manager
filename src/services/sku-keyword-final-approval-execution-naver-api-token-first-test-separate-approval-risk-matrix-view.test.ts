import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-matrix-view.service';

describe('Task 65 - Token First Test Separate Approval Risk Matrix Read-only Screen Flow Validation', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView() should create a read-only risk matrix view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView({});

    it('1. riskMatrixCreated=true', () => {
      assert.strictEqual(result.riskMatrixCreated, true);
    });

    it('2. displayOnly=true', () => {
      assert.strictEqual(result.displayOnly, true);
    });

    it('3. readOnly=true', () => {
      assert.strictEqual(result.readOnly, true);
    });

    it('4. executionLocked=true', () => {
      assert.strictEqual(result.executionLocked, true);
    });

    it('5. riskMatrixReviewOnly=true', () => {
      assert.strictEqual(result.riskMatrixReviewOnly, true);
    });

    it('6. separateApprovalStillRequired=true', () => {
      assert.strictEqual(result.separateApprovalStillRequired, true);
    });

    it('7. executionStillForbidden=true', () => {
      assert.strictEqual(result.executionStillForbidden, true);
    });

    it('8. highRiskItems가 배열임', () => {
      assert.ok(Array.isArray(result.highRiskItems));
    });

    it('9. mediumRiskItems가 배열임', () => {
      assert.ok(Array.isArray(result.mediumRiskItems));
    });

    it('10. lowRiskItems가 배열임', () => {
      assert.ok(Array.isArray(result.lowRiskItems));
    });

    it('11. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('12. nextStepLabel이 존재함', () => {
      assert.ok(typeof result.nextStepLabel === 'string');
    });

    it('13. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('14. approvalButtonRendered=false', () => {
      assert.strictEqual(result.approvalButtonRendered, false);
    });

    it('15. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('16. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('17. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('18. dbWriteExecuted=false', () => {
      assert.strictEqual(result.dbWriteExecuted, false);
    });

    it('19. prismaMutationExecuted=false', () => {
      assert.strictEqual(result.prismaMutationExecuted, false);
    });

    it('20. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('21. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('22. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('23. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('24. endpointCalled=false', () => {
      assert.strictEqual(result.endpointCalled, false);
    });

    it('25. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('26. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    it('27. riskMatrixSaveButtonRendered=false', () => {
      assert.strictEqual(result.riskMatrixSaveButtonRendered, false);
    });

    it('28. riskMatrixSaveButtonEnabled=false', () => {
      assert.strictEqual(result.riskMatrixSaveButtonEnabled, false);
    });

    const jsonString = JSON.stringify(result);

    it('29. 결과 JSON에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('ya29.'));
      assert.ok(!jsonString.includes('AAAAO'));
      assert.ok(!jsonString.includes('access_token'));
    });

    it('30. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('31. 결과 JSON에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('"client_secret"'));
      assert.ok(!jsonString.includes('"clientSecret"'));
    });

    it('32. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('33. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('api.commerce.naver.com'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    it('34. undefined 입력 시에도 riskMatrixCreated=true', () => {
      const result = buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView(undefined);
      assert.strictEqual(result.riskMatrixCreated, true);
    });

    it('35. null 입력 시에도 riskMatrixCreated=true', () => {
      const result = buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView(null);
      assert.strictEqual(result.riskMatrixCreated, true);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const servicePath = join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-matrix-view.service.ts');
    const serviceCode = readFileSync(servicePath, 'utf-8');

    it('36. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('37. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('api.commerce.naver.com'));
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('38. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('39. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
    });

    it('40. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
    });
  });
});
