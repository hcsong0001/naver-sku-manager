import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView,
  NEXT_TASK_315_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';

const SAFE_FIELDS = ['sku', 'productName', 'calculationType', 'targetType', 'riskLevel', 'warningCount', 'errorCount'];
const EXCL_FIELDS = ['priceStockRawValues', 'executionPayload', 'requestPayload', 'rawApiResponse', 'token', 'auth', 'signature', 'authorization', 'envValues'];

function makeSealItem(id: number, status: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED' = 'READY') {
  return {
    candidateId: `cid-${id}`,
    displayOrder: id,
    displayName: `상품 ${id}`,
    sourceCertificationStatus: status,
    safetySealStatus: status,
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isLocked: status === 'LOCKED',
    warningCount: status === 'PARTIAL_READY' ? 1 : 0,
    errorCount: status === 'BLOCKED' ? 1 : 0,
    safetySealMessage: '봉인 메시지',
    safeDisplayFields: SAFE_FIELDS as readonly string[],
    excludedFields: EXCL_FIELDS as readonly string[],
    priceStockRawValuesExcluded: true as const,
    executionPayloadExcluded: true as const,
    rawApiResponseExcluded: true as const,
    tokenOrAuthExcluded: true as const,
    actualExecutionBlocked: true as const,
    mutationBlocked: true as const,
    apiCallBlocked: true as const,
    isDisplayOnly: true as const,
  };
}

function makeSafetyAuditSeal(
  status: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus,
  itemStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED'> = ['READY'],
) {
  const items = itemStatuses.map((s, i) => makeSealItem(i + 1, s));
  return {
    candidateDetailReviewSafetyAuditSealStatus: status,
    safetySealItems: items,
    sealedReadyCount: items.filter((i) => i.isReady).length,
    sealedPartialReadyCount: items.filter((i) => i.isPartialReady).length,
    sealedBlockedCount: items.filter((i) => i.isBlocked).length,
    sealedLockedCount: items.filter((i) => i.isLocked).length,
    totalSealedCount: items.length,
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView', () => {
  describe('1. 상태 매핑 - SEAL_READY → OUTCOME_CERTIFIED_READY', () => {
    it('should map SAFETY_AUDIT_SEAL_READY to OUTCOME_CERTIFIED_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
      );
    });
  });

  describe('2. 상태 매핑 - PARTIAL_READY → OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    it('should map SAFETY_AUDIT_SEAL_PARTIAL_READY to OUTCOME_CERTIFIED_PARTIAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY',
          ['PARTIAL_READY'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
      );
    });
  });

  describe('3. 상태 매핑 - BLOCKED → OUTCOME_BLOCKED', () => {
    it('should map SAFETY_AUDIT_SEAL_BLOCKED to OUTCOME_BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED',
          ['BLOCKED'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
      );
    });
  });

  describe('4. 상태 매핑 - EMPTY → OUTCOME_EMPTY', () => {
    it('should map SAFETY_AUDIT_SEAL_EMPTY to OUTCOME_EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
          [],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_EMPTY',
      );
    });
  });

  describe('5. 카운트 계산', () => {
    it('should compute certifiedReadyCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY', 'READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.certifiedReadyCount, 2);
    });

    it('should compute certifiedPartialReadyCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY',
          ['PARTIAL_READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.certifiedPartialReadyCount, 2);
    });

    it('should compute certifiedBlockedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED',
          ['BLOCKED', 'READY'],
        ),
      });
      assert.equal(result.certifiedBlockedCount, 1);
    });

    it('should compute certifiedLockedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['LOCKED', 'READY'],
        ),
      });
      assert.equal(result.certifiedLockedCount, 1);
    });

    it('should compute totalCertifiedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY', 'PARTIAL_READY', 'BLOCKED'],
        ),
      });
      assert.equal(result.totalCertifiedCount, 3);
    });
  });

  describe('6. outcomeCertificationItems 구조', () => {
    it('should produce outcomeCertificationItems with same count as input', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.outcomeCertificationItems.length, 2);
    });

    it('should preserve candidateId from source item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY'],
        ),
      });
      assert.equal(result.outcomeCertificationItems[0].candidateId, 'cid-1');
    });
  });

  describe('7. safeDisplayFieldsStillCertified true', () => {
    it('should set safeDisplayFieldsStillCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.safeDisplayFieldsStillCertified, true);
    });
  });

  describe('8. excludedFieldsStillCertified true', () => {
    it('should set excludedFieldsStillCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.excludedFieldsStillCertified, true);
    });
  });

  describe('9. executionStillLocked true', () => {
    it('should set executionStillLocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.executionStillLocked, true);
    });
  });

  describe('10. mutationStillBlocked true', () => {
    it('should set mutationStillBlocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.mutationStillBlocked, true);
    });
  });

  describe('11. apiCallStillBlocked true', () => {
    it('should set apiCallStillBlocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.apiCallStillBlocked, true);
    });
  });

  describe('12~16. 항목별 제외 플래그', () => {
    it('should set priceStockRawValuesExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY', ['READY']),
      });
      assert.equal(result.outcomeCertificationItems[0].priceStockRawValuesExcluded, true);
    });

    it('should set executionPayloadExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY', ['READY']),
      });
      assert.equal(result.outcomeCertificationItems[0].executionPayloadExcluded, true);
    });

    it('should set rawApiResponseExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY', ['READY']),
      });
      assert.equal(result.outcomeCertificationItems[0].rawApiResponseExcluded, true);
    });

    it('should set tokenOrAuthExcluded to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY', ['READY']),
      });
      assert.equal(result.outcomeCertificationItems[0].tokenOrAuthExcluded, true);
    });

    it('should set isDisplayOnly to true on each item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY', ['READY']),
      });
      assert.equal(result.outcomeCertificationItems[0].isDisplayOnly, true);
    });
  });

  describe('17. isReadOnlySafetyAuditSealOutcomeCertification true', () => {
    it('should set isReadOnlySafetyAuditSealOutcomeCertification to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.isReadOnlySafetyAuditSealOutcomeCertification, true);
    });
  });

  describe('18~32. 안전 플래그', () => {
    it('should set actualFinalExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.actualFinalExecutionApprovalGranted, false);
    });

    it('should set actualExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.actualExecutionApprovalGranted, false);
    });

    it('should set actualExecutionStarted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.actualExecutionStarted, false);
    });

    it('should set executionButtonAdded and candidateSelectionSubmitAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.executionButtonAdded, false);
      assert.equal(result.candidateSelectionSubmitAdded, false);
    });

    it('should set submitActionAdded and postApiAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.submitActionAdded, false);
      assert.equal(result.postApiAdded, false);
    });

    it('should set naverApiCalled and productLookupApiRecalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.naverApiCalled, false);
      assert.equal(result.productLookupApiRecalled, false);
    });

    it('should set productUpdateApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.productUpdateApiCalled, false);
    });

    it('should set priceChanged and stockChanged to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.priceChanged, false);
      assert.equal(result.stockChanged, false);
    });

    it('should set dbWritePerformed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.dbWritePerformed, false);
    });

    it('should set workerStarted, queueEnqueued, adapterConnected to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.workerStarted, false);
      assert.equal(result.queueEnqueued, false);
      assert.equal(result.adapterConnected, false);
    });

    it('should set tokenOrAuthValueExposed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.tokenOrAuthValueExposed, false);
    });

    it('should set rawApiResponseExposedOrStored to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.rawApiResponseExposedOrStored, false);
    });

    it('should set envFileReadOrModified to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.envFileReadOrModified, false);
    });
  });

  describe('33. Task 315 승인 문구', () => {
    it('should include NEXT_TASK_315_APPROVAL_PHRASE', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_315_APPROVAL_PHRASE);
    });

    it('should set requiresSeparateTask315Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.requiresSeparateTask315Approval, true);
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 314', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.taskId, 314);
    });

    it('should produce 4 outcomeCertificationSummaryCards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY'],
        ),
      });
      assert.equal(result.outcomeCertificationSummaryCards.length, 4);
    });

    it('should set outcomeCertifiedReady true when READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY'),
      });
      assert.equal(result.outcomeCertifiedReady, true);
      assert.equal(result.outcomeCertifiedPartialReady, false);
      assert.equal(result.outcomeCertificationBlocked, false);
      assert.equal(result.outcomeCertificationEmpty, false);
    });

    it('should set outcomeCertificationEmpty true when EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
          [],
        ),
      });
      assert.equal(result.outcomeCertificationEmpty, true);
    });

    it('should set actualExecutionBlocked, mutationBlocked, apiCallBlocked true on items', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationView({
        safetyAuditSeal: makeSafetyAuditSeal(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
          ['READY'],
        ),
      });
      assert.equal(result.outcomeCertificationItems[0].actualExecutionBlocked, true);
      assert.equal(result.outcomeCertificationItems[0].mutationBlocked, true);
      assert.equal(result.outcomeCertificationItems[0].apiCallBlocked, true);
    });
  });
});
