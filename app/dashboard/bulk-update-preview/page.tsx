'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CircleOff,
  Loader2,
  PackageCheck,
  RefreshCw,
  ShieldAlert,
  ShoppingCart,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import type {
  BulkUpdateDraftBatchResponse,
  BulkUpdatePreviewCandidate,
  BulkUpdatePreviewCandidatesResponse,
  BulkUpdatePreviewFilter,
  BulkUpdatePreviewSummaryResponse,
} from '@/src/types/bulk-update-preview.types';
import type {
  DraftAppliedBulkUpdateCandidate,
  DraftAppliedStagingMappingCandidate,
  MappingResolutionDraftLoadResult,
} from '@/src/types/mapping-resolution-draft.types';
import type { StagingMappingCandidatesResponse } from '@/src/types/staging-mapping-preview.types';
import {
  applyDraftToBulkUpdateCandidates,
  applyDraftToStagingMappingCandidates,
  buildDraftAppliedBulkUpdateSummary,
  buildDraftPreviewSummary,
  buildMappingResolutionSnapshotMetadata,
  readMappingResolutionDraftFromStorage,
} from '@/src/utils/mapping-resolution-draft';
import {
  getPaginationRange,
  getRowNumber,
} from '@/src/utils/pagination';
import { useConfiguredPageSize } from '@/src/hooks/useConfiguredPageSize';

const FILTERS: { value: BulkUpdatePreviewFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'SAFE', label: '안전 후보' },
  { value: 'RISK', label: '위험 후보' },
  { value: 'EXCLUDED', label: '실행 제외' },
  { value: 'PRICE', label: '가격 수정' },
  { value: 'STOCK', label: '재고 수정' },
  { value: 'PRICE_AND_STOCK', label: '가격+재고 수정' },
  { value: 'SET', label: '세트상품' },
  { value: 'SINGLE', label: '단품' },
  { value: 'PRODUCT', label: 'PRODUCT' },
  { value: 'OPTION', label: 'OPTION' },
  { value: 'ADDITIONAL', label: 'ADDITIONAL' },
  { value: 'BUNDLE', label: 'BUNDLE' },
];

const FILE_TYPE_LABELS: Record<string, string> = {
  ERP_STOCK: 'ERP 재고',
  SMARTSTORE_PRODUCT: '스마트스토어 상품',
  SKU_MAPPING: '기존 SKU 매핑',
  PRODUCT_VARIANT_KEYWORD: 'ProductVariantKeyword',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(value: unknown, fallback: string): string {
  return isRecord(value) && typeof value.error === 'string' ? value.error : fallback;
}

async function readJson<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

async function requestSummary(): Promise<BulkUpdatePreviewSummaryResponse> {
  const response = await fetch('/api/bulk-update-preview/summary', { cache: 'no-store' });
  const data = await readJson<BulkUpdatePreviewSummaryResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, '가격/재고 수정 Preview 요약 조회에 실패했습니다.'));
  return data as BulkUpdatePreviewSummaryResponse;
}

async function requestAllBulkCandidates(signal: AbortSignal): Promise<BulkUpdatePreviewCandidatesResponse> {
  const params = new URLSearchParams({
    filter: 'ALL',
    page: '1',
    pageSize: 'ALL',
  });
  const response = await fetch(`/api/bulk-update-preview/candidates?${params}`, {
    cache: 'no-store',
    signal,
  });
  const data = await readJson<BulkUpdatePreviewCandidatesResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, '가격/재고 수정 Preview 후보 조회에 실패했습니다.'));
  return data as BulkUpdatePreviewCandidatesResponse;
}

async function requestAllMappingCandidates(signal: AbortSignal): Promise<StagingMappingCandidatesResponse> {
  const params = new URLSearchParams({
    filter: 'ALL',
    page: '1',
    pageSize: 'ALL',
  });
  const response = await fetch(`/api/staging-mapping-preview/candidates?${params}`, {
    cache: 'no-store',
    signal,
  });
  const data = await readJson<StagingMappingCandidatesResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, '전체 매핑 후보 조회에 실패했습니다.'));
  return data as StagingMappingCandidatesResponse;
}

async function requestDraftBatch(candidateIds: string[]): Promise<BulkUpdateDraftBatchResponse> {
  const response = await fetch('/api/bulk-update-preview/draft-batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateIds }),
  });
  const data = await readJson<BulkUpdateDraftBatchResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, 'draft batch 생성에 실패했습니다.'));
  return data as BulkUpdateDraftBatchResponse;
}

function formatDate(value: string | null): string {
  if (!value) return '-';
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

function formatMoney(value: number | null): string {
  return value === null ? '-' : `${value.toLocaleString('ko-KR')}원`;
}

function formatNumber(value: number | null, suffix = ''): string {
  return value === null ? '-' : `${value.toLocaleString('ko-KR')}${suffix}`;
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: 'emerald' | 'rose' | 'amber' | 'cyan' | 'violet' | 'indigo';
}) {
  const colors = {
    emerald: 'border-emerald-500/20 text-emerald-300',
    rose: 'border-rose-500/20 text-rose-300',
    amber: 'border-amber-500/20 text-amber-300',
    cyan: 'border-cyan-500/20 text-cyan-300',
    violet: 'border-violet-500/20 text-violet-300',
    indigo: 'border-indigo-500/20 text-indigo-300',
  } as const;

  return (
    <div className={`rounded-lg border bg-[#0c0c0e] p-4 ${colors[accent]}`}>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value.toLocaleString()}</p>
    </div>
  );
}

function CandidateStatusBadge({ status }: { status: BulkUpdatePreviewCandidate['status'] }) {
  const styles = status === 'SAFE'
    ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
    : status === 'RISK'
      ? 'bg-rose-500/10 text-rose-300 ring-rose-500/20'
      : 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20';
  const label = status === 'SAFE' ? '안전' : status === 'RISK' ? '위험' : '실행 제외';
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${styles}`}>{label}</span>;
}

function TypeBadge({ type }: { type: BulkUpdatePreviewCandidate['candidateType'] }) {
  const styles = type === 'PRODUCT'
    ? 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20'
    : type === 'OPTION'
      ? 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/20'
      : type === 'ADDITIONAL'
        ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
        : 'bg-violet-500/10 text-violet-300 ring-violet-500/20';
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${styles}`}>{type}</span>;
}

function SkuChips({ rows }: { rows: BulkUpdatePreviewCandidate['linkedSkus'] }) {
  if (rows.length === 0) return <span className="text-xs text-zinc-600">SKU 없음</span>;
  return (
    <div className="flex min-w-72 flex-wrap gap-1.5">
      {rows.map((sku, index) => (
        <span
          key={`${sku.skuCode}-${sku.quantity}-${index}`}
          className="inline-flex items-center gap-1 rounded-md border border-[#333] bg-[#151519] px-2 py-1 text-[11px] text-zinc-200"
        >
          <span className="font-mono">{sku.skuCode || '미확정'}</span>
          <span className="text-zinc-500">x {sku.quantity}</span>
        </span>
      ))}
    </div>
  );
}

export default function BulkUpdatePreviewPage() {
  const [summary, setSummary] = useState<BulkUpdatePreviewSummaryResponse | null>(null);
  const [allCandidates, setAllCandidates] = useState<BulkUpdatePreviewCandidate[]>([]);
  const [allMappingCandidates, setAllMappingCandidates] = useState<DraftAppliedStagingMappingCandidate[]>([]);
  const [filter, setFilter] = useState<BulkUpdatePreviewFilter>('ALL');
  const { pageSize, setPageSize } = useConfiguredPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [draftPreviewEnabled, setDraftPreviewEnabled] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [lastDraftBatch, setLastDraftBatch] = useState<BulkUpdateDraftBatchResponse | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void requestSummary()
      .then((data) => {
        if (!cancelled) {
          setSummary(data);
          setSummaryError(null);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSummaryError(error instanceof Error ? error.message : '가격/재고 수정 Preview 요약 조회에 실패했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setSummaryLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    void Promise.all([
      requestAllBulkCandidates(controller.signal),
      requestAllMappingCandidates(controller.signal),
    ])
      .then(([bulkData, mappingData]) => {
        if (!cancelled) {
          setAllCandidates(bulkData.rows);
          setAllMappingCandidates(mappingData.rows.map((row) => ({
            ...row,
            draftApplied: false,
            draftStatus: 'NONE',
          })));
          setCandidatesError(null);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled && !(error instanceof DOMException && error.name === 'AbortError')) {
          setCandidatesError(error instanceof Error ? error.message : '가격/재고 수정 Preview 후보 조회에 실패했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setCandidatesLoading(false);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [refreshKey]);

  const currentSnapshotMetadata = useMemo(
    () => (summary ? buildMappingResolutionSnapshotMetadata(summary.snapshot) : null),
    [summary],
  );
  const mappingRowsById = useMemo(
    () => new Map(allMappingCandidates.map((row) => [row.id, row])),
    [allMappingCandidates],
  );

  const draftLoadResult = useMemo<MappingResolutionDraftLoadResult | null>(() => {
    if (!currentSnapshotMetadata) return null;
    return readMappingResolutionDraftFromStorage({
      storage: window.localStorage,
      currentSnapshot: currentSnapshotMetadata,
      rowsById: mappingRowsById,
    });
  }, [currentSnapshotMetadata, mappingRowsById]);

  const draftAppliedMappingRows = useMemo(() => {
    if (!draftPreviewEnabled) return allMappingCandidates;
    return applyDraftToStagingMappingCandidates({
      rows: allMappingCandidates,
      draft: draftLoadResult?.draft ?? null,
      snapshotMatches: draftLoadResult?.exactMatch ?? false,
    });
  }, [allMappingCandidates, draftLoadResult, draftPreviewEnabled]);

  const previewRows = useMemo<DraftAppliedBulkUpdateCandidate[]>(() => {
    if (!draftPreviewEnabled) {
      return allCandidates.map((row) => ({
        ...row,
        draftApplied: false,
        draftStatus: 'NONE',
      }));
    }
    return applyDraftToBulkUpdateCandidates({
      rows: allCandidates,
      mappingRows: draftAppliedMappingRows,
      draft: draftLoadResult?.draft ?? null,
      snapshotMatches: draftLoadResult?.exactMatch ?? false,
    });
  }, [allCandidates, draftAppliedMappingRows, draftLoadResult, draftPreviewEnabled]);

  const effectiveSummary = useMemo(() => {
    if (!summary) return null;
    if (!draftPreviewEnabled) return summary.summary;
    return buildDraftAppliedBulkUpdateSummary(previewRows);
  }, [draftPreviewEnabled, previewRows, summary]);

  const rows = useMemo(() => {
    if (filter === 'ALL') return previewRows;
    if (filter === 'SAFE') return previewRows.filter((row) => row.status === 'SAFE');
    if (filter === 'RISK') return previewRows.filter((row) => row.status === 'RISK');
    if (filter === 'EXCLUDED') return previewRows.filter((row) => row.status === 'EXCLUDED');
    if (filter === 'PRICE') return previewRows.filter((row) => row.hasPriceChange && !row.hasStockChange);
    if (filter === 'STOCK') return previewRows.filter((row) => !row.hasPriceChange && row.hasStockChange);
    if (filter === 'PRICE_AND_STOCK') return previewRows.filter((row) => row.hasPriceChange && row.hasStockChange);
    if (filter === 'SET') return previewRows.filter((row) => row.isSetProduct);
    if (filter === 'SINGLE') return previewRows.filter((row) => !row.isSetProduct);
    return previewRows.filter((row) => row.candidateType === filter);
  }, [filter, previewRows]);

  const executableRows = rows.filter((row) => row.draftCreatable);
  const selectedRows = rows.filter((row) => selectedIds.includes(row.id));
  const selectedApiCallCount = selectedRows.reduce(
    (sum, row) => sum + (row.hasPriceChange ? 1 : 0) + (row.hasStockChange ? 1 : 0),
    0,
  );
  const draftActionsDisabled = submitting
    || !summary
    || draftPreviewEnabled
    || !summary.snapshot.hasRequiredBulkData
    || !summary.snapshot.hasCandidateRows
    || summary.summary.draftBatchCreatableCount === 0;
  const safeCurrentPage = useMemo(() => {
    if (pageSize === 'ALL') return 1;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    return Math.min(currentPage, totalPages);
  }, [currentPage, pageSize, rows.length]);
  const paginatedRows = useMemo(() => {
    if (pageSize === 'ALL') return rows;
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return rows.slice(startIndex, startIndex + pageSize);
  }, [pageSize, rows, safeCurrentPage]);
  const pagination = useMemo(() => getPaginationRange(
    rows.length,
    pageSize,
    safeCurrentPage,
  ), [pageSize, rows.length, safeCurrentPage]);
  const draftSummary = useMemo(() => {
    if (!summary || !draftPreviewEnabled || !effectiveSummary) return null;
    return buildDraftPreviewSummary({
      baseRiskCount: summary.summary.riskCandidateCount,
      draftRiskCount: effectiveSummary.riskCandidateCount,
      rows: previewRows,
    });
  }, [draftPreviewEnabled, effectiveSummary, previewRows, summary]);

  const refresh = () => {
    setSummaryLoading(true);
    setCandidatesLoading(true);
    setSummaryError(null);
    setCandidatesError(null);
    setSubmitMessage(null);
    setSelectedIds([]);
    setRefreshKey((value) => value + 1);
  };

  const toggleRow = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const selectExecutableRows = () => {
    setSelectedIds(executableRows.map((row) => row.id));
  };

  const submitDraftBatch = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(
      `실제 네이버 API는 호출하지 않고 DRAFT batch만 생성합니다. 진행하시겠습니까?\n선택 후보 ${selectedIds.length}건 / 예상 API 호출 ${selectedApiCallCount}건`,
    );
    if (!confirmed) return;

    setSubmitting(true);
    setSubmitMessage(null);
    try {
      const result = await requestDraftBatch(selectedIds);
      setLastDraftBatch(result);
      setSubmitMessage(
        `Draft batch 생성 완료: BatchJob ${result.batchJobId}, 상태 ${result.status}, 전체 ${result.totalItems}건, 성공 ${result.successItems}건, 실패 ${result.failedItems}건, 스킵 ${result.skippedItems}건, 실제 API 호출 false`,
      );
      refresh();
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : 'draft batch 생성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1900px] space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">가격/재고 수정 Preview</h1>
            <p className="mt-2 text-sm text-zinc-400">staging 전체 매핑 결과를 기준으로 실제 네이버 호출 전 draft batch만 생성합니다.</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={summaryLoading || candidatesLoading || submitting}
            className="tms-control inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] bg-[#121214] text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${summaryLoading || candidatesLoading ? 'animate-spin' : ''}`} />
            Preview 새로고침
          </button>
        </header>

        {(summaryError || candidatesError) && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{summaryError || candidatesError}</span>
          </div>
        )}

        {submitMessage && (
          <div className={`rounded-lg px-4 py-3 text-sm ${
            submitMessage.includes('완료')
              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
              : 'border border-rose-500/20 bg-rose-500/10 text-rose-300'
          }`}>
            {submitMessage}
          </div>
        )}

        {lastDraftBatch && (
          <div className="grid gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 md:grid-cols-2 xl:grid-cols-6">
            <div><p className="text-xs text-emerald-400/70">BatchJob ID</p><p className="mt-1 break-all font-mono text-xs text-emerald-200">{lastDraftBatch.batchJobId}</p></div>
            <div><p className="text-xs text-emerald-400/70">상태</p><p className="mt-1 text-sm font-semibold text-emerald-200">{lastDraftBatch.status}</p></div>
            <div><p className="text-xs text-emerald-400/70">전체 item 수</p><p className="mt-1 text-sm font-semibold text-emerald-200">{lastDraftBatch.totalItems.toLocaleString()}건</p></div>
            <div><p className="text-xs text-emerald-400/70">성공 / 실패 / 스킵</p><p className="mt-1 text-sm font-semibold text-emerald-200">{lastDraftBatch.successItems} / {lastDraftBatch.failedItems} / {lastDraftBatch.skippedItems}</p></div>
            <div><p className="text-xs text-emerald-400/70">예상 API 호출</p><p className="mt-1 text-sm font-semibold text-emerald-200">{lastDraftBatch.expectedApiCallCount.toLocaleString()}건</p></div>
            <div><p className="text-xs text-emerald-400/70">실제 API 호출 여부</p><p className="mt-1 text-sm font-semibold text-emerald-200">{String(lastDraftBatch.actualApiCalled)}</p></div>
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">Preview 요약</h2>
            {summaryLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
          </div>
          {summary && (
            <>
              {/* 집계 기준 설명 배너 */}
              <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300">
                💡 <strong>집계 기준 설명:</strong> 원본 후보에서 동일 상품/옵션 중복을 제거한 뒤 ProductVariantKeyword 후보를 우선 사용합니다.
              </div>

              <div className="tms-toolbar flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#262629] bg-[#121214] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">해결 draft 반영 Preview</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    ON 상태에서는 localStorage 해결 draft를 반영해 위험 감소와 실행 가능 후보 수를 미리 계산합니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDraftPreviewEnabled((value) => !value);
                    setCurrentPage(1);
                    setSelectedIds([]);
                  }}
                  className={`tms-control inline-flex items-center gap-2 rounded-full border text-xs font-semibold transition ${
                    draftPreviewEnabled
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-[#333] bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>{draftPreviewEnabled ? 'ON' : 'OFF'}</span>
                  <span>{draftPreviewEnabled ? 'Draft 반영 중' : '기존 staging 기준'}</span>
                </button>
              </div>

              {draftPreviewEnabled && draftLoadResult?.snapshotMismatch && (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                  현재 staging snapshot과 해결 draft 기준이 다릅니다. draft를 적용하면 결과가 정확하지 않을 수 있습니다.
                </div>
              )}

              {draftPreviewEnabled && draftSummary && (
                <div className="grid gap-3 md:grid-cols-5">
                  <SummaryCard label="draft 적용 전 위험 후보 수" value={draftSummary.baseRiskCount} accent="rose" />
                  <SummaryCard label="draft 적용 후 위험 후보 수" value={draftSummary.draftRiskCount} accent="emerald" />
                  <SummaryCard label="감소한 위험 후보 수" value={draftSummary.reducedRiskCount} accent="indigo" />
                  <SummaryCard label="draft 적용 후보 수" value={draftSummary.draftAppliedCount} accent="cyan" />
                  <SummaryCard label="draft 적용 후 실행 가능 후보 수" value={draftSummary.draftExecutableCount} accent="violet" />
                </div>
              )}

              {/* 실행 가능 후보 0건 안내 배너 */}
              {(effectiveSummary?.draftBatchCreatableCount ?? summary.summary.draftBatchCreatableCount) === 0 && (
                <div className="flex items-start gap-2.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3.5 text-sm text-rose-300">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">Draft Batch 생성 불가 안내</p>
                    {(effectiveSummary?.mappingSafeCandidateCount ?? summary.summary.mappingSafeCandidateCount) === 0 ? (
                      <p className="mt-1 text-xs text-rose-400/90">현재 모든 후보가 위험 상태이므로 Draft Batch를 생성할 수 없습니다. 먼저 SKU 미확정, 세트 구성 오류, 중복 후보를 정리해야 합니다.</p>
                    ) : (
                      <p className="mt-1 text-xs text-rose-400/90">위험이 없는 후보는 있으나, 현재 가격 또는 재고 변경이 필요한 후보가 없어 Draft Batch를 생성할 수 없습니다.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="tms-panel rounded-lg border border-[#262629] bg-[#0c0c0e]">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">현재 사용 중인 staging snapshot</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      기준일 {formatDate(summary.snapshot.latestAppliedAt)} / 최신 ImportJob 기준
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {summary.snapshot.hasRequiredBulkData ? (
                      <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                        필수 staging 데이터 준비됨
                      </span>
                    ) : (
                      summary.snapshot.missingBulkRequirements.map((fileType) => (
                        <span key={fileType} className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-300">
                          {FILE_TYPE_LABELS[fileType] ?? fileType} 없음
                        </span>
                      ))
                    )}
                    {!summary.snapshot.hasCandidateRows && (
                      <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[11px] text-amber-300">
                        매핑 후보 없음
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-lg border border-[#222] bg-[#111114] p-3">
                    <p className="text-xs font-semibold text-zinc-400">최신 ImportJob ID</p>
                    <div className="mt-2 space-y-2">
                      {Object.entries(summary.snapshot.latestAppliedJobs).length === 0 ? (
                        <p className="text-xs text-zinc-600">APPLIED staging 데이터 없음</p>
                      ) : Object.entries(summary.snapshot.latestAppliedJobs).map(([fileType, job]) => (
                        <div key={fileType} className="flex items-start justify-between gap-3 text-xs">
                          <span className="text-zinc-300">{FILE_TYPE_LABELS[fileType] ?? fileType}</span>
                          <span className="break-all font-mono text-zinc-500">{job?.jobId ?? '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#222] bg-[#111114] p-3">
                    <p className="text-xs font-semibold text-zinc-400">데이터 준비 여부</p>
                    <div className="mt-2 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-zinc-300">ERP 재고</span>
                        <span className={summary.snapshot.latestAppliedJobs.ERP_STOCK ? 'text-emerald-300' : 'text-rose-300'}>
                          {summary.snapshot.latestAppliedJobs.ERP_STOCK ? '있음' : '없음'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-zinc-300">스마트스토어 상품</span>
                        <span className={summary.snapshot.latestAppliedJobs.SMARTSTORE_PRODUCT ? 'text-emerald-300' : 'text-rose-300'}>
                          {summary.snapshot.latestAppliedJobs.SMARTSTORE_PRODUCT ? '있음' : '없음'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-zinc-300">기존 SKU 매핑</span>
                        <span className={summary.snapshot.latestAppliedJobs.SKU_MAPPING ? 'text-emerald-300' : 'text-amber-300'}>
                          {summary.snapshot.latestAppliedJobs.SKU_MAPPING ? '있음' : '없음'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-zinc-300">ProductVariantKeyword</span>
                        <span className={summary.snapshot.latestAppliedJobs.PRODUCT_VARIANT_KEYWORD ? 'text-emerald-300' : 'text-rose-300'}>
                          {summary.snapshot.latestAppliedJobs.PRODUCT_VARIANT_KEYWORD ? '있음' : '없음'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                <SummaryCard label="전체 후보 수 (중복 제거)" value={effectiveSummary?.totalCandidateCount ?? summary.summary.totalCandidateCount} accent="cyan" />
                <SummaryCard label="매핑 기준 안전 후보 수" value={effectiveSummary?.mappingSafeCandidateCount ?? summary.summary.mappingSafeCandidateCount} accent="emerald" />
                <SummaryCard label="가격/재고 수정 대상 후보 수" value={effectiveSummary?.updateTargetCandidateCount ?? summary.summary.updateTargetCandidateCount} accent="indigo" />
                <SummaryCard label="Draft Batch 생성 가능 후보 수" value={effectiveSummary?.draftBatchCreatableCount ?? summary.summary.draftBatchCreatableCount} accent="emerald" />
                <SummaryCard label="실행 제외 후보 수" value={effectiveSummary?.excludedCandidateCount ?? summary.summary.excludedCandidateCount} accent="amber" />
                <SummaryCard label="가격 수정 대상 후보 수" value={effectiveSummary?.priceUpdateCandidateCount ?? summary.summary.priceUpdateCandidateCount} accent="indigo" />
                <SummaryCard label="재고 수정 대상 후보 수" value={effectiveSummary?.stockUpdateCandidateCount ?? summary.summary.stockUpdateCandidateCount} accent="emerald" />
                <SummaryCard label="가격+재고 수정 대상 후보 수" value={effectiveSummary?.priceAndStockUpdateCandidateCount ?? summary.summary.priceAndStockUpdateCandidateCount} accent="violet" />
                <SummaryCard label="단품 후보 수" value={effectiveSummary?.singleCandidateCount ?? summary.summary.singleCandidateCount} accent="cyan" />
                <SummaryCard label="세트상품 후보 수" value={effectiveSummary?.setCandidateCount ?? summary.summary.setCandidateCount} accent="violet" />
                <SummaryCard label="위험 후보 수" value={effectiveSummary?.riskCandidateCount ?? summary.summary.riskCandidateCount} accent="rose" />
                <SummaryCard label="예상 API 호출 건수" value={effectiveSummary?.expectedApiCallCount ?? summary.summary.expectedApiCallCount} accent="indigo" />
              </div>
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-violet-300" />
              <h2 className="text-lg font-semibold text-white">수정 후보 목록</h2>
              {candidatesLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
            </div>
            <PageSizeSelect
              value={pageSize}
              onChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
            />
          </div>

          <div className="tms-panel rounded-lg border border-[#262629] bg-[#0c0c0e]">
            <div className="tms-toolbar flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="tms-toolbar flex flex-wrap gap-2" role="group" aria-label="가격 재고 수정 Preview 후보 필터">
                {FILTERS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setFilter(item.value);
                      setCurrentPage(1);
                      setSelectedIds([]);
                    }}
                    className={`tms-control rounded-lg border text-xs font-semibold transition ${
                      filter === item.value
                        ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-200'
                        : 'border-[#333] bg-[#121214] text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="tms-toolbar flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">
                  선택 {selectedIds.length}건 / 예상 API 호출 {selectedApiCallCount}건
                </span>
                <button
                  type="button"
                  onClick={selectExecutableRows}
                  disabled={executableRows.length === 0 || draftActionsDisabled}
                  className="tms-control rounded-lg border border-[#333] bg-[#121214] text-xs font-semibold text-zinc-300 transition hover:border-emerald-500/50 disabled:opacity-50"
                >
                  현재 페이지 실행 가능 후보 선택
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="tms-control rounded-lg border border-[#333] bg-[#121214] text-xs font-semibold text-zinc-300 transition hover:border-zinc-500"
                >
                  선택 해제
                </button>
                <button
                  type="button"
                  onClick={() => void submitDraftBatch()}
                  disabled={selectedIds.length === 0 || draftActionsDisabled}
                  className="tms-control inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/15 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400 disabled:opacity-50"
                  title={draftPreviewEnabled
                    ? '해결 draft 반영 Preview에서는 Draft Batch를 생성하지 않습니다.'
                    : summary && !summary.snapshot.hasRequiredBulkData
                    ? `부족한 staging 데이터: ${summary.snapshot.missingBulkRequirements.map((fileType) => FILE_TYPE_LABELS[fileType] ?? fileType).join(', ')}`
                    : summary && !summary.snapshot.hasCandidateRows
                      ? '매핑 후보가 없어 draft batch를 생성할 수 없습니다.'
                      : '선택 후보 Draft Batch 생성'}
                >
                  {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  선택 후보 Draft Batch 생성
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={safeCurrentPage}
              totalPages={pageSize === 'ALL' ? 1 : Math.max(1, Math.ceil(rows.length / pageSize))}
              pageSize={pageSize}
              start={pagination.start}
              end={pagination.end}
              totalCount={rows.length}
              onChangePage={(page) => {
                setCurrentPage(page);
                setSelectedIds([]);
              }}
            />
          </div>

          <div className="max-h-[70vh] overflow-auto rounded-lg border border-[#262629] bg-[#09090b]">
            <table className="tms-table min-w-[3200px] w-full text-left text-sm">
              <thead className="sticky top-0 z-20 bg-[#0c0c0e] shadow-[0_1px_0_#262629]">
                <tr>
                  {[
                    '',
                    'No.',
                    '스토어 / 채널',
                    '상품번호',
                    '대상 유형',
                    '상품명 / 옵션명 / 추가상품명',
                    '단품 / 세트',
                    '연결 SKU / Bundle SKU',
                    '현재 스마트스토어 판매가',
                    '계산된 기준 판매가',
                    '현재 스마트스토어 재고',
                    '계산된 기준 재고',
                    '가격 변경 여부',
                    '재고 변경 여부',
                    '원가',
                    '예상 마진',
                    '마진율',
                    '위험 유형',
                    '권장 조치',
                    '실행 가능 여부',
                  ].map((label) => (
                    <th key={label} className="whitespace-nowrap px-3 py-3 text-xs font-medium text-zinc-500">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {paginatedRows.map((row, index) => (
                  <tr key={row.id} className="align-top hover:bg-[#121216]">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        disabled={!row.draftCreatable || submitting}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border-[#444] bg-[#09090b] text-emerald-500 disabled:opacity-40"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-500">
                      {getRowNumber(index, safeCurrentPage, pageSize)}
                    </td>
                    <td className="min-w-40 px-3 py-3">
                      <p className="text-xs font-medium text-zinc-200">{row.storeName || '-'}</p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-500">{row.channelId || '-'}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-300">{row.channelProductNo || '-'}</td>
                    <td className="space-y-2 whitespace-nowrap px-3 py-3">
                      <TypeBadge type={row.candidateType} />
                      <div className="space-y-1">
                        <CandidateStatusBadge status={row.status} />
                        {row.draftApplied && (
                          <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] ${
                            row.draftStatus === 'EXACT'
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                              : 'border-amber-500/20 bg-amber-500/10 text-amber-300'
                          }`}>
                            [Draft 적용]
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="min-w-80 max-w-[420px] px-3 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-medium leading-5 text-zinc-200">{row.itemName || '-'}</p>
                      </div>
                      {row.productName && row.productName !== row.itemName && (
                        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-zinc-500">{row.productName}</p>
                      )}
                      {row.serialNo && <p className="mt-1 font-mono text-[10px] text-violet-300">일련번호 {row.serialNo}</p>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                        row.isSetProduct
                          ? 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
                          : 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20'
                      }`}>
                        {row.isSetProduct ? `[세트 ${row.bundleSkus.length}개]` : '[단품]'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {row.draftApplied && row.draftChange?.linkedSkus && (
                        <div className="mb-2 rounded-md border border-[#262629] bg-[#111114] p-2">
                          <p className="mb-1 text-[10px] text-zinc-500">변경 전 SKU</p>
                          <SkuChips rows={row.draftChange.linkedSkus.before} />
                        </div>
                      )}
                      <SkuChips rows={row.linkedSkus} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{formatMoney(row.currentSmartstorePrice)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-100">{formatMoney(row.calculatedTargetPrice)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{formatNumber(row.currentSmartstoreStock)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-100">{formatNumber(row.calculatedTargetStock)}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {row.hasPriceChange ? (
                        <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">변경</span>
                      ) : <span className="text-xs text-zinc-600">-</span>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {row.hasStockChange ? (
                        <span className="inline-flex rounded-full bg-cyan-500/10 px-2 py-1 text-[11px] font-semibold text-cyan-300">변경</span>
                      ) : <span className="text-xs text-zinc-600">-</span>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{formatMoney(row.costPrice)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{formatMoney(row.expectedMargin)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{formatNumber(row.marginRate, '%')}</td>
                    <td className="min-w-72 px-3 py-3">
                      {row.riskMessages.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 정상
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {row.riskMessages.map((risk) => (
                            <span key={risk} className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-[10px] text-rose-300">{risk}</span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="min-w-80 px-3 py-3 text-xs leading-5 text-zinc-300">{row.recommendedAction}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {row.draftCreatable ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 가능
                        </span>
                      ) : row.status === 'EXCLUDED' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-500/10 px-2 py-1 text-[11px] font-semibold text-zinc-300">
                          <CircleOff className="h-3.5 w-3.5" /> 제외
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-1 text-[11px] font-semibold text-rose-300">
                          <ShieldAlert className="h-3.5 w-3.5" /> 불가
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {!candidatesLoading && paginatedRows.length === 0 && (
                  <tr>
                    <td colSpan={20} className="px-4 py-16 text-center text-sm text-zinc-500">조건에 맞는 수정 후보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={safeCurrentPage}
              totalPages={pageSize === 'ALL' ? 1 : Math.max(1, Math.ceil(rows.length / pageSize))}
              pageSize={pageSize}
              start={pagination.start}
              end={pagination.end}
              totalCount={rows.length}
              onChangePage={(page) => {
                setCurrentPage(page);
                setSelectedIds([]);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
