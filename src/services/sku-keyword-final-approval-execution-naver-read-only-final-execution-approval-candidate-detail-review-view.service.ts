import {
  NaverReadOnlyFinalExecutionApprovalCandidateListStatus,
  CandidateItemStatus,
  CandidateItem,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-list-view.service';

export type NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus =
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED'
  | 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY';

export const NEXT_TASK_312_APPROVAL_PHRASE =
  'Task 312에서 Naver read-only 최종 실행 승인 후보 상세 검토 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 Task 311 후보 상세 검토 결과를 read-only로 인증하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export const SAFE_DISPLAY_FIELDS: readonly string[] = [
  'sku',
  'productName',
  'calculationType',
  'targetType',
  'riskLevel',
  'warningCount',
  'errorCount',
] as const;

export const EXCLUDED_FIELDS: readonly string[] = [
  'priceStockRawValues',
  'executionPayload',
  'requestPayload',
  'rawApiResponse',
  'token',
  'auth',
  'signature',
  'authorization',
  'envValues',
] as const;

export interface CandidateDetailItem {
  candidateId: string;
  displayOrder: number;
  displayName: string;
  skuDisplayLabel: string;
  naverProductDisplayLabel: string;
  storeDisplayLabel: string;
  sourceCandidateStatus: CandidateItemStatus;
  detailReviewStatus: CandidateItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  warningCount: number;
  errorCount: number;
  reviewMessage: string;
  safeDisplayFields: readonly string[];
  excludedFields: readonly string[];
  priceStockRawValuesExcluded: true;
  executionPayloadExcluded: true;
  rawApiResponseExcluded: true;
  tokenOrAuthExcluded: true;
  isDisplayOnly: true;
}

export interface DetailSummaryCard {
  label: string;
  count: number;
  cardType: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'LOCKED';
}

export interface NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView {
  status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_VIEW';
  taskId: 311;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 311;
  referenceTaskNumbers: readonly [310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateListStatus: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
  candidateDetailReviewStatus: NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus;
  candidateDetailItems: readonly CandidateDetailItem[];
  detailSummaryCards: readonly DetailSummaryCard[];
  readyDetailCount: number;
  partialReadyDetailCount: number;
  blockedDetailCount: number;
  lockedDetailCount: number;
  totalDetailCount: number;
  candidateDetailReviewReady: boolean;
  candidateDetailReviewPartialReady: boolean;
  candidateDetailReviewBlocked: boolean;
  candidateDetailReviewEmpty: boolean;
  isReadOnlyCandidateDetailReview: true;
  requiresSeparateTask312Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  candidateSelectionSubmitAdded: false;
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

export const DETAIL_REVIEW_STATUS_BY_CANDIDATE_LIST_STATUS: Record<
  NaverReadOnlyFinalExecutionApprovalCandidateListStatus,
  NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus
> = {
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_PARTIAL_READY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_BLOCKED:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED',
  NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_LIST_EMPTY:
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY',
};

export function buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView(input: {
  candidateList: {
    candidateListStatus: NaverReadOnlyFinalExecutionApprovalCandidateListStatus;
    candidateItems: readonly CandidateItem[];
    readyCandidateCount: number;
    partialReadyCandidateCount: number;
    blockedCandidateCount: number;
    lockedCandidateCount: number;
    totalCandidateCount: number;
  };
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView {
  const { candidateList } = input;
  const { candidateListStatus } = candidateList;

  const candidateDetailReviewStatus =
    DETAIL_REVIEW_STATUS_BY_CANDIDATE_LIST_STATUS[candidateListStatus];

  const candidateDetailItems: CandidateDetailItem[] = candidateList.candidateItems.map((item) => {
    const reviewMessage = item.isBlocked
      ? '차단됨 - 상세 검토 불가'
      : item.isPartialReady
        ? '부분 준비 - 경고 항목 상세 확인 필요'
        : item.isLocked
          ? '잠김 - 사전 조건 미충족'
          : '준비 완료 - 상세 검토 통과';

    return {
      candidateId: item.candidateId,
      displayOrder: item.displayOrder,
      displayName: item.displayName,
      skuDisplayLabel: item.skuDisplayLabel,
      naverProductDisplayLabel: item.naverProductDisplayLabel,
      storeDisplayLabel: item.storeDisplayLabel,
      sourceCandidateStatus: item.candidateStatus,
      detailReviewStatus: item.candidateStatus,
      isReady: item.isReady,
      isPartialReady: item.isPartialReady,
      isBlocked: item.isBlocked,
      isLocked: item.isLocked,
      warningCount: item.warningCount,
      errorCount: item.errorCount,
      reviewMessage,
      safeDisplayFields: SAFE_DISPLAY_FIELDS,
      excludedFields: EXCLUDED_FIELDS,
      priceStockRawValuesExcluded: true,
      executionPayloadExcluded: true,
      rawApiResponseExcluded: true,
      tokenOrAuthExcluded: true,
      isDisplayOnly: true,
    };
  });

  const readyDetailCount = candidateDetailItems.filter((i) => i.isReady).length;
  const partialReadyDetailCount = candidateDetailItems.filter((i) => i.isPartialReady).length;
  const blockedDetailCount = candidateDetailItems.filter((i) => i.isBlocked).length;
  const lockedDetailCount = candidateDetailItems.filter((i) => i.isLocked).length;
  const totalDetailCount = candidateDetailItems.length;

  const candidateDetailReviewReady =
    candidateDetailReviewStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_READY';
  const candidateDetailReviewPartialReady =
    candidateDetailReviewStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY';
  const candidateDetailReviewBlocked =
    candidateDetailReviewStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_BLOCKED';
  const candidateDetailReviewEmpty =
    candidateDetailReviewStatus ===
    'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_EMPTY';

  const detailSummaryCards: DetailSummaryCard[] = [
    { label: '준비 완료', count: readyDetailCount, cardType: 'READY' },
    { label: '부분 준비', count: partialReadyDetailCount, cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: blockedDetailCount, cardType: 'BLOCKED' },
    { label: '잠김', count: lockedDetailCount, cardType: 'LOCKED' },
  ];

  return {
    status: 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_CANDIDATE_DETAIL_REVIEW_VIEW',
    taskId: 311,
    taskName: 'Naver Read-Only Final Execution Approval Candidate Detail Review Screen Flow',
    panelTitle: 'Naver Read-Only 최종 실행 승인 후보 상세 검토',
    description:
      'Task 310 후보 목록의 각 후보를 read-only로 상세 검토합니다. 이 화면은 실제 승인, 실행, 상품 변경이 아닙니다.',
    currentTaskNumber: 311,
    referenceTaskNumbers: [310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateListStatus: candidateListStatus,
    candidateDetailReviewStatus,
    candidateDetailItems,
    detailSummaryCards,
    readyDetailCount,
    partialReadyDetailCount,
    blockedDetailCount,
    lockedDetailCount,
    totalDetailCount,
    candidateDetailReviewReady,
    candidateDetailReviewPartialReady,
    candidateDetailReviewBlocked,
    candidateDetailReviewEmpty,
    isReadOnlyCandidateDetailReview: true,
    requiresSeparateTask312Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_312_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    candidateSelectionSubmitAdded: false,
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
