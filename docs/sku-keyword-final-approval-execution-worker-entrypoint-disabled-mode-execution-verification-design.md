# FinalApproval Execution Worker Entrypoint Disabled Mode Execution Verification Design

## 1. 작업 목적
Worker Entrypoint(`scripts/final-approval-execution-worker.ts`)를 실제 가동 환경(Enabled Mode)에서 돌리기 전에, 의도적으로 비활성화된 환경(Disabled Mode)에서 스크립트를 실행했을 때 발생해야 하는 안전 차단 및 종료(Graceful Exit) 시나리오를 설계하고 문서화합니다.

## 2. 현재 완료 상태 요약
* `FinalApproval Execution Worker Entrypoint`(`scripts/final-approval-execution-worker.ts`) 최소 구현 및 검증 문서 작성 완료.
* 환경변수 분리 결합 방식 우회 꼼수 제거 및 정책 기반 마스킹(Redaction) 로거 확립 완료.
* `process.env` 통과 구조, SIGINT/SIGTERM 셧다운 연결 확보.
* 아직 Entrypoint 스크립트를 실제로 실행하지 않았으며 NPM/운영 체제에도 등록되지 않음.

## 3. disabled mode 실행 검증이 필요한 이유
* 의도치 않게 운영 서버 혹은 로컬 데스크탑에서 실수로 스크립트가 기동되었을 때(예: `npm run ...` 오작동), 환경 변수가 누락되거나 의도적으로 `false`로 설정된 경우 런타임이 무단으로 Redis/DB 인프라에 접근해 부하를 주거나 오염시키는 것을 사전에 증명해야 합니다.
* 안전장치인 `Startup Config Guard`가 Entrypoint 단계에서 정상적으로 프로세스의 생명 주기를 차단(Fail-fast)하는지 확인해야 합니다.

## 4. disabled mode의 정의
Disabled Mode는 다음 조건이 충족될 때 프로세스가 활성화되지 않는 가장 폐쇄적인 상태를 의미합니다:
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` 환경변수가 `true`가 아니거나 아예 미설정된 상태.
* 이 상태에서는 `Worker Startup Config Guard`가 `enabled: false`, `canStartWorker: false`를 반환해야 합니다.
* BullMQ Worker 인스턴스 생성이 100% 억제되어야 합니다.
* 어떠한 종류의 `Redis` 폴링 루프나 연결 소켓도 열리면 안 됩니다.
* 어떠한 종류의 데이터베이스 커넥션 풀 초기화도 없어야 합니다.
* `Queue Processor`의 델리게이트 함수가 한 번도 호출되지 않아야 합니다.
* 프로세스는 안전한 경고 메시지만 로거에 남기고 이벤트 루프에 매달리지 않은 채 즉시 종료(Exit)되어야 합니다.

## 5. 실행 전 전제 조건
* 프로젝트 루트의 `git status --short`가 깨끗한 상태(변동 파일 없음)여야 합니다.
* `package.json`, `route.ts` 등 주요 금지 파일들이 절대 수정되지 않은 상태여야 합니다.
* OS 혹은 Docker 기반의 테스트 Redis 인프라가 돌아가더라도, 이 스크립트 실행에 의해 연결 흔적이 남으면 안 됩니다.

## 6. 실행 명령 후보
로컬 검증 시 아래 명령어를 사용합니다:
```bash
npx.cmd tsx scripts\final-approval-execution-worker.ts
```
> *(주의: 본 설계 문서 작업 단계에서는 위 명령을 실행하지 않습니다. 추후 별도의 승인이 떨어진 후 검증 전용으로 사용됩니다.)*

## 7. 환경변수 정책
* `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` = (미설정 혹은 `false`)
* Disabled mode에서는 `REDIS_URL`이나 `DATABASE_URL`이 심지어 비어 있어도 무조건 차단 및 안전 종료되어야 합니다.
* 실행 중 `REDIS_URL`, `DATABASE_URL`, DB 비밀번호, Token, Secret의 원문 로깅은 어떠한 경우에도 금지됩니다.

## 8. 기대 결과 (Success Criteria)
아래 현상이 완벽하게 관찰되어야만 검증을 통과한 것으로 간주합니다:
* 런타임 초기화 함수(`createFinalApprovalExecutionWorkerRuntime`)가 `started: false`를 반환해야 함.
* `BullMQ Worker` 인스턴스 생성 및 큐 리스닝 흔적이 없음.
* `Redis`, `DB` 연결 시도 자체가 없음.
* `Queue Processor` 델리게이트 콜백 미호출.
* `Naver API` 호출 및 `EXECUTING` 상태 전환 없음.
* 스크립트 구동 직후 곧바로 `process`가 정상 종료(Exit 0)됨.
* 사용자 터미널(PowerShell 등)의 프롬프트가 Block/Hang 없이 정상 복귀됨.
* 실행 후 `git status` 변경 파일이나 임시 파일 생성 흔적이 없음.

## 9. 실패로 봐야 하는 결과 (Failure Criteria)
아래 항목 중 단 하나라도 발생 시 해당 Worker 진입점 아키텍처는 즉시 폐기 및 수정 대상이 됩니다:
* Worker가 무시하고 `started: true` 상태로 강제 전환됨.
* 터미널 상에 Redis/DB Connection Error 등 인프라 접근 시도 흔적이 노출됨.
* Queue Processor 내부 로직이 1회라도 호출됨.
* `REDIS_URL` / `DATABASE_URL`의 평문, DB 비밀번호, Secret 데이터가 로그 콘솔에 노출됨.
* 프로세스가 좀비 상태(Event Loop Hang)로 남아 터미널로 복귀하지 않음.
* `route.ts` 혹은 `package.json` 변경이 강제됨.

## 10. 보안 점검 항목
실행 후 터미널 로그를 대상으로 다음 보안 위반이 없었는지 교차 검수해야 합니다:
* [ ] `REDIS_URL` 평문 출력 여부 확인 (없어야 함)
* [ ] `DATABASE_URL` 평문 출력 여부 확인 (없어야 함)
* [ ] DB Password, API Token, Secret Key 출력 여부 확인 (없어야 함)
* [ ] 의도치 않은 Queue Payload 전체 Dump 여부 확인 (없어야 함)
* [ ] 민감한 환경 정보를 포함하는 Error Stack Trace 원문 출력 여부 확인 (없어야 함)
* [ ] 테스트 목적 외의 운영망 리소스(`DB`, `Redis`) 무단 접근 여부 확인 (없어야 함)
* [ ] `Redis FLUSHDB` 명령어 발송 여부 확인 (없어야 함)

## 11. 실행 후 확인할 git 상태
* `git status --short`를 수행하여, 테스트 구동의 부작용으로 `scripts` 외의 임시 캐시 파일, 로그 파일(`.log` 등)이 워크스페이스에 생성되지 않았음을 확인해야 합니다.

## 12. 실제 실행 전 체크리스트
1. [ ] `git status --short`가 깨끗한가?
2. [ ] `package.json`, `package-lock.json`, `route.ts`가 원본을 유지하고 있는가?
3. [ ] `ENABLE_FINAL_APPROVAL_EXECUTION_WORKER` 환경변수가 `true`가 아님이 100% 확실한가?
4. [ ] 실행 명령(`npx.cmd tsx ...`)을 엄격히 통제된 로컬 터미널에서만 단발성으로 칠 준비가 되었는가?
5. [ ] 실행 후 PowerShell 프롬프트의 복귀 및 `git status` 불변성을 확인할 것인가?

## 13. 현재 금지 범위
* 코드 수정 및 `scripts/final-approval-execution-worker.ts` 변경 금지.
* `package.json`, `package-lock.json`, `npm script` 수정, PM2 / Dockerfile 추가 등 런타임 외곽 시스템 수정 금지.
* 기존 `Startup Config Guard`, `Queue Processor`, API Route (`route.ts`), Adapter 모듈 일절 수정 금지.
* `schema.prisma` 변경, 마이그레이션 및 `PrismaClient` 로드 금지.
* 라이브 시스템(`Naver API`), `EXECUTING` 상태 변환 제어, 운영망 데이터베이스 변경 절대 금지.
* 진입점 스크립트 실행(테스트) 행위 일체 보류 (본 설계에서는 실행하지 않음).

## 14. 다음 단계 제안
1. 본 `Disabled Mode Execution Verification Design` 문서 커밋 완료.
2. 이후 명시적인 사용자 승인을 획득한 뒤, 위 절차에 따라 터미널에서 Disabled Mode 검증 실험 1회 실행.
3. 검증 결과 문서화 후 Enabled Mode 설계 및 패키지 환경 연동 확장 논의 진행.
