import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildNaverApiTokenFirstTestManualApprovalFinalSealView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-final-seal-view.service';

describe('buildNaverApiTokenFirstTestManualApprovalFinalSealView() should create a read-only manual approval final seal view model', () => {
  const result = buildNaverApiTokenFirstTestManualApprovalFinalSealView();

  it('1. finalSealCreated=true', () => {
    assert.strictEqual(result.finalSealCreated, true);
  });

  it('2. displayOnly=true', () => {
    assert.strictEqual(result.displayOnly, true);
  });

  it('3. readOnly=true', () => {
    assert.strictEqual(result.readOnly, true);
  });

  it('4. executionLocked=true', () => {
    assert.strictEqual(result.executionLocked, true);
  });

  it('5. sealIsReadOnly=true', () => {
    assert.strictEqual(result.sealIsReadOnly, true);
  });

  it('6. checklistIsExecution=false', () => {
    assert.strictEqual(result.checklistIsExecution, false);
  });

  it('7. currentScreenIsReviewOnly=true', () => {
    assert.strictEqual(result.currentScreenIsReviewOnly, true);
  });

  it('8. manualReviewRequired=true', () => {
    assert.strictEqual(result.manualReviewRequired, true);
  });

  it('9. requiresSeparateLiveApproval=true', () => {
    assert.strictEqual(result.requiresSeparateLiveApproval, true);
  });

  it('10. tokenTestStillNotAllowed=true', () => {
    assert.strictEqual(result.tokenTestStillNotAllowed, true);
  });

  it('11. title이 정의되어 있음', () => {
    assert.ok(result.title.length > 0);
  });

  it('12. sealStatusLabel이 올바름', () => {
    assert.ok(result.sealStatusLabel.includes('실행 금지'));
  });

  it('13. sealStatusNote가 올바름', () => {
    assert.ok(result.sealStatusNote.includes('실행 권한은 여전히 차단'));
  });

  it('14. sealItems가 3개 포함됨', () => {
    assert.strictEqual(result.sealItems.length, 3);
  });

  it('15. 각 sealItem의 isExecutable=false', () => {
    for (const item of result.sealItems) {
      assert.strictEqual(item.isExecutable, false);
      assert.strictEqual(item.isReadOnly, true);
    }
  });

  it('16. sealClarificationItems가 4개 포함됨', () => {
    assert.strictEqual(result.sealClarificationItems.length, 4);
  });

  it('17. 각 clarificationItem의 isExecutable=false', () => {
    for (const item of result.sealClarificationItems) {
      assert.strictEqual(item.isExecutable, false);
      assert.strictEqual(item.isReadOnly, true);
    }
  });

  it('18. executionButtonRendered=false', () => {
    assert.strictEqual(result.executionButtonRendered, false);
  });

  it('19. finalSealSaveButtonRendered=false', () => {
    assert.strictEqual(result.finalSealSaveButtonRendered, false);
  });

  it('20. formRendered=false', () => {
    assert.strictEqual(result.formRendered, false);
  });

  it('21. postApiEnabled=false', () => {
    assert.strictEqual(result.postApiEnabled, false);
  });

  it('22. liveTokenTestExecutionAllowed=false', () => {
    assert.strictEqual(result.liveTokenTestExecutionAllowed, false);
  });

  it('23. dbWriteAllowed=false', () => {
    assert.strictEqual(result.dbWriteAllowed, false);
  });

  it('24. naverApiCallAllowed=false', () => {
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('25. tokenIssued=false', () => {
    assert.strictEqual(result.tokenIssued, false);
  });

  it('26. endpointCalled=false', () => {
    assert.strictEqual(result.endpointCalled, false);
  });

  describe('결과 구조에 금지된 문자열이 포함되지 않아야 함', () => {
    const jsonString = JSON.stringify(result);

    it('27. 결과 JSON 문자열에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('access_token'));
    });

    it('28. 결과 JSON 문자열에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('refresh_token'));
    });

    it('29. 결과 JSON 문자열에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('client_secret'));
      assert.ok(!jsonString.includes('secret_key'));
    });

    it('30. 결과 JSON 문자열에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('31. 결과 JSON 문자열에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
    });
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-final-seal-view.service.ts');
    const serviceCode = fs.readFileSync(serviceFilePath, 'utf8');

    it('32. service 코드에 fetch/axios 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
    });

    it('33. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('34. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('35. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
      assert.ok(!serviceCode.includes('prisma'));
    });

    it('36. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
