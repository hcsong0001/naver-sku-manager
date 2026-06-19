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

export const WARNING_REASON_MAP: Record<string, { label: string; description: string; hint: string }> = {
  NO_STOCK_MATCH: {
    label: '재고 매칭 실패',
    description: '상품관리 CSV 후보는 찾았지만 재고현황 XLS에서 연결 가능한 재고 row를 찾지 못했습니다.',
    hint: '재고현황 파일에 해당 상품명/옵션명/관리코드가 있는지 확인하세요.',
  },
  FALLBACK_CANDIDATE: {
    label: '유사 후보 추천',
    description: '정확히 일치하는 상품 후보가 없어 부분 단어 기반 후보만 찾았습니다.',
    hint: '상품명, 키워드, 판매자관리코드 기준으로 수동 확인이 필요합니다.',
  },
  GENERIC_OPTION_MATCH: {
    label: '범용 옵션명',
    description: '옵션명이 너무 짧거나 범용적입니다. 예: 기본, 화이트, 블랙 등.',
    hint: '같은 옵션명이 여러 상품에 존재할 수 있으므로 자동 확정하지 않습니다.',
  },
  PARTIAL_MATCH: {
    label: '부분 일치',
    description: '일부 텍스트만 일치합니다.',
    hint: '상품명/옵션명 차이가 실제 같은 상품인지 수동 확인하세요.',
  },
  MULTIPLE_CSV_ROWS: {
    label: '복수 CSV 후보',
    description: '상품관리 CSV에서 여러 후보가 발견되었습니다.',
    hint: '후보 중 정확한 상품/옵션을 수동으로 선택해야 합니다.',
  },
  MULTIPLE_STOCK_ROWS: {
    label: '복수 재고 후보',
    description: '동일한 키워드로 여러 재고 항목이 발견되었습니다.',
    hint: '재고현황 파일에서 정확히 매칭할 항목을 수동으로 지정하세요.',
  },
  WEAK_STOCK_MATCH: {
    label: '낮은 재고 매칭률',
    description: '재고현황 텍스트 매칭 유사도가 너무 낮아 자동 확정을 보류했습니다.',
    hint: '실제 동일 상품인지 확인 후 수동으로 연결해 주세요.',
  }
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
