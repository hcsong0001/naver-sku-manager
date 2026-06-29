# Task 288 — Naver Read-Only Option/Additional Structure Expansion Planning Candidate

## 목적

Task 287 결과를 기반으로 다음 `옵션/추가상품 구조 확장 설계` 단계로 넘어갈 수 있는지
read-only 후보 상태를 보여주는 패널을 추가합니다.

이번 Task는 실제 설계 실행이 아니라 후보 인증만 수행하며,
새 API 호출, 상품 조회 API 재호출, 상품 수정 API 호출, Token 재발급,
가격/재고 변경, DB write/upsert/update를 수행하지 않습니다.

## 후보 판정 기준

- 입력 기준: Task 287 `readOnlyProductStructureReviewOutcomeCertificationStatus`
- COMPLETE: `OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY`
- PARTIAL: `OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE`
- BLOCKED: 동일 원인으로 `*_BLOCKED_*` 후보 차단 상태

## 화면 배치

```text
Task 287 Naver Read-Only Product Structure Review Outcome Certification
Task 288 Option/Additional Structure Expansion Planning Candidate
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-planning-candidate-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-planning-candidate-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-planning-candidate-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 288 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 288 패널 추가)
