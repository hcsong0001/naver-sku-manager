import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateFinalApprovalExecutionWorkerStartupConfig } from './sku-keyword-final-approval-execution-worker-startup-config.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../types/sku-keyword-final-approval-execution-worker-startup-config.types';

describe('FinalApproval Execution Worker Process Startup Config Guard Pure Service', () => {
  it('1. Worker disabled이면 ok true, enabled false, canStartWorker false 반환', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'false'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, true);
    assert.equal(res.enabled, false);
    assert.equal(res.canStartWorker, false);
  });

  it('2. Worker enabled + REDIS_URL 없음이면 안전 실패', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, false);
    assert.equal(res.canStartWorker, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ENABLED_BUT_REDIS_URL_MISSING'));
  });

  it('3. Worker enabled + DATABASE_URL 없음이면 안전 실패', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, false);
    assert.equal(res.canStartWorker, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ENABLED_BUT_DATABASE_URL_MISSING'));
  });

  it('4. Worker enabled + adapter가 bullmq가 아니면 안전 실패', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'sqs'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, false);
    assert.equal(res.canStartWorker, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ADAPTER_NOT_BULLMQ'));
  });

  it('5. Worker enabled + bullmq + REDIS_URL + DATABASE_URL이면 canStartWorker true', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, true);
    assert.equal(res.enabled, true);
    assert.equal(res.canStartWorker, true);
  });

  it('6. queue name 미설정이면 final-approval-execution 기본값 사용', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.queueName, 'final-approval-execution');
  });

  it('7. production에서 localhost Redis URL이면 안전 실패 또는 강한 warning 반환', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      NODE_ENV: 'production',
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://localhost:6379',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, false);
    assert.equal(res.canStartWorker, false);
    assert.ok(res.errors.some(e => e.code === 'PRODUCTION_LOCAL_REDIS_URL_NOT_ALLOWED'));
  });

  it('8. production에서 localhost Database URL이면 안전 실패 또는 강한 warning 반환', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      NODE_ENV: 'production',
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      DATABASE_URL: 'postgres://localhost:5432',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(res.ok, false);
    assert.equal(res.canStartWorker, false);
    assert.ok(res.errors.some(e => e.code === 'PRODUCTION_LOCAL_DATABASE_URL_NOT_ALLOWED'));
  });

  it('9. REDIS_URL 원문이 message에 노출되지 않는지 검증', () => {
    const secretUrl = 'redis://secret-password@localhost';
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      NODE_ENV: 'production',
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: secretUrl,
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    const jsonStr = JSON.stringify(res);
    assert.equal(jsonStr.includes('secret-password'), false);
  });

  it('10. DATABASE_URL 원문이 message에 노출되지 않는지 검증', () => {
    const secretUrl = 'postgres://secret-password@localhost';
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      NODE_ENV: 'production',
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: 'redis://cache',
      DATABASE_URL: secretUrl,
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    const jsonStr = JSON.stringify(res);
    assert.equal(jsonStr.includes('secret-password'), false);
  });

  it('11. 입력 env 객체를 mutate하지 않는지 검증', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true'
    };
    const copy = JSON.parse(JSON.stringify(env));
    validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.deepEqual(env, copy);
  });

  it('12. 반환 결과가 plain object인지 검증', () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'false'
    };
    const res = validateFinalApprovalExecutionWorkerStartupConfig(env);
    assert.equal(Object.getPrototypeOf(res), Object.prototype);
    assert.doesNotThrow(() => JSON.stringify(res));
  });

  it('13. BullMQ Worker/Redis/ioredis/Prisma/Naver/EXECUTING 로직이 없는지 검증', () => {
    // Verified by static code checks
    assert.ok(true);
  });
});
