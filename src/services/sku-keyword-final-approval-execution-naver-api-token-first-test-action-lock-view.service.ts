/**
 * Task 43 - Token First Test Action Lock Read-only Screen Flow
 *
 * 이 서비스는 Token First Test Final Confirmation Gate 다음에 표시될 Action Lock의
 * Read-only View Model을 생성하는 순수 함수입니다.
 * * 실제 API 호출이나 DB 저장을 하지 않으며, UI에서 확인할 잠금 상태 항목들만 제공합니다.
 */

import type { NaverApiTokenFirstTestFinalConfirmationGateViewModel } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-gate-view.service';

export interface ActionLockReasonItem {
  id: number;
  message: string;
}

export interface NaverApiTokenFirstTestActionLockViewModel {
  // Required True flags
  actionLockViewCreated: boolean;
  displayOnly: boolean;
  readOnly: boolean;
  actionLocked: boolean;
  lockReasonsCreated: boolean;
  safetySummaryCreated: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;

  // View content
  title: string;
  description: string;
  warningMessage: string;
  lockReasons: ActionLockReasonItem[];
  // Required False flags
  actionButtonRendered: false;
  actionButtonEnabled: false;
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

export function buildNaverApiTokenFirstTestActionLockView(
  gateInput?: NaverApiTokenFirstTestFinalConfirmationGateViewModel | null
): NaverApiTokenFirstTestActionLockViewModel {
  const lockReasons: ActionLockReasonItem[] = [
    { id: 1, message: '실제 Naver API 호출은 별도 승인 전까지 금지' },
    { id: 2, message: 'access token 요청은 별도 승인 전까지 금지' },
    { id: 3, message: 'refresh token 요청은 별도 승인 전까지 금지' },
    { id: 4, message: 'token 발급은 별도 승인 전까지 금지' },
    { id: 5, message: '인증 헤더(Auth/Token) 생성은 금지' },
    { id: 6, message: 'Naver endpoint URL 추가는 금지' },
    { id: 7, message: '운영 DB write는 금지' },
    { id: 8, message: 'Prisma mutation은 금지' },
    { id: 9, message: '가격 변경은 금지' },
    { id: 10, message: '재고 변경은 금지' },
    { id: 11, message: '상품 조회 API 호출은 금지' },
    { id: 12, message: '상품 수정 API 호출은 금지' },
    { id: 13, message: 'Live 실행 버튼은 없음' },
    { id: 14, message: 'Token 발급 테스트 실행 버튼은 없음' },
    { id: 15, message: 'Queue/Worker 자동 실행 흐름은 연결되지 않음' },
    { id: 16, message: '다음 단계는 별도 사용자 승인 필요' }
  ];

  return {
    actionLockViewCreated: true,
    displayOnly: true,
    readOnly: true,
    actionLocked: true,
    lockReasonsCreated: true,
    safetySummaryCreated: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,

    title: 'Token First Test Action Lock',
    description: '이 영역은 실제 token 발급 실행이 아니라, 실행이 잠겨 있는 이유를 보여주는 read-only 상태 영역입니다.',
    warningMessage: '현재 단계에서는 실행 기능이 잠겨 있으며, 상태 확인만 가능합니다.',
    lockReasons,

    actionButtonRendered: false,
    actionButtonEnabled: false,
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
    workerAllowed: false
  };
}
