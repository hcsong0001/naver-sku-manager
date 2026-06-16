import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getNaverToken, fetchNaverProduct, transformNaverProductToDbData } from '@/src/services/naver-product.service';
import type { NaverOptionCombination, NaverSupplementProduct } from '@/src/types/naver-product.types';

/**
 * GET /api/products
 * 전체 상품 목록을 조회합니다. ?smartstoreId= 쿼리로 필터 가능.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const smartstoreId = searchParams.get('smartstoreId');

    const products = await prisma.naverProduct.findMany({
      where: smartstoreId ? { smartstoreId } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        naverProductId: true,
        status: true,
        channelProductNo: true,
        createdAt: true,
        updatedAt: true,
        skuId: true,
        smartstoreId: true,
        smartstore: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

/**
 * POST /api/products
 * channelProductNo와 smartstoreId를 받아 네이버 API에서 상품을 조회하고 DB에 저장합니다.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { smartstoreId, channelProductNo } = body;

    if (!smartstoreId || !channelProductNo) {
      return NextResponse.json(
        { error: 'smartstoreId와 channelProductNo가 필요합니다.' },
        { status: 400 }
      );
    }

    // 1. 해당 스토어의 API 키 조회
    const store = await prisma.smartstore.findUnique({ where: { id: smartstoreId } });
    console.log('[DEBUG] Store lookup:', {
      smartstoreId,
      storeFound: !!store,
      storeKeys: store ? Object.keys(store) : [],
      clientId: store?.clientId ?? '<<MISSING FIELD>>',
      clientSecret: store?.clientSecret ? '***설정됨***' : '<<MISSING or NULL>>',
    });
    if (!store) {
      return NextResponse.json({ error: 'Smartstore를 찾을 수 없습니다.' }, { status: 404 });
    }
    if (!store.clientId || !store.clientSecret) {
      return NextResponse.json(
        { error: '해당 스토어에 API 키(clientId/clientSecret)가 설정되어 있지 않습니다.' },
        { status: 400 }
      );
    }

    // 2. 네이버 토큰 발급
    const tokenData = await getNaverToken(store.clientId, store.clientSecret);

    // 3. 네이버 상품 조회
    const apiResponse = await fetchNaverProduct(tokenData.access_token, channelProductNo);

    // 4. originProduct → DB 데이터 변환
    const productData = transformNaverProductToDbData(apiResponse, smartstoreId, channelProductNo);

    // 5. upsert로 DB 저장 (naverProductId 기준)
    const product = await prisma.naverProduct.upsert({
      where: { naverProductId: productData.naverProductId },
      update: {
        name: productData.name,
        status: productData.status,
        channelProductNo: productData.channelProductNo,
        smartstoreId: productData.smartstoreId,
      },
      create: {
        id: productData.naverProductId, // API에서 제공하는 식별자 활용
        name: productData.name,
        naverProductId: productData.naverProductId,
        status: productData.status,
        channelProductNo: productData.channelProductNo,
        smartstoreId: productData.smartstoreId,
      },
    });

    // 6. 옵션 정보 파싱 및 저장 로직 추가
    const combinations = 
      apiResponse.originProduct?.detailAttribute
        ?.optionInfo
        ?.optionCombinations || [];
    
    // 기존 옵션 삭제 (동기화 보장)
    await prisma.naverProductOption.deleteMany({
      where: {
        naverProductId: product.id
      }
    });

    const optionData = combinations.map((option: NaverOptionCombination) => ({
      id: option.id.toString(),
      naverProductId: product.id,
      optionName: [
        option.optionName1,
        option.optionName2,
        option.optionName3
      ]
        .filter(Boolean)
        .join(' / '),

      optionValue: [
        option.optionName1,
        option.optionName2,
        option.optionName3
      ]
        .filter(Boolean)
        .join(' / '),

      optionCode: option.sellerManagerCode || null
    }));

    if (optionData.length > 0) {
      await prisma.naverProductOption.createMany({
        data: optionData,
        skipDuplicates: true
      });
    }

    // 7. 추가상품 정보 파싱 및 저장
    const supplementProductInfo =
      apiResponse.originProduct?.detailAttribute?.supplementProductInfo;
    const supplementProducts = Array.isArray(supplementProductInfo?.supplementProducts)
      ? supplementProductInfo.supplementProducts
      : [];

    // 기존 추가상품 삭제 (동기화 보장)
    await prisma.naverProductAdditional.deleteMany({
      where: {
        naverProductId: product.id
      }
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
      sortType: supplementProductInfo?.sortType ?? null
    }));

    if (additionalData.length > 0) {
      await prisma.naverProductAdditional.createMany({
        data: additionalData,
        skipDuplicates: true
      });
    }

    return NextResponse.json({
      message: '상품이 성공적으로 수집되었습니다.',
      product: product,
      naverData: {
        name: productData.name,
        salePrice: productData.salePrice,
        stockQuantity: productData.stockQuantity,
        categoryId: productData.categoryId,
        imageUrl: productData.imageUrl,
      },
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to collect product';
    console.error('상품 수집 실패:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
