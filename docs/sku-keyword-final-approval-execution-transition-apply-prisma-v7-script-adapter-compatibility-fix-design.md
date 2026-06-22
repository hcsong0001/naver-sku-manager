# FinalApproval Execution Transition Apply Prisma v7 Script Adapter Compatibility Fix Design

## 1. 작업 목적
테스트 DB 상태 복구 과정에서 발생한 `PrismaClientInitializationError`를 안전하고 확실하게 해결하기 위한 방안을 설계합니다. Prisma v7 런타임의 초기화 엄격성에 대응하여 패키지 변경 최소화 원칙, 보안 유지 원칙, 올바른 어댑터 연동 방식을 문서화하고 향후 작업의 가이드라인으로 삼습니다.

## 2. 실패 발생 배경
PowerShell 세션에서 안전하게 `DATABASE_URL`을 주입받아 복구 스크립트를 실행했으나, 스크립트 초반의 `new PrismaClient()` 단독 호출 시 `PrismaClientInitializationError` 예외가 발생하여 실행이 중단되었습니다.

## 3. 실패한 스크립트 경로
`scripts/restore-final-approval-transition-apply-test-db-fixture.ts`

## 4. 관련 가능성이 있는 다른 스크립트 경로
`scripts/verify-final-approval-transition-apply-real-prisma-adapter-test-db-write.ts`
(동일한 형태의 `new PrismaClient()` 구문을 사용하고 있으므로 예방적 수정이 필요할 수 있습니다.)

## 5. 오류 메시지 원문
`PrismaClientInitializationError: PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`

## 6. Prisma v7 Client 초기화 방식 변경 가능성
Prisma v7.8.0 환경이나 프로젝트 내부의 Custom Generated Client 설정(예: Edge 호환성, Adapter 사용 등)에 따라, 환경 변수를 자동으로 읽어드리지 못하고 명시적인 옵션 객체 `{}` 또는 DB Driver Adapter 설정을 필수 인자로 요구하도록 동작이 변경되었을 가능성이 큽니다.

## 7. 기존 스크립트의 PrismaClient 초기화 방식 문제
기존 로직은 `import { PrismaClient } from '../app/generated/prisma'` 후 매개변수 없이 `new PrismaClient()`만 호출했습니다. 이로 인해 필수 인자 객체가 없는 것(`!n`)으로 간주되어 강제 에러가 Throw 되었습니다.

## 8. `new PrismaClient()` 단독 호출 문제
매개변수가 생략된 단독 호출은 Prisma 생성자 내부에서 예외를 발생시키므로, 빈 객체라도 전달하거나 명시적인 드라이버 어댑터를 주입(`new PrismaClient({ adapter: ... })`)해야만 회피가 가능합니다.

## 9. driver adapter 기반 초기화 필요성
최근 Prisma 버전에서 Serverless/Edge 호환을 목적으로 pg 드라이버 등을 Prisma의 Adapter로 감싸 주입하는 방식이 장려되거나 필수적으로 요구되고 있을 수 있습니다.

## 10. `@prisma/adapter-pg` 필요 여부 검토 기준
프로젝트가 이미 Driver Adapter 호환으로 구성되어 있다면 해당 모듈을 사용해야 할 수 있으나, 단일 스크립트에서는 옵션 객체에 `{ datasourceUrl: process.env.DATABASE_URL }` 혹은 빈 객체 `{}`를 주입하는 것만으로 우회가 가능한지 우선적으로 테스트해 볼 필요가 있습니다.

## 11. `pg` dependency 필요 여부 검토 기준
`pg` 패키지는 기본적으로 Prisma와 별도로 네이티브 DB 통신을 구성할 때 필요합니다. 하지만 Prisma CLI/Client가 제공하는 기본 통신 레이어가 동작한다면 추가 설치는 지양해야 합니다. 이미 `package.json`에 포함되어 있는지 우선 조사합니다.

## 12. package.json / package-lock.json 변경이 필요한 경우의 별도 승인 기준
어떠한 경우에도 외부 패키지(`pg`나 `@prisma/adapter-pg` 등)를 새로 `npm install`해야 한다면, 이 문서 기반의 설계 작업이 끝난 후 사용자의 명시적인 사전 승인 단계를 거쳐야만 합니다.

## 13. package 추가 없이 이미 설치된 dependency로 해결 가능한지 확인 기준
우선 스크립트 상에서 `new PrismaClient({})` 또는 `{ datasourceUrl: dbUrl }`의 형태로 초기화 옵션만을 부여하는 방식을 적용하여 패키지 설치 없이 우회 가능한지 가장 먼저 점검해야 합니다.

## 14. 수정 대상 후보 파일
- `scripts/restore-final-approval-transition-apply-test-db-fixture.ts`
- `scripts/verify-final-approval-transition-apply-real-prisma-adapter-test-db-write.ts`
- `scripts/lib/create-safe-prisma-client-for-test-db.ts` (중복 로직 방지용 공통 모듈)

## 15. 수정 금지 파일 목록
- `package.json` 및 `package-lock.json` (사전 승인 전 절대 금지)
- `prisma/schema.prisma`
- 기존 백엔드 서비스/엔트리포인트 파일들 및 API 라우트
- 기존 워커 관련 코드 

## 16. verify script와 restore script의 공통 초기화 로직 분리 가능성
동일한 Prisma 생성 오류와 안전망(Database url 파싱, 55432 포트 검사 등)을 두 스크립트가 각각 지니고 있으므로, 이를 공통화된 헬퍼 함수로 분리하여 유지보수성을 극대화하는 방안을 고려합니다.

## 17. 공통 helper 파일 추가 후보
`scripts/lib/create-safe-prisma-client-for-test-db.ts`
이 파일에 `CONFIRM_TEST_DB_...` 검증과 `DATABASE_URL` 파싱, 올바른 형태의 `new PrismaClient({...})` 반환 로직을 통합 캡슐화합니다.

## 18. DATABASE_URL 원문 출력 금지 기준
공통 모듈로 분리하더라도 `DATABASE_URL`의 전체 문자열이나 호스트/비밀번호가 터미널이나 에러 로그에 노출되지 않아야 하는 원칙은 유지됩니다.

## 19. .env / .env.test 열람 금지 기준
공통 헬퍼에서도 파일 시스템을 통하거나 `dotenv`를 이용해 기존 환경 변수 파일을 읽어들이는 행위는 철저히 배제합니다. 오직 주입된 프로세스 환경변수만 취급합니다.

## 20. docker exec env 사용 금지 기준
스크립트 수정/테스트 과정 중 도커 컨테이너 내부 환경 변수에 강제로 접근하여 비밀번호를 탈취하는 방식(`docker exec env`)은 지속 금지됩니다.

## 21. 테스트 비밀번호 평문 명령 입력 금지 기준
PowerShell에서 스크립트 테스트 구동을 지시할 때, 명령어 스크립트에 테스트 데이터베이스 비밀번호를 평문 하드코딩하여 입력하는 행위를 철저히 차단합니다.

## 22. `Read-Host -AsSecureString` 사용 기준
(또는 `ConvertTo-SecureString -AsPlainText -Force` 등을 이용하더라도) PowerShell 터미널 로그 내역에 암호가 평문으로 남지 않는 안전한 주입 방식을 고수합니다.

## 23. 운영 DB 차단 기준
스크립트 공통화 시에도, 연결 대상이 운영 데이터베이스로 추정(로컬호스트 아님, 지정 포트 아님 등)될 경우 단호하게 `process.exit(1)`로 차단해야 합니다.

## 24. 테스트 DB host/port/dbname 검사 기준
`localhost`(혹은 `127.0.0.1`), 포트 `55432`, `test` 문자가 포함된 DB 이름(`pathname`) 3가지 조건의 합치 여부 검사를 그대로 이식/보존합니다.

## 25. restore script 재실행 전 사전 상태 기준
현재 실패 직후 상태이므로 타겟 Fixture는 `EXECUTING` 상태를 띄고 있어야 하며, 이를 복구 대상의 Pre-condition으로 삼습니다.

## 26. verify script 재실행 전 사전 상태 기준
만약 verify 스크립트를 재구동하게 된다면 타겟 픽스처는 반드시 `APPROVED`/`READY` 상태에 있어야 합니다 (현 시점에서는 restore가 먼저 이행되어야 합니다).

## 27. 현재 fixture 상태
- `BatchJob`: `EXECUTING`
- `BatchJobItem`: `EXECUTING`
- `FinalApproval`: `ACTIVE`

## 28. restore 성공 후 기대 상태
- `BatchJob`: `APPROVED`
- `BatchJobItem`: `READY`
- `FinalApproval`: `ACTIVE` (변경 없음)

## 29. 수정 후 검증 명령 후보
수정된 코드 문법 및 타입 안정성 검증을 위해 오직 다음 명령들만 수행합니다:
- `npx prisma validate`
- `npx prisma generate`
- `npx tsc --noEmit`
- `git diff --check`
- `git status --short`

## 30. 수정 후 복구 재실행 승인 기준
수정과 정적 검증이 모두 에러 없이 통과되고 이 문서가 확인된 이후, 사용자가 명시적으로 복구 재실행 승인과 함께 새로운 안전 명령어 스크립트를 제공할 때만 실제 DB 재접속/실행을 이행합니다.

## 31. 성공 기준
`PrismaClient` 인스턴스화가 에러 없이 성공하고, 사후 상태 확인을 거쳐 Fixture가 올바르게 복원된 뒤 정상 종료 코드(0)로 프로세스가 끝나는 경우 성공으로 판정합니다.

## 32. 실패 기준
여전히 초기화 오류(`PrismaClientInitializationError`)를 뱉거나, 패키지 의존성 문제로 런타임 오류가 발생, 또는 사전 상태 불일치(Pre-condition fail) 에러가 떨어지는 경우 실패로 간주합니다.

## 33. 다음 단계 제안
1. 본 설계 문서 승인 후, 기존에 설치된 패키지 환경 내에서 의존성 추가 없이 `new PrismaClient({})` 혹은 `{ datasourceUrl: dbUrl }` 방식으로 코드만 갱신하여 1차 수정을 시도.
2. 검증 통과 시 테스트 DB 재실행(복구 트랜잭션 구동) 절차 착수.
3. 문제 지속 시 `pg` 및 `adapter-pg` 도입 승인 요청 등 2단계 대책 논의.
