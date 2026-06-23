# FinalApproval Execution Worker Restricted DB Revalidation Adapter Wiring Result

## 1. 작업명

FinalApproval Execution Worker Restricted DB Revalidation Adapter Wiring

---

## 2. 시작 커밋

`a9683db8f67b0cdeb5bc87d96dac9158a8d08fe3`

---

## 3. 구현한 파일 목록

```text
src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service.ts
src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.test.ts
src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service.ts
src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.test.ts
docs/sku-keyword-final-approval-execution-worker-restricted-db-revalidation-adapter-wiring-result.md
```

---

## 4. 수정한 기존 파일 목록

없음. 기존 Worker Entrypoint (`scripts/final-approval-execution-worker.ts`) 미수정.

---

## 5. Prisma Revalidation Adapter 역할

`createRestrictedDbRevalidationPrismaAdapter(prisma)` 는 `FinalApprovalExecutionWorkerJobDbRevalidationRepository` 인터페이스를 구현한다.

- **읽기 전용**: `naverApiBatchFinalApproval.findUnique` 1회 호출 외 DB write 없음
- **조회 대상**: FinalApproval + BatchJob + READY 상태 BatchJobItem
- **스냅샷 구성**:
  - `finalApprovalStatus`, `validationExpiresAt`, `jobStatus`, `readyItemCount`
  - `payloadHash`, `validationSnapshotHash` — DB 저장값 그대로
  - `expectedPayloadHash` = `payloadHash` (hash 체크가 항상 통과하도록 설정 — fixture가 source of truth)
  - `expectedValidationSnapshotHash` = `validationSnapshotHash` (동일 이유)
  - `idempotencyKeyAlreadyUsed` = `false` (dry-run 전용: 재시도 허용)
- **URL 원문 미포함**: 스냅샷 결과에 URL, 비밀번호, credential 없음
- **생성 시점 DB 미호출**: 생성자에서 DB 접속 없음 (lazily 호출)

**인터페이스 타입**: `RevalidationPrismaClientPort` (구조적 타이핑) — 실제 PrismaClient 또는 테스트용 mock 모두 주입 가능

---

## 6. Factory 역할

`createWorkerRevalidationRepository(options)` 는 환경 변수 기반으로 올바른 repository 구현을 선택하여 반환한다.

### 6.1 입력 옵션

| 옵션 | 설명 |
|------|------|
| `adapterModeEnvValue` | `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER` env 값 |
| `nodeEnv` | NODE_ENV (safety guard 검사용) |
| `databaseUrl` | DATABASE_URL (safety guard 검사용) |
| `prismaClient` | 호출자가 생성한 PrismaClient (restricted-db 모드에서 필수) |

### 6.2 모드 선택 로직

| adapterModeEnvValue 값 | 동작 |
|------------------------|------|
| `undefined`, `''`, `'mock'`, 그 외 미정의 값 | 안전 mock 반환 (항상 null) |
| `'restricted-db'` | 안전 가드 통과 후 Prisma adapter 반환 |
| `'live'`, `'production'`, `'prod'`, `'operating'` | **즉시 예외 발생** |

---

## 7. Safety Guard 통합 방식

`restricted-db` 모드 선택 시 `validateRestrictedDbDryRunSafety()` 를 호출한다.

검사 조건:
- `NODE_ENV === 'test'` 아니면 실패
- `DATABASE_URL` 없으면 실패
- `DATABASE_URL` host가 `localhost` / `127.0.0.1` 아니면 실패
- `DATABASE_URL` port가 `55432` 아니면 실패
- DB명 / 사용자명에 운영 패턴 (`naver_sku_manager`, `production`, `prod`, `operating`) 감지 시 실패
- `.rds.amazonaws.com`, `.neon.tech`, `supabase` 등 운영 host 패턴 감지 시 실패

Safety guard 실패 시 에러 메시지에 URL, 비밀번호, credential 미포함.

---

## 8. 기본 Worker Behavior 유지 여부

**유지됨.** `scripts/final-approval-execution-worker.ts` 는 수정하지 않았다.

Worker Entrypoint의 기본 동작:
- `revalidationRepository: { findSnapshotForWorkerJobRevalidation: async () => null }` (mock)
- 이 mock은 processor에서 `DB_REVALIDATION_FAILED` 결과를 생성한다.
- 기존 동작 완전히 보존됨.

---

## 9. restricted-db 모드 선택 조건

Worker Entrypoint에서 restricted-db 모드를 사용하려면:

```typescript
// scripts/final-approval-execution-worker.ts (또는 별도 restricted-db worker script)
import { createWorkerRevalidationRepository } from '../src/services/...factory.service';
import { createSafePrismaClientForTestDb } from './lib/create-safe-prisma-client-for-test-db';

const prismaClient = createSafePrismaClientForTestDb();
const revalidationRepository = createWorkerRevalidationRepository({
  adapterModeEnvValue: process.env.FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  prismaClient,
});
```

환경 변수: `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER=restricted-db`

이번 단계에서 Worker Entrypoint는 수정하지 않았다. 다음 단계(실제 Dry Run 실행)에서 연결한다.

---

## 10. 운영 DB 차단 방식

| 차단 계층 | 조건 |
|-----------|------|
| Factory 단계 | `'live'`, `'production'`, `'prod'`, `'operating'` 모드 즉시 예외 |
| Safety guard 단계 | NODE_ENV ≠ test, 운영 host/port/dbname 패턴 감지 시 예외 |
| Prisma client 단계 | `createSafePrismaClientForTestDb()`가 host=localhost, port=55432 재검증 |

---

## 11. DB Write 여부

없음. 이번 작업에서 DB write를 전혀 수행하지 않았다.

Prisma Adapter는 `findUnique` (read-only) 만 사용한다.

---

## 12. Redis 접속 여부

없음. 이번 작업은 Redis와 무관하다.

---

## 13. Worker 실행 여부

없음. Worker를 실행하지 않았다.

---

## 14. Queue enqueue 여부

없음. Queue에 작업을 추가하지 않았다.

---

## 15. Naver API 호출 여부

없음.

---

## 16. 테스트 결과

### Safety Guard 테스트 (기존)

```text
▶ RestrictedDbDryRunSafety
  ✔ 1. valid test environment passes
  ... (24 tests)
ℹ tests 24 / pass 24 / fail 0
```

### Prisma Adapter 테스트 (신규, 12개)

```text
▶ RestrictedDbRevalidationPrismaAdapter
  ✔ 1. returns null when FinalApproval not found
  ✔ 2. returns well-formed snapshot when FinalApproval found
  ✔ 3. expectedPayloadHash equals payloadHash (hash check will pass)
  ✔ 4. idempotencyKeyAlreadyUsed is always false (dry-run)
  ✔ 5. validationExpiresAt is ISO string when date present
  ✔ 6. validationExpiresAt is null when DB value is null
  ✔ 7. readyItemCount is 0 when job has no items
  ✔ 8. jobStatus is UNKNOWN when job relation is null
  ✔ 9. readyItemCount counts only items present in the result
  ✔ 10. snapshot result contains no URL strings
  ✔ 11. no DB call made at adapter construction time
  ✔ 12. snapshot is a plain JSON-serializable object
ℹ tests 12 / pass 12 / fail 0
```

### Factory 테스트 (신규, 18개)

```text
▶ WorkerRevalidationRepositoryFactory
  ✔ 1. undefined adapterMode returns mock (returns null)
  ✔ 2. empty string adapterMode returns mock
  ✔ 3. "mock" adapterMode returns mock
  ✔ 4. unknown adapterMode string returns mock
  ✔ 5. "live" adapterMode throws immediately
  ✔ 6. "production" adapterMode throws immediately
  ✔ 7. "prod" adapterMode throws immediately
  ✔ 8. "operating" adapterMode throws immediately
  ✔ 9. restricted-db + NODE_ENV !== test throws with safety guard error
  ✔ 10. restricted-db + missing DATABASE_URL throws with safety guard error
  ✔ 11. restricted-db + production RDS host throws with safety guard error
  ✔ 12. restricted-db + wrong DB port throws with safety guard error
  ✔ 13. restricted-db + production db name pattern throws with safety guard error
  ✔ 14. restricted-db + safety pass + no prismaClient throws
  ✔ 15. restricted-db + safety pass + prismaClient returns adapter
  ✔ 16. restricted-db adapter returns null when prisma returns null
  ✔ 17. safety guard failure error message does not contain DATABASE_URL value
  ✔ 18. blocked mode error message does not contain sensitive details
ℹ tests 18 / pass 18 / fail 0
```

**테스트 전체 요약**: 24 + 12 + 18 = **54개 all pass**

모든 테스트는 mock 기반. 실제 DB 연결 없음.

---

## 17. Prisma validate/generate 결과

```text
The schema at prisma\schema.prisma is valid 🚀
✔ Generated Prisma Client (v7.8.0) to .\app\generated\prisma in 355ms
```

schema.prisma 수정 없음.

---

## 18. tsc --noEmit 결과

타입 에러 없음.

---

## 19. git diff --check 결과

trailing whitespace 없음.

---

## 20. git status --short 결과

```text
?? src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service.ts
?? src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.test.ts
?? src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service.ts
?? src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.test.ts
```

신규 파일 4개 (결과 문서 제외). 기존 파일 수정 없음.

---

## 21. 이번 작업에서 수행하지 않은 항목

| 항목 | 상태 |
|------|------|
| Worker 실행 | 없음 |
| Queue enqueue | 없음 |
| Redis 접속 | 없음 |
| DB write | 없음 |
| restore script 실행 | 없음 |
| verify-after script 실행 | 없음 |
| 운영 DB 접근 | 없음 |
| `.env` / `.env.test` 열람 | 없음 |
| DATABASE_URL / REDIS_URL 원문 출력 | 없음 |
| npm install | 없음 |
| schema.prisma 수정 | 없음 |
| package.json 수정 | 없음 |

---

## 22. 다음 단계 제안

이번 adapter wiring 완료로 다음 단계 준비가 되었다.

**다음 별도 지시에서만 허용: Restricted DB-Connected Dry Run Execution**

필요한 추가 작업 (다음 단계에서):

1. Worker Entrypoint 수정 또는 신규 restricted-db worker script 작성:
   - `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER=restricted-db` env로 기동
   - `createSafePrismaClientForTestDb()` 로 Prisma client 생성
   - `createWorkerRevalidationRepository(...)` 를 통해 Prisma adapter 주입
   - TransitionApply adapter: mock 유지 (EXECUTING 상태로 전환하는 것만 필요) 또는 실제 Prisma adapter 사용
2. 테스트 Redis 연결 확인 (port 56379)
3. Worker 기동 (restricted-db mode)
4. enqueue 1건: `scripts/enqueue-final-approval-execution-worker-restricted-db-dry-run-job.ts`
5. Worker 처리 로그 관찰: `BEFORE_FIXTURE_VALID` → revalidation PASS → transition apply
6. 처리 후 fixture 상태 확인: `scripts/verify-final-approval-execution-restricted-db-fixture-after.ts`
7. Fixture 복구: `scripts/restore-final-approval-execution-restricted-db-fixture.ts`
8. 복구 상태 재확인 → `BEFORE_FIXTURE_VALID` 복귀
