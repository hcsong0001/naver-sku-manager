# Task 148 — Execution Readiness Worker Audit Log Preview View

## 목적

Task 147 Worker Result Persistence Guard 다음 단계로,
향후 Worker가 남겨야 할 감사 로그 계획을 실제 저장 없이 read-only 기준으로 미리보기합니다.

## 감사 로그 계획 분류

| 분류 | 설명 |
|------|------|
| Worker 감사 로그 기록 계획 | 판정, 중단/차단 근거, 기록 계획 참조, 보호선 상태 |
| 결과 기록 계획과 감사 로그의 분리 상태 | 결과 기록 계획과 감사 로그 계획의 역할 분리 |
| DB write 없이 표시되는 감사 로그 미리보기 | 저장 없는 UI 미리보기 |
| Worker Decision Preview / Result Recording Preview / Persistence Guard 참조 정보 | 감사 로그 계획의 근거가 되는 참조 정보 |
| 실제 저장·실행으로 오해하면 안 되는 항목 | 실제 audit log write 및 실행 미수행 |
| 실제 미연결 상태 | Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 감사 로그 계획 View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Naver API 호출 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-readiness-worker-audit-log-preview-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-readiness-worker-audit-log-preview-view.test.ts` (신규)
3. `docs/sku-keyword-execution-readiness-worker-audit-log-preview-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 148 패널 추가)

## 화면 배치

```
Task 147: Execution Readiness Worker Result Persistence Guard
↓
Task 148: Execution Readiness Worker Audit Log Preview  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~148 전체)
- 운영 DB write 권한: 닫혀 있음
- 기준 커밋: 4fa6c1b (Task 147)
