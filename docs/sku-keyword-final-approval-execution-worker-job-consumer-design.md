# FinalApproval Execution Worker Job Consumer Design

## 1. 작업 목적
FinalApproval Execution Queue Job을 소비하는 Worker Job Consumer의 책임, 검증 순서, 실패 처리, 멱등성 및 재시도 정책을 설계 문서로 정리하여 실제 Worker 구현 전에 완벽한 검증 파이프라인을 구축하기 위함입니다.

## 2. 현재 Queue Route Integration 상태 요약
- DB Read Guard Route Integration 완료
- Queue Enqueue Port 구현 완료
- API Queue Enqueue Orchestration 순수 서비스 구현 완료
- Queue Enqueue Route Integration 구현 완료
- Fake Queue는 테스트 환경에서만 허용됨
- Docker test DB 기반 route integration test 12개 통과
- BullMQ/Redis 인프라 설계 문서 추가 완료

## 3. Worker Job Consumer가 필요한 이유
- 대량의 아이템 업데이트 또는 시간 지연이 발생하는 Naver API 호출을 HTTP 요청/응답 라이프사이클과 분리하기 위함입니다.
- 실행 중 일시적 에러 발생 시 신뢰성 있는 재시도와 오류 복구를 수행하고, 복잡한 멱등성 및 실행 이력 관리를 비동기적으로 처리하기 위함입니다.

## 4. Worker와 API Route의 책임 분리
**API Route 책임**
- 요청 수신
- feature flag 확인
- JSON parse
- command validation
- DB Read Guard
- Queue enqueue
- 202 Accepted 반환
- **직접 실행 금지**
- **직접 EXECUTING 전환 금지**
- **직접 Naver API 호출 금지**

**Worker 책임**
- Queue Job 소비
- DB 재조회
- 상태 재검증
- hash 재검증
- idempotency 확인
- mode별 분기
- 실패/재시도/audit 기준 결정
- 실제 실행은 별도 승인된 mode에서만 수행

## 5. Worker가 수신할 Queue Job payload
```json
{
  "finalApprovalId": "string",
  "actorId": "string",
  "idempotencyKey": "string",
  "requestedAt": "ISO String",
  "source": "EXECUTION_API",
  "mode": "MOCK | DRY_RUN_READY"
}
```
*※ LIVE 모드는 아직 금지되며, 향후 후보로만 언급됩니다.*

## 6. Worker 처리 순서
1. Queue Job 수신
2. payload schema validation
3. `finalApprovalId` 기준 DB 재조회
4. FinalApproval 존재 여부 확인
5. FinalApproval ACTIVE 상태 확인
6. FinalApproval 만료 여부 확인
7. Job APPROVED 상태 확인
8. Item READY 상태 확인
9. payloadHash 재검증
10. validationSnapshotHash 재검증
11. idempotencyKey 중복 실행 여부 확인
12. mode 확인
13. MOCK 또는 DRY_RUN_READY만 우선 처리
14. LIVE mode는 별도 승인 전까지 차단
15. 모든 검증 통과 후에만 다음 단계 진행

## 7. Worker 재검증 항목
Worker는 API에서 1차 검증을 거쳤더라도 Queue 대기 시간 중의 상태 변경을 감안하여 DB를 다시 읽어들여 6번 항목(처리 순서)의 상태 재검증(ACTIVE, APPROVED, READY 및 해시 일치 등)을 엄격하게 2차 검증합니다.

## 8. idempotencyKey 기반 중복 실행 방지 정책
BullMQ 내부의 jobId 기반 1차 멱등성과 더불어, DB 내에 해당 `idempotencyKey`가 이미 완료 처리된 이력이 있는지 교차 확인하여 중복된 Queue Job이 전달되더라도 안전하게 무시/완료 처리되도록 설계합니다.

## 9. Job 상태 전환 정책
- 이번 문서에서는 실제 상태 전환을 구현하지 않습니다.
- EXECUTING 상태 전환 등은 향후 Worker 구현 단계에서 별도 승인 후 다룹니다.

## 10. EXECUTING 전환 전 안전 조건
EXECUTING 전환은 반드시 다음 조건들이 모두 일치할 때 원자적 조건부 업데이트(Atomic Conditional Update)로 수행해야 합니다:
- FinalApproval ACTIVE
- Job APPROVED
- Items READY
- idempotencyKey 미사용
- validationSnapshotHash 일치
- payloadHash 일치
*(조건 불일치 시 상태 전환 없이 실패 처리합니다.)*

## 11. Dry-run / Mock / Live mode별 처리 정책
- **MOCK**: DB 조작이나 외부 API 호출 없이 로직의 흐름만 검증하며 성공 결과를 모의 반환합니다.
- **DRY_RUN_READY**: 실제 데이터를 읽어 실행 계획을 수립하고, 실제 Naver API의 검증/시뮬레이션 모드 혹은 내부 규칙 엔진을 돌려보지만, 타겟 리소스나 DB의 상태를 변경하지 않습니다.
- **LIVE**: 실제 변경 및 API 호출을 수행. (이번 설계 단계에서는 금지 및 차단)

## 12. Naver API 호출 전 안전 조건
- 이번 문서 단계에서 연동 로직은 구현하지 않습니다.
- LIVE adapter 호출은 별도의 전용 설계, 전용 테스트, 그리고 명시적인 별도 승인 전까지 철저히 금지합니다.
- Naver API 실제 호출 전에는 dry-run과 mock execution이 완벽하게 동작함이 충분히 입증되어야 합니다.

## 13. 실패 처리 정책
검증 실패(Schema invalid, 상태 불일치 등) 또는 처리 중 발생하는 에러 발생 시, 
- 실패 원인에 따라 즉각 종료 혹은 재시도를 결정합니다.
- 실패 시 불필요한 Naver API 호출 방지
- 실패 시 EXECUTING 강제 전환 차단
- 실패 시 DB write를 최소화하며, 필요 시 별도 승인을 거칩니다.

## 14. retry / backoff 정책
네트워크 에러 등의 일시적 장애를 대비하여 BullMQ의 재시도 기능을 사용하며, 백오프(Exponential Backoff)를 적용하여 과도한 트래픽 집중 및 무한 재시도 루프를 막습니다. (구체적 횟수와 지연 시간은 추후 확정)

## 15. dead-letter 또는 failed job 관리 정책
재시도 제한을 초과하여 최종 실패한 Job은 Dead-letter 큐로 분리하고, 실패 원인과 시점 등을 보존하여 추후 알림 전송 및 운영자의 수동 분석/개입이 가능하도록 관리합니다.

## 16. audit log 기록 시점
성공, 조건 불일치 탈락, 재시도 초과 최종 실패 시점 등 상태의 생명주기가 변경되는 중요한 마일스톤에서 Audit Log를 기록할 수 있도록 설계의 진입점을 마련합니다.

## 17. 운영 DB 보호 정책
- 상태 변경이 동반되지 않는 단순 읽기 연산은 Replica 사용을 권장합니다.
- Write Lock 점유 시간을 최소화하며, 원자적 조건부 업데이트 패턴 이외의 무조건적인 Overwrite 처리는 엄격히 금지합니다.
- 데이터베이스 비밀번호, 접속 주소(`DATABASE_URL`)의 로그 내 평문 출력을 절대 금지합니다.

## 18. 테스트 전략
다음 시나리오들이 향후 테스트에 반드시 포함되어야 합니다:
1. payload schema invalid이면 실패
2. FinalApproval 없음이면 실패
3. FinalApproval inactive이면 실패
4. FinalApproval expired이면 실패
5. Job not APPROVED이면 실패
6. READY item 없음이면 실패
7. payloadHash mismatch이면 실패
8. validationSnapshotHash mismatch이면 실패
9. idempotencyKey 중복이면 중복 실행 차단
10. MOCK mode 정상 처리
11. DRY_RUN_READY mode 정상 처리
12. LIVE mode는 별도 승인 전까지 차단
13. 실패 시 Naver API 호출 없음
14. 실패 시 EXECUTING 전환 없음
15. 실패 시 DB write 최소화 또는 별도 승인 필요

## 19. 실제 구현 전 승인 필요 항목
- BullMQ Redis 인프라 접속 설정(운영/개발)
- 최종 멱등성 및 원자적 DB 락 업데이트 방식
- Naver API LIVE 호출 어댑터 구현

## 20. 다음 구현 순서
1. 실제 BullMQ Adapter / Redis 인프라 구축
2. Worker Consumer 모듈(껍데기 로직 및 검증 파이프라인) 스켈레톤 구현
3. 모의(Mock) Processor 테스트 코드 작성
4. 상태 전환(EXECUTING) 구현 (별도 설계/승인 후)
