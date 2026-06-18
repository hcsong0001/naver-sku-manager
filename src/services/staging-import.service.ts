import * as XLSX from 'xlsx';
import { Prisma } from '@/app/generated/prisma';
import prisma from '@/lib/prisma';
import { parseProductVariantKeywordWorkbook } from '@/src/services/product-variant-keyword.service';
import {
  parseStockListWorkbook,
  previewStockList,
  type StockListImportRow,
} from '@/src/services/sku-stock-list.service';
import { parseSkuMappingWorkbook } from '@/src/services/sku-mapping.service';
import type { SkuMappingParsedRow } from '@/src/types/sku-mapping.types';
import type {
  StagingImportApplyResponse,
  StagingImportFileType,
  StagingImportHistoryRow,
  StagingImportLatestJob,
  StagingImportPreviewResponse,
  StagingImportPreviewRow,
  StagingImportPreviewSummary,
  StagingSnapshotInfo,
  StagingImportSummaryResponse,
} from '@/src/types/staging-import.types';
import { STAGING_IMPORT_FILE_TYPES } from '@/src/types/staging-import.types';

type PreviewInput = {
  fileType: StagingImportFileType;
  fileName: string;
  buffer: Buffer;
};

type ApplyInput = PreviewInput & {
  storeId?: string;
  channelId?: string;
  mimeType?: string;
  sizeBytes?: number;
};

type ProductVariantKeywordSourceRow = ReturnType<typeof parseProductVariantKeywordWorkbook>[number];

type SmartstoreProductParsedRow = {
  rowNumber: number;
  sourceSheet: string;
  externalProductId: string;
  channelProductNo: string;
  originProductNo: string;
  productName: string;
  statusType: string;
  sellerManagementCode: string;
  optionId: string;
  optionName: string;
  optionValue: string;
  optionCode: string;
  additionalId: string;
  additionalName: string;
  additionalValue: string;
  additionalSellerManagementCode: string;
  additionalPrice: number | null;
  additionalStockQuantity: number | null;
  additionalUsable: boolean | null;
  additionalSortType: string;
};

type RowError = {
  rowNumber: number;
  errorMessage: string;
};

type PreviewDataset<T> = {
  rows: T[];
  errors: RowError[];
  summary: StagingImportPreviewSummary;
  validRowsSample: StagingImportPreviewRow[];
  errorRowsSample: StagingImportPreviewRow[];
};

const PREVIEW_SAMPLE_LIMIT = 20;
const APPLY_CHUNK_SIZE = 1000;
const APPLY_TRANSACTION_TIMEOUT_MS = 60000;
const APPLY_TRANSACTION_MAX_WAIT_MS = 10000;

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNullableString(value: string): string | null {
  return value.trim().length > 0 ? value.trim() : null;
}

function toPreviewRow(row: Record<string, unknown>): StagingImportPreviewRow {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => {
      if (value === null || value === undefined) return [key, null];
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [key, value];
      }
      return [key, JSON.stringify(value)];
    }),
  );
}

function createEmptySummary(): StagingImportPreviewSummary {
  return {
    totalProducts: 0,
    totalOptions: 0,
    totalAdditionals: 0,
    mappedCount: 0,
    unmappedCount: 0,
    riskCount: 0,
    setProductCount: 0,
    validRowCount: 0,
    errorRowCount: 0,
  };
}

function decodeCsvBuffer(buffer: Buffer): string {
  const utf8Text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (utf8Text.includes('\uFFFD')) {
    return new TextDecoder('euc-kr').decode(buffer);
  }

  return utf8Text;
}

function readWorkbook(buffer: Buffer, fileName: string): XLSX.WorkBook {
  const lowerFileName = fileName.toLowerCase();
  if (lowerFileName.endsWith('.csv')) {
    const text = decodeCsvBuffer(buffer);
    return XLSX.read(text, { type: 'string', raw: false });
  }

  return XLSX.read(buffer, { type: 'buffer', raw: false });
}

function findHeader(headers: string[], candidates: string[]): string {
  const normalizedCandidates = candidates.map(normalizeHeader);
  return (
    headers.find((header) => normalizedCandidates.includes(normalizeHeader(header))) ??
    headers.find((header) =>
      normalizedCandidates.some((candidate) => normalizeHeader(header).includes(candidate)),
    ) ??
    ''
  );
}

function parseOptionalInt(value: string): number | null {
  if (!value) return null;
  const numberValue = Number(value.replace(/,/g, ''));
  return Number.isFinite(numberValue) ? Math.trunc(numberValue) : null;
}

function parseOptionalBoolean(value: string): boolean | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (['true', 'y', 'yes', '1', '사용', '가능'].includes(normalized)) return true;
  if (['false', 'n', 'no', '0', '미사용', '불가'].includes(normalized)) return false;
  return null;
}

function productKeyOfRow(row: SmartstoreProductParsedRow): string {
  const identity = [row.channelProductNo, row.originProductNo, row.externalProductId]
    .filter((value) => value.trim().length > 0)
    .join('::');
  return identity || `${row.sourceSheet}::${row.productName}`;
}

async function previewErpStockImport(buffer: Buffer): Promise<PreviewDataset<StockListImportRow>> {
  const parsedRows = await parseStockListWorkbook(buffer);
  const preview = await previewStockList(parsedRows);
  const summary = createEmptySummary();
  summary.validRowCount = preview.validRows.length;
  summary.errorRowCount = preview.errorRows.length;

  return {
    rows: preview.validRows,
    errors: preview.errorRows.map((row) => ({
      rowNumber: row.rowNumber,
      errorMessage: row.error,
    })),
    summary,
    validRowsSample: preview.validRows.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        barcode: row.barcode,
        productName: row.productName,
        purchaseProductName: row.purchaseProductName,
        internalProductCode: row.internalProductCode,
        skuCodeCandidate: row.skuCodeCandidate,
      }),
    ),
    errorRowsSample: preview.errorRows.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        barcode: row.barcode,
        productName: row.productName,
        errorMessage: row.error,
      }),
    ),
  };
}

function parseSmartstoreProductWorkbook(buffer: Buffer, fileName: string): SmartstoreProductParsedRow[] {
  const workbook = readWorkbook(buffer, fileName);
  const rows: SmartstoreProductParsedRow[] = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const sheetRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: '',
      raw: false,
    });
    const headers = sheetRows[0] ? Object.keys(sheetRows[0]) : [];

    const externalProductIdHeader = findHeader(headers, ['상품번호', 'productid', 'externalproductid']);
    const channelProductNoHeader = findHeader(headers, ['채널상품번호', 'channelproductno']);
    const originProductNoHeader = findHeader(headers, ['원상품번호', 'originproductno', 'naverproductid']);
    const productNameHeader = findHeader(headers, ['상품명', 'productname', 'channelproductname']);
    const statusHeader = findHeader(headers, ['상품상태', '상태', 'statustype']);
    const sellerManagementCodeHeader = findHeader(headers, ['판매자관리코드', 'sellermanagementcode']);
    const optionIdHeader = findHeader(headers, ['옵션id', 'optionid']);
    const optionNameHeader = findHeader(headers, ['옵션명', 'optionname']);
    const optionValueHeader = findHeader(headers, ['옵션값', 'optionvalue', '옵션내용']);
    const optionCodeHeader = findHeader(headers, ['옵션코드', 'optioncode', 'sellermanagercode']);
    const additionalIdHeader = findHeader(headers, ['추가상품id', 'additionalid', 'supplementproductid']);
    const additionalNameHeader = findHeader(headers, ['추가상품명', 'additionalname', 'groupname']);
    const additionalValueHeader = findHeader(headers, ['추가상품값', 'additionalvalue', 'name']);
    const additionalSellerManagementCodeHeader = findHeader(headers, [
      '추가상품판매자관리코드',
      'additionalsellermanagementcode',
      'sellermanagementcode',
    ]);
    const additionalPriceHeader = findHeader(headers, ['추가상품가격', 'additionalprice', 'price']);
    const additionalStockQuantityHeader = findHeader(headers, [
      '추가상품재고',
      'additionalstockquantity',
      'stockquantity',
    ]);
    const additionalUsableHeader = findHeader(headers, ['사용여부', 'usable']);
    const additionalSortTypeHeader = findHeader(headers, ['정렬유형', 'sorttype']);

    sheetRows.forEach((row, index) => {
      const parsedRow: SmartstoreProductParsedRow = {
        rowNumber: index + 2,
        sourceSheet: sheetName,
        externalProductId: normalizeCell(row[externalProductIdHeader]),
        channelProductNo: normalizeCell(row[channelProductNoHeader]),
        originProductNo: normalizeCell(row[originProductNoHeader]),
        productName: normalizeCell(row[productNameHeader]),
        statusType: normalizeCell(row[statusHeader]),
        sellerManagementCode: normalizeCell(row[sellerManagementCodeHeader]),
        optionId: normalizeCell(row[optionIdHeader]),
        optionName: normalizeCell(row[optionNameHeader]),
        optionValue: normalizeCell(row[optionValueHeader]),
        optionCode: normalizeCell(row[optionCodeHeader]),
        additionalId: normalizeCell(row[additionalIdHeader]),
        additionalName: normalizeCell(row[additionalNameHeader]),
        additionalValue: normalizeCell(row[additionalValueHeader]),
        additionalSellerManagementCode: normalizeCell(row[additionalSellerManagementCodeHeader]),
        additionalPrice: parseOptionalInt(normalizeCell(row[additionalPriceHeader])),
        additionalStockQuantity: parseOptionalInt(normalizeCell(row[additionalStockQuantityHeader])),
        additionalUsable: parseOptionalBoolean(normalizeCell(row[additionalUsableHeader])),
        additionalSortType: normalizeCell(row[additionalSortTypeHeader]),
      };

      const hasMeaningfulValue = Object.values(parsedRow).some((value) => {
        if (typeof value === 'number') return true;
        if (typeof value === 'boolean') return true;
        return typeof value === 'string' ? value.trim().length > 0 : false;
      });

      if (hasMeaningfulValue) {
        rows.push(parsedRow);
      }
    });
  }

  return rows;
}

function previewSmartstoreProductImport(buffer: Buffer, fileName: string): PreviewDataset<SmartstoreProductParsedRow> {
  const parsedRows = parseSmartstoreProductWorkbook(buffer, fileName);
  const errors: RowError[] = [];
  const validRows = parsedRows.filter((row) => {
    const hasProductIdentity = Boolean(
      row.channelProductNo || row.originProductNo || row.externalProductId || row.productName,
    );
    if (!hasProductIdentity) {
      errors.push({
        rowNumber: row.rowNumber,
        errorMessage: '상품 식별값(채널상품번호/원상품번호/상품번호/상품명)이 없습니다.',
      });
      return false;
    }
    return true;
  });

  const productKeys = new Set(validRows.map(productKeyOfRow));
  const optionRows = validRows.filter((row) => row.optionName || row.optionValue || row.optionCode);
  const additionalRows = validRows.filter(
    (row) =>
      row.additionalName ||
      row.additionalValue ||
      row.additionalSellerManagementCode ||
      row.additionalPrice !== null,
  );

  const summary = createEmptySummary();
  summary.totalProducts = productKeys.size;
  summary.totalOptions = optionRows.length;
  summary.totalAdditionals = additionalRows.length;
  summary.validRowCount = validRows.length;
  summary.errorRowCount = errors.length;

  return {
    rows: validRows,
    errors,
    summary,
    validRowsSample: validRows.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        sourceSheet: row.sourceSheet,
        channelProductNo: row.channelProductNo,
        originProductNo: row.originProductNo,
        productName: row.productName,
        optionName: row.optionName,
        optionValue: row.optionValue,
        additionalName: row.additionalName,
        additionalValue: row.additionalValue,
      }),
    ),
    errorRowsSample: errors.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        errorMessage: row.errorMessage,
      }),
    ),
  };
}

function previewSkuMappingImport(buffer: Buffer): PreviewDataset<SkuMappingParsedRow> {
  const rows = parseSkuMappingWorkbook(buffer);
  const errors: RowError[] = [];
  const validRows = rows.filter((row) => {
    if (!['PRODUCT', 'OPTION', 'ADDITIONAL'].includes(row.mappingType)) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: 'mappingType이 올바르지 않습니다.' });
      return false;
    }
    if (!row.itemId) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: 'itemId가 비어 있습니다.' });
      return false;
    }
    if (!row.skuCode) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: 'skuCode가 비어 있습니다.' });
      return false;
    }
    const quantity = Number(row.quantity || '1');
    if (!Number.isInteger(quantity) || quantity < 1) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: 'quantity는 1 이상의 정수여야 합니다.' });
      return false;
    }
    return true;
  });

  const summary = createEmptySummary();
  summary.validRowCount = validRows.length;
  summary.errorRowCount = errors.length;
  summary.mappedCount = validRows.length;

  return {
    rows: validRows,
    errors,
    summary,
    validRowsSample: validRows.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        mappingType: row.mappingType,
        channelProductNo: row.channelProductNo,
        itemId: row.itemId,
        itemName: row.itemName,
        skuCode: row.skuCode,
        quantity: row.quantity,
      }),
    ),
    errorRowsSample: errors.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        errorMessage: row.errorMessage,
      }),
    ),
  };
}

function previewProductVariantKeywordImport(buffer: Buffer): PreviewDataset<ProductVariantKeywordSourceRow> {
  const rows = parseProductVariantKeywordWorkbook(buffer);
  const errors: RowError[] = [];
  const validRows = rows.filter((row) => {
    if (!row.serialNo) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: '일련번호가 비어 있습니다.' });
      return false;
    }
    if (!row.stockMatchedProductName) {
      errors.push({ rowNumber: row.rowNumber, errorMessage: '재고매칭 상품명이 비어 있습니다.' });
      return false;
    }
    return true;
  });

  const stockNameGroups = new Map<string, Set<string>>();
  for (const row of validRows) {
    const set = stockNameGroups.get(row.serialNo) ?? new Set<string>();
    set.add(row.stockMatchedProductName);
    stockNameGroups.set(row.serialNo, set);
  }

  const setProductCount = Array.from(stockNameGroups.values()).filter((set) => set.size > 1).length;
  const mappedCount = validRows.filter((row) => row.stockMatchedProductName.trim().length > 0).length;
  const riskCount = validRows.filter((row) => row.stockMatchedProductName.trim().length === 0).length;

  const summary = createEmptySummary();
  summary.mappedCount = mappedCount;
  summary.unmappedCount = Math.max(validRows.length - mappedCount, 0);
  summary.riskCount = riskCount;
  summary.setProductCount = setProductCount;
  summary.validRowCount = validRows.length;
  summary.errorRowCount = errors.length;

  return {
    rows: validRows,
    errors,
    summary,
    validRowsSample: validRows.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        serialNo: row.serialNo,
        productMatchName: row.productMatchName,
        productOptionText: row.productOptionText,
        stockMatchedProductName: row.stockMatchedProductName,
        stockMatchedOptionText: row.stockMatchedOptionText,
        quantityText: row.quantityText,
      }),
    ),
    errorRowsSample: errors.slice(0, PREVIEW_SAMPLE_LIMIT).map((row) =>
      toPreviewRow({
        rowNumber: row.rowNumber,
        errorMessage: row.errorMessage,
      }),
    ),
  };
}

async function loadPreviewDataset(input: PreviewInput): Promise<PreviewDataset<unknown>> {
  if (input.fileType === 'ERP_STOCK') {
    return previewErpStockImport(input.buffer);
  }
  if (input.fileType === 'SMARTSTORE_PRODUCT') {
    return previewSmartstoreProductImport(input.buffer, input.fileName);
  }
  if (input.fileType === 'SKU_MAPPING') {
    return previewSkuMappingImport(input.buffer);
  }
  return previewProductVariantKeywordImport(input.buffer);
}

function chunkArray<T>(rows: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < rows.length; index += chunkSize) {
    chunks.push(rows.slice(index, index + chunkSize));
  }
  return chunks;
}

async function createChunks<T>(
  rows: T[],
  createChunk: (chunk: T[]) => Promise<unknown>,
): Promise<void> {
  for (const chunk of chunkArray(rows, APPLY_CHUNK_SIZE)) {
    await createChunk(chunk);
  }
}

function toErrorSummary(errors: RowError[]) {
  return errors.slice(0, PREVIEW_SAMPLE_LIMIT).map((error) => ({
    rowNumber: error.rowNumber,
    errorMessage: error.errorMessage,
  }));
}

function toFriendlyApplyError(error: unknown): Error {
  const message = error instanceof Error ? error.message : 'staging import 적용에 실패했습니다.';
  if (
    message.includes('expired transaction')
    || message.includes('timeout')
    || message.includes('Transaction API error')
  ) {
    return new Error(
      `대량 staging 저장 중 시간이 초과되었습니다. 저장 로직을 chunk 단위로 재시도해 주세요. 원인: ${message}`,
    );
  }
  return new Error(`staging 저장 중 오류가 발생했습니다. ${message}`);
}

async function cleanupFailedImportJob(jobId: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.stagingNaverProductOption.deleteMany({ where: { jobId } });
    await tx.stagingNaverProductAdditional.deleteMany({ where: { jobId } });
    await tx.stagingProductVariantKeyword.deleteMany({ where: { jobId } });
    await tx.stagingSkuMapping.deleteMany({ where: { jobId } });
    await tx.stagingStockItem.deleteMany({ where: { jobId } });
    await tx.stagingNaverProduct.deleteMany({ where: { jobId } });
  }, {
    timeout: APPLY_TRANSACTION_TIMEOUT_MS,
    maxWait: APPLY_TRANSACTION_MAX_WAIT_MS,
  });
}

async function updateImportJobStatus(input: {
  jobId: string;
  fileId: string;
  status: 'APPLIED' | 'FAILED';
  totalRows: number;
  successRows: number;
  errorRows: number;
  summary: StagingImportPreviewSummary;
  errors: RowError[];
}): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.importJob.update({
      where: { id: input.jobId },
      data: {
        status: input.status,
        totalRows: input.totalRows,
        successRows: input.successRows,
        errorRows: input.errorRows,
        previewSummary: input.summary,
        errorSummary: toErrorSummary(input.errors),
        appliedAt: input.status === 'APPLIED' ? new Date() : null,
      },
    });
    await tx.importFile.update({
      where: { id: input.fileId },
      data: {
        status: input.status,
        totalRows: input.totalRows,
        successRows: input.successRows,
        errorRows: input.errorRows,
      },
    });
  }, {
    timeout: APPLY_TRANSACTION_TIMEOUT_MS,
    maxWait: APPLY_TRANSACTION_MAX_WAIT_MS,
  });
}

async function insertErpStockRows(input: {
  jobId: string;
  fileId: string;
  rows: StockListImportRow[];
  errors: RowError[];
}): Promise<void> {
  const records = [
    ...input.rows.map((row) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: row.rowNumber,
      barcode: row.barcode,
      productName: row.productName,
      purchaseProductName: row.purchaseProductName,
      internalProductCode: row.internalProductCode,
      modelName: row.modelName,
      supplierItemCode: row.supplierItemCode,
      optionCode: row.optionCode,
      sellingPrice: row.sellingPrice,
      costPrice: row.costPrice,
      stockQuantity: row.stockQuantity,
      skuCodeCandidate: row.skuCodeCandidate,
      sourceRow: row,
      errorMessage: null,
    })),
    ...input.errors.map((error) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: error.rowNumber,
      barcode: '',
      productName: '',
      purchaseProductName: '',
      internalProductCode: '',
      modelName: '',
      supplierItemCode: '',
      optionCode: '',
      sellingPrice: null,
      costPrice: null,
      stockQuantity: null,
      skuCodeCandidate: '',
      sourceRow: { rowNumber: error.rowNumber },
      errorMessage: error.errorMessage,
    })),
  ];

  await createChunks(records, async (chunk) => {
    await prisma.stagingStockItem.createMany({ data: chunk });
  });
}

async function insertSmartstoreRows(input: {
  jobId: string;
  fileId: string;
  storeId?: string;
  rows: SmartstoreProductParsedRow[];
  errors: RowError[];
}): Promise<void> {
  const productRecords: Prisma.StagingNaverProductCreateManyInput[] = [];
  const optionRecords: Prisma.StagingNaverProductOptionCreateManyInput[] = [];
  const additionalRecords: Prisma.StagingNaverProductAdditionalCreateManyInput[] = [];

  for (const row of input.rows) {
    const productId = crypto.randomUUID();
    productRecords.push({
      id: productId,
      jobId: input.jobId,
      importFileId: input.fileId,
      storeId: input.storeId || null,
      rowNumber: row.rowNumber,
      externalProductId: toNullableString(row.externalProductId),
      channelProductNo: toNullableString(row.channelProductNo),
      originProductNo: toNullableString(row.originProductNo),
      productName: row.productName || '(상품명 없음)',
      statusType: toNullableString(row.statusType),
      sellerManagementCode: toNullableString(row.sellerManagementCode),
      sourceRow: row,
      errorMessage: null,
    });

    if (row.optionName || row.optionValue || row.optionCode) {
      optionRecords.push({
        id: crypto.randomUUID(),
        jobId: input.jobId,
        importFileId: input.fileId,
        stagingProductId: productId,
        rowNumber: row.rowNumber,
        channelProductNo: toNullableString(row.channelProductNo),
        optionId: toNullableString(row.optionId),
        optionName: row.optionName,
        optionValue: row.optionValue,
        optionCode: toNullableString(row.optionCode),
        sourceRow: row,
        errorMessage: null,
      });
    }

    if (
      row.additionalName
      || row.additionalValue
      || row.additionalSellerManagementCode
      || row.additionalPrice !== null
    ) {
      additionalRecords.push({
        id: crypto.randomUUID(),
        jobId: input.jobId,
        importFileId: input.fileId,
        stagingProductId: productId,
        rowNumber: row.rowNumber,
        channelProductNo: toNullableString(row.channelProductNo),
        additionalId: toNullableString(row.additionalId),
        additionalName: row.additionalName,
        additionalValue: row.additionalValue,
        sellerManagementCode: toNullableString(row.additionalSellerManagementCode),
        price: row.additionalPrice,
        stockQuantity: row.additionalStockQuantity,
        usable: row.additionalUsable,
        sortType: toNullableString(row.additionalSortType),
        sourceRow: row,
        errorMessage: null,
      });
    }
  }

  const errorProducts: Prisma.StagingNaverProductCreateManyInput[] = input.errors.map((error) => ({
    id: crypto.randomUUID(),
    jobId: input.jobId,
    importFileId: input.fileId,
    storeId: input.storeId || null,
    rowNumber: error.rowNumber,
    externalProductId: null,
    channelProductNo: null,
    originProductNo: null,
    productName: '(파싱 오류)',
    statusType: null,
    sellerManagementCode: null,
    sourceRow: { rowNumber: error.rowNumber },
    errorMessage: error.errorMessage,
  }));

  await createChunks(productRecords, async (chunk) => {
    await prisma.stagingNaverProduct.createMany({ data: chunk });
  });
  await createChunks(optionRecords, async (chunk) => {
    await prisma.stagingNaverProductOption.createMany({ data: chunk });
  });
  await createChunks(additionalRecords, async (chunk) => {
    await prisma.stagingNaverProductAdditional.createMany({ data: chunk });
  });
  await createChunks(errorProducts, async (chunk) => {
    await prisma.stagingNaverProduct.createMany({ data: chunk });
  });
}

async function insertSkuMappingRows(input: {
  jobId: string;
  fileId: string;
  rows: SkuMappingParsedRow[];
  errors: RowError[];
}): Promise<void> {
  const records = [
    ...input.rows.map((row) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: row.rowNumber,
      mappingType: row.mappingType,
      smartstoreName: row.smartstoreName,
      channelProductNo: row.channelProductNo,
      productName: row.productName,
      itemId: row.itemId,
      itemName: row.itemName,
      managementCode: row.managementCode,
      currentSkuCode: row.currentSkuCode,
      skuCode: row.skuCode,
      quantity: Number(row.quantity || '1'),
      sourceRow: row,
      errorMessage: null,
    })),
    ...input.errors.map((error) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: error.rowNumber,
      mappingType: '',
      smartstoreName: '',
      channelProductNo: '',
      productName: '',
      itemId: '',
      itemName: '',
      managementCode: '',
      currentSkuCode: '',
      skuCode: '',
      quantity: 0,
      sourceRow: { rowNumber: error.rowNumber },
      errorMessage: error.errorMessage,
    })),
  ];

  await createChunks(records, async (chunk) => {
    await prisma.stagingSkuMapping.createMany({ data: chunk });
  });
}

async function insertProductVariantKeywordRows(input: {
  jobId: string;
  fileId: string;
  channelId?: string;
  rows: ProductVariantKeywordSourceRow[];
  errors: RowError[];
}): Promise<void> {
  const groupSizes = new Map<string, number>();
  for (const row of input.rows) {
    groupSizes.set(row.serialNo, (groupSizes.get(row.serialNo) ?? 0) + 1);
  }

  const records = [
    ...input.rows.map((row) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: row.rowNumber,
      channelProductNo: input.channelId || null,
      mappingType: null,
      itemId: null,
      itemName: null,
      serialNo: row.serialNo,
      productMatchName: row.productMatchName,
      productOptionText: row.productOptionText,
      stockMatchedProductName: row.stockMatchedProductName,
      stockMatchedOptionText: row.stockMatchedOptionText,
      quantityText: row.quantityText,
      resolvedSkuCode: null,
      resolvedModelCodes: null,
      barcode: null,
      quantity: null,
      isSetProduct: (groupSizes.get(row.serialNo) ?? 0) > 1,
      confidence: null,
      warningMessage: null,
      sourceRow: row,
      errorMessage: null,
    })),
    ...input.errors.map((error) => ({
      jobId: input.jobId,
      importFileId: input.fileId,
      rowNumber: error.rowNumber,
      channelProductNo: input.channelId || null,
      mappingType: null,
      itemId: null,
      itemName: null,
      serialNo: '',
      productMatchName: '',
      productOptionText: '',
      stockMatchedProductName: '',
      stockMatchedOptionText: '',
      quantityText: '',
      resolvedSkuCode: null,
      resolvedModelCodes: null,
      barcode: null,
      quantity: null,
      isSetProduct: false,
      confidence: null,
      warningMessage: null,
      sourceRow: { rowNumber: error.rowNumber },
      errorMessage: error.errorMessage,
    })),
  ];

  await createChunks(records, async (chunk) => {
    await prisma.stagingProductVariantKeyword.createMany({ data: chunk });
  });
}

export async function previewStagingImport(input: PreviewInput): Promise<StagingImportPreviewResponse> {
  const dataset = await loadPreviewDataset(input);

  return {
    fileType: input.fileType,
    fileName: input.fileName,
    totalRows: dataset.rows.length + dataset.errors.length,
    successRows: dataset.rows.length,
    errorRows: dataset.errors.length,
    summary: dataset.summary,
    validRowsSample: dataset.validRowsSample,
    errorRowsSample: dataset.errorRowsSample,
  };
}

export async function applyStagingImport(input: ApplyInput): Promise<StagingImportApplyResponse> {
  const dataset = await loadPreviewDataset(input);
  const totalRows = dataset.rows.length + dataset.errors.length;
  const result = await prisma.$transaction(async (tx) => {
    const job = await tx.importJob.create({
      data: {
        fileType: input.fileType,
        storeId: input.storeId || null,
        channelId: input.channelId || null,
        fileName: input.fileName,
        status: 'PENDING',
        totalRows,
        successRows: 0,
        errorRows: 0,
        previewSummary: dataset.summary,
        errorSummary: toErrorSummary(dataset.errors),
        appliedAt: null,
      },
    });

    const file = await tx.importFile.create({
      data: {
        jobId: job.id,
        fileType: input.fileType,
        fileName: input.fileName,
        mimeType: input.mimeType || null,
        sizeBytes: input.sizeBytes ?? null,
        status: 'PENDING',
        totalRows,
        successRows: 0,
        errorRows: 0,
      },
    });

    return { jobId: job.id, fileId: file.id };
  }, {
    timeout: APPLY_TRANSACTION_TIMEOUT_MS,
    maxWait: APPLY_TRANSACTION_MAX_WAIT_MS,
  });

  try {
    if (input.fileType === 'ERP_STOCK') {
      await insertErpStockRows({
        jobId: result.jobId,
        fileId: result.fileId,
        rows: dataset.rows as StockListImportRow[],
        errors: dataset.errors,
      });
    } else if (input.fileType === 'SMARTSTORE_PRODUCT') {
      await insertSmartstoreRows({
        jobId: result.jobId,
        fileId: result.fileId,
        storeId: input.storeId,
        rows: dataset.rows as SmartstoreProductParsedRow[],
        errors: dataset.errors,
      });
    } else if (input.fileType === 'SKU_MAPPING') {
      await insertSkuMappingRows({
        jobId: result.jobId,
        fileId: result.fileId,
        rows: dataset.rows as SkuMappingParsedRow[],
        errors: dataset.errors,
      });
    } else {
      await insertProductVariantKeywordRows({
        jobId: result.jobId,
        fileId: result.fileId,
        channelId: input.channelId,
        rows: dataset.rows as ProductVariantKeywordSourceRow[],
        errors: dataset.errors,
      });
    }

    await updateImportJobStatus({
      jobId: result.jobId,
      fileId: result.fileId,
      status: 'APPLIED',
      totalRows,
      successRows: dataset.rows.length,
      errorRows: dataset.errors.length,
      summary: dataset.summary,
      errors: dataset.errors,
    });
  } catch (error) {
    await cleanupFailedImportJob(result.jobId).catch(() => undefined);
    await updateImportJobStatus({
      jobId: result.jobId,
      fileId: result.fileId,
      status: 'FAILED',
      totalRows,
      successRows: 0,
      errorRows: dataset.errors.length,
      summary: dataset.summary,
      errors: [
        ...dataset.errors,
        { rowNumber: 0, errorMessage: toFriendlyApplyError(error).message },
      ],
    }).catch(() => undefined);
    throw toFriendlyApplyError(error);
  }

  return {
    jobId: result.jobId,
    fileId: result.fileId,
    fileType: input.fileType,
    fileName: input.fileName,
    status: 'APPLIED',
    totalRows,
    successRows: dataset.rows.length,
    errorRows: dataset.errors.length,
    summary: dataset.summary,
  };
}

function parseSummaryJson(value: unknown): StagingImportPreviewSummary {
  const summary = isRecord(value) ? value : {};
  const numberValue = (key: keyof StagingImportPreviewSummary) => {
    const raw = summary[key];
    return typeof raw === 'number' && Number.isFinite(raw) ? raw : 0;
  };

  return {
    totalProducts: numberValue('totalProducts'),
    totalOptions: numberValue('totalOptions'),
    totalAdditionals: numberValue('totalAdditionals'),
    mappedCount: numberValue('mappedCount'),
    unmappedCount: numberValue('unmappedCount'),
    riskCount: numberValue('riskCount'),
    setProductCount: numberValue('setProductCount'),
    validRowCount: numberValue('validRowCount'),
    errorRowCount: numberValue('errorRowCount'),
  };
}

function latestJobToResponse(job: {
  id: string;
  fileName: string;
  status: string;
  totalRows: number;
  successRows: number;
  errorRows: number;
  createdAt: Date;
  appliedAt: Date | null;
}): StagingImportLatestJob {
  return {
    jobId: job.id,
    fileName: job.fileName,
    status: job.status as StagingImportLatestJob['status'],
    totalRows: job.totalRows,
    successRows: job.successRows,
    errorRows: job.errorRows,
    createdAt: job.createdAt.toISOString(),
    appliedAt: job.appliedAt ? job.appliedAt.toISOString() : null,
  };
}

function buildSnapshotInfo(input: {
  latestAppliedJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>>;
  stagingStockCount: number;
  stagingProductCount: number;
  stagingOptionCount: number;
  stagingAdditionalCount: number;
  stagingSkuMappingCount: number;
  stagingProductVariantKeywordCount: number;
}): StagingSnapshotInfo {
  const latestAppliedAt = Object.values(input.latestAppliedJobs)
    .map((job) => job?.appliedAt ?? null)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? null;
  const missingAppliedFileTypes = STAGING_IMPORT_FILE_TYPES.filter((fileType) => !input.latestAppliedJobs[fileType]);

  return {
    hasAppliedData: Object.keys(input.latestAppliedJobs).length > 0,
    missingAppliedFileTypes,
    latestAppliedJobs: input.latestAppliedJobs,
    latestAppliedAt,
    counts: {
      stagingStockCount: input.stagingStockCount,
      stagingProductCount: input.stagingProductCount,
      stagingOptionCount: input.stagingOptionCount,
      stagingAdditionalCount: input.stagingAdditionalCount,
      stagingSkuMappingCount: input.stagingSkuMappingCount,
      stagingProductVariantKeywordCount: input.stagingProductVariantKeywordCount,
    },
  };
}

export async function getStagingImportSummary(storeId?: string): Promise<StagingImportSummaryResponse> {
  const jobWhere = storeId ? { storeId } : undefined;
  const stagingWhere = storeId ? { job: { storeId } } : undefined;
  const [
    jobs,
    stagingStockCount,
    stagingProductCount,
    stagingOptionCount,
    stagingAdditionalCount,
    stagingSkuMappingCount,
    stagingProductVariantKeywordCount,
  ] = await Promise.all([
    prisma.importJob.findMany({
      where: jobWhere,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.stagingStockItem.count({ where: stagingWhere }),
    prisma.stagingNaverProduct.count({ where: stagingWhere }),
    prisma.stagingNaverProductOption.count({ where: stagingWhere }),
    prisma.stagingNaverProductAdditional.count({ where: stagingWhere }),
    prisma.stagingSkuMapping.count({ where: stagingWhere }),
    prisma.stagingProductVariantKeyword.count({ where: stagingWhere }),
  ]);

  const latestJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>> = {};
  const latestAppliedJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>> = {};
  for (const job of jobs) {
    const fileType = job.fileType as StagingImportFileType;
    if (!latestJobs[fileType]) latestJobs[fileType] = latestJobToResponse(job);
    if (job.status === 'APPLIED' && !latestAppliedJobs[fileType]) {
      latestAppliedJobs[fileType] = latestJobToResponse(job);
    }
  }

  const jobHistory: StagingImportHistoryRow[] = jobs.map((job) => ({
    jobId: job.id,
    fileType: job.fileType as StagingImportFileType,
    fileName: job.fileName,
    status: job.status as StagingImportHistoryRow['status'],
    totalRows: job.totalRows,
    successRows: job.successRows,
    errorRows: job.errorRows,
    createdAt: job.createdAt.toISOString(),
    completedAt: job.appliedAt ? job.appliedAt.toISOString() : null,
  }));

  const summary = createEmptySummary();
  for (const job of Object.values(latestAppliedJobs)) {
    if (!job) continue;
    const fullJob = jobs.find((item) => item.id === job.jobId);
    const jobSummary = parseSummaryJson(fullJob?.previewSummary);
    summary.totalProducts += jobSummary.totalProducts;
    summary.totalOptions += jobSummary.totalOptions;
    summary.totalAdditionals += jobSummary.totalAdditionals;
    summary.mappedCount += jobSummary.mappedCount;
    summary.unmappedCount += jobSummary.unmappedCount;
    summary.riskCount += jobSummary.riskCount;
    summary.setProductCount += jobSummary.setProductCount;
  }

  const snapshot = buildSnapshotInfo({
    latestAppliedJobs,
    stagingStockCount,
    stagingProductCount,
    stagingOptionCount,
    stagingAdditionalCount,
    stagingSkuMappingCount,
    stagingProductVariantKeywordCount,
  });

  return {
    latestJobs,
    latestAppliedJobs,
    jobHistory,
    snapshot,
    summary: {
      importJobCount: jobs.length,
      stagingStockCount,
      stagingProductCount,
      stagingOptionCount,
      stagingAdditionalCount,
      stagingSkuMappingCount,
      stagingProductVariantKeywordCount,
      totalProducts: summary.totalProducts,
      totalOptions: summary.totalOptions,
      totalAdditionals: summary.totalAdditionals,
      mappedCount: summary.mappedCount,
      unmappedCount: summary.unmappedCount,
      riskCount: summary.riskCount,
      setProductCount: summary.setProductCount,
    },
  };
}
