import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildManualApprovalChecklistView,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-checklist-view.service';

// ── 기본 view model 필드 테스트 ────────────────────────────────────────────

test('1. manualApprovalChecklistCreated=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.manualApprovalChecklistCreated, true);
});

test('2. localOnly=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.localOnly, true);
});

test('3. readOnly=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.readOnly, true);
});

test('4. checklistItemsCreated=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.checklistItemsCreated, true);
});

test('5. checklist item이 14개 생성됨', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.checklistItems.length, 14);
});

test('6. 각 checklist item에는 key/label/required가 있음', () => {
  const result = buildManualApprovalChecklistView();
  for (const item of result.checklistItems) {
    assert.ok(typeof item.key === 'string' && item.key.length > 0, `item.key must be non-empty string: ${item.key}`);
    assert.ok(typeof item.label === 'string' && item.label.length > 0, `item.label must be non-empty string: ${item.label}`);
    assert.ok('required' in item, `item must have required field`);
    assert.strictEqual(item.required, true, `item.required must be true for key: ${item.key}`);
  }
});

test('7. 14개 항목이 모두 required=true', () => {
  const result = buildManualApprovalChecklistView();
  const allRequired = result.checklistItems.every(item => item.required === true);
  assert.strictEqual(allRequired, true);
});

test('8. checklist에 Go Ticket이 실제 token 발급이 아니라는 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(
    item => item.label.includes('Go Ticket') && (item.label.includes('token 발급') || item.label.includes('token 발급이 아님'))
  );
  assert.strictEqual(found, true, 'Go Ticket이 token 발급이 아님 항목이 없음');
});

test('9. checklist에 실제 token 요청은 아직 승인하지 않는다는 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(
    item => item.label.includes('token 요청') && item.label.includes('승인')
  );
  assert.strictEqual(found, true, 'token 요청 승인하지 않음 항목이 없음');
});

test('10. checklist에 상품 조회 API 호출을 승인하지 않는다는 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(
    item => item.label.includes('상품 조회')
  );
  assert.strictEqual(found, true, '상품 조회 항목이 없음');
});

test('11. checklist에 상품 수정 API 호출을 승인하지 않는다는 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(
    item => item.label.includes('상품 수정')
  );
  assert.strictEqual(found, true, '상품 수정 항목이 없음');
});

test('12. checklist에 Queue/Worker 실행을 승인하지 않는다는 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const hasQueue = result.checklistItems.some(item => item.label.includes('Queue'));
  const hasWorker = result.checklistItems.some(item => item.label.includes('Worker'));
  assert.strictEqual(hasQueue, true, 'Queue 항목이 없음');
  assert.strictEqual(hasWorker, true, 'Worker 항목이 없음');
});

test('13. checklist에 token 저장/로그/UI 표시 금지가 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const hasStorage = result.checklistItems.some(item => item.label.includes('token 원문 저장'));
  const hasLog = result.checklistItems.some(item => item.label.includes('token 로그'));
  const hasUi = result.checklistItems.some(item => item.label.includes('token UI'));
  assert.strictEqual(hasStorage, true, 'token 저장 금지 항목이 없음');
  assert.strictEqual(hasLog, true, 'token 로그 금지 항목이 없음');
  assert.strictEqual(hasUi, true, 'token UI 금지 항목이 없음');
});

test('14. checklist에 자동 재시도 금지가 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(item => item.label.includes('자동 재시도'));
  assert.strictEqual(found, true, '자동 재시도 금지 항목이 없음');
});

test('15. checklist에 다음 단계 별도 승인 필요가 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(
    item => item.label.includes('별도 사용자 승인') || item.label.includes('별도')
  );
  assert.strictEqual(found, true, '별도 승인 필요 항목이 없음');
});

// ── 강제 차단 플래그 테스트 ────────────────────────────────────────────────

test('16. approvalPersisted=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.approvalPersisted, false);
});

test('17. approvalSubmitted=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.approvalSubmitted, false);
});

test('18. approvalApiCalled=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.approvalApiCalled, false);
});

test('19. liveTokenTestExecutionAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.liveTokenTestExecutionAllowed, false);
});

test('20. dbWriteExecuted=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.dbWriteExecuted, false);
});

test('21. prismaMutationExecuted=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.prismaMutationExecuted, false);
});

test('22. goTicketIssued=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.goTicketIssued, false);
});

test('23. executionLeaseIssued=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.executionLeaseIssued, false);
});

test('24. requestPayloadCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.requestPayloadCreated, false);
});

test('25. requestBodyCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.requestBodyCreated, false);
});

test('26. requestHeadersCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.requestHeadersCreated, false);
});

test('27. networkExecutionAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.networkExecutionAllowed, false);
});

test('28. tokenRequestAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.tokenRequestAllowed, false);
});

test('29. tokenRequestExecuted=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.tokenRequestExecuted, false);
});

test('30. accessTokenRequested=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.accessTokenRequested, false);
});

test('31. refreshTokenRequested=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.refreshTokenRequested, false);
});

test('32. httpClientCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.httpClientCreated, false);
});

test('33. authorizationHeaderCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.authorizationHeaderCreated, false);
});

test('34. clientSecretUsed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.clientSecretUsed, false);
});

test('35. clientSecretSignCreated=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.clientSecretSignCreated, false);
});

// ── 실행 함수 포함 여부 테스트 ────────────────────────────────────────────

test('36. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  for (const [key, value] of Object.entries(result)) {
    assert.notStrictEqual(typeof value, 'function', `result.${key} must not be a function`);
  }
  for (const item of result.checklistItems) {
    for (const [key, value] of Object.entries(item)) {
      assert.notStrictEqual(typeof value, 'function', `checklistItem.${key} must not be a function`);
    }
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('37. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  const allStrings = [
    ...result.checklistItems.map(item => item.label),
    ...result.checklistItems.map(item => item.key),
  ].join(' ');
  assert.strictEqual(
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings),
    false,
    'access token JWT pattern must not be present',
  );
});

test('38. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  const allStrings = result.checklistItems.map(item => item.key).join(' ');
  assert.strictEqual(
    /refresh_token=/.test(allStrings),
    false,
    'refresh_token= must not be present',
  );
});

test('39. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  const allStrings = result.checklistItems.map(item => item.label).join(' ');
  assert.strictEqual(
    /secret=[A-Za-z0-9]/.test(allStrings),
    false,
    'secret= value must not be present',
  );
});

test('40. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  const allStrings = result.checklistItems.map(item => item.label).join(' ');
  assert.strictEqual(
    /Bearer\s+[A-Za-z0-9]/.test(allStrings),
    false,
    'Bearer token value must not be present',
  );
});

test('41. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
  const result = buildManualApprovalChecklistView();
  const allStrings = result.checklistItems.map(item => item.label).join(' ');
  const hasHttp = /https?:\/\//.test(allStrings);
  assert.strictEqual(hasHttp, false, 'endpoint URL must not be present');
});

// ── 각 key의 고유성 테스트 ────────────────────────────────────────────────

test('42. 14개 항목의 key가 모두 고유함', () => {
  const result = buildManualApprovalChecklistView();
  const keys = result.checklistItems.map(item => item.key);
  const uniqueKeys = new Set(keys);
  assert.strictEqual(uniqueKeys.size, 14, 'All checklist item keys must be unique');
});

test('43. manualReviewRequired=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.manualReviewRequired, true);
});

test('44. requiresSeparateLiveApproval=true', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.requiresSeparateLiveApproval, true);
});

test('45. 호출할 때마다 동일한 14개 항목을 반환함 (순수 함수)', () => {
  const result1 = buildManualApprovalChecklistView();
  const result2 = buildManualApprovalChecklistView();
  assert.strictEqual(result1.checklistItems.length, result2.checklistItems.length);
  for (let i = 0; i < result1.checklistItems.length; i++) {
    assert.strictEqual(result1.checklistItems[i].key, result2.checklistItems[i].key);
    assert.strictEqual(result1.checklistItems[i].label, result2.checklistItems[i].label);
  }
});

// ── Go Ticket 1회성 확인 ──────────────────────────────────────────────────

test('46. checklist에 Go Ticket 1회성 확인 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(item => item.label.includes('1회성'));
  assert.strictEqual(found, true, 'Go Ticket 1회성 항목이 없음');
});

test('47. checklist에 별도 실행 Task 필요 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(item => item.label.includes('별도 실행 Task'));
  assert.strictEqual(found, true, '별도 실행 Task 항목이 없음');
});

test('48. checklist에 token 즉시 폐기 항목이 포함됨', () => {
  const result = buildManualApprovalChecklistView();
  const found = result.checklistItems.some(item => item.label.includes('폐기'));
  assert.strictEqual(found, true, 'token 폐기 항목이 없음');
});

// ── 나머지 안전 플래그 테스트 ────────────────────────────────────────────

test('49. screenActionEnabled=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.screenActionEnabled, false);
});

test('50. liveExecutionEnabled=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.liveExecutionEnabled, false);
});

test('51. naverApiCallAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.naverApiCallAllowed, false);
});

test('52. queueAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.queueAllowed, false);
});

test('53. workerAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.workerAllowed, false);
});

test('54. tokenIssued=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.tokenIssued, false);
});

test('55. dbWriteAllowed=false', () => {
  const result = buildManualApprovalChecklistView();
  assert.strictEqual(result.dbWriteAllowed, false);
});
