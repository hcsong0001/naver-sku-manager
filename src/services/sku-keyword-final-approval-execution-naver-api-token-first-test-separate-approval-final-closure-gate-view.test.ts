import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildTokenFirstTestSeparateApprovalFinalClosureGateView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-closure-gate-view.service';

describe('Task 72 - Token First Test Separate Approval Final Closure Gate Read-only Screen Flow', () => {
  describe('buildTokenFirstTestSeparateApprovalFinalClosureGateView() should create a read-only final closure gate view model', () => {
    const result = buildTokenFirstTestSeparateApprovalFinalClosureGateView();

    it('1. title이 존재함', () => {
      assert.ok(typeof result.title === 'string' && result.title.length > 0);
    });

    it('2. title이 Separate Approval Final Closure Gate를 포함함', () => {
      assert.ok(result.title.includes('Closure Gate'));
    });

    it('3. statusLabel이 READ-ONLY FINAL CLOSURE임', () => {
      assert.strictEqual(result.statusLabel, 'READ-ONLY FINAL CLOSURE');
    });

    it('4. statusTone이 review_only임', () => {
      assert.strictEqual(result.statusTone, 'review_only');
    });

    it('5. summary가 존재함', () => {
      assert.ok(typeof result.summary === 'string' && result.summary.length > 0);
    });

    it('6. task71Commit이 59202cc임', () => {
      assert.strictEqual(result.task71Commit, '59202cc');
    });

    it('7. finalClosureGateItems가 배열임', () => {
      assert.ok(Array.isArray(result.finalClosureGateItems));
    });

    it('8. finalClosureGateItems가 최소 5개임', () => {
      assert.ok(result.finalClosureGateItems.length >= 5);
    });

    it('9. 모든 finalClosureGateItem이 label을 가짐', () => {
      for (const item of result.finalClosureGateItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
      }
    });

    it('10. 모든 finalClosureGateItem이 value를 가짐', () => {
      for (const item of result.finalClosureGateItems) {
        assert.ok(typeof item.value === 'string' && item.value.length > 0);
      }
    });

    it('11. 모든 finalClosureGateItem이 유효한 tone을 가짐', () => {
      const validTones = ['safe', 'warning', 'blocked', 'neutral'];
      for (const item of result.finalClosureGateItems) {
        assert.ok(validTones.includes(item.tone));
      }
    });

    it('12. readOnlyClosureChecks가 배열임', () => {
      assert.ok(Array.isArray(result.readOnlyClosureChecks));
    });

    it('13. readOnlyClosureChecks가 최소 5개임', () => {
      assert.ok(result.readOnlyClosureChecks.length >= 5);
    });

    it('14. 모든 readOnlyClosureCheck이 label을 가짐', () => {
      for (const item of result.readOnlyClosureChecks) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
      }
    });

    it('15. 모든 readOnlyClosureCheck이 value를 가짐', () => {
      for (const item of result.readOnlyClosureChecks) {
        assert.ok(typeof item.value === 'string' && item.value.length > 0);
      }
    });

    it('16. releaseBlockedReasons가 배열임', () => {
      assert.ok(Array.isArray(result.releaseBlockedReasons));
    });

    it('17. releaseBlockedReasons가 최소 5개임', () => {
      assert.ok(result.releaseBlockedReasons.length >= 5);
    });

    it('18. 모든 releaseBlockedReason이 label을 가짐', () => {
      for (const item of result.releaseBlockedReasons) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
      }
    });

    it('19. 모든 releaseBlockedReason이 value를 가짐', () => {
      for (const item of result.releaseBlockedReasons) {
        assert.ok(typeof item.value === 'string' && item.value.length > 0);
      }
    });

    it('20. 모든 releaseBlockedReason의 tone이 blocked임', () => {
      for (const item of result.releaseBlockedReasons) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    it('21. nextHumanReviewItems가 배열임', () => {
      assert.ok(Array.isArray(result.nextHumanReviewItems));
    });

    it('22. nextHumanReviewItems가 최소 4개임', () => {
      assert.ok(result.nextHumanReviewItems.length >= 4);
    });

    it('23. 모든 nextHumanReviewItem이 label을 가짐', () => {
      for (const item of result.nextHumanReviewItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
      }
    });

    it('24. 모든 nextHumanReviewItem이 value를 가짐', () => {
      for (const item of result.nextHumanReviewItems) {
        assert.ok(typeof item.value === 'string' && item.value.length > 0);
      }
    });

    it('25. stillForbiddenItems가 배열임', () => {
      assert.ok(Array.isArray(result.stillForbiddenItems));
    });

    it('26. stillForbiddenItems가 최소 8개임', () => {
      assert.ok(result.stillForbiddenItems.length >= 8);
    });

    it('27. 모든 stillForbiddenItem이 label을 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.label === 'string' && item.label.length > 0);
      }
    });

    it('28. 모든 stillForbiddenItem이 value를 가짐', () => {
      for (const item of result.stillForbiddenItems) {
        assert.ok(typeof item.value === 'string' && item.value.length > 0);
      }
    });

    it('29. 모든 stillForbiddenItem의 tone이 blocked임', () => {
      for (const item of result.stillForbiddenItems) {
        assert.strictEqual(item.tone, 'blocked');
      }
    });

    const jsonString = JSON.stringify(result);

    it('30. 결과 JSON에 access_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('access_token'));
      assert.ok(!jsonString.toLowerCase().includes('ya29.'));
    });

    it('31. 결과 JSON에 refresh_token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('32. 결과 JSON에 client_secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
    });

    it('33. 결과 JSON에 Bearer 토큰 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Bearer '));
    });

    it('34. 결과 JSON에 endpoint URL 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('.naver.com'));
    });

    it('35. summary에 실행 허용 암시 문구가 없음', () => {
      const lower = result.summary.toLowerCase();
      assert.ok(!lower.includes('실행 허용'));
      assert.ok(!lower.includes('승인 완료'));
    });

    it('36. summary에 read-only 언급이 있음', () => {
      assert.ok(result.summary.includes('read-only') || result.summary.includes('허용되지 않'));
    });
  });

  describe('undefined / null 입력으로도 정상 동작해야 함', () => {
    const resultNoInput = buildTokenFirstTestSeparateApprovalFinalClosureGateView(undefined);
    const resultNull = buildTokenFirstTestSeparateApprovalFinalClosureGateView(null);

    it('37. undefined 입력 시에도 task71Commit이 59202cc임', () => {
      assert.strictEqual(resultNoInput.task71Commit, '59202cc');
    });

    it('38. undefined 입력 시에도 statusLabel이 READ-ONLY FINAL CLOSURE임', () => {
      assert.strictEqual(resultNoInput.statusLabel, 'READ-ONLY FINAL CLOSURE');
    });

    it('39. undefined 입력 시에도 finalClosureGateItems가 최소 5개임', () => {
      assert.ok(resultNoInput.finalClosureGateItems.length >= 5);
    });

    it('40. undefined 입력 시에도 stillForbiddenItems가 최소 8개임', () => {
      assert.ok(resultNoInput.stillForbiddenItems.length >= 8);
    });

    it('41. null 입력 시에도 task71Commit이 59202cc임', () => {
      assert.strictEqual(resultNull.task71Commit, '59202cc');
    });

    it('42. null 입력 시에도 statusTone이 review_only임', () => {
      assert.strictEqual(resultNull.statusTone, 'review_only');
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = join(process.cwd(), 'src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-closure-gate-view.service.ts');
    const serviceCode = readFileSync(serviceFilePath, 'utf-8');

    it('43. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('44. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
      assert.ok(!serviceCode.includes('.naver.com'));
    });

    it('45. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('46. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('import { PrismaClient }'));
    });

    it('47. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.upsert('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });

    it('48. service 코드에 onSubmit이 없음', () => {
      assert.ok(!serviceCode.includes('onSubmit'));
    });

    it('49. service 코드에 process.env 참조가 없음', () => {
      assert.ok(!serviceCode.includes('process.env'));
    });
  });
});
