export type SkuDto = {
  id: string;
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  supplierCode: string | null;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  safetyStock: number;
  createdAt: string;
  updatedAt: string;
};

export const SKU_ALIAS_TYPES = [
  'INTERNAL_PRODUCT_CODE',
  'MODEL_NAME',
  'SUPPLIER_ITEM_CODE',
  'BARCODE',
  'MANAGEMENT_CODE',
  'MATCH_KEYWORD',
  'PRODUCT_NAME',
  'OPTION_NAME',
  'ADDITIONAL_NAME',
] as const;

export type SkuAliasType = (typeof SKU_ALIAS_TYPES)[number];

export type SkuAliasDto = {
  id: string;
  skuId: string;
  aliasType: SkuAliasType | string;
  value: string;
  source: string | null;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SkuBarcodeDto = {
  id: string;
  skuId: string;
  barcode: string;
  unitName: string;
  quantity: number;
  barcodeType: string | null;
  isPrimary: boolean;
  source: string | null;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SkuDetailDto = SkuDto & {
  aliases: SkuAliasDto[];
  barcodes: SkuBarcodeDto[];
};
