'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileJson,
  Loader2,
  ShieldAlert,
  X,
} from 'lucide-react';
import type {
  SkuKeywordDraftBatchApproveRequest,
  SkuKeywordDraftBatchApproveResponse,
} from '@/src/types/sku-keyword-draft-preview.types';
import type { SkuKeywordFinalApprovalCreateRequest } from '@/src/types/sku-keyword-final-approval.types';

type DraftBatchItem = {
  id: string;
  status: string;
  calculationType?: string;
  targetType?: string;
  targetId?: string;
  requestPayload?: unknown;
  candidateSummary?: {
    sku?: string;
    barcode?: string;
    productName?: string;
    keyword?: string;
    targetType?: string;
    changeType?: string;
  };
  dryRunSummary?: {
    riskLevel?: string;
    warnings?: string[];
    blockedReasons?: string[];
    before?: {
      price?: number | null;
      stock?: number | null;
    };
    after?: {
      price?: number | null;
      stock?: number | null;
    };
  };
};

type ExecutionMetadata = {
  executionMode?: string;
  actorId?: string;
  durationMs?: number;
  startedAt?: string;
  endedAt?: string;
  finalApprovalId?: string;
  recordedAt?: string;
  resultSummary?: {
    successCount: number;
    failedCount: number;
    skippedCount: number;
  };
};

type LivePreflightChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type LivePreflightSummary = {
  statusLabel: string;
  statusCode: string;
  naverApiCalled: boolean;
  naverApiCallAllowed: false;
  blockingCount: number;
  warningCount: number;
  passCount: number;
};

type LivePreflightResult = {
  ready: boolean;
  readinessCode: string;
  readinessMessage: string;
  checklistItems: LivePreflightChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  naverApiCalled: boolean;
  summary: LivePreflightSummary;
};

type LiveSingleTestApprovalChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type LiveSingleTestApprovalSummary = {
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
};

type TargetProductSummary = {
  itemId: string;
  targetType?: string | null;
  targetId?: string | null;
  channelProductNo?: string | null;
  productName?: string | null;
  skuCode?: string | null;
  changeType?: string | null;
  priceChange?: { before: unknown; after: unknown } | null;
  stockChange?: { before: unknown; after: unknown } | null;
};

type LiveSingleTestApprovalResult = {
  approvalReady: boolean;
  approvalCode: string;
  approvalMessage: string;
  checklistItems: LiveSingleTestApprovalChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  requiredAcknowledgements: string[];
  acknowledgedCount: number;
  missingAcknowledgements: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: string;
  summary: LiveSingleTestApprovalSummary;
  targetProductSummary?: TargetProductSummary | null;
};

type EnvironmentSafetyChecklistItem = {
  key: string;
  label: string;
  status: 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';
  message: string;
};

type EnvironmentSafetyResult = {
  allowed: boolean;
  environmentCode: string;
  environmentMessage: string;
  databaseEnvironment: 'local' | 'test' | 'unknown' | 'operating_blocked';
  redisEnvironment: 'local' | 'test' | 'unknown' | 'operating_blocked';
  naverApiCallAllowed: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  checklistItems: EnvironmentSafetyChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  sanitized: true;
};

type AuditHistoryItemStatus = 'RECORDED_BUT_NOT_EXECUTABLE' | 'UNKNOWN';

type LiveSingleTestAuditHistoryItem = {
  id: string;
  batchJobId: string;
  finalApprovalId: string | null;
  auditCode: string;
  status: AuditHistoryItemStatus;
  recordedAt: string | null;
  actorId: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  targetProductSummary: Record<string, unknown> | null;
  safePayloadSummary: Record<string, unknown> | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
};

type LiveSingleTestAuditHistorySummary = {
  totalRecords: number;
  hasAuditRecord: boolean;
  latestAuditCode: string | null;
  latestRecordedAt: string | null;
  latestActorId: string | null;
  latestStatus: AuditHistoryItemStatus | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
};

type LiveSingleTestAuditHistoryResult = {
  exists: boolean;
  latestAudit: LiveSingleTestAuditHistoryItem | null;
  summary: LiveSingleTestAuditHistorySummary;
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
  maxAllowedState: string;
};

type LiveSingleTestApprovalAuditTargetSummary = {
  itemId?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  channelProductNo?: string | null;
  productName?: string | null;
  skuCode?: string | null;
  changeType?: string | null;
};

type LiveSingleTestApprovalAuditPayloadSummary = {
  changeType?: string | null;
  riskLevel?: string | null;
};

type LiveSingleTestApprovalAuditRecord = {
  auditCode: string;
  auditStatus: string;
  auditMessage: string;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
  actorId?: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  warnings: string[];
  targetProductSummary?: LiveSingleTestApprovalAuditTargetSummary | null;
  safePayloadSummary?: LiveSingleTestApprovalAuditPayloadSummary | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: string;
  recordedAt: string;
};

type DraftBatchJob = {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  successItems: number;
  failedItems: number;
  skippedItems: number;
  executedAt: string | null;
  executionMetadata: ExecutionMetadata | null;
  items: DraftBatchItem[];
  livePreflight?: LivePreflightResult | null;
  liveSingleTestApproval?: LiveSingleTestApprovalResult | null;
  liveSingleTestApprovalAudit?: LiveSingleTestApprovalAuditRecord | null;
  liveSingleTestAuditHistory?: LiveSingleTestAuditHistoryResult | null;
  environmentSafety?: EnvironmentSafetyResult | null;
};

type DraftBatchDetailResponse =
  | {
    ok: true;
    job: DraftBatchJob;
  }
  | {
    ok: false;
    error?: string;
  };

type FinalApprovalSummary = {
  id: string;
  version: number;
  status: 'ACTIVE' | 'INVALIDATED' | 'SUPERSEDED';
  finalApprovedAt: string;
  finalApprovedBy: string;
  validationExpiresAt: string;
  invalidatedAt: string | null;
  supersedesApprovalId: string | null;
  itemCount: number;
  validationSnapshotHash: string;
  payloadHash: string;
};

type FinalApprovalsListResponse =
  | {
    ok: true;
    jobId: string;
    finalApprovals: FinalApprovalSummary[];
  }
  | {
    ok: false;
    error?: string;
  };

const ALLOWED_TARGET_TYPES = new Set(['SINGLE', 'OPTION', 'ADDITIONAL']);
const WARNING_LABELS: Record<string, string> = {
  CHANNEL_ID_UNAVAILABLE: '채널 ID 정보 없음',
  UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW: '업로드 Preview 기준 현재값 사용',
  CURRENT_CONTEXT_STALE: '현재 문맥이 오래되었을 수 있음',
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getStatusBadgeStyle(status: string): string {
  switch (status.toUpperCase()) {
    case 'EXECUTED':
    case 'SUCCESS':
    case 'ACTIVE':
      return 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300';
    case 'PARTIAL_SUCCESS':
      return 'border-orange-500/30 bg-orange-500/20 text-orange-300';
    case 'FAILED':
    case 'INVALIDATED':
      return 'border-red-500/30 bg-red-500/20 text-red-300';
    case 'EXECUTING':
      return 'border-amber-500/30 bg-amber-500/20 text-amber-300';
    case 'APPROVED':
      return 'border-indigo-500/30 bg-indigo-500/20 text-indigo-300';
    case 'READY':
      return 'border-teal-500/30 bg-teal-500/20 text-teal-300';
    case 'SKIPPED':
    case 'CANCELLED':
    case 'SUPERSEDED':
      return 'border-gray-500/30 bg-gray-500/20 text-gray-400';
    case 'DRAFT':
    default:
      return 'border-slate-500/30 bg-slate-500/20 text-slate-300';
  }
}

function formatWarningCode(code: string): string {
  return WARNING_LABELS[code] ?? code;
}

function detectVisibleWarningCodes(job: DraftBatchJob | null): string[] {
  if (!job) return [];

  const warnings = new Set<string>();
  const staleThresholdMs = 24 * 60 * 60 * 1000;

  for (const item of job.items) {
    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    if (!candidate) continue;

    const issues = Array.isArray(candidate.issues) ? candidate.issues : [];
    for (const issue of issues) {
      const issueRecord = asRecord(issue);
      if (issueRecord?.code === 'CHANNEL_ID_UNAVAILABLE') {
        warnings.add('CHANNEL_ID_UNAVAILABLE');
      }
    }

    const currentStateSource = asString(candidate.currentStateSource);
    if (currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') {
      warnings.add('UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW');
    }

    const syncedAtRaw = candidate.currentStateSyncedAt;
    if (typeof syncedAtRaw === 'string') {
      const syncedAt = new Date(syncedAtRaw);
      if (!Number.isNaN(syncedAt.getTime()) && Date.now() - syncedAt.getTime() > staleThresholdMs) {
        warnings.add('CURRENT_CONTEXT_STALE');
      }
    }
  }

  return Array.from(warnings);
}

function getVisibleHardBlockers(job: DraftBatchJob | null): string[] {
  if (!job) return ['Batch 정보를 아직 불러오지 못했습니다.'];

  const blockers: string[] = [];

  if (job.status !== 'DRAFT') {
    blockers.push(`현재 Job 상태가 DRAFT가 아닙니다. (${job.status})`);
  }

  if (job.itemCount <= 0 || job.items.length === 0) {
    blockers.push('승인할 item이 없습니다.');
  }

  for (const item of job.items) {
    if (item.status !== 'DRAFT') {
      blockers.push(`Item ${item.id} 상태가 DRAFT가 아닙니다. (${item.status})`);
    }

    if (!item.targetType || !ALLOWED_TARGET_TYPES.has(item.targetType)) {
      blockers.push(`Item ${item.id}의 targetType이 유효하지 않습니다.`);
    }

    if (!item.targetId) {
      blockers.push(`Item ${item.id}의 targetId가 비어 있습니다.`);
    }

    if (!item.dryRunSummary) {
      blockers.push(`Item ${item.id}의 dry-run 요약이 없습니다.`);
    } else {
      if ((item.dryRunSummary.blockedReasons?.length ?? 0) > 0) {
        blockers.push(`Item ${item.id}에 dry-run 차단 사유가 남아 있습니다.`);
      }

      if (item.dryRunSummary.riskLevel === 'HIGH') {
        blockers.push(`Item ${item.id}의 위험도가 HIGH입니다.`);
      }

      const before = item.dryRunSummary.before;
      const after = item.dryRunSummary.after;
      const hasPrice = before?.price !== null && before?.price !== undefined
        && after?.price !== null && after?.price !== undefined;
      const hasStock = before?.stock !== null && before?.stock !== undefined
        && after?.stock !== null && after?.stock !== undefined;
      if (!hasPrice && !hasStock) {
        blockers.push(`Item ${item.id}의 before/after 비교값이 부족합니다.`);
      }
    }

    const requestPayload = asRecord(item.requestPayload);
    const candidate = asRecord(requestPayload?.candidate);
    if (!candidate) {
      blockers.push(`Item ${item.id}의 requestPayload.candidate가 없습니다.`);
      continue;
    }

    if (asString(candidate.status) === 'NEEDS_CONTEXT') {
      blockers.push(`Item ${item.id}가 NEEDS_CONTEXT 상태입니다.`);
    }

    const riskTypes = asStringArray(candidate.riskTypes);
    if (riskTypes.includes('CURRENT_PRICE_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}에 CURRENT_PRICE_UNAVAILABLE이 남아 있습니다.`);
    }
    if (riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
      blockers.push(`Item ${item.id}에 CURRENT_STOCK_UNAVAILABLE이 남아 있습니다.`);
    }

    const reviewMessage = asString(candidate.reviewMessage) ?? '';
    if (reviewMessage.includes('매칭: optionValue')) {
      blockers.push(`Item ${item.id}는 optionValue fallback 매칭 후보입니다.`);
    }
  }

  return Array.from(new Set(blockers));
}

export default function DraftBatchDetailPage(props: { params: Promise<{ jobId: string }> }) {
  const params = use(props.params);
  const [job, setJob] = useState<DraftBatchJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [approveChecked, setApproveChecked] = useState(false);
  const [approving, setApproving] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);
  const [approveResult, setApproveResult] = useState<SkuKeywordDraftBatchApproveResponse | null>(null);

  const [finalApprovals, setFinalApprovals] = useState<FinalApprovalSummary[] | null>(null);
  const [finalApprovalsLoading, setFinalApprovalsLoading] = useState(true);
  const [finalApprovalsError, setFinalApprovalsError] = useState<string | null>(null);

  const [isFinalApprovalModalOpen, setIsFinalApprovalModalOpen] = useState(false);
  const [isCreatingFinalApproval, setIsCreatingFinalApproval] = useState(false);
  const [finalApprovalCreateError, setFinalApprovalCreateError] = useState<string | null>(null);
  const [finalApprovalCreateSuccess, setFinalApprovalCreateSuccess] = useState<string | null>(null);

  const [liveAuditCheckedItems, setLiveAuditCheckedItems] = useState<string[]>([]);
  const [liveAuditSaving, setLiveAuditSaving] = useState(false);
  const [liveAuditSaveError, setLiveAuditSaveError] = useState<string | null>(null);
  const [liveAuditSaveResult, setLiveAuditSaveResult] = useState<{
    approvalCode: string;
    recordedAt: string;
    acknowledgedItems: string[];
    message: string;
  } | null>(null);

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const initTimer = setTimeout(() => setNow(Date.now()), 0);
    const intervalTimer = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}`);
      const data = (await response.json()) as DraftBatchDetailResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.ok ? 'Batch 상세 조회에 실패했습니다.' : data.error || 'Batch 상세 조회에 실패했습니다.');
      }

      setJob(data.job);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [params.jobId]);

  useEffect(() => {
    let cancelled = false;

    const loadInitialJob = async () => {
      try {
        const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}`);
        const data = (await response.json()) as DraftBatchDetailResponse;

        if (!response.ok || !data.ok) {
          throw new Error(data.ok ? 'Batch 상세 조회에 실패했습니다.' : data.error || 'Batch 상세 조회에 실패했습니다.');
        }

        if (!cancelled) {
          setJob(data.job);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const loadFinalApprovals = async () => {
      try {
        setFinalApprovalsLoading(true);
        const response = await fetch(`/api/sku-matching/draft-batch/${params.jobId}/final-approvals`);
        const data = (await response.json()) as FinalApprovalsListResponse;

        if (!response.ok || !data.ok) {
          throw new Error('error' in data && data.error ? data.error : 'FinalApproval 조회에 실패했습니다.');
        }

        if (!cancelled) {
          setFinalApprovals(data.finalApprovals);
          setFinalApprovalsError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setFinalApprovalsError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setFinalApprovalsLoading(false);
        }
      }
    };

    void Promise.all([loadInitialJob(), loadFinalApprovals()]);

    return () => {
      cancelled = true;
    };
  }, [params.jobId]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS = [
    'CONFIRM_SINGLE_ITEM_ONLY',
    'CONFIRM_TARGET_PRODUCT_REVIEWED',
    'CONFIRM_PAYLOAD_REVIEWED',
    'CONFIRM_NAVER_API_STILL_DISABLED',
    'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
    'CONFIRM_NO_REPLAY_ALLOWED',
  ] as const;

  const handleToggleLiveAuditItem = (ack: string) => {
    setLiveAuditCheckedItems(prev =>
      prev.includes(ack) ? prev.filter(a => a !== ack) : [...prev, ack]
    );
  };

  const handleSaveLiveAudit = async () => {
    if (!job || liveAuditSaving) return;
    const currentActiveFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
    if (!currentActiveFinalApproval) return;

    try {
      setLiveAuditSaving(true);
      setLiveAuditSaveError(null);

      const response = await fetch('/api/sku-keyword-final-approvals/live-single-test-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalApprovalId: currentActiveFinalApproval.id,
          batchJobId: job.id,
          acknowledgedItems: liveAuditCheckedItems,
          confirmApprovalRecordOnly: true,
          actorId: 'UI_USER',
        }),
      });

      type SaveAuditResponse =
        | { ok: true; approvalCode: string; auditRecord: { recordedAt: string; acknowledgedItems: string[] }; message: string }
        | { ok: false; error?: string; missingAcknowledgements?: string[] };

      const data = (await response.json()) as SaveAuditResponse;
      if (!response.ok || !data.ok) {
        throw new Error(
          !data.ok && data.error ? data.error : '승인 기록 저장에 실패했습니다.'
        );
      }

      setLiveAuditSaveResult({
        approvalCode: data.approvalCode,
        recordedAt: data.auditRecord.recordedAt,
        acknowledgedItems: data.auditRecord.acknowledgedItems,
        message: data.message,
      });
      await fetchJob();
    } catch (err: unknown) {
      setLiveAuditSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setLiveAuditSaving(false);
    }
  };

  const visibleWarnings = useMemo(() => detectVisibleWarningCodes(job), [job]);
  const visibleHardBlockers = useMemo(() => getVisibleHardBlockers(job), [job]);
  const hasVisibleHardBlockers = visibleHardBlockers.length > 0;
  const canApprove = job?.status === 'DRAFT'
    && (job.itemCount ?? 0) > 0
    && approveChecked
    && !hasVisibleHardBlockers
    && !approving;

  const TERMINAL_JOB_STATUSES_UI = ['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED'];
  const finalApprovalBlockingReasons: string[] = [];
  if (!job) {
    finalApprovalBlockingReasons.push("Batch 정보를 불러오는 중입니다.");
  } else if (TERMINAL_JOB_STATUSES_UI.includes(job.status)) {
    finalApprovalBlockingReasons.push(
      `이미 실행 기록이 있는 BatchJob입니다 (상태: ${job.status}). 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다.`
    );
  } else if (job.status === 'EXECUTING') {
    finalApprovalBlockingReasons.push("BatchJob이 현재 실행 중입니다. 동시 실행은 허용되지 않습니다.");
  } else if (job.status !== 'APPROVED') {
    finalApprovalBlockingReasons.push("Batch 상태가 APPROVED가 아닙니다.");
  }
  const allItemsReady = job?.items.every(item => item.status === 'READY') ?? false;
  const isTerminalJobStatus = job ? TERMINAL_JOB_STATUSES_UI.includes(job.status) || job.status === 'EXECUTING' : false;
  if (job && !allItemsReady && !isTerminalJobStatus) {
    finalApprovalBlockingReasons.push("READY가 아닌 Item이 있습니다.");
  }
  if (finalApprovalsLoading) {
    finalApprovalBlockingReasons.push("FinalApproval 조회 중입니다.");
  }
  if (finalApprovalsError) {
    finalApprovalBlockingReasons.push("FinalApproval 조회에 실패했습니다.");
  }
  const activeFinalApproval = finalApprovals?.find(a => a.status === 'ACTIVE');
  if (activeFinalApproval) {
    finalApprovalBlockingReasons.push("이미 ACTIVE 최종 승인 Artifact가 있습니다.");
  }
  const canCreateFinalApproval = finalApprovalBlockingReasons.length === 0;

  const handleApprove = async () => {
    if (!job || !canApprove) return;

    try {
      setApproving(true);
      setApproveError(null);
      setApproveResult(null);

      const response = await fetch(`/api/sku-matching/draft-batch/${job.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmApproveOnly: true,
          acknowledgedWarnings: visibleWarnings,
        } satisfies SkuKeywordDraftBatchApproveRequest),
      });

      const data = (await response.json()) as SkuKeywordDraftBatchApproveResponse | { ok: false; error?: string };
      if (!response.ok || !data.ok) {
        if ('blockedReasons' in data && Array.isArray(data.blockedReasons) && data.blockedReasons.length > 0) {
          throw new Error(data.blockedReasons.join(' / '));
        }
        throw new Error('error' in data ? data.error || '승인 처리에 실패했습니다.' : '승인 처리에 실패했습니다.');
      }

      setApproveResult(data);
      setApproveChecked(false);
      await fetchJob();
    } catch (err: unknown) {
      setApproveError(err instanceof Error ? err.message : String(err));
    } finally {
      setApproving(false);
    }
  };

  const handleCreateFinalApproval = async () => {
    if (!job || !canCreateFinalApproval || isCreatingFinalApproval) return;

    try {
      setIsCreatingFinalApproval(true);
      setFinalApprovalCreateError(null);
      setFinalApprovalCreateSuccess(null);

      const requestBody: SkuKeywordFinalApprovalCreateRequest = {
        confirmFinalApproval: true,
        approvalMemo: null,
        acknowledgedWarnings: visibleWarnings,
      };

      const response = await fetch(`/api/sku-matching/draft-batch/${job.id}/final-approvals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if ('message' in data && typeof data.message === 'string') {
          throw new Error(data.message);
        }
        throw new Error(`최종 승인 생성에 실패했습니다. (${response.status})`);
      }

      setFinalApprovalCreateSuccess(
        'FinalApproval artifact가 생성되었습니다. 이 작업은 네이버 API 호출이나 실행 전환을 수행하지 않았습니다.'
      );
      setIsFinalApprovalModalOpen(false);

      // 성공 후 최종 승인 목록 재조회
      setFinalApprovalsLoading(true);
      const listResponse = await fetch(`/api/sku-matching/draft-batch/${job.id}/final-approvals`);
      const listData = await listResponse.json();
      if (listResponse.ok && listData.ok) {
        setFinalApprovals(listData.finalApprovals);
      }
    } catch (err: unknown) {
      setFinalApprovalCreateError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsCreatingFinalApproval(false);
      setFinalApprovalsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Batch 상세를 불러오는 중입니다...</span>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>{error || 'Batch를 찾을 수 없습니다.'}</div>
        </div>
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mt-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      <div className="mb-6">
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mb-4 inline-flex items-center text-sm text-gray-400 hover:text-gray-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> DRAFT Batch 목록
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">Batch 상세 검토</h1>
        {job.status === 'DRAFT' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 화면에서는 DRAFT Batch를 APPROVED 상태로만 전환할 수 있습니다. 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
          </div>
        ) : job.status === 'APPROVED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 APPROVED 상태입니다. 각 item은 READY 상태로 승인되었습니다. 아직 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행되지 않았습니다. 실제 실행 기능은 별도 단계에서만 구현됩니다.
          </div>
        ) : job.status === 'EXECUTED' ? (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">EXECUTED</strong> 상태입니다. Worker 실행이 완료됐습니다. 실제 Naver API는 호출되지 않았습니다.
          </div>
        ) : job.status === 'PARTIAL_SUCCESS' ? (
          <div className="mt-2 rounded-md border border-orange-500/20 bg-orange-500/10 p-3 text-sm text-orange-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">PARTIAL_SUCCESS</strong> 상태입니다. 일부 항목만 성공했습니다. 하단 실행 결과를 확인하세요.
          </div>
        ) : job.status === 'FAILED' ? (
          <div className="mt-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            <AlertTriangle className="mr-2 inline-block h-4 w-4" />
            이 Batch는 <strong className="text-white">FAILED</strong> 상태입니다. 하단 실행 결과를 확인하세요.
          </div>
        ) : job.status === 'EXECUTING' ? (
          <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
            이 Batch는 <strong className="text-white">EXECUTING</strong> 상태입니다. Worker가 실행 중입니다.
          </div>
        ) : (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            이 Batch는 이미 {job.status} 상태입니다. 이 화면에서는 실행 버튼이나 네이버 반영 버튼을 제공하지 않습니다.
          </div>
        )}
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-[#262629] bg-[#121214] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">Batch ID</p>
          <p className="font-mono text-sm text-gray-300">{job.id}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">상태</p>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
            {job.status}
          </span>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">항목 수</p>
          <p className="text-sm font-semibold text-white">{job.itemCount}건</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">생성일시</p>
          <p className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {job.status === 'DRAFT' && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
            <div className="space-y-3">
              <div>
                <h2 className="text-base font-semibold text-white">승인 영역</h2>
                <p className="mt-1 text-sm text-gray-300">
                  이 작업은 Batch를 <strong className="text-white">APPROVED</strong> 상태로만 변경합니다.
                  각 item은 <strong className="text-white">READY</strong> 상태로 전환됩니다.
                  네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
                  실제 실행은 별도 단계에서만 가능합니다.
                </p>
              </div>

              {visibleWarnings.length > 0 && (
                <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                  <p className="font-semibold text-amber-300">승인 전 확인할 경고</p>
                  <ul className="mt-2 space-y-1">
                    {visibleWarnings.map((warningCode) => (
                      <li key={warningCode}>- {formatWarningCode(warningCode)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasVisibleHardBlockers && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  <p className="font-semibold text-red-300">화면에서 확인된 승인 차단 사유</p>
                  <ul className="mt-2 space-y-1">
                    {visibleHardBlockers.map((reason) => (
                      <li key={reason}>- {reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              <label className="flex items-start gap-3 rounded-md border border-[#262629] bg-[#18181b] p-3 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={approveChecked}
                  onChange={(event) => setApproveChecked(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-500 bg-[#0f0f11] text-indigo-500"
                />
                <span>이 작업은 승인 상태 전환만 수행하며, 네이버 API 호출이 없음을 확인했습니다.</span>
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleApprove()}
                  disabled={!canApprove}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                >
                  {approving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      APPROVED 상태로 승인 중...
                    </>
                  ) : (
                    '검토 완료 후 승인'
                  )}
                </button>
                <span className="text-xs text-gray-400">
                  승인 후 DRAFT 전용 목록에서는 이 Batch가 보이지 않을 수 있습니다.
                </span>
              </div>

              {approveError && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                  {approveError}
                </div>
              )}

              {approveResult?.ok && (
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                  <p className="font-semibold text-emerald-300">승인 완료</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <p>jobId: <span className="font-mono">{approveResult.jobId}</span></p>
                    <p>previousJobStatus: {approveResult.previousJobStatus}</p>
                    <p>nextJobStatus: {approveResult.nextJobStatus}</p>
                    <p>nextItemStatus: {approveResult.nextItemStatus}</p>
                    <p>itemCount: {approveResult.itemCount}</p>
                    <p>네이버 API 호출 없음</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FinalApproval 요약 표시 영역 */}
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
          <FileJson className="h-5 w-5 text-indigo-400" />
          최종 승인 Artifact
        </h2>

        <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
          <p className="mb-1 font-semibold text-blue-300">실행 모드 안내</p>
          <ul className="space-y-0.5">
            <li>현재 실행은 Mock 모드입니다.</li>
            <li>실제 Naver API는 호출되지 않습니다.</li>
            <li>가격/재고/상품 정보는 실제로 변경되지 않습니다.</li>
          </ul>
        </div>

        {/* 재실행 차단 안내 */}
        {job && TERMINAL_JOB_STATUSES_UI.includes(job.status) && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              재실행 차단됨
            </p>
            <p className="text-xs text-red-200">
              이 BatchJob은 이미 실행 기록이 있습니다. 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-red-300">
              <div>
                <span className="text-red-400">실행 상태: </span>
                <span className={`rounded-full border px-1.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(job.status)}`}>
                  {job.status}
                </span>
              </div>
              {job.executedAt && (
                <div>
                  <span className="text-red-400">실행 완료 시각: </span>
                  <span>{new Date(job.executedAt).toLocaleString()}</span>
                </div>
              )}
              {job.executionMetadata?.actorId && (
                <div className="col-span-2">
                  <span className="text-red-400">실행 Actor: </span>
                  <span className="font-mono">{job.executionMetadata.actorId}</span>
                </div>
              )}
              {job.executionMetadata?.executionMode && (
                <div>
                  <span className="text-red-400">실행 모드: </span>
                  <span className="font-mono">{job.executionMetadata.executionMode}</span>
                </div>
              )}
              {job.executionMetadata?.finalApprovalId && (
                <div className="col-span-2">
                  <span className="text-red-400">FinalApproval ID: </span>
                  <span className="font-mono">{job.executionMetadata.finalApprovalId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {job && job.status === 'EXECUTING' && (
          <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            <p className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              실행 중 — 동시 실행 차단됨
            </p>
            <p className="mt-1 text-xs">
              현재 Worker가 이 BatchJob을 실행 중입니다. 완료 후 결과를 확인하세요.
            </p>
          </div>
        )}

        {finalApprovalCreateSuccess && (
          <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {finalApprovalCreateSuccess}
          </div>
        )}

        {finalApprovalsLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>최종 승인 이력 조회 중...</span>
          </div>
        ) : finalApprovalsError ? (
          <div className="text-sm text-red-400">
            조회 에러: {finalApprovalsError}
          </div>
        ) : !finalApprovals || finalApprovals.length === 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">최종 승인 Artifact가 아직 없습니다.</div>
            <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm text-indigo-200">
              <p className="font-semibold text-indigo-300">최종 승인 생성 준비 상태</p>

              {finalApprovalBlockingReasons.length > 0 ? (
                <div className="mt-2 text-red-300">
                  <p className="mb-1 text-xs">버튼이 비활성화된 사유:</p>
                  <ul className="list-inside list-disc text-sm">
                    {finalApprovalBlockingReasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-emerald-300">
                  모든 조건이 충족되었습니다. 아래 버튼을 눌러 승인 확인 단계를 진행할 수 있습니다.
                  <br />
                  <span className="text-xs text-gray-400">
                    (서버에서 candidate, dryRunItem, 수집 문맥 등을 다시 검증합니다.)
                  </span>
                </p>
              )}

              <div className="mt-4">
                <button
                  type="button"
                  disabled={!canCreateFinalApproval}
                  onClick={() => setIsFinalApprovalModalOpen(true)}
                  className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                    canCreateFinalApproval
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                  }`}
                >
                  {canCreateFinalApproval ? '최종 승인 Artifact 생성 준비' : '최종 승인 Artifact 생성 불가'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          (() => {
            const targetApproval = finalApprovals.find(a => a.status === 'ACTIVE') || finalApprovals[0];
            const isExpired = now === null ? false : new Date(targetApproval.validationExpiresAt).getTime() <= now;
            return (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">상태</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${targetApproval.status === 'ACTIVE' ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300' : 'border-slate-500/30 bg-slate-500/20 text-slate-300'}`}>
                    {targetApproval.status}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">최종 승인 시각</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.finalApprovedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">검증 만료 시각</p>
                  <p className="text-sm text-gray-200">{new Date(targetApproval.validationExpiresAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">만료 여부</p>
                  <span className={`text-sm font-semibold ${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isExpired ? '만료됨' : '유효'}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">승인자</p>
                  <p className="text-sm text-gray-200">{targetApproval.finalApprovedBy}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">대상 item 수</p>
                  <p className="text-sm text-gray-200">{targetApproval.itemCount}개</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <p className="mb-1 text-xs text-gray-500">해시 검증 (요약)</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 mr-2">Payload:</span>
                      <span className="font-mono text-gray-300">{targetApproval.payloadHash.substring(0, 12)}...</span>
                    </div>
                    <div>
                      <span className="text-gray-500 mr-2">Validation:</span>
                      <span className="font-mono text-gray-300">{targetApproval.validationSnapshotHash.substring(0, 12)}...</span>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-4 mt-2">
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <p className="font-semibold text-amber-300">최종 승인 생성 준비 상태</p>

                    {finalApprovalBlockingReasons.length > 0 ? (
                      <div className="mt-2 text-red-300">
                        <p className="mb-1 text-xs">버튼이 비활성화된 사유:</p>
                        <ul className="list-inside list-disc text-sm">
                          {finalApprovalBlockingReasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-emerald-300">
                        모든 조건이 충족되었습니다. 아래 버튼을 눌러 승인 확인 단계를 진행할 수 있습니다.
                      </p>
                    )}

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!canCreateFinalApproval}
                        onClick={() => setIsFinalApprovalModalOpen(true)}
                        className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                          canCreateFinalApproval
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                            : 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                        }`}
                      >
                        {canCreateFinalApproval ? '최종 승인 Artifact 생성 준비' : '최종 승인 Artifact 생성 불가'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* ── Live 단일 테스트 전 점검표 ────────────────────────────────────────── */}
      {job.livePreflight && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            Live 단일 테스트 전 점검표
          </h2>

          <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-200">
            <p>
              현재 화면은 실제 Naver API 호출 전 점검용입니다.
              이 단계에서는 상품 정보가 변경되지 않으며, Live 호출은 Safety Gate에 의해 차단됩니다.
            </p>
          </div>

          {/* 점검 요약 */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 상태</p>
              <p className={`text-xs font-semibold ${job.livePreflight.ready ? 'text-emerald-400' : 'text-red-400'}`}>
                {job.livePreflight.ready ? '점검 조건 충족' : '점검 미완료'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API 호출</p>
              <p className={`text-xs font-semibold ${job.livePreflight.naverApiCalled ? 'text-red-400' : 'text-emerald-400'}`}>
                {job.livePreflight.naverApiCalled ? '호출됨 (확인 필요)' : '아직 호출되지 않음'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live 실행 가능 여부</p>
              <p className="text-xs font-semibold text-red-400">현재는 차단됨</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 현황</p>
              <p className="text-xs">
                <span className={job.livePreflight.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  차단 {job.livePreflight.summary.blockingCount}건
                </span>
                {' · '}
                <span className={job.livePreflight.summary.warningCount > 0 ? 'text-amber-400' : 'text-gray-400'}>
                  확인 {job.livePreflight.summary.warningCount}건
                </span>
                {' · '}
                <span className="text-emerald-400">통과 {job.livePreflight.summary.passCount}건</span>
              </p>
            </div>
          </div>

          {/* 차단 사유 */}
          {job.livePreflight.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                차단 사유 ({job.livePreflight.blockingReasons.length}건)
              </p>
              <ul className="space-y-1">
                {job.livePreflight.blockingReasons.map((reason, idx) => (
                  <li key={idx} className="text-red-200">
                    - {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 항목별 점검 결과 */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">항목별 점검 결과</p>
            {job.livePreflight.checklistItems.map(item => (
              <div
                key={item.key}
                className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                  item.status === 'PASS'
                    ? 'border-emerald-500/20 bg-emerald-500/10'
                    : item.status === 'BLOCKED'
                      ? 'border-red-500/20 bg-red-500/10'
                      : item.status === 'WARN'
                        ? 'border-amber-500/20 bg-amber-500/10'
                        : 'border-blue-500/20 bg-blue-500/10'
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                    item.status === 'PASS'
                      ? 'text-emerald-400'
                      : item.status === 'BLOCKED'
                        ? 'text-red-400'
                        : item.status === 'WARN'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                  }`}
                >
                  {item.status === 'PASS'
                    ? 'PASS'
                    : item.status === 'BLOCKED'
                      ? 'BLOCKED'
                      : item.status === 'WARN'
                        ? 'WARN'
                        : 'REVIEW'}
                </span>
                <div>
                  <p className="font-semibold text-gray-200">{item.label}</p>
                  <p className="text-gray-400">{item.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 다음 단계 안내 */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">다음 단계 안내</p>
            <p>
              Live 단일 테스트는 별도 승인 흐름과 단일 테스트 상품 1건 제한 조건이 준비된
              이후에만 진행할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* ── Live 단일 테스트 승인 준비 ────────────────────────────────────────── */}
      {job.liveSingleTestApproval && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            Live 단일 테스트 승인 준비
          </h2>

          {/* 안내 문구 */}
          <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
            <p className="mb-1 font-semibold text-indigo-300">승인 준비 단계 안내</p>
            <ul className="space-y-0.5">
              <li>이 단계는 실제 Naver API 호출 전 승인 준비 단계입니다.</li>
              <li>현재 승인해도 실제 네이버 상품은 변경되지 않습니다.</li>
              <li>Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.</li>
              <li>운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.</li>
            </ul>
          </div>

          {/* 승인 준비 상태 요약 카드 */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">승인 준비 상태</p>
              <p className={`text-xs font-semibold ${job.liveSingleTestApproval.approvalReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                {job.liveSingleTestApproval.approvalReady ? '준비 완료' : '준비 미완료'}
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Naver API 호출</p>
              <p className="text-xs font-semibold text-red-400">비활성화 (항상 차단)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">Live 실행 가능 여부</p>
              <p className="text-xs font-semibold text-red-400">비활성화 (항상 차단)</p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-1 text-xs text-gray-500">점검 현황</p>
              <p className="text-xs">
                <span className={job.liveSingleTestApproval.summary.blockingCount > 0 ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  차단 {job.liveSingleTestApproval.summary.blockingCount}건
                </span>
                {' · '}
                <span className="text-emerald-400">통과 {job.liveSingleTestApproval.summary.passCount}건</span>
              </p>
            </div>
          </div>

          {/* 대상 정보 카드 */}
          {job.liveSingleTestApproval.targetProductSummary && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3 text-xs">
              <p className="mb-2 font-semibold text-gray-300">대상 item 정보</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {job.liveSingleTestApproval.targetProductSummary.productName && (
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-gray-500">상품명: </span>
                    <span className="text-gray-200">{job.liveSingleTestApproval.targetProductSummary.productName}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.channelProductNo && (
                  <div>
                    <span className="text-gray-500">채널 상품번호: </span>
                    <span className="font-mono text-gray-300">{job.liveSingleTestApproval.targetProductSummary.channelProductNo}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.targetType && (
                  <div>
                    <span className="text-gray-500">대상 유형: </span>
                    <span className="text-gray-300">{job.liveSingleTestApproval.targetProductSummary.targetType}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.changeType && (
                  <div>
                    <span className="text-gray-500">변경 유형: </span>
                    <span className="font-semibold text-emerald-400">{job.liveSingleTestApproval.targetProductSummary.changeType}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.skuCode && (
                  <div>
                    <span className="text-gray-500">SKU: </span>
                    <span className="font-mono text-gray-300">{job.liveSingleTestApproval.targetProductSummary.skuCode}</span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.priceChange && (
                  <div>
                    <span className="text-gray-500">가격 변경 예정: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.before ?? '-')}
                    </span>
                    {' → '}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.priceChange.after ?? '-')}
                    </span>
                  </div>
                )}
                {job.liveSingleTestApproval.targetProductSummary.stockChange && (
                  <div>
                    <span className="text-gray-500">재고 변경 예정: </span>
                    <span className="text-gray-400 line-through">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.before ?? '-')}
                    </span>
                    {' → '}
                    <span className="font-semibold text-white">
                      {String(job.liveSingleTestApproval.targetProductSummary.stockChange.after ?? '-')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 차단 사유 */}
          {job.liveSingleTestApproval.blockingReasons.length > 0 && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
              <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                차단 사유 ({job.liveSingleTestApproval.blockingReasons.length}건)
              </p>
              <ul className="space-y-1">
                {job.liveSingleTestApproval.blockingReasons.map((reason, idx) => (
                  <li key={idx} className="text-red-200">- {reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 항목별 점검 결과 */}
          <div className="mb-4 space-y-1.5">
            <p className="mb-2 text-xs font-semibold text-gray-400">항목별 점검 결과</p>
            {job.liveSingleTestApproval.checklistItems.map(item => (
              <div
                key={item.key}
                className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                  item.status === 'PASS'
                    ? 'border-emerald-500/20 bg-emerald-500/10'
                    : item.status === 'BLOCKED'
                      ? 'border-red-500/20 bg-red-500/10'
                      : item.status === 'WARN'
                        ? 'border-amber-500/20 bg-amber-500/10'
                        : 'border-blue-500/20 bg-blue-500/10'
                }`}
              >
                <span className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                  item.status === 'PASS' ? 'text-emerald-400'
                    : item.status === 'BLOCKED' ? 'text-red-400'
                    : item.status === 'WARN' ? 'text-amber-400'
                    : 'text-blue-400'
                }`}>
                  {item.status === 'PASS' ? 'PASS'
                    : item.status === 'BLOCKED' ? 'BLOCKED'
                    : item.status === 'WARN' ? 'WARN'
                    : 'REVIEW'}
                </span>
                <div>
                  <p className="font-semibold text-gray-200">{item.label}</p>
                  <p className="text-gray-400">{item.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 필수 확인 문구 (requiredAcknowledgements) */}
          {job.liveSingleTestApproval.requiredAcknowledgements.length > 0 && (
            <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
              <p className="mb-2 font-semibold text-amber-300">
                필수 확인 항목 ({job.liveSingleTestApproval.requiredAcknowledgements.length}건 — 실제 Live 테스트 단계 전 확인 필요)
              </p>
              <ul className="space-y-1.5 text-amber-100">
                {job.liveSingleTestApproval.requiredAcknowledgements.map(ack => (
                  <li key={ack} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] text-amber-400">[확인 필요]</span>
                    <span>
                      {ack === 'CONFIRM_SINGLE_ITEM_ONLY' && '실제 Live 테스트는 단일 상품 1건으로만 제한됩니다.'}
                      {ack === 'CONFIRM_TARGET_PRODUCT_REVIEWED' && '대상 상품번호, 스마트스토어, 변경 예정 payload를 직접 확인해야 합니다.'}
                      {ack === 'CONFIRM_PAYLOAD_REVIEWED' && '실제 변경될 가격/재고/키워드 값을 직접 검토했습니다.'}
                      {ack === 'CONFIRM_NAVER_API_STILL_DISABLED' && '운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.'}
                      {ack === 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER' && '실제 Live 테스트 단계에서는 네이버 스마트스토어 상품 정보가 변경될 수 있습니다.'}
                      {ack === 'CONFIRM_NO_REPLAY_ALLOWED' && 'Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live 실행 비활성화 배지 */}
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
              Live 실행 비활성화됨
            </div>
            <div className="inline-flex items-center rounded-md border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-xs text-gray-400">
              승인 준비만 가능 — 실제 Naver API 호출 불가
            </div>
          </div>

          {/* 다음 단계 안내 */}
          <div className="rounded-md border border-gray-500/20 bg-gray-500/5 p-3 text-xs text-gray-400">
            <p className="mb-1 font-semibold text-gray-300">다음 단계 안내</p>
            <p>
              현재 단계에서는 실제 Live 실행이 불가능합니다. 다음 단계에서 별도 승인 흐름과
              단일 테스트 실행 제한을 다시 확인한 뒤 Live Adapter 구현 여부를 결정하세요.
            </p>
          </div>
        </div>
      )}

      {/* ── Live 단일 테스트 승인 기록 저장 ──────────────────────────────────── */}
      {job.liveSingleTestApproval && (() => {
        const guard = job.liveSingleTestApproval!;
        const existingAudit = job.liveSingleTestApprovalAudit ?? null;
        const activeFa = finalApprovals?.find(a => a.status === 'ACTIVE') ?? null;
        const allAcked = LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.every(a =>
          liveAuditCheckedItems.includes(a)
        );
        const canSave =
          !liveAuditSaving &&
          !liveAuditSaveResult &&
          !existingAudit &&
          !!activeFa &&
          guard.summary.blockingCount === 0 &&
          allAcked;

        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-violet-400" />
              Live 단일 테스트 승인 기록 저장
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <p className="mb-1 font-semibold text-violet-300">승인 기록 저장 안내</p>
              <ul className="space-y-0.5">
                <li>이 버튼은 실제 Naver API를 호출하지 않습니다. 승인 기록만 저장합니다.</li>
                <li>승인 기록을 저장해도 실제 Live 실행은 계속 불가능합니다.</li>
                <li>저장된 승인 기록은 감사 추적(audit trail)용으로만 사용됩니다.</li>
                <li>모든 필수 확인 항목에 체크 후 저장 버튼을 클릭하세요.</li>
              </ul>
            </div>

            {/* 이미 저장된 audit record 표시 */}
            {(existingAudit || liveAuditSaveResult) && (
              <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  승인 기록 저장 완료
                </p>
                {(() => {
                  const audit = existingAudit ?? (liveAuditSaveResult ? {
                    auditCode: liveAuditSaveResult.approvalCode,
                    recordedAt: liveAuditSaveResult.recordedAt,
                    acknowledgedItems: liveAuditSaveResult.acknowledgedItems,
                    actorId: 'UI_USER',
                    naverApiCallAllowed: false as false,
                    liveExecutionEnabled: false as false,
                    maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
                  } : null);
                  if (!audit) return null;
                  return (
                    <div className="space-y-1 text-gray-300">
                      <div>
                        <span className="text-gray-500">승인 코드: </span>
                        <span className="font-mono text-xs text-emerald-300">{audit.auditCode}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">기록 시각: </span>
                        <span>{new Date(audit.recordedAt).toLocaleString()}</span>
                      </div>
                      {audit.actorId && (
                        <div>
                          <span className="text-gray-500">승인자: </span>
                          <span className="font-mono">{audit.actorId}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">확인 항목: </span>
                        <span>{audit.acknowledgedItems.length}건 완료</span>
                      </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Naver API 호출 비활성화됨
                        </span>
                        <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          Live 실행 비활성화됨
                        </span>
                        <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                          승인 기록 전용 — 실행 상태 미전환
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-500">
                        이 기록은 Live 단일 테스트 전 확인 항목에 대한 감사 기록입니다. 이 기록만으로 실제 Naver API 호출은 실행되지 않습니다.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 기록이 없을 때 체크박스 + 저장 버튼 표시 */}
            {!existingAudit && !liveAuditSaveResult && (
              <>
                {/* Guard 차단 경고 */}
                {guard.summary.blockingCount > 0 && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                    <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      승인 준비 Guard에서 {guard.summary.blockingCount}건이 차단 중입니다
                    </p>
                    <p className="text-red-200">
                      위의 "Live 단일 테스트 승인 준비" 섹션의 차단 사유를 먼저 해결하세요.
                    </p>
                  </div>
                )}

                {/* 필수 확인 체크박스 */}
                <div className="mb-4 space-y-2">
                  <p className="mb-2 text-xs font-semibold text-gray-300">필수 확인 항목 (전체 체크 필요)</p>
                  {([
                    { key: 'CONFIRM_SINGLE_ITEM_ONLY', label: '실제 Live 테스트는 단일 상품 1건으로만 제한됩니다.' },
                    { key: 'CONFIRM_TARGET_PRODUCT_REVIEWED', label: '대상 상품번호, 스마트스토어, 변경 예정 payload를 직접 확인했습니다.' },
                    { key: 'CONFIRM_PAYLOAD_REVIEWED', label: '실제 변경될 가격/재고/키워드 값을 직접 검토했습니다.' },
                    { key: 'CONFIRM_NAVER_API_STILL_DISABLED', label: '운영 DB / 운영 Redis / 실제 Naver API 호출은 아직 비활성화되어 있습니다.' },
                    { key: 'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER', label: '실제 Live 테스트 단계에서는 네이버 스마트스토어 상품 정보가 변경될 수 있습니다.' },
                    { key: 'CONFIRM_NO_REPLAY_ALLOWED', label: 'Live 실행은 별도 승인과 추가 Safety Gate가 준비된 이후에만 진행합니다.' },
                  ] as const).map(({ key, label }) => {
                    const checked = liveAuditCheckedItems.includes(key);
                    return (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-2.5 text-xs transition-colors ${
                          checked
                            ? 'border-violet-500/30 bg-violet-500/10'
                            : 'border-[#262629] bg-[#18181b] hover:border-violet-500/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 shrink-0 accent-violet-500"
                          checked={checked}
                          onChange={() => handleToggleLiveAuditItem(key)}
                        />
                        <span className={checked ? 'text-violet-200' : 'text-gray-400'}>
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* 체크 현황 */}
                <div className="mb-4 flex items-center gap-2 text-xs">
                  <span className={liveAuditCheckedItems.length >= 6 ? 'text-violet-300 font-semibold' : 'text-gray-500'}>
                    {liveAuditCheckedItems.length} / {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length} 항목 확인됨
                  </span>
                  {!allAcked && (
                    <span className="text-amber-400">— 모든 항목을 체크해야 저장 가능합니다.</span>
                  )}
                </div>

                {/* 저장 오류 */}
                {liveAuditSaveError && (
                  <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                    <span className="font-semibold">오류: </span>{liveAuditSaveError}
                  </div>
                )}

                {/* 저장 버튼 */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleSaveLiveAudit}
                    disabled={!canSave}
                    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                      canSave
                        ? 'border-violet-500/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30'
                        : 'cursor-not-allowed border-gray-700 bg-gray-800 text-gray-600'
                    }`}
                  >
                    {liveAuditSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                    승인 기록 저장 (실제 Naver API 미호출)
                  </button>
                  <span className="text-xs text-gray-500">
                    이 버튼은 승인 기록만 저장합니다 — 실제 네이버 스마트스토어 상품은 변경되지 않습니다.
                  </span>
                </div>

                {/* 비활성 이유 */}
                {!canSave && !liveAuditSaving && (
                  <div className="mt-3 text-xs text-gray-600">
                    {!activeFa && <div>• ACTIVE Final Approval이 없습니다.</div>}
                    {guard.summary.blockingCount > 0 && (
                      <div>• 승인 준비 Guard에서 {guard.summary.blockingCount}건이 차단 중입니다.</div>
                    )}
                    {!allAcked && <div>• 필수 확인 항목 {LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.length - liveAuditCheckedItems.filter(a => LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS.includes(a as typeof LIVE_AUDIT_REQUIRED_ACKNOWLEDGEMENTS[number])).length}개가 미확인 상태입니다.</div>}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })()}

      {/* ── 환경 / DB 안전 확인 ─────────────────────────────────────────────── */}
      {job.environmentSafety && (() => {
        const env = job.environmentSafety!;
        const dbEnvColor: Record<string, string> = {
          local: 'text-emerald-400',
          test: 'text-teal-400',
          unknown: 'text-amber-400',
          operating_blocked: 'text-red-400',
        };
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-cyan-400" />
              Live 실행 전 환경 안전 점검
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                env.allowed
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/30 bg-red-500/10 text-red-300'
              }`}>
                {env.allowed ? '안전 조건 충족' : '차단 항목 있음'}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-200">
              <p className="mb-1 font-semibold text-cyan-300">환경 점검 안내</p>
              <p className="mb-1">현재 화면은 Live 실행 전 환경 안전 점검용입니다. 이 단계에서는 실제 Naver API 호출, Queue enqueue, Worker 실행, 운영 DB write가 모두 비활성화되어야 합니다.</p>
              <p className="text-cyan-300/70">환경 정보는 보안상 원문 URL이나 secret을 표시하지 않고 안전한 분류값만 표시합니다.</p>
            </div>

            {/* 환경 상태 요약 */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">DB 환경</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.databaseEnvironment] ?? 'text-gray-300'}`}>
                  {env.databaseEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">Redis 환경</p>
                <p className={`font-semibold font-mono ${dbEnvColor[env.redisEnvironment] ?? 'text-gray-300'}`}>
                  {env.redisEnvironment}
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">차단 항목</p>
                <p className={`font-semibold ${env.blockingReasons.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {env.blockingReasons.length}건
                </p>
              </div>
              <div className="rounded-md border border-[#262629] bg-[#18181b] p-2.5 text-center text-xs">
                <p className="mb-1 text-gray-500">경고 항목</p>
                <p className={`font-semibold ${env.warnings.length > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                  {env.warnings.length}건
                </p>
              </div>
            </div>

            {/* 항상 false 강제 배지 */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API 호출 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> 운영 DB write 차단
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret 비노출
              </div>
            </div>

            {/* 차단 사유 */}
            {env.blockingReasons.length > 0 && (
              <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  차단 사유 ({env.blockingReasons.length}건)
                </p>
                <ul className="space-y-1">
                  {env.blockingReasons.map((reason, idx) => (
                    <li key={idx} className="text-red-200">- {reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경고 */}
            {env.warnings.length > 0 && (
              <div className="mb-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs">
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({env.warnings.length}건)
                </p>
                <ul className="space-y-1">
                  {env.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 체크리스트 */}
            <div className="space-y-1.5">
              <p className="mb-2 text-xs font-semibold text-gray-400">환경 안전 체크리스트</p>
              {env.checklistItems.map(item => (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 rounded-md border p-2 text-xs ${
                    item.status === 'PASS'
                      ? 'border-emerald-500/20 bg-emerald-500/10'
                      : item.status === 'BLOCKED'
                        ? 'border-red-500/20 bg-red-500/10'
                        : item.status === 'WARN'
                          ? 'border-amber-500/20 bg-amber-500/10'
                          : 'border-blue-500/20 bg-blue-500/10'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 font-mono text-[9px] font-bold leading-4 ${
                    item.status === 'PASS' ? 'text-emerald-400'
                      : item.status === 'BLOCKED' ? 'text-red-400'
                      : item.status === 'WARN' ? 'text-amber-400'
                      : 'text-blue-400'
                  }`}>
                    {item.status === 'PASS' ? 'PASS'
                      : item.status === 'BLOCKED' ? 'BLOCKED'
                      : item.status === 'WARN' ? 'WARN'
                      : 'REVIEW'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-200">{item.label}</p>
                    <p className="text-gray-400">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 환경 코드 */}
            <div className="mt-3 rounded-md border border-gray-500/20 bg-gray-500/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">환경 코드: </span>
              <span className="font-mono text-gray-300">{env.environmentCode}</span>
              <span className="mx-2 text-gray-600">|</span>
              <span>{env.environmentMessage}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Live 단일 테스트 승인 감사 이력 ─────────────────────────────────── */}
      {job.liveSingleTestAuditHistory && (() => {
        const hist = job.liveSingleTestAuditHistory!;
        const latest = hist.latestAudit;
        return (
          <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
              <FileJson className="h-5 w-5 text-indigo-400" />
              Live 단일 테스트 승인 감사 이력
              <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                hist.exists
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                  : 'border-gray-600/30 bg-gray-600/10 text-gray-500'
              }`}>
                {hist.exists ? `기록 ${hist.summary.totalRecords}건` : '기록 없음'}
              </span>
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200">
              <p className="mb-1">이 감사 기록은 승인 확인 이력일 뿐이며 실제 Naver API 호출을 실행하지 않습니다.</p>
              <p className="text-indigo-300/70">Live 실행은 별도 단계에서 추가 Safety Gate와 명시 승인 후에만 검토합니다.</p>
            </div>

            {/* 안전 상태 배지 */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Naver API 호출 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Live 실행 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> 운영 DB write 차단
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Queue 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                <X className="mr-1 h-3 w-3" /> Worker 비활성화
              </div>
              <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Secret 비노출 (조회 전용)
              </div>
            </div>

            {/* 기록 없음 */}
            {!hist.exists && (
              <div className="rounded-md border border-gray-600/20 bg-gray-600/5 p-3 text-xs text-gray-400">
                <p className="font-semibold text-gray-300">승인 감사 기록이 없습니다.</p>
                <p className="mt-1">Live 단일 테스트 승인 기록 저장 섹션에서 먼저 필수 확인 항목을 체크하고 기록을 저장하세요.</p>
              </div>
            )}

            {/* 최신 감사 기록 */}
            {latest && (
              <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs">
                <p className="mb-3 text-xs font-semibold text-indigo-300">최신 감사 기록</p>

                {/* 기본 정보 */}
                <div className="mb-3 grid grid-cols-1 gap-y-1.5 sm:grid-cols-2">
                  <div>
                    <span className="text-gray-500">승인 코드: </span>
                    <span className="font-mono text-indigo-300">{latest.auditCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">상태: </span>
                    <span className={`font-semibold ${
                      latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? 'text-emerald-400'
                        : 'text-gray-400'
                    }`}>
                      {latest.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                        ? '기록 완료 (실행 불가)'
                        : latest.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">기록 시각: </span>
                    <span className="text-gray-200">
                      {latest.recordedAt ? new Date(latest.recordedAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">승인자: </span>
                    <span className="font-mono text-gray-200">{latest.actorId ?? '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">BatchJob ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.batchJobId ? `${latest.batchJobId.substring(0, 16)}…` : '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">FinalApproval ID: </span>
                    <span className="font-mono text-gray-400">
                      {latest.finalApprovalId
                        ? `${latest.finalApprovalId.substring(0, 16)}…`
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* 대상 상품 정보 */}
                {latest.targetProductSummary && (
                  <div className="mb-3 rounded-md border border-gray-600/20 bg-gray-600/5 p-2.5">
                    <p className="mb-1.5 text-[10px] font-semibold text-gray-400">대상 상품 정보</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {Object.entries(latest.targetProductSummary).map(([k, v]) =>
                        v !== null && v !== undefined ? (
                          <div key={k}>
                            <span className="text-gray-500">{k}: </span>
                            <span className="text-gray-200">{String(v)}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* acknowledgement 목록 */}
                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] font-semibold text-gray-400">
                    확인 항목 ({latest.acknowledgedItems.length}건 완료
                    {latest.missingAcknowledgements.length > 0
                      ? ` / ${latest.missingAcknowledgements.length}건 누락`
                      : ''})
                  </p>
                  <ul className="space-y-1">
                    {latest.acknowledgedItems.map(ack => (
                      <li key={ack} className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        <span className="font-mono text-[10px]">{ack}</span>
                      </li>
                    ))}
                    {latest.missingAcknowledgements.map(ack => (
                      <li key={ack} className="flex items-center gap-1.5 text-amber-400">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span className="font-mono text-[10px]">{ack} (누락)</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 실행 불가 배지 */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                    naverApiCallAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                    liveExecutionEnabled: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    operatingDbWriteAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    queueAllowed: false
                  </span>
                  <span className="inline-flex items-center rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[10px] text-gray-400">
                    workerAllowed: false
                  </span>
                </div>
              </div>
            )}

            {/* 경고 */}
            {hist.warnings.length > 0 && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs">
                <p className="mb-1 flex items-center gap-1 font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  경고 ({hist.warnings.length}건)
                </p>
                <ul className="space-y-0.5">
                  {hist.warnings.map((w, idx) => (
                    <li key={idx} className="text-amber-200">- {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* maxAllowedState */}
            <div className="mt-3 rounded-md border border-gray-600/20 bg-gray-600/5 p-2 text-xs text-gray-400">
              <span className="text-gray-500">최대 허용 상태: </span>
              <span className="font-mono text-gray-300">{hist.maxAllowedState}</span>
            </div>

            {/* 전체 감사 기록 대시보드 링크 */}
            <div className="mt-3 flex items-center justify-end">
              <Link
                href="/dashboard/sku-keyword-final-approval-live-audits"
                className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20"
              >
                <FileJson className="h-3.5 w-3.5" />
                전체 감사 기록 대시보드 →
              </Link>
            </div>
          </div>
        );
      })()}

      {/* ── BatchJob 실행 결과 ────────────────────────────────────────────────── */}
      {['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'EXECUTING'].includes(job.status) && (
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <CheckCircle2 className={`h-5 w-5 ${job.status === 'FAILED' ? 'text-red-400' : job.status === 'PARTIAL_SUCCESS' ? 'text-orange-400' : 'text-emerald-400'}`} />
            BatchJob 실행 결과
            <span className={`ml-1 rounded-full border px-2 py-0.5 text-xs ${getStatusBadgeStyle(job.status)}`}>
              {job.status}
            </span>
          </h2>

          {/* 실행 감사 정보 (Audit Trail) */}
          {(() => {
            const execMode = job.executionMetadata?.executionMode ?? null;
            const naverApiCalled = execMode === 'live';
            return (
              <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-200">
                <p className="mb-2 font-semibold text-blue-300">실행 감사 정보 (Audit Trail)</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                  <div>
                    <span className="text-blue-400">BatchJob ID: </span>
                    <span className="font-mono text-blue-100">{job.id.substring(0, 12)}…</span>
                  </div>
                  {job.executionMetadata?.finalApprovalId && (
                    <div>
                      <span className="text-blue-400">FinalApproval ID: </span>
                      <span className="font-mono text-blue-100">
                        {job.executionMetadata.finalApprovalId.substring(0, 12)}…
                      </span>
                    </div>
                  )}
                  {job.executionMetadata?.actorId && (
                    <div>
                      <span className="text-blue-400">Actor ID: </span>
                      <span className="font-mono text-blue-100">{job.executionMetadata.actorId}</span>
                    </div>
                  )}
                  {execMode && (
                    <div>
                      <span className="text-blue-400">실행 모드 (adapterMode): </span>
                      <span className="font-mono text-blue-100">{execMode}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-blue-400">Naver API 호출: </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '예 (실제 호출)' : '아니오 (차단됨)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">스마트스토어 변경: </span>
                    <span className={`font-semibold ${naverApiCalled ? 'text-red-300' : 'text-emerald-300'}`}>
                      {naverApiCalled ? '예 (실제 변경)' : '아니오'}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-400">전체 항목 (totalItems): </span>
                    <span className="text-blue-100">{job.itemCount}건</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 기본 실행 정보 */}
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="mb-1 text-xs text-gray-500">실행 완료 시각 (executedAt)</p>
              <p className="text-sm text-gray-200">
                {job.executedAt ? new Date(job.executedAt).toLocaleString() : '-'}
              </p>
            </div>
            {job.executionMetadata?.startedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">실행 시작 (startedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.startedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.endedAt && (
              <div>
                <p className="mb-1 text-xs text-gray-500">실행 종료 (finishedAt)</p>
                <p className="text-sm text-gray-300">{new Date(job.executionMetadata.endedAt).toLocaleString()}</p>
              </div>
            )}
            {job.executionMetadata?.durationMs !== undefined && (
              <div>
                <p className="mb-1 text-xs text-gray-500">처리 시간</p>
                <p className="text-sm text-gray-300">{job.executionMetadata.durationMs}ms</p>
              </div>
            )}
          </div>

          {/* 성공/실패/스킵 카운트 */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">{job.successItems}</p>
              <p className="text-xs text-gray-400">성공</p>
            </div>
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-red-400">{job.failedItems}</p>
              <p className="text-xs text-gray-400">실패</p>
            </div>
            <div className="rounded-md border border-gray-500/20 bg-gray-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-gray-400">{job.skippedItems}</p>
              <p className="text-xs text-gray-400">스킵</p>
            </div>
          </div>

          {/* 항목별 상태 분포 */}
          {job.items.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-gray-400">항목별 상태 분포</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  job.items.reduce<Record<string, number>>((acc, item) => {
                    acc[item.status] = (acc[item.status] ?? 0) + 1;
                    return acc;
                  }, {})
                ).map(([st, count]) => (
                  <span key={st} className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(st)}`}>
                    {st}: {count}건
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 실행 메타데이터 (recordedAt 중심) */}
          {job.executionMetadata && (
            <div className="mb-4 rounded-md border border-[#262629] bg-[#18181b] p-3">
              <p className="mb-2 text-xs font-semibold text-gray-400">실행 메타데이터 (결과 기록)</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                {job.executionMetadata.recordedAt && (
                  <div>
                    <span className="text-gray-500">기록 시각 (recordedAt): </span>
                    <span className="text-gray-300">{new Date(job.executionMetadata.recordedAt).toLocaleString()}</span>
                  </div>
                )}
                {job.executionMetadata.resultSummary && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">결과 집계 (resultSummary): </span>
                    <span className="text-gray-300">
                      성공 {job.executionMetadata.resultSummary.successCount} /
                      실패 {job.executionMetadata.resultSummary.failedCount} /
                      스킵 {job.executionMetadata.resultSummary.skippedCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 재실행 차단 요약 (실행 결과 섹션 하단) */}
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-red-300">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              재실행 차단 — 이미 실행 기록이 있는 BatchJob입니다
            </p>
            <p>안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다. Mock 실행 결과라도 재실행은 기본 차단입니다.</p>
            <p className="mt-1 font-mono text-red-300">
              서버 차단 코드: BATCH_JOB_ALREADY_EXECUTED / BATCH_JOB_ALREADY_EXECUTING
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">항목 목록 ({job.items.length}건)</h2>
        {job.items.map((item, index) => (
          <div key={item.id} className="overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
            <div className="border-b border-[#262629] bg-[#18181b] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
                  <span className="rounded border border-indigo-500/30 bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                    {item.targetType}
                  </span>
                  <span className="text-sm font-mono text-gray-300">{item.targetId}</span>
                  <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(item.status)}`}>
                    {item.status}
                  </span>
                  {item.calculationType && (
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
                      {item.calculationType}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                >
                  <FileJson className="h-3.5 w-3.5" />
                  {expandedItems.has(item.id) ? 'JSON 닫기' : 'JSON 보기'}
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">상품 정보 (Candidate)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">상품명</span>
                  <span className="col-span-2 text-gray-200">{item.candidateSummary?.productName || '-'}</span>
                  <span className="text-gray-500">매칭 키워드</span>
                  <span className="col-span-2 font-semibold text-indigo-300">{item.candidateSummary?.keyword || '-'}</span>
                  <span className="text-gray-500">SKU/식별자</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.sku || '-'}</span>
                  <span className="text-gray-500">바코드</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.barcode || '-'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="border-b border-[#262629] pb-1 text-sm font-semibold text-gray-300">변경 예정 (Dry-run)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">변경 항목</span>
                  <span className="col-span-2 font-semibold text-emerald-400">{item.candidateSummary?.changeType || '-'}</span>
                  <span className="text-gray-500">가격 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="text-gray-500 line-through">{item.dryRunSummary?.before?.price?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.price?.toLocaleString() || '-'}</span>
                  </span>
                  <span className="text-gray-500">재고 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="text-gray-500 line-through">{item.dryRunSummary?.before?.stock?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.stock?.toLocaleString() || '-'}</span>
                  </span>
                </div>
              </div>
            </div>

            {((item.dryRunSummary?.warnings?.length ?? 0) > 0
              || item.dryRunSummary?.riskLevel
              || (item.dryRunSummary?.blockedReasons?.length ?? 0) > 0) && (
              <div className="px-4 pb-4">
                <div className="rounded-md bg-[#1e1e24] p-3 text-sm">
                  <div className="flex gap-2">
                    <span className="font-semibold text-amber-400">Risk Level: {item.dryRunSummary?.riskLevel || 'NONE'}</span>
                  </div>
                  {item.dryRunSummary?.warnings?.map((warning) => (
                    <div key={warning} className="mt-1 text-xs text-amber-200/80">• {warning}</div>
                  ))}
                  {item.dryRunSummary?.blockedReasons?.map((blockedReason) => (
                    <div key={blockedReason} className="mt-1 text-xs text-red-400">• BLOCKED: {blockedReason}</div>
                  ))}
                </div>
              </div>
            )}

            {expandedItems.has(item.id) && (
              <div className="overflow-x-auto border-t border-[#262629] bg-black/50 p-4">
                <p className="mb-2 text-xs text-gray-500">requestPayload (Raw JSON)</p>
                <pre className="font-mono text-[10px] text-green-400 sm:text-xs">
                  {JSON.stringify(item.requestPayload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {isFinalApprovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg rounded-xl border border-[#262629] bg-[#121214] p-6 shadow-2xl">
            <button
              onClick={() => setIsFinalApprovalModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-4 text-xl font-semibold text-white">최종 승인 Artifact 생성 전 확인</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                이 단계는 안전한 승인을 위해 다음 제약 사항을 준수합니다.
              </p>
              <ul className="list-inside list-disc space-y-1 text-red-300">
                <li>이 작업은 네이버 API를 호출하지 않습니다.</li>
                <li>이 작업은 EXECUTING으로 전환하지 않습니다.</li>
                <li>이 작업은 Job/Item status를 변경하지 않습니다.</li>
                <li>이 작업은 FinalApproval artifact만 생성하는 단계입니다.</li>
                <li>기존 ACTIVE artifact가 있으면 생성할 수 없습니다.</li>
                <li>validationExpiresAt 이후에는 실행 자격으로 사용하면 안 됩니다.</li>
              </ul>
              <p className="mt-4 text-indigo-300">
                서버에서 <span className="font-mono">candidate</span>, <span className="font-mono">dryRunItem</span>, 수집 문맥, gate 설정을 다시 검증합니다.
              </p>

              {finalApprovalCreateError && (
                <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                  <span className="font-semibold text-red-300">오류 발생: </span>
                  {finalApprovalCreateError}
                </div>
              )}
            </div>
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#262629] pt-4">
              <button
                type="button"
                onClick={() => setIsFinalApprovalModalOpen(false)}
                disabled={isCreatingFinalApproval}
                className="rounded-md px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-[#262629] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => void handleCreateFinalApproval()}
                disabled={!canCreateFinalApproval || isCreatingFinalApproval}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  !canCreateFinalApproval || isCreatingFinalApproval
                    ? 'bg-slate-700 text-slate-300 opacity-70 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {isCreatingFinalApproval ? (
                  <>
                    <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  '최종 승인 Artifact 생성'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
