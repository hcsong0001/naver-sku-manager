import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-gap-analysis-view.service';

describe('Task 64 - Token First Test Separate Approval Criteria Gap Analysis Read-only Screen Flow Validation', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView() should create a read-only gap analysis view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView({});

    it('1. gapAnalysisCreated=true', () => {
      assert.strictEqual(result.gapAnalysisCreated, true);
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

    it('5. criteriaGapAnalysisOnly=true', () => {
      assert.strictEqual(result.criteriaGapAnalysisOnly, true);
    });

    it('6. separateApprovalStillRequired=true', () => {
      assert.strictEqual(result.separateApprovalStillRequired, true);
    });

    it('7. executionStillForbidden=true', () => {
      assert.strictEqual(result.executionStillForbidden, true);
    });

    it('8. satisfiedCriteriaItems가 배열임', () => {
      assert.ok(Array.isArray(result.satisfiedCriteriaItems));
    });

    it('9. unsatisfiedCriteriaItems가 배열임', () => {
      assert.ok(Array.isArray(result.unsatisfiedCriteriaItems));
    });

    it('10. blockingGapItems가 배열임', () => {
      assert.ok(Array.isArray(result.blockingGapItems));
    });

    it('11. nextReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextReviewItems));
    });

    it('12. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('13. nextStepLabel이 존재함', () => {
      assert.ok(typeof result.nextStepLabel === 'string');
    });

    it('14. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('15. approvalButtonRendered=false', () => {
      assert.strictEqual(result.approvalButtonRendered, false);
    });

    it('16. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('17. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('18. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('19. dbWriteExecuted=false', () => {
      assert.strictEqual(result.dbWriteExecuted, false);
    });

    it('20. prismaMutationExecuted=false', () => {
      assert.strictEqual(result.prismaMutationExecuted, false);
    });

    it('21. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('22. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('23. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('24. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('25. endpointCalled=false', () => {
      assert.strictEqual(result.endpointCalled, false);
    });

    it('26. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('27. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    it('28. gapAnalysisSaveButtonRendered=false', () => {
      assert.strictEqual(result.gapAnalysisSaveButtonRendered, false);
    });

    it('29. gapAnalysisSaveButtonEnabled=false', () => {
      assert.strictEqual(result.gapAnalysisSaveButtonEnabled, false);
    });

    const jsonString = JSON.stringify(result);

    it('30. 결과 JSON에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('ya29.'));
      assert.ok(!jsonString.includes('AAAAO'));
      assert.ok(!jsonString.includes('access_token'));
    });

    it('31. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('32. 결과 JSON에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('"client_secret"'));
      assert.ok(!jsonString.includes('"clientSecret"'));
    });

    it('33. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('34. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('api.commerce.naver.com'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    it('35. undefined 입력 시에도 gapAnalysisCreated=true', () => {
      const result = buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView(undefined);
      assert.strictEqual(result.gapAnalysisCreated, true);
    });

    it('36. null 입력 시에도 gapAnalysisCreated=true', () => {
      const result = buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView(null);
      assert.strictEqual(result.gapAnalysisCreated, true);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const servicePath = join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-gap-analysis-view.service.ts');
    const serviceCode = readFileSync(servicePath, 'utf-8');

    it('37. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('38. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('api.commerce.naver.com'));
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('39. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('40. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
    });

    it('41. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
    });
  });
});
