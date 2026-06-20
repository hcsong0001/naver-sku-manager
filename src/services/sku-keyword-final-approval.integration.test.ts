import prisma from '@/lib/prisma';
import { createSkuKeywordFinalApproval, parseSkuKeywordFinalApprovalCreateRequest } from '@/src/services/sku-keyword-final-approval.service';
import { getFinalApprovalsByJobId } from '@/src/services/sku-keyword-final-approval-query.service';
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
      currentStateSyncedAt: new Date(), // 24?œê°„ ?´ë‚´
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

  // Test 1: ?•ìƒ ?ì„±
  console.log('Running Test 1: ?•ìƒ ?ì„±');
  const result1 = await createSkuKeywordFinalApproval({
    jobId: 'test-job-id',
    actorId: TEST_ACTOR,
    request: {
      confirmFinalApproval: true,
      approvalMemo: null,
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

  // Test 2: ACTIVE ì¤‘ë³µ
  console.log('Running Test 2: ACTIVE ì¤‘ë³µ');
  await assertRejects(
    createSkuKeywordFinalApproval({
      jobId: 'test-job-id',
      actorId: TEST_ACTOR,
      request: { confirmFinalApproval: true, approvalMemo: null, acknowledgedWarnings: [] },
    }),
    409,
    'ACTIVE_FINAL_APPROVAL_EXISTS'
  );

  // Test 3: confirm ?„ë½ (400)
  console.log('Running Test 3: confirm ?„ë½ (400)');
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

  // Test 4: malformed payload (400)
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

  // Test 5: validation TTL ê²€ì¦?  console.log('Running Test 5: validation TTL ê²€ì¦?);
  const expiresAt = new Date(activeApproval.validationExpiresAt).getTime();
  const approvedAt = new Date(activeApproval.finalApprovedAt).getTime();
  const diffMs = expiresAt - approvedAt;
  const expectedTTL = 10 * 60 * 1000;
  if (diffMs !== expectedTTL) {
    throw new Error(`Test 5 failed: TTL is not 10 minutes. Got ${diffMs}ms`);
  }

  // Test 6: hash ?¬í˜„??ê²€ì¦?  console.log('Running Test 6: hash ?¬í˜„??ê²€ì¦?);
  if (!activeApproval.payloadHash || !activeApproval.validationSnapshotHash) {
    throw new Error('Test 6 failed: Hashes are empty');
  }

  // Test 7: GET ì¡°íšŒ (?†ëŠ” Job)
  console.log('Running Test 7: GET ì¡°íšŒ (?†ëŠ” Job)');
  try {
    await getFinalApprovalsByJobId('00000000-0000-0000-0000-000000000000');
    throw new Error('Expected query to throw 404');
  } catch (error) {
    if (error instanceof SkuKeywordFinalApprovalError) {
      if (error.httpStatus !== 404) throw new Error(`Test 7 failed: Expected 404, got ${error.httpStatus}`);
    } else {
      throw error;
    }
  }

  // Test 8: GET ì¡°íšŒ (1ê°?ì¡´ìž¬)
  console.log('Running Test 8: GET ì¡°íšŒ (1ê°?ì¡´ìž¬)');
  const queryResult = await getFinalApprovalsByJobId('test-job-id');
  if (!queryResult.ok) throw new Error('Test 8 failed: Result not ok');
  if (queryResult.finalApprovals.length !== 1) throw new Error(`Test 8 failed: Expected 1 approval, got ${queryResult.finalApprovals.length}`);

  const fetchedApproval = queryResult.finalApprovals[0];
  if (fetchedApproval.id !== activeApproval.id) throw new Error('Test 8 failed: Approval ID mismatch');
  if (fetchedApproval.itemCount !== 1) throw new Error('Test 8 failed: itemCount mismatch');
  if (!fetchedApproval.payloadHash || !fetchedApproval.validationSnapshotHash) throw new Error('Test 8 failed: Hash missing');
  if (fetchedApproval.status !== 'ACTIVE') throw new Error('Test 8 failed: Status mismatch');

  // Test 9: ë¹?ë°°ì—´ ë°˜í™˜ (Job?€ ì¡´ìž¬?˜ì?ë§?Approval?€ ?†ìŒ)
  console.log('Running Test 9: GET ì¡°íšŒ (ë¹?ë°°ì—´ ë°˜í™˜)');
  const emptyJob = await prisma.naverApiBatchJob.create({
    data: {
      id: 'test-empty-job-id',
      jobType: 'PRICE_STOCK_UPDATE',
      module: 'SKU_KEYWORD_MATCHING',
      status: 'APPROVED',
      totalItems: 0,
      dryRun: false,
    },
  });
  const emptyQueryResult = await getFinalApprovalsByJobId(emptyJob.id);
  if (!emptyQueryResult.ok) throw new Error('Test 9 failed: Result not ok');
  if (emptyQueryResult.finalApprovals.length !== 0) throw new Error('Test 9 failed: Expected empty array');

  console.log('--- All Tests Passed Successfully! ---');
  await prisma.$disconnect();
  process.exit(0);
}

runTests().catch(async (e) => {
  console.error('Integration test failed:', e);
  await prisma.$disconnect();
  process.exit(1);
});
