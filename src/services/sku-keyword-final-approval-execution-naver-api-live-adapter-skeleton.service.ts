/**
 * Naver API Live Adapter Skeleton
 *
 * Structure-only skeleton for the future live adapter implementation.
 * Satisfies NaverApiAdapterPort but NEVER makes real HTTP calls.
 *
 * Safety invariants (always enforced, never bypassed):
 *   - naverApiCalled is ALWAYS false
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - httpRequestCreated is ALWAYS false
 *   - endpointCalled is ALWAYS false
 *   - accessTokenRequested is ALWAYS false
 *   - credentialsUsed is ALWAYS false
 *   - sanitized is ALWAYS true
 *   - No fetch / axios / HTTP client
 *   - No Naver API endpoint URL
 *   - No access token issuance
 *   - No credential usage
 *   - Maximum state: LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED
 */

import type {
  NaverApiAdapterPort,
  NaverApiExecutionItemResult,
} from '../types/sku-keyword-final-approval-execution-naver-api.types';

// ── Types ─────────────────────────────────────────────────────────────────────

export type LiveAdapterSkeletonStatus = 'DISABLED' | 'NOT_IMPLEMENTED';

export type LiveAdapterSkeletonResultCode =
  | 'LIVE_ADAPTER_SKELETON_DISABLED'
  | 'LIVE_ADAPTER_NOT_IMPLEMENTED';

export interface LiveAdapterSkeletonInput {
  finalApprovalId?: string | null;
  batchJobId?: string | null;
  itemId?: string | null;
  requestedExecutionMode?: string | null;
  adapterMode?: string | null;
  liveSafetyGateResult?: unknown;
  environmentSafetyResult?: unknown;
  liveSingleTestApprovalAudit?: unknown;
  auditHistory?: unknown;
  payloadSummary?: unknown;
}

export interface LiveAdapterSkeletonResult {
  ok: false;
  success: false;
  exists: true;
  status: LiveAdapterSkeletonStatus;
  resultCode: LiveAdapterSkeletonResultCode;
  resultMessage: string;
  naverApiCalled: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  httpRequestCreated: false;
  endpointCalled: false;
  accessTokenRequested: false;
  credentialsUsed: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  maxAllowedState: 'LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED';
  sanitized: true;
}

// ── Core builder ──────────────────────────────────────────────────────────────

export function buildLiveAdapterSkeletonDisabledResult(
  _input?: LiveAdapterSkeletonInput
): LiveAdapterSkeletonResult {
  return {
    ok: false,
    success: false,
    exists: true,
    status: 'DISABLED',
    resultCode: 'LIVE_ADAPTER_SKELETON_DISABLED',
    resultMessage:
      '이 단계는 Live Adapter 구조만 준비된 상태입니다. ' +
      '실제 Naver API endpoint 호출은 아직 구현되지 않았고, ' +
      '별도 승인 전까지 금지됩니다.',
    naverApiCalled: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    httpRequestCreated: false,
    endpointCalled: false,
    accessTokenRequested: false,
    credentialsUsed: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    maxAllowedState: 'LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED',
    sanitized: true,
  };
}

// ── Standalone run function ────────────────────────────────────────────────────

export function runNaverApiLiveAdapterSkeleton(
  input: LiveAdapterSkeletonInput
): LiveAdapterSkeletonResult {
  return buildLiveAdapterSkeletonDisabledResult(input);
}

// ── NaverApiAdapterPort implementation (skeleton) ─────────────────────────────

export function createNaverApiLiveAdapterSkeleton(): NaverApiAdapterPort {
  return {
    executeItem: async (command): Promise<NaverApiExecutionItemResult> => ({
      itemId: command.itemId,
      status: 'SKIPPED',
      errorCode: 'LIVE_ADAPTER_SKELETON_DISABLED',
      errorMessage:
        'Live Adapter skeleton is registered but not executable — ' +
        'real Naver API calls are blocked until full implementation is approved',
      naverApiCalled: false,
    }),
  };
}
