'use client';

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Plus,
  Save,
  Search,
  Trash2,
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
  ProductVariantKeywordPreviewResponse,
  ProductVariantKeywordPreviewRow,
} from '@/src/types/product-variant-keyword.types';
import type {
  SkuKeywordManualApplyRequest,
  SkuKeywordManualApplyResponse,
  SkuKeywordManualSkuCandidate,
} from '@/src/types/sku-keyword-matching.types';

type ProductDetail = {
  id: string;
  name: string;
  naverProductId: string;
  channelProductNo: string | null;
  status: string;
  skuId: string | null;
  sku: { id: string; skuCode: string; stockQuantity: number } | null;
  skuMappings: {
    id: string;
    quantity: number;
    sku: { id: string; skuCode: string; stockQuantity: number };
  }[];
  smartstore: { id: string; name: string };
  options: {
    id: string;
    optionName: string;
    optionValue: string;
    optionCode: string | null;
    skuId: string | null;
    sku: { id: string; skuCode: string; stockQuantity: number } | null;
    skuMappings: {
      id: string;
      quantity: number;
      sku: { id: string; skuCode: string; stockQuantity: number };
    }[];
  }[];
  additionals: {
    id: string;
    additionalName: string;
    additionalValue: string;
    sellerManagementCode: string | null;
    skuId: string | null;
    sku: { id: string; skuCode: string; stockQuantity: number } | null;
    skuMappings: {
      id: string;
      quantity: number;
      sku: { id: string; skuCode: string; stockQuantity: number };
    }[];
  }[];
};

type SkuMappingDisplay = {
  quantity: number;
  sku: { id?: string; skuCode: string; stockQuantity?: number };
};

type Message = { type: 'success' | 'error'; text: string };
type ExistingVariantSku = {
  skuId: string;
  skuCode: string;
  quantity: number;
  stockQuantity: number;
  source: string;
};
type SelectedVariantSku = SkuKeywordManualSkuCandidate & { quantity: number };
type VariantManualSelections = Record<string, SelectedVariantSku[]>;
type SkuKeywordManualUnapplyResponse = {
  deletedCount: number;
  directCleared: boolean;
  aliasDeletedCount: number;
  removedSkus: { skuId: string; skuCode: string; quantity: number }[];
};
type BulkApplyResultSummary = {
  successCandidateCount: number;
  failedCandidateCount: number;
  successSkuCount: number;
  failedReasons: string[];
  rowStatusByKey: Record<string, 'success' | 'failed'>;
};
type ProductVariantReportSummary = {
  totalCount: number;
  mappedCount: number;
  unmappedCount: number;
  unresolvedSkuCount: number;
  setProductCount: number;
  singleProductCount: number;
  selectableCount: number;
};
type ProductVariantExportRow = {
  rowNumber: number;
  mappingType: string;
  itemName: string;
  serialNo: string;
  mappingStatus: string;
  isSetProduct: boolean;
  skuCode: string;
  skuName: string;
  quantity: number;
  existingSku: string;
  candidateSku: string;
  warningMessage: string;
  riskTypes: string;
  recommendedAction: string;
  qualityStatus: string;
  completionRate: number;
  missingSku: string;
  additionalSku: string;
  quantityDifference: string;
};
type VariantCandidateFilter =
  | 'ALL'
  | 'SET'
  | 'SINGLE'
  | 'MAPPED'
  | 'UNMAPPED'
  | 'UNRESOLVED'
  | 'SELECTABLE';
type VariantMatchStatus = 'MAPPED' | 'RESOLVED' | 'PARTIAL' | 'UNRESOLVED';
type VariantSelectionPreset = 'FILTER_ALL' | 'PAGE' | 'RESOLVED' | 'SINGLE' | 'SET' | 'CLEAR';
type VariantQualityRiskType =
  | 'DIFFERENT_FROM_EXISTING'
  | 'SET_COMPONENT_MISSING'
  | 'SKU_UNRESOLVED'
  | 'NO_CANDIDATE_SKU'
  | 'MAPPED_BUT_EXISTING_SKU_MISSING';
type VariantQualitySeverity = 'HIGH' | 'MEDIUM' | 'LOW';
type VariantQualityIssue = {
  riskType: VariantQualityRiskType;
  label: string;
  message: string;
  severity: VariantQualitySeverity;
};
type VariantQualityRow = {
  rowKey: string;
  rowNumber: number;
  mappingType: string;
  itemName: string;
  serialNo: string;
  isSetProduct: boolean;
  isMapped: boolean;
  existingSkuText: string;
  candidateSkuText: string;
  existingSkuCount: number;
  candidateSkuCount: number;
  completionRate: number;
  issues: VariantQualityIssue[];
  missingSkuText: string;
  additionalSkuText: string;
  quantityDifferenceText: string;
  recommendedAction: string;
};
type VariantQualityFilter =
  | 'ALL'
  | 'NORMAL'
  | 'HAS_WARNING'
  | VariantQualityRiskType;
type VariantQualitySummary = {
  totalCount: number;
  mappedCount: number;
  resolvedCount: number;
  completionRate: number;
  riskCount: number;
  differentFromExistingCount: number;
  setComponentMissingCount: number;
  unresolvedCount: number;
  noCandidateSkuCount: number;
  missingExistingSkuInfoCount: number;
};

const variantCandidateFilters: { key: VariantCandidateFilter; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'MAPPED', label: '매핑완료' },
  { key: 'UNMAPPED', label: '미매핑' },
  { key: 'UNRESOLVED', label: 'SKU 미확정' },
  { key: 'SET', label: '세트상품' },
  { key: 'SINGLE', label: '단품' },
  { key: 'SELECTABLE', label: '선택 가능 후보' },
];

const variantQualityRiskLabels: Record<VariantQualityRiskType, string> = {
  DIFFERENT_FROM_EXISTING: '기존 매핑과 후보 SKU 다름',
  SET_COMPONENT_MISSING: '세트상품 구성 누락',
  SKU_UNRESOLVED: 'SKU 미확정',
  NO_CANDIDATE_SKU: '후보 SKU 없음',
  MAPPED_BUT_EXISTING_SKU_MISSING: '매핑완료지만 기존 SKU 정보 부족',
};

const variantQualitySeverityStyles: Record<VariantQualitySeverity, string> = {
  HIGH: 'bg-red-500/10 text-red-200 ring-red-500/20',
  MEDIUM: 'bg-amber-500/10 text-amber-200 ring-amber-500/20',
  LOW: 'bg-blue-500/10 text-blue-200 ring-blue-500/20',
};
const variantQualityRecommendedActions = {
  REVIEW_REQUIRED: '확인 필요',
  MANUAL_SKU_SEARCH: 'SKU 수동검색 필요',
  KEEP_EXISTING: '기존 매핑 유지',
  REPLACE_CANDIDATE: '후보 SKU로 교체 가능',
  UNAPPLY_AND_REMAP: '매핑해제 후 재매핑 필요',
} as const;
type VariantQualityRecommendedAction =
  (typeof variantQualityRecommendedActions)[keyof typeof variantQualityRecommendedActions];
const variantQualityFilterOptions: { key: VariantQualityFilter; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'NORMAL', label: '정상' },
  { key: 'HAS_WARNING', label: '경고 있음' },
  { key: 'DIFFERENT_FROM_EXISTING', label: '기존 매핑과 후보 SKU 다름' },
  { key: 'SET_COMPONENT_MISSING', label: '세트상품 구성 누락' },
  { key: 'SKU_UNRESOLVED', label: 'SKU 미확정' },
  { key: 'NO_CANDIDATE_SKU', label: '후보 SKU 없음' },
  { key: 'MAPPED_BUT_EXISTING_SKU_MISSING', label: '매핑완료지만 기존 SKU 정보 부족' },
];

const variantQualitySummaryCards: {
  key: keyof VariantQualitySummary;
  label: string;
  color: string;
}[] = [
  { key: 'completionRate', label: '전체 매핑완료율', color: 'text-emerald-300' },
  { key: 'riskCount', label: '위험 후보 수', color: 'text-amber-300' },
  { key: 'differentFromExistingCount', label: '기존 매핑과 다름', color: 'text-red-300' },
  { key: 'setComponentMissingCount', label: '세트 구성 누락', color: 'text-violet-200' },
  { key: 'unresolvedCount', label: 'SKU 미확정', color: 'text-red-300' },
  { key: 'noCandidateSkuCount', label: '후보 SKU 없음', color: 'text-zinc-200' },
  { key: 'missingExistingSkuInfoCount', label: '기존 SKU 정보 부족', color: 'text-blue-300' },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(value: unknown, fallback: string): string {
  if (!isRecord(value) || typeof value.error !== 'string') return fallback;
  return value.error;
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

function formatSkuMappings(mappings: SkuMappingDisplay[], fallback?: { skuCode: string } | null): string {
  if (mappings.length > 0) {
    return mappings.map((mapping) => `${mapping.sku.skuCode} x ${mapping.quantity}`).join(', ');
  }

  return fallback ? `${fallback.skuCode} x 1` : '-';
}

function formatMaybe(value: string | number | null | undefined): string {
  if (value === null || value === undefined || String(value).trim() === '') return '-';
  return String(value);
}

function formatExistingSkuMappings(
  mappings: SkuMappingDisplay[],
  fallback?: { id: string; skuCode: string; stockQuantity: number } | null,
): ExistingVariantSku[] {
  if (mappings.length > 0) {
    return mappings.map((mapping) => ({
      skuId: mapping.sku.id ?? '',
      skuCode: mapping.sku.skuCode,
      quantity: mapping.quantity,
      stockQuantity: mapping.sku.stockQuantity ?? 0,
      source: 'SKU 매핑',
    }));
  }

  return fallback
    ? [
        {
          skuId: fallback.id,
          skuCode: fallback.skuCode,
          quantity: 1,
          stockQuantity: fallback.stockQuantity,
          source: '직접 연결',
        },
      ]
    : [];
}

function getVariantRowKey(row: ProductVariantKeywordPreviewRow): string {
  return `${row.mappingType}:${row.itemId}:${row.serialNo}`;
}

function isVariantRowResolved(row: ProductVariantKeywordPreviewRow): boolean {
  return row.skus.length > 0 && row.skus.every((sku) => sku.skuId);
}

function getResolvedSkuCount(row: ProductVariantKeywordPreviewRow): number {
  return row.skus.filter((sku) => sku.skuId).length;
}

function getRowApplySkuCount(row: ProductVariantKeywordPreviewRow, manualSelections: VariantManualSelections): number {
  const rowKey = getVariantRowKey(row);
  const skuIds = [
    ...row.skus.map((sku) => sku.skuId).filter(Boolean),
    ...(manualSelections[rowKey] ?? []).map((sku) => sku.id),
  ];
  return new Set(skuIds).size;
}

function getRowsSkuCount(rows: ProductVariantKeywordPreviewRow[], manualSelections: VariantManualSelections): number {
  return rows.reduce((total, row) => total + getRowApplySkuCount(row, manualSelections), 0);
}

function filterVariantRows(
  rows: ProductVariantKeywordPreviewRow[],
  filter: VariantCandidateFilter,
  product: ProductDetail,
  newlyMappedRowKeys: Record<string, boolean>,
  unmappedRowKeys: Record<string, boolean>,
): ProductVariantKeywordPreviewRow[] {
  if (filter === 'SET') return rows.filter((row) => row.isSetProduct);
  if (filter === 'SINGLE') return rows.filter((row) => !row.isSetProduct);
  if (filter === 'MAPPED') {
    return rows.filter((row) => isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys));
  }
  if (filter === 'UNMAPPED') {
    return rows.filter((row) => !isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys));
  }
  if (filter === 'UNRESOLVED') return rows.filter((row) => !isVariantRowResolved(row));
  if (filter === 'SELECTABLE') {
    return rows.filter((row) => canSelectVariantRow(row, product, newlyMappedRowKeys, unmappedRowKeys));
  }
  return rows;
}

function toManualApplyRequest(
  rows: ProductVariantKeywordPreviewRow[],
  manualSelections: VariantManualSelections,
): SkuKeywordManualApplyRequest {
  return {
    rows: rows.map((row) => {
      const rowKey = getVariantRowKey(row);
      const skus = [
        ...row.skus
          .filter((sku) => sku.skuId)
          .map((sku) => ({ skuId: sku.skuId, quantity: sku.quantity })),
        ...(manualSelections[rowKey] ?? []).map((sku) => ({ skuId: sku.id, quantity: sku.quantity })),
      ];
      const uniqueSkus = Array.from(new Map(skus.map((sku) => [sku.skuId, sku])).values());

      return {
        mappingType: row.mappingType,
        channelProductNo: row.channelProductNo,
        itemId: row.itemId,
        sourceText: row.productOptionText || row.itemName,
        matchedKeyword: row.stockMatchedProductName,
        warningType: 'PRODUCT_VARIANT_KEYWORD',
        warningMessage: row.warningMessage || 'ProductVariantKeyword 후보',
        memo: [
          `ProductVariantKeyword 일련번호 ${row.serialNo}`,
          `모델코드 ${row.resolvedModelCodes || '-'}`,
          row.isSetProduct ? '세트상품 후보' : '단일 SKU 후보',
        ].join(' / '),
        skus: uniqueSkus,
      };
    }),
  };
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'SALE'
      ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
      : status === 'OUTOFSTOCK'
        ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
        : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20';

  return (
    <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold ring-1 ring-inset ${color}`}>
      {status}
    </span>
  );
}

function MessageBox({ message }: { message: Message }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
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
  );
}

function MappingPill({ text, mapped }: { text: string; mapped: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        mapped
          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
          : 'bg-red-500/10 text-red-400 ring-red-500/20'
      }`}
    >
      {text}
    </span>
  );
}

function SetTypeBadge({ isSetProduct }: { isSetProduct: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        isSetProduct
          ? 'bg-violet-500/10 text-violet-200 ring-violet-500/30'
          : 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20'
      }`}
    >
      {isSetProduct ? '[세트상품]' : '[단품]'}
    </span>
  );
}

function VariantStatusBadge({ status }: { status: VariantMatchStatus }) {
  const styleByStatus: Record<VariantMatchStatus, string> = {
    MAPPED: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
    RESOLVED: 'bg-blue-500/10 text-blue-300 ring-blue-500/20',
    PARTIAL: 'bg-violet-500/10 text-violet-200 ring-violet-500/30',
    UNRESOLVED: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  };
  const labelByStatus: Record<VariantMatchStatus, string> = {
    MAPPED: getVariantMatchStatusLabel('MAPPED'),
    RESOLVED: getVariantMatchStatusLabel('RESOLVED'),
    PARTIAL: getVariantMatchStatusLabel('PARTIAL'),
    UNRESOLVED: getVariantMatchStatusLabel('UNRESOLVED'),
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styleByStatus[status]}`}
    >
      {labelByStatus[status]}
    </span>
  );
}

function SkuChip({
  skuCode,
  modelCode,
  muted = false,
}: {
  skuCode: string;
  modelCode: string;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 font-mono text-[11px] font-semibold ring-1 ring-inset ${
        muted
          ? 'bg-amber-500/10 text-amber-200 ring-amber-500/20'
          : 'bg-emerald-500/10 text-emerald-200 ring-emerald-500/20'
      }`}
    >
      {skuCode || '미확정'} / {modelCode || '-'}
    </span>
  );
}

function VariantSkuChips({ row }: { row: ProductVariantKeywordPreviewRow }) {
  if (row.skus.length === 0) {
    return <span className="text-xs text-zinc-500">SKU 없음</span>;
  }

  return (
    <div className="flex max-w-xl flex-wrap gap-1.5">
      {row.skus.map((sku, index) => (
        <SkuChip
          key={`${sku.inventoryMatchProductName}-${sku.modelCode}-${index}`}
          skuCode={sku.skuCode}
          modelCode={sku.modelCode}
          muted={!sku.skuId}
        />
      ))}
    </div>
  );
}

function SelectedVariantSkuList({
  selectedSkus,
  onRemove,
  onQuantityChange,
}: {
  selectedSkus: SelectedVariantSku[];
  onRemove: (skuId: string) => void;
  onQuantityChange: (skuId: string, quantity: number) => void;
}) {
  if (selectedSkus.length === 0) {
    return <p className="text-xs text-zinc-500">직접 추가한 SKU가 없습니다.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {selectedSkus.map((sku) => (
        <div key={sku.id} className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-xs font-semibold text-emerald-200">{sku.skuCode}</p>
              <p className="mt-0.5 max-w-64 truncate text-[11px] text-zinc-300">{sku.skuName}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(sku.id)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/20 text-emerald-100 hover:bg-emerald-500/10"
              aria-label="수동 선택 SKU 제거"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <label className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
            수량
            <input
              type="number"
              min={1}
              value={sku.quantity}
              onChange={(event) => onQuantityChange(sku.id, Number(event.target.value))}
              className="h-7 w-20 rounded-md border border-[#333] bg-[#121214] px-2 text-xs text-white outline-none focus:border-emerald-400"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

function VariantSkuSearch({
  row,
  selectedSkus,
  onAdd,
  onRemove,
  onQuantityChange,
}: {
  row: ProductVariantKeywordPreviewRow;
  selectedSkus: SelectedVariantSku[];
  onAdd: (candidate: SkuKeywordManualSkuCandidate) => void;
  onRemove: (skuId: string) => void;
  onQuantityChange: (skuId: string, quantity: number) => void;
}) {
  const [query, setQuery] = useState(row.stockMatchedProductName || row.itemName);
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
    <div className="mt-4 rounded-lg border border-[#262629] bg-[#121214] p-3">
      <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-100">수동 SKU 선택</p>
          <p className="mt-0.5 text-xs text-zinc-500">SKU 미확정 후보는 여기서 SKU를 추가한 뒤 체크하고 저장합니다.</p>
        </div>
        <div className="flex min-w-0 gap-2 lg:w-[520px]">
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
            className="inline-flex h-9 w-10 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1e] text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
            aria-label="SKU 검색"
          >
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && <p className="mb-2 text-xs text-red-300">{error}</p>}

      {results.length > 0 && (
        <div className="mb-3 grid max-h-64 gap-2 overflow-y-auto md:grid-cols-2 xl:grid-cols-4">
          {results.map((candidate) => {
            const alreadySelected = selectedIds.has(candidate.id);
            return (
              <div key={candidate.id} className="rounded-md border border-[#262629] bg-[#0c0c0e] p-2">
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
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-950 transition hover:bg-white disabled:bg-[#333] disabled:text-zinc-500"
                    aria-label="SKU 추가"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SelectedVariantSkuList
        selectedSkus={selectedSkus}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
      />
    </div>
  );
}

function CurrentMappedSkuList({
  mappedSkus,
  onUnapply,
  unapplying,
}: {
  mappedSkus: ExistingVariantSku[];
  onUnapply: () => void;
  unapplying: boolean;
}) {
  if (mappedSkus.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-200">현재 연결 SKU</p>
          <p className="mt-0.5 text-xs text-zinc-500">
            잘못 연결된 경우 매핑해제 후 다시 SKU를 선택해 수동확정할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onUnapply}
          disabled={unapplying}
          className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {unapplying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          매핑해제
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-emerald-500/10">
        <table className="w-full min-w-[620px] text-left text-xs">
          <thead className="bg-emerald-500/5">
            <tr>
              <th className="px-3 py-2 font-medium text-emerald-200">skuCode</th>
              <th className="px-3 py-2 font-medium text-emerald-200">quantity</th>
              <th className="px-3 py-2 font-medium text-emerald-200">재고</th>
              <th className="px-3 py-2 font-medium text-emerald-200">출처</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {mappedSkus.map((sku) => (
              <tr key={`${sku.skuId}-${sku.skuCode}`}>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-emerald-200">{sku.skuCode}</td>
                <td className="whitespace-nowrap px-3 py-2 text-zinc-300">{sku.quantity}</td>
                <td className="whitespace-nowrap px-3 py-2 text-zinc-300">{sku.stockQuantity.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-2 text-zinc-400">{sku.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VariantReportCards({ summary }: { summary: ProductVariantReportSummary }) {
  const cards = [
    { label: '전체 후보 수', value: summary.totalCount, color: 'text-zinc-100' },
    { label: '매핑완료 후보 수', value: summary.mappedCount, color: 'text-emerald-300' },
    { label: '미매핑 후보 수', value: summary.unmappedCount, color: 'text-amber-300' },
    { label: 'SKU 미확정 후보 수', value: summary.unresolvedSkuCount, color: 'text-red-300' },
    { label: '세트상품 후보 수', value: summary.setProductCount, color: 'text-violet-200' },
    { label: '단품 후보 수', value: summary.singleProductCount, color: 'text-zinc-300' },
    { label: '선택 가능 후보 수', value: summary.selectableCount, color: 'text-blue-300' },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-3 py-3">
          <p className="text-[11px] font-medium text-zinc-500">{card.label}</p>
          <p className={`mt-1 text-lg font-semibold ${card.color}`}>{card.value.toLocaleString()}개</p>
        </div>
      ))}
    </div>
  );
}

function VariantQualitySection({
  summary,
  rows,
  totalCount,
  pageSize,
  currentPage,
  totalPages,
  paginationStart,
  paginationEnd,
  activeFilter,
  onPageSizeChange,
  onPageChange,
  onFilterChange,
  onViewCandidate,
}: {
  summary: VariantQualitySummary;
  rows: VariantQualityRow[];
  totalCount: number;
  pageSize: CommonPageSize;
  currentPage: number;
  totalPages: number;
  paginationStart: number;
  paginationEnd: number;
  activeFilter: VariantQualityFilter;
  onPageSizeChange: (value: CommonPageSize) => void;
  onPageChange: (page: number) => void;
  onFilterChange: (filter: VariantQualityFilter) => void;
  onViewCandidate: (rowKey: string) => void;
}) {
  return (
    <section className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">품질 검증</h3>
          <p className="mt-1 text-xs text-zinc-500">
            기존 연결 SKU와 preview 후보를 비교해 위험 후보를 분류합니다.
          </p>
        </div>
        <div className="text-sm text-zinc-400">
          매핑완료율 <span className="font-semibold text-emerald-300">{summary.completionRate}%</span>
          <span className="ml-2 text-xs text-zinc-500">
            ({summary.mappedCount.toLocaleString()} / {summary.totalCount.toLocaleString()})
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {variantQualitySummaryCards.map((card) => (
          <div key={card.key} className="rounded-lg border border-[#262629] bg-[#121214] px-3 py-3">
            <p className="text-[11px] font-medium text-zinc-500">{card.label}</p>
            <p className={`mt-1 text-lg font-semibold ${card.color}`}>
              {card.key === 'completionRate'
                ? `${summary[card.key].toLocaleString()}%`
                : `${summary[card.key].toLocaleString()}건`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {variantQualityFilterOptions.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => onFilterChange(filter.key)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
              activeFilter === filter.key
                ? 'bg-zinc-100 text-zinc-950'
                : 'border border-[#333] bg-[#1a1a1e] text-zinc-300 hover:border-indigo-500/60 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#262629] bg-[#121214] px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            start={paginationStart}
            end={paginationEnd}
            totalCount={totalCount}
            onChangePage={onPageChange}
          />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-[#262629]">
        <table className="w-full min-w-[1680px] text-left text-xs">
          <thead className="bg-[#121214]">
            <tr>
              <th className="px-3 py-2 font-medium text-zinc-500">No.</th>
              <th className="px-3 py-2 font-medium text-zinc-500">구분</th>
              <th className="px-3 py-2 font-medium text-zinc-500">옵션/추가상품명</th>
              <th className="px-3 py-2 font-medium text-zinc-500">원본 일련번호</th>
              <th className="px-3 py-2 font-medium text-zinc-500">매핑완료율</th>
              <th className="px-3 py-2 font-medium text-zinc-500">권장 조치</th>
              <th className="px-3 py-2 font-medium text-zinc-500">기존 연결 SKU</th>
              <th className="px-3 py-2 font-medium text-zinc-500">후보 SKU</th>
              <th className="px-3 py-2 font-medium text-zinc-500">누락 SKU</th>
              <th className="px-3 py-2 font-medium text-zinc-500">추가 후보 SKU</th>
              <th className="px-3 py-2 font-medium text-zinc-500">수량 차이</th>
              <th className="px-3 py-2 font-medium text-zinc-500">위험유형</th>
              <th className="px-3 py-2 font-medium text-zinc-500">검증 결과</th>
              <th className="px-3 py-2 font-medium text-zinc-500">이동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e22]">
            {rows.map((row) => (
              <tr key={row.rowKey} className="align-top">
                <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-400">{row.rowNumber}</td>
                <td className="whitespace-nowrap px-3 py-3 text-zinc-300">{row.mappingType}</td>
                <td className="px-3 py-3 text-zinc-200">
                  <div className="font-medium">{row.itemName}</div>
                  <div className="mt-1 text-[11px] text-zinc-500">{row.isSetProduct ? '세트상품' : '단품'}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-400">{row.serialNo}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="font-semibold text-emerald-300">{row.completionRate}%</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-amber-200">{row.recommendedAction}</td>
                <td className="px-3 py-3 font-mono text-zinc-400">{row.existingSkuText || '-'}</td>
                <td className="px-3 py-3 font-mono text-zinc-300">{row.candidateSkuText || '-'}</td>
                <td className="px-3 py-3 font-mono text-red-200">{row.missingSkuText}</td>
                <td className="px-3 py-3 font-mono text-blue-200">{row.additionalSkuText}</td>
                <td className="px-3 py-3 text-zinc-300">{row.quantityDifferenceText}</td>
                <td className="px-3 py-3">
                  {row.issues.length === 0 ? (
                    <span className="inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset bg-emerald-500/10 text-emerald-200 ring-emerald-500/20">
                      정상
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {row.issues.map((issue) => (
                        <span
                          key={issue.riskType}
                          className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${variantQualitySeverityStyles[issue.severity]}`}
                          title={issue.message}
                        >
                          {issue.label}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3 text-zinc-400">
                  <div className="space-y-1">
                    <div>{row.issues.length === 0 ? '정상' : row.issues.map((issue) => issue.message).join(' / ')}</div>
                    {row.issues.some((issue) => issue.riskType === 'DIFFERENT_FROM_EXISTING') && (
                      <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-amber-100">
                        자동 교체 금지. 기존 매핑을 유지할지 확인한 뒤, 필요하면 매핑해제 후 재매핑하세요.
                      </div>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <button
                    type="button"
                    onClick={() => onViewCandidate(row.rowKey)}
                    className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-200 transition hover:bg-indigo-500/20"
                  >
                    후보 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function VariantCandidateDetail({
  row,
  isMapped,
  mappedSkus,
  onUnapply,
  unapplying,
  selectedSkus,
  onAddManualSku,
  onRemoveManualSku,
  onManualSkuQuantityChange,
}: {
  row: ProductVariantKeywordPreviewRow;
  isMapped: boolean;
  mappedSkus: ExistingVariantSku[];
  onUnapply: () => void;
  unapplying: boolean;
  selectedSkus: SelectedVariantSku[];
  onAddManualSku: (candidate: SkuKeywordManualSkuCandidate) => void;
  onRemoveManualSku: (skuId: string) => void;
  onManualSkuQuantityChange: (skuId: string, quantity: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
      <div className="mb-3 text-xs text-zinc-500">
        ProductVariantKeyword 상품옵션: <span className="text-zinc-300">{formatMaybe(row.productOptionText)}</span>
      </div>
      <CurrentMappedSkuList mappedSkus={mappedSkus} onUnapply={onUnapply} unapplying={unapplying} />
      <div className="mb-3">
        <div className="mb-2 text-xs font-medium text-zinc-500">SKU 후보</div>
        <VariantSkuChips row={row} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#1e1e22]">
        <table className="w-full min-w-[900px] text-left text-xs">
          <thead className="bg-[#121214]">
            <tr>
              <th className="px-3 py-2 font-medium text-zinc-500">재고매칭 상품명</th>
              <th className="px-3 py-2 font-medium text-zinc-500">모델코드</th>
              <th className="px-3 py-2 font-medium text-zinc-500">skuCode</th>
              <th className="px-3 py-2 font-medium text-zinc-500">barcode</th>
              <th className="px-3 py-2 font-medium text-zinc-500">quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e22]">
            {row.skus.map((sku, index) => (
              <tr key={`${sku.inventoryMatchProductName}-${index}`} className="align-top">
                <td className="px-3 py-2 text-zinc-300">{sku.inventoryMatchProductName}</td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-indigo-300">
                  {formatMaybe(sku.modelCode)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 font-mono text-[11px] font-semibold ring-1 ring-inset ${
                      sku.skuId
                        ? 'bg-emerald-500/10 text-emerald-200 ring-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-200 ring-amber-500/20'
                    }`}
                  >
                    {formatMaybe(sku.skuCode)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-zinc-400">
                  {formatMaybe(sku.barcode)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-zinc-300">{sku.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isMapped ? (
        <p className="mt-4 rounded-lg border border-[#262629] bg-[#121214] px-3 py-2 text-xs text-zinc-400">
          매핑완료 후보는 먼저 매핑해제한 뒤 새 SKU를 선택해 다시 수동확정할 수 있습니다.
        </p>
      ) : (
        <VariantSkuSearch
          row={row}
          selectedSkus={selectedSkus}
          onAdd={onAddManualSku}
          onRemove={onRemoveManualSku}
          onQuantityChange={onManualSkuQuantityChange}
        />
      )}
    </div>
  );
}


function isRowMapped(
  row: ProductVariantKeywordPreviewRow,
  product: ProductDetail,
  newlyMappedRowKeys: Record<string, boolean>,
  unmappedRowKeys: Record<string, boolean>,
): boolean {
  if (newlyMappedRowKeys[getVariantRowKey(row)]) return true;
  if (unmappedRowKeys[getVariantRowKey(row)]) return false;

  if (row.mappingType === 'OPTION') {
    const option = product.options.find((o) => o.id === row.itemId);
    return !!option && (option.skuId !== null || option.skuMappings.length > 0);
  }
  if (row.mappingType === 'ADDITIONAL') {
    const additional = product.additionals.find((a) => a.id === row.itemId);
    return !!additional && (additional.skuId !== null || additional.skuMappings.length > 0);
  }
  return false;
}

function getExistingVariantSkus(
  row: ProductVariantKeywordPreviewRow,
  product: ProductDetail,
  unmappedRowKeys: Record<string, boolean>,
): ExistingVariantSku[] {
  if (unmappedRowKeys[getVariantRowKey(row)]) return [];

  if (row.mappingType === 'OPTION') {
    const option = product.options.find((o) => o.id === row.itemId);
    return option ? formatExistingSkuMappings(option.skuMappings, option.sku) : [];
  }

  if (row.mappingType === 'ADDITIONAL') {
    const additional = product.additionals.find((a) => a.id === row.itemId);
    return additional ? formatExistingSkuMappings(additional.skuMappings, additional.sku) : [];
  }

  return [];
}

function getVariantMatchStatus(row: ProductVariantKeywordPreviewRow, mapped: boolean): VariantMatchStatus {
  if (mapped) return 'MAPPED';
  if (isVariantRowResolved(row)) return 'RESOLVED';
  if (getResolvedSkuCount(row) > 0) return 'PARTIAL';
  return 'UNRESOLVED';
}

function getVariantMatchStatusLabel(status: VariantMatchStatus): string {
  if (status === 'MAPPED') return '매핑완료';
  if (status === 'RESOLVED') return 'SKU 매칭 성공';
  if (status === 'PARTIAL') return '부분 매칭';
  return 'SKU 미확정';
}

function createVariantReportSummary({
  rows,
  product,
  newlyMappedRowKeys,
  unmappedRowKeys,
  selectableRows,
}: {
  rows: ProductVariantKeywordPreviewRow[];
  product: ProductDetail;
  newlyMappedRowKeys: Record<string, boolean>;
  unmappedRowKeys: Record<string, boolean>;
  selectableRows: ProductVariantKeywordPreviewRow[];
}): ProductVariantReportSummary {
  const mappedCount = rows.filter((row) => isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys)).length;
  const setProductCount = rows.filter((row) => row.isSetProduct).length;

  return {
    totalCount: rows.length,
    mappedCount,
    unmappedCount: rows.length - mappedCount,
    unresolvedSkuCount: rows.filter((row) => !isVariantRowResolved(row)).length,
    setProductCount,
    singleProductCount: rows.length - setProductCount,
    selectableCount: selectableRows.length,
  };
}

function createSelectionSummary(
  rows: ProductVariantKeywordPreviewRow[],
  manualSelections: VariantManualSelections,
): {
  candidateCount: number;
  totalSkuCount: number;
  setCount: number;
  singleCount: number;
  unresolvedCount: number;
} {
  return {
    candidateCount: rows.length,
    totalSkuCount: getRowsSkuCount(rows, manualSelections),
    setCount: rows.filter((row) => row.isSetProduct).length,
    singleCount: rows.filter((row) => !row.isSetProduct).length,
    unresolvedCount: rows.filter((row) => getRowApplySkuCount(row, manualSelections) === 0).length,
  };
}

function formatExportSkuList(skus: { skuCode: string; quantity: number }[]): string {
  if (skus.length === 0) return '';
  return skus.map((sku) => `${sku.skuCode || '-'} x ${sku.quantity}`).join(', ');
}

function getCandidateVariantSkus(
  row: ProductVariantKeywordPreviewRow,
  manualSelections: VariantManualSelections,
): { skuId: string; skuCode: string; quantity: number }[] {
  const rowKey = getVariantRowKey(row);
  const candidateSkus = [
    ...row.skus
      .filter((sku) => sku.skuId)
      .map((sku) => ({
        skuId: sku.skuId,
        skuCode: sku.skuCode,
        quantity: sku.quantity,
      })),
    ...(manualSelections[rowKey] ?? []).map((sku) => ({
      skuId: sku.id,
      skuCode: sku.skuCode,
      quantity: sku.quantity,
    })),
  ];

  return Array.from(
    new Map(candidateSkus.map((sku) => [`${sku.skuId}:${sku.quantity}`, sku])).values(),
  );
}

function getSkuComparisonKey(sku: { skuId: string; quantity: number }): string {
  return `${sku.skuId}:${sku.quantity}`;
}

function getSkuBaseKey(sku: { skuId: string; skuCode: string }): string {
  return sku.skuId || sku.skuCode;
}

function formatSkuQuantityList(skus: { skuCode: string; quantity: number }[]): string {
  if (skus.length === 0) return '-';
  return skus.map((sku) => `${sku.skuCode || '-'} x ${sku.quantity}`).join(', ');
}

function createVariantSkuDiff(
  existingSkus: { skuId: string; skuCode: string; quantity: number }[],
  candidateSkus: { skuId: string; skuCode: string; quantity: number }[],
): {
  missingSkuText: string;
  additionalSkuText: string;
  quantityDifferenceText: string;
} {
  const existingByKey = new Map(existingSkus.map((sku) => [getSkuBaseKey(sku), sku]));
  const candidateByKey = new Map(candidateSkus.map((sku) => [getSkuBaseKey(sku), sku]));

  const missingSkus = existingSkus.filter((sku) => !candidateByKey.has(getSkuBaseKey(sku)));
  const additionalSkus = candidateSkus.filter((sku) => !existingByKey.has(getSkuBaseKey(sku)));
  const quantityDiffs = candidateSkus.flatMap((sku) => {
    const existing = existingByKey.get(getSkuBaseKey(sku));
    if (!existing || existing.quantity === sku.quantity) return [];
    return [`${sku.skuCode || '-'}: 기존 ${existing.quantity} / 후보 ${sku.quantity}`];
  });

  return {
    missingSkuText: formatSkuQuantityList(missingSkus),
    additionalSkuText: formatSkuQuantityList(additionalSkus),
    quantityDifferenceText: quantityDiffs.length > 0 ? quantityDiffs.join(', ') : '-',
  };
}

function getRecommendedAction(row: {
  isMapped: boolean;
  issues: VariantQualityIssue[];
  candidateSkus: { skuId: string; skuCode: string; quantity: number }[];
}): VariantQualityRecommendedAction {
  const riskTypes = new Set(row.issues.map((issue) => issue.riskType));

  if (riskTypes.has('DIFFERENT_FROM_EXISTING')) {
    return variantQualityRecommendedActions.UNAPPLY_AND_REMAP;
  }
  if (riskTypes.has('SKU_UNRESOLVED') || riskTypes.has('NO_CANDIDATE_SKU')) {
    return variantQualityRecommendedActions.MANUAL_SKU_SEARCH;
  }
  if (riskTypes.has('SET_COMPONENT_MISSING')) {
    return variantQualityRecommendedActions.REVIEW_REQUIRED;
  }
  if (riskTypes.has('MAPPED_BUT_EXISTING_SKU_MISSING')) {
    return variantQualityRecommendedActions.KEEP_EXISTING;
  }
  if (row.isMapped) {
    return variantQualityRecommendedActions.KEEP_EXISTING;
  }
  if (row.candidateSkus.length > 0) {
    return variantQualityRecommendedActions.REPLACE_CANDIDATE;
  }
  return variantQualityRecommendedActions.REVIEW_REQUIRED;
}

function filterVariantQualityRows(rows: VariantQualityRow[], filter: VariantQualityFilter): VariantQualityRow[] {
  if (filter === 'ALL') return rows;
  if (filter === 'NORMAL') return rows.filter((row) => row.issues.length === 0);
  if (filter === 'HAS_WARNING') return rows.filter((row) => row.issues.length > 0);
  return rows.filter((row) => row.issues.some((issue) => issue.riskType === filter));
}

function getVariantCompletionRate(
  row: ProductVariantKeywordPreviewRow,
  manualSelections: VariantManualSelections,
): number {
  if (row.skus.length === 0) {
    return (manualSelections[getVariantRowKey(row)] ?? []).length > 0 ? 100 : 0;
  }

  const resolvedCount = row.skus.filter((sku) => sku.skuId).length;
  return Math.round((resolvedCount / row.skus.length) * 100);
}

function createVariantQualityRow(
  row: ProductVariantKeywordPreviewRow,
  product: ProductDetail,
  newlyMappedRowKeys: Record<string, boolean>,
  unmappedRowKeys: Record<string, boolean>,
  manualSelections: VariantManualSelections,
): VariantQualityRow {
  const rowKey = getVariantRowKey(row);
  const isMapped = isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys);
  const existingSkus = getExistingVariantSkus(row, product, unmappedRowKeys);
  const candidateSkus = getCandidateVariantSkus(row, manualSelections);
  const existingSkuText = formatExportSkuList(existingSkus);
  const candidateSkuText = formatExportSkuList(candidateSkus);
  const completionRate = getVariantCompletionRate(row, manualSelections);
  const issues: VariantQualityIssue[] = [];

  if (row.isSetProduct) {
    const unresolvedSetCount = row.skus.filter((sku) => !sku.skuId).length;
    if (unresolvedSetCount > 0) {
      issues.push({
        riskType: 'SET_COMPONENT_MISSING',
        label: variantQualityRiskLabels.SET_COMPONENT_MISSING,
        message: `세트 후보 구성 중 ${unresolvedSetCount}개 SKU가 확정되지 않았습니다.`,
        severity: 'HIGH',
      });
    }

    if (existingSkus.length > 0 && candidateSkus.length > 0 && existingSkus.length !== candidateSkus.length) {
      issues.push({
        riskType: 'SET_COMPONENT_MISSING',
        label: variantQualityRiskLabels.SET_COMPONENT_MISSING,
        message: `기존 연결 SKU ${existingSkus.length}개와 후보 SKU ${candidateSkus.length}개의 구성 수가 다릅니다.`,
        severity: 'HIGH',
      });
    }
  }

  if (candidateSkus.length === 0) {
    issues.push({
      riskType: 'NO_CANDIDATE_SKU',
      label: variantQualityRiskLabels.NO_CANDIDATE_SKU,
      message: '후보 SKU가 없어서 수동확정 대상을 만들 수 없습니다.',
      severity: 'HIGH',
    });
  }

  if (row.skus.some((sku) => !sku.skuId)) {
    issues.push({
      riskType: 'SKU_UNRESOLVED',
      label: variantQualityRiskLabels.SKU_UNRESOLVED,
      message: '미확정 SKU가 포함되어 있습니다.',
      severity: 'HIGH',
    });
  }

  if (isMapped && existingSkus.length === 0) {
    issues.push({
      riskType: 'MAPPED_BUT_EXISTING_SKU_MISSING',
      label: variantQualityRiskLabels.MAPPED_BUT_EXISTING_SKU_MISSING,
      message: '매핑완료 상태지만 현재 연결된 SKU 정보를 화면에서 확인할 수 없습니다.',
      severity: 'MEDIUM',
    });
  }

  if (isMapped && existingSkus.length > 0 && candidateSkus.length > 0) {
    const existingKeys = new Set(existingSkus.map(getSkuComparisonKey));
    const candidateKeys = new Set(candidateSkus.map(getSkuComparisonKey));
    const sameSize = existingKeys.size === candidateKeys.size;
    const allSame = sameSize && Array.from(existingKeys).every((key) => candidateKeys.has(key));

    if (!allSame) {
      issues.push({
        riskType: 'DIFFERENT_FROM_EXISTING',
        label: variantQualityRiskLabels.DIFFERENT_FROM_EXISTING,
        message: '현재 연결 SKU와 preview 후보 SKU 구성이 다릅니다.',
        severity: 'MEDIUM',
      });
    }
  }

  const uniqueIssues = Array.from(new Map(issues.map((issue) => [issue.riskType, issue])).values());
  const skuDiff = createVariantSkuDiff(existingSkus, candidateSkus);
  const recommendedAction = getRecommendedAction({
    isMapped,
    issues: uniqueIssues,
    candidateSkus,
  });

  return {
    rowKey,
    rowNumber: 0,
    mappingType: row.mappingType,
    itemName: row.itemName,
    serialNo: row.serialNo,
    isSetProduct: row.isSetProduct,
    isMapped,
    existingSkuText,
    candidateSkuText,
    existingSkuCount: existingSkus.length,
    candidateSkuCount: candidateSkus.length,
    completionRate,
    issues: uniqueIssues,
    missingSkuText: skuDiff.missingSkuText,
    additionalSkuText: skuDiff.additionalSkuText,
    quantityDifferenceText: skuDiff.quantityDifferenceText,
    recommendedAction,
  };
}

function createVariantQualityRows(args: {
  rows: ProductVariantKeywordPreviewRow[];
  product: ProductDetail;
  newlyMappedRowKeys: Record<string, boolean>;
  unmappedRowKeys: Record<string, boolean>;
  manualSelections: VariantManualSelections;
}): VariantQualityRow[] {
  return args.rows.map((row, index) => ({
    ...createVariantQualityRow(
      row,
      args.product,
      args.newlyMappedRowKeys,
      args.unmappedRowKeys,
      args.manualSelections,
    ),
    rowNumber: index + 1,
  }));
}

function createVariantQualitySummary(rows: VariantQualityRow[]): VariantQualitySummary {
  const riskRows = rows.filter((row) => row.issues.length > 0);
  const countRiskType = (riskType: VariantQualityRiskType): number =>
    rows.filter((row) => row.issues.some((issue) => issue.riskType === riskType)).length;
  const mappedCount = rows.filter((row) => row.isMapped).length;
  const resolvedCount = rows.filter((row) => row.completionRate === 100).length;
  const completionRate = rows.length > 0 ? Math.round((mappedCount / rows.length) * 100) : 0;

  return {
    totalCount: rows.length,
    mappedCount,
    resolvedCount,
    completionRate,
    riskCount: riskRows.length,
    differentFromExistingCount: countRiskType('DIFFERENT_FROM_EXISTING'),
    setComponentMissingCount: countRiskType('SET_COMPONENT_MISSING'),
    unresolvedCount: countRiskType('SKU_UNRESOLVED'),
    noCandidateSkuCount: countRiskType('NO_CANDIDATE_SKU'),
    missingExistingSkuInfoCount: countRiskType('MAPPED_BUT_EXISTING_SKU_MISSING'),
  };
}

function createVariantExportRows({
  rows,
  product,
  newlyMappedRowKeys,
  unmappedRowKeys,
  manualSelections,
  qualityRowsByKey,
}: {
  rows: ProductVariantKeywordPreviewRow[];
  product: ProductDetail;
  newlyMappedRowKeys: Record<string, boolean>;
  unmappedRowKeys: Record<string, boolean>;
  manualSelections: VariantManualSelections;
  qualityRowsByKey: Record<string, VariantQualityRow>;
}): ProductVariantExportRow[] {
  return rows.flatMap((row, index) => {
    const rowKey = getVariantRowKey(row);
    const rowNumber = index + 1;
    const isMapped = isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys);
    const statusLabel = getVariantMatchStatusLabel(getVariantMatchStatus(row, isMapped));
    const mappedSkus = getExistingVariantSkus(row, product, unmappedRowKeys);
    const existingSku = formatExportSkuList(mappedSkus);
    const previewSkus = row.skus.map((sku) => ({
      skuCode: sku.skuCode,
      skuName: sku.skuName,
      quantity: sku.quantity,
      candidateText: `${sku.skuCode || '미확정'} / ${sku.modelCode || '-'}`,
    }));
    const manualSkus = (manualSelections[rowKey] ?? []).map((sku) => ({
      skuCode: sku.skuCode,
      skuName: sku.skuName,
      quantity: sku.quantity,
      candidateText: `${sku.skuCode} / 수동선택`,
    }));
    const candidateSkus = [...previewSkus, ...manualSkus];
    const candidateSku = candidateSkus.map((sku) => sku.candidateText).filter(Boolean).join(', ');
    const qualityRow = qualityRowsByKey[rowKey];
    const riskTypes = qualityRow?.issues.map((issue) => issue.label).join(' / ') ?? '';
    const qualityStatus = qualityRow && qualityRow.issues.length > 0 ? '검토 필요' : '정상';
    const completionRate = qualityRow?.completionRate ?? 0;
    const recommendedAction = qualityRow?.recommendedAction ?? variantQualityRecommendedActions.REVIEW_REQUIRED;
    const missingSku = qualityRow?.missingSkuText ?? '-';
    const additionalSku = qualityRow?.additionalSkuText ?? '-';
    const quantityDifference = qualityRow?.quantityDifferenceText ?? '-';

    if (candidateSkus.length === 0) {
      return [
        {
          rowNumber,
          mappingType: row.mappingType,
          itemName: row.itemName,
          serialNo: row.serialNo,
          mappingStatus: statusLabel,
          isSetProduct: row.isSetProduct,
          skuCode: '',
          skuName: '',
          quantity: row.quantity,
          existingSku,
          candidateSku: '',
          warningMessage: row.warningMessage,
          riskTypes,
          recommendedAction,
          qualityStatus,
          completionRate,
          missingSku,
          additionalSku,
          quantityDifference,
        },
      ];
    }

    return candidateSkus.map((sku) => ({
      rowNumber,
      mappingType: row.mappingType,
      itemName: row.itemName,
      serialNo: row.serialNo,
      mappingStatus: statusLabel,
      isSetProduct: row.isSetProduct,
      skuCode: sku.skuCode,
      skuName: sku.skuName,
      quantity: sku.quantity,
      existingSku,
      candidateSku,
      warningMessage: row.warningMessage,
      riskTypes,
      recommendedAction,
      qualityStatus,
      completionRate,
      missingSku,
      additionalSku,
      quantityDifference,
    }));
  });
}

function canSelectVariantRow(
  row: ProductVariantKeywordPreviewRow,
  product: ProductDetail,
  newlyMappedRowKeys: Record<string, boolean>,
  unmappedRowKeys: Record<string, boolean>,
): boolean {
  return !isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys);
}

function buildBulkApplyResultSummary({
  checkedRows,
  requestBody,
  result,
}: {
  checkedRows: ProductVariantKeywordPreviewRow[];
  requestBody: SkuKeywordManualApplyRequest;
  result: SkuKeywordManualApplyResponse;
}): BulkApplyResultSummary {
  const successMessages = new Set([
    '수동 매핑을 저장했습니다.',
    '기존 수동 매핑 수량을 업데이트했습니다.',
    '이미 같은 SKU와 수량으로 매핑되어 있습니다.',
  ]);
  const rowStatusByKey: Record<string, 'success' | 'failed'> = {};
  const failedReasons = new Set<string>();

  for (const row of checkedRows) {
    const rowKey = getVariantRowKey(row);
    const requestRow = requestBody.rows.find(
      (item) => item.mappingType === row.mappingType && item.itemId === row.itemId,
    );

    if (!requestRow || requestRow.skus.length === 0) {
      rowStatusByKey[rowKey] = 'failed';
      failedReasons.add('저장할 SKU가 없습니다.');
      continue;
    }

    const rowResults = result.results.filter(
      (item) => item.mappingType === row.mappingType && item.itemId === row.itemId,
    );

    if (rowResults.length === 0) {
      rowStatusByKey[rowKey] = 'failed';
      failedReasons.add('저장 결과를 확인할 수 없습니다.');
      continue;
    }

    const success = requestRow.skus.every((sku) =>
      rowResults.some(
        (item) =>
          item.skuId === sku.skuId &&
          item.quantity === sku.quantity &&
          successMessages.has(item.message),
      ),
    );

    rowStatusByKey[rowKey] = success ? 'success' : 'failed';
    if (!success) {
      rowResults
        .filter((item) => !successMessages.has(item.message))
        .forEach((item) => failedReasons.add(item.message));
    }
  }

  const successCandidateCount = Object.values(rowStatusByKey).filter((status) => status === 'success').length;
  const failedCandidateCount = Object.values(rowStatusByKey).filter((status) => status === 'failed').length;
  const successSkuCount = result.results.filter((item) => successMessages.has(item.message)).length;

  return {
    successCandidateCount,
    failedCandidateCount,
    successSkuCount,
    failedReasons: Array.from(failedReasons),
    rowStatusByKey,
  };
}

function ProductVariantKeywordPanel({
  product,
  onProductRefresh,
}: {
  product: ProductDetail;
  onProductRefresh: () => Promise<void>;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const candidateRowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const [variantFile, setVariantFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ProductVariantKeywordPreviewResponse | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [manualSelections, setManualSelections] = useState<VariantManualSelections>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<VariantCandidateFilter>('ALL');
  const [qualityFilter, setQualityFilter] = useState<VariantQualityFilter>('ALL');
  const [pageSize, setPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [qualityPageSize, setQualityPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [qualityCurrentPage, setQualityCurrentPage] = useState(1);
  const [pendingFocusRowKey, setPendingFocusRowKey] = useState<string | null>(null);
  const [highlightedRowKey, setHighlightedRowKey] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [unapplyingRowKeys, setUnapplyingRowKeys] = useState<Record<string, boolean>>({});
  const [newlyMappedRowKeys, setNewlyMappedRowKeys] = useState<Record<string, boolean>>({});
  const [unmappedRowKeys, setUnmappedRowKeys] = useState<Record<string, boolean>>({});
  const [lastApplySummary, setLastApplySummary] = useState<BulkApplyResultSummary | null>(null);

  const filteredRows = useMemo(
    () => filterVariantRows(preview?.rows ?? [], activeFilter, product, newlyMappedRowKeys, unmappedRowKeys),
    [activeFilter, preview, product, newlyMappedRowKeys, unmappedRowKeys],
  );
  const filteredSelectableRows = useMemo(
    () => filteredRows.filter((row) => canSelectVariantRow(row, product, newlyMappedRowKeys, unmappedRowKeys)),
    [filteredRows, product, newlyMappedRowKeys, unmappedRowKeys],
  );
  const selectableRows = useMemo(
    () => preview?.rows.filter((row) => canSelectVariantRow(row, product, newlyMappedRowKeys, unmappedRowKeys)) ?? [],
    [preview, product, newlyMappedRowKeys, unmappedRowKeys],
  );
  const totalPages = useMemo(() => getTotalPages(filteredRows.length, pageSize), [filteredRows.length, pageSize]);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = useMemo(
    () => getPaginatedRows(filteredRows, pageSize, safeCurrentPage),
    [filteredRows, pageSize, safeCurrentPage],
  );
  const currentPageSelectableRows = useMemo(
    () => paginatedRows.filter((row) => canSelectVariantRow(row, product, newlyMappedRowKeys, unmappedRowKeys)),
    [paginatedRows, product, newlyMappedRowKeys, unmappedRowKeys],
  );
  const mappedRowCount = useMemo(
    () => preview?.rows.filter((row) => isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys)).length ?? 0,
    [preview, product, newlyMappedRowKeys, unmappedRowKeys]
  );
  const checkedRows = useMemo(
    () => selectableRows.filter((row) => selectedRows[getVariantRowKey(row)]),
    [selectableRows, selectedRows],
  );
  const checkedSkuCount = getRowsSkuCount(checkedRows, manualSelections);
  const reportSummary = useMemo(
    () =>
      createVariantReportSummary({
        rows: preview?.rows ?? [],
        product,
        newlyMappedRowKeys,
        unmappedRowKeys,
        selectableRows,
      }),
    [preview, product, newlyMappedRowKeys, unmappedRowKeys, selectableRows],
  );
  const filteredReportSummary = useMemo(
    () =>
      createVariantReportSummary({
        rows: filteredRows,
        product,
        newlyMappedRowKeys,
        unmappedRowKeys,
        selectableRows: filteredSelectableRows,
      }),
    [filteredRows, product, newlyMappedRowKeys, unmappedRowKeys, filteredSelectableRows],
  );
  const qualityRows = useMemo(
    () =>
      createVariantQualityRows({
        rows: filteredRows,
        product,
        newlyMappedRowKeys,
        unmappedRowKeys,
        manualSelections,
      }),
    [filteredRows, product, newlyMappedRowKeys, unmappedRowKeys, manualSelections],
  );
  const filteredQualityRows = useMemo(
    () => filterVariantQualityRows(qualityRows, qualityFilter),
    [qualityRows, qualityFilter],
  );
  const qualitySummary = useMemo(() => createVariantQualitySummary(qualityRows), [qualityRows]);
  const qualityRowsByKey = useMemo(
    () => Object.fromEntries(qualityRows.map((row) => [row.rowKey, row])),
    [qualityRows],
  );
  const { start: paginationStart, end: paginationEnd } = getPaginationRange(
    filteredRows.length,
    pageSize,
    safeCurrentPage,
  );
  const qualityTotalPages = useMemo(
    () => getTotalPages(filteredQualityRows.length, qualityPageSize),
    [filteredQualityRows.length, qualityPageSize],
  );
  const safeQualityCurrentPage = getSafeCurrentPage(qualityCurrentPage, qualityTotalPages);
  const paginatedQualityRows = useMemo(
    () => getPaginatedRows(filteredQualityRows, qualityPageSize, safeQualityCurrentPage),
    [filteredQualityRows, qualityPageSize, safeQualityCurrentPage],
  );
  const qualityPagination = getPaginationRange(filteredQualityRows.length, qualityPageSize, safeQualityCurrentPage);

  useEffect(() => {
    if (!pendingFocusRowKey) return;
    const targetRow = candidateRowRefs.current[pendingFocusRowKey];
    if (!targetRow) return;

    targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightedRowKey(pendingFocusRowKey);
    const highlightTimer = window.setTimeout(() => setHighlightedRowKey(null), 2500);
    setPendingFocusRowKey(null);

    return () => window.clearTimeout(highlightTimer);
  }, [pendingFocusRowKey, paginatedRows]);

  const handlePreview = async () => {
    if (!variantFile) {
      setMessage({ type: 'error', text: 'ProductVariantKeyword 엑셀 파일을 선택해 주세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);
    setPreview(null);
    setSelectedRows({});
    setManualSelections({});
    setExpandedRows({});
    setUnapplyingRowKeys({});
    setNewlyMappedRowKeys({});
    setUnmappedRowKeys({});
    setLastApplySummary(null);
    setActiveFilter('ALL');
    setQualityFilter('ALL');
    setPageSize(DEFAULT_PAGE_SIZE);
    setCurrentPage(1);
    setQualityPageSize(DEFAULT_PAGE_SIZE);
    setQualityCurrentPage(1);

    try {
      const formData = new FormData();
      formData.append('variantFile', variantFile);
      formData.append('channelProductNo', product.channelProductNo ?? product.id);

      const response = await fetch('/api/sku-matching/product-variant-keyword/preview', {
        method: 'POST',
        body: formData,
      });
      const data = await readJson<ProductVariantKeywordPreviewResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'ProductVariantKeyword preview에 실패했습니다.'));
      }

      const previewResult = data as ProductVariantKeywordPreviewResponse;
      setPreview(previewResult);
      setMessage({
        type: 'success',
        text: `후보 ${previewResult.candidateCount.toLocaleString()}건, 세트상품 ${previewResult.setProductCount.toLocaleString()}건을 찾았습니다.`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : 'ProductVariantKeyword preview에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setPreviewing(false);
    }
  };

  const handleSave = async () => {
    if (checkedRows.length === 0) {
      setMessage({ type: 'error', text: '수동 확정 저장할 후보를 선택해 주세요.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const requestBody = toManualApplyRequest(checkedRows, manualSelections);
      const selectionSummary = createSelectionSummary(checkedRows, manualSelections);

      if (selectionSummary.unresolvedCount > 0) {
        setMessage({
          type: 'error',
          text: `선택 후보 중 SKU 미확정 ${selectionSummary.unresolvedCount.toLocaleString()}건이 포함되어 있습니다. 저장 전에 SKU를 확정해 주세요.`,
        });
        return;
      }

      const confirmed = window.confirm(
        [
          '선택한 후보를 수동확정하시겠습니까?',
          `선택 후보 수: ${selectionSummary.candidateCount.toLocaleString()}건`,
          `총 SKU 수: ${selectionSummary.totalSkuCount.toLocaleString()}개`,
          `세트상품 후보 수: ${selectionSummary.setCount.toLocaleString()}건`,
          `단품 후보 수: ${selectionSummary.singleCount.toLocaleString()}건`,
          `SKU 미확정 후보 수: ${selectionSummary.unresolvedCount.toLocaleString()}건`,
        ].join('\n'),
      );
      if (!confirmed) return;

      const response = await fetch('/api/sku-matching/manual-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await readJson<SkuKeywordManualApplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '수동 확정 저장에 실패했습니다.'));
      }

      const result = data as SkuKeywordManualApplyResponse;
      const applySummary = buildBulkApplyResultSummary({
        checkedRows,
        requestBody,
        result,
      });
      setLastApplySummary(applySummary);
      setNewlyMappedRowKeys((prev) => {
        const next = { ...prev };
        checkedRows.forEach((row) => {
          const rowKey = getVariantRowKey(row);
          if (applySummary.rowStatusByKey[rowKey] === 'success') next[rowKey] = true;
        });
        return next;
      });
      setUnmappedRowKeys((prev) => {
        const next = { ...prev };
        checkedRows.forEach((row) => {
          const rowKey = getVariantRowKey(row);
          if (applySummary.rowStatusByKey[rowKey] === 'success') delete next[rowKey];
        });
        return next;
      });
      setSelectedRows((current) => {
        const next = { ...current };
        checkedRows.forEach((row) => {
          const rowKey = getVariantRowKey(row);
          next[rowKey] = applySummary.rowStatusByKey[rowKey] === 'failed';
        });
        return next;
      });
      setManualSelections((current) => {
        const next = { ...current };
        checkedRows.forEach((row) => {
          const rowKey = getVariantRowKey(row);
          if (applySummary.rowStatusByKey[rowKey] === 'success') delete next[rowKey];
        });
        return next;
      });
      setMessage({
        type: applySummary.failedCandidateCount > 0 ? 'error' : 'success',
        text:
          `수동 확정 저장 완료: 성공 후보 ${applySummary.successCandidateCount.toLocaleString()}건, ` +
          `실패 후보 ${applySummary.failedCandidateCount.toLocaleString()}건, 성공 SKU ${applySummary.successSkuCount.toLocaleString()}개.`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수동 확정 저장에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!preview) {
      setMessage({ type: 'error', text: '다운로드할 ProductVariantKeyword preview 결과가 없습니다.' });
      return;
    }

    setExporting(true);
    setMessage(null);

    try {
      const rows = createVariantExportRows({
        rows: preview.rows,
        product,
        newlyMappedRowKeys,
        unmappedRowKeys,
        manualSelections,
        qualityRowsByKey,
      });
      const response = await fetch('/api/sku-matching/product-variant-keyword/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelProductNo: product.channelProductNo ?? product.id,
          productName: product.name,
          summary: filteredReportSummary,
          rows,
          qualityRows: qualityRows.map((row) => ({
            rowNumber: row.rowNumber,
            mappingType: row.mappingType,
            itemName: row.itemName,
            serialNo: row.serialNo,
            isSetProduct: row.isSetProduct,
            isMapped: row.isMapped,
            existingSkuText: row.existingSkuText,
            candidateSkuText: row.candidateSkuText,
            existingSkuCount: row.existingSkuCount,
            candidateSkuCount: row.candidateSkuCount,
            completionRate: row.completionRate,
            riskTypes: row.issues.map((issue) => issue.label).join(' / '),
            qualityMessage: row.issues.map((issue) => issue.message).join(' / '),
            recommendedAction: row.recommendedAction,
            missingSkuText: row.missingSkuText,
            additionalSkuText: row.additionalSkuText,
            quantityDifferenceText: row.quantityDifferenceText,
          })),
          qualitySummary,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          const data = await readJson<{ error: string }>(response);
          throw new Error(getErrorMessage(data, '매핑 현황 Excel 다운로드에 실패했습니다.'));
        }
        throw new Error('매핑 현황 Excel 다운로드에 실패했습니다.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `product-variant-keyword-${product.channelProductNo ?? product.id}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: '매핑 현황 Excel 다운로드를 시작했습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '매핑 현황 Excel 다운로드에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setExporting(false);
    }
  };

  const handleViewCandidate = (rowKey: string) => {
    const targetIndex = filteredRows.findIndex((row) => getVariantRowKey(row) === rowKey);
    if (targetIndex < 0) return;

    const targetPage =
      pageSize === 'ALL' ? 1 : Math.floor(targetIndex / pageSize) + 1;

    setExpandedRows((current) => ({
      ...current,
      [rowKey]: true,
    }));
    setCurrentPage(targetPage);
    setPendingFocusRowKey(rowKey);
  };

  const applySelectionPreset = (preset: VariantSelectionPreset) => {
    if (!preview) return;

    if (preset === 'CLEAR') {
      setSelectedRows({});
      return;
    }

    const baseRows = filteredSelectableRows;
    const targetRows =
      preset === 'FILTER_ALL'
        ? baseRows
        : preset === 'PAGE'
          ? currentPageSelectableRows
        : preset === 'RESOLVED'
          ? baseRows.filter((row) => getRowApplySkuCount(row, manualSelections) > 0)
          : preset === 'SINGLE'
            ? baseRows.filter((row) => !row.isSetProduct)
            : baseRows.filter((row) => row.isSetProduct);

    setSelectedRows((current) => ({
      ...current,
      ...Object.fromEntries(targetRows.map((row) => [getVariantRowKey(row), true])),
    }));
  };

  const handleUnapply = async (row: ProductVariantKeywordPreviewRow) => {
    const rowKey = getVariantRowKey(row);
    const confirmed = window.confirm('이 후보의 SKU 매핑을 해제하시겠습니까?');
    if (!confirmed) return;

    setUnapplyingRowKeys((current) => ({ ...current, [rowKey]: true }));
    setMessage(null);

    try {
      const response = await fetch('/api/sku-matching/manual-unapply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mappingType: row.mappingType,
          itemId: row.itemId,
        }),
      });
      const data = await readJson<SkuKeywordManualUnapplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '수동 매핑해제에 실패했습니다.'));
      }

      const result = data as SkuKeywordManualUnapplyResponse;
      setNewlyMappedRowKeys((current) => {
        const next = { ...current };
        delete next[rowKey];
        return next;
      });
      setUnmappedRowKeys((current) => ({ ...current, [rowKey]: true }));
      setSelectedRows((current) => ({ ...current, [rowKey]: false }));
      setManualSelections((current) => {
        const next = { ...current };
        delete next[rowKey];
        return next;
      });

      try {
        await onProductRefresh();
      } catch {
        setMessage({
          type: 'success',
          text: '매핑해제는 완료됐지만 상품 상세 갱신에 실패했습니다. 새로고침하면 최신 상태를 확인할 수 있습니다.',
        });
        return;
      }

      setMessage({
        type: 'success',
        text:
          `매핑해제 완료: SKU 매핑 ${result.deletedCount.toLocaleString()}건 삭제` +
          `${result.directCleared ? ', 직접 연결 1건 해제' : ''}.`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수동 매핑해제에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setUnapplyingRowKeys((current) => ({ ...current, [rowKey]: false }));
    }
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
    setManualSelections((current) => ({
      ...current,
      [rowKey]: (current[rowKey] ?? []).filter((sku) => sku.id !== skuId),
    }));
  };

  const changeManualSkuQuantity = (rowKey: string, skuId: string, quantity: number) => {
    const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
    setManualSelections((current) => ({
      ...current,
      [rowKey]: (current[rowKey] ?? []).map((sku) => (sku.id === skuId ? { ...sku, quantity: safeQuantity } : sku)),
    }));
  };

  return (
    <section className="rounded-lg border border-[#262629] bg-[#121214] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">ProductVariantKeyword 매칭 후보</h2>
          <p className="mt-1 text-sm text-zinc-400">
            상품번호 {product.channelProductNo ?? product.id}의 옵션/추가상품 이력을 preview로 확인합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-[#333] bg-[#1a1a1e] px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white"
          >
            <FileSpreadsheet className="h-4 w-4" />
            파일 선택
          </button>
          <button
            type="button"
            onClick={handlePreview}
            disabled={previewing || !variantFile}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-60"
          >
            {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Preview
          </button>

        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={(event) => {
          setVariantFile(event.target.files?.[0] ?? null);
          setPreview(null);
          setSelectedRows({});
          setManualSelections({});
          setExpandedRows({});
          setUnapplyingRowKeys({});
          setUnmappedRowKeys({});
          setActiveFilter('ALL');
          setQualityFilter('ALL');
          setPageSize(DEFAULT_PAGE_SIZE);
          setCurrentPage(1);
          setQualityPageSize(DEFAULT_PAGE_SIZE);
          setQualityCurrentPage(1);
          setMessage(null);
        }}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
        <span className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-3 py-2">
          {variantFile ? variantFile.name : '선택된 파일 없음'}
        </span>
        {preview && (
          <>
            <span>후보 {preview.candidateCount.toLocaleString()}건</span>
            <span>세트 {preview.setProductCount.toLocaleString()}건</span>
            <span>미해석 {preview.unresolvedCount.toLocaleString()}건</span>
            <span className="font-semibold text-emerald-300">
              선택된 후보 {checkedRows.length.toLocaleString()}개 / 총 SKU {checkedSkuCount.toLocaleString()}개
            </span>
          </>
        )}
      </div>

      {message && (
        <div className="mt-4">
          <MessageBox message={message} />
        </div>
      )}

      {lastApplySummary && (
        <div className="mt-4 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">수동확정 결과 요약</p>
              <p className="mt-1 text-xs text-zinc-500">
                성공 후보 {lastApplySummary.successCandidateCount.toLocaleString()}건 / 실패 후보{' '}
                {lastApplySummary.failedCandidateCount.toLocaleString()}건 / 성공 SKU{' '}
                {lastApplySummary.successSkuCount.toLocaleString()}개
              </p>
            </div>
            {lastApplySummary.failedReasons.length > 0 && (
              <div className="max-w-2xl text-xs text-red-300">
                실패 사유: {lastApplySummary.failedReasons.join(' | ')}
              </div>
            )}
          </div>
        </div>
      )}

      {preview && (
        <div className="mt-5 space-y-4">
          <VariantReportCards summary={reportSummary} />
          <VariantQualitySection
            summary={qualitySummary}
            rows={paginatedQualityRows}
            totalCount={filteredQualityRows.length}
            pageSize={qualityPageSize}
            currentPage={safeQualityCurrentPage}
            totalPages={qualityTotalPages}
            paginationStart={qualityPagination.start}
            paginationEnd={qualityPagination.end}
            activeFilter={qualityFilter}
            onPageSizeChange={(value) => {
              setQualityPageSize(value);
              setQualityCurrentPage(1);
            }}
            onPageChange={setQualityCurrentPage}
            onFilterChange={(filter) => {
              setQualityFilter(filter);
              setQualityCurrentPage(1);
            }}
            onViewCandidate={handleViewCandidate}
          />

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {variantCandidateFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter.key);
                    setCurrentPage(1);
                    setQualityCurrentPage(1);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    activeFilter === filter.key
                      ? 'bg-zinc-100 text-zinc-950'
                      : 'border border-[#333] bg-[#1a1a1e] text-zinc-300 hover:border-indigo-500/60 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applySelectionPreset('FILTER_ALL')}
                disabled={filteredSelectableRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                현재 필터 전체 선택
              </button>
              <button
                type="button"
                onClick={() => applySelectionPreset('PAGE')}
                disabled={currentPageSelectableRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                현재 페이지 선택
              </button>
              <button
                type="button"
                onClick={() => applySelectionPreset('RESOLVED')}
                disabled={filteredSelectableRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                SKU 확정 후보만 선택
              </button>
              <button
                type="button"
                onClick={() => applySelectionPreset('SINGLE')}
                disabled={filteredSelectableRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                단품 후보만 선택
              </button>
              <button
                type="button"
                onClick={() => applySelectionPreset('SET')}
                disabled={filteredSelectableRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                세트상품 후보만 선택
              </button>
              <button
                type="button"
                onClick={() => applySelectionPreset('CLEAR')}
                disabled={checkedRows.length === 0}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
              >
                선택 해제
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <PageSizeSelect
              value={pageSize}
              onChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}
            />
            <PaginationControls
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              start={paginationStart}
              end={paginationEnd}
              totalCount={filteredRows.length}
              onChangePage={setCurrentPage}
            />
          </div>

          <div className="text-xs text-zinc-500">
            선택 상태는 페이지 이동 후 유지됩니다. 필터를 바꿔 화면에서 보이지 않는 후보도 선택 상태는 남아 있으며, “선택 해제”를 누르면 전체 선택 상태를 모두 해제합니다.
          </div>

          {/* ProductVariantKeyword 액션바 - 스크롤 박스 바깥 */}
          <div className="sticky top-4 z-30 mb-3 flex items-center justify-between rounded-lg border border-blue-500/30 bg-[#121214] px-4 py-3 shadow-lg shadow-black/30">
            <div className="text-sm text-zinc-300">
              현재 필터 후보 {filteredRows.length}개 · 선택 {checkedRows.length}개 · 매핑완료 {mappedRowCount}개
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled={exporting}
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                매핑 현황 엑셀 다운로드
              </button>
              <button
                type="button"
                disabled={checkedRows.length === 0 || saving}
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                선택 후보 수동확정
              </button>
            </div>
          </div>

          <div className="mb-2 text-sm text-zinc-400">
            이 영역 안에서 좌우로 스크롤하여 SKU 상세를 확인할 수 있습니다.
          </div>
          <div className="rounded-lg border border-[#262629] bg-[#121214]">
            <div className="max-h-[70vh] overflow-auto pb-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#0c0c0e] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-600" style={{ scrollbarWidth: 'auto' }}>
              <table className="min-w-[2400px] table-fixed text-left text-sm relative w-full">
                <thead className="bg-[#0c0c0e]">
                  <tr>
                    <th className="sticky left-0 top-0 z-40 w-[72px] min-w-[72px] px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">No.</th>
                    <th className="sticky left-[72px] top-0 z-40 w-[56px] min-w-[56px] px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">선택</th>
                    <th className="sticky left-[128px] top-0 z-40 w-[96px] min-w-[96px] px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">구분</th>
                    <th className="sticky left-[224px] top-0 z-40 w-[420px] min-w-[420px] px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] shadow-[6px_0_12px_rgba(0,0,0,0.35)] border-r border-[#262629]">옵션/추가상품명</th>
                    <th className="sticky top-0 z-20 w-24 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">원본 일련번호</th>
                    <th className="sticky top-0 z-20 w-28 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">유형</th>
                    <th className="sticky top-0 z-20 w-32 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">SKU 개수</th>
                    <th className="sticky top-0 z-20 w-32 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">매칭 상태</th>
                    <th className="sticky top-0 z-20 w-28 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">관리</th>
                    <th className="sticky top-0 z-20 w-20 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] whitespace-nowrap">펼치기</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {paginatedRows.map((row, index) => {
                  const rowKey = getVariantRowKey(row);
                  const rowNumber = getRowNumber(index, safeCurrentPage, pageSize);
                  const isMapped = isRowMapped(row, product, newlyMappedRowKeys, unmappedRowKeys);
                  const selectable = canSelectVariantRow(row, product, newlyMappedRowKeys, unmappedRowKeys);
                  const expanded = expandedRows[rowKey] ?? false;
                  const resolvedSkuCount = getResolvedSkuCount(row);
                  const manualSkuCount = manualSelections[rowKey]?.length ?? 0;
                  const mappedSkus = getExistingVariantSkus(row, product, unmappedRowKeys);
                  const unapplying = unapplyingRowKeys[rowKey] ?? false;
                  const matchStatus = getVariantMatchStatus(row, isMapped);
                  const lastApplyStatus = lastApplySummary?.rowStatusByKey[rowKey];

                  return (
                    <Fragment key={rowKey}>
                      <tr
                        ref={(element) => {
                          candidateRowRefs.current[rowKey] = element;
                        }}
                        className={`align-top group hover:bg-[#16161a] ${
                          highlightedRowKey === rowKey ? 'bg-indigo-500/10 ring-1 ring-inset ring-indigo-400/40' : ''
                        }`}
                      >
                        <td className="sticky left-0 z-20 px-4 py-3 font-mono text-xs text-zinc-400 bg-[#121214] group-hover:bg-[#16161a]">
                          {rowNumber}
                        </td>
                        <td className="sticky left-[72px] z-20 px-4 py-3 bg-[#121214] group-hover:bg-[#16161a]">
                          <div className="flex flex-col gap-1 items-start">
                            <input
                              type="checkbox"
                              checked={selectedRows[rowKey] ?? false}
                              disabled={!selectable}
                              onChange={(event) =>
                                setSelectedRows((current) => ({
                                  ...current,
                                  [rowKey]: event.target.checked,
                                }))
                              }
                              className="h-4 w-4 rounded border-zinc-600 bg-[#0c0c0e] disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label="ProductVariantKeyword 후보 선택"
                              title={
                                isMapped
                                  ? '이미 매핑된 후보입니다'
                                  : resolvedSkuCount === 0 && manualSkuCount === 0
                                    ? '상세에서 수동 SKU를 추가하면 저장할 수 있습니다'
                                    : ''
                              }
                            />
                            {isMapped && (
                              <span className="inline-flex rounded-md bg-emerald-500/10 px-1 py-0.5 text-[9px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 leading-none">
                                매핑완료
                              </span>
                            )}
                            {lastApplyStatus === 'failed' && (
                              <span className="inline-flex rounded-md bg-red-500/10 px-1 py-0.5 text-[9px] font-semibold text-red-300 ring-1 ring-inset ring-red-500/20 leading-none">
                                저장실패
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="sticky left-[128px] z-20 px-4 py-3 text-xs text-zinc-300 bg-[#121214] group-hover:bg-[#16161a]">{row.mappingType}</td>
                        <td className="sticky left-[224px] z-20 px-4 py-3 bg-[#121214] group-hover:bg-[#16161a] shadow-[6px_0_12px_rgba(0,0,0,0.35)] border-r border-[#262629]">
                          <div className="text-sm font-medium text-zinc-100">{row.itemName}</div>
                          {row.warningMessage && (
                            <div className="mt-1 text-xs text-amber-200">{row.warningMessage}</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                          {row.serialNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <SetTypeBadge isSetProduct={row.isSetProduct} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div
                            className={`text-sm font-semibold ${
                              row.isSetProduct ? 'text-violet-200' : 'text-zinc-300'
                            }`}
                          >
                            {resolvedSkuCount.toLocaleString()}개 SKU
                          </div>
                          {manualSkuCount > 0 && (
                            <div className="mt-1 text-xs font-semibold text-emerald-300">
                              수동 {manualSkuCount.toLocaleString()}개
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <VariantStatusBadge status={matchStatus} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {isMapped ? (
                            <button
                              type="button"
                              onClick={() => void handleUnapply(row)}
                              disabled={unapplying}
                              className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {unapplying ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              매핑해제
                            </button>
                          ) : (
                            <span className="text-xs text-zinc-500">-</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedRows((current) => ({
                                ...current,
                                [rowKey]: !expanded,
                              }))
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1e] text-zinc-200 transition hover:border-indigo-500/60 hover:text-white"
                            aria-label="ProductVariantKeyword 후보 상세 펼치기"
                          >
                            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr key={`${rowKey}:detail`} className="bg-[#0f0f12]">
                          <td colSpan={10} className="px-4 py-4">
                            <VariantCandidateDetail
                              row={row}
                              isMapped={isMapped}
                              mappedSkus={mappedSkus}
                              onUnapply={() => void handleUnapply(row)}
                              unapplying={unapplying}
                              selectedSkus={manualSelections[rowKey] ?? []}
                              onAddManualSku={(candidate) => addManualSku(rowKey, candidate)}
                              onRemoveManualSku={(skuId) => removeManualSku(rowKey, skuId)}
                              onManualSkuQuantityChange={(skuId, quantity) =>
                                changeManualSkuQuantity(rowKey, skuId, quantity)
                              }
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
          {filteredRows.length === 0 && (
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">
              필터 조건에 맞는 후보가 없습니다.
            </div>
          )}
          {filteredRows.length > 0 && (
            <div className="mt-3 rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
              <PaginationControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                start={paginationStart}
                end={paginationEnd}
                totalCount={filteredRows.length}
                onChangePage={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

async function fetchProductDetail(productId: string): Promise<ProductDetail> {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) throw new Error('상품을 찾을 수 없습니다.');
  return (await response.json()) as ProductDetail;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [optionsPageSize, setOptionsPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [optionsCurrentPage, setOptionsCurrentPage] = useState(1);
  const [additionalsPageSize, setAdditionalsPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [additionalsCurrentPage, setAdditionalsCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshProduct = useCallback(
    async () => {
      if (!productId) return;
      const data = await fetchProductDetail(productId);
      setProduct(data);
      setError('');
    },
    [productId],
  );

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;

    fetchProductDetail(productId)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setError('');
      })
      .catch((fetchError: Error) => {
        if (cancelled) return;
        setError(fetchError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || '상품을 찾을 수 없습니다.'}</p>
        <button type="button" onClick={() => router.back()} className="text-sm text-indigo-400 hover:underline">
          돌아가기
        </button>
      </div>
    );
  }

  const mappedCount = product.options.filter((option) => option.skuMappings.length > 0 || option.skuId).length;
  const unmappedCount = product.options.length - mappedCount;
  const optionsTotalPages = getTotalPages(product.options.length, optionsPageSize);
  const safeOptionsCurrentPage = getSafeCurrentPage(optionsCurrentPage, optionsTotalPages);
  const paginatedOptions = getPaginatedRows(product.options, optionsPageSize, safeOptionsCurrentPage);
  const optionsPagination = getPaginationRange(product.options.length, optionsPageSize, safeOptionsCurrentPage);
  const additionalsTotalPages = getTotalPages(product.additionals.length, additionalsPageSize);
  const safeAdditionalsCurrentPage = getSafeCurrentPage(additionalsCurrentPage, additionalsTotalPages);
  const paginatedAdditionals = getPaginatedRows(
    product.additionals,
    additionalsPageSize,
    safeAdditionalsCurrentPage,
  );
  const additionalsPagination = getPaginationRange(
    product.additionals.length,
    additionalsPageSize,
    safeAdditionalsCurrentPage,
  );

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <button
          type="button"
          onClick={() => router.push('/dashboard/products')}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-[#1a1a1e] hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          상품 목록으로 돌아가기
        </button>

        <section className="rounded-lg border border-[#262629] bg-[#121214] p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-bold tracking-tight text-white">{product.name}</h1>
              <p className="mt-1 text-sm text-zinc-500">{product.smartstore.name}</p>
            </div>
            <StatusBadge status={product.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-[#1e1e22] bg-[#0c0c0e] p-4">
              <p className="text-[11px] font-medium text-zinc-500">채널상품번호</p>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-200">
                {product.channelProductNo ?? '-'}
              </p>
            </div>
            <div className="rounded-lg border border-[#1e1e22] bg-[#0c0c0e] p-4">
              <p className="text-[11px] font-medium text-zinc-500">원상품번호</p>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-200">{product.naverProductId}</p>
            </div>
            <div className="rounded-lg border border-[#1e1e22] bg-[#0c0c0e] p-4">
              <p className="text-[11px] font-medium text-zinc-500">옵션 수</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">{product.options.length.toLocaleString()}개</p>
            </div>
            <div className="rounded-lg border border-[#1e1e22] bg-[#0c0c0e] p-4">
              <p className="text-[11px] font-medium text-zinc-500">옵션 SKU 매핑률</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">
                {product.options.length > 0 ? `${Math.round((mappedCount / product.options.length) * 100)}%` : '-'}
                <span className="ml-1 text-xs text-zinc-500">
                  ({mappedCount}/{product.options.length})
                </span>
              </p>
            </div>
          </div>
        </section>

        <ProductVariantKeywordPanel product={product} onProductRefresh={refreshProduct} />

        <section className="rounded-lg border border-[#262629] bg-[#121214] p-6">
          <h2 className="mb-3 text-lg font-semibold text-white">단일상품 연결 SKU</h2>
          <div className="rounded-lg border border-[#1e1e22] bg-[#0c0c0e] px-4 py-3 font-mono text-sm text-emerald-300">
            {formatSkuMappings(product.skuMappings, product.sku)}
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
          <div className="flex items-center justify-between border-b border-[#262629] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              옵션 목록
              <span className="ml-2 text-sm font-normal text-zinc-500">({product.options.length}건)</span>
            </h2>
            {unmappedCount > 0 && <MappingPill text={`미매핑 ${unmappedCount}건`} mapped={false} />}
          </div>

          {product.options.length === 0 ? (
            <div className="py-16 text-center text-sm text-zinc-400">등록된 옵션이 없습니다.</div>
          ) : (
            <div className="space-y-3">
              <div className="px-6 pt-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <PageSizeSelect
                    value={optionsPageSize}
                    onChange={(value) => {
                      setOptionsPageSize(value);
                      setOptionsCurrentPage(1);
                    }}
                  />
                  <PaginationControls
                    currentPage={safeOptionsCurrentPage}
                    totalPages={optionsTotalPages}
                    pageSize={optionsPageSize}
                    start={optionsPagination.start}
                    end={optionsPagination.end}
                    totalCount={product.options.length}
                    onChangePage={setOptionsCurrentPage}
                  />
                </div>
              </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">No.</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션명</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션값</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션코드</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">재고</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {paginatedOptions.map((option, index) => {
                    const mapped = option.skuMappings.length > 0 || Boolean(option.skuId && option.sku);
                    return (
                      <tr key={option.id} className="transition hover:bg-[#16161a]">
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-400">
                          {getRowNumber(index, safeOptionsCurrentPage, optionsPageSize)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-200">{option.optionName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-zinc-400">{option.optionValue}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-500">
                          {option.optionCode ?? '-'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-zinc-300">
                          {option.sku ? option.sku.stockQuantity.toLocaleString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <MappingPill text={mapped ? formatSkuMappings(option.skuMappings, option.sku) : '미매핑'} mapped={mapped} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
              <div className="px-6 pb-4">
                <PaginationControls
                  currentPage={safeOptionsCurrentPage}
                  totalPages={optionsTotalPages}
                  pageSize={optionsPageSize}
                  start={optionsPagination.start}
                  end={optionsPagination.end}
                  totalCount={product.options.length}
                  onChangePage={setOptionsCurrentPage}
                />
              </div>
            </div>
          )}
        </section>

        {product.additionals.length > 0 && (
          <section className="overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
            <div className="border-b border-[#262629] px-6 py-4">
              <h2 className="text-lg font-semibold text-white">추가상품 정보</h2>
            </div>
            <div className="space-y-3">
              <div className="px-6 pt-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <PageSizeSelect
                    value={additionalsPageSize}
                    onChange={(value) => {
                      setAdditionalsPageSize(value);
                      setAdditionalsCurrentPage(1);
                    }}
                  />
                  <PaginationControls
                    currentPage={safeAdditionalsCurrentPage}
                    totalPages={additionalsTotalPages}
                    pageSize={additionalsPageSize}
                    start={additionalsPagination.start}
                    end={additionalsPagination.end}
                    totalCount={product.additionals.length}
                    onChangePage={setAdditionalsCurrentPage}
                  />
                </div>
              </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">No.</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">항목</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">값</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">판매자관리코드</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {paginatedAdditionals.map((additional, index) => (
                    <tr key={additional.id} className="transition hover:bg-[#16161a]">
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-400">
                        {getRowNumber(index, safeAdditionalsCurrentPage, additionalsPageSize)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-200">
                        {additional.additionalName}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{additional.additionalValue}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-500">
                        {additional.sellerManagementCode ?? '-'}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-emerald-300">
                        {formatSkuMappings(additional.skuMappings, additional.sku)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              <div className="px-6 pb-4">
                <PaginationControls
                  currentPage={safeAdditionalsCurrentPage}
                  totalPages={additionalsTotalPages}
                  pageSize={additionalsPageSize}
                  start={additionalsPagination.start}
                  end={additionalsPagination.end}
                  totalCount={product.additionals.length}
                  onChangePage={setAdditionalsCurrentPage}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
