'use client';

import { useMemo, useRef, useState } from 'react';
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
import type { SkuKeywordHydrateIssueCode } from '@/src/types/sku-keyword-draft-hydrate.types';
import type {
  SkuKeywordDraftPreviewRequest,
  SkuKeywordDraftPreviewResponse,
  SkuKeywordDraftBatchPreview,
  SkuKeywordDraftBatchPreviewItem,
  SkuKeywordDraftBatchPreviewSummary,
  SkuKeywordDraftBatchDryRunPreviewRequest,
  SkuKeywordDraftBatchDryRunPreviewResponse,
} from '@/src/types/sku-keyword-draft-preview.types';
import type { SkuKeywordBulkLikeCandidate } from '@/src/types/sku-keyword-bulk-like-candidate.types';
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
import type {
  OptionCurrentContextPreviewResponse,
  OptionCurrentContextPreviewRow,
} from '@/src/types/option-current-context.types';
import { WARNING_REASON_MAP } from '@/src/types/sku-keyword-matching.types';

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
type DraftCandidateFilter =
  | 'ALL'
  | 'DRAFT_CREATABLE'
  | 'NEEDS_CONTEXT'
  | 'READY_FOR_REVIEW'
  | 'SET_PRODUCT'
  | 'PRICE_CHANGE'
  | 'STOCK_CHANGE'
  | 'HAS_RISK'
  | 'OPTION'
  | 'ADDITIONAL'
  | 'UPLOAD_OPTION_CONTEXT'
  | 'CURRENT_PRICE_UNAVAILABLE'
  | 'CURRENT_STOCK_UNAVAILABLE';

const mappingTypeLabels: Record<string, string> = {
  PRODUCT: '단일상품',
  OPTION: '옵션',
  ADDITIONAL: '추가상품',
};

const draftCandidateFilterLabels: Record<DraftCandidateFilter, string> = {
  ALL: '전체',
  DRAFT_CREATABLE: '생성 가능',
  NEEDS_CONTEXT: '문맥 부족',
  READY_FOR_REVIEW: '검토 준비',
  SET_PRODUCT: '세트 상품',
  PRICE_CHANGE: '가격 변경',
  STOCK_CHANGE: '재고 변경',
  HAS_RISK: '위험 후보',
  OPTION: '옵션 (OPTION)',
  ADDITIONAL: '추가상품 (ADDITIONAL)',
  UPLOAD_OPTION_CONTEXT: '업로드 문맥 보강',
  CURRENT_PRICE_UNAVAILABLE: '가격 문맥 없음',
  CURRENT_STOCK_UNAVAILABLE: '재고 문맥 없음',
};

const draftHydrateIssueLabels: Record<SkuKeywordHydrateIssueCode, string> = {
  SKU_NOT_FOUND: 'SKU를 찾지 못함',
  TARGET_NOT_FOUND: '대상 상품 문맥 없음',
  TARGET_CHANNEL_PRODUCT_MISMATCH: '대상 상품과 채널상품번호 불일치',
  STORE_CONTEXT_UNAVAILABLE: '스마트스토어 문맥 없음',
  CHANNEL_ID_UNAVAILABLE: '채널 ID 보조 문맥 미확인 (정보)',
  CURRENT_PRICE_UNAVAILABLE: '현재 가격 문맥 없음',
  CURRENT_STOCK_UNAVAILABLE: '현재 재고 문맥 없음',
};

const draftHydrateIssueHints: Record<SkuKeywordHydrateIssueCode, string> = {
  SKU_NOT_FOUND: 'SKU 마스터, 별칭, 바코드 연결 상태를 먼저 확인해 주세요.',
  TARGET_NOT_FOUND: '스마트스토어 상품, 옵션, 추가상품이 현재 DB에 수집되어 있는지 확인해 주세요.',
  TARGET_CHANNEL_PRODUCT_MISMATCH: 'channelProductNo와 itemId가 같은 상품 문맥을 가리키는지 다시 확인해 주세요.',
  STORE_CONTEXT_UNAVAILABLE: '스마트스토어 연결 정보와 상품-스토어 관계를 먼저 확인해 주세요.',
  CHANNEL_ID_UNAVAILABLE: 'naverChannelId의 공식 출처가 아직 확인되지 않아 정보성 경고로만 표시됩니다. Draft 판정은 channelProductNo/originProductNo와 현재 가격·재고 문맥을 우선 사용합니다.',
  CURRENT_PRICE_UNAVAILABLE: '상품·옵션 currentSalePrice 또는 추가상품 price가 필요합니다. 스마트스토어 문맥 준비 상태에서 준비율을 확인해 주세요.',
  CURRENT_STOCK_UNAVAILABLE: '상품·옵션 currentStockQuantity 또는 추가상품 stockQuantity가 필요합니다. 스마트스토어 문맥 준비 상태에서 준비율을 확인해 주세요.',
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
      ? 'bg-emerald-500/10 tms-success-text ring-emerald-500/20'
      : type === 'OPTION'
        ? 'bg-sky-500/10 tms-link ring-sky-500/20'
        : 'bg-violet-500/10 tms-badge-text ring-violet-500/20';

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
      ? 'bg-emerald-500/10 tms-success-text ring-emerald-500/20'
      : pct >= 70
        ? 'bg-amber-500/10 tms-warning-text ring-amber-500/20'
        : 'bg-red-500/10 tms-danger-text ring-red-500/20';

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
          ? 'bg-emerald-500/10 tms-success-text ring-emerald-500/20'
          : 'bg-amber-500/10 tms-warning-text ring-amber-500/20'
      }`}
    >
      {eligible ? '가능' : '검토'}
    </span>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ?? 'border-[#262629] bg-[#0c0c0e]'}`}>
      <p className="tms-text-muted text-[11px] font-medium">{label}</p>
      <p className="tms-text-primary mt-1 text-2xl font-semibold">{value.toLocaleString()}</p>
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

function CountBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-3 py-2">
      <p className="tms-text-muted text-[11px] font-medium">{label}</p>
      <p className="tms-text-primary mt-1 text-base font-semibold">{value.toLocaleString()}</p>
    </div>
  );
}

function CountList({
  title,
  counts,
}: {
  title: string;
  counts: Record<string, number>;
}) {
  const entries = Object.entries(counts).filter(([, value]) => value > 0);

  return (
    <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
      <p className="tms-text-primary text-sm font-semibold">{title}</p>
      {entries.length === 0 ? (
        <p className="tms-text-muted mt-3 text-xs">집계된 항목이 없습니다.</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {entries.map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-md border border-[#262629] bg-[#121214] px-2.5 py-1 text-xs tms-text-primary"
            >
              <span className="tms-text-muted font-mono text-[11px]">{key}</span>
              <span className="tms-text-primary font-semibold">{value.toLocaleString()}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function filterDraftCandidates(
  candidates: SkuKeywordDraftPreviewResponse['candidates'],
  filter: DraftCandidateFilter,
): SkuKeywordDraftPreviewResponse['candidates'] {
  if (filter === 'DRAFT_CREATABLE') {
    return candidates.filter((candidate) => candidate.draftCreatable);
  }
  if (filter === 'NEEDS_CONTEXT') {
    return candidates.filter((candidate) => candidate.status === 'NEEDS_CONTEXT');
  }
  if (filter === 'READY_FOR_REVIEW') {
    return candidates.filter((candidate) => candidate.status === 'READY_FOR_REVIEW');
  }
  if (filter === 'SET_PRODUCT') {
    return candidates.filter((candidate) => candidate.isSetProduct);
  }
  if (filter === 'PRICE_CHANGE') {
    return candidates.filter((candidate) => candidate.hasPriceChange);
  }
  if (filter === 'STOCK_CHANGE') {
    return candidates.filter((candidate) => candidate.hasStockChange);
  }
  if (filter === 'HAS_RISK') {
    return candidates.filter((candidate) => candidate.riskMessages.length > 0);
  }
  if (filter === 'OPTION') {
    return candidates.filter((candidate) => candidate.candidateType === 'OPTION');
  }
  if (filter === 'ADDITIONAL') {
    return candidates.filter((candidate) => candidate.candidateType === 'ADDITIONAL');
  }
  if (filter === 'UPLOAD_OPTION_CONTEXT') {
    return candidates.filter((candidate) => candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW');
  }
  if (filter === 'CURRENT_PRICE_UNAVAILABLE') {
    return candidates.filter((candidate) => candidate.issues.some((issue) => issue.code === 'CURRENT_PRICE_UNAVAILABLE'));
  }
  if (filter === 'CURRENT_STOCK_UNAVAILABLE') {
    return candidates.filter((candidate) => candidate.issues.some((issue) => issue.code === 'CURRENT_STOCK_UNAVAILABLE'));
  }
  return candidates;
}

function getDraftCandidateSelectionReason(
  candidate: SkuKeywordDraftPreviewResponse['candidates'][number],
): string {
  if (candidate.draftCreatable) return '';
  if (candidate.reviewMessage.trim().length > 0) return candidate.reviewMessage;
  if (candidate.recommendedAction.trim().length > 0) return candidate.recommendedAction;
  if (candidate.riskMessages.length > 0) return candidate.riskMessages[0];
  return 'draftCreatable=false 후보는 아직 선택할 수 없습니다.';
}

function getDraftCandidateSkuText(
  candidate: SkuKeywordDraftPreviewResponse['candidates'][number],
): string {
  const skuCodes = [...candidate.linkedSkus, ...candidate.bundleSkus]
    .map((sku) => sku.skuCode)
    .filter((skuCode, index, values) => skuCode.trim().length > 0 && values.indexOf(skuCode) === index);

  return skuCodes.length > 0 ? skuCodes.join(', ') : '-';
}

function getDraftCandidateIssueMessages(
  candidate: SkuKeywordDraftPreviewResponse['candidates'][number],
): string[] {
  const issueMessages = candidate.issues
    .map((issue) => issue.message?.trim() || issue.code?.trim() || '')
    .filter((message) => message.length > 0);

  const riskMessages = candidate.riskMessages.filter((message) => message.trim().length > 0);
  return Array.from(new Set([...issueMessages, ...riskMessages]));
}

function getHydrateIssueEntries(
  counts: Partial<Record<SkuKeywordHydrateIssueCode, number>>,
): Array<{ code: SkuKeywordHydrateIssueCode; count: number }> {
  return (Object.entries(counts) as Array<[SkuKeywordHydrateIssueCode, number | undefined]>)
    .filter((entry): entry is [SkuKeywordHydrateIssueCode, number] => (entry[1] ?? 0) > 0)
    .sort((left, right) => right[1] - left[1])
    .map(([code, count]) => ({ code, count }));
}

function buildDraftBatchPreview(selectedCandidates: SkuKeywordBulkLikeCandidate[]): SkuKeywordDraftBatchPreview {
  const summary: SkuKeywordDraftBatchPreviewSummary = {
    selectedCount: selectedCandidates.length,
    executableCount: 0,
    blockedCount: 0,
    riskCount: 0,
    priceChangeCount: 0,
    stockChangeCount: 0,
    optionCount: 0,
    additionalCount: 0,
    singleCount: 0,
    uploadContextCount: 0,
    dbContextCount: 0,
  };

  const items: SkuKeywordDraftBatchPreviewItem[] = selectedCandidates.map(candidate => {
    let targetType: SkuKeywordDraftBatchPreviewItem['targetType'] = 'UNKNOWN';
    if (candidate.candidateType === 'PRODUCT') targetType = 'SINGLE';
    else if (candidate.candidateType === 'OPTION') targetType = 'OPTION';
    else if (candidate.candidateType === 'ADDITIONAL') targetType = 'ADDITIONAL';

    let changeType: SkuKeywordDraftBatchPreviewItem['changeType'] = 'UNKNOWN';
    if (candidate.hasPriceChange && candidate.hasStockChange) changeType = 'PRICE_AND_STOCK';
    else if (candidate.hasPriceChange) changeType = 'PRICE';
    else if (candidate.hasStockChange) changeType = 'STOCK';

    const blockedReasons: string[] = [];
    if (!candidate.draftCreatable) {
      blockedReasons.push('draftCreatable=false (시스템 차단)');
    }
    if (candidate.status === 'NEEDS_CONTEXT') {
      blockedReasons.push('문맥 부족 (NEEDS_CONTEXT)');
    }
    if (candidate.issues.some(i => i.code === 'CURRENT_PRICE_UNAVAILABLE')) {
      blockedReasons.push('현재 가격 문맥 없음');
    }
    if (candidate.issues.some(i => i.code === 'CURRENT_STOCK_UNAVAILABLE')) {
      blockedReasons.push('현재 재고 문맥 없음');
    }

    const warnings: string[] = [];
    if (candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') {
      warnings.push('업로드 파일 기준 현재값 보강 (실제 스토어값 다를 수 있음)');
    }
    candidate.riskMessages.forEach(msg => warnings.push(`위험: ${msg}`));
    candidate.issues.forEach(i => {
      if (i.code === 'CHANNEL_ID_UNAVAILABLE') {
        warnings.push('채널 ID 정보 없음 (CHANNEL_ID_UNAVAILABLE)');
      }
    });

    const executable = blockedReasons.length === 0;

    let riskLevel: SkuKeywordDraftBatchPreviewItem['riskLevel'] = 'LOW';
    if (blockedReasons.length > 0) riskLevel = 'HIGH';
    else if (warnings.length > 0) riskLevel = 'MEDIUM';

    if (executable) summary.executableCount++;
    else summary.blockedCount++;

    if (riskLevel === 'HIGH' || riskLevel === 'MEDIUM') summary.riskCount++;
    if (changeType === 'PRICE' || changeType === 'PRICE_AND_STOCK') summary.priceChangeCount++;
    if (changeType === 'STOCK' || changeType === 'PRICE_AND_STOCK') summary.stockChangeCount++;
    if (targetType === 'OPTION') summary.optionCount++;
    else if (targetType === 'ADDITIONAL') summary.additionalCount++;
    else if (targetType === 'SINGLE') summary.singleCount++;

    if (candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW') summary.uploadContextCount++;
    else summary.dbContextCount++;

    return {
      candidateId: candidate.id,
      targetType,
      changeType,
      executable,
      blockedReasons,
      warnings,
      riskLevel,
      sourceSummary: candidate.currentStateSource || 'UNKNOWN',
      before: {
        price: candidate.currentSmartstorePrice,
        stock: candidate.currentSmartstoreStock,
      },
      after: {
        price: candidate.calculatedTargetPrice,
        stock: candidate.calculatedTargetStock,
      }
    };
  });

  return { summary, items };
}

function DraftPreviewPanel({
  result,
}: {
  result: SkuKeywordDraftPreviewResponse;
}) {
  const [activeFilter, setActiveFilter] = useState<DraftCandidateFilter>('ALL');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [jsonMessage, setJsonMessage] = useState<Message | null>(null);
  const [isDryRunLoading, setIsDryRunLoading] = useState(false);
  const [dryRunResult, setDryRunResult] = useState<SkuKeywordDraftBatchDryRunPreviewResponse | null>(null);
  
  const filteredCandidates = useMemo(
    () => filterDraftCandidates(result.candidates, activeFilter),
    [activeFilter, result.candidates],
  );
  const validCandidateIdSet = useMemo(
    () => new Set(result.candidates.map((candidate) => candidate.id)),
    [result.candidates],
  );
  const selectedCandidateIdsInResult = useMemo(
    () => selectedCandidateIds.filter((candidateId) => validCandidateIdSet.has(candidateId)),
    [selectedCandidateIds, validCandidateIdSet],
  );
  const selectedCandidateIdSet = useMemo(
    () => new Set(selectedCandidateIdsInResult),
    [selectedCandidateIdsInResult],
  );
  const filterCounts = useMemo<Record<DraftCandidateFilter, number>>(
    () => ({
      ALL: result.candidates.length,
      DRAFT_CREATABLE: result.candidates.filter((candidate) => candidate.draftCreatable).length,
      NEEDS_CONTEXT: result.candidates.filter((candidate) => candidate.status === 'NEEDS_CONTEXT').length,
      READY_FOR_REVIEW: result.candidates.filter((candidate) => candidate.status === 'READY_FOR_REVIEW').length,
      SET_PRODUCT: result.candidates.filter((candidate) => candidate.isSetProduct).length,
      PRICE_CHANGE: result.candidates.filter((candidate) => candidate.hasPriceChange).length,
      STOCK_CHANGE: result.candidates.filter((candidate) => candidate.hasStockChange).length,
      HAS_RISK: result.candidates.filter((candidate) => candidate.riskMessages.length > 0).length,
      OPTION: result.candidates.filter((candidate) => candidate.candidateType === 'OPTION').length,
      ADDITIONAL: result.candidates.filter((candidate) => candidate.candidateType === 'ADDITIONAL').length,
      UPLOAD_OPTION_CONTEXT: result.candidates.filter((candidate) => candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW').length,
      CURRENT_PRICE_UNAVAILABLE: result.candidates.filter((candidate) => candidate.issues.some((issue) => issue.code === 'CURRENT_PRICE_UNAVAILABLE')).length,
      CURRENT_STOCK_UNAVAILABLE: result.candidates.filter((candidate) => candidate.issues.some((issue) => issue.code === 'CURRENT_STOCK_UNAVAILABLE')).length,
    }),
    [result.candidates],
  );
  const filteredSelectableCandidates = useMemo(
    () => filteredCandidates.filter((candidate) => candidate.draftCreatable),
    [filteredCandidates],
  );
  const filteredSelectedCount = useMemo(
    () => filteredCandidates.filter((candidate) => selectedCandidateIdSet.has(candidate.id)).length,
    [filteredCandidates, selectedCandidateIdSet],
  );
  const filteredDisabledCount = filteredCandidates.length - filteredSelectableCandidates.length;
  const selectedCandidates = useMemo(
    () => result.candidates.filter((candidate) => selectedCandidateIdSet.has(candidate.id)),
    [result.candidates, selectedCandidateIdSet],
  );
  const selectedCandidateTypeCounts = useMemo<Record<string, number>>(
    () =>
      selectedCandidates.reduce<Record<string, number>>((accumulator, candidate) => {
        accumulator[candidate.candidateType] = (accumulator[candidate.candidateType] ?? 0) + 1;
        return accumulator;
      }, {}),
    [selectedCandidates],
  );
  const selectedTargetTypeCounts = useMemo<Record<string, number>>(
    () =>
      selectedCandidates.reduce<Record<string, number>>((accumulator, candidate) => {
        accumulator[candidate.sourceMappingType] = (accumulator[candidate.sourceMappingType] ?? 0) + 1;
        return accumulator;
      }, {}),
    [selectedCandidates],
  );
  const selectedReviewSummary = useMemo(
    () => ({
      selectedCount: selectedCandidates.length,
      draftCreatableCount: selectedCandidates.filter((candidate) => candidate.draftCreatable).length,
      priceChangeCount: selectedCandidates.filter((candidate) => candidate.hasPriceChange).length,
      stockChangeCount: selectedCandidates.filter((candidate) => candidate.hasStockChange).length,
      riskOrIssueCount: selectedCandidates.filter(
        (candidate) => candidate.riskMessages.length > 0 || candidate.issues.length > 0,
      ).length,
    }),
    [selectedCandidates],
  );
  const reviewPayload = useMemo(() => {
    const items = selectedCandidates.map((candidate) => ({
      candidateId: candidate.id,
      candidateType: candidate.candidateType,
      targetType: candidate.sourceMappingType,
      channelProductNo: candidate.channelProductNo,
      itemId: candidate.itemId,
      optionId: candidate.candidateType === 'OPTION' ? candidate.itemId : null,
      additionalProductId: candidate.candidateType === 'ADDITIONAL' ? candidate.itemId : null,
      skuCode: getDraftCandidateSkuText(candidate),
      skuName: candidate.productName ?? null,
      productName: candidate.productName,
      itemName: candidate.itemName,
      draftCreatable: candidate.draftCreatable,
      priceChange: candidate.hasPriceChange,
      stockChange: candidate.hasStockChange,
      issues: getDraftCandidateIssueMessages(candidate),
      recommendedAction: candidate.recommendedAction,
      reviewMessage: candidate.reviewMessage,
    }));

    return {
      schemaVersion: 1,
      source: 'sku-keyword-matching',
      selectedCount: items.length,
      createdAt: new Date().toISOString(),
      items,
    };
  }, [selectedCandidates]);
  const reviewPayloadText = useMemo(() => JSON.stringify(reviewPayload, null, 2), [reviewPayload]);
  const batchPreview = useMemo(() => buildDraftBatchPreview(selectedCandidates), [selectedCandidates]);
  
  const handleServerDryRun = async () => {
    try {
      setIsDryRunLoading(true);
      setJsonMessage(null);
      const response = await fetch('/api/sku-matching/draft-batch-dry-run-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidates: selectedCandidates } satisfies SkuKeywordDraftBatchDryRunPreviewRequest),
      });

      const data = (await response.json()) as SkuKeywordDraftBatchDryRunPreviewResponse;
      if (!response.ok) {
        throw new Error(String(data) || '서버 오류가 발생했습니다.');
      }
      setDryRunResult(data);
      setJsonMessage({ type: 'success', text: '서버 기반 Dry-run 검증을 완료했습니다.' });
    } catch (error) {
      setJsonMessage({ type: 'error', text: getErrorMessage(error, 'Dry-run 서버 검증 중 오류가 발생했습니다.') });
    } finally {
      setIsDryRunLoading(false);
    }
  };

  const hydrateIssueEntries = useMemo(
    () => getHydrateIssueEntries(result.issueSummary.hydrateIssueCounts),
    [result.issueSummary.hydrateIssueCounts],
  );
  const topHydrateIssueEntries = hydrateIssueEntries.slice(0, 3);
  const totalHydrateIssueCount = useMemo(
    () => hydrateIssueEntries.reduce((sum, entry) => sum + entry.count, 0),
    [hydrateIssueEntries],
  );

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidateIds((current) =>
      current.includes(candidateId)
        ? current.filter((currentId) => currentId !== candidateId)
        : [...current, candidateId],
    );
  };

  const handleSelectFilteredSelectable = () => {
    const selectableIds = filteredSelectableCandidates.map((candidate) => candidate.id);
    setSelectedCandidateIds((current) => {
      const next = new Set(current);
      selectableIds.forEach((candidateId) => next.add(candidateId));
      return Array.from(next);
    });
  };

  const handleClearFilteredSelection = () => {
    const filteredIds = new Set(filteredCandidates.map((candidate) => candidate.id));
    setSelectedCandidateIds((current) => current.filter((candidateId) => !filteredIds.has(candidateId)));
  };

  const handleClearAllSelection = () => {
    setSelectedCandidateIds([]);
  };

  const handleCopyReviewJson = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setJsonMessage({ type: 'error', text: '클립보드 복사를 지원하지 않는 환경입니다.' });
      return;
    }

    try {
      await navigator.clipboard.writeText(reviewPayloadText);
      setJsonMessage({ type: 'success', text: '검토용 JSON을 클립보드에 복사했습니다.' });
    } catch {
      setJsonMessage({ type: 'error', text: '검토용 JSON 복사에 실패했습니다.' });
    }
  };

  const handleDownloadReviewJson = () => {
    try {
      const blob = new Blob([reviewPayloadText], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sku-keyword-draft-review-payload.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJsonMessage({ type: 'success', text: '검토용 JSON 파일 다운로드를 시작했습니다.' });
    } catch {
      setJsonMessage({ type: 'error', text: '검토용 JSON 다운로드를 시작하지 못했습니다.' });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-[#262629] bg-[#121214] p-6">
      <div>
        <h3 className="tms-text-primary text-lg font-semibold">Draft 후보 미리보기 결과</h3>
        <p className="tms-text-muted mt-1 text-sm">
          아직 Draft Batch는 생성하지 않고, 후보 전환 결과만 검토합니다.
        </p>
      </div>

      <div className="rounded-lg border border-[#262629] bg-[#121214] p-5">
        <h4 className="text-lg font-semibold text-white">
          총 후보 {result.summary.bulkLikeCandidateCount.toLocaleString()}건 중{' '}
          <span className="tms-success-text">{result.summary.draftCreatableCount.toLocaleString()}건</span> Draft 생성 가능
        </h4>
        <p className="mt-2 text-sm text-zinc-400">
          {result.summary.needsContextCount > 0 && (
            <span className="tms-warning-text font-medium">{result.summary.needsContextCount.toLocaleString()}건은 현재 가격/재고 문맥이 부족합니다. </span>
          )}
          위험 후보: {result.candidates.filter(c => c.riskTypes.length > 0).length.toLocaleString()}건.
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          가격 변경: {result.summary.priceChangeCandidateCount.toLocaleString()}건,{' '}
          재고 변경: {result.summary.stockChangeCandidateCount.toLocaleString()}건.
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          OPTION 현재 문맥 파일로 보강된 후보: {result.candidates.filter(c => c.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW').length.toLocaleString()}건
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <CountBadge label="전체 후보 수" value={result.summary.bulkLikeCandidateCount} />
        <CountBadge label="Draft 가능" value={result.summary.draftCreatableCount} />
        <CountBadge label="단일 상품" value={result.summary.singleProductCount} />
        <CountBadge label="세트 후보" value={result.summary.setProductCount} />
        <CountBadge label="OPTION 후보" value={result.candidates.filter(c => c.candidateType === 'OPTION').length} />
        <CountBadge label="ADDITIONAL" value={result.candidates.filter(c => c.candidateType === 'ADDITIONAL').length} />
        <CountBadge label="문맥 필요" value={result.summary.needsContextCount} />
        <CountBadge label="가격+재고 변경" value={result.summary.priceAndStockChangeCandidateCount} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <CountList
          title="hydrate issue 집계"
          counts={result.issueSummary.hydrateIssueCounts}
        />
        <CountList
          title="bulk-like risk 집계"
          counts={result.issueSummary.bulkLikeRiskCounts}
        />
        <CountList
          title="상태 집계"
          counts={result.issueSummary.statusCounts}
        />
      </div>

      {result.summary.draftCreatableCount === 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="tms-warning-text mt-0.5 h-4 w-4 shrink-0" />
            <div className="space-y-3">
              <div>
                <p className="tms-warning-text text-sm font-semibold">Draft 가능 후보가 아직 없습니다.</p>
                <p className="tms-warning-text mt-1 text-xs opacity-90">
                  현재 후보는 모두 필수 문맥이 부족하거나 위험 이슈가 남아 있어 Draft 후보로 올리지 않습니다.
                  아래 주요 이슈와 해결 힌트를 먼저 확인해 주세요.
                </p>
              </div>
              {topHydrateIssueEntries.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topHydrateIssueEntries.map((entry) => (
                    <span
                      key={entry.code}
                      className="inline-flex items-center gap-2 rounded-md border border-amber-500/20 bg-[#121214] px-2.5 py-1 text-xs tms-warning-text"
                    >
                      <span className="font-mono text-[11px]">{entry.code}</span>
                      <span>{entry.count.toLocaleString()}건</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="tms-text-primary text-sm font-semibold">issue 해결 힌트</p>
            <p className="tms-text-muted mt-1 text-xs">
              현재 DB와 Prisma 모델 기준으로 자동 보강할 수 없는 문맥은 issue로 유지됩니다.
            </p>
          </div>
          <div className="rounded-md border border-[#262629] bg-[#121214] px-3 py-2 text-xs tms-text-primary">
            현재 hydrate issue 합계: {totalHydrateIssueCount.toLocaleString()}건
          </div>
        </div>

        {hydrateIssueEntries.length === 0 ? (
          <p className="tms-text-muted mt-3 text-xs">표시할 hydrate issue가 없습니다.</p>
        ) : (
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {hydrateIssueEntries.map((entry) => (
              <div
                key={entry.code}
                className="rounded-lg border border-[#262629] bg-[#121214] p-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tms-badge-subtle rounded-md border px-2 py-0.5 font-mono text-[11px]">
                        {entry.code}
                      </span>
                      <span className="tms-text-primary text-sm font-semibold">
                        {draftHydrateIssueLabels[entry.code]}
                      </span>
                    </div>
                    <p className="tms-text-muted mt-2 text-xs">
                      해결 힌트: {draftHydrateIssueHints[entry.code]}
                    </p>
                    {[
                      'CHANNEL_ID_UNAVAILABLE',
                      'CURRENT_PRICE_UNAVAILABLE',
                      'CURRENT_STOCK_UNAVAILABLE',
                    ].includes(entry.code) && (
                      <div className="mt-3">
                        <a
                          href="/dashboard/smartstores"
                          className="tms-button tms-button-secondary inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition hover:bg-[#1a1a1e]"
                        >
                          스마트스토어 문맥 상태 확인
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="tms-badge-subtle rounded-md border px-2.5 py-1 text-xs font-semibold">
                    {entry.count.toLocaleString()}건
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="tms-text-primary text-sm font-semibold">후보 필터</p>
              <p className="tms-text-muted mt-1 text-xs">
                전체 summary와 issueSummary는 전체 기준으로 유지되고, 아래 목록만 필터링됩니다.
              </p>
            </div>
            <div className="rounded-md border border-[#262629] bg-[#121214] px-3 py-2 text-xs tms-text-primary">
              현재 필터: {draftCandidateFilterLabels[activeFilter]} ·{' '}
              {filteredCandidates.length.toLocaleString()}건
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(draftCandidateFilterLabels) as DraftCandidateFilter[]).map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`tms-button inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? 'tms-button-accent'
                      : 'tms-button-muted'
                  }`}
                >
                  <span>{draftCandidateFilterLabels[filter]}</span>
                  <span className="tms-badge-subtle rounded-md px-1.5 py-0.5 font-mono text-[11px]">
                    {filterCounts[filter].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="tms-text-primary text-sm font-semibold">후보 선택</p>
            <p className="tms-text-muted mt-1 text-xs">
              선택 상태는 화면 state로만 유지되며, Draft 생성이나 DB 저장은 아직 하지 않습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSelectFilteredSelectable}
              disabled={filteredSelectableCandidates.length === 0}
              className="tms-button tms-button-secondary inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              현재 필터 선택 가능 후보 전체 선택
            </button>
            <button
              type="button"
              onClick={handleClearFilteredSelection}
              disabled={filteredSelectedCount === 0}
              className="tms-button tms-button-muted inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              현재 필터 선택 해제
            </button>
            <button
              type="button"
              onClick={handleClearAllSelection}
              disabled={selectedCandidateIdsInResult.length === 0}
              className="tms-button tms-button-muted inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              전체 선택 해제
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <CountBadge label="전체 후보 수" value={result.candidates.length} />
          <CountBadge label="현재 필터 후보 수" value={filteredCandidates.length} />
          <CountBadge label="현재 필터 선택 가능" value={filteredSelectableCandidates.length} />
          <CountBadge label="현재 필터 선택됨" value={filteredSelectedCount} />
          <CountBadge label="전체 선택됨" value={selectedCandidateIdsInResult.length} />
          <CountBadge label="현재 필터 선택 불가" value={filteredDisabledCount} />
        </div>

        <div className="rounded-lg border border-[#262629] bg-[#121214] px-4 py-3 text-xs tms-text-primary">
          현재 필터: {filteredCandidates.length.toLocaleString()}건 · 선택 가능:{' '}
          {filteredSelectableCandidates.length.toLocaleString()}건 · 선택됨:{' '}
          {filteredSelectedCount.toLocaleString()}건
        </div>

        <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="tms-text-primary text-sm font-semibold">선택된 후보 목록</p>
            <p className="tms-text-muted text-xs">필터를 바꿔도 선택은 유지됩니다.</p>
          </div>
          {selectedCandidates.length === 0 ? (
            <p className="tms-text-muted mt-3 text-sm">선택된 후보가 없습니다.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {selectedCandidates.map((candidate) => (
                <div
                  key={`selected-${candidate.id}`}
                  className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-3 py-3 text-xs"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="tms-text-muted font-mono text-[11px]">{candidate.id}</p>
                      <p className="tms-text-primary mt-1 font-semibold">
                        {candidate.candidateType} · {candidate.channelProductNo}
                      </p>
                      <p className="tms-row-text mt-1">
                        SKU: {getDraftCandidateSkuText(candidate)} · draftCreatable:{' '}
                        {candidate.draftCreatable ? 'true' : 'false'} · 주요 issue {candidate.issues.length}건
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCandidateSelection(candidate.id)}
                      className="tms-button tms-button-muted inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition"
                    >
                      선택 해제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="tms-text-primary text-sm font-semibold">선택 후보 검토</p>
            <p className="tms-text-muted mt-1 text-xs">
              실제 Draft Batch 생성 전, 현재 선택 후보를 검토용 payload 형태로만 확인합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleServerDryRun()}
              disabled={selectedCandidates.length === 0 || isDryRunLoading}
              className="tms-button tms-button-primary inline-flex items-center justify-center rounded-lg border border-indigo-500/50 bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDryRunLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
              Dry-run 서버 검증
            </button>
            <button
              type="button"
              onClick={() => void handleCopyReviewJson()}
              disabled={selectedCandidates.length === 0}
              className="tms-button tms-button-secondary inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              JSON 복사
            </button>
            <button
              type="button"
              onClick={handleDownloadReviewJson}
              disabled={selectedCandidates.length === 0}
              className="tms-button tms-button-accent inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              JSON 다운로드
            </button>
          </div>
        </div>

        {jsonMessage && (
          <div
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
              jsonMessage.type === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/20 bg-red-500/10 text-red-300'
            }`}
          >
            {jsonMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            {jsonMessage.text}
          </div>
        )}

        {selectedCandidates.length === 0 ? (
          <div className="rounded-lg border border-[#262629] bg-[#121214] px-4 py-6 text-sm tms-text-muted">
            <p>선택된 Draft 후보가 없습니다.</p>
            <p className="mt-1">draftCreatable 후보를 선택하면 검토용 payload가 표시됩니다.</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              {selectedReviewSummary.selectedCount > selectedReviewSummary.draftCreatableCount && (
                <div className="mb-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  <AlertTriangle className="mr-2 inline-block h-4 w-4" />
                  선택한 후보 중 {selectedReviewSummary.selectedCount - selectedReviewSummary.draftCreatableCount}건은 Draft 생성 불가 상태(문맥 부족/위험)입니다. JSON payload에는 포함되지만 실제 생성은 차단됩니다.
                </div>
              )}
              {selectedReviewSummary.riskOrIssueCount > 0 && (
                <div className="mb-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  <AlertTriangle className="mr-2 inline-block h-4 w-4" />
                  선택한 후보 중 {selectedReviewSummary.riskOrIssueCount}건에 위험(Risk) 또는 이슈(Issue)가 존재합니다. 검토가 필요합니다.
                </div>
              )}
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              <CountBadge label="선택된 후보 수" value={selectedReviewSummary.selectedCount} />
              <CountBadge label="생성 가능" value={selectedReviewSummary.draftCreatableCount} />
              <CountBadge label="생성 불가" value={selectedReviewSummary.selectedCount - selectedReviewSummary.draftCreatableCount} />
              <CountBadge label="위험/이슈 포함" value={selectedReviewSummary.riskOrIssueCount} />
              <CountBadge label="가격 변경" value={selectedReviewSummary.priceChangeCount} />
              <CountBadge label="재고 변경" value={selectedReviewSummary.stockChangeCount} />
            </div>

            <div className="mt-6 rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-5">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="text-indigo-400 mt-1 h-5 w-5 shrink-0" />
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-base font-semibold text-indigo-300">Server Dry-run Preview</h4>
                    {dryRunResult && dryRunResult.summary.executableCount !== batchPreview.summary.executableCount && (
                      <span className="rounded-md bg-rose-500/20 px-2 py-1 text-xs font-semibold text-rose-300">
                        주의: 프론트 예측치와 서버 결과가 다릅니다. 서버 기준 결과를 우선하세요.
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-indigo-200/80">
                    실제 Batch 작업으로 변환 가능한 후보인지 <strong>서버 기준으로 검토한 결과</strong>입니다.<br/>
                    이 결과는 서버 기준 dry-run 검토입니다. DB 저장, Batch 생성, 네이버 API 호출은 수행하지 않았습니다.
                  </p>

                  {!dryRunResult ? (
                    <div className="mt-4 rounded-md border border-indigo-500/20 bg-[#121214] p-4 text-center text-sm text-indigo-300/60">
                      상단의 [Dry-run 서버 검증] 버튼을 눌러 서버 검토 결과를 확인해 주세요.
                    </div>
                  ) : (
                    <>
                      {dryRunResult.summary.blockedCount > 0 && (
                        <div className="mt-3 rounded-md bg-amber-500/10 p-3 border border-amber-500/20">
                          <p className="text-sm font-semibold text-amber-300">⚠️ 주의: 선택 후보 중 {dryRunResult.summary.blockedCount.toLocaleString()}건은 dry-run 작업으로도 넘길 수 없습니다.</p>
                          <p className="mt-1 text-xs text-amber-200/80">먼저 현재 가격/재고 문맥을 보강하거나 후보 선택에서 제외하세요.</p>
                        </div>
                      )}

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <CountBadge label="실행 가능 후보 수" value={dryRunResult.summary.executableCount} />
                        <CountBadge label="차단 후보 수" value={dryRunResult.summary.blockedCount} />
                        <CountBadge label="위험 후보 수" value={dryRunResult.summary.riskCount} />
                        <CountBadge label="OPTION 후보 수" value={dryRunResult.summary.optionCount} />
                        <CountBadge label="업로드 문맥 보강 수" value={dryRunResult.summary.uploadContextCount} />
                      </div>
                      
                      {dryRunResult.summary.blockedCount > 0 && (
                        <div className="mt-3 text-xs text-indigo-200/60">
                          <strong>주요 차단 사유:</strong> {Array.from(new Set(dryRunResult.items.flatMap((i: SkuKeywordDraftBatchDryRunPreviewResponse['items'][0]) => i.blockedReasons))).join(' / ')}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 mt-4">
              <CountList title="candidateType별 개수" counts={selectedCandidateTypeCounts} />
              <CountList title="targetType별 개수" counts={selectedTargetTypeCounts} />
            </div>

            <div className="mt-4 rounded-lg border border-[#262629] bg-[#121214] p-4">
              <p className="tms-text-primary text-sm font-semibold">후보별 상세 검토 목록</p>
              <div className="mt-3 space-y-3">
                {selectedCandidates.map((candidate) => {
                  const issueMessages = getDraftCandidateIssueMessages(candidate);
                  return (
                    <div
                      key={`review-${candidate.id}`}
                      className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4"
                    >
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <p className="tms-text-muted font-mono text-[11px]">{candidate.id}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                            {candidate.draftCreatable ? (
                              <span className="tms-success-text border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">생성 가능</span>
                            ) : candidate.status === 'NEEDS_CONTEXT' ? (
                              <span className="tms-warning-text border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">문맥 부족</span>
                            ) : (
                              <span className="tms-warning-text border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">검토 필요</span>
                            )}
                            
                            {candidate.riskTypes.length > 0 && (
                              <span className="tms-danger-text border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">위험</span>
                            )}
                            
                            {candidate.hasPriceChange && candidate.hasStockChange ? (
                              <span className="tms-badge-text border border-violet-500/20 bg-violet-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">가격+재고 변경</span>
                            ) : candidate.hasPriceChange ? (
                              <span className="tms-badge-text border border-violet-500/20 bg-violet-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">가격 변경</span>
                            ) : candidate.hasStockChange ? (
                              <span className="tms-badge-text border border-violet-500/20 bg-violet-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">재고 변경</span>
                            ) : null}

                            <span className="tms-link border border-sky-500/20 bg-sky-500/10 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                              {candidate.candidateType === 'PRODUCT' ? '단일 상품' : candidate.candidateType}
                            </span>
                            
                            {candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW' ? (
                              <span className="tms-badge-subtle border border-[#555] bg-[#333] px-1.5 py-0.5 rounded text-[10px] font-semibold">업로드 문맥 보강</span>
                            ) : (
                              <span className="text-zinc-500 border border-[#333] bg-[#111] px-1.5 py-0.5 rounded text-[10px] font-semibold">DB 문맥 사용</span>
                            )}

                            {candidate.issues.some(i => i.code === 'CHANNEL_ID_UNAVAILABLE') && (
                              <span className="text-zinc-400 border border-[#444] bg-[#222] px-1.5 py-0.5 rounded text-[10px] font-semibold">CHANNEL ID 미확인</span>
                            )}
                          </div>
                          <p className="tms-text-primary mt-1 text-sm font-semibold">
                            {candidate.productName ?? '-'} / {candidate.itemName ?? '-'}
                          </p>
                          <p className="tms-row-text mt-1 text-xs">
                            상품번호: {candidate.channelProductNo} · 항목ID: {candidate.itemId}
                          </p>
                          {candidate.candidateType === 'OPTION' && (
                            <p className="tms-text-muted mt-1 text-[11px]">optionId: {candidate.itemId}</p>
                          )}
                          {candidate.candidateType === 'ADDITIONAL' && (
                            <p className="tms-text-muted mt-1 text-[11px]">additionalProductId: {candidate.itemId}</p>
                          )}
                          <p className="tms-text-muted mt-1 text-[11px]">
                            SKU: {getDraftCandidateSkuText(candidate)}
                          </p>
                          {candidate.currentStateSyncedAt && (
                            <p className="tms-text-muted mt-1 text-[11px]">
                              동기화: {new Date(candidate.currentStateSyncedAt).toLocaleString('ko-KR')} ({candidate.currentStateSource ?? '미지정'})
                            </p>
                          )}
                        </div>
                        <div className="tms-row-text grid gap-2 text-xs sm:grid-cols-2 lg:min-w-[320px] rounded-lg border border-[#262629] bg-[#121214] p-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500">현재 가격</span>
                            <span className="font-semibold">{formatMaybe(candidate.currentSmartstorePrice)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500">목표 가격</span>
                            <span className="font-semibold">{formatMaybe(candidate.calculatedTargetPrice)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500">현재 재고</span>
                            <span className="font-semibold">{formatMaybe(candidate.currentSmartstoreStock)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500">목표 재고</span>
                            <span className="font-semibold">{formatMaybe(candidate.calculatedTargetStock)}</span>
                          </div>
                        </div>
                      </div>

                      {candidate.currentStateSource === 'UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW' && (
                        <div className="mt-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3">
                          <p className="text-xs font-semibold text-indigo-300">OPTION 업로드 문맥 적용 완료</p>
                          <p className="mt-1 text-[11px] text-indigo-200/80">
                            이 후보는 업로드된 OPTION 현재 문맥 엑셀 파일을 기준으로 현재 가격과 재고가 보강되었습니다.<br/>
                            {candidate.warningMessage && candidate.warningMessage.includes('업로드 파일 Preview 기준') && (
                              <span className="text-amber-300 mt-1 block">⚠️ 주의: 업로드 파일 기준 현재값이므로 실제 스마트스토어 최신값과 다를 수 있습니다.</span>
                            )}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-col gap-2">
                        {issueMessages.length > 0 ? (
                          <div className="space-y-1">
                            {issueMessages.map((message, index) => (
                              <div
                                key={`${candidate.id}-issue-${index}`}
                                className="inline-flex rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[11px] text-amber-200"
                              >
                                {message}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <span className="inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200">
                              주요 issue 없음
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="tms-text-muted mt-3 space-y-1 text-xs">
                        {candidate.recommendedAction && <p>권장 조치: {candidate.recommendedAction}</p>}
                        {candidate.reviewMessage && <p className="whitespace-pre-wrap">검토 메모: {candidate.reviewMessage}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <details className="mt-4 rounded-lg border border-[#262629] bg-[#121214]">
              <summary className="tms-text-primary cursor-pointer list-none p-4 text-sm font-semibold hover:bg-[#1a1a1e] transition-colors rounded-lg">
                검토용 JSON 미리보기 (클릭하여 펼치기)
                <span className="ml-2 text-xs font-normal text-zinc-500">
                  선택된 {selectedReviewSummary.selectedCount}건의 원본 후보 정보를 확인하기 위한 것입니다. Batch dry-run 미리보기와 달리, 차단된 정보도 포함됩니다.
                </span>
              </summary>
              <div className="border-t border-[#262629] p-4">
                <pre className="tms-row-text overflow-x-auto rounded-lg border border-[#262629] bg-[#0c0c0e] p-4 text-xs">
                  {reviewPayloadText}
                </pre>
              </div>
            </details>
          </>
        )}
      </div>

      <details className="rounded-lg border border-[#262629] bg-[#0c0c0e]">
        <summary className="tms-text-primary cursor-pointer list-none px-4 py-3 text-sm font-semibold">
          후보 목록 보기 ({filteredCandidates.length.toLocaleString()}건)
        </summary>
        <div className="space-y-3 border-t border-[#262629] p-4">
          {filteredCandidates.length === 0 ? (
            <p className="tms-text-muted text-sm">생성된 후보가 없습니다.</p>
          ) : (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="rounded-lg border border-[#262629] bg-[#121214] p-4">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="tms-badge-subtle inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[11px]">
                        <input
                          type="checkbox"
                          checked={selectedCandidateIdSet.has(candidate.id)}
                          disabled={!candidate.draftCreatable}
                          onChange={() => toggleCandidateSelection(candidate.id)}
                          className="h-3.5 w-3.5 rounded border-[#444] bg-transparent"
                        />
                        선택
                      </label>
                      <MappingTypeBadge type={candidate.candidateType} />
                      <span className="tms-badge-subtle rounded-md px-2 py-0.5 text-[11px] font-medium">
                        {candidate.status}
                      </span>
                      <span className="tms-badge-subtle rounded-md px-2 py-0.5 text-[11px] font-medium">
                        {candidate.draftCreatable ? 'Draft 가능' : 'Draft 불가'}
                      </span>
                    </div>
                    <p className="tms-text-primary mt-2 text-sm font-semibold">
                      {candidate.productName ?? '-'}
                    </p>
                    <p className="tms-row-text mt-1 text-sm">{candidate.itemName ?? '-'}</p>
                    <p className="tms-text-muted mt-1 font-mono text-xs">
                      {candidate.channelProductNo} · {candidate.itemId}
                    </p>
                    {candidate.currentStateSyncedAt && (
                      <p className="tms-text-muted mt-1 text-[11px]">
                        동기화: {new Date(candidate.currentStateSyncedAt).toLocaleString('ko-KR')} ({candidate.currentStateSource ?? '미지정'})
                      </p>
                    )}
                    {!candidate.draftCreatable && (
                      <p className="tms-warning-text mt-2 text-xs">
                        선택 불가 사유: {getDraftCandidateSelectionReason(candidate)}
                      </p>
                    )}
                  </div>
                  <div className="tms-text-muted grid gap-1 text-xs sm:grid-cols-2 lg:min-w-[260px]">
                    <span>현재가: {formatMaybe(candidate.currentSmartstorePrice)}</span>
                    <span>목표가: {formatMaybe(candidate.calculatedTargetPrice)}</span>
                    <span>현재재고: {formatMaybe(candidate.currentSmartstoreStock)}</span>
                    <span>목표재고: {formatMaybe(candidate.calculatedTargetStock)}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {candidate.riskMessages.length > 0 ? candidate.riskMessages.map((message, index) => (
                    <span
                      key={`${candidate.id}-risk-${index}`}
                      className="tms-warning-text inline-flex rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[11px]"
                    >
                      {message}
                    </span>
                  )) : (
                    <span className="tms-success-text inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px]">
                      위험 없음
                    </span>
                  )}
                  <span className="tms-badge-subtle inline-flex rounded-md border px-2 py-1 text-[11px]">
                    주요 issue {candidate.issues.length}건
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </details>
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
      <label htmlFor={id} className="tms-text-muted text-xs font-medium">
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
            <tr key={`${row.itemId}-${row.barcode}-${index}`} className="tms-table-row">
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                {getRowNumber(index, safeCurrentPage, pageSize)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <MappingTypeBadge type={row.mappingType} />
              </td>
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                {formatMaybe(row.channelProductNo)}
              </td>
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">{row.itemId}</td>
              <td className="tms-row-text max-w-72 px-4 py-3">{formatMaybe(row.sourceText)}</td>
              <td className="tms-link max-w-48 px-4 py-3">{formatMaybe(row.matchedKeyword)}</td>
              <td className="tms-row-text whitespace-nowrap px-4 py-3 font-mono text-xs">
                {formatMaybe(row.barcode)}
              </td>
              <td className="tms-success-text whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold">
                {formatMaybe(row.skuCode)}
              </td>
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 text-xs">{row.matchMethod}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <ConfidenceBadge confidence={row.confidence} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <ApplyEligibleBadge eligible={row.applyEligible} />
              </td>
              <td className="tms-row-text max-w-80 px-4 py-3">{formatMaybe(row.reviewReason)}</td>
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
    return <div className="tms-text-muted text-xs">선택된 SKU 없음</div>;
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
          className="tms-control h-9 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none transition focus:border-indigo-400"
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

      {error && <p className="tms-danger-text text-xs">{error}</p>}

      {results.length > 0 && (
        <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-[#262629] bg-[#0c0c0e] p-2">
          {results.map((candidate) => {
            const alreadySelected = selectedIds.has(candidate.id);
            return (
              <div key={candidate.id} className="rounded-md border border-[#262629] bg-[#121214] p-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="tms-text-primary truncate font-mono text-xs font-semibold">{candidate.skuCode}</p>
                    <p className="tms-row-text mt-0.5 line-clamp-2 text-xs">{candidate.skuName}</p>
                    <p className="tms-text-muted mt-1 font-mono text-[11px]">
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
                  <div className="tms-text-muted mt-2 space-y-1 text-[11px]">
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
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">No.</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">구분</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">상품번호</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">항목 ID</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">원문</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">매칭 키워드</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">경고 유형</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">경고 메시지</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">메모</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">상태</th>
            <th className="tms-warning-text px-4 py-3 text-xs font-medium">SKU 검색/선택</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-500/10">
          {paginatedRows.map((row, index) => {
            const actualIndex = getRowNumber(index, safeCurrentPage, pageSize) - 1;
            const rowKey = getWarningRowKey(row, actualIndex);
            const selectedSkus = selections[rowKey] ?? [];

            return (
              <tr key={rowKey} className="tms-table-row align-top">
                <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                  {actualIndex + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <MappingTypeBadge type={row.mappingType} />
                </td>
                <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                  {formatMaybe(row.channelProductNo)}
                </td>
                <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                  {formatMaybe(row.itemId)}
                </td>
                <td className="tms-row-text max-w-72 px-4 py-3">{formatMaybe(row.sourceText)}</td>
                <td className="tms-link max-w-48 px-4 py-3">{formatMaybe(row.matchedKeyword)}</td>
                <td className="px-4 py-3 align-top">
                  {WARNING_REASON_MAP[row.warningType] ? (
                    <div className="space-y-1">
                      <span className="inline-flex rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-500">
                        {WARNING_REASON_MAP[row.warningType].label}
                      </span>
                      <p className="tms-warning-text mt-1 text-[11px] font-mono opacity-80">{row.warningType}</p>
                    </div>
                  ) : (
                    <span className="tms-warning-text text-xs">{formatMaybe(row.warningType)}</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="space-y-1.5 max-w-80">
                    <p className="tms-warning-text text-sm font-medium">
                      {WARNING_REASON_MAP[row.warningType]?.description || row.warningMessage}
                    </p>
                    {WARNING_REASON_MAP[row.warningType]?.hint && (
                      <p className="text-zinc-400 text-xs">💡 {WARNING_REASON_MAP[row.warningType].hint}</p>
                    )}
                  </div>
                </td>
                <td className="tms-row-text max-w-80 px-4 py-3">{formatMaybe(row.memo)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                      selectedSkus.length > 0
                        ? 'bg-emerald-500/10 tms-success-text ring-emerald-500/20'
                        : 'bg-zinc-500/10 tms-text-muted ring-zinc-500/20'
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
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">No.</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">구분</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">상품번호</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">항목 ID</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">원문</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">오류 유형</th>
            <th className="tms-danger-text px-4 py-3 text-xs font-medium">메시지</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-500/10">
          {paginatedRows.map((row, index) => (
            <tr key={`${row.itemId}-${row.errorType}-${index}`} className="tms-table-row">
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                {getRowNumber(index, safeCurrentPage, pageSize)}
              </td>
              <td className="tms-row-text whitespace-nowrap px-4 py-3">{formatMaybe(row.mappingType)}</td>
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                {formatMaybe(row.channelProductNo)}
              </td>
              <td className="tms-row-text-muted whitespace-nowrap px-4 py-3 font-mono text-xs">
                {formatMaybe(row.itemId)}
              </td>
              <td className="tms-row-text max-w-72 px-4 py-3">{formatMaybe(row.sourceText)}</td>
              <td className="tms-danger-text whitespace-nowrap px-4 py-3 text-xs">{formatMaybe(row.errorType)}</td>
              <td className="tms-danger-text max-w-96 px-4 py-3">{formatMaybe(row.errorMessage)}</td>
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
  const [warningFilter, setWarningFilter] = useState<string>('ALL');
  const filteredWarningRows = useMemo(() => {
    if (warningFilter === 'ALL') return preview.warningRows;
    return preview.warningRows.filter((r) => r.warningType === warningFilter);
  }, [preview.warningRows, warningFilter]);

  const tabs: { key: ResultTab; label: string; count: number; filterLabel?: string }[] = [
    { key: 'matched', label: '자동 매칭', count: preview.matchedRows.length },
    { key: 'warning', label: '수동 검토', count: preview.warningRows.length, filterLabel: filteredWarningRows.length > 0 && warningFilter !== 'ALL' ? `${filteredWarningRows.length} / ${preview.warningRows.length}` : undefined },
    { key: 'error', label: '오류', count: preview.errorRows.length },
  ];

  return (
    <div className="rounded-lg border border-[#262629] bg-[#121214] p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
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
              <span className="font-mono text-xs">{tab.filterLabel ?? tab.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
        {activeTab === 'warning' && (
          <div className="flex items-center gap-2">
            <label htmlFor="warning-filter" className="text-xs text-zinc-400">사유 필터</label>
            <select
              id="warning-filter"
              value={warningFilter}
              onChange={(e) => setWarningFilter(e.target.value)}
              className="tms-control rounded-lg border border-[#262629] bg-[#121214] px-3 py-1.5 text-sm outline-none"
            >
              <option value="ALL">전체</option>
              {Object.entries(WARNING_REASON_MAP).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.label}
                </option>
              ))}
            </select>
          </div>
        )}
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
          rows={filteredWarningRows}
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
  const [optionCurrentContextFile, setOptionCurrentContextFile] = useState<File | null>(null);
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
  const [previewRefreshing, setPreviewRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [manualApplying, setManualApplying] = useState(false);
  const [draftPreviewLoading, setDraftPreviewLoading] = useState(false);
  const [draftPreviewResult, setDraftPreviewResult] = useState<SkuKeywordDraftPreviewResponse | null>(null);
  const [draftPreviewError, setDraftPreviewError] = useState<string | null>(null);

  const manualStats = getManualSelectionStats(manualSelections);
  const canPreviewDraftCandidates = !!preview
    && (preview.matchedRows.length > 0 || manualStats.skuCount > 0);

  const resetPreview = () => {
    setPreview(null);
    setMessage(null);
    setDraftPreviewResult(null);
    setDraftPreviewError(null);
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
    setDraftPreviewResult(null);
    setDraftPreviewError(null);
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
    setDraftPreviewResult(null);
    setDraftPreviewError(null);
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
    setDraftPreviewResult(null);
    setDraftPreviewError(null);
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

  const runPreviewRequest = async (files: { erpFile: File; csvFile: File; stockFile: File }) => {
    const response = await fetch('/api/sku-matching/keyword-preview', {
      method: 'POST',
      body: makeUploadFormData(files.erpFile, files.csvFile, files.stockFile),
    });
    const data = await readJson<SkuKeywordPreviewResponse | { error: string }>(response);

    if (!response.ok) {
      throw new Error(getErrorMessage(data, '키워드 매칭 검증에 실패했습니다.'));
    }

    return data as SkuKeywordPreviewResponse;
  };

  const applyPreviewResult = (previewResult: SkuKeywordPreviewResponse, successText: string) => {
    setPreview(previewResult);
    setDraftPreviewResult(null);
    setDraftPreviewError(null);
    setActiveTab(previewResult.warningRows.length > 0 ? 'warning' : 'matched');
    setPageByTab({ matched: 1, warning: 1, error: 1 });
    setMessage({ type: 'success', text: successText });
  };

  const refreshPreview = async (options?: { successText?: string; clearSelections?: boolean }) => {
    const files = validateFiles();
    if (!files) return;

    setPreviewRefreshing(true);

    try {
      const previewResult = await runPreviewRequest(files);
      if (options?.clearSelections) {
        setManualSelections({});
      }
      applyPreviewResult(previewResult, options?.successText ?? '키워드 매칭 검증이 완료되었습니다.');
    } catch (error) {
      const text = error instanceof Error ? error.message : '키워드 매칭 검증에 실패했습니다.';
      setPreview(null);
      setMessage({ type: 'error', text });
    } finally {
      setPreviewRefreshing(false);
    }
  };

  const handlePreview = async () => {
    const files = validateFiles();
    if (!files) return;

    setPreviewing(true);
    setMessage(null);
    setManualSelections({});

    try {
      const previewResult = await runPreviewRequest(files);
      applyPreviewResult(previewResult, '키워드 매칭 검증이 완료되었습니다.');
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

  const handleDraftPreview = async () => {
    if (!preview) {
      setDraftPreviewError('먼저 Preview 실행 결과가 필요합니다.');
      return;
    }

    setDraftPreviewLoading(true);
    setDraftPreviewError(null);

    try {
      let optionCurrentContextRows: OptionCurrentContextPreviewRow[] | undefined;
      
      if (optionCurrentContextFile) {
        const formData = new FormData();
        formData.append('file', optionCurrentContextFile);
        const optResponse = await fetch('/api/option-current-context/preview', {
          method: 'POST',
          body: formData,
        });
        
        if (!optResponse.ok) {
          const data = await readJson<{ error: string }>(optResponse).catch(() => ({ error: '알 수 없는 오류' }));
          throw new Error(getErrorMessage(data, 'OPTION 현재 문맥 파일 파싱에 실패했습니다.'));
        }
        
        const optData = await readJson<OptionCurrentContextPreviewResponse>(optResponse);
        optionCurrentContextRows = optData.rows;
      }

      const payload: SkuKeywordDraftPreviewRequest = {
        preview: {
          matchedRows: preview.matchedRows,
          warningRows: preview.warningRows,
        },
        manualSelections,
        optionCurrentContextRows,
      };

      const response = await fetch('/api/sku-matching/keyword-draft-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await readJson<SkuKeywordDraftPreviewResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Draft 후보 미리보기에 실패했습니다.'));
      }

      setDraftPreviewResult(data as SkuKeywordDraftPreviewResponse);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Draft 후보 미리보기에 실패했습니다.';
      setDraftPreviewResult(null);
      setDraftPreviewError(text);
    } finally {
      setDraftPreviewLoading(false);
    }
  };

  const handleManualApply = async () => {
    const payload = buildManualApplyPayload();
    const files = validateFiles();

    if (!payload || !files) {
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
      setMessage({
        type: 'success',
        text:
          `수동 확정 저장 완료: 생성 ${result.createdCount.toLocaleString()}건, ` +
          `업데이트 ${result.updatedCount.toLocaleString()}건, ` +
          `건너뜀 ${result.skippedCount.toLocaleString()}건. 최신 preview를 다시 불러오는 중입니다.`,
      });
      await refreshPreview({
        clearSelections: true,
        successText:
          `수동 확정 저장 완료: 생성 ${result.createdCount.toLocaleString()}건, ` +
          `업데이트 ${result.updatedCount.toLocaleString()}건, ` +
          `건너뜀 ${result.skippedCount.toLocaleString()}건. 최신 preview가 반영되었습니다.`,
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
          <h1 className="tms-text-primary text-3xl font-bold tracking-tight">키워드 SKU 수동 검토</h1>
          <p className="tms-text-muted mt-2 text-sm">
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
            <FileUploadInput
              id="option-context-file"
              label="OPTION 문맥 (선택) (.csv, .xls)"
              accept=".csv,.xls,.xlsx"
              file={optionCurrentContextFile}
              onFileChange={(file) => {
                setOptionCurrentContextFile(file);
                setDraftPreviewResult(null);
                setDraftPreviewError(null);
              }}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={handlePreview}
              disabled={previewing || previewRefreshing || !erpFile || !csvFile || !stockFile}
              className="tms-button tms-button-primary inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition"
            >
              {previewing || previewRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Preview 실행
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting || previewRefreshing || !erpFile || !csvFile || !stockFile}
              className="tms-button tms-button-accent inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition"
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
                  disabled={manualApplying || previewRefreshing || manualStats.skuCount === 0}
                  className="tms-button tms-button-primary inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition"
                >
                  {manualApplying || previewRefreshing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  수동 확정 저장
                </button>
                <p className="text-xs text-zinc-400">
                  수동 확정 저장은 실제 DB에 반영됩니다. 저장 후 preview를 자동으로 다시 불러옵니다.
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-[#262629] bg-[#121214] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Draft 후보 미리보기</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    현재 preview 결과와 수동 선택 SKU를 seed/hydrate/bulk-like 후보로 변환해 미리 확인합니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDraftPreview}
                  disabled={!canPreviewDraftCandidates || draftPreviewLoading || manualApplying || previewRefreshing}
                  className="tms-button tms-button-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition"
                >
                  {draftPreviewLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  Draft 후보 미리보기
                </button>
              </div>

              <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3 text-xs text-zinc-400">
                자동 매칭 {preview.matchedRows.length.toLocaleString()}건, 수동 선택 row {manualStats.rowCount.toLocaleString()}건, SKU {manualStats.skuCount.toLocaleString()}건이 포함됩니다.
              </div>

              {draftPreviewError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {draftPreviewError}
                </div>
              )}

              {draftPreviewResult && <DraftPreviewPanel result={draftPreviewResult} />}
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
