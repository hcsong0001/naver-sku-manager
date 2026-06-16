import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; aliasId: string }> }
) {
  try {
    const { id, aliasId } = await params;
    const alias = await prisma.skuAlias.findFirst({
      where: { id: aliasId, skuId: id },
      select: { id: true },
    });

    if (!alias) {
      return NextResponse.json({ error: '별칭을 찾을 수 없습니다.' }, { status: 404 });
    }

    await prisma.skuAlias.delete({ where: { id: aliasId } });
    return NextResponse.json({ message: '별칭을 삭제했습니다.' });
  } catch (error) {
    console.error('SKU 별칭 삭제 실패:', error);
    return NextResponse.json({ error: '별칭 삭제에 실패했습니다.' }, { status: 500 });
  }
}
