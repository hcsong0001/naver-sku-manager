import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateListView,
  BatchJobItemForCandidateList,
  NEXT_TASK_311_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';
import { NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-summary-dashboard-view.service';

function makeItem(id: number, overrides: Partial<BatchJobItemForCandidateList> = {}): BatchJobItemForCandidateList {
  return {
    id,
    status: 'PENDING',
    candidateSummary: {
      sku: `SKU-${id}`,
      productName: `상품 ${id}`,
    },
    ...overrides,
  };
}

function makeDashboard(status: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus) {
  return { summaryDashboardStatus: status };
}

const THREE_ITEMS = [makeItem(1), makeItem(2), makeItem(3)];

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateListView', () => {
  describe('candidateListStatus derivation', () => {
    it('should return READY when summaryDashboardStatus is READY and items exist', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY');
    });

    it('should return PARTIAL_READY when summaryDashboardStatus is PARTIAL_READY and items exist', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('PARTIAL_READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY');
    });

    it('should return BLOCKED when summaryDashboardStatus is BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('BLOCKED'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED');
    });

    it('should return EMPTY when items array is empty', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.candidateListStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY');
    });

    it('should return EMPTY when PARTIAL_READY but items empty', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('PARTIAL_READY'),
        items: [],
      });
      assert.equal(result.candidateListStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY');
    });
  });

  describe('candidateList flag derivation', () => {
    it('should set candidateListReady true when status READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListReady, true);
      assert.equal(result.candidateListPartialReady, false);
      assert.equal(result.candidateListBlocked, false);
      assert.equal(result.candidateListEmpty, false);
    });

    it('should set candidateListPartialReady true when status PARTIAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('PARTIAL_READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListReady, false);
      assert.equal(result.candidateListPartialReady, true);
      assert.equal(result.candidateListBlocked, false);
    });

    it('should set candidateListBlocked true when status BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('BLOCKED'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateListBlocked, true);
    });

    it('should set candidateListEmpty true when items empty', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.candidateListEmpty, true);
    });
  });

  describe('candidate counts', () => {
    it('should compute totalCandidateCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.totalCandidateCount, 3);
    });

    it('should compute readyCandidateCount correctly', () => {
      const items = [
        makeItem(1),
        makeItem(2, { dryRunSummary: { warnings: ['warn'] } }),
        makeItem(3),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items,
      });
      assert.equal(result.readyCandidateCount, 2);
    });

    it('should compute partialReadyCandidateCount correctly', () => {
      const items = [
        makeItem(1, { dryRunSummary: { warnings: ['warn'] } }),
        makeItem(2),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items,
      });
      assert.equal(result.partialReadyCandidateCount, 1);
    });

    it('should compute blockedCandidateCount correctly', () => {
      const items = [
        makeItem(1, { dryRunSummary: { blockedReasons: ['reason1'] } }),
        makeItem(2),
      ];
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items,
      });
      assert.equal(result.blockedCandidateCount, 1);
    });

    it('should set totalCandidateCount to 0 when empty', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.totalCandidateCount, 0);
    });
  });

  describe('candidateItems structure', () => {
    it('should produce same number of candidateItems as input items', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateItems.length, 3);
    });

    it('should set priceStockRawValuesExcluded to true on each candidateItem', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [makeItem(1)],
      });
      assert.equal(result.candidateItems[0].priceStockRawValuesExcluded, true);
    });

    it('should set executionPayloadExcluded to true on each candidateItem', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [makeItem(1)],
      });
      assert.equal(result.candidateItems[0].executionPayloadExcluded, true);
    });

    it('should set rawApiResponseExcluded to true on each candidateItem', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [makeItem(1)],
      });
      assert.equal(result.candidateItems[0].rawApiResponseExcluded, true);
    });

    it('should set isDisplayOnly to true on each candidateItem', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [makeItem(1)],
      });
      assert.equal(result.candidateItems[0].isDisplayOnly, true);
    });

    it('should assign displayOrder starting from 1', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateItems[0].displayOrder, 1);
      assert.equal(result.candidateItems[2].displayOrder, 3);
    });

    it('should set all candidateItems to BLOCKED when dashboard is BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('BLOCKED'),
        items: THREE_ITEMS,
      });
      assert.ok(result.candidateItems.every((i) => i.candidateStatus === 'BLOCKED'));
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 310', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.taskId, 310);
    });

    it('should set currentTaskNumber to 310', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.currentTaskNumber, 310);
    });

    it('should set status to NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_VIEW', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.status, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_VIEW');
    });

    it('should set isBatchJobResultDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.isBatchJobResultDisplayOnly, true);
    });

    it('should set isReadOnlyCandidateList to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.isReadOnlyCandidateList, true);
    });

    it('should set requiresSeparateTask311Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.requiresSeparateTask311Approval, true);
    });

    it('should set nextTaskApprovalPhrase to NEXT_TASK_311_APPROVAL_PHRASE', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_311_APPROVAL_PHRASE);
    });
  });

  describe('safety flags - execution and approval', () => {
    it('should set actualFinalExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.actualFinalExecutionApprovalGranted, false);
    });

    it('should set actualExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.actualExecutionApprovalGranted, false);
    });

    it('should set actualExecutionStarted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.actualExecutionStarted, false);
    });

    it('should set executionButtonAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.executionButtonAdded, false);
    });

    it('should set submitActionAdded and postApiAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.submitActionAdded, false);
      assert.equal(result.postApiAdded, false);
    });
  });

  describe('safety flags - API and data', () => {
    it('should set naverApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.naverApiCalled, false);
    });

    it('should set productLookupApiRecalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.productLookupApiRecalled, false);
    });

    it('should set productUpdateApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.productUpdateApiCalled, false);
    });

    it('should set priceChanged and stockChanged to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.priceChanged, false);
      assert.equal(result.stockChanged, false);
    });

    it('should set dbWritePerformed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.dbWritePerformed, false);
    });

    it('should set workerStarted, queueEnqueued, adapterConnected to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.workerStarted, false);
      assert.equal(result.queueEnqueued, false);
      assert.equal(result.adapterConnected, false);
    });

    it('should set tokenOrAuthValueExposed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.tokenOrAuthValueExposed, false);
    });

    it('should set rawApiResponseExposedOrStored to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.rawApiResponseExposedOrStored, false);
    });

    it('should set envFileReadOrModified to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: [],
      });
      assert.equal(result.envFileReadOrModified, false);
    });
  });

  describe('candidateSummaryCards', () => {
    it('should produce exactly 4 candidateSummaryCards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      assert.equal(result.candidateSummaryCards.length, 4);
    });

    it('should have READY card count matching readyCandidateCount', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items: THREE_ITEMS,
      });
      const card = result.candidateSummaryCards.find((c) => c.cardType === 'READY');
      assert.ok(card);
      assert.equal(card.count, result.readyCandidateCount);
    });

    it('should have BLOCKED card count matching blockedCandidateCount', () => {
      const items = [makeItem(1, { dryRunSummary: { blockedReasons: ['r'] } }), makeItem(2)];
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
        summaryDashboard: makeDashboard('READY'),
        items,
      });
      const card = result.candidateSummaryCards.find((c) => c.cardType === 'BLOCKED');
      assert.ok(card);
      assert.equal(card.count, result.blockedCandidateCount);
    });
  });
});
