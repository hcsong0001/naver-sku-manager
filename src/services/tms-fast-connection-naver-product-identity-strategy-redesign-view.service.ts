import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-result-decision-view.service';
import {
  type TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView,
} from './tms-fast-connection-naver-product-identity-field-exploration-actual-collection-view.service';

export type TmsFastConnectionNaverProductIdentityStrategyRedesignStatus =
  | 'STRATEGY_REDESIGN_REQUIRED'
  | 'STRATEGY_CONFIRMED';

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignItem {
  strategyId: string;
  title: string;
  currentFinding: string;
  redesignDirection: string;
  riskIfSkipped: string;
  allowedNextData: string[];
  forbiddenNextData: string[];
}

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignView {
  taskId: 423;
  title: string;
  strategyStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignStatus;
  targetProductNo: '6597910207';
  sourceDecisionStatus: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView['decisionStatus'];
  productUpdateApiEntryDecision: 'BLOCKED';
  randomFieldExplorationRecommended: false;
  additionalApiRecallRecommended: false;
  officialStructureReviewNeeded: true;
  findingSummary: string[];
  strategyItems: TmsFastConnectionNaverProductIdentityStrategyRedesignItem[];
  nextRecommendedTask: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet';
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

const FINDING_SUMMARY: string[] = [
  '조회 API 호출 자체는 성공 (HTTP 200)',
  'top-level response shape는 originProduct / smartstoreChannelProduct로 확인',
  '기존 7개 candidate path는 모두 exists false',
  '추가 5개 candidate path는 exists true였지만 equalsTargetProductNo false',
  '따라서 응답 내부 값만 무작위로 더 찾는 방식은 비효율적',
  '상품 수정 API 진입은 계속 BLOCKED',
];

const STRATEGY_ITEMS: TmsFastConnectionNaverProductIdentityStrategyRedesignItem[] = [
  {
    strategyId: 'S1',
    title: 'API 요청 경로/파라미터에서 상품번호 의미 재검토',
    currentFinding:
      '조회 API 응답 내부에서 "6597910207"과 일치하는 필드를 찾지 못했다. 요청 경로에 사용한 식별자가 응답 내부의 어떤 필드에 대응하는지 명확히 규명되지 않은 상태다.',
    redesignDirection:
      'Naver Commerce API 공식 문서에서 상품 조회 API 요청 경로 파라미터의 의미(channelProductNo vs originProductNo)를 재확인하고, 해당 식별자가 응답 구조의 어느 필드에 매핑되는지 명시적으로 정의한다.',
    riskIfSkipped:
      '요청 파라미터와 응답 필드 간 매핑이 불명확한 상태에서 수정 API를 진입하면 잘못된 상품을 대상으로 할 위험이 있다.',
    allowedNextData: ['공식 API 문서의 요청 경로 파라미터 설명', '응답 schema 정의'],
    forbiddenNextData: [
      'raw response 전체 내용',
      'secret/token/header/signature',
      '상품 수정 API 호출',
      '가격/재고 변경',
      'DB write',
    ],
  },
  {
    strategyId: 'S2',
    title: '조회 응답의 originProduct와 smartstoreChannelProduct 역할 분리',
    currentFinding:
      'top-level key로 originProduct와 smartstoreChannelProduct가 확인됐으나, 각 객체가 어떤 식별자 체계를 사용하는지 불분명하다.',
    redesignDirection:
      '공식 문서 또는 API schema를 기반으로 originProduct가 원본 상품 식별에 사용되는 필드를 담고, smartstoreChannelProduct가 채널별 상품 식별에 사용되는 필드를 담는다는 역할 분리를 명시적으로 문서화한다.',
    riskIfSkipped:
      '두 객체의 역할 혼동으로 인해 식별자를 잘못 선택하거나 수정 API에 잘못된 파라미터를 전달할 수 있다.',
    allowedNextData: ['공식 API 스키마 내 originProduct 필드 정의', '공식 API 스키마 내 smartstoreChannelProduct 필드 정의'],
    forbiddenNextData: [
      'raw response 전체 내용',
      'secret/token/header/signature',
      '상품 수정 API 호출',
      '가격/재고 변경',
      'DB write',
    ],
  },
  {
    strategyId: 'S3',
    title: 'channelProductNo / originProductNo / productNo 관계 재정의',
    currentFinding:
      '기존 7개 candidate path 중 channelProductNo, originProductNo, productNo 계열 필드 모두 exists false였다. 이 필드들이 응답에 존재하지 않는 이유가 API 버전 차이인지, 상품 유형 차이인지, 요청 파라미터 차이인지 불명확하다.',
    redesignDirection:
      '공식 문서를 통해 channelProductNo, originProductNo, productNo 각각의 개념적 정의와 응답에 포함되는 조건을 파악하고, 이 중 상품 수정 API에서 요구하는 식별자가 무엇인지 재정의한다.',
    riskIfSkipped:
      '식별 필드가 응답에 없는 원인이 규명되지 않으면 동일한 탐색 실패가 반복될 수 있다.',
    allowedNextData: ['공식 문서의 필드 정의', 'API changelog 또는 버전 노트'],
    forbiddenNextData: [
      'raw response 전체 내용',
      'secret/token/header/signature',
      '상품 수정 API 호출',
      '가격/재고 변경',
      'DB write',
    ],
  },
  {
    strategyId: 'S4',
    title: '수정 API 진입에 필요한 식별자가 상품번호와 동일한지 재검토',
    currentFinding:
      '상품 수정 API 진입 조건으로 "상품번호 6597910207"을 사용하려 했으나, 수정 API가 실제로 어떤 식별자를 요구하는지 공식 확인이 이뤄지지 않았다.',
    redesignDirection:
      '공식 문서에서 상품 수정 API의 요청 파라미터 정의를 확인하고, 조회 API에서 사용하는 식별자와 수정 API에서 사용하는 식별자가 동일한지 또는 다른지를 명확히 규명한다.',
    riskIfSkipped:
      '수정 API가 요구하는 식별자가 조회 API의 식별자와 다를 경우, 현재까지 탐색한 결과가 수정 API 진입에 직접 사용 불가능할 수 있다.',
    allowedNextData: ['공식 상품 수정 API 문서의 요청 파라미터 정의'],
    forbiddenNextData: [
      'raw response 전체 내용',
      'secret/token/header/signature',
      '상품 수정 API 호출',
      '가격/재고 변경',
      'DB write',
    ],
  },
  {
    strategyId: 'S5',
    title: 'raw response 없이 안전하게 식별 근거를 얻는 다음 수집 방식 설계',
    currentFinding:
      '무작위로 응답 내부 필드를 더 탐색하는 방식은 비효율적이며, raw response를 직접 보지 않는 제약 하에서는 한계가 있다.',
    redesignDirection:
      '공식 API 스키마 또는 공개 문서에서 응답 구조를 사전에 파악하고, 탐색 경로를 공식 문서 기반으로 설계한다. 이를 통해 임의 탐색 대신 문서 기반 식별자 후보를 도출하는 방식으로 전환한다.',
    riskIfSkipped:
      '비문서 기반 무작위 탐색을 계속하면 식별자를 찾지 못할 가능성이 높고, 불필요한 API 재호출 횟수가 증가한다.',
    allowedNextData: ['공식 API 응답 스키마 문서', '필드별 예시 데이터 구조 설명'],
    forbiddenNextData: [
      'raw response 전체 내용',
      'secret/token/header/signature',
      '상품 수정 API 호출',
      '가격/재고 변경',
      'DB write',
    ],
  },
];

export function buildTmsFastConnectionNaverProductIdentityStrategyRedesignView(
  resultDecisionView: TmsFastConnectionNaverProductIdentityFieldExplorationResultDecisionView,
  _actualCollectionView: TmsFastConnectionNaverProductIdentityFieldExplorationActualCollectionView
): TmsFastConnectionNaverProductIdentityStrategyRedesignView {
  const strategyStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignStatus =
    resultDecisionView.decisionStatus === 'PRODUCT_IDENTITY_STILL_NOT_CONFIRMED'
      ? 'STRATEGY_REDESIGN_REQUIRED'
      : 'STRATEGY_CONFIRMED';

  return {
    taskId: 423,
    title: 'Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면',
    strategyStatus,
    targetProductNo: '6597910207',
    sourceDecisionStatus: resultDecisionView.decisionStatus,
    productUpdateApiEntryDecision: 'BLOCKED',
    randomFieldExplorationRecommended: false,
    additionalApiRecallRecommended: false,
    officialStructureReviewNeeded: true,
    findingSummary: FINDING_SUMMARY,
    strategyItems: STRATEGY_ITEMS,
    nextRecommendedTask: 'Task 424 - Naver 상품 식별 전략 재설계 승인 Packet',
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
