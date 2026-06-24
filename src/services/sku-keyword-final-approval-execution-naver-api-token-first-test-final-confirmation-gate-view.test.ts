import test from 'node:test';
import assert from 'node:assert';
import { buildNaverApiTokenFirstTestFinalConfirmationGateView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-gate-view.service';
import fs from 'node:fs';
import path from 'node:path';

test('buildNaverApiTokenFirstTestFinalConfirmationGateView() should create a read-only final confirmation gate view model', async (t) => {
  const result = buildNaverApiTokenFirstTestFinalConfirmationGateView(null);

  await t.test('1. finalConfirmationGateCreated=true', () => {
    assert.strictEqual(result.finalConfirmationGateCreated, true);
  });

  await t.test('2. displayOnly=true', () => {
    assert.strictEqual(result.displayOnly, true);
  });

  await t.test('3. readOnly=true', () => {
    assert.strictEqual(result.readOnly, true);
  });

  await t.test('4. checklistCreated=true', () => {
    assert.strictEqual(result.checklistCreated, true);
  });

  await t.test('5. safetySummaryCreated=true', () => {
    assert.strictEqual(result.safetySummaryCreated, true);
  });

  await t.test('6. checklist가 15개 이상 포함됨', () => {
    assert.ok(result.checklist.length >= 15);
  });

  await t.test('7. finalConfirmationActionEnabled=false', () => {
    assert.strictEqual(result.finalConfirmationActionEnabled, false);
  });

  await t.test('8. finalConfirmationPersisted=false', () => {
    assert.strictEqual(result.finalConfirmationPersisted, false);
  });

  await t.test('9. finalConfirmationDbWriteExecuted=false', () => {
    assert.strictEqual(result.finalConfirmationDbWriteExecuted, false);
  });

  await t.test('10. dbWriteAllowed=false', () => {
    assert.strictEqual(result.dbWriteAllowed, false);
  });

  await t.test('11. dbWriteExecuted=false', () => {
    assert.strictEqual(result.dbWriteExecuted, false);
  });

  await t.test('12. prismaMutationExecuted=false', () => {
    assert.strictEqual(result.prismaMutationExecuted, false);
  });

  await t.test('13. naverApiCallAllowed=false', () => {
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  await t.test('14. networkExecutionAllowed=false', () => {
    assert.strictEqual(result.networkExecutionAllowed, false);
  });

  await t.test('15. httpClientCreated=false', () => {
    assert.strictEqual(result.httpClientCreated, false);
  });

  await t.test('16. tokenRequestAllowed=false', () => {
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  await t.test('17. tokenRequestPrepared=false', () => {
    assert.strictEqual(result.tokenRequestPrepared, false);
  });

  await t.test('18. tokenRequestExecuted=false', () => {
    assert.strictEqual(result.tokenRequestExecuted, false);
  });

  await t.test('19. accessTokenRequested=false', () => {
    assert.strictEqual(result.accessTokenRequested, false);
  });

  await t.test('20. refreshTokenRequested=false', () => {
    assert.strictEqual(result.refreshTokenRequested, false);
  });

  await t.test('21. tokenIssued=false', () => {
    assert.strictEqual(result.tokenIssued, false);
  });

  await t.test('22. tokenStored=false', () => {
    assert.strictEqual(result.tokenStored, false);
  });

  await t.test('23. authorizationHeaderCreated=false', () => {
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  await t.test('24. endpointResolved=false', () => {
    assert.strictEqual(result.endpointResolved, false);
  });

  await t.test('25. endpointCalled=false', () => {
    assert.strictEqual(result.endpointCalled, false);
  });

  await t.test('26. liveExecutionEnabled=false', () => {
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  await t.test('27. queueAllowed=false', () => {
    assert.strictEqual(result.queueAllowed, false);
  });

  await t.test('28. workerAllowed=false', () => {
    assert.strictEqual(result.workerAllowed, false);
  });

  const jsonString = JSON.stringify(result);

  await t.test('29. 결과 JSON 문자열에 access token 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('ya29.'), false);
  });

  await t.test('30. 결과 JSON 문자열에 refresh token 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('1//'), false);
  });

  await t.test('31. 결과 JSON 문자열에 secret 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('client_secret'), false);
  });

  await t.test('32. 결과 JSON 문자열에 Authorization/Bearer 문구가 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('Authorization'), false);
    assert.strictEqual(jsonString.includes('Bearer'), false);
  });

  await t.test('33. 결과 JSON 문자열에 endpoint URL/path 원문이 포함되지 않음', () => {
    assert.strictEqual(jsonString.includes('https://'), false);
    assert.strictEqual(jsonString.includes('http://'), false);
  });
});

test('Service code should not contain forbidden strings', async (t) => {
  const servicePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-gate-view.service.ts');
  const serviceCode = fs.readFileSync(servicePath, 'utf8');

  await t.test('34. service 코드에 fetch/axios/http client 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('fetch('), false);
    assert.strictEqual(serviceCode.includes('axios'), false);
  });

  await t.test('35. service 코드에 Naver endpoint URL 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('https://'), false);
    assert.strictEqual(serviceCode.includes('http://'), false);
  });

  await t.test('36. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
    assert.strictEqual(serviceCode.includes('Authorization'), false);
    assert.strictEqual(serviceCode.includes('Bearer'), false);
  });

  await t.test('37. service 코드에 Prisma import가 없음', () => {
    assert.strictEqual(serviceCode.includes('import { PrismaClient }'), false);
    assert.strictEqual(serviceCode.includes('import prisma'), false);
  });

  await t.test('38. service 코드에 Prisma mutation 구현이 없음', () => {
    assert.strictEqual(serviceCode.includes('.create('), false);
    assert.strictEqual(serviceCode.includes('.update('), false);
    assert.strictEqual(serviceCode.includes('.upsert('), false);
    assert.strictEqual(serviceCode.includes('.delete('), false);
  });
});
