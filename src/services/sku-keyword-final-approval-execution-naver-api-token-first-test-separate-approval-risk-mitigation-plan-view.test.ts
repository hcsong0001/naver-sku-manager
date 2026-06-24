// src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-mitigation-plan-view.test.ts

import * as assert from 'node:assert';
import { describe, it } from 'node:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-mitigation-plan-view.service';

describe('buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView() should create a read-only risk mitigation plan view model', () => {
  const dummyJob = { id: 'dummy-job', status: 'PENDING' };
  const result = buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView(dummyJob);

  it('1. mitigationPlanCreated=true', () => {
    assert.strictEqual(result.mitigationPlanCreated, true);
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

  it('5. riskMatrixCompleted=true', () => {
    assert.strictEqual(result.riskMatrixCompleted, true);
  });

  it('6. mitigationPlanReviewOnly=true', () => {
    assert.strictEqual(result.mitigationPlanReviewOnly, true);
  });

  it('7. executionStillForbidden=true', () => {
    assert.strictEqual(result.executionStillForbidden, true);
  });

  it('8. highRiskMitigationItems가 배열임', () => {
    assert.ok(Array.isArray(result.highRiskMitigationItems));
    assert.ok(result.highRiskMitigationItems.length > 0);
  });

  it('9. mediumRiskMitigationItems가 배열임', () => {
    assert.ok(Array.isArray(result.mediumRiskMitigationItems));
    assert.ok(result.mediumRiskMitigationItems.length > 0);
  });

  it('10. lowRiskMitigationItems가 배열임', () => {
    assert.ok(Array.isArray(result.lowRiskMitigationItems));
    assert.ok(result.lowRiskMitigationItems.length > 0);
  });

  it('11. postMitigationStillForbiddenItems가 배열임', () => {
    assert.ok(Array.isArray(result.postMitigationStillForbiddenItems));
    assert.ok(result.postMitigationStillForbiddenItems.length > 0);
  });

  it('12. nextStepLabel이 존재함', () => {
    assert.ok(result.nextStepLabel && result.nextStepLabel.length > 0);
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

  it('27. mitigationPlanSaveButtonRendered=false', () => {
    assert.strictEqual(result.mitigationPlanSaveButtonRendered, false);
  });

  it('28. mitigationPlanSaveButtonEnabled=false', () => {
    assert.strictEqual(result.mitigationPlanSaveButtonEnabled, false);
  });

  it('29. 결과 JSON에 access token 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('access_token'));
  });

  it('30. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('refresh_token'));
  });

  it('31. 결과 JSON에 secret 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('client_secret'));
  });

  it('32. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('Authorization'));
    assert.ok(!jsonString.includes('Bearer'));
  });

  it('33. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('http://'));
    assert.ok(!jsonString.includes('https://'));
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    it('34. undefined 입력 시에도 mitigationPlanCreated=true', () => {
      const res = buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView(undefined);
      assert.strictEqual(res.mitigationPlanCreated, true);
    });

    it('35. null 입력 시에도 mitigationPlanCreated=true', () => {
      const res = buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView(null);
      assert.strictEqual(res.mitigationPlanCreated, true);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-mitigation-plan-view.service.ts');
    const serviceCode = fs.readFileSync(serviceFilePath, 'utf-8');

    it('36. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('37. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('38. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('39. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('prisma.'));
    });

    it('40. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
    });
  });
});
