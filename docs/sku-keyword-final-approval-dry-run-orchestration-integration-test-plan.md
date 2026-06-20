# FinalApproval Dry-Run Orchestration Integration Test Plan

이 문서는 Docker PostgreSQL 테스트 환경에서 `FinalApproval` 실행 dry-run 오케스트레이션(`runFinalApprovalExecutionDryRun`) 흐름을 통합적으로 검증하기 위한 설계 계획을 설명합니다.

---

## 1. 문서 목적
- **목적**: Docker PostgreSQL 테스트 DB 환경을 활용하여 `FinalApproval` artifact를 `FinalApprovalExecutionPlan`으로 변환하고 `DRY_RUN` 어댑터를 실행하는 전체 오케스트레이션 흐름을 통합적으로 검증합니다.
- **안전 제한**: 
  - 실제 운영 DB 또는 운영 환경의 NAS DB를 절대 사용하지 않습니다.
  - 네이버 쇼핑 파트너 API 등 실제 외부 네트워크 API를 호출하지 않습니다.
  - 백그라운드 Worker, 실행 API 라우트, UI 실행 버튼 등이 구현되기 전에 비즈니스 논리의 올바름을 데이터베이스 수준에서 최종 검증하는 단계입니다.
  - DB에 저장된 실제 `FinalApproval` / `Job` / `Item` 데이터를 plain input으로 안전하게 로드하고, 순수 오케스트레이션 함수를 호출하여 로직을 검증합니다.

---

## 2. 테스트 범위

### 포함 범위
- **Docker PostgreSQL 테스트 DB 기동 및 준비**: 테스트 전용 로컬 데이터베이스를 기동합니다.
- **Prisma 스키마 마이그레이션 적용**: 테스트 DB에 `prisma migrate deploy`를 통해 스키마를 적용합니다.
- **UUID 기반 Seed 데이터 준비**: 테스트 시나리오별 `Job`, `JobItem` 등의 Mock 릴레이션 데이터를 생성합니다.
- **FinalApproval Artifact 생성**: 테스트용 최종 승인 아티팩트를 생성 및 저장합니다.
- **DB 로딩 및 변환 검증**: DB에서 `Job`, `FinalApproval`, `JobItem`, `FinalApprovalItem`을 조회하고 plain object 형태의 입력으로 투영(projection)한 뒤, `runFinalApprovalExecutionDryRun` 함수에 주입합니다.
- **오케스트레이션 결과 검증**:
  - `ok: true` 정상 완료 여부 확인
  - `dryRunResult` 내 `successCount` 및 `failureCount`가 의도한 검증 결과와 일치하는지 확인
  - 실제 외부 네이버 API 호출이 없었음을 보장

### 제외 범위
- 운영 DB/NAS 환경에서의 테스트
- 실제 네이버 API 및 토큰/자격 증명을 이용한 네트워크 호출
- `LIVE` 실행 어댑터 동작
- 백그라운드 Worker 및 스케줄러 오케스트레이션 구현 검증
- 백그라운드 실행 API 라우트 노출
- 프론트엔드 UI 실행 버튼 연동 및 상태 변경 바인딩
- 테스트 대상 리소스의 상태(`EXECUTING` 등) 영구 전이 처리
- 실제 Job/Item 상태 변경의 DB 반영(Write) 검증 (테스트를 위한 Fixture 주입 외에는 DB 쓰기 동작 없음)

---

## 3. 안전 원칙
- **DATABASE_URL 보호**: `DATABASE_URL` 환경 변수는 반드시 로컬 Docker 인스턴스인 `localhost:55432` 세션을 가리켜야 합니다.
- **환경 변수 파일 수정 금지**: `.env` 파일은 직접 수정하지 않으며, 테스트 스크립트 실행 과정에서 터미널 레벨의 임시 환경 변수로만 `DATABASE_URL`을 설정합니다.
- **보안 정보 노출 금지**: 오류 메시지, 로그, 파일 내용 등에 `DATABASE_URL` 원문 및 패스워드를 절대 출력하거나 노출하지 않습니다.
- **운영 DB/NAS 접속 차단**: 어떠한 경우에도 외부 NAS DB 또는 실제 운영 데이터베이스 세션에 접근하지 않습니다.
- **위험한 Prisma 명령어 사용 금지**: `prisma db push`, `prisma migrate dev`, `prisma migrate reset` 등 스키마 파괴 위험이 있는 명령은 금지하며, `prisma migrate deploy` 명령만을 제한적으로 허용합니다.
- **네트워크 차단**: 네이버 API 통신은 절대 수행하지 않으며 모킹조차 사용하지 않는 완전한 고립 테스트를 보장합니다.
- **비즈니스 상태 보존**: 비동기 Worker 호출 및 `EXECUTING` 상태 전이는 본 검증 단계에서 제외합니다.

---

## 4. 테스트 환경
통합 테스트 검증을 위해 격리된 로컬 Docker PostgreSQL 컨테이너를 가동합니다.
- **Docker Image**: `postgres:18`
- **Container Name**: `tms-final-approval-test-postgres`
- **Port Mapping**: `localhost:55432` (컨테이너 내부 5432 포트와 매핑)
- **Database Name**: `tms_final_approval_test`
- **User**: `tms_test`
- **Schema**: `public`
> [!WARNING]
> 비밀번호는 로컬 테스트 실행 시 일회성 토큰으로 지정하며, 문서나 코드 내에 실제 패스워드 텍스트를 커밋하지 않습니다. `DATABASE_URL` 전체 세션 주소 또한 원문 형태로 기록하지 않습니다.

---

## 5. 선행 조건
통합 테스트를 실행하기 전 아래의 조건들이 모두 통과되어야 합니다.
1. Git 상태가 clean 해야 합니다.
2. `npx prisma validate` 결과 스키마가 valid 해야 합니다.
3. `npx prisma generate` 결과 Prisma Client가 정상 생성되어 있어야 합니다.
4. TypeScript 컴파일(`npx tsc --noEmit`)에 에러가 없어야 합니다.
5. 로컬 Docker 데몬이 정상 작동 중이어야 합니다.
6. 이미 실행 중인 `tms-final-approval-test-postgres` 테스트 컨테이너가 존재하는 경우, 해당 컨테이너만 명확히 중지 및 삭제(clean)한 뒤 재생성해야 합니다.

---

## 6. 데이터 준비 전략

| 비교 항목 | 전략 A: 기존 Seed 스크립트 재사용 | 전략 B: Integration Test 내부 Fixture 직접 생성 (추천) |
| :--- | :--- | :--- |
| **방법** | `scripts/seed-final-approval-ui-post-test.ts`를 실행하여 기초 데이터를 주입한 뒤, API 호출 또는 서비스를 통해 Artifact 저장 유도 | 통합 테스트 코드 내부에서 Prisma Client를 사용하여 각 테스트 케이스에 맞는 `Job`, `JobItem`, `FinalApproval` 관계 레코드를 직접 트랜잭션 단위로 생성 및 롤백 |
| **장점** | 기존 스크립트 및 UI 시나리오와 동일한 형태의 완성도 높은 데이터를 검증할 수 있음 | 독립적인 테스트 실행이 가능하며, 다양한 실패 시나리오(만료, 해시 불일치 등)를 위한 데이터를 동적으로 구성하기 용이함 |
| **단점** | 실패 시나리오 케이스별로 미세한 필드 변경 데이터셋을 여러 개 주입하기 번거로움 | 테스트 코드 내에 데이터 셋업 로직을 직접 구현해야 하므로 작성 분량이 늘어남 |

### **추천 방식**: 전략 B 기반의 Fixture 및 Service 직접 호출 방식
기존 `FinalApproval` 통합 테스트([sku-keyword-final-approval.integration.test.ts](file:///C:/Users/Z390TAICHI/Documents/erp/naver-sku-manager/src/services/sku-keyword-final-approval.integration.test.ts))의 패턴을 계승합니다. API route를 직접 호출하는 방식 대신, DB 상에 직접 다양한 상황(만료, 비정상 상태 등)의 `Job` / `Item` / `FinalApproval` fixture 데이터를 Prisma로 쓰고 이를 로드하여 서비스를 실행하는 전략을 사용합니다.
> [!IMPORTANT]
> DB 쓰기(Write) 작업은 오직 로컬 Docker 테스트 DB 환경에서 준비용 Fixture 생성 과정에만 제한적으로 허용됩니다. 실제 외부 API나 배포 단계의 DB에는 반영하지 않습니다. 본 설계 단계에서는 실제 데이터베이스 실행 및 시딩 작업을 수행하지 않습니다.

---

## 7. Integration Test 파일 후보
향후 구현될 통합 테스트의 경로는 다음과 같이 지정합니다.
- **경로**: [sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts](file:///C:/Users/Z390TAICHI/Documents/erp/naver-sku-manager/src/services/sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts)

### 테스트 실행 가드 (Safety Guard)
비정상적인 운영 DB 접근 및 사고를 미연에 방지하기 위해 파일 상단에 강한 실행 가드를 포함합니다.
```typescript
if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.includes('localhost:55432')) {
  throw new Error("CRITICAL SAFETY ERROR: Refusing to run integration test outside the local Docker PostgreSQL database (localhost:55432).");
}
if (process.env.NODE_ENV === 'production') {
  throw new Error("CRITICAL SAFETY ERROR: Refusing to run integration test in production environment.");
}
const productionHosts = ['nas', 'rds', 'prod', 'internal-db'];
if (productionHosts.some(host => process.env.DATABASE_URL?.includes(host))) {
  throw new Error("CRITICAL SAFETY ERROR: Detected production database host string in DATABASE_URL. Execution aborted.");
}
```

---

## 8. 테스트 시나리오

### 필수 성공 시나리오
1. **정상 실행 시나리오**:
   - DB에 `status = 'APPROVED'`인 Job, `status = 'READY'`이고 필수 식별자(`productId`, `storeId`)가 올바르게 주입된 `JobItem`, 그리고 해당 Job을 가리키는 `status = 'ACTIVE'`인 `FinalApproval`이 주입된 상황.
   - DB에서 로드된 관계 객체들을 plain input으로 프로젝션하여 `runFinalApprovalExecutionDryRun` 함수에 주입.
   - `ok: true` 결과 반환 확인.
   - 반환된 `plan.itemCount` 및 `dryRunResult.itemCount`가 1인지 확인.
   - `dryRunResult.successCount = 1`, `dryRunResult.failureCount = 0` 검증.
   - `generatedAt`, `startedAt`, `finishedAt`이 주입된 `input.now` 시간 문자열과 정확히 일치하는지 확인.

### 필수 실패 시나리오
1. **FinalApproval 만료 검증**: `validationExpiresAt` 시간을 주입한 `now` 시간보다 과거로 설정 시 `ok: false` 및 `FINAL_APPROVAL_EXPIRED` 발생 여부 검증.
2. **Job 상태 미승인 검증**: `job.status`가 `APPROVED`가 아닌 다른 값(예: `PENDING`)일 때 `ok: false` 및 `JOB_STATUS_NOT_APPROVED` 발생 여부 검증.
3. **Item 상태 준비 안됨 검증**: `jobItem.status`가 `READY`가 아닐 때 `ok: false` 및 `ITEM_STATUS_NOT_READY` 발생 여부 검증.
4. **payloadHash 불일치 검증**: input의 `payloadHashForComparison` 값이 `finalApproval.payloadHash`와 다를 때 `ok: false` 및 `PAYLOAD_HASH_MISMATCH` 발생 여부 검증.
5. **validationSnapshotHash 불일치 검증**: input의 `validationSnapshotHashForComparison` 값이 `finalApproval.validationSnapshotHash`와 다를 때 `ok: false` 및 `VALIDATION_SNAPSHOT_HASH_MISMATCH` 발생 여부 검증.
6. **식별자 누락 검증**: `productId` 또는 `storeId` 중 하나라도 누락되었을 때 `ok: false` 및 `REQUIRED_IDENTIFIER_MISSING` 아이템 실패 수집 검증.
7. **ACTIVE 최종승인 없음 검증**: `finalApproval.status`가 `ACTIVE`가 아닐 때 `ok: false` 및 `FINAL_APPROVAL_NOT_ACTIVE` 발생 여부 검증.

---

## 9. Plain Input 변환 규칙
데이터베이스에서 조회한 Prisma row를 순수 함수에 전달하기 전, 다음과 같은 안전 투영 규칙을 적용합니다.
- **독립 투영 (Projection)**: Prisma 모델 타입 및 인스턴스를 순수 함수에 그대로 노출하지 않고 필요한 프리미티브 프로퍼티만 객체로 복사하여 전달합니다.
- **날짜 값 전처리**: `Date` 타입 또는 ISO 문자열을 명시적으로 정리하여 전달함으로써 순수 함수 내부에서의 비교 연산 정합성을 보장합니다.
- **Payload 스키마 보존**: `requestPayload` 필드는 `unknown` 형태로 유지하되, 내부에 `candidate` 및 `dryRunItem` 구조가 훼손되지 않도록 필요한 식별자들만 명확히 주입해 줍니다.
- **보안 정보 배제**: DB 테이블 또는 필드에 노출될 수 있는 토큰, 세션 키, 패스워드 등 민감 정보는 plain input 객체 생성 시 완전히 배제하여 안전을 확보합니다.

---

## 10. 예상 검증 명령
향후 구현될 통합 테스트 수행 시에 실행할 것으로 예상되는 터미널 명령 예시입니다. (이번 설계 단계에서는 아래 명령을 직접 실행하지 않습니다.)

```powershell
# 1. 기존 테스트 컨테이너 안전 제거
docker rm -f tms-final-approval-test-postgres

# 2. 격리된 로컬 테스트 전용 데이터베이스 기동
docker run --name tms-final-approval-test-postgres `
  -e POSTGRES_USER=tms_test `
  -e POSTGRES_PASSWORD="tms_test_password_secure_123" `
  -e POSTGRES_DB=tms_final_approval_test `
  -p 55432:5432 `
  -d postgres:18

# 3. 테스트 전용 임시 환경 변수 구성
$env:DATABASE_URL = "postgresql://tms_test:tms_test_password_secure_123@localhost:55432/tms_final_approval_test?schema=public"

# 4. 안전 실행 장치 확인
if ($env:DATABASE_URL -notlike "*localhost:55432*") {
  throw "SAFETY EXCEPTION: DATABASE_URL must only target localhost:55432 for this integration test."
}

# 5. 스키마 마이그레이션 반영
npx.cmd prisma migrate deploy

# 6. 통합 테스트 수행
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts

# 7. 테스트 컨테이너 삭제 및 환경 복구
docker rm -f tms-final-approval-test-postgres
```

---

## 11. 성공 기준
통합 테스트가 완료되고 다음 기준이 모두 충족되어야 전체 구현 검증이 성공한 것으로 봅니다.
1. 모든 통합 테스트 시나리오는 격리된 Docker 로컬 테스트 DB 환경에서만 안전하게 실행 및 완료됩니다.
2. 운영 데이터베이스에 접속하는 경우가 단 한 차례도 없어야 합니다.
3. 네이버 쇼핑 파트너 API 등 실제 외부 네트워크 API 호출이 완전히 없어야 합니다.
4. 데이터베이스 쓰기(Write) 작업은 오직 테스트 셋업을 위한 Fixture 준비 단계에만 허용됩니다.
5. 오케스트레이션 결과 검증에서 정상 케이스는 `ok: true`로 통과하며, 오작동이나 만료 상황에 대한 실패 케이스는 정의된 오류 코드와 함께 `ok: false`로 차단되어야 합니다.
6. 작업 완료 후 `git status` 결과 테스트 코드 관련 파일 외에는 변경이 없어야 합니다.

---

## 12. 다음 구현 순서
1. `FinalApproval dry-run orchestration Docker integration test` 설계 문서 확정 (완료)
2. 통합 테스트 데이터(Fixture) 구축 전략 구체화 및 검토
3. [sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts](file:///C:/Users/Z390TAICHI/Documents/erp/naver-sku-manager/src/services/sku-keyword-final-approval-execution-dry-run-orchestration.integration.test.ts) 통합 테스트 파일 작성
4. 로컬 Docker 환경에서 통합 테스트 실행 및 검증 수행
5. `DRY_RUN` Worker 아키텍처 및 상태 변경 처리 설계 문서 작성
6. `DRY_RUN` Worker 비즈니스 로직 및 핸들러 구현
7. 대시보드 UI 실행 버튼 영역은 disabled/read-only 상태로 연동 확인
8. `LIVE` 실행을 위한 Live 어댑터 및 동기화 구현은 별도 승인 절차를 거쳐 마지막 단계로 처리
