# Task 313: Naver Read-Only Final Execution Approval Candidate Detail Review Safety Audit Seal Screen Flow

## 개요

Task 312 Outcome Certification ViewModel을 받아, 후보 상세 검토 이후 안전 조건을 read-only로 봉인합니다.

## 상태 유형

### `NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealStatus`
- `SAFETY_AUDIT_SEAL_READY` / `SAFETY_AUDIT_SEAL_PARTIAL_READY` / `SAFETY_AUDIT_SEAL_BLOCKED` / `SAFETY_AUDIT_SEAL_EMPTY`

1:1 Record 매핑: Task 312 OutcomeCertificationStatus → Task 313 SafetyAuditSealStatus

## Builder

```typescript
buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView({
  outcomeCertification: { candidateDetailReviewOutcomeCertificationStatus, certificationItems, ... }
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewSafetyAuditSealView
```

## 안전 플래그 (항상 true)

`safeDisplayFieldsStillCertified`, `excludedFieldsStillCertified`, `executionStillLocked`, `mutationStillBlocked`, `apiCallStillBlocked`
`isReadOnlySafetyAuditSeal: true`, `requiresSeparateTask314Approval: true`

## 다음 Task

Task 314는 사용자 별도 명시 승인 후에만 진행합니다.
