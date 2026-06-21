# FinalApproval Execution API Skeleton: Pre-Implementation Checklist

## 1. 현재 완료된 순수 함수 계층 (Pure Function Layers Completed)

*   `parseFinalApprovalExecutionCommand`: Request Body 검증
*   `buildFinalApprovalExecutionEnqueueCommand`: 대기열(Queue)에 들어갈 Command Payload 생성
*   `buildFinalApprovalWorkerExecutionContext`: Worker가 사용할 Execution Context 생성
*   `buildFinalApprovalExecutionApiAcceptedResponse`: 202 Accepted Response 조립
*   `buildFinalApprovalExecutionApiValidationErrorResponse`: 400 Validation Error Response 조립
*   `buildFinalApprovalExecutionApiGuardFailureResponse`: 403/409 Guard Failure Response 조립
*   `runFinalApprovalExecutionApiOrchestration`: 위 함수들을 하나로 묶은 전체 흐름 오케스트레이션

## 2. 아직 구현하지 않은 API Route 범위

*   `app/api/smartstores/batch-jobs/[jobId]/final-approval/execute` 등 Next.js Route Handler 생성
*   실제 HTTP 요청 파싱 및 `NextResponse` 반환 로직
*   `runFinalApprovalExecutionApiOrchestration`를 Next.js Route에서 호출하는 바인딩
*   데이터베이스(Prisma)에서 `FinalApprovalExecutionPlan` 등 상태 조회 (Guard 검증용)
*   사용자 인증(Session/Actor) 획득
*   실제 메시지 큐(BullMQ, AWS SQS 등) Enqueue 처리
*   Job, JobItem DB 상태를 `EXECUTING`으로 전이하는 로직

## 3. API Skeleton 구현 전 승인 필요 여부

*   **현재 상태:** API 라우트 껍데기(Skeleton) 작성 직전입니다.
*   **승인 필요 조건:** 데이터베이스 읽기(Read/Select) 로직을 포함하여 껍데기 코드를 만들지에 대한 사용자(팀 리드)의 **명시적인 설계 승인**이 필요합니다.

## 4. API Route가 사용할 수 있는 기존 순수 함수 목록

API Route는 아래 순수 함수들을 Import 하여 **조합(Composition)** 하는 역할만 수행해야 합니다.

1.  `runFinalApprovalExecutionApiOrchestration` (가장 핵심 진입점)
2.  (필요 시) `buildFinalApprovalExecutionApiGuardFailureResponse`

## 5. API Route가 절대 직접 하면 안 되는 일

*   API Route 내부에서 Request Body를 직접 파싱하거나 정규표현식 등으로 직접 Validation 하지 말 것 (반드시 `runFinalApprovalExecutionApiOrchestration`을 거칠 것)
*   API Route 내부에서 Response Envelope JSON을 수동으로 직접 만들지 말 것
*   API Route 내부에서 복잡한 비즈니스 로직(예: Plan 변환, Payload Hash 검증 등)을 직접 수행하지 말 것 (이미 검증된 서비스 로직 호출)

## 6. 네이버 API 직접 호출 금지

*   API Route는 요청을 큐(Queue)에 위임(Enqueue)하고 즉시 202 Accepted를 반환해야 합니다. (Fire-and-Forget)
*   API 핸들러가 HTTP 요청 사이클 내에서 `fetch`나 `axios`로 네이버 커머스 API를 직접 호출하는 것은 **절대 금지**됩니다.

## 7. Worker/Queue 실제 연결 금지

*   현재 Skeleton 단계에서는 실제 라이브러리(예: BullMQ)를 Import 하거나 Queue Instance에 `add()` 하는 로직을 작성해서는 안 됩니다.
*   단순히 로깅(Console.log) 후 성공 응답을 반환하도록 Mocking 해야 합니다.

## 8. DB Write 금지 또는 별도 승인 필요 조건

*   **API Route 내 DB 쓰기 금지:** `prisma.job.update({ data: { status: 'EXECUTING' } })` 등의 상태 변경 로직은 큐(Queue)를 소비하는 **Worker 데몬 계층의 책임**입니다. API Route에서 직접 DB Write를 수행하지 마세요.
*   (단, Guard 조건 검사를 위한 `findUnique`, `findFirst` 등의 DB Read 연산은 승인 후 Skeleton 구현 시 작성 가능합니다.)

## 9. Feature Flag 필요 조건

*   이 기능은 매우 민감한 실행(Live Execution) 단계 진입점입니다.
*   코드 레벨 혹은 환경 변수(`process.env.ENABLE_FINAL_APPROVAL_EXECUTION`) 기반의 **Feature Flag**로 API 접근 자체를 원천 차단/허용할 수 있는 방어 로직이 필요합니다.

## 10. ActorId, Permission, ConfirmExecutionOnly, Acknowledgement 조건

*   **ActorId:** 세션에서 인증된 사용자의 ID를 반드시 추출하여 `actorId`로 주입해야 합니다.
*   **Permission:** 해당 스토어(Smartstore)의 관리 권한이 있는지 검사해야 합니다.
*   **ConfirmExecutionOnly & Acknowledgement:** Request Payload에 `confirmExecutionOnly === true` 및 `acknowledgement === true`가 명시되어 있는지 확인해야 합니다. (`runFinalApprovalExecutionApiOrchestration` 내부에서 검증됨)

## 11. IdempotencyKey 처리 조건

*   클라이언트가 헤더(Header) 또는 바디(Body)에 멱등성 키(`idempotencyKey`)를 제공해야 합니다.
*   이미 진행 중인 Execution(`EXECUTING`)이거나, 과거에 성공 처리된 키가 들어오면 중복 실행을 막고 `409 Conflict` 또는 `202 Accepted`(기존 응답 재현)를 반환하는 방어 정책이 마련되어야 합니다.

## 12. Response Status Code 정책

*   **202 Accepted:** 비동기 작업(Worker Enqueue)이 성공적으로 접수됨 (200 OK 대신 202 사용)
*   **400 Bad Request:** Payload Validation 오류
*   **401 Unauthorized:** 세션 부재
*   **403 Forbidden:** 스토어 관리 권한 부재
*   **404 Not Found:** `jobId`를 찾을 수 없거나 권한 범위 밖
*   **409 Conflict:** 상태 전이 불가(이미 완료됨, 실행 중 등) 또는 멱등성 충돌

## 13. 테스트 전략

*   **통합 테스트(Integration Test):** `NextRequest` Mocking을 통한 라우트 핸들러 호출 테스트. 데이터베이스 트랜잭션을 사용하여 Guard 검증(Read)이 올바르게 동작하는지 확인.
*   DB 상태 전이(Write)가 없음을 테스트 코드로 단언(Assert)해야 함.

## 14. 커밋 단위 추천

*   **Commit 1:** Skeleton API Route 껍데기 추가 (`route.ts`) 및 Feature Flag 통제 로직
*   **Commit 2:** Session 획득 및 Guard 로직(DB Read) 추가
*   **Commit 3:** Orchestration 함수 결합 및 Mock Enqueue 추가
*   **Commit 4:** 통합 테스트 파일 작성 및 검증

## 15. 다음 구현 단계로 넘어가기 전 확인 질문

1.  **"API Route 내에서 Prisma를 사용한 DB 상태 조회(Read) 코드를 Skeleton에 포함해도 됩니까?"**
2.  **"Feature Flag 환경 변수의 이름은 무엇으로 지정할까요? (예: `NEXT_PUBLIC_ENABLE_EXECUTION` vs `ENABLE_FINAL_APPROVAL_EXECUTION`)"**
3.  **"클라이언트 인증(Session) Mocking 처리는 어떻게 할까요? 하드코딩된 테스트용 `actorId`를 사용할까요?"**
