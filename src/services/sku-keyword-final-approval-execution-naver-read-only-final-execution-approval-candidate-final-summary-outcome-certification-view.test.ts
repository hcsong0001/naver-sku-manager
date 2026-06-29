import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView,
  NEXT_TASK_317_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-outcome-certification-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-view.service';

function makeSummaryFlowItem(input: {
  taskId: number;
  taskName: string;
  sourceStatus: string;
  summaryStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
  displayOrder: number;
}) {
  return {
    taskId: input.taskId,
    taskName: input.taskName,
    sourceStatus: input.sourceStatus,
    summaryStatus: input.summaryStatus,
    displayOrder: input.displayOrder,
    isReady: input.summaryStatus === 'READY',
    isPartialReady: input.summaryStatus === 'PARTIAL_READY',
    isBlocked: input.summaryStatus === 'BLOCKED',
    isEmpty: input.summaryStatus === 'EMPTY',
    isLocked: input.summaryStatus === 'LOCKED',
    message: `Task ${input.taskId} ${input.taskName}: ${input.summaryStatus}`,
    isDisplayOnly: true as const,
    actualExecutionBlocked: true as const,
    mutationBlocked: true as const,
    apiCallBlocked: true as const,
  };
}

function makeInput(
  status: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryStatus,
  summaryStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED'> = [
    'READY',
    'READY',
    'READY',
    'READY',
    'READY',
  ],
) {
  return {
    candidateFinalSummary: {
      candidateFinalSummaryStatus: status,
      summaryFlowItems: summaryStatuses.map((summaryStatus, index) =>
        makeSummaryFlowItem({
          taskId: 310 + index,
          taskName: `Task-${310 + index}`,
          sourceStatus: `SOURCE_${summaryStatus}`,
          summaryStatus,
          displayOrder: index + 1,
        }),
      ),
    },
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView', () => {
  it('Task 315 finalSummaryStatus READY -> outcomeCertificationStatus CERTIFIED_READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    assert.equal(
      result.candidateFinalSummaryOutcomeCertificationStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY',
    );
  });

  it('PARTIAL_READY -> outcomeCertificationStatus CERTIFIED_PARTIAL_READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY',
        ['READY', 'PARTIAL_READY', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummaryOutcomeCertificationStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    );
  });

  it('BLOCKED -> outcomeCertificationStatus OUTCOME_BLOCKED', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_BLOCKED',
        ['READY', 'BLOCKED', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummaryOutcomeCertificationStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED',
    );
  });

  it('EMPTY -> outcomeCertificationStatus OUTCOME_EMPTY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_EMPTY',
        ['READY', 'EMPTY', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummaryOutcomeCertificationStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY',
    );
  });

  it('인증 카운트를 정확히 계산한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_PARTIAL_READY',
        ['READY', 'PARTIAL_READY', 'BLOCKED', 'EMPTY', 'LOCKED'],
      ),
    );
    assert.equal(result.certifiedReadyFlowCount, 1);
    assert.equal(result.certifiedPartialReadyFlowCount, 1);
    assert.equal(result.certifiedBlockedFlowCount, 1);
    assert.equal(result.certifiedEmptyFlowCount, 1);
    assert.equal(result.certifiedLockedFlowCount, 1);
    assert.equal(result.totalCertifiedFlowCount, 5);
  });

  it('outcomeCertificationItems가 화면 표시 가능한 구조로 생성된다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    assert.equal(result.outcomeCertificationItems.length, 5);
    assert.equal(result.outcomeCertificationItems[0].taskId, 310);
    assert.equal(result.outcomeCertificationItems[0].isDisplayOnly, true);
    assert.equal(result.outcomeCertificationItems[0].actualExecutionBlocked, true);
    assert.equal(result.outcomeCertificationItems[0].mutationBlocked, true);
    assert.equal(result.outcomeCertificationItems[0].apiCallBlocked, true);
  });

  it('후보 흐름 완료 및 안전 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    assert.equal(result.candidateReadOnlyFlowStillCompleted, true);
    assert.equal(result.candidateFlowStillDisplayOnly, true);
    assert.equal(result.safeDisplayFieldsStillCertified, true);
    assert.equal(result.excludedFieldsStillCertified, true);
    assert.equal(result.executionStillLocked, true);
    assert.equal(result.mutationStillBlocked, true);
    assert.equal(result.apiCallStillBlocked, true);
    assert.equal(result.isReadOnlyCandidateFinalSummaryOutcomeCertification, true);
  });

  it('실행 관련 플래그는 모두 false다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
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
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    assert.equal(result.tokenOrAuthValueExposed, false);
    assert.equal(result.rawApiResponseExposedOrStored, false);
    assert.equal(result.envFileReadOrModified, false);
  });

  it('Task 317 승인 문구를 포함한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_317_APPROVAL_PHRASE);
    assert.equal(result.requiresSeparateTask317Approval, true);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_READY'),
    );
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
    assert.equal(serialized.includes('client-secret-value'), false);
  });
});
