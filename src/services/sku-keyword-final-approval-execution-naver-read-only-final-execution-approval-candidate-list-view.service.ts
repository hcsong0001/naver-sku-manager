import { NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-summary-dashboard-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateListStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY';

export type CandidateItemStatus = 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';

export const NEXT_TASK_311_APPROVAL_PHRASE =
  'Task 311에서 Naver read-only 최종 실행 승인 후보 상세 검토 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 310 후보 목록에서 선택된 SKU/상품 후보의 상세 정보를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface BatchJobItemForCandidateList {
  id: string | number;
  status: string;
  calculationType?: string | null;
  targetType?: string | null;
  targetId?: string | number | null;
  candidateSummary?: {
    sku?: unknown;
    productName?: unknown;
    targetType?: unknown;
    changeType?: unknown;
  } | null;
  dryRunSummary?: {
    riskLevel?: unknown;
    warnings?: unknown;
    blockedReasons?: unknown;
  } | null;
}

export interface CandidateItem {
  candidateId: string;
  displayOrder: number;
  displayName: string;
  skuDisplayLabel: string;
  naverProductDisplayLabel: string;
  storeDisplayLabel: string;
  sourceItemStatus: string;
  candidateStatus: CandidateItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  warningCount: number;
  errorCount: number;
  message: string;
  priceStockRawValuesExcluded: true;
  executionPayloadExcluded: true;
  rawApiResponseExcluded: true;
  isDisplayOnly: true;
}

export interface CandidateSummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateListView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_VIEW';
  taskId: 310;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 310;
  referenceTaskNumbers: readonly [309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  sourceSummaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus;
  candidateListStatus: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
  candidateItems: readonly CandidateItem[];
  candidateSummaryCards: readonly CandidateSummaryCard[];
  readyCandidateCount: number;
  partialReadyCandidateCount: number;
  blockedCandidateCount: number;
  lockedCandidateCount: number;
  totalCandidateCount: number;
  candidateListReady: boolean;
  candidateListPartialReady: boolean;
  candidateListBlocked: boolean;
  candidateListEmpty: boolean;
  isReadOnlyCandidateList: true;
  requiresSeparateTask311Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritePerformed: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

const CANDIDATE_LIST_STATUS_BY_DASHBOARD_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus,
  NaverReadOnlyFinalExecutionApprovalCandidateListStatus
> = {
  READY: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY',
  PARTIAL_READY: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY',
  BLOCKED: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED',
};

function deriveCandidateListStatus(
  summaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus,
  itemCount: number,
): NaverReadOnlyFinalExecutionApprovalCandidateListStatus {
  if (itemCount === 0) return 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY';
  return CANDIDATE_LIST_STATUS_BY_DASHBOARD_STATUS[summaryDashboardStatus];
}

function deriveCandidateItemStatus(
  item: BatchJobItemForCandidateList,
  summaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus,
): CandidateItemStatus {
  if (summaryDashboardStatus === 'BLOCKED') return 'BLOCKED';

  const blockedReasonsCount = Array.isArray(item.dryRunSummary?.blockedReasons)
    ? (item.dryRunSummary.blockedReasons as unknown[]).length
    : 0;
  const warningsCount = Array.isArray(item.dryRunSummary?.warnings)
    ? (item.dryRunSummary.warnings as unknown[]).length
    : 0;

  if (blockedReasonsCount > 0 || item.dryRunSummary?.riskLevel === 'HIGH') return 'BLOCKED';
  if (warningsCount > 0 || item.dryRunSummary?.riskLevel === 'MEDIUM') return 'PARTIAL_READY';

  return summaryDashboardStatus === 'PARTIAL_READY' ? 'PARTIAL_READY' : 'READY';
}

export function buildNaverReadOnlyFinalExecutionApprovalCandidateListView(input: {
  summaryDashboard: { summaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus };
  items: BatchJobItemForCandidateList[];
}): NaverReadOnlyFinalExecutionApprovalCandidateListView {
  const { summaryDashboard, items } = input;
  const { summaryDashboardStatus } = summaryDashboard;

  const candidateItems: CandidateItem[] = items.map((item, index) => {
    const candidateStatus = deriveCandidateItemStatus(item, summaryDashboardStatus);
    const isReady = candidateStatus === 'READY';
    const isPartialReady = candidateStatus === 'PARTIAL_READY';
    const isBlocked = candidateStatus === 'BLOCKED';
    const isLocked = candidateStatus === 'LOCKED';

    const warningCount = Array.isArray(item.dryRunSummary?.warnings)
      ? (item.dryRunSummary.warnings as unknown[]).length
      : 0;
    const errorCount = Array.isArray(item.dryRunSummary?.blockedReasons)
      ? (item.dryRunSummary.blockedReasons as unknown[]).length
      : 0;

    const skuDisplay =
      item.candidateSummary?.sku != null ? String(item.candidateSummary.sku) : `item-${item.id}`;
    const productDisplay =
      item.candidateSummary?.productName != null
        ? String(item.candidateSummary.productName)
        : '-';
    const storeDisplay = item.calculationType
      ? String(item.calculationType)
      : item.targetType
        ? String(item.targetType)
        : '-';

    const message = isBlocked
      ? '차단됨 - 실행 후보에서 제외'
      : isPartialReady
        ? '부분 준비 - 경고 항목 확인 필요'
        : isLocked
          ? '잠김 - 사전 조건 미충족'
          : '준비 완료';

    return {
      candidateId: String(item.id),
      displayOrder: index + 1,
      displayName: productDisplay !== '-' ? productDisplay : skuDisplay,
      skuDisplayLabel: skuDisplay,
      naverProductDisplayLabel: productDisplay,
      storeDisplayLabel: storeDisplay,
      sourceItemStatus: String(item.status),
      candidateStatus,
      isReady,
      isPartialReady,
      isBlocked,
      isLocked,
      warningCount,
      errorCount,
      message,
      priceStockRawValuesExcluded: true,
      executionPayloadExcluded: true,
      rawApiResponseExcluded: true,
      isDisplayOnly: true,
    };
  });

  const readyCandidateCount = candidateItems.filter((i) => i.isReady).length;
  const partialReadyCandidateCount = candidateItems.filter((i) => i.isPartialReady).length;
  const blockedCandidateCount = candidateItems.filter((i) => i.isBlocked).length;
  const lockedCandidateCount = candidateItems.filter((i) => i.isLocked).length;
  const totalCandidateCount = candidateItems.length;

  const candidateListStatus = deriveCandidateListStatus(summaryDashboardStatus, totalCandidateCount);
  const candidateListReady =
    candidateListStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY';
  const candidateListPartialReady =
    candidateListStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY';
  const candidateListBlocked =
    candidateListStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED';
  const candidateListEmpty =
    candidateListStatus === 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY';

  const candidateSummaryCards: CandidateSummaryCard[] = [
    { label: '준비 완료', count: readyCandidateCount, cardType: 'READY' },
    { label: '부분 준비', count: partialReadyCandidateCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedCandidateCount, cardType: 'BLOCKED' },
    { label: '잠김', count: lockedCandidateCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_VIEW',
    taskId: 310,
    taskName: 'Naver Read-Only Final Execution Approval Candidate List Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 목록',
    description:
      'Task 309 Summary Dashboard 결과를 바탕으로 최종 실행 승인 후보를 read-only로 표시합니다. 이 화면은 실제 승인, 실행, 상품 변경이 아닙니다.',
    currentTaskNumber: 310,
    referenceTaskNumbers: [309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    sourceSummaryDashboardStatus: summaryDashboardStatus,
    candidateListStatus,
    candidateItems,
    candidateSummaryCards,
    readyCandidateCount,
    partialReadyCandidateCount,
    blockedCandidateCount,
    lockedCandidateCount,
    totalCandidateCount,
    candidateListReady,
    candidateListPartialReady,
    candidateListBlocked,
    candidateListEmpty,
    isReadOnlyCandidateList: true,
    requiresSeparateTask311Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_311_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritePerformed: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
