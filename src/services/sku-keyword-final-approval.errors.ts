import type { SkuKeywordFinalApprovalErrorCode } from '@/src/types/sku-keyword-final-approval.types';

export class SkuKeywordFinalApprovalError extends Error {
  constructor(
    public readonly code: SkuKeywordFinalApprovalErrorCode,
    public readonly httpStatus: number,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'SkuKeywordFinalApprovalError';
  }
}

export function finalApprovalError(
  code: SkuKeywordFinalApprovalErrorCode,
  httpStatus: number,
  message: string,
  details?: Record<string, unknown>,
): never {
  throw new SkuKeywordFinalApprovalError(code, httpStatus, message, details);
}
