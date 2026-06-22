# FinalApproval Execution Worker Execution Transition Guard Design

## 1. 작업 목적
Worker가 DB Revalidation을 통과한 직후 실제 실행(Execution) 단계로 넘어가는 과정에서, EXECUTING 상태 전환과 DB Write를 안전하게 통제하고 위험 요소를 사전에 차단하기 위한 **Transition Guard(전환 보호) 규칙**을 명확히 정의합니다.

> [!IMPORTANT]
> - **현재 단계에서는 EXECUTING 전환을 실제로 수행하지 않습니다.**
> - **현재 단계에서는 DB write를 실제로 수행하지 않습니다.**
> - **현재 단계에서는 Naver API 호출을 실제로 수행하지 않습니다.**

## 2. 현재 완료 상태 요약
- Worker DB Revalidation No-Op 검증이 성공적으로 완료되었습니다.
- Job (`test-worker-db-revalidation-noop-001`)이 Enqueue 되고 Worker에 의해 문제 없이 Consume 되었습니다.
- DB 상태는 변경 없이 안전하게 유지(`APPROVED`, `READY`, `ACTIVE`) 되었으며 `EXECUTING` 전환이나 Naver API 호출 없이 정상(`completed`) 처리되었습니다.

## 3. 이 설계가 필요한 이유
- Worker가 단순히 상태를 검증하는 것(Read-only Revalidation)을 넘어, **상태를 변경(Write)** 하고 **외부 시스템(Naver API)과 연동**을 시도하는 경계선이기 때문입니다.
- 단 한 번의 잘못된 상태 전이가 전체 Batch 데이터의 정합성을 훼손할 수 있으며, 의도치 않은 라이브 연동 사고를 예방하기 위한 최후의 방어선 설계가 필수적입니다.

## 4. DB Revalidation No-Op 검증과 이번 단계의 차이
- **DB Revalidation No-Op 검증**: DB에서 데이터를 읽어와(`SELECT`) 유효성만 확인하고, 이후 어떠한 상태 변경이나 부수 효과(Side-effect)도 발생시키지 않은 채 종료했습니다.
- **Execution Transition Guard 설계**: 유효성 검증을 마친 후, 시스템을 **변경 모드(Write/API Call)** 로 안전하게 넘기기(Transition) 위해 어떤 조건이 완벽히 충족되어야 하는지를 규정합니다.

## 5. EXECUTING 전환의 의미
- 해당 데이터(`Job`, `JobItem`, `FinalApproval`)가 본격적으로 시스템(또는 외부 연동)에 의해 처리 중임을 선언하는 행위입니다.
- 전환과 동시에 해당 리소스는 Lock(잠금) 상태와 유사한 효과를 가져 다른 스레드나 Worker의 중복 개입을 방어합니다.

## 6. EXECUTING 전환이 위험한 이유
- 한 번 `EXECUTING`으로 전환된 상태에서 에러 복구 처리가 미흡할 경우, 영원히 멈춘 상태(Zombie Job)로 남을 수 있습니다.
- 불완전한 상태 검증하에 `EXECUTING`으로 전환하면 처리할 대상이 아닌 데이터가 조작되거나 운영 데이터가 손상될 치명적 위협이 존재합니다.

## 7. EXECUTING 전환 허용 전제 조건
- DB Revalidation 단계가 100% 에러 없이 통과되었을 때만 허용됩니다.
- 환경변수에서 `live` 또는 명확한 허용 `mode`일 때에 한해 허용되며, 그 외에는 Mock이나 Dry-run 로직으로 분기하여야 합니다.
- **EXECUTING 전환은 별도 설계, 별도 pure service, 별도 테스트, 별도 테스트 DB 검증 후에만 허용합니다.**

## 8. EXECUTING 전환 금지 조건
- 상태값 중 하나라도 `ACTIVE`, `APPROVED`, `READY`가 아닌 경우.
- 유효기간(Validation Expires At)이 만료된 경우.
- 예상 해시(Hash) 값과 실제 저장된 해시 값이 불일치하는 경우.

## 9. DB write 허용 전제 조건
- 오직 상태 변경(`READY` -> `EXECUTING`, `ACTIVE` -> `EXECUTING` 등)과 이에 수반되는 명확한 감사(Audit) 로그 저장 목적의 단일/트랜잭션 쿼리일 때만 허용.

## 10. DB write 금지 조건
- Worker가 테스트용으로 구동 중임에도 운영 DB 연결 정보가 주입되어 있을 때 절대 금지.
- 무결성을 보장하지 못하는 Non-Transaction Write는 금지됩니다.

## 11. Worker가 상태 전환 전에 반드시 확인해야 할 항목
- `NODE_ENV`와 `DATABASE_URL`이 테스트용인지 운영용인지 분리 및 검증.
- Revalidation Snapshot과 현재 DB 상태의 동시성 불일치 여부 확인.

## 12. FinalApproval 상태 확인 기준
- `NaverApiBatchFinalApproval.status === 'ACTIVE'`

## 13. BatchJob 상태 확인 기준
- `NaverApiBatchJob.status === 'APPROVED'`

## 14. BatchJobItem 상태 확인 기준
- `NaverApiBatchJobItem.status === 'READY'`

## 15. validationSnapshot / payloadHash / validationExpiresAt 확인 기준
- `payloadHash`가 변조되지 않았는지 검증.
- `validationSnapshotHash`가 원본과 일치하는지 검증.
- `validationExpiresAt` 값이 현재 시각(now) 이후인지 엄격히 검증.

## 16. idempotencyKey 확인 기준
- 요청에 포함된 `idempotencyKey`가 이전에 성공한 처리 내역과 중복되지 않는지 검증.

## 17. 중복 Job 처리 기준
- `idempotencyKey`가 동일한 요청이 다시 들어온 경우, 로직 수행 없이 즉각 No-Op으로 `completed` 처리하여 불필요한 DB Write와 API 호출을 막습니다.

## 18. 실패 시 상태 처리 원칙
- 전환 과정 또는 유효성 검증 중 실패 시, 데이터는 `FAILED` 처리되거나 이전의 안전한 상태(`READY` 등)로 복구되어야 하며 재시도 가능 여부가 명확히 표시되어야 합니다.

## 19. Naver API 호출 전 반드시 막아야 할 경계
- `EXECUTING` 상태 전환이 DB 트랜잭션으로 완벽하게 Commit되기 전에는 절대로 Naver API 호출을 시작해서는 안 됩니다.

## 20. dry-run mode와 live mode 분리 원칙
- **dry-run/no-op mode와 live execution mode를 코드와 환경변수 양쪽에서 분리해야 합니다.**
- **live mode는 마지막 단계까지 금지합니다.**

## 21. 테스트 DB에서만 허용 가능한 다음 검증 범위
- **테스트 DB Fixture ID는 운영 데이터와 혼동되지 않게 유지합니다.**
- 테스트 DB에만 생성된 더미 데이터를 대상으로 `EXECUTING` 전환 코드를 단독 검증.

## 22. 운영 DB에서 절대 금지되는 범위
- 어떠한 형태의 강제 INSERT/UPDATE 쿼리도 콘솔 및 스크립트로 임의 수행 금지.
- 개발 및 테스트 단계에서의 운영 DB 직접 연결 금지.

## 23. 보안 점검 항목
- `DATABASE_URL`, `REDIS_URL` 및 기타 민감한 비밀번호가 코드상 하드코딩되거나 에러 메시지, 로그에 원문 출력되지 않는지 검사.

## 24. 실제 실행 전 체크리스트
- [ ] DB Revalidation Pure Service 작성 완료
- [ ] Transition Pure Service 작성 완료
- [ ] 테스트 DB Fixture 구성 (운영 혼동 방지)
- [ ] 모드(Dry-run/Live) 철저 분리 확인

## 25. 성공 기준
- EXECUTING 상태 전이를 수행하는 코드가 이 문서에 정의된 Guard 조건하에서만 동작하게 설계 완료.
- 허용되지 않은 조건에서 즉각 에러 혹은 No-Op 반환.

## 26. 실패 기준
- Guard 조건을 우회하여 무조건적으로 상태 변경이나 API 호출 로직이 동작하는 경우.
- 민감 정보가 로그로 새어나가는 구조인 경우.

## 27. 다음 단계 제안
- 본 설계 원칙에 입각하여 **FinalApproval Execution Worker Execution Transition Pure Service** 개발 및 유닛 테스트(Unit Test)를 진행하는 것을 제안합니다.
