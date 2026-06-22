# FinalApproval Execution Transition Apply Prisma Adapter Design

## 1. 작업 목적
Transition Apply Pure Service가 생성한 '상태 전환 계획(Transition Plan)'을 입력받아, 데이터베이스 계층에서 안전하게 실제 DB Write 트랜잭션을 수행하기 위한 Prisma Adapter의 책임 경계, 성공/실패 기준 및 Idempotency 처리 방식을 설계합니다.

## 2. 현재 완료 상태 요약
- `Transition Guard`와 `Transition Apply Pure Service`의 구현 및 50개 테스트 검증이 완료되었습니다.
- DB에 접근하지 않고 `allowed=true`일 때 어떤 테이블을 업데이트해야 하는지 명세하는 Transition Plan 생성이 성공적으로 검증되었습니다.

## 3. Prisma Adapter가 필요한 이유
- 순수 함수가 만든 논리적 전환 계획을 물리적 데이터베이스 변경 사항으로 커밋하기 위해 필요합니다.
- 동시성 이슈, 트랜잭션 보장, 낙관적 잠금(Optimistic Concurrency Control) 처리를 애플리케이션 비즈니스 로직과 분리하여 인프라(DB) 어댑터 계층으로 격리하기 위함입니다.

## 4. Pure Service와 Prisma Adapter의 차이
- **Pure Service**: 상태와 의도를 계산하여 계획만 반환. DB 접근, Side-effect 없음. 단위 테스트가 용이함.
- **Prisma Adapter**: 순수 함수의 계획을 넘겨받아 실제 Prisma Client를 사용해 DB에 트랜잭션을 날리는 인프라 계층. Side-effect를 전담.

## 5. Transition Apply Plan 입력 기준
- Adapter는 파라미터로 `FinalApprovalExecutionTransitionApplyPlan` 객체 및 `idempotencyKey`, `jobId`를 입력받아야 합니다.
- 입력받은 Plan 객체의 `allowed`가 `true`이고, `dbWriteRequired`가 `true`인지 확인한 뒤 실행합니다.

## 6. Adapter 출력 기준
- 성공 시: `{ success: true, executionPerformed: true, updatedJobId: string }`
- 실패 시: `{ success: false, errorCode: string, message: string }` 형태의 결과를 반환해야 하며, 절대 애플리케이션 크래시를 유발하는 Uncaught Exception을 던지지 않아야 합니다.

## 7. DB write 허용 범위 후보
- `NaverApiBatchJob` 및 연관된 `NaverApiBatchJobItem` 테이블에 국한하여 허용합니다.
- `fromStatus`가 현재 DB 상태와 일치할 때만 조건부 업데이트를 수행합니다.

## 8. DB write 금지 범위
- Transition Plan에 정의되지 않은 어떠한 테이블에 대한 `UPDATE`, `INSERT`, `DELETE`를 엄격히 금지합니다.
- `NaverApiBatchFinalApproval`과 그 Item 테이블의 경우 현재 상태를 `MAINTAIN_STATUS`로 유지하기로 했으므로, 업데이트 쿼리 실행을 금지합니다.

## 9. transaction 경계
- Prisma `$transaction`을 이용해 단일 원자적 작업(Atomic Operation)으로 묶어야 합니다.
- 다수의 JobItem과 하나의 Job 상태 갱신이 한 번의 트랜잭션 블록 내에서만 이뤄져야 합니다.

## 10. idempotency 처리 기준
- 고유한 `idempotencyKey`를 DB 내 이력 테이블에 저장하거나, 또는 상태를 `fromStatus`로 지정하여 업데이트를 멱등하게 만듭니다.
- `fromStatus`가 맞지 않고 이미 타겟 상태라면 이미 처리된 것으로 간주하고 정상 리턴(혹은 `ALREADY_EXECUTING`)할 수 있어야 합니다.

## 11. already EXECUTING 처리 기준
- 트랜잭션 시도 시 DB의 레코드가 이미 `EXECUTING` 상태인 경우, 중복 실행 시도이거나 낙관적 잠금 실패로 판정하여 DB Write를 건너뛰거나(Skip) 명시적 에러(`ALREADY_EXECUTING_IN_DB`)를 반환합니다.

## 12. allowed=false plan 처리 기준
- `allowed=false`인 Plan이 실수로 전달된 경우, Adapter는 즉시 `success: false`를 반환하고 DB 접속 시도조차 하지 않아야 합니다.

## 13. partial update 방지 기준
- 다수의 JobItem 중 일부만 `EXECUTING`으로 갱신되는 상황(부분 성공)을 원천 차단하기 위해, `$transaction` 내부 쿼리들 중 하나라도 매치되는 로우(row)가 없다면 전체 롤백을 발생시켜야 합니다.

## 14. rollback 기준
- 트랜잭션 수행 중 예외가 발생하거나, 조건부 업데이트(`where status = 'READY'`)의 업데이트 카운트가 기대 수치와 다르면 에러를 던져 Prisma가 자동 롤백(`Rollback`)하도록 구성합니다.

## 15. target table별 write 기준
- Transition Plan의 `planItems` 목록을 순회하여, 대상 테이블별로 `UPDATE_STATUS` Operation만 실제 쿼리로 매핑합니다.

## 16. NaverApiBatchJob APPROVED -> EXECUTING 전환 기준
- `targetTable === 'NaverApiBatchJob'` 일 경우: `WHERE id = targetId AND status = 'APPROVED'`, `SET status = 'EXECUTING'` 쿼리를 매핑합니다.

## 17. NaverApiBatchJobItem READY -> EXECUTING 전환 기준
- `targetTable === 'NaverApiBatchJobItem'` 일 경우: `WHERE id = targetId AND status = 'READY'`, `SET status = 'EXECUTING'` 쿼리를 매핑합니다.

## 18. NaverApiBatchFinalApproval ACTIVE 유지 기준
- `MAINTAIN_STATUS` Operation이므로 어댑터는 DB 쿼리를 생성하지 않고 무시(Skip)합니다.

## 19. NaverApiBatchFinalApprovalItem write 금지 기준
- Transition Plan에 포함조차 되지 않으므로, 어댑터는 이 테이블에 대한 쓰기를 영구 차단합니다.

## 20. 테스트 DB 전용 검증 기준
- Adapter 구현 후의 통합 검증은 오직 `tms-final-approval-test-postgres` 컨테이너를 가리키는 테스트 스크립트에서만 한정하여 수행합니다.

## 21. 운영 DB 절대 금지 기준
- 설계 및 구현 과정에서 `NODE_ENV=production` 또는 운영 환경변수를 사용한 연결은 어떠한 경우에도 시도하지 않습니다.

## 22. Naver API 호출과 분리 기준
- 이 Prisma Adapter는 철저하게 DB 트랜잭션 커밋만을 책임집니다. API 호출 로직과 결합되는 것을 구조적으로 금지합니다.

## 23. Worker Orchestration 연결 전 경계
- Adapter 구현이 완료되고 단위/통합 테스트를 완벽히 마칠 때까지 Orchestration 메인 흐름에 주입하지 않고 격리된 상태를 유지합니다.

## 24. 보안 점검 항목
- 데이터베이스 비밀번호, Redis 연결 문자열 등이 에러 로그나 콘솔, 문서에 평문(Plaintext)으로 찍히지 않도록 주의합니다.

## 25. 구현 후보 파일
- **Service**: `src/services/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service.ts`
- **Test**: `src/services/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.test.ts`
- **Type** (필요시): `src/types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types.ts`

## 26. 테스트 케이스 후보
- `allowed=false` 플랜 전달 시 DB 쿼리 없이 에러 반환.
- 정상 `allowed=true` 플랜 전달 시 `$transaction` 호출 여부 검증 (Mock 기반 검증 우선).
- `already EXECUTING` 레코드 발생 시 트랜잭션 롤백 및 에러 반환 검증.

## 27. 성공 기준
- Prisma `$transaction`을 통한 안전한 상태 갱신 로직이 설계되고, 멱등성 및 실패 롤백 조건이 완벽히 문서화됨.

## 28. 실패 기준
- Transition Plan의 `targetTable`이나 `Operation`을 무시하고 하드코딩으로 상태를 바꾸도록 설계된 경우.
- 롤백 시나리오가 고려되지 않은 경우.

## 29. 다음 단계 제안
- 본 문서를 기반으로 실제 Prisma Client의 모의(Mock) 객체를 활용한 **Transition Apply Prisma Adapter 단위 테스트 및 구현** 단계를 진행할 것을 제안합니다. 실제 테스트 DB를 타격하는 작업은 그 다음 단계(Verification)에서 수행합니다.

> [!IMPORTANT]
> - 이번 단계에서는 DB write를 실제로 수행하지 않습니다.
> - 다음 구현 단계에서도 우선 adapter unit test는 mock prisma port로 시작합니다.
> - 실제 테스트 DB write 검증은 adapter 구현 이후 별도 Verification 단계에서만 수행합니다.
> - 운영 DB 사용은 계속 금지합니다.
> - Naver API 호출은 계속 금지합니다.
> - Worker Orchestration 연결은 adapter 단독 검증 후에 진행합니다.
> - live mode는 계속 금지합니다.
