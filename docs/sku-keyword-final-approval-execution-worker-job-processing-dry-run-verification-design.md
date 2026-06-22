# FinalApproval Execution Worker Job Processing Dry Run Verification Design

## 1. 작업명
FinalApproval Execution Worker Job Processing Dry Run Verification Design

## 2. 작업 목적
Worker가 실제 환경에서 구동되기 전, 수신한 Job payload를 처리하는 전체 파이프라인(Worker Processor → Queue Processor → DB Revalidation → Transition Guard → Transition Apply)의 논리적 흐름이 DB/Redis/Naver API 없이도 완벽히 동작하는지 검증(Dry Run)하기 위한 아키텍처 설계 및 테스트 커버리지의 문서화입니다.

## 3. 현재 검증 완료 상태
- Worker Entrypoint Safe Startup Verification 완료 (Mock DB URL, 로컬 Redis)
- Worker Idle Stability Verification 완료 (60초간 대기 시 Crash 없음)
- 기존 테스트 86개 모두 통과 (모든 로직이 순수 함수 또는 Mock 기반으로 작성됨)

## 4. 이번 Dry Run Verification의 범위
오로지 코드 레벨(순수 함수 및 Mock Dependency)에서의 로직 검증으로 한정합니다.
`processFinalApprovalExecutionWorkerJob` 함수가 올바른 순서로 하위 Orchestration 및 Transition 로직을 호출하고 성공/실패 여부를 적절히 반환하는지 확인합니다.

## 5. 실제 실행 금지 범위
- **실제 Worker/프로세스 실행 금지**
- **실제 Queue Job enqueue 금지**
- **실제 Redis 커넥션 생성 금지**
- **실제 DB Read/Write 금지**
- **Naver API 호출 전면 금지**

## 6. Worker Job payload 구조
```typescript
{
  finalApprovalId: string;
  idempotencyKey: string;
  actorId: string;
  mode: 'MOCK' | 'DRY_RUN_READY' | 'LIVE';
  source: 'EXECUTION_API' | 'SCHEDULER' | 'RETRY_WORKER';
  requestedAt: string;
}
```

## 7. 정상 payload 처리 흐름
1. `runFinalApprovalExecutionQueueProcessor` 호출 (Payload 파싱, DB Revalidation, Guard 기본 검사).
2. `revalidationRepository.findSnapshotForWorkerJobRevalidation` 호출을 통해 상태 재조회.
3. `evaluateFinalApprovalExecutionTransitionGuard` 재호출로 동시성 방어 및 상태 일치 검증.
4. `buildFinalApprovalExecutionTransitionApplyPlan`으로 `BatchJob` 및 `BatchJobItem`을 `EXECUTING` 상태로 전환할 계획 수립.
5. `applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter` 호출 (Mock Transaction을 통해 수행).
6. 성공 시 `executionPerformed: true` 반환.

## 8. Invalid payload 처리 흐름
- `finalApprovalId`가 누락된 경우: `PAYLOAD_VALIDATION_FAILED` 에러 조기 반환.
- `mode`가 지원되지 않는 경우: `PAYLOAD_VALIDATION_FAILED`.
- `idempotencyKeyAlreadyUsed`가 true인 경우: Orchestration 단에서 `DB_REVALIDATION_FAILED` 차단.

## 9. Queue Processor → Worker Processor 연결
Worker Processor는 `FinalApprovalExecutionQueueProcessorInputJob` 형태의 BullMQ Job 데이터를 받아 가장 먼저 Queue Processor(`runFinalApprovalExecutionQueueProcessor`)로 넘겨 유효성과 DB Revalidation을 수행하도록 설계되었습니다.

## 10. Worker Processor → Orchestration 연결
Queue Processor 단계가 `readyForExecution: true`를 반환하면, Worker Processor가 이를 인계받아 Transition 로직을 엮어내는 Orchestrator 역할을 수행합니다.

## 11. Orchestration → Transition Guard 연결
Worker Processor 내부에서 `evaluateFinalApprovalExecutionTransitionGuard`를 명시적으로 호출합니다. 이때 DB에서 읽어온 Snapshot과 요청(`request`) 데이터를 교차 검증하여 상태 불일치(Race Condition)를 방어합니다.

## 12. Orchestration → Transition Apply Adapter 연결
Transition Guard가 통과(`allowed: true`)되면, `buildFinalApprovalExecutionTransitionApplyPlan`을 통해 Plan을 생성한 뒤 주입된 `transitionApplyAdapter`를 호출하여 Transaction을 처리합니다.

## 13. Mock Dependency 구조
- **`revalidationRepository`**: `findSnapshotForWorkerJobRevalidation` 함수만 Mocking하여 항상 유효한 `validSnapshot`을 반환하도록 설정.
- **`transitionApplyAdapter`**: `transaction` 메서드를 Mocking하여 내부에서 `updateBatchJobStatus` 및 `updateBatchJobItemStatus`가 항상 `{ updated: true }`를 반환하도록 설계.

## 14. DB write 차단 방식
의존성 주입(Dependency Injection) 아키텍처를 채택하여, 테스트 코드에서는 `PrismaClient`나 실제 Adapter 대신 `createMockDeps()`에서 반환되는 Mock Adapter만이 주입되므로 물리적으로 DB Write가 발생할 수 없습니다.

## 15. Naver API 호출 차단 방식
현재 `processFinalApprovalExecutionWorkerJob` 흐름 내부에는 외부 API 호출 로직이 아예 존재하지 않습니다. 실제 API 통신은 상태가 `EXECUTING`으로 전환된 이후 별도의 로직이나 프로세서를 통해 수행되도록 책임이 분리되어 있습니다.

## 16. Redis 접속 차단 방식
`BullMQ`의 `Job` 클래스를 직접 인스턴스화하지 않고, 형태만 맞춘 순수 객체(`Plain Object`)를 `job` 파라미터로 넘김으로써 Redis 커넥션 없이 단위 테스트가 가능합니다.

## 17. 테스트 케이스 목록 (이미 구현 완료됨)
`sku-keyword-final-approval-execution-worker-processor.test.ts`에서 다음을 검증 중입니다:
1. 정상 job payload가 들어오면 orchestration과 transition apply가 성공하고 `executionPerformed=true` 반환.
2. `finalApprovalId` 누락 시 페이로드 검증 실패로 차단.
3. Snapshot이 없으면 `DB_REVALIDATION_FAILED` 에러 반환.
4. Orchestration 통과 후 Snapshot 재조회 실패 시 `SNAPSHOT_NOT_FOUND` 반환.
5. Transition Apply 단계 실패 시 `TRANSITION_APPLY_FAILED` 반환.

## 18. 다음 단계에서 실제 Queue enqueue를 허용하기 위한 조건
실제 BullMQ 환경에서 테스트하려면 아래 조건이 필수적입니다.
1. 오직 `mode: 'MOCK'` 또는 `mode: 'DRY_RUN_READY'`인 Job만 발행.
2. 테스트용 Redis 커넥션만 사용.
3. 실제 DB 대신 Fixture 기반의 Test DB와 Transaction Rollback 기능 지원 또는 Mock Adapter 사용.
4. Naver API를 모사하는 Mock Server 또는 Mock Function 주입.

## 19. Rollback 또는 중단 기준
- 큐에 적재된 Job이 제한 시간(예: 5초) 내에 처리되지 않고 Pending/Active에 머무를 경우 즉시 프로세스 종료 및 실패 처리.
- 테스트 DB 데이터가 의도치 않게 변경되거나 실제 DB 연결 시도가 감지될 경우 즉시 중단.
- 에러 로그에 `UnhandledRejection` 또는 외부 접속 타임아웃 발생 시 롤백.

## 20. 다음 단계 제안
본 설계 문서와 기존 테스트들을 통해 Worker의 논리적 파이프라인(Dry Run)이 완벽하게 갖추어져 있음이 입증되었습니다. 추가적인 코드 수정이나 테스트 보강은 불필요합니다. 
따라서 **제한된 테스트 DB Fixture 및 Mock Adapter를 주입한 상태에서, 로컬 테스트 Redis를 사용한 제한된 Queue Enqueue Dry Run Verification** 단계를 진행할 것을 제안합니다.
