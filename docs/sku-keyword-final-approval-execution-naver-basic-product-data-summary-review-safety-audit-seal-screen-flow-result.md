# Task 282 — Naver Basic Product Data Summary Review Safety Audit Seal

## 목적

Task 281 기본 상품 데이터 요약 검토 결과가 안전한 read-only 요약인지 확인하고,
기존 캡처 데이터만 사용·가격/재고 원본 값 제외·raw response 제외·Token/Auth 비노출·DB 비저장 상태를 감사 봉인합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## 감사 봉인 항목 요약

| 항목 | 상태 |
|------|------|
| 기존 캡처 데이터만 사용 | CAPTURED_DATA_ONLY_CONFIRMED |
| 가격/재고 원본 값 | NOT_INCLUDED |
| 가격/재고 존재 여부 | PRESENCE_FLAG_ONLY |
| raw API response 전체 | NOT_INCLUDED |
| Token/Auth/Signature/Authorization | NOT_DISPLAYED |
| raw 응답 저장 | NOT_STORED |
| DB write/upsert/update | NOT_EXECUTED |
| Worker/Queue/Adapter | LOCKED |
| 다음 단계 | PENDING_SEPARATE_APPROVAL |

## 화면 배치

```
Task 281: Basic Product Data Summary Review
↓
Task 282: Safety Audit Seal  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-safety-audit-seal-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-safety-audit-seal-view.test.ts` (신규) — 12 pass
3. `docs/sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-safety-audit-seal-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 282 패널 삽입)

## 상태

- READ-ONLY Safety Audit Seal View 전용
- 기존 캡처 데이터만 사용 (신규 API 호출 없음)
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 276/280/281 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: 9a1dae9 (Task 281)
