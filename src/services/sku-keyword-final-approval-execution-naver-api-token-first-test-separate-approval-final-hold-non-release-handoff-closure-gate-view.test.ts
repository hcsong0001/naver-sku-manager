import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-gate-view.service';

describe('Task 85 - Token First Test Separate Approval Final Hold Non-Release Handoff Closure Gate Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView() should create a read-only closure gate view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Non-Release Handoff Closure Gate를 포함함', () => {
      assert.ok(
        result.title.includes('Final Hold') &&
        result.title.includes('Closure Gate')
      );
    });

    it('3. statusLabel이 READ-ONLY HANDOFF CLOSURE GATE임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY HANDOFF CLOSURE GATE');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 종료 관문 또는 보류 언급이 있음', () => {
      assert.ok(
        result.summary.includes('종료 관문') ||
        result.summary.includes('보류') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~84 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~84') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousSummaryLabel이 존재함', () => {
      assert.ok(typeof result.previousSummaryLabel === 'string' && result.previousSummaryLabel.length > 0);
    });

    it('10. previousSummaryLabel이 Task 84를 언급함', () => {
      assert.ok(
        result.previousSummaryLabel.includes('Task 84') ||
        result.previousSummaryLabel.includes('Final Review Summary')
      );
    });

    it('11. previousSummaryCommit이 4b54aae임', () => {
      assert.strictEqual(result.previousSummaryCommit, '4b54aae');
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

    it('14. closureGateSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.closureGateSummaryItems));
    });

    it('15. closureGateSummaryItems가 최소 4개임', () => {
      assert.ok(result.closureGateSummaryItems.length >= 4);
    });

    it('16. 모든 closureGateSummaryItem이 label/description/gateState를 가짐', () => {
      for (const item of result.closureGateSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.gateState === 'string' && item.gateState.length > 0);
      }
    });

    it('17. 모든 closureGateSummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.closureGateSummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. closureGateSummaryItems가 종료 관문 상태를 표현함', () => {
      const states = result.closureGateSummaryItems.map((i) => i.gateState);
      const hasGate = states.some(
        (s) => s.includes('관문') || s.includes('미해제') || s.includes('완료')
      );
      assert.ok(hasGate);
    });

    it('19. handoffClosureItems가 배열임', () => {
      assert.ok(Array.isArray(result.handoffClosureItems));
    });

    it('20. handoffClosureItems가 최소 3개임', () => {
      assert.ok(result.handoffClosureItems.length >= 3);
    });

    it('21. 모든 handoffClosureItem이 label/description/closureState를 가짐', () => {
      for (const item of result.handoffClosureItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.closureState === 'string' && item.closureState.length > 0);
      }
    });

    it('22. 모든 handoffClosureItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.handoffClosureItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('23. handoffClosureItems가 인수인계 종료와 보류 해제 분리를 표현함', () => {
      const states = result.handoffClosureItems.map((i) => i.closureState);
      const hasDistinction = states.some(
        (s) => s.includes('아님') || s.includes('보류 유지') || s.includes('종료')
      );
      assert.ok(hasDistinction);
    });

    it('24. notReleaseCompletionItems가 배열임', () => {
      assert.ok(Array.isArray(result.notReleaseCompletionItems));
    });

    it('25. notReleaseCompletionItems가 최소 3개임', () => {
      assert.ok(result.notReleaseCompletionItems.length >= 3);
    });

    it('26. 모든 notReleaseCompletionItem이 label/description/notCompletionReason을 가짐', () => {
      for (const item of result.notReleaseCompletionItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notCompletionReason === 'string' && item.notCompletionReason.length > 0);
      }
    });

    it('27. 모든 notReleaseCompletionItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.notReleaseCompletionItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('28. notReleaseCompletionItems가 종료 관문이 해제 완료가 아님을 표현함', () => {
      const reasons = result.notReleaseCompletionItems.map((i) => i.notCompletionReason);
      const hasNotCompletion = reasons.some(
        (r) => r.includes('아님') || r.includes('자동') || r.includes('전용')
      );
      assert.ok(hasNotCompletion);
    });

    it('29. remainingBlockedPathItems가 배열임', () => {
      assert.ok(Array.isArray(result.remainingBlockedPathItems));
    });

    it('30. remainingBlockedPathItems가 최소 4개임', () => {
      assert.ok(result.remainingBlockedPathItems.length >= 4);
    });

    it('31. 모든 remainingBlockedPathItem이 label/description/blockedState를 가짐', () => {
      for (const item of result.remainingBlockedPathItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
      }
    });

    it('32. 모든 remainingBlockedPathItem의 tone이 blocked임', () => {
      for (const item of result.remainingBlockedPathItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('33. remainingBlockedPathItems가 차단 경로를 표현함', () => {
      const states = result.remainingBlockedPathItems.map((i) => i.blockedState);
      const hasBlocked = states.some((s) => s.includes('차단'));
      assert.ok(hasBlocked);
    });

    it('34. requiredBeforeFutureTransitionItems가 배열임', () => {
      assert.ok(Array.isArray(result.requiredBeforeFutureTransitionItems));
    });

    it('35. requiredBeforeFutureTransitionItems가 최소 3개임', () => {
      assert.ok(result.requiredBeforeFutureTransitionItems.length >= 3);
    });

    it('36. 모든 requiredBeforeFutureTransitionItem이 label/description/requiredEvidence를 가짐', () => {
      for (const item of result.requiredBeforeFutureTransitionItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
      }
    });

    it('37. 모든 requiredBeforeFutureTransitionItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.requiredBeforeFutureTransitionItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('38. requiredBeforeFutureTransitionItems가 향후 전환 전 필요 증거를 표현함', () => {
      const evidence = result.requiredBeforeFutureTransitionItems.map((i) => i.requiredEvidence);
      const hasEvidence = evidence.some(
        (e) => e.includes('승인') || e.includes('문서') || e.includes('기록')
      );
      assert.ok(hasEvidence);
    });

    it('39. nextSafeReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextSafeReviewItems));
    });

    it('40. nextSafeReviewItems가 최소 3개임', () => {
      assert.ok(result.nextSafeReviewItems.length >= 3);
    });

    it('41. 모든 nextSafeReviewItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextSafeReviewItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('42. 모든 nextSafeReviewItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextSafeReviewItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('43. nextSafeReviewItems가 사람(owner)을 언급함', () => {
      const owners = result.nextSafeReviewItems.map((i) => i.nextOwner);
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

    it('52. closureGateSummaryItems가 보류 미해제를 표현함', () => {
      const states = result.closureGateSummaryItems.map((i) => i.gateState);
      const hasNotReleased = states.some(
        (s) => s.includes('미해제') || s.includes('미승인') || s.includes('미부여') || s.includes('보류 해제 아님')
      );
      assert.ok(hasNotReleased);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView(null);

    it('53. undefined 입력 시에도 previousSummaryCommit이 4b54aae임', () => {
      assert.strictEqual(resultNoInput.previousSummaryCommit, '4b54aae');
    });

    it('54. undefined 입력 시에도 statusLabel이 READ-ONLY HANDOFF CLOSURE GATE임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY HANDOFF CLOSURE GATE');
    });

    it('55. undefined 입력 시에도 remainingBlockedPathItems가 최소 4개임', () => {
      assert.ok(resultNoInput.remainingBlockedPathItems.length >= 4);
    });

    it('56. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('57. null 입력 시에도 previousSummaryCommit이 4b54aae임', () => {
      assert.strictEqual(resultNull.previousSummaryCommit, '4b54aae');
    });

    it('58. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-gate-view.service.ts'
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
