# FinalApproval Execution Transition Apply Real Prisma Adapter Implementation Design

## 1. 작업 목적
Mock Adapter 검증이 완료됨에 따라, 실제 데이터베이스 연결을 통해 트랜잭션을 날리는 "Real Prisma Adapter"를 구현하기 위한 사전 설계입니다. 실제 구현 전 구조와 트랜잭션 범위, 롤백, 테스트 DB 격리, 운영 환경 접근 차단 원칙을 확립합니다.

## 2. 현재 완료 상태 요약
- `Transition Apply Pure Service` (Plan 생성) 구현 및 검증 완료.
- `Transition Apply Prisma Adapter Mock` (포트 인터페이스 분리, 트랜잭션 경계, 예외 처리 방어 로직) 구현 및 총 65개 테스트 통과 완료.
- 실제 DB 접근 및 Prisma Client 임포트는 아직 없습니다.

## 3. Mock Adapter와 Real Prisma Adapter의 차이
- **Mock Adapter**: 추상화된 포트(`TransitionApplyPrismaAdapterPort`)를 주입받아 비즈니스 플로우와 롤백 룰만 검증하며, 메모리 상에서 호출 로그만 남깁니다.
- **Real Prisma Adapter**: 실제 `@prisma/client` 인스턴스를 주입받거나 임포트하여, `$transaction` 블록 내에서 `prisma.naverApiBatchJob.update` 및 `prisma.naverApiBatchJobItem.update` 쿼리를 실행합니다.

## 4. Real Prisma Adapter가 필요한 이유
- 순수 함수와 Mock 포트로 증명한 논리적 무결성을, 실제 데이터베이스의 물리적 상태(영속성)로 안전하게 커밋하기 위해 필수적인 인프라 계층입니다.

## 5. 실제 Prisma Client import 허용 시점
- 본 설계 문서 작성 단계에서는 엄격히 **금지**됩니다.
- 본 문서가 검토/승인된 직후인 **다음 구현 단계**에서만 Real Adapter 파일 내에서 제한적으로 임포트가 허용됩니다.

## 6. 실제 DB write 허용 시점
- 구현 단계의 단위/통합 테스트에서는 `jest-prisma` 또는 `tms-final-approval-test-postgres` 컨테이너(localhost:55432)에 대해서만 허용됩니다.
- 실제 write 검증은 **Real Adapter 구현 완료 후 별도의 Verification 단계**에서만 공식 승인 하에 수행합니다.

## 7. Real Adapter 구현 후보 파일
- `src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.service.ts`

## 8. Real Adapter 테스트 후보 파일
- `src/services/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.test.ts` (테스트 DB 연동)

## 9. 기존 Mock Adapter와 재사용할 수 있는 port/interface
- 기존에 정의한 `TransitionApplyPrismaAdapterInput`, `TransitionApplyPrismaAdapterResult` 등의 포트 타입 및 리턴 규격을 100% 동일하게 재사용하여 다형성을 보장합니다.

## 10. transaction 경계 설계
- Real Adapter는 Prisma의 Interactive Transaction (`prisma.$transaction(async (tx) => { ... })`)을 사용해야 합니다.
- 모든 업데이트 쿼리는 `tx` 객체를 통해 수행되어야 하며, `BatchJob` 갱신과 여러 `BatchJobItem` 갱신이 단일 트랜잭션 내에서 모두 성공해야 커밋됩니다.

## 11. NaverApiBatchJob APPROVED -> EXECUTING 전환 기준
- 쿼리: `tx.naverApiBatchJob.updateMany({ where: { id: targetId, status: 'APPROVED' }, data: { status: 'EXECUTING' } })`
- 업데이트된 count가 1이 아닐 경우(예: 이미 EXECUTING이거나 상태 불일치) 예외를 발생시켜 롤백합니다.

## 12. NaverApiBatchJobItem READY -> EXECUTING 전환 기준
- 쿼리: `tx.naverApiBatchJobItem.updateMany({ where: { id: targetId, status: 'READY' }, data: { status: 'EXECUTING' } })`
- 업데이트된 count가 1이 아닐 경우 예외를 발생시켜 전체 롤백을 유발합니다.

## 13. NaverApiBatchFinalApproval ACTIVE 유지 기준
- `MAINTAIN_STATUS` 명령이므로 Real Adapter는 이에 대해 어떠한 `update` 쿼리도 생성하거나 실행하지 않습니다.

## 14. NaverApiBatchFinalApprovalItem write 금지 기준
- Transition Plan 대상 자체가 아니며, 만약 입력으로 들어오면 즉각 차단 사유(`FINAL_APPROVAL_ITEM_WRITE_BLOCKED`)를 뱉고 쿼리를 실행하지 않습니다.

## 15. unsupported targetTable 차단 기준
- `SUPPORTED_WRITE_TABLES` (Job, JobItem) 외의 테이블명이 감지되면 즉각 `UNSUPPORTED_TARGET_TABLE` 에러 코드와 함께 리턴합니다.

## 16. FinalApproval / FinalApprovalItem write 차단 기준
- `UPDATE_STATUS` 등 DB 갱신 명령이 이 테이블들로 떨어지면, Real Adapter는 쿼리 생성 전 `FINAL_APPROVAL_WRITE_BLOCKED` 등의 코드로 안전하게 트랜잭션 진입을 차단합니다.

## 17. idempotency 처리 기준
- `updateMany`에 `status` 필드를 `where` 조건으로 명시(`fromStatus`)하여, 상태가 맞지 않으면 0 rows updated로 처리하고, 이를 통해 멱등성을 확보합니다.

## 18. 이미 EXECUTING인 경우 처리 기준
- 조건부 업데이트 쿼리에서 `count === 0`이 나오면, 다른 Worker가 선점하여 이미 EXECUTING으로 바꾼 상황으로 간주하고, 이를 명시적인 에러(`ALREADY_EXECUTING_IN_DB` 등)로 취급해 트랜잭션을 롤백합니다.

## 19. partial update 방지 기준
- 다수의 아이템 중 하나라도 갱신 `count === 0`이 떨어지면 즉각 Exception을 던져, 이미 갱신된 Job이나 다른 Item의 내역까지 모두 Prisma `$transaction`이 자동 롤백(`ROLLBACK`) 하도록 구성합니다.

## 20. rollback 기준
- 트랜잭션 콜백 내부에서 던져진 에러는 Prisma 클라이언트 레벨에서 롤백으로 이어집니다.
- 어댑터 겉단에서는 이 롤백 에러를 Catch하여 애플리케이션 크래시를 방지하고 `success: false` 및 `reasonCodes: ['TRANSACTION_FAILED']`를 안전하게 반환합니다.

## 21. 테스트 DB Fixture 사용 기준
- 통합 검증 시 테스트 데이터를 세팅(Seed)하고 롤백 검증 후 지우는 Fixture(예: `beforeEach`에서 생성, `afterEach`에서 삭제 또는 트랜잭션 단위 롤백)를 사용합니다.

## 22. 테스트 DB write 검증 절차 후보
1. Fixture로 Job(APPROVED), Item(READY) 생성.
2. Real Adapter 실행 (success: true 기대).
3. DB 재조회하여 상태가 `EXECUTING`인지 검증.
4. 다시 Real Adapter 실행 시도하여 낙관적 잠금/상태 제약으로 실패(`count 0` 롤백)하는지 검증.

## 23. 운영 DB 접근 차단 기준
- 소스 코드 및 테스트 스크립트 실행 시 `process.env.NODE_ENV === 'production'` 검사를 통해, 운영 환경에서의 테스트 스위트 실행을 원천 차단합니다.

## 24. DATABASE_URL 보안 기준
- `DATABASE_URL`, `REDIS_URL` 등의 환경변수는 절대로 평문으로 소스, 문서, 또는 콘솔 로그(console.log)에 노출되어서는 안 됩니다.

## 25. Worker Orchestration 연결 전 검증 기준
- Real Adapter의 독립적인 테스트 DB 트랜잭션/롤백 성능과 무결성이 100% 입증되기 전에는 Orchestration 코드에 의존성을 결합하지 않습니다.

## 26. Naver API 호출과 분리 기준
- 상태를 `EXECUTING`으로 바꾸는 것과 실제 외부 API를 쏘는 행위는 완전히 다른 도메인입니다. 어댑터는 DB Update까지만 책임집니다.

## 27. dry-run mode와 live mode 분리 기준
- `mode === 'live'`일 경우 DB Connection 자체를 맺지 않고 즉시 방어 로직(`LIVE_ADAPTER_BLOCKED`)에 의해 Return 됩니다. 이 원칙은 Real Adapter에서도 동일하게 지켜집니다.

## 28. 테스트 케이스 후보
- [Test-DB] 정상 Transition Plan 전달 시 성공적으로 Update 커밋 확인
- [Test-DB] 이미 상태가 EXECUTING인 데이터에 대한 동시성 업데이트 시도 시 0-row 롤백 발생 확인
- [Test-DB] 트랜잭션 도중 DB 제약 오류 발생 시 Job만 업데이트되고 끝나는 Partial Update 미발생 확인
- [Test-DB] `live` 모드일 때 쿼리 미발행 및 차단 확인

## 29. 성공 기준
- 명세된 제약 조건 및 동시성 롤백 방침을 완벽하게 포괄하는 Real Adapter의 구조와 테스트 시나리오가 문서화되는 것.

## 30. 실패 기준
- `where` 조건절에 대상 엔티티의 현재 상태(`fromStatus`)를 누락하여 무조건적인 덮어쓰기(`update`)를 허용하게 설계된 경우.
- 부분 롤백이 되지 않는 상태로 설계된 경우.

## 31. 다음 단계 제안
- 본 설계가 완료되었으므로, 이를 기반으로 실제 Prisma Client 임포트를 허용하여 **FinalApproval Execution Transition Apply Real Prisma Adapter 구현 및 테스트 DB 연동 통합 테스트** 단계를 진행하는 것을 제안합니다. (운영DB 및 live mode는 계속 차단)
