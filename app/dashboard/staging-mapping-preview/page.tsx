'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Database,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import type {
  StagingMappingCandidate,
  StagingMappingCandidatesResponse,
  StagingMappingFilter,
  StagingMappingSku,
  StagingMappingSummaryResponse,
} from '@/src/types/staging-mapping-preview.types';
import {
  DEFAULT_PAGE_SIZE,
  getPaginationRange,
  getRowNumber,
  type CommonPageSize,
} from '@/src/utils/pagination';

const FILTERS: { value: StagingMappingFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'MAPPED', label: '매핑완료' },
  { value: 'UNMAPPED', label: '미매핑' },
  { value: 'RISK', label: '위험 후보' },
  { value: 'SKU_UNRESOLVED', label: 'SKU 미확정' },
  { value: 'SET', label: '세트상품' },
  { value: 'SINGLE', label: '단품' },
  { value: 'OPTION', label: 'OPTION' },
  { value: 'ADDITIONAL', label: 'ADDITIONAL' },
  { value: 'PRODUCT', label: 'PRODUCT' },
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

async function requestSummary(): Promise<StagingMappingSummaryResponse> {
  const response = await fetch('/api/staging-mapping-preview/summary', { cache: 'no-store' });
  const data = await readJson<StagingMappingSummaryResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, '전체 매핑 요약 조회에 실패했습니다.'));
  return data as StagingMappingSummaryResponse;
}

async function requestCandidates(input: {
  filter: StagingMappingFilter;
  page: number;
  pageSize: CommonPageSize;
  signal: AbortSignal;
}): Promise<StagingMappingCandidatesResponse> {
  const params = new URLSearchParams({
    filter: input.filter,
    page: String(input.page),
    pageSize: String(input.pageSize),
  });
  const response = await fetch(`/api/staging-mapping-preview/candidates?${params}`, {
    cache: 'no-store',
    signal: input.signal,
  });
  const data = await readJson<StagingMappingCandidatesResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, '전체 매핑 후보 조회에 실패했습니다.'));
  return data as StagingMappingCandidatesResponse;
}

function formatDate(value: string | null): string {
  if (!value) return '-';
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

function formatMoney(value: number | null): string {
  return value === null ? '-' : `${value.toLocaleString('ko-KR')}원`;
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet';
}) {
  const colors = {
    indigo: 'border-indigo-500/20 text-indigo-300',
    emerald: 'border-emerald-500/20 text-emerald-300',
    amber: 'border-amber-500/20 text-amber-300',
    rose: 'border-rose-500/20 text-rose-300',
    cyan: 'border-cyan-500/20 text-cyan-300',
    violet: 'border-violet-500/20 text-violet-300',
  } as const;

  return (
    <div className={`rounded-lg border bg-[#0c0c0e] p-4 ${colors[accent]}`}>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value.toLocaleString()}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: StagingMappingCandidate['mappingStatus'] }) {
  const styles = status === 'MAPPED'
    ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
    : status === 'UNMAPPED'
      ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
      : 'bg-rose-500/10 text-rose-300 ring-rose-500/20';
  const label = status === 'MAPPED' ? '매핑완료' : status === 'UNMAPPED' ? '미매핑' : '위험';
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${styles}`}>{label}</span>;
}

function TypeBadge({ type }: { type: StagingMappingCandidate['candidateType'] }) {
  const styles = type === 'PRODUCT'
    ? 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20'
    : type === 'OPTION'
      ? 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/20'
      : type === 'ADDITIONAL'
        ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
        : 'bg-violet-500/10 text-violet-300 ring-violet-500/20';
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${styles}`}>{type}</span>;
}

function SkuList({ rows, emptyText }: { rows: StagingMappingSku[]; emptyText: string }) {
  if (rows.length === 0) return <span className="text-xs text-zinc-600">{emptyText}</span>;
  return (
    <div className="flex min-w-52 flex-col gap-1.5">
      {rows.map((sku, index) => (
        <div key={`${sku.skuCode}-${sku.quantity}-${index}`} className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-semibold text-zinc-200">{sku.skuCode || '미확정'}</span>
            <span className="text-[11px] text-zinc-400">x {sku.quantity}</span>
          </div>
          <div className="mt-1 space-y-0.5 text-[10px] text-zinc-500">
            {sku.internalSkuCode && <p>내부코드 {sku.internalSkuCode}</p>}
            {sku.legacyStockCode && <p>재고코드 {sku.legacyStockCode}</p>}
            {sku.barcode && <p>바코드 {sku.barcode}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SetComponents({ row }: { row: StagingMappingCandidate }) {
  if (!row.isSetProduct || row.setComponents.length === 0) {
    return <span className="text-xs text-zinc-600">-</span>;
  }
  return (
    <div className="flex min-w-64 flex-col gap-1.5">
      {row.setComponents.map((component, index) => (
        <div key={`${component.sourceName}-${index}`} className={`rounded-md border px-2.5 py-2 ${
          component.resolved ? 'border-violet-500/20 bg-violet-500/5' : 'border-rose-500/20 bg-rose-500/5'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <span className={`font-mono text-xs font-semibold ${component.resolved ? 'text-violet-200' : 'text-rose-300'}`}>
              {component.skuCode || 'SKU 미확정'}
            </span>
            <span className="whitespace-nowrap text-[11px] text-zinc-400">x {component.quantity ?? '?'}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-500">{component.sourceName || '-'}</p>
          {!component.resolved && component.candidateSkuCodes.length > 0 && (
            <p className="mt-1 text-[10px] text-amber-300">후보 {component.candidateSkuCodes.join(', ')}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function CalculationState({
  calculable,
  detail,
}: {
  calculable: boolean | null;
  detail: string;
}) {
  if (calculable === null) return <span className="text-xs text-zinc-600">-</span>;
  return (
    <div className={calculable ? 'text-emerald-300' : 'text-rose-300'}>
      <p className="text-xs font-semibold">{calculable ? '계산 가능' : '계산 불가'}</p>
      {calculable && <p className="mt-1 text-[11px] text-zinc-400">{detail}</p>}
    </div>
  );
}

export default function StagingMappingPreviewPage() {
  const [summary, setSummary] = useState<StagingMappingSummaryResponse | null>(null);
  const [candidates, setCandidates] = useState<StagingMappingCandidatesResponse | null>(null);
  const [filter, setFilter] = useState<StagingMappingFilter>('ALL');
  const [pageSize, setPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);

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
        if (!cancelled) setSummaryError(error instanceof Error ? error.message : '전체 매핑 요약 조회에 실패했습니다.');
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
    void requestCandidates({ filter, page: currentPage, pageSize, signal: controller.signal })
      .then((data) => {
        if (!cancelled) {
          setCandidates(data);
          setCandidatesError(null);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled && !(error instanceof DOMException && error.name === 'AbortError')) {
          setCandidatesError(error instanceof Error ? error.message : '전체 매핑 후보 조회에 실패했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setCandidatesLoading(false);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [currentPage, filter, pageSize, refreshKey]);

  const pagination = useMemo(() => getPaginationRange(
    candidates?.totalCount ?? 0,
    candidates?.pageSize ?? pageSize,
    candidates?.currentPage ?? currentPage,
  ), [candidates, currentPage, pageSize]);

  const refresh = () => {
    setSummaryLoading(true);
    setCandidatesLoading(true);
    setSummaryError(null);
    setCandidatesError(null);
    setRefreshKey((value) => value + 1);
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">전체 매핑 Preview</h1>
            <p className="mt-2 text-sm text-zinc-400">최신 staging 스냅샷 기준 단품·세트상품 매핑 검토</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={summaryLoading || candidatesLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] bg-[#121214] px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60 disabled:opacity-60"
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

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">Staging 요약</h2>
            {summaryLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
          </div>
          {summary && (
            <>
              <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">현재 사용 중인 staging snapshot</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {summary.snapshot.hasAppliedData ? '최신 APPLIED ImportJob 기준으로 계산 중' : 'APPLIED staging 데이터 없음'}
                    </p>
                  </div>
                  {summary.snapshot.missingAppliedFileTypes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {summary.snapshot.missingAppliedFileTypes.map((fileType) => (
                        <span key={fileType} className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-300">
                          {FILE_TYPE_LABELS[fileType] ?? fileType} 없음
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-lg border border-[#222] bg-[#111114] p-3">
                    <p className="text-xs font-semibold text-zinc-400">기준 ImportJob ID</p>
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
                    <p className="text-xs font-semibold text-zinc-400">파일 타입별 최신 APPLIED 시간</p>
                    <div className="mt-2 space-y-2">
                      {Object.entries(summary.snapshot.latestAppliedJobs).length === 0 ? (
                        <p className="text-xs text-zinc-600">APPLIED staging 데이터 없음</p>
                      ) : Object.entries(summary.snapshot.latestAppliedJobs).map(([fileType, job]) => (
                        <div key={fileType} className="flex items-start justify-between gap-3 text-xs">
                          <span className="text-zinc-300">{FILE_TYPE_LABELS[fileType] ?? fileType}</span>
                          <span className="text-zinc-500">{formatDate(job?.appliedAt ?? null)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    재고 {summary.snapshot.counts.stagingStockCount.toLocaleString()}건
                  </span>
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    상품 {summary.snapshot.counts.stagingProductCount.toLocaleString()}건
                  </span>
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    옵션 {summary.snapshot.counts.stagingOptionCount.toLocaleString()}건
                  </span>
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    추가상품 {summary.snapshot.counts.stagingAdditionalCount.toLocaleString()}건
                  </span>
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    기존 매핑 {summary.snapshot.counts.stagingSkuMappingCount.toLocaleString()}건
                  </span>
                  <span className="rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-300">
                    ProductVariantKeyword {summary.snapshot.counts.stagingProductVariantKeywordCount.toLocaleString()}건
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
                <SummaryCard label="Staging 상품 수" value={summary.summary.stagingProductCount} accent="cyan" />
                <SummaryCard label="Staging 옵션 수" value={summary.summary.stagingOptionCount} accent="indigo" />
                <SummaryCard label="Staging 추가상품 수" value={summary.summary.stagingAdditionalCount} accent="amber" />
                <SummaryCard label="Staging 재고 SKU 수" value={summary.summary.stagingStockSkuCount} accent="emerald" />
                <SummaryCard label="Staging 기존 매핑 수" value={summary.summary.stagingExistingMappingCount} accent="violet" />
                <SummaryCard label="ProductVariantKeyword 후보 수" value={summary.summary.productVariantKeywordCandidateCount} accent="violet" />
                <SummaryCard label="매핑완료 후보 수" value={summary.summary.mappedCandidateCount} accent="emerald" />
                <SummaryCard label="미매핑 후보 수" value={summary.summary.unmappedCandidateCount} accent="amber" />
                <SummaryCard label="위험 후보 수" value={summary.summary.riskCandidateCount} accent="rose" />
                <SummaryCard label="세트상품 후보 수" value={summary.summary.setProductCandidateCount} accent="violet" />
                <SummaryCard label="단품 후보 수" value={summary.summary.singleProductCandidateCount} accent="cyan" />
                <SummaryCard label="SKU 미확정 후보 수" value={summary.summary.unresolvedSkuCandidateCount} accent="rose" />
              </div>

              <div className="flex flex-wrap gap-2 rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
                <span className="mr-1 text-xs font-semibold text-zinc-400">기준 Import</span>
                {summary.sourceJobs.length === 0 ? (
                  <span className="text-xs text-zinc-600">APPLIED ImportJob 없음</span>
                ) : summary.sourceJobs.map((job) => (
                  <span key={job.jobId} className="inline-flex items-center gap-1.5 rounded-md border border-[#333] bg-[#151519] px-2.5 py-1 text-[11px] text-zinc-400">
                    <span className="font-semibold text-zinc-200">{FILE_TYPE_LABELS[job.fileType] ?? job.fileType}</span>
                    <span>{job.storeName || job.channelId || '전체'}</span>
                    <span>{formatDate(job.appliedAt)}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-violet-300" />
              <h2 className="text-lg font-semibold text-white">전체 후보</h2>
              {candidatesLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
            </div>
            <PageSizeSelect
              value={pageSize}
              onChange={(value) => {
                setCandidatesLoading(true);
                setPageSize(value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="전체 매핑 후보 필터">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setCandidatesLoading(true);
                  setFilter(item.value);
                  setCurrentPage(1);
                }}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  filter === item.value
                    ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-200'
                    : 'border-[#333] bg-[#121214] text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={candidates?.currentPage ?? currentPage}
              totalPages={candidates?.totalPages ?? 1}
              pageSize={candidates?.pageSize ?? pageSize}
              start={pagination.start}
              end={pagination.end}
              totalCount={candidates?.totalCount ?? 0}
              onChangePage={(page) => {
                setCandidatesLoading(true);
                setCurrentPage(page);
              }}
            />
          </div>

          <div className="max-h-[68vh] overflow-auto rounded-lg border border-[#262629] bg-[#09090b]">
            <table className="min-w-[2800px] w-full text-left text-sm">
              <thead className="sticky top-0 z-20 bg-[#0c0c0e] shadow-[0_1px_0_#262629]">
                <tr>
                  {[
                    'No.',
                    '스토어 / 채널',
                    '상품번호',
                    '후보 유형',
                    '상품명 / 옵션명 / 추가상품명',
                    '매핑 상태',
                    '단품 / 세트',
                    '후보 SKU',
                    '기존 연결 SKU',
                    '세트 구성 SKU',
                    '세트 구성 수량',
                    '세트 원가 계산',
                    '세트 재고 계산',
                    '위험 유형',
                    '권장 조치',
                  ].map((label) => (
                    <th key={label} className="whitespace-nowrap px-3 py-3 text-xs font-medium text-zinc-500">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {(candidates?.rows ?? []).map((row, index) => (
                  <tr key={row.id} className="align-top hover:bg-[#121216]">
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-500">
                      {getRowNumber(index, candidates?.currentPage ?? currentPage, candidates?.pageSize ?? pageSize)}
                    </td>
                    <td className="min-w-40 px-3 py-3">
                      <p className="text-xs font-medium text-zinc-200">{row.storeName || '-'}</p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-500">{row.channelId || '-'}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-300">{row.channelProductNo || '-'}</td>
                    <td className="whitespace-nowrap px-3 py-3"><TypeBadge type={row.candidateType} /></td>
                    <td className="min-w-80 max-w-96 px-3 py-3">
                      <p className="text-xs font-medium leading-5 text-zinc-200">{row.itemName || '-'}</p>
                      {row.productName && row.productName !== row.itemName && (
                        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-zinc-500">{row.productName}</p>
                      )}
                      {row.serialNo && <p className="mt-1 font-mono text-[10px] text-violet-300">일련번호 {row.serialNo}</p>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3"><StatusBadge status={row.mappingStatus} /></td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                        row.isSetProduct
                          ? 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
                          : 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20'
                      }`}>
                        {row.isSetProduct ? `[세트 ${row.setComponents.length}개]` : '[단품]'}
                      </span>
                    </td>
                    <td className="px-3 py-3"><SkuList rows={row.candidateSkus} emptyText="후보 없음" /></td>
                    <td className="px-3 py-3"><SkuList rows={row.existingSkus} emptyText="연결 없음" /></td>
                    <td className="px-3 py-3"><SetComponents row={row} /></td>
                    <td className="min-w-48 px-3 py-3">
                      {row.isSetProduct && row.setComponents.length > 0 ? (
                        <div className="space-y-1 text-xs text-zinc-300">
                          {row.setComponents.map((component, componentIndex) => (
                            <p key={`${component.sourceName}-${componentIndex}`}>
                              <span className="font-mono text-zinc-200">{component.skuCode || '미확정'}</span>
                              <span className="ml-2 text-zinc-500">x {component.quantity ?? '?'}</span>
                            </p>
                          ))}
                          <p className="border-t border-[#262629] pt-1 text-[11px] text-zinc-500">총 {row.setTotalQuantity ?? '?'}개</p>
                        </div>
                      ) : <span className="text-xs text-zinc-600">-</span>}
                    </td>
                    <td className="min-w-32 px-3 py-3">
                      <CalculationState calculable={row.setCostCalculable} detail={formatMoney(row.setCostPrice)} />
                    </td>
                    <td className="min-w-32 px-3 py-3">
                      <CalculationState calculable={row.setStockCalculable} detail={`${row.sellableSetStock?.toLocaleString() ?? '-'}세트`} />
                    </td>
                    <td className="min-w-64 px-3 py-3">
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
                    <td className="min-w-64 px-3 py-3 text-xs leading-5 text-zinc-300">{row.recommendedAction}</td>
                  </tr>
                ))}
                {!candidatesLoading && (candidates?.rows.length ?? 0) === 0 && (
                  <tr>
                    <td colSpan={15} className="px-4 py-16 text-center text-sm text-zinc-500">조건에 맞는 후보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={candidates?.currentPage ?? currentPage}
              totalPages={candidates?.totalPages ?? 1}
              pageSize={candidates?.pageSize ?? pageSize}
              start={pagination.start}
              end={pagination.end}
              totalCount={candidates?.totalCount ?? 0}
              onChangePage={(page) => {
                setCandidatesLoading(true);
                setCurrentPage(page);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
