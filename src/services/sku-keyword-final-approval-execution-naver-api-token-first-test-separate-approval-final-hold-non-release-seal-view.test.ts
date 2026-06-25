import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-seal-view.service';

describe('Task 80 - Token First Test Separate Approval Final Hold Non-Release Seal Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView() should create a read-only non-release seal view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Non-Release Seal을 포함함', () => {
      assert.ok(result.title.includes('Final Hold') && result.title.includes('Non-Release Seal'));
    });

    it('3. statusLabel이 READ-ONLY NON-RELEASE SEAL임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY NON-RELEASE SEAL');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 봉인 또는 보류 언급이 있음', () => {
      assert.ok(
        result.summary.includes('봉인') ||
        result.summary.includes('보류') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~79 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~79') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousBoundaryLabel이 존재함', () => {
      assert.ok(typeof result.previousBoundaryLabel === 'string' && result.previousBoundaryLabel.length > 0);
    });

    it('10. previousBoundaryLabel이 Task 79를 언급함', () => {
      assert.ok(
        result.previousBoundaryLabel.includes('Task 79') ||
        result.previousBoundaryLabel.includes('Release Boundary')
      );
    });

    it('11. previousBoundaryCommit이 93418a6임', () => {
      assert.strictEqual(result.previousBoundaryCommit, '93418a6');
    });

    it('12. finalNotice가 존재함', () => {
      assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0);
    });

    it('13. finalNotice에 별도 명시 승인 전까지 전환 불가 의미가 있음', () => {
      assert.ok(
        result.finalNotice.includes('별도 명시 승인') ||
        result.finalNotice.includes('전환되지 않') ||
        result.finalNotice.includes('보류 해제 완료가 아닙')
      );
    });

    it('14. sealSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.sealSummaryItems));
    });

    it('15. sealSummaryItems가 최소 4개임', () => {
      assert.ok(result.sealSummaryItems.length >= 4);
    });

    it('16. 모든 sealSummaryItem이 label/description/sealState를 가짐', () => {
      for (const item of result.sealSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.sealState === 'string' && item.sealState.length > 0);
      }
    });

    it('17. 모든 sealSummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.sealSummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. sealSummaryItems가 보류 미해제 봉인을 표현함', () => {
      const states = result.sealSummaryItems.map((i) => i.sealState);
      const hasSeal = states.some(
        (s) => s.includes('봉인') || s.includes('미해제') || s.includes('미발생')
      );
      assert.ok(hasSeal);
    });

    it('19. nonReleaseSealItems가 배열임', () => {
      assert.ok(Array.isArray(result.nonReleaseSealItems));
    });

    it('20. nonReleaseSealItems가 최소 4개임', () => {
      assert.ok(result.nonReleaseSealItems.length >= 4);
    });

    it('21. 모든 nonReleaseSealItem이 label/description/sealedState를 가짐', () => {
      for (const item of result.nonReleaseSealItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.sealedState === 'string' && item.sealedState.length > 0);
      }
    });

    it('22. 모든 nonReleaseSealItem의 tone이 blocked임', () => {
      for (const item of result.nonReleaseSealItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('23. nonReleaseSealItems가 보류 해제 미발생을 표현함', () => {
      const states = result.nonReleaseSealItems.map((i) => i.sealedState);
      const hasNotReleased = states.some(
        (s) => s.includes('미완료') || s.includes('미발생') || s.includes('봉인')
      );
      assert.ok(hasNotReleased);
    });

    it('24. releaseStillBlockedItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseStillBlockedItems));
    });

    it('25. releaseStillBlockedItems가 최소 4개임', () => {
      assert.ok(result.releaseStillBlockedItems.length >= 4);
    });

    it('26. 모든 releaseStillBlockedItem이 label/description/blockedReason을 가짐', () => {
      for (const item of result.releaseStillBlockedItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.blockedReason === 'string' && item.blockedReason.length > 0);
      }
    });

    it('27. 모든 releaseStillBlockedItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.releaseStillBlockedItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('28. releaseStillBlockedItems가 여전히 차단 상태를 표현함', () => {
      const reasons = result.releaseStillBlockedItems.map((i) => i.blockedReason);
      const hasStillBlocked = reasons.some((r) => r.includes('여전히') || r.includes('차단'));
      assert.ok(hasStillBlocked);
    });

    it('29. boundaryAftermathItems가 배열임', () => {
      assert.ok(Array.isArray(result.boundaryAftermathItems));
    });

    it('30. boundaryAftermathItems가 최소 3개임', () => {
      assert.ok(result.boundaryAftermathItems.length >= 3);
    });

    it('31. 모든 boundaryAftermathItem이 label/description/currentMeaning을 가짐', () => {
      for (const item of result.boundaryAftermathItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.currentMeaning === 'string' && item.currentMeaning.length > 0);
      }
    });

    it('32. 모든 boundaryAftermathItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.boundaryAftermathItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('33. boundaryAftermathItems가 경계 확인 이후 상태 변화 없음을 표현함', () => {
      const meanings = result.boundaryAftermathItems.map((i) => i.currentMeaning);
      const hasNoChange = meanings.some(
        (m) => m.includes('변화 없음') || m.includes('없음') || m.includes('정보 인지')
      );
      assert.ok(hasNoChange);
    });

    it('34. requiredBeforeReleaseItems가 배열임', () => {
      assert.ok(Array.isArray(result.requiredBeforeReleaseItems));
    });

    it('35. requiredBeforeReleaseItems가 최소 3개임', () => {
      assert.ok(result.requiredBeforeReleaseItems.length >= 3);
    });

    it('36. 모든 requiredBeforeReleaseItem이 label/description/requiredEvidence를 가짐', () => {
      for (const item of result.requiredBeforeReleaseItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
      }
    });

    it('37. 모든 requiredBeforeReleaseItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.requiredBeforeReleaseItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('38. requiredBeforeReleaseItems가 별도 승인 증거를 표현함', () => {
      const evidence = result.requiredBeforeReleaseItems.map((i) => i.requiredEvidence);
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

    it('51. summary에 보류 해제 완료 암시 문구가 없음', () => {
      assert.ok(!result.summary.includes('보류 해제 완료'));
      assert.ok(!result.summary.includes('해제 완료'));
    });

    it('52. sealSummaryItems가 보류 미해제 봉인 상태를 표현함', () => {
      const states = result.sealSummaryItems.map((i) => i.sealState);
      const hasNotReleased = states.some(
        (s) => s.includes('미해제') || s.includes('봉인 완료') || s.includes('미발생')
      );
      assert.ok(hasNotReleased);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView(null);

    it('53. undefined 입력 시에도 previousBoundaryCommit이 93418a6임', () => {
      assert.strictEqual(resultNoInput.previousBoundaryCommit, '93418a6');
    });

    it('54. undefined 입력 시에도 statusLabel이 READ-ONLY NON-RELEASE SEAL임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY NON-RELEASE SEAL');
    });

    it('55. undefined 입력 시에도 nonReleaseSealItems가 최소 4개임', () => {
      assert.ok(resultNoInput.nonReleaseSealItems.length >= 4);
    });

    it('56. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('57. null 입력 시에도 previousBoundaryCommit이 93418a6임', () => {
      assert.strictEqual(resultNull.previousBoundaryCommit, '93418a6');
    });

    it('58. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-seal-view.service.ts'
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
