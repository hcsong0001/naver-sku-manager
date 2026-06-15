import 'dotenv/config';
import prisma from './lib/prisma';

async function main() {
  const channelProductNo = '13630421787';

  // 1. 먼저 상품 조회 (channelProductNo -> id)
  const product = await prisma.naverProduct.findUnique({
    where: { channelProductNo },
  });

  if (!product) {
    console.log(`Product with channelProductNo ${channelProductNo} not found.`);
    return;
  }

  // 2. 해당 상품의 옵션 개수 조회
  const count = await prisma.naverProductOption.count({
    where: { naverProductId: product.id },
  });

  console.log(`\n=== NaverProductOption COUNT ===`);
  console.log(`상품명: ${product.name}`);
  console.log(`naverProductId: ${product.id}`);
  console.log(`등록된 옵션 개수: ${count}개`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
