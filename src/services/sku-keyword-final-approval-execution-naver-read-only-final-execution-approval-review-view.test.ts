import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  buildNaverReadOnlyFinalExecutionApprovalReviewView,
  NEXT_TASK_306_APPROVAL_PHRASE,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-view.service';
import type {
  NaverReadOnlyFinalExecutionApprovalPacketStatus,
} from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-packet-view.service';

const ALL_REVIEW_ITEM_STATUSES = [
  'FINAL_EXECUTION_APPROVAL_REVIEW_READY',
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
  'FINAL_EXECUTION_APPROVAL_REVIEW_STATUS_RECORDED',
  'READY_FOR_FINAL_EXECUTION_APPROVAL_IF_COMPLETE',
  'READY_WITH_MISSING_FIELD_NOTICE',
  'BLOCKED_RECHECK_REQUIRED',
  'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'BLOCKED_RECHECK_AUTH_REQUIRED',
  'BLOCKED_RECHECK_ENV_REQUIRED',
  'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'PENDING_TASK_306_APPROVAL',
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

function makeInput(packetStatus: NaverReadOnlyFinalExecutionApprovalPacketStatus) {
  return {
    finalExecutionApprovalPacket: {
      readOnlyFinalExecutionApprovalPacketStatus: packetStatus,
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
    './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-view.service.ts',
    import.meta.url
  ),
  'utf8'
);

describe('buildNaverReadOnlyFinalExecutionApprovalReviewView', () => {
  it('Task 304 packetStatus 7종 → Task 305 reviewStatus 7종 1:1 매핑이 된다', () => {
    const cases: Array<[NaverReadOnlyFinalExecutionApprovalPacketStatus, string]> = [
      [
        'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY',
      ],
      [
        'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_PARTIAL_READY',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_ENV',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
        'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
      ],
    ];

    for (const [packetStatus, expectedReviewStatus] of cases) {
      const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
        makeInput(packetStatus)
      );
      assert.equal(view.finalExecutionApprovalReviewStatus, expectedReviewStatus);
    }
  });

  it('상태와 기본 준비 플래그가 올바르다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY');
    assert.equal(view.isNaverReadOnlyFinalExecutionApprovalReviewReady, true);
    assert.equal(view.isNaverReadOnlyFinalExecutionApprovalPacketReady, true);
  });

  it('READY 상태에서는 approvalReviewReady true다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.approvalReviewReady, true);
    assert.equal(view.approvalReviewPartialReady, false);
    assert.equal(view.approvalReviewBlocked, false);
  });

  it('PARTIAL 상태에서는 approvalReviewPartialReady true다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(view.approvalReviewReady, false);
    assert.equal(view.approvalReviewPartialReady, true);
    assert.equal(view.approvalReviewBlocked, false);
  });

  it('BLOCKED 상태에서는 approvalReviewBlocked true다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.approvalReviewReady, false);
    assert.equal(view.approvalReviewPartialReady, false);
    assert.equal(view.approvalReviewBlocked, true);
  });

  it('Task 306 별도 승인 요구 플래그는 true다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.requiresSeparateTask306Approval, true);
  });

  it('실제 최종 실행 승인/실행 승인/실행 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.actualFinalExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionApprovalGranted, false);
    assert.equal(view.actualExecutionStarted, false);
  });

  it('실행 버튼 / submit / POST 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.executionButtonAdded, false);
    assert.equal(view.submitActionAdded, false);
    assert.equal(view.postApiAdded, false);
  });

  it('API 호출 관련 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.naverApiCalled, false);
    assert.equal(view.productLookupApiRecalled, false);
    assert.equal(view.productUpdateApiCalled, false);
  });

  it('가격/재고 변경과 DB write 관련 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.priceChanged, false);
    assert.equal(view.stockChanged, false);
    assert.equal(view.dbWritePerformed, false);
  });

  it('Worker / Queue / Adapter 연결 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.workerStarted, false);
    assert.equal(view.queueEnqueued, false);
    assert.equal(view.adapterConnected, false);
  });

  it('민감값 노출 / raw 응답 / env 접근 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.tokenOrAuthValueExposed, false);
    assert.equal(view.rawApiResponseExposedOrStored, false);
    assert.equal(view.envFileReadOrModified, false);
  });

  it('Task 306 승인 문구를 포함한다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    assert.equal(view.nextTaskApprovalPhrase, NEXT_TASK_306_APPROVAL_PHRASE);
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 306'));
  });

  it('reviewItems가 상태값 누락 없이 생성된다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
    );
    const statuses = view.reviewItems.map(item => item.status);
    for (const required of ALL_REVIEW_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify 결과에 민감정보와 원본값이 포함되지 않는다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
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
    const view = buildNaverReadOnlyFinalExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW')
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
