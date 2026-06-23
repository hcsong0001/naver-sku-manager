# FinalApproval Execution Worker Restricted DB-Connected Dry Run Design

## 1. 작업명

FinalApproval Execution Worker Restricted DB-Connected Dry Run Design

---

## 2. 현재까지 완료된 검증 요약

| 단계 | 내용 | 결과 |
|------|------|------|
| Worker startup 검증 | Worker 프로세스 정상 기동 확인 | 완료 |
| Worker idle stability 검증 | Worker 유휴 상태 안정성 확인 | 완료 |
| Worker job processing dry-run design | Processor 경로 설계 완료 | 완료 |
| Limited queue enqueue dry-run evidence | Queue Job 등록 원본 로그 확보 | 완료 |
| Limited queue dry-run evidence 재검증 | 원본 로그 기반 재검증 완료 | 완료 |
| jobName mismatch 해결 | `sku-keyword-final-approval-execution` 정상 확인 | 완료 |
| Worker → Processor 경로 진입 확인 | `DB_REVALIDATION_FAILED` 안전 실패 경로 확인 | 완료 |

기준 커밋: `f569738d21d3937c4917f668ef564fd460c4ed5b`

확인된 정상 경로:
- queue: `final-approval-execution`
- jobName: `sku-keyword-final-approval-execution`
- jobId: `final-approval-worker-limited-dry-run-evidence-003`
- mode: `MOCK`
- source: `EXECUTION_API`
- Processor 진입 확인
- Mock Revalidation Repository 호출 확인
- `DB_REVALIDATION_FAILED`: 현재 단계에서 예상 가능한 안전 실패로 판정

---

## 3. 이번 설계의 목적

Mock Revalidation Repository 대신 **테스트 DB fixture를 사용하는 제한적 DB-connected dry-run**을 설계한다.

실제 Worker 생명주기와 Queue 흐름은 그대로 유지하되, 다음을 완전히 차단한다:
- 운영 DB / 운영 Redis 접근
- Naver API 호출
- LIVE adapter 사용
- 무제한 DB write

현재 Worker → Processor 경로까지는 검증 완료 상태이다. 다음 단계는 Revalidation Repository를 실제 테스트 DB에 연결하여 **Guard → TransitionApply 전체 경로**를 검증하는 것이다.

---

## 4. 절대 금지 범위

| 범주 | 금지 항목 |
|------|----------|
| DB | 운영 DB 접근, 운영 DB host/name/user 패턴, DB write 범위 초과 |
| Redis | 운영 Redis 접근, Redis FLUSHDB, Redis port 56379 외 포트 |
| Naver API | Naver API 호출, LIVE adapter 사용, 실제 상품 변경 |
| Prisma | migrate dev, db push, migrate reset |
| 환경 변수 | DATABASE_URL 원문 출력 금지, REDIS_URL 원문 출력 금지 |
| 운영 데이터 | 운영 FinalApproval 접근, 운영 BatchJob 접근 |

---

## 5. 허용 가능한 DB 범위 비교

### A안: Transaction Rollback 방식

테스트 DB에 연결하여, 트랜잭션 경계 내부에서 Revalidation과 TransitionApply 흐름을 실행한 후 마지막에 `rollback`한다.

**실행 흐름:**
```
테스트 DB 연결
→ tx.begin
→ revalidationRepository.findSnapshotForWorkerJobRevalidation(...)
→ Guard 평가
→ TransitionApply plan 생성
→ adapter.transaction(...) 내부 실행
→ tx.rollback
```

**장점:**
- DB 오염 완전 방지
- fixture 복구 스크립트 불필요

**단점:**
- Worker/BullMQ 비동기 생명주기와 트랜잭션 경계가 복잡하게 얽힐 수 있음
- Prisma `$transaction`이 중첩될 경우 예외 처리 복잡도 증가
- BullMQ Job 완료 이벤트(`completed`)와 트랜잭션 rollback 타이밍 불일치 가능성

### B안: Single-shot Test Fixture Write 방식 (권장)

테스트 DB에 fixture를 명시적으로 준비하고, 단발성 Job 1건만 처리한다. 처리 전/후 상태 snapshot을 검증하고, 별도 restore script로 fixture를 원복한다.

**실행 흐름:**
```
fixture 사전 확인 (verify-before script)
→ enqueue 1건
→ Worker 수신 및 Processor 실행
→ DB Revalidation (테스트 DB)
→ Guard 평가
→ TransitionApply plan 실행 (NaverApiBatchJob/Item 상태 변경)
→ fixture 사후 확인 (verify-after script)
→ fixture 복구 (restore script)
```

**장점:**
- Worker의 실제 생명주기(startup → receive → process → complete/fail)와 가장 유사
- 전체 파이프라인 검증 가능
- 각 단계 로그 관찰 용이

**단점:**
- fixture 복구 기준이 반드시 명확해야 함
- verify-before / verify-after / restore script 작성 필요

---

## 6. 권장안

**B안, Single-shot Test Fixture Write 방식을 권장한다.**

이유:
1. Worker의 실제 BullMQ 생명주기를 그대로 유지하면서 전체 경로를 검증한다.
2. 현재까지 확인된 파이프라인(`enqueue → Worker 수신 → Processor 진입`)의 자연스러운 연장선이다.
3. fixture 복구는 restore script로 명확하게 설계 가능하다.
4. TransitionApply가 `NaverApiBatchJob` / `NaverApiBatchJobItem` 테이블에만 write하고, `NaverApiBatchFinalApproval` write는 어댑터 레벨에서 차단(`BLOCKED_WRITE_TABLES`)되어 있다.

> **중요:** 실제 DB-connected dry-run 실행은 이번 설계 문서 작성 단계에서 허용되지 않는다. 실제 실행은 **다음 별도 지시**에서만 진행한다.

---

## 7. Restricted DB-Connected Dry Run 필수 방어 조건

### 7.1 환경 변수 조건

| 변수 | 허용 값 | 비고 |
|------|---------|------|
| `NODE_ENV` | `test` 만 허용 | `production`, `development` 차단 |
| `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` | `true` | |
| `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER` | `bullmq` | |
| `FINAL_APPROVAL_EXECUTION_QUEUE_NAME` | `final-approval-execution` | |
| `REDIS_URL` | `localhost` 또는 `127.0.0.1` 만 허용 | 외부 Redis 차단 |
| Redis port | `56379` 만 허용 | 운영 Redis 포트 차단 |
| `DATABASE_URL` | 테스트 DB만 허용 | 운영 DB host/name/user 패턴 차단 |

### 7.2 Payload 조건

| 항목 | 제약 |
|------|------|
| `finalApprovalId` | fixture 전용 ID만 허용 |
| `jobId` | 검증 전용 고정값만 허용 (`*-restricted-db-dry-run-*` 형식 권장) |
| `mode` | `MOCK` 또는 `DRY_RUN_READY` 만 허용 |
| enqueue count | 1건만 허용 |

### 7.3 Adapter 조건

| 항목 | 제약 |
|------|------|
| Naver API adapter | `mock` 또는 `disabled` 만 허용 |
| LIVE adapter 감지 | 즉시 실패 처리 |
| TransitionApply adapter | `dry-run` mode만 허용 |

### 7.4 DB Write 범위 제약

현재 코드에서 이미 적용된 방어:

```typescript
// sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service.ts

const BLOCKED_WRITE_TABLES = new Set([
  'NaverApiBatchFinalApproval',    // write 차단
  'NaverApiBatchFinalApprovalItem', // write 차단
]);

const SUPPORTED_WRITE_TABLES = new Set([
  'NaverApiBatchJob',     // write 허용 (fixture 범위 내)
  'NaverApiBatchJobItem', // write 허용 (fixture 범위 내)
]);
```

허용되는 write:
- `NaverApiBatchJob`: `APPROVED → EXECUTING` 상태 변경 (fixture ID만)
- `NaverApiBatchJobItem`: `READY → EXECUTING` 상태 변경 (fixture ID만)

차단되는 write:
- `NaverApiBatchFinalApproval`: 어댑터 레벨 차단
- `NaverApiBatchFinalApprovalItem`: 어댑터 레벨 차단

---

## 8. 실행 전 검증 조건 (Pre-flight Checklist)

실제 실행 전 모든 항목이 통과되어야 한다.

```
[ ] git status clean (uncommitted changes 없음)
[ ] 최신 커밋 확인 (f569738 이후)
[ ] Docker 실행 중 확인
[ ] Redis PONG 확인 (원문 URL 없이 boolean 출력)
[ ] 테스트 Redis port = 56379 확인
[ ] 테스트 DB 연결 가능 여부 (성공/실패 boolean만 출력, URL 원문 출력 금지)
[ ] fixture FinalApproval 존재 여부 확인
[ ] fixture BatchJob 존재 여부 확인 (status = APPROVED)
[ ] fixture BatchJobItem 존재 여부 확인 (status = READY, count > 0)
[ ] ACTIVE FinalApproval이 fixture ID임을 확인
[ ] 대상 fixture가 운영 데이터가 아님을 확인 (ID 패턴 검사)
[ ] 운영 DB host 패턴 불일치 확인
[ ] Naver API adapter = mock or disabled 확인
[ ] LIVE adapter 미사용 확인
```

---

## 9. 실행 중 관찰 로그 항목

Worker 실행 시 아래 로그가 모두 출력되어야 한다.

```
[Worker] Worker startup
[Worker] Listening on queue: final-approval-execution
[Worker] Received Job - id: {jobId}, name: {jobName}, queue: {queueName}
[Worker] Payload Fields: finalApprovalId, actorId, idempotencyKey, requestedAt, source, mode
[Worker] mode: {mode}, source: {source}, finalApprovalId: {finalApprovalId}
[DB Revalidation] Started for finalApprovalId: {id}
[DB Revalidation] FinalApproval status: ACTIVE ← 성공 조건
[DB Revalidation] BatchJob status: APPROVED ← 성공 조건
[DB Revalidation] READY item count: {n} ← n > 0 성공 조건
[Guard] evaluateFinalApprovalExecutionTransitionGuard called
[Guard] result.allowed: true ← 성공 조건
[TransitionApply] plan.allowed: true
[TransitionApply] plan.dbWriteRequired: true
[TransitionApply] adapter.transaction() started
[TransitionApply] updateBatchJobStatus: {batchJobId} APPROVED → EXECUTING
[TransitionApply] updateBatchJobItemStatus: {itemId} READY → EXECUTING (×n)
[TransitionApply] adapter.transaction() committed
[Worker] Processor Finished - success: true
[Worker Event] Job completed - id: {jobId}
```

실패 시 예상 로그:
```
[DB Revalidation] FinalApproval not found → DB_REVALIDATION_FAILED (fixture 미준비 시)
[Guard] result.allowed: false → TRANSITION_GUARD_BLOCKED
[TransitionApply] TRANSACTION_FAILED (DB 연결 실패 시)
[Worker Event] Job failed - id: {jobId}
```

---

## 10. 실행 후 검증 조건 (Post-flight Checklist)

```
[ ] Job 상태: completed (BullMQ)
[ ] FinalApproval 상태: ACTIVE 유지 (변경 없음)
[ ] BatchJob 상태: APPROVED → EXECUTING 변경 확인
[ ] BatchJobItem 상태: READY → EXECUTING 변경 확인 (count 일치)
[ ] FinalApprovalItem 상태: 변경 없음
[ ] transition apply audit: 정상 write 범위 내 확인
[ ] DB write 범위: fixture ID만, 허용 테이블만
[ ] Naver API 호출 없음 확인
[ ] Redis 사용 범위: 테스트 Redis 56379만
[ ] 환경 변수 출력 없음 확인 (DATABASE_URL, REDIS_URL 원문 없음)
[ ] 로그 파일 정리 여부 확인
[ ] fixture restore script 실행 완료
[ ] BatchJob 상태: EXECUTING → APPROVED 복구 확인
[ ] BatchJobItem 상태: EXECUTING → READY 복구 확인
```

---

## 11. 실패 시 즉시 중단 조건

아래 중 하나라도 감지되면 즉시 중단하고 현 상태를 기록한다.

| 조건 | 중단 이유 |
|------|----------|
| 운영 DB 의심 URL 감지 | 운영 데이터 오염 위험 |
| 운영 Redis 의심 URL 감지 | 운영 큐 오염 위험 |
| Naver API 호출 흔적 감지 | 실제 상품 변경 위험 |
| LIVE adapter 감지 | 운영 write 위험 |
| fixture ID 불일치 | 비fixture 데이터 write 위험 |
| enqueue count 2건 이상 | 중복 처리 위험 |
| DB write 범위 초과 (`NaverApiBatchFinalApproval` 등) | 허용 범위 초과 |
| Worker crash (비정상 종료) | 실행 상태 불명확 |
| payload parser 실패 | 파이프라인 깨짐 |
| Guard 실패 (`TRANSITION_GUARD_BLOCKED`) | 전제 조건 미충족 |
| TransitionApply 실패 (`TRANSACTION_FAILED`) | DB write 중간 실패 |
| restore script 실패 | fixture 복구 불가 |
| rollback 불가 | 테스트 DB 상태 오염 |

---

## 12. 다음 실제 실행 단계에서 필요한 script 후보

> 이번 작업에서는 **구현하지 않는다.** 후보 목록만 기록한다.

```text
scripts/verify-final-approval-execution-restricted-db-fixture-before.ts
  - fixture FinalApproval / BatchJob / BatchJobItem 상태 확인
  - ACTIVE / APPROVED / READY 조건 검사
  - 운영 데이터 여부 확인 (ID 패턴)

scripts/enqueue-final-approval-execution-worker-restricted-db-dry-run-job.ts
  - 테스트 DB fixture ID를 payload에 포함
  - mode: DRY_RUN_READY
  - jobId: final-approval-worker-restricted-db-dry-run-001 (고정값)
  - enqueue 1건만 허용

scripts/verify-final-approval-execution-restricted-db-fixture-after.ts
  - BatchJob status = EXECUTING 확인
  - BatchJobItem status = EXECUTING 확인 (count 일치)
  - FinalApproval status = ACTIVE 유지 확인
  - FinalApprovalItem 변경 없음 확인

scripts/restore-final-approval-execution-restricted-db-fixture.ts
  - BatchJob: EXECUTING → APPROVED 복구
  - BatchJobItem: EXECUTING → READY 복구
  - FinalApproval: 변경 없음 (복구 불필요)
  - 복구 후 상태 재확인
```

---

## 13. fixture 후보

> 실제 finalApprovalId나 DB 상태는 이번 단계에서 조회하지 않는다.
> 기존 테스트 파일 및 문서 참고 기준 후보만 정리한다.

| 항목 | 후보 값 | 비고 |
|------|---------|------|
| finalApprovalId | `test-db-revalidation-final-approval-001` | 기존 Mock에서 사용된 패턴 |
| batchJobId | `test-batch-job-001` | fixture 전용 추정 |
| batchJobItemId | `test-batch-job-item-001`, `002`, `003` | READY 상태 fixture |
| status 조건 | FinalApproval=ACTIVE, BatchJob=APPROVED, Items=READY | |
| idempotencyKey | `restricted-db-dry-run-idempotency-001` | 고정값 |

실제 실행 전 `verify-before script`로 fixture 존재 여부를 확인하고,
존재하지 않으면 fixture seed script를 별도 설계해야 한다.

---

## 14. 코드 구조 분석 요약

### Worker 경로 (확인 완료)

```
scripts/final-approval-execution-worker.ts
→ createFinalApprovalExecutionWorkerRuntime()
→ BullMQ Worker (queue: final-approval-execution)
→ deps.processor(plainJob)
→ processFinalApprovalExecutionWorkerJob(job, deps)
```

### Processor 경로 (확인 완료)

```
processFinalApprovalExecutionWorkerJob
→ runFinalApprovalExecutionQueueProcessor(job, { revalidationRepository })
  → payload 검증 → DB Revalidation → Guard (db-read-guard)
→ revalidationRepository.findSnapshotForWorkerJobRevalidation(...)
→ evaluateFinalApprovalExecutionTransitionGuard(...)
→ buildFinalApprovalExecutionTransitionApplyPlan(...)
→ applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(...)
  → adapter.transaction(tx => ...)
  → tx.updateBatchJobStatus(...)
  → tx.updateBatchJobItemStatus(...)
```

### DB-connected 전환 시 교체 지점

| 현재 (Mock) | 교체 대상 (DB-connected) |
|------------|------------------------|
| Mock Revalidation Repository | 실제 테스트 DB Prisma Revalidation Repository |
| MOCK mode | DRY_RUN_READY mode |
| Mock TransitionApply Adapter | `createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(prisma)` |

---

## 15. 최종 판정

이번 문서는 **설계 완료**까지만 목표로 한다.

- DB 접속: 없음
- Redis 접속: 없음
- Worker 실행: 없음
- Queue enqueue: 없음
- Naver API 호출: 없음
- 운영 데이터 접근: 없음

실제 Restricted DB-Connected Dry Run 실행은 **다음 별도 지시**에서만 진행한다.

권장 실행 순서 (다음 지시 기준):
1. fixture 존재 여부 확인 (verify-before script)
2. Worker 기동 (restricted-db mode, NODE_ENV=test)
3. enqueue 1건 (restricted-db-dry-run job)
4. Worker 처리 로그 관찰
5. fixture 상태 사후 확인 (verify-after script)
6. fixture 복구 (restore script)
7. 복구 상태 재확인
8. 설계 문서 및 증거 커밋
