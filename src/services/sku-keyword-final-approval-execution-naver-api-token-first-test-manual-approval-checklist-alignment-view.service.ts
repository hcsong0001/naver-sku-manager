export interface NaverApiTokenFirstTestManualApprovalChecklistAlignmentViewModel {
  checklistAlignmentCreated: boolean;
  displayOnly: boolean;
  readOnly: boolean;
  executionLocked: boolean;
  alignmentIsReadOnly: boolean;
  checklistIsExecution: boolean; // false
  currentScreenIsReviewOnly: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;
  tokenTestStillNotAllowed: boolean;
  title: string;
  alignmentLabel: string;
  alignmentNote: string;
  currentPhase: string;
  nextStepContext: string;
  alignmentItems: Array<{
    id: number;
    alignmentKey: string;
    alignmentLabel: string;
    alignmentValue: string;
    isReadOnly: boolean;
    isExecutable: false;
  }>;
  checklistClarificationItems: Array<{
    id: number;
    clarificationKey: string;
    clarificationLabel: string;
    clarificationDetail: string;
    isReadOnly: boolean;
    isExecutable: false;
  }>;
  alignmentSummaryNote: string;
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
  verificationSaveButtonRendered: false;
  verificationSaveButtonEnabled: false;
  verificationConfirmButtonRendered: false;
  verificationConfirmButtonEnabled: false;
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

export function buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView(): NaverApiTokenFirstTestManualApprovalChecklistAlignmentViewModel {
  return {
    checklistAlignmentCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    alignmentIsReadOnly: true,
    checklistIsExecution: false,
    currentScreenIsReviewOnly: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,
    tokenTestStillNotAllowed: true,
    title: 'Manual Approval Checklist Alignment',
    alignmentLabel: '체크리스트 연결 검증 안내',
    alignmentNote: '이후 표시될 Manual Approval Checklist는 별도 승인 전까지 실제 실행과 무관한 단순 검토용 Checklist임을 명확히 인지해야 합니다.',
    currentPhase: 'Token Test 전면 차단 상태',
    nextStepContext: 'Manual Approval Checklist (read-only)',
    alignmentItems: [
      {
        id: 1,
        alignmentKey: 'TOKEN_TEST_STATUS',
        alignmentLabel: '토큰 테스트 실행 여부',
        alignmentValue: '실행 불가 (차단 유지)',
        isReadOnly: true,
        isExecutable: false,
      },
      {
        id: 2,
        alignmentKey: 'CHECKLIST_PURPOSE',
        alignmentLabel: '하단 체크리스트 용도',
        alignmentValue: '단순 정책 확인용 (실행 아님)',
        isReadOnly: true,
        isExecutable: false,
      },
      {
        id: 3,
        alignmentKey: 'ACTION_PERMISSION',
        alignmentLabel: '상태 변경 및 실행 권한',
        alignmentValue: '모두 권한 없음 (Read-only)',
        isReadOnly: true,
        isExecutable: false,
      },
    ],
    checklistClarificationItems: [
      {
        id: 1,
        clarificationKey: 'NO_EXECUTION_LINK',
        clarificationLabel: '실행 버튼 연결 없음',
        clarificationDetail: '하단 Manual Approval Checklist 항목을 확인하더라도 실제 토큰 발급이나 API 호출 등 실행 기능으로 연결되지 않습니다.',
        isReadOnly: true,
        isExecutable: false,
      },
      {
        id: 2,
        clarificationKey: 'NO_DB_WRITE',
        clarificationLabel: 'DB Write 차단 유지',
        clarificationDetail: '체크리스트 확인 내역은 운영 DB에 기록되거나 반영되지 않습니다. Prisma mutation은 전면 차단됩니다.',
        isReadOnly: true,
        isExecutable: false,
      },
      {
        id: 3,
        clarificationKey: 'NO_NAVER_API',
        clarificationLabel: 'Naver API 호출 차단',
        clarificationDetail: '인증 헤더 생성, 상품 조회, 재고/가격 변경 등 어떠한 형태의 Naver API 외부 호출도 진행되지 않습니다.',
        isReadOnly: true,
        isExecutable: false,
      },
      {
        id: 4,
        clarificationKey: 'SEPARATE_APPROVAL_REQUIRED',
        clarificationLabel: '별도 승인 필요',
        clarificationDetail: '실제 토큰 발급 테스트를 진행하려면 현재 화면에서 벗어나 완전히 별도의 안전 승인 절차를 거쳐야 합니다.',
        isReadOnly: true,
        isExecutable: false,
      },
    ],
    alignmentSummaryNote: '본 패널은 지금까지의 Task 41~56 누적 검토 흐름과 기존 Manual Approval Checklist가 서로 기능적으로 분리된 Read-only 상태임을 최종 공지합니다.',
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
    verificationSaveButtonRendered: false,
    verificationSaveButtonEnabled: false,
    verificationConfirmButtonRendered: false,
    verificationConfirmButtonEnabled: false,
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
