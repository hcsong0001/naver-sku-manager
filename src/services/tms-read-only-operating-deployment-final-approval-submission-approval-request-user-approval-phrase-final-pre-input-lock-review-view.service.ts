import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-explicit-input-boundary-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewCategory =
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READINESS'
  | 'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_REQUIRED_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_PRE_INPUT_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_FINAL_PRE_INPUT_LOCK_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItemStatus =
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem {
  finalPreInputLockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItemStatus;
  finalPreInputLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewView {
  taskId: 401;
  taskName: string;
  sourceUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus;
  recommendedFinalPreInputLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_ONLY';
  recommendedFinalPreInputLockReviewDecisionLabel: '최종 승인 제출 User Approval Phrase Final Pre-Input Lock Review - read-only 사용자 승인 문구 입력 직전 최종 Lock 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Final Pre-Input Lock Review 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 최종 Lock 검토만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  finalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseFinalPreInputLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseRequiredFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  apiSecretUiActionPostFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  finalPreInputLockReviewSummaryCards: { label: string; value: number }[];
  readyFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  partialReadyFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  blockedFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  notStartedFinalPreInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[];
  userApprovalPhraseFinalPreInputLockReviewReadinessItemCount: number;
  userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItemCount: number;
  userApprovalPhraseRequiredFinalPreInputLockReviewItemCount: number;
  userApprovalPhraseExampleDisplayFinalPreInputLockReviewItemCount: number;
  userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItemCount: number;
  userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItemCount: number;
  userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItemCount: number;
  userApprovalAcceptanceNonGrantFinalPreInputLockReviewItemCount: number;
  explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItemCount: number;
  finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItemCount: number;
  deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItemCount: number;
  apiSecretUiActionPostFinalPreInputLockReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalPreInputLockReviewItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED',
};

function toFinalPreInputLockReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY';
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY';
  }
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED';
  return 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewItem[] {
  return items.map((item) => {
    const finalPreInputLockReviewStatus = toFinalPreInputLockReviewItemStatus(item);
    return {
      finalPreInputLockReviewItemId: `user-approval-phrase-final-pre-input-lock-review-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      finalPreInputLockReviewStatus,
      isReady:
        finalPreInputLockReviewStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY',
      isPartialReady:
        finalPreInputLockReviewStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_PARTIAL_READY',
      isBlocked:
        finalPreInputLockReviewStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_BLOCKED',
      isNotStarted:
        finalPreInputLockReviewStatus ===
        'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewView {
  const finalPreInputLockReviewStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus
    ];

  const userApprovalPhraseFinalPreInputLockReviewReadinessItems = mapItems(
    outcomeCertificationView.userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReadinessItems,
    'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READINESS',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 최종 입력 전 Lock 검토 준비도] read-only 최종 Lock 검토 표시 상태만 확인합니다.'
  );
  const userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems =
    mapItems(
      outcomeCertificationView.userApprovalPhraseExplicitInputBoundaryReferenceOutcomeCertificationItems,
      'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_FINAL_PRE_INPUT_LOCK_REVIEW',
      'Final Pre-Input Lock Review',
      '[사용자 승인 문구 Explicit Input Boundary 결과 인증 참조 최종 Lock 검토] Task 400 결과를 read-only로 참조합니다.'
    );
  const userApprovalPhraseRequiredFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseRequiredExplicitInputOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_REQUIRED_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 필요 최종 Lock 검토] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 검토만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseExampleDisplayExplicitInputOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 예시 표시 최종 Lock 검토] 승인 문구 예시는 read-only 최종 Lock 검토만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseInputUiNonAdditionOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 입력 UI 미추가 최종 Lock 검토] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseInputNonExecutionOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_INPUT_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 입력 비실행 최종 Lock 검토] 이번 화면에서는 승인 문구를 실제 입력하지 않습니다.'
  );
  const userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseSubmissionNonExecutionOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 문구 제출 비실행 최종 Lock 검토] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalAcceptanceNonGrantExplicitInputOutcomeCertificationItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[사용자 승인 수락 비부여 최종 Lock 검토] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestCreationNonExecutionExplicitInputOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[명시 승인 요청 생성 비실행 최종 Lock 검토] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[명시 승인 요청 제출 비실행 최종 Lock 검토] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionNonExecutionExplicitInputOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[최종 승인 제출 비실행 최종 Lock 검토] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.deploymentOperatingTransitionNonExecutionExplicitInputOutcomeCertificationItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[배포/운영 전환 비실행 최종 Lock 검토] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterExplicitInputOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[운영 DB/Runtime/Worker/Queue/Adapter 최종 Lock 검토] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostFinalPreInputLockReviewItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostExplicitInputOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_FINAL_PRE_INPUT_LOCK_REVIEW',
    'Final Pre-Input Lock Review',
    '[API/Secret/UI Action/POST 최종 Lock 검토] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const finalPreInputLockReviewItems = [
    ...userApprovalPhraseFinalPreInputLockReviewReadinessItems,
    ...userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems,
    ...userApprovalPhraseRequiredFinalPreInputLockReviewItems,
    ...userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems,
    ...userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems,
    ...userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems,
    ...userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems,
    ...userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems,
    ...explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems,
    ...explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems,
    ...finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems,
    ...deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems,
    ...operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems,
    ...apiSecretUiActionPostFinalPreInputLockReviewItems,
  ];

  const readyFinalPreInputLockReviewItems = finalPreInputLockReviewItems.filter(
    (item) => item.isReady
  );
  const partialReadyFinalPreInputLockReviewItems = finalPreInputLockReviewItems.filter(
    (item) => item.isPartialReady
  );
  const blockedFinalPreInputLockReviewItems = finalPreInputLockReviewItems.filter(
    (item) => item.isBlocked
  );
  const notStartedFinalPreInputLockReviewItems = finalPreInputLockReviewItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 401,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Final Pre-Input Lock Review',
    sourceUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockReviewStatus:
      finalPreInputLockReviewStatus,
    recommendedFinalPreInputLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_ONLY',
    recommendedFinalPreInputLockReviewDecisionLabel:
      '최종 승인 제출 User Approval Phrase Final Pre-Input Lock Review - read-only 사용자 승인 문구 입력 직전 최종 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Final Pre-Input Lock Review 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 최종 Lock 검토만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: outcomeCertificationView.userApprovalPhraseExample,
    finalPreInputLockReviewItems,
    userApprovalPhraseFinalPreInputLockReviewReadinessItems,
    userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems,
    userApprovalPhraseRequiredFinalPreInputLockReviewItems,
    userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems,
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems,
    userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems,
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems,
    userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems,
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems,
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems,
    finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems,
    deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems,
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems,
    apiSecretUiActionPostFinalPreInputLockReviewItems,
    finalPreInputLockReviewSummaryCards: [
      { label: 'User Approval Phrase Final Pre-Input Lock Review 그룹', value: 14 },
      { label: 'Ready', value: readyFinalPreInputLockReviewItems.length },
      { label: 'Blocked', value: blockedFinalPreInputLockReviewItems.length },
      { label: 'Total', value: finalPreInputLockReviewItems.length },
    ],
    readyFinalPreInputLockReviewItems,
    partialReadyFinalPreInputLockReviewItems,
    blockedFinalPreInputLockReviewItems,
    notStartedFinalPreInputLockReviewItems,
    userApprovalPhraseFinalPreInputLockReviewReadinessItemCount:
      userApprovalPhraseFinalPreInputLockReviewReadinessItems.length,
    userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItemCount:
      userApprovalPhraseExplicitInputBoundaryOutcomeCertificationReferenceFinalPreInputLockReviewItems.length,
    userApprovalPhraseRequiredFinalPreInputLockReviewItemCount:
      userApprovalPhraseRequiredFinalPreInputLockReviewItems.length,
    userApprovalPhraseExampleDisplayFinalPreInputLockReviewItemCount:
      userApprovalPhraseExampleDisplayFinalPreInputLockReviewItems.length,
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItemCount:
      userApprovalPhraseInputUiNonAdditionFinalPreInputLockReviewItems.length,
    userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItemCount:
      userApprovalPhraseInputNonExecutionFinalPreInputLockReviewItems.length,
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItemCount:
      userApprovalPhraseSubmissionNonExecutionFinalPreInputLockReviewItems.length,
    userApprovalAcceptanceNonGrantFinalPreInputLockReviewItemCount:
      userApprovalAcceptanceNonGrantFinalPreInputLockReviewItems.length,
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItemCount:
      explicitApprovalRequestCreationNonExecutionFinalPreInputLockReviewItems.length,
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItemCount:
      explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockReviewItems.length,
    finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItemCount:
      finalApprovalSubmissionNonExecutionFinalPreInputLockReviewItems.length,
    deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItemCount:
      deploymentOperatingTransitionNonExecutionFinalPreInputLockReviewItems.length,
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItemCount:
      operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockReviewItems.length,
    apiSecretUiActionPostFinalPreInputLockReviewItemCount:
      apiSecretUiActionPostFinalPreInputLockReviewItems.length,
    readyItemCount: readyFinalPreInputLockReviewItems.length,
    partialReadyItemCount: partialReadyFinalPreInputLockReviewItems.length,
    blockedItemCount: blockedFinalPreInputLockReviewItems.length,
    notStartedItemCount: notStartedFinalPreInputLockReviewItems.length,
    totalFinalPreInputLockReviewItemCount: finalPreInputLockReviewItems.length,
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
