# FinalApproval Execution Worker Entrypoint Enabled Mode No-Op Job Consumption Verification Design

## 1. 작업 목적
`Enabled Mode`로 기동된 `Worker Entrypoint` 환경에서, 실제 워커가 테스트 Redis Queue에 인입된 단일 Job을 정상적으로 수신(Consume)하는지 뼈대만 증명하는 `No-Op Job Consumption` 검증 절차와 성공/실패 기준을 설계 및 문서화합니다.

## 2. 현재 완료 상태 요약
* `Worker Entrypoint`의 `Enabled Mode Safe Startup` 실제 실행 검증 및 문서 추가 완료.
* 테스트 Redis에 정상 연결되고 Background 대기 상태(started true) 돌입 및 `SIGINT`로 안전하게 종료됨을 확인.
* 아직 큐(Queue)에 실제 Payload가 담긴 Job을 Enqueue 하거나 워커가 이를 Consume하는 로직 통과 검증은 수행하지 않았음.

## 3. No-Op Job Consumption 검증이 필요한 이유
* 워커가 단순히 소켓을 개방하는 것을 넘어, BullMQ 구조를 통해 큐에 도착한 메시지를 디코딩하고 `Queue Processor`의 델리게이트 함수까지 무사히 전달하는지(Message Passing Pipeline)를 실증해야 합니다.
* 단, 인프라의 오염과 의도치 않은 라이브 API 파급 효과를 막기 위해 철저히 `No-Op`(실제 동작 없음) 기반의 더미 Job으로만 통과 여부를 점검해야 합니다.

## 4. 검증 범위
* Worker Entrypoint를 `Enabled Mode` 상태로 로컬 실행 유지.
* 테스트용 Redis 인스턴스에 구성된 `final-approval-execution` 큐 사용.
* 철저히 통제된 더미(Dummy) `테스트 Job 1개`만 Enqueue 수행.
* Worker가 해당 Job 이벤트를 포착하고 Consume하는 프로세스 흐름 확인.
* 현재 연결되어 있는 빈 Processor(혹은 안전하게 설계된 더미 Processor)가 실제 DB 연산이나 외부망 통신 없이 성공(OK) 신호만 반환하는지 관찰.
* 테스트 즉시 워커를 종료하고 `runtime.close()`의 완전한 수행 증명.
* `git status --short`에 파편이나 찌꺼기가 남지 않음(Clean) 확인.

## 5. 검증 제외 범위
* `PrismaClient`를 활용한 실제 데이터베이스 읽기 및 쓰기 작업 일절 제외.
* 외부 네트워크망(`Naver API`, `LIVE adapter`) 연결 및 패킷 발송 전면 제외.
* 시스템 상태의 실제 변이(`EXECUTING`, Job/Item 상태 변경) 로직 진입 제외.
* Production 레벨의 운영 DB, 운영 Redis 접근 테스트 제외.
* 패키지 매니저(`package.json`, npm script) 변동 및 PM2/Docker 등 데몬 서비스 셋업 제외.

## 6. 테스트 Redis 전제 조건
* **컨테이너 이름**: `tms-final-approval-test-redis`
* **테스트 Redis 포트**: `localhost:56379`
* **상태 확인**: `redis-cli ping` 수행 시 즉각 `PONG` 반환 필수.
* `Redis FLUSHDB` 같은 전체 파괴 명령어는 사용하지 않고 큐 단위로만 관리.
* 운영 환경의 Redis 사용은 엄격히 차단.

## 7. Worker 실행 전 전제 조건
* `git status --short` 상 워크스페이스 내 어떠한 미커밋 파일이나 임시 로그가 없는 Clean 상태 보장.
* 쉘 환경 변수에 `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true`, `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq` 보장.
* 워커에 주입될 `DATABASE_URL`과 `REDIS_URL`은 오직 격리된 로컬 테스트 환경을 향하고 있어야 함.

## 8. 테스트 Job payload 후보
다음과 같이 `id`나 값이 완전히 격리된 더미 JSON을 구성합니다. 절대 운영 환경의 실제 식별자나 고유 키, 인증 토큰을 삽입하지 않습니다.
```json
{
  "finalApprovalId": "test-final-approval-noop-001",
  "actorId": "test-actor",
  "idempotencyKey": "test-worker-entrypoint-noop-001",
  "requestedAt": "2026-06-22T12:00:00.000Z",
  "source": "worker-entrypoint-noop-verification",
  "mode": "dry-run"
}
```

## 9. 테스트 Job enqueue 방식 후보
1. **파워쉘/노드 인라인 스크립트 (One-liner)**: `BullMQ` 패키지를 단발성으로 호출하여 `final-approval-execution` 큐 인스턴스에 `sku-keyword-final-approval-execution` 이름으로 Job을 Add 하는 간단한 스크립트.
2. **별도 더미 테스트 스크립트 작성**: 기존 구현된 `Route Queue Port Factory`에서 꺼낸 `BullMQ Adapter`를 사용해 Enqueue만 수행하고 즉시 종료되는 격리된 코드 블록(추후 폐기/삭제).
*(※ 본 설계 문서 단계에서는 어떠한 Enqueue도 실제로 행하지 않습니다.)*

## 10. Worker consume 기대 결과
* 워커 부트스트랩 완료: `[INFO] Worker started successfully.`
* Enqueue 된 직후 Worker가 즉각 폴링(Polling)하여 이벤트를 로거에 기록 (예: `Processing job test-final-approval-noop-001`).
* `Queue Processor` 단으로 메시지가 전달되었으나, DB 쿼리를 타지 않고 즉시 리턴(완료)됨.
* 콘솔상에 `REDIS_URL`, `DATABASE_URL`, 혹은 테스트 `Queue Payload` 전체를 통째로 Dump 하는 식의 난잡한 로그나 보안 마스킹 실패 현상이 없음.

## 11. 종료 방식
* 테스트 Job의 처리 완료 로그(`Job completed` 등)를 육안으로 확인.
* 즉각 터미널에 `Ctrl+C (SIGINT)`를 발생시켜 런타임 셧다운 진입.
* 프로세스가 행업(Hang) 없이 터미널 프롬프트로 깔끔히 복귀(`Exit 0`).

## 12. 성공 기준
* 워커가 살아있는 동안 삽입된 단일 더미 Job을 정상적으로 수신하고 처리 완료 상태(No-Op)로 전환했을 것.
* 그 과정에서 단 1건의 DB 쿼리나 Naver API 외부망 패킷도 발생하지 않았음을 로그로 소명할 것.
* 시그널을 통한 안전 종료(`runtime.close()`)가 완수되고 어떠한 부작용 흔적(git status 변경)도 없을 것.

## 13. 실패 기준
* 운영망(Redis/DB)으로 패킷이 흘러들어갔거나 연결을 시도함.
* 더미 Payload 문자열에 실제 운영계 식별자나 Secret(토큰/비밀번호)을 기재함.
* 콘솔에 `REDIS_URL` 혹은 `DATABASE_URL` 평문, Secret 문자열이 유출됨.
* 로거가 의도치 않게 Payload 원본 전체나 에러 스택의 100%를 무질서하게 Dump 함.
* 런타임이 통제를 상실하여 `Naver API`를 호출하거나 `EXECUTING` 등 상태 값의 실제 트랜지션을 유발함.
* `PrismaClient`가 Import 되어 인스턴스화되거나 Insert/Update가 일어남.
* `Redis FLUSHDB` 실행 흔적 발견.
* 프로세스가 종료 시그널을 무시하고 좀비(Hang)가 됨.
* `package.json`, `route.ts` 등의 구성 파일이 오염됨.

## 14. 보안 점검 항목
* [ ] `REDIS_URL` / `DATABASE_URL` 평문 로그 노출 유무 점검.
* [ ] DB 비밀번호, Naver API 인증 토큰의 유출 가능성 전면 차단.
* [ ] 무차별적인 Payload/Error Stack Dump 로깅 유무 검수.
* [ ] 프로덕션 DB 및 Redis 통신 패킷 전면 통제 확인.
* [ ] `Redis FLUSHDB` 명령어 발생 차단 확인.
* [ ] `Prisma`를 통한 실제 Write 연산 방어 확인.
* [ ] 라이브러리를 통한 외부망(`Naver API`) 호출 통제 유무.

## 15. 실제 실행 전 체크리스트
1. [ ] `git status --short`가 빈 출력(Clean)인지 재검증.
2. [ ] 직전 단계의 문서 추가 작업들이 모두 커밋 완료 상태인지 확인.
3. [ ] `tms-final-approval-test-redis` 컨테이너가 `PONG`을 올바르게 뱉는지 재확인.
4. [ ] 셸의 `NODE_ENV`가 `test` 등으로 설정되어 있는지 검증.
5. [ ] 워커에 전달될 `REDIS_URL` 및 `DATABASE_URL`이 절대적으로 테스트 타겟(Local)임을 보장.
6. [ ] 큐에 삽입할 Payload 명세 내에 Secret 토큰 및 운영 ID가 기재되지 않았음 교차 확인.
7. [ ] 연사(Loop) 오류를 방지하기 위해 단 1개의 더미 Job만 발사하도록 스크립트 작성 여부 점검.
8. [ ] 셧다운 대응(`SIGINT`) 대기.
9. [ ] 셧다운 후 워크스페이스 무결성 유지(`git status` 점검) 숙지.

## 16. 현재 금지 범위
* 코드 훼손 및 `scripts/final-approval-execution-worker.ts` 등 소스 코드 수정 절대 금지.
* `package.json`, NPM 설정 및 PM2, Docker 구동 파일 조작 금지.
* 기존 구현된 어댑터 로직(`BullMQ Adapter`), `Queue Processor`, Guard, 라우팅 컨트롤러 조작 금지.
* DB `schema.prisma` 스키마 수정 및 `PrismaClient` 실제 인스턴스 생성을 통한 데이터 변경 원천 차단.
* 운영 환경 리소스(`Redis`, `DB`) 접속 절대 불가.
* 테스트를 목적으로 하는 `Worker` 실행 및 큐에 Job을 Add 하는 실전 스크립트 구동 보류 (본 문서는 설계로 국한).

## 17. 다음 단계 제안
1. 설계 완료된 본 `No-Op Job Consumption Verification Design` 문서를 먼저 커밋합니다.
2. 이후 사용자 승인이 주어질 시, 위 제약 조건과 체크리스트에 의거하여 **실제 No-Op Job 삽입 및 Consume 증명 실험을 단 1회 수행**하고 관찰합니다.
3. 성공 시 관찰 내용을 증적(Result) 문서로 갈무리합니다.
