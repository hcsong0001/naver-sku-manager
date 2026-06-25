import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-final-hold-summary-view.service';

describe('Task 77 - Token First Test Separate Approval Human Review Final Hold Summary Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView() should create a read-only final hold summary view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Human Review Final Hold Summary를 포함함', () => {
      assert.ok(result.title.includes('Human Review') && result.title.includes('Final Hold Summary'));
    });

    it('3. statusLabel이 READ-ONLY FINAL HOLD SUMMARY임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY FINAL HOLD SUMMARY');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 보류 또는 실행 미허용 언급이 있음', () => {
      assert.ok(
        result.summary.includes('보류') ||
        result.summary.includes('허용하지 않') ||
        result.summary.includes('미해제')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~76 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~76') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousSealLabel이 존재함', () => {
      assert.ok(typeof result.previousSealLabel === 'string' && result.previousSealLabel.length > 0);
    });

    it('10. previousSealLabel이 Task 76를 언급함', () => {
      assert.ok(
        result.previousSealLabel.includes('Task 76') ||
        result.previousSealLabel.includes('Non-Execution Seal')
      );
    });

    it('11. previousSealCommit이 e519e13임', () => {
      assert.strictEqual(result.previousSealCommit, 'e519e13');
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

    it('14. holdSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.holdSummaryItems));
    });

    it('15. holdSummaryItems가 최소 4개임', () => {
      assert.ok(result.holdSummaryItems.length >= 4);
    });

    it('16. 모든 holdSummaryItem이 label/description/holdState를 가짐', () => {
      for (const item of result.holdSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.holdState === 'string' && item.holdState.length > 0);
      }
    });

    it('17. 모든 holdSummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.holdSummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. holdSummaryItems가 보류 상태의 의미를 표현함', () => {
      const states = result.holdSummaryItems.map((i) => i.holdState);
      const hasHold = states.some((s) => s.includes('보류') || s.includes('미해제'));
      assert.ok(hasHold);
    });

    it('19. finalHoldReasons가 배열임', () => {
      assert.ok(Array.isArray(result.finalHoldReasons));
    });

    it('20. finalHoldReasons가 최소 3개임', () => {
      assert.ok(result.finalHoldReasons.length >= 3);
    });

    it('21. 모든 finalHoldReason이 label/description/reason을 가짐', () => {
      for (const item of result.finalHoldReasons) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.reason === 'string' && item.reason.length > 0);
      }
    });

    it('22. 모든 finalHoldReason의 tone이 warning 또는 blocked임', () => {
      for (const item of result.finalHoldReasons) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('23. finalHoldReasons가 아직 해제되지 않은 이유를 표현함', () => {
      const reasons = result.finalHoldReasons.map((i) => i.reason);
      const hasReason = reasons.some((r) => r.includes('보류 유지') || r.includes('미완료') || r.includes('미수행'));
      assert.ok(hasReason);
    });

    it('24. humanReviewStillPendingItems가 배열임', () => {
      assert.ok(Array.isArray(result.humanReviewStillPendingItems));
    });

    it('25. humanReviewStillPendingItems가 최소 3개임', () => {
      assert.ok(result.humanReviewStillPendingItems.length >= 3);
    });

    it('26. 모든 humanReviewStillPendingItem이 label/description/pendingState를 가짐', () => {
      for (const item of result.humanReviewStillPendingItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.pendingState === 'string' && item.pendingState.length > 0);
      }
    });

    it('27. 모든 humanReviewStillPendingItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.humanReviewStillPendingItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('28. humanReviewStillPendingItems가 사람 검토가 승인 완료가 아님을 표현함', () => {
      const states = result.humanReviewStillPendingItems.map((i) => i.pendingState);
      const hasPending = states.some(
        (s) => s.includes('보류') || s.includes('미완료') || s.includes('미허용')
      );
      assert.ok(hasPending);
    });

    it('29. releaseBlockedItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseBlockedItems));
    });

    it('30. releaseBlockedItems가 최소 4개임', () => {
      assert.ok(result.releaseBlockedItems.length >= 4);
    });

    it('31. 모든 releaseBlockedItem이 label/description/blockedState를 가짐', () => {
      for (const item of result.releaseBlockedItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
      }
    });

    it('32. 모든 releaseBlockedItem의 tone이 blocked임', () => {
      for (const item of result.releaseBlockedItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('33. releaseBlockedItems가 제출/실행/token 발급 허용 차단을 표현함', () => {
      const states = result.releaseBlockedItems.map((i) => i.blockedState);
      const hasBlocked = states.some((s) => s.includes('차단') || s.includes('허용'));
      assert.ok(hasBlocked);
    });

    it('34. notExecutionReadyItems가 배열임', () => {
      assert.ok(Array.isArray(result.notExecutionReadyItems));
    });

    it('35. notExecutionReadyItems가 최소 3개임', () => {
      assert.ok(result.notExecutionReadyItems.length >= 3);
    });

    it('36. 모든 notExecutionReadyItem이 label/description/notReadyState를 가짐', () => {
      for (const item of result.notExecutionReadyItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notReadyState === 'string' && item.notReadyState.length > 0);
      }
    });

    it('37. 모든 notExecutionReadyItem의 tone이 blocked임', () => {
      for (const item of result.notExecutionReadyItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('38. notExecutionReadyItems가 실행 준비 완료가 아님을 표현함', () => {
      const states = result.notExecutionReadyItems.map((i) => i.notReadyState);
      const hasNotReady = states.some(
        (s) => s.includes('아님') || s.includes('보류') || s.includes('미')
      );
      assert.ok(hasNotReady);
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
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView(null);

    it('52. undefined 입력 시에도 previousSealCommit이 e519e13임', () => {
      assert.strictEqual(resultNoInput.previousSealCommit, 'e519e13');
    });

    it('53. undefined 입력 시에도 statusLabel이 READ-ONLY FINAL HOLD SUMMARY임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY FINAL HOLD SUMMARY');
    });

    it('54. undefined 입력 시에도 releaseBlockedItems가 최소 4개임', () => {
      assert.ok(resultNoInput.releaseBlockedItems.length >= 4);
    });

    it('55. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('56. null 입력 시에도 previousSealCommit이 e519e13임', () => {
      assert.strictEqual(resultNull.previousSealCommit, 'e519e13');
    });

    it('57. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-final-hold-summary-view.service.ts'
    );
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('58. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('59. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('60. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('61. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('62. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });

    it('63. service 코드에 onSubmit이 없음', () => {
      assert.ok(!serviceCode.includes('onSubmit'));
    });

    it('64. service 코드에 process.env 참조가 없음', () => {
      assert.ok(!serviceCode.includes('process.env'));
    });
  });
});
