# FinalApproval Execution API Queue Enqueue Integration Design

## 1. 작업 목적
* FinalApproval Execution API가 DB Read Guard 통과 후, 새롭게 구현된 Queue Enqueue Port를 어떻게 호출할지에 대한 상세 설계와 연동 정책을 정의합니다.
* 실제 큐 엔진(BullMQ, Redis 등) 및 Worker를 연결하기에 앞서, API의 안정적 비동기 이관 처리를 보장하기 위한 문서입니다.

## 2. 현재 API route 처리 흐름 요약
* **상태**: DB Read Guard Route 연동 및 통합 테스트 통과 상태입니다.
* **흐름**: 
  1. Feature flag 확인
  2. JSON parse
  3. Command validation
  4. DB Read Guard 검증
  5. Guard 실패 시 `404` 또는 `409` 응답 반환
  6. Guard 성공 시 기존 Orchestration 로직 호출 및 `202 Accepted` 반환 (Queue 연동 미구현)

## 3. 현재 Queue Enqueue Port 상태 요약
* **상태**: 순수 TypeScript 코드 레벨의 Interface와 Fake Adapter 연동이 완료되었습니다.
* **구현체**: 
  * `FinalApprovalExecutionQueuePort` 인터페이스
  * `enqueueFinalApprovalExecutionJob` 순수 비즈니스 서비스
  * 테스트 전용 `FakeQueueAdapter`

## 4. API와 Queue Enqueue Port를 연결해야 하는 이유
* **비동기 처리 위임**: 동기식 API 대기 시간에 얽매이지 않고 즉시 응답을 주기 위해 작업을 뒷단(Worker)으로 넘기는 과정이 필수적입니다.
* **추상화 의존**: 실제 인프라 기술(Redis, BullMQ)에 종속되지 않는 안전한 이관 로직을 구성할 수 있습니다.

## 5. 연결 위치 제안
* **API Route 내부가 아닌 서비스 계층**: 기존 `runFinalApprovalExecutionApiOrchestration` 내부 혹은 `route.ts`가 직접 의존성을 주입하여 호출할 수 있는 `orchestration/service` 계층의 최상위 Controller 역할을 수행하는 지점에 연결합니다.

## 6. route.ts에서 직접 Queue 구현을 하면 안 되는 이유
* **관심사 분리 위반**: Next.js App Router(`route.ts`)는 HTTP 요청/응답 변환과 의존성 주입에만 집중해야 하며, 비즈니스 및 인프라 로직이 혼재되면 유지보수와 테스트가 불가능해집니다.
* **테스트 용이성 확보 실패**: HTTP 컨텍스트와 무관하게 Fake Queue를 주입하여 단위/통합 테스트를 독립적으로 수행하기 위해서입니다.

## 7. orchestration/service 계층에서 Queue Port를 주입받는 구조 제안
* API 라우트에서 공용 `lib/prisma`를 주입하여 DB Guard Adapter를 만들었던 것과 동일하게, `route.ts` 혹은 `orchestration.service`에서 사용할 Queue Port 구현체(현재 단계에서는 `FakeQueueAdapter`, 추후 `BullMQAdapter`)를 상단에서 주입하여 `enqueueFinalApprovalExecutionJob` 서비스를 호출합니다.

## 8. DB Read Guard 성공 후 Queue enqueue까지의 순서
API 라우트는 다음 순서로 동작해야 합니다:
1. Feature flag 확인
2. JSON parse
3. Command validation
4. DB Read Guard
5. **Queue enqueue command 생성** (`buildFinalApprovalExecutionEnqueueCommand`)
6. **Queue Enqueue Port 호출** (`enqueueFinalApprovalExecutionJob` + 주입된 Port)
7. enqueue 성공 시 `202 Accepted` 반환
8. enqueue 실패 시 `500` 또는 `503` 반환

## 9. Queue enqueue 성공 시 API 응답 정책
성공적인 Enqueue 이후에는 단순히 수락되었음을 의미하는 202 응답과 함께, 상세한 상태 메타데이터를 클라이언트에 반환합니다.
* **HTTP 상태 코드**: `202 Accepted`
* **응답 본문 포함 데이터**:
  * `jobName` (`sku-keyword-final-approval-execution`)
  * `jobId`
  * `idempotencyKey`
  * `mode` (`MOCK` 또는 `DRY_RUN_READY`)
  * `acceptedAt` 또는 `enqueuedAt`
* *(주의: 반환되는 응답은 실제 실행 완료 여부가 아니라 "enqueue accepted" 상태임을 명확히 안내해야 합니다.)*

## 10. Queue enqueue 실패 시 API 응답 정책
* **데이터 무결성 보존**: Queue Port 호출 실패 시 어떠한 로컬 DB 상태 변경, Naver API 호출도 수행하지 않고 원상태를 보존합니다. EXECUTING 상태 전환은 절대 금지합니다. Worker 역시 실행되지 않아야 합니다.
* **실패 응답**: 큐 엔진(Redis) 오류 등에 의한 실패는 복구 가능한 서버 장애로 취급하여 `500 Internal Server Error` 혹은 `503 Service Unavailable` 중 하나의 포맷으로 응답합니다.
* **재시도 위임**: 실패 시 API 계층에서의 무한 루프나 재시도를 피하고, 클라이언트 또는 운영 정책으로 재시도를 위임합니다.

## 11. idempotencyKey와 jobId 사용 정책
* 클라이언트나 API가 발급/전달받은 고유 `idempotencyKey`를 반드시 Queue의 고유 `jobId`로 1:1 매핑하여 사용합니다.
* 이를 통해 중복된 키를 지닌 요청이 연달아 Enqueue되는 것을 큐 엔진(BullMQ 등) 수준에서 1차로 방어할 수 있습니다.

## 12. 테스트 전략
이번 연동 작업 시 작성 및 통과해야 하는 **반드시 포함할 시나리오**입니다:
1. feature flag off이면 Queue 호출 없이 `403` 반환
2. invalid JSON이면 Queue 호출 없이 `400` 반환
3. invalid command이면 Queue 호출 없이 `400` 반환
4. DB Read Guard 실패이면 Queue 호출 없이 `404` 또는 `409` 반환
5. DB Read Guard 성공 + Fake Queue enqueue 성공이면 `202` 반환
6. DB Read Guard 성공 + Fake Queue enqueue 실패이면 `500` 또는 `503` 반환
7. Queue payload가 최소 필드(`finalApprovalId`, `actorId`, `idempotencyKey`, `requestedAt`, `source: EXECUTION_API`, `mode: MOCK` 또는 `DRY_RUN_READY`)만 포함하는지 검증
8. `idempotencyKey`가 `jobId`로 사용되는지 검증
9. `route.ts`가 실제 BullMQ/Redis를 직접 import하지 않는지 검증 (정적 구조 확인)

## 13. Docker test DB route integration test 확장 방향
* 기존 통합 테스트 코드(`route.test.ts`)의 DB 상태 픽스쳐를 그대로 활용하되, 테스트 파일 내부에 `FakeQueueAdapter` 인스턴스를 추가하여 `route.ts`에 주입(Mocking)하거나, 모듈 모킹(`jest.mock` / `node:test` spy)을 활용해 연결 검증을 수행합니다.

## 14. Fake Queue Adapter 기반 route test 전략
* 통합 테스트의 목적은 외부 Redis 인프라를 확인하는 것이 아니라, `route.ts`의 로직 분기가 정상적인지 증명하는 데 있습니다. 따라서 Fake Queue의 내부 상태(`failMode`)를 토글해가며 성공(`202`)과 실패(`500`/`503`) 시나리오가 의도대로 분기되는지 집중 테스트합니다.

## 15. 실제 BullMQ 연결 전 안전 단계
* API는 DB를 직접 변경하거나 외부망(네이버 API)과 직접 통신하는 것이 완벽히 차단된 상태를 유지해야 합니다.
* 순수 Port 인터페이스를 통한 Fake Adapter 연동 통합 테스트가 100% 통과한 후에만 다음 인프라 구현 단계로 넘어갑니다.

## 16. 다음 구현 순서
1. `route.ts` 및 `orchestration.service` 수정: Queue Port 인터페이스와 `enqueueFinalApprovalExecutionJob`를 연동/호출하는 로직 구현.
2. `route.test.ts` 수정: Fake Queue Adapter를 활용한 9가지 테스트 시나리오 보강 구현 및 통과 확인.
3. Queue 연동 API 코드가 완벽히 순수 테스트를 통과한 이후, 실제 BullMQ/Redis 연동 인프라 적용 도입 결정.
