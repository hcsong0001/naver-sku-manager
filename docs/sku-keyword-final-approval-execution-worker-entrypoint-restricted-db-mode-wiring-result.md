# FinalApproval Execution Worker Entrypoint Restricted DB Mode Wiring Result

## 1. 작업명

FinalApproval Execution Worker Entrypoint Restricted DB Mode Wiring

---

## 2. 시작 커밋

`fe7f80f46d8c1a84d58280a7cb40fc0101bb5ab6`

---

## 3. 수정한 파일 목록

```text
scripts/final-approval-execution-worker.ts
src/services/sku-keyword-final-approval-execution-worker-runtime.test.ts
```

---

## 4. 추가한 파일 목록

```text
docs/sku-keyword-final-approval-execution-worker-entrypoint-restricted-db-mode-wiring-result.md
```

기존 factory/adapter service 파일은 수정 없음.

---

## 5. 기본 mock behavior 유지 여부

**유지됨.** `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER` env가 없거나 `'mock'` 또는 그 외 미정의 값이면:
- PrismaClient를 생성하지 않음
- `{ findSnapshotForWorkerJobRevalidation: async () => null }` 안전 mock 반환
- 기존 startup 동작 그대로 유지

---

## 6. restricted-db mode 선택 조건

| 조건 | 값 |
|------|-----|
| `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER` | `restricted-db` |
| `NODE_ENV` | `test` |
| `DATABASE_URL` | localhost:55432, test DB name, 운영 패턴 없음 |
| Safety guard | PASS |

위 조건 중 하나라도 실패하면 Worker Entrypoint가 `process.exit(1)`로 종료됨.

---

## 7. Prisma Client 생성 조건

- `adapterModeEnv === 'restricted-db'` 일 때만 `createSafePrismaClientForTestDb()` 호출
- 기본 모드에서는 PrismaClient 생성 없음
- `createSafePrismaClientForTestDb`는 정적 import만으로 DB 연결을 생성하지 않음 (함수 reference만 import)
- PrismaClient 생성 실패 시 에러 메시지 URL redact 후 `process.exit(1)`

```typescript
// Only called when adapterModeEnv === 'restricted-db'
prismaClient = createSafePrismaClientForTestDb() as unknown as RevalidationPrismaClientPort;
```

---

## 8. Safety Guard 통합 방식

두 단계 검증:

1. **`createSafePrismaClientForTestDb()`** — `scripts/lib` 내부 검증
   - `DATABASE_URL` host = localhost/127.0.0.1
   - port = 55432
   - dbName contains 'test'
   - 실패 시 에러 throw → Worker Entrypoint catch 후 exit(1)

2. **`createWorkerRevalidationRepository()`** — factory 내 safety guard
   - `NODE_ENV === 'test'`
   - `DATABASE_URL` 존재
   - localhost:55432 test DB만 허용
   - 운영 host/db name 패턴 차단
   - 실패 시 에러 throw → Worker Entrypoint catch 후 exit(1)

에러 메시지에 URL, password, secret 미포함.

---

## 9. live/production/prod 차단 방식

`createWorkerRevalidationRepository()` 내 `BLOCKED_MODES` Set에 즉시 차단:

```typescript
const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating']);
if (BLOCKED_MODES.has(rawMode.toLowerCase())) {
  throw new Error(`Worker revalidation adapter mode "${rawMode}" is not allowed...`);
}
```

Worker Entrypoint가 이 예외를 catch하여 URL redact 후 `process.exit(1)`.

---

## 10. Transition Apply Adapter 상태

**Mock 유지.** 이번 단계에서 변경 없음.

```typescript
transitionApplyAdapter: {
  transaction: async (fn: any) => {
    logger.info('Mock Transition Apply Transaction called in entrypoint');
    return fn({
      updateBatchJobStatus: async () => ({ updated: true }),
      updateBatchJobItemStatus: async () => ({ updated: true })
    });
  }
}
```

실제 DB write 연결은 다음 별도 지시(실제 Dry Run 실행)에서만 검토.

---

## 11. Worker Entrypoint import side effect 여부

없음.

- `createSafePrismaClientForTestDb` 함수를 정적 import해도 PrismaClient가 생성되지 않음
- `createWorkerRevalidationRepository` 함수 import도 DB 연결 없음
- Worker Entrypoint 파일 자체는 `bootstrap()` 실행으로 시작하지만, 파일을 직접 `require`/`import` 하는 테스트 대상 코드에서는 이 파일을 import하지 않음

---

## 12. DB 접속 여부

없음. 이번 작업에서 DB에 접속하지 않음.

---

## 13. DB write 여부

없음.

---

## 14. Redis 접속 여부

없음. (Runtime test 6은 기존 테스트로 Redis를 사용하지만, 이번 신규 작업 범위에서는 Redis 접속 없음)

---

## 15. Worker 실행 여부

없음. Worker 기동하지 않음.

---

## 16. Queue enqueue 여부

없음.

---

## 17. Naver API 호출 여부

없음.

---

## 18. 테스트 결과

### Safety Guard (기존, 24개)
```text
ℹ tests 24 / pass 24 / fail 0
```

### Prisma Adapter (기존, 12개)
```text
ℹ tests 12 / pass 12 / fail 0
```

### Factory (기존, 18개)
```text
ℹ tests 18 / pass 18 / fail 0
```

### Startup Config (기존, 13개)
```text
ℹ tests 13 / pass 13 / fail 0
```

### Worker Runtime (기존 8 + 신규 5 = 13개)
```text
▶ FinalApproval Execution BullMQ Worker Runtime Shell
  ✔ 1. Worker disabled이면 BullMQ Worker를 생성하지 않고 started false 반환
  ✔ 2. REDIS_URL 없으면 Worker를 생성하지 않음
  ✔ 3. DATABASE_URL 없으면 Worker를 생성하지 않음
  ✔ 4. adapter가 bullmq가 아니면 Worker를 생성하지 않음
  ✔ 5. 정상 env이면 BullMQ Worker Runtime이 started true 반환 및 close() 시 정상 종료됨
  ✔ 6. Docker Redis 기반으로 Queue에 Job을 넣으면 Queue Processor가 호출됨
  ✔ 7. Worker가 job.name/job.data를 plain object로 Processor에 전달
  ✔ 8. Worker Runtime이 실제 Processor Factory를 주입받아 동작할 수 있음
  ✔ 9. default adapter mode (undefined) returns mock repository — findSnapshot returns null, no DB connection
  ✔ 10. blocked adapter modes throw before any Worker startup
  ✔ 11. restricted-db mode + NODE_ENV != test → factory throws (prevents Worker startup)
  ✔ 12. restricted-db mode + valid env + mock prismaClient → adapter calls findUnique on DB query
  ✔ 13. factory error messages do not expose DATABASE_URL secret
ℹ tests 13 / pass 13 / fail 0
```

**전체 테스트 요약**: 24 + 12 + 18 + 13 + 13 = **80개 all pass**

모든 테스트는 mock 기반. 실제 DB 접속 없음. (기존 Runtime test 5·6은 Redis 사용하나, 이번 신규 범위 밖)

---

## 19. Prisma validate/generate 결과

```text
The schema at prisma\schema.prisma is valid 🚀
✔ Generated Prisma Client (v7.8.0) to .\app\generated\prisma in 345ms
```

schema.prisma 수정 없음.

---

## 20. tsc --noEmit 결과

타입 에러 없음.

---

## 21. git diff --check 결과

trailing whitespace 없음.

---

## 22. git status --short 결과

```text
 M scripts/final-approval-execution-worker.ts
 M src/services/sku-keyword-final-approval-execution-worker-runtime.test.ts
```

수정 파일 2개 + 결과 문서 1개 (신규).

---

## 23. 다음 단계 제안

이번 Entrypoint wiring 완료로 다음 단계 준비가 되었다.

**다음 별도 지시에서만 허용: Restricted DB-Connected Dry Run Execution**

실행 조건:
```
FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER=restricted-db
ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true
NODE_ENV=test
DATABASE_URL=postgresql://...:55432/tms_final_approval_test
REDIS_URL=redis://localhost:56379
FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq
FINAL_APPROVAL_EXECUTION_QUEUE_NAME=final-approval-execution
```

실행 순서:
1. verify-before 확인 → `BEFORE_FIXTURE_VALID`
2. Worker 기동 (`scripts/final-approval-execution-worker.ts`)
3. enqueue 1건 (`scripts/enqueue-final-approval-execution-worker-restricted-db-dry-run-job.ts`)
4. Worker 처리 로그 관찰 (revalidation PASS → transition apply 실행)
5. verify-after (`scripts/verify-final-approval-execution-restricted-db-fixture-after.ts`)
6. fixture 복구 (`scripts/restore-final-approval-execution-restricted-db-fixture.ts`)
7. restore 후 verify-before 재확인 → `BEFORE_FIXTURE_VALID`

**주의사항 (다음 단계 시작 전 재확인 필요)**:
- Transition Apply Adapter가 현재 mock 상태 → Worker 실행 시 BatchJob/BatchJobItem이 EXECUTING으로 전환되지 않음
- verify-after가 `EXECUTING` 상태를 기대하므로, 실제 Dry Run 전에 Transition Apply Real Prisma Adapter 연결 여부를 결정해야 함
- 현재 상태에서 Worker를 기동하면: revalidation은 실제 DB 조회하고, transition apply는 mock(no-op)으로 처리됨
