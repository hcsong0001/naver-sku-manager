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

type MappingSku = {
  quantity: number;
  sku: { skuCode: string };
};

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function isMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

function formatSkuMappings(mappings: MappingSku[], fallbackSkuCode?: string | null): string {
  if (mappings.length > 0) {
    return mappings
      .map((mapping) => `${mapping.sku.skuCode} x ${mapping.quantity}`)
      .join(', ');
  }

  return fallbackSkuCode ?? '';
}

function parseQuantity(value: string): number | null {
  if (!value) return 1;
  const numberValue = Number(value);
  if (!Number.isInteger(numberValue) || numberValue < 1) return null;
  return numberValue;
}

function readSkuCode(row: SkuMappingParsedRow): string {
  return row.skuCode;
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

      if (!parsed.skuCode && typeof row.newSkuCode !== 'undefined') {
        parsed.skuCode = normalizeCell(row.newSkuCode);
      }

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
    { wch: 28 },
    { wch: 18 },
    { wch: 10 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'SKU매핑');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}

export async function getUnmappedSkuMappingRows(includeMapped = false): Promise<SkuMappingExcelRow[]> {
  const [products, options, additionals] = await Promise.all([
    prisma.naverProduct.findMany({
      where: includeMapped ? undefined : { skuMappings: { none: {} } },
      include: {
        sku: { select: { skuCode: true } },
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
        smartstore: { select: { name: true } },
      },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.naverProductOption.findMany({
      where: includeMapped ? undefined : { skuMappings: { none: {} } },
      include: {
        sku: { select: { skuCode: true } },
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
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
      where: includeMapped ? undefined : { skuMappings: { none: {} } },
      include: {
        sku: { select: { skuCode: true } },
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
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

  const productRows: SkuMappingExcelRow[] = products.map((product) => ({
    mappingType: 'PRODUCT',
    smartstoreName: product.smartstore.name,
    channelProductNo: product.channelProductNo ?? '',
    productName: product.name,
    itemId: product.id,
    itemName: product.name,
    managementCode: '',
    currentSkuCode: formatSkuMappings(product.skuMappings, product.sku?.skuCode),
    skuCode: '',
    quantity: '1',
  }));

  const optionRows: SkuMappingExcelRow[] = options.map((option) => ({
    mappingType: 'OPTION',
    smartstoreName: option.naverProduct.smartstore.name,
    channelProductNo: option.naverProduct.channelProductNo ?? '',
    productName: option.naverProduct.name,
    itemId: option.id,
    itemName: option.optionName || option.optionValue,
    managementCode: option.optionCode ?? '',
    currentSkuCode: formatSkuMappings(option.skuMappings, option.sku?.skuCode),
    skuCode: '',
    quantity: '1',
  }));

  const additionalRows: SkuMappingExcelRow[] = additionals.map((additional) => ({
    mappingType: 'ADDITIONAL',
    smartstoreName: additional.naverProduct.smartstore.name,
    channelProductNo: additional.naverProduct.channelProductNo ?? '',
    productName: additional.naverProduct.name,
    itemId: additional.id,
    itemName: [additional.additionalName, additional.additionalValue].filter(Boolean).join(' / '),
    managementCode: additional.sellerManagementCode ?? '',
    currentSkuCode: formatSkuMappings(additional.skuMappings, additional.sku?.skuCode),
    skuCode: '',
    quantity: '1',
  }));

  return [...productRows, ...optionRows, ...additionalRows];
}

export async function validateSkuMappingRows(
  rows: SkuMappingParsedRow[]
): Promise<SkuMappingPreviewResponse> {
  const skuCodes = unique(rows.map(readSkuCode));
  const productIds = unique(rows.filter((row) => row.mappingType === 'PRODUCT').map((row) => row.itemId));
  const optionIds = unique(rows.filter((row) => row.mappingType === 'OPTION').map((row) => row.itemId));
  const additionalIds = unique(rows.filter((row) => row.mappingType === 'ADDITIONAL').map((row) => row.itemId));

  const [skus, products, options, additionals] = await Promise.all([
    prisma.sku.findMany({
      where: { skuCode: { in: skuCodes } },
      select: { id: true, skuCode: true },
    }),
    prisma.naverProduct.findMany({
      where: { id: { in: productIds } },
      include: {
        sku: { select: { skuCode: true } },
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
        smartstore: { select: { name: true } },
      },
    }),
    prisma.naverProductOption.findMany({
      where: { id: { in: optionIds } },
      include: {
        sku: { select: { skuCode: true } },
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
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
        skuMappings: { include: { sku: { select: { skuCode: true } } }, orderBy: { createdAt: 'asc' } },
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
  const productById = new Map<string, MappingTarget>(
    products.map((product) => [
      product.id,
      {
        id: product.id,
        itemName: product.name,
        managementCode: '',
        currentSkuCode: formatSkuMappings(product.skuMappings, product.sku?.skuCode),
        productName: product.name,
        channelProductNo: product.channelProductNo ?? '',
        smartstoreName: product.smartstore.name,
      },
    ])
  );
  const optionById = new Map<string, MappingTarget>(
    options.map((option) => [
      option.id,
      {
        id: option.id,
        itemName: option.optionName || option.optionValue,
        managementCode: option.optionCode ?? '',
        currentSkuCode: formatSkuMappings(option.skuMappings, option.sku?.skuCode),
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
        currentSkuCode: formatSkuMappings(additional.skuMappings, additional.sku?.skuCode),
        productName: additional.naverProduct.name,
        channelProductNo: additional.naverProduct.channelProductNo ?? '',
        smartstoreName: additional.naverProduct.smartstore.name,
      },
    ])
  );

  const seenRows = new Set<string>();
  const validRows: SkuMappingValidRow[] = [];
  const errorRows = rows
    .map((row) => {
      const errors: string[] = [];
      const skuCode = readSkuCode(row);
      const sku = skuByCode.get(skuCode);
      const quantity = parseQuantity(row.quantity);
      const mappingType = row.mappingType;
      const target = mappingType === 'PRODUCT'
        ? productById.get(row.itemId)
        : mappingType === 'OPTION'
          ? optionById.get(row.itemId)
          : mappingType === 'ADDITIONAL'
            ? additionalById.get(row.itemId)
            : undefined;
      const duplicateKey = `${mappingType}:${row.itemId}:${skuCode}`;

      if (!isMappingType(mappingType)) {
        errors.push('mappingType은 PRODUCT, OPTION, ADDITIONAL 중 하나여야 합니다.');
      }

      if (!row.itemId) {
        errors.push('itemId가 비어 있습니다.');
      } else if (isMappingType(mappingType) && !target) {
        errors.push('매핑 대상 항목을 찾을 수 없습니다.');
      }

      if (skuCode && !sku) {
        errors.push('skuCode에 해당하는 SKU가 없습니다.');
      }

      if (quantity === null) {
        errors.push('quantity는 1 이상의 정수여야 합니다.');
      }

      if (seenRows.has(duplicateKey)) {
        errors.push('같은 항목과 SKU가 엑셀 안에 중복되어 있습니다.');
      } else {
        seenRows.add(duplicateKey);
      }

      const displayRow = {
        ...row,
        smartstoreName: target?.smartstoreName ?? row.smartstoreName,
        channelProductNo: target?.channelProductNo ?? row.channelProductNo,
        productName: target?.productName ?? row.productName,
        itemName: target?.itemName ?? row.itemName,
        managementCode: target?.managementCode ?? row.managementCode,
        currentSkuCode: target?.currentSkuCode ?? row.currentSkuCode,
        skuCode,
        quantity: quantity === null ? row.quantity : String(quantity),
      };

      if (errors.length === 0 && isMappingType(mappingType) && quantity !== null) {
        validRows.push({
          ...displayRow,
          mappingType,
          skuId: sku?.id || '',
          quantityValue: quantity,
        });
      }

      return {
        ...displayRow,
        errors,
      };
    })
    .filter((row) => row.errors.length > 0);

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

  let productCount = 0;
  let optionCount = 0;
  let additionalCount = 0;

  await prisma.$transaction(async (tx) => {
    for (const row of preview.validRows) {
      if (row.mappingType === 'PRODUCT') {
        await tx.naverProductSku.upsert({
          where: { naverProductId_skuId: { naverProductId: row.itemId, skuId: row.skuId } },
          create: { naverProductId: row.itemId, skuId: row.skuId, quantity: row.quantityValue },
          update: { quantity: row.quantityValue },
        });
        productCount += 1;
      } else if (row.mappingType === 'OPTION') {
        await tx.naverProductOptionSku.upsert({
          where: { optionId_skuId: { optionId: row.itemId, skuId: row.skuId } },
          create: { optionId: row.itemId, skuId: row.skuId, quantity: row.quantityValue },
          update: { quantity: row.quantityValue },
        });
        optionCount += 1;
      } else {
        await tx.naverProductAdditionalSku.upsert({
          where: { additionalId_skuId: { additionalId: row.itemId, skuId: row.skuId } },
          create: { additionalId: row.itemId, skuId: row.skuId, quantity: row.quantityValue },
          update: { quantity: row.quantityValue },
        });
        additionalCount += 1;
      }
    }
  });

  return {
    preview,
    result: {
      appliedCount: productCount + optionCount + additionalCount,
      productCount,
      optionCount,
      additionalCount,
    },
  };
}
