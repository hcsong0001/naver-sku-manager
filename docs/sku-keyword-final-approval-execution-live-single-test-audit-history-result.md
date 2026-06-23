# Live 단일 테스트 승인 감사 이력 조회 구현 결과

## 작업 목표

실제 Live Adapter 구현 전에 지금까지 저장한 Live 단일 테스트 승인 감사 기록을 읽기 전용으로 추적할 수 있는 구조 구현.
이번 작업은 감사 기록 조회 / 이력 확인 기능이며 실행 구현이 아닙니다.

## 구현 파일

| 파일 | 역할 | 신규/수정 |
|------|------|----------|
| `src/services/sku-keyword-final-approval-execution-live-single-test-audit-history.service.ts` | 감사 이력 조회 순수 함수 4개 | 신규 |
| `src/services/sku-keyword-final-approval-execution-live-single-test-audit-history.test.ts` | 32개 테스트 케이스 | 신규 |
| `app/api/sku-keyword-final-approvals/live-single-test-approval-audits/route.ts` | GET 전용 read-only API | 신규 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `liveSingleTestAuditHistory` 필드 추가 | 수정 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 타입 추가, "Live 단일 테스트 승인 감사 이력" UI 섹션 추가 | 수정 |
| `docs/sku-keyword-final-approval-execution-live-single-test-audit-history-result.md` | 결과 문서 | 신규 |

## 감사 기록 조회 방식

Task 14에서 저장된 `NaverApiBatchJob.metadata.liveSingleTestApprovalAudit`을 읽기 전용으로 추출합니다.

```
extractSafeLiveSingleTestAuditHistory(metadata, batchJobId)
→ LiveSingleTestAuditHistoryItem[]
```

- DB write 없음
- HTTP call 없음
- 추출 후 항상 sanitize 적용
- 안전한 필드만 포함 (secret/token/URL 제거)

## 순수 함수 4개

| 함수 | 역할 |
|------|------|
| `sanitizeLiveSingleTestAuditHistoryRecord(raw, batchJobId, index)` | 단일 raw 기록을 sanitize하여 `LiveSingleTestAuditHistoryItem` 반환 |
| `extractSafeLiveSingleTestAuditHistory(rawMetadata, batchJobId)` | metadata에서 안전하게 감사 기록 추출 |
| `summarizeLiveSingleTestAuditHistory(items)` | 이력 요약 생성 |
| `buildLiveSingleTestAuditHistoryItem(input)` | 전체 조회 결과 생성 (주 함수) |

## read-only API 동작 방식

**경로**: `GET /api/sku-keyword-final-approvals/live-single-test-approval-audits`

| 파라미터 | 설명 |
|---------|------|
| `batchJobId` (필수) | 조회할 BatchJob ID |
| `finalApprovalId` (선택) | 특정 FinalApproval ID 필터 |
| `limit` (선택, 기본 10, 최대 50) | 결과 제한 |

응답 예시:
```json
{
  "ok": true,
  "mode": "READ_ONLY_AUDIT_HISTORY",
  "maxAllowedState": "LIVE_APPROVAL_AUDIT_HISTORY_VISIBLE_BUT_NOT_EXECUTABLE",
  "naverApiCallAllowed": false,
  "liveExecutionEnabled": false,
  "operatingDbWriteAllowed": false,
  "queueAllowed": false,
  "workerAllowed": false,
  "batchJobId": "...",
  "batchJobStatus": "APPROVED",
  "exists": true,
  "items": [ ... ],
  "latestAudit": { ... },
  "summary": { "totalRecords": 1, "hasAuditRecord": true, ... },
  "blockingReasons": [],
  "warnings": [],
  "sanitized": true,
  "environmentSafety": { ... }
}
```

HTTP 메서드: GET only. POST/PUT/PATCH/DELETE 없음.
DB 작업: 읽기(SELECT)만 수행. write 없음.

## BatchJob 상세 GET 응답 보강

`GET /api/sku-matching/draft-batch/[jobId]` 응답에 `liveSingleTestAuditHistory` 필드 추가:

```json
{
  "liveSingleTestAuditHistory": {
    "exists": true,
    "latestAudit": { ... },
    "summary": { ... },
    "blockingReasons": [],
    "warnings": [],
    "naverApiCallAllowed": false,
    "liveExecutionEnabled": false,
    "operatingDbWriteAllowed": false,
    "queueAllowed": false,
    "workerAllowed": false,
    "sanitized": true,
    "maxAllowedState": "LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY"
  }
}
```

기존 `liveSingleTestApprovalAudit` 필드와 역할 구분:
- `liveSingleTestApprovalAudit`: 현재 BatchJob의 단일 감사 기록 원본 (Task 14)
- `liveSingleTestAuditHistory`: 이력 조회 요약 구조체 (이번 Task)

## UI에서 표시되는 내용

"Live 단일 테스트 승인 감사 이력" 섹션 (환경 안전 확인 섹션 아래, 실행 결과 섹션 위):

1. **안내 문구**: "이 감사 기록은 승인 확인 이력일 뿐이며 실제 Naver API 호출을 실행하지 않습니다." + "Live 실행은 별도 단계에서 추가 Safety Gate와 명시 승인 후에만 검토합니다."
2. **안전 배지 6개**: Naver API 비활성화, Live 실행 비활성화, 운영 DB write 차단, Queue 비활성화, Worker 비활성화, Secret 비노출
3. **기록 없음 안내** (exists=false일 때)
4. **최신 감사 기록 카드** (exists=true일 때):
   - 승인 코드 / 상태 / 기록 시각 / 승인자
   - BatchJob ID / FinalApproval ID (앞 16자 + … 형식)
   - 대상 상품 정보 (targetProductSummary 안전 필드만)
   - 확인 항목 목록 (체크 완료 / 누락 항목 구분)
   - naverApiCallAllowed/liveExecutionEnabled/operatingDbWriteAllowed/queueAllowed/workerAllowed 배지
5. **경고 목록** (있을 때)
6. **최대 허용 상태**: `LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY`

"Live 실행" 버튼 없음. "승인 후 실행" 버튼 없음. "다시 실행" 버튼 없음.

## Sanitize 기준

제거되는 필드명 패턴: `secret`, `token`, `password`, `authorization`, `credential`, `database`, `redis`, `endpoint`, `clientid`, `clientsecret`, `apikey`, `accesskey`, `privatekey`

제거되는 값 패턴:
- `postgresql://`, `postgres://`, `redis://`, `mysql://`, `mongodb://` 시작
- `://` 포함 + `@` 포함 (credential-bearing URL)

targetProductSummary: `itemId`, `targetType`, `targetId`, `channelProductNo`, `productName`, `skuCode`, `changeType` 명시적 필드만 추출.

safePayloadSummary: `changeType`, `riskLevel` 두 필드만.

## naverApiCallAllowed=false 유지 여부

**항상 false.** 서비스 함수, GET API, BatchJob 상세 응답, UI 배지 전 레이어에서 강제.

## liveExecutionEnabled=false 유지 여부

**항상 false.** 서비스 결과, API 응답, 각 이력 item에서 강제.

## operatingDbWriteAllowed=false 유지 여부

**항상 false.** summary 및 서비스 결과에서 강제.

## queueAllowed=false 유지 여부

**항상 false.** 구조적 강제.

## workerAllowed=false 유지 여부

**항상 false.** 구조적 강제.

## 실제 Naver API 호출 여부

**없음.** HTTP 클라이언트, Naver API endpoint, access token, Live adapter 없음.

## 운영 DB 접근/write 여부

**없음.** 이번 Task에서 DB read(SELECT)는 GET API에서 발생하지만 write는 없습니다.

## schema/migration 변경 여부

**없음.** 기존 `NaverApiBatchJob.metadata Json?` 필드 읽기만 사용.

## Queue / Worker 호출 여부

**없음.** BullMQ, Worker, enqueue 없음.

## 검증 결과

```
audit history tests:            32/32 pass
environment safety guard tests: 39/39 pass (기존)
audit service tests:            35/35 pass (기존)
approval guard tests:           31/31 pass (기존)
preflight check tests:          30/30 pass (기존)
replay guard tests:             22/22 pass (기존)
safety gate tests:              28/28 pass (기존)
adapter factory tests:          20/20 pass (기존)
총:                            237/237 pass

npx.cmd tsc --noEmit  → clean
npx.cmd prisma validate → valid
git diff --check        → clean
```

## 다음 작업 제안

- Task 17: Live Adapter 실제 구현 준비 (별도 Safety Gate 강화 후)
- 또는: 감사 기록 목록 전용 페이지 구현
- 현재 단계: 감사 이력 조회 완료, Live 호출은 여전히 차단 상태
