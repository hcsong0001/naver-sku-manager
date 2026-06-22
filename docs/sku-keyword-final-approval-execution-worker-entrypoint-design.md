# FinalApproval Execution Worker Entrypoint Design

## 1. 작업 목적
기구현된 `FinalApproval Execution Worker Runtime Shell`을 실제 운영 체제(OS)의 프로세스로 띄우기 위한 진입점(Entrypoint) 스크립트의 구조와 정책을 설계합니다. Runtime Shell을 안전하게 실행하고 제어할 수 있는 프로세스 라이프사이클 관리 정책을 문서화합니다.

## 2. 현재 완료 상태 요약
* `FinalApproval Execution Worker Runtime Shell` 구현 및 단위 검증 완료.
* `createFinalApprovalExecutionWorkerRuntime` 함수로 BullMQ Worker 객체화 구현.
* `Startup Config Guard` 및 `Queue Processor` Pure Service 구현 및 검증 완료.
* 테스트를 제외한 실제 Worker Entrypoint 스크립트 파일, OS 레벨의 실행 명령, 배포 파이프라인 연동 등은 미구현 상태.

## 3. Worker Entrypoint가 필요한 이유
* OS 레벨에서 `process.env`를 주입받고, 이를 애플리케이션의 엔트리 함수(`createFinalApprovalExecutionWorkerRuntime`)에 전달할 최상위 파일이 필요합니다.
* OS의 시그널(`SIGINT`, `SIGTERM`)을 캡처(catch)하여 런타임의 `close()` 함수를 호출함으로써 메모리 릭과 작업 유실을 방지하는 Graceful Shutdown 책임을 질 데몬 형태의 껍데기가 요구됩니다.

## 4. Worker Runtime Shell과 Entrypoint의 경계
* **Entrypoint**: `process.env` 읽기, 운영체제 시그널(`SIGINT`, `SIGTERM`) 리스닝, Safe Logger 준비, Worker Process의 전체 수명 관리 담당.
* **Worker Runtime Shell**: `Startup Config Guard` 호출, BullMQ Worker 인스턴스 생성 및 큐 폴링루프 관리, `Queue Processor` 호출 위임, 그리고 `close` 인터페이스 제공.
* **Queue Processor**: 전달받은 단일 평문 객체(Job)의 비즈니스 타당성 검증 및 로직 처리(`readyForExecution` 판단).
* **API Route (`route.ts`)**: 큐에 Job을 넣는(Enqueue) 역할만 담당.

## 5. 실행 파일 위치 후보 (설계상)
실제 구동 스크립트를 위치시킬 폴더와 파일명 후보입니다:
* `scripts/final-approval-execution-worker.ts`
* `src/workers/final-approval-execution-worker.ts`
> *(주의: 본 설계 단계에서는 실제 파일을 생성하지 않습니다.)*

## 6. 실행 명령 후보 (설계상)
터미널 혹은 PM2 환경 등에서 Worker를 실행하기 위한 명령어 후보입니다:
* `npx tsx scripts/final-approval-execution-worker.ts`
* `npm run worker:final-approval-execution`
* PM2 / NAS 서비스 등록 스크립트 실행
> *(주의: 본 설계 단계에서는 `package.json`이나 `npm script`를 변경하지 않습니다.)*

## 7. 환경변수 로딩 정책
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=true`일 때만 Worker 시작.
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq` (현재 유일한 허용치).
* `FINAL_APPROVAL_EXECUTION_QUEUE_NAME` 미설정 시 기본값 사용.
* `REDIS_URL`, `DATABASE_URL` 필수.
* `production`에서 `localhost` Redis/DB 접속 강제 차단.
* **보안 준수**: `REDIS_URL`, `DATABASE_URL` 원문 및 기타 Password/Token/Secret 정보 로그 출력 절대 금지.

## 8. Startup Config Guard 호출 정책
* Entrypoint는 `process.env`를 모아 `env` 객체를 구성하고, `createFinalApprovalExecutionWorkerRuntime`을 호출합니다.
* 내부적으로 `Startup Config Guard`가 동작하며, 조건을 하나라도 위배할 경우 `canStartWorker: false`를 반환합니다.

## 9. Worker Runtime 생성 정책
1. `process.env` 읽기
2. Safe Logger 준비 (Secret 출력 필터링 래퍼 등)
3. `createFinalApprovalExecutionWorkerRuntime` 호출
4. `started === false` 반환 시, 이유(에러/경고)를 로깅하고 프로세스 안전 종료 (exit 0).
5. `started === true` 반환 시, 백그라운드 Worker 실행 상태 유지 (Event Loop 블로킹 없이 대기).

## 10. Graceful shutdown 연결 정책
* `process.on('SIGINT', ...)` 및 `process.on('SIGTERM', ...)` 핸들러 등록.
* 시그널 수신 시 곧바로 `runtime.close()`를 `await` 호출.
* `close()` 정상 완료 후 `process.exit(0)` 호출을 통해 OS 프롬프트 반환 및 리소스 해제 보장.
* 시그널 수신 후 종료 시점에도 URL 원문 및 Secret 출력을 철저히 금지합니다.

## 11. 로그 / 보안 정책
* 시작 로그 시에는 `queue name`, `adapter`, `enabled 여부` 등 안전한 메타정보만 기록합니다.
* URL 및 Secret 계열 문자열 원문 로그 노출을 100% 차단합니다.
* 에러 로그 발생 시 Redaction(마스킹) 처리된 에러 메시지만 남깁니다.
* 디버깅 목적이더라도 Queue payload의 전체 덤프(Dump)를 금지합니다.
* 운영 DB/Redis와 테스트 DB/Redis 환경을 철저히 분리합니다.

## 12. 로컬 개발 실행 정책
* 개발자는 `localhost:56379` 기반의 Docker 테스트 Redis를 사용할 수 있습니다.
* 데이터베이스 역시 PostgreSQL 테스트 Docker 인스턴스를 사용할 수 있습니다.
* 운영 환경 DB URL 사용은 원천 차단됩니다.
* 실행 스크립트 실행 전 `Startup Config Guard`에 의해 검증되며, 종료(Ctrl+C) 시 PowerShell/터미널 프롬프트가 정상 복귀되어야 합니다.

## 13. 운영 실행 정책
* 운영 환경(`NODE_ENV=production`)에서는 Localhost 기반의 접근 설정을 강제로 Fail-fast 처리합니다.
* 환경변수는 컨테이너(Docker) 또는 시스템 암호화 저장소 등 안전한 방식으로 런타임에 주입됩니다.
* PM2/Docker/NAS 기반의 데몬(Daemon) 구동 및 자동 재시작 정책은 이 단계의 논의 범위를 넘어서며, 별도 설계 후 등록됩니다.
* Naver API 전송 권한, LIVE Mode 어댑터, DB `EXECUTING` 상태 전환 허용 정책 등은 철저히 별도 승인 후 단계적 전개를 따릅니다.

## 14. 테스트 전략
1. `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER=false` 환경에서 Entrypoint가 프로세스 실행을 포기하고 바로 종료되는지 검증.
2. `REDIS_URL` 누락 등 필수 조건 미달 시 안전 종료 검증.
3. 터미널 인터럽트(`SIGINT`) 시그널을 발송했을 때 런타임 `close()`가 올바르게 트리거되는지 검증.
4. OS 종료 시그널(`SIGTERM`) 시그널 수신 시 안전 종료 검증.
5. `close` 수행 시 런타임 에러가 발생해도 예외를 삼키거나 캡처하여 안전하게 Exit 하는지 검증.
6. 로깅 시스템상 URL이나 암호 원문이 포함되지 않는지 검증.
7. 테스트 수행 시 `package.json` 변경 없이 로컬 스크립트만으로 실험 가능한지 검증.
8. Prisma Database Write 및 Naver API 통신이 원천 차단되어 있는지 검증.

## 15. 실제 구현 전 체크리스트
* [ ] Entrypoint Script의 배포 위치와 명명 규칙이 기존 시스템 관례에 부합하는가?
* [ ] OS 시그널 제어(`SIGINT`/`TERM`) 핸들러가 Node.js Event Loop와 엉키지 않고 설계대로 셧다운을 보장할 수 있는가?
* [ ] 로거(Logger) 모듈의 Redaction 정책 적용이 기존 프로젝트 컴포넌트들과 통일되어 있는가?

## 16. 현재 금지 범위
* Entrypoint 코드 파일(`.ts`) 및 디렉토리 실제 생성 금지.
* `package.json`, `package-lock.json`, `npm script`, PM2/Docker 설정 파일 수정 또는 추가 금지.
* 기존 `Startup Config Guard`, `Queue Processor`, `Worker Runtime Shell`, `route.ts`, Factory 모듈 일절 수정 금지.
* `schema.prisma` 및 Migration 파일 추가 금지.
* `PrismaClient` 로드 및 실제 데이터베이스 Read/Write 시도 금지.
* LIVE Naver API 통신 및 `EXECUTING` 상태 전환 금지.
* 원문(Plain Text) 형태의 URL, Secret, DB 비밀번호 로그 출력 금지.
* 임의의 Git Commit 생성( `git add .` 포함 ) 금지.

## 17. 다음 단계 제안
1. 본 `Worker Entrypoint Design` 문서 검토 및 커밋 승인.
2. 검토 완료 후, 설계에 부합하는 최소 단위의 실제 Entrypoint 스크립트 파일 작성 및 수동 테스트.
3. 스크립트 작성 이후, PM2/운영 배포 스크립트 관련 인프라 레벨 설계 논의.
4. 모든 Shell 아키텍처가 안착한 이후, 최종적으로 `EXECUTING` 상태 전환 로직과 Naver API 연동(Adapter) 구현 진입 논의.
