export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryItem {
  label: string;
  description: string;
  summaryState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryView {
  taskName: string;
  panelTitle: string;
  summaryStatus: string;
  isReadOnly: boolean;
  isDisplayOnlyStatusSummary: boolean;
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

  batchJobStatus: string;
  totalItemCount: number;
  readyItemCount: number;
  successItemCount: number;
  failedItemCount: number;
  skippedItemCount: number;
  unknownItemCount: number;

  previousExecutionBatchJobResultDisplayOnlyFinalHandoffBoundarySealLabel: string;
  previousExecutionBatchJobResultDisplayOnlyFinalHandoffBoundarySealCommit: string;

  statusSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryItem[];
  blockedActionPaths: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryItem[];
  misunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryView(
  job: any
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryView {
  
  const items = job?.items || [];
  const totalItemCount = items.length;
  const readyItemCount = items.filter((i: any) => i.status === 'READY').length;
  const successItemCount = items.filter((i: any) => i.status === 'SUCCESS').length;
  const failedItemCount = items.filter((i: any) => i.status === 'FAILED').length;
  const skippedItemCount = items.filter((i: any) => i.status === 'SKIPPED').length;
  const unknownItemCount = totalItemCount - (readyItemCount + successItemCount + failedItemCount + skippedItemCount);

  return {
    taskName: 'Task 188 - BatchJob Execution Result Display-Only Status Summary Screen Flow',
    panelTitle: 'BatchJob Execution Result Display-Only Status Summary',
    summaryStatus: 'BATCHJOB_RESULT_DISPLAY_ONLY_STATUS_SUMMARY_ACTIVE',
    isReadOnly: true,
    isDisplayOnlyStatusSummary: true,
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

    batchJobStatus: job?.status || 'UNKNOWN',
    totalItemCount,
    readyItemCount,
    successItemCount,
    failedItemCount,
    skippedItemCount,
    unknownItemCount,

    previousExecutionBatchJobResultDisplayOnlyFinalHandoffBoundarySealLabel: 'BatchJob Execution Result Display-Only Final Handoff Boundary Seal',
    previousExecutionBatchJobResultDisplayOnlyFinalHandoffBoundarySealCommit: '494d6f8',

    statusSummaryItems: [
      {
        label: 'read-only 상태 요약',
        description: '현재 BatchJob과 item 상태를 읽기 전용으로 요약하여 표시합니다.',
        summaryState: 'BATCHJOB_RESULT_DISPLAY_ONLY_STATUS_SUMMARY_ONLY',
        tone: 'neutral'
      }
    ],

    blockedActionPaths: [
      {
        label: '실행/변경 경로 계속 차단',
        description: '결과 요약 표시는 Worker, Queue, Adapter, Token Request, Naver API, DB Write로 이어지지 않으며 가격/재고 변경이나 submit, trigger 경로도 생성하지 않습니다.',
        summaryState: 'NO_EXECUTION_OR_MUTATION_PATH_WITHIN_STATUS_SUMMARY',
        tone: 'blocked'
      }
    ],

    misunderstandingPreventionItems: [
      {
        label: 'display-only 상태 요약과 실행 승인의 구분',
        description: '이 요약 화면은 기존 상태를 요약 표시할 뿐 상태를 변경하지 않으며, 재실행 승인이나 Live 준비 완료를 의미하지 않습니다.',
        summaryState: 'STATUS_SUMMARY_IS_NOT_EXECUTION_APPROVAL',
        tone: 'blocked'
      }
    ],

    finalNotice: 'display-only 상태 요약 확인 완료: 이 영역은 BatchJob 실행 결과 display-only status summary 화면입니다. 결과 요약은 Worker / Queue / Adapter / Token / Naver API / DB Write 또는 가격/재고 변경으로 이어지지 않습니다.'
  };
}
