/**
 * Live Preflight Check for Final Approval Execution
 *
 * Summarizes whether all structural preconditions for a Live single-item
 * test are met. This is a read-only, display-only layer that sits on top
 * of the existing Safety Gate and Replay Guard services.
 *
 * Important invariants:
 *   - naverApiCallAllowed is ALWAYS false — this layer never permits live calls
 *   - ready=true means structural conditions are met, NOT that live calls are allowed
 *   - No HTTP client, Naver API endpoint, token, or secret reference in this file
 *   - No DB access — pure function over already-fetched data
 */

// ── Types ──────────────────────────────────────────────────────────────────────

export type LivePreflightChecklistItemStatus = 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';

export interface LivePreflightChecklistItem {
  key: string;
  label: string;
  status: LivePreflightChecklistItemStatus;
  message: string;
}

export type LivePreflightReadinessCode =
  | 'LIVE_PREFLIGHT_CHECK_READY_BUT_LIVE_CALL_DISABLED'
  | 'LIVE_PREFLIGHT_BLOCKED';

export interface LivePreflightCheckInput {
  finalApprovalStatus: string | null | undefined;
  batchJobStatus: string | null | undefined;
  itemStatuses: string[];
  totalItems: number;
  successItems: number;
  failedItems: number;
  skippedItems: number;
  executedAt: string | null | undefined;
  executionMetadata?: {
    executionMode?: string | null;
    actorId?: string | null;
  } | null;
  adapterMode?: string | null;
  naverApiCalled?: boolean;
}

export interface LivePreflightCheckResult {
  ready: boolean;
  readinessCode: LivePreflightReadinessCode;
  readinessMessage: string;
  checklistItems: LivePreflightChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  naverApiCalled: boolean;
}

export interface LivePreflightReadinessSummary {
  statusLabel: string;
  statusCode: string;
  naverApiCalled: boolean;
  naverApiCallAllowed: false;
  blockingCount: number;
  warningCount: number;
  passCount: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const PERMANENTLY_BLOCKED_ADAPTER_MODES = new Set([
  'live', 'prod', 'production', 'operating', 'bulk', 'mass',
]);

const TERMINAL_JOB_STATUSES = new Set([
  'EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED',
]);

// ── Core functions ─────────────────────────────────────────────────────────────

export function buildLivePreflightChecklist(
  input: LivePreflightCheckInput
): LivePreflightChecklistItem[] {
  const items: LivePreflightChecklistItem[] = [];
  const batchStatus = input.batchJobStatus ?? '';
  const isTerminal = TERMINAL_JOB_STATUSES.has(batchStatus);
  const isExecuting = batchStatus === 'EXECUTING';

  // 1. Final Approval 존재 및 ACTIVE 여부
  if (input.finalApprovalStatus == null) {
    items.push({
      key: 'final_approval_exists',
      label: 'Final Approval 존재 여부',
      status: 'BLOCKED',
      message: 'ACTIVE Final Approval Artifact가 없습니다. 최종 승인 Artifact를 먼저 생성하세요.',
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
      key: 'batch_job_not_terminal',
      label: 'BatchJob 재실행 차단',
      status: 'BLOCKED',
      message: `이미 실행된 BatchJob입니다 (상태: ${batchStatus}). 재실행은 별도 승인 흐름에서만 가능합니다.`,
    });
  } else if (isExecuting) {
    items.push({
      key: 'batch_job_not_executing',
      label: 'BatchJob 동시 실행 차단',
      status: 'BLOCKED',
      message: '현재 BatchJob이 실행 중입니다. 동시 실행은 허용되지 않습니다.',
    });
  } else if (batchStatus === 'APPROVED') {
    items.push({
      key: 'batch_job_approved',
      label: 'BatchJob 상태 (APPROVED)',
      status: 'PASS',
      message: 'BatchJob이 APPROVED 상태입니다.',
    });
  } else {
    items.push({
      key: 'batch_job_approved',
      label: 'BatchJob 상태 (APPROVED)',
      status: 'BLOCKED',
      message: `BatchJob이 APPROVED 상태가 아닙니다. 현재 상태: ${batchStatus || '알 수 없음'}`,
    });
  }

  // 3. BatchJobItem 전체 READY 여부 (terminal/executing 상태 제외)
  if (!isTerminal && !isExecuting) {
    if (input.itemStatuses.length === 0) {
      items.push({
        key: 'all_items_ready',
        label: 'BatchJobItem 전체 READY',
        status: 'BLOCKED',
        message: 'BatchJobItem이 없습니다.',
      });
    } else {
      const nonReadyStatuses = input.itemStatuses.filter(s => s !== 'READY');
      if (nonReadyStatuses.length > 0) {
        items.push({
          key: 'all_items_ready',
          label: 'BatchJobItem 전체 READY',
          status: 'BLOCKED',
          message: `READY가 아닌 항목이 ${nonReadyStatuses.length}건 있습니다.`,
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

  // 4. 단일 테스트 조건: item 수 정확히 1건
  if (input.totalItems === 1) {
    items.push({
      key: 'single_item_only',
      label: 'Live 단일 테스트 조건 (1건)',
      status: 'PASS',
      message: 'item 수가 정확히 1건으로 단일 테스트 조건을 충족합니다.',
    });
  } else {
    items.push({
      key: 'single_item_only',
      label: 'Live 단일 테스트 조건 (1건)',
      status: 'BLOCKED',
      message: `Live 단일 테스트는 item 1건만 허용됩니다. 현재: ${input.totalItems}건`,
    });
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

  // 6. Live Safety Gate: 현재 단계에서는 항상 NEEDS_REVIEW
  items.push({
    key: 'live_safety_gate',
    label: 'Live Safety Gate',
    status: 'NEEDS_REVIEW',
    message:
      '현재 단계에서 Live Safety Gate는 항상 차단 상태를 유지합니다. ' +
      'Live 실행은 별도 구현 승인 이후에만 가능합니다.',
  });

  // 7. Adapter Mode 확인
  const rawAdapterMode = (input.adapterMode ?? '').toLowerCase().trim();
  if (PERMANENTLY_BLOCKED_ADAPTER_MODES.has(rawAdapterMode)) {
    items.push({
      key: 'adapter_mode_safe',
      label: 'Adapter Mode 확인',
      status: 'BLOCKED',
      message:
        `Adapter Mode "${input.adapterMode}"는 영구 차단 모드입니다 ` +
        '(live/prod/production/operating은 현재 단계에서 사용 불가).',
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
      message: '실행 기록에 Naver API 호출이 감지되었습니다. 실제 호출 여부를 감사 로그에서 확인하세요.',
    });
  } else {
    items.push({
      key: 'naver_api_not_called',
      label: 'Naver API 미호출 확인',
      status: 'PASS',
      message: 'Naver API는 호출되지 않았습니다.',
    });
  }

  // 9. 실행 모드 확인 (과거 실행 기록 기준)
  const execMode = (input.executionMetadata?.executionMode ?? '').toLowerCase().trim();
  if (execMode === 'live') {
    items.push({
      key: 'execution_mode_safe',
      label: '실행 모드 (executionMode)',
      status: 'WARN',
      message:
        '과거 실행 모드가 "live"로 기록되어 있습니다. ' +
        '감사 로그에서 실제 Naver API 호출 여부를 확인하세요.',
    });
  } else if (execMode && execMode !== 'mock') {
    items.push({
      key: 'execution_mode_safe',
      label: '실행 모드 (executionMode)',
      status: 'NEEDS_REVIEW',
      message: `과거 실행 모드: "${input.executionMetadata?.executionMode}". Mock 실행 모드인지 확인하세요.`,
    });
  } else {
    items.push({
      key: 'execution_mode_safe',
      label: '실행 모드 (executionMode)',
      status: 'PASS',
      message: `실행 모드: "${execMode || '미실행/mock'}". 실제 Naver API 호출이 없는 모드입니다.`,
    });
  }

  // 10. 민감 정보 비노출 확인 (구조적 검사)
  items.push({
    key: 'no_sensitive_info',
    label: '민감 정보 비노출',
    status: 'PASS',
    message:
      '이 점검표에 인증 토큰, 비밀키, DB 접속 정보가 포함되지 않았습니다.',
  });

  return items;
}

export function evaluateFinalApprovalLivePreflightCheck(
  input: LivePreflightCheckInput
): LivePreflightCheckResult {
  const checklistItems = buildLivePreflightChecklist(input);

  const blockingItems = checklistItems.filter(item => item.status === 'BLOCKED');
  const warningItems = checklistItems.filter(
    item => item.status === 'WARN' || item.status === 'NEEDS_REVIEW'
  );

  const blockingReasons = blockingItems.map(item => item.message);
  const warnings = warningItems.map(item => item.message);
  const naverApiCalled = input.naverApiCalled === true;
  const isBlocked = blockingItems.length > 0;

  return {
    ready: !isBlocked,
    readinessCode: isBlocked
      ? 'LIVE_PREFLIGHT_BLOCKED'
      : 'LIVE_PREFLIGHT_CHECK_READY_BUT_LIVE_CALL_DISABLED',
    readinessMessage: isBlocked
      ? `Live 단일 테스트 전 점검에서 ${blockingItems.length}개 항목이 차단 상태입니다. 실제 Naver API 호출은 허용되지 않습니다.`
      : 'Live 단일 테스트 전 점검 조건이 모두 충족되었습니다. 단, 현재 단계에서 실제 Naver API 호출은 허용되지 않습니다.',
    checklistItems,
    blockingReasons,
    warnings,
    naverApiCallAllowed: false,
    naverApiCalled,
  };
}

export function summarizeLivePreflightReadiness(
  result: LivePreflightCheckResult
): LivePreflightReadinessSummary {
  const blockingCount = result.checklistItems.filter(i => i.status === 'BLOCKED').length;
  const warningCount = result.checklistItems.filter(
    i => i.status === 'WARN' || i.status === 'NEEDS_REVIEW'
  ).length;
  const passCount = result.checklistItems.filter(i => i.status === 'PASS').length;

  return {
    statusLabel: result.ready
      ? 'Live 단일 테스트 전 점검 완료 (Live 호출은 차단됨)'
      : `Live 단일 테스트 전 점검 미완료 (차단 항목: ${blockingCount}건)`,
    statusCode: result.readinessCode,
    naverApiCalled: result.naverApiCalled,
    naverApiCallAllowed: false,
    blockingCount,
    warningCount,
    passCount,
  };
}
