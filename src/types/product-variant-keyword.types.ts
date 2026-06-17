import type { SkuMappingType } from '@/src/types/sku-keyword-matching.types';

export type ProductVariantKeywordResolvedSku = {
  skuId: string;
  skuCode: string;
  skuName: string;
  modelCode: string;
  barcode: string;
  quantity: number;
  stockQuantity: number;
  confidence: number;
  inventoryMatchProductName: string;
  warningMessage: string;
};

export type ProductVariantKeywordPreviewRow = {
  channelProductNo: string;
  mappingType: Extract<SkuMappingType, 'OPTION' | 'ADDITIONAL'>;
  itemId: string;
  itemName: string;
  serialNo: string;
  productMatchName: string;
  productOptionText: string;
  stockMatchedProductName: string;
  stockMatchedProductNames: string[];
  resolvedSkuCode: string;
  resolvedModelCodes: string;
  barcode: string;
  quantity: number;
  isSetProduct: boolean;
  confidence: number;
  warningMessage: string;
  skus: ProductVariantKeywordResolvedSku[];
};

export type ProductVariantKeywordPreviewResponse = {
  channelProductNo: string;
  productId: string;
  productName: string;
  totalExcelRows: number;
  matchedGroupCount: number;
  candidateCount: number;
  setProductCount: number;
  unresolvedCount: number;
  rows: ProductVariantKeywordPreviewRow[];
};
