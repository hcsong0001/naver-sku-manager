// src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-blocker-summary-view.service.ts

export function buildNaverApiTokenFirstTestSeparateApprovalFinalBlockerSummaryView(job: any | null | undefined) {
  return {
    finalBlockerSummaryCreated: true,
    displayOnly: true,
    readOnly: true,
    executionLocked: true,
    riskMitigationPlanCompleted: true,
    finalBlockerReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,

    screenTitle: '별도 승인 진입 전 최종 차단 사유 요약 (Separate Approval Final Blocker Summary)',
    finalBlockerPhaseName: 'PHASE 3.4 - FINAL BLOCKER SUMMARY',
    finalBlockerStatus: 'BLOCKED (별도 승인 필요)',
    riskMitigationPlanCommit: '7ce4cff',

    finalBlockerItems: [
      {
        id: 1,
        blockerKey: 'SEPARATE_APPROVAL_MISSING',
        blockerLabel: '별도 승인서 (Separate Approval Request) 부재',
        blockerStatus: 'BLOCKED',
        blockerReason: '모든 위험 완화 계획이 수립되었으나, 실제 테스트 실행을 위해서는 별도로 승인권자(어드민)의 명시적 승인이 포함된 요청서(패킷)가 필요합니다.',
        forbiddenFunction: '테스트 실행 권한',
        stillForbidden: true,
        immediateExecutionPossible: false,
      },
      {
        id: 2,
        blockerKey: 'NETWORK_ISOLATION_ACTIVE',
        blockerLabel: '외부 네트워크 망분리 유지',
        blockerStatus: 'BLOCKED',
        blockerReason: '별도 승인이 확인되기 전까지 Naver API 등 일체의 외부 네트워크 통신은 차단되어야 합니다.',
        forbiddenFunction: 'Naver API 호출, Access/Refresh Token 요청',
        stillForbidden: true,
        immediateExecutionPossible: false,
      },
      {
        id: 3,
        blockerKey: 'DB_WRITE_LOCK_ACTIVE',
        blockerLabel: '운영 DB 쓰기 잠금 유지',
        blockerStatus: 'BLOCKED',
        blockerReason: '승인되지 않은 상태에서의 DB 변경을 방지하기 위해 운영 DB 쓰기 권한이 잠겨 있습니다.',
        forbiddenFunction: 'Prisma Mutation, 데이터베이스 변경',
        stillForbidden: true,
        immediateExecutionPossible: false,
      },
      {
        id: 4,
        blockerKey: 'OPERATION_API_LOCK_ACTIVE',
        blockerLabel: '실제 운영 조작 금지 유지',
        blockerStatus: 'BLOCKED',
        blockerReason: '가격/재고 등 실제 운영 데이터에 영향을 주는 조작은 이 별도 승인으로도 해제되지 않으며 영구 차단됩니다.',
        forbiddenFunction: '가격/재고 수정 API 호출',
        stillForbidden: true,
        immediateExecutionPossible: false,
      },
      {
        id: 5,
        blockerKey: 'UI_EXECUTION_BUTTON_LOCKED',
        blockerLabel: 'UI 실행 버튼 렌더링 차단 유지',
        blockerStatus: 'BLOCKED',
        blockerReason: '별도 승인서 초안(Draft) 및 제출/승인 완료 전까지는 클라이언트에서 어떠한 형태의 실행 버튼도 표시될 수 없습니다.',
        forbiddenFunction: '테스트 실행 버튼 표시',
        stillForbidden: true,
        immediateExecutionPossible: false,
      },
      {
        id: 6,
        blockerKey: 'POST_API_WORKER_LOCKED',
        blockerLabel: '비동기 워커 연결 차단 유지',
        blockerStatus: 'BLOCKED',
        blockerReason: '승인 전 POST API 엔드포인트 호출 및 Queue/Worker 스레드 할당이 전면 차단됩니다.',
        forbiddenFunction: '비동기 작업 큐 등록, Worker 실행',
        stillForbidden: true,
        immediateExecutionPossible: false,
      }
    ],

    unresolvedBlockerItems: [
      {
        id: 1,
        forbiddenLabel: '실제 가격/재고 변경 API',
        forbiddenDetail: '별도 승인이 완료되어 테스트가 실행되더라도 가격/재고 변경 기능은 영구 차단됩니다.',
      },
      {
        id: 2,
        forbiddenLabel: '자동 실행 파이프라인 (Worker)',
        forbiddenDetail: '어떠한 경우에도 별도 승인 테스트는 1회성 Manual Invoke로 제한되며 자동 실행은 불가합니다.',
      }
    ],

    stillForbiddenItems: [
      { id: 1, forbiddenLabel: '운영 DB Write', forbiddenDetail: '테스트 승인 전 영구 금지' },
      { id: 2, forbiddenLabel: '실제 Naver Token 발급', forbiddenDetail: '테스트 승인 전 영구 금지' },
      { id: 3, forbiddenLabel: 'Naver API 외부 호출', forbiddenDetail: '테스트 승인 전 영구 금지' }
    ],

    releaseRequirementItems: [
      { id: 1, requirementLabel: '별도 승인서 (Draft) 제출', requirementDetail: '이후 단계에서 별도 승인서 초안을 작성하고 결재를 받아야 합니다.' }
    ],

    nextStepLabel: '다음 단계인 [별도 승인 요청서 초안 (Draft) 확인]으로 이동하여 실제 승인을 요청하기 위한 초안을 검토하세요.',

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
    finalBlockerSaveButtonRendered: false,
    finalBlockerSaveButtonEnabled: false,
  };
}
