# FinalApproval Execution BullMQ Adapter Route Integration Design

## 1. 작업 목적
FinalApproval Execution API route에서 기존 Fake Queue 및 Queue Port Factory 구조를 유지하면서, 테스트를 마친 실제 BullMQ Adapter를 안전한 조건에서 연결하기 위한 아키텍처 및 안전 정책을 설계합니다. 이 문서는 향후 코드 수정 전 설계 기준으로 사용됩니다.

## 2. 현재 완료 상태 요약
* **FinalApproval Execution BullMQ Queue Adapter 격리 구현 완료**
* 기존 `FinalApprovalExecutionQueuePort` 인터페이스 뒤에 BullMQ Adapter 추가 완료
* Docker Redis 기반 Adapter 검증 및 TypeScript 오류, 테스트 미종료 이슈 해결 완수
* `API route` 연결, `Worker`, `Queue Processor`, `EXECUTING 상태 전환`, `Naver API 호출` 등은 아직 구현되지 않음

## 3. 기존 Route Queue Port Factory 구조
* 기존 구현 파일 목록:
  * `app/api/sku-keyword-final-approvals/execute/route.ts`
  * `src/services/sku-keyword-final-approval-execution-route-queue-port-factory.service.ts`
  * `src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service.ts`
  * `src/services/sku-keyword-final-approval-execution-api-queue-enqueue-orchestration.service.ts`
  * `src/services/sku-keyword-final-approval-execution-queue-enqueue.service.ts`
* `route.ts`는 인프라 종속성을 직접 갖지 않고, `FinalApprovalExecutionQueuePort`와 `Queue Port Factory`만을 통신 대상으로 사용

## 4. Fake Queue Test Only 정책
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY`는 `NODE_ENV === 'test'`에서만 허용됨
* `NODE_ENV !== 'test'` 환경에서는 Fake Queue 성공 경로를 완전히 차단하여 운영 사고를 예방함
* 운영 환경에서 Fake Queue로 `202 Accepted` 반환은 금지됨

## 5. BullMQ Adapter 연결 필요성
* Mock 또는 Test 전용 환경을 넘어, 실제 비동기 백그라운드 Worker 처리를 위해 `createFinalApprovalExecutionBullmqQueueAdapter`를 활성화할 구조적 진입점이 필요
* 단, BullMQ Import와 연결 코드는 API 라우트에 노출되지 않고 캡슐화되어야 함

## 6. BullMQ Adapter 연결 조건
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE === true` 여야 함
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER === bullmq` 여야 함
* `REDIS_URL` 환경 변수가 존재해야 함
* 라우트 로그에 운영 `REDIS_URL` 원문 출력은 금지
* `route.ts`는 `BullMQ`를 직접 import 하지 않고, `Queue Port Factory`만을 사용해야 함
* `BullMQ` 라이브러리 import는 Adapter 파일 또는 Factory 내부로 엄격히 격리되어야 함

## 7. Feature flag 정책
* `ENABLE_FINAL_APPROVAL_EXECUTION=true`: Execution API 전체 허용
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE=true`: Queue enqueue 기능 자체 허용
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY=true`: 테스트 환경 전용 Fake Queue 사용 허용 (단, `NODE_ENV === 'test'` 제약 조건 수반)
* BullMQ Adapter 활성화는 별도의 환경 설정(`FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER`) 충족 시에만 동작

## 8. 환경변수 정책
다음 환경변수들을 기반으로 동작 분기 처리를 진행합니다.
* `REDIS_URL`: Redis 서버 주소
* `FINAL_APPROVAL_EXECUTION_QUEUE_NAME`: 사용될 큐 이름 (`final-approval-execution`)
* `FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER`: 어댑터 선택자 (`fake-test-only` | `bullmq` | `disabled` 또는 미설정)
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`: 큐 사용 전역 스위치
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY`: Mock용 스위치

## 9. route.ts 처리 순서 변경안
API 라우트는 다음의 순서로 로직을 수행합니다.
1. `ENABLE_FINAL_APPROVAL_EXECUTION` 확인
2. HTTP Payload JSON parse
3. Command validation (스키마 검증)
4. DB Read Guard (상태/존재 여부 읽기 검증)
5. `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE` 확인
6. Queue Port Factory 호출
7. 환경에 따라 `Fake Queue` 또는 `BullMQ Adapter` 인스턴스 선택 반환
8. API Queue Enqueue Orchestration 서비스 호출
9. Queue enqueue 성공 시 HTTP `202 Accepted` 반환
10. Queue enqueue 실패 시 HTTP `500` 또는 `503` 반환

## 10. 운영 환경 보호 정책
* 운영 환경에서 Fake Queue 기반의 가짜 성공 응답 처리 금지
* `REDIS_URL` 환경 변수 누락 시 `503` 에러 반환(안전 실패)
* Redis 연결 실패나 Timeout 발생 시 `500` 또는 `503` 에러 반환(안전 실패)
* Queue enqueue가 완전히 성공하기 전까지 DB 상태 변경(EXECUTING 등) 없음
* `route.ts` 계층에서 직접 `EXECUTING` 상태 전환 없음
* `route.ts` 계층에서 직접 Naver API 호출 없음
* `route.ts` 계층에서 직접 Worker 로직(소비) 수행 없음

## 11. 테스트 전략
1. Feature flag off 이면 `403 Forbidden` 반환
2. Queue flag off 이면 Queue 호출 없이 `503 Service Unavailable` 반환
3. `test` 환경에서 Fake Queue 성공 경로 기존대로 유지
4. `NODE_ENV !== 'test'` 환경에서 Fake Queue의 성공 처리 시도 차단 검증
5. BullMQ Adapter 환경변수 설정 및 Docker Redis 구동 상태에서 `202 Accepted` 성공 검증
6. `REDIS_URL` 환경변수 누락 시 `503` 반환
7. 잘못된 `REDIS_URL` 입력 시 `500` 또는 `503` 반환
8. Queue payload가 정해진 최소 필드만으로 구성되는지 검증
9. `idempotencyKey` 값이 `jobId`로 정상 전달되는지 검증
10. `route.ts` 내에 BullMQ 모듈의 직접 import 코드가 없는지 검증
11. `route.ts` 내에 DB write(생성/수정/삭제) 로직이 없는지 검증
12. `route.ts` 내에 Naver API 호출 코드가 없는지 검증

## 12. 장애 처리 정책
* 큐 진입(Enqueue) 시도 중 예외 발생 시 DB/상태는 원본 유지 (No-op)
* 에러 로그 기록 시 민감 정보 일체 제외 (Url Sanitization)
* BullMQ 큐 장애 시에는 HTTP `503` 응답을 통해 클라이언트가 나중에 다시 시도(Retry)할 수 있도록 조치

## 13. 보안 정책
* `REDIS_URL`, `DATABASE_URL` 원문 출력 및 로그 기록 엄격히 금지
* DB 비밀번호, 인가 토큰, Secret 값의 로그 기록 및 에러 응답 포함 금지
* Queue payload에 인증 정보나 DB 비밀 정보 등 민감정보 저장 금지
* Redis Key/Value에 시스템 Secret 저장 금지
* 운영망 Redis와 테스트용 Redis 격리 (포트 분리, 네트워크 분리)
* 운영망 DB와 테스트용 DB 격리

## 14. 실제 구현 전 체크리스트
* [ ] 본 문서 작성 및 검토 (현재 단계)
* [ ] 환경 변수 선언/파싱 유틸리티 업데이트
* [ ] Queue Port Factory 모듈 업데이트 및 격리 보장
* [ ] `route.ts`의 의존성 위반(Prisma, BullMQ, Axios 등) 확인

## 15. 다음 구현 순서
1. (현재) FinalApproval Execution BullMQ Adapter Route Integration Design 문서 커밋
2. 별도 승인 후 API route에 Queue Port Factory를 통해 BullMQ Adapter 연결 작업 수행 (환경변수 조건 반영)
3. 연결 테스트 완료 후 별도의 추가 승인 단계를 거쳐 실제 Worker Process 구현 시작
