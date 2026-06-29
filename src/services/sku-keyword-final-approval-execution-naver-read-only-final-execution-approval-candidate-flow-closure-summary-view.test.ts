import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView,
  NEXT_TASK_320_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-flow-closure-summary-view.service';

type ClosureSummaryBuilderInput = Parameters<
  typeof buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView
>[0];

function makeInput(input?: {
  candidateListStatus?: ClosureSummaryBuilderInput['candidateList']['candidateListStatus'];
  detailReviewStatus?: ClosureSummaryBuilderInput['candidateDetailReview']['candidateDetailReviewStatus'];
  outcomeCertificationStatus?: ClosureSummaryBuilderInput['outcomeCertification']['candidateDetailReviewOutcomeCertificationStatus'];
  safetyAuditSealStatus?: ClosureSummaryBuilderInput['safetyAuditSeal']['candidateDetailReviewSafetyAuditSealStatus'];
  safetyAuditSealOutcomeCertificationStatus?: ClosureSummaryBuilderInput['safetyAuditSealOutcomeCertification']['candidateDetailReviewSafetyAuditSealOutcomeCertificationStatus'];
  finalSummaryStatus?: ClosureSummaryBuilderInput['candidateFinalSummary']['candidateFinalSummaryStatus'];
  finalSummaryOutcomeCertificationStatus?: ClosureSummaryBuilderInput['candidateFinalSummaryOutcomeCertification']['candidateFinalSummaryOutcomeCertificationStatus'];
  finalSummarySafetyAuditSealStatus?: ClosureSummaryBuilderInput['candidateFinalSummarySafetyAuditSeal']['candidateFinalSummarySafetyAuditSealStatus'];
  finalSummarySafetyAuditSealOutcomeCertificationStatus?: ClosureSummaryBuilderInput['candidateFinalSummarySafetyAuditSealOutcomeCertification']['candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus'];
}): ClosureSummaryBuilderInput {
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
    candidateFinalSummary: {
      candidateFinalSummaryStatus:
        input?.finalSummaryStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY',
    },
    candidateFinalSummaryOutcomeCertification: {
      candidateFinalSummaryOutcomeCertificationStatus:
        input?.finalSummaryOutcomeCertificationStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY',
    },
    candidateFinalSummarySafetyAuditSeal: {
      candidateFinalSummarySafetyAuditSealStatus:
        input?.finalSummarySafetyAuditSealStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY',
    },
    candidateFinalSummarySafetyAuditSealOutcomeCertification: {
      candidateFinalSummarySafetyAuditSealOutcomeCertificationStatus:
        input?.finalSummarySafetyAuditSealOutcomeCertificationStatus ??
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
    },
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView', () => {
  it('Task 310~318 모두 READY 계열이면 closureStatus READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(
      result.candidateFlowClosureSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_READY',
    );
    assert.equal(result.candidateFlowClosureReady, true);
  });

  it('하나 이상 PARTIAL 계열이고 BLOCKED가 없으면 PARTIAL_READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(
      makeInput({
        detailReviewStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
      }),
    );
    assert.equal(
      result.candidateFlowClosureSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_PARTIAL_READY',
    );
    assert.equal(result.candidateFlowClosurePartialReady, true);
  });

  it('하나 이상 BLOCKED 계열이면 BLOCKED', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(
      makeInput({
        finalSummarySafetyAuditSealOutcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
      }),
    );
    assert.equal(
      result.candidateFlowClosureSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_BLOCKED',
    );
    assert.equal(result.candidateFlowClosureBlocked, true);
  });

  it('EMPTY 계열이면 EMPTY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(
      makeInput({
        candidateListStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY',
      }),
    );
    assert.equal(
      result.candidateFlowClosureSummaryStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FLOW_CLOSURE_SUMMARY_EMPTY',
    );
    assert.equal(result.candidateFlowClosureEmpty, true);
  });

  it('closureFlowItems 9개와 카운트를 정확히 계산한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(
      makeInput({
        candidateListStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
        detailReviewStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
        outcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
        safetyAuditSealStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_EMPTY',
        safetyAuditSealOutcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
        finalSummaryStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY',
        finalSummaryOutcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
        finalSummarySafetyAuditSealStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY',
        finalSummarySafetyAuditSealOutcomeCertificationStatus:
          'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
      }),
    );

    assert.equal(result.closureFlowItems.length, 9);
    assert.equal(result.readyClosureCount, 5);
    assert.equal(result.partialReadyClosureCount, 2);
    assert.equal(result.blockedClosureCount, 1);
    assert.equal(result.emptyClosureCount, 1);
    assert.equal(result.lockedClosureCount, 0);
    assert.equal(result.totalClosureCount, 9);
  });

  it('candidateFlowReadOnlyClosed true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.candidateFlowReadOnlyClosed, true);
  });

  it('candidateFlowStillDisplayOnly true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.candidateFlowStillDisplayOnly, true);
  });

  it('candidateFlowSafeForDeploymentPreparation true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.candidateFlowSafeForDeploymentPreparation, true);
  });

  it('deploymentPreparationNotStarted true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.deploymentPreparationNotStarted, true);
  });

  it('domainConnectionNotStarted true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.domainConnectionNotStarted, true);
  });

  it('safeDisplayFieldsStillCertified / excludedFieldsStillCertified true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.safeDisplayFieldsStillCertified, true);
    assert.equal(result.excludedFieldsStillCertified, true);
  });

  it('execution / mutation / api / db / workerQueueAdapter 차단 유지', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.executionStillLocked, true);
    assert.equal(result.mutationStillBlocked, true);
    assert.equal(result.apiCallStillBlocked, true);
    assert.equal(result.dbWriteStillBlocked, true);
    assert.equal(result.workerQueueAdapterStillBlocked, true);
  });

  it('isReadOnlyCandidateFlowClosureSummary true', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.isReadOnlyCandidateFlowClosureSummary, true);
  });

  it('실행 관련 플래그는 모두 false', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
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

  it('민감 정보 노출 및 파일/배포/도메인 플래그는 false', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.tokenOrAuthValueExposed, false);
    assert.equal(result.rawApiResponseExposedOrStored, false);
    assert.equal(result.envFileReadOrModified, false);
    assert.equal(result.deploymentStarted, false);
    assert.equal(result.domainConnected, false);
  });

  it('closureFlowItems는 화면 표시 가능한 구조와 차단 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.closureFlowItems[0].taskId, 310);
    assert.equal(result.closureFlowItems[0].isDisplayOnly, true);
    assert.equal(result.closureFlowItems[0].actualExecutionBlocked, true);
    assert.equal(result.closureFlowItems[0].mutationBlocked, true);
    assert.equal(result.closureFlowItems[0].apiCallBlocked, true);
    assert.equal(result.closureFlowItems[0].dbWriteBlocked, true);
    assert.equal(result.closureFlowItems[0].workerQueueAdapterBlocked, true);
  });

  it('Task 320 승인 문구 포함', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_320_APPROVAL_PHRASE);
    assert.equal(result.requiresSeparateTask320Approval, true);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryView(makeInput());
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
    assert.equal(serialized.includes('client-secret-value'), false);
  });
});
