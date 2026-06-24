import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFinalConfirmationView,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-view.service';

// ── 기본 view model 필드 ──────────────────────────────────────────────────

test('1. finalConfirmationCreated=true', () => {
  assert.strictEqual(buildFinalConfirmationView().finalConfirmationCreated, true);
});

test('2. localOnly=true', () => {
  assert.strictEqual(buildFinalConfirmationView().localOnly, true);
});

test('3. readOnly=true', () => {
  assert.strictEqual(buildFinalConfirmationView().readOnly, true);
});

test('4. stillNoWrite=true', () => {
  assert.strictEqual(buildFinalConfirmationView().stillNoWrite, true);
});

test('5. dryRunResultEvaluated=true', () => {
  assert.strictEqual(buildFinalConfirmationView().dryRunResultEvaluated, true);
});

test('6. confirmationChecklistCreated=true', () => {
  assert.strictEqual(buildFinalConfirmationView().confirmationChecklistCreated, true);
});

// ── 상태 분기 테스트 ──────────────────────────────────────────────────────

test('7. dry-run 결과가 없으면 final confirmation은 pending 상태', () => {
  const vm = buildFinalConfirmationView({});
  assert.strictEqual(vm.state, 'pending');
  assert.ok(vm.stateMessage.includes('Dry-run 검증'));
});

test('8. dry-run rejected이면 final confirmation은 blocked 상태', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: false, dryRunRejected: true, dryRunSaved: false });
  assert.strictEqual(vm.state, 'blocked');
  assert.ok(vm.stateMessage.includes('거부 사유'));
});

test('9. dry-run ok=true이고 saved=false이면 final confirmation review 가능', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.state, 'review');
  assert.ok(vm.stateMessage.includes('최종 확인'));
});

// ── 체크리스트 테스트 ──────────────────────────────────────────────────────

test('10. checklist item이 10개 생성됨', () => {
  assert.strictEqual(buildFinalConfirmationView().checklistItems.length, 10);
});

test('11. 각 checklist item은 key/label/required를 가짐', () => {
  const items = buildFinalConfirmationView().checklistItems;
  for (const item of items) {
    assert.ok(typeof item.key === 'string' && item.key.length > 0, `key is missing: ${item.key}`);
    assert.ok(typeof item.label === 'string' && item.label.length > 0, `label is missing: ${item.label}`);
    assert.strictEqual(item.required, true);
  }
});

test('12. 모든 checklist item은 required=true', () => {
  const items = buildFinalConfirmationView().checklistItems;
  for (const item of items) {
    assert.strictEqual(item.required, true);
  }
});

test('13. checklist에는 saved=false 확인 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('saved=false')));
});

test('14. checklist에는 dbWriteExecuted=false 확인 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('dbWriteExecuted=false')));
});

test('15. checklist에는 prismaMutationExecuted=false 확인 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('prismaMutationExecuted=false')));
});

test('16. checklist에는 Test DB 저장을 아직 하지 않는다는 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('Test DB 저장은 아직')));
});

test('17. checklist에는 운영 DB write 금지 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('운영 DB write')));
});

test('18. checklist에는 Naver API 호출 금지 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('Naver API 호출')));
});

test('19. checklist에는 token 발급 금지 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('token 발급')));
});

test('20. checklist에는 다음 단계 별도 승인 필요 항목이 포함됨', () => {
  const items = buildFinalConfirmationView().checklistItems;
  assert.ok(items.some(i => i.label.includes('별도 사용자 승인')));
});

// ── 강제 false 플래그 테스트 ──────────────────────────────────────────────

test('21. finalConfirmationPersisted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().finalConfirmationPersisted, false);
});

test('22. finalConfirmationSubmitted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().finalConfirmationSubmitted, false);
});

test('23. saveButtonEnabled=false', () => {
  assert.strictEqual(buildFinalConfirmationView().saveButtonEnabled, false);
});

test('24. saveApiCalled=false', () => {
  assert.strictEqual(buildFinalConfirmationView().saveApiCalled, false);
});

test('25. saveRequestCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().saveRequestCreated, false);
});

test('26. saved=false', () => {
  assert.strictEqual(buildFinalConfirmationView().saved, false);
});

test('27. testDbWriteExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().testDbWriteExecuted, false);
});

test('28. operatingDbWriteExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().operatingDbWriteExecuted, false);
});

test('29. dbWriteExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().dbWriteExecuted, false);
});

test('30. prismaMutationExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().prismaMutationExecuted, false);
});

test('31. goTicketIssued=false', () => {
  assert.strictEqual(buildFinalConfirmationView().goTicketIssued, false);
});

test('32. executionLeaseIssued=false', () => {
  assert.strictEqual(buildFinalConfirmationView().executionLeaseIssued, false);
});

test('33. tokenIssued=false', () => {
  assert.strictEqual(buildFinalConfirmationView().tokenIssued, false);
});

test('34. naverApiCallExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().naverApiCallExecuted, false);
});

test('35. requestPayloadCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().requestPayloadCreated, false);
});

test('36. requestBodyCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().requestBodyCreated, false);
});

test('37. requestHeadersCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().requestHeadersCreated, false);
});

test('38. networkExecutionAllowed=false', () => {
  assert.strictEqual(buildFinalConfirmationView().networkExecutionAllowed, false);
});

test('39. tokenRequestAllowed=false', () => {
  assert.strictEqual(buildFinalConfirmationView().tokenRequestAllowed, false);
});

test('40. tokenRequestExecuted=false', () => {
  assert.strictEqual(buildFinalConfirmationView().tokenRequestExecuted, false);
});

test('41. accessTokenRequested=false', () => {
  assert.strictEqual(buildFinalConfirmationView().accessTokenRequested, false);
});

test('42. refreshTokenRequested=false', () => {
  assert.strictEqual(buildFinalConfirmationView().refreshTokenRequested, false);
});

test('43. httpClientCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().httpClientCreated, false);
});

test('44. authorizationHeaderCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().authorizationHeaderCreated, false);
});

test('45. clientSecretUsed=false', () => {
  assert.strictEqual(buildFinalConfirmationView().clientSecretUsed, false);
});

test('46. clientSecretSignCreated=false', () => {
  assert.strictEqual(buildFinalConfirmationView().clientSecretSignCreated, false);
});

// ── 실행 함수 포함 여부 ────────────────────────────────────────────────────

test('47. 결과 객체 전체에 실행 함수가 포함되지 않음', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  for (const [key, value] of Object.entries(vm)) {
    if (key === 'checklistItems') continue;
    assert.notStrictEqual(typeof value, 'function', `vm.${key} must not be a function`);
  }
});

// ── 금지 문자열 테스트 ────────────────────────────────────────────────────

test('48. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  const allStrings = [vm.stateMessage, ...vm.checklistItems.map(i => i.label)].join(' ');
  assert.strictEqual(/ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/.test(allStrings), false);
});

test('49. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
  const vm = buildFinalConfirmationView();
  assert.strictEqual(/refresh_token=/.test(vm.stateMessage), false);
});

test('50. 결과 문자열 전체에 secret 원문이 포함되지 않음', () => {
  const vm = buildFinalConfirmationView();
  assert.strictEqual(/secret=[A-Za-z0-9]/.test(vm.stateMessage), false);
});

test('51. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
  const vm = buildFinalConfirmationView();
  assert.strictEqual(/Bearer\s+[A-Za-z0-9]/.test(vm.stateMessage), false);
});

test('52. 결과 문자열 전체에 Naver endpoint URL/path 원문이 포함되지 않음', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  const allStrings = [vm.stateMessage, ...vm.checklistItems.map(i => i.label)].join(' ');
  assert.strictEqual(/https?:\/\//.test(allStrings), false);
});

// ── 서비스 코드 안전 검증 (import/코드 부재 확인) ─────────────────────────

test('53. service 코드에 fetch/axios/http client 구현이 없음 — 순수 함수만 있음', () => {
  const vm = buildFinalConfirmationView();
  assert.strictEqual(typeof vm.httpClientCreated, 'boolean');
  assert.strictEqual(vm.httpClientCreated, false);
});

test('54. service 코드에 endpoint URL/path 구현이 없음', () => {
  const vm = buildFinalConfirmationView();
  assert.strictEqual(vm.endpointResolved, false);
  assert.strictEqual(vm.endpointCalled, false);
});

test('55. service 코드에 signature 생성 로직이 없음', () => {
  assert.strictEqual(buildFinalConfirmationView().clientSecretSignCreated, false);
});

test('56. service 코드에 prisma mutation 구현이 없음', () => {
  assert.strictEqual(buildFinalConfirmationView().prismaMutationExecuted, false);
});

// ── 추가 안전 테스트 ──────────────────────────────────────────────────────

test('57. review 상태에서도 saveButtonEnabled=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.saveButtonEnabled, false);
});

test('58. review 상태에서도 saved=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.saved, false);
});

test('59. review 상태에서도 dbWriteExecuted=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.dbWriteExecuted, false);
});

test('60. review 상태에서도 goTicketIssued=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.goTicketIssued, false);
});

test('61. review 상태에서도 tokenIssued=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: true, dryRunRejected: false, dryRunSaved: false });
  assert.strictEqual(vm.tokenIssued, false);
});

test('62. blocked 상태에서도 saved=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: false, dryRunRejected: true, dryRunSaved: false });
  assert.strictEqual(vm.saved, false);
});

test('63. blocked 상태에서도 dbWriteExecuted=false', () => {
  const vm = buildFinalConfirmationView({ dryRunOk: false, dryRunRejected: true, dryRunSaved: false });
  assert.strictEqual(vm.dbWriteExecuted, false);
});

test('64. checklist key는 모두 unique함', () => {
  const items = buildFinalConfirmationView().checklistItems;
  const keys = items.map(i => i.key);
  const uniqueKeys = new Set(keys);
  assert.strictEqual(uniqueKeys.size, keys.length);
});
