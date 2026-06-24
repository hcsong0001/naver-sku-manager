/**
 * Task 43 - Test DB Save Approval Contract Review / No-Route No-Write Flow
 *
 * 이 서비스는 향후 Test DB에 Go Ticket 승인 이벤트를 저장할 API의
 * 요청 타입·응답 타입·거부 조건을 read-only/no-write로 설계한 View Model입니다.
 *
 * - 실제 route 생성이 아닙니다.
 * - 실제 POST 요청이 아닙니다.
 * - 실제 DB write가 아닙니다.
 * - No-route / No-write 계약 리뷰 전용입니다.
 */

export interface SaveContractRequestShape {
  jobId: string;
  readinessStatus: string;
  checklistTotalCount: 14;
  checklistCheckedCount: number;
  allChecklistChecked: boolean;
  previewMode: true;
  saveTarget: 'TEST_DB_ONLY_FUTURE_TASK';
  acknowledgementKeys: string[];
  safetyFlags: Record<string, false>;
  requestedByUserAction: true;
  requestedAt: string;
  dryRunOnly: true;
}

export interface SaveContractResponseShape {
  ok: boolean;
  rejected: boolean;
  rejectionReasons: string[];
  saved: false;
  dbWriteExecuted: false;
  prismaMutationExecuted: false;
  goTicketIssued: false;
  executionLeaseIssued: false;
  tokenIssued: false;
  nextRequiredAction: string;
}

export interface SaveContractRejectionRule {
  key: string;
  condition: string;
  reason: string;
}

export interface GoTicketSaveContractReviewViewModel {
  contractReviewCreated: boolean;
  localOnly: boolean;
  readOnly: boolean;
  noRoute: boolean;
  noWrite: boolean;
  requestShapeCreated: boolean;
  responseShapeCreated: boolean;
  rejectionRulesCreated: boolean;
  checklistStateEvaluated: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;

  checklistTotalCount: 14;
  checklistCheckedCount: number;
  allChecklistChecked: boolean;

  requestShape: SaveContractRequestShape;
  responseShape: SaveContractResponseShape;
  rejectionRules: SaveContractRejectionRule[];

  // 강제 차단 플래그 (Contract review에서도 안전 보장)
  routeCreated: false;
  postHandlerCreated: false;
  saveButtonEnabled: false;
  saveApiCalled: false;
  saveRequestCreated: false;
  approvalPersisted: false;
  approvalSubmitted: false;
  approvalApiCalled: false;
  screenActionEnabled: false;
  liveTokenTestApproved: false;
  liveTokenTestExecutionAllowed: false;
  dbWriteAllowed: false;
  testDbWriteExecuted: false;
  operatingDbWriteExecuted: false;
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

export interface BuildSaveContractReviewInput {
  jobId?: string;
  checklistCheckedCount?: number;
  readinessStatus?: string;
}

const REJECTION_RULES: SaveContractRejectionRule[] = [
  {
    key: 'checklistIncomplete',
    condition: 'checklist가 14개 모두 체크되지 않음',
    reason: '모든 Manual Approval Checklist 항목을 체크해야 합니다.',
  },
  {
    key: 'previewModeNotTrue',
    condition: 'previewMode가 true가 아님',
    reason: 'previewMode=true가 아니면 저장 요청이 거부됩니다.',
  },
  {
    key: 'saveTargetInvalid',
    condition: 'saveTarget이 TEST_DB_ONLY_FUTURE_TASK가 아님',
    reason: 'saveTarget은 반드시 TEST_DB_ONLY_FUTURE_TASK여야 합니다.',
  },
  {
    key: 'readinessNotConfirmed',
    condition: 'readiness 상태가 확인되지 않음',
    reason: 'Readiness 상태가 READY로 확인되지 않으면 거부됩니다.',
  },
  {
    key: 'tokenRequestIncluded',
    condition: '실제 token 요청이 포함됨',
    reason: 'token 요청이 포함된 경우 즉시 거부됩니다.',
  },
  {
    key: 'sensitiveValueIncluded',
    condition: 'token/secret/header/endpoint 원문이 포함됨',
    reason: 'access token, refresh token, client secret, Authorization header, endpoint URL 원문은 포함 불가합니다.',
  },
  {
    key: 'requestPayloadIncluded',
    condition: 'request payload/body/header가 포함됨',
    reason: '실제 HTTP request payload/body/header가 포함된 경우 거부됩니다.',
  },
  {
    key: 'targetIsOperatingDb',
    condition: '운영 DB 대상임',
    reason: '운영 DB는 저장 대상이 될 수 없습니다. Test DB 전용입니다.',
  },
  {
    key: 'naverApiCallIncluded',
    condition: 'Naver API 호출이 포함됨',
    reason: 'Naver API 호출이 포함된 경우 거부됩니다.',
  },
  {
    key: 'priceOrStockChangeIncluded',
    condition: '가격/재고 변경이 포함됨',
    reason: '가격 또는 재고 변경 요청이 포함된 경우 즉시 거부됩니다.',
  },
  {
    key: 'queueOrWorkerIncluded',
    condition: 'Queue/Worker 실행이 포함됨',
    reason: 'Queue 또는 Worker 실행이 포함된 경우 거부됩니다.',
  },
  {
    key: 'duplicateSaveRisk',
    condition: '중복 저장 위험 있음',
    reason: '이미 동일한 jobId로 저장 시도가 있었던 경우 거부됩니다.',
  },
  {
    key: 'alreadySaved',
    condition: '이미 저장됨',
    reason: '이미 저장된 승인 이벤트는 재저장할 수 없습니다.',
  },
  {
    key: 'expired',
    condition: '만료됨',
    reason: '승인 이벤트 유효 시간이 만료된 경우 거부됩니다.',
  },
  {
    key: 'noSeparateApproval',
    condition: '별도 사용자 승인 없음',
    reason: '별도 사용자 승인 없이는 Test DB 저장도 허용되지 않습니다.',
  },
];

export function buildGoTicketSaveContractReview(
  input?: BuildSaveContractReviewInput | null,
): GoTicketSaveContractReviewViewModel {
  const safeInput = input ?? {};
  const checkedCount = safeInput.checklistCheckedCount ?? 0;
  const jobId = safeInput.jobId ?? '(unknown)';
  const readinessStatus = safeInput.readinessStatus ?? 'NOT_STARTED';
  const allChecked = checkedCount >= 14;

  const requestShape: SaveContractRequestShape = {
    jobId,
    readinessStatus,
    checklistTotalCount: 14,
    checklistCheckedCount: checkedCount,
    allChecklistChecked: allChecked,
    previewMode: true,
    saveTarget: 'TEST_DB_ONLY_FUTURE_TASK',
    acknowledgementKeys: [
      'goTicketNotToken',
      'goTicketOneTimeOnly',
      'goTicketNeedsSeparateTask',
      'tokenRequestNotApproved',
      'productQueryNotApproved',
      'productUpdateNotApproved',
      'queueNotApproved',
      'workerNotApproved',
      'tokenStorageForbidden',
      'tokenLoggingForbidden',
      'tokenUiForbidden',
      'autoRetryForbidden',
      'tokenDisposalOnSuccess',
      'nextStepNeedsSeparateApproval',
    ],
    safetyFlags: {
      dbWriteExecuted: false,
      goTicketIssued: false,
      tokenIssued: false,
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
    },
    requestedByUserAction: true,
    requestedAt: '(미래 Task에서 실제 시각이 채워집니다)',
    dryRunOnly: true,
  };

  const responseShape: SaveContractResponseShape = {
    ok: false,
    rejected: true,
    rejectionReasons: ['(미래 Task에서 실제 거부 사유가 채워집니다)'],
    saved: false,
    dbWriteExecuted: false,
    prismaMutationExecuted: false,
    goTicketIssued: false,
    executionLeaseIssued: false,
    tokenIssued: false,
    nextRequiredAction: '별도 사용자 승인 후 Test DB 전용 저장 Task 필요',
  };

  return {
    contractReviewCreated: true,
    localOnly: true,
    readOnly: true,
    noRoute: true,
    noWrite: true,
    requestShapeCreated: true,
    responseShapeCreated: true,
    rejectionRulesCreated: true,
    checklistStateEvaluated: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,

    checklistTotalCount: 14,
    checklistCheckedCount: checkedCount,
    allChecklistChecked: allChecked,

    requestShape,
    responseShape,
    rejectionRules: REJECTION_RULES,

    routeCreated: false,
    postHandlerCreated: false,
    saveButtonEnabled: false,
    saveApiCalled: false,
    saveRequestCreated: false,
    approvalPersisted: false,
    approvalSubmitted: false,
    approvalApiCalled: false,
    screenActionEnabled: false,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    dbWriteAllowed: false,
    testDbWriteExecuted: false,
    operatingDbWriteExecuted: false,
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
