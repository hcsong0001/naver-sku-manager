import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-actual-collection-view.service';
import {
  type TmsFastConnectionNaverProductIdentityConfirmationDecisionView,
} from './tms-fast-connection-naver-product-identity-confirmation-decision-view.service';

export interface TmsFastConnectionNaverProductIdentityFieldExplorationDesignCandidateGroup {
  groupId: string;
  title: string;
  purpose: string;
  allowedData: string[];
  forbiddenData: string[];
  requiresApiRecall: false;
  requiresSeparateApproval: true;
  expectedNextTask: string;
}

export interface TmsFastConnectionNaverProductIdentityFieldExplorationDesignView {
  taskId: 418;
  title: string;
  designStatus: 'FIELD_EXPLORATION_DESIGN_READY';
  targetProductNo: '6597910207';
  sourceDecisionStatus: 'PRODUCT_IDENTITY_CONFIRMED' | 'PRODUCT_IDENTITY_NOT_CONFIRMED';
  currentProductUpdateApiEntryDecision: 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL' | 'BLOCKED';
  previousCandidatePathCount: number;
  confirmedCandidatePathCount: number;
  explorationNeeded: boolean;
  explorationMode: 'DESIGN_ONLY';
  nextCollectionRequiresSeparateApproval: true;
  nextRecommendedTask: 'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet';
  guidance: string;
  candidateExplorationGroups: TmsFastConnectionNaverProductIdentityFieldExplorationDesignCandidateGroup[];
  actualApiRecallInTask418: false;
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
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
}

const FORBIDDEN_DATA = [
  'rawResponse',
  'secret',
  'token',
  'authorizationHeader',
  'signature',
  'fullProductName',
  'fullOptionName',
  'fullSellerManagementCode',
];

const NEXT_TASK = 'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet' as const;

export function buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
  actualCollectionView: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView,
  decisionView: TmsFastConnectionNaverProductIdentityConfirmationDecisionView
): TmsFastConnectionNaverProductIdentityFieldExplorationDesignView {
  const candidateExplorationGroups: TmsFastConnectionNaverProductIdentityFieldExplorationDesignCandidateGroup[] = [
    {
      groupId: 'top-level-product-channel-origin-key-rediscovery',
      title: 'top-level key 하위의 product/channel/origin 계열 key name 재탐색',
      purpose:
        'top-level response shape 아래에서 product, channel, origin 계열 key name만 다시 정리해 다음 승인 Task의 최소 탐색 범위를 설계합니다.',
      allowedData: ['topLevelKeyNames', 'nestedKeyNamesOnly', 'productOrChannelOrOriginNamePatterns'],
      forbiddenData: FORBIDDEN_DATA,
      requiresApiRecall: false,
      requiresSeparateApproval: true,
      expectedNextTask: NEXT_TASK,
    },
    {
      groupId: 'smartstore-channel-product-identifier-key-rediscovery',
      title: 'smartstoreChannelProduct 내부의 식별자 후보 key name 재탐색',
      purpose:
        'smartstoreChannelProduct 내부에서 channelProductNo, productNo, id와 유사한 식별자 key name 후보를 key-only로 설계합니다.',
      allowedData: ['smartstoreChannelProductNestedKeyNamesOnly', 'identifierLikeKeyNamesOnly'],
      forbiddenData: FORBIDDEN_DATA,
      requiresApiRecall: false,
      requiresSeparateApproval: true,
      expectedNextTask: NEXT_TASK,
    },
    {
      groupId: 'origin-product-identifier-key-rediscovery',
      title: 'originProduct 내부의 식별자 후보 key name 재탐색',
      purpose:
        'originProduct 내부에서 originProductNo, productNo, id와 유사한 식별자 key name 후보를 key-only로 설계합니다.',
      allowedData: ['originProductNestedKeyNamesOnly', 'identifierLikeKeyNamesOnly'],
      forbiddenData: FORBIDDEN_DATA,
      requiresApiRecall: false,
      requiresSeparateApproval: true,
      expectedNextTask: NEXT_TASK,
    },
    {
      groupId: 'nested-similar-name-exploration-design',
      title: 'channelProductNo / originProductNo / productNo / id와 유사한 이름의 nested key 탐색',
      purpose:
        '기존 candidate path 7개 외에 유사 이름 nested key를 어떤 순서로 탐색할지 설계만 수행합니다.',
      allowedData: ['similarIdentifierKeyNamesOnly', 'nestedPathNamePatternsOnly'],
      forbiddenData: FORBIDDEN_DATA,
      requiresApiRecall: false,
      requiresSeparateApproval: true,
      expectedNextTask: NEXT_TASK,
    },
    {
      groupId: 'masked-comparison-collection-rule-design',
      title: '다음 별도 승인 Task에서 masked last4 + equalsTargetProductNo boolean만 수집',
      purpose:
        '값 비교가 필요한 후보는 다음 승인 Task에서 masked last4와 equalsTargetProductNo boolean만 수집하도록 안전 경계를 설계합니다.',
      allowedData: ['maskedPreviewLast4Only', 'equalsTargetProductNoBooleanOnly', 'candidatePathExistsBooleanOnly'],
      forbiddenData: FORBIDDEN_DATA,
      requiresApiRecall: false,
      requiresSeparateApproval: true,
      expectedNextTask: NEXT_TASK,
    },
  ];

  return {
    taskId: 418,
    title: 'Task 418 - Naver 상품 식별 필드 추가 탐색 설계 화면',
    designStatus: 'FIELD_EXPLORATION_DESIGN_READY',
    targetProductNo: '6597910207',
    sourceDecisionStatus: decisionView.status,
    currentProductUpdateApiEntryDecision: 'BLOCKED',
    previousCandidatePathCount: actualCollectionView.candidatePathResults.length,
    confirmedCandidatePathCount: decisionView.confirmedCandidatePathCount,
    explorationNeeded: decisionView.status === 'PRODUCT_IDENTITY_NOT_CONFIRMED',
    explorationMode: 'DESIGN_ONLY',
    nextCollectionRequiresSeparateApproval: true,
    nextRecommendedTask: NEXT_TASK,
    guidance:
      '기존 candidate path 7개에서는 상품번호 일치 여부를 확인하지 못했으므로 상품 수정 API 진입은 계속 보류합니다. 다음 단계에서는 raw response 없이 key name과 masked comparison만 허용하는 추가 탐색 수집 승인 Packet이 필요합니다.',
    candidateExplorationGroups,
    actualApiRecallInTask418: false,
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
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
  };
}
