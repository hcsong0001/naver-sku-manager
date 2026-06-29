# Task 277 — Naver Read-Only Product Data Capture Safety Audit Seal

## 목적

Task 276에서 구성한 `capturedProductData`가 안전한 read-only 표시용 데이터인지 확인하고,
원본 응답 비포함·가격/재고 원값 비포함·Token/Auth 비노출·DB 비저장 상태를 감사 봉인하는 패널을 추가합니다.

이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.

## 감사 봉인 항목 요약

| 항목 | 상태 |
|------|------|
| raw API response 전체 | NOT_INCLUDED |
| 가격/재고 원본 값 | NOT_INCLUDED |
| 가격/재고 존재 여부 | PRESENCE_FLAG_ONLY |
| Token/Auth/Signature/Authorization | NOT_DISPLAYED |
| Token/raw 응답 저장 | NOT_STORED |
| DB write/upsert/update | NOT_EXECUTED |
| Worker/Queue/Adapter | LOCKED |
| 다음 단계 | PENDING_SEPARATE_APPROVAL |

## 화면 배치

```
Task 276: Read-Only Product Data Capture Result
↓
Task 277: Read-Only Product Data Capture Safety Audit Seal  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-safety-audit-seal-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-safety-audit-seal-view.test.ts` (신규) — 17 pass
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-data-capture-safety-audit-seal-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 277 패널 삽입)

## 상태

- READ-ONLY Safety Audit Seal View 전용
- Token 재발급/API 재호출/DB write/상품 수정: 없음
- Task 276 기존 변수 재사용 (중복 호출 없음)
- 기준 커밋: 8a3162d (Task 276)
