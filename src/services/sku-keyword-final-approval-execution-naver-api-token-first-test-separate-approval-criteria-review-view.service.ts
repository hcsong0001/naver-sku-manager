export interface NaverApiTokenFirstTestSeparateApprovalCriteriaReviewViewModel {
  screenTitle: string;
  criteriaPhaseName: string;
  criteriaStatus: string;
  reviewedReadOnlyPhaseCommit: string;
  readOnlyPhaseClosed: true;
  criteriaReviewOnly: true;
  separateApprovalStillRequired: true;
  executionStillForbidden: true;
  tokenRequestStillForbidden: true;
  naverApiCallStillForbidden: true;
  operatingDbWriteStillForbidden: true;
  priceStockChangeStillForbidden: true;
  queueWorkerStillDisconnected: true;
  postApiStillNotAdded: true;
  approvalCriteriaItems: Array<{
    id: number;
    label: string;
    description: string;
  }>;
  requiredPreApprovalChecks: Array<{
    id: number;
    label: string;
    description: string;
  }>;
  stillForbiddenItems: Array<{
    id: number;
    label: string;
    value: string;
  }>;
  nextStepLabel: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView(): NaverApiTokenFirstTestSeparateApprovalCriteriaReviewViewModel {
  return {
    screenTitle: 'Separate Approval Criteria Review',
    criteriaPhaseName: '별도 승인 기준 검토 (Read-only)',
    criteriaStatus: '검토 중 (실행 불가)',
    reviewedReadOnlyPhaseCommit: 'd7b6b9a',
    readOnlyPhaseClosed: true,
    criteriaReviewOnly: true,
    separateApprovalStillRequired: true,
    executionStillForbidden: true,
    tokenRequestStillForbidden: true,
    naverApiCallStillForbidden: true,
    operatingDbWriteStillForbidden: true,
    priceStockChangeStillForbidden: true,
    queueWorkerStillDisconnected: true,
    postApiStillNotAdded: true,
    approvalCriteriaItems: [
      {
        id: 1,
        label: '목적 (Purpose)',
        description: '본 승인은 실제 운영 DB 변경이나 상품 정보 수정 목적이 아닙니다. 오직 Naver API Token 생명주기(발급/갱신) 테스트를 위한 격리된 단발성 접근 권한만을 부여하는 기준을 검토합니다.'
      },
      {
        id: 2,
        label: '권한 범위 (Scope)',
        description: '승인이 이루어지더라도, 백그라운드 Worker나 큐 시스템에는 연동되지 않습니다. 수동 승인 후 즉시 발생하는 1회성 Token 테스트 실행으로만 제한됩니다.'
      },
      {
        id: 3,
        label: '안전성 확보 (Safety)',
        description: '모든 테스트는 Read-only Phase(Task 41~61)에서 확립된 격리 환경 내에서만 실행되며, 결코 운영 데이터(가격/재고)의 위변조로 이어지지 않음을 확인하는 기준입니다.'
      }
    ],
    requiredPreApprovalChecks: [
      {
        id: 1,
        label: 'Read-only Phase 종결 확인',
        description: '이전 단계인 Task 61까지의 모든 안전 점검(Closure Summary)이 정상적으로 봉인되었는지 확인합니다.'
      },
      {
        id: 2,
        label: '비동기 큐 연동 해제 확인',
        description: '대규모 처리용 큐 또는 예약 Worker 시스템과의 연결이 물리적으로 차단되어 있는지 확인합니다.'
      },
      {
        id: 3,
        label: 'DB Write 차단 장치 확인',
        description: 'Token 메타데이터 저장 외에, 어떤 상품 정보나 기존 상태도 덮어쓰지 않는 안전장치가 준비되었는지 확인합니다.'
      }
    ],
    stillForbiddenItems: [
      { id: 1, label: '실행 버튼 활성화', value: '차단 유지' },
      { id: 2, label: 'POST API 엔드포인트', value: '차단 유지' },
      { id: 3, label: '승인 기능 동작', value: '차단 유지' },
      { id: 4, label: 'Token 발급/요청', value: '차단 유지' }
    ],
    nextStepLabel: '다음 단계는 실제 실행 단계가 아닙니다. 여전히 별도 승인을 얻기 위한 준비 단계들이 진행됩니다.'
  };
}
