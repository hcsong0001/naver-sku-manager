import 'dotenv/config';
import prisma from './lib/prisma';

async function main() {
  const options = await prisma.$queryRaw`SELECT * FROM "NaverProductOption" LIMIT 20;`;
  console.log("=== NaverProductOption 20건 조회 결과 ===");
  console.log(options);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
