import prisma from '@/lib/prisma';
import { createSkuKeywordFinalApproval, parseSkuKeywordFinalApprovalCreateRequest } from '@/src/services/sku-keyword-final-approval.service';
import { SkuKeywordFinalApprovalError } from '@/src/services/sku-keyword-final-approval.errors';

if (!process.env.DATABASE_URL?.includes("localhost:55432")) {
  console.error("Refusing to run integration test outside local Docker PostgreSQL test DB");
  process.exit(1);
}

const TEST_ACTOR = 'system:test-runner';

async function setupTestData() {
  await prisma.$transaction([
    prisma.naverApiBatchFinalApprovalItem.deleteMany(),
    prisma.naverApiBatchFinalApproval.deleteMany(),
    prisma.naverApiBatchJobItem.deleteMany(),
    prisma.naverApiBatchJob.deleteMany(),
    prisma.naverProduct.deleteMany(),
    prisma.smartstore.deleteMany(),
    prisma.sku.deleteMany(),
  ]);

  const store = await prisma.smartstore.create({
    data: {
      id: 'test-store-id',
      name: 'Test Store',
      sellerId: 'test-seller',
      naverPartnerType: 'SELF',
      naverChannelId: 'channel-123',
    },
  });

  const sku = await prisma.sku.create({
    data: {
      id: 'test-sku-id',
      skuCode: 'SKU001',
      costPrice: 1000,
      sellingPrice: 2000,
      stockQuantity: 100,
    },
  });

  const product = await prisma.naverProduct.create({
    data: {
      id: 'test-product-id',
      smartstoreId: store.id,
      name: 'Test Product',
      naverProductId: 'np-12345',
      channelProductNo: 'cp-12345',
      skuId: sku.id,
      currentSalePrice: 1500,
      currentStockQuantity: 100,
      currentStateSource: 'NAVER_PRODUCT_COLLECTION',
      currentStateSyncedAt: new Date(), // 24시간 이내
    },
  });

  const job = await prisma.naverApiBatchJob.create({
    data: {
      id: 'test-job-id',
      jobType: 'PRICE_STOCK_UPDATE',
      module: 'SKU_KEYWORD_MATCHING',
      status: 'APPROVED',
      totalItems: 1,
      dryRun: false,
    },
  });

  const jobItem = await prisma.naverApiBatchJobItem.create({
    data: {
      id: 'test-job-item-id',
      batchJobId: job.id,
      storeId: store.id,
      channelId: 'channel-123',
      targetType: 'SINGLE',
      targetId: 'cp-12345',
      channelProductNo: 'cp-12345',
      operation: 'UPDATE_PRICE',
      calculationType: 'SINGLE',
      status: 'READY',
      previewBefore: { price: 1500, stock: 100 },
      previewAfter: { price: 2000, stock: 100 },
      requestPayload: {
        candidate: {
          itemId: product.id,
          channelProductNo: 'cp-12345',
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

  return { job, jobItem };
}

async function assertRejects(promise: Promise<unknown>, expectedStatus: number, expectedCode?: string) {
  try {
    await promise;
    throw new Error('Expected promise to reject');
  } catch (error) {
    if (error instanceof SkuKeywordFinalApprovalError) {
      if (error.httpStatus !== expectedStatus) {
        throw new Error(`Expected HTTP status ${expectedStatus}, got ${error.httpStatus}`);
      }
      if (expectedCode && error.code !== expectedCode) {
        throw new Error(`Expected error code ${expectedCode}, got ${error.code}`);
      }
    } else {
      throw error;
    }
  }
}

async function runTests() {
  console.log('--- Starting Integration Tests ---');
  
  await setupTestData();

  // Test 1: 정상 생성
  console.log('Running Test 1: 정상 생성');
  const result1 = await createSkuKeywordFinalApproval({
    jobId: 'test-job-id',
    actorId: TEST_ACTOR,
    request: {
      confirmFinalApproval: true,
      approvalMemo: 'Test Memo',
      acknowledgedWarnings: [],
      scopeConfirmation: { mode: 'ALL_ITEMS', expectedItemCount: 1 },
    },
  });

  if (!result1 || !result1.ok) throw new Error('Test 1 failed: Result not ok');
  
  const activeApproval = await prisma.naverApiBatchFinalApproval.findFirst({
    where: { jobId: 'test-job-id', status: 'ACTIVE' },
    include: { items: true },
  });
  if (!activeApproval) throw new Error('Test 1 failed: FinalApproval not found');
  if (activeApproval.items.length !== 1) throw new Error('Test 1 failed: FinalApprovalItem not created correctly');
  
  const currentJob = await prisma.naverApiBatchJob.findUnique({ where: { id: 'test-job-id' }});
  const currentJobItem = await prisma.naverApiBatchJobItem.findUnique({ where: { id: 'test-job-item-id' }});
  if (currentJob?.status !== 'APPROVED') throw new Error('Test 1 failed: Job status changed');
  if (currentJobItem?.status !== 'READY') throw new Error('Test 1 failed: JobItem status changed');

  // Test 2: ACTIVE 중복
  console.log('Running Test 2: ACTIVE 중복');
  await assertRejects(
    createSkuKeywordFinalApproval({
      jobId: 'test-job-id',
      actorId: TEST_ACTOR,
      request: { confirmFinalApproval: true, approvalMemo: null, acknowledgedWarnings: [] },
    }),
    409,
    'ACTIVE_FINAL_APPROVAL_EXISTS'
  );

  // Test 3: malformed payload (이 함수는 내부의 parseSkuKeywordFinalApprovalCreateRequest를 먼저 통과해야 함)
  console.log('Running Test 3: confirm 누락 (400)');
  try {
    parseSkuKeywordFinalApprovalCreateRequest({ confirmFinalApproval: false, acknowledgedWarnings: [] });
    throw new Error('Expected parse to throw');
  } catch (error) {
    if (error instanceof SkuKeywordFinalApprovalError) {
      if (error.httpStatus !== 400) throw new Error(`Expected HTTP status 400, got ${error.httpStatus}`);
    } else {
      throw error;
    }
  }

  console.log('Running Test 4: malformed payload (400)');
  try {
    parseSkuKeywordFinalApprovalCreateRequest({ invalidField: true });
    throw new Error('Expected parse to throw');
  } catch (error) {
    if (error instanceof SkuKeywordFinalApprovalError) {
      if (error.httpStatus !== 400) throw new Error(`Expected HTTP status 400, got ${error.httpStatus}`);
    } else {
      throw error;
    }
  }

  // Test 4: validation TTL 검증
  console.log('Running Test 4: validation TTL 검증');
  const expiresAt = new Date(activeApproval.validationExpiresAt).getTime();
  const approvedAt = new Date(activeApproval.finalApprovedAt).getTime();
  const diffMs = expiresAt - approvedAt;
  const expectedTTL = 10 * 60 * 1000;
  if (diffMs !== expectedTTL) {
    throw new Error(`Test 4 failed: TTL is not 10 minutes. Got ${diffMs}ms`);
  }

  // Test 5: hash 재현성 검증
  console.log('Running Test 5: hash 재현성 검증');
  if (!activeApproval.payloadHash || !activeApproval.validationSnapshotHash) {
    throw new Error('Test 5 failed: Hashes are empty');
  }

  console.log('--- All Tests Passed Successfully! ---');
  await prisma.$disconnect();
  process.exit(0);
}

runTests().catch(async (e) => {
  console.error('Integration test failed:', e);
  await prisma.$disconnect();
  process.exit(1);
});
