import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import {
  SKU_MAPPING_HEADERS,
  type SkuMappingApplyResponse,
  type SkuMappingExcelRow,
  type SkuMappingParsedRow,
  type SkuMappingPreviewResponse,
  type SkuMappingType,
  type SkuMappingValidRow,
} from '@/src/types/sku-mapping.types';

type MappingTarget = {
  id: string;
  itemName: string;
  managementCode: string;
  currentSkuCode: string;
  productName: string;
  channelProductNo: string;
  smartstoreName: string;
};

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function isMappingType(value: string): value is SkuMappingType {
  return value === 'OPTION' || value === 'ADDITIONAL';
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

export function parseSkuMappingWorkbook(buffer: Buffer): SkuMappingParsedRow[] {
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
    .map((row, index) => {
      const parsed = Object.fromEntries(
        SKU_MAPPING_HEADERS.map((header) => [header, normalizeCell(row[header])])
      ) as SkuMappingExcelRow;

      return {
        ...parsed,
        rowNumber: index + 2,
      };
    })
    .filter((row) => SKU_MAPPING_HEADERS.some((header) => row[header].length > 0));
}

export function buildSkuMappingWorkbook(rows: SkuMappingExcelRow[]): Buffer {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...SKU_MAPPING_HEADERS] });
  worksheet['!cols'] = [
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 44 },
    { wch: 18 },
    { wch: 44 },
    { wch: 24 },
    { wch: 18 },
    { wch: 18 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'SKU매핑');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}

export async function getUnmappedSkuMappingRows(): Promise<SkuMappingExcelRow[]> {
  const [options, additionals] = await Promise.all([
    prisma.naverProductOption.findMany({
      where: { skuId: null },
      include: {
        sku: { select: { skuCode: true } },
        naverProduct: {
          select: {
            name: true,
            channelProductNo: true,
            smartstore: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.naverProductAdditional.findMany({
      where: { skuId: null },
      include: {
        sku: { select: { skuCode: true } },
        naverProduct: {
          select: {
            name: true,
            channelProductNo: true,
            smartstore: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const optionRows: SkuMappingExcelRow[] = options.map((option) => ({
    mappingType: 'OPTION',
    smartstoreName: option.naverProduct.smartstore.name,
    channelProductNo: option.naverProduct.channelProductNo ?? '',
    productName: option.naverProduct.name,
    itemId: option.id,
    itemName: option.optionName || option.optionValue,
    managementCode: option.optionCode ?? '',
    currentSkuCode: option.sku?.skuCode ?? '',
    newSkuCode: '',
  }));

  const additionalRows: SkuMappingExcelRow[] = additionals.map((additional) => ({
    mappingType: 'ADDITIONAL',
    smartstoreName: additional.naverProduct.smartstore.name,
    channelProductNo: additional.naverProduct.channelProductNo ?? '',
    productName: additional.naverProduct.name,
    itemId: additional.id,
    itemName: [additional.additionalName, additional.additionalValue].filter(Boolean).join(' / '),
    managementCode: additional.sellerManagementCode ?? '',
    currentSkuCode: additional.sku?.skuCode ?? '',
    newSkuCode: '',
  }));

  return [...optionRows, ...additionalRows];
}

export async function validateSkuMappingRows(
  rows: SkuMappingParsedRow[]
): Promise<SkuMappingPreviewResponse> {
  const newSkuCodes = unique(rows.map((row) => row.newSkuCode));
  const optionIds = unique(
    rows.filter((row) => row.mappingType === 'OPTION').map((row) => row.itemId)
  );
  const additionalIds = unique(
    rows.filter((row) => row.mappingType === 'ADDITIONAL').map((row) => row.itemId)
  );

  const [skus, options, additionals] = await Promise.all([
    prisma.sku.findMany({
      where: { skuCode: { in: newSkuCodes } },
      select: { id: true, skuCode: true },
    }),
    prisma.naverProductOption.findMany({
      where: { id: { in: optionIds } },
      include: {
        sku: { select: { skuCode: true } },
        naverProduct: {
          select: {
            name: true,
            channelProductNo: true,
            smartstore: { select: { name: true } },
          },
        },
      },
    }),
    prisma.naverProductAdditional.findMany({
      where: { id: { in: additionalIds } },
      include: {
        sku: { select: { skuCode: true } },
        naverProduct: {
          select: {
            name: true,
            channelProductNo: true,
            smartstore: { select: { name: true } },
          },
        },
      },
    }),
  ]);

  const skuByCode = new Map(skus.map((sku) => [sku.skuCode, sku]));
  const optionById = new Map<string, MappingTarget>(
    options.map((option) => [
      option.id,
      {
        id: option.id,
        itemName: option.optionName || option.optionValue,
        managementCode: option.optionCode ?? '',
        currentSkuCode: option.sku?.skuCode ?? '',
        productName: option.naverProduct.name,
        channelProductNo: option.naverProduct.channelProductNo ?? '',
        smartstoreName: option.naverProduct.smartstore.name,
      },
    ])
  );
  const additionalById = new Map<string, MappingTarget>(
    additionals.map((additional) => [
      additional.id,
      {
        id: additional.id,
        itemName: [additional.additionalName, additional.additionalValue].filter(Boolean).join(' / '),
        managementCode: additional.sellerManagementCode ?? '',
        currentSkuCode: additional.sku?.skuCode ?? '',
        productName: additional.naverProduct.name,
        channelProductNo: additional.naverProduct.channelProductNo ?? '',
        smartstoreName: additional.naverProduct.smartstore.name,
      },
    ])
  );

  const validRows: SkuMappingValidRow[] = [];
  const errorRows = rows.map((row) => {
    const errors: string[] = [];
    const sku = skuByCode.get(row.newSkuCode);
    const mappingType = row.mappingType;
    const target = mappingType === 'OPTION'
      ? optionById.get(row.itemId)
      : mappingType === 'ADDITIONAL'
        ? additionalById.get(row.itemId)
        : undefined;

    if (!isMappingType(mappingType)) {
      errors.push('mappingType은 OPTION 또는 ADDITIONAL이어야 합니다.');
    }

    if (!row.itemId) {
      errors.push('itemId가 비어 있습니다.');
    } else if (isMappingType(mappingType) && !target) {
      errors.push('매핑 대상 항목을 찾을 수 없습니다.');
    }

    if (!row.newSkuCode) {
      errors.push('newSkuCode가 비어 있습니다.');
    } else if (!sku) {
      errors.push('newSkuCode에 해당하는 SKU가 없습니다.');
    }

    const displayRow = {
      ...row,
      smartstoreName: target?.smartstoreName ?? row.smartstoreName,
      channelProductNo: target?.channelProductNo ?? row.channelProductNo,
      productName: target?.productName ?? row.productName,
      itemName: target?.itemName ?? row.itemName,
      managementCode: target?.managementCode ?? row.managementCode,
      currentSkuCode: target?.currentSkuCode ?? row.currentSkuCode,
    };

    if (errors.length === 0 && isMappingType(mappingType) && sku) {
      validRows.push({
        ...displayRow,
        mappingType,
        skuId: sku.id,
      });
    }

    return {
      ...displayRow,
      errors,
    };
  }).filter((row) => row.errors.length > 0);

  return {
    totalRows: rows.length,
    validRows,
    errorRows,
  };
}

export async function applySkuMappingRows(
  rows: SkuMappingParsedRow[]
): Promise<{ preview: SkuMappingPreviewResponse; result: SkuMappingApplyResponse | null }> {
  const preview = await validateSkuMappingRows(rows);

  if (preview.errorRows.length > 0) {
    return { preview, result: null };
  }

  let optionCount = 0;
  let additionalCount = 0;

  await prisma.$transaction(async (tx) => {
    for (const row of preview.validRows) {
      if (row.mappingType === 'OPTION') {
        await tx.naverProductOption.update({
          where: { id: row.itemId },
          data: { skuId: row.skuId },
        });
        optionCount += 1;
      } else {
        await tx.naverProductAdditional.update({
          where: { id: row.itemId },
          data: { skuId: row.skuId },
        });
        additionalCount += 1;
      }
    }
  });

  return {
    preview,
    result: {
      appliedCount: optionCount + additionalCount,
      optionCount,
      additionalCount,
    },
  };
}
