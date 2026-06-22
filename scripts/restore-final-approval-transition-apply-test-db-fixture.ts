/**
 * [Test DB Fixture Restore Script]
 * 
 * 목적: tms-final-approval-test-postgres 환경에서 EXECUTING 상태가 된 BatchJob과 BatchJobItem을
 * 다시 APPROVED, READY 상태로 되돌립니다.
 * 
 * 보안 및 안전 장치:
 * 1. process.env.CONFIRM_TEST_DB_RESTORE 확인
 * 2. DATABASE_URL 파싱하여 로컬 호스트, 지정 포트(55432), "test" 포함 여부 확인
 * 3. .env 파일 로드 방지 (외부에서 주입해야 함)
 * 4. DATABASE_URL 및 비밀번호 평문 출력 절대 금지
 * 5. Fixture ID 하드코딩으로 타겟 제한
 * 6. 트랜잭션 전 Pre-condition 검증 (ACTIVE / EXECUTING / EXECUTING)
 * 7. 트랜잭션 내 affected count 1건 여부 엄격 검사
 * 8. 트랜잭션 후 Post-condition 검증
 */

import { createSafePrismaClientForTestDb } from './lib/create-safe-prisma-client-for-test-db';

const FIXTURES = {
  finalApprovalId: 'test-db-revalidation-final-approval-001',
  batchJobId: 'test-db-revalidation-batch-job-001',
  batchJobItemId: 'test-db-revalidation-batch-job-item-001',
};

async function restoreTestDbFixture() {
  console.log('[Script] Starting Test DB Fixture Restore Script...');

  // 1. CONFIRM_TEST_DB_RESTORE 확인
  if (process.env.CONFIRM_TEST_DB_RESTORE !== 'YES_I_UNDERSTAND_TEST_DB_ONLY') {
    console.error('[Error] CONFIRM_TEST_DB_RESTORE is not set to YES_I_UNDERSTAND_TEST_DB_ONLY. Aborting.');
    process.exit(1);
  }

  // 2. DATABASE_URL 검사 및 PrismaClient 초기화는 helper에서 수행
  console.log('[Script] Safety guards passed. Initializing Prisma Client...');
  const prisma = createSafePrismaClientForTestDb();

  try {
    // 3. 사전 상태 (Pre-condition) 확인
    console.log('[Script] Checking pre-conditions for fixtures...');
    const finalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURES.finalApprovalId },
    });
    const batchJob = await prisma.naverApiBatchJob.findUnique({
      where: { id: FIXTURES.batchJobId },
    });
    const batchJobItem = await prisma.naverApiBatchJobItem.findUnique({
      where: { id: FIXTURES.batchJobItemId },
    });

    if (!finalApproval || finalApproval.status !== 'ACTIVE') {
      throw new Error(`Pre-condition failed: FinalApproval(${FIXTURES.finalApprovalId}) must be ACTIVE. Found: ${finalApproval?.status}`);
    }
    if (!batchJob || batchJob.status !== 'EXECUTING') {
      throw new Error(`Pre-condition failed: BatchJob(${FIXTURES.batchJobId}) must be EXECUTING. Found: ${batchJob?.status}`);
    }
    if (!batchJobItem || batchJobItem.status !== 'EXECUTING') {
      throw new Error(`Pre-condition failed: BatchJobItem(${FIXTURES.batchJobItemId}) must be EXECUTING. Found: ${batchJobItem?.status}`);
    }

    console.log(`[Script] Pre-conditions met:`);
    console.log(`  - FinalApproval: ${finalApproval.status}`);
    console.log(`  - BatchJob:      ${batchJob.status}`);
    console.log(`  - BatchJobItem:  ${batchJobItem.status}`);

    // 4. 복구 트랜잭션 실행
    console.log('[Script] Executing Restore transaction...');
    await prisma.$transaction(async (tx) => {
      const jobResult = await tx.naverApiBatchJob.updateMany({
        where: { id: FIXTURES.batchJobId, status: 'EXECUTING' },
        data: { status: 'APPROVED' },
      });

      if (jobResult.count !== 1) {
        throw new Error(`TRANSACTION_FAILED: Expected to update exactly 1 BatchJob, but updated ${jobResult.count}`);
      }

      const itemResult = await tx.naverApiBatchJobItem.updateMany({
        where: { id: FIXTURES.batchJobItemId, status: 'EXECUTING' },
        data: { status: 'READY' },
      });

      if (itemResult.count !== 1) {
        throw new Error(`TRANSACTION_FAILED: Expected to update exactly 1 BatchJobItem, but updated ${itemResult.count}`);
      }
    });

    console.log('[Script] Transaction succeeded. Fixtures restored.');

    // 5. 사후 상태 (Post-condition) 확인
    console.log('[Script] Fetching post-conditions for verification...');
    const finalApprovalPost = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURES.finalApprovalId },
    });
    const batchJobPost = await prisma.naverApiBatchJob.findUnique({
      where: { id: FIXTURES.batchJobId },
    });
    const batchJobItemPost = await prisma.naverApiBatchJobItem.findUnique({
      where: { id: FIXTURES.batchJobItemId },
    });

    if (finalApprovalPost?.status !== 'ACTIVE') {
      throw new Error(`Post-condition failed: FinalApproval should be ACTIVE, found ${finalApprovalPost?.status}`);
    }
    if (batchJobPost?.status !== 'APPROVED') {
      throw new Error(`Post-condition failed: BatchJob should be APPROVED, found ${batchJobPost?.status}`);
    }
    if (batchJobItemPost?.status !== 'READY') {
      throw new Error(`Post-condition failed: BatchJobItem should be READY, found ${batchJobItemPost?.status}`);
    }

    console.log('[Script] Post-conditions verified successfully:');
    console.log(`  - FinalApproval remained: ${finalApprovalPost.status}`);
    console.log(`  - BatchJob transitioned to: ${batchJobPost.status}`);
    console.log(`  - BatchJobItem transitioned to: ${batchJobItemPost.status}`);
    console.log('[Script] Fixture Restored Successfully');

  } catch (err) {
    console.error('[Script] Restore Failed:', err instanceof Error ? err.message : err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  restoreTestDbFixture();
}
