# Final Approval 실행 감사/이력 + 재실행 방지 결과 문서

## 1. 작업명

Final Approval 실행 이력 / 감사 로그 / 재실행 방지 UI와 서버 차단 보강

## 2. 실행 PC

Windows 11 Pro 10.0.26200

## 3. 실행 경로

`C:\Users\CORSAIR\Documents\naver-sku-manager`

## 4. 시작 커밋

`556a34a` — feat: enhance batch job execution result visibility in draft batch detail UI

## 5. 작업 목적

- 한 번 실행된 BatchJob이 실수로 다시 실행되지 않도록 UI+서버 양쪽 차단
- 실행 감사 정보(누가, 언제, 어떤 모드로, Naver API 호출 여부)를 화면에서 명확히 확인
- Mock 실행 결과라도 재실행은 기본 차단으로 표시

---

## 6. 화면에서 확인 가능한 감사/이력 정보 요약

| 항목 | 표시 여부 | 출처 |
|------|-----------|------|
| 어떤 FinalApproval이 실행됐는지 | ✅ | `executionMetadata.finalApprovalId` |
| BatchJob 상태 | ✅ | `job.status` (색상 배지) |
| BatchJobItem 상태 | ✅ | 항목별 상태 분포 배지 |
| 성공 item / 실패 item 수 | ✅ | `successItems`, `failedItems` 카드 |
| executedAt 시간 | ✅ | `job.executedAt` |
| 실행 Actor (actorId) | ✅ | `executionMetadata.actorId` (감사 섹션) |
| 실행 모드 (executionMode = adapterMode) | ✅ | `executionMetadata.executionMode` |
| Naver API 호출 여부 (naverApiCalled) | ✅ | `executionMode === 'live'`로 파생 — 현재는 항상 `아니오` |
| 스마트스토어 변경 여부 | ✅ | naverApiCalled와 동일 기준 |
| startedAt / finishedAt / recordedAt | ✅ | `executionMetadata.startedAt/endedAt/recordedAt` |
| 처리 시간 (durationMs) | ✅ | `executionMetadata.durationMs` |
| resultSummary 집계 | ✅ | `executionMetadata.resultSummary` |
| 이미 실행됐는지 여부 | ✅ | "재실행 차단됨" 배너 |
| 현재 재실행 가능 여부 | ✅ | 차단 사유 및 서버 차단 코드 표시 |

---

## 7. 재실행 차단 기준

### UI 기준 (`finalApprovalBlockingReasons`)

| BatchJob 상태 | 차단 메시지 |
|--------------|------------|
| `EXECUTED` | "이미 실행 기록이 있는 BatchJob입니다 (상태: EXECUTED). 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다." |
| `PARTIAL_SUCCESS` | 동일 (상태명만 다름) |
| `FAILED` | 동일 |
| `CANCELLED` | 동일 |
| `EXECUTING` | "BatchJob이 현재 실행 중입니다. 동시 실행은 허용되지 않습니다." |
| APPROVED 아닌 다른 상태 | "Batch 상태가 APPROVED가 아닙니다." |

`READY가 아닌 Item이 있습니다.` 메시지는 terminal/executing 상태에서 **중복 표시 억제됨** — 가장 구체적인 메시지만 표시.

### 서버 기준 (`sku-keyword-final-approval-execution-db-read-guard.service.ts`)

| 조건 | 이전 응답 코드 | 새 응답 코드 |
|------|-------------|------------|
| `job.status` ∈ {EXECUTED, PARTIAL_SUCCESS, FAILED, CANCELLED} | `JOB_NOT_APPROVED` (비구분) | `BATCH_JOB_ALREADY_EXECUTED` (명시적) |
| `job.status === 'EXECUTING'` | `JOB_NOT_APPROVED` (비구분) | `BATCH_JOB_ALREADY_EXECUTING` (명시적) |
| 그 외 non-APPROVED | `JOB_NOT_APPROVED` | `JOB_NOT_APPROVED` (유지) |

우선순위: BATCH_JOB_ALREADY_EXECUTED → BATCH_JOB_ALREADY_EXECUTING → JOB_NOT_APPROVED → NO_READY_ITEMS

### Replay Guard Pure Function (`evaluateFinalApprovalExecutionReplayGuard`)

| 입력 조건 | reasonCode |
|----------|-----------|
| `batchJobStatus === 'EXECUTED'` | `BATCH_JOB_ALREADY_EXECUTED` |
| `batchJobStatus === 'EXECUTING'` | `BATCH_JOB_ALREADY_EXECUTING` |
| `batchJobStatus === 'PARTIAL_SUCCESS'` | `BATCH_JOB_EXECUTION_PARTIAL` |
| `batchJobStatus === 'FAILED'` | `BATCH_JOB_EXECUTION_FAILED` |
| SUCCESS/FAILED items 존재 | `BATCH_JOB_HAS_EXECUTED_ITEMS` |
| FinalApproval not ACTIVE | `FINAL_APPROVAL_NOT_ACTIVE` |
| Job not APPROVED | `BATCH_JOB_NOT_APPROVED` |
| 모두 통과 | `ALLOWED_APPROVED_READY` (allowed=true) |

---

## 8. 신규 생성 파일

| 파일 | 내용 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-replay-guard.service.ts` | 재실행 평가 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-replay-guard.test.ts` | 22개 단위 테스트 |
| `docs/sku-keyword-final-approval-execution-audit-and-replay-block-result.md` | 이 결과 문서 |

## 9. 수정된 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/types/sku-keyword-final-approval-execution-api-response.types.ts` | `BATCH_JOB_ALREADY_EXECUTED`, `BATCH_JOB_ALREADY_EXECUTING` 추가 |
| `src/services/sku-keyword-final-approval-execution-db-read-guard.service.ts` | terminal 상태 및 EXECUTING 상태에 대해 명시적 guard code 추가 |
| `src/services/sku-keyword-final-approval-execution-db-read-guard.test.ts` | test 5 수정 + test 9-12 추가 (총 13개) |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | UI 전반 강화 (아래 참조) |

### page.tsx 변경 상세

1. **`finalApprovalBlockingReasons` 로직 강화**
   - terminal 상태 → 재실행 차단 명시 메시지
   - EXECUTING → 동시 실행 차단 메시지
   - terminal/executing 시 "READY가 아닌 Item" 중복 메시지 억제

2. **FinalApproval 섹션 — "재실행 차단됨" 빨간 배너 추가**
   - EXECUTED/PARTIAL_SUCCESS/FAILED/CANCELLED 상태에서 표시
   - executedAt, actorId, executionMode, finalApprovalId 표시
   - "실행 중" 앰버 배너 (EXECUTING 상태)

3. **BatchJob 실행 결과 섹션 — "실행 감사 정보 (Audit Trail)" 섹션 추가**
   - BatchJob ID, FinalApproval ID, Actor ID
   - 실행 모드 (adapterMode) — executionMode와 동일값
   - **Naver API 호출 여부** — `executionMode === 'live'`로 파생 (현재: 항상 `아니오`)
   - 스마트스토어 변경 여부 — 동일 기준
   - totalItems, executedAt, startedAt, finishedAt, durationMs

4. **실행 결과 섹션 하단 — "재실행 차단" 경고 블록 추가**
   - 서버 차단 코드 (`BATCH_JOB_ALREADY_EXECUTED`, `BATCH_JOB_ALREADY_EXECUTING`) 명시

---

## 10. 단위 테스트 결과

| 파일 | 테스트 수 | pass |
|------|---------|------|
| `sku-keyword-final-approval-execution-replay-guard.test.ts` | 22 | 22 ✅ |
| `sku-keyword-final-approval-execution-db-read-guard.test.ts` | 13 (+5) | 13 ✅ |
| `sku-keyword-final-approval-execution-result-recording.test.ts` | 27 | 27 ✅ |
| `sku-keyword-final-approval-execution-naver-api-live-safety-gate.test.ts` | 28 | 28 ✅ |
| `sku-keyword-final-approval-execution-naver-api-adapter-factory.test.ts` | 20 | 20 ✅ |

---

## 11. Prisma validate 결과

```
✅ The schema at prisma\schema.prisma is valid
```

(schema.prisma 수정 없음 — DB schema 변경 없음)

## 12. tsc --noEmit 결과

```
✅ clean — 에러 없음
```

---

## 13. 성공/실패 판정

**✅ 완전 성공**

| 항목 | 결과 |
|------|------|
| Replay Guard pure function 구현 | ✅ |
| Replay Guard 22개 테스트 | ✅ 22/22 pass |
| DB Guard 명시적 replay 코드 추가 | ✅ |
| DB Guard 테스트 업데이트 (13개) | ✅ 13/13 pass |
| API 응답 타입 확장 | ✅ |
| UI — 재실행 차단 메시지 구체화 | ✅ |
| UI — "재실행 차단됨" 빨간 배너 | ✅ |
| UI — 실행 감사 정보 Audit Trail | ✅ |
| UI — naverApiCalled 파생 표시 | ✅ |
| UI — adapterMode 별도 레이블 | ✅ |
| UI — 서버 차단 코드 표시 | ✅ |
| tsc --noEmit | ✅ clean |
| Prisma validate | ✅ valid |
| 실제 Naver API 호출 | ❌ 없음 (의도적) |
| 운영 DB/Redis 접근 | ❌ 없음 |

---

## 14. 남은 문제

- `naverApiCalled` DB 저장 없음 — `executionMode`로 파생하는 현재 방식 유지
- Worker DB revalidation (`sku-keyword-final-approval-execution-worker-job-db-revalidation.service.ts`)은 `JOB_NOT_APPROVED`를 그대로 사용 — Worker 내부 코드로 사용자 노출 없으므로 이번 범위 밖
- 재실행 승인 흐름 미구현 — 다음 작업 범위

## 15. 다음 작업 제안

1. **재실행 승인 흐름 구현** — override/re-execute 전용 승인 채널
2. **Worker DB revalidation에도 명시적 replay code 적용** — `BATCH_JOB_ALREADY_EXECUTED` / `BATCH_JOB_ALREADY_EXECUTING` 리턴
3. **Live 단일 테스트 실행 전 감사 체크리스트** — 이 화면이 검증 용도로 활용 가능한 구조 확인
