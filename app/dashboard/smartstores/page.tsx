'use client';

import { useEffect, useState } from 'react';
import { Edit2, HelpCircle, Loader2, Save, Trash2 } from 'lucide-react';
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

export default function SmartstoresPage() {
  const [stores, setStores] = useState<Smartstore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Smartstore | null>(null);
  const [channelIdValues, setChannelIdValues] = useState<Record<string, string>>({});
  const [savingStoreId, setSavingStoreId] = useState<string | null>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStores();
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
        await fetchStores();
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
  };

  const formatDateTime = (value: string | null): string => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">스마트스토어 관리</h1>
            <p className="mt-2 text-sm text-neutral-400">
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

        {/* 안내 패널 (tms-panel) */}
        <div className="tms-panel mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-5">
          <div className="flex gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">네이버 채널 ID (naverChannelId) 설정 안내</h4>
              <ul className="list-disc pl-5 text-xs text-neutral-400 space-y-1">
                <li>
                  <strong className="text-neutral-300">naverChannelId</strong>는 Draft Batch 생성 시 네이버 API 실행 컨텍스트에 필요한 필수 채널 식별자입니다.
                </li>
                <li>
                  기존의 <strong className="text-neutral-300">sellerId</strong>나 <strong className="text-neutral-300">naverAccountId</strong>와는 다른 의미의 고유 채널 값이므로, 정확히 확인된 값만 입력해 주세요.
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
          <div className="tms-panel rounded-2xl border border-[#262629] bg-[#121214] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="tms-table w-full text-left text-sm">
                <thead className="bg-[#0c0c0e]">
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
                <tbody className="divide-y divide-[#1e1e22]">
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

