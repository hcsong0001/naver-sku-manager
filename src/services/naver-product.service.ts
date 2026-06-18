import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import type {
  NaverOptionCombination,
  NaverProductApiResponse,
  NaverSupplementProduct,
  NaverTokenResponse,
} from '@/src/types/naver-product.types';

const NAVER_API_BASE = 'https://api.commerce.naver.com';

export function getNaverApiBaseUrl(): string {
  return NAVER_API_BASE;
}

/**
 * 네이버 커머스 API 인증 토큰을 발급합니다.
 * BCRYPT 기반 client_secret_sign을 생성합니다.
 */
export async function getNaverToken(
  clientId: string,
  clientSecret: string,
): Promise<NaverTokenResponse> {
  const timestamp = Date.now();
  const password = `${clientId}_${timestamp}`;
  const hashed = bcrypt.hashSync(password, clientSecret);
  const signature = Buffer.from(hashed, 'utf-8').toString('base64');

  const body = new URLSearchParams({
    client_id: clientId,
    timestamp: timestamp.toString(),
    client_secret_sign: signature,
    grant_type: 'client_credentials',
    type: 'SELF',
  });

  const res = await fetch(`${NAVER_API_BASE}/external/v1/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`네이버 토큰 발급 실패 (${res.status}): ${errorText}`);
  }

  return res.json() as Promise<NaverTokenResponse>;
}

/**
 * channelProductNo로 네이버 상품 상세를 조회합니다.
 * Commerce API v2: GET /v2/products/channel-products/{channelProductNo}
 */
export async function fetchNaverProduct(
  accessToken: string,
  channelProductNo: string,
): Promise<NaverProductApiResponse> {
  const res = await fetch(
    `${NAVER_API_BASE}/external/v2/products/channel-products/${channelProductNo}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`네이버 상품 조회 실패 (${res.status}): ${errorText}`);
  }

  return res.json() as Promise<NaverProductApiResponse>;
}

/**
 * NaverProductApiResponse → DB 저장용 데이터로 변환합니다.
 */
export function transformNaverProductToDbData(
  apiResponse: NaverProductApiResponse,
  smartstoreId: string,
  channelProductNo: string,
) {
  const { originProduct, smartstoreChannelProduct } = apiResponse;

  return {
    name: originProduct.name,
    naverProductId: channelProductNo,
    status: originProduct.statusType || 'SALE',
    channelProductNo: smartstoreChannelProduct?.channelProductNo?.toString() || channelProductNo,
    smartstoreId,
    salePrice: originProduct.salePrice,
    stockQuantity: originProduct.stockQuantity,
    categoryId: originProduct.leafCategoryId,
    imageUrl: originProduct.images?.representativeImage?.url || null,
  };
}

export type CollectedNaverProduct = {
  id: string;
  name: string;
  naverProductId: string;
  status: string;
  channelProductNo: string | null;
  smartstoreId: string;
};

export type CollectNaverProductResult = {
  message: string;
  product: CollectedNaverProduct;
  naverData: {
    name: string;
    salePrice: number;
    stockQuantity: number;
    categoryId: string;
    imageUrl: string | null;
  };
};

async function getStoreToken(storeId: string): Promise<string> {
  const store = await prisma.smartstore.findUnique({ where: { id: storeId } });

  if (!store) {
    throw new Error('Smartstore를 찾을 수 없습니다.');
  }

  if (!store.clientId || !store.clientSecret) {
    throw new Error('해당 스토어에 API 키(clientId/clientSecret)가 설정되어 있지 않습니다.');
  }

  const tokenData = await getNaverToken(store.clientId, store.clientSecret);
  return tokenData.access_token;
}

export async function collectNaverProductByChannelProductNo(
  smartstoreId: string,
  channelProductNo: string,
): Promise<CollectNaverProductResult> {
  const accessToken = await getStoreToken(smartstoreId);
  const apiResponse = await fetchNaverProduct(accessToken, channelProductNo);
  const productData = transformNaverProductToDbData(apiResponse, smartstoreId, channelProductNo);

  const product = await prisma.naverProduct.upsert({
    where: { naverProductId: productData.naverProductId },
    update: {
      name: productData.name,
      status: productData.status,
      channelProductNo: productData.channelProductNo,
      smartstoreId: productData.smartstoreId,
      currentSalePrice: productData.salePrice,
      currentStockQuantity: productData.stockQuantity,
      currentStateSyncedAt: new Date(),
      currentStateSource: 'NAVER_PRODUCT_COLLECTION',
    },
    create: {
      id: productData.naverProductId,
      name: productData.name,
      naverProductId: productData.naverProductId,
      status: productData.status,
      channelProductNo: productData.channelProductNo,
      smartstoreId: productData.smartstoreId,
      currentSalePrice: productData.salePrice,
      currentStockQuantity: productData.stockQuantity,
      currentStateSyncedAt: new Date(),
      currentStateSource: 'NAVER_PRODUCT_COLLECTION',
    },
  });

  const combinations =
    apiResponse.originProduct?.detailAttribute?.optionInfo?.optionCombinations || [];

  await prisma.naverProductOption.deleteMany({
    where: { naverProductId: product.id },
  });

  const optionData = combinations.map((option: NaverOptionCombination) => ({
    id: option.id.toString(),
    naverProductId: product.id,
    optionName: [option.optionName1, option.optionName2, option.optionName3]
      .filter(Boolean)
      .join(' / '),
    optionValue: [option.optionName1, option.optionName2, option.optionName3]
      .filter(Boolean)
      .join(' / '),
    optionCode: option.sellerManagerCode || null,
  }));

  if (optionData.length > 0) {
    await prisma.naverProductOption.createMany({
      data: optionData,
      skipDuplicates: true,
    });
  }

  const supplementProductInfo =
    apiResponse.originProduct?.detailAttribute?.supplementProductInfo;
  const supplementProducts = Array.isArray(supplementProductInfo?.supplementProducts)
    ? supplementProductInfo.supplementProducts
    : [];

  await prisma.naverProductAdditional.deleteMany({
    where: { naverProductId: product.id },
  });

  const additionalData = supplementProducts.map((supplementProduct: NaverSupplementProduct) => ({
    id: supplementProduct.id.toString(),
    naverProductId: product.id,
    additionalName: supplementProduct.groupName,
    additionalValue: supplementProduct.name,
    price: supplementProduct.price ?? null,
    stockQuantity: supplementProduct.stockQuantity ?? null,
    sellerManagementCode: supplementProduct.sellerManagementCode ?? null,
    usable: supplementProduct.usable ?? null,
    sortType: supplementProductInfo?.sortType ?? null,
    currentStateSyncedAt: new Date(),
    currentStateSource: 'NAVER_PRODUCT_COLLECTION',
  }));

  if (additionalData.length > 0) {
    await prisma.naverProductAdditional.createMany({
      data: additionalData,
      skipDuplicates: true,
    });
  }

  return {
    message: '상품이 성공적으로 수집되었습니다.',
    product,
    naverData: {
      name: productData.name,
      salePrice: productData.salePrice,
      stockQuantity: productData.stockQuantity,
      categoryId: productData.categoryId,
      imageUrl: productData.imageUrl,
    },
  };
}
