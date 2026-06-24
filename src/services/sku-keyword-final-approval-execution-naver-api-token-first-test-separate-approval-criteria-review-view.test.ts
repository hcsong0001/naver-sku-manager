import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-review-view.service';

describe('buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView() should create a read-only separate approval criteria review view model', () => {
  it('1. should return a valid model with all safety flags set to true', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView();
    assert.strictEqual(result.screenTitle, 'Separate Approval Criteria Review');
    assert.strictEqual(result.reviewedReadOnlyPhaseCommit, 'd7b6b9a');
    assert.strictEqual(result.readOnlyPhaseClosed, true);
    assert.strictEqual(result.criteriaReviewOnly, true);
    assert.strictEqual(result.separateApprovalStillRequired, true);
    assert.strictEqual(result.executionStillForbidden, true);
    assert.strictEqual(result.tokenRequestStillForbidden, true);
    assert.strictEqual(result.naverApiCallStillForbidden, true);
    assert.strictEqual(result.operatingDbWriteStillForbidden, true);
    assert.strictEqual(result.priceStockChangeStillForbidden, true);
    assert.strictEqual(result.queueWorkerStillDisconnected, true);
    assert.strictEqual(result.postApiStillNotAdded, true);
  });

  it('2. arrays should be properly populated', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView();
    assert.ok(result.approvalCriteriaItems.length >= 3);
    assert.ok(result.requiredPreApprovalChecks.length >= 3);
    assert.ok(result.stillForbiddenItems.length >= 4);
  });

  describe('Service code should not contain forbidden strings', () => {
    const serviceFilePath = path.join(__dirname, 'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-review-view.service.ts');
    const serviceCode = fs.readFileSync(serviceFilePath, 'utf-8');

    it('3. service 코드에 fetch/axios/http client 구현이 없음', () => {
      assert.ok(!serviceCode.includes('fetch('));
      assert.ok(!serviceCode.includes('axios.'));
      assert.ok(!serviceCode.includes('new HttpClient'));
    });

    it('4. service 코드에 Naver endpoint URL 구현이 없음', () => {
      assert.ok(!serviceCode.includes('http://'));
      assert.ok(!serviceCode.includes('https://'));
    });

    it('5. service 코드에 Authorization/Bearer 헤더 생성이 없음', () => {
      assert.ok(!serviceCode.includes('Authorization:'));
      assert.ok(!serviceCode.includes('Bearer '));
    });

    it('6. service 코드에 Prisma import가 없음', () => {
      assert.ok(!serviceCode.includes('@prisma/client'));
    });

    it('7. service 코드에 Prisma mutation 구현이 없음', () => {
      assert.ok(!serviceCode.includes('.create('));
      assert.ok(!serviceCode.includes('.update('));
      assert.ok(!serviceCode.includes('.delete('));
      assert.ok(!serviceCode.includes('.deleteMany('));
      assert.ok(!serviceCode.includes('.updateMany('));
    });
  });
});
