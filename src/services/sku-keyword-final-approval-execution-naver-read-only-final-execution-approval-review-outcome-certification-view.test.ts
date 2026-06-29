import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView,
  NEXT_TASK_307_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-outcome-certification-view.service';
import type {
  NaverReadOnlyFinalExecutionApprovalReviewStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-view.service';

const ALL_CERTIFICATION_ITEM_STATUSES = [
  'FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY',
  'FINAL_EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'FINAL_EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_CONFIRMED',
  'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_STATUS_RECORDED',
  'CERTIFIED_READY_IF_COMPLETE',
  'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
  'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'PENDING_TASK_307_APPROVAL',
  'NOT_APPROVED',
  'NOT_EXECUTED',
  'NOT_CONNECTED',
  'LOCKED',
  'NOT_APPROVED_FOR_PRODUCT_CHANGE',
  'NOT_STORED',
  'NOT_COPIED_FOR_EXECUTION',
  'CAPTURED_DATA_ONLY_CONFIRMED',
  'SUMMARY_REVIEW_ONLY_CONFIRMED',
  'NOT_INFERRED',
  'NOT_INCLUDED',
  'NOT_DISPLAYED',
  'READ_ONLY_INFO',
];

function makeInput(reviewStatus: NaverReadOnlyFinalExecutionApprovalReviewStatus) {
  return {
    finalExecutionApprovalReview: {
      finalExecutionApprovalReviewStatus: reviewStatus,
      access_token: 'secret-token',
      client_secret: 'secret-value',
      Authorization: 'Bearer secret-token',
      signature: 'secret-signature',
      salePrice: 12345,
      stockQuantity: 9,
      rawResponse: { body: 'secret-raw-response' },
    },
  };
}

const serviceSource = readFileSync(
  new URL(
    './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-outcome-certification-view.service.ts',
    import.meta.url
  ),
  'utf8'
);

describe('buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView', () => {
  it('Task 305 reviewStatus 7종 → Task 306 certificationStatus 7종 1:1 매핑이 된다', () => {
    const cases: Array<[NaverReadOnlyFinalExecutionApprovalReviewStatus, string]> = [
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_PARTIAL_READY',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_GW_IP',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_TOKEN',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_ENV',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_CHANNEL',
      ],
      [
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP',
      ],
    ];

    for (const [reviewStatus, expectedCertificationStatus] of cases) {
      const view =
        buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
          makeInput(reviewStatus)
        );
      assert.equal(
        view.finalExecutionApprovalReviewOutcomeCertificationStatus,
        expectedCertificationStatus
      );
    }
  });

  it('상태와 기본 준비 플래그가 올바르다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(
      view.status,
      'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY'
    );
    assert.equal(
      view.isNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationReady,
      true
    );
    assert.equal(view.isNaverReadOnlyFinalExecutionApprovalReviewReady, true);
  });

  it('READY 상태에서는 outcomeCertifiedReady true다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.outcomeCertifiedReady, true);
    assert.equal(view.outcomeCertifiedPartialReady, false);
    assert.equal(view.outcomeCertificationBlocked, false);
  });

  it('PARTIAL 상태에서는 outcomeCertifiedPartialReady true다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_PARTIAL_READY')
      );
    assert.equal(view.outcomeCertifiedReady, false);
    assert.equal(view.outcomeCertifiedPartialReady, true);
    assert.equal(view.outcomeCertificationBlocked, false);
  });

  it('BLOCKED 상태에서는 outcomeCertificationBlocked true다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN')
      );
    assert.equal(view.outcomeCertifiedReady, false);
    assert.equal(view.outcomeCertifiedPartialReady, false);
    assert.equal(view.outcomeCertificationBlocked, true);
  });

  it('Task 307 별도 승인 요구 플래그는 true다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.requiresSeparateTask307Approval, true);
  });

  it('실제 최종 실행 승인/실행 승인/실행 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.actualFinalExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionStarted, false);
  });

  it('실행 버튼 / submit / POST 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.executionButtonAdded, false);
    assert.equal(view.submitActionAdded, false);
    assert.equal(view.postApiAdded, false);
  });

  it('API 호출 관련 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.naverApiCalled, false);
    assert.equal(view.productLookupApiRecalled, false);
    assert.equal(view.productUpdateApiCalled, false);
  });

  it('가격/재고 변경과 DB write 관련 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.priceChanged, false);
    assert.equal(view.stockChanged, false);
    assert.equal(view.dbWritePerformed, false);
  });

  it('Worker / Queue / Adapter 연결 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.workerStarted, false);
    assert.equal(view.queueEnqueued, false);
    assert.equal(view.adapterConnected, false);
  });

  it('민감값 노출 / raw 응답 / env 접근 플래그는 false다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.tokenOrAuthValueExposed, false);
    assert.equal(view.rawApiResponseExposedOrStored, false);
    assert.equal(view.envFileReadOrModified, false);
  });

  it('Task 307 승인 문구를 포함한다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_307_APPROVAL_PHRASE);
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 307'));
  });

  it('certificationItems가 상태값 누락 없이 생성된다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    const statuses = view.certificationItems.map(item => item.status);
    for (const required of ALL_CERTIFICATION_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify 결과에 민감정보와 원본값이 포함되지 않는다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    const json = JSON.stringify(view);
    assert.ok(!json.includes('secret-token'));
    assert.ok(!json.includes('secret-value'));
    assert.ok(!json.includes('Bearer secret-token'));
    assert.ok(!json.includes('secret-signature'));
    assert.ok(!json.includes('secret-raw-response'));
    assert.ok(!json.includes('"salePrice":12345'));
    assert.ok(!json.includes('"stockQuantity":9'));
  });

  it('실제 승인/실행/상품변경으로 오해될 수 있는 플래그가 true가 되지 않는다', () => {
    const view =
      buildNaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationView(
        makeInput('NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY')
      );
    assert.equal(view.actualFinalExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionStarted, false);
    assert.equal(view.executionButtonAdded, false);
    assert.equal(view.submitActionAdded, false);
    assert.equal(view.postApiAdded, false);
  });

  it('DB 저장/수정 관련 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('prisma'));
    assert.ok(!serviceSource.includes('.create('));
    assert.ok(!serviceSource.includes('.update('));
    assert.ok(!serviceSource.includes('.upsert('));
  });

  it('Worker/Queue/Adapter 및 외부 호출 관련 실행 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('worker.run'));
    assert.ok(!serviceSource.includes('queue.add'));
    assert.ok(!serviceSource.includes('adapter.execute'));
    assert.ok(!serviceSource.includes('fetch('));
  });
});
