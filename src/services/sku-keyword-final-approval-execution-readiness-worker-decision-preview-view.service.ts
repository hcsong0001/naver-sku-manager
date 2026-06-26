// READ-ONLY Worker Decision Preview View Contract — Task 145
// Task 144 Worker Stop Conditions와 Task 143 Worker Input Validation을 바탕으로
// 향후 Worker가 실제 실행 없이 어떤 판정을 내려야 하는지 읽기 전용 기준으로 정리합니다.
// 실제 Worker 실행, Queue enqueue, Adapter, Token, Naver API, POST, DB write는 연결하지 않습니다.

import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView } from './sku-keyword-final-approval-execution-readiness-worker-input-validation-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView } from './sku-keyword-final-approval-execution-readiness-worker-stop-conditions-view.service';

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem {
  label: string;
  description: string;
  previewDecision: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;
  taskRangeLabel: string;
  previousExecutionReadinessWorkerStopConditionsLabel: string;
  previousExecutionReadinessWorkerStopConditionsCommit: string;
  expectedWorkerDecisionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  stopConditionSatisfactionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  queuePayloadValidationStatusItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  approvalPendingBlockedDecisionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  executionImpossibleReasonSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  nonExecutionReasonItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  disconnectedSystemDecisionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewItem[];
  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView {
  const stopConditions =
    buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView();
  const inputValidation =
    buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView();
  const disconnectedDecisionStates = new Set([
    'WORKER_NOT_CONNECTED',
    'QUEUE_NOT_ENQUEUED',
    'ADAPTER_NOT_CONNECTED',
    'TOKEN_NOT_CONNECTED',
    'NAVER_API_NOT_CONNECTED',
    'DB_WRITE_NOT_CONNECTED',
  ]);

  return {
    title:
      'Token First Test 별도 승인 흐름 — Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Status Final Closure Final Status Execution Readiness Worker Decision Preview',
    statusLabel:
      'READ-ONLY FINAL REVIEW CLOSURE STATUS FINAL CLOSURE FINAL STATUS EXECUTION READINESS WORKER DECISION PREVIEW',
    statusTone: 'blocked',
    summary:
      'Task 41~144 read-only 흐름을 기준으로 Worker가 실제 실행 없이 어떤 판정을 내려야 하는지 미리보기 기준을 정리합니다. ' +
      '이 화면은 실행 전 예상 판정, 중단 조건 충족 여부, Queue Payload 검증 상태, 승인/차단 판정, 실행 불가 사유, 미연결 시스템 상태만 View Contract로 제공하며 실제 Worker 실행을 의미하지 않습니다.',
    taskRangeLabel: 'Task 41~144 read-only 흐름 — Execution Readiness Worker Decision Preview 기준',
    previousExecutionReadinessWorkerStopConditionsLabel: 'Task 144 Execution Readiness Worker Stop Conditions 커밋',
    previousExecutionReadinessWorkerStopConditionsCommit: 'fa59052',
    expectedWorkerDecisionItems: [
      {
        label: '전체 예상 판정 — 실행 중단 유지',
        description: 'Task 144 중단 조건과 Task 143 입력 검증 기준을 종합하면 Worker는 실행 전 단계에서 실행 중단 판정을 유지해야 합니다.',
        previewDecision: 'PREVIEW_DECISION_BLOCK_EXECUTION',
        tone: 'blocked',
      },
      {
        label: '실행 권한 예상 판정 — 실행 불가',
        description: '승인 대기, 차단 상태, 미연결 시스템이 해소되지 않았으므로 실행 권한을 열 수 없습니다.',
        previewDecision: 'PREVIEW_DECISION_EXECUTION_FORBIDDEN',
        tone: 'blocked',
      },
      {
        label: '노출 방식 예상 판정 — read-only 미리보기',
        description: '이번 패널은 Worker가 실제로 실행되지 않은 상태에서 예상 판정만 읽기 전용으로 제공합니다.',
        previewDecision: 'PREVIEW_DECISION_READ_ONLY_ONLY',
        tone: 'warning',
      },
    ],
    stopConditionSatisfactionItems: [
      {
        label: 'Queue Payload 중단 조건',
        description: 'Payload 필수 항목 검증 실패 조건이 존재하므로 해당 조건이 충족되면 Worker는 즉시 실행 중단 판정을 내려야 합니다.',
        previewDecision: 'PREVIEW_STOP_CONDITION_PAYLOAD_VALIDATION_READY',
        tone: 'blocked',
      },
      {
        label: '승인 대기/차단 중단 조건',
        description: '승인 대기 또는 차단 상태 조건이 유지되는 동안 Worker는 실행 불가 판정을 유지해야 합니다.',
        previewDecision: 'PREVIEW_STOP_CONDITION_APPROVAL_OR_BLOCK_READY',
        tone: 'blocked',
      },
      {
        label: '미연결 시스템 중단 조건',
        description: 'Worker, Queue, Adapter, Token, Naver API, DB Write 중 하나라도 미연결이면 실행 중단 판정을 유지해야 합니다.',
        previewDecision: 'PREVIEW_STOP_CONDITION_DISCONNECTED_SYSTEM_READY',
        tone: 'blocked',
      },
    ],
    queuePayloadValidationStatusItems: stopConditions.queuePayloadValidationFailureStopItems.map((item) => ({
      label: item.label.replace('검증 실패 시 중단', '검증 상태 판정'),
      description: item.description + ' 예상 판정은 해당 Payload를 실행 불가로 유지하는 것입니다.',
      previewDecision: 'PREVIEW_REJECT_' + item.stopTrigger,
      tone: 'blocked' as const,
    })),
    approvalPendingBlockedDecisionItems: [
      ...stopConditions.approvalPendingStopItems,
      ...stopConditions.blockedStateStopItems,
    ].map((item) => ({
      label: item.label.replace('중단', '판정'),
      description: item.description + ' 예상 판정은 승인 완료 또는 차단 해제 전까지 실행 불가 유지입니다.',
      previewDecision: 'PREVIEW_DECISION_' + item.stopTrigger,
      tone: item.tone,
    })),
    executionImpossibleReasonSummaryItems: inputValidation.executionImpossibleReasonValidationCriteriaItems.map((item) => ({
      label: item.label + ' — 판정 요약',
      description: item.description + ' 따라서 Worker Decision Preview는 실행 불가 사유로 이 항목을 요약해야 합니다.',
      previewDecision: 'PREVIEW_BLOCK_REASON_' + item.reasonState,
      tone: item.tone,
    })),
    nonExecutionReasonItems: stopConditions.misunderstandingPreventionItems.map((item) => ({
      label: item.label,
      description: item.description + ' 이번 Task 145는 실제 실행이 아닌 판정 미리보기 View Contract만 제공합니다.',
      previewDecision: 'PREVIEW_NON_EXECUTION_' + item.stopTrigger,
      tone: item.tone,
    })),
    disconnectedSystemDecisionItems: inputValidation.disconnectedStatusItems
      .filter((item) => disconnectedDecisionStates.has(item.disconnectedState))
      .map((item) => ({
        label: item.label + ' — 미연결 판정',
        description: item.description + ' 이 미연결 상태가 유지되므로 Worker Decision Preview 결과는 실행 중단입니다.',
        previewDecision: 'PREVIEW_BLOCK_' + item.disconnectedState,
        tone: 'blocked' as const,
      })),
    finalNotice:
      'Task 145 Execution Readiness Worker Decision Preview 패널은 Task 144 Execution Readiness Worker Stop Conditions를 기반으로 Worker가 실제 실행 없이 어떤 판정을 내려야 하는지 읽기 전용 기준으로 미리 보여줍니다. ' +
      '이 화면과 API 응답은 판정 미리보기 View Contract만 제공하며 실제 Worker 실행, Queue enqueue, Adapter 연결, Token 발급, Naver API 호출, POST, DB write는 수행하지 않습니다. ' +
      'Task 41~145 흐름 전체에서도 실행 권한은 계속 닫혀 있습니다.',
  };
}
