import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView,
  NEXT_TASK_316_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateListStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-detail-review-safety-audit-seal-outcome-certification-view.service';

function makeInput(input?: {
  candidateListStatus?: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
  detailReviewStatus?: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
  outcomeCertificationStatus?: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewOutcomeCertificationStatus;
  safetyAuditSealStatus?: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus;
  safetyAuditSealOutcomeCertificationStatus?: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealOutcomeCertificationStatus;
}) {
  return {
    candidateList: {
      candidateListStatus:
        input?.candidateListStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
    },
    candidateDetailReview: {
      candidateDetailReviewStatus:
        input?.detailReviewStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
    },
    outcomeCertification: {
      candidateDetailReviewOutcomeCertificationStatus:
        input?.outcomeCertificationStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
    },
    safetyAuditSeal: {
      candidateDetailReviewSafetyAuditSealStatus:
        input?.safetyAuditSealStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_READY',
    },
    safetyAuditSealOutcomeCertification: {
      candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus:
        input?.safetyAuditSealOutcomeCertificationStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
    },
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView', () => {
  it('Task 310~314가 모두 READY 계열이면 finalSummaryStatus는 READY다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.candidateFinalSummaryStatus, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY');
    assert.equal(result.candidateFinalSummaryReady, true);
  });

  it('PARTIAL 계열이 하나 이상이고 BLOCKED가 없으면 PARTIAL_READY다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(
      makeInput({
        detailReviewStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
      }),
    );
    assert.equal(
      result.candidateFinalSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY',
    );
    assert.equal(result.candidateFinalSummaryPartialReady, true);
  });

  it('BLOCKED 계열이 하나 이상이면 BLOCKED다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(
      makeInput({
        safetyAuditSealStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_BLOCKED',
      }),
    );
    assert.equal(
      result.candidateFinalSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED',
    );
    assert.equal(result.candidateFinalSummaryBlocked, true);
  });

  it('EMPTY 계열이 하나 이상이면 EMPTY다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(
      makeInput({
        candidateListStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY',
      }),
    );
    assert.equal(
      result.candidateFinalSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY',
    );
    assert.equal(result.candidateFinalSummaryEmpty, true);
  });

  it('summaryFlowItems 5개와 카운트 계산이 정확하다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(
      makeInput({
        candidateListStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
        detailReviewStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
        outcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
        safetyAuditSealStatus: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
        safetyAuditSealOutcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
      }),
    );

    assert.equal(result.summaryFlowItems.length, 5);
    assert.equal(result.readyFlowCount, 2);
    assert.equal(result.partialReadyFlowCount, 1);
    assert.equal(result.blockedFlowCount, 1);
    assert.equal(result.emptyFlowCount, 1);
    assert.equal(result.lockedFlowCount, 0);
    assert.equal(result.totalFlowCount, 5);
  });

  it('candidateFinalSummaryCards는 화면 표시 가능한 5개 카드 구조다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.candidateFinalSummaryCards.length, 5);
    assert.deepEqual(
      result.candidateFinalSummaryCards.map((card) => card.cardType),
      ['READY', 'PARTIAL_READY', 'BLOCKED', 'EMPTY', 'LOCKED'],
    );
  });

  it('summaryFlowItems는 display-only와 차단 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    for (const item of result.summaryFlowItems) {
      assert.equal(item.isDisplayOnly, true);
      assert.equal(item.actualExecutionBlocked, true);
      assert.equal(item.mutationBlocked, true);
      assert.equal(item.apiCallBlocked, true);
    }
  });

  it('후보 read-only 플로우 완료 및 안전 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.candidateReadOnlyFlowCompleted, true);
    assert.equal(result.candidateFlowStillDisplayOnly, true);
    assert.equal(result.safeDisplayFieldsStillCertified, true);
    assert.equal(result.excludedFieldsStillCertified, true);
    assert.equal(result.executionStillLocked, true);
    assert.equal(result.mutationStillBlocked, true);
    assert.equal(result.apiCallStillBlocked, true);
    assert.equal(result.isReadOnlyCandidateFinalSummary, true);
    assert.equal(result.requiresSeparateTask316Approval, true);
  });

  it('실행/승인/submit/API/DB/worker 관련 플래그는 모두 false다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.actualFinalExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionApprovalGranted, false);
    assert.equal(result.actualExecutionStarted, false);
    assert.equal(result.executionButtonAdded, false);
    assert.equal(result.candidateSelectionSubmitAdded, false);
    assert.equal(result.submitActionAdded, false);
    assert.equal(result.postApiAdded, false);
    assert.equal(result.naverApiCalled, false);
    assert.equal(result.productLookupApiRecalled, false);
    assert.equal(result.productUpdateApiCalled, false);
    assert.equal(result.priceChanged, false);
    assert.equal(result.stockChanged, false);
    assert.equal(result.dbWritePerformed, false);
    assert.equal(result.workerStarted, false);
    assert.equal(result.queueEnqueued, false);
    assert.equal(result.adapterConnected, false);
  });

  it('Token/Auth/raw response/.env 관련 비노출 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.tokenOrAuthValueExposed, false);
    assert.equal(result.rawApiResponseExposedOrStored, false);
    assert.equal(result.envFileReadOrModified, false);
  });

  it('Task 316 승인 문구를 포함한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_316_APPROVAL_PHRASE);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
    assert.equal(serialized.includes('client-secret-value'), false);
  });

  it('ViewModel 식별 필드와 요약 대상 Task 목록이 맞다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryView(makeInput());
    assert.equal(result.status, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_VIEW');
    assert.equal(result.taskId, 315);
    assert.equal(result.currentTaskNumber, 315);
    assert.deepEqual(
      result.summaryFlowItems.map((item) => item.taskId),
      [310, 311, 312, 313, 314],
    );
  });
});
