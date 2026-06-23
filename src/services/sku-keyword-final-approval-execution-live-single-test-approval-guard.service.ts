/**
 * Live Single Test Approval Guard
 *
 * Evaluates whether all conditions for a Live single-item test approval are met.
 * This is a pure, read-only computation layer — it does not store anything to DB,
 * does not call any Naver API, and does not enable live execution.
 *
 * Maximum allowed result state: LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE
 *
 * Safety invariants enforced here:
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - No HTTP client, endpoint, token, or secret reference
 *   - No DB writes — pure function over already-fetched data
 */

// ── Types ──────────────────────────────────────────────────────────────────────

export type LiveSingleTestApprovalChecklistItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface LiveSingleTestApprovalChecklistItem {
  key: string;
  label: string;
  status: LiveSingleTestApprovalChecklistItemStatus;
  message: string;
}

export type LiveSingleTestApprovalCode =
  | 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE'
  | 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED'
  | 'LIVE_SINGLE_TEST_APPROVAL_PENDING_ACKNOWLEDGEMENT';

export const REQUIRED_ACKNOWLEDGEMENTS = [
  'CONFIRM_SINGLE_ITEM_ONLY',
  'CONFIRM_TARGET_PRODUCT_REVIEWED',
  'CONFIRM_PAYLOAD_REVIEWED',
  'CONFIRM_NAVER_API_STILL_DISABLED',
  'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
  'CONFIRM_NO_REPLAY_ALLOWED',
] as const;

export type RequiredAcknowledgement = (typeof REQUIRED_ACKNOWLEDGEMENTS)[number];

export interface LiveSingleTestApprovalGuardInput {
  finalApprovalId: string | null | undefined;
  finalApprovalStatus: string | null | undefined;
  batchJobId: string | null | undefined;
  batchJobStatus: string | null | undefined;
  itemStatuses: string[];
  totalItems: number;
  successItems: number;
  failedItems: number;
  executedAt: string | null | undefined;
  executionMetadata?: {
    executionMode?: string | null;
    actorId?: string | null;
  } | null;
  adapterMode?: string | null;
  naverApiCalled?: boolean;
  livePreflightResult?: {
    ready: boolean;
    blockingReasons: string[];
  } | null;
  acknowledgedItems?: string[];
}

export interface LiveSingleTestApprovalGuardResult {
  approvalReady: boolean;
  approvalCode: LiveSingleTestApprovalCode;
  approvalMessage: string;
  checklistItems: LiveSingleTestApprovalChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  requiredAcknowledgements: string[];
  acknowledgedCount: number;
  missingAcknowledgements: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE';
}

export interface LiveSingleTestApprovalReadinessSummary {
  statusLabel: string;
  approvalCode: string;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  blockingCount: number;
  warningCount: number;
  passCount: number;
  acknowledgedCount: number;
  totalRequiredAcknowledgements: number;
  missingAcknowledgements: string[];
}

// ── Constants ──────────────────────────────────────────────────────────────────

const PERMANENTLY_BLOCKED_ADAPTER_MODES = new Set([
  'live', 'prod', 'production', 'operating', 'bulk', 'mass',
]);

const TERMINAL_JOB_STATUSES = new Set([
  'EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED',
]);

// ── Checklist builder ──────────────────────────────────────────────────────────

export function buildLiveSingleTestApprovalChecklist(
  input: LiveSingleTestApprovalGuardInput
): LiveSingleTestApprovalChecklistItem[] {
  const items: LiveSingleTestApprovalChecklistItem[] = [];
  const batchStatus = input.batchJobStatus ?? '';
  const isTerminal = TERMINAL_JOB_STATUSES.has(batchStatus);
  const isExecuting = batchStatus === 'EXECUTING';

  // 1. Final Approval 존재 및 ACTIVE 여부
  if (!input.finalApprovalId) {
    items.push({
      key: 'final_approval_exists',
      label: 'Final Approval 존재 여부',
      status: 'BLOCKED',
      message: 'Final Approval ID가 없습니다. Final Approval Artifact를 먼저 생성하세요.',
    });
  } else if (input.finalApprovalStatus == null) {
    items.push({
      key: 'final_approval_exists',
      label: 'Final Approval 상태',
      status: 'BLOCKED',
      message: 'Final Approval 상태를 확인할 수 없습니다.',
    });
  } else if (input.finalApprovalStatus === 'ACTIVE') {
    items.push({
      key: 'final_approval_exists',
      label: 'Final Approval 존재 및 ACTIVE 여부',
      status: 'PASS',
      message: 'Final Approval이 존재하고 ACTIVE 상태입니다.',
    });
  } else {
    items.push({
      key: 'final_approval_exists',
      label: 'Final Approval 상태',
      status: 'BLOCKED',
      message: `Final Approval이 ACTIVE 상태가 아닙니다. 현재 상태: ${input.finalApprovalStatus}`,
    });
  }

  // 2. BatchJob 재실행/동시 실행 차단 및 APPROVED 확인
  if (isTerminal) {
    items.push({
      key: 'batch_job_status',
      label: 'BatchJob 재실행 차단',
      status: 'BLOCKED',
      message: `이미 실행된 BatchJob입니다 (상태: ${batchStatus}). 재실행은 별도 승인 흐름에서만 가능합니다.`,
    });
  } else if (isExecuting) {
    items.push({
      key: 'batch_job_status',
      label: 'BatchJob 동시 실행 차단',
      status: 'BLOCKED',
      message: '현재 BatchJob이 실행 중입니다. 동시 실행은 허용되지 않습니다.',
    });
  } else if (batchStatus === 'APPROVED') {
    items.push({
      key: 'batch_job_status',
      label: 'BatchJob 상태 (APPROVED)',
      status: 'PASS',
      message: 'BatchJob이 APPROVED 상태입니다.',
    });
  } else {
    items.push({
      key: 'batch_job_status',
      label: 'BatchJob 상태 (APPROVED)',
      status: 'BLOCKED',
      message: `BatchJob이 APPROVED 상태가 아닙니다. 현재 상태: ${batchStatus || '알 수 없음'}`,
    });
  }

  // 3. item 수 정확히 1건 (Live 단일 테스트 필수 조건)
  if (input.totalItems === 1) {
    items.push({
      key: 'single_item_count',
      label: 'Live 단일 테스트 조건 (item 1건)',
      status: 'PASS',
      message: 'item 수가 정확히 1건으로 Live 단일 테스트 조건을 충족합니다.',
    });
  } else {
    items.push({
      key: 'single_item_count',
      label: 'Live 단일 테스트 조건 (item 1건)',
      status: 'BLOCKED',
      message: `Live 단일 테스트는 item 1건만 허용됩니다. 현재: ${input.totalItems}건`,
    });
  }

  // 4. BatchJobItem 전체 READY 여부 (terminal/executing 상태 제외)
  if (!isTerminal && !isExecuting) {
    if (input.itemStatuses.length === 0) {
      items.push({
        key: 'all_items_ready',
        label: 'BatchJobItem 전체 READY',
        status: 'BLOCKED',
        message: 'BatchJobItem이 없습니다.',
      });
    } else {
      const nonReady = input.itemStatuses.filter(s => s !== 'READY');
      if (nonReady.length > 0) {
        items.push({
          key: 'all_items_ready',
          label: 'BatchJobItem 전체 READY',
          status: 'BLOCKED',
          message: `READY가 아닌 항목이 ${nonReady.length}건 있습니다.`,
        });
      } else {
        items.push({
          key: 'all_items_ready',
          label: 'BatchJobItem 전체 READY',
          status: 'PASS',
          message: `전체 ${input.itemStatuses.length}건이 모두 READY 상태입니다.`,
        });
      }
    }
  }

  // 5. Replay Guard: 이미 실행된 항목 차단
  if (input.successItems > 0 || input.failedItems > 0) {
    items.push({
      key: 'replay_guard',
      label: 'Replay Guard (재실행 차단)',
      status: 'BLOCKED',
      message: `이미 실행된 항목이 있습니다 (성공: ${input.successItems}건, 실패: ${input.failedItems}건). 재실행은 별도 승인 흐름에서만 가능합니다.`,
    });
  } else {
    items.push({
      key: 'replay_guard',
      label: 'Replay Guard (재실행 차단)',
      status: 'PASS',
      message: '이미 실행된 항목이 없습니다.',
    });
  }

  // 6. Live Preflight Check 결과 확인
  if (input.livePreflightResult == null) {
    items.push({
      key: 'live_preflight_exists',
      label: 'Live Preflight Check 결과',
      status: 'NEEDS_REVIEW',
      message: 'Live Preflight Check 결과가 없습니다. 점검표를 먼저 확인하세요.',
    });
  } else if (!input.livePreflightResult.ready) {
    const blockCount = input.livePreflightResult.blockingReasons.length;
    items.push({
      key: 'live_preflight_exists',
      label: 'Live Preflight Check 결과',
      status: 'BLOCKED',
      message: `Live Preflight Check에서 ${blockCount}개 항목이 차단 상태입니다.`,
    });
  } else {
    items.push({
      key: 'live_preflight_exists',
      label: 'Live Preflight Check 결과',
      status: 'PASS',
      message: 'Live Preflight Check 조건이 충족되어 있습니다.',
    });
  }

  // 7. Adapter Mode 확인
  const rawAdapterMode = (input.adapterMode ?? '').toLowerCase().trim();
  if (PERMANENTLY_BLOCKED_ADAPTER_MODES.has(rawAdapterMode)) {
    items.push({
      key: 'adapter_mode_safe',
      label: 'Adapter Mode 확인',
      status: 'BLOCKED',
      message:
        `Adapter Mode "${input.adapterMode}"는 영구 차단 모드입니다 ` +
        '(live/prod/production/operating은 이 단계에서 사용 불가).',
    });
  } else {
    items.push({
      key: 'adapter_mode_safe',
      label: 'Adapter Mode 확인',
      status: 'PASS',
      message:
        `현재 Adapter Mode "${input.adapterMode ?? 'mock/미설정'}"는 ` +
        '실제 Naver API를 호출하지 않는 모드입니다.',
    });
  }

  // 8. Naver API 미호출 확인
  const naverApiCalled = input.naverApiCalled === true;
  if (naverApiCalled) {
    items.push({
      key: 'naver_api_not_called',
      label: 'Naver API 미호출 확인',
      status: 'WARN',
      message: '실행 기록에 Naver API 호출이 감지되었습니다. 감사 로그를 확인하세요.',
    });
  } else {
    items.push({
      key: 'naver_api_not_called',
      label: 'Naver API 미호출 확인',
      status: 'PASS',
      message: 'Naver API는 호출되지 않았습니다.',
    });
  }

  // 9. naverApiCallAllowed=false 구조적 확인
  items.push({
    key: 'naver_api_call_disabled',
    label: 'Naver API 호출 비활성화 (구조적)',
    status: 'PASS',
    message: 'naverApiCallAllowed는 이 Guard에서 항상 false로 고정됩니다.',
  });

  // 10. liveExecutionEnabled=false 구조적 확인
  items.push({
    key: 'live_execution_disabled',
    label: 'Live 실행 비활성화 (구조적)',
    status: 'PASS',
    message: 'liveExecutionEnabled는 이 Guard에서 항상 false로 고정됩니다.',
  });

  // 11. 민감 정보 비노출 확인
  items.push({
    key: 'no_sensitive_info',
    label: '민감 정보 비노출',
    status: 'PASS',
    message: '이 승인 Guard에 인증 토큰, 비밀키, DB 접속 정보가 포함되지 않았습니다.',
  });

  return items;
}

// ── Main evaluation function ───────────────────────────────────────────────────

export function evaluateLiveSingleTestApprovalGuard(
  input: LiveSingleTestApprovalGuardInput
): LiveSingleTestApprovalGuardResult {
  const checklistItems = buildLiveSingleTestApprovalChecklist(input);

  const blockingItems = checklistItems.filter(i => i.status === 'BLOCKED');
  const warningItems = checklistItems.filter(
    i => i.status === 'WARN' || i.status === 'NEEDS_REVIEW'
  );
  const blockingReasons = blockingItems.map(i => i.message);
  const warnings = warningItems.map(i => i.message);

  const acknowledgedItems = input.acknowledgedItems ?? [];
  const requiredAcknowledgements = [...REQUIRED_ACKNOWLEDGEMENTS];
  const missingAcknowledgements = requiredAcknowledgements.filter(
    a => !acknowledgedItems.includes(a)
  );
  const acknowledgedCount = acknowledgedItems.filter(a =>
    requiredAcknowledgements.includes(a as RequiredAcknowledgement)
  ).length;

  const hasStructuralBlockers = blockingItems.length > 0;
  const hasMissingAcknowledgements = missingAcknowledgements.length > 0;
  const approvalReady = !hasStructuralBlockers && !hasMissingAcknowledgements;

  let approvalCode: LiveSingleTestApprovalCode;
  let approvalMessage: string;

  if (hasStructuralBlockers) {
    approvalCode = 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED';
    approvalMessage =
      `Live 단일 테스트 승인 준비에서 ${blockingItems.length}개 항목이 차단 상태입니다. ` +
      '실제 Naver API 호출은 허용되지 않습니다.';
  } else if (hasMissingAcknowledgements) {
    approvalCode = 'LIVE_SINGLE_TEST_APPROVAL_PENDING_ACKNOWLEDGEMENT';
    approvalMessage =
      `구조적 조건은 충족되었지만 ${missingAcknowledgements.length}개 위험 문구 확인이 남아 있습니다. ` +
      '실제 Naver API 호출은 허용되지 않습니다.';
  } else {
    approvalCode = 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE';
    approvalMessage =
      'Live 단일 테스트 승인 준비 조건이 모두 충족되었습니다. ' +
      '단, 현재 단계에서 실제 Naver API 호출은 허용되지 않습니다.';
  }

  return {
    approvalReady,
    approvalCode,
    approvalMessage,
    checklistItems,
    blockingReasons,
    warnings,
    requiredAcknowledgements,
    acknowledgedCount,
    missingAcknowledgements,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE',
  };
}

// ── Summary helper ─────────────────────────────────────────────────────────────

export function summarizeLiveSingleTestApprovalReadiness(
  result: LiveSingleTestApprovalGuardResult
): LiveSingleTestApprovalReadinessSummary {
  const blockingCount = result.checklistItems.filter(i => i.status === 'BLOCKED').length;
  const warningCount = result.checklistItems.filter(
    i => i.status === 'WARN' || i.status === 'NEEDS_REVIEW'
  ).length;
  const passCount = result.checklistItems.filter(i => i.status === 'PASS').length;

  let statusLabel: string;
  if (result.approvalReady) {
    statusLabel = 'Live 단일 테스트 승인 준비 완료 (Live 실행은 차단됨)';
  } else if (blockingCount > 0) {
    statusLabel = `Live 단일 테스트 승인 준비 불가 (차단 항목: ${blockingCount}건)`;
  } else {
    statusLabel = `위험 문구 확인 대기 중 (${result.missingAcknowledgements.length}건 미확인)`;
  }

  return {
    statusLabel,
    approvalCode: result.approvalCode,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    blockingCount,
    warningCount,
    passCount,
    acknowledgedCount: result.acknowledgedCount,
    totalRequiredAcknowledgements: result.requiredAcknowledgements.length,
    missingAcknowledgements: result.missingAcknowledgements,
  };
}
