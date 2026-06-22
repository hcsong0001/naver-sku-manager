# FinalApproval Execution Queue Processor Design

## 1. 작업 목적
BullMQ Worker가 수신한 단일 Job을 처리하는 핵심 비즈니스 로직인 `Queue Processor`의 정책과 순서를 상세하게 설계합니다. 이 설계는 실제 실행 단계(Naver API 호출 및 EXECUTING 전환)를 수행하기 전, 기존 검증 로직들을 재사용하여 안전하고 멱등성을 갖춘 프로세서를 구현하는 것을 목표로 합니다.

## 2. 현재 완료 상태 요약
* FinalApproval Execution Worker Process Design 문서 추가 완료.
* API route에서 BullMQ Adapter 경로는 integration test로 검증 완료.
* Route Queue Port Factory에서 BullMQ Adapter 선택 분기 완료.
* Docker Redis 기반 BullMQ enqueue 경로가 202 Accepted까지 검증됨.
* **미구현 상태**: 실제 Worker Process, Queue Processor, EXECUTING 상태 전환, Naver API 호출, DB write 구현 안됨.

## 3. Queue Processor의 역할
* 큐에서 전달받은 단일 Job 객체의 데이터를 비즈니스 로직으로 변환합니다.
* 기존 Payload Validation, DB Revalidation, Orchestration 계층을 순차적으로 호출하여 작업 가능 여부를 확정합니다.
* 초기 단계에서는 실제 실행을 트리거하지 않고 `readyForExecution` 결과를 반환하는 검증 허브 역할을 담당합니다.

## 4. Worker Process와 Queue Processor의 경계
* **Worker Process**: BullMQ Worker 생성, Queue 구독, Redis 연결 관리, graceful shutdown, 프로세스 라이프사이클 담당.
* **Queue Processor**: 단일 Job 처리 로직(비즈니스 로직) 담당. 상태와 인프라에 의존하지 않는 순수 함수(Pure Service) 형태로 설계하여 테스트 용이성을 확보합니다.
* **API Route (`route.ts`)**: HTTP 요청 검증 및 Job Enqueue만 담당하며, Processor나 Worker를 포함하거나 실행하지 않습니다.

## 5. Queue 이름
* **final-approval-execution**

## 6. Job 이름
* **sku-keyword-final-approval-execution**

## 7. Job payload 구조
* `finalApprovalId` (string)
* `actorId` (string)
* `idempotencyKey` (string)
* `requestedAt` (ISO Date string)
* `source` (string: 'EXECUTION_API')
* `mode` (string: 'MOCK' | 'DRY_RUN_READY' 등)

## 8. Processor 처리 순서
1. Worker로부터 BullMQ Job 수신
2. `job.name` 검증
3. `job.data`를 Worker Job Payload Validation으로 검증
4. validation 실패 시 재시도 불가능(failure) 처리
5. DB Revalidation Repository를 통해 필요한 snapshot 조회
6. Worker Job DB Revalidation 수행
7. revalidation 실패 시 재시도 가능/불가능 오류 명확히 구분
8. Worker Job Orchestration 수행
9. 성공 시 `readyForExecution` 결과 반환
10. **(초기 단계 제약)** 실제 실행, Naver API 호출, EXECUTING 상태 전환은 하지 않음

## 9. Payload Validation 재사용 방안
* 기존 `sku-keyword-final-approval-execution-worker-job-payload-validation.service.ts` 활용.
* 런타임에 외부에서 유입된 Job payload가 정의된 타입과 최소 필드를 완벽하게 포함하고 있는지 사전 검증합니다.

## 10. DB Revalidation 재사용 방안
* 기존 `sku-keyword-final-approval-execution-worker-job-db-revalidation.service.ts` 활용.
* 비동기 대기열에서 지연 처리되는 동안 발생할 수 있는 데이터 정합성 문제(취소, 상태 변경, 만료 등)를 최신 Snapshot 조회를 통해 방어합니다.

## 11. Worker Job Orchestration 재사용 방안
* 기존 `sku-keyword-final-approval-execution-worker-job-orchestration.service.ts` 활용.
* 모든 유효성 검사가 끝난 Job을 기반으로 실행 단위(Execution Context)를 준비합니다.

## 12. 성공 결과 형태
* `readyForExecution: true`
* `executionPerformed: false`
* `finalApprovalId` 유지
* `idempotencyKey` 유지
* `mode` 유지
* **실제 DB write 없음**
* **실제 Naver API 호출 없음**

## 13. 실패 결과 형태
다음의 경우 프로세서에서 명시적인 Failure 결과를 반환합니다.
* payload validation failure
* unknown job name
* DB revalidation failure
* expired FinalApproval
* non-ACTIVE FinalApproval
* non-APPROVED Job
* READY item 0개
* payload hash mismatch
* validation snapshot hash mismatch
* idempotency duplicate
* Redis/DB 일시 장애
* unknown error

## 14. Retry 정책
* **재시도 불필요 (영구 실패)**: Payload Validation 실패, Unknown job name, DB Revalidation의 비즈니스 조건 실패(Hash 불일치, Non-ACTIVE 등).
* **재시도 가능 (일시 실패)**: DB/Redis 일시 장애, 네트워크 장애.
* **Naver API 호출**: 현재 구현되지 않았으므로 적용 대상에서 제외.
* Attempts/Backoff 설정은 BullMQ Adapter 설정 시 정의된 값과 일관성을 유지합니다.
* 재시도 시에도 반드시 `idempotencyKey`를 통해 중복 실행 방지 검증을 거칩니다.

## 15. Idempotency (멱등성) 정책
* BullMQ의 `jobId`는 요청된 `idempotencyKey`를 사용합니다.
* Processor 내부에서도 `idempotencyKey` 존재 및 중복 여부를 필수적으로 검증합니다.
* 같은 `idempotencyKey`에 대한 중복 처리 방지 로직을 수립하고, 정당한 재시도와 부당한 중복 Job을 구분합니다.
* 최종 성공/실패 상태 기록 방식은 차후 별도 설계 단계를 거칩니다.

## 16. 장애 처리 정책
* 일시적 장애(Redis/DB)는 Error를 throw하여 BullMQ의 자동 재시도 루프에 위임합니다.
* 비즈니스 로직 및 Validation 오류는 즉시 처리 실패(`failed`) 상태로 전환하고 진행을 멈춥니다.
* 에러 발생 시 Processor가 Process 전체를 강제 종료하지 않고 에러 객체를 반환하거나 throw해야 합니다.

## 17. 보안 정책
* `REDIS_URL`, `DATABASE_URL` 원문 출력 및 로깅 절대 금지.
* DB 비밀번호, 토큰, secret 출력 금지.
* Queue payload나 Redis key 내부에 어떠한 secret도 저장 금지.
* 에러 메시지는 Redaction 처리를 적용하여 민감 정보 유출을 차단.
* 운영 Redis와 테스트 Redis 분리, 운영 DB와 테스트 DB 분리 원칙 고수.

## 18. 테스트 전략
1. 올바른 `job.name`이면 처리 시작 확인.
2. 잘못된 `job.name`이면 안전 실패 처리 확인.
3. 유효한 payload면 Validation 통과 확인.
4. 잘못된 payload면 DB 조회 단계 진입 전 조기 실패 확인.
5. DB revalidation 성공 시 `readyForExecution: true` 확인.
6. DB revalidation 실패 시 `executionPerformed: false` 확인.
7. payload hash mismatch 상황 처리 확인.
8. validation snapshot hash mismatch 상황 처리 확인.
9. idempotency duplicate 상황 처리 확인.
10. Naver API가 일절 호출되지 않는지 검증.
11. EXECUTING 상태 전환이 일절 없는지 검증.
12. Prisma write(create/update/delete)가 없는지 검증.
13. Processor 함수가 외부 인프라에 직접 종속되지 않는 pure service 형태로 테스트 가능한지 검증.
14. (Worker close/shutdown 검증은 Worker Process 구현 단계에서 별도 수행)

## 19. 구현 전 체크리스트
* [ ] Payload Validation / DB Revalidation / Orchestration 서비스들이 Processor 로직 내에 올바르게 결합되도록 설계되었는가?
* [ ] Processor가 BullMQ 라이브러리에 과도하게 종속되지 않도록 분리된 인터페이스가 존재하는가?
* [ ] 일시적 오류와 영구적 오류를 구분하는 커스텀 Error 객체 또는 결과 반환 타입이 정의되었는가?

## 20. 현재 금지 범위
* Worker 코드 및 Queue Processor 코드 생성 일절 금지.
* `route.ts`, `route.test.ts`, Factory, BullMQ Adapter 수정 금지.
* `package.json`, `package-lock.json`, `schema.prisma` 수정 및 `npm install` 금지.
* Prisma Adapter 구현 및 실제 DB read/write, 운영 환경 접근 금지.
* Redis FLUSHDB 실행 금지.
* Naver API, LIVE adapter 호출 금지.
* EXECUTING 상태 전환, Job/Item 상태 변경 금지.
* 실행 버튼 구현 금지.
* `REDIS_URL`, `DATABASE_URL`, secret 원문 출력 금지.

## 21. 다음 단계 제안
1. 본 문서 (FinalApproval Execution Queue Processor Design) 커밋
2. Queue Processor의 순수 함수 로직(Pure Service) 및 테스트 코드 작성 준비
3. 이후 실제 Worker 구현 및 DB Revalidation 상태 전환, Naver API 연동 등은 별도 설계 및 승인 후 진행
