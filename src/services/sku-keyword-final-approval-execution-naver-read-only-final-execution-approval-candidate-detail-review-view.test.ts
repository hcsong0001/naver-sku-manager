import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView,
  NEXT_TASK_312_APPROVAL_PHRASE,
  SAFE_DISPLAY_FIELDS,
  EXCLUDED_FIELDS,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateListStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';

function makeCandidateItem(id: number, status: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED' = 'READY') {
  return {
    candidateId: `cid-${id}`,
    displayOrder: id,
    displayName: `상품 ${id}`,
    skuDisplayLabel: `SKU-${id}`,
    naverProductDisplayLabel: `Naver 상품 ${id}`,
    storeDisplayLabel: `스토어-${id}`,
    sourceItemStatus: 'PENDING',
    candidateStatus: status as 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED',
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isLocked: status === 'LOCKED',
    warningCount: status === 'PARTIAL_READY' ? 1 : 0,
    errorCount: status === 'BLOCKED' ? 1 : 0,
    message: '메시지',
    priceStockRawValuesExcluded: true as const,
    executionPayloadExcluded: true as const,
    rawApiResponseExcluded: true as const,
    isDisplayOnly: true as const,
  };
}

function makeCandidateList(
  status: NaverReadOnlyFinalExecutionApprovalCandidateListStatus,
  itemStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED'> = ['READY'],
) {
  const items = itemStatuses.map((s, i) => makeCandidateItem(i + 1, s));
  return {
    candidateListStatus: status,
    candidateItems: items,
    readyCandidateCount: items.filter((i) => i.isReady).length,
    partialReadyCandidateCount: items.filter((i) => i.isPartialReady).length,
    blockedCandidateCount: items.filter((i) => i.isBlocked).length,
    lockedCandidateCount: items.filter((i) => i.isLocked).length,
    totalCandidateCount: items.length,
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView', () => {
  describe('candidateDetailReviewStatus mapping', () => {
    it('should return READY when candidateListStatus is CANDIDATE_LIST_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(
        result.candidateDetailReviewStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
      );
    });

    it('should return PARTIAL_READY when candidateListStatus is CANDIDATE_LIST_PARTIAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY', ['PARTIAL_READY']),
      });
      assert.equal(
        result.candidateDetailReviewStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
      );
    });

    it('should return BLOCKED when candidateListStatus is CANDIDATE_LIST_BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED', ['BLOCKED']),
      });
      assert.equal(
        result.candidateDetailReviewStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED',
      );
    });

    it('should return EMPTY when candidateListStatus is CANDIDATE_LIST_EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY', []),
      });
      assert.equal(
        result.candidateDetailReviewStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY',
      );
    });
  });

  describe('detail review flags', () => {
    it('should set candidateDetailReviewReady true when READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.candidateDetailReviewReady, true);
      assert.equal(result.candidateDetailReviewPartialReady, false);
      assert.equal(result.candidateDetailReviewBlocked, false);
      assert.equal(result.candidateDetailReviewEmpty, false);
    });

    it('should set candidateDetailReviewEmpty true when EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY', []),
      });
      assert.equal(result.candidateDetailReviewEmpty, true);
    });
  });

  describe('detail counts', () => {
    it('should compute readyDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY', 'READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.readyDetailCount, 2);
    });

    it('should compute partialReadyDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY',
          ['PARTIAL_READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.partialReadyDetailCount, 2);
    });

    it('should compute blockedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED',
          ['BLOCKED'],
        ),
      });
      assert.equal(result.blockedDetailCount, 1);
    });

    it('should compute lockedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['LOCKED', 'READY'],
        ),
      });
      assert.equal(result.lockedDetailCount, 1);
    });

    it('should compute totalDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY', 'READY', 'BLOCKED'],
        ),
      });
      assert.equal(result.totalDetailCount, 3);
    });
  });

  describe('candidateDetailItems structure', () => {
    it('should produce same count as input candidateItems', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.candidateDetailItems.length, 2);
    });

    it('should set safeDisplayFields to SAFE_DISPLAY_FIELDS on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.deepEqual(result.candidateDetailItems[0].safeDisplayFields, SAFE_DISPLAY_FIELDS);
    });

    it('should include sku in safeDisplayFields', () => {
      assert.ok(SAFE_DISPLAY_FIELDS.includes('sku'));
    });

    it('should include productName in safeDisplayFields', () => {
      assert.ok(SAFE_DISPLAY_FIELDS.includes('productName'));
    });

    it('should set excludedFields to EXCLUDED_FIELDS on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.deepEqual(result.candidateDetailItems[0].excludedFields, EXCLUDED_FIELDS);
    });

    it('should include priceStockRawValues in excludedFields', () => {
      assert.ok(EXCLUDED_FIELDS.includes('priceStockRawValues'));
    });

    it('should include executionPayload and requestPayload in excludedFields', () => {
      assert.ok(EXCLUDED_FIELDS.includes('executionPayload'));
      assert.ok(EXCLUDED_FIELDS.includes('requestPayload'));
    });

    it('should include rawApiResponse in excludedFields', () => {
      assert.ok(EXCLUDED_FIELDS.includes('rawApiResponse'));
    });

    it('should include token, auth, signature, authorization in excludedFields', () => {
      assert.ok(EXCLUDED_FIELDS.includes('token'));
      assert.ok(EXCLUDED_FIELDS.includes('auth'));
      assert.ok(EXCLUDED_FIELDS.includes('signature'));
      assert.ok(EXCLUDED_FIELDS.includes('authorization'));
    });

    it('should set priceStockRawValuesExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.candidateDetailItems[0].priceStockRawValuesExcluded, true);
    });

    it('should set executionPayloadExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.candidateDetailItems[0].executionPayloadExcluded, true);
    });

    it('should set rawApiResponseExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.candidateDetailItems[0].rawApiResponseExcluded, true);
    });

    it('should set tokenOrAuthExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.candidateDetailItems[0].tokenOrAuthExcluded, true);
    });

    it('should set isDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.candidateDetailItems[0].isDisplayOnly, true);
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 311', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.taskId, 311);
    });

    it('should set currentTaskNumber to 311', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.currentTaskNumber, 311);
    });

    it('should set isBatchJobResultDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.isBatchJobResultDisplayOnly, true);
    });

    it('should set isReadOnlyCandidateDetailReview to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.isReadOnlyCandidateDetailReview, true);
    });

    it('should set requiresSeparateTask312Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.requiresSeparateTask312Approval, true);
    });

    it('should set nextTaskApprovalPhrase to NEXT_TASK_312_APPROVAL_PHRASE', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_312_APPROVAL_PHRASE);
    });
  });

  describe('safety flags - execution', () => {
    it('should set actualFinalExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.actualFinalExecutionApprovalGranted, false);
    });

    it('should set actualExecutionApprovalGranted and actualExecutionStarted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.actualExecutionApprovalGranted, false);
      assert.equal(result.actualExecutionStarted, false);
    });

    it('should set executionButtonAdded and candidateSelectionSubmitAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.executionButtonAdded, false);
      assert.equal(result.candidateSelectionSubmitAdded, false);
    });

    it('should set submitActionAdded and postApiAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.submitActionAdded, false);
      assert.equal(result.postApiAdded, false);
    });
  });

  describe('safety flags - API and infrastructure', () => {
    it('should set naverApiCalled and productLookupApiRecalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.naverApiCalled, false);
      assert.equal(result.productLookupApiRecalled, false);
    });

    it('should set productUpdateApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.productUpdateApiCalled, false);
    });

    it('should set priceChanged and stockChanged to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.priceChanged, false);
      assert.equal(result.stockChanged, false);
    });

    it('should set dbWritePerformed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.dbWritePerformed, false);
    });

    it('should set workerStarted, queueEnqueued, adapterConnected to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.workerStarted, false);
      assert.equal(result.queueEnqueued, false);
      assert.equal(result.adapterConnected, false);
    });

    it('should set tokenOrAuthValueExposed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.tokenOrAuthValueExposed, false);
    });

    it('should set rawApiResponseExposedOrStored to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.rawApiResponseExposedOrStored, false);
    });

    it('should set envFileReadOrModified to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'),
      });
      assert.equal(result.envFileReadOrModified, false);
    });
  });

  describe('detailSummaryCards', () => {
    it('should produce exactly 4 detailSummaryCards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY'],
        ),
      });
      assert.equal(result.detailSummaryCards.length, 4);
    });

    it('should have READY card count matching readyDetailCount', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
        candidateList: makeCandidateList(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
          ['READY', 'READY'],
        ),
      });
      const card = result.detailSummaryCards.find((c) => c.cardType === 'READY');
      assert.ok(card);
      assert.equal(card.count, result.readyDetailCount);
    });
  });
});
