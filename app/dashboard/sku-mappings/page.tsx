'use client';

import { useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Upload,
} from 'lucide-react';
import type {
  SkuMappingApplyResponse,
  SkuMappingErrorRow,
  SkuMappingPreviewResponse,
  SkuMappingValidRow,
} from '@/src/types/sku-mapping.types';

type Message = {
  type: 'success' | 'error';
  text: string;
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

function MappingTypeBadge({ type }: { type: string }) {
  const isOption = type === 'OPTION';

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
      isOption
        ? 'bg-sky-500/10 text-sky-300 ring-sky-500/20'
        : 'bg-violet-500/10 text-violet-300 ring-violet-500/20'
    }`}>
      {isOption ? '옵션' : '추가상품'}
    </span>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[#262629] bg-[#0c0c0e] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function ValidRowsTable({ rows }: { rows: SkuMappingValidRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">
        정상 행이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#262629]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0c0c0e]">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">행</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">스토어</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">상품번호</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">항목</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">관리코드</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">신규 SKU</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e22]">
          {rows.map((row) => (
            <tr key={`${row.mappingType}-${row.itemId}-${row.rowNumber}`} className="hover:bg-[#16161a]">
              <td className="whitespace-nowrap px-4 py-3 text-zinc-500">{row.rowNumber}</td>
              <td className="whitespace-nowrap px-4 py-3"><MappingTypeBadge type={row.mappingType} /></td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{row.smartstoreName || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">{row.channelProductNo || '-'}</td>
              <td className="min-w-72 px-4 py-3 text-zinc-300">{row.itemName || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-500">{row.managementCode || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-emerald-300">{row.newSkuCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ErrorRowsTable({ rows }: { rows: SkuMappingErrorRow[] }) {
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
            <th className="px-4 py-3 text-xs font-medium text-red-300">행</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">구분</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">항목 ID</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">항목</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">신규 SKU</th>
            <th className="px-4 py-3 text-xs font-medium text-red-300">오류</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-500/10">
          {rows.map((row) => (
            <tr key={`${row.mappingType}-${row.itemId}-${row.rowNumber}`} className="hover:bg-red-500/5">
              <td className="whitespace-nowrap px-4 py-3 text-zinc-500">{row.rowNumber}</td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{row.mappingType || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">{row.itemId || '-'}</td>
              <td className="min-w-72 px-4 py-3 text-zinc-300">{row.itemName || '-'}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">{row.newSkuCode || '-'}</td>
              <td className="min-w-80 px-4 py-3 text-red-300">{row.errors.join(' / ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SkuMappingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<SkuMappingPreviewResponse | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setMessage(null);
    window.location.href = '/api/sku-mappings/export';
    window.setTimeout(() => setDownloading(false), 1200);
  };

  const handlePreview = async () => {
    if (!file) {
      setMessage({ type: 'error', text: '엑셀 파일을 선택하세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/sku-mappings/import/preview', {
        method: 'POST',
        body: formData,
      });
      const data = await readJson<SkuMappingPreviewResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '엑셀 검증에 실패했습니다.'));
      }

      setPreview(data as SkuMappingPreviewResponse);
      setMessage({ type: 'success', text: '엑셀 검증이 완료되었습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '엑셀 검증에 실패했습니다.';
      setPreview(null);
      setMessage({ type: 'error', text });
    } finally {
      setPreviewing(false);
    }
  };

  const handleApply = async () => {
    if (!preview || preview.validRows.length === 0) {
      setMessage({ type: 'error', text: '적용할 정상 행이 없습니다.' });
      return;
    }

    setApplying(true);
    setMessage(null);

    try {
      const response = await fetch('/api/sku-mappings/import/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: preview.validRows }),
      });
      const data = await readJson<SkuMappingApplyResponse | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'SKU 매핑 적용에 실패했습니다.'));
      }

      const result = data as SkuMappingApplyResponse;
      setMessage({
        type: 'success',
        text: `총 ${result.appliedCount.toLocaleString()}건을 적용했습니다. 옵션 ${result.optionCount.toLocaleString()}건, 추가상품 ${result.additionalCount.toLocaleString()}건`,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : 'SKU 매핑 적용에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">SKU 매핑</h1>
            <p className="mt-2 text-sm text-zinc-400">옵션과 추가상품의 SKU를 엑셀로 일괄 연결합니다.</p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            미매핑 엑셀 다운로드
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">엑셀 파일</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
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
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(event) => {
                  setFile(event.target.files?.[0] ?? null);
                  setPreview(null);
                  setMessage(null);
                }}
              />
            </div>

            <button
              onClick={handlePreview}
              disabled={previewing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-60"
            >
              {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              업로드 검증
            </button>
          </div>

          {message && (
            <div className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/20 bg-red-500/10 text-red-300'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {message.text}
            </div>
          )}
        </div>

        {preview && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryCard label="전체 행" value={preview.totalRows} />
              <SummaryCard label="정상 행" value={preview.validRows.length} />
              <SummaryCard label="오류 행" value={preview.errorRows.length} />
            </div>

            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-white">정상 행</h2>
                <button
                  onClick={handleApply}
                  disabled={applying || preview.validRows.length === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                >
                  {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  정상 행 적용
                </button>
              </div>
              <ValidRowsTable rows={preview.validRows} />
            </div>

            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">오류 행</h2>
              <ErrorRowsTable rows={preview.errorRows} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
