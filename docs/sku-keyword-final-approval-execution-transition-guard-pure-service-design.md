# FinalApproval Execution Transition Guard Pure Service Design

## 1. 작업 목적
Worker가 DB Revalidation 통과 후 실제 상태 전환(EXECUTING) 및 외부 API 연동(Naver API) 단계로 넘어가기 전, 전환에 대한 허용/차단 조건을 독립적인 **순수 함수(Pure Service)** 로 분리하여 예측 가능하고 안전한 상태 전이를 검증하는 구조를 설계합니다.

> [!IMPORTANT]
> **핵심 원칙**
> - pure service는 DB 접근을 하지 않습니다.
> - pure service는 Redis 접근을 하지 않습니다.
> - pure service는 Naver API를 호출하지 않습니다.
> - pure service는 `Date.now()` 직접 호출을 피하고 `now`를 명시적 인자로 받습니다.
> - pure service는 상태 전환을 수행하지 않고, 허용/차단 판정만 반환합니다.
> - EXECUTING 전환은 아직 구현하지 않습니다.
> - DB write는 아직 구현하지 않습니다.
> - live mode는 아직 금지합니다.

## 2. 현재 완료 상태 요약
- DB Revalidation 기반의 Worker 동작 및 No-Op 검증이 모두 성공적으로 완료되었습니다.
- Execution Transition Guard에 대한 개념 설계 문서가 작성되었습니다.

## 3. Transition Guard pure service가 필요한 이유
- 상태 전환 논리를 외부 인프라(DB, Redis, 외부 시계 등)와 강하게 결합하면 유닛 테스트가 매우 어려워집니다.
- Pure Function 형태로 분리함으로써, 모든 코너 케이스(에지 케이스, 경계 시간 등)를 100% 독립적으로 테스트하고 커버리지를 보장할 수 있습니다.

## 4. 기존 DB Revalidation 서비스와의 차이
- **DB Revalidation 서비스**: 데이터베이스 조회(Repository 통신)를 포함한 인프라 의존적 과정. DB 상태와 Payload Hash 간 불일치를 탐지합니다.
- **Transition Guard Pure Service**: DB에서 이미 가져온 Snapshot 데이터와 현재의 Context 데이터만 전달받아, 인프라 개입 없이 순수하게 비즈니스 로직(시간 만료, 모드, 상태)만을 판정합니다.

## 5. pure service 입력 모델 후보
- `targetSnapshot`: DB에서 조회해 온 현재 데이터 스냅샷 (FinalApproval, BatchJob, BatchJobItem 등)
- `executionMode`: 'MOCK' | 'DRY_RUN_READY' | 'LIVE'
- `requestPayload`: 해시 대조 및 검증 대상 Payload (idempotencyKey 포함)
- `now`: 검증 기준이 되는 현재 시각 (`Date`)

## 6. pure service 출력 모델 후보
- `isAllowed`: 전환 허용 여부 (boolean)
- `reasonCode`: 실패 시 명확한 에러 사유 코드
- `message`: 로깅 및 사용자 대상 실패 사유 상세 메시지

## 7. 허용 조건
- 모든 의존성 상태(Job, JobItem, FinalApproval)가 요구 조건에 완벽히 부합하고 유효기간 내에 있으며, `mode`가 허용된 상태(`DRY_RUN_READY` 또는 `MOCK`)이고 Payload/Validation 해시가 정확히 일치할 때만 허용됩니다.

## 8. 차단 조건
- 허용 조건 중 단 하나라도 어긋난 경우 즉시 차단되며, 구체적 `reasonCode`가 반환됩니다.

## 9. FinalApproval 상태 기준
- `status === 'ACTIVE'`

## 10. BatchJob 상태 기준
- `status === 'APPROVED'`

## 11. BatchJobItem 상태 기준
- `status === 'READY'`

## 12. validationExpiresAt 기준
- `snapshot.validationExpiresAt.getTime() > now.getTime()` (만료 이전이어야 함)

## 13. payloadHash / validationSnapshotHash 기준
- 입력된 `requestPayload`를 기반으로 산출된 Hash 값이, Snapshot 데이터 내의 Hash 속성과 일치해야 합니다.

## 14. idempotencyKey 기준
- `idempotencyKey`가 이전에 완료된 작업(Completed Jobs) 해시에 등록되어 있지 않아야 합니다.

## 15. dry-run mode 기준
- `executionMode`가 `DRY_RUN_READY`일 경우 조건만 충족하면 통과시킵니다.

## 16. live mode 금지 기준
- 현재 설계에서는 `executionMode === 'LIVE'` 인 경우 **무조건 차단(Block)** 합니다.

## 17. 중복 실행 방지 기준
- 동일한 `idempotencyKey`로 인해 중복 요청으로 판단되면 에러가 아닌 `ALREADY_COMPLETED` (No-Op 통과) 코드로 반환하여 재실행을 안전하게 방어합니다.

## 18. 실패 사유 코드 후보
- `NOT_ACTIVE_FINAL_APPROVAL`
- `NOT_APPROVED_BATCH_JOB`
- `NOT_READY_BATCH_JOB_ITEM`
- `EXPIRED_VALIDATION`
- `HASH_MISMATCH`
- `LIVE_MODE_NOT_ALLOWED`

## 19. 테스트 케이스 후보
- 유효기간이 정확히 현재 시각과 동일할 때의 경계 테스트 (Edge case)
- `LIVE` 모드 입력 시 무조건 실패 반환 확인
- 해시가 불일치할 때의 차단 로직 확인
- `now`를 고정하여 테스트의 멱등성 및 순수함수 특성 입증

## 20. 파일 추가 후보
- **Service**: `src/services/sku-keyword-final-approval-execution-transition-guard.service.ts`
- **Test**: `src/services/sku-keyword-final-approval-execution-transition-guard.test.ts`
- **Type**: `src/types/sku-keyword-final-approval-execution-transition-guard.types.ts`

## 21. 기존 파일 수정 금지 후보
- 본 Pure Service 추가 작업 중에는 기존의 `route.ts`, `schema.prisma`, DB 관련 Repository, Queue 설정 파일 등을 일절 수정하지 않습니다.

## 22. 성공 기준
- 외부 인프라에 전혀 의존하지 않는 순수 함수 형태의 서비스 코드가 이 설계대로 구현되는 것.
- 모든 테스트 케이스가 순수하게 Mock 의존 없이 통과되는 것.

## 23. 실패 기준
- `Date.now()`를 내부에서 임의로 호출하여 함수의 결정성(Determinism)을 깨트리는 경우.
- 서비스 내부에서 DB, Redis, API 등의 인프라 접근 시도를 하는 경우.
- LIVE 모드를 실수로 통과시키는 경우.

## 24. 다음 단계 제안
- 본 설계 문서의 원칙에 따라 `sku-keyword-final-approval-execution-transition-guard.service.ts` 파일과 해당 인터페이스, 유닛 테스트를 실제로 작성하고 테스트(순수 함수 단위 테스트)를 검증합니다.
