# FinalApproval UI POST 흐름 Docker 테스트 DB 검증 절차

## 1. 절대 안전 원칙

- 운영 NAS DB에서 UI POST 테스트 금지
- 운영 DB write 금지
- 운영 DB에서 FinalApproval 생성 버튼 클릭 금지
- Docker PostgreSQL 테스트 DB에서만 POST 검증
- DATABASE_URL은 PowerShell 세션 환경변수로만 설정
- .env 수정 금지
- DATABASE_URL 원문 출력 금지
- prisma db push 금지
- prisma migrate dev/reset 금지

## 2. 테스트 목적

- Draft Batch 상세 화면에서 FinalApproval 생성 버튼이 조건 충족 시 활성화되는지 확인
- 확인 모달에서 사용자가 명시적으로 클릭한 경우에만 POST가 발생하는지 확인
- POST 성공 후 FinalApproval GET 목록이 재조회되는지 확인
- ACTIVE FinalApproval 생성 후 버튼이 다시 비활성화되는지 확인
- 네이버 API, Worker, EXECUTING 전환, Job/Item status 변경이 전혀 없는지 확인

## 3. 테스트 DB 준비 절차

Docker 테스트 DB 실행 절차입니다.

```powershell
docker run --name tms-final-approval-test-postgres `
  -e POSTGRES_USER=tms_test `
  -e POSTGRES_PASSWORD=tms_test_password `
  -e POSTGRES_DB=tms_final_approval_test `
  -p 55432:5432 `
  -d postgres:18
```

테스트 DB 환경변수 설정:

```powershell
$env:DATABASE_URL = "postgresql://tms_test:tms_test_password@localhost:55432/tms_final_approval_test?schema=public"

if ($env:DATABASE_URL -notlike "*localhost:55432*") {
  throw "Refusing to run: DATABASE_URL is not the local Docker test DB"
}
```

migration 적용:

```powershell
npx.cmd prisma migrate deploy
npx.cmd prisma migrate status
```

> **주의:**
> - `prisma db push`는 절대 사용하지 않습니다.
> - `prisma migrate deploy`는 localhost:55432 테스트 DB에만 실행합니다.

## 4. 테스트 seed 준비 방향

테스트용 데이터를 위해 아래 조건을 만족하는 seed를 준비해야 합니다.

필요한 seed 조건:
- APPROVED 상태의 Batch Job
- READY 상태의 Batch Item
- requestPayload.candidate 존재
- requestPayload.dryRunItem 존재
- 24시간 이내 NAVER_PRODUCT_COLLECTION 검증 문맥 존재
- ACTIVE FinalApproval이 아직 없는 상태

> **중요:**
> - API route가 jobId UUID 형식을 요구하므로, seed jobId는 반드시 UUID 형식이어야 합니다.
> - `TEST_PREFIX`는 `id`가 아니라 marker/description/requestPayload에만 사용해야 합니다.
> - 기존 운영 DB 데이터를 복사하지 마세요.
> - 운영 DB dump를 테스트에 사용하지 마세요.
> - 테스트 전용 최소 seed만 사용하세요.
> - seed 구현은 다음 단계에서 별도 승인 후 진행하세요.

## 5. Next.js dev server 실행 절차

- dev server 실행 전 DATABASE_URL이 localhost:55432인지 확인
- .env를 수정하지 않고 PowerShell 세션 환경변수만 사용
- 같은 PowerShell 세션에서 npm run dev 실행

예시:

```powershell
if ($env:DATABASE_URL -notlike "*localhost:55432*") {
  throw "Refusing to start dev server: DATABASE_URL is not the local Docker test DB"
}

npm run dev
```

## 6. UI 수동 검증 체크리스트

- Draft Batch 상세 화면이 테스트 DB 데이터로 로딩되는가?
- FinalApproval 섹션에 artifact 없음 상태가 표시되는가?
- Batch APPROVED / Item READY 조건이 충족되어 보이는가?
- 최종 승인 Artifact 생성 버튼이 활성화되는가?
- 버튼 클릭 전에는 POST가 발생하지 않는가?
- 클릭 시 확인 모달이 열리는가?
- 모달의 취소 버튼은 POST 없이 닫히는가?
- 모달의 최종 생성 버튼 클릭 시에만 POST가 발생하는가?
- 성공 메시지가 표시되는가?
- 성공 후 GET 목록이 재조회되는가?
- ACTIVE FinalApproval이 표시되는가?
- 생성 후 버튼이 다시 비활성화되는가?
- 두 번째 생성 시 409 또는 UI 차단이 되는가?

## 7. 금지 동작 확인 체크리스트

- 네이버 API 호출 없음
- Worker 호출 없음
- 실행 API 호출 없음
- EXECUTING 전환 없음
- Job status 변경 없음
- Item status 변경 없음
- FinalApproval 생성 외 DB write 없음
- 운영 DB 접속 없음
- 운영 DB write 없음

## 8. 테스트 후 정리

```powershell
docker rm -f tms-final-approval-test-postgres
docker ps -a
```

## 9. 다음 단계 제안

1. 테스트 전용 seed script 설계
2. Docker 테스트 DB에서 UI POST 수동 검증 실행
3. UI POST 검증 결과 문서화
4. 운영 환경에서는 gate 설정과 승인자 정책 확정 전까지 POST 버튼 사용 금지
