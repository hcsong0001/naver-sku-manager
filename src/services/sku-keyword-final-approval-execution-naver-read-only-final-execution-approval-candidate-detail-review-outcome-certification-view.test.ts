import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView,
  NEXT_TASK_313_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';

const SAFE_FIELDS = ['sku', 'productName', 'calculationType', 'targetType', 'riskLevel', 'warningCount', 'errorCount'];
const EXCL_FIELDS = ['priceStockRawValues', 'executionPayload', 'requestPayload', 'rawApiResponse', 'token', 'auth', 'signature', 'authorization', 'envValues'];

function makeDetailItem(id: number, status: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED' = 'READY') {
  return {
    candidateId: `cid-${id}`,
    displayOrder: id,
    displayName: `상품 ${id}`,
    skuDisplayLabel: `SKU-${id}`,
    naverProductDisplayLabel: `Naver 상품 ${id}`,
    storeDisplayLabel: `스토어-${id}`,
    sourceCandidateStatus: status as 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED',
    detailReviewStatus: status as 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED',
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isLocked: status === 'LOCKED',
    warningCount: status === 'PARTIAL_READY' ? 1 : 0,
    errorCount: status === 'BLOCKED' ? 1 : 0,
    reviewMessage: '검토 메시지',
    safeDisplayFields: SAFE_FIELDS as readonly string[],
    excludedFields: EXCL_FIELDS as readonly string[],
    priceStockRawValuesExcluded: true as const,
    executionPayloadExcluded: true as const,
    rawApiResponseExcluded: true as const,
    tokenOrAuthExcluded: true as const,
    isDisplayOnly: true as const,
  };
}

function makeDetailReview(
  status: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus,
  itemStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED'> = ['READY'],
) {
  const items = itemStatuses.map((s, i) => makeDetailItem(i + 1, s));
  return {
    candidateDetailReviewStatus: status,
    candidateDetailItems: items,
    readyDetailCount: items.filter((i) => i.isReady).length,
    partialReadyDetailCount: items.filter((i) => i.isPartialReady).length,
    blockedDetailCount: items.filter((i) => i.isBlocked).length,
    lockedDetailCount: items.filter((i) => i.isLocked).length,
    totalDetailCount: items.length,
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView', () => {
  describe('1. 상태 매핑 - READY → CERTIFIED_READY', () => {
    it('should map DETAIL_REVIEW_READY to OUTCOME_CERTIFIED_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
        ),
      });
      assert.equal(
        result.candidateDetailReviewOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
      );
    });
  });

  describe('2. 상태 매핑 - PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
    it('should map DETAIL_REVIEW_PARTIAL_READY to OUTCOME_CERTIFIED_PARTIAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
          ['PARTIAL_READY'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      );
    });
  });

  describe('3. 상태 매핑 - BLOCKED → OUTCOME_BLOCKED', () => {
    it('should map DETAIL_REVIEW_BLOCKED to OUTCOME_BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED',
          ['BLOCKED'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
      );
    });
  });

  describe('4. 상태 매핑 - EMPTY → OUTCOME_EMPTY', () => {
    it('should map DETAIL_REVIEW_EMPTY to OUTCOME_EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY',
          [],
        ),
      });
      assert.equal(
        result.candidateDetailReviewOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY',
      );
    });
  });

  describe('5. 카운트 계산', () => {
    it('should compute certifiedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY', 'READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.certifiedDetailCount, 2);
    });

    it('should compute partialCertifiedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
          ['PARTIAL_READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.partialCertifiedDetailCount, 2);
    });

    it('should compute blockedCertifiedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED',
          ['BLOCKED', 'READY'],
        ),
      });
      assert.equal(result.blockedCertifiedDetailCount, 1);
    });

    it('should compute lockedCertifiedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['LOCKED', 'READY'],
        ),
      });
      assert.equal(result.lockedCertifiedDetailCount, 1);
    });

    it('should compute totalCertifiedDetailCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY', 'PARTIAL_READY', 'BLOCKED'],
        ),
      });
      assert.equal(result.totalCertifiedDetailCount, 3);
    });
  });

  describe('6. certificationItems 구조', () => {
    it('should produce certificationItems with same count as input', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.certificationItems.length, 2);
    });

    it('should preserve candidateId from source item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].candidateId, 'cid-1');
    });
  });

  describe('7. safeDisplayFieldsCertified true', () => {
    it('should set safeDisplayFieldsCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
        ),
      });
      assert.equal(result.safeDisplayFieldsCertified, true);
    });
  });

  describe('8. excludedFieldsCertified true', () => {
    it('should set excludedFieldsCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
        ),
      });
      assert.equal(result.excludedFieldsCertified, true);
    });
  });

  describe('9. priceStockRawValuesExcluded true', () => {
    it('should set priceStockRawValuesExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].priceStockRawValuesExcluded, true);
    });
  });

  describe('10. executionPayloadExcluded true', () => {
    it('should set executionPayloadExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].executionPayloadExcluded, true);
    });
  });

  describe('11. rawApiResponseExcluded true', () => {
    it('should set rawApiResponseExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].rawApiResponseExcluded, true);
    });
  });

  describe('12. tokenOrAuthExcluded true', () => {
    it('should set tokenOrAuthExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].tokenOrAuthExcluded, true);
    });
  });

  describe('13. isDisplayOnly true', () => {
    it('should set isDisplayOnly to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.certificationItems[0].isDisplayOnly, true);
    });
  });

  describe('14. isReadOnlyOutcomeCertification true', () => {
    it('should set isReadOnlyOutcomeCertification to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
        ),
      });
      assert.equal(result.isReadOnlyOutcomeCertification, true);
    });
  });

  describe('15~29. 안전 플래그', () => {
    it('should set actualFinalExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.actualFinalExecutionApprovalGranted, false);
    });

    it('should set actualExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.actualExecutionApprovalGranted, false);
    });

    it('should set actualExecutionStarted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.actualExecutionStarted, false);
    });

    it('should set executionButtonAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.executionButtonAdded, false);
    });

    it('should set candidateSelectionSubmitAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.candidateSelectionSubmitAdded, false);
    });

    it('should set submitActionAdded and postApiAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.submitActionAdded, false);
      assert.equal(result.postApiAdded, false);
    });

    it('should set naverApiCalled and productLookupApiRecalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.naverApiCalled, false);
      assert.equal(result.productLookupApiRecalled, false);
    });

    it('should set productUpdateApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.productUpdateApiCalled, false);
    });

    it('should set priceChanged and stockChanged to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.priceChanged, false);
      assert.equal(result.stockChanged, false);
    });

    it('should set dbWritePerformed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.dbWritePerformed, false);
    });

    it('should set workerStarted, queueEnqueued, adapterConnected to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.workerStarted, false);
      assert.equal(result.queueEnqueued, false);
      assert.equal(result.adapterConnected, false);
    });

    it('should set tokenOrAuthValueExposed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.tokenOrAuthValueExposed, false);
    });

    it('should set rawApiResponseExposedOrStored to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.rawApiResponseExposedOrStored, false);
    });

    it('should set envFileReadOrModified to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.envFileReadOrModified, false);
    });
  });

  describe('30. Task 313 승인 문구', () => {
    it('should include NEXT_TASK_313_APPROVAL_PHRASE as nextTaskApprovalPhrase', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_313_APPROVAL_PHRASE);
    });

    it('should set requiresSeparateTask313Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.requiresSeparateTask313Approval, true);
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 312', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.taskId, 312);
    });

    it('should set currentTaskNumber to 312', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.currentTaskNumber, 312);
    });

    it('should set isBatchJobResultDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.isBatchJobResultDisplayOnly, true);
    });

    it('should produce 4 outcomeSummaryCards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
          ['READY'],
        ),
      });
      assert.equal(result.outcomeSummaryCards.length, 4);
    });

    it('should set outcomeCertifiedReady true when READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'),
      });
      assert.equal(result.outcomeCertifiedReady, true);
      assert.equal(result.outcomeCertifiedPartialReady, false);
      assert.equal(result.outcomeCertificationBlocked, false);
      assert.equal(result.outcomeCertificationEmpty, false);
    });

    it('should set outcomeCertificationEmpty true when EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationView({
        candidateDetailReview: makeDetailReview(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY',
          [],
        ),
      });
      assert.equal(result.outcomeCertificationEmpty, true);
    });
  });
});
