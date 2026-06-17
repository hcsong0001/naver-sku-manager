/** 키워드 기반 SKU 자동매칭 타입 정의 */

export type SkuMappingType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL';

/** 매칭 방법 */
export type MatchMethod = 'EXACT' | 'NORMALIZED_EXACT' | 'PARTIAL';

/** ERP 미매핑 엑셀 파싱 결과 */
export type ErpUnmappedRow = {
  rowNumber: number;
  mappingType: string;
  smartstoreName: string;
  channelProductNo: string;
  productName: string;
  itemId: string;
  itemName: string;
  managementCode: string;
  currentSkuCode: string;
};

/** 상품관리 CSV 파싱 결과 */
export type ProductManagementRow = {
  rowNumber: number;
  productName: string;
  purchaseProductName: string;
  productCode: string;
  keywords: { column: string; value: string }[];
};

/** 재고현황 XLS 파싱 결과 */
export type StockListRow = {
  rowNumber: number;
  productName: string;
  managedProductName: string;
  purchaseProductName: string;
  optionName: string;
  purchaseOptionName: string;
  accessoryProductName: string;
  optionSerialNo: string;
  optionCode: string;
  productCode: string;
  internalProductCode: string;
  barcode: string;
  barcodeRaw: string;
  barcode2: string;
};

/** 매칭 성공 행 */
export type SkuKeywordMatchedRow = {
  mappingType: SkuMappingType;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  matchedKeyword: string;
  keywordColumn: string;
  productManagementRowNo: number;
  barcode: string;
  skuCode: string;
  quantity: number;
  matchMethod: MatchMethod;
  confidence: number;
  memo: string;
  applyEligible: boolean;
  reviewReason: string;
};

/** 경고 행 */
export type SkuKeywordWarningRow = {
  mappingType: string;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  matchedKeyword: string;
  keywordColumn: string;
  productManagementRowNo: number;
  barcode: string;
  skuCode: string;
  warningType: string;
  warningMessage: string;
  matchMethod: MatchMethod;
  confidence: number;
  memo: string;
};

/** 오류 행 */
export type SkuKeywordErrorRow = {
  mappingType: string;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  errorType: string;
  errorMessage: string;
};

/** 요약 통계 */
export type SkuKeywordSummary = {
  totalErpRows: number;
  keywordMatchCount: number;
  barcodeMatchCount: number;
  skuMatchCount: number;
  warningCount: number;
  errorCount: number;
  matchedRowsCount: number;
  applyEligibleCount: number;
  applyIneligibleCount: number;
  duplicateCount: number;
  possibleSetCount: number;
  possibleDuplicateCount: number;
};

/** 중복 의심 그룹 */
export type SkuKeywordDuplicateRow = {
  mappingType: SkuMappingType;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  matchedRowCount: number;
  barcodes: string;
  skuCodes: string;
  productManagementRowNos: string;
  possibleSet: boolean;
  possibleDuplicate: boolean;
  reviewReason: string;
};

/** 대표 검증 사례 */
export type SkuKeywordRepresentativeCase = {
  caseKey: 'A' | 'B' | 'C';
  channelProductNo: string;
  itemId: string;
  expectedBarcode: string;
  actualBarcode: string;
  currentResult: string;
  reviewReason: string;
};

/** Preview API 응답 */
export type SkuKeywordPreviewResponse = {
  matchedRows: SkuKeywordMatchedRow[];
  warningRows: SkuKeywordWarningRow[];
  errorRows: SkuKeywordErrorRow[];
  duplicates: SkuKeywordDuplicateRow[];
  representativeCases: SkuKeywordRepresentativeCase[];
  summary: SkuKeywordSummary;
};

/** Apply API 요청 */
export type SkuKeywordApplyRequest = {
  rows: SkuKeywordMatchedRow[];
  forceApplyWarningRows?: boolean;
  forceApplyIneligibleRows?: boolean;
};

/** Apply API 응답 */
export type SkuKeywordApplyResponse = {
  appliedCount: number;
  applyTargetCount: number;
  excludedCount: number;
  excludedReasonCounts: Record<string, number>;
  productCount: number;
  optionCount: number;
  additionalCount: number;
  aliasCount: number;
};

export type SkuKeywordManualSkuCandidate = {
  id: string;
  skuCode: string;
  skuName: string;
  sellerProductCode: string;
  barcode: string;
  stockQuantity: number;
  aliases: { aliasType: string; value: string; source: string; memo: string }[];
  barcodes: { barcode: string; unitName: string; quantity: number }[];
  productNames: string[];
  purchaseNames: string[];
};

export type SkuKeywordManualApplySku = {
  skuId: string;
  quantity: number;
};

export type SkuKeywordManualApplyRow = {
  mappingType: SkuMappingType;
  channelProductNo: string;
  itemId: string;
  sourceText: string;
  matchedKeyword: string;
  warningType: string;
  warningMessage: string;
  memo: string;
  skus: SkuKeywordManualApplySku[];
};

export type SkuKeywordManualApplyRequest = {
  rows: SkuKeywordManualApplyRow[];
};

export type SkuKeywordManualApplyRowResult = {
  mappingType: SkuMappingType;
  itemId: string;
  skuId: string;
  skuCode: string;
  quantity: number;
  action: 'CREATED' | 'UPDATED' | 'SKIPPED';
  message: string;
};

export type SkuKeywordManualApplyResponse = {
  appliedCount: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  productCount: number;
  optionCount: number;
  additionalCount: number;
  aliasCount: number;
  results: SkuKeywordManualApplyRowResult[];
};
