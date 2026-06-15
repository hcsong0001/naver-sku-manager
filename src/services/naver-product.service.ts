import bcrypt from 'bcryptjs';
import type { NaverTokenResponse, NaverProductApiResponse } from '@/src/types/naver-product.types';

const NAVER_API_BASE = 'https://api.commerce.naver.com';

/**
 * 네이버 커머스 API 인증 토큰을 발급합니다.
 * BCRYPT 기반 client_secret_sign을 생성합니다.
 */
export async function getNaverToken(clientId: string, clientSecret: string): Promise<NaverTokenResponse> {
  const timestamp = Date.now();
  // password 생성: clientId + _ + timestamp (밀리초)
  const password = `${clientId}_${timestamp}`;

  // BCRYPT 방식으로 전자서명 생성
  const hashed = bcrypt.hashSync(password, clientSecret);
  const signature = Buffer.from(hashed, 'utf-8').toString('base64');

  console.log({
    client_id: clientId,
    timestamp: timestamp.toString(),
    client_secret_sign: signature,
    grant_type: 'client_credentials',
    type: 'SELF',
  });

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

  return res.json();
}

/**
 * channelProductNo로 네이버 상품 상세를 조회합니다.
 * Commerce API v2: GET /v2/products/channel-products/{channelProductNo}
 */
export async function fetchNaverProduct(
  accessToken: string,
  channelProductNo: string
): Promise<NaverProductApiResponse> {
  const res = await fetch(
    `${NAVER_API_BASE}/external/v2/products/channel-products/${channelProductNo}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`네이버 상품 조회 실패 (${res.status}): ${errorText}`);
  }

  return res.json();
}

/**
 * NaverProductApiResponse → DB 저장용 데이터로 변환합니다.
 */
export function transformNaverProductToDbData(
  apiResponse: NaverProductApiResponse,
  smartstoreId: string,
  channelProductNo: string
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
