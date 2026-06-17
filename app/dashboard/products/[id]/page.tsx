'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
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

function ProductVariantKeywordPanel({ product }: { product: ProductDetail }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [variantFile, setVariantFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ProductVariantKeywordPreviewResponse | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<Message | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectableRows = useMemo(
    () => preview?.rows.filter((row) => row.skus.length > 0 && row.skus.every((sku) => sku.skuId)) ?? [],
    [preview],
  );
  const checkedRows = useMemo(
    () => selectableRows.filter((row) => selectedRows[getVariantRowKey(row)]),
    [selectableRows, selectedRows],
  );

  const handlePreview = async () => {
    if (!variantFile) {
      setMessage({ type: 'error', text: 'ProductVariantKeyword 엑셀 파일을 선택해 주세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);
    setPreview(null);
    setSelectedRows({});

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
            <span>선택 {checkedRows.length.toLocaleString()}건</span>
          </>
        )}
      </div>

      {message && (
        <div className="mt-4">
          <MessageBox message={message} />
        </div>
      )}

      {preview && (
        <div className="mt-5 space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleAllSelectable}
              disabled={selectableRows.length === 0}
              className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
            >
              {checkedRows.length === selectableRows.length && selectableRows.length > 0 ? '전체 해제' : '해석 완료 전체 선택'}
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#262629]">
            <table className="w-full min-w-[1500px] text-left text-sm">
              <thead className="bg-[#0c0c0e]">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">선택</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">구분</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">옵션/추가상품</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">일련번호</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">재고매칭 상품명</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">모델코드</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">SKU</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">바코드</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">수량</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">세트</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">신뢰도</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500">메시지</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {preview.rows.map((row) => {
                  const rowKey = getVariantRowKey(row);
                  const selectable = row.skus.length > 0 && row.skus.every((sku) => sku.skuId);

                  return (
                    <tr key={rowKey} className="align-top hover:bg-[#16161a]">
                      <td className="px-4 py-3">
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
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-300">{row.mappingType}</td>
                      <td className="max-w-80 px-4 py-3 text-zinc-200">{row.itemName}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">{row.serialNo}</td>
                      <td className="max-w-96 px-4 py-3 text-zinc-300">
                        {row.stockMatchedProductNames.map((name) => (
                          <div key={name}>{name}</div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-indigo-300">
                        {formatMaybe(row.resolvedModelCodes)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-emerald-300">
                        {formatMaybe(row.resolvedSkuCode)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                        {formatMaybe(row.barcode)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{row.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                            row.isSetProduct
                              ? 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
                              : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
                          }`}
                        >
                          {row.isSetProduct ? `${row.skus.length}개 SKU` : '단일'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-300">
                        {Math.round(row.confidence * 100)}%
                      </td>
                      <td className="max-w-80 px-4 py-3 text-amber-200">{formatMaybe(row.warningMessage)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
