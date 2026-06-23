# FinalApproval Execution Worker Entrypoint Naver API Mock Adapter Wiring 결과 문서

## 1. 작업명

FinalApproval Execution Worker Entrypoint Naver API Mock Adapter Wiring

## 2. 시작 커밋

`eb52f2a` — feat: add final approval naver api mock adapter

## 3. 수정한 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `scripts/final-approval-execution-worker.ts` | `createNaverApiAdapter` import 추가, `FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER` env 읽기, Naver API adapter 생성 블록 추가, processor에 `naverApiAdapter` 주입 |
| `src/services/sku-keyword-final-approval-execution-worker-runtime.test.ts` | Naver API wiring 검증 테스트 3개 추가 (tests 14–16) |

## 4. 추가한 파일 목록

| 파일 | 용도 |
|------|------|
| `docs/sku-keyword-final-approval-execution-worker-entrypoint-naver-api-mock-adapter-wiring-result.md` | 이 결과 문서 |

---

## 5. Worker Entrypoint wiring 위치

`scripts/final-approval-execution-worker.ts` — `bootstrap()` 함수 내 4단계 adapter 선택 블록의 마지막에 추가:

```typescript
// 1. Shared PrismaClient 생성 (restricted-db 필요 시)
// 2. createWorkerRevalidationRepository(...)
// 3. createWorkerTransitionApplyAdapter(...)
// 4. createWorkerResultRecordingAdapter(...)
// 5. [NEW] createNaverApiAdapter(...)      ← 이번 추가
//
// 6. createFinalApprovalExecutionWorkerProcessor({
//      revalidationRepository,
//      transitionApplyAdapter,
//      resultRecordingAdapter,
//      naverApiAdapter,              ← 이번 주입
//    })
```

---

## 6. Worker Runtime wiring 위치

Worker Runtime (`src/services/sku-keyword-final-approval-execution-worker-runtime.service.ts`)은 **변경하지 않았다**.

Runtime은 `processor: (job) => Promise<unknown>` 함수만 받으며, adapter 선택 로직은 전부 Entrypoint에서 처리된다. Runtime에 adapter 주입 로직을 넣을 이유가 없다.

---

## 7. env 선택 조건

읽는 env key:
```
FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER
```

선택 규칙:

| env 값 | 반환 adapter |
|--------|------------|
| `undefined` | disabled adapter (기본값) |
| `''` (빈 문자열) | disabled adapter |
| `'disabled'` | disabled adapter |
| 미인식 문자열 | disabled adapter (safe fallback) |
| `'mock'` | mock adapter |
| `'live'` | **throw** — Entrypoint `process.exit(1)` |
| `'prod'` | **throw** — Entrypoint `process.exit(1)` |
| `'production'` | **throw** — Entrypoint `process.exit(1)` |
| `'operating'` | **throw** — Entrypoint `process.exit(1)` |

---

## 8. 기본 adapter 동작

`FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER` 환경변수 미설정 시:
- `createNaverApiDisabledAdapter()` 반환
- `executeItem()` → `{ status: 'SKIPPED', naverApiCalled: false, errorCode: 'ADAPTER_DISABLED' }`
- 실제 Naver API HTTP 호출 없음
- Result Recording plan: `mode = 'dry-run'` (hasNonSkippedResults=false) → `applicable: false`

Startup 로그:
```
[INFO] Naver API adapter mode: (default/disabled)
```

---

## 9. mock adapter 선택 조건

`FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER=mock`일 때:
- `createNaverApiMockAdapter()` 반환
- `executeItem()` → `{ status: 'SUCCESS', naverApiCalled: false, mock: true }`
- 실제 Naver API HTTP 호출 없음
- Result Recording plan: `mode = 'restricted-db'` (hasNonSkippedResults=true) → `applicable: true`

Startup 로그:
```
[INFO] Naver API adapter mode: mock
```

---

## 10. disabled adapter 선택 조건

`FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER=disabled` 또는 미설정:
- `createNaverApiDisabledAdapter()` 반환
- 모든 아이템 SKIPPED 처리
- `applicable: false` plan 생성 → Result Recording write 없음

---

## 11. live / prod / production / operating 차단 여부

| 모드 | 차단 | 동작 |
|------|------|------|
| `live` | ✅ throws | `createNaverApiAdapter` throw → Entrypoint `logger.error` + `process.exit(1)` |
| `prod` | ✅ throws | 동일 |
| `production` | ✅ throws | 동일 |
| `operating` | ✅ throws | 동일 |
| `LIVE` (대문자) | ✅ throws | 대소문자 무관 차단 |

에러 메시지: `Naver API adapter mode "live" is not allowed — live/production adapters are blocked`  
URL 원문 노출 없음.

---

## 12. 실제 Naver API 호출 여부

❌ **없음** — mock/disabled adapter 모두 HTTP 호출 없음. `naverApiCalled: false`.

---

## 13. Naver API 인증정보 사용 여부

❌ **없음** — 이번 단계에서 live adapter 구현 없음. secret, token, endpoint 없음.

---

## 14. DB 접속 여부

❌ **없음** — 코드 wiring + mock 기반 테스트만 수행.

---

## 15. DB write 여부

❌ **없음**

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

| 파일 | 신규 테스트 | 내용 |
|------|------------|------|
| `worker-runtime.test.ts` | test 14 | mock adapter 주입 → SUCCESS itemResult 생성 확인 |
| `worker-runtime.test.ts` | test 15 | disabled adapter 주입 → TRANSITION_ONLY plan 확인 |
| `worker-runtime.test.ts` | test 16 | live/prod/production/operating → throw 확인 |

### 전체 단위 테스트 통과 현황

| 파일 | pass |
|------|------|
| worker-runtime.test.ts | 16/16 ✅ |
| naver-api-mock-adapter.test.ts | 23/23 ✅ |
| naver-api-adapter-factory.test.ts | 17/17 ✅ |
| worker-processor.test.ts | 17/17 ✅ |
| worker-startup-config.test.ts | 13/13 ✅ |
| result-recording-adapter-factory.test.ts | 26/26 ✅ |
| result-recording-prisma-adapter.test.ts | 39/39 ✅ |
| worker-revalidation-repository-factory.test.ts | 18/18 ✅ |
| restricted-db-dry-run-safety.test.ts | 14/14 ✅ |
| result-recording.test.ts | 27/27 ✅ |
| worker-job-orchestration.test.ts | 20/20 ✅ |

**총합: 240/240 단위 테스트 pass**

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
 M channel-product-res.json                                (무관한 파일)
 M scripts/final-approval-execution-worker.ts              (이번 수정)
 M src/services/sku-keyword-final-approval-execution-worker-runtime.test.ts  (이번 수정)
?? docs/...wiring-result.md                                (이번 추가)
```

---

## 24. 다음 단계 제안

이번 Entrypoint Naver API Mock Adapter Wiring이 완료됐으므로, 다음 단계:

### 단계 7: Restricted DB Mock Execution (다음 별도 지시)

목표:
- Worker 실행 (restricted-db × 3 어댑터 + mock Naver API adapter)
- Queue enqueue 1건
- restricted-db revalidation
- restricted-db transition apply (BatchJob=EXECUTING, BatchJobItem=EXECUTING)
- mock Naver API adapter → itemResults SUCCESS
- restricted-db result recording write → BatchJob=EXECUTED, BatchJobItem=SUCCESS
- verify-after: BatchJob=EXECUTED, BatchJobItem=SUCCESS
- restore → BEFORE_FIXTURE_VALID

필요한 추가 env:
```
FINAL_APPROVAL_EXECUTION_NAVER_API_ADAPTER=mock
```

기존 env에서 변경:
- mode: `DRY_RUN_READY` → `EXECUTION_READY` (또는 mode 확인 필요)

아직 실제 Naver API live 호출은 하지 않는다.
