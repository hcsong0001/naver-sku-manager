# FinalApproval Execution API DB Read Guard Route Integration Design

## 1. 작업 목적
* 본 문서는 기존에 구현된 FinalApproval Execution API Skeleton에 DB Read Guard 로직을 어떻게 안전하게 통합할 것인지에 대한 설계 가이드라인을 제공합니다. 
* 실제 구현 전 검토 목적으로 작성되었으며, 철저히 DB Read(검증) 목적에만 한정하고 Write/Queue/네이버 API 연동은 금지함을 명확히 합니다.

## 2. 현재 API Skeleton 상태
* `app/api/sku-keyword-final-approvals/execute/route.ts` 뼈대가 구축되어 있습니다.
* Feature Flag 검사 및 Execution Command Validation까지는 처리 가능하지만, 데이터베이스와의 상호작용은 없는 Mock 상태입니다.

## 3. 현재 DB Read Guard Prisma Adapter 상태
* `src/services/sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service.ts`에 DB Read Guard를 위한 Prisma Adapter가 구현되어 있습니다.
* 단위 테스트 및 6가지 엣지 케이스에 대한 Docker DB Integration Test까지 통과 완료된 상태입니다.

## 4. route integration이 필요한 이유
* 현재 API는 DB를 조회하지 않고 모든 요청을 수락(Accepted)하거나 파싱 오류만 반환합니다.
* 실제 데이터의 무결성을 보장하고, 실행 불가능한 상태(EXPIRED, INACTIVE, 승인되지 않음 등)의 요청을 큐에 들어가기 전 API 계층에서 빠르게 차단하기 위해 Guard 로직의 연결이 필수적입니다.

## 5. route.ts가 직접 Prisma를 import하지 않는 원칙
* API Route Handler(`route.ts`)는 웹 인프라 계층이므로 데이터베이스 기술 인프라(Prisma)와 직접 결합되어서는 안 됩니다.
* **규칙**: `route.ts`에서는 `createFinalApprovalExecutionDbReadGuardPrismaAdapter` 같은 Adapter 팩토리나 이를 한 단계 감싸는 비즈니스 Read Service만을 import하여 사용해야 합니다.
* 비즈니스 로직(Guard)과 DB 접근 기술(Prisma)을 분리함으로써, 테스트 용이성과 향후 유지보수성을 극대화합니다.

## 6. 처리 순서
Route 통합 시 요청 처리는 다음 순서로 엄격하게 진행됩니다.
1. **Feature Flag 검증**: `ENABLE_FINAL_APPROVAL_EXECUTION` 플래그 확인.
2. **JSON Parse**: Request Body 파싱.
3. **Command Validation**: `parseFinalApprovalExecutionCommand`를 통해 Payload 형식 검증.
4. **DB Read Guard**: Adapter 팩토리를 통해 생성된 Repository를 활용해 `runFinalApprovalExecutionDbReadGuard` 수행 (DB 스냅샷 조회 및 비즈니스 규칙 검증).
5. **Enqueue Command 준비**: 검증 통과 시 `buildFinalApprovalExecutionEnqueueCommand` 로 큐 전송용 포맷 조립.
6. **Response 반환**: 성공(202) 또는 실패(상태 코드 매핑) 응답 반환.

## 7. DB Read Guard 성공 시 흐름
* DB Read Guard가 성공(Success) 결과를 반환하면, 큐에 넣을 `Enqueue Command`를 구성합니다.
* 이후 DB 상태 변경(Write)이나 큐 발행을 수행하지 않고, Mock 구현대로 성공 응답 봉투(API Response Envelope)인 `202 Accepted`를 반환하며 정상 종료합니다.

## 8. DB Read Guard 실패 시 status code mapping
* Guard에서 실패 사유가 발생할 경우, 다음과 같은 HTTP 상태 코드로 매핑하여 응답합니다:
  * `NOT_FOUND` 관련 오류 (예: 대상 Job/Item, FinalApproval이 없음): HTTP 404 Not Found
  * `NOT_APPROVED`, `EXPIRED`, `INVALID_STATUS` 등 비즈니스 규칙 위반: HTTP 409 Conflict 또는 HTTP 422 Unprocessable Entity
  * 세부 매핑 전략은 통합 코드 작성 시 별도 헬퍼 함수로 분리하여 관리할 수 있습니다.

## 9. Validation 실패와 Guard 실패의 차이
* **Validation 실패 (Command Validation)**: HTTP 400 Bad Request. 요청 JSON 형식 오류, 필수 필드 누락 등 구문(Syntax)적 문제로 인해 발생합니다.
* **Guard 실패 (DB Read Guard)**: HTTP 404/409/422. Payload는 문법적으로 완벽하지만 데이터베이스의 현재 비즈니스 상태(데이터 부재, 만료, 기실행 등)와 충돌하여 실행이 불가능한 의미론(Semantic)적 문제입니다.

## 10. DB Write 금지 원칙
* 이번 설계와 향후 구현 범위에서는 데이터베이스 조회를 통한 검증(DB Read Guard) 기능만 수행해야 합니다.
* Job/Item 상태를 `EXECUTING` 등으로 변경하는 어떠한 형태의 DB 상태 업데이트 연산도 엄격히 금지됩니다.

## 11. Worker/Queue 연결 금지 원칙
* 메시지 큐 시스템(예: BullMQ)의 라이브러리를 추가하거나, 실제로 `queue.add()` 등을 호출하는 코드는 포함하지 않습니다.
* 순수하게 `Enqueue Command`를 구성하는 단계까지만 허용됩니다.

## 12. 네이버 API 호출 금지 원칙
* LIVE adapter 구현이나, 실제 네이버 커머스 외부 API로의 네트워크 통신 로직은 절대 추가하지 않습니다.

## 13. Docker test DB route integration test 전략
* `route.ts`의 DB 연동 테스트는 반드시 로컬 Docker Test DB 환경에서 진행되어야 합니다.
* 테스트 코드 도입부(before 블록 등)에서 `DATABASE_URL`이 `localhost:55432` 기반인지 확인하는 예외 처리 방어 코드를 필수로 삽입하여 안전하게 통합 테스트를 구동합니다.

## 14. 운영 DB 접근 금지 조건
* 프로덕션 DB 또는 클라우드 운영 환경 데이터베이스를 대상으로 테스트하거나 데이터베이스 스키마 변경 명령(`prisma db push`, `migrate`)을 실행하는 행위는 절대로 허용되지 않습니다.

## 15. DATABASE_URL / secret 노출 금지 조건
* 환경 변수, 콘솔 출력, 코드 주석 등 어떠한 경로를 통해서도 실제 운영의 `DATABASE_URL`, DB 계정 비밀번호, 접근 토큰, API Secret 정보가 원본으로 출력되거나 노출되는 것을 금지합니다.

## 16. 실제 구현 전 승인 필요 항목
이 문서를 기반으로 다음 작업을 진행하기 전, 반드시 사용자의 다음 사항들에 대한 명시적 승인이 필요합니다.
* API Route(`route.ts`) 파일 내에 DB Read Guard 코드를 연동하는 것에 대한 승인.
* Docker Test DB를 활용한 `route.ts` Integration Test 구현 승인.

## 17. 다음 작업 추천
* 사용자가 승인할 경우, 본 설계 문서의 원칙에 입각하여 `app/api/sku-keyword-final-approvals/execute/route.ts`에 DB Read Guard 연동 코드 및 연관 통합 테스트 코드를 구현할 것을 추천합니다.
