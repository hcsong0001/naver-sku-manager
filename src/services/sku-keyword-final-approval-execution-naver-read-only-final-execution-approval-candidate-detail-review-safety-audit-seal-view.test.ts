import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView,
  NEXT_TASK_314_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';

const SAFE_FIELDS = ['sku', 'productName', 'calculationType', 'targetType', 'riskLevel', 'warningCount', 'errorCount'];
const EXCL_FIELDS = ['priceStockRawValues', 'executionPayload', 'requestPayload', 'rawApiResponse', 'token', 'auth', 'signature', 'authorization', 'envValues'];

function makeCertItem(id: number, status: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED' = 'READY') {
  return {
    candidateId: `cid-${id}`,
    displayOrder: id,
    displayName: `상품 ${id}`,
    sourceDetailReviewStatus: status,
    certificationStatus: status,
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isLocked: status === 'LOCKED',
    warningCount: status === 'PARTIAL_READY' ? 1 : 0,
    errorCount: status === 'BLOCKED' ? 1 : 0,
    certificationMessage: '인증 메시지',
    safeDisplayFields: SAFE_FIELDS as readonly string[],
    excludedFields: EXCL_FIELDS as readonly string[],
    priceStockRawValuesExcluded: true as const,
    executionPayloadExcluded: true as const,
    rawApiResponseExcluded: true as const,
    tokenOrAuthExcluded: true as const,
    isDisplayOnly: true as const,
  };
}

function makeOutcomeCertification(
  status: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus,
  itemStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED'> = ['READY'],
) {
  const items = itemStatuses.map((s, i) => makeCertItem(i + 1, s));
  return {
    candidateDetailReviewOutcomeCertificationStatus: status,
    certificationItems: items,
    certifiedDetailCount: items.filter((i) => i.isReady).length,
    partialCertifiedDetailCount: items.filter((i) => i.isPartialReady).length,
    blockedCertifiedDetailCount: items.filter((i) => i.isBlocked).length,
    lockedCertifiedDetailCount: items.filter((i) => i.isLocked).length,
    totalCertifiedDetailCount: items.length,
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView', () => {
  describe('1. 상태 매핑 - CERTIFIED_READY → SEAL_READY', () => {
    it('should map OUTCOME_CERTIFIED_READY to SAFETY_AUDIT_SEAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
      );
    });
  });

  describe('2. 상태 매핑 - CERTIFIED_PARTIAL_READY → SEAL_PARTIAL_READY', () => {
    it('should map OUTCOME_CERTIFIED_PARTIAL_READY to SAFETY_AUDIT_SEAL_PARTIAL_READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
          ['PARTIAL_READY'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_PARTIAL_READY',
      );
    });
  });

  describe('3. 상태 매핑 - OUTCOME_BLOCKED → SEAL_BLOCKED', () => {
    it('should map OUTCOME_BLOCKED to SAFETY_AUDIT_SEAL_BLOCKED', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
          ['BLOCKED'],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED',
      );
    });
  });

  describe('4. 상태 매핑 - OUTCOME_EMPTY → SEAL_EMPTY', () => {
    it('should map OUTCOME_EMPTY to SAFETY_AUDIT_SEAL_EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY',
          [],
        ),
      });
      assert.equal(
        result.candidateDetailReviewSafetyAuditSealStatus,
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
      );
    });
  });

  describe('5. 카운트 계산', () => {
    it('should compute sealedReadyCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY', 'READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.sealedReadyCount, 2);
    });

    it('should compute sealedPartialReadyCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
          ['PARTIAL_READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.sealedPartialReadyCount, 2);
    });

    it('should compute sealedBlockedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
          ['BLOCKED', 'READY'],
        ),
      });
      assert.equal(result.sealedBlockedCount, 1);
    });

    it('should compute sealedLockedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['LOCKED', 'READY'],
        ),
      });
      assert.equal(result.sealedLockedCount, 1);
    });

    it('should compute totalSealedCount correctly', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY', 'PARTIAL_READY', 'BLOCKED'],
        ),
      });
      assert.equal(result.totalSealedCount, 3);
    });
  });

  describe('6. safetySealItems 구조', () => {
    it('should produce safetySealItems with same count as input', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY', 'PARTIAL_READY'],
        ),
      });
      assert.equal(result.safetySealItems.length, 2);
    });

    it('should preserve candidateId from source item', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].candidateId, 'cid-1');
    });
  });

  describe('7. safeDisplayFieldsStillCertified true', () => {
    it('should set safeDisplayFieldsStillCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.safeDisplayFieldsStillCertified, true);
    });
  });

  describe('8. excludedFieldsStillCertified true', () => {
    it('should set excludedFieldsStillCertified to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.excludedFieldsStillCertified, true);
    });
  });

  describe('9. executionStillLocked true', () => {
    it('should set executionStillLocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.executionStillLocked, true);
    });
  });

  describe('10. mutationStillBlocked true', () => {
    it('should set mutationStillBlocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.mutationStillBlocked, true);
    });
  });

  describe('11. apiCallStillBlocked true', () => {
    it('should set apiCallStillBlocked to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.apiCallStillBlocked, true);
    });
  });

  describe('12. priceStockRawValuesExcluded true on items', () => {
    it('should set priceStockRawValuesExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].priceStockRawValuesExcluded, true);
    });
  });

  describe('13. executionPayloadExcluded true on items', () => {
    it('should set executionPayloadExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].executionPayloadExcluded, true);
    });
  });

  describe('14. rawApiResponseExcluded true on items', () => {
    it('should set rawApiResponseExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].rawApiResponseExcluded, true);
    });
  });

  describe('15. tokenOrAuthExcluded true on items', () => {
    it('should set tokenOrAuthExcluded to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].tokenOrAuthExcluded, true);
    });
  });

  describe('16. isDisplayOnly true on items', () => {
    it('should set isDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].isDisplayOnly, true);
    });
  });

  describe('17. isReadOnlySafetyAuditSeal true', () => {
    it('should set isReadOnlySafetyAuditSeal to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
        ),
      });
      assert.equal(result.isReadOnlySafetyAuditSeal, true);
    });
  });

  describe('18~32. 안전 플래그', () => {
    it('should set actualFinalExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.actualFinalExecutionApprovalGranted, false);
    });

    it('should set actualExecutionApprovalGranted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.actualExecutionApprovalGranted, false);
    });

    it('should set actualExecutionStarted to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.actualExecutionStarted, false);
    });

    it('should set executionButtonAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.executionButtonAdded, false);
    });

    it('should set candidateSelectionSubmitAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.candidateSelectionSubmitAdded, false);
    });

    it('should set submitActionAdded and postApiAdded to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.submitActionAdded, false);
      assert.equal(result.postApiAdded, false);
    });

    it('should set naverApiCalled and productLookupApiRecalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.naverApiCalled, false);
      assert.equal(result.productLookupApiRecalled, false);
    });

    it('should set productUpdateApiCalled to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.productUpdateApiCalled, false);
    });

    it('should set priceChanged and stockChanged to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.priceChanged, false);
      assert.equal(result.stockChanged, false);
    });

    it('should set dbWritePerformed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.dbWritePerformed, false);
    });

    it('should set workerStarted, queueEnqueued, adapterConnected to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.workerStarted, false);
      assert.equal(result.queueEnqueued, false);
      assert.equal(result.adapterConnected, false);
    });

    it('should set tokenOrAuthValueExposed to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.tokenOrAuthValueExposed, false);
    });

    it('should set rawApiResponseExposedOrStored to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.rawApiResponseExposedOrStored, false);
    });

    it('should set envFileReadOrModified to false', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.envFileReadOrModified, false);
    });
  });

  describe('33. Task 314 승인 문구', () => {
    it('should include NEXT_TASK_314_APPROVAL_PHRASE', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_314_APPROVAL_PHRASE);
    });

    it('should set requiresSeparateTask314Approval to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.requiresSeparateTask314Approval, true);
    });
  });

  describe('ViewModel identity fields', () => {
    it('should set taskId to 313', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.taskId, 313);
    });

    it('should set currentTaskNumber to 313', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.currentTaskNumber, 313);
    });

    it('should set isBatchJobResultDisplayOnly to true', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.isBatchJobResultDisplayOnly, true);
    });

    it('should produce 4 safetySealSummaryCards', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealSummaryCards.length, 4);
    });

    it('should set safetyAuditSealReady true when READY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(result.safetyAuditSealReady, true);
      assert.equal(result.safetyAuditSealPartialReady, false);
      assert.equal(result.safetyAuditSealBlocked, false);
      assert.equal(result.safetyAuditSealEmpty, false);
    });

    it('should set safetyAuditSealEmpty true when EMPTY', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_EMPTY',
          [],
        ),
      });
      assert.equal(result.safetyAuditSealEmpty, true);
    });

    it('should set actualExecutionBlocked and mutationBlocked and apiCallBlocked true on items', () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
        outcomeCertification: makeOutcomeCertification(
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
          ['READY'],
        ),
      });
      assert.equal(result.safetySealItems[0].actualExecutionBlocked, true);
      assert.equal(result.safetySealItems[0].mutationBlocked, true);
      assert.equal(result.safetySealItems[0].apiCallBlocked, true);
    });
  });
});
