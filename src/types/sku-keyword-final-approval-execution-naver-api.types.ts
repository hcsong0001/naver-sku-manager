/**
 * Naver API Adapter Types for FinalApproval Execution
 *
 * Structural interface for Naver API item execution.
 * No actual Naver API client is imported here — only shape contracts.
 *
 * Safety invariants:
 * - No HTTP client, token, or endpoint reference in this file
 * - Adapter port is satisfied by mock, disabled, or (future) live implementations
 */

// ── Item-level status ─────────────────────────────────────────────────────────

export type NaverApiItemExecutionStatus = 'SUCCESS' | 'FAILED' | 'SKIPPED';

// ── Command (input per item) ──────────────────────────────────────────────────

export interface NaverApiExecutionCommand {
  itemId: string;
  finalApprovalId: string;
}

// ── Result (output per item) ──────────────────────────────────────────────────

export interface NaverApiExecutionItemResult {
  itemId: string;
  status: NaverApiItemExecutionStatus;
  /** Naver API error code, if API call failed */
  errorCode?: string;
  /** Human-readable error message, if API call failed */
  errorMessage?: string;
  /** True only when a real HTTP call to the Naver API was made */
  naverApiCalled: boolean;
  /** True when result was produced by a mock adapter (never by a live adapter) */
  mock?: boolean;
}

// ── Adapter port ──────────────────────────────────────────────────────────────

export interface NaverApiAdapterPort {
  executeItem(command: NaverApiExecutionCommand): Promise<NaverApiExecutionItemResult>;
}
