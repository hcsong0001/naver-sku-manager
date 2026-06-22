# FinalApproval Execution Transition Apply DB Write Boundary Design

## 1. 작업 목적
Transition Guard가 `allowed=true`를 반환하여 안전성이 확보된 이후, 시스템 상태를 실제로 실행 중(`EXECUTING`)으로 전이시키기 위한 DB Write(Transition Apply)의 허용 조건, 범위, 그리고 엄격한 경계(Boundary)를 설계합니다.

## 2. 현재 완료 상태 요약
- Transition Guard Pure Service가 구현되어 Worker Job Orchestration에 성공적으로 통합되었습니다.
- 테스트 34개가 통과되었으며, Guard 통과/차단 로직이 완벽하게 동작함이 증명되었습니다.
- 이 과정에서 DB Write, EXECUTING 전환, Naver API 호출은 일절 발생하지 않았습니다.

## 3. 이 설계가 필요한 이유
- Guard 통과 후 실제로 데이터베이스의 상태를 변경하는 첫 단계입니다.
- 단 한 번의 잘못된 `EXECUTING` 상태 전이는 롤백이 매우 복잡하거나 라이브 환경에 심각한 오류를 초래할 수 있으므로, 어떤 조건 하에서 트랜잭션을 허용할 것인지 명확한 Boundary 설계가 필수적입니다.

## 4. Transition Guard와 Transition Apply의 차이
- **Transition Guard**: 읽기 전용으로(Read-Only), 상태를 확인하고 허용/차단 여부만 판정하는 순수 함수입니다. (Side-effect 없음)
- **Transition Apply**: Guard가 `true`를 반환했을 때만 실행되며, 실제 DB의 상태 레코드를 업데이트하는 쓰기 작업(Write Operation)을 담당합니다. (Side-effect 발생)

## 5. EXECUTING 전환의 의미
- 해당 BatchJob 및 JobItem들이 다른 프로세스나 Worker에 의해 중복 처리되지 않도록 일종의 Lock을 거는 과정입니다.
- 이 상태 전환은 곧 "Naver API 호출을 시작해도 좋다"는 시스템적 허가 도장(Stamp) 역할을 합니다.

## 6. DB write 허용 전제 조건
- Transition Guard의 반환값이 명확히 `allowed=true`여야 합니다.
- 타겟 환경이 명백하게 식별된 `dry-run/MOCK` 검증 모드이거나, 최종 승인된 `live` 실행 환경일 경우만 허용됩니다. (현재 단계 설계상 `live`는 여전히 배제됩니다).

## 7. DB write 금지 조건
- Transition Guard에서 `allowed=false`를 반환한 경우 절대 금지.
- 상태가 이미 완료(`COMPLETED`)이거나 `FAILED`로 전이된 경우 절대 금지.
- 트랜잭션 처리가 보장되지 않는 단일 쿼리 연속 실행 금지.

## 8. 상태 전환 대상 테이블 후보
- `NaverApiBatchJob`
- `NaverApiBatchJobItem`
- (참고: `NaverApiBatchFinalApproval`는 전환 대상에서 제외하거나 특수 처리)

## 9. NaverApiBatchJob 상태 전환 기준
- `APPROVED` 상태에서 **`EXECUTING`** 상태로 변경되어야 합니다.

## 10. NaverApiBatchJobItem 상태 전환 기준
- `READY` 상태인 모든 하위 Item들이 **`EXECUTING`** 상태로 변경되어야 합니다.

## 11. NaverApiBatchFinalApproval 상태 유지 기준
- `FinalApproval`은 단일 승인 내역 자체를 나타내므로, `ACTIVE` 상태를 그대로 **유지(Maintain)**합니다. `EXECUTING`이라는 별도 상태를 가지지 않습니다.

## 12. NaverApiBatchFinalApprovalItem 상태 유지 기준
- 이 역시 원본 승인 대상 항목의 정합성 유지를 위해 현재 상태를 그대로 **유지(Maintain)**합니다.

## 13. allowed=true 결과와 DB write 연결 기준
- Guard 결과가 참(`true`)일 때만 `idempotencyKey`와 함께 `TransitionApplyService`의 입력으로 주입되어 데이터베이스 트랜잭션을 트리거합니다.

## 14. allowed=false 결과에서는 DB write 금지 기준
- 차단된 경우 에러 코드(`TRANSITION_GUARD_BLOCKED`)와 함께 Orchestration이 즉시 종료되며, 어떤 조건에서도 DB Write를 우회(Bypass)해서는 안 됩니다.

## 15. idempotencyKey 처리 기준
- `Transition Apply` 과정에서 이 `idempotencyKey`가 해당 `BatchJob` 또는 관련 테이블의 이력(History/Log)에 기록되거나 플래그 처리되어, 중복 적용 시도를 즉각 식별할 수 있어야 합니다.

## 16. 중복 Job 처리 기준
- 동일한 `idempotencyKey`가 이미 적용된 경우, DB Write를 생략하고 즉각 No-Op 처리(혹은 `ALREADY_EXECUTING` 오류)로 조기 반환(Early Return)합니다.

## 17. 이미 EXECUTING인 경우 처리 기준
- Guard에서 일차적으로 걸러지지만, 동시성 이슈로 DB 트랜잭션 레벨에서 이미 `EXECUTING`임이 발견되면 낙관적 잠금(Optimistic Lock) 실패로 간주하여 에러 처리 및 중단합니다.

## 18. 부분 실패 방지 기준
- Job은 `EXECUTING`이 되었으나 JobItem은 `READY`로 남아있는 등의 불일치를 막기 위해 **반드시 Atomic한 트랜잭션**으로 처리되어야 합니다.

## 19. transaction 사용 기준
- Prisma Client의 `$transaction` 블록 내에서 `NaverApiBatchJob` 업데이트와 다수의 `NaverApiBatchJobItem` 업데이트를 하나의 단위로 묶어 처리합니다.

## 20. rollback 기준
- 트랜잭션 내부 로직 중 어느 하나라도 실패하거나 예외가 발생하면 전체 업데이트를 Rollback하여 이전의 `APPROVED`/`READY` 상태를 원상 복구합니다.

## 21. 테스트 DB에서만 허용 가능한 다음 검증 범위
- DB Write 구현이 진행되더라도, 오직 `tms-final-approval-test-postgres` 데이터베이스 내의 더미 Seed 데이터를 대상으로만 로직을 검증합니다.

## 22. 운영 DB에서 절대 금지되는 범위
- 어떠한 상황에서도 운영 DB에 연결하여 `EXECUTING` 상태로 임의 조작하거나 테스트하는 것은 시스템 장애를 유발하므로 절대 금지합니다.

## 23. Naver API 호출과 분리해야 하는 경계
- `Transition Apply`는 오직 DB의 `EXECUTING` 갱신까지만 책임집니다. DB 변경 트랜잭션 내부에서 Naver API를 호출하는 행위는 트랜잭션 대기(Timeout) 문제를 야기하므로 **철저히 분리(Boundary)**해야 합니다.

## 24. dry-run mode와 live mode 분리 기준
- `dry-run` 모드 환경에서도 `EXECUTING` 전이 트랜잭션 검증 자체는 허용됩니다. 단, 이후 로직에서 `live` API 호출을 막는 추가 Guard가 있어야 합니다. 현재 설계는 `live` 모드 자체를 지속 금지합니다.

## 25. 다음 구현 후보 파일
- **Service**: `src/services/sku-keyword-final-approval-execution-transition-apply.service.ts`
- **Test**: `src/services/sku-keyword-final-approval-execution-transition-apply.test.ts`
- **Type**: `src/types/sku-keyword-final-approval-execution-transition-apply.types.ts`

## 26. 테스트 케이스 후보
- 성공 시 Job과 JobItem들이 `EXECUTING`으로 반환되는 로직 단위 테스트.
- 하나라도 `READY`가 아닌 경우 트랜잭션이 실패하는 로직 검증.
- 중복 `idempotencyKey` 입력 시 조기 반환 검증.

## 27. 성공 기준
- 명확한 DB 트랜잭션 규칙이 수립되고, EXECUTING 전이 대상 테이블과 아닌 테이블(FinalApproval)의 구분이 논리적으로 타당하게 문서화되는 것.

## 28. 실패 기준
- Naver API 연동과 DB Write가 하나의 로직 내에 혼재되도록 설계되거나, 트랜잭션 처리가 배제된 경우.

## 29. 보안 점검
- `DATABASE_URL` 등 운영 환경과 직결되는 환경변수가 설계 문서 및 로직 구상 중에 원본 노출되지 않도록 철저히 통제합니다.

## 30. 다음 단계 제안
- 본 문서를 기초로, 실제 트랜잭션 로직 없이 인터페이스나 Pure 함수 형태를 우선 구현하여 로직의 흐름을 단위 테스트로 확인하는 **Transition Apply Service (Interface/Pure layer) 구현 단계**로 넘어갈 것을 제안합니다.

> [!IMPORTANT]
> - **이번 설계 단계에서는 DB write를 실제로 수행하지 않습니다.**
> - **이번 설계 단계에서는 EXECUTING 전환을 실제로 수행하지 않습니다.**
> - 다음 구현도 처음에는 pure service 또는 port/interface 중심으로 시작합니다.
> - 실제 Prisma adapter는 별도 단계에서 구현합니다.
> - 실제 테스트 DB write 검증은 또 별도 Verification 단계에서만 수행합니다.
> - Naver API 호출은 EXECUTING 전환 이후에도 별도 설계 전까지 금지합니다.
> - live mode는 계속 금지합니다.
