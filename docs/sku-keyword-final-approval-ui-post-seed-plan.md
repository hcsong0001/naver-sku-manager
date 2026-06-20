# FinalApproval UI POST 검증용 Docker 테스트 seed script 설계

## 1. seed 목적
- Docker PostgreSQL 테스트 DB에서 Draft Batch 상세 화면을 테스트 데이터로 로딩
- 조건부 FinalApproval 생성 버튼 활성화 확인
- 확인 모달에서 명시적 클릭 시에만 POST 발생 확인
- POST 성공 후 ACTIVE FinalApproval 표시 확인
- 두 번째 생성이 UI 또는 서버에서 차단되는지 확인
- 네이버 API, Worker, EXECUTING, Job/Item status 변경이 없는지 확인

## 2. seed 대상 데이터
테스트를 위해 다음의 최소 데이터 조건을 준비합니다.

### 필수
- Smartstore 또는 테스트용 store 식별 데이터(schema 기준)
- APPROVED 상태의 NaverApiBatchJob 1개
- READY 상태의 NaverApiBatchJobItem 1개 이상
- Batch Job type/context가 SKU keyword final approval 흐름과 맞는지 확인
- requestPayload.candidate 존재
- requestPayload.dryRunItem 존재
- 24시간 이내 NAVER_PRODUCT_COLLECTION 검증 문맥 존재
- ACTIVE FinalApproval이 없는 초기 상태

### 추가 시나리오
- ACTIVE FinalApproval이 이미 있는 Job
- READY가 아닌 Item이 포함된 Job
- APPROVED가 아닌 Job
- validation context가 24시간 초과된 Job

## 3. seed script 후보 파일
- `scripts/seed-final-approval-ui-post-test.ts`
(기존 프로젝트 script 구조에 따라 적절한 위치 조정 가능)

## 4. seed 실행 안전장치
seed 실행 전 반드시 다음 guard 로직을 통과해야 합니다.
- `process.env.DATABASE_URL`이 `localhost:55432`를 포함하지 않으면 즉시 중단
- `NODE_ENV`가 `production`이면 즉시 중단
- 운영 DB host/name 패턴이 보이면 즉시 중단
- .env 수정 금지
- DATABASE_URL 원문 출력 금지
- 실행 전 현재 DB가 테스트 DB인지 확인
- seed는 idempotent하게 설계
- 기존 운영 데이터와 충돌하지 않는 test prefix 사용

**예시 guard 로직:**
```ts
if (!process.env.DATABASE_URL?.includes("localhost:55432")) {
  throw new Error("Refusing to seed outside local Docker PostgreSQL test DB");
}
```

## 5. seed 데이터 식별자 정책
기존 데이터와의 충돌을 막기 위해 아래의 식별자 prefix를 사용합니다.

**Prefix:** `TMS_FINAL_APPROVAL_UI_POST_TEST`

**적용 위치:**
- item payload marker
- test-only SKU / name / code 가능 필드

> **중요:**
> - API route가 jobId UUID 형식을 요구합니다.
> - 따라서 seed jobId는 반드시 UUID 형식이어야 합니다.
> - `TEST_PREFIX`는 `id`가 아니라 marker/description/requestPayload에만 사용합니다.

## 6. cleanup 정책
테스트를 반복 실행할 수 있도록 idempotent한 cleanup 정책을 적용합니다. (반드시 localhost:55432 테스트 DB에서만 실행)

- 같은 prefix의 기존 FinalApprovalItem 삭제
- 같은 prefix의 기존 FinalApproval 삭제
- 같은 prefix의 기존 BatchJobItem 삭제
- 같은 prefix의 기존 BatchJob 삭제
- 필요한 경우 관련 validation context/test product 데이터 삭제
- 외래키 순서를 지켜 삭제(자식 -> 부모)

## 7. seed 후 기대 상태
seed script 실행 후 데이터베이스 및 시스템은 다음 상태를 보장해야 합니다.

- Draft Batch 상세 화면 URL에 접근 가능한 jobId 출력 또는 문서화
- Batch 상태 APPROVED
- 모든 item READY
- ACTIVE FinalApproval 없음
- FinalApproval 생성 버튼 활성화 가능
- 생성 전 FinalApproval 목록은 `[]`

## 8. 수동 UI POST 검증 연결
**검증 흐름:**
1. dev server를 localhost:55432 DATABASE_URL로 실행
2. seeded job detail page 접근 (예: `http://localhost:3000/dashboard/sku-keyword-draft-batches/f93e3d48-8df0-4b5b-b9f4-123456789abc`)
3. FinalApproval 섹션 artifact 없음 확인
4. 버튼 활성화 확인
5. 모달 열기
6. 취소 버튼은 POST 없이 닫힘 확인
7. 다시 모달 열기
8. 최종 생성 버튼 클릭
9. 성공 메시지 확인
10. ACTIVE artifact 표시 확인
11. 버튼 비활성화 확인
12. 두 번째 생성 차단 확인

## 9. 금지 동작
- seed script에서 네이버 API 호출 금지
- seed script에서 Worker 호출 금지
- seed script에서 실행 API 호출 금지
- seed script에서 EXECUTING 전환 금지
- seed script에서 운영 DB 접속 금지
- seed script에서 운영 DB write 금지
- seed script에서 .env 수정 금지
- prisma db push 금지
- prisma migrate dev/reset 금지

## 10. 다음 구현 단계 제안
1. seed script 구현
2. Docker 테스트 DB에 migrate deploy 후 seed 실행
3. dev server를 테스트 DB DATABASE_URL로 실행
4. UI POST 수동 검증 실행
5. 결과 문서화
