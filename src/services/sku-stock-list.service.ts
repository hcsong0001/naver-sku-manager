import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';

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

export async function parseStockListWorkbook(buffer: Buffer): Promise<StockListImportRow[]> {
  const workbook = XLSX.read(buffer, { type: 'buffer', codepage: 949 });
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
  const barcodeHeader = headers[7]; // 바코드번호(서식)
  const optionCodeHeader = headers[15]; // 옵션정보일련번호
  const internalCodeHeader = headers[104]; // 자체상품코드
  const purchaseNameHeader = headers[14]; // 사입상품명
  const productNameHeader = headers[9]; // 상품명
  const modelNameHeader = headers[67]; // 모델명
  const supplierCodeHeader = headers[54]; // 공급처코드

  const sellingPriceHeader = headers[11]; // 대표판매가
  const costPriceHeader = headers[12]; // 대표공급가
  const stockQtyHeader = headers[20]; // 재고수량

  return rows
    .map((row, index) => {
      let barcode = String(row[barcodeHeader] ?? '').trim();
      // 과학적 표기법 복원
      if (barcode.includes('E+') || barcode.includes('e+')) {
        const numVal = Number(barcode);
        if (Number.isFinite(numVal)) {
          barcode = numVal.toFixed(0);
        }
      }

      const optionCode = String(row[optionCodeHeader] ?? '').trim();
      const internalProductCode = String(row[internalCodeHeader] ?? '').trim();
      const purchaseProductName = String(row[purchaseNameHeader] ?? '').trim();
      const productName = String(row[productNameHeader] ?? '').trim();
      const modelName = String(row[modelNameHeader] ?? '').trim();
      const supplierItemCode = String(row[supplierCodeHeader] ?? '').trim();

      const sellingPrice = Number(row[sellingPriceHeader]);
      const costPrice = Number(row[costPriceHeader]);
      const stockQuantity = Number(row[stockQtyHeader]);

      let skuCodeCandidate = '';
      if (optionCode) skuCodeCandidate = `STK-${optionCode}`;
      else if (internalProductCode) skuCodeCandidate = internalProductCode;
      else if (purchaseProductName) skuCodeCandidate = purchaseProductName;
      else if (barcode) skuCodeCandidate = `BARCODE-${barcode}`;

      return {
        rowNumber: index + 2,
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
