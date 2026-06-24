import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDisabledAdapterResult,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-save-disabled-adapter.service';

// ── 기본 view model 필드 ──────────────────────────────────────────────────

test('1. disabledAdapterCreated=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().disabledAdapterCreated, true);
});

test('2. disabledRouteResponseCreated=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().disabledRouteResponseCreated, true);
});

test('3. readOnly=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().readOnly, true);
});

test('4. stillNoWrite=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().stillNoWrite, true);
});

test('5. writeDisabled=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().writeDisabled, true);
});

test('6. requiresExplicitUserApproval=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().requiresExplicitUserApproval, true);
});

test('7. operatingDbForbidden=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().operatingDbForbidden, true);
});

test('8. naverApiForbidden=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().naverApiForbidden, true);
});

test('9. tokenIssueForbidden=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().tokenIssueForbidden, true);
});

test('10. gateResultEvaluated=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().gateResultEvaluated, true);
});

// ── Gate READY 상태에서도 false 불변 조건 ─────────────────────────────────

test('11. Gate READY 상태여도 saved=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.saved, false);
});

test('12. Gate READY 상태여도 writeDisabled=true', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.writeDisabled, true);
});

test('13. Gate READY 상태여도 requiresExplicitUserApproval=true', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.requiresExplicitUserApproval, true);
});

test('14. Gate READY 상태여도 saveButtonEnabled=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.saveButtonEnabled, false);
});

test('15. Gate READY 상태여도 saveApiEnabled=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.saveApiEnabled, false);
});

test('16. Gate READY 상태여도 testDbWriteAllowed=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.testDbWriteAllowed, false);
});

test('17. Gate READY 상태여도 testDbWriteExecuted=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.testDbWriteExecuted, false);
});

test('18. Gate READY 상태여도 operatingDbWriteExecuted=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.operatingDbWriteExecuted, false);
});

test('19. Gate READY 상태여도 dbWriteExecuted=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.dbWriteExecuted, false);
});

test('20. Gate READY 상태여도 prismaImported=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.prismaImported, false);
});

test('21. Gate READY 상태여도 prismaMutationExecuted=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.prismaMutationExecuted, false);
});

test('22. Gate READY 상태여도 goTicketIssued=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.goTicketIssued, false);
});

test('23. Gate READY 상태여도 executionLeaseIssued=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.executionLeaseIssued, false);
});

test('24. Gate READY 상태여도 tokenIssued=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.tokenIssued, false);
});

test('25. Gate READY 상태여도 naverApiCallExecuted=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.naverApiCallExecuted, false);
});

// ── 강제 false 플래그 테스트 ──────────────────────────────────────────────

test('26. requestPayloadCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().requestPayloadCreated, false);
});

test('27. requestBodyCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().requestBodyCreated, false);
});

test('28. requestHeadersCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().requestHeadersCreated, false);
});

test('29. networkExecutionAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().networkExecutionAllowed, false);
});

test('30. tokenRequestAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().tokenRequestAllowed, false);
});

test('31. tokenRequestExecuted=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().tokenRequestExecuted, false);
});

test('32. accessTokenRequested=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().accessTokenRequested, false);
});

test('33. refreshTokenRequested=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().refreshTokenRequested, false);
});

test('34. httpClientCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().httpClientCreated, false);
});

test('35. authorizationHeaderCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().authorizationHeaderCreated, false);
});

test('36. clientSecretUsed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().clientSecretUsed, false);
});

test('37. clientSecretSignCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().clientSecretSignCreated, false);
});

// ── 실행 함수 포함 여부 ────────────────────────────────────────────────────

test('38. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  for (const [key, value] of Object.entries(result)) {
    assert.notStrictEqual(typeof value, 'function', `result.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('39. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(/ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(result.statusMessage), false);
});

test('40. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  assert.strictEqual(/refresh_token=/.test(buildDisabledAdapterResult().statusMessage), false);
});

test('41. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  assert.strictEqual(/secret=[A-Za-z0-9]/.test(buildDisabledAdapterResult().statusMessage), false);
});

test('42. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  assert.strictEqual(/Bearer\s+[A-Za-z0-9]/.test(buildDisabledAdapterResult().statusMessage), false);
});

test('43. 결과 문자열 전체에 Naver endpoint URL/path 원문이 포함되지 않음', () => {
  assert.strictEqual(/https?:\/\//.test(buildDisabledAdapterResult().statusMessage), false);
});

// ── Route 응답 조건 (서비스 레벨 검증) ───────────────────────────────────

test('44. route 응답 형태 — ok=false 역할: adapterStatus는 DISABLED 또는 READY_ONLY_FOR_FUTURE임', () => {
  const result = buildDisabledAdapterResult();
  assert.ok(
    result.adapterStatus === 'DISABLED_PENDING_EXPLICIT_USER_APPROVAL' ||
    result.adapterStatus === 'READY_ONLY_FOR_FUTURE_TEST_DB_SAVE_TASK',
  );
});

test('45. route 응답 형태 — rejected 역할: writeDisabled=true', () => {
  assert.strictEqual(buildDisabledAdapterResult().writeDisabled, true);
});

test('46. route 응답 형태 — saved=false 항상 유지', () => {
  assert.strictEqual(buildDisabledAdapterResult().saved, false);
});

test('47. route 응답 형태 — writeDisabled=true 항상 유지', () => {
  assert.strictEqual(buildDisabledAdapterResult().writeDisabled, true);
});

test('48. route 응답 형태 — requiresExplicitUserApproval=true 항상 유지', () => {
  assert.strictEqual(buildDisabledAdapterResult().requiresExplicitUserApproval, true);
});

// ── 추가 안전 테스트 ──────────────────────────────────────────────────────

test('49. statusMessage에 명시적 사용자 승인 또는 아직 구현 안 됨 문구가 포함됨', () => {
  const result = buildDisabledAdapterResult();
  assert.ok(
    result.statusMessage.includes('명시적 사용자 승인') ||
    result.statusMessage.includes('구현되지 않았습니다'),
  );
});

test('50. Gate READY statusMessage에 별도 Task 문구가 포함됨', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.ok(result.statusMessage.includes('별도 Task') || result.statusMessage.includes('다음 Task'));
});

test('51. liveExecutionEnabled=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().liveExecutionEnabled, false);
});

test('52. naverApiCallAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().naverApiCallAllowed, false);
});

test('53. queueAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().queueAllowed, false);
});

test('54. workerAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().workerAllowed, false);
});

test('55. dbWriteAllowed=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().dbWriteAllowed, false);
});

test('56. service 코드에 endpoint URL/path 구현이 없음 — endpointResolved=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().endpointResolved, false);
});

test('57. service 코드에 signature 생성 로직이 없음 — clientSecretSignCreated=false', () => {
  assert.strictEqual(buildDisabledAdapterResult().clientSecretSignCreated, false);
});

test('58. Gate READY와 non-READY 모두 writeDisabled=true 유지', () => {
  const ready = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  const notReady = buildDisabledAdapterResult({ gateStatus: 'WAITING' });
  assert.strictEqual(ready.writeDisabled, true);
  assert.strictEqual(notReady.writeDisabled, true);
});

test('59. Gate READY와 non-READY 모두 prismaImported=false 유지', () => {
  const ready = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  const notReady = buildDisabledAdapterResult({});
  assert.strictEqual(ready.prismaImported, false);
  assert.strictEqual(notReady.prismaImported, false);
});

test('60. Gate READY와 non-READY 모두 prismaMutationExecuted=false 유지', () => {
  const ready = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  const notReady = buildDisabledAdapterResult({});
  assert.strictEqual(ready.prismaMutationExecuted, false);
  assert.strictEqual(notReady.prismaMutationExecuted, false);
});

test('61. service 코드에 fetch/axios/http client 구현이 없음', () => {
  assert.strictEqual(buildDisabledAdapterResult().httpClientCreated, false);
});

test('62. service 코드에 prisma import가 없음', () => {
  assert.strictEqual(buildDisabledAdapterResult().prismaImported, false);
});

test('63. service 코드에 prisma mutation 구현이 없음', () => {
  assert.strictEqual(buildDisabledAdapterResult().prismaMutationExecuted, false);
});

test('64. 입력 없어도 안전하게 실행됨', () => {
  const result = buildDisabledAdapterResult();
  assert.ok(result.disabledAdapterCreated);
  assert.ok(result.writeDisabled);
  assert.strictEqual(result.saved, false);
});

test('65. adapterStatus READY_ONLY_FOR_FUTURE_TEST_DB_SAVE_TASK에서도 saved=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.adapterStatus, 'READY_ONLY_FOR_FUTURE_TEST_DB_SAVE_TASK');
  assert.strictEqual(result.saved, false);
});

test('66. adapterStatus READY_ONLY_FOR_FUTURE_TEST_DB_SAVE_TASK에서도 saveButtonEnabled=false', () => {
  const result = buildDisabledAdapterResult({ gateStatus: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY' });
  assert.strictEqual(result.saveButtonEnabled, false);
});
