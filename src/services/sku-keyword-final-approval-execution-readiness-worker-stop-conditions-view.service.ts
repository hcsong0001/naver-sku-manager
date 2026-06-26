// READ-ONLY Worker Stop Conditions View Contract — Task 144
// Task 143 Worker Input Validation을 바탕으로
// 향후 Worker가 실제 실행 전에 반드시 중단해야 하는 조건을 읽기 전용 기준으로 정리합니다.
// 실제 Worker 실행, Queue enqueue, Adapter, Token, Naver API, POST, DB write는 연결하지 않습니다.

import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView } from './sku-keyword-final-approval-execution-readiness-worker-input-validation-view.service';

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem {
  label: string;
  description: string;
  stopTrigger: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;
  taskRangeLabel: string;
  previousExecutionReadinessWorkerInputValidationLabel: string;
  previousExecutionReadinessWorkerInputValidationCommit: string;
  queuePayloadValidationFailureStopItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem[];
  approvalPendingStopItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem[];
  blockedStateStopItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem[];
  disconnectedSystemStopItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem[];
  misunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionItem[];
  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView {
  const inputValidation = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView();

  return {
    title:
      'Token First Test 별도 승인 흐름 — Final Hold Non-Release Handoff Closure Final Status Seal Confirmation Final Review Closure Status Final Closure Final Status Execution Readiness Worker Stop Conditions',
    statusLabel:
      'READ-ONLY FINAL REVIEW CLOSURE STATUS FINAL CLOSURE FINAL STATUS EXECUTION READINESS WORKER STOP CONDITIONS',
    statusTone: 'blocked',
    summary:
      'Task 41~143 read-only 흐름을 기준으로 향후 Worker가 실제 실행 전에 반드시 중단해야 하는 조건을 정리합니다. ' +
      '이 화면은 Queue Payload 검증 실패, 승인 대기, 차단 상태, 미연결 시스템 등 중단 조건 View Contract만 제공하며 실제 Worker 실행을 의미하지 않습니다.',
    taskRangeLabel: 'Task 41~143 read-only 흐름 — Execution Readiness Worker Stop Conditions 기준',
    previousExecutionReadinessWorkerInputValidationLabel: 'Task 143 Execution Readiness Worker Input Validation 커밋',
    previousExecutionReadinessWorkerInputValidationCommit: '2174b4c',
    queuePayloadValidationFailureStopItems: inputValidation.queuePayloadMandatoryCheckCriteriaItems.map((item) => ({
      label: item.label + ' — 검증 실패 시 중단',
      description: item.description + ' 이 조건이 충족되지 않으면 Worker는 즉시 실행을 중단해야 합니다.',
      stopTrigger: 'STOP_ON_' + item.mandatoryKey + '_FAILED',
      tone: 'blocked' as const,
    })),
    approvalPendingStopItems: [
      {
        label: '승인 대기 상태 — Worker 실행 중단',
        description: '최종 승인이 완료되지 않은 상태에서는 Worker가 실행을 시작해서는 안 됩니다.',
        stopTrigger: 'STOP_ON_APPROVAL_PENDING',
        tone: 'blocked',
      },
      {
        label: '부분 승인 상태 — Worker 실행 중단',
        description: '일부 항목만 승인된 상태에서는 전체 승인이 완료될 때까지 Worker 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_PARTIAL_APPROVAL',
        tone: 'blocked',
      },
      {
        label: '승인 기한 초과 — Worker 실행 중단',
        description: '승인 요청 기한이 초과된 경우 Worker는 실행 전 중단 후 재승인을 요청해야 합니다.',
        stopTrigger: 'STOP_ON_APPROVAL_TIMEOUT',
        tone: 'warning',
      },
    ],
    blockedStateStopItems: inputValidation.approvalPendingBlockedValidationCriteriaItems
      .filter((item) => item.tone === 'blocked')
      .map((item) => ({
        label: item.label + ' — 차단 상태 중단',
        description: item.description + ' 차단 상태가 해제될 때까지 Worker 실행은 금지됩니다.',
        stopTrigger: 'STOP_ON_BLOCKED_' + item.validationState,
        tone: 'blocked' as const,
      })),
    disconnectedSystemStopItems: [
      {
        label: 'Token 미연결 — Worker 실행 중단',
        description: 'Naver API Token이 발급되지 않았거나 연결되지 않은 상태에서는 Worker 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_TOKEN_NOT_CONNECTED',
        tone: 'blocked',
      },
      {
        label: 'Naver API 미연결 — Worker 실행 중단',
        description: 'Naver API 엔드포인트가 연결되지 않은 상태에서는 Worker 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_NAVER_API_NOT_CONNECTED',
        tone: 'blocked',
      },
      {
        label: 'Adapter 미연결 — Worker 실행 중단',
        description: 'Queue-Worker 연결 Adapter가 구성되지 않은 상태에서는 Worker 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_ADAPTER_NOT_CONNECTED',
        tone: 'blocked',
      },
      {
        label: 'DB Write 미연결 — Worker 실행 중단',
        description: 'DB Write 경로가 연결되지 않은 상태에서는 Worker가 결과를 저장할 수 없으므로 실행을 중단해야 합니다.',
        stopTrigger: 'STOP_ON_DB_WRITE_NOT_CONNECTED',
        tone: 'blocked',
      },
      {
        label: 'Queue 미연결 — Worker 실행 중단',
        description: 'Worker가 읽어야 할 Queue가 연결되지 않은 상태에서는 실행을 시작해서는 안 됩니다.',
        stopTrigger: 'STOP_ON_QUEUE_NOT_CONNECTED',
        tone: 'blocked',
      },
    ],
    misunderstandingPreventionItems: [
      {
        label: '이 화면은 실제 Worker 실행이 아닙니다',
        description: 'Task 144 패널은 중단 조건 View Contract만 제공하며 실제로 Worker를 실행하거나 Queue에 적재하지 않습니다.',
        stopTrigger: 'VIEW_CONTRACT_ONLY_NO_EXECUTION',
        tone: 'warning',
      },
      {
        label: 'Queue enqueue 없음',
        description: '이 화면을 통해 어떠한 Queue enqueue도 발생하지 않습니다.',
        stopTrigger: 'NO_QUEUE_ENQUEUE',
        tone: 'warning',
      },
      {
        label: 'Naver API 호출 없음',
        description: '이 화면을 통해 Naver API가 실제로 호출되지 않습니다.',
        stopTrigger: 'NO_NAVER_API_CALL',
        tone: 'warning',
      },
      {
        label: 'DB Write 없음',
        description: '이 화면을 통해 어떠한 DB Write도 발생하지 않습니다.',
        stopTrigger: 'NO_DB_WRITE',
        tone: 'warning',
      },
    ],
    finalNotice:
      'Task 144 Execution Readiness Worker Stop Conditions 패널은 Task 143 Execution Readiness Worker Input Validation을 기반으로 Worker가 실제 실행 전에 반드시 중단해야 하는 조건을 읽기 전용 기준으로 정리합니다. ' +
      '이 화면과 API 응답은 중단 조건 View Contract만 제공하며 실제 Worker 실행, Queue enqueue, Adapter 연결, Token 발급, Naver API 호출, POST, DB write는 수행하지 않습니다. ' +
      'Task 41~144 흐름 전체에서도 실행 권한은 계속 닫혀 있습니다.',
  };
}
