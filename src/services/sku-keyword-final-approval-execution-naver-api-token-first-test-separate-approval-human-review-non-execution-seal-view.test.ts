import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-non-execution-seal-view.service';

describe('Task 76 - Token First Test Separate Approval Human Review Non-Execution Seal Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView() should create a read-only non-execution seal view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Human Review Non-Execution Seal을 포함함', () => {
      assert.ok(result.title.includes('Human Review') && result.title.includes('Non-Execution Seal'));
    });

    it('3. statusLabel이 READ-ONLY NON-EXECUTION SEAL임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY NON-EXECUTION SEAL');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 봉인 또는 실행 미허용 언급이 있음', () => {
      assert.ok(
        result.summary.includes('봉인') ||
        result.summary.includes('허용하지 않') ||
        result.summary.includes('실행 가능이 아닌') ||
        result.summary.includes('미허용')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~75 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~75') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousBoundaryLabel이 존재함', () => {
      assert.ok(typeof result.previousBoundaryLabel === 'string' && result.previousBoundaryLabel.length > 0);
    });

    it('10. previousBoundaryLabel이 Task 75를 언급함', () => {
      assert.ok(
        result.previousBoundaryLabel.includes('Task 75') ||
        result.previousBoundaryLabel.includes('Boundary')
      );
    });

    it('11. previousBoundaryCommit이 148e1a0임', () => {
      assert.strictEqual(result.previousBoundaryCommit, '148e1a0');
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

    it('18. nonExecutionSealItems가 배열임', () => {
      assert.ok(Array.isArray(result.nonExecutionSealItems));
    });

    it('19. nonExecutionSealItems가 최소 4개임', () => {
      assert.ok(result.nonExecutionSealItems.length >= 4);
    });

    it('20. 모든 nonExecutionSealItem이 label/description/sealedReason을 가짐', () => {
      for (const item of result.nonExecutionSealItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.sealedReason === 'string' && item.sealedReason.length > 0);
      }
    });

    it('21. 모든 nonExecutionSealItem의 tone이 blocked임', () => {
      for (const item of result.nonExecutionSealItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('22. nonExecutionSealItems가 실제 실행으로 이어지지 않음을 표현함', () => {
      const labels = result.nonExecutionSealItems.map((i) => i.label);
      const hasSeal = labels.some(
        (l) => l.includes('봉인') || l.includes('비실행') || l.includes('미실행')
      );
      assert.ok(hasSeal);
    });

    it('23. humanReviewAftermathItems가 배열임', () => {
      assert.ok(Array.isArray(result.humanReviewAftermathItems));
    });

    it('24. humanReviewAftermathItems가 최소 3개임', () => {
      assert.ok(result.humanReviewAftermathItems.length >= 3);
    });

    it('25. 모든 humanReviewAftermathItem이 label/description/currentMeaning을 가짐', () => {
      for (const item of result.humanReviewAftermathItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.currentMeaning === 'string' && item.currentMeaning.length > 0);
      }
    });

    it('26. 모든 humanReviewAftermathItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.humanReviewAftermathItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('27. humanReviewAftermathItems가 사람 검토 이후에도 상태가 바뀌지 않음을 표현함', () => {
      const meanings = result.humanReviewAftermathItems.map((i) => i.currentMeaning);
      const hasAftermath = meanings.some(
        (m) => m.includes('봉인 해제 아님') || m.includes('봉인 유지') || m.includes('해제 아님')
      );
      assert.ok(hasAftermath);
    });

    it('28. releaseNotGrantedItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseNotGrantedItems));
    });

    it('29. releaseNotGrantedItems가 최소 4개임', () => {
      assert.ok(result.releaseNotGrantedItems.length >= 4);
    });

    it('30. 모든 releaseNotGrantedItem이 label/description/notGrantedState를 가짐', () => {
      for (const item of result.releaseNotGrantedItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notGrantedState === 'string' && item.notGrantedState.length > 0);
      }
    });

    it('31. 모든 releaseNotGrantedItem의 tone이 blocked임', () => {
      for (const item of result.releaseNotGrantedItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('32. releaseNotGrantedItems가 제출/실행/token 발급 허용이 부여되지 않았음을 표현함', () => {
      const states = result.releaseNotGrantedItems.map((i) => i.notGrantedState);
      const hasNotGranted = states.some(
        (s) => s.includes('미부여') || s.includes('불가') || s.includes('허용')
      );
      assert.ok(hasNotGranted);
    });

    it('33. separateApprovalRequiredItems가 배열임', () => {
      assert.ok(Array.isArray(result.separateApprovalRequiredItems));
    });

    it('34. separateApprovalRequiredItems가 최소 3개임', () => {
      assert.ok(result.separateApprovalRequiredItems.length >= 3);
    });

    it('35. 모든 separateApprovalRequiredItem이 label/description/requiredBeforeRelease를 가짐', () => {
      for (const item of result.separateApprovalRequiredItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredBeforeRelease === 'string' && item.requiredBeforeRelease.length > 0);
      }
    });

    it('36. 모든 separateApprovalRequiredItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.separateApprovalRequiredItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('37. nextSafeReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextSafeReviewItems));
    });

    it('38. nextSafeReviewItems가 최소 3개임', () => {
      assert.ok(result.nextSafeReviewItems.length >= 3);
    });

    it('39. 모든 nextSafeReviewItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextSafeReviewItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('40. 모든 nextSafeReviewItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextSafeReviewItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('41. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('42. stillForbiddenItems가 최소 8개임', () => {
      assert.ok(result.stillForbiddenItems.length >= 8);
    });

    it('43. 모든 stillForbiddenItem이 label/description을 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
      }
    });

    it('44. 모든 stillForbiddenItem의 tone이 blocked임', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    const jsonString = JSON.stringify(result);

    it('45. 결과 JSON에 Bearer 토큰 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Bearer '));
    });

    it('46. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('47. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('48. summary에 실행 가능 암시 문구가 없음', () => {
      const lower = result.summary.toLowerCase();
      assert.ok(!lower.includes('실행 허용 완료'));
      assert.ok(!lower.includes('승인 완료'));
    });

    it('49. sealSummaryItems에 봉인 의미가 포함됨', () => {
      const labels = result.sealSummaryItems.map((i) => i.label);
      const hasSeal = labels.some(
        (l) => l.includes('봉인') || l.includes('비실행') || l.includes('차단')
      );
      assert.ok(hasSeal);
    });

    it('50. nextSafeReviewItems가 사람(owner)을 언급함', () => {
      const owners = result.nextSafeReviewItems.map((i) => i.nextOwner);
      const hasPerson = owners.some((o) => o.includes('사람'));
      assert.ok(hasPerson);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView(null);

    it('51. undefined 입력 시에도 previousBoundaryCommit이 148e1a0임', () => {
      assert.strictEqual(resultNoInput.previousBoundaryCommit, '148e1a0');
    });

    it('52. undefined 입력 시에도 statusLabel이 READ-ONLY NON-EXECUTION SEAL임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY NON-EXECUTION SEAL');
    });

    it('53. undefined 입력 시에도 nonExecutionSealItems가 최소 4개임', () => {
      assert.ok(resultNoInput.nonExecutionSealItems.length >= 4);
    });

    it('54. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('55. null 입력 시에도 previousBoundaryCommit이 148e1a0임', () => {
      assert.strictEqual(resultNull.previousBoundaryCommit, '148e1a0');
    });

    it('56. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-non-execution-seal-view.service.ts'
    );
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('57. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('58. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('59. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('60. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('61. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });

    it('62. service 코드에 onSubmit이 없음', () => {
      assert.ok(!serviceCode.includes('onSubmit'));
    });

    it('63. service 코드에 process.env 참조가 없음', () => {
      assert.ok(!serviceCode.includes('process.env'));
    });
  });
});
