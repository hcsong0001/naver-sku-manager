export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateItem {
  label: string;
  description: string;
  preReleaseState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateView {
  taskName: string;
  panelTitle: string;
  preReleaseStatus: string;
  isReadOnly: boolean;
  isDisplayOnlyStatusSummaryFinalPreReleaseState: boolean;
  isExecutionApproved: boolean;
  isReExecutionApproved: boolean;
  isConnectionApproved: boolean;
  isTokenTestApproved: boolean;
  isLiveReady: boolean;
  isBatchJobResultDisplayOnly: boolean;
  hasExecutionButton: boolean;
  hasSubmitAction: boolean;
  hasWorkerTrigger: boolean;
  hasQueueTrigger: boolean;
  hasAdapterTrigger: boolean;
  hasTokenRequestPath: boolean;
  hasNaverApiCallPath: boolean;
  hasOperatingDbWritePath: boolean;
  hasPriceChangePath: boolean;
  hasStockChangePath: boolean;

  preReleaseBatchJobStatus: string;
  preReleaseTotalItemCount: number;
  preReleaseSuccessItemCount: number;
  preReleaseFailedItemCount: number;
  preReleaseSkippedItemCount: number;
  preReleaseReadyItemCount: number;
  preReleaseUnknownItemCount: number;

  previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundarySealLabel: string;
  previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundarySealCommit: string;

  statusSummaryFinalPreReleaseStateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateItem[];
  blockedActionPaths: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateItem[];
  misunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateView(
  job: any
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPreReleaseStateView {
  
  const items = job?.items || [];
  const preReleaseTotalItemCount = items.length;
  const preReleaseReadyItemCount = items.filter((i: any) => i.status === 'READY').length;
  const preReleaseSuccessItemCount = items.filter((i: any) => i.status === 'SUCCESS').length;
  const preReleaseFailedItemCount = items.filter((i: any) => i.status === 'FAILED').length;
  const preReleaseSkippedItemCount = items.filter((i: any) => i.status === 'SKIPPED').length;
  const preReleaseUnknownItemCount = preReleaseTotalItemCount - (preReleaseReadyItemCount + preReleaseSuccessItemCount + preReleaseFailedItemCount + preReleaseSkippedItemCount);

  return {
    taskName: 'Task 195 - BatchJob Execution Result Display-Only Status Summary Final Pre-Release State Screen Flow',
    panelTitle: 'BatchJob Execution Result Display-Only Status Summary Final Pre-Release State',
    preReleaseStatus: 'BATCHJOB_RESULT_DISPLAY_ONLY_STATUS_SUMMARY_FINAL_PRE_RELEASE_STATE',
    isReadOnly: true,
    isDisplayOnlyStatusSummaryFinalPreReleaseState: true,
    isExecutionApproved: false,
    isReExecutionApproved: false,
    isConnectionApproved: false,
    isTokenTestApproved: false,
    isLiveReady: false,
    isBatchJobResultDisplayOnly: true,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    hasTokenRequestPath: false,
    hasNaverApiCallPath: false,
    hasOperatingDbWritePath: false,
    hasPriceChangePath: false,
    hasStockChangePath: false,

    preReleaseBatchJobStatus: job?.status || 'UNKNOWN',
    preReleaseTotalItemCount,
    preReleaseReadyItemCount,
    preReleaseSuccessItemCount,
    preReleaseFailedItemCount,
    preReleaseSkippedItemCount,
    preReleaseUnknownItemCount,

    previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundarySealLabel: 'BatchJob Execution Result Display-Only Status Summary Final Handoff Boundary Seal',
    previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundarySealCommit: '3679470',

    statusSummaryFinalPreReleaseStateItems: [
      {
        label: '상태 요약의 배포 전 릴리스(Pre-Release) 상태 준비',
        description: '봉인된 상태 요약이 최종 릴리스(화면 노출) 되기 직전의 준비 상태임을 선언합니다.',
        preReleaseState: 'PRE_RELEASE_STATE_READY',
        tone: 'neutral'
      }
    ],

    blockedActionPaths: [
      {
        label: '릴리스 준비 중 트리거 절대 불가',
        description: '릴리스 상태로 전환되는 과정에서도 Worker, Queue, DB Write 등 어떠한 변경 작업도 불가합니다.',
        preReleaseState: 'NO_MUTATION_DURING_RELEASE',
        tone: 'blocked'
      }
    ],

    misunderstandingPreventionItems: [
      {
        label: 'Pre-Release ≠ 새로운 BatchJob 생성',
        description: '이는 기존 작업의 단순 화면 출력을 위한 릴리스 준비 과정일 뿐, 새로운 작업을 발행하는 것이 아닙니다.',
        preReleaseState: 'NOT_A_NEW_BATCHJOB_CREATION',
        tone: 'blocked'
      }
    ],

    finalNotice: '이 영역은 BatchJob 실행 결과 display-only status summary final pre-release state 화면입니다. 봉인된 Handoff Boundary 데이터를 바탕으로, 실행 권한이 철저히 배제된 순수 읽기 전용 릴리스(노출)를 준비합니다.'
  };
}
