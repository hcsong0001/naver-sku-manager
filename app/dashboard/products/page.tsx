'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

type Smartstore = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  naverProductId: string;
  status: string;
  channelProductNo: string | null;
  createdAt: string;
  smartstore?: { id: string; name: string };
};

export default function ProductsPage() {
  const router = useRouter();
  const [stores, setStores] = useState<Smartstore[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [channelProductNo, setChannelProductNo] = useState('');
  const [pageSize, setPageSize] = useState<CommonPageSize>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/smartstores')
      .then((res) => res.json())
      .then((data: Smartstore[]) => {
        setStores(data);
        if (data.length > 0) setSelectedStoreId(data[0].id);
      })
      .catch(console.error);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = selectedStoreId ? `?smartstoreId=${selectedStoreId}` : '';
      const res = await fetch(`/api/products${query}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedStoreId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchProducts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchProducts]);

  const totalPages = getTotalPages(products.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedProducts = getPaginatedRows(products, pageSize, safeCurrentPage);
  const pagination = getPaginationRange(products.length, pageSize, safeCurrentPage);

  const handleCollect = async () => {
    if (!selectedStoreId || !channelProductNo.trim()) {
      setMessage({ type: 'error', text: '스토어를 선택하고 채널 상품번호를 입력하세요.' });
      return;
    }

    setCollecting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          smartstoreId: selectedStoreId,
          channelProductNo: channelProductNo.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : '수집 실패');
      }

      setMessage({ type: 'success', text: `✅ ${data.naverData?.name || '상품'} 수집 완료!` });
      setChannelProductNo('');
      await fetchProducts();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '수집 실패';
      setMessage({ type: 'error', text: `❌ ${errorMessage}` });
    } finally {
      setCollecting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 상품을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">상품 수집</h1>
          <p className="mt-2 text-sm text-zinc-400">네이버 커머스 API를 통해 스마트스토어 상품을 수집하고 관리합니다.</p>
        </div>

        <div className="mb-8 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">새 상품 수집</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">스토어 선택</label>
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="w-full rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">채널 상품번호 (channelProductNo)</label>
              <input
                type="text"
                value={channelProductNo}
                onChange={(e) => setChannelProductNo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && void handleCollect()}
                placeholder="예: 12345678901"
                className="w-full rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => void handleCollect()}
              disabled={collecting}
              className="shrink-0 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95 disabled:opacity-60"
            >
              {collecting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                  수집 중...
                </span>
              ) : (
                '상품 수집'
              )}
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                  : 'border-red-500/20 bg-red-500/10 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#262629] bg-[#121214]">
          <div className="flex flex-col gap-3 border-b border-[#262629] px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg font-semibold text-white">
              수집된 상품 <span className="ml-2 text-sm font-normal text-zinc-500">({products.length}건)</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <PageSizeSelect
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
              />
              <select
                value={selectedStoreId}
                onChange={(e) => {
                  setSelectedStoreId(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-1.5 text-xs text-zinc-300 outline-none"
              >
                <option value="">전체 스토어</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-7 w-7 animate-spin rounded-full border-3 border-zinc-700 border-t-indigo-500"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="mb-4 h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-base font-medium text-zinc-300">수집된 상품이 없습니다</h3>
              <p className="mt-1 text-sm text-zinc-500">위에서 채널 상품번호를 입력하여 상품을 수집하세요.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="px-6 pt-4">
                <PaginationControls
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  start={pagination.start}
                  end={pagination.end}
                  totalCount={products.length}
                  onChangePage={setCurrentPage}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">No.</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">상품명</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">채널상품번호</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">스토어</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">상태</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">수집일</th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e22]">
                    {paginatedProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        onClick={() => router.push(`/dashboard/products/${product.id}`)}
                        className="cursor-pointer transition-colors hover:bg-[#16161a]"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-400">
                          {getRowNumber(index, safeCurrentPage, pageSize)}
                        </td>
                        <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 font-medium text-zinc-200">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-400">
                          {product.channelProductNo ?? product.naverProductId ?? '-'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-zinc-400">{product.smartstore?.name || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                              product.status === 'SALE'
                                ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                                : product.status === 'OUTOFSTOCK'
                                  ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                                  : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-zinc-500">
                          {new Date(product.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              void handleDelete(product.id);
                            }}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 pb-4">
                <PaginationControls
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  start={pagination.start}
                  end={pagination.end}
                  totalCount={products.length}
                  onChangePage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
