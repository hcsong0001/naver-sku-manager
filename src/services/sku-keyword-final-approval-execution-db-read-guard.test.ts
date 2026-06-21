import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runFinalApprovalExecutionDbReadGuard } from './sku-keyword-final-approval-execution-db-read-guard.service';
import type { 
  FinalApprovalExecutionDbReadGuardInput,
  FinalApprovalExecutionDbReadGuardSnapshot,
  FinalApprovalExecutionDbReadGuardRepository
} from '../types/sku-keyword-final-approval-execution-db-read-guard.types';

describe('runFinalApprovalExecutionDbReadGuard', () => {
  const defaultInput: FinalApprovalExecutionDbReadGuardInput = {
    finalApprovalId: 'fa-1',
    actorId: 'act-1',
    idempotencyKey: 'idem-1'
  };

  const createFakeRepository = (
    snapshotOrError: FinalApprovalExecutionDbReadGuardSnapshot | Error
  ): FinalApprovalExecutionDbReadGuardRepository => {
    return {
      findSnapshotForExecutionGuard: async () => {
        if (snapshotOrError instanceof Error) {
          throw snapshotOrError;
        }
        return snapshotOrError;
      }
    };
  };

  const validSnapshot: FinalApprovalExecutionDbReadGuardSnapshot = {
    finalApproval: {
      id: 'fa-1',
      status: 'ACTIVE',
      validationExpiresAt: new Date(Date.now() + 100000).toISOString(),
      payloadHash: 'hash',
      validationSnapshotHash: 'hash',
      jobId: 'job-1'
    },
    job: {
      id: 'job-1',
      status: 'APPROVED'
    },
    items: [
      { id: 'item-1', status: 'READY' }
    ]
  };

  it('1. 정상 FinalApproval/Job/Item이면 success true', async () => {
    const repo = createFakeRepository(validSnapshot);
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, true);
    if (result.success) {
      assert.deepEqual(result.snapshot, validSnapshot);
    }
  });

  it('2. FinalApproval 없음이면 404 성격 실패', async () => {
    const invalidSnapshot: FinalApprovalExecutionDbReadGuardSnapshot = {
      ...validSnapshot,
      finalApproval: null
    };
    const repo = createFakeRepository(invalidSnapshot);
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 404);
      assert.equal(result.guardCode, 'FINAL_APPROVAL_NOT_FOUND');
    }
  });

  it('3. FinalApproval ACTIVE가 아니면 409 성격 실패', async () => {
    const invalidSnapshot = JSON.parse(JSON.stringify(validSnapshot));
    invalidSnapshot.finalApproval.status = 'CANCELED';
    const repo = createFakeRepository(invalidSnapshot);
    
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 409);
      assert.equal(result.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
    }
  });

  it('4. validationExpiresAt 만료이면 409 성격 실패', async () => {
    const invalidSnapshot = JSON.parse(JSON.stringify(validSnapshot));
    invalidSnapshot.finalApproval.validationExpiresAt = new Date(Date.now() - 100000).toISOString();
    const repo = createFakeRepository(invalidSnapshot);
    
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 409);
      assert.equal(result.guardCode, 'VALIDATION_EXPIRED');
    }
  });

  it('5. Job status가 APPROVED가 아니면 409 성격 실패', async () => {
    const invalidSnapshot = JSON.parse(JSON.stringify(validSnapshot));
    invalidSnapshot.job.status = 'EXECUTING';
    const repo = createFakeRepository(invalidSnapshot);
    
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 409);
      assert.equal(result.guardCode, 'JOB_NOT_APPROVED');
    }
  });

  it('6. READY item이 없으면 409 성격 실패', async () => {
    const invalidSnapshot = JSON.parse(JSON.stringify(validSnapshot));
    invalidSnapshot.items[0].status = 'SUCCESS';
    const repo = createFakeRepository(invalidSnapshot);
    
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 409);
      assert.equal(result.guardCode, 'NO_READY_ITEMS');
    }
  });

  it('7. repository가 예외를 던지면 500 성격 실패', async () => {
    const repo = createFakeRepository(new Error('DB Connection Error'));
    
    const result = await runFinalApprovalExecutionDbReadGuard(defaultInput, repo);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 500);
      assert.equal(result.guardCode, 'INTERNAL_ERROR');
    }
  });

  it('8. 입력 객체를 mutation하지 않음', async () => {
    const repo = createFakeRepository(validSnapshot);
    const inputCopy = { ...defaultInput };
    const originalJson = JSON.stringify(defaultInput);

    await runFinalApprovalExecutionDbReadGuard(inputCopy, repo);

    assert.equal(JSON.stringify(inputCopy), originalJson);
  });
});
