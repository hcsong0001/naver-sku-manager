import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView,
  NEXT_TASK_318_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-safety-audit-seal-view.service';
import { NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-final-summary-outcome-certification-view.service';

function makeOutcomeCertificationItem(input: {
  taskId: number;
  taskName: string;
  outcomeCertificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED';
  displayOrder: number;
}) {
  return {
    taskId: input.taskId,
    taskName: input.taskName,
    sourceStatus: `SOURCE_${input.outcomeCertificationStatus}`,
    outcomeCertificationStatus: input.outcomeCertificationStatus,
    displayOrder: input.displayOrder,
    isReady: input.outcomeCertificationStatus === 'READY',
    isPartialReady: input.outcomeCertificationStatus === 'PARTIAL_READY',
    isBlocked: input.outcomeCertificationStatus === 'BLOCKED',
    isEmpty: input.outcomeCertificationStatus === 'EMPTY',
    isLocked: input.outcomeCertificationStatus === 'LOCKED',
    message: `Task ${input.taskId} ${input.taskName}: ${input.outcomeCertificationStatus}`,
    isDisplayOnly: true as const,
    actualExecutionBlocked: true as const,
    mutationBlocked: true as const,
    apiCallBlocked: true as const,
  };
}

function makeInput(
  status: NaverReadOnlyFinalExecutionApprovalCandidateFinalSummaryOutcomeCertificationStatus,
  itemStatuses: Array<'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'EMPTY' | 'LOCKED'> = [
    'READY',
    'READY',
    'READY',
    'READY',
    'READY',
  ],
) {
  return {
    outcomeCertification: {
      candidateFinalSummaryOutcomeCertificationStatus: status,
      outcomeCertificationItems: itemStatuses.map((itemStatus, index) =>
        makeOutcomeCertificationItem({
          taskId: 310 + index,
          taskName: `Task-${310 + index}`,
          outcomeCertificationStatus: itemStatus,
          displayOrder: index + 1,
        }),
      ),
    },
  };
}

describe('buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView', () => {
  it('Task 316 outcomeCertificationStatus CERTIFIED_READY -> safetyAuditSealStatus READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    assert.equal(
      result.candidateFinalSummarySafetyAuditSealStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_READY',
    );
  });

  it('CERTIFIED_PARTIAL_READY -> safetyAuditSealStatus PARTIAL_READY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
        ['READY', 'PARTIAL_READY', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummarySafetyAuditSealStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_PARTIAL_READY',
    );
  });

  it('OUTCOME_BLOCKED -> safetyAuditSealStatus BLOCKED', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_BLOCKED',
        ['READY', 'BLOCKED', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummarySafetyAuditSealStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_BLOCKED',
    );
  });

  it('OUTCOME_EMPTY -> safetyAuditSealStatus EMPTY', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_EMPTY',
        ['READY', 'EMPTY', 'READY', 'READY', 'READY'],
      ),
    );
    assert.equal(
      result.candidateFinalSummarySafetyAuditSealStatus,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_SAFETY_AUDIT_SEAL_EMPTY',
    );
  });

  it('봉인 카운트를 정확히 계산한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput(
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_PARTIAL_READY',
        ['READY', 'PARTIAL_READY', 'BLOCKED', 'EMPTY', 'LOCKED'],
      ),
    );
    assert.equal(result.sealedReadyFlowCount, 1);
    assert.equal(result.sealedPartialReadyFlowCount, 1);
    assert.equal(result.sealedBlockedFlowCount, 1);
    assert.equal(result.sealedEmptyFlowCount, 1);
    assert.equal(result.sealedLockedFlowCount, 1);
    assert.equal(result.totalSealedFlowCount, 5);
  });

  it('safetySealItems가 화면 표시 가능한 구조로 생성된다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    assert.equal(result.safetySealItems.length, 5);
    assert.equal(result.safetySealItems[0].taskId, 310);
    assert.equal(result.safetySealItems[0].isDisplayOnly, true);
    assert.equal(result.safetySealItems[0].actualExecutionBlocked, true);
    assert.equal(result.safetySealItems[0].mutationBlocked, true);
    assert.equal(result.safetySealItems[0].apiCallBlocked, true);
  });

  it('후보 흐름 완료 및 안전 플래그를 유지한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    assert.equal(result.candidateReadOnlyFlowStillCompleted, true);
    assert.equal(result.candidateFlowStillDisplayOnly, true);
    assert.equal(result.safeDisplayFieldsStillCertified, true);
    assert.equal(result.excludedFieldsStillCertified, true);
    assert.equal(result.executionStillLocked, true);
    assert.equal(result.mutationStillBlocked, true);
    assert.equal(result.apiCallStillBlocked, true);
    assert.equal(result.isReadOnlyCandidateFinalSummarySafetyAuditSeal, true);
  });

  it('실행 관련 플래그는 모두 false다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
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
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    assert.equal(result.tokenOrAuthValueExposed, false);
    assert.equal(result.rawApiResponseExposedOrStored, false);
    assert.equal(result.envFileReadOrModified, false);
  });

  it('Task 318 승인 문구를 포함한다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    assert.equal(result.nextTaskApprovalPhrase, NEXT_TASK_318_APPROVAL_PHRASE);
    assert.equal(result.requiresSeparateTask318Approval, true);
  });

  it('JSON.stringify 결과에 실제 민감 값이 포함되지 않는다', () => {
    const result = buildNaverReadOnlyFinalExecutionApprovalCandidateFinalSummarySafetyAuditSealView(
      makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_FINAL_SUMMARY_OUTCOME_CERTIFIED_READY'),
    );
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes('secret-token-value'), false);
    assert.equal(serialized.includes('raw-response-body'), false);
    assert.equal(serialized.includes('client-secret-value'), false);
  });
});
