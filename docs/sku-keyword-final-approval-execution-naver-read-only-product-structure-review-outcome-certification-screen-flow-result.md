# Task 287 — Naver Read-Only Product Structure Review Outcome Certification

## 목적

Task 285의 read-only 상품 구조 검토 결과와 Task 286의 안전 감사 봉인을 바탕으로
다음 `read-only 옵션/추가상품 구조 확장 설계` 후보 여부를 인증하는 패널을 추가합니다.

이번 Task는 결과 인증 표시 전용이며, 새 API 호출, Token 재발급,
상품 조회 API 재호출, 상품 구조 검토 재수행, 상품 수정 API 호출,
가격/재고 변경, DB write/upsert/update를 수행하지 않습니다.

## 인증 기준

- 입력 기준: Task 285 `readOnlyProductStructureReviewStatus`
- 참조 기준: Task 286 안전 감사 봉인 + Task 284 승인 패킷 + Task 281 요약 검토 + Task 276 캡처 결과
- COMPLETE/PARTIAL: 다음 read-only 옵션/추가상품 구조 확장 설계 후보
- BLOCKED: 원인별 재확인 필요 상태
- 옵션/추가상품 구조: 현재 캡처 데이터에 없으므로 추정하지 않음

## 화면 배치

```text
Task 286 Naver Read-Only Product Structure Review Safety Audit Seal
Task 287 Naver Read-Only Product Structure Review Outcome Certification
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-outcome-certification-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-outcome-certification-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-product-structure-review-outcome-certification-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 287 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 287 패널 추가)
