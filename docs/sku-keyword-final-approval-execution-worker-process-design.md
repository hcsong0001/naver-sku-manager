# FinalApproval Execution Worker Process Design

## 1. 작업 목적
API route로부터 BullMQ `final-approval-execution` 큐에 적재된 Job을 백그라운드에서 안전하게 소비(Consume)하고 검증하기 위한 Worker Process의 구조 및 정책을 설계합니다. 이 설계는 실제 운영 환경의 Naver API 연동 및 데이터베이스 상태 변경에 앞서, 모든 안전 장치가 올바르게 작동하도록 보장하는 데 목적이 있습니다.

## 2. 현재 완료 상태 요약
* FinalApproval Execution API route에서 BullMQ Adapter를 통한 큐 적재(enqueue)가 Integration Test로 검증되었습니다.
* `route.ts` 코드는 BullMQ와 직접 결합하지 않고, Queue Port Factory를 통해 격리되었습니다.
* Docker Redis 기반 큐 적재가 `202 Accepted` 응답까지 성공적으로 작동함이 확인되었습니다.
* **미구현 상태**: 실제 Worker Process, Queue Processor, DB 상태 전환(EXECUTING 등), Naver API 호출.

## 3. Worker Process가 필요한 이유
* **API 응답 속도 보장**: 외부 시스템 연동 및 복잡한 DB Revalidation을 동기적으로 처리하면 API 타임아웃 및 병목이 발생할 수 있습니다.
* **격리 및 안정성**: 실패하기 쉬운 외부 네트워크(Naver API) 요청을 API 서버와 물리적/논리적으로 분리된 백그라운드 프로세스에서 처리하여, 장애가 API 서비스에 전파되지 않도록 격리합니다.
* **재시도 및 Idempotency**: 네트워크 일시 오류 등에 대비한 재시도 메커니즘과 중복 실행을 방지하는 일관성 제어(Idempotency)를 안전하게 적용하기 위함입니다.

## 4. Worker가 소비할 Queue 이름
* **Queue Name**: `final-approval-execution`

## 5. Worker가 처리할 Job 이름
* **Job Name**: `sku-keyword-final-approval-execution`

## 6. Job Payload 구조
큐에 적재되는 최소 필수 필드는 다음과 같습니다.
* `finalApprovalId` (string)
* `actorId` (string)
* `idempotencyKey` (string)
* `requestedAt` (ISO Date string)
* `source` (string: 'EXECUTION_API')
* `mode` (string: 'MOCK' | 'DRY_RUN_READY' 등)

## 7. Worker 처리 순서 초안
1. BullMQ Worker가 `final-approval-execution` 큐를 구독(subscribe)합니다.
2. 수신된 `job.name`이 `sku-keyword-final-approval-execution`인지 확인합니다.
3. `job.data`를 Worker Job Payload Validation 로직을 통해 타입 및 필수 값을 검증합니다.
4. `FinalApprovalExecutionWorkerJobDbRevalidationRepository`를 통해 DB에서 최신 Snapshot 데이터를 조회합니다.
5. 조회된 Snapshot 데이터를 기반으로 Worker Job DB Revalidation 로직을 수행합니다.
6. 검증을 통과하면 Worker Job Orchestration 로직을 수행하여 실행 계획을 수립합니다.
7. (초기 단계) Orchestration 성공 시 실제 Naver API 연동은 수행하지 않고, `readyForExecution` 상태까지만 도달했음을 확인합니다.
8. 실패 시, 안전한 실패 결과 기록 또는 BullMQ 재시도(throw 정책) 처리를 결정합니다.
9. 네트워크 오류 등 재시도 가능한 오류와, 유효성 검사 실패 등 재시도 불가능한 오류를 명확히 구분합니다.
10. `idempotencyKey` 기반 중복 실행 방지 메커니즘을 점검합니다.

## 8. 기존 Worker Job Payload Validation 재사용 방안
* 기존에 구현된 `sku-keyword-final-approval-execution-worker-job-payload-validation.service.ts`를 직접 호출하여, BullMQ의 `job.data`가 유효한지 검사합니다.
* 큐로부터 유입될 수 있는 불순물이나 임의의 속성을 사전에 필터링합니다.

## 9. 기존 Worker Job DB Revalidation 재사용 방안
* 기존에 구현된 `sku-keyword-final-approval-execution-worker-job-db-revalidation.service.ts`를 활용합니다.
* API 처리 시점과 Worker 실행 시점 사이의 시간 차이로 인해 발생할 수 있는 상태 변경(만료, 취소 등)을 방어하기 위해, 최신 DB 데이터를 기반으로 유효성을 다시 한 번 검사합니다.

## 10. 기존 Worker Job Orchestration 재사용 방안
* 기존에 구현된 `sku-keyword-final-approval-execution-worker-job-orchestration.service.ts`를 연결합니다.
* DB 검증을 통과한 유효한 데이터를 실제 실행 가능한 구조로 재구성하고, 향후 Naver API와 통신하기 위한 준비 단계를 완수합니다.

## 11. Idempotency (멱등성) 정책
* **Job ID 매핑**: BullMQ Job 생성 시 사용되는 `jobId`는 요청의 `idempotencyKey`와 동일하게 설정합니다.
* **중복 큐잉 방지**: BullMQ 자체 기능을 활용하여 동일한 `jobId`를 가진 작업의 중복 처리를 1차 방어합니다.
* **DB 레벨 멱등성**: DB Revalidation 단계에서 해당 요청이 이미 처리되었는지 재확인합니다. 재시도 시에도 중복 실행(API 호출 등)이 발생하지 않도록, 상태 업데이트 결과의 Idempotency 관리가 별도 설계되어야 합니다.

## 12. 장애 처리 정책
* **Redis 연결 실패**: 즉시 중단(Crash) 후 컨테이너 재시작 또는 Orchestrator에 의한 복구 대기.
* **DB 연결 실패**: 재시도 가능한 일시적 장애로 간주하여 Exponential Backoff 기반으로 재시도합니다.
* **Payload Validation 실패**: 재시도 불가능 오류. Job을 즉시 `failed` 처리합니다.
* **DB Revalidation 실패 (Expired/Non-ACTIVE 등)**: 재시도 불가능 오류. 상태 변화에 의한 정당한 거부이므로 즉시 `failed` 처리합니다.
* **READY Item 0개, Hash Mismatch**: 재시도 불가능 오류로 즉시 중단 및 기록합니다.
* **Unknown Job Name**: 큐에 유입된 알 수 없는 작업은 버리거나(discard) Dead Letter Queue로 이동합니다.
* **Retry Exhaustion**: 최대 재시도 횟수 초과 시, 알림 발행 및 수동 개입 상태로 전환합니다.
* **Worker Crash**: 프로세스 종료 시 BullMQ의 Active 작업은 타임아웃 이후 다른 Worker에 의해 재할당되어 처리됩니다.

## 13. Redis/BullMQ 연결 정책
* 운영 Redis 환경과 테스트 Redis 환경을 철저하게 분리합니다.
* API `route.ts` 프로세스와 완전히 독립된 Node.js 환경(별도 프로세스 또는 스크립트)에서 연결을 수립합니다.

## 14. DB 접근 정책
* 운영 DB 환경과 테스트 DB 환경을 분리하여 적용합니다.
* 초기 Worker 구현 시 상태 변경(EXECUTING 전환 등) 및 실제 DB Write 작업은 금지됩니다. (읽기 전용 Revalidation 위주로 구현)

## 15. 보안 정책
* **데이터 마스킹**: `REDIS_URL`, `DATABASE_URL` 원문 출력 및 로깅을 원천 차단합니다.
* **기밀 정보 로깅 금지**: DB 비밀번호, API 토큰, Secret 값은 로깅하지 않습니다. 에러 메시지 출력 시 정규식 등을 활용한 Redaction 처리를 필수 적용합니다.
* **Payload 최소화**: Queue Payload 내부와 Redis Key 이름에 어떠한 Secret 정보도 저장하지 않습니다.

## 16. 테스트 전략
1. Worker가 정확히 `final-approval-execution` 큐를 구독하는지 검증합니다.
2. `sku-keyword-final-approval-execution` Job Name만 처리하고 다른 이름은 무시하는지 검증합니다.
3. Payload 형식이 올바르지 않은 경우 즉각 안전 실패(Fail-safe)하는지 검증합니다.
4. DB Revalidation 실패 시 실제 프로세스로 진행되지 않고 중단되는지 검증합니다.
5. DB Revalidation 성공 시 로직이 `readyForExecution` 단계까지만 안전하게 도달하는지 검증합니다.
6. Naver API 및 외부 HTTP 요청이 일절 발생하지 않음을 검증합니다.
7. DB에 `EXECUTING` 상태 전환 등의 Write 작업이 없는지 검증합니다.
8. Prisma Write 연산이 실행되지 않는지 모니터링합니다.
9. Redis 연결 장애 시 Worker가 안전하게 예외 처리 및 실패하는지 검증합니다.
10. 테스트 종료 시 Worker 및 Redis 연결 자원이 올바르게 해제(close)되어 프로세스가 멈추지 않고 종료되는지 검증합니다.

## 17. 실제 구현 전 체크리스트
* [ ] BullMQ Processor 구현을 위한 독립적인 진입점(Entry point)이 설계되었는가?
* [ ] Payload Validation / DB Revalidation / Orchestration 서비스들이 Worker 문맥에 올바르게 주입(Inject)될 수 있는가?
* [ ] 안전한 Redaction 로그 환경이 구성되었는가?

## 18. 현재 금지 범위
* Worker 코드 및 Queue Processor 코드 생성 금지
* `route.ts`, `route.test.ts`, Factory, BullMQ Adapter 수정 금지
* `package.json`, `package-lock.json`, `schema.prisma` 변경 금지
* `npm install` 추가 실행, Prisma Adapter 추가 구현 금지
* 실제 운영 DB/Redis 접근 및 실제 Write/FLUSHDB 작업 금지
* Naver API, LIVE adapter 연동 및 EXECUTING 상태 변경 금지
* 시스템 환경변수 및 URL 로깅/출력 금지

## 19. 다음 단계 제안
1. 본 문서 (FinalApproval Execution Worker Process Design) 커밋
2. Queue Processor 상세 설계 문서 작성 (BullMQ Processor 인터페이스 및 의존성 주입 설계)
3. 이후 별도 승인을 거쳐 Worker Process 실 구현 착수
