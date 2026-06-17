'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  Save,
  Search,
} from 'lucide-react';
import type {
  ProductVariantKeywordPreviewResponse,
  ProductVariantKeywordPreviewRow,
} from '@/src/types/product-variant-keyword.types';
import type {
  SkuKeywordManualApplyRequest,
  SkuKeywordManualApplyResponse,
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
  sku: { skuCode: string };
};

type Message = { type: 'success' | 'error'; text: string };
type VariantCandidateFilter =
  | 'ALL'
  | 'SET'
  | 'SINGLE'
  | 'OPTION'
  | 'ADDITIONAL'
  | 'RESOLVED'
  | 'UNRESOLVED';

const variantCandidateFilters: { key: VariantCandidateFilter; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'SET', label: '세트상품만' },
  { key: 'SINGLE', label: '단품만' },
  { key: 'OPTION', label: '옵션만' },
  { key: 'ADDITIONAL', label: '추가상품만' },
  { key: 'RESOLVED', label: 'SKU 매칭 성공' },
  { key: 'UNRESOLVED', label: 'SKU 미확정' },
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

function getVariantRowKey(row: ProductVariantKeywordPreviewRow): string {
  return `${row.mappingType}:${row.itemId}:${row.serialNo}`;
}

function isVariantRowResolved(row: ProductVariantKeywordPreviewRow): boolean {
  return row.skus.length > 0 && row.skus.every((sku) => sku.skuId);
}

function getResolvedSkuCount(row: ProductVariantKeywordPreviewRow): number {
  return row.skus.filter((sku) => sku.skuId).length;
}

function getRowsSkuCount(rows: ProductVariantKeywordPreviewRow[]): number {
  return rows.reduce((total, row) => total + getResolvedSkuCount(row), 0);
}

function filterVariantRows(
  rows: ProductVariantKeywordPreviewRow[],
  filter: VariantCandidateFilter,
): ProductVariantKeywordPreviewRow[] {
  if (filter === 'SET') return rows.filter((row) => row.isSetProduct);
  if (filter === 'SINGLE') return rows.filter((row) => !row.isSetProduct);
  if (filter === 'OPTION') return rows.filter((row) => row.mappingType === 'OPTION');
  if (filter === 'ADDITIONAL') return rows.filter((row) => row.mappingType === 'ADDITIONAL');
  if (filter === 'RESOLVED') return rows.filter(isVariantRowResolved);
  if (filter === 'UNRESOLVED') return rows.filter((row) => !isVariantRowResolved(row));
  return rows;
}

function toManualApplyRequest(rows: ProductVariantKeywordPreviewRow[]): SkuKeywordManualApplyRequest {
  return {
    rows: rows.map((row) => ({
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
      skus: row.skus
        .filter((sku) => sku.skuId)
        .map((sku) => ({ skuId: sku.skuId, quantity: sku.quantity })),
    })),
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

function VariantStatusBadge({ resolved }: { resolved: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        resolved
          ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
          : 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
      }`}
    >
      {resolved ? 'SKU 매칭 성공' : 'SKU 미확정'}
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

function VariantCandidateDetail({ row }: { row: ProductVariantKeywordPreviewRow }) {
  return (
    <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
      <div className="mb-3 text-xs text-zinc-500">
        ProductVariantKeyword 상품옵션: <span className="text-zinc-300">{formatMaybe(row.productOptionText)}</span>
      </div>
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
    </div>
  );
}

function ProductVariantKeywordPanel({ product }: { product: ProductDetail }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [variantFile, setVariantFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ProductVariantKeywordPreviewResponse | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<VariantCandidateFilter>('ALL');
  const [message, setMessage] = useState<Message | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);

  const filteredRows = useMemo(
    () => filterVariantRows(preview?.rows ?? [], activeFilter),
    [activeFilter, preview],
  );
  const selectableRows = useMemo(
    () => preview?.rows.filter(isVariantRowResolved) ?? [],
    [preview],
  );
  const checkedRows = useMemo(
    () => selectableRows.filter((row) => selectedRows[getVariantRowKey(row)]),
    [selectableRows, selectedRows],
  );
  const checkedSkuCount = getRowsSkuCount(checkedRows);

  const handlePreview = async () => {
    if (!variantFile) {
      setMessage({ type: 'error', text: 'ProductVariantKeyword 엑셀 파일을 선택해 주세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);
    setPreview(null);
    setSelectedRows({});
    setExpandedRows({});
    setActiveFilter('ALL');

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
      const response = await fetch('/api/sku-matching/manual-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toManualApplyRequest(checkedRows)),
      });
      const data = await readJson<SkuKeywordManualApplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '수동 확정 저장에 실패했습니다.'));
      }

      const result = data as SkuKeywordManualApplyResponse;
      setSelectedRows({});
      setMessage({
        type: 'success',
        text:
          `수동 확정 저장 완료: 생성 ${result.createdCount.toLocaleString()}건, ` +
          `업데이트 ${result.updatedCount.toLocaleString()}건, 건너뜀 ${result.skippedCount.toLocaleString()}건.`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수동 확정 저장에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const toggleAllSelectable = () => {
    const allSelected = selectableRows.length > 0 && checkedRows.length === selectableRows.length;
    setSelectedRows(
      Object.fromEntries(selectableRows.map((row) => [getVariantRowKey(row), !allSelected])),
    );
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
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || checkedRows.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            선택 후보 저장
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
          setExpandedRows({});
          setActiveFilter('ALL');
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

      {preview && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {variantCandidateFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
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
            <button
              type="button"
              onClick={toggleAllSelectable}
              disabled={selectableRows.length === 0}
              className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
            >
              {checkedRows.length === selectableRows.length && selectableRows.length > 0 ? '전체 해제' : '해석 완료 전체 선택'}
            </button>
          </div>

          <div className="mb-2 text-sm text-zinc-400">
            좌우로 스크롤하여 SKU 상세를 확인할 수 있습니다.
          </div>
          <div className="overflow-x-auto rounded-lg border border-[#262629]">
            <table className="w-full min-w-[1400px] text-left text-sm relative">
              <thead className="bg-[#0c0c0e]">
                <tr>
                  <th className="sticky left-0 top-0 z-30 w-14 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">선택</th>
                  <th className="sticky left-[56px] top-0 z-30 w-24 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">구분</th>
                  <th className="sticky left-[152px] top-0 z-30 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e] shadow-[4px_0_8px_rgba(0,0,0,0.25)] border-r border-[#262629]">옵션/추가상품명</th>
                  <th className="sticky top-0 z-20 w-24 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">일련번호</th>
                  <th className="sticky top-0 z-20 w-28 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">유형</th>
                  <th className="sticky top-0 z-20 w-32 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">SKU 개수</th>
                  <th className="sticky top-0 z-20 w-32 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">매칭 상태</th>
                  <th className="sticky top-0 z-20 w-20 px-4 py-3 text-xs font-medium text-zinc-500 bg-[#0c0c0e]">펼치기</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {filteredRows.map((row) => {
                  const rowKey = getVariantRowKey(row);
                  const selectable = isVariantRowResolved(row);
                  const expanded = expandedRows[rowKey] ?? false;
                  const resolvedSkuCount = getResolvedSkuCount(row);

                  return (
                    <Fragment key={rowKey}>
                      <tr className="align-top group hover:bg-[#16161a]">
                        <td className="sticky left-0 z-10 px-4 py-3 bg-[#121214] group-hover:bg-[#16161a]">
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
                            className="h-4 w-4 rounded border-[#333] bg-[#0c0c0e]"
                            aria-label="ProductVariantKeyword 후보 선택"
                          />
                        </td>
                        <td className="sticky left-[56px] z-10 whitespace-nowrap px-4 py-3 text-xs text-zinc-300 bg-[#121214] group-hover:bg-[#16161a]">{row.mappingType}</td>
                        <td className="sticky left-[152px] z-10 px-4 py-3 bg-[#121214] group-hover:bg-[#16161a] shadow-[4px_0_8px_rgba(0,0,0,0.25)] border-r border-[#262629]">
                          <div className="max-w-xl text-sm font-medium text-zinc-100">{row.itemName}</div>
                          {row.warningMessage && (
                            <div className="mt-1 max-w-xl text-xs text-amber-200">{row.warningMessage}</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                          {row.serialNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <SetTypeBadge isSetProduct={row.isSetProduct} />
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`text-sm font-semibold ${
                              row.isSetProduct ? 'text-violet-200' : 'text-zinc-300'
                            }`}
                          >
                            {resolvedSkuCount.toLocaleString()}개 SKU
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <VariantStatusBadge resolved={selectable} />
                        </td>
                        <td className="px-4 py-3">
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
                          <td colSpan={8} className="px-4 py-4">
                            <VariantCandidateDetail row={row} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredRows.length === 0 && (
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">
              필터 조건에 맞는 후보가 없습니다.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) return;

    fetch(`/api/products/${params.id}`)
      .then((response) => {
        if (!response.ok) throw new Error('상품을 찾을 수 없습니다.');
        return response.json();
      })
      .then((data: ProductDetail) => setProduct(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, [params.id]);

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

        <ProductVariantKeywordPanel product={product} />

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
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션명</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션값</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">옵션코드</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">재고</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {product.options.map((option) => {
                    const mapped = option.skuMappings.length > 0 || Boolean(option.skuId && option.sku);
                    return (
                      <tr key={option.id} className="transition hover:bg-[#16161a]">
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
          )}
        </section>

        {product.additionals.length > 0 && (
          <section className="overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
            <div className="border-b border-[#262629] px-6 py-4">
              <h2 className="text-lg font-semibold text-white">추가상품 정보</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">항목</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">값</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">판매자관리코드</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {product.additionals.map((additional) => (
                    <tr key={additional.id} className="transition hover:bg-[#16161a]">
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
          </section>
        )}
      </div>
    </div>
  );
}
