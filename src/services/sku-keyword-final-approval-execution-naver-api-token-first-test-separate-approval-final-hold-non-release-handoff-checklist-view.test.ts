import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-checklist-view.service';

describe('Task 81 - Token First Test Separate Approval Final Hold Non-Release Handoff Checklist Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView() should create a read-only handoff checklist view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Non-Release Handoff Checklist를 포함함', () => {
      assert.ok(result.title.includes('Final Hold') && result.title.includes('Handoff Checklist'));
    });

    it('3. statusLabel이 READ-ONLY NON-RELEASE HANDOFF CHECKLIST임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY NON-RELEASE HANDOFF CHECKLIST');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 체크리스트 또는 인수인계 언급이 있음', () => {
      assert.ok(
        result.summary.includes('체크리스트') ||
        result.summary.includes('인수인계') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~80 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~80') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousSealLabel이 존재함', () => {
      assert.ok(typeof result.previousSealLabel === 'string' && result.previousSealLabel.length > 0);
    });

    it('10. previousSealLabel이 Task 80을 언급함', () => {
      assert.ok(
        result.previousSealLabel.includes('Task 80') ||
        result.previousSealLabel.includes('Non-Release Seal')
      );
    });

    it('11. previousSealCommit이 efcaaf5임', () => {
      assert.strictEqual(result.previousSealCommit, 'efcaaf5');
    });

    it('12. finalNotice가 존재함', () => {
      assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0);
    });

    it('13. finalNotice에 별도 명시 승인 전까지 전환 불가 의미가 있음', () => {
      assert.ok(
        result.finalNotice.includes('별도 명시 승인') ||
        result.finalNotice.includes('전환되지 않') ||
        result.finalNotice.includes('보류 해제 승인이 아닙')
      );
    });

    it('14. handoffChecklistItems가 배열임', () => {
      assert.ok(Array.isArray(result.handoffChecklistItems));
    });

    it('15. handoffChecklistItems가 최소 4개임', () => {
      assert.ok(result.handoffChecklistItems.length >= 4);
    });

    it('16. 모든 handoffChecklistItem이 label/description/requiredCheck를 가짐', () => {
      for (const item of result.handoffChecklistItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredCheck === 'string' && item.requiredCheck.length > 0);
      }
    });

    it('17. 모든 handoffChecklistItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.handoffChecklistItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. handoffChecklistItems가 인수인계 체크리스트를 표현함', () => {
      const checks = result.handoffChecklistItems.map((i) => i.requiredCheck);
      const hasHandoff = checks.some(
        (c) => c.includes('확인') || c.includes('인지') || c.includes('체크리스트')
      );
      assert.ok(hasHandoff);
    });

    it('19. nonReleaseStateItems가 배열임', () => {
      assert.ok(Array.isArray(result.nonReleaseStateItems));
    });

    it('20. nonReleaseStateItems가 최소 4개임', () => {
      assert.ok(result.nonReleaseStateItems.length >= 4);
    });

    it('21. 모든 nonReleaseStateItem이 label/description/currentState를 가짐', () => {
      for (const item of result.nonReleaseStateItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.currentState === 'string' && item.currentState.length > 0);
      }
    });

    it('22. 모든 nonReleaseStateItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.nonReleaseStateItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('23. nonReleaseStateItems가 보류 미해제 상태를 표현함', () => {
      const states = result.nonReleaseStateItems.map((i) => i.currentState);
      const hasNonRelease = states.some(
        (s) => s.includes('미발생') || s.includes('미해제')
      );
      assert.ok(hasNonRelease);
    });

    it('24. reviewerConfirmationItems가 배열임', () => {
      assert.ok(Array.isArray(result.reviewerConfirmationItems));
    });

    it('25. reviewerConfirmationItems가 최소 3개임', () => {
      assert.ok(result.reviewerConfirmationItems.length >= 3);
    });

    it('26. 모든 reviewerConfirmationItem이 label/description/reviewerMustConfirm을 가짐', () => {
      for (const item of result.reviewerConfirmationItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.reviewerMustConfirm === 'string' && item.reviewerMustConfirm.length > 0);
      }
    });

    it('27. 모든 reviewerConfirmationItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.reviewerConfirmationItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('28. reviewerConfirmationItems가 사람이 확인해야 할 안전 조건을 표현함', () => {
      const confirms = result.reviewerConfirmationItems.map((i) => i.reviewerMustConfirm);
      const hasConfirm = confirms.some(
        (c) => c.includes('인지') || c.includes('동의') || c.includes('확인') || c.includes('전달')
      );
      assert.ok(hasConfirm);
    });

    it('29. releaseNotAllowedItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseNotAllowedItems));
    });

    it('30. releaseNotAllowedItems가 최소 4개임', () => {
      assert.ok(result.releaseNotAllowedItems.length >= 4);
    });

    it('31. 모든 releaseNotAllowedItem이 label/description/notAllowedReason을 가짐', () => {
      for (const item of result.releaseNotAllowedItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notAllowedReason === 'string' && item.notAllowedReason.length > 0);
      }
    });

    it('32. 모든 releaseNotAllowedItem의 tone이 blocked임', () => {
      for (const item of result.releaseNotAllowedItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('33. releaseNotAllowedItems가 보류 해제 미허용 사유를 표현함', () => {
      const reasons = result.releaseNotAllowedItems.map((i) => i.notAllowedReason);
      const hasNotAllowed = reasons.some(
        (r) => r.includes('미부여') || r.includes('미완료')
      );
      assert.ok(hasNotAllowed);
    });

    it('34. handoffMisunderstandingPreventionItems가 배열임', () => {
      assert.ok(Array.isArray(result.handoffMisunderstandingPreventionItems));
    });

    it('35. handoffMisunderstandingPreventionItems가 최소 3개임', () => {
      assert.ok(result.handoffMisunderstandingPreventionItems.length >= 3);
    });

    it('36. 모든 handoffMisunderstandingPreventionItem이 label/misunderstanding/correctInterpretation을 가짐', () => {
      for (const item of result.handoffMisunderstandingPreventionItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.misunderstanding === 'string' && item.misunderstanding.length > 0);
        assert.ok(typeof item.correctInterpretation === 'string' && item.correctInterpretation.length > 0);
      }
    });

    it('37. 모든 handoffMisunderstandingPreventionItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.handoffMisunderstandingPreventionItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('38. handoffMisunderstandingPreventionItems가 체크리스트와 해제 승인을 분리함', () => {
      const interpretations = result.handoffMisunderstandingPreventionItems.map((i) => i.correctInterpretation);
      const hasDistinction = interpretations.some(
        (i) => i.includes('아님') || i.includes('자동') || i.includes('인지')
      );
      assert.ok(hasDistinction);
    });

    it('39. nextHumanReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextHumanReviewItems));
    });

    it('40. nextHumanReviewItems가 최소 3개임', () => {
      assert.ok(result.nextHumanReviewItems.length >= 3);
    });

    it('41. 모든 nextHumanReviewItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextHumanReviewItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('42. 모든 nextHumanReviewItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextHumanReviewItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('43. nextHumanReviewItems가 사람(owner)을 언급함', () => {
      const owners = result.nextHumanReviewItems.map((i) => i.nextOwner);
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

    it('51. summary에 보류 해제 승인 완료 암시 문구가 없음', () => {
      assert.ok(!result.summary.includes('보류 해제 승인 완료'));
      assert.ok(!result.summary.includes('해제 허용'));
    });

    it('52. handoffChecklistItems가 인수인계 체크리스트를 포함함', () => {
      const labels = result.handoffChecklistItems.map((i) => i.label);
      const hasChecklist = labels.some(
        (l) => l.includes('체크리스트') || l.includes('인수인계') || l.includes('확인')
      );
      assert.ok(hasChecklist);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView(null);

    it('53. undefined 입력 시에도 previousSealCommit이 efcaaf5임', () => {
      assert.strictEqual(resultNoInput.previousSealCommit, 'efcaaf5');
    });

    it('54. undefined 입력 시에도 statusLabel이 READ-ONLY NON-RELEASE HANDOFF CHECKLIST임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY NON-RELEASE HANDOFF CHECKLIST');
    });

    it('55. undefined 입력 시에도 handoffChecklistItems가 최소 4개임', () => {
      assert.ok(resultNoInput.handoffChecklistItems.length >= 4);
    });

    it('56. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('57. null 입력 시에도 previousSealCommit이 efcaaf5임', () => {
      assert.strictEqual(resultNull.previousSealCommit, 'efcaaf5');
    });

    it('58. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-checklist-view.service.ts'
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
