/**
 * Execution Result Recording Types
 *
 * Defines the input/output contracts for the pure-function layer that plans
 * what DB writes are needed after a Worker execution attempt completes.
 * No actual DB access happens here — the types describe the intent only.
 */

// ── Execution mode ────────────────────────────────────────────────────────────

export type ExecutionMode = 'dry-run' | 'restricted-db' | 'live';

// ── Item-level result input ───────────────────────────────────────────────────

export type ItemExecutionStatus =
  | 'SUCCESS'
  | 'FAILED'
  | 'SKIPPED'
  | 'RETRY_PENDING';

export interface ItemExecutionResult {
  itemId: string;
  status: ItemExecutionStatus;
  errorCode?: string;
  errorMessage?: string;
  /** Naver API call duration in ms, if a call was made */
  apiDurationMs?: number;
  /** Whether a Naver API call was actually made for this item */
  apiCallAttempted: boolean;
}

// ── Job-level result input ────────────────────────────────────────────────────

export type JobExecutionOutcome =
  | 'EXECUTED'         // All included items succeeded
  | 'PARTIAL_SUCCESS'  // Some items succeeded, some failed
  | 'FAILED'           // Critical failure or all items failed
  | 'TRANSITION_ONLY'; // EXECUTING transition only — no API calls yet (current state)

export interface JobExecutionInput {
  jobId: string;
  finalApprovalId: string;
  idempotencyKey: string;
  actorId: string;
  mode: ExecutionMode;
  itemResults: ItemExecutionResult[];
  /** ISO string of when execution started */
  startedAt: string;
  /** ISO string of when execution ended */
  endedAt: string;
}

// ── Result plan ───────────────────────────────────────────────────────────────

export interface JobResultUpdate {
  jobId: string;
  newStatus: 'EXECUTED' | 'PARTIAL_SUCCESS' | 'FAILED';
  successCount: number;
  failedCount: number;
  skippedCount: number;
  executedAt: string;
  /** JSON blob to store in NaverApiBatchJob.metadata */
  metadataUpdate: JobExecutionMetadata;
}

export interface JobExecutionMetadata {
  executionMode: ExecutionMode;
  actorId: string;
  idempotencyKey: string;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  finalApprovalId: string;
}

export interface ItemResultUpdate {
  itemId: string;
  newStatus: 'SUCCESS' | 'FAILED' | 'SKIPPED' | 'RETRY_PENDING';
  errorCode?: string;
  errorMessage?: string;
}

export interface ExecutionResultPlan {
  /** Whether this plan can actually be applied */
  applicable: boolean;
  /** Why the plan is not applicable, if so */
  blockedReason?: string;
  /** Computed aggregate outcome */
  outcome: JobExecutionOutcome;
  /** What to write to NaverApiBatchJob */
  jobUpdate?: JobResultUpdate;
  /** What to write to NaverApiBatchJobItem (one entry per item) */
  itemUpdates: ItemResultUpdate[];
  /** Audit summary for logging */
  summary: ExecutionResultSummary;
}

export interface ExecutionResultSummary {
  totalItems: number;
  successCount: number;
  failedCount: number;
  skippedCount: number;
  retryPendingCount: number;
  apiCallsAttempted: number;
  durationMs: number;
  outcome: JobExecutionOutcome;
  mode: ExecutionMode;
}
