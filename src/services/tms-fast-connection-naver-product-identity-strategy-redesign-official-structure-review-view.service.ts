import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-final-gate-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-view.service';

export type TmsFastConnectionNaverProductIdentityOfficialStructureReviewStatus =
  | 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED'
  | 'OFFICIAL_STRUCTURE_REVIEW_NOT_STARTED';

export interface TmsFastConnectionNaverProductIdentityOfficialStructureReviewItem {
  reviewId: string;
  title: string;
  currentEvidence: string;
  officialStructureInterpretation: string;
  strategyDecision: string;
  riskIfMisinterpreted: string;
}

export interface TmsFastConnectionNaverProductIdentityOfficialStructureNextStrategyCandidate {
  candidateId: string;
  description: string;
  recommended: boolean;
}

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView {
  taskId: 426;
  title: string;
  reviewStatus: TmsFastConnectionNaverProductIdentityOfficialStructureReviewStatus;
  userApprovalPhrase: 'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.';
  targetProductNo: '6597910207';
  sourceLookupSucceeded: true;
  sourceResponseTopLevelKeys: ['originProduct', 'smartstoreChannelProduct'];
  previousCandidatePathCount: 7;
  previousCandidateAllExistsFalse: true;
  additionalCandidatePathCount: 5;
  additionalCandidateAllEqualsTargetFalse: true;
  additionalCandidatePaths: string[];
  randomFieldExplorationRecommended: false;
  officialStructureReviewCompleted: true;
  apiRecallPerformed: false;
  productUpdateApiCalled: false;
  productUpdateApiEntryDecision: 'BLOCKED';
  reviewItems: TmsFastConnectionNaverProductIdentityOfficialStructureReviewItem[];
  strategyConclusion: string;
  nextStrategyCandidates: TmsFastConnectionNaverProductIdentityOfficialStructureNextStrategyCandidate[];
  nextRecommendedTask: 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면';
  actualNaverApiCall: false;
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

const ADDITIONAL_CANDIDATE_PATHS = [
  'originProduct.deliveryInfo.claimDeliveryInfo.returnAddressId',
  'originProduct.deliveryInfo.claimDeliveryInfo.shippingAddressId',
  'originProduct.deliveryInfo.deliveryBundleGroupId',
  'originProduct.detailAttribute.naverShoppingSearchInfo.brandId',
  'originProduct.leafCategoryId',
];

const REVIEW_ITEMS: TmsFastConnectionNaverProductIdentityOfficialStructureReviewItem[] = [
  {
    reviewId: 'R1',
    title: '조회 API 요청에 사용한 상품번호 6597910207의 의미',
    currentEvidence:
      'Task 409에서 상품번호 6597910207로 조회 API를 호출했고 HTTP 200을 받았다. 그러나 응답 내부에서 이 값과 일치하는 필드를 찾지 못했다.',
    officialStructureInterpretation:
      'Naver Commerce API 상품 조회 경로에 사용하는 번호는 통상 channelProductNo(스마트스토어 채널 상품번호)다. 이 번호는 요청 식별에만 사용되며 응답 내부 특정 필드에 그대로 반환되지 않는 구조일 수 있다.',
    strategyDecision:
      '6597910207은 채널 상품번호(channelProductNo)로 해석하는 것이 공식 구조와 일치한다. 수정 API 진입 시에도 동일 channelProductNo를 경로 파라미터로 사용하는지 별도 확인이 필요하다.',
    riskIfMisinterpreted:
      '이 번호를 originProductNo 또는 productNo로 오해하면 수정 API에서 잘못된 파라미터를 전달해 실패하거나 다른 상품을 수정할 수 있다.',
  },
  {
    reviewId: 'R2',
    title: '응답 top-level key originProduct의 역할',
    currentEvidence:
      'Task 409 및 Task 421에서 응답 top-level key로 originProduct가 확인됐다. originProduct 하위 필드들(originProductNo, id, productNo 등)은 모두 exists false였다.',
    officialStructureInterpretation:
      'originProduct는 스마트스토어 이외 판매채널 연동 없이 생성된 상품의 경우 비어 있거나 일부 필드만 포함된다. 상품 생성 방식에 따라 originProductNo가 없을 수 있다.',
    strategyDecision:
      '이 상품은 originProduct 기반 식별보다 smartstoreChannelProduct 기반 식별이 더 적합할 가능성이 높다. originProduct.id 등이 응답에 없다면 다른 방식으로 식별해야 한다.',
    riskIfMisinterpreted:
      'originProduct를 반드시 채워져야 하는 필드로 가정하고 수정 API를 진행하면 null 값으로 잘못된 요청을 보낼 수 있다.',
  },
  {
    reviewId: 'R3',
    title: '응답 top-level key smartstoreChannelProduct의 역할',
    currentEvidence:
      'Task 409 및 Task 421에서 응답 top-level key로 smartstoreChannelProduct가 확인됐다. 하위 필드 channelProductNo, id 등은 모두 exists false였다.',
    officialStructureInterpretation:
      'smartstoreChannelProduct는 스마트스토어 채널 상품의 메타데이터를 담는다. channelProductNo가 응답에 없는 것은 이 필드가 조회 요청의 경로 파라미터로만 사용되고 응답 body에는 포함되지 않는 구조일 수 있다.',
    strategyDecision:
      'smartstoreChannelProduct 내부에서 수정 API에 필요한 식별자(예: id, channelProductNo)가 어떻게 제공되는지 공식 문서를 기반으로 재확인해야 한다.',
    riskIfMisinterpreted:
      '응답 내부에 channelProductNo가 없다고 해서 이 번호가 수정 API 진입에 불필요하다고 단정하면 수정 API 설계 단계에서 필수 파라미터를 누락할 수 있다.',
  },
  {
    reviewId: 'R4',
    title: 'channelProductNo / originProductNo / productNo / id 후보 관계',
    currentEvidence:
      '기존 7개 candidate path(channelProductNo, id, productNo, originProductNo 포함) 모두 exists false였다. 이 필드들이 응답에 없는 이유가 명확하지 않다.',
    officialStructureInterpretation:
      'Naver Commerce API 공식 구조에서 channelProductNo는 경로 파라미터로 사용되고, 응답에는 다른 이름이나 다른 위치에 동등한 값이 제공될 수 있다. originProductNo는 멀티채널 상품에만 존재한다. productNo는 API 버전에 따라 이름이 달라질 수 있다.',
    strategyDecision:
      '이 네 가지 후보 필드 중 현재 상품에 적용되는 실제 식별자가 무엇인지는 공식 API 스키마나 예시 응답 문서를 통해 검증해야 한다. 현재 응답에서 모두 비어 있다는 사실은 API 버전 또는 상품 타입 차이일 수 있다.',
    riskIfMisinterpreted:
      '이 후보들이 모두 없다고 해서 응답 자체에 식별 정보가 없다고 단정하면 수정 API 설계를 포기하는 오류를 범할 수 있다.',
  },
  {
    reviewId: 'R5',
    title: 'Task 421에서 탐색된 추가 5개 값이 식별자로 부적합한 이유',
    currentEvidence:
      'Task 421에서 확인된 returnAddressId, shippingAddressId, deliveryBundleGroupId, brandId, leafCategoryId는 exists true였지만 값이 6597910207과 다르다.',
    officialStructureInterpretation:
      '이 5개 필드는 배송 주소 ID, 묶음 배송 그룹 ID, 브랜드 ID, 카테고리 ID로 상품 식별 목적의 필드가 아니다. 이 값들을 수정 API 진입 식별자로 사용하는 것은 공식 구조상 부적합하다.',
    strategyDecision:
      '이 5개 필드를 상품 식별자로 사용하는 전략은 폐기한다. 무작위 nested field 탐색도 중단한다.',
    riskIfMisinterpreted:
      '이 필드들을 식별자로 오해하고 수정 API에 전달하면 API 오류가 발생하거나 잘못된 상품 속성이 변경될 수 있다.',
  },
  {
    reviewId: 'R6',
    title: '수정 API 진입 전 필요한 최소 식별 근거',
    currentEvidence:
      '현재까지의 탐색 결과로는 수정 API 진입에 필요한 식별자가 확정되지 않았다. productUpdateApiEntryDecision은 BLOCKED 상태다.',
    officialStructureInterpretation:
      'Naver Commerce API 수정 API는 통상 경로 파라미터로 channelProductNo 또는 originProductNo를 요구한다. 조회에 사용한 번호와 동일 번호를 수정에도 사용할 수 있는지 공식 문서에서 명시적으로 확인해야 한다.',
    strategyDecision:
      '수정 API endpoint의 요구 파라미터를 공식 문서 기반으로 명확히 정의하기 전까지는 수정 API 진입을 허용하지 않는다. productUpdateApiEntryDecision은 BLOCKED를 유지한다.',
    riskIfMisinterpreted:
      '식별 근거 없이 수정 API를 호출하면 실패하거나 예상치 못한 상품에 영향을 줄 수 있다.',
  },
  {
    reviewId: 'R7',
    title: '다음 안전 수집 또는 판단 방향',
    currentEvidence:
      '무작위 nested field 탐색은 비효율적이며 공식 구조 기반 전략이 필요하다고 Task 423에서 판단됐다. Task 425 Final Gate를 통해 전략 재설계가 공식 승인됐다.',
    officialStructureInterpretation:
      '(A) 조회 경로 파라미터(channelProductNo)를 수정 API에도 동일하게 사용 가능한지 공식 검토, (B) smartstoreChannelProduct 또는 originProduct 내 식별자가 생략/마스킹된 구조인지 검토, (C) 수정 API endpoint 요구 파라미터 별도 검토, (D) 수정 API 요청 payload 생성 전용 read-only 설계 화면 먼저 구성.',
    strategyDecision:
      '다음 Task에서 이 네 가지 후보 전략 중 우선순위를 판단한다. 현재는 어떤 수집이나 수정도 실행하지 않는다.',
    riskIfMisinterpreted:
      '전략 없이 추가 탐색을 계속하면 불필요한 API 호출이 늘어나고 식별 미확정 상태가 반복될 수 있다.',
  },
];

const NEXT_STRATEGY_CANDIDATES: TmsFastConnectionNaverProductIdentityOfficialStructureNextStrategyCandidate[] = [
  {
    candidateId: 'A',
    description:
      '조회 API 경로에 사용한 channelProductNo(6597910207) 자체를 수정 API 식별자로 사용할 수 있는지 공식 구조 기준으로 검토',
    recommended: true,
  },
  {
    candidateId: 'B',
    description:
      'smartstoreChannelProduct 또는 originProduct 내부 식별자가 응답에서 생략/마스킹/다른 의미로 제공되는지 검토',
    recommended: false,
  },
  {
    candidateId: 'C',
    description:
      '수정 API endpoint가 요구하는 path parameter / body identifier를 별도 검토',
    recommended: false,
  },
  {
    candidateId: 'D',
    description:
      '실제 수정 API 호출 전, 수정 API 요청 payload 생성 전용 read-only 설계 화면을 먼저 만든다',
    recommended: false,
  },
];

const STRATEGY_CONCLUSION =
  '무작위 nested field 탐색을 중단한다. 상품번호 6597910207은 조회 API에서 channelProductNo로 유효하게 사용됐지만 응답 내부에서 이 값과 일치하는 필드를 확인하지 못했다. 수정 API 진입 전 공식 구조 기준으로 필요한 식별자를 재정의해야 하며, 현재 증거만으로는 수정 API 진입이 불가하다. productUpdateApiEntryDecision은 BLOCKED를 유지한다.';

export function buildTmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView(
  finalGateView: TmsFastConnectionNaverProductIdentityStrategyRedesignFinalGateView,
  _actualCollectionView: TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
  _resultDecisionView: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
  _strategyRedesignView: TmsFastConnectionNaverProductIdentityStrategyRedesignView
): TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView {
  const reviewStatus: TmsFastConnectionNaverProductIdentityOfficialStructureReviewStatus =
    finalGateView.finalGateStatus === 'WAITING_FOR_SEPARATE_USER_APPROVAL'
      ? 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED'
      : 'OFFICIAL_STRUCTURE_REVIEW_NOT_STARTED';

  return {
    taskId: 426,
    title: 'Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토',
    reviewStatus,
    userApprovalPhrase: 'Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.',
    targetProductNo: '6597910207',
    sourceLookupSucceeded: true,
    sourceResponseTopLevelKeys: ['originProduct', 'smartstoreChannelProduct'],
    previousCandidatePathCount: 7,
    previousCandidateAllExistsFalse: true,
    additionalCandidatePathCount: 5,
    additionalCandidateAllEqualsTargetFalse: true,
    additionalCandidatePaths: ADDITIONAL_CANDIDATE_PATHS,
    randomFieldExplorationRecommended: false,
    officialStructureReviewCompleted: true,
    apiRecallPerformed: false,
    productUpdateApiCalled: false,
    productUpdateApiEntryDecision: 'BLOCKED',
    reviewItems: REVIEW_ITEMS,
    strategyConclusion: STRATEGY_CONCLUSION,
    nextStrategyCandidates: NEXT_STRATEGY_CANDIDATES,
    nextRecommendedTask: 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면',
    actualNaverApiCall: false,
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
