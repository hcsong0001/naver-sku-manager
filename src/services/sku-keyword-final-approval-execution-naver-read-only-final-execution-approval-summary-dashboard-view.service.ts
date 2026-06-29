export type NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED';

export type ReadOnlyChainItemResultStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'LOCKED';

export const NEXT_TASK_310_APPROVAL_PHRASE =
  'Task 310에서 Naver read-only 최종 실행 승인 후보 목록 화면 구현을 승인합니다. Task 309 요약 대시보드 결과를 기반으로 최종 실행 승인 후보 목록 구성을 승인합니다.';

export interface ReadOnlyChainSummaryInput {
  taskId: number;
  taskLabel: string;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
}

export interface ReadOnlyChainItem {
  taskId: number;
  taskLabel: string;
  status: ReadOnlyChainItemResultStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
}

export interface SummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalSummaryDashboardView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SUMMARY_DASHBOARD';
  taskId: 309;
  panelTitle: string;
  description: string;
  currentTaskNumber: 309;
  referenceTaskNumbers: readonly [308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  summaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus;
  readOnlyChainItems: readonly ReadOnlyChainItem[];
  summaryCards: readonly SummaryCard[];
  readyCount: number;
  partialReadyCount: number;
  blockedCount: number;
  lockedCount: number;
  totalItemCount: number;
  overallReady: boolean;
  overallPartialReady: boolean;
  overallBlocked: boolean;
  requiresSeparateTask310Approval: true;
  nextTaskApprovalPhrase: string;
  isReadOnlyExecutionApprovalGrantedInThisTask: false;
  isExecutionApprovalGranted: false;
  isExecutionExecutedInThisTask: false;
  isProductChangeApprovalGranted: false;
  isExecutionButtonAddedInThisTask: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
}

function deriveSummaryDashboardStatus(
  chainItems: ReadOnlyChainSummaryInput[],
): NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus {
  if (chainItems.some((i) => i.isBlocked)) return 'BLOCKED';
  if (chainItems.some((i) => i.isPartialReady)) return 'PARTIAL_READY';
  return 'READY';
}

export function buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView(input: {
  chainItems: ReadOnlyChainSummaryInput[];
}): NaverReadOnlyFinalExecutionApprovalSummaryDashboardView {
  const { chainItems } = input;

  const readyCount = chainItems.filter((i) => i.isReady).length;
  const partialReadyCount = chainItems.filter((i) => i.isPartialReady).length;
  const blockedCount = chainItems.filter((i) => i.isBlocked).length;
  const lockedCount = chainItems.filter((i) => i.isLocked).length;
  const totalItemCount = chainItems.length;

  const summaryDashboardStatus = deriveSummaryDashboardStatus(chainItems);
  const overallReady = summaryDashboardStatus === 'READY';
  const overallPartialReady = summaryDashboardStatus === 'PARTIAL_READY';
  const overallBlocked = summaryDashboardStatus === 'BLOCKED';

  const readOnlyChainItems: ReadOnlyChainItem[] = chainItems.map((item) => ({
    taskId: item.taskId,
    taskLabel: item.taskLabel,
    status: (item.isLocked
      ? 'LOCKED'
      : item.isBlocked
        ? 'BLOCKED'
        : item.isPartialReady
          ? 'PARTIAL_READY'
          : 'READY') as ReadOnlyChainItemResultStatus,
    isReady: item.isReady,
    isPartialReady: item.isPartialReady,
    isBlocked: item.isBlocked,
    isLocked: item.isLocked,
  }));

  const summaryCards: SummaryCard[] = [
    { label: '준비 완료', count: readyCount, cardType: 'READY' },
    { label: '부분 준비', count: partialReadyCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedCount, cardType: 'BLOCKED' },
    { label: '잠김', count: lockedCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SUMMARY_DASHBOARD',
    taskId: 309,
    panelTitle: 'Naver Read-Only 최종 실행 승인 요약 대시보드',
    description:
      'Task 296~308 read-only 검증 결과를 종합한 최종 실행 승인 준비 상태 요약입니다.',
    currentTaskNumber: 309,
    referenceTaskNumbers: [308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    summaryDashboardStatus,
    readOnlyChainItems,
    summaryCards,
    readyCount,
    partialReadyCount,
    blockedCount,
    lockedCount,
    totalItemCount,
    overallReady,
    overallPartialReady,
    overallBlocked,
    requiresSeparateTask310Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_310_APPROVAL_PHRASE,
    isReadOnlyExecutionApprovalGrantedInThisTask: false,
    isExecutionApprovalGranted: false,
    isExecutionExecutedInThisTask: false,
    isProductChangeApprovalGranted: false,
    isExecutionButtonAddedInThisTask: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
  };
}
