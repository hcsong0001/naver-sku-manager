import prisma from '@/lib/prisma';

if (process.env.NODE_ENV === 'production') {
  throw new Error('Refusing to seed in production environment');
}

if (!process.env.DATABASE_URL?.includes('localhost:55432')) {
  throw new Error('Refusing to seed outside local Docker PostgreSQL test DB');
}

const TEST_PREFIX = 'TMS_FINAL_APPROVAL_UI_POST_TEST';
const TEST_JOB_ID = 'f93e3d48-8df0-4b5b-b9f4-123456789abc';

async function cleanup() {
  console.log('Cleaning up previous seed data...');
  
  // TMS_FINAL_APPROVAL_UI_POST_TEST prefix가 있는 데이터만 삭제 (idempotent)
  await prisma.naverApiBatchFinalApprovalItem.deleteMany({
    where: { jobItemId: { startsWith: TEST_PREFIX } },
  });
  
  await prisma.naverApiBatchFinalApproval.deleteMany({
    where: { jobId: TEST_JOB_ID },
  });
  
  await prisma.naverApiBatchJobItem.deleteMany({
    where: { id: { startsWith: TEST_PREFIX } },
  });
  
  await prisma.naverApiBatchJob.deleteMany({
    where: { id: TEST_JOB_ID },
  });
  
  await prisma.naverProduct.deleteMany({
    where: { id: { startsWith: TEST_PREFIX } },
  });
  
  await prisma.smartstore.deleteMany({
    where: { id: { startsWith: TEST_PREFIX } },
  });
  
  await prisma.sku.deleteMany({
    where: { id: { startsWith: TEST_PREFIX } },
  });
}

async function seed() {
  await cleanup();

  console.log('Seeding UI POST test data...');

  const storeId = `${TEST_PREFIX}_store`;
  const store = await prisma.smartstore.create({
    data: {
      id: storeId,
      name: 'UI POST Test Store',
      sellerId: 'test-seller',
      naverPartnerType: 'SELF',
      naverChannelId: 'channel-123',
    },
  });

  const skuId = `${TEST_PREFIX}_sku`;
  const sku = await prisma.sku.create({
    data: {
      id: skuId,
      skuCode: 'SKU_POST_TEST',
      costPrice: 1000,
      sellingPrice: 2000,
      stockQuantity: 100,
    },
  });

  const productId = `${TEST_PREFIX}_product`;
  const product = await prisma.naverProduct.create({
    data: {
      id: productId,
      smartstoreId: store.id,
      name: 'UI POST Test Product',
      naverProductId: 'np-test-123',
      channelProductNo: 'cp-test-123',
      skuId: sku.id,
      currentSalePrice: 1500,
      currentStockQuantity: 100,
      currentStateSource: 'NAVER_PRODUCT_COLLECTION',
      currentStateSyncedAt: new Date(), // 24시간 이내
    },
  });

  const jobId = TEST_JOB_ID;
  const job = await prisma.naverApiBatchJob.create({
    data: {
      id: jobId,
      jobType: 'PRICE_STOCK_UPDATE',
      module: 'SKU_KEYWORD_MATCHING',
      status: 'APPROVED',
      totalItems: 1,
      dryRun: false,
      description: 'Test Job for Final Approval UI POST validation',
    },
  });

  const jobItemId = `${TEST_PREFIX}_job_item`;
  await prisma.naverApiBatchJobItem.create({
    data: {
      id: jobItemId,
      batchJobId: job.id,
      storeId: store.id,
      channelId: 'channel-123',
      targetType: 'SINGLE',
      targetId: 'cp-test-123',
      channelProductNo: 'cp-test-123',
      operation: 'UPDATE_PRICE',
      calculationType: 'SINGLE',
      status: 'READY',
      previewBefore: { price: 1500, stock: 100 },
      previewAfter: { price: 2000, stock: 100 },
      requestPayload: {
        candidate: {
          itemId: product.id,
          channelProductNo: 'cp-test-123',
          channelId: 'channel-123',
          candidateType: 'PRODUCT',
          storeId: store.id,
          status: 'READY_FOR_REVIEW',
          executable: true,
          draftCreatable: true,
          currentStateSource: 'NAVER_PRODUCT_COLLECTION',
          currentStateSyncedAt: product.currentStateSyncedAt?.toISOString(),
          currentSmartstorePrice: 1500,
          currentSmartstoreStock: 100,
          calculatedTargetPrice: 2000,
          calculatedTargetStock: 100,
          hasPriceChange: true,
          hasStockChange: false,
          riskTypes: [],
          issues: [],
          linkedSkus: [{
            skuId: sku.id,
            skuCode: sku.skuCode,
            quantity: 1,
            sellingPrice: 2000,
            costPrice: 1000,
            stockQuantity: 100,
          }],
          isSetProduct: false,
        },
        dryRunItem: {
          executable: true,
          blockedReasons: [],
          riskLevel: 'LOW',
          before: { price: 1500, stock: 100 },
          after: { price: 2000, stock: 100 },
        },
      },
    },
  });

  console.log('Seed completed.');
  console.log(`Job ID: ${job.id}`);
  console.log(`Open: http://localhost:3000/dashboard/sku-keyword-draft-batches/${job.id}`);
  console.log('Initial FinalApproval: none');
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
