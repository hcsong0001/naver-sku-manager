import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  executeDryRunValidation,
  type DryRunValidationRequest,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-save-dry-run-validation.service';

function validRequest(): DryRunValidationRequest {
  return {
    jobId: 'job-abc123',
    readinessStatus: 'READY',
    checklistTotalCount: 14,
    checklistCheckedCount: 14,
    allChecklistChecked: true,
    previewMode: true,
    saveTarget: 'TEST_DB_ONLY_FUTURE_TASK',
    acknowledgementKeys: Array.from({ length: 14 }, (_, i) => `key${i}`),
    requestedByUserAction: true,
    dryRunOnly: true,
  };
}

// ── 기본 view model 필드 테스트 ────────────────────────────────────────────

test('1. dryRunValidationCreated=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).dryRunValidationCreated, true);
});

test('2. validationExecuted=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).validationExecuted, true);
});

test('3. dryRunOnly=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).dryRunOnly, true);
});

test('4. noWrite=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).noWrite, true);
});

test('5. requestValidated=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).requestValidated, true);
});

test('6. responseCreated=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).responseCreated, true);
});

test('7. rejectionRulesApplied=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).rejectionRulesApplied, true);
});

// ── 거부 조건 테스트 ──────────────────────────────────────────────────────

test('8. checklist 미완료이면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), allChecklistChecked: false, checklistCheckedCount: 7 };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('checklist')));
});

test('9. checklist 14개 완료이면 checklist 조건 통과', () => {
  const result = executeDryRunValidation(validRequest());
  const hasChecklistRejection = result.rejectionReasons.some(r => r.includes('checklist'));
  assert.strictEqual(hasChecklistRejection, false);
});

test('10. previewMode가 true가 아니면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), previewMode: false };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('previewMode')));
});

test('11. saveTarget이 TEST_DB_ONLY_FUTURE_TASK가 아니면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), saveTarget: 'INVALID_TARGET' };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('saveTarget')));
});

test('12. dryRunOnly가 true가 아니면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), dryRunOnly: false };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('dryRunOnly')));
});

test('13. token/secret/header/endpoint 의심 필드가 있으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), someField: 'authorization: bearer xyz' };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
});

test('14. Naver API 호출 의도가 있으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), naverApiCallIntent: true };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('Naver API')));
});

test('15. 가격/재고 변경 의도가 있으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), priceChange: true };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('가격')));
});

test('16. Queue/Worker 실행 의도가 있으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), queueExecution: true };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('Queue')));
});

test('17. 유효한 dry-run 요청이면 ok=true', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).ok, true);
});

// ── 응답 불변 조건 테스트 ────────────────────────────────────────────────

test('18. 유효한 dry-run 요청이어도 saved=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).saved, false);
});

test('19. 유효한 dry-run 요청이어도 testDbWriteExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).testDbWriteExecuted, false);
});

test('20. 유효한 dry-run 요청이어도 operatingDbWriteExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).operatingDbWriteExecuted, false);
});

test('21. 유효한 dry-run 요청이어도 dbWriteExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).dbWriteExecuted, false);
});

test('22. 유효한 dry-run 요청이어도 prismaMutationExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).prismaMutationExecuted, false);
});

test('23. 유효한 dry-run 요청이어도 goTicketIssued=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).goTicketIssued, false);
});

test('24. 유효한 dry-run 요청이어도 executionLeaseIssued=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).executionLeaseIssued, false);
});

test('25. 유효한 dry-run 요청이어도 tokenIssued=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).tokenIssued, false);
});

test('26. 유효한 dry-run 요청이어도 naverApiCallExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).naverApiCallExecuted, false);
});

// ── 강제 차단 플래그 테스트 ────────────────────────────────────────────────

test('27. requestPayloadCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).requestPayloadCreated, false);
});

test('28. requestBodyCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).requestBodyCreated, false);
});

test('29. requestHeadersCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).requestHeadersCreated, false);
});

test('30. networkExecutionAllowed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).networkExecutionAllowed, false);
});

test('31. tokenRequestAllowed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).tokenRequestAllowed, false);
});

test('32. tokenRequestExecuted=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).tokenRequestExecuted, false);
});

test('33. accessTokenRequested=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).accessTokenRequested, false);
});

test('34. refreshTokenRequested=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).refreshTokenRequested, false);
});

test('35. httpClientCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).httpClientCreated, false);
});

test('36. authorizationHeaderCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).authorizationHeaderCreated, false);
});

test('37. clientSecretUsed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).clientSecretUsed, false);
});

test('38. clientSecretSignCreated=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).clientSecretSignCreated, false);
});

// ── 실행 함수 포함 여부 테스트 ────────────────────────────────────────────

test('39. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  for (const [key, value] of Object.entries(result)) {
    if (key === 'rejectionReasons') continue;
    assert.notStrictEqual(typeof value, 'function', `result.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('40. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  const allStrings = [result.nextRequiredAction, ...result.rejectionReasons].join(' ');
  assert.strictEqual(
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings),
    false,
  );
});

test('41. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  const allStrings = result.nextRequiredAction;
  assert.strictEqual(/refresh_token=/.test(allStrings), false);
});

test('42. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  const allStrings = result.nextRequiredAction;
  assert.strictEqual(/secret=[A-Za-z0-9]/.test(allStrings), false);
});

test('43. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  const allStrings = result.nextRequiredAction;
  assert.strictEqual(/Bearer\s+[A-Za-z0-9]/.test(allStrings), false);
});

test('44. 결과 문자열 전체에 Naver endpoint URL/path 원문이 포함되지 않음', () => {
  const result = executeDryRunValidation(validRequest());
  const allStrings = [result.nextRequiredAction, ...result.rejectionReasons].join(' ');
  assert.strictEqual(/https?:\/\//.test(allStrings), false);
});

// ── 추가 안전 테스트 ──────────────────────────────────────────────────────

test('45. readinessStatus가 없으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), readinessStatus: undefined };
  assert.strictEqual(executeDryRunValidation(req).rejected, true);
});

test('46. 거부된 경우에도 saved=false', () => {
  const req: DryRunValidationRequest = { ...validRequest(), allChecklistChecked: false };
  assert.strictEqual(executeDryRunValidation(req).saved, false);
});

test('47. 거부된 경우에도 dbWriteExecuted=false', () => {
  const req: DryRunValidationRequest = { ...validRequest(), allChecklistChecked: false };
  assert.strictEqual(executeDryRunValidation(req).dbWriteExecuted, false);
});

test('48. 거부된 경우에도 goTicketIssued=false', () => {
  const req: DryRunValidationRequest = { ...validRequest(), allChecklistChecked: false };
  assert.strictEqual(executeDryRunValidation(req).goTicketIssued, false);
});

test('49. 거부된 경우에도 tokenIssued=false', () => {
  const req: DryRunValidationRequest = { ...validRequest(), allChecklistChecked: false };
  assert.strictEqual(executeDryRunValidation(req).tokenIssued, false);
});

test('50. liveExecutionEnabled=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).liveExecutionEnabled, false);
});

test('51. naverApiCallAllowed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).naverApiCallAllowed, false);
});

test('52. queueAllowed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).queueAllowed, false);
});

test('53. workerAllowed=false', () => {
  assert.strictEqual(executeDryRunValidation(validRequest()).workerAllowed, false);
});

test('54. 유효한 요청이면 nextRequiredAction에 별도 사용자 승인이 포함됨', () => {
  const result = executeDryRunValidation(validRequest());
  assert.ok(result.nextRequiredAction.includes('별도 사용자 승인'));
});

test('55. 재고 변경 의도가 있으면 rejected=true', () => {
  const req: DryRunValidationRequest = { ...validRequest(), stockChange: true };
  const result = executeDryRunValidation(req);
  assert.strictEqual(result.rejected, true);
  assert.ok(result.rejectionReasons.some(r => r.includes('재고')));
});
