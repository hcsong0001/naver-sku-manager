export interface ReadinessDecisionItem {
  id: number;
  decisionKey: string;
  decisionLabel: string;
  decisionValue: string;
  decisionStatus: 'PENDING' | 'NOT_READY' | 'CONDITIONAL';
  isReadOnly: boolean;
  isEditable: false;
}

export interface SubmissionBlockedReasonItem {
  id: number;
  reasonKey: string;
  reasonLabel: string;
  reasonDetail: string;
  isReadOnly: boolean;
  isResolvable: false;
}

export interface UnresolvedBeforeSubmissionItem {
  id: number;
  itemKey: string;
  itemLabel: string;
  itemDetail: string;
  isReadOnly: boolean;
  isCheckable: false;
}

export interface PostSubmissionStillForbiddenItem {
  id: number;
  forbiddenKey: string;
  forbiddenLabel: string;
  forbiddenDetail: string;
  isReadOnly: boolean;
  isReleasable: false;
}

export interface NaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionViewModel {
  submissionDecisionReviewOnly: boolean;
  separateApprovalStillRequired: boolean;
  executionStillForbidden: boolean;
  tokenRequestStillForbidden: boolean;
  naverApiCallStillForbidden: boolean;
  operatingDbWriteStillForbidden: boolean;
  priceStockChangeStillForbidden: boolean;
  queueWorkerStillDisconnected: boolean;
  postApiStillNotAdded: boolean;

  screenTitle: string;
  submissionDecisionPhaseName: string;
  submissionDecisionStatus: string;
  preSubmissionReviewCommit: string;
  approvalRequestSubmitted: false;
  approvalRequestSubmissionAllowed: false;
  approvalRequestSubmitButtonRendered: false;
  approvalRequestSubmitButtonEnabled: false;
  readinessDecisionItems: ReadinessDecisionItem[];
  submissionBlockedReasonItems: SubmissionBlockedReasonItem[];
  unresolvedBeforeSubmissionItems: UnresolvedBeforeSubmissionItem[];
  postSubmissionStillForbiddenItems: PostSubmissionStillForbiddenItem[];
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

export function buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionViewModel {
  const readinessDecisionItems: ReadinessDecisionItem[] = [
    {
      id: 1,
      decisionKey: 'CURRENT_JUDGMENT',
      decisionLabel: '현재 판단',
      decisionValue: '제출 준비 검토 단계 — 아직 제출 불가',
      decisionStatus: 'NOT_READY',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 2,
      decisionKey: 'SUBMISSION_STATUS',
      decisionLabel: '승인 요청 제출 여부',
      decisionValue: '아직 제출 안 됨',
      decisionStatus: 'PENDING',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 3,
      decisionKey: 'SUBMISSION_FEASIBILITY',
      decisionLabel: '제출 가능 판단',
      decisionValue: '아직 별도 확인 필요 — 이 화면에서 제출 불가',
      decisionStatus: 'CONDITIONAL',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 4,
      decisionKey: 'POST_SUBMISSION_EXECUTION',
      decisionLabel: '제출 후 실행 여부',
      decisionValue: '제출되어도 즉시 실행 안 됨 — 별도 안전 해제 단계 필요',
      decisionStatus: 'NOT_READY',
      isReadOnly: true,
      isEditable: false,
    },
    {
      id: 5,
      decisionKey: 'SUBMISSION_CHANNEL',
      decisionLabel: '제출 채널',
      decisionValue: '이 화면 아님 — 별도 채널(슬랙·이메일·내부 결재)에서 진행',
      decisionStatus: 'PENDING',
      isReadOnly: true,
      isEditable: false,
    },
  ];

  const submissionBlockedReasonItems: SubmissionBlockedReasonItem[] = [
    {
      id: 1,
      reasonKey: 'BLOCKED_NO_APPROVAL_AUTHORITY',
      reasonLabel: '승인 권한자 미지정',
      reasonDetail:
        '실제 별도 승인 권한자가 이 화면에서 지정되지 않습니다. 제출 전 별도 채널에서 승인 권한자를 확인하세요.',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 2,
      reasonKey: 'BLOCKED_NO_SUBMISSION_FUNCTION',
      reasonLabel: '제출 기능 없음',
      reasonDetail:
        '이 화면에는 승인 요청 제출 기능이 없습니다. 제출은 별도 채널을 통해 진행해야 합니다.',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 3,
      reasonKey: 'BLOCKED_EXECUTION_LOCK_ACTIVE',
      reasonLabel: '실행 잠금 활성화 중',
      reasonDetail:
        '현재 실행 잠금이 활성화되어 있습니다. 제출 후에도 실행 잠금 해제를 위한 별도 단계가 필요합니다.',
      isReadOnly: true,
      isResolvable: false,
    },
    {
      id: 4,
      reasonKey: 'BLOCKED_SAFETY_GUARD_ACTIVE',
      reasonLabel: '안전 잠금 유지 중',
      reasonDetail:
        '네트워크 잠금, DB write 차단, 인증 키 요청 차단이 모두 활성화 중입니다. 이 상태는 제출 여부와 무관하게 유지됩니다.',
      isReadOnly: true,
      isResolvable: false,
    },
  ];

  const unresolvedBeforeSubmissionItems: UnresolvedBeforeSubmissionItem[] = [
    {
      id: 1,
      itemKey: 'UNRESOLVED_APPROVER_IDENTIFICATION',
      itemLabel: '승인 권한자 확인 미완료',
      itemDetail:
        '승인 권한자를 별도 채널에서 사전 확인 및 합의해야 합니다. 이 화면에서는 권한자를 지정하거나 저장할 수 없습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 2,
      itemKey: 'UNRESOLVED_SUBMISSION_TIMING',
      itemLabel: '제출 시점 미결정',
      itemDetail:
        '승인 요청 제출 시점이 별도 채널에서 합의되지 않았습니다. 이 화면의 판단 결과를 참고하여 제출 시점을 결정하세요.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 3,
      itemKey: 'UNRESOLVED_POST_APPROVAL_PLAN',
      itemLabel: '승인 이후 계획 미확인',
      itemDetail:
        '별도 승인 이후 추가 해제 단계(실행 환경 확인, 안전 잠금 해제 조건 충족) 계획이 확인되지 않았습니다.',
      isReadOnly: true,
      isCheckable: false,
    },
    {
      id: 4,
      itemKey: 'UNRESOLVED_APPROVER_BRIEFING',
      itemLabel: '승인자 브리핑 미완료',
      itemDetail:
        '승인 권한자가 이 화면의 전체 read-only 검토 흐름(Task 41~69)을 확인했는지 별도 확인이 필요합니다.',
      isReadOnly: true,
      isCheckable: false,
    },
  ];

  const postSubmissionStillForbiddenItems: PostSubmissionStillForbiddenItem[] = [
    {
      id: 1,
      forbiddenKey: 'POST_SUBMISSION_TOKEN_FORBIDDEN',
      forbiddenLabel: '인증 키 요청',
      forbiddenDetail:
        '별도 승인 이후에도 인증 키 요청은 추가 해제 단계 없이 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 2,
      forbiddenKey: 'POST_SUBMISSION_API_CALL_FORBIDDEN',
      forbiddenLabel: '외부 서비스 API 호출',
      forbiddenDetail:
        '별도 승인 이후에도 외부 커머스 API 호출은 추가 해제 단계 없이 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 3,
      forbiddenKey: 'POST_SUBMISSION_DB_WRITE_FORBIDDEN',
      forbiddenLabel: '운영 DB write',
      forbiddenDetail:
        '별도 승인 이후에도 DB write 작업은 추가 해제 단계 없이 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 4,
      forbiddenKey: 'POST_SUBMISSION_EXECUTION_FORBIDDEN',
      forbiddenLabel: '실행 흐름 연결',
      forbiddenDetail:
        '별도 승인 이후에도 실행 버튼, Queue, Worker 연결은 추가 해제 단계 없이 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
    {
      id: 5,
      forbiddenKey: 'POST_SUBMISSION_PRICE_STOCK_FORBIDDEN',
      forbiddenLabel: '가격·재고 변경',
      forbiddenDetail:
        '별도 승인 이후에도 가격·재고 변경 API 호출은 추가 해제 단계 없이 불가합니다.',
      isReadOnly: true,
      isReleasable: false,
    },
  ];

  return {
    submissionDecisionReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,

    screenTitle: 'Token First Test Separate Approval Submission Readiness Decision',
    submissionDecisionPhaseName: '제출 준비 판단 단계',
    submissionDecisionStatus: '제출 불가 (추가 확인 필요 상태)',
    preSubmissionReviewCommit: '9568fac',
    approvalRequestSubmitted: false,
    approvalRequestSubmissionAllowed: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,
    readinessDecisionItems,
    submissionBlockedReasonItems,
    unresolvedBeforeSubmissionItems,
    postSubmissionStillForbiddenItems,
    nextStepLabel:
      '이 화면은 제출 준비 판단 전용 read-only 화면입니다. 승인 요청 제출이 필요하다면 이 화면이 아닌 별도 채널을 통해 진행하세요. 제출 후에도 즉시 실행이 아니며 추가 안전 해제 단계가 필요합니다.',

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
