# FinalApproval Execution Transition Apply Test DB Fixture Restore Design

## 1. 작업 목적
방금 성공적으로 트랜잭션 검증이 끝난 후, `EXECUTING` 상태로 고착된 테스트 DB 내 Fixture 데이터를 원래의 사전 상태(`APPROVED`, `READY`)로 되돌리는 복구/재시드 절차를 설계하여 다음 검증 주기 또는 테스트를 안전하게 재개할 수 있도록 대비하는 것입니다.

## 2. 현재 fixture 상태 요약
- `NaverApiBatchFinalApproval.status` = `ACTIVE`
- `NaverApiBatchJob.status` = `EXECUTING` (방금 전 검증 스크립트에 의해 변경됨)
- `NaverApiBatchJobItem.status` = `EXECUTING` (방금 전 검증 스크립트에 의해 변경됨)

## 3. fixture 복구가 필요한 이유
테스트가 반복성을 가지기 위해서는, 그리고 향후 연동 테스트나 실패 복구 처리 테스트를 시나리오대로 구동하기 위해서는 픽스처가 항상 기준점(Baseline)인 `APPROVED` / `READY` 상태로 유지되어야 합니다. 그렇지 않으면 재실행 시 사전 상태 불일치(`Pre-condition failed`) 에러로 인해 정상적인 테스트나 시스템 동작 확인이 차단됩니다.

## 4. 복구 대상 fixture ID
- **finalApprovalId**: `test-db-revalidation-final-approval-001`
- **batchJobId**: `test-db-revalidation-batch-job-001`
- **batchJobItemId**: `test-db-revalidation-batch-job-item-001`

## 5. 복구 전 기대 상태
- `NaverApiBatchFinalApproval.status` = `ACTIVE`
- `NaverApiBatchJob.status` = `EXECUTING`
- `NaverApiBatchJobItem.status` = `EXECUTING`

## 6. 복구 후 기대 상태
- `NaverApiBatchFinalApproval.status` = `ACTIVE` 유지
- `NaverApiBatchJob.status` = `APPROVED`
- `NaverApiBatchJobItem.status` = `READY`
- `NaverApiBatchFinalApprovalItem` = 데이터 Write 없음(유지)

## 7. 운영 DB 절대 금지 기준
- 스크립트 내부에서 접속 URL을 파싱하여, 호스트가 `localhost`나 `127.0.0.1`이 아니거나 데이터베이스 명칭에 `test`가 포함되어 있지 않을 경우 복구 스크립트는 즉시 오류를 발생시키고 강제 종료(`process.exit(1)`)해야 합니다.

## 8. 테스트 DB 허용 기준
- 환경 변수 `CONFIRM_TEST_DB_WRITE`가 정확히 `YES_I_UNDERSTAND_TEST_DB_ONLY`로 주입되었을 때, 그리고 접속 타겟이 포트 `55432` 기반의 로컬 컨테이너임이 확인될 때만 복구 작업을 허용합니다.

## 9. DATABASE_URL 보안 기준
- `DATABASE_URL`을 스크립트 코드나 화면 상에 노출하는 `console.log()` 등 원문 출력 동작은 절대적으로 차단해야 하며, 존재 여부만을 Boolean으로 평가하거나 메모리 내 URL 파싱 용도로만 소비해야 합니다.

## 10. docker exec env 사용 금지 기준
- 복구 작업을 비롯한 향후 모든 터미널 작업에서, 보안 상의 이유로 데이터베이스 비밀번호를 알아내기 위한 `docker exec tms-final-approval-test-postgres env` 명령 등은 엄격히 금지됩니다. (이후 패스워드는 사용자 입력 프롬프트 등으로 안전하게 수신하도록 구성합니다.)

## 11. .env / .env.test 열람 금지 기준
- 프로젝트의 로컬 시크릿을 보호하기 위해, `fs` 모듈을 포함한 어떠한 방법으로도 `.env` 또는 `.env.test` 파일을 열거나 파싱하지 않습니다.

## 12. 복구 write 허용 범위 후보
- 대상 BatchJob (`test-db-revalidation-batch-job-001`) 1행 갱신
- 대상 BatchJobItem (`test-db-revalidation-batch-job-item-001`) 1행 갱신

## 13. NaverApiBatchJob EXECUTING -> APPROVED 복구 기준
- `UPDATE` 시 반드시 조건에 `id` 일치와 함께 `status = EXECUTING` 조건을 추가하여 의도치 않은 상태에서의 전이를 방지합니다.

## 14. NaverApiBatchJobItem EXECUTING -> READY 복구 기준
- `UPDATE` 시 반드시 조건에 `id` 일치와 함께 `status = EXECUTING` 조건을 추가하여 복구 대상을 한정합니다.

## 15. NaverApiBatchFinalApproval ACTIVE 유지 기준
- 상위 결재 테이블(`NaverApiBatchFinalApproval`)은 상태가 `ACTIVE`임만 조회/확인하고, 어떠한 업데이트 연산도 적용하지 않고 배제합니다.

## 16. NaverApiBatchFinalApprovalItem write 금지 기준
- `NaverApiBatchFinalApprovalItem` 테이블 대상의 어떠한 `insert`, `update`, `delete` 구문도 실행하지 않습니다.

## 17. transaction 사용 기준
- BatchJob과 BatchJobItem 두 대상 데이터의 복구가 반드시 동시에 일어나도록(하나는 복구되고 하나는 덜 복구되는 상황 방지), Prisma의 단일 `$transaction` 블록 내에서 묶어 실행합니다.

## 18. affected count 검증 기준
- 각 `updateMany` (또는 update) 쿼리의 반환값(`affected count` 또는 `count`)이 정확히 1건인지 점검하고, 0이거나 1을 초과하면 트랜잭션을 중단(throw)시킵니다.

## 19. 사전 상태 불일치 시 중단 기준
- 복구 트랜잭션 진입 전 Select 쿼리를 수행하여, 타겟 상태가 복구 전 기대 상태(5번 항목)와 조금이라도 어긋난다면 "이미 복구되었거나 다른 상태로 오염되었다"고 판단해 에러를 던지고 실행을 즉각 중지합니다.

## 20. 복구 후 사후 상태 확인 기준
- 트랜잭션이 성공한 직후, 다시 한번 DB를 조회하여 타겟 상태가 복구 후 기대 상태(6번 항목)와 완벽히 부합하는지 3개 대상 테이블에 걸쳐 대조 확인합니다.

## 21. rollback 기준
- 트랜잭션 실행 중 `affected count` 검증이 실패하거나 예기치 않은 오류가 발생할 경우, Prisma `$transaction`의 고유 기능으로 에러를 캐치함과 동시에 모든 갱신 시도를 자동 롤백시킵니다. 데이터베이스를 수동으로 만지지 않습니다.

## 22. 반복 실행 방지 기준
- 사전 상태(EXECUTING) 확인 로직이 1차 방어선 역할을 하여, 이미 복구된 데이터에 대해 두 번 실행하면 사전 상태 불일치로 안전하게 차단됩니다.

## 23. 복구 스크립트 후보
- 파일명: `scripts/restore-final-approval-test-db-fixture.ts`
- 역할: 위 4번~22번 규칙을 총망라하여 독립적으로 구동되는 복구용 스크립트를 신규 작성.

## 24. 검증 명령 후보
- 정적 분석 및 테스트 확인용 (DB 쓰기 없음):
  `npx prisma validate`, `npx prisma generate`, `npx tsc --noEmit`, `git diff --check`, `git status --short` 등.

## 25. 성공 기준
- 스크립트 정상 수행 후 "사후 상태 검증(Post-condition)"을 통과하고 콘솔에 "Fixture Restored Successfully" 메시지가 뜨며 에러 코드 0으로 종료되는 경우.

## 26. 실패 기준
- 사전 상태 불일치, 환경 변수 부재, 운영 DB 타겟 시도 등으로 인해 스크립트가 Error throw와 함께 중도 예외 발생하며 종료 코드 1로 끝나는 경우.

## 27. 다음 단계 제안
- 본 설계 문서의 내용을 검토하여 승인이 확정되면, 실제 복구 로직을 코드로 작성하는 `scripts/restore-final-approval-test-db-fixture.ts` 신규 구현 작업을 제안합니다. (그 후 다시 권한 승인을 득하여 실제 DB 복구를 시도합니다.)
