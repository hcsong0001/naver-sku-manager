import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-preconditions-review-view.service';

describe('Task 78 - Token First Test Separate Approval Final Hold Release Preconditions Review Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView() should create a read-only release preconditions review view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Release Preconditions Review를 포함함', () => {
      assert.ok(result.title.includes('Final Hold') && result.title.includes('Preconditions Review'));
    });

    it('3. statusLabel이 READ-ONLY RELEASE PRECONDITIONS REVIEW임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY RELEASE PRECONDITIONS REVIEW');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 전제조건 또는 보류 언급이 있음', () => {
      assert.ok(
        result.summary.includes('전제조건') ||
        result.summary.includes('보류') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~77 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~77') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousHoldLabel이 존재함', () => {
      assert.ok(typeof result.previousHoldLabel === 'string' && result.previousHoldLabel.length > 0);
    });

    it('10. previousHoldLabel이 Task 77를 언급함', () => {
      assert.ok(
        result.previousHoldLabel.includes('Task 77') ||
        result.previousHoldLabel.includes('Final Hold Summary')
      );
    });

    it('11. previousHoldCommit이 03c3332임', () => {
      assert.strictEqual(result.previousHoldCommit, '03c3332');
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

    it('14. preconditionSummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.preconditionSummaryItems));
    });

    it('15. preconditionSummaryItems가 최소 4개임', () => {
      assert.ok(result.preconditionSummaryItems.length >= 4);
    });

    it('16. 모든 preconditionSummaryItem이 label/description/currentState를 가짐', () => {
      for (const item of result.preconditionSummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.currentState === 'string' && item.currentState.length > 0);
      }
    });

    it('17. 모든 preconditionSummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.preconditionSummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. releasePreconditionItems가 배열임', () => {
      assert.ok(Array.isArray(result.releasePreconditionItems));
    });

    it('19. releasePreconditionItems가 최소 4개임', () => {
      assert.ok(result.releasePreconditionItems.length >= 4);
    });

    it('20. 모든 releasePreconditionItem이 label/description/requiredBeforeRelease를 가짐', () => {
      for (const item of result.releasePreconditionItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredBeforeRelease === 'string' && item.requiredBeforeRelease.length > 0);
      }
    });

    it('21. 모든 releasePreconditionItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.releasePreconditionItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('22. releasePreconditionItems가 보류 해제 전제조건을 표현함', () => {
      const labels = result.releasePreconditionItems.map((i) => i.label);
      const hasPrecondition = labels.some(
        (l) => l.includes('승인') || l.includes('확정') || l.includes('지정')
      );
      assert.ok(hasPrecondition);
    });

    it('23. unresolvedHoldItems가 배열임', () => {
      assert.ok(Array.isArray(result.unresolvedHoldItems));
    });

    it('24. unresolvedHoldItems가 최소 3개임', () => {
      assert.ok(result.unresolvedHoldItems.length >= 3);
    });

    it('25. 모든 unresolvedHoldItem이 label/description/unresolvedState를 가짐', () => {
      for (const item of result.unresolvedHoldItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.unresolvedState === 'string' && item.unresolvedState.length > 0);
      }
    });

    it('26. 모든 unresolvedHoldItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.unresolvedHoldItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('27. unresolvedHoldItems가 아직 해소되지 않은 보류 이유를 표현함', () => {
      const states = result.unresolvedHoldItems.map((i) => i.unresolvedState);
      const hasUnresolved = states.some(
        (s) => s.includes('미진행') || s.includes('미확정') || s.includes('미수행') || s.includes('미지정')
      );
      assert.ok(hasUnresolved);
    });

    it('28. approvalEvidenceRequiredItems가 배열임', () => {
      assert.ok(Array.isArray(result.approvalEvidenceRequiredItems));
    });

    it('29. approvalEvidenceRequiredItems가 최소 3개임', () => {
      assert.ok(result.approvalEvidenceRequiredItems.length >= 3);
    });

    it('30. 모든 approvalEvidenceRequiredItem이 label/description/evidenceRequired를 가짐', () => {
      for (const item of result.approvalEvidenceRequiredItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.evidenceRequired === 'string' && item.evidenceRequired.length > 0);
      }
    });

    it('31. 모든 approvalEvidenceRequiredItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.approvalEvidenceRequiredItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('32. approvalEvidenceRequiredItems가 별도 승인 증거 필요성을 표현함', () => {
      const evidence = result.approvalEvidenceRequiredItems.map((i) => i.evidenceRequired);
      const hasEvidence = evidence.some(
        (e) => e.includes('승인') || e.includes('문서') || e.includes('기록')
      );
      assert.ok(hasEvidence);
    });

    it('33. releaseMisunderstandingPreventionItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseMisunderstandingPreventionItems));
    });

    it('34. releaseMisunderstandingPreventionItems가 최소 3개임', () => {
      assert.ok(result.releaseMisunderstandingPreventionItems.length >= 3);
    });

    it('35. 모든 releaseMisunderstandingPreventionItem이 label/misunderstanding/correctInterpretation을 가짐', () => {
      for (const item of result.releaseMisunderstandingPreventionItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.misunderstanding === 'string' && item.misunderstanding.length > 0);
        assert.ok(typeof item.correctInterpretation === 'string' && item.correctInterpretation.length > 0);
      }
    });

    it('36. 모든 releaseMisunderstandingPreventionItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.releaseMisunderstandingPreventionItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('37. nextReviewGateItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextReviewGateItems));
    });

    it('38. nextReviewGateItems가 최소 3개임', () => {
      assert.ok(result.nextReviewGateItems.length >= 3);
    });

    it('39. 모든 nextReviewGateItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextReviewGateItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('40. 모든 nextReviewGateItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextReviewGateItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('41. nextReviewGateItems가 사람(owner)을 언급함', () => {
      const owners = result.nextReviewGateItems.map((i) => i.nextOwner);
      const hasPerson = owners.some((o) => o.includes('사람'));
      assert.ok(hasPerson);
    });

    it('42. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('43. stillForbiddenItems가 최소 8개임', () => {
      assert.ok(result.stillForbiddenItems.length >= 8);
    });

    it('44. 모든 stillForbiddenItem이 label/description을 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
      }
    });

    it('45. 모든 stillForbiddenItem의 tone이 blocked임', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    const jsonString = JSON.stringify(result);

    it('46. 결과 JSON에 Bearer 토큰 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Bearer '));
    });

    it('47. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('48. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('49. summary에 실행 가능 암시 문구가 없음', () => {
      const lower = result.summary.toLowerCase();
      assert.ok(!lower.includes('실행 허용 완료'));
      assert.ok(!lower.includes('승인 완료'));
    });

    it('50. preconditionSummaryItems가 보류 해제가 아님을 표현함', () => {
      const states = result.preconditionSummaryItems.map((i) => i.currentState);
      const hasNotReleased = states.some(
        (s) => s.includes('미해제') || s.includes('해제 아님') || s.includes('전제조건 검토')
      );
      assert.ok(hasNotReleased);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView(null);

    it('51. undefined 입력 시에도 previousHoldCommit이 03c3332임', () => {
      assert.strictEqual(resultNoInput.previousHoldCommit, '03c3332');
    });

    it('52. undefined 입력 시에도 statusLabel이 READ-ONLY RELEASE PRECONDITIONS REVIEW임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY RELEASE PRECONDITIONS REVIEW');
    });

    it('53. undefined 입력 시에도 releasePreconditionItems가 최소 4개임', () => {
      assert.ok(resultNoInput.releasePreconditionItems.length >= 4);
    });

    it('54. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('55. null 입력 시에도 previousHoldCommit이 03c3332임', () => {
      assert.strictEqual(resultNull.previousHoldCommit, '03c3332');
    });

    it('56. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-preconditions-review-view.service.ts'
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
