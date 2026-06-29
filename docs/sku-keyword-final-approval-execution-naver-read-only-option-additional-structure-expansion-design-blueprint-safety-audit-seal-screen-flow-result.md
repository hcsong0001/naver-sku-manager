# Task 290 — Naver Read-Only Option Additional Structure Expansion Design Blueprint Safety Audit Seal

## 목적

Task 289에서 생성한 read-only 옵션/추가상품 구조 확장 설계안 블루프린트가
안전 제한 범위 안에서만 구성되었는지 감사 봉인하는 패널을 추가합니다.

이번 Task는 설계 확정, 실행 승인, API 호출, DB 변경을 수행하지 않는
read-only 안전 감사 봉인 표시 전용 단계입니다.

## 봉인 기준

- 입력 기준: Task 289 `optionAdditionalStructureExpansionDesignBlueprintStatus`
- COMPLETE: 설계안 가능 상태를 감사 봉인
- PARTIAL: missing field notice 유지 상태를 감사 봉인
- BLOCKED: 동일 원인 차단 상태를 감사 봉인
- 옵션/추가상품 상세 구조는 캡처 데이터에 없으므로 추정하지 않음
- 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값은 포함하지 않음

## 화면 배치

```text
Task 289 Option/Additional Structure Expansion Design Blueprint
Task 290 Option/Additional Structure Expansion Design Blueprint Safety Audit Seal
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-safety-audit-seal-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-safety-audit-seal-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-safety-audit-seal-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 290 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 290 패널 추가)
