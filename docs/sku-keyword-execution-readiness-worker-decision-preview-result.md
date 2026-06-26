# Task 145 — Execution Readiness Worker Decision Preview View

## 목적

Task 144 Worker Stop Conditions 다음 단계로,
Worker가 실제 실행 없이 어떤 판정을 내려야 하는지 read-only 기준으로 정리합니다.

## 판정 미리보기 분류

| 분류 | 설명 |
|------|------|
| Worker 실행 전 예상 판정 | 실행 중단 유지, 실행 불가, read-only 미리보기 |
| 중단 조건 충족 여부 | Payload 검증 실패, 승인 대기/차단, 미연결 시스템 기준 |
| Queue Payload 검증 상태 | 필수 키 검증 실패 시 예상 거부 판정 |
| 승인 대기/차단 판정 | 승인 대기 및 차단 상태 지속 시 실행 불가 유지 |
| 실행 불가 사유 요약 | 실행 금지 근거를 Worker 판정 요약으로 노출 |
| 실제 실행하지 않는 이유 | View Contract 전용, enqueue/API/DB write 미수행 |
| 미연결 상태 | Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 판정 미리보기 View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Naver API 호출 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-readiness-worker-decision-preview-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-readiness-worker-decision-preview-view.test.ts` (신규)
3. `docs/sku-keyword-execution-readiness-worker-decision-preview-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 145 패널 추가)

## 화면 배치

```
Task 144: Execution Readiness Worker Stop Conditions
↓
Task 145: Execution Readiness Worker Decision Preview  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~145 전체)
- 기준 커밋: fa59052 (Task 144)
