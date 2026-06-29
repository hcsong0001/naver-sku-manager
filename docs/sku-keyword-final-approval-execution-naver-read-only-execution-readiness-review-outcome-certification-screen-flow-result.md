# Task 303 - Naver Read-Only Execution Readiness Review Outcome Certification

## 목적

Task 301 실행 준비 검토 결과와 Task 302 안전 감사 봉인을 바탕으로,
현재 실행 준비 검토 결과가 다음 read-only 최종 실행 승인 패킷 후보인지
인증하는 Task 303 패널을 추가했습니다.

## 표시 원칙

- COMPLETE/PARTIAL 상태만 다음 read-only 최종 실행 승인 패킷 후보로 인증합니다.
- BLOCKED 상태는 차단 원인과 재확인 필요 사항만 표시합니다.
- 실제 실행 준비 완료 처리, 실제 실행 승인, 실제 실행, 실행 버튼 추가를 수행하지 않습니다.
- Worker / Queue / Adapter 연결을 추가하지 않습니다.
- 설계안 DB 저장, 설계안 실행용 복사, DB write / upsert / update를 수행하지 않습니다.
- 기존 캡처 데이터와 기존 요약 검토 결과만 사용합니다.
- Token/Auth/Signature/Authorization 값과 raw API response는 표시하거나 저장하지 않습니다.

## 화면 배치

1. Task 302 Naver Read-Only Execution Readiness Review Safety Audit Seal
2. Task 303 Naver Read-Only Execution Readiness Review Outcome Certification
3. BatchJob 실행 결과

## 구현 파일

- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-outcome-certification-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-outcome-certification-view.test.ts`
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
