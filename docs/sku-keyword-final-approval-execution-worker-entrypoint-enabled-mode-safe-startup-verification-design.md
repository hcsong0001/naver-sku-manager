# FinalApproval Execution Worker Entrypoint Enabled Mode Safe Startup Verification Design

## 1. 작업 목적
`ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true`가 설정된 `Enabled Mode` 상태에서 Worker Entrypoint(`scripts/final-approval-execution-worker.ts`)가 안전하게 기동되고 수동 셧다운 시그널에 의해 올바르게 자원을 정리하는지를 증명하기 위한 "Safe Startup 검증" 시나리오를 설계하고 문서화합니다.

## 2. 현재 완료 상태 요약
* Worker Entrypoint `Disabled Mode` 실제 실행 검증 및 결과 문서 추가 완료.
* `scripts/final-approval-execution-worker.ts` 최소 실행 진입점 껍데기 구현 완료.
* 환경변수 로거 정책 및 마스킹(Redaction) 검증 완료.
* 아직 `Enabled Mode`에서의 실제 실행 및 검증은 이루어지지 않았습니다.

## 3. Enabled Mode 실행 검증이 필요한 이유
* 워커가 의도된 조건 하에 있을 때, 실제 `BullMQ Worker` 인스턴스를 만들고 Redis에 올바르게 접속하는지 연결 건전성을 담보해야 합니다.
* 무한 루프(Event Loop)에 빠진 런타임이 사용자의 `Ctrl+C` (SIGINT) 개입 시 메모리 누수나 고아 프로세스(Orphan)를 발생시키지 않고 `runtime.close()`를 안정적으로 호출하여 셧다운하는지 확인해야 합니다.
* 런타임 환경에서 `REDIS_URL` 평문 출력 같은 보안 사고가 발생하지 않는지 실증해야 합니다.

## 4. Enabled Mode의 정의
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true` 상태입니다.
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq` 상태입니다.
* `NODE_ENV`는 `production`이 **아니어야** 합니다 (안전 장치 발동 방지).
* `REDIS_URL`은 로컬/테스트용 Redis 엔드포인트만 허용됩니다.
* `DATABASE_URL`은 테스트/더미 데이터베이스 URL만 허용됩니다.
* 이 상태에서는 `Startup Config Guard`가 `canStartWorker: true`를 반환하며, `BullMQ Worker` 객체가 인스턴스화됩니다.
* **제한 사항**: 큐(Queue)에 실제 Job을 발행(Enqueue)하지 않으므로, Queue Processor 호출은 절대 발생하지 않습니다. Naver API 호출, EXECUTING 상태 전환, DB Write 역시 존재하지 않습니다. (Safe Startup)

## 5. 실행 전 전제 조건
* 프로젝트 루트의 `git status --short`가 완전히 깨끗한 상태(Clean)여야 합니다.
* 이전 작업(Disabled Mode 결과 문서)이 모두 커밋되어 있어야 합니다.

## 6. Redis Docker 전제 조건
* **컨테이너 이름**: `tms-final-approval-test-redis`
* **포트 포워딩**: `localhost:56379 -> 6379`
* 컨테이너 내부에서 `redis-cli ping` 실행 시 `PONG`이 응답되어야 합니다.
* 기존 데이터 파괴를 막기 위해 `Redis FLUSHDB`는 절대로 실행하지 않습니다.
* 운영 서버(Production)의 Redis 환경은 일절 사용을 금지합니다.

## 7. DB 전제 조건
* 접속 가능한 안전한 테스트 전용 더미 데이터베이스의 `DATABASE_URL` 형식을 사용해야 합니다.
* 운영 데이터베이스로의 연결은 엄격히 금지됩니다.

## 8. 실행 명령 후보
로컬 검증 시 터미널에서 다음 명령 세트를 활용합니다:
```powershell
$env:NODE_ENV="test"
$env:ENABLE_FINAL_APPROVAL_EXECUTION_WORKER="true"
$env:FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER="bullmq"
$env:FINAL_APPROVAL_EXECUTION_QUEUE_NAME="final-approval-execution"
$env:REDIS_URL="redis://localhost:56379"
$env:DATABASE_URL="<redacted test database url>"
npx.cmd tsx scripts\final-approval-execution-worker.ts
```
> *(주의: 본 설계 단계에서는 실행하지 않으며, 다음 턴에서 별도 절차로 진행됩니다.)*

## 9. 종료 방식 후보
워커는 Background 폴링 데몬이므로 수동으로 셧다운해야 합니다.
1. 터미널 명령 실행 후 Worker started 로그를 육안 확인합니다.
2. 즉시 키보드의 `Ctrl+C`를 눌러 `SIGINT` 시그널을 전달합니다.
3. 콘솔에 `runtime.close()`를 수행하는 shutdown 로그가 찍히는지 관찰합니다.
4. OS PowerShell 프롬프트가 Block 풀림과 함께 정상 복귀하는지 확인합니다.
5. 테스트 직후 `git status --short`를 수행해 찌꺼기가 없는지 대조합니다.

## 10. 기대 결과 (Success Criteria)
아래의 현상이 오차 없이 발생해야 합니다:
* 콘솔에 "Starting FinalApproval Execution Worker Entrypoint..." 로그 출력
* 콘솔에 "Worker started successfully. Listening on queue: final-approval-execution" 로그 출력
* `BullMQ Worker` 인스턴스가 테스트 Redis에 소켓 연결을 확립함
* `Queue Processor`의 내부 로직은 단 한 번도 호출되지 않음
* Naver API, DB 쓰기, EXECUTING 상태 전환 없음
* 수동 `Ctrl+C` 입력 시 "Shutting down worker gracefully..." 로그 후 프로세스 안전 종료(`Exit 0`)
* PowerShell 프롬프트 정상 복귀 및 `git status` 변경 없음
* `REDIS_URL`이나 `DATABASE_URL` 평문 출력, DB 패스워드 등 유출 없음

## 11. 실패로 봐야 하는 결과 (Failure Criteria)
다음 현상 중 한 가지라도 발생 시 치명적 오류로 간주합니다:
* 운영 Redis 또는 운영 DB 연결 시도 및 성공
* `REDIS_URL`, `DATABASE_URL`, DB Password, Token, Secret 정보의 로그 평문 노출
* `Queue Processor` 내부 로직이 의도치 않게 호출됨
* Naver API 패킷 전송 시도 혹은 EXECUTING 상태 전환 로직 실행
* 데이터베이스에 `INSERT/UPDATE/DELETE/UPSERT` 수행
* 시그널(`Ctrl+C`) 수신 후에도 프로세스가 강제 종료되지 않고 Hang 됨
* 종료 후 `.log`, 덤프 파일, 혹은 임시 찌꺼기 파일이 `git status`에 노출됨
* `package.json`이나 `route.ts` 파일이 시스템에 의해 변경됨

## 12. 보안 점검 항목
실행 후 관찰된 터미널 로그를 대상으로 다음의 보안 기준을 검수합니다:
* [ ] `REDIS_URL` 원문 출력 없음 확인
* [ ] `DATABASE_URL` 원문 출력 없음 확인
* [ ] DB 비밀번호, 토큰, secret 데이터 유출 여부 점검 (없어야 함)
* [ ] Queue payload의 전체 덤프 기록 유무 확인 (없어야 함)
* [ ] Error stack 전체 출력 유무 점검 (없어야 함)
* [ ] 운영 DB 및 Redis 인프라로의 접근 패킷 발생 여부 (없어야 함)
* [ ] `Redis FLUSHDB` 파괴 명령 발송 여부 (없어야 함)

## 13. 실행 후 확인할 git 상태
테스트 완료 즉시 `git status --short`를 실행해, 본 워크스페이스에 부작용에 의한 생성/수정 파일이 없음을 증명해야 합니다.

## 14. 실제 실행 전 체크리스트
1. [ ] `git status --short`가 Clean 상태인지 확인 완료.
2. [ ] 직전 문서들(Disabled Mode 검증 등)의 커밋 완료 상태 확인.
3. [ ] `tms-final-approval-test-redis` Docker 컨테이너 구동 상태 확인.
4. [ ] 해당 컨테이너의 `redis-cli ping` 결과 `PONG` 확인.
5. [ ] 쉘 환경변수 `NODE_ENV`가 `production`이 아닌 상태임을 보장.
6. [ ] 쉘 환경변수 `REDIS_URL`이 로컬 테스트 인스턴스(`localhost:56379`)를 향하고 있음을 확인.
7. [ ] 쉘 환경변수 `DATABASE_URL`이 운영 DB의 도메인/IP가 아님을 확인.
8. [ ] 대상 Queue 인스턴스에 밀린 Job이 없는 순수 `Safe Startup` 검증 목적임을 확인.
9. [ ] 기동 확인 즉시 `Ctrl+C`로 종료할 대기 태세 완료.
10. [ ] 종료 후 `git status --short` 무결성 검증 계획 숙지.

## 15. 현재 금지 범위
* 코드 수정 및 `scripts/final-approval-execution-worker.ts` 소스 코드 변경 절대 금지.
* `package.json`, `npm script`, PM2, Docker 설정 등 인프라 구동부 파일 수정 금지.
* 기존 `Startup Config Guard`, `Queue Processor`, API Route, Factory 클래스 일절 수정 금지.
* 마이그레이션 변경, `schema.prisma` 조작, `PrismaClient` 로드 및 DB 실제 Write 금지.
* 운영 환경 리소스 접근 및 파괴 행위(`FLUSHDB`) 일절 차단.
* 라이브 시스템(`Naver API`), `EXECUTING` 상태 강제 진입 등의 비즈니스 상태 조작 차단.
* 위 항목과 연관된 일체의 실험 혹은 스크립트 실제 구동 보류 (본 설계 문서에서는 미실행).

## 16. 다음 단계 제안
1. 본 `Enabled Mode Safe Startup Verification Design` 설계 문서 커밋 및 승인 처리.
2. 설계된 내용에 기반하여 안전하게 통제된 `Enabled Mode 실제 실행 검증 (Safe Startup)` 1회 수행.
3. 실행 결과 기록 문서화 및 잔여 작업(PM2 데몬화 등) 검토.
