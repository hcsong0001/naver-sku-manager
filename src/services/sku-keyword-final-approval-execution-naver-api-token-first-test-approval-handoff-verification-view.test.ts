import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  buildNaverApiTokenFirstTestApprovalHandoffVerificationView,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-approval-handoff-verification-view.service';

test('buildNaverApiTokenFirstTestApprovalHandoffVerificationView should return static read-only view model', () => {
  const result = buildNaverApiTokenFirstTestApprovalHandoffVerificationView();

  assert.equal(result.handoffVerificationCreated, true);
  assert.equal(result.displayOnly, true);
  assert.equal(result.readOnly, true);
  assert.equal(result.executionLocked, true);
  assert.equal(result.handoffIsReadOnly, true);
  assert.equal(result.verificationIsReadOnly, true);

  assert.equal(result.executionButtonRendered, false);
  assert.equal(result.executionButtonEnabled, false);
  assert.equal(result.handoffSaveButtonRendered, false);
  assert.equal(result.handoffSaveButtonEnabled, false);
  assert.equal(result.verificationSaveButtonRendered, false);
  assert.equal(result.verificationSaveButtonEnabled, false);
  assert.equal(result.verificationConfirmButtonRendered, false);
  assert.equal(result.verificationConfirmButtonEnabled, false);
  assert.equal(result.formRendered, false);
  assert.equal(result.postApiEnabled, false);

  assert.equal(result.naverApiCallAllowed, false);
  assert.equal(result.dbWriteAllowed, false);
  assert.equal(result.dbWriteExecuted, false);
  assert.equal(result.tokenRequestAllowed, false);
  assert.equal(result.tokenIssued, false);

  assert.equal(result.verificationItems.length, 5);
  assert.equal(result.verificationCheckItems.length, 5);
});
