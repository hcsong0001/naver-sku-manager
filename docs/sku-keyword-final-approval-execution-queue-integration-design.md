# FinalApproval Execution Queue Integration Design

## 1. 작업 목적
* FinalApproval Execution API가 응답(`202 Accepted`)을 반환하기 전에, 비동기 처리를 위해 향후 Worker 및 Queue(BullMQ 등) 시스템으로 안전하게 작업을 이관하는 Queue Integration 설계 방안을 정의합니다.
* 실제 구현 전 검토 및 안전 정책 확립을 위해 작성되었습니다.

## 2. 현재 API Route 상태 요약
* **상태**: DB Read Guard 연동 완료 및 통합 테스트 통과 상태입니다.
* **흐름**: 
  1. Feature flag 확인
  2. JSON parse
  3. Command validation
  4. DB Read Guard (실행 가능 여부 및 상태 조회)
  5. Guard 실패 시 `404` 또는 `409` 상태 코드 반환
  6. Guard 성공 시 기존 orchestration 흐름(Mock)을 타며 `202 Accepted` 응답 반환

## 3. Queue 도입 필요성
* **비동기 처리**: 대규모 데이터 갱신이나 장시간이 소요되는 네이버 커머스 API 연동 작업을 동기식 API 내에서 대기하며 처리할 경우 서버 부하 및 타임아웃 오류가 발생할 수 있습니다.
* **안정성과 확장성**: 실패 시 안전한 재시도, 율속 처리(Rate limiting), 부하 분산 및 에러 격리를 위해 메시지 큐 기반의 비동기 Worker 아키텍처 도입이 필수적입니다.

## 4. Queue에 넘겨야 할 최소 payload
Queue 메시지의 크기를 최적화하고 데이터 동기화 이슈를 방지하기 위해 최소한의 식별자와 메타데이터만 전송합니다.
* `finalApprovalId` (string)
* `actorId` (string)
* `idempotencyKey` (string)
* `requestedAt` (string, ISO 8601 DateTime 포맷)
* `source` (string, 고정값)
* `mode` (string)

## 5. Queue Job 이름 제안
* **Job Name**: `sku-keyword-final-approval-execution`
* 큐 모니터링 시 명확히 식별할 수 있도록 도메인과 핵심 액션을 포함합니다.

## 6. Queue Job payload 타입 제안
```typescript
export type FinalApprovalExecutionQueuePayload = {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  requestedAt: string;
  source: 'EXECUTION_API';
  mode: 'MOCK' | 'DRY_RUN_READY' | 'LIVE';
};
```
*(참고: `LIVE` 모드는 향후 확장을 위한 예약어이며, 설계 문서 외 현재 단계 코드에서는 사용이 금지됩니다.)*

## 7. idempotencyKey 사용 방식
* 클라이언트 호출단이나 API 계층에서 생성한 `idempotencyKey`를 Queue Payload에 포함시켜 Worker 시스템까지 전달합니다.
* Worker는 실행 착수 전 해당 키의 기존 처리 내역(DB 내 이력 조회 또는 Redis 캐시 등)을 확인하여 멱등성을 보장합니다.

## 8. 중복 실행 방지 정책
* **DB Status Guard**: `FINAL_APPROVAL` 상태가 `ACTIVE`일 때만 실행 가능토록 합니다. 
* **Atomic 상태 전환**: 실행 시작 시 Worker에서 상태를 `EXECUTING`으로 즉각(Atomic) 업데이트하여 중복 소비를 원천 차단합니다.
* **IdempotencyKey 검증**: 짧은 시간에 중복된 키가 큐에 여러 개 인입된 경우, 두 번째 요청부터는 스킵(Skip) 혹은 즉시 성공(Idempotent 처리)으로 간주하여 재처리하지 않습니다.

## 9. API와 Worker의 책임 분리

### API Route 책임
* Feature flag 확인
* JSON parse
* Command validation
* DB Read Guard (초기 상태 검증)
* Queue enqueue 요청 생성 (`queue.add`)
* Enqueue 성공 시 `202 Accepted` 반환
* Enqueue 실패 시 안전한 `500` 또는 `503` 상태 코드 반환

### Worker 책임
* Queue Job 수신
* FinalApproval 재조회
* `ACTIVE` 상태 재검증
* Job `APPROVED` 재검증
* Item `READY` 재검증
* `payloadHash` / `validationSnapshotHash` 재검증
* `idempotencyKey` 중복 여부 확인
* *(주의: 실제 상태 업데이트나 네이버 외부 연동 실행은 본 단계에서는 금지됨)*

## 10. Queue enqueue 성공/실패 시 API 응답 정책
* **성공 시**: 정상적으로 큐에 Job이 적재된 경우, 비동기 처리가 접수되었음을 알리는 `202 Accepted` 반환.
* **실패 시**: Redis 서버다운, 큐 연결 실패 등의 인프라 이슈로 Enqueue에 실패하면, 안전하게 에러를 로깅하고 `500 Internal Server Error` 혹은 `503 Service Unavailable`로 응답. 클라이언트의 재시도를 유도합니다.

## 11. 실패/재시도 정책
* **재시도 횟수 및 백오프**: 일시적 네트워크 오류를 고려해 큐 엔진 수준에서 최대 3회 자동 재시도(Exponential Backoff 적용).
* **재시도 불가 케이스**: 데이터 부재, 검증 해시 불일치, 이미 처리된 키(`idempotencyKey` 중복) 등의 치명적/논리적 오류 발생 시 재시도 없이 즉시 `Failed` 처리.

## 12. audit log 기록 시점 제안
* API Route: Queue Enqueue 요청 성공 시점 (Execution 요청 접수)
* Worker: 실행 시작 직전 (`EXECUTING` 변경 직후)
* Worker: 실행 완료 및 최종 상태(`SUCCESS`, `FAILED`) 반영 시점

## 13. Worker에서 다시 검증해야 할 항목
API에서 Guard를 통과했더라도 큐 내부에서 대기하는 시간 동안 시스템 상태가 변할 수 있으므로, Worker 구동 직전 아래의 조건을 필수로 재검증해야 합니다.
* FinalApproval `ACTIVE` 상태 유지 여부
* 연결된 Job이 여전히 `APPROVED` 상태인지
* 관련된 Item들 중 실행할 수 있는 `READY` 상태의 Item이 존재하는지
* 데이터 무결성을 증명하는 `payloadHash` 및 `validationSnapshotHash` 일치 여부
* `idempotencyKey` 고유성 (이미 실행된 요청인지 확인)

## 14. 운영 DB 보호 정책
* 로컬, CI/CD, 통합 테스트 환경을 비롯해 Worker 및 API 개발 시, `DATABASE_URL`이 절대 운영계 서버로 향하지 않도록 `localhost:55432` 혹은 허가된 테스트 전용 DB인지를 확인하는 Assertion 방어 코드를 모든 진입점에 철저히 유지합니다.

## 15. LIVE adapter 연결 전 안전 단계
이하의 강력한 안전 제약 조건을 적용하여 예상치 못한 시스템 변화나 부작용을 방지합니다:
* API Route는 어떠한 상황에서도 네이버 API를 호출하거나 로직을 직접 실행하지 않습니다.
* API Route는 `EXECUTING` 등으로 DB 상태 변경(Write)을 시도하지 않습니다.
* Queue enqueue 행위와 실질적 비즈니스 로직 처리를 엄격히 분리합니다.
* Worker에서도 DB Read Guard와 동일한 수준의 엄밀한 상태 재검증을 선행합니다.
* 향후 LIVE Adapter 연결(실제 운영망 통신)은 별도의 종합 승인이 떨어지기 전까지 시도 및 구현을 절대 금지합니다.

## 16. 다음 구현 순서 (제안)
1. 사용자의 패키지 수정 및 구현 승인 획득 시 BullMQ 설치 및 초기화 모듈 구성.
2. API Route 상의 기존 Mock Orchestration을 걷어내고 Queue Enqueue 로직(`queue.add`)으로 연동 대체 구현.
3. API의 실패 반환 로직(500/503) 작성 및 단위 테스트.
4. Dummy Worker 생성 및 `idempotencyKey` 포함된 최소 Payload의 정상 수신 여부 통합 테스트 확인.
5. Worker 내에 DB 상태를 재조회/재검증하는 엄격한 로직 도입.
