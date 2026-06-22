# FinalApproval Execution Worker Process Runtime Integration Design

## 1. 작업 목적
실제 운영 및 테스트 환경에서 동작할 BullMQ Worker Process의 런타임 통합(Runtime Integration) 구조를 설계합니다. 본 문서는 Startup Config Guard, BullMQ Worker 인스턴스, Queue Processor 순수 서비스, 그리고 Graceful Shutdown 등 기구현된 개별 요소들을 어떠한 순서와 아키텍처로 조립하고 실행할지에 대한 합의를 목적으로 합니다.

## 2. 현재 완료 상태 요약
* **FinalApproval Execution Worker Startup Config Guard Pure Service**: 환경변수 검증 및 Worker 시작 가능 여부 판단(`canStartWorker`) 순수 로직 구현 및 검증 완료.
* **Queue Processor Pure Service**: BullMQ/인프라 의존성 없는 `runFinalApprovalExecutionQueueProcessor` 구현 및 검증 완료.
* **API Route Enqueue 연동**: `route.ts` 내부의 `Route Queue Port Factory`를 통한 `BullMQ Adapter` 선택 및 integration test 검증 완료.
* **미구현 상태**: 실제 Worker Process 엔트리포인트, BullMQ Worker 인스턴스 초기화, Redis Consume Loop 연결, DB write 로직, EXECUTING 상태 전환, Naver API 호출.

## 3. Runtime Integration이 필요한 이유
* 각 모듈(환경변수 검증, 로직 처리, 작업 수신)이 순수 함수(Pure Function) 혹은 고립된 서비스로 구현되어 있으므로, 이를 제어 역전(IoC)이나 엔트리포인트 기반으로 엮어줄 실행 컨테이너가 필요합니다.
* Redis 연결 누수 방지 및 애플리케이션 중단 시점의 안정성(Graceful Shutdown)을 확보하기 위해 인프라 계층의 조립이 요구됩니다.

## 4. Worker Startup Config Guard의 역할
* `process.env`를 가장 먼저 읽고 해석하여 `validateFinalApprovalExecutionWorkerStartupConfig`를 호출합니다.
* Worker를 띄울 조건(`ENABLE_FINAL_APPROVAL_EXECUTION_WORKER`, `REDIS_URL` 등)이 만족되지 않으면 에러나 예외 발생 없이 안전하게 Worker 생성을 포기(disabled)하거나, 설정 오류일 경우 즉시 실패(Fail-fast) 처리하여 잘못된 환경에서의 Worker 구동을 방지합니다.

## 5. Queue Processor의 역할
* 런타임 인프라와 무관하게, Worker가 던져준 `job.data`와 `job.name` 평문 객체를 검증하고 처리 가능 여부(readyForExecution)를 반환합니다.
* 내부적으로 `runFinalApprovalExecutionWorkerJobOrchestration`를 재사용하며, 추후 구현될 Prisma 어댑터나 Naver API 어댑터의 진입점 역할을 합니다.

## 6. BullMQ Worker Runtime의 역할
* Redis 큐를 폴링(Consume)하고, 타임아웃, 재시도, 동시성(Concurrency)을 관리합니다.
* 에러 발생 시 지정된 정책(Attempts/Backoff)에 따라 BullMQ의 재시도 큐로 작업을 반환하거나 영구 실패 처리합니다.

## 7. Worker Process 시작 순서
1. `process.env`를 읽습니다.
2. `validateFinalApprovalExecutionWorkerStartupConfig` 함수로 시작 가능 여부를 검증합니다.
3. 반환된 `canStartWorker`가 `false`이면 Worker 인스턴스를 생성하지 않고 안전하게 스크립트를 종료하거나 대기합니다.
4. `canStartWorker`가 `true`이면 BullMQ Worker 생성 준비를 합니다.
5. 로그 출력 시 `REDIS_URL` 등의 원문은 절대 출력하지 않습니다.
6. 큐 이름은 기본값인 `final-approval-execution`을 사용합니다.
7. Job Processor는 인자로 전달받은 Job을 `runFinalApprovalExecutionQueueProcessor`로 전달하는 얇은 어댑터 함수로 구성합니다.
8. 초기 구현 단계에서는 DB write, EXECUTING 전환, Naver API 호출을 수행하지 않습니다.

## 8. Job 수신 후 처리 순서
1. BullMQ Worker 루프가 Redis로부터 job을 수신합니다.
2. 수신한 `job` 인스턴스에서 `job.id`, `job.name`, `job.data`를 추출해 plain object로 변환합니다.
3. 변환된 객체를 `runFinalApprovalExecutionQueueProcessor`에 전달합니다.
4. Queue Processor 내부에서 `job.name`과 `job.data`의 정합성을 검증합니다.
5. 유효하다면 기존 `Worker Job Orchestration` 서비스를 호출하여 DB 상태와 비교합니다.
6. 결과 반환값의 `readyForExecution`이 `true`로 떨어져도, 초기 단계에서는 실제 실행(Execution) 모듈을 호출하지 않습니다.
7. 따라서 `executionPerformed`는 계속 `false`를 유지합니다.
8. 에러나 실패가 리턴될 경우, 실패 요인이 일시적인지 영구적인지에 따라 재시도 여부(Error Throw 등)를 Worker Runtime이 판단하고 처리합니다.

## 9. Graceful shutdown 순서
1. 운영체제로부터 `SIGINT` 시그널 수신.
2. 운영체제로부터 `SIGTERM` 시그널 수신.
3. BullMQ Worker에 신규 Job 수신 중단을 지시합니다.
4. 이미 진행 중인 Job은 처리 완료를 기다리거나 사전에 정의된 안전 중단 정책을 따릅니다.
5. 명시적으로 `worker.close()` (혹은 `worker.disconnect()`)를 호출합니다.
6. Redis Connection의 `close`/`disconnect`를 보장하여 누수를 막습니다.
7. 모든 연결이 끊어진 후 프로세스가 완전히 닫혀 PowerShell 프롬프트가 행업 없이 정상 복귀하는지 확인합니다.

## 10. 환경변수 정책
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true`일 때만 Worker 시작을 시도합니다.
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq`여야 진행합니다.
* `FINAL_APPROVAL_EXECUTION_QUEUE_NAME` 미설정 시 `final-approval-execution`을 기본값으로 취합니다.
* `REDIS_URL`과 `DATABASE_URL`은 필수 값입니다.
* `NODE_ENV === 'production'`에서 localhost 기반의 Redis/DB URL 접근을 강제 차단합니다.
* `REDIS_URL`과 `DATABASE_URL` 원문 로그 출력을 무조건 금지합니다.

## 11. Redis/BullMQ 연결 정책
* BullMQ가 제공하는 내장 IORedis 래퍼를 활용하거나, 표준 IORedis 인스턴스를 주입하여 연결을 통제합니다.
* 운영과 테스트의 혼용을 막고, 안전 종료 시 해당 Connection 풀을 정확히 닫도록 설계합니다.

## 12. DB 접근 정책
* 런타임 진입 시 DB 연결 문자열을 환경변수에서 읽으나, 초기 릴리즈에서는 실제 쓰기(Write) 연산을 허용하지 않습니다.

## 13. Retry / backoff 정책
* `payload validation failure`: 재시도 불필요 (코드 또는 데이터 결함).
* `unknown job name`: 재시도 불필요 (라우팅 또는 페이로드 오류).
* `DB revalidation 비즈니스 실패`: 조건에 부합하지 않음, 재시도 불필요.
* `Redis/DB 일시 장애`: 연결 오류 등 인프라 에러 시 재시도 허용.
* (초기 단계에서는 Naver API 호출이 없으므로 해당 타임아웃 재시도는 배제합니다.)
* 재시도가 일어나더라도 `idempotencyKey` 기준의 중복 실행 방지 메커니즘을 반드시 통과해야 합니다.

## 14. 장애 처리 정책
런타임 통합 시 마주할 수 있는 각 장애의 대응 정책입니다:
* `Worker disabled`: 정상 대기 또는 종료.
* `Startup config validation failure`: 시스템 시작 실패 및 알람(또는 Fail-fast).
* `REDIS_URL / DATABASE_URL missing`: 인스턴스 구동 불가(Fail-fast).
* `Redis/DB connection failure`: Worker 크래시, 이후 시스템 재시작 위임.
* `unknown job name` / `payload validation failure` / `DB revalidation failure` / `idempotency duplicate`: 영구 실패(Dead Letter) 처리 및 로깅.
* `worker crash`: 프로세스 레벨에서 비정상 종료. 외부 데몬(PM2, Docker 등)이 재시작 처리.
* `retry exhaustion`: 큐 모니터링 시스템에서 실패 작업으로 전환 처리.
* `graceful shutdown 중 job 처리`: 타임아웃 초과 시 안전하게 처리 상태 롤백.

## 15. 로그 / 보안 정책
* `REDIS_URL` 및 `DATABASE_URL` 원문 출력 철저 금지.
* DB 비밀번호, API 토큰, 사용자 secret 정보 출력 금지.
* Queue Payload 인큐 및 Redis Key 이름 생성 시 secret 저장 절대 금지.
* 모든 Error message에는 URL 등이 섞여들어가지 않도록 Redaction 정규식 필터링 적용.
* 운영/테스트 Redis/DB 망 분리 철저.

## 16. 테스트 전략
1. `Worker disabled` 상태에서 BullMQ Worker 생성 없이 프로세스가 안전히 종료(혹은 대기)되는지 검증.
2. `Startup config failure` 시 Worker 인스턴스화 없이 안전 실패하는지 검증.
3. `REDIS_URL` 또는 `DATABASE_URL` 누락 시 Worker 생성 로직으로 진입하지 않음을 검증.
4. `canStartWorker`가 `true`일 때만 BullMQ 생성 준비가 됨을 검증.
5. 수신한 큐 메시지를 Queue Processor에 정확히 인계하는지 검증.
6. Queue Processor의 응답(`readyForExecution`, `executionPerformed`)을 Worker가 알맞게 핸들링하는지 검증.
7. `unknown job name` 등 재시도 불필요 오류에 대해 영구 실패 처리 여부 검증.
8. 종료 신호 시그널에 따른 `worker.close` 호출 여부 검증.
9. Redis 연결 종료 후 애플리케이션 및 콘솔(PowerShell) 행업(hang) 유무 검증.
10. Naver API 호출, EXECUTING 상태 전환, Prisma Database Write 로직이 아예 존재하지 않음을 런타임 및 소스 코드 상호 교차 검증.

## 17. 실제 구현 전 체크리스트
* [ ] 통합 환경에서 주입될 환경변수가 안전하게 파싱 및 전달되는가?
* [ ] Worker 프로세스가 터미널 백그라운드 환경에서도 Graceful Shutdown 이벤트를 수신할 수 있는가?
* [ ] 초기 구현 모드(Mock/No-execution)가 실제 시스템 리소스(DB)를 오염시키지 않음을 재차 확인했는가?

## 18. 현재 금지 범위
* 실제 코드 작성/수정 및 추가 구현 일절 금지.
* Worker 인스턴스화 로직 구상 외의 실제 생성 코드 구현 금지.
* Redis / DB 커넥션 맺기 시도 및 코드 작성 금지.
* `route.ts`, `route.test.ts`, Factory, BullMQ Adapter 등 기존 코드 파일 수정 금지.
* `package.json`, `package-lock.json`, `schema.prisma` 변경, NPM 패키지 임의 설치 금지.
* Naver API 실제 호출, LIVE Adapter 호출, EXECUTING DB 상태 업데이트 금지.
* 운영 DB/Redis 접근 금지. Redis FLUSHDB 금지.
* URL/Secret 정보 콘솔 평문 출력 및 Git 포함 금지.
* 해당 문서의 작성을 제외한 타 파일의 `git add .` 및 임의 커밋 반영 금지.

## 19. 다음 단계 제안
1. 본 문서(`Worker Process Runtime Integration Design`) 추가 후 커밋.
2. 런타임 설계 합의 및 사용자 리뷰 완료 후 `Worker Process`의 뼈대(최소 진입점 및 환경변수 로딩 뼈대)에 대한 스크립트 기반 구현 진행.
3. BullMQ Worker 생성 및 Mock 기반 빈 루프(No-op) 소비 테스트 및 Graceful Shutdown 동작 증명.
4. 이후 단계적으로 Processor 및 실제 DB/Naver 연동 모듈 조립 설계 논의.
