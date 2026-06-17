'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Edit3, Loader2, Plus, Search, Trash2, XCircle } from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import {
  SKU_ALIAS_TYPES,
  type SkuAliasDto,
  type SkuAliasType,
  type SkuBarcodeDto,
  type SkuDetailDto,
  type SkuDto,
} from '@/src/types/sku.types';
import {
  DEFAULT_PAGE_SIZE,
  getPaginatedRows,
  getPaginationRange,
  getRowNumber,
  getSafeCurrentPage,
  getTotalPages,
  type CommonPageSize,
} from '@/src/utils/pagination';

type SkuFormState = {
  skuCode: string;
  sellerProductCode: string;
  barcode: string;
  supplierCode: string;
  costPrice: string;
  sellingPrice: string;
  stockQuantity: string;
  safetyStock: string;
};

type AliasFormState = {
  aliasType: SkuAliasType;
  value: string;
  source: string;
  memo: string;
};

type BarcodeFormState = {
  id: string | null;
  barcode: string;
  unitName: string;
  quantity: string;
  barcodeType: string;
  isPrimary: boolean;
  source: string;
  memo: string;
};

type Message = {
  type: 'success' | 'error';
  text: string;
};

const emptySkuForm: SkuFormState = {
  skuCode: '',
  sellerProductCode: '',
  barcode: '',
  supplierCode: '',
  costPrice: '',
  sellingPrice: '',
  stockQuantity: '',
  safetyStock: '',
};

const emptyAliasForm: AliasFormState = {
  aliasType: 'MATCH_KEYWORD',
  value: '',
  source: '',
  memo: '',
};

const emptyBarcodeForm: BarcodeFormState = {
  id: null,
  barcode: '',
  unitName: '',
  quantity: '1',
  barcodeType: '',
  isPrimary: false,
  source: '',
  memo: '',
};

const aliasTypeLabels: Record<SkuAliasType, string> = {
  INTERNAL_PRODUCT_CODE: '우리자체상품코드',
  MODEL_NAME: '모델명',
  SUPPLIER_ITEM_CODE: '매입처코드',
  BARCODE: '바코드 별칭',
  MANAGEMENT_CODE: '관리코드',
  MATCH_KEYWORD: '매칭키워드',
  PRODUCT_NAME: '상품명',
  OPTION_NAME: '옵션명',
  ADDITIONAL_NAME: '추가상품명',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(value: unknown, fallback: string): string {
  if (!isRecord(value) || typeof value.error !== 'string') return fallback;
  return value.error;
}

async function readJson<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function toSkuFormState(sku: SkuDto): SkuFormState {
  return {
    skuCode: sku.skuCode,
    sellerProductCode: sku.sellerProductCode ?? '',
    barcode: sku.barcode ?? '',
    supplierCode: sku.supplierCode ?? '',
    costPrice: String(sku.costPrice),
    sellingPrice: String(sku.sellingPrice),
    stockQuantity: String(sku.stockQuantity),
    safetyStock: String(sku.safetyStock),
  };
}

function toBarcodeFormState(barcode: SkuBarcodeDto): BarcodeFormState {
  return {
    id: barcode.id,
    barcode: barcode.barcode,
    unitName: barcode.unitName,
    quantity: String(barcode.quantity),
    barcodeType: barcode.barcodeType ?? '',
    isPrimary: barcode.isPrimary,
    source: barcode.source ?? '',
    memo: barcode.memo ?? '',
  };
}

export default function SkusPage() {
  const [skus, setSkus] = useState<SkuDto[]>([]);
  const [skuForm, setSkuForm] = useState<SkuFormState>(emptySkuForm);
  const [aliasForm, setAliasForm] = useState<AliasFormState>(emptyAliasForm);
  const [barcodeForm, setBarcodeForm] = useState<BarcodeFormState>(emptyBarcodeForm);
  const [editingSkuId, setEditingSkuId] = useState<string | null>(null);
  const [selectedSku, setSelectedSku] = useState<SkuDetailDto | null>(null);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [barcodePageSize, setBarcodePageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [barcodeCurrentPage, setBarcodeCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const fetchSkus = async (query = search) => {
    setLoading(true);
    try {
      const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
      const response = await fetch(`/api/skus${params}`);
      const data = await readJson<SkuDto[] | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'SKU 목록 조회에 실패했습니다.'));
      }

      setSkus(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'SKU 목록 조회에 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSkuDetail = async (skuId: string) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`/api/skus/${skuId}`);
      const data = await readJson<SkuDetailDto | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'SKU 상세 조회에 실패했습니다.'));
      }

      setSelectedSku(data as SkuDetailDto);
      setBarcodeCurrentPage(1);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'SKU 상세 조회에 실패했습니다.' });
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void (async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/skus');
          const data = await readJson<SkuDto[] | { error: string }>(response);

          if (!response.ok) {
            throw new Error(getErrorMessage(data, 'SKU 목록 조회에 실패했습니다.'));
          }

          setSkus(Array.isArray(data) ? data : []);
          setCurrentPage(1);
        } catch (error) {
          setMessage({ type: 'error', text: error instanceof Error ? error.message : 'SKU 목록 조회에 실패했습니다.' });
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const resetSkuForm = () => {
    setSkuForm(emptySkuForm);
    setEditingSkuId(null);
  };

  const saveSku = async () => {
    if (!skuForm.skuCode.trim()) {
      setMessage({ type: 'error', text: 'SKU 코드를 입력하세요.' });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch(editingSkuId ? `/api/skus/${editingSkuId}` : '/api/skus', {
        method: editingSkuId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skuForm),
      });
      const data = await readJson<SkuDto | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'SKU 저장에 실패했습니다.'));
      }

      setMessage({ type: 'success', text: editingSkuId ? 'SKU를 수정했습니다.' : 'SKU를 등록했습니다.' });
      resetSkuForm();
      await fetchSkus();
      if (selectedSku?.id === editingSkuId) {
        await fetchSkuDetail(editingSkuId);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'SKU 저장에 실패했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const saveAlias = async () => {
    if (!selectedSku) return;
    if (!aliasForm.value.trim()) {
      setMessage({ type: 'error', text: '별칭 값을 입력하세요.' });
      return;
    }

    const response = await fetch(`/api/skus/${selectedSku.id}/aliases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aliasForm),
    });
    const data = await readJson<SkuAliasDto | { error: string }>(response);

    if (!response.ok) {
      setMessage({ type: 'error', text: getErrorMessage(data, '별칭 등록에 실패했습니다.') });
      return;
    }

    setAliasForm(emptyAliasForm);
    setMessage({ type: 'success', text: '별칭을 등록했습니다.' });
    await fetchSkuDetail(selectedSku.id);
  };

  const deleteAlias = async (aliasId: string) => {
    if (!selectedSku) return;
    const response = await fetch(`/api/skus/${selectedSku.id}/aliases/${aliasId}`, { method: 'DELETE' });
    const data = await readJson<{ message: string } | { error: string }>(response);

    if (!response.ok) {
      setMessage({ type: 'error', text: getErrorMessage(data, '별칭 삭제에 실패했습니다.') });
      return;
    }

    setMessage({ type: 'success', text: '별칭을 삭제했습니다.' });
    await fetchSkuDetail(selectedSku.id);
  };

  const saveBarcode = async () => {
    if (!selectedSku) return;
    if (!barcodeForm.barcode.trim() || !barcodeForm.unitName.trim()) {
      setMessage({ type: 'error', text: '바코드와 포장단위명을 입력하세요.' });
      return;
    }

    const response = await fetch(
      barcodeForm.id
        ? `/api/skus/${selectedSku.id}/barcodes/${barcodeForm.id}`
        : `/api/skus/${selectedSku.id}/barcodes`,
      {
        method: barcodeForm.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(barcodeForm),
      }
    );
    const data = await readJson<SkuBarcodeDto | { error: string }>(response);

    if (!response.ok) {
      setMessage({ type: 'error', text: getErrorMessage(data, '바코드 저장에 실패했습니다.') });
      return;
    }

    setBarcodeForm(emptyBarcodeForm);
    setMessage({ type: 'success', text: '바코드를 저장했습니다.' });
    await fetchSkuDetail(selectedSku.id);
  };

  const deleteBarcode = async (barcodeId: string) => {
    if (!selectedSku) return;
    const response = await fetch(`/api/skus/${selectedSku.id}/barcodes/${barcodeId}`, { method: 'DELETE' });
    const data = await readJson<{ message: string } | { error: string }>(response);

    if (!response.ok) {
      setMessage({ type: 'error', text: getErrorMessage(data, '바코드 삭제에 실패했습니다.') });
      return;
    }

    setBarcodeForm(emptyBarcodeForm);
    setMessage({ type: 'success', text: '바코드를 삭제했습니다.' });
    await fetchSkuDetail(selectedSku.id);
  };

  const totalPages = getTotalPages(skus.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedSkus = getPaginatedRows(skus, pageSize, safeCurrentPage);
  const skuPagination = getPaginationRange(skus.length, pageSize, safeCurrentPage);
  const barcodeTotalCount = selectedSku?.barcodes.length ?? 0;
  const barcodeTotalPages = getTotalPages(barcodeTotalCount, barcodePageSize);
  const safeBarcodeCurrentPage = getSafeCurrentPage(barcodeCurrentPage, barcodeTotalPages);
  const paginatedBarcodes = getPaginatedRows(selectedSku?.barcodes ?? [], barcodePageSize, safeBarcodeCurrentPage);
  const barcodePagination = getPaginationRange(barcodeTotalCount, barcodePageSize, safeBarcodeCurrentPage);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">SKU 관리</h1>
          <p className="mt-2 text-sm text-zinc-400">SKU, 코드/키워드 별칭, 포장단위별 바코드를 관리합니다.</p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{editingSkuId ? 'SKU 수정' : 'SKU 신규 등록'}</h2>
            {editingSkuId && (
              <button onClick={resetSkuForm} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-[#1a1a1e] hover:text-zinc-200">
                <XCircle className="h-4 w-4" />
                수정 취소
              </button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {[
              ['skuCode', 'SKU 코드', 'SKU-TEST-001'],
              ['sellerProductCode', '판매자상품코드', '판매자상품코드'],
              ['barcode', '기존 바코드', '호환용 단일 바코드'],
              ['supplierCode', '공급사코드', '공급사코드'],
              ['costPrice', '원가', '0'],
              ['sellingPrice', '판매가', '0'],
              ['stockQuantity', '재고', '0'],
              ['safetyStock', '안전재고', '0'],
            ].map(([field, label, placeholder]) => (
              <div key={field} className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">{label}</label>
                <input
                  type={['costPrice', 'sellingPrice', 'stockQuantity', 'safetyStock'].includes(field) ? 'number' : 'text'}
                  min="0"
                  step={['stockQuantity', 'safetyStock'].includes(field) ? '1' : '0.01'}
                  value={skuForm[field as keyof SkuFormState]}
                  onChange={(event) => setSkuForm((current) => ({ ...current, [field]: event.target.value }))}
                  className="w-full rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button onClick={saveSku} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {editingSkuId ? 'SKU 수정' : 'SKU 등록'}
            </button>
          </div>

          {message && (
            <div className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/20 bg-red-500/10 text-red-300'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {message.text}
            </div>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)]">
          <div className="rounded-2xl border border-[#262629] bg-[#121214]">
            <div className="flex flex-col gap-4 border-b border-[#262629] px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-lg font-semibold text-white">SKU 목록 <span className="ml-2 text-sm font-normal text-zinc-500">({skus.length.toLocaleString()}건)</span></h2>
              <div className="flex flex-wrap gap-2">
                <PageSizeSelect
                  value={pageSize}
                  onChange={(value) => {
                    setPageSize(value);
                    setCurrentPage(1);
                  }}
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') void fetchSkus(search);
                  }}
                  className="w-full rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:w-80"
                  placeholder="SKU, 코드, 별칭, 바코드 검색"
                />
                <button onClick={() => void fetchSkus(search)} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-60">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  검색
                </button>
              </div>
            </div>

            <div className="px-6 pt-4">
              <PaginationControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                start={skuPagination.start}
                end={skuPagination.end}
                totalCount={skus.length}
                onChangePage={setCurrentPage}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">No.</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">SKU 코드</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">판매자상품코드</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">바코드</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">공급사코드</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500">재고</th>
                    <th className="px-5 py-3 text-xs font-medium text-zinc-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {paginatedSkus.map((sku, index) => (
                    <tr key={sku.id} className="transition-colors hover:bg-[#16161a]">
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-zinc-400">{getRowNumber(index, safeCurrentPage, pageSize)}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-xs font-semibold text-zinc-200">{sku.skuCode}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-400">{sku.sellerProductCode ?? '-'}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-zinc-500">{sku.barcode ?? '-'}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-400">{sku.supplierCode ?? '-'}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-xs text-zinc-300">{formatNumber(sku.stockQuantity)}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <button onClick={() => void fetchSkuDetail(sku.id)} className="mr-2 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/10">상세</button>
                        <button
                          onClick={() => {
                            setEditingSkuId(sku.id);
                            setSkuForm(toSkuFormState(sku));
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/10"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 pb-4 pt-3">
              <PaginationControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                start={skuPagination.start}
                end={skuPagination.end}
                totalCount={skus.length}
                onChangePage={setCurrentPage}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
            {!selectedSku ? (
              <div className="py-20 text-center text-sm text-zinc-500">SKU 목록에서 상세를 선택하세요.</div>
            ) : detailLoading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-indigo-400" />
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <p className="text-xs text-zinc-500">선택 SKU</p>
                  <h2 className="mt-1 font-mono text-lg font-semibold text-white">{selectedSku.skuCode}</h2>
                </div>

                <section>
                  <h3 className="mb-3 text-sm font-semibold text-white">코드/키워드 별칭</h3>
                  <div className="grid gap-2">
                    <select value={aliasForm.aliasType} onChange={(event) => setAliasForm((current) => ({ ...current, aliasType: event.target.value as SkuAliasType }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white">
                      {SKU_ALIAS_TYPES.map((type) => <option key={type} value={type}>{aliasTypeLabels[type]}</option>)}
                    </select>
                    <input value={aliasForm.value} onChange={(event) => setAliasForm((current) => ({ ...current, value: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="별칭 값" />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input value={aliasForm.source} onChange={(event) => setAliasForm((current) => ({ ...current, source: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="출처" />
                      <input value={aliasForm.memo} onChange={(event) => setAliasForm((current) => ({ ...current, memo: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="비고" />
                    </div>
                    <button onClick={() => void saveAlias()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      <Plus className="h-4 w-4" />
                      별칭 추가
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {selectedSku.aliases.map((alias) => (
                      <div key={alias.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#262629] bg-[#0c0c0e] px-3 py-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm text-zinc-200">{alias.value}</p>
                          <p className="text-xs text-zinc-500">{aliasTypeLabels[alias.aliasType as SkuAliasType] ?? alias.aliasType} · {alias.source ?? '-'}</p>
                        </div>
                        <button onClick={() => void deleteAlias(alias.id)} className="rounded-lg p-2 text-red-300 transition hover:bg-red-500/10" title="별칭 삭제">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 text-sm font-semibold text-white">포장단위 바코드</h3>
                  <div className="grid gap-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input value={barcodeForm.barcode} onChange={(event) => setBarcodeForm((current) => ({ ...current, barcode: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="바코드" />
                      <input value={barcodeForm.unitName} onChange={(event) => setBarcodeForm((current) => ({ ...current, unitName: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="포장단위명 예: 낱개" />
                      <input type="number" min="1" step="1" value={barcodeForm.quantity} onChange={(event) => setBarcodeForm((current) => ({ ...current, quantity: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="수량" />
                      <input value={barcodeForm.barcodeType} onChange={(event) => setBarcodeForm((current) => ({ ...current, barcodeType: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="타입 예: PRODUCT, BOX" />
                      <input value={barcodeForm.source} onChange={(event) => setBarcodeForm((current) => ({ ...current, source: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="출처" />
                      <input value={barcodeForm.memo} onChange={(event) => setBarcodeForm((current) => ({ ...current, memo: event.target.value }))} className="rounded-xl border border-[#333] bg-[#1a1a1e] px-3 py-2 text-sm text-white" placeholder="비고" />
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
                      <input type="checkbox" checked={barcodeForm.isPrimary} onChange={(event) => setBarcodeForm((current) => ({ ...current, isPrimary: event.target.checked }))} />
                      대표 바코드
                    </label>
                    <button onClick={() => void saveBarcode()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      <Plus className="h-4 w-4" />
                      {barcodeForm.id ? '바코드 수정' : '바코드 추가'}
                    </button>
                    {barcodeForm.id && (
                      <button onClick={() => setBarcodeForm(emptyBarcodeForm)} className="rounded-xl border border-[#333] px-4 py-2 text-sm text-zinc-300 transition hover:bg-[#1a1a1e]">바코드 수정 취소</button>
                    )}
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-col gap-3 rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
                      <PageSizeSelect
                        value={barcodePageSize}
                        onChange={(value) => {
                          setBarcodePageSize(value);
                          setBarcodeCurrentPage(1);
                        }}
                      />
                      <PaginationControls
                        currentPage={safeBarcodeCurrentPage}
                        totalPages={barcodeTotalPages}
                        pageSize={barcodePageSize}
                        start={barcodePagination.start}
                        end={barcodePagination.end}
                        totalCount={barcodeTotalCount}
                        onChangePage={setBarcodeCurrentPage}
                      />
                    </div>
                  <div className="overflow-x-auto rounded-xl border border-[#262629]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0c0c0e] text-zinc-500">
                        <tr>
                          <th className="px-3 py-2">No.</th>
                          <th className="px-3 py-2">바코드</th>
                          <th className="px-3 py-2">포장단위</th>
                          <th className="px-3 py-2">수량</th>
                          <th className="px-3 py-2">대표</th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1e1e22]">
                        {paginatedBarcodes.map((barcode, index) => (
                          <tr key={barcode.id}>
                            <td className="px-3 py-2 font-mono text-zinc-400">{getRowNumber(index, safeBarcodeCurrentPage, barcodePageSize)}</td>
                            <td className="px-3 py-2 font-mono text-zinc-200">{barcode.barcode}</td>
                            <td className="px-3 py-2 text-zinc-300">{barcode.unitName}</td>
                            <td className="px-3 py-2 text-right font-mono text-zinc-300">{barcode.quantity}</td>
                            <td className="px-3 py-2 text-zinc-300">{barcode.isPrimary ? '대표' : '-'}</td>
                            <td className="whitespace-nowrap px-3 py-2 text-right">
                              <button onClick={() => setBarcodeForm(toBarcodeFormState(barcode))} className="mr-2 text-indigo-300 hover:underline">수정</button>
                              <button onClick={() => void deleteBarcode(barcode.id)} className="text-red-300 hover:underline">삭제</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                    <div className="rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 py-3">
                      <PaginationControls
                        currentPage={safeBarcodeCurrentPage}
                        totalPages={barcodeTotalPages}
                        pageSize={barcodePageSize}
                        start={barcodePagination.start}
                        end={barcodePagination.end}
                        totalCount={barcodeTotalCount}
                        onChangePage={setBarcodeCurrentPage}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
