import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { buildFinalApprovalExecutionTransitionApplyPlan } from './sku-keyword-final-approval-execution-transition-apply.service';
import type { FinalApprovalExecutionTransitionApplyInput } from '../types/sku-keyword-final-approval-execution-transition-apply.types';

describe('FinalApproval Execution Transition Apply Pure Service', () => {
  const mockNow = new Date().toISOString();

  const getValidInput = (): FinalApprovalExecutionTransitionApplyInput => ({
    now: mockNow,
    mode: 'dry-run',
    guardResult: {
      allowed: true,
      reasonCodes: [],
      checkedAt: mockNow,
    },
    finalApproval: {
      id: 'fa-001',
      status: 'ACTIVE',
    },
    batchJob: {
      id: 'job-001',
      status: 'APPROVED',
    },
    batchJobItems: [
      { id: 'item-001', status: 'READY' },
      { id: 'item-002', status: 'READY' },
    ],
    request: {
      finalApprovalId: 'fa-001',
      idempotencyKey: 'idem-001',
      actorId: 'actor-001',
    },
  });

  it('1. guard allowed=true + dry-run + 정상 상태이면 transition plan을 반환한다', () => {
    const result = buildFinalApprovalExecutionTransitionApplyPlan(getValidInput());
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.executionTransitionAllowed, true);
    assert.ok(result.planItems.length > 0);
  });

  it('2. 생성된 plan에 BatchJob APPROVED -> EXECUTING 후보가 포함된다', () => {
    const result = buildFinalApprovalExecutionTransitionApplyPlan(getValidInput());
    const jobPlan = result.planItems.find(p => p.targetTable === 'NaverApiBatchJob');
    assert.ok(jobPlan, 'BatchJob plan should exist');
    assert.strictEqual(jobPlan!.fromStatus, 'APPROVED');
    assert.strictEqual(jobPlan!.toStatus, 'EXECUTING');
    assert.strictEqual(jobPlan!.operation, 'UPDATE_STATUS');
  });

  it('3. 생성된 plan에 BatchJobItem READY -> EXECUTING 후보가 포함된다', () => {
    const result = buildFinalApprovalExecutionTransitionApplyPlan(getValidInput());
    const itemPlans = result.planItems.filter(p => p.targetTable === 'NaverApiBatchJobItem');
    assert.strictEqual(itemPlans.length, 2);
    for (const plan of itemPlans) {
      assert.strictEqual(plan.fromStatus, 'READY');
      assert.strictEqual(plan.toStatus, 'EXECUTING');
      assert.strictEqual(plan.operation, 'UPDATE_STATUS');
    }
  });

  it('4. executionPerformed는 항상 false이다', () => {
    const successResult = buildFinalApprovalExecutionTransitionApplyPlan(getValidInput());
    assert.strictEqual(successResult.executionPerformed, false);

    const failInput = getValidInput();
    failInput.guardResult.allowed = false;
    const failResult = buildFinalApprovalExecutionTransitionApplyPlan(failInput);
    assert.strictEqual(failResult.executionPerformed, false);
  });

  it('5. dbWriteRequired는 allowed=true일 때 true이다 (실제 DB write는 하지 않음)', () => {
    const result = buildFinalApprovalExecutionTransitionApplyPlan(getValidInput());
    assert.strictEqual(result.dbWriteRequired, true);
  });

  it('6. guard allowed=false이면 planItems가 비어있다', () => {
    const input = getValidInput();
    input.guardResult.allowed = false;
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.planItems.length, 0);
    assert.ok(result.reasonCodes.includes('GUARD_NOT_ALLOWED'));
  });

  it('7. live mode이면 차단된다', () => {
    const input = getValidInput();
    input.mode = 'live';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('LIVE_TRANSITION_APPLY_BLOCKED'));
  });

  it('8. finalApprovalId 불일치이면 차단된다', () => {
    const input = getValidInput();
    input.request.finalApprovalId = 'fa-999';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_ID_MISMATCH'));
  });

  it('9. finalApproval.status가 ACTIVE가 아니면 차단된다', () => {
    const input = getValidInput();
    input.finalApproval.status = 'REVOKED';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_NOT_ACTIVE'));
  });

  it('10. batchJob.status가 APPROVED가 아니면 차단된다', () => {
    const input = getValidInput();
    input.batchJob.status = 'DRAFT';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('BATCH_JOB_NOT_APPROVED'));
  });

  it('11. batchJobItem.status가 READY가 아니면 차단된다', () => {
    const input = getValidInput();
    input.batchJobItems[0].status = 'FAILED';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('BATCH_JOB_ITEM_NOT_READY'));
  });

  it('12. 이미 EXECUTING 상태가 입력에 있으면 차단된다', () => {
    const input = getValidInput();
    input.batchJob.status = 'EXECUTING';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('EXECUTING_STATE_ALREADY_PRESENT'));
  });

  it('13. idempotencyKey 누락이면 차단된다', () => {
    const input = getValidInput();
    input.request.idempotencyKey = '';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('IDEMPOTENCY_KEY_MISSING'));
  });

  it('14. actorId 누락이면 차단된다', () => {
    const input = getValidInput();
    input.request.actorId = '';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('ACTOR_ID_MISSING'));
  });

  it('15. 여러 실패 조건이 있으면 reasonCodes를 모두 반환한다', () => {
    const input = getValidInput();
    input.mode = 'live';
    input.request.actorId = '';
    input.batchJob.status = 'DRAFT';
    const result = buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCodes.length, 3);
    assert.ok(result.reasonCodes.includes('LIVE_TRANSITION_APPLY_BLOCKED'));
    assert.ok(result.reasonCodes.includes('ACTOR_ID_MISSING'));
    assert.ok(result.reasonCodes.includes('BATCH_JOB_NOT_APPROVED'));
  });

  it('16. 입력 객체를 mutation하지 않는다', () => {
    const input = getValidInput();
    const snapshot = JSON.stringify(input);
    buildFinalApprovalExecutionTransitionApplyPlan(input);
    assert.strictEqual(JSON.stringify(input), snapshot);
  });
});
