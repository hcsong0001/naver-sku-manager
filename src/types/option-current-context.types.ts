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
  | 'MISSING'
  | 'ADDITIONAL_SINGLE_PRICE';

export type OptionCurrentContextPreviewStatus = 'VALID' | 'WARNING' | 'ERROR';

export type OptionCurrentContextPreviewRow = {
  rowNumber: number;
  sourceSheet?: string | null;
  rowType: OptionCurrentContextRowType;
  smartstoreId?: string | null;
  storeName?: string | null;
  channelProductNo: string | null;
  originProductNo?: string | null;
  optionId: string | null;
  sellerManagerCode?: string | null;
  optionName?: string | null;
  optionValue?: string | null;
  baseSalePrice?: number | null;
  sellerDiscount?: number | null;
  optionPrice?: number | null;
  calculatedEffectiveOptionPrice?: number | null;
  currentEffectiveOptionPrice?: number | null;
  currentOptionStockQuantity?: number | null;
  additionalPrice?: number | null;
  additionalStockQuantity?: number | null;
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
  missingChannelProductNo: number;
  missingOptionIdentifier: number;
};

export type OptionCurrentContextPreviewResponse = {
  fileName: string;
  summary: OptionCurrentContextPreviewSummary;
  rows: OptionCurrentContextPreviewRow[];
};
