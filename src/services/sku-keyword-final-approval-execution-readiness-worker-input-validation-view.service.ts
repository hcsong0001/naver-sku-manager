// READ-ONLY Worker Input Validation View Contract — Task 143
// Task 142 Worker Payload Interpretation을 바탕으로
// 향후 Worker가 실행 전에 입력값을 어떻게 검증해야 하는지 읽기 전용 기준으로 정리합니다.
// 실제 Worker 검증 실행, Queue enqueue, Adapter, Token, Naver API, POST, DB write는 연결하지 않습니다.

import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView } from './sku-keyword-final-approval-execution-readiness-worker-payload-interpretation-view.service';

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationCriteriaItem {
  label: string;
  description: string;
  validationTarget: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationMandatoryItem {
  label: string;
  description: string;
  mandatoryKey: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationPrerequisiteItem {
  label: string;
  description: string;
  prerequisiteState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationPendingBlockedItem {
  label: string;
  description: string;
  validationState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationImpossibleReasonItem {
  label: string;
  description: string;
  reasonState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationStopConditionItem {
  label: string;
  description: string;
  stopTrigger: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationDisconnectedItem {
  label: string;
  description: string;
  disconnectedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;
  taskRangeLabel: string;
  previousExecutionReadinessWorkerPayloadInterpretationLabel: string;
  previousExecutionReadinessWorkerPayloadInterpretationCommit: string;
  workerInputValidationCriteriaItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationCriteriaItem[];
  queuePayloadMandatoryCheckCriteriaItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationMandatoryItem[];
  executionReadinessPrerequisiteItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationPrerequisiteItem[];
  approvalPendingBlockedValidationCriteriaItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationPendingBlockedItem[];
  executionImpossibleReasonValidationCriteriaItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationImpossibleReasonItem[];
  stopConditionBeforeExecutionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationStopConditionItem[];
  disconnectedStatusItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationDisconnectedItem[];
  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView {
  const payloadInterpretation = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView();

  return {
    title:
      'Token First Test 별도 승인 흐름 — Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Status Final Closure Final Status Execution Readiness Worker Input Validation',
    statusLabel:
      'READ-ONLY FINAL REVIEW CLOSURE STATUS FINAL CLOSURE FINAL STATUS EXECUTION READINESS WORKER INPUT VALIDATION',
    statusTone: 'blocked',
    summary:
      'Task 41~142 read-only 흐름을 기준으로 향후 Worker가 실행 전 입력값을 어떻게 검증해야 하는지 정리합니다. ' +
      '이 화면은 Worker의 필수 항목 확인, 실행 준비 조건, 승인/차단 상태 검증, 중단 조건 등 검증 기준 View Contract만 제공하며 실제 검증이나 Worker 실행을 의미하지 않습니다.',
    taskRangeLabel: 'Task 41~142 read-only 흐름 — Execution Readiness Worker Input Validation 기준',
    previousExecutionReadinessWorkerPayloadInterpretationLabel: 'Task 142 Execution Readiness Worker Payload Interpretation 커밋',
    previousExecutionReadinessWorkerPayloadInterpretationCommit: '10520ee',
    workerInputValidationCriteriaItems: payloadInterpretation.workerPayloadReferenceItems.map((item) => ({
      label: item.label,
      description: item.description + ' (검증 대상)',
      validationTarget: item.interpretationState,
      tone: item.tone,
    })),
    queuePayloadMandatoryCheckCriteriaItems: [
      {
        label: 'Payload 구조 검증',
        description: '전달된 payload가 유효한 JSON 형식이며 필수 키를 포함하는지 확인해야 합니다.',
        mandatoryKey: 'VALID_PAYLOAD_STRUCTURE_REQUIRED',
        tone: 'warning',
      },
      {
        label: 'Target ID 존재 여부',
        description: '대상 상품의 고유 식별자(Target ID)가 payload에 반드시 포함되어야 합니다.',
        mandatoryKey: 'TARGET_ID_REQUIRED',
        tone: 'warning',
      },
      {
        label: 'Change Type 확인',
        description: '변경 유형(가격, 재고 등)이 명확히 지정되어야 검증을 통과합니다.',
        mandatoryKey: 'CHANGE_TYPE_REQUIRED',
        tone: 'warning',
      },
    ],
    executionReadinessPrerequisiteItems: payloadInterpretation.executionReadinessInterpretationItems.map((item) => ({
      label: item.label,
      description: item.description,
      prerequisiteState: item.readinessState,
      tone: item.tone,
    })),
    approvalPendingBlockedValidationCriteriaItems: [
      ...payloadInterpretation.approvalPendingInterpretationItems.map((item) => ({
        label: item.label,
        description: item.description,
        validationState: item.pendingState,
        tone: item.tone,
      })),
      ...payloadInterpretation.blockedStateInterpretationItems.map((item) => ({
        label: item.label,
        description: item.description,
        validationState: item.blockedState,
        tone: item.tone,
      })),
    ],
    executionImpossibleReasonValidationCriteriaItems: payloadInterpretation.executionNotAllowedReasonItems.map((item) => ({
      label: item.label,
      description: item.description,
      reasonState: item.reasonState,
      tone: item.tone,
    })),
    stopConditionBeforeExecutionItems: [
      ...payloadInterpretation.misunderstandingPreventionItems.map((item) => ({
        label: item.label,
        description: item.description,
        stopTrigger: item.correction,
        tone: item.tone,
      })),
      {
        label: '검증 실패 시 중단',
        description: '입력값 중 하나라도 유효하지 않거나 필수 조건이 누락된 경우 즉시 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_VALIDATION_FAILURE',
        tone: 'blocked',
      },
      {
        label: '권한 검증 실패 시 중단',
        description: 'Worker 실행 권한이 명시적으로 부여되지 않은 경우 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_PERMISSION_DENIED',
        tone: 'blocked',
      },
    ],
    disconnectedStatusItems: [
      ...payloadInterpretation.disconnectedExecutionItems.map((item) => ({
        label: item.label,
        description: item.description,
        disconnectedState: item.disconnectedState,
        tone: item.tone,
      })),
      {
        label: 'Worker Input Validation 경로',
        description: '입력 검증 기준만 제공될 뿐, 실제 검증 로직은 아직 연결되지 않았습니다.',
        disconnectedState: 'VALIDATION_LOGIC_NOT_CONNECTED',
        tone: 'blocked',
      },
    ],
    finalNotice:
      'Task 143 Execution Readiness Worker Input Validation 패널은 Task 142 Execution Readiness Worker Payload Interpretation을 기반으로 Worker가 입력값을 어떻게 검증해야 하는지 읽기 전용 기준으로 정리합니다. ' +
      '이 화면과 API 응답은 검증 기준 View Contract만 제공하며 실제 Worker 검증 실행, Queue enqueue, Adapter 연결, Token 발급, Naver API 호출, POST, DB write는 수행하지 않습니다. ' +
      'Task 41~143 흐름 전체에서도 실행 권한은 계속 닫혀 있습니다.',
  };
}
