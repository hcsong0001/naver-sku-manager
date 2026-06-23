# FinalApproval Execution Result Recording Design

## 1. 목적

FinalApproval Execution Worker가 `EXECUTING` 전환만 수행하는 현재 상태에서 한 단계 더 나아가, 향후 Naver API 실행 결과를 **안전하게, idempotent하게, 감사 추적 가능하게** DB에 기록하는 구조를 설계한다.

이번 단계에서는:
- 실제 Naver API 호출을 구현하지 않는다.
- LIVE 실행을 수행하지 않는다.
- Pure function / service / test 레이어까지만 구현하고, DB write adapter는 다음 단계로 미룬다.
- Prisma schema 변경이 필요한 경우 migration을 즉시 만들지 않고 먼저 변경안·대안·위험을 제시한다.

---

## 2. 현재 상태 (기준 커밋: 42e1c59)

| 단계 | 상태 |
|------|------|
| FinalApproval ACTIVE 검증 | 완료 |
| BatchJob APPROVED 검증 | 완료 |
| BatchJobItem READY 검증 | 완료 |
| BatchJob `APPROVED → EXECUTING` write | 완료 (restricted-db E2E 검증됨) |
| BatchJobItem `READY → EXECUTING` write | 완료 (restricted-db E2E 검증됨) |
| Naver API 호출 | **미구현** |
| 실행 결과 기록 (`EXECUTING → EXECUTED/FAILED`) | **미구현** |

현재 Worker는 `EXECUTING` 전환 후 프로세서가 종료된다. Naver API 실행 결과와 상태 완료 기록이 없다.

---

## 3. 검토 항목 1 — 어느 모델에 기록할지

### 3.1 기존 모델 분석

| 모델 | 역할 | 실행 결과 기록 가능성 |
|------|------|----------------------|
| `NaverApiBatchJob` | 전체 Job 집계 상태 | **적합** — `status`, `successItems`, `failedItems`, `executedAt`, `metadata` 이미 있음 |
| `NaverApiBatchJobItem` | 개별 항목 실행 단위 | **적합** — `status`, `attemptCount`, `errorCode`, `errorMessage`, `requestPayload`, `responsePayload` 이미 있음 |
| `NaverApiBatchFinalApproval` | 승인 artifact (불변성 유지 필요) | **부적합** — 실행 결과 기록 대상 아님; 상태는 ACTIVE/INVALIDATED/SUPERSEDED만 허용 |
| `NaverApiBatchFinalApprovalItem` | 승인 당시 item 범위 snapshot | **부적합** — 변경 불가 audit artifact |
| `NaverApiCallLog` | Naver API 개별 호출 감사 로그 | **보조 적합** — Naver API 호출 전후 payload/result 기록 위치; `batchJobItemId` relation 이미 있음 |

**결론: 별도 모델 불필요 (단기).**
기존 `NaverApiBatchJob` + `NaverApiBatchJobItem` + `NaverApiCallLog` 조합으로 완전한 실행 결과 기록이 가능하다.

### 3.2 장기: `NaverApiBatchJobExecution` 모델 검토

Worker 실행 런 단위 메타데이터 (idempotencyKey, 실행 모드, actorId, 시작/종료 시각, Worker 식별자)를 `NaverApiBatchJob.metadata` Json에 저장하는 것이 단기 해법이다. 그러나 다음 상황이 되면 별도 모델이 유리하다:

- 동일 Job에 대한 retry가 여러 번 발생하여 실행 이력을 row 단위로 추적해야 할 때
- Worker 인스턴스 식별자나 Queue 이름을 쿼리 가능하게 해야 할 때
- 감사 로그를 별도 retention 정책으로 관리해야 할 때

**현재 단계에서는 `metadata` Json 활용을 권장한다.** `NaverApiBatchJobExecution` 설계는 retry 요건이 구체화된 이후로 미룬다.

---

## 4. 검토 항목 2 — 성공/실패 상태 전환 규칙

### 4.1 Job 상태 전환

```
NaverApiBatchJobStatus:
  EXECUTING → EXECUTED        (모든 included item이 SUCCESS)
  EXECUTING → PARTIAL_SUCCESS (일부 SUCCESS, 일부 FAILED/RETRY_PENDING)
  EXECUTING → FAILED          (임계 실패: Guard 차단, 전체 item 실패, 예기치 않은 오류)
```

스키마의 `NaverApiBatchJobStatus` enum에 이미 `EXECUTED`, `PARTIAL_SUCCESS`, `FAILED`가 정의되어 있다. **schema 변경 불필요.**

### 4.2 Item 상태 전환

```
NaverApiBatchItemStatus:
  EXECUTING → SUCCESS        (Naver API 호출 성공)
  EXECUTING → FAILED         (Naver API 호출 실패, 비재시도)
  EXECUTING → RETRY_PENDING  (Naver API 호출 실패, 재시도 가능)
  EXECUTING → SKIPPED        (Guard 또는 선행 조건 실패로 호출 생략)
```

스키마의 `NaverApiBatchItemStatus` enum에 이미 모두 정의되어 있다. **schema 변경 불필요.**

### 4.3 PARTIAL_SUCCESS 기준

- included item 중 1개 이상 SUCCESS이고 1개 이상 FAILED/RETRY_PENDING이면 `PARTIAL_SUCCESS`
- SKIPPED는 중립 (SUCCESS에도 FAILED에도 포함하지 않음)
- RETRY_PENDING은 FAILED와 동일하게 집계 (아직 성공하지 않은 상태)

### 4.4 FinalApproval 상태 전환 여부

**현재 설계: FinalApproval 상태는 실행 결과에 따라 자동 전환하지 않는다.**

이유:
- `NaverApiBatchFinalApproval`은 승인 artifact이며 불변성이 중요하다.
- 현재 Transition Apply Adapter가 `NaverApiBatchFinalApproval` write를 명시적으로 차단(`BLOCKED_WRITE_TABLES`)하고 있다.
- Job이 EXECUTED되어도 FinalApproval을 SUPERSEDED로 변환하는 규칙이 확정되지 않았다.

**향후 검토 필요:**
- Job 실행 완료 후 FinalApproval을 `INVALIDATED` 또는 별도 상태(`EXECUTED`)로 전환할지
- 재실행 방지를 FinalApproval 상태로 표현할지, Job 상태로만 표현할지

---

## 5. 검토 항목 3 — 실패 원인 기록 방식

### 5.1 Job 레벨 실패 (처리 불가)

`NaverApiBatchJob.metadata` Json에 기록:

```json
{
  "executionMode": "restricted-db",
  "actorId": "...",
  "idempotencyKey": "...",
  "startedAt": "...",
  "endedAt": "...",
  "durationMs": 1234,
  "finalApprovalId": "...",
  "failureCause": "GUARD_BLOCKED",
  "failureDetail": "FinalApproval has expired"
}
```

실패 원인 코드:

| 코드 | 설명 |
|------|------|
| `PAYLOAD_VALIDATION_FAILED` | Payload 파싱/검증 실패 |
| `DB_REVALIDATION_FAILED` | DB 재검증 실패 (FinalApproval not found 등) |
| `GUARD_BLOCKED` | Transition Guard 차단 |
| `TRANSITION_APPLY_FAILED` | BatchJob/Item 상태 전환 실패 |
| `EXECUTION_TIMEOUT` | Worker 처리 시간 초과 |
| `RETRY_EXHAUSTED` | BullMQ maxAttempts 초과 |
| `UNKNOWN_ERROR` | 예기치 않은 오류 |

### 5.2 Item 레벨 실패 (Naver API)

`NaverApiBatchJobItem.errorCode` + `errorMessage`에 기록. 동시에 `NaverApiCallLog`에 전체 요청/응답 기록.

| 코드 | 설명 |
|------|------|
| `NAVER_API_FAILED` | Naver API 4xx/5xx 응답 |
| `NAVER_API_TIMEOUT` | API 호출 타임아웃 |
| `NAVER_API_RATE_LIMIT` | 429 Too Many Requests |
| `PAYLOAD_BUILD_FAILED` | API 요청 payload 구성 실패 |
| `ITEM_GUARD_FAILED` | item 단위 사전 조건 실패 |

---

## 6. 검토 항목 4 — Idempotency / 중복 실행 방지

### 6.1 현재 구현된 방어

- Transition Guard: `EXECUTING` 상태가 이미 있으면 차단 (`EXECUTING_STATE_ALREADY_PRESENT`)
- Transition Apply Adapter: `live` mode 차단 (`LIVE_ADAPTER_BLOCKED`)
- Safety Guard: non-local DB, 운영 host 패턴 차단

### 6.2 추가로 필요한 방어

**a) BullMQ Job ID 유일성 보장**

현재 enqueue script에서 고정 `jobId`를 사용하면 BullMQ가 중복 enqueue를 방지한다. 하지만 `removeOnComplete`/`removeOnFail` 설정에 따라 완료된 Job이 Queue에서 제거된 후 동일 ID로 재enqueue가 가능해진다.

권장: `idempotencyKey`를 BullMQ jobId로 사용하고, `removeOnComplete: false` (또는 충분히 긴 TTL)로 설정하여 중복 방지 윈도우를 확보.

**b) 이미 EXECUTED인 Job 재실행 차단**

현재 Guard는 EXECUTING 상태만 차단한다. `EXECUTED` / `PARTIAL_SUCCESS` 상태인 Job도 재실행을 차단해야 한다.

Transition Guard에 추가 필요:
```
if (batchJob.status === 'EXECUTED' || batchJob.status === 'PARTIAL_SUCCESS') {
  reasonCodes.push('JOB_ALREADY_COMPLETED');
}
```

**c) FinalApproval 실행 중복 방지**

동일 `finalApprovalId`에 대해 이미 EXECUTING인 Job이 있으면 새 실행을 차단. 현재 Guard에서 `batchJob.status !== 'APPROVED'` 체크로 부분적으로 방어되지만, FinalApproval 단위로 명시적인 Lock이 없다.

단기 해법: DB Revalidation 시 BatchJob status가 APPROVED인지 확인 (이미 구현됨).
장기 해법: `NaverApiBatchFinalApproval`에 실행 중 Lock 필드 추가 또는 분산 락 활용.

**d) restore 가능한 테스트 fixture와 충돌 방지**

restricted-db 모드에서는 restore script로 EXECUTING → APPROVED/READY 복구가 가능하다. 복구 전에 동일 Job이 재enqueue되면 데이터 충돌이 발생할 수 있다.

방어: verify-before에서 EXECUTING 상태 감지 시 중단 (현재 verify-before script에서 `APPROVED` 조건 체크로 구현됨).

---

## 7. 검토 항목 5 — Retry 설계

### 7.1 BullMQ 레벨 Retry

BullMQ Worker는 Job 처리 중 throw 발생 시 자동 retry를 수행한다 (`attempts`, `backoff` 옵션).

현재 Processor가 `processorResult.success === false`이면 throw하는 구조이므로, BullMQ retry가 동작한다.

**문제**: BatchJob/BatchJobItem 상태가 EXECUTING인 상태에서 retry가 시작되면 Transition Guard가 `EXECUTING_STATE_ALREADY_PRESENT`로 차단한다. 즉, 현재는 BullMQ retry가 효과가 없다.

**해결 방향 (2가지)**:

A. **재시도 전 상태 복구**: Worker `failed` event에서 자동으로 BatchJob/Item을 APPROVED/READY로 복구한 뒤 retry. 복구와 retry 사이의 race condition 방지 필요.

B. **RETRY_PENDING 우회**: EXECUTING 상태에서 RETRY_PENDING으로 전환 허용. 다음 retry는 RETRY_PENDING 상태에서 시작. Guard에 RETRY_PENDING 허용 분기 추가.

**권장: B안 (RETRY_PENDING 경로)**. 이유: 상태가 명확히 표현되고, 복구 스크립트 없이 자연스러운 재시도가 가능.

### 7.2 실패 item만 retry할지, 전체 job retry할지

- 전체 job retry: 구현이 단순하지만 이미 SUCCESS인 item도 재실행 → 중복 적용 위험
- 실패 item만 retry: item 단위 상태 관리 필요, Guard에 item 레벨 필터 추가 필요

**권장: 실패 item만 retry** (장기). 단기에는 전체 job retry로 시작하되, SUCCESS item은 `SKIPPED`로 처리.

### 7.3 Retry 허용 조건

```
Guard 추가 조건:
- batchJob.status === 'FAILED': retry 허용
- batchJobItem.status === 'RETRY_PENDING': retry 허용
- batchJobItem.status === 'SUCCESS': SKIPPED 처리 (재실행 금지)
```

---

## 8. 검토 항목 6 — Audit / Logging 설계

### 8.1 NaverApiCallLog 활용

`NaverApiCallLog`는 이미 다음 필드를 가진다:
- `batchJobItemId`: item과 연결
- `requestPayload`, `responsePayload`: API 전후 payload
- `statusCode`, `errorCode`, `errorMessage`: 결과 상태
- `attempt`, `maxAttempts`: retry 정보
- `idempotencyKey`: 중복 방지 키
- `startedAt`, `finishedAt`, `durationMs`: 타이밍

모든 Naver API 호출은 반드시 `NaverApiCallLog`에 기록해야 한다. **schema 변경 불필요.**

### 8.2 실행 모드 구분

`NaverApiBatchJob.metadata`에 `executionMode` 필드를 추가:

```json
{ "executionMode": "dry-run" | "restricted-db" | "live" }
```

### 8.3 Worker 실행 컨텍스트

`NaverApiBatchJob.metadata`에 다음 필드 포함:

```json
{
  "executionMode": "restricted-db",
  "actorId": "worker-processor",
  "idempotencyKey": "...",
  "startedAt": "...",
  "endedAt": "...",
  "durationMs": 1234,
  "finalApprovalId": "..."
}
```

**schema 변경 없이** 기존 `metadata Json?` 필드를 활용한다.

---

## 9. 검토 항목 7 — Safety Guard (이번 단계 유지)

| 항목 | 상태 |
|------|------|
| NODE_ENV=test 강제 | 유지 |
| localhost:55432 DB 포트 강제 | 유지 |
| 운영 DB host 패턴 차단 | 유지 |
| 운영 Redis 포트 차단 | 유지 |
| Naver API 호출 금지 | 유지 (API 어댑터 미구현) |
| LIVE mode 실행 금지 | 유지 (`buildExecutionResultPlan`에서 throw) |
| DATABASE_URL / REDIS_URL 원문 출력 금지 | 유지 |

---

## 10. Prisma Schema 변경 필요 여부

### 10.1 단기: 변경 불필요

아래 이유로 현재 단계에서 schema migration이 필요하지 않다:

1. Job 상태 전환에 필요한 enum 값 (`EXECUTED`, `PARTIAL_SUCCESS`, `FAILED`)이 이미 존재
2. Item 상태 전환에 필요한 enum 값 (`SUCCESS`, `FAILED`, `RETRY_PENDING`, `SKIPPED`)이 이미 존재
3. 실행 메타데이터는 `NaverApiBatchJob.metadata Json?`에 수용 가능
4. API 호출 감사는 `NaverApiCallLog`에 수용 가능

### 10.2 중기: 검토가 필요한 변경 후보

아래는 즉시 migration을 만들지 않고 **변경안으로 문서화만** 한다.

**a) `NaverApiBatchJob`에 실행 컨텍스트 필드 추가**

```prisma
model NaverApiBatchJob {
  // 기존 필드 ...
  executionStartedAt     DateTime?  // executedAt과 구분: 실행 시작 시각
  executionMode          String?    // 'dry-run' | 'restricted-db' | 'live'
  executionActorId       String?    // 실행 Actor
  executionIdempotencyKey String?   // 실행에 사용된 idempotency key
}
```

위험: 운영 DB에 migration 필요, 기존 레코드에 null 값 허용 필요.
대안: `metadata Json?`에 흡수 (현재 선택).

**b) `NaverApiBatchFinalApproval`에 실행 상태 추가**

```prisma
enum NaverApiBatchFinalApprovalStatus {
  ACTIVE
  INVALIDATED
  SUPERSEDED
  EXECUTED  // ← 추가 후보
}
```

위험: FinalApproval의 불변성 원칙과 충돌 가능. 실행 결과는 Job에서 관리하는 것이 더 자연스럽다.
결론: **추가하지 않는 것을 권장.**

**c) `NaverApiBatchJobExecution` 신규 모델**

```prisma
model NaverApiBatchJobExecution {
  id               String   @id @default(uuid())
  jobId            String
  finalApprovalId  String
  idempotencyKey   String   @unique
  executionMode    String
  actorId          String
  startedAt        DateTime
  endedAt          DateTime?
  outcome          String?  // EXECUTED | PARTIAL_SUCCESS | FAILED | IN_PROGRESS
  successCount     Int      @default(0)
  failedCount      Int      @default(0)
  skippedCount     Int      @default(0)
  errorCode        String?
  errorMessage     String?
  createdAt        DateTime @default(now())
  job              NaverApiBatchJob @relation(...)
}
```

위험: 새 테이블 추가, migration 필요, retry 이력 관리 복잡도 증가.
적합 시점: retry 이력이 2건 이상 발생하는 use case가 생긴 이후.

---

## 11. 구현 완료된 Pure Function Layer

### 11.1 새로 추가된 파일

```text
src/types/sku-keyword-final-approval-execution-result-recording.types.ts
  - ExecutionMode, ItemExecutionResult, JobExecutionInput
  - ExecutionResultPlan, JobResultUpdate, ItemResultUpdate
  - ExecutionResultSummary, JobExecutionMetadata

src/services/sku-keyword-final-approval-execution-result-recording.service.ts
  - buildExecutionResultPlan(input): ExecutionResultPlan
  - live mode: throw (hard block)
  - dry-run mode: plan computed, applicable=false
  - TRANSITION_ONLY (empty items): applicable=false
  - restricted-db mode: applicable=true

src/services/sku-keyword-final-approval-execution-result-recording.test.ts
  - 27개 단위 테스트, 전부 통과
  - DB 접근 없음
```

### 11.2 `buildExecutionResultPlan` 핵심 동작

```
입력: JobExecutionInput (itemResults 배열, 모드, idempotencyKey 등)
↓
1. live mode → throw (안전 차단)
2. dry-run mode → applicable=false 반환
3. empty items → TRANSITION_ONLY, applicable=false 반환
4. restricted-db / items 있음:
   ├─ outcome 계산: EXECUTED / PARTIAL_SUCCESS / FAILED
   ├─ jobUpdate 구성: newStatus, counts, metadataUpdate
   └─ itemUpdates 구성: newStatus, errorCode per item
```

---

## 12. 다음 단계 (별도 지시에서 구현)

### 12.1 즉시 가능한 단계

1. **Result Recording Prisma Adapter 구현**
   - `buildExecutionResultPlan` 결과를 받아 실제 DB write 수행
   - `NaverApiBatchJob.status`, `successItems`, `failedItems`, `metadata` 업데이트
   - `NaverApiBatchJobItem.status`, `errorCode`, `errorMessage` 업데이트
   - 테스트 DB에서 restricted-db E2E 검증

2. **Transition Guard 보완**
   - `EXECUTED` / `PARTIAL_SUCCESS` Job 재실행 차단
   - `RETRY_PENDING` Item 재시도 허용 분기

3. **Worker Processor 통합**
   - `processFinalApprovalExecutionWorkerJob`에서 Transition Apply 이후 Result Recording 연결

### 12.2 Naver API 구현 전 필요한 단계

4. **NaverApiCallLog write adapter 구현** (restricted-db 기준)
5. **Mock Naver API adapter** (call을 기록하되 실제 API는 호출하지 않음)
6. **Naver API 호출 전후 payload 구성 로직**

### 12.3 현재 Safety Guard 유지 사항

- operating DB 접근 금지
- production/live/prod env 차단
- Naver API 호출 금지
- 실제 상품 수정 금지
- `.env` 내용 출력 금지
