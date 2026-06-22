# FinalApproval Execution BullMQ Redis Infrastructure Design

## 1. 작업 목적
FinalApproval Execution 프로세스를 비동기 방식으로 분리하기 위해 실제 `BullMQ` 및 `Redis` 인프라를 도입하는 설계 문서를 작성합니다. 본 문서는 API 엔드포인트의 책임과 비동기 Worker의 책임을 명확히 분리하고, 높은 신뢰성의 큐잉/재시도 시스템을 구축하기 위한 가이드라인을 제공합니다.

## 2. 현재 완료된 Queue Route Integration 상태 요약
* DB Read Guard Route Integration 완료
* Queue Enqueue Port 구현 완료
* API Queue Enqueue Orchestration 구현 완료
* Queue Enqueue Route Integration 구현 완료
* Fake Queue는 `NODE_ENV === 'test'` 및 `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY` 조건에서만 허용
* Docker test DB route integration test 12개 통과
* 실제 BullMQ/Redis/Worker는 아직 없음

## 3. 왜 실제 BullMQ/Redis 인프라가 필요한지
FinalApproval Execution 과정은 많은 양의 아이템 검증 및 외부 API(Naver API) 호출을 포함하므로, HTTP API 요청-응답 주기 내에서 모두 처리하기에는 타임아웃 및 서버 리소스 고갈의 위험이 큽니다.
`BullMQ`를 사용하면 요청을 백그라운드로 안전하게 위임하고, 실패 시 정책에 기반한 자동 재시도 및 중복 실행 방지 기능 등을 제공하여 분산 환경에서도 멱등성을 보장할 수 있습니다.

## 4. Redis 선택지 비교
* **Managed Redis (ElastiCache, Upstash 등):** 고가용성과 백업을 기본 지원하지만 셋업 비용과 권한 관리가 필요.
* **로컬/Docker Redis:** 비용이 들지 않으며 테스트 및 개발에 용이하지만 SPOF(단일 장애점) 우려 존재.
* **결론:** 우선 로컬/Docker Redis를 활용하여 기반 시스템을 구축하고 운영 단계에서 Managed Redis 채택을 고려합니다.

## 5. 로컬 개발용 Redis 구성안
로컬 개발 시 별도의 설치 오버헤드를 최소화하기 위해 Docker Compose를 활용하여 포트포워딩된 Redis 인스턴스를 사용합니다. 데이터 보존은 기본 AOF 설정 수준으로 한정합니다.

## 6. Docker Redis 구성안
운영에 준하는 테스트 환경용으로 Docker 컨테이너 기반 Redis를 실행하며, BullMQ가 요구하는 명령어(`EVAL` 등)가 자유롭게 실행 가능한 버전을 사용합니다.

## 7. 운영용 Redis 구성안
운영 환경과 테스트 환경의 Redis는 완벽히 격리해야 합니다. `REDIS_URL` 환경변수를 통해 운영 접속 포인트를 별도로 구성하며, 보안과 가용성이 확보된 전용 서버나 Managed 서비스를 통해 연결합니다. 

## 8. BullMQ Queue 이름 제안
* **`final-approval-execution`**

## 9. BullMQ Job 이름 제안
* **`sku-keyword-final-approval-execution`**

## 10. Queue payload 구조
Payload에는 최소한의 식별자와 실행 정보만 포함되며, 민감한 데이터나 커다란 본문은 담지 않습니다.
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
*참고: `LIVE` 모드는 아직 금지되며, 향후 후보로만 언급됩니다.*

## 11. jobId / idempotencyKey 정책
중복 실행을 엄격히 방지하기 위해 payload의 `idempotencyKey` 값을 BullMQ `jobId`로 그대로 사용합니다. 이를 통해 동일한 작업이 짧은 시간 내 여러 번 Enqueue 되더라도 BullMQ 레벨에서 1회만 적재됩니다.

## 12. retry 정책
외부 연동 등에서 일시적인 실패를 방어하기 위해 `attempts` 옵션을 통해 최대 3~5회 재시도를 시도하도록 구성합니다.

## 13. backoff 정책
재시도 시 과부하를 방지하기 위해 `type: 'exponential'` 지수 백오프 전략을 채택하고, 일정 딜레이 후 재시도 되도록 설계합니다.

## 14. timeout 정책
각 Job이 무한히 대기하는 것을 막기 위해 명시적인 타임아웃을 설정하며 타임아웃 발생 시 실패로 간주하고 재시도 정책으로 이관합니다.

## 15. removeOnComplete / removeOnFail 정책
* `removeOnComplete`: 불필요한 메모리 점유 방지를 위해 일정 수량(예: 100~500개)이나 기간(예: 24시간) 이후 자동 삭제합니다.
* `removeOnFail`: 문제 추적 및 수동 조치를 위해 비교적 길게(예: 1,000개 이상, 일주일) 보관합니다.

## 16. dead-letter 또는 failed job 관리 정책
재시도 허용 횟수를 초과해 최종 실패한 Job은 Dead-letter 큐 혹은 BullMQ의 `failed` 상태로 남겨집니다. 추후 실패 사유 분석과 관리자 대시보드를 통해 알람 혹은 수동 재실행(Retry)을 수행할 수 있도록 관리 방안을 수립합니다.

## 17. Worker 프로세스 분리 정책
Worker는 API 서버(Next.js)와 분리된 별도 프로세스(스크립트 또는 별도 인스턴스)로 구동될 수 있도록 코드를 설계합니다. 이는 대규모 Job 처리 시 웹 서버의 CPU 부하를 방지하기 위함입니다.

## 18. API route와 Worker 책임 분리
**API route 책임:**
* Feature flag 확인
* JSON parse
* Command validation
* DB Read Guard
* Queue enqueue
* enqueue 성공 시 202 Accepted 반환
* enqueue 실패 시 500 또는 503 반환
* 직접 실행 금지, 직접 EXECUTING 전환 금지, 직접 Naver API 호출 금지

**Worker 책임:**
* Queue Job 수신
* `finalApprovalId` 기준 DB 재조회
* FinalApproval `ACTIVE` 재검증
* Job `APPROVED` 재검증
* Item `READY` 재검증
* `payloadHash` 재검증
* `validationSnapshotHash` 재검증
* `idempotencyKey` 중복 실행 방지
* *(참고: 실제 Naver API 호출은 별도 승인 전까지 금지)*

## 19. 환경변수 설계
다음 환경 변수들을 제어에 활용합니다:
* `ENABLE_FINAL_APPROVAL_EXECUTION`
* `ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE`
* `ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY`
* `REDIS_URL`
* `FINAL_APPROVAL_EXECUTION_QUEUE_NAME`
* `FINAL_APPROVAL_EXECUTION_WORKER_ENABLED`
* `FINAL_APPROVAL_EXECUTION_QUEUE_MODE`

## 20. 보안 정책
* `REDIS_URL` 원문 출력 절대 금지
* DB URL 원문 출력 절대 금지
* 비밀번호, 토큰, secret 출력 절대 금지
* 운영 Redis와 테스트 Redis 환경 분리
* 운영 DB와 테스트 DB 환경 분리
* Queue payload에 민감정보를 절대 포함시키지 않음
* Queue payload에는 처리에 필요한 최소 식별자만 포함

## 21. 테스트 전략
1. Queue Adapter 단위 테스트
2. Fake Queue 기반 route integration test 유지
3. Docker Redis 기반 BullMQ adapter integration test (추후 적용)
4. Worker 로직은 별도 테스트에서 독립적으로 검증
5. 운영 Redis 연결 테스트는 별도 승인 후 진행
6. 실패/재시도/dead-letter 테스트는 별도 단계로 분리

## 22. 운영 적용 전 체크리스트
- [ ] Redis URL 및 연결 보안 검증
- [ ] Worker 프로세스 단독 실행 안정성 검토
- [ ] 메모리 릭 및 타임아웃 예외 처리 점검
- [ ] 실패 Job 알람 및 복구 가이드 마련
- [ ] 운영/테스트 환경 변수 격리 재확인

## 23. 다음 구현 순서
1. 실제 BullMQ/Redis 도입 전 인프라 설계 문서 배포 (본 문서)
2. Worker Job Consumer 설계 문서 추가
3. Queue Job idempotency / retry / dead-letter 세부 정책 문서화
4. 실제 BullMQ 연결 및 Adapter 구현 (별도 승인 후 진행)
