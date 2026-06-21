# FinalApproval Worker Execution Design

이 문서는 추후 구현될 `FinalApproval` 백그라운드 Worker의 실행 아키텍처와 안전장치를 정의하는 설계 보강 문서입니다. 

> [!NOTE]
> **현재 Worker는 구현되지 않았습니다.** 이 문서는 향후 구현 시 준수해야 할 필수적인 원칙과 가드 조건을 규정하기 위한 목적입니다. 실제 네이버 API 호출 코드, 상태 전이(EXECUTING) 코드 등은 현 단계에서 철저히 금지되어 있습니다.

## 1. Worker의 목적
- 대규모 JobItem 목록을 사용자의 UI 세션을 블로킹하지 않고 비동기적으로 처리.
- 순수 함수를 통해 안전하게 빌드된 `FinalApprovalExecutionPlan`을 바탕으로, 실제 Naver 파트너 API와 연동(`Live Adapter`)하여 Side-effect를 안전하게 발생시킴.
- API 호출 결과에 따라 부분 성공(Partial Success), 실패, 재시도 등을 판별하여 데이터베이스 상태를 비동기적으로 전이함.

## 2. Worker가 아직 구현되지 않았다는 명시
현재 저장소에는 Worker 데몬 로직, 크론(Cron) 스케줄러, 메시지 큐(Message Queue), 그리고 실제 Naver API 네트워크 호출 객체가 **전혀 존재하지 않습니다.** 이 문서는 향후 해당 인프라가 도입될 때 지켜야 할 명세서입니다.

## 3. Worker 입력 조건
- 단일 `jobId` 혹은 실행 대기 상태의 `FinalApprovalId`가 Worker의 Trigger Input이 됨.
- 이벤트 객체에는 실행 모드(예: `LIVE`), 트리거한 사용자 ID(Audit 용도) 등이 포함됨.

## 4. FinalApproval 유효성 검증 순서
Worker는 시작 즉시 DB에서 최신 데이터를 읽어 다음 순서로 유효성을 검증해야 합니다:
1. `FinalApproval` 버전이 최신인지(SUPERSEDED가 아닌지) 확인
2. `FinalApproval` 상태가 `ACTIVE` 인지 확인
3. 만료일(`validationExpiresAt`)이 현재 시간 기준으로 지나지 않았는지 확인
4. Payload 및 Snapshot Hash 검증 (7번 항목)

## 5. Job status / Item status 검증 조건
- **Job Status**: 반드시 `APPROVED` 상태여야만 실행 진입이 허용됨. 다른 상태(`DRAFT`, `FAILED`, `EXECUTED` 등)라면 즉시 작업을 중단(Abort)함.
- **Item Status**: 각 하위 `JobItem`들은 반드시 `READY` 상태여야만 함.

## 6. EXECUTING 전환 전 guard 조건
`READY` 상태에서 `EXECUTING` 상태로 전환할 때는 **낙관적 락(Optimistic Lock)** 또는 고유 트랜잭션 조건을 사용하여 동시 실행을 방지해야 합니다.
```sql
-- 논리적 예시
UPDATE JobItem SET status = 'EXECUTING' WHERE id = ? AND status = 'READY';
```
만약 영향받은 row 수가 0이라면 다른 프로세스가 이미 실행 중이거나 취소된 것이므로 해당 아이템 처리를 스킵해야 합니다.

## 7. payloadHash / validationSnapshotHash 검증
순수 함수(`buildFinalApprovalExecutionPlan`) 내에 구현된 해시 무결성 검증을 다시 한번 적용합니다.
- DB에 저장된 `payloadHash` / `validationSnapshotHash` 값과 런타임에 동적으로 산출한 해시값이 정확히 일치해야 합니다. 외부 스키마나 조건이 변경되었다면 즉각 실행을 중단합니다.

## 8. Naver API 호출 전 safety guard
- **환경 변수 차단**: 테스트, 로컬 등 운영 환경이 아닌 곳에서는 Live Adapter의 네트워크 요청 객체가 Mock/Dummy로 우회하도록 구성해야 합니다.
- **Circuit Breaker**: API 연속 오류율이 설정된 임계치를 초과할 시 전체 배치 작업을 일시 정지(Pause)해야 합니다.
- **Rate Limit**: Naver API의 Rate Limit을 회피할 수 있는 안전한 지연(Throttle) 파이프라인(예: 초당 N건 제한)을 설계해야 합니다.

## 9. dry-run adapter와 live adapter의 차이
- **dry-run adapter**: 외부 API를 호출하지 않으며, 단지 로깅과 예상되는 결과의 Plain Object만 반환함. 상태 전이(`EXECUTING`)도 가상으로만 프로젝션함.
- **live adapter**: 외부 API(Naver API)를 실제로 요청(fetch/axios)함. 네트워크 에러, HTTP Status 코드에 따라 성공 여부를 가림. 외부 부수 효과를 실제로 일으킴.

## 10. retry / idempotency 전략
- **Idempotency(멱등성)**: Naver API에 동일한 키워드 업데이트 요청이 반복 전송되더라도 상태가 동일하게 유지되도록 보장해야 함. (예: 이미 적용된 값이라면 API가 성공으로 반환하거나 No-op 처리)
- **Retry**: 5xx 서버 오류나 타임아웃 발생 시 Exponential Backoff 전략으로 재시도함. 4xx 에러(파라미터 오류 등)는 재시도 없이 즉각 실패로 마킹함.

## 11. audit log / execution log 필요성
- 누가, 언제, 어떤 Job을 승인하고 실행을 트리거했는지 남기는 추적성(Audit Log)이 필수.
- Live Adapter를 통한 모든 API HTTP Request/Response (또는 요약 정보)를 Execution Log에 적재하여, 추후 실패 원인 분석이나 CS 대응에 활용해야 함.

## 12. rollback 가능 범위와 한계
- 상품/SKU 키워드 업데이트 API의 특성 상, 한 번 성공한 요청을 완벽하게 원복(Rollback)하는 범용적인 API 트랜잭션은 네이버 측에서 지원하지 않을 확률이 큼.
- 따라서 Worker 수준에서 실패 시 "이전 상태(previewBefore)로 다시 덮어쓰기 호출"을 시도하는 논리적 보상 트랜잭션(Saga/Compensation)을 제한적으로 허용하되, 복구조차 실패할 경우를 대비하여 `Rollback Failed` 상태를 별도 적재해야 함.

## 13. partial success 처리 원칙
대규모 배치 업데이트의 경우 모든 아이템이 100% 성공하지 않을 수 있습니다.
- 하나라도 실패하더라도 성공한 아이템들은 `SUCCESS`로 기록하여 롤백하지 않고 유지합니다.
- Job의 최종 상태는 실패한 아이템이 1건이라도 존재하면 `PARTIAL_SUCCESS` 또는 `FAILED` 로 마킹하여 사용자에게 재시도 기회를 제공해야 합니다.

## 14. 운영 DB 보호 원칙
Worker는 비동기 환경에서 작동하므로 운영 DB에 큰 부하를 주거나 데드락을 유발해서는 안 됩니다.
- 1만 건 단위 대형 배치의 경우, 페이징 처리를 통해 트랜잭션을 분할해야 함.
- 긴 트랜잭션 유지를 금지하며, `SELECT` 시 장기 Lock을 점유하지 않도록 구현해야 함.
- 로컬 개발/테스트 시 `DATABASE_URL` 안전장치(예: `localhost:55432` 확인)가 Worker 환경에서도 동일하게 동작해야 함.

## 15. 다음 구현 전 필요한 승인 항목
- [ ] Worker 실행 프레임워크 선택 (예: BullMQ, AWS SQS, Node.js Agenda 등)
- [ ] Live Adapter 설계 명세서 및 API Payload 스키마
- [ ] 에러 코드(4xx, 5xx)에 따른 Retry 여부 맵핑 규칙 정의
- [ ] 관리자 인터페이스(UI) 측면의 진행률(Progress) 모니터링 방식 결정
