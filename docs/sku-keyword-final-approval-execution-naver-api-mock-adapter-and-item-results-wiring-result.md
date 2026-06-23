# FinalApproval Execution Naver API Mock Adapter and Item Results Wiring 결과 문서

## 1. 작업명

FinalApproval Execution Naver API Mock Adapter and Item Results Wiring

## 2. 시작 커밋

`ea6452b` — test: run restricted db connected dry run execution

## 3. 구현한 파일 목록 (신규 생성)

| 파일 | 용도 |
|------|------|
| `src/types/sku-keyword-final-approval-execution-naver-api.types.ts` | Naver API Adapter Port 및 커맨드/결과 타입 정의 |
| `src/services/sku-keyword-final-approval-execution-naver-api-mock-adapter.service.ts` | Mock Naver API Adapter |
| `src/services/sku-keyword-final-approval-execution-naver-api-disabled-adapter.service.ts` | Disabled Naver API Adapter (safe default) |
| `src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.service.ts` | Naver API Adapter Factory (env 기반 선택) |
| `src/services/sku-keyword-final-approval-execution-naver-api-mock-adapter.test.ts` | Mock/Disabled Adapter 테스트 (23개) |
| `src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.test.ts` | Factory 테스트 (17개) |

## 4. 수정한 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `src/services/sku-keyword-final-approval-execution-worker-processor.service.ts` | `naverApiAdapter` dep 추가, step 5.5 Naver API 실행, recording plan mode 결정 로직 추가 |
| `src/services/sku-keyword-final-approval-execution-worker-processor.test.ts` | Naver API adapter wiring 테스트 5개 추가 (tests 13–17) |

---

## 5. Naver API Adapter Port 구조

```typescript
// src/types/sku-keyword-final-approval-execution-naver-api.types.ts

export type NaverApiItemExecutionStatus = 'SUCCESS' | 'FAILED' | 'SKIPPED';

export interface NaverApiExecutionCommand {
  itemId: string;
  finalApprovalId: string;
}

export interface NaverApiExecutionItemResult {
  itemId: string;
  status: NaverApiItemExecutionStatus;
  errorCode?: string;
  errorMessage?: string;
  naverApiCalled: boolean;  // 실제 HTTP 호출 여부
  mock?: boolean;           // Mock adapter 결과 여부
}

export interface NaverApiAdapterPort {
  executeItem(command: NaverApiExecutionCommand): Promise<NaverApiExecutionItemResult>;
}
```

---

## 6. Mock Adapter 동작

| 시나리오 | 결과 |
|---------|------|
| 기본 (config 없음) | `status: 'SUCCESS'`, `naverApiCalled: false`, `mock: true` |
| `failItemIds` 포함 아이템 | `status: 'FAILED'`, `errorCode: 'MOCK_FAILURE'`, `naverApiCalled: false` |
| `skipItemIds` 포함 아이템 | `status: 'SKIPPED'`, `naverApiCalled: false` |
| 항상 | 실제 Naver API HTTP 호출 없음 |

```typescript
const adapter = createNaverApiMockAdapter({ failItemIds: ['item-001'] });
// item-001 → FAILED / 나머지 → SUCCESS
```

---

## 7. Disabled Adapter 동작

| 항목 | 값 |
|------|-----|
| status | `'SKIPPED'` |
| errorCode | `'ADAPTER_DISABLED'` |
| naverApiCalled | `false` |
| mock | `undefined` (disabled ≠ mock) |

- 실제 Naver API 호출 없음
- 안전 모드: 모든 아이템을 SKIPPED로 처리
- live adapter 방지용 안전장치

---

## 8. Factory 선택 조건

| `adapterModeEnvValue` | 반환 어댑터 |
|-----------------------|------------|
| `undefined` | disabled adapter |
| `''` (빈 문자열) | disabled adapter |
| `'disabled'` | disabled adapter |
| 미인식 문자열 | disabled adapter (safe fallback) |
| `'mock'` | mock adapter |
| `'live'`, `'production'`, `'prod'`, `'operating'` | **throw** |

```typescript
const adapter = createNaverApiAdapter({
  adapterModeEnvValue: process.env.FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER,
});
```

---

## 9. live / prod / production / operating 차단 여부

| 모드 | 차단 | 에러 포함 내용 |
|------|------|--------------|
| `live` | ✅ throws | `"not allowed"` |
| `production` | ✅ throws | `"not allowed"` |
| `prod` | ✅ throws | `"not allowed"` |
| `operating` | ✅ throws | `"not allowed"` |
| `LIVE` (대문자) | ✅ throws | 대소문자 무관 |

에러 메시지에 Naver API endpoint, Authorization, secret 미포함 ✅

---

## 10. Worker Processor 연결 위치

Transition Apply 성공(step 5) 직후, Result Recording (step 6) 직전에 삽입:

```typescript
// ── Worker Processor flow ──────────────────────────────────────────────────
// 1. Payload validation & DB Revalidation & Guard check
// 2. Snapshot 재조회
// 3. Transition Guard 재평가
// 4. Transition Apply Plan 빌드
// 5. Transition Apply 실행 (APPROVED → EXECUTING, READY → EXECUTING)
// 5.5. [NEW] Naver API 아이템 실행 (naverApiAdapter 제공 시만)
// 6. Execution Result Plan 빌드
// 7. Result Recording 어댑터 호출
// 8. success:true 반환
```

---

## 11. itemResults 생성 방식

```typescript
// 각 BatchJobItem에 대해 executeItem 호출
const naverItemResults: ItemExecutionResult[] = await Promise.all(
  batchJobItems.map(async (item) => {
    const result = await adapter.executeItem({ itemId: item.id, finalApprovalId });
    return {
      itemId: result.itemId,
      status: result.status,       // SUCCESS | FAILED | SKIPPED
      errorCode: result.errorCode,
      errorMessage: result.errorMessage,
      apiCallAttempted: result.naverApiCalled,
    };
  })
);
```

---

## 12. Result Recording Plan 연계 방식

```typescript
// mode 결정: 실행된 아이템(SKIPPED 제외)이 있으면 restricted-db, 없으면 dry-run
const hasNonSkippedResults = naverItemResults.some((r) => r.status !== 'SKIPPED');
const recordingPlan = buildExecutionResultPlan({
  mode: hasNonSkippedResults ? 'restricted-db' : 'dry-run',
  itemResults: naverItemResults,
  ...
});
```

| 상황 | mode | applicable | outcome |
|------|------|-----------|---------|
| naverApiAdapter 없음 | `dry-run` | false | TRANSITION_ONLY |
| Disabled adapter (SKIPPED) | `dry-run` | false | (dry-run) |
| Mock SUCCESS | `restricted-db` | **true** | EXECUTED |
| Mock FAILED | `restricted-db` | **true** | FAILED |
| Mock 일부 SUCCESS + FAILED | `restricted-db` | **true** | PARTIAL_SUCCESS |

---

## 13. 실제 Naver API 호출 여부

❌ **없음** — Mock adapter, Disabled adapter 모두 HTTP 호출 없음.  
`naverApiCalled: false` 로 모든 결과 반환.

---

## 14. DB 접속 여부

❌ **없음** — 이번 단계는 코드 구현 + mock 기반 테스트만 수행.

---

## 15. DB write 여부

❌ **없음** — Prisma result recording write는 다음 단계(Mock Execution DB write)에서 수행.

---

## 16. Redis 접속 여부

❌ **없음**

---

## 17. Worker 실행 여부

❌ **없음**

---

## 18. Queue enqueue 여부

❌ **없음**

---

## 19. 테스트 결과

### 신규 테스트 (이번 작업)

| 파일 | 테스트 수 | 결과 |
|------|---------|------|
| `naver-api-mock-adapter.test.ts` | 23 | ✅ 23/23 |
| `naver-api-adapter-factory.test.ts` | 17 | ✅ 17/17 |
| `worker-processor.test.ts` (신규 5개) | +5 | ✅ 17/17 |

### 전체 단위 테스트

| 지표 | 값 |
|------|-----|
| 총 테스트 수 | 237 |
| 스위트 수 | 12 |
| pass | 237 |
| fail | 0 |

**주의**: integration test (`sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts`, `sku-keyword-final-approval.integration.test.ts`)는 DB/Redis 연결 없는 환경에서 기존부터 실패하며 이번 작업과 무관.

---

## 20. Prisma validate/generate 결과

```
✅ The schema at prisma\schema.prisma is valid
```

(schema.prisma 수정 없음 — validate만 실행)

---

## 21. tsc --noEmit 결과

```
✅ clean — 에러 없음
```

---

## 22. git diff --check 결과

```
✅ 공백 에러 없음
```

---

## 23. git status --short 결과

```
 M channel-product-res.json   (무관한 파일)
 M src/services/sku-keyword-final-approval-execution-worker-processor.service.ts
 M src/services/sku-keyword-final-approval-execution-worker-processor.test.ts
?? src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.service.ts
?? src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.test.ts
?? src/services/sku-keyword-final-approval-execution-naver-api-disabled-adapter.service.ts
?? src/services/sku-keyword-final-approval-execution-naver-api-mock-adapter.service.ts
?? src/services/sku-keyword-final-approval-execution-naver-api-mock-adapter.test.ts
?? src/types/sku-keyword-final-approval-execution-naver-api.types.ts
```

---

## 24. 다음 단계 제안

이번 Mock Adapter Wiring이 완료됐으므로, 다음 단계:

### 단계 6: Restricted DB Mock Execution (다음 별도 지시에서 수행)

목표:
- Mock Naver API Adapter + restricted-db Result Recording Adapter를 모두 사용
- Worker 실행 → enqueue 1건 → Naver API mock 실행 → itemResults 생성 → Result Recording Prisma write
- verify-after: BatchJob=EXECUTED, BatchJobItem=SUCCESS
- restore → verify-restore: BEFORE_FIXTURE_VALID

필요한 추가 env:
```
FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER=mock
FINAL_APPROVAL_EXECUTION_RESULT_RECORDING_ADAPTER=restricted-db
```

Worker Entrypoint 수정 예상:
- `FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER` env 읽기
- `createNaverApiAdapter({ adapterModeEnvValue: ... })` 호출
- processor에 `naverApiAdapter` 주입

Result Recording write 검증 항목:
- `NaverApiBatchJob.status = EXECUTED`
- `NaverApiBatchJobItem.status = SUCCESS`
- `NaverApiBatchJob.metadata` 에 executionMode, actorId, idempotencyKey 기록

아직 실제 Naver API live 호출은 하지 않는다.
