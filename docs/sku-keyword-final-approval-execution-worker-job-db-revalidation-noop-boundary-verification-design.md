# FinalApproval Execution Worker Job DB Revalidation + No-Op Execution Boundary Verification Design

## 1. 작업 목적
Worker가 실제 `FinalApproval` ID를 넘겨받는 다음 검증 단계로 진행하기 앞서, **DB Revalidation** 및 **No-Op Execution Boundary**에 대한 검증 절차, 성공 및 실패 기준을 명확하게 문서화하여 안전한 테스트 환경을 설계하는 것을 목적으로 합니다.

## 2. 현재 완료 상태 요약
- **Worker Entrypoint Enabled Mode**: 정상 시작 확인 (`Worker started successfully`)
- **Queue/Job Name**: `final-approval-execution` / `sku-keyword-final-approval-execution`
- **Job ID**: `test-worker-entrypoint-noop-001`
- **Consumption 결과**: No-Op 상태(테스트 식별자 전달 등) 처리 후 Job 최종 상태 `completed` 달성
- 운영 시스템 접근 없음(운영 Redis/DB 사용 안 함, Naver API 호출 없음, 상태 변경 없음)

## 3. 이번 검증 설계가 필요한 이유
Worker가 Job payload를 온전히 받아들인 이후, 운영 환경으로 넘어갈 때 발생할 수 있는 부수 효과(Side-effect)를 차단하기 위함입니다. DB 데이터를 읽어 재검증하는 시점과 그 이후 실제 변경을 발생시키는 분기점(Boundary)을 명확하게 구분하여 테스트 안정성을 확보합니다.

## 4. No-Op Job Consumption 검증과 이번 단계의 차이
- **이전 단계**: Worker가 Queue에 등록된 빈(또는 식별자 위주) No-Op Job을 꺼내어(Consume) 종료하는 동작 자체만을 검증
- **이번 단계**: 의미 있는 payload(`finalApprovalId`)를 받아 테스트 DB에서 해당 레코드를 실제로 **조회(Read)하여 유효성 검사(Revalidation)**를 수행하되, 실제 DB 수정이나 API 호출 전(No-Op Boundary)에 안전하게 멈추도록 설계 및 검증

## 5. DB Revalidation의 역할
Redis Queue에서 전달받은 payload는 큐 대기 시간 동안 DB의 최신 상태와 달라질 가능성이 있습니다(Stale data). 따라서 DB Revalidation은 Job을 처리하기 직전에 최신 `FinalApproval` 상태를 테스트 DB에서 다시 읽어와 처리 가능한 상태(`APPROVED` 등)인지 확인하는 필수 절차입니다.

## 6. No-Op Execution Boundary의 의미
DB Revalidation을 마친 후, 시스템이 본격적으로 상태를 `EXECUTING`으로 변경하거나 Naver API를 호출하기 **직전**의 분기점을 의미합니다. 이 경계에서 처리를 멈추게 함으로써(No-Op 전환) 부작용을 원천 차단하는 안전장치 역할을 합니다.

## 7. 검증 범위
- 테스트 Redis Queue에서 payload 정상 수신
- 전달받은 `finalApprovalId`를 기반으로 테스트 PostgreSQL에서 데이터 Read 수행
- DB Read 결과에 따른 Revalidation (성공/실패 분기 처리)
- Revalidation 성공 시 No-Op Boundary에서 로직 중단 확인

## 8. 검증 제외 범위
- DB 데이터 생성(Create) 및 상태 갱신(Update) 처리
- `EXECUTING` 상태 전환 프로세스
- 실제 외부 Naver API 통신 연동 여부

## 9. 테스트 Redis 전제 조건
- 포트 `56379` 등 테스트 환경으로 분리된 로컬 Redis 서버 사용
- 다른 운영 데이터나 타 시스템 큐에 영향을 주지 않아야 함

## 10. 테스트 PostgreSQL 전제 조건
- 포트 `55432` 등 격리된 로컬 테스트 DB 사용
- 읽기 전용 쿼리만 수행될 것

## 11. 테스트 FinalApproval 데이터 전제 조건
- 테스트 DB 내에 Revalidation을 위한 더미(Dummy) `FinalApproval` 데이터가 미리 존재해야 함
- 데이터가 존재하지 않을 경우, 이번 검증 실행 전에 별도의 테스트 데이터 Seed 및 Design 문서를 선행 작성할 것

## 12. 실제 운영 FinalApproval ID 사용 금지 원칙
- 실제 서비스의 운영 DB에 존재하는 `finalApprovalId`는 절대 Queue payload에 포함시키지 않습니다.

## 13. 테스트용 FinalApproval ID 후보 생성 방식
- UUIDv4 또는 접두사를 활용해 명확히 테스트 식별자임을 알 수 있는 형태 생성 (예: `test-db-revalidation-...`)

## 14. Queue payload 후보
```json
{
  "finalApprovalId": "test-db-revalidation-final-approval-001",
  "actorId": "test-actor",
  "idempotencyKey": "test-worker-db-revalidation-noop-001",
  "requestedAt": "ISO timestamp",
  "source": "worker-db-revalidation-noop-boundary-verification",
  "mode": "dry-run"
}
```

## 15. Worker consume 기대 결과
- Queue로부터 정상적으로 위 payload를 획득함
- `finalApprovalId`를 추출하여 DB 조회를 시도함

## 16. DB read 허용 범위
- 테스트 DB에 한하여 `FinalApproval` 레코드 조회를 위한 SELECT 쿼리만 허용됨

## 17. DB write 금지 범위
- 어떠한 상황에서도 레코드를 생성(INSERT), 수정(UPDATE), 삭제(DELETE)하는 작업은 철저히 금지됨

## 18. EXECUTING 전환 금지 기준
- DB Revalidation이 성공하더라도 상태를 `EXECUTING`으로 업데이트하는 코드는 실행되지 않거나, 실행 전 분기되어야 함

## 19. Naver API 호출 금지 기준
- DB 상태 검증을 통과하더라도 Naver 연동 API 등 외부 네트워크 요청으로 넘어가는 로직은 차단되어야 함

## 20. 성공 기준
- Worker가 Job을 처리하는 동안 테스트 DB에서 해당 ID의 조회를 시도함을 로그로 남김
- 이후 Boundary 제한에 걸려 상태 변경이나 외부 호출 없이 안전하게 Job을 종료(Completed)함

## 21. 실패 기준
- 프로세스가 죽거나 처리되지 못함
- DB write 시도 흔적이 발견됨
- 외부 API 호출 시도가 로깅/탐지됨
- `EXECUTING` 상태로 업데이트되는 등, No-Op 경계가 무너짐

## 22. 보안 점검 항목
- 코드, 로그 등에 DATABASE_URL / REDIS_URL / 비밀번호 / secret 관련 원문 데이터가 출력되지 않았는지 확인
- 운영 DB / Redis의 연결점이 남아있지 않은지 검증

## 23. 실제 실행 전 체크리스트
- 테스트 PostgreSQL 데이터베이스 가동 상태 확인
- 지정된 `finalApprovalId` 데이터가 테스트 DB에 존재하는지 점검
- 테스트 Redis 구동 확인

## 24. 현재 금지 범위
본 단계는 **설계 목적의 문서 작성 단계**입니다. 다음 사항을 엄격히 금지합니다:
- 실제 코드, 환경 변수 등 변경
- Worker 실행 및 Queue enqueue 조작
- 실제 DB Read, Write

## 25. 다음 단계 제안
본 설계 문서 내용을 바탕으로, 테스트 DB에 적절한 `finalApprovalId` Seed 데이터가 존재하는지 확인한 후(필요시 Seed Design 문서 작성), 본격적인 DB Revalidation 검증(Worker 실행 및 payload 전달)을 진행할 것을 제안합니다.
