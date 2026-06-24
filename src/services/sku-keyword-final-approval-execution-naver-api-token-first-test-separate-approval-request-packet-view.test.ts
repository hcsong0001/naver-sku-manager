// src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-packet-view.test.ts

import * as assert from 'node:assert';
import { describe, it } from 'node:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-packet-view.service';

describe('buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView() should create a read-only request packet view model', () => {
  const dummyJob = { id: 'dummy-job', status: 'PENDING' };
  const result = buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView(dummyJob);

  it('1. requestPacketCreated=true', () => {
    assert.strictEqual(result.requestPacketCreated, true);
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

  it('5. finalBlockerSummaryCompleted=true', () => {
    assert.strictEqual(result.finalBlockerSummaryCompleted, true);
  });

  it('6. requestPacketReviewOnly=true', () => {
    assert.strictEqual(result.requestPacketReviewOnly, true);
  });

  it('7. executionStillForbidden=true', () => {
    assert.strictEqual(result.executionStillForbidden, true);
  });

  it('8. requestPurposeItems가 배열임', () => {
    assert.ok(Array.isArray(result.requestPurposeItems));
    assert.ok(result.requestPurposeItems.length > 0);
  });

  it('9. requestScopeItems가 배열임', () => {
    assert.ok(Array.isArray(result.requestScopeItems));
    assert.ok(result.requestScopeItems.length > 0);
  });

  it('10. evidencePacketItems가 배열임', () => {
    assert.ok(Array.isArray(result.evidencePacketItems));
    assert.ok(result.evidencePacketItems.length > 0);
  });

  it('11. preSubmissionCheckItems가 배열임', () => {
    assert.ok(Array.isArray(result.preSubmissionCheckItems));
    assert.ok(result.preSubmissionCheckItems.length > 0);
  });

  it('12. stillForbiddenItems가 배열임', () => {
    assert.ok(Array.isArray(result.stillForbiddenItems));
    assert.ok(result.stillForbiddenItems.length > 0);
  });

  it('13. nextStepLabel이 존재함', () => {
    assert.ok(result.nextStepLabel && result.nextStepLabel.length > 0);
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

  it('28. requestPacketSaveButtonRendered=false', () => {
    assert.strictEqual(result.requestPacketSaveButtonRendered, false);
  });

  it('29. requestPacketSaveButtonEnabled=false', () => {
    assert.strictEqual(result.requestPacketSaveButtonEnabled, false);
  });

  it('30. approvalRequestSubmitted=false', () => {
    assert.strictEqual(result.approvalRequestSubmitted, false);
  });

  it('31. approvalRequestSubmitButtonRendered=false', () => {
    assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
  });

  it('32. approvalRequestSubmitButtonEnabled=false', () => {
    assert.strictEqual(result.approvalRequestSubmitButtonEnabled, false);
  });

  it('33. 결과 JSON에 access token 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('access_token'));
  });

  it('34. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('refresh_token'));
  });

  it('35. 결과 JSON에 secret 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('client_secret'));
  });

  it('36. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('Authorization'));
    assert.ok(!jsonString.includes('Bearer'));
  });

  it('37. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('http://'));
    assert.ok(!jsonString.includes('https://'));
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    it('38. undefined 입력 시에도 requestPacketCreated=true', () => {
      const res = buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView(undefined);
      assert.strictEqual(res.requestPacketCreated, true);
    });

    it('39. null 입력 시에도 requestPacketCreated=true', () => {
      const res = buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView(null);
      assert.strictEqual(res.requestPacketCreated, true);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-packet-view.service.ts');
    const serviceCode = fs.readFileSync(serviceFilePath, 'utf-8');

    it('40. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('41. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('42. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('43. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('prisma.'));
    });

    it('44. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
    });
  });
});
