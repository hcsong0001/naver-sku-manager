# Task 286 — Naver Read-Only Product Structure Review Safety Audit Seal

## 목적

Task 285에서 표시한 read-only 상품 구조 검토 결과가 안전한 제한 범위 안에서만
구성됐는지 감사 봉인하는 패널을 추가합니다.

이번 Task에서는 기존 캡처 데이터와 기존 요약 검토 결과만 사용하며,
새 API 호출, Token 재발급, 상품 조회 API 재호출, 상품 구조 검토 재수행,
상품 수정 API 호출, 가격/재고 변경, DB write/upsert/update를 수행하지 않습니다.

## 감사 봉인 기준

- 입력 기준: Task 285 `readOnlyProductStructureReviewStatus`
- 참조 기준: Task 284 승인 패킷 + Task 281 요약 검토 + Task 276 캡처 결과
- 확인 항목:
  `기존 캡처 데이터만 사용`, `기존 요약 검토 결과만 사용`,
  `옵션/추가상품 구조 미추정`, `가격/재고 원본 값 제외`,
  `raw API response 비표시/비저장`, `Token/Auth/Signature/Authorization 값 비노출`

## 화면 배치

```text
Task 285 Naver Read-Only Product Structure Review Result
Task 286 Naver Read-Only Product Structure Review Safety Audit Seal
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-safety-audit-seal-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-safety-audit-seal-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-safety-audit-seal-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 286 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 286 패널 추가)
