# FinalApproval Execution Result Recording Prisma Adapter — Implementation Result

## 1. 구현 목적

`buildExecutionResultPlan`이 생성한 `ExecutionResultPlan`을 받아 실제 test DB의
`NaverApiBatchJob` / `NaverApiBatchJobItem`에 실행 결과를 기록하는 Prisma Adapter.

restricted-db 테스트 안전 조건에서만 동작하며, Naver API 호출 없이 상태 전환 결과만 기록한다.

---

## 2. 구현한 파일

| 파일 | 역할 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-result-recording-prisma-adapter.service.ts` | Prisma Adapter 구현 |
| `src/services/sku-keyword-final-approval-execution-result-recording-prisma-adapter.test.ts` | 단위 테스트 (39개) |
| `docs/sku-keyword-final-approval-execution-result-recording-prisma-adapter-result.md` | 본 결과 문서 |

기존 파일 변경 없음 (pure function, types 수정 불필요).

---

## 3. Adapter 입력 / 출력

### 입력

```typescript
// 생성 시 (createResultRecordingPrismaAdapter)
prisma: ResultRecordingPrismaClientPort  // 최소 structural interface
options: {
  nodeEnv: string | undefined;
  databaseUrl: string | undefined;
  adapterMode: string | undefined;       // 'restricted-db' | undefined | blocked
}

// 실행 시 (applyExecutionResultPlan)
plan: ExecutionResultPlan               // buildExecutionResultPlan 결과
```

### 출력

```typescript
ResultRecordingResult = {
  applied: boolean;
  skippedReason?: string;   // applicable=false 또는 idempotency guard hit 시
  jobUpdated?: boolean;     // applied=true 시 항상 true
  itemsUpdated?: number;    // 실제 업데이트된 item 수
}
```

---

## 4. Safety Guard 조건

### 차단

| 조건 | 에러 |
|------|------|
| `adapterMode ∈ {live, production, prod, operating}` | creation time throw |
| `NODE_ENV !== 'test'` (restricted-db 모드) | safety guard failed |
| `DATABASE_URL` 없음 | safety guard failed |
| `DATABASE_URL` host가 non-localhost | safety guard failed (masked) |
| `DATABASE_URL` port가 55432 아님 | safety guard failed |
| `DATABASE_URL`에 production DB name 패턴 | safety guard failed |
| 에러 메시지에 DATABASE_URL 원문 노출 | 차단 (masked로 대체) |

### 허용

| 조건 |
|------|
| `NODE_ENV=test` + `DATABASE_URL=localhost:55432/tms_*` + `adapterMode=restricted-db` |
| `adapterMode=undefined` (mock path, no safety guard triggered) |

---

## 5. DB Write 대상

### 기록하는 테이블

| 테이블 | 필드 | 설명 |
|--------|------|------|
| `NaverApiBatchJob` | `status` | EXECUTING → EXECUTED \| PARTIAL_SUCCESS \| FAILED |
| `NaverApiBatchJob` | `successItems` | 성공 item 수 |
| `NaverApiBatchJob` | `failedItems` | 실패 item 수 |
| `NaverApiBatchJob` | `skippedItems` | 스킵 item 수 |
| `NaverApiBatchJob` | `executedAt` | 실행 완료 시각 (plan.jobUpdate.executedAt) |
| `NaverApiBatchJob` | `metadata` | 실행 context + resultSummary + recordedAt |
| `NaverApiBatchJobItem` | `status` | EXECUTING → SUCCESS \| FAILED \| RETRY_PENDING \| SKIPPED |
| `NaverApiBatchJobItem` | `errorCode` | 실패/재시도 시 기록, 성공/스킵 시 null로 초기화 |
| `NaverApiBatchJobItem` | `errorMessage` | 동일 |

### 기록하지 않는 테이블

| 테이블 | 이유 |
|--------|------|
| `NaverApiBatchFinalApproval` | FinalApproval artifact는 변경하지 않는다 |
| `NaverApiBatchFinalApprovalItem` | 동일 |
| `NaverApiCallLog` | Naver API 실행 단계에서 기록 예정 (현재 단계 미포함) |

---

## 6. 상태 전환 표

### Job (NaverApiBatchJob)

| 전환 전 | 전환 후 | 조건 |
|---------|---------|------|
| EXECUTING | EXECUTED | 모든 item이 SUCCESS |
| EXECUTING | PARTIAL_SUCCESS | 일부 SUCCESS + 일부 FAILED/RETRY_PENDING |
| EXECUTING | FAILED | 모든 item이 FAILED/RETRY_PENDING/SKIPPED |

### Item (NaverApiBatchJobItem)

| 전환 전 | 전환 후 | 비고 |
|---------|---------|------|
| EXECUTING | SUCCESS | errorCode/errorMessage → null |
| EXECUTING | FAILED | errorCode/errorMessage 기록 |
| EXECUTING | RETRY_PENDING | errorCode/errorMessage 기록 |
| EXECUTING | SKIPPED | errorCode/errorMessage → null |

---

## 7. Idempotency Guard

Job에 결과를 기록하기 전, `findUnique`로 현재 상태를 확인한다.

| Job 현재 상태 | 동작 |
|--------------|------|
| EXECUTING | 정상 기록 진행 |
| EXECUTED | `applied=false, skippedReason=...already recorded` |
| FAILED | `applied=false, skippedReason=...already recorded` |
| PARTIAL_SUCCESS | `applied=false, skippedReason=...already recorded` |
| 기타 | `applied=false, skippedReason=...not executing` |
| 없음 | `applied=false, skippedReason=BatchJob not found` |

Transaction 내부에서도 `updateMany( where: { status: 'EXECUTING' } )`로 동일 조건을 적용하여 race condition을 방지한다.

---

## 8. Transaction 경계

전체 기록은 단일 `$transaction` 안에서 원자적으로 처리된다.

순서:
1. Item 업데이트 (각 item별 `updateMany`)
2. Job 업데이트 (`updateMany`)

Item 또는 Job의 updateMany가 `count=0`을 반환하면 Error를 throw → 전체 transaction rollback.

---

## 9. Metadata 구조

`NaverApiBatchJob.metadata` (Json?)에 기록되는 내용:

```json
{
  "executionMode": "restricted-db",
  "actorId": "...",
  "idempotencyKey": "...",
  "startedAt": "2026-06-23T01:00:00.000Z",
  "endedAt": "2026-06-23T01:00:05.000Z",
  "durationMs": 5000,
  "finalApprovalId": "test-db-revalidation-final-approval-001",
  "recordedAt": "2026-06-23T01:00:05.123Z",
  "resultSummary": {
    "successCount": 1,
    "failedCount": 0,
    "skippedCount": 0
  }
}
```

`recordedAt`은 adapter가 실제 DB write 시점에 추가한다 (plan에는 없음).

---

## 10. NaverApiCallLog 미기록 이유

`NaverApiCallLog`는 Naver API 호출 실행 단계에서 각 API call별로 기록해야 한다.
현재 단계(restricted-db E2E)는 API 호출 없이 상태 전환만 검증하므로,
callLog 기록을 이 adapter에 포함하지 않는다.

향후 live 실행 adapter 구현 시 callLog 기록 로직이 추가될 예정.

---

## 11. 테스트 결과

| 파일 | 테스트 수 | 결과 |
|------|-----------|------|
| result-recording-prisma-adapter.test.ts | 39 | 39/39 ✓ |
| result-recording.test.ts (pure function) | 27 | 27/27 ✓ |
| restricted-db-dry-run-safety.test.ts | 24 | 24/24 ✓ |
| restricted-db-revalidation-prisma-adapter.test.ts | 15 | 15/15 ✓ |
| worker-revalidation-repository-factory.test.ts | 18 | 18/18 ✓ |
| worker-transition-apply-adapter-factory.test.ts | 21 | 21/21 ✓ |
| **전체 단위 테스트** | **415** | **415/415 ✓** |

※ `.integration.test.ts` 3개 파일은 Docker test DB 연결이 필요한 기존 테스트로,
  본 구현과 무관하게 환경 조건에 따라 fail/skip 됨.

---

## 12. Prisma schema 변경 여부

없음. 기존 enum / metadata Json / errorCode / errorMessage 필드만 사용.

---

## 13. tsc / lint 결과

- `npx tsc --noEmit`: 에러 없음
- `git diff --check`: trailing whitespace 없음
- `npx prisma validate`: valid

---

## 14. 남은 과제

| 단계 | 설명 |
|------|------|
| Live Execution Adapter | `mode=live`에서 실제 Naver API 호출 후 result recording |
| NaverApiCallLog 기록 | API 호출 성공/실패 시 callLog 테이블에 per-call 기록 |
| Result Recording E2E | restricted-db 조건에서 `buildExecutionResultPlan` + `applyExecutionResultPlan` 전체 통합 검증 |
| Worker Entrypoint 연결 | Worker가 transition apply 완료 후 result recording adapter를 호출하도록 wiring |
