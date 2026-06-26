# Task 153 — Execution Connection Queue Preparation View

## 목적

Task 152 Execution Connection Worker Preparation 다음 단계로,
Queue 연결 준비 상태만 분리해서 실제 enqueue 없이 read-only 기준으로 점검합니다.

## Queue 연결 준비 분류

| 분류 | 설명 |
|------|------|
| Queue Connection 준비 상태 | Queue enqueue / processor / port 연결 준비 상태 |
| Queue Payload Preview 참조 상태 | Queue payload 미리보기 기준 참조 |
| Queue Enqueue Eligibility 참조 상태 | 실제 enqueue 가능성 검토 기준 참조 |
| Queue Contract Overview 참조 상태 | 통합 Queue 계약 기준 참조 |
| Worker Contract와 Queue Contract의 연결 전 관계 | Worker / Queue 계약이 실제 연결 전 어떤 참조 관계인지 표시 |
| 아직 Queue enqueue가 실제 수행되지 않는 이유 | 별도 승인, 차단 상태, enqueue 금지 사유 |
| Worker / Queue / Adapter / Token / Naver API / DB Write 미연결 상태 | 실제 enqueue와 실행을 막는 미연결 구성 요소 |

## 실제 실행으로 오해하면 안 되는 항목

- 이 화면은 Queue Connection Preparation View Contract만 제공합니다
- 실제 Worker 실행 없음
- Queue enqueue 없음
- Queue Processor 연결 없음
- Adapter 연결 없음
- Token 발급 없음
- Naver API 호출 없음
- POST API 추가 없음
- DB Write 없음

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-connection-queue-preparation-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-connection-queue-preparation-view.test.ts` (신규)
3. `docs/sku-keyword-execution-connection-queue-preparation-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 153 패널 추가)

## 화면 배치

```
Task 152: Execution Connection Worker Preparation
↓
Task 153: Execution Connection Queue Preparation  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY View Contract 전용
- 실행 권한: 닫혀 있음 (Task 41~153 전체)
- Worker / Queue / Adapter / Token / Naver API / DB Write: 미연결
- 기준 커밋: 03abfd5 (Task 152)
