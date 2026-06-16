/** 키워드 기반 SKU 자동매칭 타입 정의 */

export type SkuMappingType = 'PRODUCT' | 'OPTION' | 'ADDITIONAL';

/** 매칭 방법 */
export type MatchMethod = 'EXACT' | 'EXACT_NORMALIZED' | 'PARTIAL';

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
  purchaseProductName: string;
  barcode: string;
  barcodeRaw: string;
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
};

/** Preview API 응답 */
export type SkuKeywordPreviewResponse = {
  matchedRows: SkuKeywordMatchedRow[];
  warningRows: SkuKeywordWarningRow[];
  errorRows: SkuKeywordErrorRow[];
  summary: SkuKeywordSummary;
};

/** Apply API 요청 */
export type SkuKeywordApplyRequest = {
  rows: SkuKeywordMatchedRow[];
};

/** Apply API 응답 */
export type SkuKeywordApplyResponse = {
  appliedCount: number;
  productCount: number;
  optionCount: number;
  additionalCount: number;
  aliasCount: number;
};
