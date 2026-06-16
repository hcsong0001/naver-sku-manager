import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { collectNaverProductByChannelProductNo } from '@/src/services/naver-product.service';

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

    const result = await collectNaverProductByChannelProductNo(smartstoreId, channelProductNo);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to collect product';
    console.error('상품 수집 실패:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
