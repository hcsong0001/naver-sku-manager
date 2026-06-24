import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-checklist-alignment-view.service';

describe('buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView() should create a read-only checklist alignment view model', () => {
  const result = buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView();

  it('1. checklistAlignmentCreated=true', () => {
    assert.strictEqual(result.checklistAlignmentCreated, true);
  });

  it('2. displayOnly=true', () => {
    assert.strictEqual(result.displayOnly, true);
  });

  it('3. readOnly=true', () => {
    assert.strictEqual(result.readOnly, true);
  });

  it('4. alignmentItems가 3개 이상 포함됨', () => {
    assert.ok(result.alignmentItems.length >= 3);
    for (const item of result.alignmentItems) {
      assert.strictEqual(item.isReadOnly, true);
      assert.strictEqual(item.isExecutable, false);
    }
  });

  it('5. checklistClarificationItems가 4개 이상 포함됨', () => {
    assert.ok(result.checklistClarificationItems.length >= 4);
    for (const item of result.checklistClarificationItems) {
      assert.strictEqual(item.isReadOnly, true);
      assert.strictEqual(item.isExecutable, false);
    }
  });

  it('6. executionButtonRendered=false', () => {
    assert.strictEqual(result.executionButtonRendered, false);
  });

  it('7. executionButtonEnabled=false', () => {
    assert.strictEqual(result.executionButtonEnabled, false);
  });

  it('8. formRendered=false', () => {
    assert.strictEqual(result.formRendered, false);
  });

  it('9. formSubmitEnabled=false', () => {
    assert.strictEqual(result.formSubmitEnabled, false);
  });

  it('10. postApiEnabled=false', () => {
    assert.strictEqual(result.postApiEnabled, false);
  });

  it('11. finalConfirmationActionEnabled=false', () => {
    assert.strictEqual(result.finalConfirmationActionEnabled, false);
  });

  it('12. finalConfirmationPersisted=false', () => {
    assert.strictEqual(result.finalConfirmationPersisted, false);
  });

  it('13. finalConfirmationDbWriteExecuted=false', () => {
    assert.strictEqual(result.finalConfirmationDbWriteExecuted, false);
  });

  it('14. dbWriteAllowed=false', () => {
    assert.strictEqual(result.dbWriteAllowed, false);
  });

  it('15. dbWriteExecuted=false', () => {
    assert.strictEqual(result.dbWriteExecuted, false);
  });

  it('16. prismaMutationExecuted=false', () => {
    assert.strictEqual(result.prismaMutationExecuted, false);
  });

  it('17. naverApiCallAllowed=false', () => {
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('18. networkExecutionAllowed=false', () => {
    assert.strictEqual(result.networkExecutionAllowed, false);
  });

  it('19. httpClientCreated=false', () => {
    assert.strictEqual(result.httpClientCreated, false);
  });

  it('20. tokenRequestAllowed=false', () => {
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  it('21. tokenRequestPrepared=false', () => {
    assert.strictEqual(result.tokenRequestPrepared, false);
  });

  it('22. tokenRequestExecuted=false', () => {
    assert.strictEqual(result.tokenRequestExecuted, false);
  });

  it('23. accessTokenRequested=false', () => {
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('24. refreshTokenRequested=false', () => {
    assert.strictEqual(result.refreshTokenRequested, false);
  });

  it('25. tokenIssued=false', () => {
    assert.strictEqual(result.tokenIssued, false);
  });

  it('26. tokenStored=false', () => {
    assert.strictEqual(result.tokenStored, false);
  });

  it('27. authorizationHeaderCreated=false', () => {
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  it('28. endpointResolved=false', () => {
    assert.strictEqual(result.endpointResolved, false);
  });

  it('29. endpointCalled=false', () => {
    assert.strictEqual(result.endpointCalled, false);
  });

  it('30. liveExecutionEnabled=false', () => {
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  it('31. queueAllowed=false', () => {
    assert.strictEqual(result.queueAllowed, false);
  });

  it('32. workerAllowed=false', () => {
    assert.strictEqual(result.workerAllowed, false);
  });

  it('33. verificationSaveButtonRendered=false', () => {
    assert.strictEqual(result.verificationSaveButtonRendered, false);
  });

  it('34. verificationConfirmButtonRendered=false', () => {
    assert.strictEqual(result.verificationConfirmButtonRendered, false);
  });

  describe('결과 JSON 문자열 검증', () => {
    const jsonString = JSON.stringify(result);

    it('35. 결과 JSON 문자열에 access token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('ya29.'));
    });

    it('36. 결과 JSON 문자열에 refresh token 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('1//'));
    });

    it('37. 결과 JSON 문자열에 secret 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('secret'));
    });

    it('38. 결과 JSON 문자열에 Authorization/Bearer 문구가 포함되지 않음', () => {
      assert.ok(!jsonString.includes('Authorization'));
      assert.ok(!jsonString.includes('Bearer'));
    });

    it('39. 결과 JSON 문자열에 endpoint URL/path 원문이 포함되지 않음', () => {
      assert.ok(!jsonString.includes('http://'));
      assert.ok(!jsonString.includes('https://'));
    });
  });
});

describe('Service code should not contain forbidden strings', () => {
  const servicePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-checklist-alignment-view.service.ts');
  const serviceCode = fs.readFileSync(servicePath, 'utf-8');

  it('40. service 코드에 fetch/axios/http client 구현이 없음', () => {
    assert.ok(!serviceCode.includes('fetch('));
    assert.ok(!serviceCode.includes('axios.'));
  });

  it('41. service 코드에 Naver endpoint URL 구현이 없음', () => {
    assert.ok(!serviceCode.includes('http://'));
    assert.ok(!serviceCode.includes('https://'));
  });

  it('42. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
    assert.ok(!serviceCode.includes('Authorization:'));
    assert.ok(!serviceCode.includes('Bearer '));
  });

  it('43. service 코드에 Prisma import가 없음', () => {
    assert.ok(!serviceCode.includes('@prisma/client'));
  });

  it('44. service 코드에 Prisma mutation 구현이 없음', () => {
    assert.ok(!serviceCode.includes('.create('));
    assert.ok(!serviceCode.includes('.update('));
    assert.ok(!serviceCode.includes('.delete('));
    assert.ok(!serviceCode.includes('.deleteMany('));
    assert.ok(!serviceCode.includes('.updateMany('));
  });
});
