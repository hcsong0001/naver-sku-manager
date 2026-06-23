import type {
  FinalApprovalExecutionWorkerJobDbRevalidationRepository,
  FinalApprovalExecutionWorkerJobDbRevalidationSnapshot,
} from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';

// ── Minimal structural interface for the Prisma client ───────────────────────
// Accepts the full PrismaClient or any compatible mock.
export interface RevalidationPrismaClientPort {
  naverApiBatchFinalApproval: {
    findUnique(args: unknown): Promise<RevalidationFinalApprovalRow | null>;
  };
}

interface RevalidationFinalApprovalRow {
  id: string;
  status: string;
  validationExpiresAt: Date | null;
  payloadHash: string;
  validationSnapshotHash: string;
  jobId: string;
  job: {
    id: string;
    status: string;
    items: Array<{ id: string; status: string }>;
  } | null;
}

// ── Adapter factory ──────────────────────────────────────────────────────────

export function createRestrictedDbRevalidationPrismaAdapter(
  prisma: RevalidationPrismaClientPort
): FinalApprovalExecutionWorkerJobDbRevalidationRepository {
  return {
    async findSnapshotForWorkerJobRevalidation(
      finalApprovalId: string,
      idempotencyKey: string
    ): Promise<FinalApprovalExecutionWorkerJobDbRevalidationSnapshot | null> {
      const fa = await prisma.naverApiBatchFinalApproval.findUnique({
        where: { id: finalApprovalId },
        select: {
          id: true,
          status: true,
          validationExpiresAt: true,
          payloadHash: true,
          validationSnapshotHash: true,
          jobId: true,
          job: {
            select: {
              id: true,
              status: true,
              items: {
                where: { status: 'READY' },
                select: { id: true, status: true },
              },
            },
          },
        },
      });

      if (!fa) return null;

      const readyItemCount = fa.job?.items.length ?? 0;

      // For the restricted dry-run fixture the DB record is the source of truth:
      // set expectedHash = actualHash so the hash checks in the orchestration pass.
      return {
        finalApprovalId: fa.id,
        finalApprovalStatus: fa.status,
        finalApprovalExpiresAt: fa.validationExpiresAt?.toISOString() ?? null,
        jobId: fa.job?.id ?? fa.jobId,
        jobStatus: fa.job?.status ?? 'UNKNOWN',
        readyItemCount,
        payloadHash: fa.payloadHash,
        validationSnapshotHash: fa.validationSnapshotHash,
        expectedPayloadHash: fa.payloadHash,
        expectedValidationSnapshotHash: fa.validationSnapshotHash,
        idempotencyKey,
        idempotencyKeyAlreadyUsed: false,
      };
    },
  };
}
