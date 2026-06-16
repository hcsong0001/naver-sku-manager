import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import { SKU_ALIAS_TYPES, type SkuAliasType } from '@/src/types/sku.types';
import {
  SKU_ALIAS_IMPORT_HEADERS,
  type SkuAliasImportApplyResponse,
  type SkuAliasImportExcelRow,
  type SkuAliasImportParsedRow,
  type SkuAliasImportPreviewResponse,
  type SkuAliasImportValidRow,
} from '@/src/types/sku-alias-import.types';

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function isAliasType(value: string): value is SkuAliasType {
  return SKU_ALIAS_TYPES.includes(value as SkuAliasType);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function decodeCsvBuffer(buffer: Buffer): string {
  const utf8Text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (!utf8Text.includes('상품일련번호') && !utf8Text.includes('매칭키워드')) {
    return new TextDecoder('euc-kr').decode(buffer);
  }

  return utf8Text;
}

function cleanSkuCode(value: string): string {
  return value
    .replace(/^="/, '')
    .replace(/"$/, '')
    .trim();
}

function findFirstHeader(headers: string[], candidates: string[]): string | null {
  for (const candidate of candidates) {
    const found = headers.find((header) => header.trim() === candidate);
    if (found) return found;
  }

  return null;
}

function sortKeywordHeaders(headers: string[]): string[] {
  return headers
    .filter((header) => header.trim().startsWith('매칭키워드'))
    .sort((left, right) => {
      const leftNumber = Number(left.replace('매칭키워드', ''));
      const rightNumber = Number(right.replace('매칭키워드', ''));
      return (Number.isFinite(leftNumber) ? leftNumber : 0) - (Number.isFinite(rightNumber) ? rightNumber : 0);
    });
}

export function buildSkuAliasTemplateWorkbook(): Buffer {
  const rows: SkuAliasImportExcelRow[] = [
    {
      skuCode: 'SKU-001',
      aliasType: 'MATCH_KEYWORD',
      value: '매칭키워드 예시',
      source: '상품관리파일',
      memo: '상품관리prd 매칭키워드 열',
    },
    {
      skuCode: 'SKU-001',
      aliasType: 'MODEL_NAME',
      value: '모델명 예시',
      source: '상품관리파일',
      memo: '',
    },
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...SKU_ALIAS_IMPORT_HEADERS] });
  worksheet['!cols'] = [{ wch: 18 }, { wch: 28 }, { wch: 36 }, { wch: 20 }, { wch: 36 }];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SKU코드키워드');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}

export function parseProductManagementKeywordCsv(buffer: Buffer): SkuAliasImportParsedRow[] {
  const csvText = decodeCsvBuffer(buffer);
  const workbook = XLSX.read(csvText, { type: 'string', raw: false });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error('상품관리 CSV 파일에 시트가 없습니다.');
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });
  const headers = rows[0] ? Object.keys(rows[0]) : [];
  const skuCodeHeader = findFirstHeader(headers, [
    'skuCode',
    'SKU코드',
    'SKU 코드',
    '우리자체상품코드',
    '자체상품코드',
    '상품코드',
    '사입상품명',
  ]);
  const keywordHeaders = sortKeywordHeaders(headers);

  if (!skuCodeHeader) {
    throw new Error('SKU 코드로 사용할 컬럼을 찾을 수 없습니다. 자체상품코드, 상품코드, 사입상품명 중 하나가 필요합니다.');
  }

  if (keywordHeaders.length === 0) {
    throw new Error('매칭키워드로 시작하는 컬럼을 찾을 수 없습니다.');
  }

  return rows.flatMap((row, rowIndex) => {
    const skuCode = cleanSkuCode(normalizeCell(row[skuCodeHeader]));
    const productName = normalizeCell(row['상품명']);

    return keywordHeaders
      .map((keywordHeader): SkuAliasImportParsedRow | null => {
        const value = normalizeCell(row[keywordHeader]);
        if (!skuCode || !value) return null;

        return {
          skuCode,
          aliasType: 'MATCH_KEYWORD',
          value,
          source: '상품관리파일',
          memo: productName ? `${keywordHeader} / ${productName}` : keywordHeader,
          rowNumber: rowIndex + 2,
        };
      })
      .filter((parsedRow): parsedRow is SkuAliasImportParsedRow => parsedRow !== null);
  });
}

export function parseSkuAliasWorkbook(buffer: Buffer): SkuAliasImportParsedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer', raw: false });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error('엑셀 파일에 시트가 없습니다.');
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });

  return rows
    .map((row, index) => ({
      ...(Object.fromEntries(
        SKU_ALIAS_IMPORT_HEADERS.map((header) => [header, normalizeCell(row[header])])
      ) as SkuAliasImportExcelRow),
      rowNumber: index + 2,
    }))
    .filter((row) => SKU_ALIAS_IMPORT_HEADERS.some((header) => row[header].length > 0));
}

export async function validateSkuAliasRows(
  rows: SkuAliasImportParsedRow[]
): Promise<SkuAliasImportPreviewResponse> {
  const skuCodes = unique(rows.map((row) => row.skuCode));
  const values = unique(rows.map((row) => row.value));
  const [skus, existingAliases] = await Promise.all([
    prisma.sku.findMany({ where: { skuCode: { in: skuCodes } }, select: { id: true, skuCode: true } }),
    prisma.skuAlias.findMany({
      where: { value: { in: values } },
      include: { sku: { select: { skuCode: true } } },
    }),
  ]);

  const skuByCode = new Map(skus.map((sku) => [sku.skuCode, sku]));
  const existingByKey = new Set(
    existingAliases.map((alias) => `${alias.skuId}:${alias.aliasType}:${alias.value}`)
  );
  const existingSkuCodesByValue = new Map<string, Set<string>>();

  for (const alias of existingAliases) {
    const set = existingSkuCodesByValue.get(alias.value) ?? new Set<string>();
    set.add(alias.sku.skuCode);
    existingSkuCodesByValue.set(alias.value, set);
  }

  const seenRows = new Set<string>();
  const validRows: SkuAliasImportValidRow[] = [];
  const errorRows = rows
    .map((row) => {
      const errors: string[] = [];
      const warnings: string[] = [];
      const sku = skuByCode.get(row.skuCode);

      if (!row.skuCode) {
        errors.push('skuCode가 비어 있습니다.');
      } else if (!sku) {
        errors.push('skuCode에 해당하는 SKU가 없습니다.');
      }

      if (!isAliasType(row.aliasType)) {
        errors.push('aliasType이 허용값이 아닙니다.');
      }

      if (!row.value) {
        errors.push('value가 비어 있습니다.');
      }

      const duplicateKey = `${row.skuCode}:${row.aliasType}:${row.value}`;
      if (seenRows.has(duplicateKey)) {
        errors.push('엑셀 안에 같은 skuCode + aliasType + value가 중복되어 있습니다.');
      } else {
        seenRows.add(duplicateKey);
      }

      if (sku && existingByKey.has(`${sku.id}:${row.aliasType}:${row.value}`)) {
        errors.push('이미 등록된 별칭입니다.');
      }

      const existingSkuCodes = existingSkuCodesByValue.get(row.value);
      if (existingSkuCodes && (!row.skuCode || existingSkuCodes.size > 1 || !existingSkuCodes.has(row.skuCode))) {
        warnings.push(`같은 value가 다른 SKU에 이미 등록되어 있습니다: ${Array.from(existingSkuCodes).join(', ')}`);
      }

      if (errors.length === 0 && sku) {
        const validRow = { ...row, skuId: sku.id, warnings };
        validRows.push(validRow);
      }

      return { ...row, errors, warnings };
    })
    .filter((row) => row.errors.length > 0);

  return {
    totalRows: rows.length,
    validRows,
    errorRows,
    warningRows: validRows.filter((row) => row.warnings.length > 0),
  };
}

export async function applySkuAliasRows(
  rows: SkuAliasImportParsedRow[]
): Promise<{ preview: SkuAliasImportPreviewResponse; result: SkuAliasImportApplyResponse | null }> {
  const preview = await validateSkuAliasRows(rows);

  if (preview.errorRows.length > 0) {
    return { preview, result: null };
  }

  await prisma.$transaction(
    preview.validRows.map((row) =>
      prisma.skuAlias.upsert({
        where: { skuId_aliasType_value: { skuId: row.skuId, aliasType: row.aliasType, value: row.value } },
        create: {
          skuId: row.skuId,
          aliasType: row.aliasType,
          value: row.value,
          source: row.source || null,
          memo: row.memo || null,
        },
        update: {},
      })
    )
  );

  return {
    preview,
    result: { appliedCount: preview.validRows.length },
  };
}
