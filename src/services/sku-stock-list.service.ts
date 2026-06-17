import prisma from '@/lib/prisma';
import { XLSX, readLegacyKoreanWorkbook } from '@/src/lib/xlsx-legacy';

export type StockListImportRow = {
  rowNumber: number;
  barcode: string;
  productName: string;
  purchaseProductName: string;
  internalProductCode: string;
  modelName: string;
  supplierItemCode: string;
  optionCode: string;
  sellingPrice: number | null;
  costPrice: number | null;
  stockQuantity: number | null;
  skuCodeCandidate: string;
};

export type StockListPreviewResponse = {
  totalRows: number;
  validRows: StockListImportRow[];
  errorRows: (StockListImportRow & { error: string })[];
};

export type StockListApplyResponse = {
  appliedCount: number;
  skuCreatedCount: number;
  barcodeCreatedCount: number;
  aliasCreatedCount: number;
};

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

function findHeaderByCandidates(
  headers: string[],
  candidates: string[],
  fallbackHeader = '',
): string {
  const normalizedCandidates = candidates.map((candidate) => normalizeText(candidate));
  const exactHeader = headers.find((header) => {
    const normalizedHeader = normalizeText(header);
    return normalizedCandidates.some((candidate) => normalizedHeader === candidate);
  });
  if (exactHeader) return exactHeader;

  return (
    headers.find((header) => {
      const normalizedHeader = normalizeText(header);
      return normalizedCandidates.some((candidate) => normalizedHeader.includes(candidate));
    }) ?? fallbackHeader
  );
}

function normalizeBarcode(value: unknown): string {
  let barcode = normalizeCell(value);
  if (barcode.includes('E+') || barcode.includes('e+')) {
    const numVal = Number(barcode);
    if (Number.isFinite(numVal)) {
      barcode = numVal.toFixed(0);
    }
  }
  return barcode;
}

function isSummaryRow(row: Record<string, unknown>): boolean {
  return Object.values(row).some((value) => normalizeCell(value) === '합계');
}

export async function parseStockListWorkbook(buffer: Buffer): Promise<StockListImportRow[]> {
  const workbook = readLegacyKoreanWorkbook(buffer);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error('엑셀 파일에 시트가 없습니다.');
  }

  const worksheet = workbook.Sheets[sheetName];
  // raw: true로 읽어서 과학적 표기법 변환 전의 정수(숫자) 유지
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: true,
  });

  if (rows.length === 0) {
    throw new Error('데이터가 없습니다.');
  }

  const headers = Object.keys(rows[0]);
  const barcodeHeader = findHeaderByCandidates(
    headers,
    ['바코드번호(관리)', '바코드번호(서식)', '바코드번호 관리', '바코드번호 서식'],
    headers[7],
  );
  const optionCodeHeader = findHeaderByCandidates(
    headers,
    ['옵션정보일련번호', '옵션코드'],
    headers[15],
  );
  const internalCodeHeader = findHeaderByCandidates(
    headers,
    ['자체상품코드', '상품코드'],
    headers[104],
  );
  const purchaseNameHeader = findHeaderByCandidates(headers, ['사입상품명'], headers[14]);
  const productNameHeader = findHeaderByCandidates(headers, ['상품명'], headers[9]);
  const modelNameHeader = findHeaderByCandidates(headers, ['모델명'], headers[67]);
  const supplierCodeHeader = findHeaderByCandidates(headers, ['공급처코드'], headers[54]);

  const sellingPriceHeader = findHeaderByCandidates(headers, ['대표판매가'], headers[11]);
  const costPriceHeader = findHeaderByCandidates(headers, ['대표공급가'], headers[12]);
  const stockQtyHeader = findHeaderByCandidates(headers, ['재고수량', '현재재고'], headers[20]);

  return rows
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) => !isSummaryRow(row))
    .map(({ row, rowNumber }) => {
      const barcode = normalizeBarcode(row[barcodeHeader]);

      const optionCode = normalizeCell(row[optionCodeHeader]);
      const internalProductCode = normalizeCell(row[internalCodeHeader]);
      const purchaseProductName = normalizeCell(row[purchaseNameHeader]);
      const productName = normalizeCell(row[productNameHeader]);
      const modelName = normalizeCell(row[modelNameHeader]);
      const supplierItemCode = normalizeCell(row[supplierCodeHeader]);

      const sellingPrice = Number(row[sellingPriceHeader]);
      const costPrice = Number(row[costPriceHeader]);
      const stockQuantity = Number(row[stockQtyHeader]);

      let skuCodeCandidate = '';
      if (optionCode) skuCodeCandidate = `STK-${optionCode}`;
      else if (internalProductCode) skuCodeCandidate = internalProductCode;
      else if (purchaseProductName) skuCodeCandidate = purchaseProductName;
      else if (barcode) skuCodeCandidate = `BARCODE-${barcode}`;

      return {
        rowNumber,
        barcode,
        productName,
        purchaseProductName,
        internalProductCode,
        modelName,
        supplierItemCode,
        optionCode,
        sellingPrice: Number.isFinite(sellingPrice) ? sellingPrice : null,
        costPrice: Number.isFinite(costPrice) ? costPrice : null,
        stockQuantity: Number.isFinite(stockQuantity) ? stockQuantity : null,
        skuCodeCandidate,
      };
    })
    .filter((row) => row.barcode); // 바코드(서식)가 있는 행만
}

export async function previewStockList(rows: StockListImportRow[]): Promise<StockListPreviewResponse> {
  const validRows: StockListImportRow[] = [];
  const errorRows: (StockListImportRow & { error: string })[] = [];

  for (const row of rows) {
    if (!row.skuCodeCandidate) {
      errorRows.push({ ...row, error: 'SKU 코드를 생성할 수 있는 기준 정보가 없습니다.' });
    } else {
      validRows.push(row);
    }
  }

  return {
    totalRows: rows.length,
    validRows,
    errorRows,
  };
}

export async function applyStockList(rows: StockListImportRow[]): Promise<StockListApplyResponse> {
  let skuCreatedCount = 0;
  let barcodeCreatedCount = 0;
  let aliasCreatedCount = 0;

  await prisma.$transaction(async (tx) => {
    for (const row of rows) {
      if (!row.skuCodeCandidate || !row.barcode) continue;

      // 1. Sku 확인/생성
      let sku = await tx.sku.findUnique({
        where: { skuCode: row.skuCodeCandidate },
      });

      if (!sku) {
        sku = await tx.sku.create({
          data: {
            skuCode: row.skuCodeCandidate,
            sellingPrice: row.sellingPrice ?? 0,
            costPrice: row.costPrice ?? 0,
            stockQuantity: row.stockQuantity ?? 0,
          },
        });
        skuCreatedCount++;
      }

      // 2. SkuBarcode 확인/생성
      const existingBarcode = await tx.skuBarcode.findUnique({
        where: {
          skuId_barcode: {
            skuId: sku.id,
            barcode: row.barcode,
          },
        },
      });

      if (!existingBarcode) {
        await tx.skuBarcode.create({
          data: {
            skuId: sku.id,
            barcode: row.barcode,
            unitName: '낱개',
            quantity: 1,
            barcodeType: 'PRODUCT',
            isPrimary: true,
            source: '재고현황 XLS',
          },
        });
        barcodeCreatedCount++;
      }

      // 3. SkuAlias 등록 헬퍼
      const addAlias = async (type: string, value: string) => {
        if (!value) return;
        const existing = await tx.skuAlias.findUnique({
          where: {
            skuId_aliasType_value: {
              skuId: sku!.id,
              aliasType: type,
              value,
            },
          },
        });
        if (!existing) {
          await tx.skuAlias.create({
            data: {
              skuId: sku!.id,
              aliasType: type,
              value,
              source: '재고현황 XLS',
            },
          });
          aliasCreatedCount++;
        }
      };

      await addAlias('PRODUCT_NAME', row.productName);
      await addAlias('PRODUCT_NAME', row.purchaseProductName);
      await addAlias('MATCH_KEYWORD', row.purchaseProductName);
      await addAlias('INTERNAL_PRODUCT_CODE', row.internalProductCode);
      await addAlias('MODEL_NAME', row.modelName);
      await addAlias('SUPPLIER_ITEM_CODE', row.supplierItemCode);
    }
  });

  return {
    appliedCount: rows.length,
    skuCreatedCount,
    barcodeCreatedCount,
    aliasCreatedCount,
  };
}
