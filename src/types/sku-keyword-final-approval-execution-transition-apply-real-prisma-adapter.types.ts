/**
 * Real Prisma Adapter Types
 *
 * 실제 Prisma Client 인스턴스를 추상화하는 최소한의 인터페이스.
 * 실제 '@prisma/client'를 import하지 않으며, 구조적 타이핑(structural typing)으로
 * 호환성을 보장합니다.
 */

import type {
  TransitionApplyPrismaAdapterPort,
  TransitionApplyPrismaAdapterTxPort,
  TransitionApplyPrismaAdapterUpdateArgs,
} from './sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';

// ── Prisma-like minimal interface (구조적 타이핑) ──

/** updateMany의 반환값 형태 */
export interface PrismaLikeBatchPayload {
  count: number;
}

/** 개별 모델의 updateMany를 가진 최소 delegate 인터페이스 */
export interface PrismaLikeModelDelegate {
  updateMany: (args: {
    where: Record<string, unknown>;
    data: Record<string, unknown>;
  }) => Promise<PrismaLikeBatchPayload>;
}

/** Interactive Transaction에 전달되는 tx 객체의 최소 인터페이스 */
export interface PrismaLikeTxClient {
  naverApiBatchJob: PrismaLikeModelDelegate;
  naverApiBatchJobItem: PrismaLikeModelDelegate;
}

/** 팩토리 함수에 주입되는 Prisma Client의 최소 인터페이스 */
export interface PrismaLikeClient extends PrismaLikeTxClient {
  $transaction: <T>(callback: (tx: PrismaLikeTxClient) => Promise<T>) => Promise<T>;
}

// re-export for convenience
export type {
  TransitionApplyPrismaAdapterPort,
  TransitionApplyPrismaAdapterTxPort,
  TransitionApplyPrismaAdapterUpdateArgs,
};
