import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';

export type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionStatus =
  | 'PRODUCT_IDENTITY_CONFIRMED'
  | 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED';

export type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionProductUpdateApiEntryDecision =
  | 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
  | 'BLOCKED';

export interface TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionCandidateSummary {
  path: string;
  maskedPreviewLast4: string | null;
  equalsTargetProductNo: boolean | null;
}

export interface TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView {
  taskId: 422;
  title: string;
  sourceTaskId: 421;
  targetProductNo: '6597910207';
  sourceLookupSucceeded: boolean;
  sourceHttpStatus: number | null;
  lookupRecallCount: number;
  previousCandidatePathCount: 7;
  additionalCandidatePathCount: number;
  matchedCandidatePathCount: number;
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
  decisionStatus: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionStatus;
  productUpdateApiEntryDecision: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionProductUpdateApiEntryDecision;
  blockedReason:
    | 'PRODUCT_IDENTITY_NOT_CONFIRMED_AFTER_ADDITIONAL_FIELD_EXPLORATION'
    | null;
  decisionReason: string;
  nextRecommendedTask: 'Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면';
  separateApprovalRequiredNotice: string;
  additionalCandidateSummaries: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionCandidateSummary[];
  actualNaverApiRecallInTask422: false;
  actualProductUpdateApiCall: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualRawResponseExposure: false;
  actualRawResponseStored: false;
  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualPostApiAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
  actualWorkerRun: false;
  actualQueueRun: false;
  actualRuntimeExecution: false;
}

const PREVIOUS_CANDIDATE_PATHS = [
  'smartstoreChannelProduct.channelProductNo',
  'smartstoreChannelProduct.id',
  'smartstoreChannelProduct.productNo',
  'smartstoreChannelProduct.originProductNo',
  'originProduct.originProductNo',
  'originProduct.id',
  'originProduct.productNo',
] as const;

const ADDITIONAL_CANDIDATE_PATHS = [
  'originProduct.deliveryInfo.claimDeliveryInfo.returnAddressId',
  'originProduct.deliveryInfo.claimDeliveryInfo.shippingAddressId',
  'originProduct.deliveryInfo.deliveryBundleGroupId',
  'originProduct.detailAttribute.naverShoppingSearchInfo.brandId',
  'originProduct.leafCategoryId',
] as const;

const SEPARATE_APPROVAL_REQUIRED_NOTICE =
  '상품 식별이 확정되더라도 상품 수정 API 진입과 실제 수정 호출은 별도 사용자 승인 없이는 허용되지 않습니다.';

export function buildTmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView(
  actualCollectionView: TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView
): TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView {
  const additionalCandidateSummaries = ADDITIONAL_CANDIDATE_PATHS.map((path) => {
    const candidate = actualCollectionView.candidateFieldResults.find((item) => item.path === path);

    return {
      path,
      maskedPreviewLast4: candidate?.maskedPreviewLast4 ?? null,
      equalsTargetProductNo: candidate?.equalsTargetProductNo ?? null,
    };
  });

  const matchedCandidatePathCount = (actualCollectionView.candidateFieldResults ?? []).filter(
    (candidate) => candidate.equalsTargetProductNo === true
  ).length;
  const identityConfirmed =
    actualCollectionView.productIdentityConfidenceScore === 100 && matchedCandidatePathCount > 0;
  const decisionStatus = identityConfirmed
    ? 'PRODUCT_IDENTITY_CONFIRMED'
    : 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED';
  const productUpdateApiEntryDecision = identityConfirmed
    ? 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
    : 'BLOCKED';
  const blockedReason = identityConfirmed
    ? null
    : 'PRODUCT_IDENTITY_NOT_CONFIRMED_AFTER_ADDITIONAL_FIELD_EXPLORATION';
  const decisionReason = identityConfirmed
    ? '추가 탐색 결과에서 equalsTargetProductNo=true 후보가 1개 이상 확인되고 confidence score가 100이므로 상품 식별을 확정했습니다. 단, 상품 수정 API 진입은 여전히 별도 승인이 필요합니다.'
    : 'Task 421 추가 탐색에서도 기존 7개 candidate path는 모두 비어 있었고, 추가 확인한 5개 path 역시 targetProductNo 6597910207과 일치하지 않아 상품 식별을 확정하지 못했습니다. 따라서 상품 수정 API 진입은 계속 BLOCKED로 유지합니다.';

  return {
    taskId: 422,
    title: 'Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면',
    sourceTaskId: 421,
    targetProductNo: '6597910207',
    sourceLookupSucceeded: actualCollectionView.success,
    sourceHttpStatus: actualCollectionView.httpStatus,
    lookupRecallCount: actualCollectionView.lookupRecallCount,
    previousCandidatePathCount: PREVIOUS_CANDIDATE_PATHS.length,
    additionalCandidatePathCount: additionalCandidateSummaries.length,
    matchedCandidatePathCount,
    productIdentityConfidenceScore: actualCollectionView.productIdentityConfidenceScore,
    productIdentityMatchConfirmed: identityConfirmed,
    decisionStatus,
    productUpdateApiEntryDecision,
    blockedReason,
    decisionReason,
    nextRecommendedTask: 'Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면',
    separateApprovalRequiredNotice: SEPARATE_APPROVAL_REQUIRED_NOTICE,
    additionalCandidateSummaries,
    actualNaverApiRecallInTask422: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawResponseExposure: false,
    actualRawResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualWorkerRun: false,
    actualQueueRun: false,
    actualRuntimeExecution: false,
  };
}
