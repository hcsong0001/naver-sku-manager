/**
 * Verify FinalApproval Execution Transition Apply Real Prisma Adapter Test DB Write
 *
 * 이 스크립트는 Real Prisma Adapter가 실제 PostgreSQL (테스트용) DB에
 * 상태 전환(EXECUTING)을 정상적으로 커밋하는지 단일 스크립트로 검증합니다.
 *
 * [안전장치]
 * 1. CONFIRM_TEST_DB_WRITE 환경변수가 정확히 YES_I_UNDERSTAND_TEST_DB_ONLY 일 때만 실행
 * 2. DATABASE_URL을 읽어 운영 DB로 의심되면 즉시 차단 (localhost/127.0.0.1, 55432 포트 강제)
 * 3. DATABASE_URL 원문 출력 금지
 * 4. .env / .env.test 파일 자동 로드 금지
 * 5. 트랜잭션 전 대상 Fixture의 상태가 정확히 ACTIVE/APPROVED/READY 인지 검증 후 진행
 * 6. live mode 접근 차단 및 dry-run 고정
 * 7. Redis, Worker, Queue, Naver API 전혀 미사용
 * 8. 갱신 후 사후 상태(EXECUTING) 검증
 * 9. 검증 완료 후 자동 복구는 수행하지 않음 (별도 승인 후 복구)
 */

import { PrismaClient } from '../app/generated/prisma';
import { runFinalApprovalExecutionWorkerJobOrchestration } from '../src/services/sku-keyword-final-approval-execution-worker-job-orchestration.service';
import { buildFinalApprovalExecutionTransitionApplyPlan } from '../src/services/sku-keyword-final-approval-execution-transition-apply.service';
import { createFinalApprovalExecutionTransitionApplyPrismaAdapterPort } from '../src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.service';
import { applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter } from '../src/services/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service';
import type { PrismaLikeClient } from '../src/types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';
import type { FinalApprovalExecutionWorkerJobPayload } from '../src/types/sku-keyword-final-approval-execution-worker-job-payload-validation.types';
import type { FinalApprovalExecutionTransitionApplyInput } from '../src/types/sku-keyword-final-approval-execution-transition-apply.types';

const FIXTURES = {
  finalApprovalId: 'test-db-revalidation-final-approval-001',
  batchJobId: 'test-db-revalidation-batch-job-001',
  batchJobItemId: 'test-db-revalidation-batch-job-item-001',
  idempotencyKey: 'idem-test-db-write-001',
  actorId: 'system-test-script',
};

async function verifyTestDbWrite() {
  console.log('[Script] Starting Real Prisma Adapter Test DB Write Verification...');

  // 1. CONFIRM_TEST_DB_WRITE 확인
  if (process.env.CONFIRM_TEST_DB_WRITE !== 'YES_I_UNDERSTAND_TEST_DB_ONLY') {
    console.error('[Error] CONFIRM_TEST_DB_WRITE is not set to YES_I_UNDERSTAND_TEST_DB_ONLY. Aborting.');
    process.exit(1);
  }

  // 2. DATABASE_URL 검사
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('[Error] process.env.DATABASE_URL is not set. Aborting.');
    process.exit(1);
  }

  try {
    const parsedUrl = new URL(dbUrl);
    const host = parsedUrl.hostname;
    const port = parsedUrl.port;
    const dbName = parsedUrl.pathname;

    if (host !== 'localhost' && host !== '127.0.0.1') {
      console.error('[Error] DATABASE_URL host is not localhost or 127.0.0.1. Aborting to protect non-local DB.');
      process.exit(1);
    }
    if (port !== '55432') {
      console.error('[Error] DATABASE_URL port is not 55432. Aborting to protect unknown DB.');
      process.exit(1);
    }
    if (!dbName.includes('test')) {
      console.error('[Error] DATABASE_URL database name does not contain "test". Aborting.');
      process.exit(1);
    }
  } catch (e) {
    console.error('[Error] Failed to parse DATABASE_URL. Aborting.');
    process.exit(1);
  }

  console.log('[Script] Safety guards passed. Initializing Prisma Client...');
  const prisma = new PrismaClient();

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
    if (!batchJob || batchJob.status !== 'APPROVED') {
      throw new Error(`Pre-condition failed: BatchJob(${FIXTURES.batchJobId}) must be APPROVED. Found: ${batchJob?.status}`);
    }
    if (!batchJobItem || batchJobItem.status !== 'READY') {
      throw new Error(`Pre-condition failed: BatchJobItem(${FIXTURES.batchJobItemId}) must be READY. Found: ${batchJobItem?.status}`);
    }

    console.log(`[Script] Pre-conditions met:`);
    console.log(`  - FinalApproval: ${finalApproval.status}`);
    console.log(`  - BatchJob:      ${batchJob.status}`);
    console.log(`  - BatchJobItem:  ${batchJobItem.status}`);

    const now = new Date().toISOString();

    // 4. Transition Guard (Orchestration 모듈 재사용 Mocking)
    console.log('[Script] Executing Transition Guard step...');
    const payload: FinalApprovalExecutionWorkerJobPayload = {
      finalApprovalId: FIXTURES.finalApprovalId,
      source: 'EXECUTION_API',
      actorId: FIXTURES.actorId,
      idempotencyKey: FIXTURES.idempotencyKey,
      mode: 'MOCK',
      requestedAt: now,
    };

    // DB Revalidation Mock - Guard 검증 통과를 위한 더미 리포지토리
    const mockDbRevalidationRepo = {
      findSnapshotForWorkerJobRevalidation: async () => ({
        finalApprovalId: FIXTURES.finalApprovalId,
        finalApprovalStatus: 'ACTIVE',
        finalApprovalExpiresAt: new Date(Date.now() + 1000000).toISOString(),
        jobId: FIXTURES.batchJobId,
        jobStatus: 'APPROVED',
        readyItemCount: 1,
        payloadHash: 'mock-hash',
        validationSnapshotHash: 'mock-hash',
        expectedPayloadHash: 'mock-hash',
        expectedValidationSnapshotHash: 'mock-hash',
      }),
      logIdempotencyKeyUsage: async () => ({ success: true, key: FIXTURES.idempotencyKey, alreadyUsed: false }),
    };

    const orchestrationResult = await runFinalApprovalExecutionWorkerJobOrchestration(
      payload,
      mockDbRevalidationRepo as any
    );

    if (!orchestrationResult.success || !orchestrationResult.readyForExecution) {
      const reason = !orchestrationResult.success ? JSON.stringify((orchestrationResult as any).details) : 'not ready';
      throw new Error(`Orchestration Guard failed: ${reason}`);
    }

    // 5. Transition Apply Plan 생성
    console.log('[Script] Building Transition Apply Plan...');
    const applyInput: FinalApprovalExecutionTransitionApplyInput = {
      now,
      mode: 'dry-run',
      guardResult: {
        allowed: orchestrationResult.readyForExecution,
        reasonCodes: [],
        checkedAt: now,
      },
      finalApproval: { id: FIXTURES.finalApprovalId, status: 'ACTIVE' },
      batchJob: { id: FIXTURES.batchJobId, status: 'APPROVED' },
      batchJobItems: [{ id: FIXTURES.batchJobItemId, status: 'READY' }],
      request: {
        finalApprovalId: FIXTURES.finalApprovalId,
        idempotencyKey: FIXTURES.idempotencyKey,
        actorId: FIXTURES.actorId,
      },
    };

    const transitionPlan = buildFinalApprovalExecutionTransitionApplyPlan(applyInput);
    if (!transitionPlan.executionTransitionAllowed || !transitionPlan.dbWriteRequired) {
      throw new Error(`Plan generation failed: ${JSON.stringify(transitionPlan.reasonCodes)}`);
    }
    console.log(`[Script] Transition Plan built successfully. Items count: ${transitionPlan.planItems.length}`);

    // 6. Real Prisma Adapter로 Test DB Write 수행
    console.log('[Script] Executing Real Prisma Adapter Write (transaction)...');
    const adapterPort = createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(prisma as unknown as PrismaLikeClient);
    
    const adapterResult = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
      plan: transitionPlan,
      adapter: adapterPort,
      options: {
        now,
        mode: 'dry-run', // Live mode is strictly blocked inside adapter logic too
        idempotencyKey: FIXTURES.idempotencyKey,
        actorId: FIXTURES.actorId,
      },
    });

    if (!adapterResult.success) {
      throw new Error(`Adapter DB write failed: ${JSON.stringify(adapterResult.reasonCodes)} - ${adapterResult.summary}`);
    }

    console.log(`[Script] DB Write completed successfully.`);
    console.log(`  - Updated Job IDs:  ${adapterResult.updatedBatchJobIds.join(', ')}`);
    console.log(`  - Updated Item IDs: ${adapterResult.updatedBatchJobItemIds.join(', ')}`);

    // 7. 사후 상태 (Post-condition) 검증
    console.log('[Script] Checking post-conditions from Test DB...');
    const postFinalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: FIXTURES.finalApprovalId },
    });
    const postBatchJob = await prisma.naverApiBatchJob.findUnique({
      where: { id: FIXTURES.batchJobId },
    });
    const postBatchJobItem = await prisma.naverApiBatchJobItem.findUnique({
      where: { id: FIXTURES.batchJobItemId },
    });

    let verificationFailed = false;
    
    if (!postFinalApproval || postFinalApproval.status !== 'ACTIVE') {
      console.error(`[Error] Post-condition failed: FinalApproval must remain ACTIVE. Found: ${postFinalApproval?.status}`);
      verificationFailed = true;
    }
    if (!postBatchJob || postBatchJob.status !== 'EXECUTING') {
      console.error(`[Error] Post-condition failed: BatchJob must be EXECUTING. Found: ${postBatchJob?.status}`);
      verificationFailed = true;
    }
    if (!postBatchJobItem || postBatchJobItem.status !== 'EXECUTING') {
      console.error(`[Error] Post-condition failed: BatchJobItem must be EXECUTING. Found: ${postBatchJobItem?.status}`);
      verificationFailed = true;
    }

    if (verificationFailed) {
      throw new Error('One or more post-conditions failed after DB write.');
    }

    console.log('[Script] ✅ VERIFICATION SUCCESS: All target states successfully transitioned to EXECUTING atomically.');
    console.log('[Script] Reminder: Automatic rollback is NOT implemented here. DB is left in EXECUTING state.');
    
  } catch (err: any) {
    console.error('[Script] ❌ VERIFICATION FAILED:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('[Script] Prisma client disconnected. Exiting.');
  }
}

// Run only if executed directly
if (require.main === module) {
  verifyTestDbWrite();
}
