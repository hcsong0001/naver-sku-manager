# Task 144 — Execution Readiness Worker Stop Conditions View

## 목적

Task 143 Worker Input Validation 다음 단계로,
향후 Worker가 실제 실행 전에 반드시 중단해야 하는 조건을 read-only 기준으로 정리합니다.

## 중단 조건 분류

| 분류 | 설명 |
|------|------|
| Queue Payload 검증 실패 | 필수 항목 누락 또는 유효하지 않은 Payload 구조 |
| 승인 대기 상태 | 최종 승인 미완료, 부분 승인, 기한 초과 |
| 차단 상태 | 검증 실패로 인한 명시적 차단 상태 |
| 미연결 시스템 | Token / Naver API / Adapter / DB Write / Queue 미연결 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 중단 조건 View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Naver API 호출 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-readiness-worker-stop-conditions-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-readiness-worker-stop-conditions-view.test.ts` (신규)
3. `docs/sku-keyword-execution-readiness-worker-stop-conditions-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 144 패널 추가)

## 화면 배치

```
Task 143: Execution Readiness Worker Input Validation
↓
Task 144: Execution Readiness Worker Stop Conditions  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~144 전체)
- 기준 커밋: 2174b4c (Task 143)
