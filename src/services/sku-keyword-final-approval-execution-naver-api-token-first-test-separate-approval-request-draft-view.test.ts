import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-view.service';

describe('Task 51 - Token First Test Separate Approval Request Draft Read-only Screen Flow Validation', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView() should create a read-only approval request draft view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView();

    it('1. approvalRequestDraftCreated=true', () => {
      assert.strictEqual(result.approvalRequestDraftCreated, true);
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

    it('5. draftIsReadOnly=true', () => {
      assert.strictEqual(result.draftIsReadOnly, true);
    });

    it('6. approvalNotYetRequested=true', () => {
      assert.strictEqual(result.approvalNotYetRequested, true);
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

    it('10. approvalRequestSections가 배열임', () => {
      assert.ok(Array.isArray(result.approvalRequestSections));
    });

    it('11. approvalRequestSections가 6개 포함됨', () => {
      assert.strictEqual(result.approvalRequestSections.length, 6);
    });

    it('12. 모든 section이 sectionKey를 가짐', () => {
      for (const section of result.approvalRequestSections) {
        assert.ok(typeof section.sectionKey === 'string' && section.sectionKey.length > 0);
      }
    });

    it('13. 모든 section이 sectionTitle을 가짐', () => {
      for (const section of result.approvalRequestSections) {
        assert.ok(typeof section.sectionTitle === 'string' && section.sectionTitle.length > 0);
      }
    });

    it('14. 모든 section이 sectionContent를 가짐', () => {
      for (const section of result.approvalRequestSections) {
        assert.ok(typeof section.sectionContent === 'string' && section.sectionContent.length > 0);
      }
    });

    it('15. 모든 section이 isReadOnly=true', () => {
      for (const section of result.approvalRequestSections) {
        assert.strictEqual(section.isReadOnly, true);
      }
    });

    it('16. 모든 section이 isSubmittable=false', () => {
      for (const section of result.approvalRequestSections) {
        assert.strictEqual(section.isSubmittable, false);
      }
    });

    it('17. 첫 번째 section이 CURRENT_STATUS임', () => {
      assert.strictEqual(result.approvalRequestSections[0].sectionKey, 'CURRENT_STATUS');
    });

    it('18. 두 번째 section이 WHY_NOT_ALLOWED임', () => {
      assert.strictEqual(result.approvalRequestSections[1].sectionKey, 'WHY_NOT_ALLOWED');
    });

    it('19. 세 번째 section이 APPROVAL_PURPOSE임', () => {
      assert.strictEqual(result.approvalRequestSections[2].sectionKey, 'APPROVAL_PURPOSE');
    });

    it('20. 네 번째 section이 SAFETY_EVIDENCE임', () => {
      assert.strictEqual(result.approvalRequestSections[3].sectionKey, 'SAFETY_EVIDENCE');
    });

    it('21. 다섯 번째 section이 UNLOCK_CONDITIONS임', () => {
      assert.strictEqual(result.approvalRequestSections[4].sectionKey, 'UNLOCK_CONDITIONS');
    });

    it('22. 여섯 번째 section이 PROHIBITED_ITEMS임', () => {
      assert.strictEqual(result.approvalRequestSections[5].sectionKey, 'PROHIBITED_ITEMS');
    });

    it('23. stillProhibitedItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillProhibitedItems));
    });

    it('24. stillProhibitedItems가 10개 포함됨', () => {
      assert.strictEqual(result.stillProhibitedItems.length, 10);
    });

    it('25. stillProhibitedItems 모두 문자열임', () => {
      for (const item of result.stillProhibitedItems) {
        assert.ok(typeof item === 'string' && item.length > 0);
      }
    });

    it('26. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('27. draftLabel이 존재함', () => {
      assert.ok(typeof result.draftLabel === 'string' && result.draftLabel.length > 0);
    });

    it('28. draftPurpose가 존재함', () => {
      assert.ok(typeof result.draftPurpose === 'string' && result.draftPurpose.length > 0);
    });

    it('29. currentStatusSummary가 존재함', () => {
      assert.ok(typeof result.currentStatusSummary === 'string' && result.currentStatusSummary.length > 0);
    });

    it('30. whyNotAllowedYet이 존재함', () => {
      assert.ok(typeof result.whyNotAllowedYet === 'string' && result.whyNotAllowedYet.length > 0);
    });

    it('31. draftNote가 존재함', () => {
      assert.ok(typeof result.draftNote === 'string' && result.draftNote.length > 0);
    });

    it('32. executionButtonRendered=false', () => {
      assert.strictEqual(result.executionButtonRendered, false);
    });

    it('33. executionButtonEnabled=false', () => {
      assert.strictEqual(result.executionButtonEnabled, false);
    });

    it('34. approvalButtonRendered=false', () => {
      assert.strictEqual(result.approvalButtonRendered, false);
    });

    it('35. approvalButtonEnabled=false', () => {
      assert.strictEqual(result.approvalButtonEnabled, false);
    });

    it('36. approvalRequestSubmitButtonRendered=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonRendered, false);
    });

    it('37. approvalRequestSubmitButtonEnabled=false', () => {
      assert.strictEqual(result.approvalRequestSubmitButtonEnabled, false);
    });

    it('38. formRendered=false', () => {
      assert.strictEqual(result.formRendered, false);
    });

    it('39. formSubmitEnabled=false', () => {
      assert.strictEqual(result.formSubmitEnabled, false);
    });

    it('40. postApiEnabled=false', () => {
      assert.strictEqual(result.postApiEnabled, false);
    });

    it('41. dbWriteAllowed=false', () => {
      assert.strictEqual(result.dbWriteAllowed, false);
    });

    it('42. dbWriteExecuted=false', () => {
      assert.strictEqual(result.dbWriteExecuted, false);
    });

    it('43. prismaMutationExecuted=false', () => {
      assert.strictEqual(result.prismaMutationExecuted, false);
    });

    it('44. naverApiCallAllowed=false', () => {
      assert.strictEqual(result.naverApiCallAllowed, false);
    });

    it('45. networkExecutionAllowed=false', () => {
      assert.strictEqual(result.networkExecutionAllowed, false);
    });

    it('46. httpClientCreated=false', () => {
      assert.strictEqual(result.httpClientCreated, false);
    });

    it('47. tokenRequestAllowed=false', () => {
      assert.strictEqual(result.tokenRequestAllowed, false);
    });

    it('48. tokenRequestExecuted=false', () => {
      assert.strictEqual(result.tokenRequestExecuted, false);
    });

    it('49. accessTokenRequested=false', () => {
      assert.strictEqual(result.accessTokenRequested, false);
    });

    it('50. refreshTokenRequested=false', () => {
      assert.strictEqual(result.refreshTokenRequested, false);
    });

    it('51. tokenIssued=false', () => {
      assert.strictEqual(result.tokenIssued, false);
    });

    it('52. tokenStored=false', () => {
      assert.strictEqual(result.tokenStored, false);
    });

    it('53. authorizationHeaderCreated=false', () => {
      assert.strictEqual(result.authorizationHeaderCreated, false);
    });

    it('54. endpointCalled=false', () => {
      assert.strictEqual(result.endpointCalled, false);
    });

    it('55. liveTokenTestApproved=false', () => {
      assert.strictEqual(result.liveTokenTestApproved, false);
    });

    it('56. liveExecutionEnabled=false', () => {
      assert.strictEqual(result.liveExecutionEnabled, false);
    });

    it('57. queueAllowed=false', () => {
      assert.strictEqual(result.queueAllowed, false);
    });

    it('58. workerAllowed=false', () => {
      assert.strictEqual(result.workerAllowed, false);
    });

    const jsonString = JSON.stringify(result);

    it('59. 결과 JSON에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
      assert.ok(!jsonString.includes('access_token'));
    });

    it('60. 결과 JSON에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('61. 결과 JSON에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
      assert.ok(!jsonString.includes('secret_sign'));
    });

    it('62. 결과 JSON에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('63. 결과 JSON에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('64. approvalRequestSections의 모든 sectionContent에 Bearer가 없음', () => {
      for (const section of result.approvalRequestSections) {
        assert.ok(!section.sectionContent.includes('Bearer'));
      }
    });

    it('65. stillProhibitedItems에 access_token 원문이 없음', () => {
      for (const item of result.stillProhibitedItems) {
        assert.ok(!item.includes('access_token'));
        assert.ok(!item.includes('refresh_token'));
      }
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView(null);

    it('66. undefined 입력 시에도 approvalRequestDraftCreated=true', () => {
      assert.strictEqual(resultNoInput.approvalRequestDraftCreated, true);
    });

    it('67. undefined 입력 시에도 readOnly=true', () => {
      assert.strictEqual(resultNoInput.readOnly, true);
    });

    it('68. undefined 입력 시에도 tokenIssued=false', () => {
      assert.strictEqual(resultNoInput.tokenIssued, false);
    });

    it('69. undefined 입력 시에도 approvalRequestSections가 6개', () => {
      assert.strictEqual(resultNoInput.approvalRequestSections.length, 6);
    });

    it('70. null 입력 시에도 approvalRequestDraftCreated=true', () => {
      assert.strictEqual(resultNull.approvalRequestDraftCreated, true);
    });

    it('71. null 입력 시에도 executionLocked=true', () => {
      assert.strictEqual(resultNull.executionLocked, true);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('72. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('73. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('74. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('75. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('76. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
