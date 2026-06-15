import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const smartstores = await prisma.smartstore.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(smartstores);
  } catch (error) {
    console.error('Failed to fetch smartstores:', error);
    return NextResponse.json({ error: 'Failed to fetch smartstores' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sellerId, storeUrl, clientId, clientSecret, naverPartnerType, naverAccountId } = body;

    if (!name || !sellerId) {
      return NextResponse.json({ error: 'Name and Seller ID are required' }, { status: 400 });
    }

    const newStore = await prisma.smartstore.create({
      data: {
        name,
        sellerId,
        storeUrl,
        clientId,
        clientSecret,
        naverPartnerType: naverPartnerType || 'SELF',
        naverAccountId,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error('Failed to create smartstore:', error);
    return NextResponse.json({ error: 'Failed to create smartstore' }, { status: 500 });
  }
}
