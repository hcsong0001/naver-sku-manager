# Task 293 — Naver Read-Only Design Finalization Candidate

## 목적

Task 292 승인 요청 패킷과 사용자 명시 승인을 바탕으로
Task 289 설계안 블루프린트를 read-only 확정 후보로 표시합니다.

이번 Task는 확정 후보 표시 전용이며,
실제 설계 확정, 실행 승인, 상품 변경 승인, DB 저장을 수행하지 않습니다.

## 후보 표시 기준

- 입력 기준: Task 292 `readOnlyDesignFinalizationApprovalPacketStatus`
- COMPLETE: `FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT`
- PARTIAL: `FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE`
- BLOCKED: 동일 원인으로 `FINALIZATION_CANDIDATE_BLOCKED_BY_*`
- READY 상태에서만 `designFinalizationCandidate`를 구성
- BLOCKED 상태에서는 `designFinalizationCandidate: null`
- 설계안은 reference only로만 표시하고 DB에 저장하지 않음

## 화면 배치

```text
Task 292 Read-Only Design Finalization Approval Packet
Task 293 Read-Only Design Finalization Candidate
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 293 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 293 패널 추가)
