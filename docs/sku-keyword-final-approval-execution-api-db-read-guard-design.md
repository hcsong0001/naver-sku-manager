# FinalApproval Execution API DB Read Guard Design

## 1. 작업 목적
본 문서는 FinalApproval Execution API 라우터(`route.ts`) 내부 또는 별도의 Read Service에서 수행할 **DB Read Guard**의 설계 사양을 정의합니다. 실제 라이브 트랜잭션과 비동기 작업을 큐(Queue)에 넘기기 직전, 데이터의 무결성과 권한을 안전하게 방어(Guard)하기 위한 읽기 조건을 정립하는 것이 목적입니다.

## 2. 현재 API Skeleton 상태
- `route.ts` 껍데기 파일이 생성되어 있으며, `runFinalApprovalExecutionApiOrchestration`를 통한 Request Payload 파싱과 Feature Flag 통제 기능만 동작합니다.
- 데이터베이스(DB) 연결, 상태 검증(Read), 권한 검증 등은 아직 포함되지 않은 순수 메모리 기반의 얇은 래퍼(Thin Wrapper) 상태입니다.

## 3. DB Read Guard가 필요한 이유
- API 요청(Request Body) 내부의 데이터만으로는 해당 `FinalApprovalId`의 실제 상태(만료 여부, 해시 일치 여부, 승인 상태)를 신뢰할 수 없습니다.
- 클라이언트가 임의로 조작하거나 오래된 시점의 데이터를 기반으로 실행 명령을 보냈을 때(Stale Request), 잘못된 운영 환경 오염을 막기 위해 서버 측에서 한 번 더(Secondary) 확인이 필수적입니다.
- 실행 중(`EXECUTING`)이거나 이미 성공한 작업에 대한 중복 큐잉(Double Enqueue)을 방지해야 합니다.

## 4. 읽기 대상 후보 테이블
DB Read Guard는 다음 테이블들을 조회 대상으로 삼습니다.
- `FinalApproval` (핵심 승인/만료/해시 정보)
- `NaverApiBatchJob` (전체 작업의 스토어 및 실행 상태)
- `NaverApiBatchJobItem` (개별 아이템의 READY 상태 여부 확인)

## 5. 읽기 대상 후보 필드
- `FinalApproval`: `id`, `status`(`ACTIVE`), `validationExpiresAt`, `payloadHash`, `validationSnapshotHash`
- `NaverApiBatchJob`: `id`, `status`(`APPROVAL_PENDING`, `APPROVED` 등), `storeId`
- `NaverApiBatchJobItem`: `id`, `status`(`READY` 등)

## 6. FinalApproval 검증 조건
1. **존재 유무:** 전달된 `finalApprovalId`가 DB에 존재하는지 확인.
2. **ACTIVE 상태:** 현재 활성화된(최신) 승인 내역인지(`status === 'ACTIVE'`) 검증. (`FINAL_APPROVAL_NOT_ACTIVE`)

## 7. Job 검증 조건
1. **승인 대기 상태:** 연결된 Job의 상태가 실행 대기 중이거나 승인 완료 상태인지 확인. 만약 이미 `EXECUTING`, `SUCCESS`, `PARTIAL_SUCCESS`라면 중단. (`JOB_NOT_APPROVED` 또는 `CONFLICT`)

## 8. Item 검증 조건
1. **READY 상태 아이템 존재:** 실행을 요청받은 Item 중 최소 1개 이상이 실행 가능(`READY`) 상태여야 함. (`NO_READY_ITEMS`)

## 9. payloadHash / validationSnapshotHash 검증 조건
1. 클라이언트(또는 Payload)가 전송한 해시와 DB에 저장된 `payloadHash`, `validationSnapshotHash`가 정확히 일치하는지 비교. (`HASH_MISMATCH`)
2. 해시가 불일치한다면 그 사이 누군가가 아이템을 조작했음을 의미하므로 즉각 차단.

## 10. ACTIVE / expiresAt / status 검증 조건
1. `validationExpiresAt`이 현재 시각(`Date.now()`)을 지났는지 확인. (`VALIDATION_EXPIRED`)
2. 만료된 경우 재검증(Validation) 및 재승인을 유도하도록 거절.

## 11. DB Write 금지 원칙
- 이 Guard 계층에서는 `update`, `create`, `delete` 쿼리를 절대 수행하지 않습니다. 오직 `findUnique`, `findFirst`, `findMany` 형태의 Read-only 작업만 수행합니다.

## 12. route.ts 직접 DB 조회 금지 또는 Read Service 분리 원칙
- `app/api/.../route.ts` 파일 내부에서 `prisma.finalApproval.findUnique(...)`를 직접 호출하지 않습니다.
- 별도의 서비스 모듈(예: `src/services/sku-keyword-final-approval-db-read-guard.service.ts`)을 생성하여 책임을 분리하고 단위 테스트가 용이하도록 구성해야 합니다.

## 13. Prisma client import 위치 제한
- `@prisma/client`의 Import는 `src/services/` 내부의 DB Read Service 파일 내에서만 허용됩니다.
- API Route(`route.ts`)나 순수 함수 파일에서는 Import를 엄격히 제한합니다.

## 14. 운영 DB 접근 금지 및 Docker Test DB 우선 검증 원칙
- 실제 운영 DB가 아닌, 오직 Docker 기반 PostgreSQL(`localhost:55432`) 환경의 통합 테스트를 통해 쿼리 신뢰성을 우선 확보합니다. 운영 DB 연결은 철저히 차단합니다.

## 15. Status Code 정책
- **403 Forbidden:** Session/Actor 기반 권한 없음 (`UNAUTHORIZED_ACTOR`), 또는 Feature Flag 차단 시.
- **404 Not Found:** `finalApprovalId`를 찾을 수 없을 때.
- **409 Conflict:** 만료됨(`VALIDATION_EXPIRED`), 해시 불일치(`HASH_MISMATCH`), 이미 실행 중(`JOB_NOT_APPROVED`), 상태 이상(`FINAL_APPROVAL_NOT_ACTIVE`) 등 데이터 정합성 실패 시.
- **500 Internal Server Error:** DB 연결 장애 등 서버 문제.

## 16. 테스트 전략
1. **Unit Test:** Prisma Client를 모킹(Mocking)하여 각 Guard Code(`HASH_MISMATCH`, `VALIDATION_EXPIRED` 등)가 정상적으로 식별되는지 검사.
2. **Integration Test (Docker DB):** 팩토리(Factory)/시드(Seed)를 통해 테스트 DB에 다양한 조건(만료됨, 해시 다름, 성공 상태 등)의 레코드를 삽입한 후, Read Guard 서비스가 정확하게 차단/통과 시키는지 검증. (Write가 발생하지 않음도 단언).

## 17. 실제 구현 전 승인 필요 항목
본 설계 문서를 바탕으로 다음 사항들에 대한 사용자의 최종 승인이 필요합니다.
1. "DB Read Service를 분리하여 Prisma Read 연산을 수행하는 것에 동의하십니까?"
2. "테스트 전략에 따라 Docker Test DB에서 Integration Test를 수행하는 것을 허가하십니까?"

## 18. 다음 작업 추천
승인이 완료되면, `src/services/sku-keyword-final-approval-db-read-guard.service.ts` 파일 생성 및 Docker PostgreSQL 환경에서의 Guard 검증 통합 테스트 작성을 진행하는 것을 추천합니다.
