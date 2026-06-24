import test from 'node:test';
import assert from 'node:assert';
import { buildNaverApiTokenFirstTestActionLockView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-action-lock-view.service';
import fs from 'node:fs';
import path from 'node:path';

test('buildNaverApiTokenFirstTestActionLockView() should create a read-only action lock view model', async (t) => {
  const result = buildNaverApiTokenFirstTestActionLockView(null);

  await t.test('1. actionLockViewCreated=true', () => {
    assert.strictEqual(result.actionLockViewCreated, true);
  });

  await t.test('2. displayOnly=true', () => {
    assert.strictEqual(result.displayOnly, true);
  });

  await t.test('3. readOnly=true', () => {
    assert.strictEqual(result.readOnly, true);
  });

  await t.test('4. actionLocked=true', () => {
    assert.strictEqual(result.actionLocked, true);
  });

  await t.test('5. lockReasonsCreated=true', () => {
    assert.strictEqual(result.lockReasonsCreated, true);
  });

  await t.test('6. safetySummaryCreated=true', () => {
    assert.strictEqual(result.safetySummaryCreated, true);
  });

  await t.test('7. lockReasons가 16개 이상 포함됨', () => {
    assert.ok(result.lockReasons.length >= 16);
  });

  await t.test('8. actionButtonRendered=false', () => {
    assert.strictEqual(result.actionButtonRendered, false);
  });

  await t.test('9. actionButtonEnabled=false', () => {
    assert.strictEqual(result.actionButtonEnabled, false);
  });

  await t.test('10. formRendered=false', () => {
    assert.strictEqual(result.formRendered, false);
  });

  await t.test('11. formSubmitEnabled=false', () => {
    assert.strictEqual(result.formSubmitEnabled, false);
  });

  await t.test('12. postApiEnabled=false', () => {
    assert.strictEqual(result.postApiEnabled, false);
  });

  await t.test('13. finalConfirmationActionEnabled=false', () => {
    assert.strictEqual(result.finalConfirmationActionEnabled, false);
  });

  await t.test('14. finalConfirmationPersisted=false', () => {
    assert.strictEqual(result.finalConfirmationPersisted, false);
  });

  await t.test('15. finalConfirmationDbWriteExecuted=false', () => {
    assert.strictEqual(result.finalConfirmationDbWriteExecuted, false);
  });

  await t.test('16. dbWriteAllowed=false', () => {
    assert.strictEqual(result.dbWriteAllowed, false);
  });

  await t.test('17. dbWriteExecuted=false', () => {
    assert.strictEqual(result.dbWriteExecuted, false);
  });

  await t.test('18. prismaMutationExecuted=false', () => {
    assert.strictEqual(result.prismaMutationExecuted, false);
  });

  await t.test('19. naverApiCallAllowed=false', () => {
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  await t.test('20. networkExecutionAllowed=false', () => {
    assert.strictEqual(result.networkExecutionAllowed, false);
  });

  await t.test('21. httpClientCreated=false', () => {
    assert.strictEqual(result.httpClientCreated, false);
  });

  await t.test('22. tokenRequestAllowed=false', () => {
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  await t.test('23. tokenRequestPrepared=false', () => {
    assert.strictEqual(result.tokenRequestPrepared, false);
  });

  await t.test('24. tokenRequestExecuted=false', () => {
    assert.strictEqual(result.tokenRequestExecuted, false);
  });

  await t.test('25. accessTokenRequested=false', () => {
    assert.strictEqual(result.accessTokenRequested, false);
  });

  await t.test('26. refreshTokenRequested=false', () => {
    assert.strictEqual(result.refreshTokenRequested, false);
  });

  await t.test('27. tokenIssued=false', () => {
    assert.strictEqual(result.tokenIssued, false);
  });

  await t.test('28. tokenStored=false', () => {
    assert.strictEqual(result.tokenStored, false);
  });

  await t.test('29. authorizationHeaderCreated=false', () => {
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  await t.test('30. endpointResolved=false', () => {
    assert.strictEqual(result.endpointResolved, false);
  });

  await t.test('31. endpointCalled=false', () => {
    assert.strictEqual(result.endpointCalled, false);
  });

  await t.test('32. liveExecutionEnabled=false', () => {
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  await t.test('33. queueAllowed=false', () => {
    assert.strictEqual(result.queueAllowed, false);
  });

  await t.test('34. workerAllowed=false', () => {
    assert.strictEqual(result.workerAllowed, false);
  });

  const jsonString = JSON.stringify(result);

  await t.test('35. 결과 JSON 문자열에 access token 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('ya29.'), false);
  });

  await t.test('36. 결과 JSON 문자열에 refresh token 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('1//'), false);
  });

  await t.test('37. 결과 JSON 문자열에 secret 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('client_secret'), false);
  });

  await t.test('38. 결과 JSON 문자열에 Authorization/Bearer 문구가 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('Authorization'), false);
    assert.strictEqual(jsonString.includes('Bearer'), false);
  });

  await t.test('39. 결과 JSON 문자열에 endpoint URL/path 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('https://'), false);
    assert.strictEqual(jsonString.includes('http://'), false);
  });
});

test('Service code should not contain forbidden strings', async (t) => {
  const servicePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-action-lock-view.service.ts');
  const serviceCode = fs.readFileSync(servicePath, 'utf8');

  await t.test('40. service 코드에 fetch/axios/http client 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('fetch('), false);
    assert.strictEqual(serviceCode.includes('axios'), false);
  });

  await t.test('41. service 코드에 Naver endpoint URL 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('https://'), false);
    assert.strictEqual(serviceCode.includes('http://'), false);
  });

  await t.test('42. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
    assert.strictEqual(serviceCode.includes('Authorization'), false);
    assert.strictEqual(serviceCode.includes('Bearer'), false);
  });

  await t.test('43. service 코드에 Prisma import가 없음', () => {
    assert.strictEqual(serviceCode.includes('import { PrismaClient }'), false);
    assert.strictEqual(serviceCode.includes('import prisma'), false);
  });

  await t.test('44. service 코드에 Prisma mutation 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('.create('), false);
    assert.strictEqual(serviceCode.includes('.update('), false);
    assert.strictEqual(serviceCode.includes('.upsert('), false);
    assert.strictEqual(serviceCode.includes('.delete('), false);
  });
});
