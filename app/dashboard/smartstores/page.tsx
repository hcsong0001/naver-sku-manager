'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Edit2, HelpCircle, Loader2, RefreshCw, Save, Trash2 } from 'lucide-react';
import SmartstoreForm from './components/SmartstoreForm';

type Smartstore = {
  id: string;
  name: string;
  sellerId: string;
  storeUrl?: string;
  naverPartnerType: string;
  naverAccountId?: string | null;
  naverChannelId?: string | null;
  createdAt: string;
  updatedAt: string;
};

type CurrentContextStore = {
  smartstoreId: string;
  name: string;
  sellerId: string;
  naverAccountId: string | null;
  naverChannelId: string | null;
  hasNaverChannelId: boolean;
  productTotal: number;
  productCurrentPriceReady: number;
  productCurrentStockReady: number;
  productCurrentBothReady: number;
  optionTotal: number;
  optionCurrentPriceReady: number;
  optionCurrentStockReady: number;
  optionCurrentBothReady: number;
  additionalTotal: number;
  additionalCurrentPriceReady: number;
  additionalCurrentStockReady: number;
  additionalCurrentBothReady: number;
  latestProductCurrentStateSyncedAt: string | null;
  latestOptionCurrentStateSyncedAt: string | null;
  latestAdditionalCurrentStateSyncedAt: string | null;
};

type CurrentContextSummary = {
  storeTotal: number;
  storesWithNaverChannelId: number;
  storesMissingNaverChannelId: number;
  productTotal: number;
  productCurrentBothReady: number;
  optionTotal: number;
  optionCurrentBothReady: number;
  additionalTotal: number;
  additionalCurrentBothReady: number;
};

type CurrentContextResponse = {
  summary: CurrentContextSummary;
  stores: CurrentContextStore[];
};

function getReadyRate(ready: number, total: number): string {
  if (total === 0) return '0%';
  const rate = Math.round((ready / total) * 1000) / 10;
  return `${rate.toLocaleString('ko-KR')}%`;
}

function getMissingContextItems(store: CurrentContextStore): string[] {
  const missing: string[] = [];
  if (!store.hasNaverChannelId) missing.push('채널 ID');
  if (store.productCurrentBothReady < store.productTotal) missing.push('상품 현재 가격/재고');
  if (store.optionCurrentBothReady < store.optionTotal) missing.push('옵션 현재 가격/재고');
  if (store.additionalCurrentBothReady < store.additionalTotal) missing.push('추가상품 가격/재고');
  return missing;
}

export default function SmartstoresPage() {
  const [stores, setStores] = useState<Smartstore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Smartstore | null>(null);
  const [channelIdValues, setChannelIdValues] = useState<Record<string, string>>({});
  const [savingStoreId, setSavingStoreId] = useState<string | null>(null);
  const [contextData, setContextData] = useState<CurrentContextResponse | null>(null);
  const [contextLoading, setContextLoading] = useState(true);
  const [contextError, setContextError] = useState<string | null>(null);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/smartstores');
      const data = await res.json();
      setStores(data);

      // 각 store의 naverChannelId 입력 상태 초기화
      const inputs = data.reduce((acc: Record<string, string>, store: Smartstore) => {
        acc[store.id] = store.naverChannelId || '';
        return acc;
      }, {});
      setChannelIdValues(inputs);
    } catch (err) {
      console.error('Failed to fetch stores', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentContextSummary = async () => {
    setContextLoading(true);
    setContextError(null);
    try {
      const res = await fetch('/api/smartstores/current-context-summary', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('현재 문맥 준비 상태를 불러오지 못했습니다.');
      }
      const data = (await res.json()) as CurrentContextResponse;
      setContextData(data);
    } catch (error) {
      console.error('현재 문맥 준비 상태 조회 실패', error);
      setContextError(
        error instanceof Error ? error.message : '현재 문맥 준비 상태를 불러오지 못했습니다.',
      );
    } finally {
      setContextLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStores();
      fetchCurrentContextSummary();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 스마트스토어를 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/smartstores/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStores();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChannelIdChange = (id: string, value: string) => {
    setChannelIdValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChannelId = async (id: string) => {
    const val = (channelIdValues[id] || '').trim();
    if (val.length > 100) {
      alert('채널 ID는 최대 100자까지 입력 가능합니다.');
      return;
    }

    setSavingStoreId(id);
    try {
      const res = await fetch(`/api/smartstores/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naverChannelId: val }),
      });

      if (res.ok) {
        await Promise.all([fetchStores(), fetchCurrentContextSummary()]);
        alert('채널 ID가 정상적으로 저장되었습니다.');
      } else {
        const errData = await res.json();
        alert(errData.error || '저장에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('저장 도중 오류가 발생했습니다.');
    } finally {
      setSavingStoreId(null);
    }
  };

  const openAddForm = () => {
    setEditingStore(null);
    setIsFormOpen(true);
  };

  const openEditForm = (store: Smartstore) => {
    setEditingStore(store);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStore(null);
  };

  const handleFormSuccess = () => {
    closeForm();
    fetchStores();
    fetchCurrentContextSummary();
  };

  const formatDateTime = (value: string | null): string => {
    if (!value) return '-';
    return new Date(value).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">스마트스토어 관리</h1>
            <p className="tms-text-muted mt-2 text-sm">
              네이버 스마트스토어 연결 정보와 API 인증 키 및 채널 ID를 관리합니다.
            </p>
          </div>
          <button
            onClick={openAddForm}
            className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            스토어 추가
          </button>
        </div>

        <section className="tms-panel mb-6 rounded-xl border">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">현재 문맥 준비 상태</h2>
              <p className="tms-text-muted mt-1 text-sm">
                외부 API 호출 없이 DB에 저장된 채널 ID와 현재 가격·재고 문맥만 진단합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fetchCurrentContextSummary}
                disabled={contextLoading}
                className="tms-button tms-button-secondary inline-flex items-center gap-2 rounded-lg border text-sm font-semibold"
              >
                <RefreshCw className={`h-4 w-4 ${contextLoading ? 'animate-spin' : ''}`} />
                새로고침
              </button>
              <Link
                href="/dashboard/sku-keyword-matching"
                className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-lg text-sm font-semibold"
              >
                SKU 키워드 매칭 확인
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {contextLoading && !contextData ? (
            <div className="flex min-h-40 items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>
          ) : contextError ? (
            <div className="tms-status-danger rounded-lg border px-4 py-3 text-sm">
              {contextError}
            </div>
          ) : contextData ? (
            <>
              <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="tms-card-muted rounded-lg border p-4">
                  <p className="tms-text-muted text-xs">채널 ID 설정</p>
                  <p className="mt-1 text-xl font-semibold">
                    {contextData.summary.storesWithNaverChannelId.toLocaleString()} /{' '}
                    {contextData.summary.storeTotal.toLocaleString()}
                  </p>
                  <p className="tms-warning-text mt-1 text-xs">
                    미설정 {contextData.summary.storesMissingNaverChannelId.toLocaleString()}개
                  </p>
                </div>
                <div className="tms-card-muted rounded-lg border p-4">
                  <p className="tms-text-muted text-xs">PRODUCT 현재값</p>
                  <p className="mt-1 text-xl font-semibold">
                    {contextData.summary.productCurrentBothReady.toLocaleString()} /{' '}
                    {contextData.summary.productTotal.toLocaleString()}
                  </p>
                  <p className="tms-text-muted mt-1 text-xs">
                    {getReadyRate(
                      contextData.summary.productCurrentBothReady,
                      contextData.summary.productTotal,
                    )} 준비
                  </p>
                </div>
                <div className="tms-card-muted rounded-lg border p-4">
                  <p className="tms-text-muted text-xs">OPTION 현재값</p>
                  <p className="mt-1 text-xl font-semibold">
                    {contextData.summary.optionCurrentBothReady.toLocaleString()} /{' '}
                    {contextData.summary.optionTotal.toLocaleString()}
                  </p>
                  <p className="tms-text-muted mt-1 text-xs">
                    {getReadyRate(
                      contextData.summary.optionCurrentBothReady,
                      contextData.summary.optionTotal,
                    )} 준비
                  </p>
                </div>
                <div className="tms-card-muted rounded-lg border p-4">
                  <p className="tms-text-muted text-xs">ADDITIONAL 현재값</p>
                  <p className="mt-1 text-xl font-semibold">
                    {contextData.summary.additionalCurrentBothReady.toLocaleString()} /{' '}
                    {contextData.summary.additionalTotal.toLocaleString()}
                  </p>
                  <p className="tms-text-muted mt-1 text-xs">
                    {getReadyRate(
                      contextData.summary.additionalCurrentBothReady,
                      contextData.summary.additionalTotal,
                    )} 준비
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="tms-table w-full min-w-[1180px] text-left text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium">스토어</th>
                      <th className="px-4 py-3 text-xs font-medium">채널 ID</th>
                      <th className="px-4 py-3 text-xs font-medium">PRODUCT 준비율</th>
                      <th className="px-4 py-3 text-xs font-medium">OPTION 준비율</th>
                      <th className="px-4 py-3 text-xs font-medium">ADDITIONAL 준비율</th>
                      <th className="px-4 py-3 text-xs font-medium">최근 동기화</th>
                      <th className="px-4 py-3 text-xs font-medium">부족한 항목</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contextData.stores.map((store) => {
                      const missingItems = getMissingContextItems(store);
                      return (
                        <tr key={store.smartstoreId} className="tms-table-row align-top">
                          <td className="px-4 py-3">
                            <p className="tms-row-text-strong font-semibold">{store.name}</p>
                            <p className="tms-row-text-muted mt-1 text-xs">{store.sellerId}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`tms-badge inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                                store.hasNaverChannelId ? 'tms-status-success' : 'tms-status-warning'
                              }`}
                            >
                              {store.hasNaverChannelId ? '설정됨' : '미설정'}
                            </span>
                            {store.naverChannelId && (
                              <p className="tms-row-text-muted mt-1 max-w-48 truncate font-mono text-xs">
                                {store.naverChannelId}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold">
                              {store.productCurrentBothReady.toLocaleString()} /{' '}
                              {store.productTotal.toLocaleString()}{' '}
                              <span className="tms-row-text-muted text-xs">
                                ({getReadyRate(store.productCurrentBothReady, store.productTotal)})
                              </span>
                            </p>
                            <p className="tms-row-text-muted mt-1 text-xs">
                              가격 {store.productCurrentPriceReady.toLocaleString()} · 재고{' '}
                              {store.productCurrentStockReady.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold">
                              {store.optionCurrentBothReady.toLocaleString()} /{' '}
                              {store.optionTotal.toLocaleString()}{' '}
                              <span className="tms-row-text-muted text-xs">
                                ({getReadyRate(store.optionCurrentBothReady, store.optionTotal)})
                              </span>
                            </p>
                            <p className="tms-row-text-muted mt-1 text-xs">
                              가격 {store.optionCurrentPriceReady.toLocaleString()} · 재고{' '}
                              {store.optionCurrentStockReady.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold">
                              {store.additionalCurrentBothReady.toLocaleString()} /{' '}
                              {store.additionalTotal.toLocaleString()}{' '}
                              <span className="tms-row-text-muted text-xs">
                                ({getReadyRate(store.additionalCurrentBothReady, store.additionalTotal)})
                              </span>
                            </p>
                            <p className="tms-row-text-muted mt-1 text-xs">
                              가격 {store.additionalCurrentPriceReady.toLocaleString()} · 재고{' '}
                              {store.additionalCurrentStockReady.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p>상품: {formatDateTime(store.latestProductCurrentStateSyncedAt)}</p>
                            <p>옵션: {formatDateTime(store.latestOptionCurrentStateSyncedAt)}</p>
                            <p>추가: {formatDateTime(store.latestAdditionalCurrentStateSyncedAt)}</p>
                          </td>
                          <td className="px-4 py-3">
                            {missingItems.length === 0 ? (
                              <span className="tms-status-success text-xs font-semibold">준비 완료</span>
                            ) : (
                              <div className="flex max-w-64 flex-wrap gap-1">
                                {missingItems.map((item) => (
                                  <span
                                    key={item}
                                    className="tms-badge tms-status-warning rounded-md border px-2 py-1 text-xs"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {contextData.stores.length === 0 && (
                      <tr>
                        <td colSpan={7} className="tms-text-muted px-4 py-12 text-center">
                          진단할 스마트스토어가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="tms-card-muted mt-4 rounded-lg border p-4 text-xs">
                <p className="font-semibold">진단 기준</p>
                <ul className="tms-text-muted mt-2 list-disc space-y-1 pl-5">
                  <li>naverChannelId가 없으면 CHANNEL_ID_UNAVAILABLE 이슈가 유지됩니다.</li>
                  <li>
                    PRODUCT의 currentSalePrice/currentStockQuantity가 없으면 현재 가격·재고 이슈가 유지됩니다.
                  </li>
                  <li>
                    OPTION의 currentSalePrice/currentStockQuantity는 수집 경로가 아직 없거나 값이 비어 있으면 0건일 수 있습니다.
                  </li>
                  <li>ADDITIONAL은 기존 price/stockQuantity가 모두 있을 때 준비 완료로 계산합니다.</li>
                </ul>
              </div>
            </>
          ) : null}
        </section>

        {/* 안내 패널 (tms-panel) */}
        <div className="tms-panel mb-6 rounded-xl border">
          <div className="flex gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">네이버 채널 ID (naverChannelId) 설정 안내</h4>
              <ul className="tms-text-muted list-disc space-y-1 pl-5 text-xs">
                <li>
                  <strong>naverChannelId</strong>는 Draft Batch 생성 시 네이버 API 실행 컨텍스트에 필요한 필수 채널 식별자입니다.
                </li>
                <li>
                  기존의 <strong>sellerId</strong>나 <strong>naverAccountId</strong>와는 다른 의미의 고유 채널 값이므로, 정확히 확인된 값만 입력해 주세요.
                </li>
                <li>
                  값이 비어 있는 스토어의 상품들은 sku-keyword draft 후보에서 <strong className="text-amber-400">CHANNEL_ID_UNAVAILABLE</strong> 이슈로 차단되어 생성 불가능 상태로 유지됩니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 스마트스토어 테이블 목록 */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="tms-panel overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="tms-table w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">스토어 ID</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">이름</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">판매자 ID (sellerId)</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">계정 ID (accountId)</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">구분</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500" style={{ width: '280px' }}>
                      네이버 채널 ID (naverChannelId)
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500">등록일</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500 text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store) => {
                    const isSaving = savingStoreId === store.id;
                    return (
                      <tr key={store.id} className="tms-table-row align-middle">
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                          {store.id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-semibold text-zinc-200">
                          {store.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                          {store.sellerId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                          {store.naverAccountId || '-'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="inline-flex rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                            {store.naverPartnerType}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={channelIdValues[store.id] ?? ''}
                              onChange={(e) => handleChannelIdChange(store.id, e.target.value)}
                              placeholder="채널 ID 입력"
                              className="tms-control flex-1 rounded-lg border border-[#333] bg-[#1a1a1e] px-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-indigo-500 transition"
                              disabled={isSaving}
                            />
                            <button
                              onClick={() => handleSaveChannelId(store.id)}
                              disabled={isSaving}
                              title="채널 ID 저장"
                              className="tms-button tms-button-secondary p-1.5 rounded-lg border border-[#333] hover:border-indigo-500/60 disabled:opacity-60 transition"
                            >
                              {isSaving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Save className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                          {formatDateTime(store.createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => openEditForm(store)}
                              title="스토어 수정"
                              className="tms-button tms-button-secondary p-1.5 rounded-lg border border-[#333] hover:border-indigo-500/60 transition"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(store.id)}
                              title="스토어 삭제"
                              className="tms-button tms-button-secondary p-1.5 rounded-lg border border-[#333] hover:border-red-500/60 transition text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {stores.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-16 text-center text-sm text-zinc-500">
                        등록된 스마트스토어가 없습니다. &apos;스토어 추가&apos; 버튼을 눌러 스마트스토어를 연동해 주세요.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 스토어 추가/수정 모달 */}
        {isFormOpen && (
          <SmartstoreForm
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initialData={editingStore as any}
            onSuccess={handleFormSuccess}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  );
}

