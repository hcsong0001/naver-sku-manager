# FinalApproval Execution Worker Restricted DB E2E Dry Run Result

## 1. 작업명

FinalApproval Execution Worker Restricted DB-Connected End-to-End Dry Run Verification

---

## 2. 시작 커밋

`1557142` (feat: wire final approval worker restricted db transition apply adapter)

---

## 3. 수정한 파일 목록

| 파일 | 수정 내용 |
|------|-----------|
| `src/types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types.ts` | `readyItemIds?: string[]` 필드 추가 |
| `src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service.ts` | snapshot에 실제 item ID 배열 포함 |
| `src/services/sku-keyword-final-approval-execution-worker-processor.service.ts` | `readyItemIds` 존재 시 실제 ID 사용, 없으면 mock ID fallback |
| `src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.test.ts` | `readyItemIds` 관련 테스트 3개 추가 |

---

## 4. 추가한 파일 목록

```text
docs/sku-keyword-final-approval-execution-worker-restricted-db-e2e-dry-run-result.md
```

---

## 5. 수정 이유: mock item ID 문제

### 문제

Processor(`processFinalApprovalExecutionWorkerJob`)가 revalidation snapshot에서 readyItemCount만 읽고 `mock-item-0` 형식의 임시 ID로 batchJobItems를 생성했다.

```typescript
// 기존 (수정 전)
const batchJobItems = Array.from({ length: snapshot.readyItemCount }, (_, i) => ({
  id: `mock-item-${i}`,  // ← DB에 존재하지 않는 ID
  status: 'READY' as const
}));
```

Real Prisma Transition Apply Adapter가 `mock-item-0`을 DB에서 UPDATE하려 할 때 0 rows affected → 트랜잭션 실패.

### 수정

`FinalApprovalExecutionWorkerJobDbRevalidationSnapshot`에 `readyItemIds?: string[]` 추가. Prisma adapter가 실제 item ID를 포함. Processor가 실제 ID를 우선 사용.

```typescript
// 수정 후
const batchJobItems =
  snapshot.readyItemIds && snapshot.readyItemIds.length > 0
    ? snapshot.readyItemIds.map(id => ({ id, status: 'READY' as const }))
    : Array.from({ length: snapshot.readyItemCount }, (_, i) => ({
        id: `mock-item-${i}`,
        status: 'READY' as const,
      }));
```

backward-compatible: `readyItemIds` 없으면 기존 mock ID fallback 유지.

---

## 6. E2E 실행 환경

| 항목 | 값 |
|------|-----|
| `NODE_ENV` | `test` |
| `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` | `true` |
| `FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER` | `restricted-db` |
| `FINAL_APPROVAL_EXECUTION_TRANSITION_APPLY_ADAPTER` | `restricted-db` |
| `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER` | `bullmq` |
| `FINAL_APPROVAL_EXECUTION_QUEUE_NAME` | `final-approval-execution` |
| `DATABASE_URL` | localhost:55432 (test DB) — 원문 미출력 |
| `REDIS_URL` | `redis://localhost:56379` |
| PostgreSQL container | `tms-final-approval-test-postgres` (Up) |
| Redis container | `tms-final-approval-test-redis` (Up 2h) |

---

## 7. E2E 실행 순서 및 결과

### Step 1: verify-before (사전 확인)
```text
[Result] BEFORE_FIXTURE_VALID
  FinalApproval status: ACTIVE
  BatchJob status: APPROVED
  BatchJobItem READY count: 1
  FinalApprovalItem count: 1
```

### Step 2: Worker 기동
```text
[INFO] Starting FinalApproval Execution Worker Entrypoint...
[INFO] Revalidation adapter mode: restricted-db
[INFO] Transition apply adapter mode: restricted-db
[INFO] Restricted DB mode: creating safe PrismaClient for test DB
[INFO] Worker started successfully. Listening on queue: final-approval-execution
```

Worker가 single PrismaClient 인스턴스를 revalidation + transition apply 양쪽에 공유.

### Step 3: enqueue
```text
[Check] Safety guard: PASS
[Enqueue] jobId: final-approval-worker-restricted-db-dry-run-001
[Enqueue] jobName: sku-keyword-final-approval-execution
[Enqueue] finalApprovalId: test-db-revalidation-final-approval-001
[Enqueue] mode: DRY_RUN_READY
[Result] ENQUEUE_SUCCESS
```

### Step 4: 처리 대기 (3초)

### Step 5: verify-after
```text
[Result] AFTER_FIXTURE_VALID
  FinalApproval status: ACTIVE   ← ACTIVE 유지 (write 차단됨)
  BatchJob status: EXECUTING     ← APPROVED → EXECUTING 전환 성공
  BatchJobItem status: EXECUTING:1 ← READY → EXECUTING 전환 성공
  FinalApprovalItem count: 1
```

### Step 6: restore
```text
[Restore] Safety guard: PASS
[Restore] BatchJob current status: EXECUTING
[Restore] BatchJobItem EXECUTING count: 1
[Restore] BatchJob rows restored: 1
[Restore] BatchJobItem rows restored: 1
[Restore Verify] BatchJob status: APPROVED
[Restore Verify] BatchJobItem READY count: 1
[Restore Verify] BatchJobItem EXECUTING remaining: 0
[Result] RESTORE_SUCCESS
```

### Step 7: verify-before (복구 후 재확인)
```text
[Result] BEFORE_FIXTURE_VALID
  FinalApproval status: ACTIVE
  BatchJob status: APPROVED
  BatchJobItem READY count: 1
  FinalApprovalItem count: 1
```

---

## 8. 상태 전환 검증 요약

| 항목 | 실행 전 | 실행 후 | 복구 후 |
|------|---------|---------|---------|
| `FinalApproval.status` | ACTIVE | ACTIVE | ACTIVE |
| `BatchJob.status` | APPROVED | EXECUTING | APPROVED |
| `BatchJobItem.status` | READY | EXECUTING | READY |

- FinalApproval은 write가 차단되어 ACTIVE 유지 (의도한 동작)
- BatchJob APPROVED → EXECUTING 전환 성공
- BatchJobItem READY → EXECUTING 전환 성공 (실제 item ID `test-db-revalidation-batch-job-item-001` 사용)

---

## 9. Naver API 호출 여부

없음. `mode: DRY_RUN_READY`로 enqueue하여 Naver API 호출 경로 진입하지 않음.

---

## 10. 운영 DB 접근 여부

없음. 모든 DB 작업은 localhost:55432 (tms-final-approval-test-postgres)에서만 수행.

---

## 11. 실제 상품 수정 여부

없음.

---

## 12. DB Write 범위

| 테이블 | 작업 | WHERE 조건 |
|--------|------|-----------|
| `NaverApiBatchJob` | UPDATE status APPROVED→EXECUTING | id = `test-db-revalidation-batch-job-001` |
| `NaverApiBatchJobItem` | UPDATE status READY→EXECUTING | id = `test-db-revalidation-batch-job-item-001` |
| `NaverApiBatchFinalApproval` | MAINTAIN_STATUS (write 차단) | — |
| `NaverApiBatchFinalApprovalItem` | MAINTAIN_STATUS (write 차단) | — |

복구 시:
| 테이블 | 작업 |
|--------|------|
| `NaverApiBatchJob` | UPDATE status EXECUTING→APPROVED |
| `NaverApiBatchJobItem` | UPDATE status EXECUTING→READY |

---

## 13. 테스트 결과

| 파일 | 테스트 수 | 결과 |
|------|-----------|------|
| Safety guard | 24 | 24/24 ✓ |
| Prisma adapter | 15 (기존 12 + 신규 3) | 15/15 ✓ |
| Factory | 18 | 18/18 ✓ |
| **합계** | **57** | **57/57** |

---

## 14. Prisma validate/generate 결과

```text
The schema at prisma\schema.prisma is valid 🚀
✔ Generated Prisma Client (v7.8.0)
```

schema.prisma 수정 없음.

---

## 15. tsc --noEmit 결과

타입 에러 없음.

---

## 16. git diff --check 결과

trailing whitespace 없음.

---

## 17. git status --short 결과

```text
 M src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service.ts
 M src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.test.ts
 M src/services/sku-keyword-final-approval-execution-worker-processor.service.ts
 M src/types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types.ts
?? docs/sku-keyword-final-approval-execution-worker-restricted-db-e2e-dry-run-result.md
```

---

## 18. 다음 단계 제안

E2E Restricted DB-Connected Dry Run 검증이 완료되었다.

**이후 가능한 다음 단계 (별도 지시에서만):**

1. FinalApproval 실제 LIVE 전환 결정이 있을 경우:
   - `mode: DRY_RUN_READY` → `mode: 'live'` 전환 전 설계 리뷰 필요
   - TransitionApply에서 `LIVE_ADAPTER_BLOCKED` 제거 또는 별도 live adapter 구현 필요
   - Naver API 호출 adapter 연결 필요

2. 현재 상태에서 안전하게 반복 실행 가능:
   - fixture seed → verify-before → [Worker + enqueue] → verify-after → restore → verify-before
