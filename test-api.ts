import 'dotenv/config';
import prisma from './lib/prisma';
import { getNaverToken } from './src/services/naver-product.service';

const NAVER_API_BASE = 'https://api.commerce.naver.com';

async function main() {
  const smartstoreId = 'f159a98c-4a67-4e65-bc06-2a25105657f8';
  const channelProductNo = '13630421787';

  const store = await prisma.smartstore.findUnique({ where: { id: smartstoreId } });
  if (!store || !store.clientId || !store.clientSecret) {
    throw new Error('Store credentials not found');
  }

  const tokenData = await getNaverToken(store.clientId, store.clientSecret);
  const accessToken = tokenData.access_token;

  console.log(`[1] Fetching channel-product: ${channelProductNo}...`);
  const channelRes = await fetch(`${NAVER_API_BASE}/external/v2/products/channel-products/${channelProductNo}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const channelData = await channelRes.json();
  
  const fs = require('fs');
  fs.writeFileSync('channel-product-res.json', JSON.stringify(channelData, null, 2));
  console.log('Saved to channel-product-res.json');

  const originProductNo = channelData.originProduct?.originProductNo;
  if (originProductNo) {
    console.log(`\n[2] Fetching origin-product: ${originProductNo}...`);
    const originRes = await fetch(`${NAVER_API_BASE}/external/v2/products/origin-products/${originProductNo}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const originData = await originRes.json();
    fs.writeFileSync('origin-product-res.json', JSON.stringify(originData, null, 2));
    console.log('Saved to origin-product-res.json');
  } else {
    console.log('\n[2] originProductNo not found in channel product response');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
