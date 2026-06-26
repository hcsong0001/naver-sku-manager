# Task 152 — Execution Connection Worker Preparation View

## 목적

Task 151 Execution Connection Preparation Overview 다음 단계로,
Worker 연결 준비 상태만 분리해서 실제 실행 없이 read-only 기준으로 점검합니다.

## Worker 연결 준비 분류

| 분류 | 설명 |
|------|------|
| Worker Connection 준비 상태 | Worker runtime / processor / orchestration 준비 상태 |
| Worker Contract 참조 상태 | Worker 연결 준비가 참조하는 계약 기준 |
| Worker Input Validation 참조 상태 | Worker 입력 검증 기준 참조 |
| Worker Stop Conditions 참조 상태 | Worker 실행 중단 조건 참조 |
| Worker Decision Preview 참조 상태 | Worker 예상 판정 참조 |
| 아직 Worker가 실제 실행되지 않는 이유 | 별도 승인, 금지 상태, 실행 차단 사유 |
| Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 상태 | 실제 실행을 막는 미연결 구성 요소 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 Worker Connection Preparation View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Queue Processor 연결 없음
- Adapter 연결 없음
- Token 발급 없음
- Naver API 호출 없음
- POST API 추가 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-connection-worker-preparation-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-connection-worker-preparation-view.test.ts` (신규)
3. `docs/sku-keyword-execution-connection-worker-preparation-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 152 패널 추가)

## 화면 배치

```
Task 151: Execution Connection Preparation Overview
↓
Task 152: Execution Connection Worker Preparation  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~152 전체)
- Worker / Queue / Adapter / Token / Naver API / DB Write: 미연결
- 기준 커밋: 5a67f4b (Task 151)
