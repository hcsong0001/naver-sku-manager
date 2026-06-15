import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.smartstore.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Smartstore deleted successfully' });
  } catch (error) {
    console.error('Failed to delete smartstore:', error);
    return NextResponse.json({ error: 'Failed to delete smartstore' }, { status: 500 });
  }
}
