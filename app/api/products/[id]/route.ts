import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/products/[id]
 * 특정 상품 상세 조회
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.naverProduct.findUnique({
      where: { id },
      include: {
        smartstore: { select: { id: true, name: true } },
        options: {
          include: { sku: { select: { id: true, skuCode: true, stockQuantity: true } } },
          orderBy: { createdAt: 'asc' as const },
        },
        additionals: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

/**
 * DELETE /api/products/[id]
 * 특정 상품 삭제
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.naverProduct.delete({ where: { id } });
    return NextResponse.json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
