import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildFinalApprovalWorkerExecutionContext } from './sku-keyword-final-approval-worker-execution-context.service';
import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';
import type { FinalApprovalExecutionPlan } from '../types/sku-keyword-final-approval-execution-plan.types';

describe('buildFinalApprovalWorkerExecutionContext', () => {
  const baseCommand: FinalApprovalExecutionEnqueueCommand = {
    finalApprovalId: 'fa-123',
    actorId: 'user-456',
    idempotencyKey: 'idem-key-abc',
    requestedAt: '2026-01-01T00:00:00Z',
    source: 'EXECUTION_API',
    mode: 'DRY_RUN_READY'
  };

  const createMockPlan = (itemCount: number): FinalApprovalExecutionPlan => {
    return {
      jobId: 'job-1',
      finalApprovalId: 'fa-123',
      finalApprovalVersion: 1,
      adapterMode: 'DRY_RUN',
      payloadHash: 'hash',
      validationSnapshotHash: 'snap-hash',
      validationExpiresAt: new Date().toISOString(),
      generatedAt: new Date().toISOString(),
      itemCount,
      items: Array.from({ length: itemCount }).map((_, i) => ({
        jobItemId: `ji-${i}`,
        finalApprovalItemId: `fai-${i}`,
        productId: `p-${i}`,
        storeId: 's-1',
        skuId: `sku-${i}`,
        proposedAction: 'UPDATE_KEYWORDS',
        candidateSummary: {},
        dryRunSummary: {},
        beforeSummary: {},
        afterSummary: {},
        naverApiPayloadCandidate: {}
      })),
      summary: {
        totalItems: itemCount,
        transformableItems: itemCount,
        blockedItems: 0,
        proposedActionCounts: { UPDATE_KEYWORDS: itemCount },
        affectedProductCount: itemCount,
        hasBlockingFailure: false
      },
      validation: {
        jobStatusValid: true,
        itemStatusesValid: true,
        activeFinalApprovalValid: true,
        validationNotExpired: true,
        payloadHashMatched: true,
        validationSnapshotHashMatched: true,
        itemOwnershipValid: true,
        itemCountMatched: true,
        generatedFromServerStateAt: new Date().toISOString()
      }
    };
  };

  it('1. 정상 enqueue command와 plan으로 context 생성', () => {
    const plan = createMockPlan(3);
    const context = buildFinalApprovalWorkerExecutionContext(baseCommand, plan);

    assert.equal(context.finalApprovalId, 'fa-123');
    assert.equal(context.actorId, 'user-456');
    assert.equal(context.mode, 'DRY_RUN_READY');
    assert.equal(context.totalItems, 3);
    assert.deepEqual(context.targetOperations, ['UPDATE_KEYWORDS']);
    assert.equal(context.planSummary.totalItems, 3);
    assert.equal(context.safetyFlags.isDryRunMode, true);
    assert.equal(context.safetyFlags.requiresStrictAck, true);
  });

  it('2. 빈 plan item 처리 정책 검증', () => {
    const plan = createMockPlan(0);
    const context = buildFinalApprovalWorkerExecutionContext(baseCommand, plan);

    assert.equal(context.totalItems, 0);
    assert.deepEqual(context.targetOperations, []);
    assert.equal(context.planSummary.totalItems, 0);
  });

  it('3. 입력 command/plan을 mutation하지 않음', () => {
    const plan = createMockPlan(2);
    const originalCommandJson = JSON.stringify(baseCommand);
    const originalPlanJson = JSON.stringify(plan);
    
    buildFinalApprovalWorkerExecutionContext(baseCommand, plan);
    
    assert.equal(JSON.stringify(baseCommand), originalCommandJson);
    assert.equal(JSON.stringify(plan), originalPlanJson);
  });

  it('4. output이 plain object인지 확인', () => {
    const plan = createMockPlan(1);
    const context = buildFinalApprovalWorkerExecutionContext(baseCommand, plan);
    
    assert.equal(Object.getPrototypeOf(context), Object.prototype);
    assert.deepEqual(Object.keys(context).sort(), [
      'actorId',
      'finalApprovalId',
      'idempotencyKey',
      'mode',
      'planSummary',
      'requestedAt',
      'safetyFlags',
      'source',
      'targetOperations',
      'totalItems'
    ]);
  });
});
