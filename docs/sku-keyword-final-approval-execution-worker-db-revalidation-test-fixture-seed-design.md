# FinalApproval Execution Worker DB Revalidation Test Fixture Seed Design

## 1. 작업 목적
Worker DB Revalidation 실제 검증에 필수적인 최소한의 테스트 데이터(Test Fixture)를 생성하기 앞서, 어느 테이블에 어떤 데이터를 어떤 방식으로 안전하게 Seed할 것인지 설계하고 성공/실패 기준을 문서화합니다.

## 2. 현재 완료 상태 요약
- 테스트 PostgreSQL DB 컨테이너(`tms-final-approval-test-postgres`) 정상 구동 확인
- `NaverApiBatchFinalApproval` 등 핵심 4개 테이블 존재 여부 확인 완료
- 각 테이블 row count 0건(데이터 없음) 확인 완료
- 운영 DB/Redis 접근 및 외부 API 호출 금지 상태 유지

## 3. Seed 설계가 필요한 이유
Worker DB Revalidation 단계는 Job payload의 `finalApprovalId`를 가지고 DB 조회를 시도하여 유효성을 판별하는 로직입니다. 현재 테스트 DB는 비어 있어 검증이 불가능하며, 임의로 데이터를 넣을 경우 스키마 제약조건(Foreign Key 등) 위반이나 예상치 못한 로직을 유발할 수 있습니다. 따라서 안전하고 일관성 있는 최소 테스트 데이터를 구성하기 위한 사전 설계가 필수적입니다.

## 4. 테스트 DB 현재 상태
- `NaverApiBatchFinalApproval` 포함 4개 대상 테이블의 `row_count = 0`

## 5. Seed 대상 테이블 후보
1. `NaverApiBatchJob`
2. `NaverApiBatchJobItem`
3. `NaverApiBatchFinalApproval`
4. `NaverApiBatchFinalApprovalItem`

## 6. 최소 테스트 데이터 구성 원칙
- 실제 검증을 우회하지 않고 성공적인 조회(Revalidation)가 가능한 최소한의 필수 속성만 포함
- 외래키 제약조건에 맞춰 상위 테이블부터 하위 테이블 순서로 안전하게 INSERT
- 실제 운영 데이터와 철저히 분리되는 네이밍 규칙 적용

## 7. NaverApiBatchJob 테스트 데이터 후보
- `id`: `test-db-revalidation-batch-job-001`
- `status`: `COMPLETED` (또는 로직상 요구되는 정상 상태)
- 부가 속성은 최소한으로 구성

## 8. NaverApiBatchJobItem 테스트 데이터 후보
- `id`: `test-db-revalidation-batch-job-item-001`
- `batchJobId`: `test-db-revalidation-batch-job-001`
- `status`: 검증에 필요한 기본값

## 9. NaverApiBatchFinalApproval 테스트 데이터 후보
- `id`: `test-db-revalidation-final-approval-001`
- `batchJobId`: `test-db-revalidation-batch-job-001`
- `status`: `APPROVED` (또는 DB Revalidation 검증 통과를 위한 유효한 승인 상태)

## 10. NaverApiBatchFinalApprovalItem 테스트 데이터 후보
- `id`: `test-db-revalidation-final-approval-item-001`
- `finalApprovalId`: `test-db-revalidation-final-approval-001`
- `batchJobItemId`: `test-db-revalidation-batch-job-item-001`
- `status`: 유효 상태

## 11. Worker DB Revalidation에 필요한 관계 조건
- `FinalApproval`은 반드시 부모 `NaverApiBatchJob`을 참조해야 합니다.
- `FinalApprovalItem`은 `FinalApproval` 및 `NaverApiBatchJobItem`과 정상적으로 매핑되어야 합니다.
- 모든 식별자는 설계된 테스트 식별자를 유지해야 합니다.

## 12. 상태값 설계 기준
- Worker의 DB Revalidation 검증을 통과할 수 있도록, 상태값은 `PENDING` 또는 `APPROVED` 등 유효한 상태를 가지도록 설정합니다.

## 13. 실제 운영 데이터 사용 금지 원칙
- 본 설계와 이후 Seed 실행 단계에서 운영 데이터의 ID나 실제 상점/상품 정보 등은 결코 사용하지 않습니다.

## 14. 테스트 식별자 네이밍 규칙
명시적으로 테스트 데이터임을 나타내도록 다음을 사용합니다.
- `batchJobId`: `test-db-revalidation-batch-job-001`
- `batchJobItemId`: `test-db-revalidation-batch-job-item-001`
- `finalApprovalId`: `test-db-revalidation-final-approval-001`
- `finalApprovalItemId`: `test-db-revalidation-final-approval-item-001`
- `idempotencyKey`: `test-worker-db-revalidation-noop-001`
- `actorId`: `test-actor`
- `source`: `worker-db-revalidation-test-fixture-seed`

## 15. Idempotency 기준
- Seed 스크립트는 여러 번 실행되더라도 동일한 테스트 데이터를 유지하거나, 기존 데이터를 삭제 후 재생성하도록 설계하여 중복 삽입(Duplicate Key) 에러를 방지합니다.

## 16. Seed 실행 방식 후보
- Node.js 스크립트 + Prisma Client를 활용한 스크립트 생성 (`ts-node` 등 사용)
- `psql`을 활용한 원시 SQL 쿼리 (`INSERT INTO ...`)

## 17. Seed 실행 전 체크리스트
- 테스트 PostgreSQL (`localhost:55432`) 가동 여부 확인
- 대상 테이블 비어 있음 재확인 (`row_count = 0`)
- 운영 DB 연결 여부 점검 (연결 차단)

## 18. Seed 성공 기준
- 4개 테이블에 각각 지정된 테스트 식별자를 가진 데이터가 1건 이상씩 정상적으로 INSERT됨
- Foreign Key 에러가 발생하지 않음
- 읽기 전용 조회 시 설계한 데이터가 식별됨

## 19. Seed 실패 기준
- 데이터 삽입 실패 혹은 스키마 제약 조건 위반 발생
- 운영 DB 서버로 연결되거나 운영 데이터가 삽입됨

## 20. Seed 후 읽기 전용 검증 기준
- 생성 후 `SELECT` 혹은 `COUNT(*)` 쿼리를 통해서만 데이터의 적재를 검증하며, 상태를 전환하거나 연동을 트리거하지 않아야 합니다.

## 21. DB write 허용 범위는 다음 실행 단계에서만 제한적으로 허용한다는 점
- 본 설계 문서 단계에서는 일절 데이터를 INSERT하지 않습니다.
- DB write는 **다음 단계(실행 단계)에서 별도의 Verification Result 문서 작성 시** 제한적으로만 허용됩니다.

## 22. 금지 범위
- **현재 단계**: Seed 스크립트 실행 금지, `INSERT/UPDATE/DELETE/TRUNCATE` 금지, Worker 실행 금지, Queue Job enqueue 금지
- **이후 단계**: Seed 후에도 Naver API 호출 금지, 상태 `EXECUTING` 전환 금지, Redis `FLUSHDB` 실행 금지

## 23. 보안 점검
- 테스트 데이터는 `localhost:55432`에만 생성되도록 환경을 격리합니다.
- `DATABASE_URL`, `REDIS_URL` 원문과 비밀번호는 문서에 명시하거나 스크립트 로그에 노출되지 않아야 합니다.

## 24. 다음 단계 제안
- 본 설계 문서의 기준에 따라 안전하게 테스트 데이터를 생성하는 Seed 스크립트를 작성하고 실행한 뒤, 결과를 검증하는 단계를 진행할 것을 제안합니다.
