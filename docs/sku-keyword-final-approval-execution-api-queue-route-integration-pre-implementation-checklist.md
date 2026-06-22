# FinalApproval Execution API Queue Route Integration Pre-Implementation Checklist

## 1. 작업 목적
* `route.ts`에 Queue Enqueue Orchestration을 본격적으로 연결하기 앞서, 발생할 수 있는 위험 요소를 식별하고 안전 조건, 연결 방식, 검증/테스트 범위 및 금지 사항을 명확히 정의하는 사전 체크리스트입니다.

## 2. 현재 완료된 구성 요소 요약
* DB Read Guard Route Integration 완료
* Docker test DB 기반 route integration test 6개 통과
* Queue Enqueue Port 구현 완료
* Fake Queue Adapter 기반 enqueue test 7개 통과
* API Queue Enqueue Orchestration 순수 서비스 구현 완료
* Fake Queue Adapter 기반 orchestration test 9개 통과

## 3. 아직 연결되지 않은 구성 요소
* `route.ts`는 아직 Queue Enqueue Orchestration을 호출하지 않음
* 실제 BullMQ Adapter 없음
* Redis 연결 없음
* Worker 없음
* Queue.add 없음
* EXECUTING 상태 전환 없음
* Naver API 호출 없음
* LIVE adapter 호출 없음

## 4. route.ts 연결 전 위험 요소
* **실제 Queue가 없는데 route.ts가 202 Accepted를 반환하면 사용자는 실행 요청이 접수됐다고 오해할 수 있음.**
* `route.ts` 내부에 인프라 로직이 결합될 경우 단위 테스트가 불가능해지는 구조적 위험이 존재합니다.
* 예외 처리가 미비할 경우 큐 적재가 실패했음에도 불구하고 성공으로 응답할 가능성이 있습니다.

## 5. fake queue를 route.ts에 직접 연결할 때의 위험성
* **Fake Queue는 테스트 전용이어야 하며 운영 route의 성공 처리로 사용하면 안 됨.**
* 운영 환경에서 Fake Queue가 무의식적으로 주입되어 동작할 경우, 사용자 요청이 유실됨에도 시스템은 정상으로 인지하게 되는 치명적 버그를 유발합니다.

## 6. 실제 Queue 없는 상태에서 202 Accepted를 반환하면 안 되는 이유
* `202 Accepted`는 "요청이 정상적으로 수락되었고, 비동기 처리가 시작될 것"이라는 명시적 계약입니다. 실제 Queue 인프라(Redis/BullMQ)가 배포/연결되지 않은 상태에서 202를 반환하면, 데이터의 영구적 유실과 시스템 신뢰성 하락을 초래합니다.
* **Queue enqueue 실패 시 절대 실행 성공처럼 응답하면 안 됨.**

## 7. 안전한 연결 조건
* 의존성 주입 구조를 활용하여 `route.ts` 최상단에서 Queue Port를 주입하며, 테스트 환경과 프로덕션 환경의 Port 구현체가 엄격히 분리되어야 합니다.
* 운영 환경 배포 시 실제 Redis 기반 Adapter가 준비되었을 때만 `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`를 활성화해야 합니다.
* **route.ts는 Naver API를 직접 호출하면 안 됨.**
* **route.ts는 EXECUTING 상태로 직접 변경하면 안 됨.**
* **route.ts는 DB Write를 하면 안 됨.**

## 8. 필요한 feature flag 제안
안전한 배포와 테스트를 위해 아래 세 가지의 Feature Flag를 제안합니다:
* `ENABLE_FINAL_APPROVAL_EXECUTION`
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY`

## 9. Queue Port 주입 방식 및 Feature Flag 정책
* `ENABLE_FINAL_APPROVAL_EXECUTION`이 `true`가 아니면 기존처럼 `403`을 반환.
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`가 `true`가 아니면 Queue enqueue route integration은 비활성화(또는 403/503 처리).
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY`는 **테스트 환경에서만 허용**하며, 통합 테스트 모듈 내부에서만 활성화되어야 함.
* 운영 환경에서는 어떠한 상황에서도 Fake Queue 성공 응답을 사용하지 않도록 방어 로직을 명시합니다.

## 10. route.ts 처리 순서 제안
목표하는 안전한 `route.ts` 처리 흐름은 아래와 같습니다:
1. Feature flag 확인 (`ENABLE_FINAL_APPROVAL_EXECUTION`)
2. JSON parse
3. Command validation
4. DB Read Guard
5. Queue enqueue feature flag 확인 (`ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`)
6. Queue Port 준비 (운영/테스트 환경 분기)
7. API Queue Enqueue Orchestration 호출
8. Queue enqueue 성공 시 `202 Accepted` 반환
9. Queue enqueue 실패 시 `500` 또는 `503` 반환
10. 어떠한 경우에도 `route.ts`에서 Naver API 호출 금지
11. 어떠한 경우에도 `route.ts`에서 `EXECUTING` 전환 금지

## 11. 테스트 전략
통합 테스트(`route.test.ts`) 보강 시 **반드시 포함할 시나리오**입니다:
1. execution feature flag off이면 403
2. invalid JSON이면 400
3. invalid command이면 400
4. DB Read Guard 실패이면 404 또는 409
5. queue feature flag off이면 Queue 호출 없이 안전한 403 또는 503
6. DB Read Guard 성공 + Fake Queue 성공이면 테스트 환경에서만 202
7. DB Read Guard 성공 + Fake Queue 실패이면 500 또는 503
8. Queue payload가 최소 필드만 포함하는지 검증
9. `idempotencyKey`가 `jobId`로 사용되는지 검증
10. `route.ts`가 BullMQ/Redis/Worker/Naver API를 직접 import하지 않는지 검증
11. `route.ts`가 DB Write를 하지 않는지 검증

## 12. 실패 응답 정책
* Queue 연결/적재 실패 등 어떠한 실패가 발생하더라도 사용자에게 성공(`2xx`) 상태로 위장하여 반환하지 않습니다.
* 복구 가능한 오류는 `500` 또는 `503`으로 반환하여, 클라이언트나 UI 계층에서 재시도할 수 있도록 명확히 안내합니다.

## 13. 실제 BullMQ/Redis 연결 전까지의 임시 정책
* 순수 오케스트레이션 연결이 완료되더라도, 실제 운영 `route.ts`는 `BullMQ` 패키지와 Redis URL이 주입되기 전까지 Queue 연동을 대기(Feature flag off)합니다.
* 통합 테스트는 오직 `FakeQueueAdapter`만을 사용해 인프라 의존성을 제거한 채 라우트 로직 검증만 수행합니다.

## 14. 운영 DB 보호 정책
* 로컬, CI/CD, 모든 통합 테스트 환경에서 데이터베이스 연결은 `DATABASE_URL`을 통해 테스트 전용(`localhost:55432`) DB로만 향하게 합니다. 
* API 코드 그 어디에도 데이터베이스 패스워드나 인증 정보, 원문이 출력되어서는 안 됩니다.

## 15. 구현 전 승인 필요 항목
* 상기 제안된 3가지 Feature Flag의 명명 규칙 및 적용 방식
* 운영 환경에서 Fake Queue 주입을 원천 차단하는 방어 로직 설계
* 테스트 전용 Mocking 구조 설계 (jest.mock 등) 승인

## 16. 다음 구현 순서
1. Feature flag 상수를 `route.ts` 및 관련 타입 파일에 정의 (필요 시).
2. `route.ts` 내 기존 Mock Orchestration 호출부를 `runFinalApprovalExecutionApiQueueEnqueueOrchestration`으로 대체 구성.
3. `route.test.ts`를 확장하여, Fake Queue Adapter를 모킹하고 제안된 11개의 테스트 시나리오를 검증.
4. 모든 테스트 통과 확인 후 PR 리뷰 진행 (실제 큐 구현체는 이후 별도 트랙으로 구성).
