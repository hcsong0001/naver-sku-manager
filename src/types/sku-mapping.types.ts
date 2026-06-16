export const SKU_MAPPING_HEADERS = [
  'mappingType',
  'smartstoreName',
  'channelProductNo',
  'productName',
  'itemId',
  'itemName',
  'managementCode',
  'currentSkuCode',
  'newSkuCode',
] as const;

export type SkuMappingHeader = (typeof SKU_MAPPING_HEADERS)[number];

export type SkuMappingType = 'OPTION' | 'ADDITIONAL';

export type SkuMappingExcelRow = Record<SkuMappingHeader, string>;

export type SkuMappingParsedRow = SkuMappingExcelRow & {
  rowNumber: number;
};

export type SkuMappingValidRow = SkuMappingParsedRow & {
  mappingType: SkuMappingType;
  skuId: string;
};

export type SkuMappingErrorRow = SkuMappingParsedRow & {
  errors: string[];
};

export type SkuMappingPreviewResponse = {
  totalRows: number;
  validRows: SkuMappingValidRow[];
  errorRows: SkuMappingErrorRow[];
};

export type SkuMappingApplyResponse = {
  appliedCount: number;
  optionCount: number;
  additionalCount: number;
};
