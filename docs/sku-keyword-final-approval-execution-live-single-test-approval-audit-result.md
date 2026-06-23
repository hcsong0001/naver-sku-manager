# Live 단일 테스트 승인 감사 기록 구현 결과

## 작업 목표

실제 Naver API 호출 전에 사용자가 어떤 위험 문구를 확인했고, 어떤 대상 상품/BatchJob/FinalApproval에 대해 승인했는지 감사 기록(audit trail)으로 남기는 구조를 구현한다.

승인 기록을 저장한 후에도 실제 Naver API 호출은 불가능해야 한다.
허용되는 최대 결과: `LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE`

## 구현 파일

| 파일 | 역할 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-live-single-test-approval-audit.service.ts` | 감사 기록 순수 함수 4개 |
| `src/services/sku-keyword-final-approval-execution-live-single-test-approval-audit.test.ts` | 35개 테스트 케이스 |
| `app/api/sku-keyword-final-approvals/live-single-test-approval/route.ts` | POST API — 승인 기록 저장 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | GET 라우트에 `liveSingleTestApprovalAudit` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | "Live 단일 테스트 승인 기록 저장" UI 섹션 추가 |

## 승인 기록 저장 방식

**선택 A** (기존 metadata 활용) 적용:
- `NaverApiBatchJob.metadata` (Json 필드)에 `liveSingleTestApprovalAudit` 키로 저장
- schema 변경 없음
- migration 없음
- 운영 DB write는 POST API를 통해서만 발생하며, 실행 흐름과 완전히 분리됨

## 순수 함수 4개

| 함수 | 역할 |
|------|------|
| `validateLiveSingleTestApprovalAcknowledgements` | 필수 acknowledgement 충족 여부 검증 |
| `sanitizeLiveSingleTestApprovalAuditPayload` | secret/token/URL/endpoint 제거 |
| `buildLiveSingleTestApprovalAuditRecord` | 감사 기록 생성 |
| `summarizeLiveSingleTestApprovalAudit` | 감사 기록 요약 생성 |

## POST API 동작 방식

**경로**: `POST /api/sku-keyword-final-approvals/live-single-test-approval`

| 조건 | 응답 코드 |
|------|----------|
| `confirmApprovalRecordOnly !== true` | 400 |
| `finalApprovalId` 또는 `batchJobId` 누락 | 400 |
| 필수 acknowledgement 누락 | 400 |
| BatchJob 없음 | 404 |
| ACTIVE Final Approval 없음 또는 ID 불일치 | 409 |
| BatchJob terminal 상태 (EXECUTED/PARTIAL_SUCCESS/FAILED/CANCELLED) | 409 |
| BatchJob EXECUTING | 409 |
| BatchJob APPROVED 아님 | 409 |
| totalItems != 1 | 409 |
| READY 아닌 item 존재 | 409 |
| successItems > 0 또는 failedItems > 0 (Replay Guard) | 409 |
| 모든 조건 통과 | 200 — 감사 기록 저장 완료 |

응답 예시:
```json
{
  "ok": true,
  "approvalRecordStatus": "RECORDED_BUT_NOT_EXECUTABLE",
  "approvalCode": "LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE",
  "naverApiCallAllowed": false,
  "liveExecutionEnabled": false,
  "maxAllowedState": "LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE",
  "auditRecord": { ... },
  "message": "Live 단일 테스트 승인 기록이 저장되었습니다. 실제 Naver API 호출은 아직 비활성화되어 있습니다."
}
```

## GET 응답 보강

`app/api/sku-matching/draft-batch/[jobId]/route.ts`에 `liveSingleTestApprovalAudit` 필드 추가:
- `NaverApiBatchJob.metadata.liveSingleTestApprovalAudit` 에서 읽음
- `extractSafeAuditRecord()` 함수로 안전한 필드만 추출 (secret/URL 제외)
- `naverApiCallAllowed: false`, `liveExecutionEnabled: false` 항상 강제

## UI에서 표시되는 내용

"Live 단일 테스트 승인 기록 저장" 섹션 (기존 "승인 준비" 섹션 바로 아래):

1. 안내 문구 4개 (API 미호출, 실행 불가, 감사 추적용, 모두 체크 필요)
2. Guard 차단 경고 (blockingCount > 0일 때)
3. 필수 확인 체크박스 6개:
   - 단일 상품 1건 확인
   - 대상 상품/payload 직접 확인
   - 현재 Naver API 비활성화 확인
   - 향후 Live 단계에서 상품 변경 가능성 확인
   - 재실행 불가 확인
4. 체크 현황 (N/6)
5. 저장 오류 메시지
6. "승인 기록 저장" 버튼 (실제 Naver API 미호출 명시)
7. 비활성 이유 목록
8. 저장 완료 후: auditCode, recordedAt, actorId, acknowledgedItems 수, 비활성 배지

## 버튼 비활성 조건

- 전체 체크박스 미완료
- Guard.blockingCount > 0
- ACTIVE Final Approval 없음
- 저장 중 (liveAuditSaving)
- 이미 저장 완료 (liveAuditSaveResult 또는 job.liveSingleTestApprovalAudit 존재)

## Audit Code 종류

| 코드 | 조건 |
|------|------|
| `LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE` | 모든 조건 충족 |
| `LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED` | adapter mode live/prod/production/operating |
| `LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS` | 필수 acknowledgement 누락 |

## Sanitize 로직

제거되는 필드명 패턴: `secret`, `token`, `password`, `authorization`, `credential`, `database`, `redis`, `endpoint`, `clientid`, `clientsecret`, `apikey`, `accesskey`, `privatekey`

제거되는 값 패턴:
- `postgresql://`, `postgres://`, `redis://`, `mysql://`, `mongodb://` 시작
- `://` 포함 + `@` 포함 (credential-bearing URL)

## naverApiCallAllowed=false 유지 여부

**항상 false.** 서비스 함수, POST API, GET 응답, UI 표시 모두 강제.

## liveExecutionEnabled=false 유지 여부

**항상 false.** 서비스 함수, POST API, GET 응답, UI 표시 모두 강제.

## 실제 Naver API 호출 여부

**없음.** HTTP 클라이언트, Naver API endpoint, access token, Live adapter 없음.

## 운영 DB 접근/write 여부

POST API에서 `NaverApiBatchJob.metadata` 필드 write 1건 발생.
단, 이는 승인 기록 저장용이며 실행 흐름과 완전히 분리됨.
운영 DB 직접 접근 없음 (Prisma ORM 경유).

## schema/migration 변경 여부

**없음.** 기존 `NaverApiBatchJob.metadata Json?` 필드 활용.

## Queue / Worker 호출 여부

**없음.** BullMQ, Worker, enqueue 없음.

## 검증 결과

```
audit service tests:     35/35 pass
approval guard tests:    31/31 pass
preflight check tests:   30/30 pass
replay guard tests:      22/22 pass
safety gate tests:       28/28 pass
adapter factory tests:   20/20 pass
npx.cmd tsc --noEmit  → clean
npx.cmd prisma validate → valid
git diff --check        → clean
```

## 다음 작업 제안

- Task 15: Live Adapter 실제 구현 준비 (별도 승인 흐름 + Safety Gate 강화 후)
- 또는: 감사 기록 조회 전용 페이지 구현
- 현재 단계: 승인 기록 저장까지 완료, Live 호출은 여전히 차단 상태
