import 'dotenv/config';
import prisma from './lib/prisma';

async function main() {
  const product = await prisma.naverProduct.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  console.log("=== 최근 NaverProduct 1건 ===");
  console.log(JSON.stringify(product, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
