export const SKU_ALIAS_IMPORT_HEADERS = ['skuCode', 'aliasType', 'value', 'source', 'memo'] as const;

export type SkuAliasImportHeader = (typeof SKU_ALIAS_IMPORT_HEADERS)[number];
export type SkuAliasImportExcelRow = Record<SkuAliasImportHeader, string>;
export type SkuAliasImportParsedRow = SkuAliasImportExcelRow & { rowNumber: number };

export type SkuAliasImportValidRow = SkuAliasImportParsedRow & {
  skuId: string;
  warnings: string[];
};

export type SkuAliasImportErrorRow = SkuAliasImportParsedRow & {
  errors: string[];
  warnings: string[];
};

export type SkuAliasImportPreviewResponse = {
  totalRows: number;
  validRows: SkuAliasImportValidRow[];
  errorRows: SkuAliasImportErrorRow[];
  warningRows: SkuAliasImportValidRow[];
};

export type SkuAliasImportApplyResponse = {
  appliedCount: number;
};
