export interface DecisionSealItem {
  id: number;
  sealKey: string;
  sealLabel: string;
  sealValue: string;
  sealStatus: 'SEALED' | 'NOT_RELEASED' | 'BLOCKED';
  isReadOnly: boolean;
  isReleasable: false;
}

export interface SubmissionStillBlockedItem {
  id: number;
  blockedKey: string;
  blockedLabel: string;
  blockedDetail: string;
  isReadOnly: boolean;
  isResolvable: false;
}

export interface ExecutionStillForbiddenItem {
  id: number;
  forbiddenKey: string;
  forbiddenLabel: string;
  forbiddenDetail: string;
  isReadOnly: boolean;
  isReleasable: false;
}

export interface NextStepItem {
  id: number;
  stepKey: string;
  stepLabel: string;
  stepDetail: string;
  isReadOnly: boolean;
  isExecutable: false;
}

export interface StillForbiddenItem {
  id: number;
  itemKey: string;
  itemLabel: string;
  itemDetail: string;
  isReadOnly: boolean;
  isBypassable: false;
}

export interface NaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealViewModel {
  submissionDecisionSealReviewOnly: boolean;
  separateApprovalStillRequired: boolean;
  executionStillForbidden: boolean;
  tokenRequestStillForbidden: boolean;
  naverApiCallStillForbidden: boolean;
  operatingDbWriteStillForbidden: boolean;
  priceStockChangeStillForbidden: boolean;
  queueWorkerStillDisconnected: boolean;
  postApiStillNotAdded: boolean;

  screenTitle: string;
  submissionDecisionSealPhaseName: string;
  submissionDecisionSealStatus: string;
  submissionReadinessDecisionCommit: string;
  approvalRequestSubmitted: false;
  approvalRequestSubmissionAllowed: false;
  approvalRequestSubmitButtonRendered: false;
  approvalRequestSubmitButtonEnabled: false;
  decisionSealItems: DecisionSealItem[];
  submissionStillBlockedItems: SubmissionStillBlockedItem[];
  executionStillForbiddenItems: ExecutionStillForbiddenItem[];
  nextStepItems: NextStepItem[];
  stillForbiddenItems: StillForbiddenItem[];
  nextStepLabel: string;

  executionButtonRendered: false;
  executionButtonEnabled: false;
  approvalButtonRendered: false;
  approvalButtonEnabled: false;
  checklistSaveButtonRendered: false;
  checklistSaveButtonEnabled: false;
  decisionSaveButtonRendered: false;
  decisionSaveButtonEnabled: false;
  boundaryReleaseButtonRendered: false;
  boundaryReleaseButtonEnabled: false;
  handoffSaveButtonRendered: false;
  handoffSaveButtonEnabled: false;
  criteriaConfirmButtonRendered: false;
  criteriaConfirmButtonEnabled: false;
  gapAnalysisConfirmButtonRendered: false;
  gapAnalysisConfirmButtonEnabled: false;
  riskMatrixConfirmButtonRendered: false;
  riskMatrixConfirmButtonEnabled: false;
  mitigationPlanConfirmButtonRendered: false;
  mitigationPlanConfirmButtonEnabled: false;
  finalBlockerConfirmButtonRendered: false;
  finalBlockerConfirmButtonEnabled: false;
  requestPacketSubmitButtonRendered: false;
  requestPacketSubmitButtonEnabled: false;
  preSubmissionConfirmButtonRendered: false;
  preSubmissionConfirmButtonEnabled: false;
  submissionReadinessDecisionSaveButtonRendered: false;
  submissionReadinessDecisionSaveButtonEnabled: false;
  submissionReadinessDecisionConfirmButtonRendered: false;
  submissionReadinessDecisionConfirmButtonEnabled: false;
  submissionDecisionSealSaveButtonRendered: false;
  submissionDecisionSealSaveButtonEnabled: false;
  submissionDecisionSealConfirmButtonRendered: false;
  submissionDecisionSealConfirmButtonEnabled: false;
  formRendered: false;
  formSubmitEnabled: false;
  postApiEnabled: false;
  finalConfirmationPersisted: false;
  finalConfirmationDbWriteExecuted: false;
  finalConfirmationActionEnabled: false;
  liveTokenTestApproved: false;
  liveTokenTestExecutionAllowed: false;
  dbWriteAllowed: false;
  persistenceExecuted: false;
  metadataPersisted: false;
  auditEventPersisted: false;
  dbWriteExecuted: false;
  prismaMutationExecuted: false;
  goTicketIssued: false;
  executionLeaseIssued: false;
  sandboxInvocationAllowed: false;
  sandboxInvocationExecuted: false;
  coordinatorExecutionAllowed: false;
  requestPayloadCreated: false;
  requestBodyCreated: false;
  requestHeadersCreated: false;
  networkKillSwitchOpen: false;
  networkAdapterEnabled: false;
  networkExecutionAllowed: false;
  tokenNetworkRequestAllowed: false;
  tokenRequestAllowed: false;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  clientSecretUsed: false;
  clientSecretSignCreated: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  endpointResolved: false;
  endpointCalled: false;
  httpRequestCreated: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
}

export function buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealViewModel {
  const decisionSealItems: DecisionSealItem[] = [
    {
      id: 1,
      sealKey: 'SEAL_SUBMISSION_NOT_OCCURRED',
      sealLabel: '승인 요청 제출 여부 봉인',
      sealValue: '승인 요청 제출이 발생하지 않았음 — 이 화면에서 제출 기능 없음',
      sealStatus: 'SEALED',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 2,
      sealKey: 'SEAL_EXECUTION_NOT_RELEASED',
      sealLabel: '실행 해제 여부 봉인',
      sealValue: '제출 판단 완료가 실행 해제를 의미하지 않음 — 실행 잠금 유지',
      sealStatus: 'NOT_RELEASED',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 3,
      sealKey: 'SEAL_TOKEN_REQUEST_LOCKED',
      sealLabel: '인증 키 요청 잠금 봉인',
      sealValue: '이 단계에서 인증 키 요청은 여전히 금지 — 별도 해제 단계 필요',
      sealStatus: 'BLOCKED',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 4,
      sealKey: 'SEAL_APPROVAL_INCOMPLETE',
      sealLabel: '별도 승인 완료 여부 봉인',
      sealValue: '별도 승인이 아직 완료되지 않았음 — 제출 판단만 완료된 상태',
      sealStatus: 'NOT_RELEASED',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 5,
      sealKey: 'SEAL_READINESS_DECISION_ONLY',
      sealLabel: '이 화면의 역할 봉인',
      sealValue: '제출 준비 판단 봉인 화면 — 제출·실행·저장 기능 없음',
      sealStatus: 'SEALED',
      isReadOnly: true,
      isReleasable: false,
    },
  ];

  const submissionStillBlockedItems: SubmissionStillBlockedItem[] = [
    {
      id: 1,
      blockedKey: 'SUBMIT_BLOCKED_NO_APPROVAL_AUTHORITY',
      blockedLabel: '승인 권한자 미확정',
      blockedDetail:
        '승인 권한자가 이 화면에서 확정되지 않습니다. 별도 채널에서 사전 합의가 필요합니다.',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 2,
      blockedKey: 'SUBMIT_BLOCKED_NO_SUBMIT_FUNCTION',
      blockedLabel: '이 화면에 제출 기능 없음',
      blockedDetail:
        '이 화면은 제출 판단 봉인 전용 read-only 화면입니다. 승인 요청 제출 기능이 없습니다.',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 3,
      blockedKey: 'SUBMIT_BLOCKED_CHANNEL_NOT_READY',
      blockedDetail:
        '별도 제출 채널(슬랙·이메일·내부 결재)이 이 화면과 연결되어 있지 않습니다.',
      blockedLabel: '별도 제출 채널 연결 없음',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 4,
      blockedKey: 'SUBMIT_BLOCKED_SEAL_PHASE_ONLY',
      blockedLabel: '제출 판단 봉인 단계만 완료',
      blockedDetail:
        '현재 단계는 제출 판단 봉인 단계입니다. 실제 제출은 이 단계 이후 별도 절차로 진행됩니다.',
      isReadOnly: true,
      isResolvable: false,
    },
  ];

  const executionStillForbiddenItems: ExecutionStillForbiddenItem[] = [
    {
      id: 1,
      forbiddenKey: 'EXEC_FORBIDDEN_TOKEN_REQUEST',
      forbiddenLabel: '인증 키 요청',
      forbiddenDetail:
        '이 단계에서 인증 키 요청은 금지입니다. 별도 승인 완료 후에도 추가 해제 단계가 필요합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 2,
      forbiddenKey: 'EXEC_FORBIDDEN_API_CALL',
      forbiddenLabel: '외부 서비스 API 호출',
      forbiddenDetail:
        '이 단계에서 외부 커머스 API 호출은 금지입니다. 제출 판단 봉인은 실행 허용을 의미하지 않습니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 3,
      forbiddenKey: 'EXEC_FORBIDDEN_DB_WRITE',
      forbiddenLabel: '운영 DB write',
      forbiddenDetail:
        '운영 DB write 작업은 이 단계에서 금지입니다. 제출 판단 봉인과 무관하게 DB write는 차단됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 4,
      forbiddenKey: 'EXEC_FORBIDDEN_QUEUE_WORKER',
      forbiddenLabel: 'Queue/Worker 실행',
      forbiddenDetail:
        'Queue 및 Worker 실행 연결은 이 단계에서 금지입니다. 실행 버튼, POST API, Queue 연결이 모두 차단됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 5,
      forbiddenKey: 'EXEC_FORBIDDEN_PRICE_STOCK',
      forbiddenLabel: '가격·재고 변경',
      forbiddenDetail:
        '가격·재고 변경 API 호출은 이 단계에서 금지입니다. 제출 판단 봉인이 가격·재고 변경을 허용하지 않습니다.',
      isReadOnly: true,
      isReleasable: false,
    },
  ];

  const nextStepItems: NextStepItem[] = [
    {
      id: 1,
      stepKey: 'NEXT_SUBMIT_VIA_SEPARATE_CHANNEL',
      stepLabel: '별도 채널을 통한 승인 요청 제출 검토',
      stepDetail:
        '승인 요청 제출이 필요하다면 이 화면이 아닌 별도 채널(슬랙·이메일·내부 결재)을 통해 진행하세요. 이 화면의 판단 결과를 근거 자료로 사용할 수 있습니다.',
      isReadOnly: true,
      isExecutable: false,
    },
    {
      id: 2,
      stepKey: 'NEXT_CRITERIA_CONFIRMATION',
      stepLabel: '제출 전 승인 기준 확정 검토',
      stepDetail:
        '승인 기준(Risk Matrix, Mitigation Plan, Blocker Summary)을 최종 확인하고 별도 채널에서 승인 권한자와 합의하세요.',
      isReadOnly: true,
      isExecutable: false,
    },
    {
      id: 3,
      stepKey: 'NEXT_EXECUTION_SAFETY_REVIEW',
      stepLabel: '추가 실행 안전 해제 단계 검토',
      stepDetail:
        '별도 승인 완료 이후에도 실행 잠금 해제를 위한 추가 안전 단계가 필요합니다. 이 화면의 판단 봉인은 그 시작점입니다.',
      isReadOnly: true,
      isExecutable: false,
    },
  ];

  const stillForbiddenItems: StillForbiddenItem[] = [
    {
      id: 1,
      itemKey: 'STILL_FORBIDDEN_TOKEN',
      itemLabel: '인증 키 요청 금지 유지',
      itemDetail: '인증 키 요청은 제출 판단 봉인 이후에도 금지가 유지됩니다.',
      isReadOnly: true,
      isBypassable: false,
    },
    {
      id: 2,
      itemKey: 'STILL_FORBIDDEN_API',
      itemLabel: '외부 API 호출 금지 유지',
      itemDetail: '외부 커머스 API 호출은 제출 판단 봉인 이후에도 금지가 유지됩니다.',
      isReadOnly: true,
      isBypassable: false,
    },
    {
      id: 3,
      itemKey: 'STILL_FORBIDDEN_DB',
      itemLabel: '운영 DB write 금지 유지',
      itemDetail: '운영 DB write는 제출 판단 봉인 이후에도 금지가 유지됩니다.',
      isReadOnly: true,
      isBypassable: false,
    },
    {
      id: 4,
      itemKey: 'STILL_FORBIDDEN_QUEUE',
      itemLabel: 'Queue/Worker 실행 금지 유지',
      itemDetail: 'Queue/Worker 실행은 제출 판단 봉인 이후에도 금지가 유지됩니다.',
      isReadOnly: true,
      isBypassable: false,
    },
    {
      id: 5,
      itemKey: 'STILL_FORBIDDEN_PRICE_STOCK',
      itemLabel: '가격·재고 변경 금지 유지',
      itemDetail: '가격·재고 변경은 제출 판단 봉인 이후에도 금지가 유지됩니다.',
      isReadOnly: true,
      isBypassable: false,
    },
  ];

  return {
    submissionDecisionSealReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,

    screenTitle: 'Token First Test Separate Approval Submission Decision Seal',
    submissionDecisionSealPhaseName: '제출 판단 봉인 단계',
    submissionDecisionSealStatus: '제출 판단 봉인 완료 (실행 불가 유지)',
    submissionReadinessDecisionCommit: 'ddb2f60',
    approvalRequestSubmitted: false,
    approvalRequestSubmissionAllowed: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,
    decisionSealItems,
    submissionStillBlockedItems,
    executionStillForbiddenItems,
    nextStepItems,
    stillForbiddenItems,
    nextStepLabel:
      '이 화면은 제출 판단 봉인 전용 read-only 화면입니다. 제출 판단 봉인이 승인 요청 제출 또는 실행 허용을 의미하지 않습니다. 실제 승인 요청 제출은 별도 채널을 통해, 실행 해제는 추가 안전 단계를 통해 진행하세요.',

    executionButtonRendered: false,
    executionButtonEnabled: false,
    approvalButtonRendered: false,
    approvalButtonEnabled: false,
    checklistSaveButtonRendered: false,
    checklistSaveButtonEnabled: false,
    decisionSaveButtonRendered: false,
    decisionSaveButtonEnabled: false,
    boundaryReleaseButtonRendered: false,
    boundaryReleaseButtonEnabled: false,
    handoffSaveButtonRendered: false,
    handoffSaveButtonEnabled: false,
    criteriaConfirmButtonRendered: false,
    criteriaConfirmButtonEnabled: false,
    gapAnalysisConfirmButtonRendered: false,
    gapAnalysisConfirmButtonEnabled: false,
    riskMatrixConfirmButtonRendered: false,
    riskMatrixConfirmButtonEnabled: false,
    mitigationPlanConfirmButtonRendered: false,
    mitigationPlanConfirmButtonEnabled: false,
    finalBlockerConfirmButtonRendered: false,
    finalBlockerConfirmButtonEnabled: false,
    requestPacketSubmitButtonRendered: false,
    requestPacketSubmitButtonEnabled: false,
    preSubmissionConfirmButtonRendered: false,
    preSubmissionConfirmButtonEnabled: false,
    submissionReadinessDecisionSaveButtonRendered: false,
    submissionReadinessDecisionSaveButtonEnabled: false,
    submissionReadinessDecisionConfirmButtonRendered: false,
    submissionReadinessDecisionConfirmButtonEnabled: false,
    submissionDecisionSealSaveButtonRendered: false,
    submissionDecisionSealSaveButtonEnabled: false,
    submissionDecisionSealConfirmButtonRendered: false,
    submissionDecisionSealConfirmButtonEnabled: false,
    formRendered: false,
    formSubmitEnabled: false,
    postApiEnabled: false,
    finalConfirmationPersisted: false,
    finalConfirmationDbWriteExecuted: false,
    finalConfirmationActionEnabled: false,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    dbWriteAllowed: false,
    persistenceExecuted: false,
    metadataPersisted: false,
    auditEventPersisted: false,
    dbWriteExecuted: false,
    prismaMutationExecuted: false,
    goTicketIssued: false,
    executionLeaseIssued: false,
    sandboxInvocationAllowed: false,
    sandboxInvocationExecuted: false,
    coordinatorExecutionAllowed: false,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
    networkKillSwitchOpen: false,
    networkAdapterEnabled: false,
    networkExecutionAllowed: false,
    tokenNetworkRequestAllowed: false,
    tokenRequestAllowed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    clientSecretUsed: false,
    clientSecretSignCreated: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
  };
}
