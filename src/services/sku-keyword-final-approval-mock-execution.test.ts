import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runFinalApprovalMockExecution } from './sku-keyword-final-approval-mock-execution.service';
import type { FinalApprovalExecutionPlan } from '../types/sku-keyword-final-approval-execution-plan.types';

describe('runFinalApprovalMockExecution', () => {
  const createMockPlan = (itemCount: number): FinalApprovalExecutionPlan => {
    return {
      jobId: 'job-1',
      finalApprovalId: 'fa-1',
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
        proposedActionCounts: {},
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

  it('1. 정상 plan이면 success true', () => {
    const plan = createMockPlan(2);
    const result = runFinalApprovalMockExecution(plan);
    
    assert.equal(result.success, true);
    assert.equal(result.mode, 'MOCK');
    assert.equal(result.totalItems, 2);
    assert.equal(result.successItems, 2);
    assert.equal(result.failedItems, 0);
    assert.equal(result.itemResults.length, 2);
    assert.equal(result.itemResults[0].status, 'SUCCESS');
  });

  it('2. item이 없으면 success false (또는 skipped 처리)', () => {
    const plan = createMockPlan(0);
    const result = runFinalApprovalMockExecution(plan);
    
    assert.equal(result.success, false);
    assert.equal(result.totalItems, 0);
    assert.equal(result.errors.length, 1);
    assert.equal(result.errors[0], 'No items to execute in the plan.');
  });

  it('3. mock failure option을 주면 일부 실패 결과 반환', () => {
    const plan = createMockPlan(3);
    const failId = plan.items[1].jobItemId;
    
    const result = runFinalApprovalMockExecution(plan, { failItemIds: [failId] });
    
    assert.equal(result.success, false);
    assert.equal(result.totalItems, 3);
    assert.equal(result.successItems, 2);
    assert.equal(result.failedItems, 1);
    
    const failedResult = result.itemResults.find(r => r.jobItemId === failId);
    assert.ok(failedResult);
    assert.equal(failedResult.status, 'FAILED');
    assert.equal(failedResult.providerResponseCode, 'MOCK_ERROR_ID');
  });

  it('4. 입력 plan을 mutation하지 않음', () => {
    const plan = createMockPlan(1);
    const originalJson = JSON.stringify(plan);
    
    runFinalApprovalMockExecution(plan);
    
    assert.equal(JSON.stringify(plan), originalJson);
  });
});
