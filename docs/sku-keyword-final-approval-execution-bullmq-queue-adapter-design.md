# FinalApproval Execution BullMQ Queue Adapter Design

## 1. 작업 목적
FinalApproval Execution Queue Port를 실제 BullMQ 기반 Adapter로 연결하기에 앞서, 인프라 계층(Adapter)의 책임과 한계, 기존 비즈니스 로직(Port)과의 구조적 연결 방식 및 안전 정책을 설계하고 문서화합니다.

## 2. 현재 완료 상태 요약
- `BullMQ`/`ioredis` dependency install 완료
- Dependency Install Verification 문서 추가 완료
- 테스트 Redis 컨테이너 `tms-final-approval-test-redis` 실행 확인 완료
- `redis-cli ping` 결과 `PONG` 확인 완료
*(현재 Adapter 및 Worker 구현 등은 진행되지 않은 순수 준비 상태입니다.)*

## 3. BullMQ Queue Adapter가 필요한 이유
오랜 시간이 소요되는 FinalApproval Execution 프로세스를 비동기 백그라운드 Worker로 위임하여 API 응답성을 확보하기 위함입니다. BullMQ는 Job 스케줄링, 실패 시 자동 재시도, 실패 큐 관리 등 안정적인 메시지 큐 시스템을 제공하므로 이를 실제 큐 인프라로 도입합니다.

## 4. 기존 Queue Port와의 연결 방식
- **기존 Queue Port**: `FinalApprovalExecutionQueuePort`
- **기존 enqueue service**: `enqueueFinalApprovalExecutionJob`
- BullMQ Queue Adapter는 위 `FinalApprovalExecutionQueuePort` 인터페이스를 구현(implements)하는 클래스나 함수 집합으로 작성됩니다. 비즈니스 로직은 Adapter의 구체적 구현(BullMQ)에 의존하지 않고 Port를 통해서만 호출을 수행합니다.

## 5. Adapter 책임 범위
- `Queue Port interface` 구현
- `BullMQ Queue` 인스턴스 생성 및 관리
- `enqueue` 요청을 BullMQ의 `Queue.add` 호출로 변환
- `jobId`를 `idempotencyKey` 기반으로 일치시켜 설정
- `removeOnComplete` / `removeOnFail` 옵션 등 큐 하우스키핑 정책 적용
- `attempts` / `backoff` 등 재시도 정책 적용
- `Queue.add` 성공 결과를 기존 시스템의 `Queue Enqueue Result` 형태로 변환 반환
- Redis 연결 실패 시 앱 크래시가 아닌 안전한 실패 객체로 변환하여 반환

## 6. Adapter가 하지 말아야 할 일
- API route(`route.ts`)를 직접 수정하여 결합도를 높이지 않음
- Worker Job을 직접 소비(consume)하지 않음 (이 Adapter는 생산자 역할만 수행)
- Worker process 구동 및 관리를 하지 않음
- `EXECUTING` 상태 전환 로직을 수행하지 않음
- DB read/write를 수행하지 않음
- Prisma 모듈을 import하지 않음
- Naver API를 호출하지 않음
- `LIVE` adapter를 호출하지 않음
- 이미 존재하는 payload validation 서비스 역할을 대체하지 않음
- DB Revalidation 역할을 대체하지 않음

## 7. Queue 이름 정책
- **Queue 이름**: `final-approval-execution`

## 8. Job 이름 정책
- **Job 이름**: `sku-keyword-final-approval-execution`

## 9. Job payload 정책
- `finalApprovalId`
- `actorId`
- `idempotencyKey`
- `requestedAt`
- `source`: 반드시 `EXECUTION_API`
- `mode`: 현재는 `MOCK` 또는 `DRY_RUN_READY`만 허용. (`LIVE`는 현 단계에서 금지이며, 향후 확장을 위한 후보로만 존재합니다.)

## 10. jobId / idempotencyKey 정책
- BullMQ Job의 고유 `jobId` 옵션은 Payload로 전달받은 `idempotencyKey`와 동일하게 설정하여, 큐 레벨에서의 중복 enqueue를 원천적으로 방지합니다.

## 11. Redis connection 정책
- `REDIS_URL`은 오직 환경변수에서만 읽어옵니다.
- 로그, 에러 메시지 등 어떤 출력에도 `REDIS_URL` 원문을 기록하는 것을 엄격히 금지합니다.
- 운영 Redis와 테스트 Redis는 완벽히 분리되어야 합니다.
- 테스트 Redis 환경변수 예: `redis://localhost:56379`
- 운영 Redis 연결은 관련 보안 검토 및 별도 승인 전까지 일절 금지합니다.
- Redis 연결 실패(Timeout, ECONNREFUSED 등) 시 API는 안전하게 제어권을 반환받고 `500` 또는 `503` 에러로 실패 응답을 내려야 합니다.

## 12. Feature flag 정책
- `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE` 환경 변수가 `true`일 때만 실제 Queue enqueue 로직을 활성화합니다.
- 실제 BullMQ Adapter의 주입 여부는 환경 설정 파일이나 DI 계층으로 분리합니다.
- 테스트 환경(Fake Queue)과 실제 운영 환경(BullMQ Adapter)을 명확히 분리합니다.
- `NODE_ENV === 'test'`일 때만 Fake Queue의 성공 경로가 허용됩니다.
- 운영 환경에서는 Fake Queue 사용으로 인해 발생하는 가짜 202 응답을 엄격히 차단합니다.

## 13. API route와 Adapter의 책임 분리
- API route는 HTTP 요청/응답 제어에만 집중하며, Adapter 객체 자체나 BullMQ 모듈을 직접 import하지 않고 순수 Port 객체에만 의존해야 합니다.

## 14. Worker와 Adapter의 책임 분리
- Queue Adapter는 오직 이벤트를 '발생'시키는 Enqueue(Producer) 역할만 수행합니다. Job을 받아서 처리하는 Worker(Consumer) 로직은 완전히 분리된 프로세스나 파일에서 관리됩니다.

## 15. 테스트 전략
1. Adapter 생성 단위 테스트 검증
2. REDIS_URL 누락 시 안전 실패 반환 테스트
3. Redis 연결 실패(네트워크 등) 시 안전 실패 반환 테스트
4. Docker Redis 기반 `Queue.add` integration test
5. `jobId`가 `idempotencyKey`로 정확히 설정되는지 검증
6. Queue name / Job name이 정확하게 매핑되는지 검증
7. Payload가 명시된 최소 필드만을 정확히 포함하는지 검증
8. 에러 발생 시 에러 메시지 등에 REDIS_URL 원문이 노출되지 않는지 검증
9. API route 코드에서 BullMQ를 직접 import하지 않는지 검증
10. 본 테스트 단계에서 Worker는 구현되거나 실행되지 않는지 검증

## 16. 장애 처리 정책
- Redis Unavailable 상황 시 Queue enqueue 실패로 즉시 반환하여 호출 측이 인지하도록 합니다.
- `Queue.add` 자체 실패 시 안전한 failure result 객체를 반환합니다.
- API route에서는 위 실패들을 `500` 또는 `503` 상태 코드로 매핑하여 클라이언트에게 알립니다.
- 재시도(Retry)는 수동 구현이 아닌 BullMQ 자체의 job options를 활용하여 선언적으로 관리합니다.
- 중복 큐잉 방지는 `idempotencyKey`를 `jobId`로 강제하는 정책으로 관리합니다.
- 최종 실패한 job은 `removeOnFail` 정책 혹은 별도의 failed job 모니터링 정책을 통해 제어합니다.

## 17. 보안 정책
- `REDIS_URL` 원문 출력 금지
- `DATABASE_URL` 원문 출력 금지
- DB 비밀번호, 토큰, secret 값 출력 절대 금지
- Queue Payload에 민감정보(개인정보, 암호화 키 등) 저장 금지
- Redis Key 이름 등에 secret 저장 금지
- 개발 및 통합 테스트 시 운영 Redis 접근 금지
- 개발 및 통합 테스트 시 운영 DB 접근 금지

## 18. 실제 구현 전 체크리스트
1. 현재 git status가 clean 상태인지 확인
2. 이전 단계인 dependency install 커밋이 완료되었는지 확인
3. Redis Docker test container(`tms-final-approval-test-redis`)가 정상 `Up` 상태인지 확인
4. `redis-cli ping` 명령이 `PONG`을 응답하는지 확인
5. 기존에 구현된 Queue Port 테스트가 모두 통과하는지 확인
6. 기존에 구현된 Worker Job Orchestration 테스트가 통과하는지 확인
7. `route.ts`에 실수로 BullMQ가 직접 import된 흔적이 없는지 확인
8. 진행할 구현 범위가 철저히 Adapter 파일 1개(또는 연관 DI 설정)로만 제한되는지 확인

## 19. 다음 구현 순서
1. 본 `BullMQ Queue Adapter Design` 문서 커밋
2. BullMQ Queue Adapter를 기존 Queue Port 인터페이스 규칙에 맞게 격리 구현
3. Docker Redis 기반 Queue Adapter integration test 작성 및 실행
4. Worker process 구현 및 실행 (별도 설계 및 승인 이후 진행)
