export const SKU_BARCODE_IMPORT_HEADERS = [
  'skuCode',
  'barcode',
  'unitName',
  'quantity',
  'barcodeType',
  'isPrimary',
  'source',
  'memo',
] as const;

export type SkuBarcodeImportHeader = (typeof SKU_BARCODE_IMPORT_HEADERS)[number];
export type SkuBarcodeImportExcelRow = Record<SkuBarcodeImportHeader, string>;
export type SkuBarcodeImportParsedRow = SkuBarcodeImportExcelRow & { rowNumber: number };

export type SkuBarcodeImportValidRow = SkuBarcodeImportParsedRow & {
  skuId: string;
  quantityValue: number;
  isPrimaryValue: boolean;
  warnings: string[];
};

export type SkuBarcodeImportErrorRow = SkuBarcodeImportParsedRow & {
  errors: string[];
  warnings: string[];
};

export type SkuBarcodeImportPreviewResponse = {
  totalRows: number;
  validRows: SkuBarcodeImportValidRow[];
  errorRows: SkuBarcodeImportErrorRow[];
  warningRows: SkuBarcodeImportValidRow[];
};

export type SkuBarcodeImportApplyResponse = {
  appliedCount: number;
};
