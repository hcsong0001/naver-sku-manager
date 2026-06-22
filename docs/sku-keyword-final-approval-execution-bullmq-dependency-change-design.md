# FinalApproval Execution BullMQ Dependency Change Design

## 1. 작업 목적
실제 비동기 큐 프로세싱 구현을 위해 BullMQ 및 Redis 클라이언트 의존성을 도입하기 전, `package.json` 변경 범위와 안전 절차, 보안 정책, 롤백 전략을 사전 설계하고 문서화합니다. 이를 통해 의존성 추가로 인한 기존 시스템의 부작용을 원천 차단합니다.

## 2. 현재 완료된 순수 서비스 상태 요약
현재 외부 인프라 및 DB 연동 없이, 의존성이 철저히 격리된 아래 순수 서비스들의 구현 및 테스트가 완료되었습니다.
- **Worker Job Payload Validation 순수 서비스**
- **Worker Job DB Revalidation 순수 서비스** (Repository Port + Fake Repository 기반)
- **Worker Job Orchestration 순수 서비스** (Validation 로직 2개 연결)

## 3. 왜 dependency 변경이 필요한지
FinalApproval 로직은 무거운 비동기 작업(EXECUTION API)이므로 API 응답성을 높이고 타임아웃을 방지해야 합니다. 따라서 비동기 작업을 백그라운드 Worker로 위임하고 스케줄링, 실패 시 재시도 등의 기능을 안정적으로 수행하기 위해 외부 큐 관리 라이브러리와 Redis 연결 라이브러리가 필요합니다.

## 4. 도입 후보 패키지
- `bullmq`
- `ioredis`
*(참고: 본 문서 작성 시점에서는 설치하지 않습니다.)*

## 5. BullMQ 도입 범위
- **제한적 사용**: BullMQ 관련 코드는 오직 `BullMQ Adapter` 전용 파일에만 격리하여 구현합니다.
- **API와 분리**: API route에서는 BullMQ를 직접 import하지 않으며, Queue Port 인터페이스를 통해서만 enqueue를 수행합니다.
- **Worker Process 한정**: 백그라운드 Worker process에서만 BullMQ Worker 객체를 인스턴스화하고 관리합니다.

## 6. Redis client 도입 범위
- `ioredis`는 BullMQ의 커넥션 관리용으로만 사용되며, 다른 비즈니스 로직(예: 캐싱)과 섞이지 않도록 BullMQ Adapter 내부에서만 독립적으로 주입하고 관리합니다.

## 7. package.json 변경 예상 항목
- `dependencies` 또는 `devDependencies` (운영 환경 적용 기준에 따라) 영역에 `bullmq`와 `ioredis` 패키지가 추가됩니다. 그 외 기존 스크립트나 의존성은 절대 건드리지 않습니다.

## 8. package-lock.json 변경 예상 항목
- `bullmq`와 `ioredis` 및 해당 패키지들이 요구하는 하위 트랜지티브 의존성들만 추가 및 락킹되며, 기존에 락킹된 패키지의 버전 변경은 허용하지 않습니다.

## 9. 설치 전 검토 체크리스트
설치 전 아래 항목을 반드시 확인해야 합니다.
1. 현재 git status clean 확인
2. 최신 main pull 확인
3. Prisma validate 통과
4. tsc 통과
5. 기존 Worker Job Orchestration test 통과
6. package 변경 전 commit 완료
7. **npm install 명령은 별도 승인 후 실행**

## 10. 설치 후 검증 명령
- `npm install bullmq ioredis`
- `npm ls bullmq`
- `npm ls ioredis`
- `npx.cmd tsc --noEmit`
- `npx.cmd eslint`
- `npx.cmd tsx --test 관련 순수 서비스 테스트`
- `git diff -- package.json package-lock.json`
- `git status --short`

## 11. dependency 변경 시 금지 범위
- 기능 및 기존 코드(`route.ts`, `test` 등) 수정 금지
- Prisma Adapter 구현 및 실제 DB read/write/upsert/delete 금지
- 운영 DB 접근 금지
- Naver API 및 LIVE adapter 호출 금지
- `EXECUTING` 상태 전환 및 Job/Item 상태 변경 금지
- Worker 코드 생성, Queue processor 생성, `Queue.add` 구현 금지

## 12. rollback 전략
- `npm install` 후 `package.json` 및 `package-lock.json` 변경으로 인해 `tsc` 에러 혹은 테스트 실패가 발생할 경우, 즉각 `git checkout package.json package-lock.json` 명령으로 상태를 롤백하고 설치를 취소합니다. 

## 13. 보안 정책
- `BullMQ Adapter`는 별도 파일로 격리한다.
- `API route`는 BullMQ를 직접 import하지 않는다.
- Worker process만 `BullMQ Worker`를 사용한다.
- Queue enqueue adapter는 `Queue Port interface` 뒤에 숨긴다.
- Redis URL은 환경변수로만 받는다.
- `REDIS_URL` 원문 출력 절대 금지.
- `DATABASE_URL` 원문 출력 절대 금지.
- secret/token/password 등 민감 정보 출력 절대 금지.
- 운영 Redis와 테스트 Redis를 명확히 분리한다.
- 운영 DB와 테스트 DB를 명확히 분리한다.

### 예상 환경변수 목록
- `REDIS_URL`
- `FINAL_APPROVAL_EXECUTION_QUEUE_NAME`
- `FINAL_APPROVAL_EXECUTION_WORKER_ENABLED`
- `FINAL_APPROVAL_EXECUTION_QUEUE_MODE`
- `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`

## 14. 다음 구현 순서
1. 의존성 패키지 설치 승인 요청 및 `npm install bullmq ioredis` 실행
2. Redis Docker test environment 설계 및 구축 (운영 분리 검증용)
3. 실제 BullMQ Adapter 구현 (Queue Port 구현체 작성)
4. Worker process 및 Queue Job 소비 로직(Consumer) 구현
5. Prisma Adapter 기반 실제 DB Revalidation 연동
