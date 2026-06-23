# FinalApproval Execution Worker — Result Recording Adapter Wiring 결과 문서

## 목적

`processFinalApprovalExecutionWorkerJob` (Worker Processor)의 Transition Apply 단계 이후에
Result Recording Adapter를 호출하도록 의존성을 주입(wiring)한다.

이 단계에서는 실제 Worker 실행, Redis 접속, DB write를 하지 않는다.
mock 기반 단위 테스트로만 동작을 검증한다.

---

## 변경 파일 목록

| 파일 | 변경 유형 | 내용 |
|------|-----------|------|
| `src/types/sku-keyword-final-approval-execution-result-recording.types.ts` | 수정 | `ResultRecordingAdapterResult`, `ResultRecordingAdapterPort` 인터페이스 추가 |
| `src/services/sku-keyword-final-approval-execution-result-recording-adapter-factory.service.ts` | 신규 | `createNoOpResultRecordingAdapter` 팩토리 함수 |
| `src/services/sku-keyword-final-approval-execution-result-recording-adapter-factory.test.ts` | 신규 | 팩토리 단위 테스트 9개 |
| `src/services/sku-keyword-final-approval-execution-worker-processor.service.ts` | 수정 | `resultRecordingAdapter?` 의존성 추가, 6·7단계 추가 |
| `src/services/sku-keyword-final-approval-execution-worker-processor.test.ts` | 수정 | recording wiring 테스트 7개 추가 (테스트 6–12) |

---

## Worker Processor Flow (변경 후)

```
Job 수신
  │
  ▼
1. runFinalApprovalExecutionQueueProcessor
   (Payload 검증 → DB Revalidation → Transition Guard)
  │  실패 → 조기 반환 (success:false)
  ▼
2. Snapshot 재조회 (2nd DB 호출)
  │  null → SNAPSHOT_NOT_FOUND
  ▼
3. Transition Guard 재평가
  │  차단 → TRANSITION_GUARD_BLOCKED
  ▼
4. Transition Apply Plan 빌드
  │
  ▼
5. applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter
   (Job APPROVED→EXECUTING, Items READY→EXECUTING)
  │  미적용 → TRANSITION_APPLY_FAILED
  ▼
6. ★ buildExecutionResultPlan (신규)
   mode='dry-run', itemResults=[]
   → applicable=false, outcome=TRANSITION_ONLY
  │
  ▼
7. ★ resultRecordingAdapter.applyExecutionResultPlan(plan) (신규)
   기본값: createNoOpResultRecordingAdapter() → applied=false
  │  throw → RESULT_RECORDING_FAILED (executionPerformed=true)
  ▼
8. success:true, executionPerformed:true
```

---

## ResultRecordingAdapterPort 인터페이스

```typescript
// src/types/sku-keyword-final-approval-execution-result-recording.types.ts

export interface ResultRecordingAdapterResult {
  applied: boolean;
  skippedReason?: string;
  jobUpdated?: boolean;
  itemsUpdated?: number;
}

export interface ResultRecordingAdapterPort {
  applyExecutionResultPlan(plan: ExecutionResultPlan): Promise<ResultRecordingAdapterResult>;
}
```

---

## FinalApprovalExecutionWorkerProcessorDependencies (변경 후)

```typescript
export interface FinalApprovalExecutionWorkerProcessorDependencies {
  revalidationRepository: FinalApprovalExecutionWorkerJobDbRevalidationRepository;
  transitionApplyAdapter: TransitionApplyPrismaAdapterPort;
  /**
   * Result recording adapter.
   * Defaults to no-op when omitted — plan is built and passed to the adapter
   * but no DB write occurs until the Naver API execution phase provides itemResults.
   */
  resultRecordingAdapter?: ResultRecordingAdapterPort;
}
```

---

## No-op Adapter 동작 규칙

| plan.applicable | skippedReason 내용 |
|-----------------|--------------------|
| `true` | `"no-op: mock recording adapter — DB write skipped"` |
| `false` | `"no-op: plan not applicable ({plan.blockedReason})"` |

항상 `applied: false` 반환. `jobUpdated`, `itemsUpdated` 없음.
DB 접속 없음. import 사이드 이펙트 없음.

---

## Recording Plan 특성 (현 단계)

- `mode: 'dry-run'` 고정 → `applicable: false`
- `itemResults: []` → `outcome: 'TRANSITION_ONLY'`
- 어댑터는 호출되지만 DB write 없음
- 향후 Naver API 실행 결과 추가 시 `mode: 'restricted-db'` + `itemResults` 제공 예정

---

## 에러 코드

| code | 발생 시점 | executionPerformed |
|------|-----------|--------------------|
| `RESULT_RECORDING_FAILED` | recording adapter가 throw | `true` (transition은 완료됨) |
| `TRANSITION_APPLY_FAILED` | transition adapter 실패 | `false` |

Recording adapter가 `{ applied: false }` 반환하는 것은 정상 경로 (no-op). Worker는 성공 반환.

---

## 테스트 결과

### Worker Processor 테스트 (5 → 12개)

| # | 테스트 | 결과 |
|---|--------|------|
| 1 | 정상 flow, executionPerformed=true | ✅ pass |
| 2 | payload 누락 → PAYLOAD_VALIDATION_FAILED | ✅ pass |
| 3 | snapshot 없음 → DB_REVALIDATION_FAILED | ✅ pass |
| 4 | 2nd snapshot null → SNAPSHOT_NOT_FOUND | ✅ pass |
| 5 | Transition Apply 실패 → TRANSITION_APPLY_FAILED | ✅ pass |
| **6** | **recordingAdapter 1회 호출 확인** | ✅ pass |
| **7** | **adapter 없으면 no-op default → 성공** | ✅ pass |
| **8** | **adapter throw → RESULT_RECORDING_FAILED** | ✅ pass |
| **9** | **Transition 실패 시 recording 미호출 확인** | ✅ pass |
| **10** | **plan.applicable=false, itemUpdates=[] 확인** | ✅ pass |
| **11** | **applied=false 반환 → Worker 성공** | ✅ pass |
| **12** | **applied=true 반환 → Worker 성공** | ✅ pass |

### Result Recording Adapter Factory 테스트 (신규 9개)

| # | 테스트 | 결과 |
|---|--------|------|
| 1 | createNoOpResultRecordingAdapter 객체 반환 | ✅ pass |
| 2 | applied=false 항상 반환 | ✅ pass |
| 3 | applicable plan → skippedReason 'no-op' 포함 | ✅ pass |
| 4 | non-applicable plan → blockedReason 포함 | ✅ pass |
| 5 | 어떤 plan에도 throw 없음 | ✅ pass |
| 6 | 결과 JSON 직렬화 가능 | ✅ pass |
| 7 | 복수 호출 → fresh 인스턴스 (싱글톤 아님) | ✅ pass |
| 8 | jobUpdated, itemsUpdated absent | ✅ pass |
| 9 | import 시 Prisma/DB 연결 없음 | ✅ pass |

**총 신규 테스트: 16개 (기존 5 + 신규 7 processor, + 신규 9 factory)**

---

## 보안 / 안전성

- 이 단계에서 DB write 없음
- No-op adapter는 import 시 외부 연결 없음
- `createNoOpResultRecordingAdapter` — 순수 함수, 사이드 이펙트 없음
- `.env`, `.env.test` 미열람
- Prisma / BullMQ / Redis 미연결

---

## 다음 단계 (미구현)

- Naver API 실행 후 `itemResults` 를 processor에 제공하는 단계
- `mode: 'restricted-db'` 전환
- `createWorkerResultRecordingAdapter(options)` — env var 기반 팩토리
- `FINAL_APPROVAL_EXECUTION_RESULT_RECORDING_ADAPTER=restricted-db` 환경변수 처리
- Restricted DB E2E: transition apply → recording adapter → DB write 검증
