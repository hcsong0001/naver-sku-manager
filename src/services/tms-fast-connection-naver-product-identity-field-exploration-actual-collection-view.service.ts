import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView,
} from './tms-fast-connection-naver-product-identity-field-exploration-final-gate-view.service';
import {
  type TmsNaverProductIdentityFieldExplorationCandidateFieldResult,
  type TmsNaverProductIdentityFieldExplorationKeyNameGroup,
  type TmsNaverProductIdentityFieldExplorationSummary,
} from './tms-naver-product-identity-field-exploration.harness';

export type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'BLOCKED';

export type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionProductUpdateApiEntryDecision =
  | 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
  | 'BLOCKED';

export interface TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView {
  taskId: 421;
  title: string;
  sourceFinalGateStatus: TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView['finalGateStatus'];
  collectionStatus: TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionStatus;
  explicitSeparateUserApprovalConfirmed: true;
  requiredApprovalPhrase: 'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.';
  targetProductNo: '6597910207';
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  maxLookupRecallCount: 1;
  executed: boolean;
  lookupRecallCount: number;
  httpStatus: number | null;
  success: boolean;
  topLevelKeys: string[];
  exploredKeyNameGroups: TmsNaverProductIdentityFieldExplorationKeyNameGroup[];
  candidateFieldResults: TmsNaverProductIdentityFieldExplorationCandidateFieldResult[];
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
  productUpdateApiEntryDecision: TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionProductUpdateApiEntryDecision;
  nextRecommendedTask: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면';
  guidance: string;
  sanitizedErrorMessage: string | null;
  actualProductUpdateApiCall: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualRawResponseExposure: false;
  actualRawResponseStored: false;
  actualFullProductNameExposure: false;
  actualFullOptionNameExposure: false;
  actualFullSellerManagementCodeExposure: false;
  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualRepeatedLookup: false;
  actualDifferentProductLookup: false;
  actualWorkerRun: false;
  actualQueueRun: false;
  actualRuntimeExecution: false;
  actualPostApiAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
}

const REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.' as const;

function resolveCollectionStatus(
  summary?: TmsNaverProductIdentityFieldExplorationSummary
): TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionStatus {
  if (!summary || !summary.executed) {
    return 'BLOCKED';
  }

  return summary.success ? 'COMPLETED' : 'FAILED';
}

function resolveProductIdentityMatchConfirmed(
  summary?: TmsNaverProductIdentityFieldExplorationSummary
): boolean {
  if (!summary) {
    return false;
  }

  return (
    summary.productIdentityConfidenceScore === 100 &&
    summary.candidateFieldResults.some((candidate) => candidate.equalsTargetProductNo === true)
  );
}

export function buildTmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView(
  finalGateView: TmsFastConnectionNaverProductIdentityFieldExplorationFinalGateView,
  summary?: TmsNaverProductIdentityFieldExplorationSummary
): TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView {
  const productIdentityMatchConfirmed = resolveProductIdentityMatchConfirmed(summary);
  const productUpdateApiEntryDecision = productIdentityMatchConfirmed
    ? 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
    : 'BLOCKED';

  return {
    taskId: 421,
    title: 'Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집',
    sourceFinalGateStatus: finalGateView.finalGateStatus,
    collectionStatus: resolveCollectionStatus(summary),
    explicitSeparateUserApprovalConfirmed: true,
    requiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,
    targetProductNo: '6597910207',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    maxLookupRecallCount: 1,
    executed: summary?.executed ?? false,
    lookupRecallCount: summary?.lookupRecallCount ?? 0,
    httpStatus: summary?.httpStatus ?? null,
    success: summary?.success ?? false,
    topLevelKeys: summary?.topLevelKeys ?? [],
    exploredKeyNameGroups: summary?.exploredKeyNameGroups ?? [],
    candidateFieldResults: summary?.candidateFieldResults ?? [],
    productIdentityConfidenceScore: summary?.productIdentityConfidenceScore ?? 0,
    productIdentityMatchConfirmed,
    productUpdateApiEntryDecision,
    nextRecommendedTask: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면',
    guidance:
      'Task 421은 승인된 범위 안에서 상품번호 6597910207에 대해 상품 조회 API를 최대 1회만 재조회하고, raw response 전체는 숨긴 채 key name과 masked comparison summary만 read-only로 고정하는 단계입니다.',
    sanitizedErrorMessage: summary?.sanitizedErrorMessage ?? null,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualFullProductNameExposure: false,
    actualFullOptionNameExposure: false,
    actualFullSellerManagementCodeExposure: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRepeatedLookup: false,
    actualDifferentProductLookup: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
  };
}
