import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-readiness-decision-view.service';

describe('Task 70 - Token First Test Separate Approval Submission Readiness Decision Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView() should create a read-only submission readiness decision view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView();

    it('1. submissionDecisionReviewOnly=true', () => {
      assert.strictEqual(result.submissionDecisionReviewOnly, true);
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

    it('10. readinessDecisionItems가 배열임', () => {
      assert.ok(Array.isArray(result.readinessDecisionItems));
    });

    it('11. readinessDecisionItems가 5개', () => {
      assert.strictEqual(result.readinessDecisionItems.length, 5);
    });

    it('12. 모든 readinessDecisionItem이 decisionKey를 가짐', () => {
      for (const item of result.readinessDecisionItems) {
        assert.ok(typeof item.decisionKey === 'string' && item.decisionKey.length > 0);
      }
    });

    it('13. 모든 readinessDecisionItem이 decisionLabel을 가짐', () => {
      for (const item of result.readinessDecisionItems) {
        assert.ok(typeof item.decisionLabel === 'string' && item.decisionLabel.length > 0);
      }
    });

    it('14. 모든 readinessDecisionItem이 decisionValue를 가짐', () => {
      for (const item of result.readinessDecisionItems) {
        assert.ok(typeof item.decisionValue === 'string' && item.decisionValue.length > 0);
      }
    });

    it('15. 모든 readinessDecisionItem이 유효한 decisionStatus를 가짐', () => {
      const validStatuses = ['PENDING', 'NOT_READY', 'CONDITIONAL'];
      for (const item of result.readinessDecisionItems) {
        assert.ok(validStatuses.includes(item.decisionStatus));
      }
    });

    it('16. 모든 readinessDecisionItem이 isReadOnly=true', () => {
      for (const item of result.readinessDecisionItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('17. 모든 readinessDecisionItem이 isEditable=false', () => {
      for (const item of result.readinessDecisionItems) {
        assert.strictEqual(item.isEditable, false);
      }
    });

    it('18. submissionBlockedReasonItems가 배열임', () => {
      assert.ok(Array.isArray(result.submissionBlockedReasonItems));
    });

    it('19. submissionBlockedReasonItems가 4개', () => {
      assert.strictEqual(result.submissionBlockedReasonItems.length, 4);
    });

    it('20. 모든 submissionBlockedReasonItem이 reasonKey를 가짐', () => {
      for (const item of result.submissionBlockedReasonItems) {
        assert.ok(typeof item.reasonKey === 'string' && item.reasonKey.length > 0);
      }
    });

    it('21. 모든 submissionBlockedReasonItem이 isReadOnly=true', () => {
      for (const item of result.submissionBlockedReasonItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('22. 모든 submissionBlockedReasonItem이 isResolvable=false', () => {
      for (const item of result.submissionBlockedReasonItems) {
        assert.strictEqual(item.isResolvable, false);
      }
    });

    it('23. unresolvedBeforeSubmissionItems가 배열임', () => {
      assert.ok(Array.isArray(result.unresolvedBeforeSubmissionItems));
    });

    it('24. unresolvedBeforeSubmissionItems가 4개', () => {
      assert.strictEqual(result.unresolvedBeforeSubmissionItems.length, 4);
    });

    it('25. 모든 unresolvedBeforeSubmissionItem이 itemKey를 가짐', () => {
      for (const item of result.unresolvedBeforeSubmissionItems) {
        assert.ok(typeof item.itemKey === 'string' && item.itemKey.length > 0);
      }
    });

    it('26. 모든 unresolvedBeforeSubmissionItem이 isReadOnly=true', () => {
      for (const item of result.unresolvedBeforeSubmissionItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('27. 모든 unresolvedBeforeSubmissionItem이 isCheckable=false', () => {
      for (const item of result.unresolvedBeforeSubmissionItems) {
        assert.strictEqual(item.isCheckable, false);
      }
    });

    it('28. postSubmissionStillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.postSubmissionStillForbiddenItems));
    });

    it('29. postSubmissionStillForbiddenItems가 5개', () => {
      assert.strictEqual(result.postSubmissionStillForbiddenItems.length, 5);
    });

    it('30. 모든 postSubmissionStillForbiddenItem이 forbiddenKey를 가짐', () => {
      for (const item of result.postSubmissionStillForbiddenItems) {
        assert.ok(typeof item.forbiddenKey === 'string' && item.forbiddenKey.length > 0);
      }
    });

    it('31. 모든 postSubmissionStillForbiddenItem이 isReadOnly=true', () => {
      for (const item of result.postSubmissionStillForbiddenItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('32. 모든 postSubmissionStillForbiddenItem이 isReleasable=false', () => {
      for (const item of result.postSubmissionStillForbiddenItems) {
        assert.strictEqual(item.isReleasable, false);
      }
    });

    it('33. readinessDecisionItems[0].decisionKey가 CURRENT_JUDGMENT임', () => {
      assert.strictEqual(result.readinessDecisionItems[0].decisionKey, 'CURRENT_JUDGMENT');
    });

    it('34. readinessDecisionItems[1].decisionKey가 SUBMISSION_STATUS임', () => {
      assert.strictEqual(result.readinessDecisionItems[1].decisionKey, 'SUBMISSION_STATUS');
    });

    it('35. readinessDecisionItems[2].decisionKey가 SUBMISSION_FEASIBILITY임', () => {
      assert.strictEqual(result.readinessDecisionItems[2].decisionKey, 'SUBMISSION_FEASIBILITY');
    });

    it('36. readinessDecisionItems[3].decisionKey가 POST_SUBMISSION_EXECUTION임', () => {
      assert.strictEqual(result.readinessDecisionItems[3].decisionKey, 'POST_SUBMISSION_EXECUTION');
    });

    it('37. readinessDecisionItems[4].decisionKey가 SUBMISSION_CHANNEL임', () => {
      assert.strictEqual(result.readinessDecisionItems[4].decisionKey, 'SUBMISSION_CHANNEL');
    });

    it('38. submissionBlockedReasonItems[0].reasonKey가 BLOCKED_NO_APPROVAL_AUTHORITY임', () => {
      assert.strictEqual(result.submissionBlockedReasonItems[0].reasonKey, 'BLOCKED_NO_APPROVAL_AUTHORITY');
    });

    it('39. submissionBlockedReasonItems[1].reasonKey가 BLOCKED_NO_SUBMISSION_FUNCTION임', () => {
      assert.strictEqual(result.submissionBlockedReasonItems[1].reasonKey, 'BLOCKED_NO_SUBMISSION_FUNCTION');
    });

    it('40. unresolvedBeforeSubmissionItems[0].itemKey가 UNRESOLVED_APPROVER_IDENTIFICATION임', () => {
      assert.strictEqual(result.unresolvedBeforeSubmissionItems[0].itemKey, 'UNRESOLVED_APPROVER_IDENTIFICATION');
    });

    it('41. postSubmissionStillForbiddenItems[0].forbiddenKey가 POST_SUBMISSION_TOKEN_FORBIDDEN임', () => {
      assert.strictEqual(result.postSubmissionStillForbiddenItems[0].forbiddenKey, 'POST_SUBMISSION_TOKEN_FORBIDDEN');
    });

    it('42. postSubmissionStillForbiddenItems[4].forbiddenKey가 POST_SUBMISSION_PRICE_STOCK_FORBIDDEN임', () => {
      assert.strictEqual(result.postSubmissionStillForbiddenItems[4].forbiddenKey, 'POST_SUBMISSION_PRICE_STOCK_FORBIDDEN');
    });

    it('43. approvalRequestSubmitted=false', () => {
      assert.strictEqual(result.approvalRequestSubmitted, false);
    });

    it('44. approvalRequestSubmissionAllowed=false', () => {
      assert.strictEqual(result.approvalRequestSubmissionAllowed, false);
    });

    it('45. approvalRequestSubmitButtonRendered=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
    });

    it('46. approvalRequestSubmitButtonEnabled=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonEnabled, false);
    });

    it('47. preSubmissionReviewCommit이 9568fac임', () => {
      assert.strictEqual(result.preSubmissionReviewCommit, '9568fac');
    });

    it('48. screenTitle이 존재함', () => {
      assert.ok(typeof result.screenTitle === 'string' && result.screenTitle.length > 0);
    });

    it('49. submissionDecisionPhaseName이 존재함', () => {
      assert.ok(typeof result.submissionDecisionPhaseName === 'string' && result.submissionDecisionPhaseName.length > 0);
    });

    it('50. submissionDecisionStatus가 존재함', () => {
      assert.ok(typeof result.submissionDecisionStatus === 'string' && result.submissionDecisionStatus.length > 0);
    });

    it('51. nextStepLabel이 존재함', () => {
      assert.ok(typeof result.nextStepLabel === 'string' && result.nextStepLabel.length > 0);
    });

    it('52. submissionReadinessDecisionSaveButtonRendered=false', () => {
      assert.strictEqual(result.submissionReadinessDecisionSaveButtonRendered, false);
    });

    it('53. submissionReadinessDecisionSaveButtonEnabled=false', () => {
      assert.strictEqual(result.submissionReadinessDecisionSaveButtonEnabled, false);
    });

    it('54. submissionReadinessDecisionConfirmButtonRendered=false', () => {
      assert.strictEqual(result.submissionReadinessDecisionConfirmButtonRendered, false);
    });

    it('55. submissionReadinessDecisionConfirmButtonEnabled=false', () => {
      assert.strictEqual(result.submissionReadinessDecisionConfirmButtonEnabled, false);
    });

    it('56. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('57. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('58. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('59. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('60. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('61. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('62. accessTokenRequested=false', () => {
      assert.strictEqual(result.accessTokenRequested, false);
    });

    it('63. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('64. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('65. liveExecutionEnabled=false', () => {
      assert.strictEqual(result.liveExecutionEnabled, false);
    });

    it('66. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('67. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    const jsonString = JSON.stringify(result);

    it('68. 결과 JSON에 access_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('access_token'));
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
    });

    it('69. 결과 JSON에 refresh_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('70. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('71. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('72. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('.naver.com'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView(null);

    it('73. undefined 입력 시에도 submissionDecisionReviewOnly=true', () => {
      assert.strictEqual(resultNoInput.submissionDecisionReviewOnly, true);
    });

    it('74. undefined 입력 시에도 readinessDecisionItems가 5개', () => {
      assert.strictEqual(resultNoInput.readinessDecisionItems.length, 5);
    });

    it('75. undefined 입력 시에도 submissionBlockedReasonItems가 4개', () => {
      assert.strictEqual(resultNoInput.submissionBlockedReasonItems.length, 4);
    });

    it('76. undefined 입력 시에도 postSubmissionStillForbiddenItems가 5개', () => {
      assert.strictEqual(resultNoInput.postSubmissionStillForbiddenItems.length, 5);
    });

    it('77. undefined 입력 시에도 approvalRequestSubmitted=false', () => {
      assert.strictEqual(resultNoInput.approvalRequestSubmitted, false);
    });

    it('78. null 입력 시에도 submissionDecisionReviewOnly=true', () => {
      assert.strictEqual(resultNull.submissionDecisionReviewOnly, true);
    });

    it('79. null 입력 시에도 tokenIssued=false', () => {
      assert.strictEqual(resultNull.tokenIssued, false);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-readiness-decision-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('80. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('81. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('82. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('83. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('84. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
