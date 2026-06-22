# FinalApproval Execution Worker Process Implementation Design

## 1. 작업 목적
실제 운영 환경 또는 테스트 환경에서 `BullMQ Worker` 인스턴스를 띄우고 Redis Queue로부터 작업을 가져와 처리하는 `Worker Process`의 구현 세부 사항과 구조를 설계합니다. 본 문서는 코드를 작성하기 앞서, 구조, 예외 처리, Graceful Shutdown 등의 정책을 합의하기 위해 작성되었습니다.

## 2. 현재 완료 상태 요약
* API 라우트에서 `BullMQ Adapter` 경로 연동 및 Integration Test 완료
* `Route Queue Port Factory`에서 `BullMQ Adapter` 선택 분기 완료
* `Queue Processor Pure Service` (`runFinalApprovalExecutionQueueProcessor`) 구현 완료 및 테스트 통과
* **미구현 상태**: 실제 Worker Process 진입점, BullMQ Worker 인스턴스, Redis Consume Loop, EXECUTING 상태 전환, DB Write 연산, Naver API 호출.

## 3. Worker Process 구현 필요성
* API 서버와 물리적/논리적으로 분리된 백그라운드 환경에서 비동기 작업을 안정적으로 수행하기 위함입니다.
* Redis 큐를 폴링(Consume)하고 타임아웃, 재시도, 실패 정책을 관리하는 인프라스트럭처 레벨의 컨테이너가 필요합니다.
* 외부 네트워크(Naver API) 요청 등의 장애가 API 서비스에 전파되는 것을 차단합니다.

## 4. Worker Process와 Queue Processor의 경계
* **Worker Process**: `BullMQ Worker` 생성, Redis 연결 수립, Queue 구독(`Consume`), Graceful Shutdown(SIGINT, SIGTERM) 등 인프라와 생명주기를 담당합니다.
* **Queue Processor**: 전달받은 단일 Job 객체(`plain object`)에 대한 비즈니스 로직(Validation, DB Revalidation, Orchestration)만을 담당하며 BullMQ 인프라에 의존하지 않습니다.
* **API Route (`route.ts`)**: 큐에 Job을 넣는(Enqueue) 역할만 수행하며, Worker Process는 `route.ts` 내부에서 실행되지 않습니다.

## 5. 실행 방식 후보
1. **별도 Node script**: `node scripts/final-approval-execution-worker.js` 와 같이 독립적으로 실행
2. **별도 npm script**: `npm run worker:final-approval` 형태로 패키지 구성
3. **별도 worker entrypoint**: 빌드 시스템에서 Worker 용 진입점을 따로 구성
4. **추후 확장성**: PM2, Docker Container, NAS 기반 백그라운드 서비스 등으로 쉽게 등록 가능해야 합니다.
5. **금지**: Next.js의 웹 라우트나 서버 런타임 안에서 통합 실행하지 않습니다.

## 6. 파일 구조 후보
* `scripts/final-approval-execution-worker.ts`
* `src/workers/final-approval-execution.worker.ts`
* `src/workers/final-approval-execution-worker-process.ts`
> *참고: 이번 문서 작업에서는 실제 파일을 생성하지 않고 위 후보군 중에서 추후 하나를 선택해 구현합니다.*

## 7. 환경변수 정책
사용될 환경변수 후보:
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER`
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER`
* `FINAL_APPROVAL_EXECUTION_QUEUE_NAME`
* `REDIS_URL`
* `DATABASE_URL`
* `NODE_ENV`

**정책**:
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true`일 때만 Worker가 실행됩니다.
* `REDIS_URL`이나 `DATABASE_URL`이 없으면 Worker 시작은 즉시 실패(`Fail-fast`) 처리됩니다.
* 운영 환경(`NODE_ENV=production`)에서는 테스트 DB/Redis 사용을 엄격히 금지합니다.
* **`REDIS_URL` 및 `DATABASE_URL`의 원문 로그 출력은 무조건 금지합니다.**

## 8. Queue 이름과 Job 이름
* **Queue 이름**: `final-approval-execution`
* **Job 이름**: `sku-keyword-final-approval-execution`
* **Payload 필드**: `finalApprovalId`, `actorId`, `idempotencyKey`, `requestedAt`, `source`, `mode`

## 9. Redis/BullMQ 연결 정책
* `BullMQ`의 `Worker` 클래스를 통해 Redis 연결을 생성합니다.
* `connection` 옵션은 Adapter와 동일하게 설정하여, 호환성 및 안정성을 유지합니다.
* Worker 전용 Redis Connection을 사용하며 다른 서비스와의 Connection 혼용을 주의합니다.

## 10. Worker 생성 정책
* `BullMQ Worker` 인스턴스는 `final-approval-execution` 큐를 구독합니다.
* Job 수신 시 `job.name`이 `sku-keyword-final-approval-execution`인지 가장 먼저 확인합니다.
* 확인된 `job.data`는 순수 객체(`plain object`) 형태로 `Queue Processor`에 전달합니다.
* Worker는 `Queue Processor`의 처리 결과(`Result`)를 해석하여 BullMQ에 성공(완료) 또는 실패(`throw` 혹은 실패 상태 저장)를 보고합니다.
* 초기 구현 단계에서는 실제 Naver API 연동, DB 데이터 Write, EXECUTING 상태 전환을 일절 진행하지 않습니다.

## 11. Queue Processor 호출 방식
* `job.data`를 입력받아 `runFinalApprovalExecutionQueueProcessor` 함수를 호출합니다.
* 반환된 결과를 기반으로 `BullMQ` 라이브러리에 에러를 `throw` 하거나 처리 완료를 알립니다.

## 12. Graceful shutdown 정책
* 운영체제의 `SIGINT`, `SIGTERM` 시그널을 수신하도록 설정합니다.
* 종료 시그널 수신 시 `worker.close()`를 호출하여 새로운 작업의 유입을 막고 진행 중인 작업을 안전하게 종료 대기합니다.
* Redis 연결(`close`/`disconnect`)이 확실하게 해제되도록 보장합니다.
* 프로세스 완전 종료 후, 터미널/PowerShell 프롬프트가 행업(Hang) 없이 정상 복귀하는지 검증합니다.

## 13. Retry / backoff 정책
* BullMQ 내부의 `attempts`, `backoff` 정책은 Queue Enqueue Adapter 쪽에 설정된 정책과 일관성을 유지하도록 매핑합니다.
* **재시도 불필요(영구 실패)**: `payload validation failure`, `unknown job name`.
* **재시도 가능(일시 실패)**: DB/Redis 일시 장애(네트워크 문제 등).
* (Naver API 호출은 아직 없으므로 배제)
* 모든 재시도는 `idempotencyKey`를 기반으로 한 중복 실행 방지 메커니즘을 필수로 거칩니다.

## 14. 장애 처리 정책
* **Redis/DB 연결 실패**: Worker 실행 초기에 발견 시 Crash 후 시스템 재시작 위임. 런타임 발생 시 재시도.
* **unknown job name**: 재시도 불필요 에러 처리.
* **payload/DB revalidation failure**: 재시도 불필요 로직 에러로 즉시 실패 보고.
* **idempotency duplicate**: 멱등성 위반 시 안전한 중복 처리 방어 및 실패(또는 이미 완료됨) 응답.
* **worker crash / retry exhaustion**: Dead Letter Queue 성격의 실패 보관소로 이관 및 수동 모니터링 체제 연계.
* **graceful shutdown 중 job 처리**: 진행 중인 작업은 일정 시간 대기 후 중단 처리 등 안전 중단 정책 수립.

## 15. 로그 / 보안 정책
* `REDIS_URL`, `DATABASE_URL`, DB 비밀번호, API 토큰, 사용자 Secret 등 기밀 정보의 **원문 로그 출력 금지**.
* Queue payload 내부 및 Redis Key 내부에 Secret 정보 저장 금지.
* 에러 로그 및 시스템 메시지 출력 시 정규식을 이용한 **Redaction(마스킹) 적용** 필수.
* 운영 인프라(DB, Redis)와 테스트 인프라 철저히 분리.

## 16. 테스트 전략
1. `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` 비활성화 시 Worker가 시작하지 않는지 검증.
2. `REDIS_URL` 또는 `DATABASE_URL` 누락 시 즉각 Fail-fast 종료되는지 검증.
3. 정확한 Queue name을 구독하는지 검증.
4. 유효한 Job name에 대해서만 Queue Processor로 로직을 인계하는지 검증.
5. Queue Processor의 반환 결과(성공/실패)를 Worker가 알맞게 BullMQ 상태로 전환하는지 검증.
6. Unknown job name, Payload validation failure, DB revalidation failure 시 안전하게 실패 처리하는지 검증.
7. 종료(Shutdown) 이벤트 발생 시 `worker.close()`가 올바르게 호출되고 터미널 프롬프트가 행업 없이 복귀되는지 검증.
8. Prisma DB Write, Naver API 호출, EXECUTING 상태 전환 로직이 일절 없는지 코드 레벨 및 런타임 레벨에서 검증.

## 17. 실제 구현 전 체크리스트
* [ ] Worker 진입점(Entrypoint) 스크립트의 구성 및 빌드 환경과의 호환성을 확인했는가?
* [ ] Docker 환경이나 PM2 등에서 환경변수를 안전하게 Worker 스크립트에 주입할 수 있는가?
* [ ] Graceful Shutdown 이벤트 바인딩이 런타임(Node.js)의 이벤트 루프와 충돌 없이 동작하는지 확인했는가?

## 18. 현재 금지 범위
* 실제 Worker 및 BullMQ 인스턴스 소스 코드 생성 금지.
* Redis 연결 코드 구현 금지.
* Queue Processor와 Worker 연결 구현 금지.
* `route.ts`, `route.test.ts`, Factory, Adapter, Queue Processor 등 일절 코드 수정 금지.
* `package.json`, `package-lock.json`, `schema.prisma` 변경 및 NPM 의존성 설치 금지.
* 운영 DB/Redis 접근 및 실제 DB Write 연산(create, update, delete) 실행 금지.
* Naver API, LIVE adapter 연동, EXECUTING 상태 전환 금지.
* `DATABASE_URL`, `REDIS_URL` 원문 노출 및 Git Stage(`git add .`) 등록 금지.

## 19. 다음 단계 제안
1. 본 문서 (FinalApproval Execution Worker Process Implementation Design) 커밋 및 리뷰
2. 승인 완료 후 실제 `Worker Process` 스크립트 작성 (초기 버전: Mock 기반 무동작 구조)
3. Graceful Shutdown 및 로깅 안전장치 적용 검증 테스트
4. 향후 DB Write 엑세스 및 EXECUTING 전환 허가 후 확장 구현
