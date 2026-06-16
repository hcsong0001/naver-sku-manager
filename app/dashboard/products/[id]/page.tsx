'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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
  createdAt: string;
  updatedAt: string;
  smartstoreId: string;
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

function formatSkuMappings(mappings: SkuMappingDisplay[], fallback?: { skuCode: string } | null): string {
  if (mappings.length > 0) {
    return mappings.map((mapping) => `${mapping.sku.skuCode} x ${mapping.quantity}`).join(', ');
  }

  return fallback ? `${fallback.skuCode} x 1` : '-';
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
      .then((res) => {
        if (!res.ok) throw new Error('상품을 찾을 수 없습니다.');
        return res.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || '상품을 찾을 수 없습니다.'}</p>
        <button onClick={() => router.back()} className="text-sm text-indigo-400 hover:underline">← 돌아가기</button>
      </div>
    );
  }

  const mappedCount = product.options.filter((o) => o.skuMappings.length > 0 || o.skuId).length;
  const unmappedCount = product.options.length - mappedCount;

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push('/dashboard/products')}
          className="mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-[#1a1a1e] hover:text-zinc-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          상품 목록으로 돌아가기
        </button>

        {/* 상품 상단 정보 카드 */}
        <div className="mb-8 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white truncate">{product.name}</h1>
              <p className="mt-1 text-sm text-zinc-500">{product.smartstore.name}</p>
            </div>
            <span className={`ml-4 shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
              product.status === 'SALE'
                ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                : product.status === 'OUTOFSTOCK'
                ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
            }`}>
              {product.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-[#0c0c0e] border border-[#1e1e22] p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">채널상품번호</p>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-200">{product.channelProductNo ?? '-'}</p>
            </div>
            <div className="rounded-xl bg-[#0c0c0e] border border-[#1e1e22] p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">원상품번호</p>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-200">{product.naverProductId ?? '-'}</p>
            </div>
            <div className="rounded-xl bg-[#0c0c0e] border border-[#1e1e22] p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">옵션 수</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">{product.options.length}개</p>
            </div>
            <div className="rounded-xl bg-[#0c0c0e] border border-[#1e1e22] p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">SKU 매핑률</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">
                {product.options.length > 0
                  ? `${Math.round((mappedCount / product.options.length) * 100)}%`
                  : '-'}
                <span className="ml-1 text-xs text-zinc-500">({mappedCount}/{product.options.length})</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <h2 className="mb-3 text-lg font-semibold text-white">단일상품 연결 SKU</h2>
          <div className="rounded-xl border border-[#1e1e22] bg-[#0c0c0e] px-4 py-3 font-mono text-sm text-emerald-300">
            {formatSkuMappings(product.skuMappings, product.sku)}
          </div>
        </div>

        {/* 옵션 목록 */}
        <div className="rounded-2xl border border-[#262629] bg-[#121214] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#262629] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              옵션 목록
              <span className="ml-2 text-sm font-normal text-zinc-500">({product.options.length}건)</span>
            </h2>
            {unmappedCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse"></span>
                미매핑 {unmappedCount}건
              </span>
            )}
          </div>

          {product.options.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="mb-3 h-10 w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-zinc-400">등록된 옵션이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">옵션명</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">옵션값</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">옵션코드</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">재고</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {product.options.map((opt) => (
                    <tr key={opt.id} className="transition-colors hover:bg-[#16161a]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-200">{opt.optionName}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-zinc-400">{opt.optionValue}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-500">{opt.optionCode ?? '-'}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-zinc-300">
                        {opt.sku ? opt.sku.stockQuantity.toLocaleString() : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {opt.skuMappings.length > 0 || (opt.skuId && opt.sku) ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            {formatSkuMappings(opt.skuMappings, opt.sku)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                            미매핑
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 추가 정보 */}
        {product.additionals.length > 0 && (
          <div className="mt-6 rounded-2xl border border-[#262629] bg-[#121214] overflow-hidden">
            <div className="border-b border-[#262629] px-6 py-4">
              <h2 className="text-lg font-semibold text-white">추가 상품 정보</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#262629] bg-[#0c0c0e]">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">항목</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">값</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">판매자관리코드</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">SKU 매핑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {product.additionals.map((add) => (
                    <tr key={add.id} className="transition-colors hover:bg-[#16161a]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-200">{add.additionalName}</td>
                      <td className="px-6 py-4 text-zinc-400">{add.additionalValue}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-500">{add.sellerManagementCode ?? '-'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-emerald-300">{formatSkuMappings(add.skuMappings, add.sku)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
