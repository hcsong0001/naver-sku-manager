import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-boundary-view.service';

describe('Task 79 - Token First Test Separate Approval Final Hold Release Boundary Read-only Screen Flow', () => {
  describe('buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView() should create a read-only release boundary view model', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Final Hold Release Boundary를 포함함', () => {
      assert.ok(result.title.includes('Final Hold') && result.title.includes('Release Boundary'));
    });

    it('3. statusLabel이 READ-ONLY RELEASE BOUNDARY임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY RELEASE BOUNDARY');
    });

    it('4. statusTone이 허용된 값임', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      assert.ok(validTones.includes(result.statusTone));
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. summary에 경계 또는 보류 언급이 있음', () => {
      assert.ok(
        result.summary.includes('경계') ||
        result.summary.includes('보류') ||
        result.summary.includes('허용하지 않')
      );
    });

    it('7. taskRangeLabel이 존재함', () => {
      assert.ok(typeof result.taskRangeLabel === 'string' && result.taskRangeLabel.length > 0);
    });

    it('8. taskRangeLabel이 Task 41~78 흐름을 표현함', () => {
      assert.ok(
        result.taskRangeLabel.includes('Task 41') ||
        result.taskRangeLabel.includes('41~78') ||
        result.taskRangeLabel.includes('read-only')
      );
    });

    it('9. previousPreconditionsLabel이 존재함', () => {
      assert.ok(typeof result.previousPreconditionsLabel === 'string' && result.previousPreconditionsLabel.length > 0);
    });

    it('10. previousPreconditionsLabel이 Task 78를 언급함', () => {
      assert.ok(
        result.previousPreconditionsLabel.includes('Task 78') ||
        result.previousPreconditionsLabel.includes('Preconditions Review')
      );
    });

    it('11. previousPreconditionsCommit이 555d83e임', () => {
      assert.strictEqual(result.previousPreconditionsCommit, '555d83e');
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

    it('14. boundarySummaryItems가 배열임', () => {
      assert.ok(Array.isArray(result.boundarySummaryItems));
    });

    it('15. boundarySummaryItems가 최소 4개임', () => {
      assert.ok(result.boundarySummaryItems.length >= 4);
    });

    it('16. 모든 boundarySummaryItem이 label/description/boundaryState를 가짐', () => {
      for (const item of result.boundarySummaryItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.boundaryState === 'string' && item.boundaryState.length > 0);
      }
    });

    it('17. 모든 boundarySummaryItem이 유효한 tone을 가짐', () => {
      const validTones = ['neutral', 'warning', 'blocked'];
      for (const item of result.boundarySummaryItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('18. boundarySummaryItems가 보류 해제 경계를 표현함', () => {
      const states = result.boundarySummaryItems.map((i) => i.boundaryState);
      const hasBoundary = states.some(
        (s) => s.includes('경계') || s.includes('미해제') || s.includes('미완료')
      );
      assert.ok(hasBoundary);
    });

    it('19. releaseIsNotGrantedItems가 배열임', () => {
      assert.ok(Array.isArray(result.releaseIsNotGrantedItems));
    });

    it('20. releaseIsNotGrantedItems가 최소 4개임', () => {
      assert.ok(result.releaseIsNotGrantedItems.length >= 4);
    });

    it('21. 모든 releaseIsNotGrantedItem이 label/description/notGrantedReason을 가짐', () => {
      for (const item of result.releaseIsNotGrantedItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.notGrantedReason === 'string' && item.notGrantedReason.length > 0);
      }
    });

    it('22. 모든 releaseIsNotGrantedItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.releaseIsNotGrantedItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('23. releaseIsNotGrantedItems가 해제 승인 미부여를 표현함', () => {
      const reasons = result.releaseIsNotGrantedItems.map((i) => i.notGrantedReason);
      const hasNotGranted = reasons.some(
        (r) => r.includes('미부여') || r.includes('미완료')
      );
      assert.ok(hasNotGranted);
    });

    it('24. preconditionReviewNotApprovalItems가 배열임', () => {
      assert.ok(Array.isArray(result.preconditionReviewNotApprovalItems));
    });

    it('25. preconditionReviewNotApprovalItems가 최소 3개임', () => {
      assert.ok(result.preconditionReviewNotApprovalItems.length >= 3);
    });

    it('26. 모든 preconditionReviewNotApprovalItem이 label/description/correctInterpretation을 가짐', () => {
      for (const item of result.preconditionReviewNotApprovalItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.correctInterpretation === 'string' && item.correctInterpretation.length > 0);
      }
    });

    it('27. 모든 preconditionReviewNotApprovalItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.preconditionReviewNotApprovalItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('28. preconditionReviewNotApprovalItems가 전제조건 검토와 해제 승인을 분리함', () => {
      const interpretations = result.preconditionReviewNotApprovalItems.map((i) => i.correctInterpretation);
      const hasDistinction = interpretations.some(
        (i) => i.includes('아님') || i.includes('자동') || i.includes('인지')
      );
      assert.ok(hasDistinction);
    });

    it('29. blockedReleasePathItems가 배열임', () => {
      assert.ok(Array.isArray(result.blockedReleasePathItems));
    });

    it('30. blockedReleasePathItems가 최소 4개임', () => {
      assert.ok(result.blockedReleasePathItems.length >= 4);
    });

    it('31. 모든 blockedReleasePathItem이 label/description/blockedState를 가짐', () => {
      for (const item of result.blockedReleasePathItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.blockedState === 'string' && item.blockedState.length > 0);
      }
    });

    it('32. 모든 blockedReleasePathItem의 tone이 blocked임', () => {
      for (const item of result.blockedReleasePathItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('33. blockedReleasePathItems가 차단 경로를 표현함', () => {
      const states = result.blockedReleasePathItems.map((i) => i.blockedState);
      const hasBlocked = states.some((s) => s.includes('차단'));
      assert.ok(hasBlocked);
    });

    it('34. requiredBeforeActualReleaseItems가 배열임', () => {
      assert.ok(Array.isArray(result.requiredBeforeActualReleaseItems));
    });

    it('35. requiredBeforeActualReleaseItems가 최소 3개임', () => {
      assert.ok(result.requiredBeforeActualReleaseItems.length >= 3);
    });

    it('36. 모든 requiredBeforeActualReleaseItem이 label/description/requiredEvidence를 가짐', () => {
      for (const item of result.requiredBeforeActualReleaseItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.requiredEvidence === 'string' && item.requiredEvidence.length > 0);
      }
    });

    it('37. 모든 requiredBeforeActualReleaseItem의 tone이 warning 또는 blocked임', () => {
      for (const item of result.requiredBeforeActualReleaseItems) {
        assert.ok(item.tone === 'warning' || item.tone === 'blocked');
      }
    });

    it('38. requiredBeforeActualReleaseItems가 별도 승인 증거를 표현함', () => {
      const evidence = result.requiredBeforeActualReleaseItems.map((i) => i.requiredEvidence);
      const hasEvidence = evidence.some(
        (e) => e.includes('승인') || e.includes('문서') || e.includes('기록')
      );
      assert.ok(hasEvidence);
    });

    it('39. nextHumanGateItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextHumanGateItems));
    });

    it('40. nextHumanGateItems가 최소 3개임', () => {
      assert.ok(result.nextHumanGateItems.length >= 3);
    });

    it('41. 모든 nextHumanGateItem이 label/description/nextOwner를 가짐', () => {
      for (const item of result.nextHumanGateItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
        assert.ok(typeof item.description === 'string' && item.description.length > 0);
        assert.ok(typeof item.nextOwner === 'string' && item.nextOwner.length > 0);
      }
    });

    it('42. 모든 nextHumanGateItem의 tone이 neutral 또는 warning임', () => {
      for (const item of result.nextHumanGateItems) {
        assert.ok(item.tone === 'neutral' || item.tone === 'warning');
      }
    });

    it('43. nextHumanGateItems가 사람(owner)을 언급함', () => {
      const owners = result.nextHumanGateItems.map((i) => i.nextOwner);
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

    it('52. boundarySummaryItems가 보류 미해제를 표현함', () => {
      const states = result.boundarySummaryItems.map((i) => i.boundaryState);
      const hasNotReleased = states.some(
        (s) => s.includes('미해제') || s.includes('경계 표시 완료') || s.includes('미완료')
      );
      assert.ok(hasNotReleased);
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView(undefined);
    const resultNull = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView(null);

    it('53. undefined 입력 시에도 previousPreconditionsCommit이 555d83e임', () => {
      assert.strictEqual(resultNoInput.previousPreconditionsCommit, '555d83e');
    });

    it('54. undefined 입력 시에도 statusLabel이 READ-ONLY RELEASE BOUNDARY임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY RELEASE BOUNDARY');
    });

    it('55. undefined 입력 시에도 releaseIsNotGrantedItems가 최소 4개임', () => {
      assert.ok(resultNoInput.releaseIsNotGrantedItems.length >= 4);
    });

    it('56. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('57. null 입력 시에도 previousPreconditionsCommit이 555d83e임', () => {
      assert.strictEqual(resultNull.previousPreconditionsCommit, '555d83e');
    });

    it('58. null 입력 시에도 finalNotice가 존재함', () => {
      assert.ok(typeof resultNull.finalNotice === 'string' && resultNull.finalNotice.length > 0);
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(
      process.cwd(),
      'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-boundary-view.service.ts'
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
