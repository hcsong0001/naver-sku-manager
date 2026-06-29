import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView,
  ReadOnlyChainSummaryInput,
  NEXT_TASK_310_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-summary-dashboard-view.service';

function makeItem(
  taskId: number,
  overrides: Partial<Pick<ReadOnlyChainSummaryInput, 'isReady' | 'isPartialReady' | 'isBlocked' | 'isLocked'>>,
): ReadOnlyChainSummaryInput {
  return {
    taskId,
    taskLabel: `Task ${taskId} Label`,
    isReady: false,
    isPartialReady: false,
    isBlocked: false,
    isLocked: false,
    ...overrides,
  };
}

const TASK_IDS = [296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308] as const;

function make13Ready(): ReadOnlyChainSummaryInput[] {
  return TASK_IDS.map((id) => makeItem(id, { isReady: true }));
}

describe('buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView', () => {
  describe('summaryDashboardStatus derivation', () => {
    it('should return READY when all items are ready', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.summaryDashboardStatus, 'READY');
    });

    it('should return PARTIAL_READY when one item is partial and none blocked', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isPartialReady: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.summaryDashboardStatus, 'PARTIAL_READY');
    });

    it('should return BLOCKED when one item is blocked', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isBlocked: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.summaryDashboardStatus, 'BLOCKED');
    });

    it('should return BLOCKED even when partial items also exist', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isBlocked: true });
      items[1] = makeItem(297, { isPartialReady: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.summaryDashboardStatus, 'BLOCKED');
    });
  });

  describe('overall flags', () => {
    it('should set overallReady true and others false when all ready', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.overallReady, true);
      assert.equal(result.overallPartialReady, false);
      assert.equal(result.overallBlocked, false);
    });

    it('should set overallPartialReady true and others false when partial', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isPartialReady: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.overallReady, false);
      assert.equal(result.overallPartialReady, true);
      assert.equal(result.overallBlocked, false);
    });

    it('should set overallBlocked true and others false when blocked', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isBlocked: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.overallReady, false);
      assert.equal(result.overallPartialReady, false);
      assert.equal(result.overallBlocked, true);
    });
  });

  describe('counts', () => {
    it('should count readyCount correctly', () => {
      const items = [
        makeItem(296, { isReady: true }),
        makeItem(297, { isReady: true }),
        makeItem(298, { isPartialReady: true }),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readyCount, 2);
    });

    it('should count partialReadyCount correctly', () => {
      const items = [
        makeItem(296, { isReady: true }),
        makeItem(297, { isPartialReady: true }),
        makeItem(298, { isPartialReady: true }),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.partialReadyCount, 2);
    });

    it('should count blockedCount correctly', () => {
      const items = [
        makeItem(296, { isBlocked: true }),
        makeItem(297, { isReady: true }),
        makeItem(298, { isBlocked: true }),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.blockedCount, 2);
    });

    it('should count lockedCount correctly', () => {
      const items = [
        makeItem(296, { isLocked: true }),
        makeItem(297, { isReady: true }),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.lockedCount, 1);
    });

    it('should set totalItemCount to chainItems length', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.totalItemCount, 13);
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 309', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.taskId, 309);
    });

    it('should set currentTaskNumber to 309', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.currentTaskNumber, 309);
    });

    it('should set status to NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SUMMARY_DASHBOARD', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.status, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SUMMARY_DASHBOARD');
    });

    it('should set isBatchJobResultDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.isBatchJobResultDisplayOnly, true);
    });

    it('should set referenceTaskNumbers with 13 entries starting from 308', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.referenceTaskNumbers.length, 13);
      assert.equal(result.referenceTaskNumbers[0], 308);
      assert.equal(result.referenceTaskNumbers[12], 296);
    });
  });

  describe('approval fields', () => {
    it('should set requiresSeparateTask310Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.requiresSeparateTask310Approval, true);
    });

    it('should set nextTaskApprovalPhrase to NEXT_TASK_310_APPROVAL_PHRASE', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_310_APPROVAL_PHRASE);
    });
  });

  describe('safety flags', () => {
    it('should set all execution safety flags to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.isReadOnlyExecutionApprovalGrantedInThisTask, false);
      assert.equal(result.isExecutionApprovalGranted, false);
      assert.equal(result.isExecutionExecutedInThisTask, false);
      assert.equal(result.isProductChangeApprovalGranted, false);
    });

    it('should set all UI safety flags to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.isExecutionButtonAddedInThisTask, false);
      assert.equal(result.hasExecutionButton, false);
      assert.equal(result.hasSubmitAction, false);
      assert.equal(result.hasWorkerTrigger, false);
      assert.equal(result.hasQueueTrigger, false);
    });
  });

  describe('readOnlyChainItems', () => {
    it('should produce same number of chain items as input', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.readOnlyChainItems.length, 13);
    });

    it('should map READY input to READY chain item status', () => {
      const items = [makeItem(296, { isReady: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].status, 'READY');
    });

    it('should map PARTIAL_READY input to PARTIAL_READY chain item status', () => {
      const items = [makeItem(296, { isPartialReady: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].status, 'PARTIAL_READY');
    });

    it('should map BLOCKED input to BLOCKED chain item status', () => {
      const items = [makeItem(296, { isBlocked: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].status, 'BLOCKED');
    });

    it('should map LOCKED input to LOCKED chain item status', () => {
      const items = [makeItem(296, { isLocked: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].status, 'LOCKED');
    });

    it('should prefer LOCKED over BLOCKED in chain item status', () => {
      const items = [makeItem(296, { isLocked: true, isBlocked: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].status, 'LOCKED');
    });

    it('should preserve taskId and taskLabel in chain items', () => {
      const items = [makeItem(305, { isReady: true })];
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      assert.equal(result.readOnlyChainItems[0].taskId, 305);
      assert.equal(result.readOnlyChainItems[0].taskLabel, 'Task 305 Label');
    });
  });

  describe('summaryCards', () => {
    it('should produce exactly 4 summary cards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      assert.equal(result.summaryCards.length, 4);
    });

    it('should have READY card count matching readyCount', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
        chainItems: make13Ready(),
      });
      const readyCard = result.summaryCards.find((c) => c.cardType === 'READY');
      assert.ok(readyCard);
      assert.equal(readyCard.count, result.readyCount);
    });

    it('should have PARTIAL_READY card count matching partialReadyCount', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isPartialReady: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      const card = result.summaryCards.find((c) => c.cardType === 'PARTIAL_READY');
      assert.ok(card);
      assert.equal(card.count, result.partialReadyCount);
    });

    it('should have BLOCKED card count matching blockedCount', () => {
      const items = make13Ready();
      items[0] = makeItem(296, { isBlocked: true });
      const result = buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({ chainItems: items });
      const card = result.summaryCards.find((c) => c.cardType === 'BLOCKED');
      assert.ok(card);
      assert.equal(card.count, result.blockedCount);
    });
  });
});
