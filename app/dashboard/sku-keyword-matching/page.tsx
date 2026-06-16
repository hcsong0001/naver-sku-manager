'use client';

import { useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Search,
  Upload,
} from 'lucide-react';
import type {
  SkuKeywordApplyResponse,
  SkuKeywordErrorRow,
  SkuKeywordMatchedRow,
  SkuKeywordPreviewResponse,
  SkuKeywordSummary,
  SkuKeywordWarningRow,
} from '@/src/types/sku-keyword-matching.types';

// ---------------------------------------------------------------------------
// 유틸리티
// ---------------------------------------------------------------------------

type Message = { type: 'success' | 'error'; text: string };
type ResultTab = 'matched' | 'warning' | 'error';

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

function makeUploadFormData(erpFile: File, csvFile: File, stockFile: File): FormData {
  const formData = new FormData();
  formData.append('erpFile', erpFile);
  formData.append('csvFile', csvFile);
  formData.append('stockFile', stockFile);
  return formData;
}

function formatExcludedReasons(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) return '제외 없음';
  return entries.map(([reason, count]) => `${reason} ${count}건`).join(', ');
}

// ---------------------------------------------------------------------------
// 서브 컴포넌트
// ---------------------------------------------------------------------------

function MappingTypeBadge({ type }: { type: string }) {
  const isOption = type === 'OPTION';
  const isProduct = type === 'PRODUCT';
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
        isOption
          ? 'bg-sky-500/10 text-sky-300 ring-sky-500/20'
          : isProduct
            ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
            : 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
      }`}
    >
      {isProduct ? '단일상품' : isOption ? '옵션' : '추가상품'}
    </span>
  );
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 90
      ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
      : pct >= 70
        ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
        : 'bg-red-500/10 text-red-300 ring-red-500/20';
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${color}`}>
      {pct}%
    </span>
  );
}

function ApplyEligibleBadge({ eligible }: { eligible: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
        eligible
          ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
          : 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
      }`}
    >
      {eligible ? '가능' : '검토'}
    </span>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ?? 'border-[#262629] bg-[#0c0c0e]'}`}>
      <p className="text-[11px] font-medium text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function SummaryCards({ summary }: { summary: SkuKeywordSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      <SummaryCard label="ERP 전체 행" value={summary.totalErpRows} />
      <SummaryCard label="매칭 행" value={summary.matchedRowsCount} />
      <SummaryCard
        label="안전 적용 대상"
        value={summary.applyEligibleCount}
        accent="border-emerald-500/20 bg-emerald-500/5"
      />
      <SummaryCard
        label="검토 제외 대상"
        value={summary.applyIneligibleCount}
        accent="border-amber-500/20 bg-amber-500/5"
      />
      <SummaryCard label="중복 의심" value={summary.duplicateCount} />
      <SummaryCard label="세트상품 후보" value={summary.possibleSetCount} />
      <SummaryCard
        label="중복 후보"
        value={summary.possibleDuplicateCount}
        accent="border-amber-500/20 bg-amber-500/5"
      />
      <SummaryCard
        label="경고"
        value={summary.warningCount}
        accent="border-amber-500/20 bg-amber-500/5"
      />
      <SummaryCard
        label="오류"
        value={summary.errorCount}
        accent="border-red-500/20 bg-red-500/5"
      />
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
      <label htmlFor={id} className="text-xs font-medium text-zinc-400">
        {label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-indigo-500/60 hover:text-white"
        >
          <FileSpreadsheet className="h-4 w-4" />
          파일 선택
        </button>
        <div className="flex min-h-10 flex-1 items-center rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 text-sm text-zinc-400">
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

function MatchedRowsTable({ rows }: { rows: SkuKeywordMatchedRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">
        매칭된 행이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#262629]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0c0c0e]">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">매칭 키워드</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">키워드 컬럼</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">바코드</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">SKU</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">매칭 방법</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">신뢰도</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">적용</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">검토 사유</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e22]">
          {rows.map((row, index) => (
            <tr key={`${row.itemId}-${row.barcode}-${index}`} className="hover:bg-[#16161a]">
              <td className="whitespace-nowrap px-4 py-3">
                <MappingTypeBadge type={row.mappingType} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.channelProductNo || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.itemId}
              </td>
              <td className="min-w-64 px-4 py-3 text-zinc-300">{row.sourceText}</td>
              <td className="min-w-48 px-4 py-3 text-indigo-300">{row.matchedKeyword}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">{row.keywordColumn}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                {row.barcode || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-emerald-300">
                {row.skuCode || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">{row.matchMethod}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <ConfidenceBadge confidence={row.confidence} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <ApplyEligibleBadge eligible={row.applyEligible} />
              </td>
              <td className="min-w-72 px-4 py-3 text-zinc-300">{row.reviewReason || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WarningRowsTable({ rows }: { rows: SkuKeywordWarningRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-8 text-center text-sm text-emerald-300">
        경고 행이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-amber-500/20">
      <table className="w-full text-left text-sm">
        <thead className="bg-amber-500/5">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">경고 유형</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">매칭 키워드</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">바코드</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">SKU</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">메시지</th>
            <th className="px-4 py-3 text-xs font-medium text-amber-300">메모</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-500/10">
          {rows.map((row, index) => (
            <tr key={`${row.itemId}-${row.warningType}-${index}`} className="hover:bg-amber-500/5">
              <td className="whitespace-nowrap px-4 py-3">
                <MappingTypeBadge type={row.mappingType} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.channelProductNo || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.itemId}
              </td>
              <td className="min-w-48 px-4 py-3 text-zinc-300">{row.sourceText}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-amber-300">
                {row.warningType}
              </td>
              <td className="min-w-36 px-4 py-3 text-indigo-300">{row.matchedKeyword || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                {row.barcode || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                {row.skuCode || '-'}
              </td>
              <td className="min-w-64 px-4 py-3 text-amber-200">{row.warningMessage}</td>
              <td className="min-w-56 px-4 py-3 text-zinc-300">{row.memo || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ErrorRowsTable({ rows }: { rows: SkuKeywordErrorRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-8 text-center text-sm text-emerald-300">
        오류 행이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-red-500/20">
      <table className="w-full text-left text-sm">
        <thead className="bg-red-500/5">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-red-300">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">원문</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">오류 유형</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">메시지</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-500/10">
          {rows.map((row, index) => (
            <tr key={`${row.itemId}-${row.errorType}-${index}`} className="hover:bg-red-500/5">
              <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{row.mappingType || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.channelProductNo || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                {row.itemId || '-'}
              </td>
              <td className="min-w-48 px-4 py-3 text-zinc-300">{row.sourceText}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-red-300">
                {row.errorType}
              </td>
              <td className="min-w-64 px-4 py-3 text-red-200">{row.errorMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultTabs({
  activeTab,
  preview,
  onTabChange,
}: {
  activeTab: ResultTab;
  preview: SkuKeywordPreviewResponse;
  onTabChange: (tab: ResultTab) => void;
}) {
  const tabs: { key: ResultTab; label: string; count: number }[] = [
    { key: 'matched', label: '매칭 결과', count: preview.matchedRows.length },
    { key: 'warning', label: '경고', count: preview.warningRows.length },
    { key: 'error', label: '오류', count: preview.errorRows.length },
  ];

  return (
    <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? 'bg-zinc-100 text-zinc-950'
                : 'border border-[#333] bg-[#1a1a1e] text-zinc-300 hover:border-indigo-500/60 hover:text-white'
            }`}
          >
            {tab.label}
            <span className="font-mono text-xs">{tab.count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      {activeTab === 'matched' && <MatchedRowsTable rows={preview.matchedRows} />}
      {activeTab === 'warning' && <WarningRowsTable rows={preview.warningRows} />}
      {activeTab === 'error' && <ErrorRowsTable rows={preview.errorRows} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 메인 페이지
// ---------------------------------------------------------------------------

export default function SkuKeywordMatchingPage() {
  const [erpFile, setErpFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [stockFile, setStockFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<SkuKeywordPreviewResponse | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<ResultTab>('matched');
  const [previewing, setPreviewing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [applying, setApplying] = useState(false);

  const resetPreview = () => {
    setPreview(null);
    setMessage(null);
    setActiveTab('matched');
  };

  const validateFiles = (): { erpFile: File; csvFile: File; stockFile: File } | null => {
    if (!erpFile || !csvFile || !stockFile) {
      setMessage({ type: 'error', text: '3개 파일을 모두 업로드하세요.' });
      return null;
    }

    return { erpFile, csvFile, stockFile };
  };

  const handlePreview = async () => {
    const files = validateFiles();
    if (!files) return;

    setPreviewing(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sku-matching/keyword-preview', {
        method: 'POST',
        body: makeUploadFormData(files.erpFile, files.csvFile, files.stockFile),
      });
      const data = await readJson<SkuKeywordPreviewResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '키워드 매칭 검증에 실패했습니다.'));
      }

      setPreview(data as SkuKeywordPreviewResponse);
      setActiveTab('matched');
      setMessage({ type: 'success', text: '키워드 매칭 검증이 완료되었습니다.' });
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

  const handleApply = async () => {
    if (!preview || preview.summary.applyEligibleCount === 0) {
      setMessage({ type: 'error', text: '안전 적용 대상 행이 없습니다.' });
      return;
    }

    setApplying(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sku-matching/keyword-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rows: preview.matchedRows,
          forceApplyWarningRows: false,
          forceApplyIneligibleRows: false,
        }),
      });
      const data = await readJson<SkuKeywordApplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '키워드 매칭 적용에 실패했습니다.'));
      }

      const result = data as SkuKeywordApplyResponse;
      setMessage({
        type: 'success',
        text:
          `총 ${result.appliedCount.toLocaleString()}건 적용 완료. ` +
          `적용 대상 ${result.applyTargetCount.toLocaleString()}건, ` +
          `제외 ${result.excludedCount.toLocaleString()}건. ` +
          `단일상품 ${result.productCount}건, 옵션 ${result.optionCount}건, ` +
          `추가상품 ${result.additionalCount}건, 별칭 ${result.aliasCount}건 등록. ` +
          `제외 사유: ${formatExcludedReasons(result.excludedReasonCounts)}`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : '키워드 매칭 적용에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            키워드 기반 SKU 자동매칭
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            ERP 미매핑 엑셀, 상품관리 CSV, 재고현황 XLS를 업로드하여 매칭키워드 기반으로 SKU를 연결합니다.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <FileUploadInput
              id="erp-file"
              label="① ERP 미매핑 엑셀 (.xlsx)"
              accept=".xlsx,.xls"
              file={erpFile}
              onFileChange={(file) => {
                setErpFile(file);
                resetPreview();
              }}
            />
            <FileUploadInput
              id="csv-file"
              label="② 상품관리 CSV (.csv)"
              accept=".csv"
              file={csvFile}
              onFileChange={(file) => {
                setCsvFile(file);
                resetPreview();
              }}
            />
            <FileUploadInput
              id="stock-file"
              label="③ 재고현황 XLS (.xls)"
              accept=".xls,.xlsx"
              file={stockFile}
              onFileChange={(file) => {
                setStockFile(file);
                resetPreview();
              }}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              onClick={handlePreview}
              disabled={previewing || !erpFile || !csvFile || !stockFile}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-60"
            >
              {previewing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              매칭 검증
            </button>
            <button
              onClick={handleExport}
              disabled={exporting || !erpFile || !csvFile || !stockFile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#333] bg-[#1a1a1e] px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60 hover:text-white disabled:opacity-60"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Preview 결과 Excel 다운로드
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
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

            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    안전 적용 대상 {preview.summary.applyEligibleCount.toLocaleString()}건
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    검토 제외 대상 {preview.summary.applyIneligibleCount.toLocaleString()}건,
                    중복 의심 {preview.summary.duplicateCount.toLocaleString()}건
                  </p>
                </div>
                <button
                  onClick={handleApply}
                  disabled={applying || preview.summary.applyEligibleCount === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                >
                  {applying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  안전 적용 대상만 적용
                </button>
              </div>
            </div>

            <ResultTabs activeTab={activeTab} preview={preview} onTabChange={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}
