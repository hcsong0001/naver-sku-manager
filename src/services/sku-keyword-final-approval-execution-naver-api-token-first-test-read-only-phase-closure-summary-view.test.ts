import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { buildNaverApiTokenFirstTestReadOnlyPhaseClosureSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-read-only-phase-closure-summary-view.service';

test('buildNaverApiTokenFirstTestReadOnlyPhaseClosureSummaryView() should create a read-only phase closure summary view model', async (t) => {
  const result = buildNaverApiTokenFirstTestReadOnlyPhaseClosureSummaryView();

  await t.test('1. view model 생성 시 readOnlyPhaseClosureSummaryCreated=true', () => {
    assert.strictEqual(result.readOnlyPhaseClosureSummaryCreated, true);
  });

  await t.test('2. view model은 readOnly=true', () => {
    assert.strictEqual(result.readOnly, true);
    assert.strictEqual(result.displayOnly, true);
    assert.strictEqual(result.executionLocked, true);
  });

  await t.test('3. closure summary 항목들이 포함되어야 함', () => {
    assert.ok(result.closureSummaryItems.length >= 4);
    assert.strictEqual(result.closureSummaryItems[0].isReadOnly, true);
  });

  await t.test('4. 모든 완료된 페이즈가 명시되어야 함', () => {
    assert.strictEqual(result.completedPhaseItems.length, 19);
  });

  await t.test('5. 전체 execution allowed는 false', () => {
    assert.strictEqual(result.executionButtonEnabled, false);
    assert.strictEqual(result.executionButtonRendered, false);
  });

  await t.test('6. DB write allowed는 false', () => {
    assert.strictEqual(result.dbWriteAllowed, false);
    assert.strictEqual(result.dbWriteExecuted, false);
    assert.strictEqual(result.prismaMutationExecuted, false);
  });

  await t.test('7. Naver API call allowed는 false', () => {
    assert.strictEqual(result.naverApiCallAllowed, false);
    assert.strictEqual(result.networkExecutionAllowed, false);
    assert.strictEqual(result.endpointCalled, false);
  });

  await t.test('8. Token 발급은 false', () => {
    assert.strictEqual(result.tokenRequestAllowed, false);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.tokenIssued, false);
    assert.strictEqual(result.tokenStored, false);
  });

  await t.test('9. Button states should all be false', () => {
    assert.strictEqual(result.approvalButtonRendered, false);
    assert.strictEqual(result.closureSaveButtonRendered, false);
    assert.strictEqual(result.closureConfirmButtonRendered, false);
    assert.strictEqual(result.closureReleaseButtonRendered, false);
    assert.strictEqual(result.finalSealConfirmButtonEnabled, false);
    assert.strictEqual(result.postApiEnabled, false);
  });

  await t.test('10. 결과 JSON 문자열에 금지 문자열 없음 검증', () => {
    const jsonString = JSON.stringify(result);
    assert.ok(!jsonString.includes('access_token'));
    assert.ok(!jsonString.includes('refresh_token'));
    assert.ok(!jsonString.includes('Bearer'));
    assert.ok(!jsonString.includes('Authorization'));
    assert.ok(!jsonString.includes('http://'));
    assert.ok(!jsonString.includes('https://'));
  });

  await t.test('Service code should not contain forbidden strings', async (sub) => {
    const serviceFilePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-read-only-phase-closure-summary-view.service.ts');
    const serviceCode = fs.readFileSync(serviceFilePath, 'utf-8');

    await sub.test('11. service 코드에 fetch/axios/http client 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    await sub.test('12. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    await sub.test('13. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    await sub.test('14. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
    });

    await sub.test('15. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
    });
  });
});
