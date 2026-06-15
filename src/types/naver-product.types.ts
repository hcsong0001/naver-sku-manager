/**
 * 네이버 커머스 API 상품 관련 타입 정의
 */

// 네이버 API 토큰 응답
export interface NaverTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// 네이버 originProduct 내부 주요 필드
export interface NaverOriginProduct {
  statusType: string;
  saleType: string;
  leafCategoryId: string;
  name: string;
  detailContent: string;
  images: {
    representativeImage?: { url: string };
    optionalImages?: { url: string }[];
  };
  salePrice: number;
  stockQuantity: number;
  detailAttribute?: {
    naverShoppingSearchInfo?: {
      modelId?: string;
      modelName?: string;
      manufacturerName?: string;
      brandId?: number;
      brandName?: string;
    };
    afterServiceInfo?: {
      afterServiceTelephoneNumber?: string;
      afterServiceGuideContent?: string;
    };
    originAreaInfo?: {
      originAreaCode?: string;
      content?: string;
      plural?: boolean;
    };
  };
  customerBenefit?: {
    immediateDiscountPolicy?: {
      discountMethod?: {
        value: number;
        unitType: string;
      };
    };
  };
}

// 네이버 상품 조회 API 전체 응답
export interface NaverProductApiResponse {
  originProduct: NaverOriginProduct;
  smartstoreChannelProduct?: {
    channelProductNo: number;
    naverShoppingRegistration: boolean;
    channelProductName: string;
    storeKeepExclusiveProduct: boolean;
    channelProductDisplayStatusType: string;
  };
  windowChannelProduct?: any;
}

// 네이버 상품 채널 상품 목록 조회 응답
export interface NaverChannelProductsResponse {
  contents: {
    channelProductNo: number;
    originProductNo: number;
    channelProductName: string;
    statusType: string;
    channelProductDisplayStatusType: string;
    salePrice: number;
    stockQuantity: number;
    knowledgeShoppingProductRegistration: boolean;
    lastChangedDate: string;
  }[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// DB 저장용 상품 데이터
export interface ProductSaveData {
  id: string;
  smartstoreId: string;
  name: string;
  naverProductId: string;
  status: string;
  channelProductNo: string;
}
