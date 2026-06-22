# FinalApproval Execution Worker DB Revalidation Test Fixture Read-Only Discovery Design

## 1. 작업 목적
Worker Job DB Revalidation(실제 검증) 단계를 수행하기 전에, 테스트 PostgreSQL DB에 안전하게 활용할 수 있는 `FinalApproval` 테스트 데이터(Test Fixture)가 존재하는지 확인하기 위한 읽기 전용(Read-Only) 점검 절차를 문서화합니다.

## 2. 현재 완료 상태 요약
- **Worker Entrypoint Enabled Mode**: 큐 소비(Consumption) 및 No-Op 상태 종료 확인
- **DB Revalidation + No-Op Execution Boundary 설계**: 검증 범위 및 성공/실패 기준 문서화 완료
- 운영 DB/Redis 접근 금지, API 호출 및 상태 전환 금지 원칙 유지 중

## 3. 이 단계가 필요한 이유
DB Revalidation 단계에서는 전달받은 Job payload의 `finalApprovalId`를 가지고 실제 DB 조회를 수행해야 합니다. 조회 대상 데이터가 없으면 검증 자체가 성립하지 않으며, 임의의 데이터를 잘못 선택하면 예상치 못한 로직을 트리거할 수 있습니다. 따라서 안전한 테스트 데이터를 사전에 탐색하여 선별하는 과정이 반드시 필요합니다.

## 4. 실제 DB Revalidation 검증 전 위험 요소
- 운영 환경 데이터 노출 및 변경 위험
- 잘못된 테스트 데이터 사용으로 인한 의도치 않은 상태 전이(Executing 등)
- 데이터 부재 시 Worker가 계속해서 실패(Failed) 상태에 빠짐

## 5. 테스트 DB와 운영 DB 구분 원칙
- 본 점검은 **테스트 PostgreSQL (localhost:55432)**만을 대상으로 합니다.
- 어떠한 경우에도 운영 DB 환경의 URL(DATABASE_URL)은 문서에 기록하지 않으며 접근하지 않습니다.

## 6. 읽기 전용 점검 범위
- 테스트 PostgreSQL 데이터베이스 내 `FinalApproval` 관련 테이블 스키마 및 레코드 조회(SELECT)
- 데이터의 ID, 상태(status) 등 Revalidation 조건 부합 여부 확인

## 7. 읽기 전용 점검 제외 범위
- Worker 큐 메시지 생산 및 소비
- `finalApprovalId`를 통한 갱신 로직 실행
- Naver API 통신 등 외부 호출 모듈

## 8. 허용되는 DB 작업
- 다음 실행 단계에서 SELECT 쿼리 등 읽기 전용 명령어(`prisma db pull`, `prisma studio`, 읽기 쿼리 스크립트 등) 수행만 허용됩니다.

## 9. 금지되는 DB 작업
- INSERT, UPDATE, DELETE, TRUNCATE 조작
- `prisma migrate dev`, `prisma db push`, `prisma migrate reset` 등 스키마/데이터 파괴적 명령어
- Worker 실행, Queue Job enqueue 연동

## 10. 확인해야 할 테이블 후보
- `FinalApproval` (또는 해당하는 모델 테이블)
- 상태값, 참조 키 등 유효성 검증을 위한 관련 테이블 데이터

## 11. FinalApproval 테스트 데이터 존재 여부 확인 기준
- 테이블에 적어도 하나 이상의 레코드가 존재하는가?
- 상태값이 Revalidation에서 성공적으로 조회 및 진행될 수 있는 유효한 상태(예: `APPROVED`, `PENDING` 등)인가?

## 12. 테스트 Job payload에 사용할 수 있는 finalApprovalId 선정 기준
- 테스트 DB 내에 존재하는 데이터여야 함
- 명확한 테스트 식별자(예: uuid, 혹은 `test-` 접두사가 포함된 ID)를 권장
- 조회 후 상태 변화 테스트에 안전하게 사용할 수 있는 더미 데이터

## 13. 실제 운영 finalApprovalId 사용 금지 원칙
- 조회 및 발견된 어떠한 데이터도 운영 환경의 ID가 아님을 교차 확인해야 하며, 운영 데이터를 테스트 payload로 사용하는 것은 엄격히 금지됩니다.

## 14. 테스트 데이터가 없을 때의 처리 방침
- 조회 결과 적합한 데이터가 없더라도 즉시 데이터를 생성(INSERT)하지 않습니다.
- 데이터 생성의 부작용을 막기 위해 **별도의 Seed 설계 문서**를 먼저 작성하고 논의를 진행합니다.

## 15. 테스트 데이터가 있을 때의 다음 단계
- 조건에 맞는 식별자(`finalApprovalId`)를 안전하게 선별하여, 이후 DB Revalidation 검증 단계의 Payload로 확정 및 적용합니다.

## 16. 보안 점검 항목
- 연결 문자열, 비밀번호, Secret 등 환경 변수 노출 방지
- DATABASE_URL 원문 기록 금지
- 테스트 DB에 한정된 권한 및 포트 사용 점검

## 17. 실제 조회 전 체크리스트
- `.env` 내의 DB 주소가 `localhost:55432`로 설정되어 있는지 점검
- 서버 애플리케이션 및 Worker 프로세스가 정지(중단) 상태인지 확인

## 18. 성공 기준
- 읽기 전용(SELECT) 작업만으로 테스트 데이터의 유무와 적합성을 판별해 냄
- DB 쓰기(Write) 작업이나 Worker 동작 없이 안전하게 확인 완료

## 19. 실패 기준
- 테스트 과정 중 INSERT, UPDATE, DELETE 등이 발생함
- 운영 DB에 연결되거나 운영 데이터가 노출됨
- 상태 전환 등 의도치 않은 쓰기 로직이 발동됨

## 20. 다음 단계 제안
- 본 문서의 설계 및 점검 기준을 바탕으로, 실제 테스트 DB 조회 쿼리(또는 스크립트)를 읽기 전용 모드로 실행하여 테스트 픽스처(Test Fixture)의 상태를 점검하는 단계를 진행할 것을 제안합니다.
