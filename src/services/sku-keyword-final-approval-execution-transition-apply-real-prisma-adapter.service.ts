/**
 * Real Prisma Adapter Service
 *
 * 주입받은 PrismaClient-like 인스턴스를 사용하여 TransitionApplyPrismaAdapterPort를
 * 생성하는 팩토리 함수입니다.
 *
 * - 내부에서 인스턴스를 직접 생성하지 않습니다.
 * - 환경 변수나 DB 접속 주소 문자열을 직접 읽지 않습니다.
 * - 실제 '@prisma/client'를 import하지 않습니다.
 * - transaction 경계는 주입받은 prisma.$transaction을 그대로 위임합니다.
 */

import type {
  PrismaLikeClient,
  PrismaLikeTxClient,
  TransitionApplyPrismaAdapterPort,
  TransitionApplyPrismaAdapterTxPort,
  TransitionApplyPrismaAdapterUpdateArgs,
} from '../types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';

/**
 * 주입받은 Prisma Client로부터 TransitionApplyPrismaAdapterPort를 생성합니다.
 *
 * @param prisma - 외부에서 주입된 PrismaClient-like 인스턴스
 * @returns TransitionApplyPrismaAdapterPort (Mock Adapter와 동일한 인터페이스)
 */
export function createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(
  prisma: PrismaLikeClient
): TransitionApplyPrismaAdapterPort {
  return {
    transaction: async <T>(
      callback: (tx: TransitionApplyPrismaAdapterTxPort) => Promise<T>
    ): Promise<T> => {
      return prisma.$transaction(async (txClient: PrismaLikeTxClient) => {
        const txPort: TransitionApplyPrismaAdapterTxPort = {
          updateBatchJobStatus: async (
            args: TransitionApplyPrismaAdapterUpdateArgs
          ): Promise<{ updated: boolean }> => {
            const result = await txClient.naverApiBatchJob.updateMany({
              where: { id: args.targetId, status: args.fromStatus },
              data: { status: args.toStatus },
            });
            if (result.count === 0) {
              throw new Error(
                `BatchJob update failed: id=${args.targetId} fromStatus=${args.fromStatus} — 0 rows affected`
              );
            }
            return { updated: result.count === 1 };
          },
          updateBatchJobItemStatus: async (
            args: TransitionApplyPrismaAdapterUpdateArgs
          ): Promise<{ updated: boolean }> => {
            const result = await txClient.naverApiBatchJobItem.updateMany({
              where: { id: args.targetId, status: args.fromStatus },
              data: { status: args.toStatus },
            });
            if (result.count === 0) {
              throw new Error(
                `BatchJobItem update failed: id=${args.targetId} fromStatus=${args.fromStatus} — 0 rows affected`
              );
            }
            return { updated: result.count === 1 };
          },
        };
        return callback(txPort);
      });
    },
  };
}
