# Task 146 — Execution Readiness Worker Result Recording Preview View

## 목적

Task 145 Worker Decision Preview 다음 단계로,
향후 Worker가 실제 실행 후 어떤 결과를 기록해야 하는지 read-only 기준으로 미리보기합니다.

## 결과 기록 계획 분류

| 분류 | 설명 |
|------|------|
| Worker 예상 판정 이후 기록될 결과 항목 | 결과 코드, 실행 불가 사유, 중단/차단 구분, 참조 메타데이터 |
| 성공/중단/차단/실패 상태별 기록 계획 | 상태별 결과 기록 구조 미리보기 |
| Queue Payload / Worker Contract / Decision Preview 참조 정보 | 결과 기록 계획의 근거가 되는 참조 정보 |
| 실제 DB Write 없이 표시되는 결과 기록 미리보기 | read-only 결과 기록 계획만 표시 |
| 운영 DB write 금지 상태 | 운영 DB write와 Prisma mutation 미연결 상태 유지 |
| 실제 미연결 상태 | Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 결과 기록 계획 View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Naver API 호출 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-readiness-worker-result-recording-preview-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-readiness-worker-result-recording-preview-view.test.ts` (신규)
3. `docs/sku-keyword-execution-readiness-worker-result-recording-preview-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 146 패널 추가)

## 화면 배치

```
Task 145: Execution Readiness Worker Decision Preview
↓
Task 146: Execution Readiness Worker Result Recording Preview  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~146 전체)
- 운영 DB write 권한: 닫혀 있음
- 기준 커밋: b9ad64a (Task 145)
