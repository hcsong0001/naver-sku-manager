import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView,
  FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_STATUS_BY_CERTIFICATION_STATUS,
  NEXT_TASK_308_APPROVAL_PHRASE,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-view.service";
import type {
  NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-review-outcome-certification-view.service";
import type {
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-view.service";

const ALL_CERTIFICATION_STATUSES: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus[] =
  [
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_GW_IP",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_TOKEN",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_ENV",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_CHANNEL",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP",
  ];

const EXPECTED_SEAL_STATUSES: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus[] = [
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP",
];

function makeInput(certStatus: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus) {
  return {
    finalExecutionApprovalReviewOutcomeCertification: {
      finalExecutionApprovalReviewOutcomeCertificationStatus: certStatus,
    },
  };
}

describe("Task 307: Naver Read-Only Final Execution Approval Safety Audit Seal View", () => {
  describe("1. Task 306 certificationStatus 7종 → Task 307 safetyAuditSealStatus 7종 1:1 매핑", () => {
    it("Record 매핑이 7개 항목을 모두 포함해야 한다", () => {
      assert.strictEqual(Object.keys(FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_STATUS_BY_CERTIFICATION_STATUS).length, 7);
    });
    ALL_CERTIFICATION_STATUSES.forEach((certStatus, idx) => {
      it(`${certStatus} → ${EXPECTED_SEAL_STATUSES[idx]}`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(makeInput(certStatus));
        assert.strictEqual(result.finalExecutionApprovalSafetyAuditSealStatus, EXPECTED_SEAL_STATUSES[idx]);
        assert.strictEqual(result.sourceFinalExecutionApprovalReviewOutcomeCertificationStatus, certStatus);
      });
    });
  });

  describe("2. READY 상태에서는 safetyAuditSealReady true", () => {
    it("CERTIFIED_READY → safetyAuditSealReady true", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.safetyAuditSealReady, true);
      assert.strictEqual(result.safetyAuditSealPartialReady, false);
      assert.strictEqual(result.safetyAuditSealBlocked, false);
    });
  });

  describe("3. PARTIAL 계열 상태에서는 safetyAuditSealPartialReady true", () => {
    it("CERTIFIED_PARTIAL_READY → safetyAuditSealPartialReady true", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY")
      );
      assert.strictEqual(result.safetyAuditSealReady, false);
      assert.strictEqual(result.safetyAuditSealPartialReady, true);
      assert.strictEqual(result.safetyAuditSealBlocked, false);
    });
  });

  describe("4. BLOCKED 계열 상태에서는 safetyAuditSealBlocked true", () => {
    const blockedStatuses: NaverReadOnlyFinalExecutionApprovalReviewOutcomeCertificationStatus[] = [
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_GW_IP",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_TOKEN",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_ENV",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_CHANNEL",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP",
    ];
    blockedStatuses.forEach((certStatus) => {
      it(`${certStatus} → safetyAuditSealBlocked true`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(makeInput(certStatus));
        assert.strictEqual(result.safetyAuditSealReady, false);
        assert.strictEqual(result.safetyAuditSealPartialReady, false);
        assert.strictEqual(result.safetyAuditSealBlocked, true);
      });
    });
  });

  describe("5. requiresSeparateTask308Approval true", () => {
    ALL_CERTIFICATION_STATUSES.forEach((certStatus) => {
      it(`requiresSeparateTask308Approval true (${certStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(makeInput(certStatus));
        assert.strictEqual(result.requiresSeparateTask308Approval, true);
      });
    });
  });

  describe("6. 실제 최종 실행 승인 false", () => {
    it("actualFinalExecutionApprovalGranted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.actualFinalExecutionApprovalGranted, false);
    });
  });

  describe("7. 실제 실행 승인 false", () => {
    it("actualExecutionApprovalGranted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.actualExecutionApprovalGranted, false);
    });
  });

  describe("8. 실제 실행 false", () => {
    it("actualExecutionStarted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.actualExecutionStarted, false);
    });
  });

  describe("9. 실행 버튼 추가 false", () => {
    it("executionButtonAdded false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.executionButtonAdded, false);
    });
  });

  describe("10. POST / submit action false", () => {
    it("submitActionAdded false & postApiAdded false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.submitActionAdded, false);
      assert.strictEqual(result.postApiAdded, false);
    });
  });

  describe("11. Naver API 호출 false", () => {
    it("naverApiCalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.naverApiCalled, false);
    });
  });

  describe("12. 상품 조회 API 재호출 false", () => {
    it("productLookupApiRecalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.productLookupApiRecalled, false);
    });
  });

  describe("13. 상품 수정 API 호출 false", () => {
    it("productUpdateApiCalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.productUpdateApiCalled, false);
    });
  });

  describe("14. 가격/재고 변경 false", () => {
    it("priceChanged false & stockChanged false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.priceChanged, false);
      assert.strictEqual(result.stockChanged, false);
    });
  });

  describe("15. DB write/upsert/update false", () => {
    it("dbWritePerformed false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.dbWritePerformed, false);
    });
  });

  describe("16. Worker / Queue / Adapter 연결 false", () => {
    it("workerStarted / queueEnqueued / adapterConnected false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.workerStarted, false);
      assert.strictEqual(result.queueEnqueued, false);
      assert.strictEqual(result.adapterConnected, false);
    });
  });

  describe("17. Token/Auth/Signature/Authorization 비노출 false", () => {
    it("tokenOrAuthValueExposed false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.tokenOrAuthValueExposed, false);
    });
  });

  describe("18. raw API response 비표시/비저장 유지", () => {
    it("rawApiResponseExposedOrStored false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.rawApiResponseExposedOrStored, false);
    });
  });

  describe("19. .env/.env.local 열람/수정 false", () => {
    it("envFileReadOrModified false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.envFileReadOrModified, false);
    });
  });

  describe("20. Task 308 승인 문구 포함", () => {
    it("nextTaskApprovalPhrase에 Task 308 문구가 포함되어야 한다", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.ok(result.nextTaskApprovalPhrase.includes("Task 308"));
      assert.ok(result.nextTaskApprovalPhrase.includes("read-only"));
      assert.strictEqual(result.nextTaskApprovalPhrase, NEXT_TASK_308_APPROVAL_PHRASE);
    });
  });

  describe("21. safetySealItems가 상태별로 누락 없이 생성되는지 검증", () => {
    ALL_CERTIFICATION_STATUSES.forEach((certStatus) => {
      it(`safetySealItems가 비어있지 않아야 한다 (${certStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(makeInput(certStatus));
        assert.ok(Array.isArray(result.safetySealItems));
        assert.ok(result.safetySealItems.length > 0);
        const statuses = result.safetySealItems.map((item) => item.status);
        assert.ok(statuses.includes("FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY"));
        assert.ok(statuses.includes("FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED"));
        assert.ok(statuses.includes("PENDING_TASK_308_APPROVAL"));
        assert.ok(statuses.includes("NOT_APPROVED"));
        assert.ok(statuses.includes("NOT_EXECUTED"));
        assert.ok(statuses.includes("LOCKED"));
        assert.ok(statuses.includes("READ_ONLY_INFO"));
      });
    });
  });

  describe("taskId / taskName / currentTaskNumber 확인", () => {
    it("taskId 307, currentTaskNumber 307", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFIED_READY")
      );
      assert.strictEqual(result.taskId, 307);
      assert.strictEqual(result.currentTaskNumber, 307);
      assert.strictEqual(result.taskName, "Naver Read-Only Final Execution Approval Safety Audit Seal Screen Flow");
    });
  });

  describe("안전 플래그 일괄 검증 (모든 상태)", () => {
    ALL_CERTIFICATION_STATUSES.forEach((certStatus) => {
      it(`모든 안전 플래그 false (${certStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealView(makeInput(certStatus));
        assert.strictEqual(result.actualFinalExecutionApprovalGranted, false);
        assert.strictEqual(result.actualExecutionApprovalGranted, false);
        assert.strictEqual(result.actualExecutionStarted, false);
        assert.strictEqual(result.executionButtonAdded, false);
        assert.strictEqual(result.submitActionAdded, false);
        assert.strictEqual(result.postApiAdded, false);
        assert.strictEqual(result.naverApiCalled, false);
        assert.strictEqual(result.productLookupApiRecalled, false);
        assert.strictEqual(result.productUpdateApiCalled, false);
        assert.strictEqual(result.priceChanged, false);
        assert.strictEqual(result.stockChanged, false);
        assert.strictEqual(result.dbWritePerformed, false);
        assert.strictEqual(result.workerStarted, false);
        assert.strictEqual(result.queueEnqueued, false);
        assert.strictEqual(result.adapterConnected, false);
        assert.strictEqual(result.tokenOrAuthValueExposed, false);
        assert.strictEqual(result.rawApiResponseExposedOrStored, false);
        assert.strictEqual(result.envFileReadOrModified, false);
      });
    });
  });
});
