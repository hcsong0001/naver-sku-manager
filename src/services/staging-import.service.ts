import * as XLSX from 'xlsx';
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
  StagingImportLatestJob,
  StagingImportPreviewResponse,
  StagingImportPreviewRow,
  StagingImportPreviewSummary,
  StagingImportSummaryResponse,
} from '@/src/types/staging-import.types';

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
        status: 'APPLIED',
        totalRows,
        successRows: dataset.rows.length,
        errorRows: dataset.errors.length,
        previewSummary: dataset.summary,
        errorSummary: dataset.errors.slice(0, PREVIEW_SAMPLE_LIMIT).map((error) => ({
          rowNumber: error.rowNumber,
          errorMessage: error.errorMessage,
        })),
        appliedAt: new Date(),
      },
    });

    const file = await tx.importFile.create({
      data: {
        jobId: job.id,
        fileType: input.fileType,
        fileName: input.fileName,
        mimeType: input.mimeType || null,
        sizeBytes: input.sizeBytes ?? null,
        status: 'APPLIED',
        totalRows,
        successRows: dataset.rows.length,
        errorRows: dataset.errors.length,
      },
    });

    if (input.fileType === 'ERP_STOCK') {
      const rows = dataset.rows as StockListImportRow[];
      await tx.stagingStockItem.createMany({
        data: [
          ...rows.map((row) => ({
            jobId: job.id,
            importFileId: file.id,
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
          ...dataset.errors.map((error) => ({
            jobId: job.id,
            importFileId: file.id,
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
        ],
      });
    } else if (input.fileType === 'SMARTSTORE_PRODUCT') {
      const rows = dataset.rows as SmartstoreProductParsedRow[];

      for (const row of rows) {
        const product = await tx.stagingNaverProduct.create({
          data: {
            jobId: job.id,
            importFileId: file.id,
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
          },
        });

        if (row.optionName || row.optionValue || row.optionCode) {
          await tx.stagingNaverProductOption.create({
            data: {
              jobId: job.id,
              importFileId: file.id,
              stagingProductId: product.id,
              rowNumber: row.rowNumber,
              channelProductNo: toNullableString(row.channelProductNo),
              optionId: toNullableString(row.optionId),
              optionName: row.optionName,
              optionValue: row.optionValue,
              optionCode: toNullableString(row.optionCode),
              sourceRow: row,
              errorMessage: null,
            },
          });
        }

        if (
          row.additionalName ||
          row.additionalValue ||
          row.additionalSellerManagementCode ||
          row.additionalPrice !== null
        ) {
          await tx.stagingNaverProductAdditional.create({
            data: {
              jobId: job.id,
              importFileId: file.id,
              stagingProductId: product.id,
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
            },
          });
        }
      }

      if (dataset.errors.length > 0) {
        await tx.stagingNaverProduct.createMany({
          data: dataset.errors.map((error) => ({
            jobId: job.id,
            importFileId: file.id,
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
          })),
        });
      }
    } else if (input.fileType === 'SKU_MAPPING') {
      const rows = dataset.rows as SkuMappingParsedRow[];
      await tx.stagingSkuMapping.createMany({
        data: [
          ...rows.map((row) => ({
            jobId: job.id,
            importFileId: file.id,
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
          ...dataset.errors.map((error) => ({
            jobId: job.id,
            importFileId: file.id,
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
        ],
      });
    } else {
      const rows = dataset.rows as ProductVariantKeywordSourceRow[];
      const groupSizes = new Map<string, number>();
      for (const row of rows) {
        groupSizes.set(row.serialNo, (groupSizes.get(row.serialNo) ?? 0) + 1);
      }

      await tx.stagingProductVariantKeyword.createMany({
        data: [
          ...rows.map((row) => ({
            jobId: job.id,
            importFileId: file.id,
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
          ...dataset.errors.map((error) => ({
            jobId: job.id,
            importFileId: file.id,
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
        ],
      });
    }

    return { jobId: job.id, fileId: file.id };
  });

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

export async function getStagingImportSummary(storeId?: string): Promise<StagingImportSummaryResponse> {
  const jobs = await prisma.importJob.findMany({
    where: storeId ? { storeId } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  const latestJobs: Partial<Record<StagingImportFileType, StagingImportLatestJob>> = {};
  for (const job of jobs) {
    if (latestJobs[job.fileType as StagingImportFileType]) continue;
    latestJobs[job.fileType as StagingImportFileType] = {
      jobId: job.id,
      fileName: job.fileName,
      status: job.status,
      totalRows: job.totalRows,
      successRows: job.successRows,
      errorRows: job.errorRows,
      appliedAt: job.appliedAt ? job.appliedAt.toISOString() : null,
    };
  }

  const summary = createEmptySummary();
  for (const job of Object.values(latestJobs)) {
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

  return {
    latestJobs,
    summary: {
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
