# Task 289 — Naver Read-Only Option/Additional Structure Expansion Design Blueprint

## 목적

Task 288 후보 판정 결과를 기반으로 다음 설계 단계에서 무엇을 검토해야 하는지
read-only blueprint 초안으로 보여주는 패널을 추가합니다.

이번 Task는 실제 옵션/추가상품 구조 설계 확정이 아니며,
새 API 호출, 상품 조회 API 재호출, 상품 수정 API 호출, Token 재발급,
가격/재고 변경, DB write/upsert/update를 수행하지 않습니다.

## 설계안 기준

- 입력 기준: Task 288 `optionAdditionalStructureExpansionPlanningCandidateStatus`
- COMPLETE: `OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY`
- PARTIAL: `OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE`
- BLOCKED: 동일 원인으로 `*_BLOCKED_*` 설계안 차단 상태
- 기존 데이터에 없는 옵션/추가상품/세트 구조는 모두 `미확정` 또는 `확인 필요`로만 표시

## 화면 배치

```text
Task 288 Option/Additional Structure Expansion Planning Candidate
Task 289 Option/Additional Structure Expansion Design Blueprint
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 289 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 289 패널 추가)
