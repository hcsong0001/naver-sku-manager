import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView,
  FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_STATUS_BY_SEAL_STATUS,
  NEXT_TASK_309_APPROVAL_PHRASE,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-outcome-certification-view.service";
import type {
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-view.service";
import type {
  NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
} from "./sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-safety-audit-seal-outcome-certification-view.service";

const ALL_SEAL_STATUSES: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus[] = [
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL",
  "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP",
];

const EXPECTED_CERTIFICATION_STATUSES: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus[] =
  [
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_GW_IP",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_TOKEN",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_ENV",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_CHANNEL",
    "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED_BY_PRODUCT_LOOKUP",
  ];

function makeInput(sealStatus: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus) {
  return {
    finalExecutionApprovalSafetyAuditSeal: {
      finalExecutionApprovalSafetyAuditSealStatus: sealStatus,
    },
  };
}

describe("Task 308: Naver Read-Only Final Execution Approval Safety Audit Seal Outcome Certification View", () => {
  describe("1. Task 307 safetyAuditSealStatus 7종 → Task 308 outcomeCertificationStatus 7종 1:1 매핑", () => {
    it("Record 매핑이 7개 항목을 모두 포함해야 한다", () => {
      assert.strictEqual(
        Object.keys(FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_STATUS_BY_SEAL_STATUS).length,
        7
      );
    });
    ALL_SEAL_STATUSES.forEach((sealStatus, idx) => {
      it(`${sealStatus} → ${EXPECTED_CERTIFICATION_STATUSES[idx]}`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
          makeInput(sealStatus)
        );
        assert.strictEqual(
          result.finalExecutionApprovalSafetyAuditSealOutcomeCertificationStatus,
          EXPECTED_CERTIFICATION_STATUSES[idx]
        );
        assert.strictEqual(result.sourceFinalExecutionApprovalSafetyAuditSealStatus, sealStatus);
      });
    });
  });

  describe("2. READY 상태에서는 sealOutcomeCertifiedReady true", () => {
    it("SEAL_READY → sealOutcomeCertifiedReady true", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.sealOutcomeCertifiedReady, true);
      assert.strictEqual(result.sealOutcomeCertifiedPartialReady, false);
      assert.strictEqual(result.sealOutcomeCertificationBlocked, false);
    });
  });

  describe("3. PARTIAL 계열 상태에서는 sealOutcomeCertifiedPartialReady true", () => {
    it("SEAL_PARTIAL_READY → sealOutcomeCertifiedPartialReady true", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_PARTIAL_READY")
      );
      assert.strictEqual(result.sealOutcomeCertifiedReady, false);
      assert.strictEqual(result.sealOutcomeCertifiedPartialReady, true);
      assert.strictEqual(result.sealOutcomeCertificationBlocked, false);
    });
  });

  describe("4. BLOCKED 계열 상태에서는 sealOutcomeCertificationBlocked true", () => {
    const blockedStatuses: NaverReadOnlyFinalExecutionApprovalSafetyAuditSealStatus[] = [
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_GW_IP",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_TOKEN",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_ENV",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_CHANNEL",
      "NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_BLOCKED_BY_PRODUCT_LOOKUP",
    ];
    blockedStatuses.forEach((sealStatus) => {
      it(`${sealStatus} → sealOutcomeCertificationBlocked true`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
          makeInput(sealStatus)
        );
        assert.strictEqual(result.sealOutcomeCertifiedReady, false);
        assert.strictEqual(result.sealOutcomeCertifiedPartialReady, false);
        assert.strictEqual(result.sealOutcomeCertificationBlocked, true);
      });
    });
  });

  describe("5. requiresSeparateTask309Approval true", () => {
    ALL_SEAL_STATUSES.forEach((sealStatus) => {
      it(`requiresSeparateTask309Approval true (${sealStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
          makeInput(sealStatus)
        );
        assert.strictEqual(result.requiresSeparateTask309Approval, true);
      });
    });
  });

  describe("6. 실제 최종 실행 승인 false", () => {
    it("actualFinalExecutionApprovalGranted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.actualFinalExecutionApprovalGranted, false);
    });
  });

  describe("7. 실제 실행 승인 false", () => {
    it("actualExecutionApprovalGranted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.actualExecutionApprovalGranted, false);
    });
  });

  describe("8. 실제 실행 false", () => {
    it("actualExecutionStarted false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.actualExecutionStarted, false);
    });
  });

  describe("9. 실행 버튼 추가 false", () => {
    it("executionButtonAdded false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.executionButtonAdded, false);
    });
  });

  describe("10. POST / submit action false", () => {
    it("submitActionAdded false & postApiAdded false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.submitActionAdded, false);
      assert.strictEqual(result.postApiAdded, false);
    });
  });

  describe("11. Naver API 호출 false", () => {
    it("naverApiCalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.naverApiCalled, false);
    });
  });

  describe("12. 상품 조회 API 재호출 false", () => {
    it("productLookupApiRecalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.productLookupApiRecalled, false);
    });
  });

  describe("13. 상품 수정 API 호출 false", () => {
    it("productUpdateApiCalled false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.productUpdateApiCalled, false);
    });
  });

  describe("14. 가격/재고 변경 false", () => {
    it("priceChanged false & stockChanged false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.priceChanged, false);
      assert.strictEqual(result.stockChanged, false);
    });
  });

  describe("15. DB write/upsert/update false", () => {
    it("dbWritePerformed false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.dbWritePerformed, false);
    });
  });

  describe("16. Worker / Queue / Adapter 연결 false", () => {
    it("workerStarted / queueEnqueued / adapterConnected false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.workerStarted, false);
      assert.strictEqual(result.queueEnqueued, false);
      assert.strictEqual(result.adapterConnected, false);
    });
  });

  describe("17. Token/Auth/Signature/Authorization 비노출 false", () => {
    it("tokenOrAuthValueExposed false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.tokenOrAuthValueExposed, false);
    });
  });

  describe("18. raw API response 비표시/비저장 유지", () => {
    it("rawApiResponseExposedOrStored false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.rawApiResponseExposedOrStored, false);
    });
  });

  describe("19. .env/.env.local 열람/수정 false", () => {
    it("envFileReadOrModified false", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.envFileReadOrModified, false);
    });
  });

  describe("20. Task 309 승인 문구 포함", () => {
    it("nextTaskApprovalPhrase에 Task 309 문구가 포함되어야 한다", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.ok(result.nextTaskApprovalPhrase.includes("Task 309"));
      assert.ok(result.nextTaskApprovalPhrase.includes("read-only"));
      assert.strictEqual(result.nextTaskApprovalPhrase, NEXT_TASK_309_APPROVAL_PHRASE);
    });
  });

  describe("21. certificationItems가 상태별로 누락 없이 생성되는지 검증", () => {
    ALL_SEAL_STATUSES.forEach((sealStatus) => {
      it(`certificationItems가 비어있지 않아야 한다 (${sealStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
          makeInput(sealStatus)
        );
        assert.ok(Array.isArray(result.certificationItems));
        assert.ok(result.certificationItems.length > 0);
        const statuses = result.certificationItems.map((item) => item.status);
        assert.ok(statuses.includes("FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_READY"));
        assert.ok(statuses.includes("FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_CONFIRMED"));
        assert.ok(statuses.includes("PENDING_TASK_309_APPROVAL"));
        assert.ok(statuses.includes("NOT_APPROVED"));
        assert.ok(statuses.includes("NOT_EXECUTED"));
        assert.ok(statuses.includes("LOCKED"));
        assert.ok(statuses.includes("READ_ONLY_INFO"));
      });
    });
  });

  describe("taskId / taskName / currentTaskNumber 확인", () => {
    it("taskId 308, currentTaskNumber 308", () => {
      const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
        makeInput("NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_SAFETY_AUDIT_SEAL_READY")
      );
      assert.strictEqual(result.taskId, 308);
      assert.strictEqual(result.currentTaskNumber, 308);
      assert.strictEqual(
        result.taskName,
        "Naver Read-Only Final Execution Approval Safety Audit Seal Outcome Certification Screen Flow"
      );
    });
  });

  describe("안전 플래그 일괄 검증 (모든 상태)", () => {
    ALL_SEAL_STATUSES.forEach((sealStatus) => {
      it(`모든 안전 플래그 false (${sealStatus})`, () => {
        const result = buildNaverReadOnlyFinalExecutionApprovalSafetyAuditSealOutcomeCertificationView(
          makeInput(sealStatus)
        );
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
