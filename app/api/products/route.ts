import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getNaverToken, fetchNaverProduct, transformNaverProductToDbData } from '@/src/services/naver-product.service';

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
      include: {
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

    // 5. upsert로 DB 저장 (channelProductNo 기준 중복 방지)
    const existing = await prisma.naverProduct.findFirst({
      where: { channelProductNo: productData.channelProductNo },
    });

    let savedProduct;
    if (existing) {
      savedProduct = await prisma.naverProduct.update({
        where: { id: existing.id },
        data: {
          name: productData.name,
          status: productData.status,
          smartstoreId: productData.smartstoreId,
        },
      });
    } else {
      // crypto.randomUUID()을 사용
      savedProduct = await prisma.naverProduct.create({
        data: {
          id: crypto.randomUUID(),
          name: productData.name,
          naverProductId: productData.naverProductId,
          status: productData.status,
          channelProductNo: productData.channelProductNo,
          smartstoreId: productData.smartstoreId,
        },
      });
    }

    return NextResponse.json({
      message: '상품이 성공적으로 수집되었습니다.',
      product: savedProduct,
      naverData: {
        name: productData.name,
        salePrice: productData.salePrice,
        stockQuantity: productData.stockQuantity,
        categoryId: productData.categoryId,
        imageUrl: productData.imageUrl,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to collect product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to collect product' },
      { status: 500 }
    );
  }
}
