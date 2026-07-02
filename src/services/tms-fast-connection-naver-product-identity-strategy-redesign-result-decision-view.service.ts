import {
  type TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView,
} from './tms-fast-connection-naver-product-identity-strategy-redesign-official-structure-review-view.service';

export type TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionStatus =
  | 'STRATEGY_RESULT_DECISION_READY'
  | 'STRATEGY_RESULT_DECISION_NOT_READY';

export type TmsFastConnectionNaverProductIdentityStrategyDecision =
  | 'PRIORITIZE_CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW'
  | 'PENDING';

export type TmsFastConnectionNaverProductIdentityStrategyPriorityCandidateId =
  | 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW'
  | 'B_ORIGIN_PRODUCT_NO_REVIEW'
  | 'C_PRODUCT_NO_ID_OFFICIAL_MEANING_REVIEW'
  | 'D_UPDATE_API_PATH_BODY_PARAM_REVIEW'
  | 'E_READ_ONLY_PAYLOAD_DESIGN';

export interface TmsFastConnectionNaverProductIdentityStrategyPriorityCandidate {
  candidateId: TmsFastConnectionNaverProductIdentityStrategyPriorityCandidateId;
  label: string;
  description: string;
  priority: 1 | 2 | 3 | 4 | 5;
  priorityReason: string;
}

export interface TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView {
  taskId: 427;
  title: string;
  decisionStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionStatus;
  sourceReviewStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView['reviewStatus'];
  targetProductNo: '6597910207';
  productUpdateApiEntryDecision: 'BLOCKED';
  randomFieldExplorationRecommended: false;
  additionalApiRecallRecommended: false;
  priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW';
  strategyDecision: TmsFastConnectionNaverProductIdentityStrategyDecision;
  strategyDecisionReason: string;
  canBuildUpdatePayload: false;
  canCallUpdateApi: false;
  nextActionRequiresSeparateApproval: true;
  strategyCandidates: TmsFastConnectionNaverProductIdentityStrategyPriorityCandidate[];
  nextRecommendedTask: 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet';
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

const STRATEGY_CANDIDATES: TmsFastConnectionNaverProductIdentityStrategyPriorityCandidate[] = [
  {
    candidateId: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW',
    label: 'A',
    description:
      'channelProductNo를 수정 API 식별자로 사용할 수 있는지 공식 구조 기준으로 검토',
    priority: 1,
    priorityReason:
      '실제 조회 API가 6597910207로 성공했으며, 이 번호가 channelProductNo이거나 수정 API path parameter로 직접 사용 가능할 가능성이 가장 높다. 응답 내부 탐색 없이도 공식 문서 기반으로 판단할 수 있다.',
  },
  {
    candidateId: 'D_UPDATE_API_PATH_BODY_PARAM_REVIEW',
    label: 'D',
    description:
      '수정 API path parameter와 body identifier 요구사항을 분리 검토',
    priority: 2,
    priorityReason:
      'channelProductNo가 path parameter로 사용 가능하다고 판단되더라도, body에 별도 식별자가 필요한지 분리해서 확인해야 한다. A와 함께 검토해야 완전한 수정 API 진입 계획이 된다.',
  },
  {
    candidateId: 'B_ORIGIN_PRODUCT_NO_REVIEW',
    label: 'B',
    description:
      'originProductNo가 별도 식별자로 필요한지 검토',
    priority: 3,
    priorityReason:
      '단일 스마트스토어 상품에서 originProductNo가 응답에 없는 이유가 불명확하다. A, D 검토 이후 originProduct 계열 식별자가 필요할 경우 검토한다.',
  },
  {
    candidateId: 'C_PRODUCT_NO_ID_OFFICIAL_MEANING_REVIEW',
    label: 'C',
    description:
      'productNo / id 명칭이 공식 문서에서 어떤 의미로 쓰이는지 검토',
    priority: 4,
    priorityReason:
      '기존 7개 candidate path 중 productNo와 id가 exists false였다. 이 명칭들의 공식 의미를 확인하는 것은 A, D, B 검토 이후에 진행한다.',
  },
  {
    candidateId: 'E_READ_ONLY_PAYLOAD_DESIGN',
    label: 'E',
    description:
      '실제 수정 API 호출 전 read-only payload 설계 화면을 만든다',
    priority: 5,
    priorityReason:
      '수정 API 식별자가 확정된 이후에만 유의미하다. A~D 검토가 완료되고 식별자가 확정된 단계에서 진행한다.',
  },
];

const STRATEGY_DECISION_REASON =
  '상품 조회 API는 6597910207로 성공했지만 응답 내부에서 동일 식별자는 확인되지 않았습니다. 따라서 수정 API 진입 전, 해당 번호가 channelProductNo로서 수정 API path parameter에 사용 가능한지 공식 구조 기준으로 별도 검토해야 합니다.';

export function buildTmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView(
  officialStructureReviewView: TmsFastConnectionNaverProductIdentityStrategyRedesignOfficialStructureReviewView
): TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionView {
  const decisionStatus: TmsFastConnectionNaverProductIdentityStrategyRedesignResultDecisionStatus =
    officialStructureReviewView.reviewStatus === 'OFFICIAL_STRUCTURE_REVIEW_COMPLETED'
      ? 'STRATEGY_RESULT_DECISION_READY'
      : 'STRATEGY_RESULT_DECISION_NOT_READY';

  return {
    taskId: 427,
    title: 'Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면',
    decisionStatus,
    sourceReviewStatus: officialStructureReviewView.reviewStatus,
    targetProductNo: '6597910207',
    productUpdateApiEntryDecision: 'BLOCKED',
    randomFieldExplorationRecommended: false,
    additionalApiRecallRecommended: false,
    priorityStrategyCandidate: 'A_CHANNEL_PRODUCT_NO_UPDATE_IDENTIFIER_REVIEW',
    strategyDecision: 'PRIORITIZE_CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW',
    strategyDecisionReason: STRATEGY_DECISION_REASON,
    canBuildUpdatePayload: false,
    canCallUpdateApi: false,
    nextActionRequiresSeparateApproval: true,
    strategyCandidates: STRATEGY_CANDIDATES,
    nextRecommendedTask: 'Task 428 - Naver channelProductNo 수정 API 식별자 검토 승인 Packet',
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
