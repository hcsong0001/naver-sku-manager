import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if store exists
    const existingStore = await prisma.smartstore.findUnique({ where: { id } });
    if (!existingStore) {
      return NextResponse.json({ error: 'Smartstore not found' }, { status: 404 });
    }

    const updatedStore = await prisma.smartstore.update({
      where: { id },
      data: {
        name: body.name,
        sellerId: body.sellerId,
        storeUrl: body.storeUrl,
        clientId: body.clientId,
        clientSecret: body.clientSecret,
        naverPartnerType: body.naverPartnerType,
        naverAccountId: body.naverAccountId,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error('Failed to update smartstore:', error);
    return NextResponse.json({ error: 'Failed to update smartstore' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.smartstore.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Smartstore deleted successfully' });
  } catch (error) {
    console.error('Failed to delete smartstore:', error);
    return NextResponse.json({ error: 'Failed to delete smartstore' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if store exists
    const existingStore = await prisma.smartstore.findUnique({ where: { id } });
    if (!existingStore) {
      return NextResponse.json({ error: 'Smartstore not found' }, { status: 404 });
    }

    // naverChannelId 값 추출 및 trim 처리
    let naverChannelId = typeof body.naverChannelId === 'string' ? body.naverChannelId.trim() : null;
    if (naverChannelId === '') {
      naverChannelId = null;
    }

    // naverChannelId 글자 수 제한 검증
    if (naverChannelId && naverChannelId.length > 100) {
      return NextResponse.json({ error: 'Channel ID is too long (max 100 characters)' }, { status: 400 });
    }

    const updatedStore = await prisma.smartstore.update({
      where: { id },
      data: {
        naverChannelId,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error('Failed to patch smartstore channel ID:', error);
    return NextResponse.json({ error: 'Failed to update channel ID' }, { status: 500 });
  }
}
