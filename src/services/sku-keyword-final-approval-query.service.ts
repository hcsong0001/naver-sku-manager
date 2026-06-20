import prisma from '@/lib/prisma';
import { SkuKeywordFinalApprovalError } from './sku-keyword-final-approval.errors';

export interface FinalApprovalSummary {
  id: string;
  version: number;
  status: 'ACTIVE' | 'INVALIDATED' | 'SUPERSEDED';
  finalApprovedAt: string;
  finalApprovedBy: string;
  validationExpiresAt: string;
  invalidatedAt: string | null;
  supersedesApprovalId: string | null;
  itemCount: number;
  validationSnapshotHash: string;
  payloadHash: string;
}

export interface FinalApprovalsListResponse {
  ok: true;
  jobId: string;
  finalApprovals: FinalApprovalSummary[];
}

export async function getFinalApprovalsByJobId(jobId: string): Promise<FinalApprovalsListResponse> {
  const job = await prisma.naverApiBatchJob.findUnique({
    where: { id: jobId },
    select: { id: true },
  });

  if (!job) {
    throw new SkuKeywordFinalApprovalError(
      'FINAL_APPROVAL_JOB_NOT_FOUND',
      404,
      '해당 Job을 찾을 수 없습니다.'
    );
  }

  const approvals = await prisma.naverApiBatchFinalApproval.findMany({
    where: { jobId },
    orderBy: { version: 'desc' },
    select: {
      id: true,
      version: true,
      status: true,
      finalApprovedAt: true,
      finalApprovedBy: true,
      validationExpiresAt: true,
      invalidatedAt: true,
      supersedesApprovalId: true,
      validationSnapshotHash: true,
      payloadHash: true,
      _count: {
        select: { items: true },
      },
    },
  });

  return {
    ok: true,
    jobId,
    finalApprovals: approvals.map((approval) => ({
      id: approval.id,
      version: approval.version,
      status: approval.status,
      finalApprovedAt: approval.finalApprovedAt.toISOString(),
      finalApprovedBy: approval.finalApprovedBy,
      validationExpiresAt: approval.validationExpiresAt.toISOString(),
      invalidatedAt: approval.invalidatedAt ? approval.invalidatedAt.toISOString() : null,
      supersedesApprovalId: approval.supersedesApprovalId,
      itemCount: approval._count.items,
      validationSnapshotHash: approval.validationSnapshotHash,
      payloadHash: approval.payloadHash,
    })),
  };
}
