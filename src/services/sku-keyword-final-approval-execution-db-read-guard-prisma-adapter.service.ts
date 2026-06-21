import { PrismaClient } from '../../app/generated/prisma';
import type { 
  FinalApprovalExecutionDbReadGuardRepository,
  FinalApprovalExecutionDbReadGuardSnapshot
} from '../types/sku-keyword-final-approval-execution-db-read-guard.types';

export function createFinalApprovalExecutionDbReadGuardPrismaAdapter(
  prisma: PrismaClient
): FinalApprovalExecutionDbReadGuardRepository {
  return {
    findSnapshotForExecutionGuard: async (finalApprovalId: string): Promise<FinalApprovalExecutionDbReadGuardSnapshot> => {
      const finalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
        where: { id: finalApprovalId },
        include: {
          job: {
            include: {
              items: true
            }
          }
        }
      });

      if (!finalApproval) {
        return {
          finalApproval: null,
          job: null,
          items: []
        };
      }

      return {
        finalApproval: {
          id: finalApproval.id,
          status: finalApproval.status,
          validationExpiresAt: finalApproval.validationExpiresAt,
          payloadHash: finalApproval.payloadHash,
          validationSnapshotHash: finalApproval.validationSnapshotHash,
          jobId: finalApproval.jobId
        },
        job: finalApproval.job ? {
          id: finalApproval.job.id,
          status: finalApproval.job.status
        } : null,
        items: finalApproval.job?.items.map((item: { id: string; status: string }) => ({
          id: item.id,
          status: item.status
        })) ?? []
      };
    }
  };
}
