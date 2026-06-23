/**
 * Naver API Live Execution Safety Gate
 *
 * Evaluates whether a live Naver API execution request satisfies all required
 * safety conditions. Even when every condition is met, this gate does NOT permit
 * live execution in the current phase — it signals readiness for the next phase.
 *
 * Gate result codes:
 *   ADAPTER_MODE_BLOCKED          — permanently blocked mode (prod/production/operating/bulk/mass)
 *   LIVE_DISABLED                 — ENABLE_NAVER_LIVE_EXECUTION not set to true
 *   LIVE_MODE_NOT_SET             — adapterMode must be explicitly "live"
 *   CONFIRMATION_REQUIRED         — confirmLiveNaverApi must be true
 *   SINGLE_ITEM_ONLY              — targetItemCount must be exactly 1
 *   BULK_EXECUTION_BLOCKED        — bulkExecution must be false
 *   MOCK_VERIFICATION_REQUIRED    — mock test must complete first
 *   EXPLICIT_APPROVAL_REQUIRED    — userExplicitApproval must be true
 *   LIVE_READY_BUT_NOT_EXECUTED   — all conditions met; live adapter not yet implemented
 *
 * Safety invariants enforced here:
 * - No HTTP client, Naver API endpoint, token, or secret reference in this file
 * - "allowed: true" is never returned — only LIVE_READY_BUT_NOT_EXECUTED at most
 */

// ── Permanently blocked adapter modes (no exception path) ─────────────────────

const ALWAYS_BLOCKED_ADAPTER_MODES = new Set([
  'prod',
  'production',
  'operating',
  'bulk',
  'mass',
]);

// ── Types ──────────────────────────────────────────────────────────────────────

export interface NaverApiLiveSafetyGateInput {
  /** Corresponds to ENABLE_NAVER_LIVE_EXECUTION env — must be true */
  enableLiveExecution: boolean | undefined;
  /** Corresponds to FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER env — must be "live" */
  adapterMode: string | undefined;
  /** Explicit caller confirmation that a live Naver API call will be made */
  confirmLiveNaverApi: boolean | undefined;
  /** Number of items to execute — must be exactly 1 */
  targetItemCount: number | undefined;
  /** Bulk execution flag — must be false (bulk live calls are never permitted) */
  bulkExecution: boolean | undefined;
  /** Must be true — mock verification must complete before live execution */
  mockVerificationCompleted: boolean | undefined;
  /** Must be true — user must explicitly approve each live call */
  userExplicitApproval: boolean | undefined;
}

export type NaverApiLiveSafetyGateCode =
  | 'ADAPTER_MODE_BLOCKED'
  | 'LIVE_DISABLED'
  | 'LIVE_MODE_NOT_SET'
  | 'CONFIRMATION_REQUIRED'
  | 'SINGLE_ITEM_ONLY'
  | 'BULK_EXECUTION_BLOCKED'
  | 'MOCK_VERIFICATION_REQUIRED'
  | 'EXPLICIT_APPROVAL_REQUIRED'
  | 'LIVE_READY_BUT_NOT_EXECUTED';

export interface NaverApiLiveSafetyGateResult {
  /** Always false in the current phase — live adapter is not yet implemented */
  allowed: boolean;
  code: NaverApiLiveSafetyGateCode;
  message: string;
  /** All conditions that blocked execution (may contain multiple reasons) */
  blockedReasons: string[];
}

// ── Gate evaluation ────────────────────────────────────────────────────────────

export function evaluateNaverApiLiveSafetyGate(
  input: NaverApiLiveSafetyGateInput
): NaverApiLiveSafetyGateResult {
  const rawMode = (input.adapterMode ?? '').toLowerCase().trim();

  // Always-blocked modes: no path to live execution regardless of other conditions
  if (ALWAYS_BLOCKED_ADAPTER_MODES.has(rawMode)) {
    return {
      allowed: false,
      code: 'ADAPTER_MODE_BLOCKED',
      message:
        `Adapter mode "${input.adapterMode}" is permanently blocked — ` +
        'prod/production/operating/bulk/mass are not allowed',
      blockedReasons: [
        `Adapter mode "${input.adapterMode}" is permanently blocked`,
      ],
    };
  }

  // Collect all failing conditions (show all reasons, not just the first)
  const blockedReasons: string[] = [];

  if (!input.enableLiveExecution) {
    blockedReasons.push('ENABLE_NAVER_LIVE_EXECUTION must be set to true');
  }

  if (rawMode !== 'live') {
    blockedReasons.push(
      `Adapter mode must be "live" for live execution, got: "${input.adapterMode ?? 'undefined'}"`
    );
  }

  if (!input.confirmLiveNaverApi) {
    blockedReasons.push('confirmLiveNaverApi must be true');
  }

  if ((input.targetItemCount ?? 0) !== 1) {
    blockedReasons.push(
      `targetItemCount must be exactly 1 for live execution, got: ${input.targetItemCount ?? 0}`
    );
  }

  if (input.bulkExecution) {
    blockedReasons.push('bulkExecution must be false — bulk live execution is never allowed');
  }

  if (!input.mockVerificationCompleted) {
    blockedReasons.push('mockVerificationCompleted must be true — run mock verification first');
  }

  if (!input.userExplicitApproval) {
    blockedReasons.push('userExplicitApproval must be true — explicit approval required');
  }

  if (blockedReasons.length > 0) {
    return {
      allowed: false,
      code: deriveBlockCode(input, rawMode),
      message: `Live Naver API execution blocked: ${blockedReasons[0]}`,
      blockedReasons,
    };
  }

  // All conditions satisfied — but live adapter is not yet implemented in this phase.
  // LIVE_READY_BUT_NOT_EXECUTED signals readiness for the next phase.
  return {
    allowed: false,
    code: 'LIVE_READY_BUT_NOT_EXECUTED',
    message:
      'All safety conditions are met. ' +
      'Live execution requires explicit implementation approval in the next phase.',
    blockedReasons: [],
  };
}

// ── Internal helpers ───────────────────────────────────────────────────────────

function deriveBlockCode(
  input: NaverApiLiveSafetyGateInput,
  rawMode: string
): NaverApiLiveSafetyGateCode {
  if (!input.enableLiveExecution) return 'LIVE_DISABLED';
  if (rawMode !== 'live') return 'LIVE_MODE_NOT_SET';
  if (!input.confirmLiveNaverApi) return 'CONFIRMATION_REQUIRED';
  if ((input.targetItemCount ?? 0) !== 1) return 'SINGLE_ITEM_ONLY';
  if (input.bulkExecution) return 'BULK_EXECUTION_BLOCKED';
  if (!input.mockVerificationCompleted) return 'MOCK_VERIFICATION_REQUIRED';
  return 'EXPLICIT_APPROVAL_REQUIRED';
}
