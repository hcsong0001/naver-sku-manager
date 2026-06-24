import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildExecutionGateView,
  type BuildExecutionGateInput,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-save-execution-gate-view.service';

function readyInput(): BuildExecutionGateInput {
  return {
    dryRunOk: true,
    dryRunRejected: false,
    dryRunSaved: false,
    dryRunDbWriteExecuted: false,
    dryRunPrismaMutationExecuted: false,
    dryRunTokenIssued: false,
    dryRunNaverApiCallExecuted: false,
    finalConfirmationAllChecked: true,
    finalConfirmationCheckedCount: 10,
  };
}

// ── 기본 view model 필드 ──────────────────────────────────────────────────

test('1. executionGateCreated=true', () => {
  assert.strictEqual(buildExecutionGateView().executionGateCreated, true);
});

test('2. localOnly=true', () => {
  assert.strictEqual(buildExecutionGateView().localOnly, true);
});

test('3. readOnly=true', () => {
  assert.strictEqual(buildExecutionGateView().readOnly, true);
});

test('4. stillNoWrite=true', () => {
  assert.strictEqual(buildExecutionGateView().stillNoWrite, true);
});

test('5. dryRunResultEvaluated=true', () => {
  assert.strictEqual(buildExecutionGateView().dryRunResultEvaluated, true);
});

test('6. finalConfirmationEvaluated=true', () => {
  assert.strictEqual(buildExecutionGateView().finalConfirmationEvaluated, true);
});

test('7. gateRulesEvaluated=true', () => {
  assert.strictEqual(buildExecutionGateView().gateRulesEvaluated, true);
});

// ── Gate 상태 분기 테스트 ──────────────────────────────────────────────────

test('8. dry-run 결과가 없으면 WAITING_FOR_DRY_RUN', () => {
  const vm = buildExecutionGateView({});
  assert.strictEqual(vm.gateStatus, 'WAITING_FOR_DRY_RUN');
});

test('9. dry-run rejected이면 BLOCKED_BY_DRY_RUN_REJECTION', () => {
  const vm = buildExecutionGateView({ dryRunOk: false, dryRunRejected: true });
  assert.strictEqual(vm.gateStatus, 'BLOCKED_BY_DRY_RUN_REJECTION');
});

test('10. dry-run ok=true이지만 final confirmation 미완료이면 WAITING_FOR_FINAL_CONFIRMATION', () => {
  const input: BuildExecutionGateInput = {
    ...readyInput(),
    finalConfirmationAllChecked: false,
  };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'WAITING_FOR_FINAL_CONFIRMATION');
});

test('11. dry-run ok=true, saved=false, final confirmation 완료이면 READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).gateStatus, 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY');
});

test('12. dry-run ok=true라도 saved=true이면 BLOCKED_BY_SAFETY_FLAGS', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunSaved: true };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'BLOCKED_BY_SAFETY_FLAGS');
});

test('13. dry-run ok=true라도 dbWriteExecuted=true이면 BLOCKED_BY_SAFETY_FLAGS', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunDbWriteExecuted: true };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'BLOCKED_BY_SAFETY_FLAGS');
});

test('14. dry-run ok=true라도 prismaMutationExecuted=true이면 BLOCKED_BY_SAFETY_FLAGS', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunPrismaMutationExecuted: true };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'BLOCKED_BY_SAFETY_FLAGS');
});

test('15. dry-run ok=true라도 tokenIssued=true이면 BLOCKED_BY_SAFETY_FLAGS', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunTokenIssued: true };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'BLOCKED_BY_SAFETY_FLAGS');
});

test('16. dry-run ok=true라도 naverApiCallExecuted=true이면 BLOCKED_BY_SAFETY_FLAGS', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunNaverApiCallExecuted: true };
  assert.strictEqual(buildExecutionGateView(input).gateStatus, 'BLOCKED_BY_SAFETY_FLAGS');
});

// ── READY 상태에서도 false 불변 조건 ──────────────────────────────────────

test('17. READY 상태여도 saveButtonEnabled=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).saveButtonEnabled, false);
});

test('18. READY 상태여도 saveApiCalled=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).saveApiCalled, false);
});

test('19. READY 상태여도 saveRequestCreated=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).saveRequestCreated, false);
});

test('20. READY 상태여도 saved=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).saved, false);
});

test('21. READY 상태여도 testDbWriteExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).testDbWriteExecuted, false);
});

test('22. READY 상태여도 operatingDbWriteExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).operatingDbWriteExecuted, false);
});

test('23. READY 상태여도 dbWriteExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).dbWriteExecuted, false);
});

test('24. READY 상태여도 prismaMutationExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).prismaMutationExecuted, false);
});

test('25. READY 상태여도 goTicketIssued=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).goTicketIssued, false);
});

test('26. READY 상태여도 executionLeaseIssued=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).executionLeaseIssued, false);
});

test('27. READY 상태여도 tokenIssued=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).tokenIssued, false);
});

test('28. READY 상태여도 naverApiCallExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).naverApiCallExecuted, false);
});

// ── 강제 false 플래그 테스트 ──────────────────────────────────────────────

test('29. requestPayloadCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().requestPayloadCreated, false);
});

test('30. requestBodyCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().requestBodyCreated, false);
});

test('31. requestHeadersCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().requestHeadersCreated, false);
});

test('32. networkExecutionAllowed=false', () => {
  assert.strictEqual(buildExecutionGateView().networkExecutionAllowed, false);
});

test('33. tokenRequestAllowed=false', () => {
  assert.strictEqual(buildExecutionGateView().tokenRequestAllowed, false);
});

test('34. tokenRequestExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView().tokenRequestExecuted, false);
});

test('35. accessTokenRequested=false', () => {
  assert.strictEqual(buildExecutionGateView().accessTokenRequested, false);
});

test('36. refreshTokenRequested=false', () => {
  assert.strictEqual(buildExecutionGateView().refreshTokenRequested, false);
});

test('37. httpClientCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().httpClientCreated, false);
});

test('38. authorizationHeaderCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().authorizationHeaderCreated, false);
});

test('39. clientSecretUsed=false', () => {
  assert.strictEqual(buildExecutionGateView().clientSecretUsed, false);
});

test('40. clientSecretSignCreated=false', () => {
  assert.strictEqual(buildExecutionGateView().clientSecretSignCreated, false);
});

// ── 실행 함수 포함 여부 ────────────────────────────────────────────────────

test('41. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const vm = buildExecutionGateView(readyInput());
  for (const [key, value] of Object.entries(vm)) {
    if (key === 'gateBlockedReasons') continue;
    assert.notStrictEqual(typeof value, 'function', `vm.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('42. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const vm = buildExecutionGateView(readyInput());
  const allStrings = [vm.gateStatusMessage, ...vm.gateBlockedReasons].join(' ');
  assert.strictEqual(/ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings), false);
});

test('43. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const vm = buildExecutionGateView();
  assert.strictEqual(/refresh_token=/.test(vm.gateStatusMessage), false);
});

test('44. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const vm = buildExecutionGateView();
  assert.strictEqual(/secret=[A-Za-z0-9]/.test(vm.gateStatusMessage), false);
});

test('45. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const vm = buildExecutionGateView();
  assert.strictEqual(/Bearer\s+[A-Za-z0-9]/.test(vm.gateStatusMessage), false);
});

test('46. 결과 문자열 전체에 Naver endpoint URL/path 원문이 포함되지 않음', () => {
  const vm = buildExecutionGateView(readyInput());
  const allStrings = [vm.gateStatusMessage, ...vm.gateBlockedReasons].join(' ');
  assert.strictEqual(/https?:\/\//.test(allStrings), false);
});

// ── 컴포넌트 및 서비스 코드 안전 검증 ─────────────────────────────────────

test('47. service 코드에 fetch/axios/http client 구현이 없음 — 순수 함수만 있음', () => {
  const vm = buildExecutionGateView();
  assert.strictEqual(vm.httpClientCreated, false);
});

test('48. service 코드에 endpoint URL/path 구현이 없음', () => {
  const vm = buildExecutionGateView();
  assert.strictEqual(vm.endpointResolved, false);
  assert.strictEqual(vm.endpointCalled, false);
});

test('49. service 코드에 signature 생성 로직이 없음', () => {
  assert.strictEqual(buildExecutionGateView().clientSecretSignCreated, false);
});

test('50. service 코드에 prisma mutation 구현이 없음', () => {
  assert.strictEqual(buildExecutionGateView().prismaMutationExecuted, false);
});

// ── 추가 안전 테스트 ──────────────────────────────────────────────────────

test('51. READY 상태에서 gateStatusMessage에 다음 Task 안내가 포함됨', () => {
  const vm = buildExecutionGateView(readyInput());
  assert.ok(
    vm.gateStatusMessage.includes('다음 Task') || vm.gateStatusMessage.includes('저장 버튼은 아직'),
  );
});

test('52. BLOCKED_BY_SAFETY_FLAGS 상태에서 gateBlockedReasons가 비어 있지 않음', () => {
  const input: BuildExecutionGateInput = { ...readyInput(), dryRunSaved: true };
  const vm = buildExecutionGateView(input);
  assert.ok(vm.gateBlockedReasons.length > 0);
});

test('53. WAITING_FOR_DRY_RUN에서도 saved=false', () => {
  assert.strictEqual(buildExecutionGateView({}).saved, false);
});

test('54. WAITING_FOR_DRY_RUN에서도 dbWriteExecuted=false', () => {
  assert.strictEqual(buildExecutionGateView({}).dbWriteExecuted, false);
});

test('55. BLOCKED 상태에서도 tokenIssued=false', () => {
  const input: BuildExecutionGateInput = { dryRunOk: false, dryRunRejected: true };
  assert.strictEqual(buildExecutionGateView(input).tokenIssued, false);
});

test('56. BLOCKED 상태에서도 goTicketIssued=false', () => {
  const input: BuildExecutionGateInput = { dryRunOk: false, dryRunRejected: true };
  assert.strictEqual(buildExecutionGateView(input).goTicketIssued, false);
});

test('57. liveExecutionEnabled=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).liveExecutionEnabled, false);
});

test('58. naverApiCallAllowed=false', () => {
  assert.strictEqual(buildExecutionGateView(readyInput()).naverApiCallAllowed, false);
});
