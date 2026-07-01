import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-final-pre-input-lock-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationCategory =
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_READINESS'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_REQUIRED_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItemStatus =
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceFinalPreInputLockReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceFinalPreInputLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView {
  taskId: 402;
  taskName: string;
  sourceUserApprovalPhraseFinalPreInputLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 User Approval Phrase Final Pre-Input Lock 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Final Pre-Input Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[];
  userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItemCount: number;
  userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItemCount: number;
  userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItemCount: number;
  userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItemCount: number;
  userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItemCount: number;
  userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItemCount: number;
  apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalOutcomeCertificationItemCount: number;
  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenReissue: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualOperatingDbConnectionChange: false;
  actualEnvReadOrWrite: false;
  actualSecretExposure: false;
  actualRawApiResponseExposure: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualAdapterConnection: false;
  actualRuntimeConfiguration: false;
  actualApprovalRequestCreated: false;
  actualApprovalRequestReviewedAsSubmission: false;
  actualApprovalRequestSubmitted: false;
  actualExplicitApprovalRequestCreated: false;
  actualExplicitApprovalRequestSubmitted: false;
  actualExplicitApprovalPhraseInputAdded: false;
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  actualUserApprovalPhraseInputAdded: false;
  actualUserApprovalPhraseSubmitted: false;
  actualUserApprovalPhraseAccepted: false;
  actualUserApprovalGranted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhrasePreparationBoundarySubmitted: false;
  actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseLockReviewSubmitted: false;
  actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseExplicitInputBoundarySubmitted: false;
  actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseFinalPreInputLockReviewSubmitted: false;
  actualUserApprovalPhraseFinalPreInputLockOutcomeCertificationSubmitted: false;
  actualSubmissionReadinessReviewSubmitted: false;
  actualSubmissionReadinessOutcomeCertificationSubmitted: false;
  actualSubmissionLockReviewSubmitted: false;
  actualSubmissionLockOutcomeCertificationSubmitted: false;
  actualFinalSubmissionBoundaryReviewSubmitted: false;
  actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualFinalSubmissionLockReviewSubmitted: false;
  actualFinalSubmissionLockOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundarySubmitted: false;
  actualSubmissionPreApprovalGranted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false;
  actualSubmissionPreApprovalLockReviewSubmitted: false;
  actualSubmissionPreApprovalLockGranted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false;
  actualFinalApprovalGrant: false;
  actualFinalApprovalSubmission: false;
  actualDeploymentApproval: false;
  actualDeploymentExecution: false;
  actualOperatingTransition: false;
  actualVpsCreation: false;
  actualDomainConnection: false;
  actualDnsChange: false;
  actualSslCertificateIssue: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualUserApprovalPhraseInputAddedToUi: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItemStatus {
  if (item.isReady) {
    return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY';
  }
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY';
  }
  if (item.isBlocked) {
    return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED';
  }
  return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `user-approval-phrase-final-pre-input-lock-outcome-certification-${item.finalPreInputLockReviewItemId}-${category.toLowerCase()}`,
      sourceFinalPreInputLockReviewItemId: item.finalPreInputLockReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceFinalPreInputLockReviewStatus: item.finalPreInputLockReviewStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView(
  finalPreInputLockReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      finalPreInputLockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus
    ];

  const userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseFinalPreInputLockReviewReadinessItems,
    'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사용자 승인 문구 Final Pre-Input Lock 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 Final Pre-Input Lock Review 참조 결과 인증] Task 401 검토 결과를 read-only로 인증합니다.'
  );
  const userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseRequiredFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_REQUIRED_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 필요 Final Pre-Input Lock 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 결과 인증만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 예시 표시 Final Pre-Input Lock 결과 인증] 승인 문구 예시는 read-only 결과 인증만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 입력 UI 미추가 Final Pre-Input Lock 결과 인증] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 입력 비실행 Final Pre-Input Lock 결과 인증] 이번 화면에서는 승인 문구를 실제 입력하지 않습니다.'
  );
  const userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems,
    'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 제출 비실행 Final Pre-Input Lock 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 수락 비부여 Final Pre-Input Lock 결과 인증] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems =
    mapItems(
      finalPreInputLockReviewView.explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems,
      'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[명시 승인 요청 생성 비실행 Final Pre-Input Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
    );
  const explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems =
    mapItems(
      finalPreInputLockReviewView.explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems,
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[명시 승인 요청 제출 비실행 Final Pre-Input Lock 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
    );
  const finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 Final Pre-Input Lock 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems =
    mapItems(
      finalPreInputLockReviewView.deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems,
      'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[배포/운영 전환 비실행 Final Pre-Input Lock 결과 인증] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
    );
  const operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter Final Pre-Input Lock 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems = mapItems(
    finalPreInputLockReviewView.apiSecretUiActionPostFinalPreInputLockReviewItems,
    'API_SECRET_UI_ACTION_POST_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST Final Pre-Input Lock 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems,
    ...userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems,
    ...userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems,
    ...userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems,
    ...userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems,
    ...userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems,
    ...explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems,
    ...apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isBlocked
  );
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 402,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Final Pre-Input Lock Outcome Certification',
    sourceUserApprovalPhraseFinalPreInputLockReviewStatus:
      finalPreInputLockReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Final Pre-Input Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Final Pre-Input Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: finalPreInputLockReviewView.userApprovalPhraseExample,
    outcomeCertificationItems,
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems,
    userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems,
    userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems,
    userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems,
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems,
    userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems,
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems,
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems,
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems,
    apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'User Approval Phrase Final Pre-Input Lock Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItemCount:
      userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems.length,
    userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItemCount:
      userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems.length,
    userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems.length,
    userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems.length,
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems.length,
    userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItemCount:
      userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems.length,
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItemCount:
      deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems.length,
    apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItemCount:
      apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems.length,
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalOutcomeCertificationItemCount: outcomeCertificationItems.length,
    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenReissue: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualOperatingDbConnectionChange: false,
    actualEnvReadOrWrite: false,
    actualSecretExposure: false,
    actualRawApiResponseExposure: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualAdapterConnection: false,
    actualRuntimeConfiguration: false,
    actualApprovalRequestCreated: false,
    actualApprovalRequestReviewedAsSubmission: false,
    actualApprovalRequestSubmitted: false,
    actualExplicitApprovalRequestCreated: false,
    actualExplicitApprovalRequestSubmitted: false,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    actualUserApprovalPhraseInputAdded: false,
    actualUserApprovalPhraseSubmitted: false,
    actualUserApprovalPhraseAccepted: false,
    actualUserApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhrasePreparationBoundarySubmitted: false,
    actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseLockReviewSubmitted: false,
    actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundarySubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockReviewSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockOutcomeCertificationSubmitted: false,
    actualSubmissionReadinessReviewSubmitted: false,
    actualSubmissionReadinessOutcomeCertificationSubmitted: false,
    actualSubmissionLockReviewSubmitted: false,
    actualSubmissionLockOutcomeCertificationSubmitted: false,
    actualFinalSubmissionBoundaryReviewSubmitted: false,
    actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualFinalSubmissionLockReviewSubmitted: false,
    actualFinalSubmissionLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false,
    actualSubmissionPreApprovalLockReviewSubmitted: false,
    actualSubmissionPreApprovalLockGranted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
    actualFinalApprovalGrant: false,
    actualFinalApprovalSubmission: false,
    actualDeploymentApproval: false,
    actualDeploymentExecution: false,
    actualOperatingTransition: false,
    actualVpsCreation: false,
    actualDomainConnection: false,
    actualDnsChange: false,
    actualSslCertificateIssue: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualUserApprovalPhraseInputAddedToUi: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
