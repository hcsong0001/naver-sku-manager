import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-actual-collection-view.service';

export type ProductIdentityConfirmationDecisionStatus =
  | 'PRODUCT_IDENTITY_CONFIRMED'
  | 'PRODUCT_IDENTITY_NOT_CONFIRMED';

export type ProductUpdateApiEntryDecision =
  | 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
  | 'BLOCKED';

export type ProductIdentityConfirmationSafetyNoticeStatus =
  | 'BLOCKED'
  | 'CONFIRMED'
  | 'STILL_FORBIDDEN';

export interface ProductIdentityConfirmationDecisionSafetyNoticeItem {
  label: string;
  status: ProductIdentityConfirmationSafetyNoticeStatus;
  description: string;
}

export interface TmsFastConnectionNaverProductIdentityConfirmationDecisionView {
  taskId: 417;
  title: string;
  status: ProductIdentityConfirmationDecisionStatus;
  targetProductNo: '6597910207';
  sourceTaskId: 416;
  sourceCollectionExecuted: boolean;
  sourceLookupSucceeded: boolean;
  sourceHttpStatus: number | null;
  responseShapeKeys: string[];
  productIdentityConfidenceScore: number;
  productIdentityMatchConfirmed: boolean;
  confirmedCandidatePathCount: number;
  failedCandidatePathCount: number;
  productUpdateApiEntryDecision: ProductUpdateApiEntryDecision;
  blockedReason:
    | 'PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_SHAPE_AUGMENTATION'
    | null;
  decisionReason: string;
  nextAction: string;
  separateApprovalRequiredNotice: string;
  safetyNoticeItems: ProductIdentityConfirmationDecisionSafetyNoticeItem[];

  actualNaverApiRecallInTask417: false;
  actualProductUpdateApiCall: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualRawApiResponseExposure: false;
  actualRawApiResponseStored: false;
  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualFullProductNameExposure: false;
  actualFullOptionNameExposure: false;
  actualFullSellerManagementCodeExposure: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
  actualPostApiAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
}

const SEPARATE_APPROVAL_REQUIRED_NOTICE =
  '상품 식별이 확정되더라도 상품 수정 API 진입은 별도 사용자 승인 없이는 허용되지 않습니다.';

export function buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(
  actualCollectionView: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView
): TmsFastConnectionNaverProductIdentityConfirmationDecisionView {
  const confirmedCandidatePathCount = (actualCollectionView.candidatePathResults ?? []).filter(
    (candidate) => candidate.equalsTargetProductNo === true
  ).length;
  const failedCandidatePathCount =
    (actualCollectionView.candidatePathResults ?? []).length - confirmedCandidatePathCount;

  const identityConfirmed =
    actualCollectionView.productIdentityMatchConfirmed === true
    && actualCollectionView.productIdentityConfidenceScore === 100
    && confirmedCandidatePathCount > 0;

  const status: ProductIdentityConfirmationDecisionStatus = identityConfirmed
    ? 'PRODUCT_IDENTITY_CONFIRMED'
    : 'PRODUCT_IDENTITY_NOT_CONFIRMED';

  const productUpdateApiEntryDecision: ProductUpdateApiEntryDecision = identityConfirmed
    ? 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
    : 'BLOCKED';

  const blockedReason = identityConfirmed
    ? null
    : 'PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_SHAPE_AUGMENTATION';

  const decisionReason = identityConfirmed
    ? 'productIdentityMatchConfirmed가 true이고 confidence score가 100이며 equalsTargetProductNo=true 후보가 1개 이상 확인되어 상품 식별을 확정했습니다. 단, 상품 수정 API 진입은 여전히 별도 승인이 필요합니다.'
    : '상품 조회 API 호출은 성공했지만 상품번호 6597910207과 일치하는 식별 필드가 확인되지 않아 상품 식별을 확정하지 못했습니다. 따라서 상품 수정 API 진입은 계속 보류합니다.';

  const nextAction = identityConfirmed
    ? '상품 수정 API 진입 전 별도 승인 설계와 안전 게이트를 추가로 검토합니다.'
    : '추가 식별 필드 탐색 또는 별도 보강 설계가 필요합니다.';

  return {
    taskId: 417,
    title: 'Task 417 - Naver 상품 식별 확정 판단 화면',
    status,
    targetProductNo: '6597910207',
    sourceTaskId: 416,
    sourceCollectionExecuted: actualCollectionView.actualMaskedShapeAugmentationExecuted,
    sourceLookupSucceeded: actualCollectionView.success,
    sourceHttpStatus: actualCollectionView.httpStatusCode,
    responseShapeKeys: actualCollectionView.responseShapeKeys,
    productIdentityConfidenceScore: actualCollectionView.productIdentityConfidenceScore,
    productIdentityMatchConfirmed: actualCollectionView.productIdentityMatchConfirmed,
    confirmedCandidatePathCount,
    failedCandidatePathCount,
    productUpdateApiEntryDecision,
    blockedReason,
    decisionReason,
    nextAction,
    separateApprovalRequiredNotice: SEPARATE_APPROVAL_REQUIRED_NOTICE,
    safetyNoticeItems: [
      {
        label: '상품 수정 API',
        status: productUpdateApiEntryDecision === 'BLOCKED' ? 'BLOCKED' : 'CONFIRMED',
        description:
          productUpdateApiEntryDecision === 'BLOCKED'
            ? '상품 식별이 확정되지 않아 상품 수정 API 진입을 계속 차단합니다.'
            : '상품 식별은 확정되었지만 상품 수정 API 진입은 별도 사용자 승인 전까지 계속 금지됩니다.',
      },
      {
        label: '가격/재고 변경',
        status: 'STILL_FORBIDDEN',
        description: 'Task 417은 판단 화면만 추가하며 가격 변경과 재고 변경은 계속 금지됩니다.',
      },
      {
        label: 'DB write',
        status: 'STILL_FORBIDDEN',
        description: 'Task 417에서는 DB write, upsert, update를 수행하지 않습니다.',
      },
      {
        label: 'raw response',
        status: 'STILL_FORBIDDEN',
        description: 'raw response 전체 표시와 저장은 계속 금지되며 마스킹 summary만 참조합니다.',
      },
      {
        label: 'secret/token/header/signature',
        status: 'STILL_FORBIDDEN',
        description: 'secret, token, Authorization header, signature 노출은 계속 금지됩니다.',
      },
    ],

    actualNaverApiRecallInTask417: false,
    actualProductUpdateApiCall: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualRawApiResponseExposure: false,
    actualRawApiResponseStored: false,
    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualFullProductNameExposure: false,
    actualFullOptionNameExposure: false,
    actualFullSellerManagementCodeExposure: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    actualPostApiAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
  };
}
