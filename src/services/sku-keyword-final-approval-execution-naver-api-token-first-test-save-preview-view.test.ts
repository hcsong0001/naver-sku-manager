import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoTicketSavePreviewView,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-save-preview-view.service';

function fullInput() {
  return { jobId: 'job-abc123', checklistCheckedCount: 14, readinessStatus: 'READY' };
}

function partialInput() {
  return { jobId: 'job-abc123', checklistCheckedCount: 7, readinessStatus: 'READY' };
}

// ── 기본 view model 필드 테스트 ────────────────────────────────────────────

test('1. savePreviewCreated=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.savePreviewCreated, true);
});

test('2. localOnly=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.localOnly, true);
});

test('3. readOnly=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.readOnly, true);
});

test('4. previewMode=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.previewMode, true);
});

test('5. checklistStateEvaluated=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.checklistStateEvaluated, true);
});

test('6. preview.checklistTotalCount=14', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.checklistTotalCount, 14);
});

test('7. 일부만 체크되면 preview.allChecklistChecked=false', () => {
  const result = buildGoTicketSavePreviewView(partialInput());
  assert.strictEqual(result.preview.allChecklistChecked, false);
});

test('8. 14개 모두 체크되면 preview.allChecklistChecked=true', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.allChecklistChecked, true);
});

test('9. preview에 TEST_DB_ONLY_FUTURE_TASK saveTarget이 포함됨', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.saveTarget, 'TEST_DB_ONLY_FUTURE_TASK');
});

test('10. preview에 별도 사용자 승인 필요 문구가 포함됨', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.ok(
    result.preview.nextRequiredAction.includes('별도 사용자 승인'),
    'nextRequiredAction must contain 별도 사용자 승인',
  );
});

// ── 강제 차단 플래그 테스트 ────────────────────────────────────────────────

test('11. saveButtonEnabled=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).saveButtonEnabled, false);
});

test('12. saveApiCalled=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).saveApiCalled, false);
});

test('13. saveRequestCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).saveRequestCreated, false);
});

test('14. approvalPersisted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).approvalPersisted, false);
});

test('15. approvalSubmitted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).approvalSubmitted, false);
});

test('16. approvalApiCalled=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).approvalApiCalled, false);
});

test('17. liveTokenTestExecutionAllowed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).liveTokenTestExecutionAllowed, false);
});

test('18. dbWriteAllowed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).dbWriteAllowed, false);
});

test('19. dbWriteExecuted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).dbWriteExecuted, false);
});

test('20. prismaMutationExecuted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).prismaMutationExecuted, false);
});

test('21. goTicketIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).goTicketIssued, false);
});

test('22. executionLeaseIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).executionLeaseIssued, false);
});

test('23. requestPayloadCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).requestPayloadCreated, false);
});

test('24. requestBodyCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).requestBodyCreated, false);
});

test('25. requestHeadersCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).requestHeadersCreated, false);
});

test('26. networkExecutionAllowed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).networkExecutionAllowed, false);
});

test('27. tokenRequestAllowed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).tokenRequestAllowed, false);
});

test('28. tokenRequestExecuted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).tokenRequestExecuted, false);
});

test('29. accessTokenRequested=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).accessTokenRequested, false);
});

test('30. refreshTokenRequested=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).refreshTokenRequested, false);
});

test('31. httpClientCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).httpClientCreated, false);
});

test('32. authorizationHeaderCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).authorizationHeaderCreated, false);
});

test('33. clientSecretUsed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).clientSecretUsed, false);
});

test('34. clientSecretSignCreated=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).clientSecretSignCreated, false);
});

test('35. tokenIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).tokenIssued, false);
});

// ── 실행 함수 포함 여부 테스트 ────────────────────────────────────────────

test('36. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  for (const [key, value] of Object.entries(result)) {
    if (key === 'preview') continue;
    assert.notStrictEqual(typeof value, 'function', `result.${key} must not be a function`);
  }
  for (const [key, value] of Object.entries(result.preview)) {
    assert.notStrictEqual(typeof value, 'function', `preview.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('37. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  const allStrings = [
    result.preview.jobId,
    result.preview.readinessStatus,
    result.preview.nextRequiredAction,
    result.preview.saveTarget,
  ].join(' ');
  assert.strictEqual(
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings),
    false,
    'access token JWT pattern must not be present',
  );
});

test('38. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  const allStrings = [result.preview.nextRequiredAction, result.preview.saveTarget].join(' ');
  assert.strictEqual(
    /refresh_token=/.test(allStrings),
    false,
    'refresh_token= must not be present',
  );
});

test('39. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  const allStrings = result.preview.nextRequiredAction;
  assert.strictEqual(
    /secret=[A-Za-z0-9]/.test(allStrings),
    false,
    'secret= value must not be present',
  );
});

test('40. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  const allStrings = [result.preview.nextRequiredAction, result.preview.saveTarget].join(' ');
  assert.strictEqual(
    /Bearer\s+[A-Za-z0-9]/.test(allStrings),
    false,
    'Bearer token value must not be present',
  );
});

test('41. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  const allStrings = [
    result.preview.nextRequiredAction,
    result.preview.saveTarget,
    result.preview.jobId,
  ].join(' ');
  assert.strictEqual(/https?:\/\//.test(allStrings), false, 'endpoint URL must not be present');
});

// ── preview 불변 조건 테스트 ──────────────────────────────────────────────

test('42. preview.previewMode=true 리터럴', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.previewMode, true);
});

test('43. preview.localOnly=true 리터럴', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.localOnly, true);
});

test('44. preview.readOnly=true 리터럴', () => {
  const result = buildGoTicketSavePreviewView(fullInput());
  assert.strictEqual(result.preview.readOnly, true);
});

test('45. preview.dbWriteExecuted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.dbWriteExecuted, false);
});

test('46. preview.prismaMutationExecuted=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.prismaMutationExecuted, false);
});

test('47. preview.goTicketIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.goTicketIssued, false);
});

test('48. preview.executionLeaseIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.executionLeaseIssued, false);
});

test('49. preview.tokenIssued=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.tokenIssued, false);
});

test('50. preview.naverApiCallAllowed=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.naverApiCallAllowed, false);
});

test('51. preview.liveExecutionEnabled=false', () => {
  assert.strictEqual(buildGoTicketSavePreviewView(fullInput()).preview.liveExecutionEnabled, false);
});

// ── null 입력 안전성 ──────────────────────────────────────────────────────

test('52. null 입력 시에도 안전하게 preview 생성됨', () => {
  const result = buildGoTicketSavePreviewView(null);
  assert.strictEqual(result.savePreviewCreated, true);
  assert.strictEqual(result.preview.allChecklistChecked, false);
  assert.strictEqual(result.preview.checklistCheckedCount, 0);
});

test('53. undefined 입력 시에도 안전하게 preview 생성됨', () => {
  const result = buildGoTicketSavePreviewView();
  assert.strictEqual(result.savePreviewCreated, true);
  assert.strictEqual(typeof result.preview.jobId, 'string');
});

test('54. 체크 수가 0이면 allChecklistChecked=false', () => {
  const result = buildGoTicketSavePreviewView({ checklistCheckedCount: 0 });
  assert.strictEqual(result.preview.allChecklistChecked, false);
});

test('55. 체크 수가 14이면 allChecklistChecked=true', () => {
  const result = buildGoTicketSavePreviewView({ checklistCheckedCount: 14 });
  assert.strictEqual(result.preview.allChecklistChecked, true);
});
