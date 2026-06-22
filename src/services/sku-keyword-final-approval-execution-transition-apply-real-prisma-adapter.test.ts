import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createFinalApprovalExecutionTransitionApplyPrismaAdapterPort } from './sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.service';
import { applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter } from './sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service';
import type { PrismaLikeClient, PrismaLikeTxClient } from '../types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';
import type { TransitionApplyPrismaAdapterInput } from '../types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';
import type { FinalApprovalExecutionTransitionApplyPlan } from '../types/sku-keyword-final-approval-execution-transition-apply.types';

describe('FinalApproval Execution Transition Apply Real Prisma Adapter (Mock Prisma Client)', () => {
  const mockNow = new Date().toISOString();

  // ── helpers ──

  interface MockCallLog {
    method: string;
    args: Record<string, unknown>;
  }

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

  const getValidOptions = (): TransitionApplyPrismaAdapterInput['options'] => ({
    now: mockNow,
    mode: 'dry-run' as const,
    idempotencyKey: 'idem-001',
    actorId: 'actor-001',
  });

  /**
   * Mock Prisma Client를 생성합니다.
   * 실제 DB 접속은 하지 않으며, updateMany 호출을 callLog에 기록합니다.
   */
  const createMockPrismaClient = (
    callLog: MockCallLog[],
    options?: {
      jobUpdateCount?: number;
      itemUpdateCount?: number;
      throwOnTransaction?: boolean;
    }
  ): PrismaLikeClient => {
    const jobCount = options?.jobUpdateCount ?? 1;
    const itemCount = options?.itemUpdateCount ?? 1;

    const createTxClient = (): PrismaLikeTxClient => ({
      naverApiBatchJob: {
        updateMany: async (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
          callLog.push({ method: 'naverApiBatchJob.updateMany', args });
          return { count: jobCount };
        },
      },
      naverApiBatchJobItem: {
        updateMany: async (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
          callLog.push({ method: 'naverApiBatchJobItem.updateMany', args });
          return { count: itemCount };
        },
      },
    });

    return {
      ...createTxClient(),
      $transaction: async <T>(callback: (tx: PrismaLikeTxClient) => Promise<T>): Promise<T> => {
        if (options?.throwOnTransaction) {
          throw new Error('Mock DB connection lost');
        }
        callLog.push({ method: '$transaction', args: {} });
        const tx = createTxClient();
        return callback(tx);
      },
    };
  };

  // ── tests ──

  it('1. adapter 생성 시 PrismaClient를 직접 new 하지 않음 (팩토리는 주입받은 객체만 사용)', () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    assert.ok(port);
    assert.ok(typeof port.transaction === 'function');
    // 생성만으로는 DB 호출 없음
    assert.strictEqual(callLog.length, 0);
  });

  it('2. transaction 호출이 주입받은 $transaction으로 위임됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, true);
    assert.ok(callLog.some(c => c.method === '$transaction'));
  });

  it('3. BatchJob update가 id + fromStatus 조건으로 구성됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    const jobUpdate = callLog.find(c => c.method === 'naverApiBatchJob.updateMany');
    assert.ok(jobUpdate);
    const where = jobUpdate.args.where as Record<string, unknown>;
    assert.strictEqual(where.id, 'job-001');
    assert.strictEqual(where.status, 'APPROVED');
  });

  it('4. BatchJob update의 toStatus가 EXECUTING으로 구성됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    const jobUpdate = callLog.find(c => c.method === 'naverApiBatchJob.updateMany');
    assert.ok(jobUpdate);
    const data = jobUpdate.args.data as Record<string, unknown>;
    assert.strictEqual(data.status, 'EXECUTING');
  });

  it('5. BatchJobItem update가 id + fromStatus 조건으로 구성됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    const itemUpdates = callLog.filter(c => c.method === 'naverApiBatchJobItem.updateMany');
    assert.strictEqual(itemUpdates.length, 2);
    const firstWhere = itemUpdates[0].args.where as Record<string, unknown>;
    assert.strictEqual(firstWhere.id, 'item-001');
    assert.strictEqual(firstWhere.status, 'READY');
  });

  it('6. BatchJobItem update의 toStatus가 EXECUTING으로 구성됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    const itemUpdates = callLog.filter(c => c.method === 'naverApiBatchJobItem.updateMany');
    for (const u of itemUpdates) {
      const data = u.args.data as Record<string, unknown>;
      assert.strictEqual(data.status, 'EXECUTING');
    }
  });

  it('7. affected count 1이면 성공으로 처리', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog, { jobUpdateCount: 1, itemUpdateCount: 1 });
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.applied, true);
    assert.deepStrictEqual(result.updatedBatchJobIds, ['job-001']);
    assert.deepStrictEqual(result.updatedBatchJobItemIds, ['item-001', 'item-002']);
  });

  it('8. affected count 0이면 실패로 처리 (0 rows → throw → TRANSACTION_FAILED)', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog, { jobUpdateCount: 0 });
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('TRANSACTION_FAILED'));
    assert.strictEqual(result.dbWriteAttempted, true);
  });

  it('9. FinalApproval write는 지원하지 않음 (UPDATE_STATUS plan이면 차단)', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'NaverApiBatchFinalApproval', targetId: 'fa-001', fromStatus: 'ACTIVE', toStatus: 'EXECUTING', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan,
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_WRITE_BLOCKED'));
  });

  it('10. FinalApprovalItem write는 지원하지 않음', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'NaverApiBatchFinalApprovalItem' as 'NaverApiBatchFinalApproval', targetId: 'fai-001', fromStatus: 'X', toStatus: 'Y', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan,
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, false);
    assert.ok(
      result.reasonCodes.includes('FINAL_APPROVAL_ITEM_WRITE_BLOCKED') ||
      result.reasonCodes.includes('UNSUPPORTED_TARGET_TABLE')
    );
  });

  it('11. unsupported targetTable은 지원하지 않음', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const plan = getValidPlan();
    plan.planItems = [
      { targetTable: 'UnknownTable' as 'NaverApiBatchJob', targetId: 'u-001', fromStatus: 'A', toStatus: 'B', operation: 'UPDATE_STATUS' },
    ];
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan,
      adapter: port,
      options: getValidOptions(),
    });
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('UNSUPPORTED_TARGET_TABLE'));
  });

  it('12. live mode는 차단됨', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    const result = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: { ...getValidOptions(), mode: 'live' },
    });
    assert.strictEqual(result.success, false);
    assert.ok(result.reasonCodes.includes('LIVE_ADAPTER_BLOCKED'));
    // DB 호출이 없어야 함
    assert.strictEqual(callLog.length, 0);
  });

  it('13. 실제 DB 접속 없이 mock만 사용됨 (소스에 @prisma/client import 없음)', async () => {
    const fs = await import('node:fs');
    const source = fs.readFileSync(
      'src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.service.ts',
      'utf-8'
    );
    assert.ok(!source.includes("from '@prisma/client'"));
    assert.ok(!source.includes("from 'prisma'"));
    assert.ok(!source.includes('/generated/prisma'));
    assert.ok(!source.includes('new PrismaClient'));
    assert.ok(!source.includes('DATABASE_URL'));
    assert.ok(!source.includes('.env'));
  });

  it('14. 실제 DB write가 실행되지 않음 (mock updateMany만 호출)', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: getValidPlan(),
      adapter: port,
      options: getValidOptions(),
    });
    // updateMany 호출은 mock 구현이며 실제 DB에 닿지 않음
    const updateCalls = callLog.filter(c => c.method.includes('updateMany'));
    assert.ok(updateCalls.length > 0);
    // $transaction 호출도 mock
    const txCalls = callLog.filter(c => c.method === '$transaction');
    assert.strictEqual(txCalls.length, 1);
  });

  it('15. 입력 객체 mutation 없음', async () => {
    const callLog: MockCallLog[] = [];
    const plan = getValidPlan();
    const options = getValidOptions();
    const planSnapshot = JSON.stringify(plan);
    const optionsSnapshot = JSON.stringify(options);
    const mockPrisma = createMockPrismaClient(callLog);
    const port = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(mockPrisma);
    await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan,
      adapter: port,
      options,
    });
    assert.strictEqual(JSON.stringify(plan), planSnapshot);
    assert.strictEqual(JSON.stringify(options), optionsSnapshot);
  });
});
