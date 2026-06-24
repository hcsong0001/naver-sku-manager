import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-view.service';

describe('Task 71 - Token First Test Separate Approval Submission Decision Seal Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView() should create a read-only submission decision seal view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView();

    it('1. submissionDecisionSealReviewOnly=true', () => {
      assert.strictEqual(result.submissionDecisionSealReviewOnly, true);
    });

    it('2. separateApprovalStillRequired=true', () => {
      assert.strictEqual(result.separateApprovalStillRequired, true);
    });

    it('3. executionStillForbidden=true', () => {
      assert.strictEqual(result.executionStillForbidden, true);
    });

    it('4. tokenRequestStillForbidden=true', () => {
      assert.strictEqual(result.tokenRequestStillForbidden, true);
    });

    it('5. naverApiCallStillForbidden=true', () => {
      assert.strictEqual(result.naverApiCallStillForbidden, true);
    });

    it('6. operatingDbWriteStillForbidden=true', () => {
      assert.strictEqual(result.operatingDbWriteStillForbidden, true);
    });

    it('7. priceStockChangeStillForbidden=true', () => {
      assert.strictEqual(result.priceStockChangeStillForbidden, true);
    });

    it('8. queueWorkerStillDisconnected=true', () => {
      assert.strictEqual(result.queueWorkerStillDisconnected, true);
    });

    it('9. postApiStillNotAdded=true', () => {
      assert.strictEqual(result.postApiStillNotAdded, true);
    });

    it('10. decisionSealItems가 배열임', () => {
      assert.ok(Array.isArray(result.decisionSealItems));
    });

    it('11. decisionSealItems가 5개', () => {
      assert.strictEqual(result.decisionSealItems.length, 5);
    });

    it('12. 모든 decisionSealItem이 sealKey를 가짐', () => {
      for (const item of result.decisionSealItems) {
        assert.ok(typeof item.sealKey === 'string' && item.sealKey.length > 0);
      }
    });

    it('13. 모든 decisionSealItem이 sealLabel을 가짐', () => {
      for (const item of result.decisionSealItems) {
        assert.ok(typeof item.sealLabel === 'string' && item.sealLabel.length > 0);
      }
    });

    it('14. 모든 decisionSealItem이 sealValue를 가짐', () => {
      for (const item of result.decisionSealItems) {
        assert.ok(typeof item.sealValue === 'string' && item.sealValue.length > 0);
      }
    });

    it('15. 모든 decisionSealItem이 유효한 sealStatus를 가짐', () => {
      const validStatuses = ['SEALED', 'NOT_RELEASED', 'BLOCKED'];
      for (const item of result.decisionSealItems) {
        assert.ok(validStatuses.includes(item.sealStatus));
      }
    });

    it('16. 모든 decisionSealItem이 isReadOnly=true', () => {
      for (const item of result.decisionSealItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('17. 모든 decisionSealItem이 isReleasable=false', () => {
      for (const item of result.decisionSealItems) {
        assert.strictEqual(item.isReleasable, false);
      }
    });

    it('18. submissionStillBlockedItems가 배열임', () => {
      assert.ok(Array.isArray(result.submissionStillBlockedItems));
    });

    it('19. submissionStillBlockedItems가 4개', () => {
      assert.strictEqual(result.submissionStillBlockedItems.length, 4);
    });

    it('20. 모든 submissionStillBlockedItem이 blockedKey를 가짐', () => {
      for (const item of result.submissionStillBlockedItems) {
        assert.ok(typeof item.blockedKey === 'string' && item.blockedKey.length > 0);
      }
    });

    it('21. 모든 submissionStillBlockedItem이 isReadOnly=true', () => {
      for (const item of result.submissionStillBlockedItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('22. 모든 submissionStillBlockedItem이 isResolvable=false', () => {
      for (const item of result.submissionStillBlockedItems) {
        assert.strictEqual(item.isResolvable, false);
      }
    });

    it('23. executionStillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.executionStillForbiddenItems));
    });

    it('24. executionStillForbiddenItems가 5개', () => {
      assert.strictEqual(result.executionStillForbiddenItems.length, 5);
    });

    it('25. 모든 executionStillForbiddenItem이 forbiddenKey를 가짐', () => {
      for (const item of result.executionStillForbiddenItems) {
        assert.ok(typeof item.forbiddenKey === 'string' && item.forbiddenKey.length > 0);
      }
    });

    it('26. 모든 executionStillForbiddenItem이 isReadOnly=true', () => {
      for (const item of result.executionStillForbiddenItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('27. 모든 executionStillForbiddenItem이 isReleasable=false', () => {
      for (const item of result.executionStillForbiddenItems) {
        assert.strictEqual(item.isReleasable, false);
      }
    });

    it('28. nextStepItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextStepItems));
    });

    it('29. nextStepItems가 3개', () => {
      assert.strictEqual(result.nextStepItems.length, 3);
    });

    it('30. 모든 nextStepItem이 stepKey를 가짐', () => {
      for (const item of result.nextStepItems) {
        assert.ok(typeof item.stepKey === 'string' && item.stepKey.length > 0);
      }
    });

    it('31. 모든 nextStepItem이 isReadOnly=true', () => {
      for (const item of result.nextStepItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('32. 모든 nextStepItem이 isExecutable=false', () => {
      for (const item of result.nextStepItems) {
        assert.strictEqual(item.isExecutable, false);
      }
    });

    it('33. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('34. stillForbiddenItems가 5개', () => {
      assert.strictEqual(result.stillForbiddenItems.length, 5);
    });

    it('35. 모든 stillForbiddenItem이 itemKey를 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.itemKey === 'string' && item.itemKey.length > 0);
      }
    });

    it('36. 모든 stillForbiddenItem이 isReadOnly=true', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('37. 모든 stillForbiddenItem이 isBypassable=false', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.isBypassable, false);
      }
    });

    it('38. decisionSealItems[0].sealKey가 SEAL_SUBMISSION_NOT_OCCURRED임', () => {
      assert.strictEqual(result.decisionSealItems[0].sealKey, 'SEAL_SUBMISSION_NOT_OCCURRED');
    });

    it('39. decisionSealItems[1].sealKey가 SEAL_EXECUTION_NOT_RELEASED임', () => {
      assert.strictEqual(result.decisionSealItems[1].sealKey, 'SEAL_EXECUTION_NOT_RELEASED');
    });

    it('40. decisionSealItems[2].sealKey가 SEAL_TOKEN_REQUEST_LOCKED임', () => {
      assert.strictEqual(result.decisionSealItems[2].sealKey, 'SEAL_TOKEN_REQUEST_LOCKED');
    });

    it('41. decisionSealItems[3].sealKey가 SEAL_APPROVAL_INCOMPLETE임', () => {
      assert.strictEqual(result.decisionSealItems[3].sealKey, 'SEAL_APPROVAL_INCOMPLETE');
    });

    it('42. decisionSealItems[4].sealKey가 SEAL_READINESS_DECISION_ONLY임', () => {
      assert.strictEqual(result.decisionSealItems[4].sealKey, 'SEAL_READINESS_DECISION_ONLY');
    });

    it('43. submissionStillBlockedItems[0].blockedKey가 SUBMIT_BLOCKED_NO_APPROVAL_AUTHORITY임', () => {
      assert.strictEqual(result.submissionStillBlockedItems[0].blockedKey, 'SUBMIT_BLOCKED_NO_APPROVAL_AUTHORITY');
    });

    it('44. submissionStillBlockedItems[1].blockedKey가 SUBMIT_BLOCKED_NO_SUBMIT_FUNCTION임', () => {
      assert.strictEqual(result.submissionStillBlockedItems[1].blockedKey, 'SUBMIT_BLOCKED_NO_SUBMIT_FUNCTION');
    });

    it('45. executionStillForbiddenItems[0].forbiddenKey가 EXEC_FORBIDDEN_TOKEN_REQUEST임', () => {
      assert.strictEqual(result.executionStillForbiddenItems[0].forbiddenKey, 'EXEC_FORBIDDEN_TOKEN_REQUEST');
    });

    it('46. executionStillForbiddenItems[4].forbiddenKey가 EXEC_FORBIDDEN_PRICE_STOCK임', () => {
      assert.strictEqual(result.executionStillForbiddenItems[4].forbiddenKey, 'EXEC_FORBIDDEN_PRICE_STOCK');
    });

    it('47. nextStepItems[0].stepKey가 NEXT_SUBMIT_VIA_SEPARATE_CHANNEL임', () => {
      assert.strictEqual(result.nextStepItems[0].stepKey, 'NEXT_SUBMIT_VIA_SEPARATE_CHANNEL');
    });

    it('48. approvalRequestSubmitted=false', () => {
      assert.strictEqual(result.approvalRequestSubmitted, false);
    });

    it('49. approvalRequestSubmissionAllowed=false', () => {
      assert.strictEqual(result.approvalRequestSubmissionAllowed, false);
    });

    it('50. approvalRequestSubmitButtonRendered=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
    });

    it('51. approvalRequestSubmitButtonEnabled=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonEnabled, false);
    });

    it('52. submissionReadinessDecisionCommit이 ddb2f60임', () => {
      assert.strictEqual(result.submissionReadinessDecisionCommit, 'ddb2f60');
    });

    it('53. screenTitle이 존재함', () => {
      assert.ok(typeof result.screenTitle === 'string' && result.screenTitle.length > 0);
    });

    it('54. submissionDecisionSealPhaseName이 존재함', () => {
      assert.ok(typeof result.submissionDecisionSealPhaseName === 'string' && result.submissionDecisionSealPhaseName.length > 0);
    });

    it('55. submissionDecisionSealStatus가 존재함', () => {
      assert.ok(typeof result.submissionDecisionSealStatus === 'string' && result.submissionDecisionSealStatus.length > 0);
    });

    it('56. nextStepLabel이 존재함', () => {
      assert.ok(typeof result.nextStepLabel === 'string' && result.nextStepLabel.length > 0);
    });

    it('57. submissionDecisionSealSaveButtonRendered=false', () => {
      assert.strictEqual(result.submissionDecisionSealSaveButtonRendered, false);
    });

    it('58. submissionDecisionSealSaveButtonEnabled=false', () => {
      assert.strictEqual(result.submissionDecisionSealSaveButtonEnabled, false);
    });

    it('59. submissionDecisionSealConfirmButtonRendered=false', () => {
      assert.strictEqual(result.submissionDecisionSealConfirmButtonRendered, false);
    });

    it('60. submissionDecisionSealConfirmButtonEnabled=false', () => {
      assert.strictEqual(result.submissionDecisionSealConfirmButtonEnabled, false);
    });

    it('61. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('62. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('63. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('64. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('65. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('66. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('67. accessTokenRequested=false', () => {
      assert.strictEqual(result.accessTokenRequested, false);
    });

    it('68. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('69. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('70. liveExecutionEnabled=false', () => {
      assert.strictEqual(result.liveExecutionEnabled, false);
    });

    it('71. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('72. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    const jsonString = JSON.stringify(result);

    it('73. 결과 JSON에 access_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('access_token'));
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
    });

    it('74. 결과 JSON에 refresh_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('75. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('76. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('77. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('.naver.com'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView(null);

    it('78. undefined 입력 시에도 submissionDecisionSealReviewOnly=true', () => {
      assert.strictEqual(resultNoInput.submissionDecisionSealReviewOnly, true);
    });

    it('79. undefined 입력 시에도 decisionSealItems가 5개', () => {
      assert.strictEqual(resultNoInput.decisionSealItems.length, 5);
    });

    it('80. undefined 입력 시에도 submissionStillBlockedItems가 4개', () => {
      assert.strictEqual(resultNoInput.submissionStillBlockedItems.length, 4);
    });

    it('81. undefined 입력 시에도 executionStillForbiddenItems가 5개', () => {
      assert.strictEqual(resultNoInput.executionStillForbiddenItems.length, 5);
    });

    it('82. undefined 입력 시에도 approvalRequestSubmitted=false', () => {
      assert.strictEqual(resultNoInput.approvalRequestSubmitted, false);
    });

    it('83. null 입력 시에도 submissionDecisionSealReviewOnly=true', () => {
      assert.strictEqual(resultNull.submissionDecisionSealReviewOnly, true);
    });

    it('84. null 입력 시에도 tokenIssued=false', () => {
      assert.strictEqual(resultNull.tokenIssued, false);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('85. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('86. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('87. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('88. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('89. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
