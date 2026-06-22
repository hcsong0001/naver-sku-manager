/**
 * [Test DB Fixture Read-Only Diagnostic Script]
 *
 * 목적: tms-final-approval-test-postgres 환경에서 Fixture들의 현재 상태를 
 * 어떠한 데이터 조작(write) 없이 안전하게 조회하고 진단합니다.
 *
 * 보안 및 안전 장치:
 * 1. DATABASE_URL 파싱하여 로컬 호스트, 지정 포트(55432), "test" 포함 여부 확인 (helper 사용)
 * 2. .env 파일 로드 방지
 * 3. DATABASE_URL 및 비밀번호 원문 출력 절대 금지
 * 4. 일체의 DB write (update, create, delete, upsert 등) 수행 금지
 * 5. 트랜잭션 불필요 (read-only)
 */

import { createSafePrismaClientForTestDb } from './lib/create-safe-prisma-client-for-test-db';

const FIXTURES = {
  finalApprovalId: 'test-db-revalidation-final-approval-001',
  batchJobId: 'test-db-revalidation-batch-job-001',
  batchJobItemId: 'test-db-revalidation-batch-job-item-001',
};

const EXPECTED_STATES = {
  finalApproval: 'ACTIVE',
  batchJob: 'APPROVED',
  batchJobItem: 'READY',
  finalApprovalItemCount: 0,
};

async function diagnoseTestDbFixtureReadOnly() {
  console.log('[Script] Starting Test DB Fixture Read-Only Diagnostic...');

  const hasDbUrl = typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.length > 0;
  console.log(`[Script] DATABASE_URL presence: ${hasDbUrl}`);

  if (!hasDbUrl) {
    console.error('[Error] DATABASE_URL is not provided.');
    process.exitCode = 1;
    return;
  }

  console.log('[Script] Safety guards passed. Initializing Prisma Client...');
  const prisma = createSafePrismaClientForTestDb();

  try {
    console.log('[Script] Fetching fixture records...');

    const finalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURES.finalApprovalId },
    });
    const batchJob = await prisma.naverApiBatchJob.findUnique({
      where: { id: FIXTURES.batchJobId },
    });
    const batchJobItems = await prisma.naverApiBatchJobItem.findMany({
      where: { batchJobId: FIXTURES.batchJobId },
    });
    const finalApprovalItemsCount = await prisma.naverApiBatchFinalApprovalItem.count({
      where: { finalApprovalId: FIXTURES.finalApprovalId },
    });

    console.log('\n--- Diagnostic Results ---');
    
    // 1. FinalApproval Status
    if (finalApproval) {
      const match = finalApproval.status === EXPECTED_STATES.finalApproval;
      console.log(`[FinalApproval] Status: ${finalApproval.status} (Expected: ${EXPECTED_STATES.finalApproval}) - Match: ${match}`);
    } else {
      console.log(`[FinalApproval] Fixture NOT FOUND (${FIXTURES.finalApprovalId})`);
    }

    // 2. BatchJob Status
    if (batchJob) {
      const match = batchJob.status === EXPECTED_STATES.batchJob;
      console.log(`[BatchJob] Status: ${batchJob.status} (Expected: ${EXPECTED_STATES.batchJob}) - Match: ${match}`);
    } else {
      console.log(`[BatchJob] Fixture NOT FOUND (${FIXTURES.batchJobId})`);
    }

    // 3. BatchJobItem Status
    const targetItem = batchJobItems.find((item) => item.id === FIXTURES.batchJobItemId);
    if (targetItem) {
      const match = targetItem.status === EXPECTED_STATES.batchJobItem;
      console.log(`[BatchJobItem] Status: ${targetItem.status} (Expected: ${EXPECTED_STATES.batchJobItem}) - Match: ${match}`);
      console.log(`[BatchJobItem] Total items found for Job: ${batchJobItems.length}`);
    } else {
      console.log(`[BatchJobItem] Target fixture NOT FOUND (${FIXTURES.batchJobItemId})`);
    }

    // 4. FinalApprovalItem Write 여부
    const itemsMatch = finalApprovalItemsCount === EXPECTED_STATES.finalApprovalItemCount;
    console.log(`[FinalApprovalItem] Count: ${finalApprovalItemsCount} (Expected: ${EXPECTED_STATES.finalApprovalItemCount}) - Match: ${itemsMatch}`);
    
    console.log('--------------------------\n');
    console.log('[Script] Read-Only Diagnostic completed successfully.');

  } catch (err: any) {
    console.error('[Script] Diagnostic Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
    console.log('[Script] Prisma client disconnected.');
  }
}

// Run only if executed directly
if (require.main === module) {
  diagnoseTestDbFixtureReadOnly();
}
