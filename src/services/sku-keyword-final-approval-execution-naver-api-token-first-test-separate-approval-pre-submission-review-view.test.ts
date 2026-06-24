import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-pre-submission-review-view.service';

describe('Task 69 - Token First Test Separate Approval Pre-submission Review Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView() should create a read-only pre-submission review view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView();

    it('1. preSubmissionReviewOnly=true', () => {
      assert.strictEqual(result.preSubmissionReviewOnly, true);
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

    it('10. packetReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.packetReviewItems));
    });

    it('11. packetReviewItems가 4개', () => {
      assert.strictEqual(result.packetReviewItems.length, 4);
    });

    it('12. 모든 packetReviewItem이 reviewKey를 가짐', () => {
      for (const item of result.packetReviewItems) {
        assert.ok(typeof item.reviewKey === 'string' && item.reviewKey.length > 0);
      }
    });

    it('13. 모든 packetReviewItem이 reviewLabel을 가짐', () => {
      for (const item of result.packetReviewItems) {
        assert.ok(typeof item.reviewLabel === 'string' && item.reviewLabel.length > 0);
      }
    });

    it('14. 모든 packetReviewItem이 reviewStatus를 가짐', () => {
      for (const item of result.packetReviewItems) {
        assert.ok(item.reviewStatus === 'REVIEWED' || item.reviewStatus === 'PENDING');
      }
    });

    it('15. 모든 packetReviewItem이 isReadOnly=true', () => {
      for (const item of result.packetReviewItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('16. 모든 packetReviewItem이 isEditable=false', () => {
      for (const item of result.packetReviewItems) {
        assert.strictEqual(item.isEditable, false);
      }
    });

    it('17. missingBeforeSubmissionItems가 배열임', () => {
      assert.ok(Array.isArray(result.missingBeforeSubmissionItems));
    });

    it('18. missingBeforeSubmissionItems가 4개', () => {
      assert.strictEqual(result.missingBeforeSubmissionItems.length, 4);
    });

    it('19. 모든 missingBeforeSubmissionItem이 checkKey를 가짐', () => {
      for (const item of result.missingBeforeSubmissionItems) {
        assert.ok(typeof item.checkKey === 'string' && item.checkKey.length > 0);
      }
    });

    it('20. 모든 missingBeforeSubmissionItem이 isReadOnly=true', () => {
      for (const item of result.missingBeforeSubmissionItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('21. 모든 missingBeforeSubmissionItem이 isCheckable=false', () => {
      for (const item of result.missingBeforeSubmissionItems) {
        assert.strictEqual(item.isCheckable, false);
      }
    });

    it('22. misunderstandingPreventionItems가 배열임', () => {
      assert.ok(Array.isArray(result.misunderstandingPreventionItems));
    });

    it('23. misunderstandingPreventionItems가 4개', () => {
      assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    });

    it('24. 모든 misunderstandingPreventionItem이 itemKey를 가짐', () => {
      for (const item of result.misunderstandingPreventionItems) {
        assert.ok(typeof item.itemKey === 'string' && item.itemKey.length > 0);
      }
    });

    it('25. 모든 misunderstandingPreventionItem이 isReadOnly=true', () => {
      for (const item of result.misunderstandingPreventionItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('26. 모든 misunderstandingPreventionItem이 isCheckable=false', () => {
      for (const item of result.misunderstandingPreventionItems) {
        assert.strictEqual(item.isCheckable, false);
      }
    });

    it('27. riskRecheckItems가 배열임', () => {
      assert.ok(Array.isArray(result.riskRecheckItems));
    });

    it('28. riskRecheckItems가 4개', () => {
      assert.strictEqual(result.riskRecheckItems.length, 4);
    });

    it('29. 모든 riskRecheckItem이 recheckKey를 가짐', () => {
      for (const item of result.riskRecheckItems) {
        assert.ok(typeof item.recheckKey === 'string' && item.recheckKey.length > 0);
      }
    });

    it('30. 모든 riskRecheckItem이 isReadOnly=true', () => {
      for (const item of result.riskRecheckItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('31. 모든 riskRecheckItem이 isCheckable=false', () => {
      for (const item of result.riskRecheckItems) {
        assert.strictEqual(item.isCheckable, false);
      }
    });

    it('32. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('33. stillForbiddenItems가 5개', () => {
      assert.strictEqual(result.stillForbiddenItems.length, 5);
    });

    it('34. 모든 stillForbiddenItem이 forbiddenKey를 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.forbiddenKey === 'string' && item.forbiddenKey.length > 0);
      }
    });

    it('35. 모든 stillForbiddenItem이 isReadOnly=true', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.isReadOnly, true);
      }
    });

    it('36. 모든 stillForbiddenItem이 isReleasable=false', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.isReleasable, false);
      }
    });

    it('37. packetReviewItems[0].reviewKey가 PACKET_CONTENT_REVIEW임', () => {
      assert.strictEqual(result.packetReviewItems[0].reviewKey, 'PACKET_CONTENT_REVIEW');
    });

    it('38. packetReviewItems[1].reviewKey가 PURPOSE_SCOPE_REVIEW임', () => {
      assert.strictEqual(result.packetReviewItems[1].reviewKey, 'PURPOSE_SCOPE_REVIEW');
    });

    it('39. packetReviewItems[2].reviewKey가 EVIDENCE_PACKET_REVIEW임', () => {
      assert.strictEqual(result.packetReviewItems[2].reviewKey, 'EVIDENCE_PACKET_REVIEW');
    });

    it('40. packetReviewItems[3].reviewKey가 STILL_FORBIDDEN_REVIEW임', () => {
      assert.strictEqual(result.packetReviewItems[3].reviewKey, 'STILL_FORBIDDEN_REVIEW');
    });

    it('41. missingBeforeSubmissionItems[0].checkKey가 MISSING_APPROVAL_AUTHORITY임', () => {
      assert.strictEqual(result.missingBeforeSubmissionItems[0].checkKey, 'MISSING_APPROVAL_AUTHORITY');
    });

    it('42. missingBeforeSubmissionItems[1].checkKey가 MISSING_SUBMISSION_CHANNEL임', () => {
      assert.strictEqual(result.missingBeforeSubmissionItems[1].checkKey, 'MISSING_SUBMISSION_CHANNEL');
    });

    it('43. misunderstandingPreventionItems[0].itemKey가 REVIEW_NOT_SUBMIT임', () => {
      assert.strictEqual(result.misunderstandingPreventionItems[0].itemKey, 'REVIEW_NOT_SUBMIT');
    });

    it('44. misunderstandingPreventionItems[1].itemKey가 APPROVED_NOT_EXECUTE임', () => {
      assert.strictEqual(result.misunderstandingPreventionItems[1].itemKey, 'APPROVED_NOT_EXECUTE');
    });

    it('45. riskRecheckItems[0].recheckKey가 RISK_TOKEN_NETWORK임', () => {
      assert.strictEqual(result.riskRecheckItems[0].recheckKey, 'RISK_TOKEN_NETWORK');
    });

    it('46. stillForbiddenItems[0].forbiddenKey가 TOKEN_REQUEST_FORBIDDEN임', () => {
      assert.strictEqual(result.stillForbiddenItems[0].forbiddenKey, 'TOKEN_REQUEST_FORBIDDEN');
    });

    it('47. approvalRequestSubmitted=false', () => {
      assert.strictEqual(result.approvalRequestSubmitted, false);
    });

    it('48. approvalRequestSubmitButtonRendered=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
    });

    it('49. approvalRequestSubmitButtonEnabled=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonEnabled, false);
    });

    it('50. requestPacketCommit이 d33c554임', () => {
      assert.strictEqual(result.requestPacketCommit, 'd33c554');
    });

    it('51. screenTitle이 존재함', () => {
      assert.ok(typeof result.screenTitle === 'string' && result.screenTitle.length > 0);
    });

    it('52. preSubmissionPhaseName이 존재함', () => {
      assert.ok(typeof result.preSubmissionPhaseName === 'string' && result.preSubmissionPhaseName.length > 0);
    });

    it('53. preSubmissionStatus가 존재함', () => {
      assert.ok(typeof result.preSubmissionStatus === 'string' && result.preSubmissionStatus.length > 0);
    });

    it('54. nextStepLabel이 존재함', () => {
      assert.ok(typeof result.nextStepLabel === 'string' && result.nextStepLabel.length > 0);
    });

    it('55. preSubmissionConfirmButtonRendered=false', () => {
      assert.strictEqual(result.preSubmissionConfirmButtonRendered, false);
    });

    it('56. preSubmissionConfirmButtonEnabled=false', () => {
      assert.strictEqual(result.preSubmissionConfirmButtonEnabled, false);
    });

    it('57. requestPacketSubmitButtonRendered=false', () => {
      assert.strictEqual(result.requestPacketSubmitButtonRendered, false);
    });

    it('58. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('59. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('60. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('61. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('62. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('63. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('64. accessTokenRequested=false', () => {
      assert.strictEqual(result.accessTokenRequested, false);
    });

    it('65. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('66. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('67. liveExecutionEnabled=false', () => {
      assert.strictEqual(result.liveExecutionEnabled, false);
    });

    it('68. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('69. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    const jsonString = JSON.stringify(result);

    it('70. 결과 JSON에 access_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('access_token'));
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
    });

    it('71. 결과 JSON에 refresh_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('72. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('73. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('74. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('.naver.com'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView(null);

    it('75. undefined 입력 시에도 preSubmissionReviewOnly=true', () => {
      assert.strictEqual(resultNoInput.preSubmissionReviewOnly, true);
    });

    it('76. undefined 입력 시에도 packetReviewItems가 4개', () => {
      assert.strictEqual(resultNoInput.packetReviewItems.length, 4);
    });

    it('77. undefined 입력 시에도 stillForbiddenItems가 5개', () => {
      assert.strictEqual(resultNoInput.stillForbiddenItems.length, 5);
    });

    it('78. undefined 입력 시에도 tokenIssued=false', () => {
      assert.strictEqual(resultNoInput.tokenIssued, false);
    });

    it('79. null 입력 시에도 preSubmissionReviewOnly=true', () => {
      assert.strictEqual(resultNull.preSubmissionReviewOnly, true);
    });

    it('80. null 입력 시에도 approvalRequestSubmitted=false', () => {
      assert.strictEqual(resultNull.approvalRequestSubmitted, false);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-pre-submission-review-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('81. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('82. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('83. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('84. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('85. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
