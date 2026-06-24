// src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-packet-view.service.ts

export function buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView(job: any | null | undefined) {
  return {
    requestPacketCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    finalBlockerSummaryCompleted: true,
    requestPacketReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,

    screenTitle: '별도 승인 요청서 초안 (Separate Approval Request Packet Draft)',
    requestPacketPhaseName: 'PHASE 3.5 - APPROVAL REQUEST PACKET',
    requestPacketStatus: 'DRAFT_NOT_SUBMITTED (제출되지 않음)',
    finalBlockerSummaryCommit: '264da2b',

    approvalRequestSubmitted: false,
    approvalRequestSubmitButtonRendered: false,
    approvalRequestSubmitButtonEnabled: false,

    requestPurposeItems: [
      {
        id: 1,
        purposeLabel: '1회성 인증 토큰 테스트 실행 허가',
        purposeDetail: 'Naver API 인증 체계(Client ID, Secret 등)의 유효성을 운영 환경에서 단 1회 안전하게 검증하기 위함입니다.',
      },
      {
        id: 2,
        purposeLabel: '네트워크 어댑터 임시 활성화 허가',
        purposeDetail: '테스트 실행 시점에 한해 샌드박스 내부의 외부 네트워크 어댑터를 임시로 열고 통신할 수 있는 권한을 요청합니다.',
      }
    ],

    requestScopeItems: [
      {
        id: 1,
        scopeLabel: '실행 대상',
        scopeDetail: '오직 "토큰 요청(POST /oauth2.0/token)" 단 1개의 엔드포인트 호출에 국한됩니다.',
      },
      {
        id: 2,
        scopeLabel: '운영 데이터 접근 여부',
        scopeDetail: '접근 불가. DB Read/Write는 여전히 원천 차단된 상태에서 메모리 기반의 검증만 수행됩니다.',
      }
    ],

    evidencePacketItems: [
      {
        id: 1,
        evidenceLabel: 'Task 45-66: 위험 분석 및 완화 계획 수립 결과',
        evidenceDetail: '망분리 환경, Sandbox 보안 정책 준수 등 사전에 수립된 위험 통제 계획서가 포함되어 있습니다.',
      },
      {
        id: 2,
        evidenceLabel: 'Task 67: 최종 차단 조건 식별 결과',
        evidenceDetail: '별도 승인 없이는 결코 실행될 수 없도록 시스템 레벨의 Hard-coded Lock이 존재함을 증명합니다.',
      }
    ],

    preSubmissionCheckItems: [
      {
        id: 1,
        checkLabel: '승인 요청서를 열람하는 것만으로는 어떠한 권한도 부여되지 않음',
        isConfirmed: true,
      },
      {
        id: 2,
        checkLabel: '실제 승인 요청을 전송하기 위한 버튼/API는 본 시스템에 아직 구현되어 있지 않음',
        isConfirmed: true,
      },
      {
        id: 3,
        checkLabel: '모든 검토 내용은 Read-only 형태의 보고서로만 존재하며, DB에 저장되지 않음',
        isConfirmed: true,
      }
    ],

    stillForbiddenItems: [
      { id: 1, forbiddenLabel: '운영 DB Write', forbiddenDetail: '테스트 승인 전 영구 금지' },
      { id: 2, forbiddenLabel: '실제 Naver Token 발급', forbiddenDetail: '테스트 승인 전 영구 금지' },
      { id: 3, forbiddenLabel: 'Naver API 외부 호출', forbiddenDetail: '테스트 승인 전 영구 금지' },
      { id: 4, forbiddenLabel: '가격/재고 데이터 변형', forbiddenDetail: '별도 테스트 승인 무관하게 영구 금지' }
    ],

    nextStepLabel: '다음 단계로, 이 승인 요청 패킷을 수동으로 어드민에게 제출했다고 가정하고 이어지는 [별도 승인 결과 수신(수동 모의)] 단계를 준비합니다.',

    // Safety Flags
    executionButtonRendered: false,
    approvalButtonRendered: false,
    formRendered: false,
    postApiEnabled: false,
    dbWriteAllowed: false,
    dbWriteExecuted: false,
    prismaMutationExecuted: false,
    naverApiCallAllowed: false,
    tokenRequestAllowed: false,
    tokenIssued: false,
    authorizationHeaderCreated: false,
    endpointCalled: false,
    queueAllowed: false,
    workerAllowed: false,
    requestPacketSaveButtonRendered: false,
    requestPacketSaveButtonEnabled: false,
  };
}
