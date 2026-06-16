import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import {
  SKU_BARCODE_IMPORT_HEADERS,
  type SkuBarcodeImportApplyResponse,
  type SkuBarcodeImportExcelRow,
  type SkuBarcodeImportParsedRow,
  type SkuBarcodeImportPreviewResponse,
  type SkuBarcodeImportValidRow,
} from '@/src/types/sku-barcode-import.types';

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function parseQuantity(value: string): number | null {
  const numberValue = Number(value || 1);
  if (!Number.isInteger(numberValue) || numberValue < 1) return null;
  return numberValue;
}

function parseBoolean(value: string): boolean | null {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  if (['true', 'y', '1'].includes(normalized)) return true;
  if (['false', 'n', '0'].includes(normalized)) return false;
  return null;
}

export function buildSkuBarcodeTemplateWorkbook(): Buffer {
  const rows: SkuBarcodeImportExcelRow[] = [
    {
      skuCode: 'SKU-001',
      barcode: '880000000001',
      unitName: '낱개',
      quantity: '1',
      barcodeType: 'PRODUCT',
      isPrimary: 'TRUE',
      source: '재고현황파일',
      memo: '대표 바코드',
    },
    {
      skuCode: 'SKU-001',
      barcode: '18800000000018',
      unitName: '소박스',
      quantity: '10',
      barcodeType: 'BOX',
      isPrimary: 'FALSE',
      source: '재고현황파일',
      memo: '소박스 10개',
    },
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...SKU_BARCODE_IMPORT_HEADERS] });
  worksheet['!cols'] = [
    { wch: 18 },
    { wch: 22 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 12 },
    { wch: 18 },
    { wch: 28 },
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SKU바코드');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}

export function parseSkuBarcodeWorkbook(buffer: Buffer): SkuBarcodeImportParsedRow[] {
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
        SKU_BARCODE_IMPORT_HEADERS.map((header) => [header, normalizeCell(row[header])])
      ) as SkuBarcodeImportExcelRow),
      rowNumber: index + 2,
    }))
    .filter((row) => SKU_BARCODE_IMPORT_HEADERS.some((header) => row[header].length > 0));
}

export async function validateSkuBarcodeRows(
  rows: SkuBarcodeImportParsedRow[]
): Promise<SkuBarcodeImportPreviewResponse> {
  const skuCodes = unique(rows.map((row) => row.skuCode));
  const barcodes = unique(rows.map((row) => row.barcode));
  const [skus, existingBarcodes] = await Promise.all([
    prisma.sku.findMany({ where: { skuCode: { in: skuCodes } }, select: { id: true, skuCode: true } }),
    prisma.skuBarcode.findMany({
      where: { barcode: { in: barcodes } },
      include: { sku: { select: { skuCode: true } } },
    }),
  ]);

  const skuByCode = new Map(skus.map((sku) => [sku.skuCode, sku]));
  const existingSkuCodesByBarcode = new Map<string, Set<string>>();

  for (const barcode of existingBarcodes) {
    const set = existingSkuCodesByBarcode.get(barcode.barcode) ?? new Set<string>();
    set.add(barcode.sku.skuCode);
    existingSkuCodesByBarcode.set(barcode.barcode, set);
  }

  const seenRows = new Set<string>();
  const validRows: SkuBarcodeImportValidRow[] = [];
  const errorRows = rows
    .map((row) => {
      const errors: string[] = [];
      const warnings: string[] = [];
      const sku = skuByCode.get(row.skuCode);
      const quantity = parseQuantity(row.quantity);
      const isPrimary = parseBoolean(row.isPrimary);

      if (!row.skuCode) {
        errors.push('skuCode가 비어 있습니다.');
      } else if (!sku) {
        errors.push('skuCode에 해당하는 SKU가 없습니다.');
      }

      if (!row.barcode) {
        errors.push('barcode가 비어 있습니다.');
      }

      if (!row.unitName) {
        errors.push('unitName이 비어 있습니다.');
      }

      if (quantity === null) {
        errors.push('quantity는 1 이상의 정수여야 합니다.');
      }

      if (isPrimary === null) {
        errors.push('isPrimary는 TRUE/FALSE, Y/N, 1/0 중 하나여야 합니다.');
      }

      const duplicateKey = `${row.skuCode}:${row.barcode}`;
      if (seenRows.has(duplicateKey)) {
        errors.push('엑셀 안에 같은 skuCode + barcode가 중복되어 있습니다.');
      } else {
        seenRows.add(duplicateKey);
      }

      const existingSkuCodes = existingSkuCodesByBarcode.get(row.barcode);
      if (existingSkuCodes && (!row.skuCode || existingSkuCodes.size > 1 || !existingSkuCodes.has(row.skuCode))) {
        warnings.push(`같은 barcode가 다른 SKU에 이미 등록되어 있습니다: ${Array.from(existingSkuCodes).join(', ')}`);
      }

      if (errors.length === 0 && sku && quantity !== null && isPrimary !== null) {
        const validRow = {
          ...row,
          skuId: sku.id,
          quantityValue: quantity,
          isPrimaryValue: isPrimary,
          warnings,
        };
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

export async function applySkuBarcodeRows(
  rows: SkuBarcodeImportParsedRow[]
): Promise<{ preview: SkuBarcodeImportPreviewResponse; result: SkuBarcodeImportApplyResponse | null }> {
  const preview = await validateSkuBarcodeRows(rows);

  if (preview.errorRows.length > 0) {
    return { preview, result: null };
  }

  await prisma.$transaction(async (tx) => {
    for (const row of preview.validRows) {
      if (row.isPrimaryValue) {
        await tx.skuBarcode.updateMany({
          where: { skuId: row.skuId },
          data: { isPrimary: false },
        });
      }

      await tx.skuBarcode.upsert({
        where: { skuId_barcode: { skuId: row.skuId, barcode: row.barcode } },
        create: {
          skuId: row.skuId,
          barcode: row.barcode,
          unitName: row.unitName,
          quantity: row.quantityValue,
          barcodeType: row.barcodeType || null,
          isPrimary: row.isPrimaryValue,
          source: row.source || null,
          memo: row.memo || null,
        },
        update: {
          unitName: row.unitName,
          quantity: row.quantityValue,
          barcodeType: row.barcodeType || null,
          isPrimary: row.isPrimaryValue,
          source: row.source || null,
          memo: row.memo || null,
        },
      });
    }
  });

  return {
    preview,
    result: { appliedCount: preview.validRows.length },
  };
}
