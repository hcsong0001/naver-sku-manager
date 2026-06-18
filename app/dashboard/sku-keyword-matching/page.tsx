'use client';

import { useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Plus,
  Save,
  Search,
  X,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import {
  DEFAULT_PAGE_SIZE,
  getPaginatedRows,
  getPaginationRange,
  getRowNumber,
  getSafeCurrentPage,
  getTotalPages,
  type CommonPageSize,
} from '@/src/utils/pagination';
import type {
  SkuKeywordErrorRow,
  SkuKeywordManualApplyRequest,
  SkuKeywordManualApplyResponse,
  SkuKeywordManualSkuCandidate,
  SkuKeywordMatchedRow,
  SkuKeywordPreviewResponse,
  SkuKeywordSummary,
  SkuKeywordWarningRow,
  SkuMappingType,
} from '@/src/types/sku-keyword-matching.types';

type Message = { type: 'success' | 'error'; text: string };
type ResultTab = 'matched' | 'warning' | 'error';
type SelectedSku = SkuKeywordManualSkuCandidate & { quantity: number };
type ManualSelections = Record<string, SelectedSku[]>;
type TabPaginationState = {
  matched: number;
  warning: number;
  error: number;
};
type TabPageSizeState = {
  matched: CommonPageSize;
  warning: CommonPageSize;
  error: CommonPageSize;
};

const mappingTypeLabels: Record<string, string> = {
  PRODUCT: '단일상품',
  OPTION: '옵션',
  ADDITIONAL: '추가상품',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isManualMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

function getErrorMessage(value: unknown, fallback: string): string {
  if (!isRecord(value) || typeof value.error !== 'string') return fallback;
  return value.error;
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

function makeUploadFormData(erpFile: File, csvFile: File, stockFile: File): FormData {
  const formData = new FormData();
  formData.append('erpFile', erpFile);
  formData.append('csvFile', csvFile);
  formData.append('stockFile', stockFile);
  return formData;
}

function getWarningRowKey(row: SkuKeywordWarningRow, index: number): string {
  return `${row.mappingType}:${row.channelProductNo}:${row.itemId}:${row.warningType}:${index}`;
}

function getManualSelectionStats(selections: ManualSelections): { rowCount: number; skuCount: number } {
  return Object.values(selections).reduce(
    (stats, selectedSkus) => {
      if (selectedSkus.length === 0) return stats;
      return {
        rowCount: stats.rowCount + 1,
        skuCount: stats.skuCount + selectedSkus.length,
      };
    },
    { rowCount: 0, skuCount: 0 },
  );
}

function formatMaybe(value: string | number | null | undefined): string {
  if (value === null || value === undefined || String(value).trim() === '') return '-';
  return String(value);
}

function MappingTypeBadge({ type }: { type: string }) {
  const color =
    type === 'PRODUCT'
      ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
      : type === 'OPTION'
        ? 'bg-sky-500/10 text-sky-300 ring-sky-500/20'
        : 'bg-violet-500/10 text-violet-300 ring-violet-500/20';

  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${color}`}>
      {mappingTypeLabels[type] ? `${type} · ${mappingTypeLabels[type]}` : type}
    </span>
  );
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 90
      ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
      : pct >= 70
        ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
        : 'bg-red-500/10 text-red-300 ring-red-500/20';

  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${color}`}>
      {pct}%
    </span>
  );
}

function ApplyEligibleBadge({ eligible }: { eligible: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
        eligible
          ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
          : 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
      }`}
    >
      {eligible ? '가능' : '검토'}
    </span>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ?? 'border-[#262629] bg-[#0c0c0e]'}`}>
      <p className="text-[11px] font-medium text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function SummaryCards({ summary }: { summary: SkuKeywordSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      <SummaryCard label="ERP 전체 행" value={summary.totalErpRows} />
      <SummaryCard label="자동 매칭" value={summary.matchedRowsCount} />
      <SummaryCard
        label="적용 가능"
        value={summary.applyEligibleCount}
        accent="border-emerald-500/20 bg-emerald-500/5"
      />
      <SummaryCard
        label="검토 필요"
        value={summary.warningCount}
        accent="border-amber-500/20 bg-amber-500/5"
      />
      <SummaryCard label="중복 의심" value={summary.duplicateCount} />
      <SummaryCard
        label="오류"
        value={summary.errorCount}
        accent="border-red-500/20 bg-red-500/5"
      />
    </div>
  );
}

function FileUploadInput({
  id,
  label,
  accept,
  file,
  onFileChange,
}: {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-zinc-400">
        {label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="tms-button tms-file-button inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
        >
          <FileSpreadsheet className="h-4 w-4" />
          파일 선택
        </button>
        <div className="tms-control flex min-h-10 flex-1 items-center rounded-lg border px-4 text-sm tms-text-muted">
          {file ? file.name : '선택된 파일 없음'}
        </div>
      </div>
      <input
        id={id}
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function MatchedRowsTable({
  rows,
  pageSize,
  currentPage,
  onPageSizeChange,
  onPageChange,
}: {
  rows: SkuKeywordMatchedRow[];
  pageSize: CommonPageSize;
  currentPage: number;
  onPageSizeChange: (value: CommonPageSize) => void;
  onPageChange: (page: number) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">
        자동 매칭 행이 없습니다.
      </div>
    );
  }

  const totalPages = getTotalPages(rows.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = getPaginatedRows(rows, pageSize, safeCurrentPage);
  const pagination = getPaginationRange(rows.length, pageSize, safeCurrentPage);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            start={pagination.start}
            end={pagination.end}
            totalCount={rows.length}
            onChangePage={onPageChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#262629]">
      <table className="w-full min-w-[1180px] text-left text-sm">
        <thead className="bg-[#0c0c0e]">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">No.</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">매칭 키워드</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">바코드</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">SKU</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">방식</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">신뢰도</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">적용</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">검토 사유</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e22]">
          {paginatedRows.map((row, index) => (
            <tr key={`${row.itemId}-${row.barcode}-${index}`} className="hover:bg-[#16161a]">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {getRowNumber(index, safeCurrentPage, pageSize)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <MappingTypeBadge type={row.mappingType} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {formatMaybe(row.channelProductNo)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">{row.itemId}</td>
              <td className="max-w-72 px-4 py-3 text-zinc-300">{formatMaybe(row.sourceText)}</td>
              <td className="max-w-48 px-4 py-3 text-indigo-300">{formatMaybe(row.matchedKeyword)}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                {formatMaybe(row.barcode)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-emerald-300">
                {formatMaybe(row.skuCode)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">{row.matchMethod}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <ConfidenceBadge confidence={row.confidence} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <ApplyEligibleBadge eligible={row.applyEligible} />
              </td>
              <td className="max-w-80 px-4 py-3 text-zinc-300">{formatMaybe(row.reviewReason)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
        <PaginationControls
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          start={pagination.start}
          end={pagination.end}
          totalCount={rows.length}
          onChangePage={onPageChange}
        />
      </div>
    </div>
  );
}

function SelectedSkuList({
  selectedSkus,
  onRemove,
  onQuantityChange,
}: {
  selectedSkus: SelectedSku[];
  onRemove: (skuId: string) => void;
  onQuantityChange: (skuId: string, quantity: number) => void;
}) {
  if (selectedSkus.length === 0) {
    return <div className="text-xs text-zinc-500">선택된 SKU 없음</div>;
  }

  return (
    <div className="space-y-2">
      {selectedSkus.map((sku) => (
        <div key={sku.id} className="tms-status-success rounded-lg border border-emerald-500/20 p-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs font-semibold tms-text-primary">{sku.skuCode}</p>
              <p className="mt-0.5 line-clamp-2 text-xs tms-text-primary">{sku.skuName}</p>
              <p className="mt-0.5 font-mono text-[11px] tms-text-muted">{formatMaybe(sku.barcode)}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(sku.id)}
              className="tms-button tms-button-muted inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm transition"
              aria-label="선택 SKU 제거"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <label className="mt-2 flex items-center gap-2 text-[11px] tms-text-muted">
            수량
            <input
              type="number"
              min={1}
              value={sku.quantity}
              onChange={(event) => onQuantityChange(sku.id, Number(event.target.value))}
              className="tms-control h-8 w-20 rounded-md border px-2 text-sm outline-none focus:border-emerald-400"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

function SkuSearchCell({
  row,
  selectedSkus,
  onAdd,
  onRemove,
  onQuantityChange,
}: {
  row: SkuKeywordWarningRow;
  selectedSkus: SelectedSku[];
  onAdd: (candidate: SkuKeywordManualSkuCandidate) => void;
  onRemove: (skuId: string) => void;
  onQuantityChange: (skuId: string, quantity: number) => void;
}) {
  const [query, setQuery] = useState(row.matchedKeyword || row.sourceText || '');
  const [results, setResults] = useState<SkuKeywordManualSkuCandidate[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedIds = new Set(selectedSkus.map((sku) => sku.id));

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError('검색어를 입력해 주세요.');
      setResults([]);
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/sku-matching/manual-sku-search?q=${encodeURIComponent(trimmedQuery)}&take=8`,
      );
      const data = await readJson<SkuKeywordManualSkuCandidate[] | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'SKU 검색에 실패했습니다.'));
      }

      setResults(data as SkuKeywordManualSkuCandidate[]);
    } catch (searchError) {
      const text = searchError instanceof Error ? searchError.message : 'SKU 검색에 실패했습니다.';
      setError(text);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="w-[360px] space-y-3">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleSearch();
            }
          }}
          className="h-9 min-w-0 flex-1 rounded-lg border border-[#333] bg-[#0c0c0e] px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400"
          placeholder="SKU, 상품명, 바코드, 별칭"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="tms-button tms-button-secondary inline-flex h-9 w-10 items-center justify-center rounded-lg border text-sm transition"
          aria-label="SKU 검색"
        >
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </button>
      </div>

      {error && <p className="text-xs text-red-300">{error}</p>}

      {results.length > 0 && (
        <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-[#262629] bg-[#0c0c0e] p-2">
          {results.map((candidate) => {
            const alreadySelected = selectedIds.has(candidate.id);
            return (
              <div key={candidate.id} className="rounded-md border border-[#262629] bg-[#121214] p-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-semibold text-white">{candidate.skuCode}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-zinc-300">{candidate.skuName}</p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">
                      {formatMaybe(candidate.barcode)} · 재고 {candidate.stockQuantity.toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAdd(candidate)}
                    disabled={alreadySelected}
                    className="tms-button tms-button-muted inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm transition"
                    aria-label="SKU 추가"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {(candidate.productNames.length > 0 || candidate.purchaseNames.length > 0) && (
                  <div className="mt-2 space-y-1 text-[11px] text-zinc-500">
                    {candidate.productNames.length > 0 && (
                      <p className="line-clamp-1">상품명: {candidate.productNames.slice(0, 2).join(', ')}</p>
                    )}
                    {candidate.purchaseNames.length > 0 && (
                      <p className="line-clamp-1">키워드: {candidate.purchaseNames.slice(0, 2).join(', ')}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <SelectedSkuList
        selectedSkus={selectedSkus}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
      />
    </div>
  );
}

function WarningRowsTable({
  rows,
  selections,
  onAddSku,
  onRemoveSku,
  onQuantityChange,
  pageSize,
  currentPage,
  onPageSizeChange,
  onPageChange,
}: {
  rows: SkuKeywordWarningRow[];
  selections: ManualSelections;
  onAddSku: (rowKey: string, candidate: SkuKeywordManualSkuCandidate) => void;
  onRemoveSku: (rowKey: string, skuId: string) => void;
  onQuantityChange: (rowKey: string, skuId: string, quantity: number) => void;
  pageSize: CommonPageSize;
  currentPage: number;
  onPageSizeChange: (value: CommonPageSize) => void;
  onPageChange: (page: number) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-8 text-center text-sm text-emerald-300">
        검토할 warning row가 없습니다.
      </div>
    );
  }

  const totalPages = getTotalPages(rows.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = getPaginatedRows(rows, pageSize, safeCurrentPage);
  const pagination = getPaginationRange(rows.length, pageSize, safeCurrentPage);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-amber-500/20 bg-[#0c0c0e] px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            start={pagination.start}
            end={pagination.end}
            totalCount={rows.length}
            onChangePage={onPageChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-amber-500/20">
      <table className="w-full min-w-[1900px] text-left text-sm">
        <thead className="bg-amber-500/5">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">No.</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">매칭 키워드</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">경고 유형</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">경고 메시지</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">메모</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">상태</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">SKU 검색/선택</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-500/10">
          {paginatedRows.map((row, index) => {
            const actualIndex = getRowNumber(index, safeCurrentPage, pageSize) - 1;
            const rowKey = getWarningRowKey(row, actualIndex);
            const selectedSkus = selections[rowKey] ?? [];

            return (
              <tr key={rowKey} className="align-top hover:bg-amber-500/5">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                  {actualIndex + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <MappingTypeBadge type={row.mappingType} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                  {formatMaybe(row.channelProductNo)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                  {formatMaybe(row.itemId)}
                </td>
                <td className="max-w-72 px-4 py-3 text-zinc-300">{formatMaybe(row.sourceText)}</td>
                <td className="max-w-48 px-4 py-3 text-indigo-300">{formatMaybe(row.matchedKeyword)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-amber-300">
                  {formatMaybe(row.warningType)}
                </td>
                <td className="max-w-80 px-4 py-3 text-amber-100">{formatMaybe(row.warningMessage)}</td>
                <td className="max-w-80 px-4 py-3 text-zinc-300">{formatMaybe(row.memo)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                      selectedSkus.length > 0
                        ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
                    }`}
                  >
                    {selectedSkus.length > 0 ? `수동 확정 후보 ${selectedSkus.length}` : '미선택'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <SkuSearchCell
                    row={row}
                    selectedSkus={selectedSkus}
                    onAdd={(candidate) => onAddSku(rowKey, candidate)}
                    onRemove={(skuId) => onRemoveSku(rowKey, skuId)}
                    onQuantityChange={(skuId, quantity) => onQuantityChange(rowKey, skuId, quantity)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
      <div className="rounded-lg border border-amber-500/20 bg-[#0c0c0e] px-4 py-3">
        <PaginationControls
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          start={pagination.start}
          end={pagination.end}
          totalCount={rows.length}
          onChangePage={onPageChange}
        />
      </div>
    </div>
  );
}

function ErrorRowsTable({
  rows,
  pageSize,
  currentPage,
  onPageSizeChange,
  onPageChange,
}: {
  rows: SkuKeywordErrorRow[];
  pageSize: CommonPageSize;
  currentPage: number;
  onPageSizeChange: (value: CommonPageSize) => void;
  onPageChange: (page: number) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-8 text-center text-sm text-emerald-300">
        오류 행이 없습니다.
      </div>
    );
  }

  const totalPages = getTotalPages(rows.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = getPaginatedRows(rows, pageSize, safeCurrentPage);
  const pagination = getPaginationRange(rows.length, pageSize, safeCurrentPage);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-red-500/20 bg-[#0c0c0e] px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            start={pagination.start}
            end={pagination.end}
            totalCount={rows.length}
            onChangePage={onPageChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-red-500/20">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-red-500/5">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-red-300">No.</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">오류 유형</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">메시지</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-500/10">
          {paginatedRows.map((row, index) => (
            <tr key={`${row.itemId}-${row.errorType}-${index}`} className="hover:bg-red-500/5">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {getRowNumber(index, safeCurrentPage, pageSize)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{formatMaybe(row.mappingType)}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {formatMaybe(row.channelProductNo)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {formatMaybe(row.itemId)}
              </td>
              <td className="max-w-72 px-4 py-3 text-zinc-300">{formatMaybe(row.sourceText)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-red-300">{formatMaybe(row.errorType)}</td>
              <td className="max-w-96 px-4 py-3 text-red-200">{formatMaybe(row.errorMessage)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className="rounded-lg border border-red-500/20 bg-[#0c0c0e] px-4 py-3">
        <PaginationControls
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          start={pagination.start}
          end={pagination.end}
          totalCount={rows.length}
          onChangePage={onPageChange}
        />
      </div>
    </div>
  );
}

function ResultTabs({
  activeTab,
  preview,
  selections,
  pageByTab,
  pageSizeByTab,
  onTabChange,
  onAddSku,
  onRemoveSku,
  onQuantityChange,
  onPageChange,
  onPageSizeChange,
}: {
  activeTab: ResultTab;
  preview: SkuKeywordPreviewResponse;
  selections: ManualSelections;
  pageByTab: TabPaginationState;
  pageSizeByTab: TabPageSizeState;
  onTabChange: (tab: ResultTab) => void;
  onAddSku: (rowKey: string, candidate: SkuKeywordManualSkuCandidate) => void;
  onRemoveSku: (rowKey: string, skuId: string) => void;
  onQuantityChange: (rowKey: string, skuId: string, quantity: number) => void;
  onPageChange: (tab: ResultTab, page: number) => void;
  onPageSizeChange: (tab: ResultTab, value: CommonPageSize) => void;
}) {
  const tabs: { key: ResultTab; label: string; count: number }[] = [
    { key: 'matched', label: '자동 매칭', count: preview.matchedRows.length },
    { key: 'warning', label: '수동 검토', count: preview.warningRows.length },
    { key: 'error', label: '오류', count: preview.errorRows.length },
  ];

  return (
    <div className="rounded-lg border border-[#262629] bg-[#121214] p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`tms-button inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? 'tms-selected-bg tms-selected-text border-transparent'
                : 'tms-button-secondary'
            }`}
          >
            {tab.label}
            <span className="font-mono text-xs">{tab.count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      {activeTab === 'matched' && (
        <MatchedRowsTable
          rows={preview.matchedRows}
          pageSize={pageSizeByTab.matched}
          currentPage={pageByTab.matched}
          onPageSizeChange={(value) => onPageSizeChange('matched', value)}
          onPageChange={(page) => onPageChange('matched', page)}
        />
      )}
      {activeTab === 'warning' && (
        <WarningRowsTable
          rows={preview.warningRows}
          selections={selections}
          onAddSku={onAddSku}
          onRemoveSku={onRemoveSku}
          onQuantityChange={onQuantityChange}
          pageSize={pageSizeByTab.warning}
          currentPage={pageByTab.warning}
          onPageSizeChange={(value) => onPageSizeChange('warning', value)}
          onPageChange={(page) => onPageChange('warning', page)}
        />
      )}
      {activeTab === 'error' && (
        <ErrorRowsTable
          rows={preview.errorRows}
          pageSize={pageSizeByTab.error}
          currentPage={pageByTab.error}
          onPageSizeChange={(value) => onPageSizeChange('error', value)}
          onPageChange={(page) => onPageChange('error', page)}
        />
      )}
    </div>
  );
}

export default function SkuKeywordMatchingPage() {
  const [erpFile, setErpFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [stockFile, setStockFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<SkuKeywordPreviewResponse | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<ResultTab>('warning');
  const [pageByTab, setPageByTab] = useState<TabPaginationState>({ matched: 1, warning: 1, error: 1 });
  const [pageSizeByTab, setPageSizeByTab] = useState<TabPageSizeState>({
    matched: DEFAULT_PAGE_SIZE,
    warning: DEFAULT_PAGE_SIZE,
    error: DEFAULT_PAGE_SIZE,
  });
  const [manualSelections, setManualSelections] = useState<ManualSelections>({});
  const [previewing, setPreviewing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [manualApplying, setManualApplying] = useState(false);

  const manualStats = getManualSelectionStats(manualSelections);

  const resetPreview = () => {
    setPreview(null);
    setMessage(null);
    setActiveTab('warning');
    setPageByTab({ matched: 1, warning: 1, error: 1 });
    setPageSizeByTab({ matched: DEFAULT_PAGE_SIZE, warning: DEFAULT_PAGE_SIZE, error: DEFAULT_PAGE_SIZE });
    setManualSelections({});
  };

  const validateFiles = (): { erpFile: File; csvFile: File; stockFile: File } | null => {
    if (!erpFile || !csvFile || !stockFile) {
      setMessage({ type: 'error', text: '3개 파일을 모두 업로드해 주세요.' });
      return null;
    }

    return { erpFile, csvFile, stockFile };
  };

  const addManualSku = (rowKey: string, candidate: SkuKeywordManualSkuCandidate) => {
    setManualSelections((current) => {
      const selectedSkus = current[rowKey] ?? [];
      if (selectedSkus.some((sku) => sku.id === candidate.id)) return current;
      return {
        ...current,
        [rowKey]: [...selectedSkus, { ...candidate, quantity: 1 }],
      };
    });
  };

  const removeManualSku = (rowKey: string, skuId: string) => {
    setManualSelections((current) => {
      const next = { ...current };
      const selectedSkus = (next[rowKey] ?? []).filter((sku) => sku.id !== skuId);
      if (selectedSkus.length > 0) {
        next[rowKey] = selectedSkus;
      } else {
        delete next[rowKey];
      }
      return next;
    });
  };

  const changeManualSkuQuantity = (rowKey: string, skuId: string, quantity: number) => {
    setManualSelections((current) => {
      const selectedSkus = current[rowKey] ?? [];
      const safeQuantity = Number.isFinite(quantity) && quantity >= 1 ? Math.floor(quantity) : 1;
      return {
        ...current,
        [rowKey]: selectedSkus.map((sku) =>
          sku.id === skuId ? { ...sku, quantity: safeQuantity } : sku,
        ),
      };
    });
  };

  const handlePreview = async () => {
    const files = validateFiles();
    if (!files) return;

    setPreviewing(true);
    setMessage(null);
    setManualSelections({});

    try {
      const response = await fetch('/api/sku-matching/keyword-preview', {
        method: 'POST',
        body: makeUploadFormData(files.erpFile, files.csvFile, files.stockFile),
      });
      const data = await readJson<SkuKeywordPreviewResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '키워드 매칭 검증에 실패했습니다.'));
      }

      const previewResult = data as SkuKeywordPreviewResponse;
      setPreview(previewResult);
      setActiveTab(previewResult.warningRows.length > 0 ? 'warning' : 'matched');
      setPageByTab({ matched: 1, warning: 1, error: 1 });
      setMessage({ type: 'success', text: '키워드 매칭 검증이 완료되었습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '키워드 매칭 검증에 실패했습니다.';
      setPreview(null);
      setMessage({ type: 'error', text });
    } finally {
      setPreviewing(false);
    }
  };

  const handleExport = async () => {
    const files = validateFiles();
    if (!files) return;

    setExporting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sku-matching/keyword-preview-export', {
        method: 'POST',
        body: makeUploadFormData(files.erpFile, files.csvFile, files.stockFile),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          const data = await readJson<{ error: string }>(response);
          throw new Error(getErrorMessage(data, 'Preview Excel 다운로드에 실패했습니다.'));
        }
        throw new Error('Preview Excel 다운로드에 실패했습니다.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sku-keyword-preview.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Preview 결과 Excel 다운로드를 시작했습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Preview Excel 다운로드에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setExporting(false);
    }
  };

  const buildManualApplyPayload = (): SkuKeywordManualApplyRequest | null => {
    if (!preview) return null;

    const rows = preview.warningRows.flatMap((row, index) => {
      if (!isManualMappingType(row.mappingType)) return [];

      const rowKey = getWarningRowKey(row, index);
      const selectedSkus = manualSelections[rowKey] ?? [];
      if (selectedSkus.length === 0) return [];

      return [
        {
          mappingType: row.mappingType,
          channelProductNo: row.channelProductNo,
          itemId: row.itemId,
          sourceText: row.sourceText,
          matchedKeyword: row.matchedKeyword,
          warningType: row.warningType,
          warningMessage: row.warningMessage,
          memo: row.memo,
          skus: selectedSkus.map((sku) => ({ skuId: sku.id, quantity: sku.quantity })),
        },
      ];
    });

    return rows.length > 0 ? { rows } : null;
  };

  const handleManualApply = async () => {
    const payload = buildManualApplyPayload();

    if (!payload) {
      setMessage({ type: 'error', text: '수동 확정할 warning row를 선택해 주세요.' });
      return;
    }

    setManualApplying(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sku-matching/manual-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await readJson<SkuKeywordManualApplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '수동 확정 저장에 실패했습니다.'));
      }

      const result = data as SkuKeywordManualApplyResponse;
      setManualSelections({});
      setMessage({
        type: 'success',
        text:
          `수동 확정 저장 완료: 생성 ${result.createdCount.toLocaleString()}건, ` +
          `업데이트 ${result.updatedCount.toLocaleString()}건, ` +
          `건너뜀 ${result.skippedCount.toLocaleString()}건.`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수동 확정 저장에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setManualApplying(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">키워드 SKU 수동 검토</h1>
          <p className="mt-2 text-sm text-zinc-400">
            ERP 미매핑 목록, 상품관리 CSV, 재고현황 XLS를 기준으로 warning row를 검토합니다.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <FileUploadInput
              id="erp-file"
              label="ERP 미매핑 파일 (.xlsx)"
              accept=".xlsx,.xls"
              file={erpFile}
              onFileChange={(file) => {
                setErpFile(file);
                resetPreview();
              }}
            />
            <FileUploadInput
              id="csv-file"
              label="상품관리 CSV (.csv)"
              accept=".csv"
              file={csvFile}
              onFileChange={(file) => {
                setCsvFile(file);
                resetPreview();
              }}
            />
            <FileUploadInput
              id="stock-file"
              label="재고현황 XLS (.xls)"
              accept=".xls,.xlsx"
              file={stockFile}
              onFileChange={(file) => {
                setStockFile(file);
                resetPreview();
              }}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={handlePreview}
              disabled={previewing || !erpFile || !csvFile || !stockFile}
              className="tms-button tms-button-primary inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition"
            >
              {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Preview 실행
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting || !erpFile || !csvFile || !stockFile}
              className="tms-button tms-button-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Preview Excel
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/20 bg-red-500/10 text-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {message.text}
            </div>
          )}
        </div>

        {preview && (
          <div className="space-y-6">
            <SummaryCards summary={preview.summary} />

            <div className="rounded-lg border border-[#262629] bg-[#121214] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">수동 확정 후보</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    row {manualStats.rowCount.toLocaleString()}개 · SKU {manualStats.skuCount.toLocaleString()}개
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleManualApply}
                  disabled={manualApplying || manualStats.skuCount === 0}
                  className="tms-button tms-button-primary inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition"
                >
                  {manualApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  수동 확정 저장
                </button>
              </div>
            </div>

            <ResultTabs
              activeTab={activeTab}
              preview={preview}
              selections={manualSelections}
              pageByTab={pageByTab}
              pageSizeByTab={pageSizeByTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setPageByTab((current) => ({ ...current, [tab]: 1 }));
              }}
              onAddSku={addManualSku}
              onRemoveSku={removeManualSku}
              onQuantityChange={changeManualSkuQuantity}
              onPageChange={(tab, page) =>
                setPageByTab((current) => ({
                  ...current,
                  [tab]: page,
                }))
              }
              onPageSizeChange={(tab, value) =>
                {
                  setPageSizeByTab((current) => ({
                    ...current,
                    [tab]: value,
                  }));
                  setPageByTab((current) => ({
                    ...current,
                    [tab]: 1,
                  }));
                }
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
