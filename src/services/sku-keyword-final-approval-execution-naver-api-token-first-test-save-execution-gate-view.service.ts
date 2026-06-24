/**
 * Task 46 - Test DB Save Execution Gate / Still No-Write Final Gate Flow
 *
 * 이 서비스는 Test DB 저장을 허용하기 전 마지막 Gate를 판정하는 순수 함수입니다.
 *
 * - 실제 저장이 아닙니다.
 * - DB write가 아닙니다.
 * - Go Ticket 발급이 아닙니다.
 * - token 발급이 아닙니다.
 * - Naver API 호출이 아닙니다.
 * - Gate 판정만 수행하는 순수 함수입니다.
 * - Gate가 PASS여도 저장 버튼은 없습니다.
 */

export type ExecutionGateStatus =
  | 'WAITING_FOR_DRY_RUN'
  | 'WAITING_FOR_FINAL_CONFIRMATION'
  | 'BLOCKED_BY_DRY_RUN_REJECTION'
  | 'BLOCKED_BY_SAFETY_FLAGS'
  | 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY'
  | 'STILL_NO_WRITE';

export interface BuildExecutionGateInput {
  dryRunOk?: boolean;
  dryRunRejected?: boolean;
  dryRunSaved?: boolean;
  dryRunDbWriteExecuted?: boolean;
  dryRunPrismaMutationExecuted?: boolean;
  dryRunTokenIssued?: boolean;
  dryRunNaverApiCallExecuted?: boolean;
  finalConfirmationAllChecked?: boolean;
  finalConfirmationCheckedCount?: number;
}

export interface ExecutionGateViewModel {
  executionGateCreated: true;
  localOnly: true;
  readOnly: true;
  stillNoWrite: true;
  dryRunResultEvaluated: true;
  finalConfirmationEvaluated: true;
  gateRulesEvaluated: true;
  manualReviewRequired: true;
  requiresSeparateLiveApproval: true;

  gateStatus: ExecutionGateStatus;
  gateStatusMessage: string;
  gateBlockedReasons: string[];

  saveButtonEnabled: false;
  saveApiCalled: false;
  saveRequestCreated: false;
  saved: false;
  testDbWriteExecuted: false;
  operatingDbWriteExecuted: false;
  dbWriteExecuted: false;
  prismaMutationExecuted: false;
  goTicketIssued: false;
  executionLeaseIssued: false;
  approvalPersisted: false;
  approvalSubmitted: false;
  liveTokenTestApproved: false;
  liveTokenTestExecutionAllowed: false;
  persistenceExecuted: false;
  metadataPersisted: false;
  auditEventPersisted: false;
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
  naverApiCallExecuted: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
}

function resolveGate(input: BuildExecutionGateInput): {
  status: ExecutionGateStatus;
  blockedReasons: string[];
} {
  const blockedReasons: string[] = [];

  if (input.dryRunOk === undefined && input.dryRunRejected === undefined) {
    return { status: 'WAITING_FOR_DRY_RUN', blockedReasons: [] };
  }

  if (input.dryRunRejected === true || input.dryRunOk !== true) {
    return { status: 'BLOCKED_BY_DRY_RUN_REJECTION', blockedReasons: ['Dry-run 검증이 거부됨'] };
  }

  if (input.dryRunSaved === true) {
    blockedReasons.push('saved=true — 안전 불변 조건 위반');
  }
  if (input.dryRunDbWriteExecuted === true) {
    blockedReasons.push('dbWriteExecuted=true — 안전 불변 조건 위반');
  }
  if (input.dryRunPrismaMutationExecuted === true) {
    blockedReasons.push('prismaMutationExecuted=true — 안전 불변 조건 위반');
  }
  if (input.dryRunTokenIssued === true) {
    blockedReasons.push('tokenIssued=true — 안전 불변 조건 위반');
  }
  if (input.dryRunNaverApiCallExecuted === true) {
    blockedReasons.push('naverApiCallExecuted=true — 안전 불변 조건 위반');
  }

  if (blockedReasons.length > 0) {
    return { status: 'BLOCKED_BY_SAFETY_FLAGS', blockedReasons };
  }

  if (!input.finalConfirmationAllChecked) {
    return { status: 'WAITING_FOR_FINAL_CONFIRMATION', blockedReasons: [] };
  }

  return { status: 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY', blockedReasons: [] };
}

function resolveStatusMessage(status: ExecutionGateStatus): string {
  switch (status) {
    case 'WAITING_FOR_DRY_RUN':
      return 'Dry-run 검증을 먼저 실행하세요 — 검증 완료 후 Gate 판정이 시작됩니다.';
    case 'BLOCKED_BY_DRY_RUN_REJECTION':
      return 'Dry-run 검증이 거부됨 — 거부 사유를 해결하고 다시 검증하세요.';
    case 'BLOCKED_BY_SAFETY_FLAGS':
      return '안전 불변 조건 위반 감지 — Gate가 차단됨. 아래 위반 항목을 확인하세요.';
    case 'WAITING_FOR_FINAL_CONFIRMATION':
      return 'Final Confirmation 10개 항목을 모두 체크하면 Gate 판정이 완료됩니다.';
    case 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY':
      return 'Gate PASS — 다음 Task에서만 Test DB 저장 구현 가능. 저장 버튼은 아직 없습니다.';
    default:
      return '현재 상태를 확인하세요.';
  }
}

export function buildExecutionGateView(
  input?: BuildExecutionGateInput,
): ExecutionGateViewModel {
  const safeInput: BuildExecutionGateInput = input ?? {};
  const { status, blockedReasons } = resolveGate(safeInput);

  return {
    executionGateCreated: true,
    localOnly: true,
    readOnly: true,
    stillNoWrite: true,
    dryRunResultEvaluated: true,
    finalConfirmationEvaluated: true,
    gateRulesEvaluated: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,

    gateStatus: status,
    gateStatusMessage: resolveStatusMessage(status),
    gateBlockedReasons: blockedReasons,

    saveButtonEnabled: false,
    saveApiCalled: false,
    saveRequestCreated: false,
    saved: false,
    testDbWriteExecuted: false,
    operatingDbWriteExecuted: false,
    dbWriteExecuted: false,
    prismaMutationExecuted: false,
    goTicketIssued: false,
    executionLeaseIssued: false,
    approvalPersisted: false,
    approvalSubmitted: false,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    persistenceExecuted: false,
    metadataPersisted: false,
    auditEventPersisted: false,
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
    naverApiCallExecuted: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
  };
}
