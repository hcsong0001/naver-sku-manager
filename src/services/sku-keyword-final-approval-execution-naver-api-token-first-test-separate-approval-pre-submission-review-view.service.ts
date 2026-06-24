export interface PacketReviewItem {
  id: number;
  reviewKey: string;
  reviewLabel: string;
  reviewStatus: 'REVIEWED' | 'PENDING';
  isReadOnly: boolean;
  isEditable: false;
}

export interface PreSubmissionMissingItem {
  id: number;
  checkKey: string;
  checkLabel: string;
  checkDetail: string;
  isReadOnly: boolean;
  isCheckable: false;
}

export interface PreSubmissionMisunderstandingItem {
  id: number;
  itemKey: string;
  itemLabel: string;
  itemDetail: string;
  isReadOnly: boolean;
  isCheckable: false;
}

export interface PreSubmissionRiskRecheckItem {
  id: number;
  recheckKey: string;
  recheckLabel: string;
  recheckDetail: string;
  isReadOnly: boolean;
  isCheckable: false;
}

export interface StillForbiddenPreSubmissionItem {
  id: number;
  forbiddenKey: string;
  forbiddenLabel: string;
  forbiddenDetail: string;
  isReadOnly: boolean;
  isReleasable: false;
}

export interface NaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewViewModel {
  preSubmissionReviewOnly: boolean;
  separateApprovalStillRequired: boolean;
  executionStillForbidden: boolean;
  tokenRequestStillForbidden: boolean;
  naverApiCallStillForbidden: boolean;
  operatingDbWriteStillForbidden: boolean;
  priceStockChangeStillForbidden: boolean;
  queueWorkerStillDisconnected: boolean;
  postApiStillNotAdded: boolean;

  screenTitle: string;
  preSubmissionPhaseName: string;
  preSubmissionStatus: string;
  requestPacketCommit: string;
  approvalRequestSubmitted: false;
  approvalRequestSubmitButtonRendered: false;
  approvalRequestSubmitButtonEnabled: false;
  packetReviewItems: PacketReviewItem[];
  missingBeforeSubmissionItems: PreSubmissionMissingItem[];
  misunderstandingPreventionItems: PreSubmissionMisunderstandingItem[];
  riskRecheckItems: PreSubmissionRiskRecheckItem[];
  stillForbiddenItems: StillForbiddenPreSubmissionItem[];
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
  handoffSendButtonRendered: false;
  handoffSendButtonEnabled: false;
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

export function buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewViewModel {
  const packetReviewItems: PacketReviewItem[] = [
    {
      id: 1,
      reviewKey: 'PACKET_CONTENT_REVIEW',
      reviewLabel: '패킷 내용 확인',
      reviewStatus: 'REVIEWED',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 2,
      reviewKey: 'PURPOSE_SCOPE_REVIEW',
      reviewLabel: '목적·범위 확인',
      reviewStatus: 'REVIEWED',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 3,
      reviewKey: 'EVIDENCE_PACKET_REVIEW',
      reviewLabel: '증거 패킷 확인',
      reviewStatus: 'REVIEWED',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 4,
      reviewKey: 'STILL_FORBIDDEN_REVIEW',
      reviewLabel: '강력한 제약사항 확인',
      reviewStatus: 'REVIEWED',
      isReadOnly: true,
      isEditable: false,
    },
  ];

  const missingBeforeSubmissionItems: PreSubmissionMissingItem[] = [
    {
      id: 1,
      checkKey: 'MISSING_APPROVAL_AUTHORITY',
      checkLabel: '승인 권한자 확인',
      checkDetail:
        '실제 별도 승인 권한자가 사전에 지정되어 있는지 확인하세요. 이 화면은 승인 권한자를 저장하거나 지정하는 기능이 없습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 2,
      checkKey: 'MISSING_SUBMISSION_CHANNEL',
      checkLabel: '제출 채널 확인',
      checkDetail:
        '이 화면에는 승인 요청 제출 기능이 없습니다. 실제 제출은 이 화면이 아닌 별도 채널(슬랙, 이메일, 내부 결재 시스템 등)을 통해 진행합니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 3,
      checkKey: 'MISSING_APPROVER_BRIEFING',
      checkLabel: '승인자 브리핑 여부',
      checkDetail:
        '승인 권한자가 이 화면의 전체 read-only 검토 흐름(Task 41~68)을 확인했는지 여부를 사전에 확인하세요.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 4,
      checkKey: 'MISSING_POST_APPROVAL_PLAN',
      checkLabel: '승인 이후 계획',
      checkDetail:
        '별도 승인 이후에도 즉시 실행이 아닙니다. 추가 안전 해제 단계(실행 환경 확인, 잠금 해제 조건 충족)가 필요함을 사전에 인지하세요.',
      isReadOnly: true,
      isCheckable: false,
    },
  ];

  const misunderstandingPreventionItems: PreSubmissionMisunderstandingItem[] = [
    {
      id: 1,
      itemKey: 'REVIEW_NOT_SUBMIT',
      itemLabel: '검토 ≠ 제출',
      itemDetail:
        '이 화면은 승인 요청서 사전검토 화면입니다. 이 화면에서 무언가를 확인한다고 해서 승인 요청이 제출되지 않습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 2,
      itemKey: 'APPROVED_NOT_EXECUTE',
      itemLabel: '별도 승인 ≠ 즉시 실행',
      itemDetail:
        '별도 승인을 받더라도 즉시 실행이 아닙니다. 승인 이후에도 별도 안전 해제 단계가 필요합니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 3,
      itemKey: 'PACKET_NOT_LIVE',
      itemLabel: '패킷 확인 ≠ live 실행',
      itemDetail:
        '승인 요청서 패킷을 화면에서 확인하는 것은 live 실행을 의미하지 않습니다. 어떤 경로로도 실제 API 호출이 발생하지 않습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 4,
      itemKey: 'REVIEW_COMPLETE_NOT_APPROVE',
      itemLabel: '검토 완료 ≠ 승인 완료',
      itemDetail:
        '14개 read-only 검토 흐름이 완료되었다는 것은 검토 단계가 완료된 것입니다. 별도 승인은 이 화면 외부에서 별도로 진행됩니다.',
      isReadOnly: true,
      isCheckable: false,
    },
  ];

  const riskRecheckItems: PreSubmissionRiskRecheckItem[] = [
    {
      id: 1,
      recheckKey: 'RISK_TOKEN_NETWORK',
      recheckLabel: '인증 키 요청 위험',
      recheckDetail:
        '인증 키 요청 경로가 활성화되지 않았음을 재확인하세요. 네트워크 실행 잠금이 활성화되어 있습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 2,
      recheckKey: 'RISK_DB_WRITE',
      recheckLabel: '운영 DB write 위험',
      recheckDetail:
        'Prisma 포함 모든 DB write 경로가 차단되어 있음을 재확인하세요. 가격·재고·상품 정보 DB 변경은 모두 불가합니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 3,
      recheckKey: 'RISK_EXECUTION_FLOW',
      recheckLabel: '실행 흐름 위험',
      recheckDetail:
        '실행 버튼, Queue, Worker, 자동 실행 흐름이 차단되어 있음을 재확인하세요. 어떤 경로로도 실제 실행이 이루어지지 않습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 4,
      recheckKey: 'RISK_EARLY_ACTION',
      recheckLabel: '조기 실행 위험',
      recheckDetail:
        '별도 승인 전 어떤 실행도 이루어지지 않음을 재확인하세요. 승인 요청 제출 버튼도 이 화면에 존재하지 않습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
  ];

  const stillForbiddenItems: StillForbiddenPreSubmissionItem[] = [
    {
      id: 1,
      forbiddenKey: 'TOKEN_REQUEST_FORBIDDEN',
      forbiddenLabel: '인증 키 요청',
      forbiddenDetail:
        '어떤 방식으로도 인증 키 요청 불가. 별도 승인 전까지 금지됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 2,
      forbiddenKey: 'EXTERNAL_API_CALL_FORBIDDEN',
      forbiddenLabel: '외부 서비스 API 호출',
      forbiddenDetail:
        '커머스 플랫폼 API 호출 절대 금지. 네트워크 실행 잠금이 활성화되어 있습니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 3,
      forbiddenKey: 'DB_WRITE_FORBIDDEN',
      forbiddenLabel: '운영 DB write',
      forbiddenDetail:
        'Prisma 포함 모든 DB 저장 작업 금지. 가격·재고·상품 정보 변경 불가입니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 4,
      forbiddenKey: 'PRICE_STOCK_CHANGE_FORBIDDEN',
      forbiddenLabel: '가격·재고 변경',
      forbiddenDetail:
        '상품 가격 및 재고 변경 API 호출 금지. 상품 조회 및 수정 API 호출도 금지됩니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 5,
      forbiddenKey: 'EXECUTION_SUBMIT_FORBIDDEN',
      forbiddenLabel: '실행·승인 제출',
      forbiddenDetail:
        '실행 버튼, Queue, Worker, 승인 요청 제출 기능이 모두 이 화면에 존재하지 않습니다.',
      isReadOnly: true,
      isReleasable: false,
    },
  ];

  return {
    preSubmissionReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,

    screenTitle: 'Token First Test Separate Approval Pre-submission Review',
    preSubmissionPhaseName: '제출 전 사전검토 단계',
    preSubmissionStatus: '미제출 (실행 금지 상태)',
    requestPacketCommit: 'd33c554',
    approvalRequestSubmitted: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,
    packetReviewItems,
    missingBeforeSubmissionItems,
    misunderstandingPreventionItems,
    riskRecheckItems,
    stillForbiddenItems,
    nextStepLabel:
      '이 사전검토 화면은 read-only 전용입니다. 승인 요청 제출이 필요하다면 이 화면이 아닌 별도 채널을 통해 진행하세요. 별도 승인 이후에도 즉시 실행이 아니며 추가 해제 단계가 필요합니다.',

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
    handoffSendButtonRendered: false,
    handoffSendButtonEnabled: false,
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
