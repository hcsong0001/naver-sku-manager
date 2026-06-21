# FinalApproval Execution DB Read Guard Prisma Adapter Design

## 1. 작업 목적
본 문서는 FinalApproval Execution API에서 사용할 순수 검증 서비스(`runFinalApprovalExecutionDbReadGuard`)에 주입(Inject)될 **실제 Prisma 기반 Read Adapter**의 설계 원칙과 한계, 그리고 통합 검증 계획을 정의하기 위해 작성되었습니다.

## 2. 현재 DB Read Guard 순수 계층 상태
- 데이터베이스 접근 로직과 비즈니스 로직(검증 로직)이 완벽하게 분리되어 있습니다.
- `FinalApprovalExecutionDbReadGuardRepository` 인터페이스와 이에 의존하는 순수 검증 함수(`runFinalApprovalExecutionDbReadGuard`)가 구현되어 있습니다.
- Fake Repository를 활용하여 모든 오프라인 예외 시나리오(만료, 해시 불일치, 상태 이상 등)에 대한 100% 검증(테스트 8개)이 통과된 상태입니다.

## 3. Prisma Adapter가 필요한 이유
- 순수 계층은 오프라인 검증만 가능하므로, 실제 운영 환경에서 DB의 최신 데이터 상태를 가져와 순수 서비스로 전달할 "어댑터(Adapter)"가 필수적입니다.
- 단, 데이터 조회(Read)에만 특화된 역할을 부여하여 API Route 내부가 아닌 격리된 환경에서 Prisma 종속성을 관리하기 위함입니다.

## 4. Prisma client import 허용 위치
- `@prisma/client` Import 및 실제 `prisma` 인스턴스 사용은 새로 생성될 **Adapter 파일 내부에서만 엄격하게 허용**됩니다.

## 5. route.ts 직접 Prisma import 금지 원칙
- `app/api/.../route.ts` 파일 내부에서는 `prisma` 객체를 직접 Import 하거나 쿼리를 작성하는 행위가 원천적으로 금지됩니다. (관심사 분리)

## 6. Adapter 파일명 후보
- `src/services/sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service.ts`

## 7. Adapter가 구현할 Repository Interface
- `FinalApprovalExecutionDbReadGuardRepository` 인터페이스를 `implements` (또는 해당 시그니처를 만족)하여 작성합니다.
- 핵심 구현 메서드: `findSnapshotForExecutionGuard(finalApprovalId: string): Promise<FinalApprovalExecutionDbReadGuardSnapshot>`

## 8. FinalApproval 조회 필드
- 대상 테이블: `FinalApprovalExecutionPlan` (또는 모델링 된 FinalApproval 테이블)
- 조회 필드: `id`, `status`, `validationExpiresAt`, `payloadHash`, `validationSnapshotHash`, `jobId`

## 9. Job 조회 필드
- 대상 테이블: `NaverApiBatchJob` (FinalApproval 조회 시 `include` 또는 `join`으로 함께 조회)
- 조회 필드: `id`, `status`

## 10. Item 조회 필드
- 대상 테이블: `NaverApiBatchJobItem`
- 조회 필드: `id`, `status`
- 조건: `jobId`와 매핑된 항목들

## 11. Read-only Query 원칙
- Adapter 내부에서는 오직 `findUnique`, `findFirst`, `findMany` 연산만을 허용합니다.

## 12. DB Write 금지 원칙
- Adapter는 어떠한 경우에도 `create`, `update`, `delete`, `upsert`를 호출해서는 안 됩니다.

## 13. EXECUTING/Status 변경 금지 원칙
- 조회 과정에서 Job이나 Item의 상태(`status`)를 임의로 `EXECUTING`으로 변경(Mutation)하는 행위를 절대 금지합니다.

## 14. Docker Test DB 우선 검증 전략
- Adapter 코드를 작성한 후, 실제 `DATABASE_URL`을 로컬 Docker PostgreSQL(`localhost:55432`) 환경에 맞춘 상태에서만 Integration Test를 실행합니다.

## 15. 운영 DB 접근 금지 조건
- `tms_test`가 아닌 운영계(Production) 데이터베이스로의 접근은 절대적으로 차단됩니다.
- CI나 로컬 테스트 환경에서도 강제된 Connection String 차단 로직이 권장됩니다.

## 16. Integration Test 시나리오 후보
- **Setup:** Prisma `create`를 사용해 테스트용 FinalApproval, Job, Item 레코드 생성 (시드 데이터).
- **Test 1:** 정상 데이터 Insert 후 Adapter 호출 시 올바른 형태의 `Snapshot` 객체를 리턴하는지 검증.
- **Test 2:** 없는 ID 조회 시 `Snapshot.finalApproval === null`을 리턴하여 예외 없이 순수 함수로 책임을 넘기는지 검증.
- **Teardown:** 테스트 종료 후 생성된 테스트 레코드 정리.

## 17. DATABASE_URL / Secret 노출 금지 원칙
- 어댑터 코드나 테스트 파일, 또는 콘솔 로그에 DB 패스워드나 인증 정보가 평문으로 노출되어서는 안 됩니다.

## 18. 실제 구현 전 승인 필요 항목
- "Adapter가 조회할 모델(테이블)이 `FinalApprovalExecutionPlan`, `NaverApiBatchJob`, `NaverApiBatchJobItem`이 맞습니까? 아니면 다른 Prisma 모델명을 사용해야 합니까?"
- "실제 Prisma Adapter 파일(`...-prisma-adapter.service.ts`) 작성과 Docker DB 기반 통합 테스트 진행을 승인하십니까?"

## 19. 다음 작업 추천
승인이 완료되면, `sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service.ts` 파일과 해당 Integration Test 코드를 작성하여 Docker DB 환경에서 읽기 쿼리를 검증하는 단계를 진행합니다.
