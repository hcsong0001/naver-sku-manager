# FinalApproval UI POST 수동 검증 결과 및 환경변수

## 1. 검증 요약

- **검증 일시**: 2026-06-20
- **검증 환경**: Docker PostgreSQL 테스트 DB `localhost:55432`
- **운영 DB 미사용**: 확인됨
- **seeded jobId**: `f93e3d48-8df0-4b5b-b9f4-123456789abc`
- **detail page URL**: `http://localhost:3000/dashboard/sku-keyword-draft-batches/f93e3d48-8df0-4b5b-b9f4-123456789abc`
- **최종 결과**: 성공

## 2. 사전 조건 (환경변수)

테스트 DB를 대상으로 dev server를 실행할 때, PowerShell 세션에 아래 환경변수를 반드시 설정해야 합니다.

```powershell
$env:DATABASE_URL = "<localhost:55432 테스트 DB URL>"
$env:FINAL_APPROVAL_API_ENABLED = "true"
$env:FINAL_APPROVAL_ACTOR_ID = "system:ui-post-test-user"
```

> **주의**:
> - 문서에 실제 `DATABASE_URL` 원문 전체를 노출하거나 비밀번호를 기록하지 마세요. (위와 같이 마스킹하여 기록)
> - 운영 환경에서는 `.env`에 올바른 `ACTOR_ID`와 함께 배포 시점에 주입되어야 합니다.

## 3. 503 실패 원인

초기 검증에서 API 게이트 로직에 의해 503 Service Unavailable이 발생했습니다. 그 원인과 방지 대책은 다음과 같습니다.

- `FINAL_APPROVAL_API_ENABLED` 환경변수가 `true`가 아니면 503 발생
- `FINAL_APPROVAL_ACTOR_ID` 환경변수가 없거나 정규식 패턴을 통과하지 못하는 유효하지 않은 값이면 503 발생
- dev server를 시작하기 전에, **반드시 동일한 PowerShell 세션에 위 환경변수들을 설정**해야 합니다.

## 4. 성공 검증 체크리스트

UI 수동 검증을 통해 아래 항목들이 모두 정상 작동함을 확인했습니다.

- [x] 페이지 로딩 성공
- [x] `GET /final-approvals` 200 OK
- [x] Initial FinalApproval `none`
- [x] Batch `APPROVED`
- [x] Item `READY`
- [x] 생성 버튼 활성화
- [x] 취소 시 POST 없음
- [x] 최종 생성 버튼 1회 클릭
- [x] `POST` 201 Created
- [x] 성공 메시지 표시 (`FinalApproval artifact가 생성되었습니다. 이 작업은 네이버 API 호출이나 실행 전환을 수행하지 않았습니다.`)
- [x] GET 재조회 성공
- [x] ACTIVE FinalApproval 표시
- [x] 생성 후 버튼 비활성화 (`최종 승인 Artifact 생성 불가`)
- [x] 중복 생성 UI 차단

## 5. 금지 동작 확인

이번 UI 검증 과정에서 아래 항목들이 하나도 발생하지 않았음을 확인했습니다. (안전 원칙 준수)

- [x] 운영 DB 접속 없음
- [x] 운영 DB write 없음
- [x] 네이버 API 호출 없음
- [x] Worker 호출 없음
- [x] 실행 API 호출 없음
- [x] EXECUTING 전환 없음
- [x] Job status 변경 없음
- [x] Item status 변경 없음
- [x] FinalApproval 생성 외 DB write 없음

## 6. 검증 후 상태

- 테스트 컨테이너 정리 완료 (`docker rm -f tms-final-approval-test-postgres` 실행)
- git status clean
- 코드 변경 없음
- 커밋 필요 없음

## 7. 다음 단계 권고

Worker 로직 구현으로 바로 넘어가기 전에, 아래 순서대로 설계를 진행할 것을 권고합니다.

1. **FinalApproval 실행/Worker 설계 문서 작성**
2. **payload 변환 규칙 문서화**
3. **실행 전 dry-run 검증 설계**
4. **네이버 API 호출 adapter는 마지막 단계에서 별도 설계**
