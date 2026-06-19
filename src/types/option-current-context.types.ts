export const OPTION_CURRENT_CONTEXT_TEMPLATE_HEADERS = [
  'smartstoreId',
  'storeName',
  'channelProductNo',
  'originProductNo',
  'optionId',
  'sellerManagerCode',
  'optionName',
  'optionValue',
  'baseSalePrice',
  'sellerDiscount',
  'optionPrice',
  'currentEffectiveOptionPrice',
  'currentOptionStockQuantity',
  'additionalPrice',
  'additionalStockQuantity',
  'memo',
] as const;

export const OPTION_CURRENT_CONTEXT_SUPPORTED_EXTENSIONS = ['.csv', '.xls', '.xlsx'] as const;

export type OptionCurrentContextRowType = 'OPTION' | 'ADDITIONAL';

export type OptionCurrentContextPriceSource =
  | 'DIRECT_FINAL_PRICE'
  | 'CALCULATED_FROM_BASE_DISCOUNT_OPTION'
  | 'CALCULATED_FROM_BULK_PRODUCT_ROW'
  | 'MISSING'
  | 'ADDITIONAL_SINGLE_PRICE';

export type OptionCurrentContextPreviewStatus = 'VALID' | 'WARNING' | 'ERROR';

export type OptionCurrentContextParserType = 'STANDARD' | 'SMARTSTORE_BULK_PRODUCT_EXPLODE';

export type OptionCurrentContextIdentifierSource =
  | 'OPTION_ID'
  | 'SELLER_MANAGER_CODE'
  | 'OPTION_VALUE'
  | 'MISSING';

export type OptionCurrentContextPreviewRow = {
  rowNumber: number;
  originalRowNumber?: number | null;
  sourceSheet?: string | null;
  rowType: OptionCurrentContextRowType;
  parserType: OptionCurrentContextParserType;
  smartstoreId?: string | null;
  storeName?: string | null;
  channelProductNo: string | null;
  originProductNo?: string | null;
  optionId: string | null;
  identifierSource: OptionCurrentContextIdentifierSource;
  sellerManagerCode?: string | null;
  optionName?: string | null;
  optionValue?: string | null;
  baseSalePrice?: number | null;
  sellerDiscount?: number | null;
  sellerDiscountUnit?: string | null;
  optionPrice?: number | null;
  calculatedEffectiveOptionPrice?: number | null;
  currentEffectiveOptionPrice?: number | null;
  currentOptionStockQuantity?: number | null;
  additionalPrice?: number | null;
  additionalStockQuantity?: number | null;
  optionArrayLengthMismatch?: boolean;
  priceSource: OptionCurrentContextPriceSource;
  memo?: string | null;
  warnings: string[];
  errors: string[];
  status: OptionCurrentContextPreviewStatus;
};

export type OptionCurrentContextPreviewSummary = {
  totalRows: number;
  validRows: number;
  warningRows: number;
  errorRows: number;
  rowsWithCurrentPrice: number;
  rowsWithCurrentStock: number;
  rowsWithBothCurrentContext: number;
  rowsWithDirectEffectivePrice: number;
  rowsWithCalculatedEffectivePrice: number;
  rowsMissingSellerDiscount: number;
  rowsWithPriceMismatch: number;
  originalProductRows: number;
  explodedOptionRows: number;
  bulkProductExplodeAppliedRows: number;
  bulkProductExplodeApplied: boolean;
  rowsWithPercentDiscountWarning: number;
  rowsWithOptionArrayLengthMismatch: number;
  rowsWithoutOptionId: number;
  rowsUsingSellerManagerCodeFallback: number;
  missingChannelProductNo: number;
  missingOptionIdentifier: number;
};

export type OptionCurrentContextPreviewResponse = {
  fileName: string;
  summary: OptionCurrentContextPreviewSummary;
  rows: OptionCurrentContextPreviewRow[];
};
