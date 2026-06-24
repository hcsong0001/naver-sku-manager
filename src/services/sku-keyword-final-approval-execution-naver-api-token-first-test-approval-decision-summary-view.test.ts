import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestApprovalDecisionSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-view.service';

describe('Task 53 - Token First Test Approval Decision Summary Read-only Screen Flow Validation', () => {
  describe('buildNaverApiTokenFirstTestApprovalDecisionSummaryView() should create a read-only approval decision summary view model', () => {
    const result = buildNaverApiTokenFirstTestApprovalDecisionSummaryView();

    it('1. approvalDecisionSummaryCreated=true', () => {
      assert.strictEqual(result.approvalDecisionSummaryCreated, true);
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

    it('5. summaryIsReadOnly=true', () => {
      assert.strictEqual(result.summaryIsReadOnly, true);
    });

    it('6. currentDecisionIsNotAllowed=true', () => {
      assert.strictEqual(result.currentDecisionIsNotAllowed, true);
    });

    it('7. manualReviewRequired=true', () => {
      assert.strictEqual(result.manualReviewRequired, true);
    });

    it('8. requiresSeparateLiveApproval=true', () => {
      assert.strictEqual(result.requiresSeparateLiveApproval, true);
    });

    it('9. tokenTestStillNotAllowed=true', () => {
      assert.strictEqual(result.tokenTestStillNotAllowed, true);
    });

    it('10. decisionItems가 배열임', () => {
      assert.ok(Array.isArray(result.decisionItems));
    });

    it('11. decisionItems가 7개 포함됨', () => {
      assert.strictEqual(result.decisionItems.length, 7);
    });

    it('12. 모든 item이 itemKey를 가짐', () => {
      for (const item of result.decisionItems) {
        assert.ok(typeof item.itemKey === 'string' && item.itemKey.length > 0);
      }
    });

    it('13. 모든 item이 itemLabel을 가짐', () => {
      for (const item of result.decisionItems) {
        assert.ok(typeof item.itemLabel === 'string' && item.itemLabel.length > 0);
      }
    });

    it('14. 모든 item이 currentState를 가짐', () => {
      for (const item of result.decisionItems) {
        assert.ok(typeof item.currentState === 'string' && item.currentState.length > 0);
      }
    });

    it('15. 모든 item이 isReadOnly=true', () => {
      for (const item of result.decisionItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('16. 모든 item이 isDecisionEditable=false', () => {
      for (const item of result.decisionItems) {
        assert.strictEqual(item.isDecisionEditable, false);
      }
    });

    it('17. 첫 번째 item이 EXECUTION_STATUS임', () => {
      assert.strictEqual(result.decisionItems[0].itemKey, 'EXECUTION_STATUS');
    });

    it('18. 두 번째 item이 TOKEN_REQUEST_STATUS임', () => {
      assert.strictEqual(result.decisionItems[1].itemKey, 'TOKEN_REQUEST_STATUS');
    });

    it('19. 세 번째 item이 DB_WRITE_STATUS임', () => {
      assert.strictEqual(result.decisionItems[2].itemKey, 'DB_WRITE_STATUS');
    });

    it('20. 네 번째 item이 APPROVAL_REQUEST_STATUS임', () => {
      assert.strictEqual(result.decisionItems[3].itemKey, 'APPROVAL_REQUEST_STATUS');
    });

    it('21. 다섯 번째 item이 REVIEW_FLOW_STATUS임', () => {
      assert.strictEqual(result.decisionItems[4].itemKey, 'REVIEW_FLOW_STATUS');
    });

    it('22. 여섯 번째 item이 NEXT_ACTION임', () => {
      assert.strictEqual(result.decisionItems[5].itemKey, 'NEXT_ACTION');
    });

    it('23. 일곱 번째 item이 OVERALL_CONCLUSION임', () => {
      assert.strictEqual(result.decisionItems[6].itemKey, 'OVERALL_CONCLUSION');
    });

    it('24. EXECUTION_STATUS의 currentState가 실행 불가임을 포함', () => {
      assert.ok(result.decisionItems[0].currentState.includes('실행 불가') || result.decisionItems[0].currentState.includes('유지'));
    });

    it('25. OVERALL_CONCLUSION의 currentState가 실행 불가임을 포함', () => {
      assert.ok(result.decisionItems[6].currentState.includes('실행 불가'));
    });

    it('26. reviewedPanelCount가 12임', () => {
      assert.strictEqual(result.reviewedPanelCount, 12);
    });

    it('27. allPanelsReadOnly=true', () => {
      assert.strictEqual(result.allPanelsReadOnly, true);
    });

    it('28. currentDecision이 존재함', () => {
      assert.ok(typeof result.currentDecision === 'string' && result.currentDecision.length > 0);
    });

    it('29. currentPhase가 존재함', () => {
      assert.ok(typeof result.currentPhase === 'string' && result.currentPhase.length > 0);
    });

    it('30. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('31. summaryLabel이 존재함', () => {
      assert.ok(typeof result.summaryLabel === 'string' && result.summaryLabel.length > 0);
    });

    it('32. summaryNote가 존재함', () => {
      assert.ok(typeof result.summaryNote === 'string' && result.summaryNote.length > 0);
    });

    it('33. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('34. executionButtonEnabled=false', () => {
      assert.strictEqual(result.executionButtonEnabled, false);
    });

    it('35. approvalButtonRendered=false', () => {
      assert.strictEqual(result.approvalButtonRendered, false);
    });

    it('36. approvalButtonEnabled=false', () => {
      assert.strictEqual(result.approvalButtonEnabled, false);
    });

    it('37. decisionSaveButtonRendered=false', () => {
      assert.strictEqual(result.decisionSaveButtonRendered, false);
    });

    it('38. decisionSaveButtonEnabled=false', () => {
      assert.strictEqual(result.decisionSaveButtonEnabled, false);
    });

    it('39. checklistSaveButtonRendered=false', () => {
      assert.strictEqual(result.checklistSaveButtonRendered, false);
    });

    it('40. approvalRequestSubmitButtonRendered=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
    });

    it('41. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('42. formSubmitEnabled=false', () => {
      assert.strictEqual(result.formSubmitEnabled, false);
    });

    it('43. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('44. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('45. dbWriteExecuted=false', () => {
      assert.strictEqual(result.dbWriteExecuted, false);
    });

    it('46. prismaMutationExecuted=false', () => {
      assert.strictEqual(result.prismaMutationExecuted, false);
    });

    it('47. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('48. networkExecutionAllowed=false', () => {
      assert.strictEqual(result.networkExecutionAllowed, false);
    });

    it('49. httpClientCreated=false', () => {
      assert.strictEqual(result.httpClientCreated, false);
    });

    it('50. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('51. tokenRequestExecuted=false', () => {
      assert.strictEqual(result.tokenRequestExecuted, false);
    });

    it('52. accessTokenRequested=false', () => {
      assert.strictEqual(result.accessTokenRequested, false);
    });

    it('53. refreshTokenRequested=false', () => {
      assert.strictEqual(result.refreshTokenRequested, false);
    });

    it('54. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('55. tokenStored=false', () => {
      assert.strictEqual(result.tokenStored, false);
    });

    it('56. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('57. endpointCalled=false', () => {
      assert.strictEqual(result.endpointCalled, false);
    });

    it('58. liveTokenTestApproved=false', () => {
      assert.strictEqual(result.liveTokenTestApproved, false);
    });

    it('59. liveExecutionEnabled=false', () => {
      assert.strictEqual(result.liveExecutionEnabled, false);
    });

    it('60. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('61. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    const jsonString = JSON.stringify(result);

    it('62. 결과 JSON에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
      assert.ok(!jsonString.includes('access_token'));
    });

    it('63. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('64. 결과 JSON에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
      assert.ok(!jsonString.includes('secret_sign'));
    });

    it('65. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('66. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('67. decisionItems의 모든 currentState에 Bearer가 없음', () => {
      for (const item of result.decisionItems) {
        assert.ok(!item.currentState.includes('Bearer'));
      }
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestApprovalDecisionSummaryView(undefined);
    const resultNull = buildNaverApiTokenFirstTestApprovalDecisionSummaryView(null);

    it('68. undefined 입력 시에도 approvalDecisionSummaryCreated=true', () => {
      assert.strictEqual(resultNoInput.approvalDecisionSummaryCreated, true);
    });

    it('69. undefined 입력 시에도 readOnly=true', () => {
      assert.strictEqual(resultNoInput.readOnly, true);
    });

    it('70. undefined 입력 시에도 tokenIssued=false', () => {
      assert.strictEqual(resultNoInput.tokenIssued, false);
    });

    it('71. undefined 입력 시에도 decisionItems가 7개', () => {
      assert.strictEqual(resultNoInput.decisionItems.length, 7);
    });

    it('72. null 입력 시에도 approvalDecisionSummaryCreated=true', () => {
      assert.strictEqual(resultNull.approvalDecisionSummaryCreated, true);
    });

    it('73. null 입력 시에도 currentDecisionIsNotAllowed=true', () => {
      assert.strictEqual(resultNull.currentDecisionIsNotAllowed, true);
    });

    it('74. null 입력 시에도 reviewedPanelCount가 12임', () => {
      assert.strictEqual(resultNull.reviewedPanelCount, 12);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('75. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('76. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('77. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('78. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('79. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
