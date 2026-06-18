'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  FileDown,
  FileUp,
  Loader2,
  RefreshCw,
  Search,
  ShieldAlert,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import type {
  StagingMappingCandidate,
  StagingMappingRiskType,
  StagingMappingSummaryResponse,
} from '@/src/types/staging-mapping-preview.types';
import type {
  MappingResolutionDraftEntry,
  MappingResolutionDraftSelectedSku,
} from '@/src/types/mapping-resolution-draft.types';
import {
  getPaginationRange,
  getRowNumber,
} from '@/src/utils/pagination';
import { useConfiguredPageSize } from '@/src/hooks/useConfiguredPageSize';
import {
  buildMappingResolutionSnapshotMetadata,
  createMappingResolutionDraft,
  createResolutionEntryFromCandidate,
  parseMappingResolutionDraft,
  readMappingResolutionDraftFromStorage,
  serializeMappingResolutionDraft,
  writeMappingResolutionDraftToStorage,
} from '@/src/utils/mapping-resolution-draft';

const FILTERS: { value: string; label: string }[] = [
  { value: 'ALL', label: '전체 위험' },
  { value: 'SKU_UNRESOLVED', label: 'SKU 미확정' },
  { value: 'NO_CANDIDATE_SKU', label: '후보 SKU 없음' },
  { value: 'STOCK_SKU_MISSING', label: '재고 SKU 없음' },
  { value: 'DUPLICATE_CANDIDATE', label: '재고/SKU 중복 위험' },
  { value: 'SET_COMPONENT_SKU_UNRESOLVED', label: '세트 구성 SKU 미확정' },
  { value: 'SET_COMPONENT_QUANTITY_INVALID', label: '세트 구성 수량 이상' },
  { value: 'SINGLE', label: '단품' },
  { value: 'SET', label: '세트상품' },
  { value: 'PRODUCT', label: 'PRODUCT' },
  { value: 'OPTION', label: 'OPTION' },
  { value: 'ADDITIONAL', label: 'ADDITIONAL' },
  { value: 'BUNDLE', label: 'BUNDLE' },
  { value: 'RESOLVED', label: '해결됨' },
  { value: 'UNRESOLVED', label: '미해결' },
];

type SkuSearchResultItem = {
  skuCode: string;
  productName: string;
  modelName: string;
  barcode: string;
  stockQty: number;
  cost: number | null;
  salePrice: number | null;
};

export default function MappingRiskResolutionPage() {
  const [summary, setSummary] = useState<StagingMappingSummaryResponse | null>(null);
  const [allCandidates, setAllCandidates] = useState<StagingMappingCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 검색 & 필터 & 페이지네이션 State
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { pageSize, setPageSize } = useConfiguredPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // 해결 Draft State
  const [resolutions, setResolutions] = useState<Record<string, MappingResolutionDraftEntry>>({});
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // ERP SKU 검색 State (상세 패널용)
  const [skuSearchQuery, setSkuSearchQuery] = useState<string>('');
  const [skuSearchResults, setSkuSearchResults] = useState<SkuSearchResultItem[]>([]);
  const [skuSearchLoading, setSkuSearchLoading] = useState(false);

  // 모달 에디터 임시 상태
  const [editingResolvedSku, setEditingResolvedSku] = useState('');
  const [editingResolvedSkuDetails, setEditingResolvedSkuDetails] = useState<MappingResolutionDraftSelectedSku | null>(null);
  const [editingComponents, setEditingComponents] = useState<MappingResolutionDraftEntry['selectedComponents']>([]);
  const [editingAdoptedId, setEditingAdoptedId] = useState('');
  const [editingMemo, setEditingMemo] = useState('');

  // 1. API 스냅샷 기준 정보 추출
  const currentSnapshotMetadata = useMemo(() => {
    if (!summary) return null;
    return buildMappingResolutionSnapshotMetadata(summary.snapshot);
  }, [summary]);
  const candidateMap = useMemo(
    () => new Map(allCandidates.map((row) => [row.id, row])),
    [allCandidates],
  );

  // 3. API 및 localStorage 데이터 로드
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // 3-1. 요약 로드
        const sumRes = await fetch('/api/staging-mapping-preview/summary');
        if (!sumRes.ok) throw new Error('요약 조회에 실패했습니다.');
        const sumData = await sumRes.json() as StagingMappingSummaryResponse;
        if (cancelled) return;
        setSummary(sumData);

        // 3-2. 전체 위험 후보군 로드 (클라이언트 필터링/검색용)
        const candRes = await fetch('/api/staging-mapping-preview/candidates?filter=RISK&page=1&pageSize=1000');
        if (!candRes.ok) throw new Error('위험 후보 로드에 실패했습니다.');
        const candData = await candRes.json();
        if (cancelled) return;
        setAllCandidates(candData.rows || []);

        // 3-3. localStorage 로드 (현재 snapshot 우선, 없으면 최근 draft fallback)
        const rowsById = new Map<string, StagingMappingCandidate>(
          (candData.rows || []).map((row: StagingMappingCandidate) => [row.id, row] as [string, StagingMappingCandidate]),
        );
        const loadResult = readMappingResolutionDraftFromStorage({
          storage: window.localStorage,
          currentSnapshot: buildMappingResolutionSnapshotMetadata(sumData.snapshot),
          rowsById,
        });
        setResolutions(loadResult.draft?.resolutions || {});

      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : '데이터 로드 실패');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // 4. Draft 변경 시 localStorage 자동 임시 저장
  const saveToLocalStorage = (newResolutions: Record<string, MappingResolutionDraftEntry>) => {
    if (!currentSnapshotMetadata) return;
    const draft = createMappingResolutionDraft({
      snapshotMetadata: currentSnapshotMetadata,
      resolutions: newResolutions,
    });
    writeMappingResolutionDraftToStorage({
      storage: window.localStorage,
      draft,
    });
  };

  // 5. JSON 내보내기 (Export)
  const handleExport = () => {
    if (!currentSnapshotMetadata) return;
    const draft = createMappingResolutionDraft({
      snapshotMetadata: currentSnapshotMetadata,
      resolutions,
    });
    const blob = new Blob([serializeMappingResolutionDraft(draft)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mapping-resolution-draft-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 6. JSON 불러오기 (Import)
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = parseMappingResolutionDraft(String(event.target?.result ?? ''), candidateMap);
        if (!parsed) {
          throw new Error('해결 draft 형식을 해석할 수 없습니다.');
        }
        
        // snapshot 검증
        const isSnapshotMatch = Boolean(currentSnapshotMetadata)
          && parsed.snapshotMetadata.snapshotKey === currentSnapshotMetadata?.snapshotKey;

        if (!isSnapshotMatch) {
          const proceed = window.confirm(
            '⚠️ 현재 staging snapshot과 불러온 해결 draft의 기준 데이터가 다릅니다.\n그대로 불러오면 결과가 맞지 않을 수 있습니다. 그래도 덮어쓰시겠습니까?'
          );
          if (!proceed) return;
        }

        setResolutions(parsed.resolutions || {});
        saveToLocalStorage(parsed.resolutions || {});
        alert('해결 Draft를 성공적으로 불러왔습니다.');
      } catch (err) {
        console.error('Import draft error:', err);
        alert('JSON 파싱에 실패했습니다. 올바른 형식의 백업 파일인지 확인하세요.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // 초기화
  };

  // 7. ERP SKU 검색 요청
  const handleSkuSearch = async (q: string) => {
    if (!q.trim()) return;
    setSkuSearchLoading(true);
    try {
      const res = await fetch(`/api/staging-stock/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json() as SkuSearchResultItem[];
        setSkuSearchResults(data);
      }
    } catch (err) {
      console.error('SKU Search Error:', err);
    } finally {
      setSkuSearchLoading(false);
    }
  };

  // 8. 편집 확장 패널 열기/닫기 및 초기 상태 설정
  const toggleRowExpansion = (row: StagingMappingCandidate) => {
    if (expandedRowId === row.id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(row.id);
      setSkuSearchQuery('');
      setSkuSearchResults([]);

      // 기존 해결 내역 불러오기
      const res = resolutions[row.id];
      setEditingResolvedSku(res?.selectedSkuCode || res?.selectedSku?.skuCode || row.candidateSkus[0]?.skuCode || '');
      setEditingResolvedSkuDetails(res?.selectedSku || null);
      
      // 세트 구성품 매핑 복사
      if (row.isSetProduct) {
        const comps = res?.selectedComponents || row.setComponents.map((c) => ({
          skuCode: c.skuCode,
          quantity: c.quantity,
          sourceName: c.sourceName,
          resolved: c.resolved,
          internalSkuCode: c.internalSkuCode,
          legacyStockCode: c.legacyStockCode,
          barcode: c.barcode,
          productName: c.productName,
          purchaseProductName: '',
          sellingPrice: c.sellingPrice,
          costPrice: c.costPrice,
          stockQuantity: c.stockQuantity,
          matchSource: '해결 draft',
        }));
        setEditingComponents(comps);
      } else {
        setEditingComponents([]);
      }

      setEditingAdoptedId(res?.adoptedCandidateId || '');
      setEditingMemo(res?.memo || '');
    }
  };

  // 9. 해결 임시 저장 수행
  const handleSaveResolution = (row: StagingMappingCandidate) => {
    const rowId = row.id;
    const isSet = row.isSetProduct;
    // 세트 수량 비정상 수량 검증
    if (isSet && editingComponents) {
      const hasInvalidQty = editingComponents.some(c => c.quantity === null || c.quantity <= 0);
      if (hasInvalidQty) {
        const proceed = window.confirm('⚠️ 구성 수량이 올바르지 않거나(0 이하) 비어있습니다. 그래도 저장하시겠습니까?');
        if (!proceed) return;
      }
    }

    const matchedDraftSku = !isSet && editingResolvedSku
      ? row.candidateSkus.find((sku) => sku.skuCode === editingResolvedSku)
        ?? row.existingSkus.find((sku) => sku.skuCode === editingResolvedSku)
      : null;
    const resolvedSku = !isSet
      ? editingResolvedSkuDetails
        ?? (matchedDraftSku
          ? {
            skuCode: matchedDraftSku.skuCode,
            internalSkuCode: matchedDraftSku.internalSkuCode,
            legacyStockCode: matchedDraftSku.legacyStockCode,
            barcode: matchedDraftSku.barcode,
            productName: matchedDraftSku.productName,
            purchaseProductName: matchedDraftSku.purchaseProductName,
            quantity: matchedDraftSku.quantity,
            sellingPrice: matchedDraftSku.sellingPrice,
            costPrice: matchedDraftSku.costPrice,
            stockQuantity: matchedDraftSku.stockQuantity,
            matchSource: matchedDraftSku.matchSource || '해결 draft',
          }
          : editingResolvedSku
            ? {
              skuCode: editingResolvedSku,
              internalSkuCode: null,
              legacyStockCode: '',
              barcode: '',
              productName: '',
              purchaseProductName: '',
              quantity: 1,
              sellingPrice: null,
              costPrice: null,
              stockQuantity: null,
              matchSource: '해결 draft',
            }
            : null)
      : null;
    const item = createResolutionEntryFromCandidate({
      row,
      selectedSkuCode: !isSet ? editingResolvedSku || undefined : undefined,
      selectedSku: !isSet ? resolvedSku : null,
      selectedComponents: isSet ? editingComponents : undefined,
      quantity: !isSet ? (resolvedSku?.quantity ?? 1) : undefined,
      memo: editingMemo || undefined,
      adoptedCandidateId: editingAdoptedId || undefined,
    });

    const newResolutions = {
      ...resolutions,
      [rowId]: item,
    };

    setResolutions(newResolutions);
    saveToLocalStorage(newResolutions);
    setExpandedRowId(null); // 패널 닫기
    setEditingResolvedSkuDetails(null);
  };

  // 10. 해결 초기화
  const handleClearResolution = (rowId: string) => {
    const newResolutions = { ...resolutions };
    delete newResolutions[rowId];
    setResolutions(newResolutions);
    saveToLocalStorage(newResolutions);
    setExpandedRowId(null);
    setEditingResolvedSkuDetails(null);
  };

  // 11. 세트 실시간 재계산 도우미
  const calculatedSetMetrics = useMemo(() => {
    if (!editingComponents || editingComponents.length === 0) return null;
    
    // 세트 원가 = 각 구성 SKU 원가 * 구성 수량 합계
    const isCostCalculable = editingComponents.every(c => c.resolved && c.costPrice !== null && c.quantity !== null);
    const setCostPrice = isCostCalculable
      ? editingComponents.reduce((sum, c) => sum + (c.costPrice ?? 0) * (c.quantity ?? 0), 0)
      : null;

    // 세트 판매가능 재고 = 구성 SKU 재고 / 구성 수량 중 최소 정수값
    const isStockCalculable = editingComponents.every(c => c.resolved && c.stockQuantity !== null && c.quantity !== null && (c.quantity ?? 0) > 0);
    const sellableSetStock = isStockCalculable
      ? Math.min(...editingComponents.map(c => Math.floor((c.stockQuantity ?? 0) / (c.quantity ?? 1))))
      : null;

    const allResolved = editingComponents.every(c => c.resolved && c.skuCode);

    return {
      setCostPrice,
      sellableSetStock,
      isCostCalculable,
      isStockCalculable,
      allResolved,
    };
  }, [editingComponents]);

  // 12. 클라이언트 사이드 검색 & 필터링 로직
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((row) => {
      // 12-1. 위험 유형 필터 매핑
      if (filter !== 'ALL') {
        const itemRes = resolutions[row.id];
        const isResolved = itemRes?.status === 'RESOLVED';

        if (filter === 'RESOLVED') {
          if (!isResolved) return false;
        } else if (filter === 'UNRESOLVED') {
          if (isResolved) return false;
        } else if (filter === 'SINGLE') {
          if (row.isSetProduct) return false;
        } else if (filter === 'SET') {
          if (!row.isSetProduct) return false;
        } else if (['PRODUCT', 'OPTION', 'ADDITIONAL', 'BUNDLE'].includes(filter)) {
          if (row.candidateType !== filter) return false;
        } else {
          // 상세 위험 유형 매칭
          if (!row.riskTypes.includes(filter as StagingMappingRiskType)) return false;
        }
      }

      // 12-2. 검색어 매칭 (상품명, 옵션명, 추가상품명, 후보 SKU, 기존 SKU, internalSkuCode 등)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (row.itemName ?? '').toLowerCase().includes(q)
          || (row.productName ?? '').toLowerCase().includes(q);
        const matchesSku = row.candidateSkus.some((s) =>
          (s.skuCode ?? '').toLowerCase().includes(q)
          || (s.internalSkuCode ?? '').toLowerCase().includes(q)
          || (s.legacyStockCode ?? '').toLowerCase().includes(q)
        ) || row.existingSkus.some((s) =>
          (s.skuCode ?? '').toLowerCase().includes(q)
        );
        const matchesProductNo = (row.channelProductNo ?? '').includes(q);

        if (!matchesName && !matchesSku && !matchesProductNo) return false;
      }

      return true;
    });
  }, [allCandidates, filter, searchQuery, resolutions]);

  // 13. 요약 카드 수치 계산
  const summaryCounts = useMemo(() => {
    const uniqueRiskCandidates = allCandidates.filter(c => !c.isDuplicate);
    const resolvedCount = Object.keys(resolutions).length;

    // 세트 BUNDLE 위험 후보 수 집계 (isSetProduct가 true이고 위험인 후보 수)
    const setRiskCount = uniqueRiskCandidates.filter(c => c.isSetProduct).length;

    return {
      totalRisk: uniqueRiskCandidates.length,
      skuUnresolved: uniqueRiskCandidates.filter(c => c.riskTypes.includes('SKU_UNRESOLVED')).length,
      noCandidateSku: uniqueRiskCandidates.filter(c => c.riskTypes.includes('NO_CANDIDATE_SKU')).length,
      stockSkuMissing: uniqueRiskCandidates.filter(c => c.riskTypes.includes('STOCK_SKU_MISSING')).length,
      duplicateRisk: uniqueRiskCandidates.filter(c => c.riskTypes.includes('DUPLICATE_CANDIDATE')).length,
      setSkuUnresolved: uniqueRiskCandidates.filter(c => c.riskTypes.includes('SET_COMPONENT_SKU_UNRESOLVED')).length,
      setQtyInvalid: uniqueRiskCandidates.filter(c => c.riskTypes.includes('SET_COMPONENT_QUANTITY_INVALID')).length,
      setRiskCount,
      resolvedCount,
      unresolvedCount: Math.max(0, uniqueRiskCandidates.length - resolvedCount),
    };
  }, [allCandidates, resolutions]);

  // 14. 페이지네이션 범위 추출
  const paginationRange = useMemo(() => {
    return getPaginationRange(
      filteredCandidates.length,
      pageSize,
      currentPage
    );
  }, [filteredCandidates, pageSize, currentPage]);

  const paginatedRows = useMemo(() => {
    if (pageSize === 'ALL') return filteredCandidates;
    const startIdx = (currentPage - 1) * pageSize;
    return filteredCandidates.slice(startIdx, startIdx + pageSize);
  }, [filteredCandidates, currentPage, pageSize]);

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">위험 후보 정리</h1>
            <p className="mt-2 text-sm text-zinc-400">staging 스냅샷의 매핑 위험 요소를 실시간 검토하여 해결 Draft를 작성합니다.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setRefreshKey(key => key + 1)}
              className="tms-control inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] bg-[#121214] text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60"
            >
              <RefreshCw className="h-4 w-4" />
              목록 새로고침
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="tms-control inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-sm font-semibold text-indigo-300 transition hover:border-indigo-400"
            >
              <FileDown className="h-4 w-4" />
              해결 Draft 내보내기 (JSON)
            </button>
            <label className="tms-control inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400">
              <FileUp className="h-4 w-4" />
              해결 Draft 불러오기 (JSON)
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </header>

        {/* 중요 경고 배너 */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3.5 text-sm text-amber-300">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <div>
              <p className="font-semibold">브라우저 임시 저장 안내</p>
              <p className="mt-0.5 text-xs text-amber-400/80">현재 해결 draft는 이 브라우저에 임시 저장됩니다. PC나 브라우저가 바뀌면 보이지 않을 수 있으므로 JSON 내보내기를 사용하세요.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-4 py-3.5 text-sm text-indigo-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <div>
              <p className="font-semibold">운영 매핑 테이블 미반영 안내</p>
              <p className="mt-0.5 text-xs text-indigo-400/80">이 화면의 저장은 운영 매핑 테이블에 반영되지 않습니다. staging 검토용 draft입니다.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 위험 후보 요약 카드 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">위험 후보 요약</h2>
          </div>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-5 xl:grid-cols-10">
            <div className="rounded-lg border border-rose-500/20 bg-[#0c0c0e] p-3 text-center text-rose-300">
              <p className="text-[10px] text-zinc-500 font-semibold">전체 위험 후보 수</p>
              <p className="mt-1.5 text-xl font-bold">{summaryCounts.totalRisk}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">SKU 미확정</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.skuUnresolved}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">후보 SKU 없음</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.noCandidateSku}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">재고 SKU 없음</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.stockSkuMissing}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">재고/SKU 중복 위험</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.duplicateRisk}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">세트 SKU 미확정</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.setSkuUnresolved}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">세트 구성 수량 이상</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.setQtyInvalid}</p>
            </div>
            <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-3 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">세트/BUNDLE 위험</p>
              <p className="mt-1.5 text-xl font-bold text-zinc-200">{summaryCounts.setRiskCount}</p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-[#0c0c0e] p-3 text-center text-emerald-300">
              <p className="text-[10px] text-zinc-500 font-semibold">해결 draft 작성</p>
              <p className="mt-1.5 text-xl font-bold">{summaryCounts.resolvedCount}</p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-[#0c0c0e] p-3 text-center text-amber-300">
              <p className="text-[10px] text-zinc-500 font-semibold">미해결 수</p>
              <p className="mt-1.5 text-xl font-bold">{summaryCounts.unresolvedCount}</p>
            </div>
          </div>
        </section>

        {/* 필터 및 검색 */}
        <section className="space-y-4">
          <div className="tms-toolbar flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="tms-toolbar flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setFilter(item.value);
                    setCurrentPage(1);
                  }}
                  className={`tms-control rounded-lg border text-xs font-semibold transition ${
                    filter === item.value
                      ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-200'
                      : 'border-[#333] bg-[#121214] text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="상품명, SKU, 상품번호 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="tms-control w-full rounded-lg border border-[#333] bg-[#121214] py-2 pl-9 pr-4 text-xs font-medium text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="tms-toolbar rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3 flex items-center justify-between">
            <PaginationControls
              currentPage={currentPage}
              totalPages={pageSize === 'ALL' ? 1 : Math.ceil(filteredCandidates.length / pageSize) || 1}
              pageSize={pageSize}
              start={paginationRange.start}
              end={paginationRange.end}
              totalCount={filteredCandidates.length}
              onChangePage={(page) => setCurrentPage(page)}
            />
            <PageSizeSelect
              value={pageSize}
              onChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* 위험 후보 목록 테이블 */}
          <div className="max-h-[60vh] overflow-auto rounded-lg border border-[#262629] bg-[#09090b]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                <span className="text-sm text-zinc-500">위험 후보 데이터를 분석하는 중입니다...</span>
              </div>
            ) : (
              <table className="tms-table min-w-[2800px] w-full text-left text-sm">
                <thead className="sticky top-0 z-20 bg-[#0c0c0e] shadow-[0_1px_0_#262629]">
                  <tr>
                    {[
                      'No.',
                      '스토어 / 채널',
                      '상품번호',
                      '대상 유형',
                      '상품명 / 옵션명 / 추가상품명',
                      '단품 / 세트',
                      '현재 후보 SKU',
                      '후보 SKU 목록',
                      '기존 연결 SKU',
                      '세트 구성 SKU',
                      '위험 유형',
                      '해결 상태',
                      '메모',
                      '조치',
                    ].map((label) => (
                      <th key={label} className="whitespace-nowrap px-3 py-3 text-xs font-medium text-zinc-500">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22]">
                  {paginatedRows.map((row, index) => {
                    const isExpanded = expandedRowId === row.id;
                    const res = resolutions[row.id];
                    const isResolved = res?.status === 'RESOLVED';

                    return (
                      <React.Fragment key={row.id}>
                        <tr className={`align-top transition-colors ${isExpanded ? 'tms-table-row-selected' : 'tms-table-row'}`}>
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-500">
                            {getRowNumber(index, currentPage, pageSize)}
                            {row.isDuplicate && (
                              <span className="ml-1.5 rounded bg-zinc-700/60 px-1 py-0.5 text-[9px] text-zinc-400">중복</span>
                            )}
                          </td>
                          <td className="min-w-40 px-3 py-3">
                            <p className="text-xs font-medium text-zinc-200">{row.storeName || '-'}</p>
                            <p className="mt-1 font-mono text-[10px] text-zinc-500">{row.channelId || '-'}</p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-zinc-300">{row.channelProductNo || '-'}</td>
                          <td className="whitespace-nowrap px-3 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                              row.candidateType === 'PRODUCT'
                                ? 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20'
                                : row.candidateType === 'OPTION'
                                  ? 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/20'
                                  : 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
                            }`}>{row.candidateType}</span>
                          </td>
                          <td className="min-w-80 max-w-96 px-3 py-3">
                            <p className="text-xs font-medium leading-5 text-zinc-200">{row.itemName || '-'}</p>
                            {row.productName && row.productName !== row.itemName && (
                              <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-zinc-500">{row.productName}</p>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                              row.isSetProduct ? 'bg-violet-500/10 text-violet-300 ring-violet-500/20' : 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20'
                            }`}>{row.isSetProduct ? '세트' : '단품'}</span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-zinc-100">
                            {isResolved
                              ? (res.selectedSkuCode || res.selectedSku?.skuCode || '세트 구성 해결됨')
                              : (row.candidateSkus[0]?.skuCode || '미확정')}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-wrap gap-1">
                              {row.candidateSkus.map((s) => (
                                <span key={s.skuCode} className="rounded border border-[#333] bg-[#111] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">{s.skuCode}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-wrap gap-1">
                              {row.existingSkus.map((s) => (
                                <span key={s.skuCode} className="rounded border border-[#333] bg-[#111] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">{s.skuCode}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            {row.isSetProduct ? (
                              <div className="space-y-1 text-xs text-zinc-400 max-w-64">
                                {row.setComponents.map((c, i) => (
                                  <p key={i} className="truncate">
                                    <span className="font-mono text-zinc-300">{c.skuCode || '미확정'}</span> x {c.quantity ?? '?'}
                                  </p>
                                ))}
                              </div>
                            ) : '-'}
                          </td>
                          <td className="min-w-56 px-3 py-3">
                            <div className="flex flex-wrap gap-1">
                              {row.riskMessages.map((msg) => (
                                <span key={msg} className="rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-300 font-semibold">{msg}</span>
                              ))}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {isResolved ? (
                              <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-semibold">
                                <CheckCircle2 className="h-3.5 w-3.5" /> 해결 완료
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-zinc-500">미해결</span>
                            )}
                          </td>
                          <td className="max-w-40 truncate px-3 py-3 text-xs text-zinc-400">{res?.memo || '-'}</td>
                          <td className="whitespace-nowrap px-3 py-3">
                            <button
                              type="button"
                              onClick={() => toggleRowExpansion(row)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1c1c1f] px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-indigo-500"
                            >
                              <span>{isExpanded ? '접기' : '해결하기'}</span>
                              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>
                          </td>
                        </tr>

                        {/* Row Expansion - 위험 해결 상세 패널 */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={14} className="bg-[#111113] border-t border-b border-[#262629] p-5">
                              <div className="max-w-4xl space-y-5">
                                <div>
                                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                    🛠️ 매핑 해결 편집기
                                  </h3>
                                  <p className="mt-1 text-xs text-zinc-500">후보를 검토하고 올바른 SKU 코드를 매칭하여 Draft를 생성합니다.</p>
                                </div>

                                {/* 단품 SKU 해결 UI */}
                                {!row.isSetProduct ? (
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                      <p className="text-xs font-semibold text-zinc-400">후보 SKU 중에서 선택</p>
                                      {row.candidateSkus.length === 0 ? (
                                        <p className="text-xs text-zinc-600">추천 후보 SKU가 없습니다.</p>
                                      ) : (
                                        <div className="flex flex-wrap gap-2">
                                          {row.candidateSkus.map((s) => (
                                            <button
                                              key={s.skuCode}
                                              type="button"
                                              onClick={() => {
                                                setEditingResolvedSku(s.skuCode);
                                                setEditingResolvedSkuDetails({
                                                  skuCode: s.skuCode,
                                                  internalSkuCode: s.internalSkuCode,
                                                  legacyStockCode: s.legacyStockCode,
                                                  barcode: s.barcode,
                                                  productName: s.productName,
                                                  purchaseProductName: s.purchaseProductName,
                                                  quantity: s.quantity,
                                                  sellingPrice: s.sellingPrice,
                                                  costPrice: s.costPrice,
                                                  stockQuantity: s.stockQuantity,
                                                  matchSource: s.matchSource || '해결 draft',
                                                });
                                              }}
                                              className={`rounded-lg border px-3 py-2 text-xs font-mono transition ${
                                                editingResolvedSku === s.skuCode
                                                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                                                  : 'border-[#333] bg-[#1a1a1f] text-zinc-400 hover:border-zinc-500'
                                              }`}
                                            >
                                              {s.skuCode} ({s.productName || '상품명 없음'})
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      <div className="pt-2">
                                        <p className="text-xs font-semibold text-zinc-400">직접 SKU 코드 입력</p>
                                        <input
                                          type="text"
                                          value={editingResolvedSku}
                                          onChange={(e) => {
                                            setEditingResolvedSku(e.target.value);
                                            setEditingResolvedSkuDetails(null);
                                          }}
                                          placeholder="SKU 코드 직접 입력"
                                          className="mt-1.5 w-full max-w-sm rounded-lg border border-[#333] bg-[#1a1a1f] px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500"
                                        />
                                      </div>
                                    </div>

                                    {/* ERP SKU 검색 영역 */}
                                    <div className="border-l border-[#262629] pl-4 space-y-3">
                                      <p className="text-xs font-semibold text-zinc-400">ERP 재고 SKU 검색</p>
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          value={skuSearchQuery}
                                          onChange={(e) => setSkuSearchQuery(e.target.value)}
                                          placeholder="SKU코드, 바코드, 상품명 검색"
                                          className="flex-1 rounded-lg border border-[#333] bg-[#1a1a1f] px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500"
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') void handleSkuSearch(skuSearchQuery);
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => void handleSkuSearch(skuSearchQuery)}
                                          className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                                        >
                                          검색
                                        </button>
                                      </div>
                                      
                                      <div className="max-h-40 overflow-y-auto space-y-1 rounded border border-[#222] bg-[#0c0c0e] p-2">
                                        {skuSearchLoading ? (
                                          <Loader2 className="h-4 w-4 animate-spin text-zinc-500 mx-auto py-4" />
                                        ) : skuSearchResults.length === 0 ? (
                                          <p className="text-center text-xs text-zinc-600 py-4">검색 결과가 없습니다.</p>
                                        ) : (
                                          skuSearchResults.map((sku) => (
                                            <button
                                              key={sku.skuCode}
                                              type="button"
                                              onClick={() => {
                                                setEditingResolvedSku(sku.skuCode);
                                                setEditingResolvedSkuDetails({
                                                  skuCode: sku.skuCode,
                                                  internalSkuCode: null,
                                                  legacyStockCode: '',
                                                  barcode: sku.barcode,
                                                  productName: sku.productName,
                                                  purchaseProductName: '',
                                                  quantity: 1,
                                                  sellingPrice: sku.salePrice,
                                                  costPrice: sku.cost,
                                                  stockQuantity: sku.stockQty,
                                                  matchSource: 'ERP 재고 검색',
                                                });
                                              }}
                                              className="w-full text-left rounded p-1.5 hover:bg-[#1a1a1f] flex items-center justify-between text-xs transition"
                                            >
                                              <span className="font-mono font-semibold text-zinc-300">{sku.skuCode}</span>
                                              <span className="text-zinc-500 truncate max-w-xs">{sku.productName}</span>
                                              <span className="text-[10px] text-emerald-400">{sku.stockQty}개</span>
                                            </button>
                                          ))
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // 세트상품(BUNDLE) 구성 해결 UI
                                  <div className="space-y-4">
                                    <p className="text-xs font-semibold text-zinc-400">세트 구성품 관리 (구성 수량 및 SKU 지정)</p>
                                    <div className="space-y-3">
                                      {editingComponents?.map((comp, compIdx) => (
                                        <div key={compIdx} className="rounded-lg border border-[#222] bg-[#161618] p-3 space-y-2">
                                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                                            <div className="min-w-0 flex-1">
                                              <p className="text-zinc-500 text-[10px]">원본 구성 상품명</p>
                                              <p className="font-medium text-zinc-300 truncate">{comp.sourceName}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              {/* 구성 수량 수정 */}
                                              <div>
                                                <span className="text-[10px] text-zinc-500 mr-2">수량(수정 전: {row.setComponents[compIdx]?.quantity ?? '?'})</span>
                                                <input
                                                  type="number"
                                                  value={comp.quantity === null ? '' : comp.quantity}
                                                  onChange={(e) => {
                                                    const val = e.target.value === '' ? null : Number(e.target.value);
                                                    const updated = [...(editingComponents || [])];
                                                    updated[compIdx] = { ...comp, quantity: val };
                                                    setEditingComponents(updated);
                                                  }}
                                                  className="w-16 rounded border border-[#333] bg-[#0c0c0e] px-2 py-1 text-center font-mono text-zinc-200 outline-none focus:border-indigo-500 text-xs"
                                                />
                                              </div>
                                              {/* 상태 표시 */}
                                              <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                                comp.resolved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                              }`}>{comp.resolved ? '재고연결됨' : '재고미지정'}</span>
                                            </div>
                                          </div>
                                          
                                          {/* 구성 SKU 지정 */}
                                          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#222]/40">
                                            <input
                                              type="text"
                                              value={comp.skuCode}
                                              onChange={(e) => {
                                                const updated = [...(editingComponents || [])];
                                                updated[compIdx] = { ...comp, skuCode: e.target.value };
                                                setEditingComponents(updated);
                                              }}
                                              placeholder="SKU 직접 입력"
                                              className="flex-1 rounded border border-[#333] bg-[#0c0c0e] px-2 py-1 text-xs font-mono text-zinc-300 outline-none focus:border-indigo-500"
                                            />
                                            {/* 간이 SKU 검색 지원 */}
                                            <div className="flex gap-1">
                                              <input
                                                type="text"
                                                placeholder="SKU 검색"
                                                id={`comp-search-${compIdx}`}
                                                className="w-32 rounded border border-[#333] bg-[#0c0c0e] px-2 py-1 text-[11px] text-zinc-400 outline-none focus:border-indigo-500"
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    const q = (e.currentTarget as HTMLInputElement).value;
                                                    void fetch(`/api/staging-stock/search?q=${encodeURIComponent(q)}`).then(async res => {
                                                      if (res.ok) {
                                                        const data = await res.json() as SkuSearchResultItem[];
                                                        if (data.length > 0) {
                                                          const select = data[0];
                                                          const updated = [...(editingComponents || [])];
                                                          updated[compIdx] = {
                                                            ...comp,
                                                            skuCode: select.skuCode,
                                                            resolved: true,
                                                            costPrice: select.cost,
                                                            stockQuantity: select.stockQty,
                                                          };
                                                          setEditingComponents(updated);
                                                        }
                                                      }
                                                    });
                                                  }
                                                }}
                                              />
                                              <span className="text-[10px] text-zinc-500 mt-2">← 엔터 검색</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* 실시간 세트 재계산 결과 노출 */}
                                    {calculatedSetMetrics && (
                                      <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3 flex flex-wrap justify-between gap-4 text-xs">
                                        <div>
                                          <span className="text-zinc-500">실시간 재계산 세트 원가</span>
                                          <p className="mt-1 font-bold text-zinc-200">
                                            {calculatedSetMetrics.isCostCalculable
                                              ? `${calculatedSetMetrics.setCostPrice?.toLocaleString()}원`
                                              : '일부 구성품의 가격 정보가 없어 계산 불가'}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="text-zinc-500">실시간 재계산 판매가능 재고</span>
                                          <p className="mt-1 font-bold text-zinc-200">
                                            {calculatedSetMetrics.isStockCalculable
                                              ? `${calculatedSetMetrics.sellableSetStock?.toLocaleString()}세트`
                                              : '일부 구성품의 재고 정보가 없어 계산 불가'}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="text-zinc-500">안전 후보 충족 여부</span>
                                          <p className="mt-1 font-bold">
                                            {calculatedSetMetrics.allResolved ? (
                                              <span className="text-emerald-400">충족 (구성 완료)</span>
                                            ) : (
                                              <span className="text-rose-400">불충족 (구성 SKU 미확정 상태)</span>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* 중복 후보 해결 UI */}
                                {row.isDuplicate && (
                                  <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-3">
                                    <p className="text-xs font-semibold text-yellow-300">💡 중복 후보 대조 및 채택</p>
                                    <p className="text-[11px] text-zinc-500 leading-4">
                                      스마트스토어 또는 Variant 파일로부터 동일 상품번호 및 옵션명이 중복 감지된 후보입니다. 
                                      어느 후보를 기준으로 정리할지 채택해 주세요. (ProductVariantKeyword 유래 후보를 우선 권장합니다.)
                                    </p>
                                    <div className="flex gap-4">
                                      <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`adopted-candidate-${row.id}`}
                                          checked={editingAdoptedId === row.id}
                                          onChange={() => setEditingAdoptedId(row.id)}
                                          className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>현재 후보 채택 {row.id.startsWith('PVK:') && <strong className="text-violet-400">(PVK 우선 추천)</strong>}</span>
                                      </label>
                                      <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`adopted-candidate-${row.id}`}
                                          checked={editingAdoptedId === 'EXCLUDE'}
                                          onChange={() => setEditingAdoptedId('EXCLUDE')}
                                          className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>이 후보를 매핑에서 제외</span>
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {/* 메모(메모리 에디팅) */}
                                <div className="space-y-1.5">
                                  <p className="text-xs font-semibold text-zinc-400">채택/해결 사유 메모</p>
                                  <textarea
                                    value={editingMemo}
                                    onChange={(e) => setEditingMemo(e.target.value)}
                                    placeholder="해결한 사유나 메모를 입력하세요 (예: ERP 재고 검색 매칭 완료, 수량 이상 수정)"
                                    className="w-full h-16 rounded-lg border border-[#333] bg-[#1a1a1f] px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500"
                                  />
                                </div>

                                {/* 해결 액션 버튼 */}
                                <div className="flex items-center gap-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveResolution(row)}
                                    className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition"
                                  >
                                    해결 완료 Draft 저장
                                  </button>
                                  {isResolved && (
                                    <button
                                      type="button"
                                      onClick={() => handleClearResolution(row.id)}
                                      className="rounded-lg border border-rose-500/30 hover:border-rose-400 bg-rose-500/5 px-4 py-2 text-xs font-semibold text-rose-300 transition"
                                    >
                                      해결 내역 초기화
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => setExpandedRowId(null)}
                                    className="rounded-lg border border-[#333] bg-[#1c1c1f] px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition"
                                  >
                                    취소
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan={14} className="px-4 py-16 text-center text-sm text-zinc-500">조건에 맞는 위험 후보가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={currentPage}
              totalPages={pageSize === 'ALL' ? 1 : Math.ceil(filteredCandidates.length / pageSize) || 1}
              pageSize={pageSize}
              start={paginationRange.start}
              end={paginationRange.end}
              totalCount={filteredCandidates.length}
              onChangePage={(page) => setCurrentPage(page)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
