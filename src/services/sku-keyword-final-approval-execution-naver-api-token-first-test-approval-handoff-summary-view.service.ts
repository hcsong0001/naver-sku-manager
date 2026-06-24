export interface HandoffSummaryItem {
  id: number;
  itemKey: string;
  itemLabel: string;
  itemValue: string;
  isReadOnly: boolean;
  isEditable: false;
}

export interface NextActionCheckItem {
  id: number;
  checkKey: string;
  checkLabel: string;
  checkDetail: string;
  isReadOnly: boolean;
  isCheckable: false;
}

export interface AbsoluteProhibitionItem {
  id: number;
  prohibitionKey: string;
  prohibitionLabel: string;
  prohibitionDetail: string;
  isReadOnly: boolean;
  isReleasable: false;
}

export interface NaverApiTokenFirstTestApprovalHandoffSummaryViewModel {
  handoffSummaryCreated: boolean;
  displayOnly: boolean;
  readOnly: boolean;
  executionLocked: boolean;
  handoffIsReadOnly: boolean;
  currentScreenIsReviewOnly: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;
  tokenTestStillNotAllowed: boolean;

  title: string;
  handoffLabel: string;
  handoffNote: string;
  currentConclusion: string;
  currentPhase: string;
  reviewedFlowCount: number;
  currentAllowedSummary: string;
  currentProhibitedSummary: string;
  summaryItems: HandoffSummaryItem[];
  nextActionItems: NextActionCheckItem[];
  absoluteProhibitionItems: AbsoluteProhibitionItem[];
  handoffSummaryNote: string;

  executionButtonRendered: false;
  executionButtonEnabled: false;
  approvalButtonRendered: false;
  approvalButtonEnabled: false;
  approvalRequestSubmitButtonRendered: false;
  approvalRequestSubmitButtonEnabled: false;
  checklistSaveButtonRendered: false;
  checklistSaveButtonEnabled: false;
  decisionSaveButtonRendered: false;
  decisionSaveButtonEnabled: false;
  boundaryReleaseButtonRendered: false;
  boundaryReleaseButtonEnabled: false;
  handoffSaveButtonRendered: false;
  handoffSaveButtonEnabled: false;
  handoffCopyButtonRendered: false;
  handoffCopyButtonEnabled: false;
  handoffSendButtonRendered: false;
  handoffSendButtonEnabled: false;
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

export function buildNaverApiTokenFirstTestApprovalHandoffSummaryView(
  _input?: unknown
): NaverApiTokenFirstTestApprovalHandoffSummaryViewModel {
  const summaryItems: HandoffSummaryItem[] = [
    {
      id: 1,
      itemKey: 'CURRENT_CONCLUSION',
      itemLabel: '현재 결론',
      itemValue: '실행 불가 — 별도 승인 전',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 2,
      itemKey: 'CURRENT_PHASE',
      itemLabel: '현재 단계',
      itemValue: '별도 승인 전 검토 단계',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 3,
      itemKey: 'REVIEWED_FLOW_COUNT',
      itemLabel: '검토 완료 흐름 수',
      itemValue: '14개 read-only 검토 패널 (Task 41~54)',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 4,
      itemKey: 'CURRENT_ALLOWED',
      itemLabel: '현재 허용 작업',
      itemValue: 'read-only 화면 검토만 허용',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 5,
      itemKey: 'CURRENT_PROHIBITED',
      itemLabel: '계속 금지 작업',
      itemValue: '실행 / 외부 서비스 API 호출 / 운영 DB write / 인증 키 요청',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 6,
      itemKey: 'SAFETY_LOCK_STATUS',
      itemLabel: '안전 잠금 상태',
      itemValue: '전체 안전 잠금 활성화 중 — 해제 없음',
      isReadOnly: true,
      isEditable: false,
    },
  ];

  const nextActionItems: NextActionCheckItem[] = [
    {
      id: 1,
      checkKey: 'REVIEW_ALL_PANELS',
      checkLabel: '14개 패널 검토 완료 확인',
      checkDetail:
        'Task 41~54 read-only 검토 패널 전체를 순서대로 확인하세요. 각 패널은 실행 없이 read-only로 열람할 수 있습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 2,
      checkKey: 'SAFETY_STATE_CHECK',
      checkLabel: '안전 잠금 상태 확인',
      checkDetail:
        '실행 잠금, 네트워크 차단, DB write 차단 상태를 read-only로 확인하세요. 현재 모든 안전 잠금이 활성화되어 있습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 3,
      checkKey: 'APPROVAL_CONDITION_UNDERSTAND',
      checkLabel: '별도 승인 기준 이해',
      checkDetail:
        '별도 승인 기준 및 필요 조건을 이해하고 확인하세요. 승인 패킷, 증거 타임라인, 결론 요약이 read-only로 제공됩니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 4,
      checkKey: 'HANDOFF_CONTENT_CONFIRM',
      checkLabel: '인수인계 요약 내용 확인',
      checkDetail:
        '현재 인수인계 요약 내용을 read-only로 확인하세요. 이 요약은 화면 검토용이며 저장·복사·전송 기능은 없습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 5,
      checkKey: 'SEPARATE_APPROVAL_JUDGMENT',
      checkLabel: '별도 승인 여부 판단',
      checkDetail:
        '이 화면의 read-only 정보를 바탕으로 별도 승인 여부를 판단하세요. 판단 결과는 이 화면이 아닌 별도 채널에서 기록합니다.',
      isReadOnly: true,
      isCheckable: false,
    },
  ];

  const absoluteProhibitionItems: AbsoluteProhibitionItem[] = [
    {
      id: 1,
      prohibitionKey: 'TOKEN_REQUEST_PROHIBITED',
      prohibitionLabel: '인증 키 요청',
      prohibitionDetail:
        '인증 키 요청 절대 금지: 어떤 방식으로도 인증 키를 외부 서비스에 요청할 수 없습니다. 별도 승인 이후에도 추가 해제 단계가 필요합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 2,
      prohibitionKey: 'EXTERNAL_API_CALL_PROHIBITED',
      prohibitionLabel: '외부 서비스 API 호출',
      prohibitionDetail:
        '외부 커머스 API 호출 절대 금지: 네트워크 실행 잠금이 활성화되어 있습니다. 외부 서비스 API 호출 경로가 모두 차단됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 3,
      prohibitionKey: 'DB_WRITE_PROHIBITED',
      prohibitionLabel: '운영 DB write',
      prohibitionDetail:
        '운영 DB write 절대 금지: Prisma 포함 모든 DB 저장 작업이 차단됩니다. 가격·재고·상품 정보 DB 변경은 모두 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 4,
      prohibitionKey: 'EXECUTION_BUTTON_PROHIBITED',
      prohibitionLabel: '실행 버튼·흐름 연결',
      prohibitionDetail:
        '실행 버튼, Queue 연결, Worker 실행, 자동 실행 흐름 절대 금지: 어떤 경로로도 실제 실행이 이루어지지 않습니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 5,
      prohibitionKey: 'PRICE_STOCK_CHANGE_PROHIBITED',
      prohibitionLabel: '가격·재고 변경',
      prohibitionDetail:
        '가격·재고 변경 절대 금지: 상품 가격 및 재고 변경 API 호출이 차단됩니다. 상품 조회 및 수정 API 호출도 금지됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 6,
      prohibitionKey: 'APPROVAL_SUBMIT_PROHIBITED',
      prohibitionLabel: '승인 요청 제출·저장',
      prohibitionDetail:
        '승인 요청 제출·저장 절대 금지: 이 화면에서 승인 요청을 제출하거나 저장하는 기능이 없습니다. 이 화면은 read-only 인수인계 요약 화면입니다.',
      isReadOnly: true,
      isReleasable: false,
    },
  ];

  return {
    handoffSummaryCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    handoffIsReadOnly: true,
    currentScreenIsReviewOnly: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,
    tokenTestStillNotAllowed: true,

    title: 'Token First Test Approval Handoff Summary',
    handoffLabel: '인수인계 요약 (read-only — 실행 불가 상태)',
    handoffNote:
      '이 화면은 실행 화면이 아닙니다. 별도 승인자 또는 다음 작업자가 현재 안전 검토 상태를 빠르게 이해할 수 있도록 제공하는 read-only 인수인계 요약입니다.',
    currentConclusion: '실행 불가 — 별도 승인 전',
    currentPhase: '별도 승인 전 검토 단계',
    reviewedFlowCount: 14,
    currentAllowedSummary: 'read-only 화면 검토만 허용',
    currentProhibitedSummary: '실행 / 외부 서비스 API 호출 / 운영 DB write / 인증 키 요청',
    summaryItems,
    nextActionItems,
    absoluteProhibitionItems,
    handoffSummaryNote:
      '이 인수인계 요약 패널은 화면 검토용 전용입니다. 저장, 복사, 전송, 승인 제출, 실행 연결 기능은 이 화면에 존재하지 않습니다.',

    executionButtonRendered: false,
    executionButtonEnabled: false,
    approvalButtonRendered: false,
    approvalButtonEnabled: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,
    checklistSaveButtonRendered: false,
    checklistSaveButtonEnabled: false,
    decisionSaveButtonRendered: false,
    decisionSaveButtonEnabled: false,
    boundaryReleaseButtonRendered: false,
    boundaryReleaseButtonEnabled: false,
    handoffSaveButtonRendered: false,
    handoffSaveButtonEnabled: false,
    handoffCopyButtonRendered: false,
    handoffCopyButtonEnabled: false,
    handoffSendButtonRendered: false,
    handoffSendButtonEnabled: false,
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
