import type {
  NaverApiAdapter,
  NaverApiAdapterRequest,
  NaverApiAdapterResponse,
} from '@/src/services/naver-api/naver-api.types';

export type NaverApiDryRunResponse<TRequest> = {
  dryRun: true;
  storeId: string;
  channelId: string;
  module: string;
  operation: string;
  method: string;
  endpoint: string;
  requestPayload: TRequest;
};

export class NaverApiDryRunAdapter implements NaverApiAdapter {
  readonly mode = 'DRY_RUN' as const;

  async execute<TRequest, TResponse>(
    request: NaverApiAdapterRequest<TRequest>,
  ): Promise<NaverApiAdapterResponse<TResponse>> {
    const response: NaverApiDryRunResponse<TRequest> = {
      dryRun: true,
      storeId: request.context.storeId,
      channelId: request.context.channelId ?? '',
      module: request.operation.module,
      operation: request.operation.name,
      method: request.operation.method,
      endpoint: request.operation.endpoint,
      requestPayload: request.payload,
    };

    return {
      statusCode: 200,
      data: response as TResponse,
      headers: { 'x-erp-dry-run': 'true' },
    };
  }
}
