import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-final-review-summary-view.service';

describe('Task 84 - Token First Test Separate Approval Final Hold Non-Release Handoff Final Review Summary Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView() should create a read-only final review summary view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Non-Release Handoff Final Review Summary를 포함함', () => {
      assert.ok(
        result.title.includes('Final Hold') &&
        result.title.includes('Final Review Summary')
      );
    });

    it('3. statusLabel이 READ-ONLY FINAL REVIEW SUMMARY임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY FINAL REVIEW SUMMARY');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 보류 미해제 또는 인수인계 언급이 있음', () => {
      assert.ok(
        result.summary.includes('보류') ||
        result.summary.includes('인수인계') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~83 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~83') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousSealLabel이 존재함', () => {
      assert.ok(typeof result.previousSealLabel === 'string' && result.previousSealLabel.length > 0);
    });

    it('10. previousSealLabel이 Task 83을 언급함', () => {
      assert.ok(
        result.previousSealLabel.includes('Task 83') ||
        result.previousSealLabel.includes('Non-Release Seal')
      );
    });

    it('11. previousSealCommit이 74b1d3c임', () => {
      assert.strictEqual(result.previousSealCommit, '74b1d3c');
    });

    it('12. finalNotice가 존재함', () => {
      assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0);
    });

    it('13. finalNotice에 별도 명시 승인 전까지 실행 불가 의미가 있음', () => {
      assert.ok(
        result.finalNotice.includes('별도 명시 승인') ||
        result.finalNotice.includes('전환되지 않') ||
        result.finalNotice.includes('실행 준비가 아닙')
      );
    });

    it('14. finalReviewSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.finalReviewSummaryItems));
    });

    it('15. finalReviewSummaryItems가 최소 4개임', () => {
      assert.ok(result.finalReviewSummaryItems.length >= 4);
    });

    it('16. 모든 finalReviewSummaryItem이 label/description/reviewState를 가짐', () => {
      for (const item of result.finalReviewSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.reviewState === 'string' && item.reviewState.length > 0);
      }
    });

    it('17. 모든 finalReviewSummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.finalReviewSummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. finalReviewSummaryItems가 Task 80~83 흐름 완료를 표현함', () => {
      const states = result.finalReviewSummaryItems.map((i) => i.reviewState);
      const hasCompletion = states.some(
        (s) => s.includes('완료') || s.includes('Task 80') || s.includes('Task 41')
      );
      assert.ok(hasCompletion);
    });

    it('19. nonReleaseHandoffSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.nonReleaseHandoffSummaryItems));
    });

    it('20. nonReleaseHandoffSummaryItems가 최소 3개임', () => {
      assert.ok(result.nonReleaseHandoffSummaryItems.length >= 3);
    });

    it('21. 모든 nonReleaseHandoffSummaryItem이 label/description/currentState를 가짐', () => {
      for (const item of result.nonReleaseHandoffSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.currentState === 'string' && item.currentState.length > 0);
      }
    });

    it('22. 모든 nonReleaseHandoffSummaryItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.nonReleaseHandoffSummaryItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('23. nonReleaseHandoffSummaryItems가 인수인계 후 보류 미해제를 표현함', () => {
      const states = result.nonReleaseHandoffSummaryItems.map((i) => i.currentState);
      const hasNonRelease = states.some(
        (s) => s.includes('보류') || s.includes('미허용') || s.includes('미해제') || s.includes('아님')
      );
      assert.ok(hasNonRelease);
    });

    it('24. reviewerFinalCheckItems가 배열임', () => {
      assert.ok(Array.isArray(result.reviewerFinalCheckItems));
    });

    it('25. reviewerFinalCheckItems가 최소 3개임', () => {
      assert.ok(result.reviewerFinalCheckItems.length >= 3);
    });

    it('26. 모든 reviewerFinalCheckItem이 label/description/reviewerMustConfirm을 가짐', () => {
      for (const item of result.reviewerFinalCheckItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.reviewerMustConfirm === 'string' && item.reviewerMustConfirm.length > 0);
      }
    });

    it('27. 모든 reviewerFinalCheckItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.reviewerFinalCheckItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('28. reviewerFinalCheckItems가 다음 검토자 확인 항목을 표현함', () => {
      const confirms = result.reviewerFinalCheckItems.map((i) => i.reviewerMustConfirm);
      const hasConfirm = confirms.some(
        (c) => c.includes('확인') || c.includes('이해') || c.includes('보관')
      );
      assert.ok(hasConfirm);
    });

    it('29. notReleaseApprovalItems가 배열임', () => {
      assert.ok(Array.isArray(result.notReleaseApprovalItems));
    });

    it('30. notReleaseApprovalItems가 최소 3개임', () => {
      assert.ok(result.notReleaseApprovalItems.length >= 3);
    });

    it('31. 모든 notReleaseApprovalItem이 label/description/notApprovalReason을 가짐', () => {
      for (const item of result.notReleaseApprovalItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notApprovalReason === 'string' && item.notApprovalReason.length > 0);
      }
    });

    it('32. 모든 notReleaseApprovalItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.notReleaseApprovalItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('33. notReleaseApprovalItems가 최종 요약과 해제 승인 분리를 표현함', () => {
      const reasons = result.notReleaseApprovalItems.map((i) => i.notApprovalReason);
      const hasDistinction = reasons.some(
        (r) => r.includes('아님') || r.includes('자동') || r.includes('전용')
      );
      assert.ok(hasDistinction);
    });

    it('34. remainingHoldItems가 배열임', () => {
      assert.ok(Array.isArray(result.remainingHoldItems));
    });

    it('35. remainingHoldItems가 최소 3개임', () => {
      assert.ok(result.remainingHoldItems.length >= 3);
    });

    it('36. 모든 remainingHoldItem이 label/description/holdState를 가짐', () => {
      for (const item of result.remainingHoldItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.holdState === 'string' && item.holdState.length > 0);
      }
    });

    it('37. 모든 remainingHoldItem의 tone이 blocked임', () => {
      for (const item of result.remainingHoldItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('38. remainingHoldItems가 여전히 남아 있는 보류 상태를 표현함', () => {
      const states = result.remainingHoldItems.map((i) => i.holdState);
      const hasHold = states.some(
        (s) => s.includes('유지') || s.includes('미허용') || s.includes('미승인')
      );
      assert.ok(hasHold);
    });

    it('39. nextSafeHandoffItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextSafeHandoffItems));
    });

    it('40. nextSafeHandoffItems가 최소 3개임', () => {
      assert.ok(result.nextSafeHandoffItems.length >= 3);
    });

    it('41. 모든 nextSafeHandoffItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextSafeHandoffItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('42. 모든 nextSafeHandoffItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextSafeHandoffItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('43. nextSafeHandoffItems가 사람(owner)을 언급함', () => {
      const owners = result.nextSafeHandoffItems.map((i) => i.nextOwner);
      const hasPerson = owners.some((o) => o.includes('사람'));
      assert.ok(hasPerson);
    });

    it('44. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('45. stillForbiddenItems가 최소 8개임', () => {
      assert.ok(result.stillForbiddenItems.length >= 8);
    });

    it('46. 모든 stillForbiddenItem이 label/description을 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
      }
    });

    it('47. 모든 stillForbiddenItem의 tone이 blocked임', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    const jsonString = JSON.stringify(result);

    it('48. 결과 JSON에 Bearer 토큰 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Bearer '));
    });

    it('49. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('50. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('51. summary에 실행 가능 암시 문구가 없음', () => {
      const lower = result.summary.toLowerCase();
      assert.ok(!lower.includes('실행 허용 완료'));
      assert.ok(!lower.includes('승인 완료'));
    });

    it('52. finalReviewSummaryItems가 보류 해제 미부여를 표현함', () => {
      const states = result.finalReviewSummaryItems.map((i) => i.reviewState);
      const hasNotGranted = states.some(
        (s) => s.includes('미부여') || s.includes('미해제') || s.includes('보류 유지') || s.includes('해제 미승인')
      );
      assert.ok(hasNotGranted);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView(null);

    it('53. undefined 입력 시에도 previousSealCommit이 74b1d3c임', () => {
      assert.strictEqual(resultNoInput.previousSealCommit, '74b1d3c');
    });

    it('54. undefined 입력 시에도 statusLabel이 READ-ONLY FINAL REVIEW SUMMARY임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY FINAL REVIEW SUMMARY');
    });

    it('55. undefined 입력 시에도 remainingHoldItems가 최소 3개임', () => {
      assert.ok(resultNoInput.remainingHoldItems.length >= 3);
    });

    it('56. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('57. null 입력 시에도 previousSealCommit이 74b1d3c임', () => {
      assert.strictEqual(resultNull.previousSealCommit, '74b1d3c');
    });

    it('58. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-final-review-summary-view.service.ts'
    );
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('59. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('60. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('61. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('62. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('63. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });

    it('64. service 코드에 onSubmit이 없음', () => {
      assert.ok(!serviceCode.includes('onSubmit'));
    });

    it('65. service 코드에 process.env 참조가 없음', () => {
      assert.ok(!serviceCode.includes('process.env'));
    });
  });
});
