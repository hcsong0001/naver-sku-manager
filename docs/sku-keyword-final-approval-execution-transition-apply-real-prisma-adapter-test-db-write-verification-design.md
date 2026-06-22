# FinalApproval Execution Transition Apply Real Prisma Adapter Test DB Write Verification Design

## 1. 작업 목적
Real Prisma Adapter가 실제 PostgreSQL 테스트 데이터베이스(`localhost:55432`) 환경에서 트랜잭션의 원자성, 멱등성, 부분 업데이트 방지 및 롤백 처리를 의도한 대로 수행하는지 검증하기 위한 절차와 격리 원칙을 설계합니다.

## 2. 현재 완료 상태 요약
- `Real Prisma Adapter` 구현 완료 및 Mock Prisma Client 기반 테스트 15개 통과.
- 총 80개의 단위 및 통합 테스트 성공 완료.
- 현재까지 어떠한 실제 DB 접속이나 Write, 운영 시스템으로의 상태 전환 시도는 없었습니다.

## 3. 이번 설계가 필요한 이유
- Mock 환경에서의 로직 검증만으로는 실제 데이터베이스의 제약 조건(Optimistic Lock 등)이나 트랜잭션 동작(예외 시 롤백 등)을 100% 보장할 수 없습니다. 
- 따라서 운영 데이터를 오염시키지 않으면서도 실제 RDBMS 엔진 위에서 트랜잭션을 날리는 엄격한 테스트 DB 연동 설계가 필요합니다.

## 4. 실제 테스트 DB write 검증의 위험성
- 테스트 DB 연동 시 자칫하면 다른 모듈의 테스트 Fixture와 충돌할 수 있으며, 최악의 경우 설정 실수로 운영 DB를 타격할 치명적 위험(Data Corruption)이 존재합니다.

## 5. 운영 DB 절대 금지 기준
- 어떠한 상황에서도(로컬 테스트 포함) `NODE_ENV=production` 이거나 운영 DB의 Connection String으로 테스트를 실행하는 것은 절대로 금지됩니다.

## 6. 테스트 DB 허용 조건
- 오로지 로컬에 띄워진 테스트용 PostgreSQL 인스턴스(`localhost:55432` 포트를 사용하는 `tms-final-approval-test-postgres` 컨테이너 등)에 한정하여 연결 및 갱신을 허용합니다.

## 7. 사용할 테스트 DB fixture 후보
- `finalApprovalId`: `test-db-revalidation-final-approval-001`
- `batchJobId`: `test-db-revalidation-batch-job-001`
- `batchJobItemId`: `test-db-revalidation-batch-job-item-001`

## 8. 사전 상태 확인 기준
- 트랜잭션 검증 스크립트는 Write를 시도하기 전에 대상 Fixture 데이터가 기대하는 초기 상태로 세팅되어 있는지 반드시 `SELECT` 쿼리로 사전에 확인(`assert`)해야 합니다.

## 9. 전환 전 기대 상태
- `NaverApiBatchFinalApproval.status`: `ACTIVE`
- `NaverApiBatchJob.status`: `APPROVED`
- `NaverApiBatchJobItem.status`: `READY`

## 10. NaverApiBatchJob APPROVED -> EXECUTING 검증 기준
- 트랜잭션 성공 후 DB를 재조회했을 때, 해당 Fixture Job의 상태가 정확히 `EXECUTING`으로 변경되었는지 확인합니다.

## 11. NaverApiBatchJobItem READY -> EXECUTING 검증 기준
- 트랜잭션 성공 후 DB를 재조회했을 때, 대상 Fixture Item들의 상태가 모두 `EXECUTING`으로 변경되었는지 확인합니다.

## 12. NaverApiBatchFinalApproval ACTIVE 유지 검증 기준
- 트랜잭션 성공 후에도 `NaverApiBatchFinalApproval`의 상태는 `ACTIVE`를 그대로 유지해야 하며 어떤 Update도 발생해선 안 됩니다.

## 13. NaverApiBatchFinalApprovalItem write 금지 검증 기준
- 이 테이블에 대한 수정 시도는 아예 지원되지 않거나 차단되므로, 테이블의 `updatedAt`이 변경되지 않았는지 검증합니다.

## 14. transaction 적용 기준
- 모든 갱신 로직은 단일 Prisma `$transaction` 블록 안에서 묶여 실행되어야 하며, 독립된 쿼리로 분할 실행되는 것을 금지합니다.

## 15. affected count 검증 기준
- `updateMany` 반환 결과의 `count` 값이 정확히 기대한 아이템 수와 일치하는지(`1`) 확인해야 합니다.

## 16. partial update 방지 기준
- 다수의 Item 중 1개가 이미 다른 상태(예: EXECUTING)라서 `count: 0`을 반환하면, 즉시 Exception이 발생하고 먼저 업데이트된 Job이나 Item까지 모조리 원래 상태(`APPROVED`, `READY`)로 자동 롤백(`ROLLBACK`) 되는지 강제로 에러를 유발하여 검증합니다.

## 17. 실패 시 rollback 기준
- 트랜잭션 내부에서 발생한 그 어떤 에러(수동 Throw, 네트워크 오류, Count 불일치 등) 상황에서도 DB 상태는 완전히 원상태를 유지해야 합니다.

## 18. 검증 후 상태 복구 기준
- 테스트가 성공하여 상태가 `EXECUTING`으로 바뀌었더라도, 다음 테스트의 멱등성을 위해 테스트 구문 종료 시점(afterEach 등)에서 무조건 다시 초기 상태(APPROVED, READY)로 롤백하거나 되돌려놔야 합니다.

## 19. 재시드 필요 여부 기준
- 만약 트랜잭션 내에서 데이터를 지우거나 구조를 파괴했다면, DB Seed 스크립트를 재호출하여 Fixture를 재시드해야 합니다. 본 검증은 Status 필드만 다루므로 롤백 구문으로 상태만 원복하는 것으로 충분합니다.

## 20. idempotencyKey 사용 기준
- Transition Apply 단계에서는 Plan에 담긴 요청의 일부로 다루어지지만, Real Adapter 자체는 직접 IdempotencyKey 테이블을 조작하지 않습니다(이전 Orchestration 단계에서 처리됨). 테스트에서도 객체에 포함하여 무결성만 확인합니다.

## 21. actorId 사용 기준
- 시스템 주체 식별 용도로 객체에 포함되어 흘러가며, Adapter가 직접 조작하지 않음을 검증합니다.

## 22. dry-run mode만 허용하는 기준
- 검증 로직은 `mode: 'dry-run'`으로 세팅된 Plan에 대해서만 정상 트랜잭션을 발행합니다. (이는 Worker Orchestration 흐름 상의 규칙이며, 실제 DB 반영은 `dry-run`이 아닌 라이브 워커에서 수행되지만 Adapter 단독 검증 시에는 안전한 모드 통제를 시뮬레이션합니다)

## 23. live mode 차단 기준
- Adapter가 `live` 모드 옵션을 받았을 때에는 실제 DB Write 연결조차 열지 않고 즉각 `LIVE_ADAPTER_BLOCKED` 오류를 반환함을 테스트 DB 연동 환경에서도 재검증합니다.

## 24. Naver API 호출과 분리 기준
- 이 단계의 DB 트랜잭션 커밋 과정에서 네이버 측 API가 단 한 번도 호출되지 않는다는 사실을 아키텍처 상으로 단언합니다.

## 25. Worker/Queue와 분리 기준
- 백그라운드 Worker 실행이나 Queue 시스템(BullMQ)에 의존하지 않고, 순수하게 테스트 스크립트 기반으로만 Adapter 함수를 호출하여 검증합니다.

## 26. 테스트 DB write 검증 스크립트 후보
- `src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.integration.test.ts`

## 27. 검증 명령 후보
- `npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.integration.test.ts` (구현 시)

## 28. 성공 기준
- 명시된 Fixture 상태가 완벽하게 단일 트랜잭션으로 전이되며, 고의적인 실패 상황(동시성/Count 누락)에서 단 하나의 부분 수정(Partial Update)도 없이 전체 롤백되는 현상이 코드 레벨에서 증명되는 것.

## 29. 실패 기준
- 테스트 도중 운영 DB 설정값이 감지되거나, 부분 업데이트 현상이 발생하거나, 예외 상황에서 Prisma 롤백이 동작하지 않는 경우.

## 30. 중단 기준
- 환경 변수에 `DATABASE_URL`이 누락되거나 예상 포트(55432 등)가 아닐 경우 안전을 위해 테스트 실행을 강제 중단해야 합니다.

## 31. 보안 점검
- DB 연결 문자열(`DATABASE_URL`) 및 Redis 등 인프라 비밀번호가 코드 리뷰 로그, 터미널 출력 화면, 그리고 본 설계 문서에 원문으로 절대 찍히지 않도록 마스킹 처리합니다.

## 32. 다음 단계 제안
- 본 설계 문서가 확립되었으므로, 이를 바탕으로 실제 테스트 DB와 연결하여 트랜잭션을 수행 및 검증하는 **Real Prisma Adapter Integration Test 스크립트 구현 및 검증 단계**로 돌입하는 것을 제안합니다.

> [!IMPORTANT]
> - 이번 문서 작성 단계에서는 DB에 접속하지 않습니다.
> - 실제 테스트 DB write는 다음 별도 승인 단계에서만 수행합니다.
> - 운영 DB는 절대 사용하지 않습니다.
> - DB 접속 문자열 원문은 출력하지 않습니다.
> - .env / .env.test 파일은 열람하지 않습니다.
> - 검증은 테스트 PostgreSQL localhost:55432에 한정합니다.
> - Naver API는 호출하지 않습니다.
> - Worker와 Queue는 사용하지 않습니다.
> - Redis는 사용하지 않습니다.
> - live mode는 계속 금지합니다.
