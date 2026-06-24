import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoTicketSaveContractReview,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-save-contract-review.service';

function fullInput() {
  return { jobId: 'job-abc123', checklistCheckedCount: 14, readinessStatus: 'READY' };
}

function partialInput() {
  return { jobId: 'job-abc123', checklistCheckedCount: 7, readinessStatus: 'READY' };
}

// ── 기본 view model 필드 테스트 ────────────────────────────────────────────

test('1. contractReviewCreated=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).contractReviewCreated, true);
});

test('2. localOnly=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).localOnly, true);
});

test('3. readOnly=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).readOnly, true);
});

test('4. noRoute=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).noRoute, true);
});

test('5. noWrite=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).noWrite, true);
});

test('6. requestShapeCreated=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).requestShapeCreated, true);
});

test('7. responseShapeCreated=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).responseShapeCreated, true);
});

test('8. rejectionRulesCreated=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).rejectionRulesCreated, true);
});

test('9. checklistStateEvaluated=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).checklistStateEvaluated, true);
});

test('10. checklistTotalCount=14', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).checklistTotalCount, 14);
});

test('11. 일부만 체크되면 allChecklistChecked=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(partialInput()).allChecklistChecked, false);
});

test('12. 14개 모두 체크되면 allChecklistChecked=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).allChecklistChecked, true);
});

// ── request shape 테스트 ──────────────────────────────────────────────────

test('13. request shape에는 jobId가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.ok(typeof result.requestShape.jobId === 'string' && result.requestShape.jobId.length > 0);
});

test('14. request shape에는 checklist count가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.requestShape.checklistTotalCount, 14);
  assert.strictEqual(result.requestShape.checklistCheckedCount, 14);
});

test('15. request shape에는 dryRunOnly=true가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.requestShape.dryRunOnly, true);
});

test('16. request shape에는 requestedByUserAction=true 후보가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.requestShape.requestedByUserAction, true);
});

// ── response shape 테스트 ────────────────────────────────────────────────

test('17. response shape에는 saved=false가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.responseShape.saved, false);
});

test('18. response shape에는 dbWriteExecuted=false가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.responseShape.dbWriteExecuted, false);
});

test('19. response shape에는 prismaMutationExecuted=false가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.responseShape.prismaMutationExecuted, false);
});

// ── rejection rules 테스트 ────────────────────────────────────────────────

test('20. rejection rules가 10개 이상 생성됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.ok(result.rejectionRules.length >= 10, `rejection rules must be >= 10, got ${result.rejectionRules.length}`);
});

test('21. rejection rules에 checklist 미완료가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('checklist') || r.condition.includes('체크') || r.key === 'checklistIncomplete',
  );
  assert.strictEqual(found, true, 'checklist incomplete rule missing');
});

test('22. rejection rules에 운영 DB 대상 거부가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('운영 DB') || r.key === 'targetIsOperatingDb',
  );
  assert.strictEqual(found, true, 'operating DB rejection rule missing');
});

test('23. rejection rules에 Naver API 호출 포함 거부가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('Naver API') || r.key === 'naverApiCallIncluded',
  );
  assert.strictEqual(found, true, 'Naver API call rejection rule missing');
});

test('24. rejection rules에 가격/재고 변경 포함 거부가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('가격') || r.condition.includes('재고') || r.key === 'priceOrStockChangeIncluded',
  );
  assert.strictEqual(found, true, 'price/stock change rejection rule missing');
});

test('25. rejection rules에 token/secret/header/endpoint 원문 포함 거부가 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('secret') || r.condition.includes('endpoint') || r.key === 'sensitiveValueIncluded',
  );
  assert.strictEqual(found, true, 'sensitive value rejection rule missing');
});

// ── 강제 차단 플래그 테스트 ────────────────────────────────────────────────

test('26. routeCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).routeCreated, false);
});

test('27. postHandlerCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).postHandlerCreated, false);
});

test('28. saveButtonEnabled=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).saveButtonEnabled, false);
});

test('29. saveApiCalled=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).saveApiCalled, false);
});

test('30. saveRequestCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).saveRequestCreated, false);
});

test('31. approvalPersisted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).approvalPersisted, false);
});

test('32. approvalSubmitted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).approvalSubmitted, false);
});

test('33. approvalApiCalled=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).approvalApiCalled, false);
});

test('34. testDbWriteExecuted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).testDbWriteExecuted, false);
});

test('35. operatingDbWriteExecuted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).operatingDbWriteExecuted, false);
});

test('36. dbWriteExecuted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).dbWriteExecuted, false);
});

test('37. prismaMutationExecuted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).prismaMutationExecuted, false);
});

test('38. goTicketIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).goTicketIssued, false);
});

test('39. executionLeaseIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).executionLeaseIssued, false);
});

test('40. requestPayloadCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).requestPayloadCreated, false);
});

test('41. requestBodyCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).requestBodyCreated, false);
});

test('42. requestHeadersCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).requestHeadersCreated, false);
});

test('43. networkExecutionAllowed=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).networkExecutionAllowed, false);
});

test('44. tokenRequestAllowed=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).tokenRequestAllowed, false);
});

test('45. tokenRequestExecuted=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).tokenRequestExecuted, false);
});

test('46. accessTokenRequested=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).accessTokenRequested, false);
});

test('47. refreshTokenRequested=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).refreshTokenRequested, false);
});

test('48. httpClientCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).httpClientCreated, false);
});

test('49. authorizationHeaderCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).authorizationHeaderCreated, false);
});

test('50. clientSecretUsed=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).clientSecretUsed, false);
});

test('51. clientSecretSignCreated=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).clientSecretSignCreated, false);
});

test('52. tokenIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).tokenIssued, false);
});

// ── 실행 함수 포함 여부 테스트 ────────────────────────────────────────────

test('53. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  for (const [key, value] of Object.entries(result)) {
    if (key === 'requestShape' || key === 'responseShape' || key === 'rejectionRules') continue;
    assert.notStrictEqual(typeof value, 'function', `result.${key} must not be a function`);
  }
  for (const [key, value] of Object.entries(result.requestShape)) {
    if (key === 'safetyFlags' || key === 'acknowledgementKeys') continue;
    assert.notStrictEqual(typeof value, 'function', `requestShape.${key} must not be a function`);
  }
  for (const [key, value] of Object.entries(result.responseShape)) {
    assert.notStrictEqual(typeof value, 'function', `responseShape.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('54. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const allStrings = [
    result.requestShape.jobId,
    result.requestShape.readinessStatus,
    result.requestShape.saveTarget,
    result.responseShape.nextRequiredAction,
    ...result.rejectionRules.map(r => r.reason),
  ].join(' ');
  assert.strictEqual(
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings),
    false,
    'JWT token pattern must not be present',
  );
});

test('55. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const allStrings = result.rejectionRules.map(r => r.reason).join(' ');
  assert.strictEqual(/refresh_token=/.test(allStrings), false, 'refresh_token= must not be present');
});

test('56. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const allStrings = result.rejectionRules.map(r => r.reason).join(' ');
  assert.strictEqual(/secret=[A-Za-z0-9]/.test(allStrings), false, 'secret= value must not be present');
});

test('57. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const allStrings = result.rejectionRules.map(r => r.reason).join(' ');
  assert.strictEqual(/Bearer\s+[A-Za-z0-9]/.test(allStrings), false, 'Bearer token must not be present');
});

test('58. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const allStrings = [
    result.requestShape.jobId,
    result.responseShape.nextRequiredAction,
    ...result.rejectionRules.map(r => r.reason),
  ].join(' ');
  assert.strictEqual(/https?:\/\//.test(allStrings), false, 'endpoint URL must not be present');
});

// ── 추가 안전 테스트 ──────────────────────────────────────────────────────

test('59. rejection rules의 각 항목에 key/condition/reason이 있음', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  for (const rule of result.rejectionRules) {
    assert.ok(typeof rule.key === 'string' && rule.key.length > 0, 'rule.key must be non-empty');
    assert.ok(typeof rule.condition === 'string' && rule.condition.length > 0, 'rule.condition must be non-empty');
    assert.ok(typeof rule.reason === 'string' && rule.reason.length > 0, 'rule.reason must be non-empty');
  }
});

test('60. rejection rules의 key가 모두 고유함', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const keys = result.rejectionRules.map(r => r.key);
  const unique = new Set(keys);
  assert.strictEqual(unique.size, keys.length, 'All rejection rule keys must be unique');
});

test('61. null 입력 시에도 안전하게 contract review 생성됨', () => {
  const result = buildGoTicketSaveContractReview(null);
  assert.strictEqual(result.contractReviewCreated, true);
  assert.strictEqual(result.allChecklistChecked, false);
  assert.strictEqual(result.noRoute, true);
  assert.strictEqual(result.noWrite, true);
});

test('62. request shape의 acknowledgementKeys에 14개 항목이 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  assert.strictEqual(result.requestShape.acknowledgementKeys.length, 14);
});

test('63. response shape의 goTicketIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).responseShape.goTicketIssued, false);
});

test('64. response shape의 executionLeaseIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).responseShape.executionLeaseIssued, false);
});

test('65. response shape의 tokenIssued=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).responseShape.tokenIssued, false);
});

test('66. rejection rules에 별도 사용자 승인 없음 거부 규칙이 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('별도 사용자 승인') || r.key === 'noSeparateApproval',
  );
  assert.strictEqual(found, true, 'no separate approval rejection rule missing');
});

test('67. rejection rules에 중복 저장 위험 거부 규칙이 포함됨', () => {
  const result = buildGoTicketSaveContractReview(fullInput());
  const found = result.rejectionRules.some(
    r => r.condition.includes('중복') || r.key === 'duplicateSaveRisk',
  );
  assert.strictEqual(found, true, 'duplicate save rejection rule missing');
});

test('68. request shape의 saveTarget이 TEST_DB_ONLY_FUTURE_TASK', () => {
  assert.strictEqual(
    buildGoTicketSaveContractReview(fullInput()).requestShape.saveTarget,
    'TEST_DB_ONLY_FUTURE_TASK',
  );
});

test('69. manualReviewRequired=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).manualReviewRequired, true);
});

test('70. requiresSeparateLiveApproval=true', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).requiresSeparateLiveApproval, true);
});

test('71. liveExecutionEnabled=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).liveExecutionEnabled, false);
});

test('72. naverApiCallAllowed=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).naverApiCallAllowed, false);
});

test('73. queueAllowed=false', () => {
  assert.strictEqual(buildGoTicketSaveContractReview(fullInput()).queueAllowed, false);
});
