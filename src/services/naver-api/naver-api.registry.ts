import type {
  NaverApiModule,
  NaverApiOperation,
} from '@/src/services/naver-api/naver-api.types';

function operationKey(module: NaverApiModule, name: string): string {
  return `${module}:${name}`;
}

export class NaverApiOperationRegistry {
  private readonly operations = new Map<string, NaverApiOperation<unknown, unknown>>();

  register<TRequest, TResponse>(operation: NaverApiOperation<TRequest, TResponse>): void {
    const key = operationKey(operation.module, operation.name);
    if (this.operations.has(key)) {
      throw new Error(`네이버 API operation이 이미 등록되어 있습니다: ${key}`);
    }
    this.operations.set(key, operation as NaverApiOperation<unknown, unknown>);
  }

  get<TRequest = unknown, TResponse = unknown>(
    module: NaverApiModule,
    name: string,
  ): NaverApiOperation<TRequest, TResponse> {
    const operation = this.operations.get(operationKey(module, name));
    if (!operation) {
      throw new Error(`등록되지 않은 네이버 API operation입니다: ${module}:${name}`);
    }
    return operation as NaverApiOperation<TRequest, TResponse>;
  }

  list(module?: NaverApiModule): NaverApiOperation<unknown, unknown>[] {
    const operations = Array.from(this.operations.values());
    return module ? operations.filter((operation) => operation.module === module) : operations;
  }
}

export function defineNaverApiOperation<TRequest, TResponse>(
  operation: NaverApiOperation<TRequest, TResponse>,
): NaverApiOperation<TRequest, TResponse> {
  return operation;
}
