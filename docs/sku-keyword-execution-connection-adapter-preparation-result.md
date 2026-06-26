# Task 154 — Execution Connection Adapter Preparation View

## 목적

Task 153 Execution Connection Queue Preparation 다음 단계로,
Adapter 연결 준비 상태만 분리해서 실제 외부 연동 없이 read-only 기준으로 점검합니다.

## Adapter 연결 준비 분류

| 분류 | 설명 |
|------|------|
| Adapter Connection 준비 상태 | Adapter live binding / external call / mode 준비 상태 |
| Live Adapter 미연결 상태 | Live Adapter / Token / Naver API 경로의 미연결 상태 |
| Mock / Dry-run Adapter와 Live Adapter의 분리 상태 | 안전 모드와 live 모드의 분리 유지 상태 |
| Token / Naver API 연결 전 차단 상태 | Token 발급 및 Naver API 연결 전 차단 기준 |
| Worker / Queue와 Adapter의 연결 전 관계 | Worker / Queue와 Adapter가 실제 연결 전 유지하는 참조 관계 |
| 아직 Adapter가 실제 외부 연동을 수행하지 않는 이유 | 승인, Queue, Worker, DB, Live Adapter 차단 사유 |
| Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 상태 | 실제 외부 연동을 막는 미연결 구성 요소 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 Adapter Connection Preparation View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Queue Processor 연결 없음
- Adapter 연결 없음
- Token 발급 없음
- Naver API 호출 없음
- POST API 추가 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-connection-adapter-preparation-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-connection-adapter-preparation-view.test.ts` (신규)
3. `docs/sku-keyword-execution-connection-adapter-preparation-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 154 패널 추가)

## 화면 배치

```
Task 153: Execution Connection Queue Preparation
↓
Task 154: Execution Connection Adapter Preparation  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~154 전체)
- Worker / Queue / Adapter / Token / Naver API / DB Write: 미연결
- 기준 커밋: 0463a5b (Task 153)
