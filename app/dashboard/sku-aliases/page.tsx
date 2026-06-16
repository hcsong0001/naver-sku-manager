'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Download, FileSpreadsheet, Loader2, Upload } from 'lucide-react';
import type {
  SkuAliasImportApplyResponse,
  SkuAliasImportErrorRow,
  SkuAliasImportPreviewResponse,
  SkuAliasImportValidRow,
} from '@/src/types/sku-alias-import.types';
import { SKU_ALIAS_TYPES, type SkuAliasType } from '@/src/types/sku.types';

type Message = { type: 'success' | 'error'; text: string };

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
  return isRecord(value) && typeof value.error === 'string' ? value.error : fallback;
}

async function readJson<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

function ResultTable({ rows, mode }: { rows: (SkuAliasImportValidRow | SkuAliasImportErrorRow)[]; mode: 'valid' | 'error' | 'warning' }) {
  if (rows.length === 0) {
    return <div className="rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 py-8 text-center text-sm text-zinc-500">표시할 행이 없습니다.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#262629]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0c0c0e]">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">행</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">SKU</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">타입</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">값</th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500">{mode === 'error' ? '오류' : '위험 알림'}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e22]">
          {rows.map((row) => (
            <tr key={`${row.rowNumber}-${row.skuCode}-${row.aliasType}-${row.value}`} className="hover:bg-[#16161a]">
              <td className="whitespace-nowrap px-4 py-3 text-zinc-500">{row.rowNumber}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">{row.skuCode}</td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{aliasTypeLabels[row.aliasType as SkuAliasType] ?? row.aliasType}</td>
              <td className="min-w-72 px-4 py-3 text-zinc-200">{row.value}</td>
              <td className="min-w-80 px-4 py-3 text-zinc-400">
                {'errors' in row ? row.errors.join(' / ') : row.warnings.join(' / ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SkuAliasesPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<SkuAliasImportPreviewResponse | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [applying, setApplying] = useState(false);

  const previewFile = async () => {
    if (!file) {
      setMessage({ type: 'error', text: '엑셀 파일을 선택하세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/sku-aliases/import/preview', { method: 'POST', body: formData });
      const data = await readJson<SkuAliasImportPreviewResponse | { error: string }>(response);
      if (!response.ok) throw new Error(getErrorMessage(data, '검증에 실패했습니다.'));
      setPreview(data as SkuAliasImportPreviewResponse);
      setMessage({ type: 'success', text: '검증이 완료되었습니다.' });
    } catch (error) {
      setPreview(null);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '검증에 실패했습니다.' });
    } finally {
      setPreviewing(false);
    }
  };

  const applyRows = async () => {
    if (!preview || preview.validRows.length === 0) return;
    setApplying(true);
    try {
      const response = await fetch('/api/sku-aliases/import/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: preview.validRows }),
      });
      const data = await readJson<SkuAliasImportApplyResponse | { error: string }>(response);
      if (!response.ok) throw new Error(getErrorMessage(data, '적용에 실패했습니다.'));
      setMessage({ type: 'success', text: `${(data as SkuAliasImportApplyResponse).appliedCount.toLocaleString()}건을 적용했습니다.` });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '적용에 실패했습니다.' });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">SKU 코드/키워드</h1>
            <p className="mt-2 text-sm text-zinc-400">우리자체상품코드, 모델명, 매입처코드, 매칭키워드를 엑셀로 등록합니다.</p>
          </div>
          <a href="/api/sku-aliases/export-template" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
            <Download className="h-4 w-4" />
            템플릿 다운로드
          </a>
        </div>

        <div className="mb-6 rounded-2xl border border-[#262629] bg-[#121214] p-6">
          <div className="mb-4 grid gap-2 text-xs text-zinc-400 sm:grid-cols-3">
            {SKU_ALIAS_TYPES.map((type) => <div key={type}>{type}: {aliasTypeLabels[type]}</div>)}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#333] bg-[#1a1a1e] px-4 py-2.5 text-sm font-medium text-zinc-200">
              <FileSpreadsheet className="h-4 w-4" />
              파일 선택
            </button>
            <div className="flex min-h-10 flex-1 items-center rounded-xl border border-[#262629] bg-[#0c0c0e] px-4 text-sm text-zinc-400">{file ? file.name : '선택된 파일 없음'}</div>
            <button onClick={previewFile} disabled={previewing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 disabled:opacity-60">
              {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              업로드 검증
            </button>
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setPreview(null); }} />
          </div>
          {message && (
            <div className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-red-500/20 bg-red-500/10 text-red-300'}`}>
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {message.text}
            </div>
          )}
        </div>

        {preview && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                ['전체 행', preview.totalRows],
                ['정상 행', preview.validRows.length],
                ['오류 행', preview.errorRows.length],
                ['위험 알림', preview.warningRows.length],
              ].map(([label, value]) => (
                <div key={String(label)} className="rounded-xl border border-[#262629] bg-[#0c0c0e] p-4">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{Number(value).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">정상 행</h2>
                <button onClick={applyRows} disabled={applying || preview.validRows.length === 0} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  정상 행 적용
                </button>
              </div>
              <ResultTable rows={preview.validRows} mode="valid" />
            </div>
            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">위험 알림</h2>
              <ResultTable rows={preview.warningRows} mode="warning" />
            </div>
            <div className="rounded-2xl border border-[#262629] bg-[#121214] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">오류 행</h2>
              <ResultTable rows={preview.errorRows} mode="error" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
