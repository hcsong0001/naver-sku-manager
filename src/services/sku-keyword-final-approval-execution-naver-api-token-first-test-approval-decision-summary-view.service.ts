export interface DecisionSummaryItem {
  id: number;
  itemKey: string;
  itemLabel: string;
  currentState: string;
  isReadOnly: boolean;
  isDecisionEditable: false;
}

export interface NaverApiTokenFirstTestApprovalDecisionSummaryViewModel {
  approvalDecisionSummaryCreated: boolean;
  displayOnly: boolean;
  readOnly: boolean;
  executionLocked: boolean;
  summaryIsReadOnly: boolean;
  currentDecisionIsNotAllowed: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;
  tokenTestStillNotAllowed: boolean;

  title: string;
  summaryLabel: string;
  currentDecision: string;
  currentPhase: string;
  reviewedPanelCount: number;
  allPanelsReadOnly: boolean;
  decisionItems: DecisionSummaryItem[];
  summaryNote: string;

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

export function buildNaverApiTokenFirstTestApprovalDecisionSummaryView(
  _input?: unknown
): NaverApiTokenFirstTestApprovalDecisionSummaryViewModel {
  const decisionItems: DecisionSummaryItem[] = [
    {
      id: 1,
      itemKey: 'EXECUTION_STATUS',
      itemLabel: '실행 잠금 상태',
      currentState: '유지 중 (실행 불가)',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 2,
      itemKey: 'TOKEN_REQUEST_STATUS',
      itemLabel: '인증 키 요청 상태',
      currentState: '차단 유지 (요청 불가)',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 3,
      itemKey: 'DB_WRITE_STATUS',
      itemLabel: '운영 DB write 상태',
      currentState: '차단 유지 (write 불가)',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 4,
      itemKey: 'APPROVAL_REQUEST_STATUS',
      itemLabel: '승인 요청 상태',
      currentState: '아직 제출 불가 / 저장 불가',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 5,
      itemKey: 'REVIEW_FLOW_STATUS',
      itemLabel: '검토 흐름 상태',
      currentState: '12개 read-only 패널 검토 완료',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 6,
      itemKey: 'NEXT_ACTION',
      itemLabel: '다음 행동',
      currentState: '별도 승인 기준 검토',
      isReadOnly: true,
      isDecisionEditable: false,
    },
    {
      id: 7,
      itemKey: 'OVERALL_CONCLUSION',
      itemLabel: '최종 결론',
      currentState: '실행 불가 / 별도 승인 전 검토 단계 유지',
      isReadOnly: true,
      isDecisionEditable: false,
    },
  ];

  return {
    approvalDecisionSummaryCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    summaryIsReadOnly: true,
    currentDecisionIsNotAllowed: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,
    tokenTestStillNotAllowed: true,

    title: 'Token First Test Approval Decision Summary',
    summaryLabel: '최종 결론 요약 (read-only — 실행 불가 상태)',
    currentDecision: '실행 불가',
    currentPhase: '별도 승인 전 검토 단계',
    reviewedPanelCount: 12,
    allPanelsReadOnly: true,
    decisionItems,
    summaryNote:
      '이 요약은 화면 검토용 최종 결론 정보 전용입니다. 승인 결정 저장, 승인 요청 제출, 실행 연결 기능은 이 화면에 존재하지 않습니다.',

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
