import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter } from './sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service';
import type {
  TransitionApplyPrismaAdapterInput,
  TransitionApplyPrismaAdapterPort,
  TransitionApplyPrismaAdapterTxPort,
  TransitionApplyPrismaAdapterUpdateArgs,
} from '../types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';
import type { FinalApprovalExecutionTransitionApplyPlan } from '../types/sku-keyword-final-approval-execution-transition-apply.types';

describe('FinalApproval Execution Transition Apply Prisma Adapter (Mock)', () => {
  const mockNow = new Date().toISOString();

  // ── helpers ──

  const getValidPlan = (): FinalApprovalExecutionTransitionApplyPlan => ({
    allowed: true,
    executionTransitionAllowed: true,
    dbWriteRequired: true,
    executionPerformed: false,
    planItems: [
      { targetTable: 'NaverApiBatchJob', targetId: 'job-001', fromStatus: 'APPROVED', toStatus: 'EXECUTING', operation: 'UPDATE_STATUS' },
      { targetTable: 'NaverApiBatchJobItem', targetId: 'item-001', fromStatus: 'READY', toStatus: 'EXECUTING', operation: 'UPDATE_STATUS' },
      { targetTable: 'NaverApiBatchJobItem', targetId: 'item-002', fromStatus: 'READY', toStatus: 'EXECUTING', operation: 'UPDATE_STATUS' },
      { targetTable: 'NaverApiBatchFinalApproval', targetId: 'fa-001', fromStatus: 'ACTIVE', toStatus: 'ACTIVE', operation: 'MAINTAIN_STATUS' },
    ],
    reasonCodes: [],
    summary: 'Transition plan ready',
    plannedAt: mockNow,
  });

  const createMockAdapter = (callLog: string[]): TransitionApplyPrismaAdapterPort => ({
    transaction: async <T>(callback: (tx: TransitionApplyPrismaAdapterTxPort) => Promise<T>): Promise<T> => {
      callLog.push('transaction:begin');
      const txPort: TransitionApplyPrismaAdapterTxPort = {
        updateBatchJobStatus: async (args: TransitionApplyPrismaAdapterUpdateArgs) => {
          callLog.push(`updateBatchJobStatus:${args.targetId}:${args.fromStatus}->${args.toStatus}`);
          return { updated: true };
        },
        updateBatchJobItemStatus: async (args: TransitionApplyPrismaAdapterUpdateArgs) => {
          callLog.push(`updateBatchJobItemStatus:${args.targetId}:${args.fromStatus}->${args.toStatus}`);
          return { updated: true };
        },
      };
      const result = await callback(txPort);
      callLog.push('transaction:end');
      return result;
    },
  });

  const getValidOptions = () => ({
    now: mockNow,
    mode: 'dry-run' as const,
    idempotencyKey: 'idem-001',
    actorId: 'actor-001',
  });

  const buildInput = (
    plan: FinalApprovalExecutionTransitionApplyPlan,
    adapter: TransitionApplyPrismaAdapterPort,
    options: TransitionApplyPrismaAdapterInput['options'] = getValidOptions()
  ): TransitionApplyPrismaAdapterInput => ({ plan, adapter, options });

  // ── tests ──

  it('1. 정상 plan이면 transaction 안에서 BatchJob update mock 호출', async () => {
    const log: string[] = [];
    const adapter = createMockAdapter(log);
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), adapter)
    );
    assert.strictEqual(result.success, true);
    assert.ok(log.includes('transaction:begin'));
    assert.ok(log.some(l => l.startsWith('updateBatchJobStatus:job-001')));
    assert.ok(log.includes('transaction:end'));
  });

  it('2. 정상 plan이면 transaction 안에서 BatchJobItem update mock 호출', async () => {
    const log: string[] = [];
    const adapter = createMockAdapter(log);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), adapter)
    );
    assert.ok(log.some(l => l.startsWith('updateBatchJobItemStatus:item-001')));
    assert.ok(log.some(l => l.startsWith('updateBatchJobItemStatus:item-002')));
  });

  it('3. applied=true, dbWriteAttempted=true 반환', async () => {
    const log: string[] = [];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), createMockAdapter(log))
    );
    assert.strictEqual(result.applied, true);
    assert.strictEqual(result.dbWriteAttempted, true);
    assert.deepStrictEqual(result.updatedBatchJobIds, ['job-001']);
    assert.deepStrictEqual(result.updatedBatchJobItemIds, ['item-001', 'item-002']);
  });

  it('4. executionPerformed는 false 유지', async () => {
    const log: string[] = [];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), createMockAdapter(log))
    );
    assert.strictEqual(result.executionPerformed, false);
  });

  it('5. plan.allowed=false이면 write 호출 없음', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    plan.allowed = false;
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.applied, false);
    assert.strictEqual(result.dbWriteAttempted, false);
    assert.strictEqual(log.length, 0);
    assert.ok(result.reasonCodes.includes('PLAN_NOT_ALLOWED'));
  });

  it('6. dbWriteRequired=false이면 write 호출 없음', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    plan.dbWriteRequired = false;
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.applied, false);
    assert.strictEqual(result.dbWriteAttempted, false);
    assert.strictEqual(log.length, 0);
    assert.ok(result.reasonCodes.includes('PLAN_DB_WRITE_NOT_REQUIRED'));
  });

  it('7. live mode이면 차단', async () => {
    const log: string[] = [];
    const options = { ...getValidOptions(), mode: 'live' as const };
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), createMockAdapter(log), options)
    );
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('LIVE_ADAPTER_BLOCKED'));
    assert.strictEqual(log.length, 0);
  });

  it('8. executionPerformed=true 입력이면 차단', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    // force to true to test the guard
    (plan as { executionPerformed: boolean }).executionPerformed = true;
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('PLAN_ALREADY_EXECUTED_BLOCKED'));
    assert.strictEqual(log.length, 0);
  });

  it('9. unsupported targetTable이면 차단', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'SomeOtherTable' as 'NaverApiBatchJob', targetId: 'x-001', fromStatus: 'A', toStatus: 'B', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('UNSUPPORTED_TARGET_TABLE'));
  });

  it('10. FinalApproval UPDATE_STATUS write plan이면 차단', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'NaverApiBatchFinalApproval', targetId: 'fa-001', fromStatus: 'ACTIVE', toStatus: 'EXECUTING', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_WRITE_BLOCKED'));
  });

  it('11. FinalApprovalItem write plan이 존재하면 차단 (unsupported table)', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'NaverApiBatchFinalApprovalItem' as 'NaverApiBatchFinalApproval', targetId: 'fai-001', fromStatus: 'X', toStatus: 'Y', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log))
    );
    assert.strictEqual(result.success, false);
    // NaverApiBatchFinalApprovalItem은 BLOCKED_WRITE_TABLES 또는 UNSUPPORTED로 처리
    assert.ok(
      result.reasonCodes.includes('FINAL_APPROVAL_ITEM_WRITE_BLOCKED') ||
      result.reasonCodes.includes('UNSUPPORTED_TARGET_TABLE')
    );
  });

  it('12. transaction 실패 시 TRANSACTION_FAILED 반환', async () => {
    const failingAdapter: TransitionApplyPrismaAdapterPort = {
      transaction: async () => {
        throw new Error('DB connection lost');
      },
    };
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), failingAdapter)
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.dbWriteAttempted, true);
    assert.ok(result.reasonCodes.includes('TRANSACTION_FAILED'));
  });

  it('13. 여러 planItems 처리 순서 검증: Job → Items 순서', async () => {
    const log: string[] = [];
    const adapter = createMockAdapter(log);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(getValidPlan(), adapter)
    );
    const writeOps = log.filter(l => l.startsWith('update'));
    assert.strictEqual(writeOps.length, 3);
    assert.ok(writeOps[0].startsWith('updateBatchJobStatus:job-001'));
    assert.ok(writeOps[1].startsWith('updateBatchJobItemStatus:item-001'));
    assert.ok(writeOps[2].startsWith('updateBatchJobItemStatus:item-002'));
  });

  it('14. 입력 객체 mutation 없음', async () => {
    const log: string[] = [];
    const plan = getValidPlan();
    const options = getValidOptions();
    const planSnapshot = JSON.stringify(plan);
    const optionsSnapshot = JSON.stringify(options);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
      buildInput(plan, createMockAdapter(log), options)
    );
    assert.strictEqual(JSON.stringify(plan), planSnapshot);
    assert.strictEqual(JSON.stringify(options), optionsSnapshot);
  });

  it('15. 실제 Prisma/DB/Redis/Naver import 없음', async () => {
    const fs = await import('node:fs');
    const source = fs.readFileSync(
      'src/services/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service.ts',
      'utf-8'
    );
    assert.ok(!source.includes("from '@prisma/client'"));
    assert.ok(!source.includes("from 'prisma'"));
    assert.ok(!source.includes("from 'bullmq'"));
    assert.ok(!source.includes("from 'ioredis'"));
    assert.ok(!source.includes("from 'redis'"));
    assert.ok(!source.includes("from 'axios'"));
    assert.ok(!source.includes('node:http'));
    assert.ok(!source.includes('node:https'));
    assert.ok(!source.includes("from 'node-fetch'"));
    assert.ok(!source.includes('/generated/prisma'));
  });
});
