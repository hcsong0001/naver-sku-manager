export interface ApprovalRequestDraftSection {
  id: number;
  sectionKey: string;
  sectionTitle: string;
  sectionContent: string;
  isReadOnly: boolean;
  isSubmittable: false;
}

export interface NaverApiTokenFirstTestSeparateApprovalRequestDraftViewModel {
  approvalRequestDraftCreated: boolean;
  displayOnly: boolean;
  readOnly: boolean;
  executionLocked: boolean;
  draftIsReadOnly: boolean;
  approvalNotYetRequested: boolean;
  manualReviewRequired: boolean;
  requiresSeparateLiveApproval: boolean;
  tokenTestStillNotAllowed: boolean;

  title: string;
  draftLabel: string;
  draftPurpose: string;
  currentStatusSummary: string;
  whyNotAllowedYet: string;
  approvalRequestSections: ApprovalRequestDraftSection[];
  stillProhibitedItems: string[];
  draftNote: string;

  executionButtonRendered: false;
  executionButtonEnabled: false;
  approvalButtonRendered: false;
  approvalButtonEnabled: false;
  approvalRequestSubmitButtonRendered: false;
  approvalRequestSubmitButtonEnabled: false;
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

export function buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalRequestDraftViewModel {
  const approvalRequestSections: ApprovalRequestDraftSection[] = [
    {
      id: 1,
      sectionKey: 'CURRENT_STATUS',
      sectionTitle: '현재 실행 상태 요약',
      sectionContent:
        '현재 Token First Test 실행은 잠겨 있습니다. 실행 잠금, 네트워크 차단, DB write 차단이 모두 활성화되어 있으며, 이 상태에서 token 발급 테스트는 실행 불가입니다. 이 상태는 안전 검토가 완료될 때까지 유지됩니다.',
      isReadOnly: true,
      isSubmittable: false,
    },
    {
      id: 2,
      sectionKey: 'WHY_NOT_ALLOWED',
      sectionTitle: '아직 실행 불가인 이유',
      sectionContent:
        'token 발급 테스트를 실행하려면 별도 명시적 승인이 필요합니다. 현재 10개 검토 패널(Hub Navigation, Section Layout, Readiness, Final Confirmation Gate, Action Lock, Safety Review, Safe Next Step Guide, Separate Approval Packet, Approval Evidence Timeline, Approval Console)이 모두 read-only 검토 상태이며, 실행 버튼이 존재하지 않습니다.',
      isReadOnly: true,
      isSubmittable: false,
    },
    {
      id: 3,
      sectionKey: 'APPROVAL_PURPOSE',
      sectionTitle: '별도 승인 요청 목적',
      sectionContent:
        '이 승인 요청의 목적은 TMS 내부 검토 절차를 완료하고, 담당자가 실제 token 발급 테스트를 안전하게 실행할 수 있는 조건이 갖추어졌는지 확인받는 것입니다. 승인은 "실행 가능"을 의미하는 것이 아니라, 검토된 안전 조건 하에서만 단 한 번의 테스트를 허용하는 의미입니다.',
      isReadOnly: true,
      isSubmittable: false,
    },
    {
      id: 4,
      sectionKey: 'SAFETY_EVIDENCE',
      sectionTitle: '승인자가 확인해야 할 안전 근거',
      sectionContent:
        '승인자는 다음을 확인해야 합니다: (1) 실행 환경이 테스트 전용 환경임을 확인, (2) 인증 정보가 운영 환경에 노출되지 않음을 확인, (3) 네트워크 격리 상태가 유지되고 있음을 확인, (4) DB write 차단이 활성화되어 있음을 확인, (5) 가격 및 재고 변경 경로가 차단되어 있음을 확인, (6) 상품 조회 및 수정 API 호출 경로가 차단되어 있음을 확인.',
      isReadOnly: true,
      isSubmittable: false,
    },
    {
      id: 5,
      sectionKey: 'UNLOCK_CONDITIONS',
      sectionTitle: '승인 이후에도 필요한 잠금 해제 조건',
      sectionContent:
        '별도 승인을 받더라도 다음 조건이 충족되어야 실행 가능합니다: (1) 테스트 전용 인증 설정 파일만 사용, (2) 실행 환경 안전 가드 통과, (3) 단 1회 실행으로 제한, (4) 실행 결과 원문은 화면에 표시하지 않음, (5) 운영 DB write 경로 완전 차단 확인, (6) 승인 직후 즉시 실행 잠금 복원.',
      isReadOnly: true,
      isSubmittable: false,
    },
    {
      id: 6,
      sectionKey: 'PROHIBITED_ITEMS',
      sectionTitle: '승인 이후에도 여전히 금지된 항목',
      sectionContent:
        '별도 승인 이후에도 다음은 절대 금지입니다: 운영 DB write, 가격 변경, 재고 변경, 상품 조회 API 호출, 상품 수정 API 호출, Queue/Worker 연결 실행, 무단 재실행, token 원문 화면 표시, 인증 키 외부 저장.',
      isReadOnly: true,
      isSubmittable: false,
    },
  ];

  const stillProhibitedItems: string[] = [
    'token 원문 발급 및 화면 표시 금지 — 발급 결과를 화면에 노출하거나 저장하지 않음',
    '인증 키 요청 금지 — 어떤 방식으로도 인증 키를 외부 서비스에 요청하지 않음',
    '인증 토큰 갱신 요청 금지 — 만료된 인증 정보 갱신 요청 포함 금지',
    '운영 DB write 금지 — Prisma 포함 어떤 DB 저장 작업도 금지',
    '가격 변경 금지 — 상품 가격 수정 API 호출 또는 DB write 금지',
    '재고 변경 금지 — 상품 재고 수정 API 호출 또는 DB write 금지',
    '상품 조회 API 금지 — 상품 목록 또는 개별 상품 조회 API 호출 금지',
    '상품 수정 API 금지 — 상품 정보 수정 API 호출 금지',
    'Queue/Worker 실행 금지 — 자동화 작업 Queue 또는 Worker 연결 금지',
    '무단 재실행 금지 — 별도 명시적 승인 없이 반복 실행 금지',
  ];

  return {
    approvalRequestDraftCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    draftIsReadOnly: true,
    approvalNotYetRequested: true,
    manualReviewRequired: true,
    requiresSeparateLiveApproval: true,
    tokenTestStillNotAllowed: true,

    title: 'Token First Test Separate Approval Request Draft',
    draftLabel: '별도 승인 요청 초안 (검토용 문서 — 제출 기능 없음)',
    draftPurpose:
      '이 화면은 실제 별도 승인 요청 제출 화면이 아닙니다. 사용자가 별도 승인 요청에 어떤 내용이 필요한지 read-only 문서 형태로 확인하기 위한 초안입니다.',
    currentStatusSummary:
      'Token First Test 실행 잠금 활성화 | 네트워크 차단 | DB write 차단 | 별도 승인 대기 상태',
    whyNotAllowedYet:
      '10개 검토 패널 read-only 검토 완료 후, 별도 명시적 승인 이후에만 실행 가능합니다.',
    approvalRequestSections,
    stillProhibitedItems,
    draftNote:
      '이 초안은 화면 검토용 문서입니다. 실제 승인 요청 제출, 저장, 실행 기능은 이 화면에 존재하지 않습니다.',

    executionButtonRendered: false,
    executionButtonEnabled: false,
    approvalButtonRendered: false,
    approvalButtonEnabled: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,
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
