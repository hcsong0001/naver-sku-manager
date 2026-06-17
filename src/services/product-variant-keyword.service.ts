import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import type {
  ProductVariantKeywordPreviewResponse,
  ProductVariantKeywordPreviewRow,
  ProductVariantKeywordResolvedSku,
} from '@/src/types/product-variant-keyword.types';

type ProductVariantKeywordParsedRow = {
  rowNumber: number;
  serialNo: string;
  productMatchName: string;
  productOptionText: string;
  stockMatchedProductName: string;
  stockMatchedOptionText: string;
  quantityText: string;
};

type ProductVariantKeywordGroup = {
  serialNo: string;
  productMatchName: string;
  productOptionText: string;
  rows: ProductVariantKeywordParsedRow[];
};

type ProductTarget = {
  mappingType: 'OPTION' | 'ADDITIONAL';
  itemId: string;
  itemName: string;
  primaryText: string;
  secondaryText: string;
  optionCode: string;
};

type SkuLookupRow = {
  id: string;
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  stockQuantity: number;
  aliases: {
    aliasType: string;
    value: string;
    source: string | null;
    memo: string | null;
  }[];
  barcodes: {
    barcode: string;
    unitName: string;
    quantity: number;
    isPrimary: boolean;
  }[];
};

type SkuResolution = {
  sku: SkuLookupRow | null;
  modelCode: string;
  confidence: number;
  warningMessage: string;
};

const PRODUCT_VARIANT_HEADERS = [
  '일련번호',
  '상품명(상품매칭)',
  '상품옵션',
  '재고매칭 상품명',
  '재고매칭 옵션내용',
  '재고매칭 설정수량',
] as const;

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function normalizeComparable(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function extractOptionCode(text: string): string {
  const match = text.normalize('NFKC').match(/(?:^|[^A-Z0-9])([A-Z])\s*[-_]\s*(\d{1,3})(?=$|[^0-9])/i);
  return match ? `${match[1].toUpperCase()}-${Number(match[2])}` : '';
}

function extractModelCodes(text: string): string[] {
  const normalized = text.normalize('NFKC').toUpperCase();
  const candidates = [
    ...normalized.matchAll(/\b[A-Z]{1,}[A-Z0-9]*-\d[A-Z0-9-]*\b/g),
    ...normalized.matchAll(/\b[A-Z]{2,}\d{2,}[A-Z0-9-]*\b/g),
  ].map((match) => match[0]);

  return unique(candidates.filter((code) => !/^[A-Z]-\d+$/.test(code) && code.length >= 5));
}

function parseQuantity(quantityText: string): number {
  const normalized = quantityText.normalize('NFKC');
  const multiplied = normalized.match(/(?:X|\*)\s*(\d+)\s*개?/i);
  if (multiplied) return Math.max(Number(multiplied[1]), 1);

  const plain = normalized.match(/^(\d+)\s*개?$/);
  if (plain) return Math.max(Number(plain[1]), 1);

  return 1;
}

function parseProductVariantKeywordWorkbook(buffer: Buffer): ProductVariantKeywordParsedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer', raw: false });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error('ProductVariantKeyword 파일에 시트가 없습니다.');
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });

  return rows
    .map((row, index) => ({
      rowNumber: index + 2,
      serialNo: normalizeCell(row['일련번호']),
      productMatchName: normalizeCell(row['상품명(상품매칭)']),
      productOptionText: normalizeCell(row['상품옵션']),
      stockMatchedProductName: normalizeCell(row['재고매칭 상품명']),
      stockMatchedOptionText: normalizeCell(row['재고매칭 옵션내용']),
      quantityText: normalizeCell(row['재고매칭 설정수량']),
    }))
    .filter((row) =>
      PRODUCT_VARIANT_HEADERS.some((header) => normalizeCell(rows[row.rowNumber - 2]?.[header]).length > 0),
    );
}

function groupRows(rows: ProductVariantKeywordParsedRow[]): ProductVariantKeywordGroup[] {
  const groups = new Map<string, ProductVariantKeywordGroup>();

  for (const row of rows) {
    if (!row.serialNo || !row.stockMatchedProductName) continue;

    const group = groups.get(row.serialNo) ?? {
      serialNo: row.serialNo,
      productMatchName: row.productMatchName,
      productOptionText: row.productOptionText,
      rows: [],
    };

    group.rows.push(row);
    groups.set(row.serialNo, group);
  }

  return Array.from(groups.values());
}

function buildProductTargets(product: {
  options: { id: string; optionName: string; optionValue: string; optionCode: string | null }[];
  additionals: {
    id: string;
    additionalName: string;
    additionalValue: string;
    sellerManagementCode: string | null;
  }[];
}): ProductTarget[] {
  const optionTargets = product.options.map((option): ProductTarget => ({
    mappingType: 'OPTION',
    itemId: option.id,
    itemName: [option.optionName, option.optionValue].filter(Boolean).join(' / '),
    primaryText: option.optionName,
    secondaryText: option.optionValue,
    optionCode: extractOptionCode([option.optionName, option.optionValue, option.optionCode ?? ''].join(' ')),
  }));
  const additionalTargets = product.additionals.map((additional): ProductTarget => ({
    mappingType: 'ADDITIONAL',
    itemId: additional.id,
    itemName: [additional.additionalName, additional.additionalValue].filter(Boolean).join(' / '),
    primaryText: additional.additionalName,
    secondaryText: additional.additionalValue,
    optionCode: extractOptionCode(
      [additional.additionalName, additional.additionalValue, additional.sellerManagementCode ?? ''].join(' '),
    ),
  }));

  return [...optionTargets, ...additionalTargets];
}

function getTargetScore(group: ProductVariantKeywordGroup, target: ProductTarget): number {
  const groupText = group.productOptionText || group.productMatchName;
  const groupNorm = normalizeComparable(groupText);
  const targetNorm = normalizeComparable(target.itemName);
  const primaryNorm = normalizeComparable(target.primaryText);
  const secondaryNorm = normalizeComparable(target.secondaryText);

  if (groupNorm && groupNorm === targetNorm) return 0.99;
  if (groupNorm && targetNorm && (groupNorm.includes(targetNorm) || targetNorm.includes(groupNorm))) return 0.96;

  const groupCode = extractOptionCode(groupText);
  if (groupCode && target.optionCode && groupCode === target.optionCode) {
    const groupHasPrimary = primaryNorm.length > 0 && groupNorm.includes(primaryNorm);
    const groupHasSecondary = secondaryNorm.length > 0 && groupNorm.includes(secondaryNorm);
    return groupHasPrimary || groupHasSecondary ? 0.95 : 0.9;
  }

  if (secondaryNorm.length >= 8 && groupNorm.includes(secondaryNorm)) return 0.82;
  if (primaryNorm.length >= 8 && groupNorm.includes(primaryNorm)) return 0.72;

  return 0;
}

function findBestTarget(group: ProductVariantKeywordGroup, targets: ProductTarget[]): {
  target: ProductTarget;
  confidence: number;
} | null {
  const scored = targets
    .map((target) => ({ target, confidence: getTargetScore(group, target) }))
    .filter((item) => item.confidence >= 0.7)
    .sort((left, right) => right.confidence - left.confidence);

  return scored[0] ?? null;
}

function getPrimaryBarcode(sku: SkuLookupRow): string {
  return sku.barcodes.find((barcode) => barcode.isPrimary)?.barcode ?? sku.barcode ?? sku.barcodes[0]?.barcode ?? '';
}

function getSkuName(sku: SkuLookupRow): string {
  return (
    sku.aliases.find((alias) => alias.aliasType === 'PRODUCT_NAME')?.value ??
    sku.aliases.find((alias) => alias.aliasType === 'MATCH_KEYWORD')?.value ??
    sku.sellerProductCode ??
    sku.skuCode
  );
}

function scoreSku(stockMatchedProductName: string, sku: SkuLookupRow, modelCodes: string[]): number {
  const stockNorm = normalizeComparable(stockMatchedProductName);
  const aliasValues = sku.aliases.map((alias) => alias.value);
  const barcodeValues = [sku.barcode ?? '', ...sku.barcodes.map((barcode) => barcode.barcode)];
  const skuTexts = [sku.skuCode, sku.sellerProductCode ?? '', ...aliasValues, ...barcodeValues];
  const skuNorms = skuTexts.map(normalizeComparable).filter(Boolean);

  for (const modelCode of modelCodes) {
    const codeNorm = normalizeComparable(modelCode);
    if (normalizeComparable(sku.skuCode) === codeNorm) return 1;
    if (barcodeValues.some((barcode) => normalizeComparable(barcode) === codeNorm)) return 1;
    if (aliasValues.some((value) => normalizeComparable(value) === codeNorm)) return 0.98;
    if (skuNorms.some((value) => value.includes(codeNorm))) return 0.96;
  }

  if (skuNorms.some((value) => value === stockNorm)) return 0.94;
  if (skuNorms.some((value) => value.length >= 8 && (value.includes(stockNorm) || stockNorm.includes(value)))) {
    return 0.88;
  }

  return 0;
}

function resolveSkuForStockName(stockMatchedProductName: string, skus: SkuLookupRow[]): SkuResolution {
  const modelCodes = extractModelCodes(stockMatchedProductName);
  const scored = skus
    .map((sku) => ({
      sku,
      confidence: scoreSku(stockMatchedProductName, sku, modelCodes),
    }))
    .filter((item) => item.confidence > 0)
    .sort((left, right) => right.confidence - left.confidence);

  if (!scored[0]) {
    return {
      sku: null,
      modelCode: modelCodes[0] ?? '',
      confidence: 0,
      warningMessage: '재고매칭 상품명에 해당하는 SKU를 찾지 못했습니다.',
    };
  }

  const ambiguous = scored[1] && scored[1].confidence === scored[0].confidence;

  return {
    sku: scored[0].sku,
    modelCode: modelCodes[0] ?? '',
    confidence: scored[0].confidence,
    warningMessage: ambiguous ? '같은 신뢰도의 SKU 후보가 여러 개입니다.' : '',
  };
}

async function loadSkuLookupRows(groups: ProductVariantKeywordGroup[]): Promise<SkuLookupRow[]> {
  const stockNames = unique(groups.flatMap((group) => group.rows.map((row) => row.stockMatchedProductName)));
  const modelCodes = unique(stockNames.flatMap(extractModelCodes));
  const containsTerms = unique([...modelCodes, ...stockNames]).slice(0, 180);
  const orConditions = [
    ...(modelCodes.length > 0
      ? [
          { skuCode: { in: modelCodes } },
          { sellerProductCode: { in: modelCodes } },
          { barcode: { in: modelCodes } },
          { barcodes: { some: { barcode: { in: modelCodes } } } },
        ]
      : []),
    ...containsTerms.flatMap((term) => [
      { aliases: { some: { value: { contains: term } } } },
      { aliases: { some: { memo: { contains: term } } } },
      { barcodes: { some: { unitName: { contains: term } } } },
    ]),
  ];

  if (orConditions.length === 0) return [];

  return prisma.sku.findMany({
    where: { OR: orConditions },
    include: {
      aliases: { orderBy: [{ aliasType: 'asc' }, { value: 'asc' }] },
      barcodes: { orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }] },
    },
    take: 500,
  });
}

function buildPreviewRow(
  channelProductNo: string,
  group: ProductVariantKeywordGroup,
  target: ProductTarget,
  targetConfidence: number,
  skus: SkuLookupRow[],
): ProductVariantKeywordPreviewRow {
  const stockNames = unique(group.rows.map((row) => row.stockMatchedProductName));
  const isSetProduct = stockNames.length > 1;
  const resolvedSkus: ProductVariantKeywordResolvedSku[] = group.rows.map((row) => {
    const resolution = resolveSkuForStockName(row.stockMatchedProductName, skus);
    const sku = resolution.sku;

    return {
      skuId: sku?.id ?? '',
      skuCode: sku?.skuCode ?? '',
      skuName: sku ? getSkuName(sku) : '',
      modelCode: resolution.modelCode,
      barcode: sku ? getPrimaryBarcode(sku) : '',
      quantity: parseQuantity(row.quantityText),
      stockQuantity: sku?.stockQuantity ?? 0,
      confidence: resolution.confidence,
      inventoryMatchProductName: row.stockMatchedProductName,
      warningMessage: resolution.warningMessage,
    };
  });
  const unresolved = resolvedSkus.filter((sku) => !sku.skuId);
  const warningMessages = unique([
    ...resolvedSkus.map((sku) => sku.warningMessage),
    unresolved.length > 0 ? `${unresolved.length}개 SKU를 해석하지 못했습니다.` : '',
  ]);
  const confidenceValues = [
    targetConfidence,
    ...resolvedSkus.map((sku) => sku.confidence).filter((confidence) => confidence > 0),
  ];
  const confidence = confidenceValues.length > 0 ? Math.min(...confidenceValues) : 0;

  return {
    channelProductNo,
    mappingType: target.mappingType,
    itemId: target.itemId,
    itemName: target.itemName,
    serialNo: group.serialNo,
    productMatchName: group.productMatchName,
    productOptionText: group.productOptionText,
    stockMatchedProductName: stockNames.join(' / '),
    stockMatchedProductNames: stockNames,
    resolvedSkuCode: unique(resolvedSkus.map((sku) => sku.skuCode)).join(', '),
    resolvedModelCodes: unique(resolvedSkus.map((sku) => sku.modelCode)).join(', '),
    barcode: unique(resolvedSkus.map((sku) => sku.barcode)).join(', '),
    quantity: Math.max(...resolvedSkus.map((sku) => sku.quantity), 1),
    isSetProduct,
    confidence,
    warningMessage:
      warningMessages.length > 0
        ? warningMessages.join(' / ')
        : isSetProduct
          ? `세트상품 후보: SKU ${resolvedSkus.length}개`
          : '',
    skus: resolvedSkus,
  };
}

export async function previewProductVariantKeywordMatching(
  buffer: Buffer,
  channelProductNo = '6597910207',
): Promise<ProductVariantKeywordPreviewResponse> {
  const parsedRows = parseProductVariantKeywordWorkbook(buffer);
  const groups = groupRows(parsedRows);
  const product = await prisma.naverProduct.findFirst({
    where: {
      OR: [{ id: channelProductNo }, { channelProductNo }, { naverProductId: channelProductNo }],
    },
    include: {
      options: { orderBy: { createdAt: 'asc' } },
      additionals: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!product) {
    throw new Error(`${channelProductNo} 상품을 찾을 수 없습니다.`);
  }

  const targets = buildProductTargets(product);
  const matchedGroups = groups
    .map((group) => {
      const match = findBestTarget(group, targets);
      return match ? { group, target: match.target, targetConfidence: match.confidence } : null;
    })
    .filter((item): item is { group: ProductVariantKeywordGroup; target: ProductTarget; targetConfidence: number } => item !== null);
  const skuLookupRows = await loadSkuLookupRows(matchedGroups.map((item) => item.group));
  const rows = matchedGroups
    .map((item) =>
      buildPreviewRow(channelProductNo, item.group, item.target, item.targetConfidence, skuLookupRows),
    )
    .sort((left, right) => left.itemName.localeCompare(right.itemName, 'ko') || left.serialNo.localeCompare(right.serialNo));

  return {
    channelProductNo,
    productId: product.id,
    productName: product.name,
    totalExcelRows: parsedRows.length,
    matchedGroupCount: matchedGroups.length,
    candidateCount: rows.length,
    setProductCount: rows.filter((row) => row.isSetProduct).length,
    unresolvedCount: rows.filter((row) => row.skus.some((sku) => !sku.skuId)).length,
    rows,
  };
}
