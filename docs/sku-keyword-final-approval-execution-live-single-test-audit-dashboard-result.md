# Live 단일 테스트 승인 감사 대시보드 구현 결과

## 작업 목표

Live 단일 테스트 승인 감사 기록을 여러 BatchJob에 걸쳐 read-only 대시보드로 조회할 수 있는 페이지와 API 확장 구현.
이 작업은 조회/감사 이력 확인 기능이며 실행 구현이 아닙니다.

## 구현 파일

| 파일 | 역할 | 신규/수정 |
|------|------|----------|
| `src/services/sku-keyword-final-approval-execution-live-single-test-audit-dashboard.service.ts` | 대시보드 집계 순수 함수 4개 | 신규 |
| `src/services/sku-keyword-final-approval-execution-live-single-test-audit-dashboard.test.ts` | 23개 테스트 케이스 | 신규 |
| `app/api/sku-keyword-final-approvals/live-single-test-approval-audits/route.ts` | batchJobId 없을 때 dashboard 목록 반환 추가 (Selection A) | 수정 |
| `app/dashboard/sku-keyword-final-approval-live-audits/page.tsx` | read-only 대시보드 페이지 | 신규 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 전체 감사 기록 대시보드 링크 추가 | 수정 |
| `docs/sku-keyword-final-approval-execution-live-single-test-audit-dashboard-result.md` | 결과 문서 | 신규 |

## Dashboard Service 순수 함수 4개

| 함수 | 역할 |
|------|------|
| `buildLiveSingleTestAuditDashboardSummary(items)` | `LiveSingleTestAuditHistoryItem[]`에서 요약 집계 생성 |
| `sanitizeLiveSingleTestAuditDashboardItems(items, limit)` | limit 적용 (1~100 clamp) |
| `evaluateLiveSingleTestAuditDashboardReadiness(input)` | 대시보드 전체 결과 생성 (주 함수) |
| `buildLiveSingleTestAuditDashboardItem(input)` | `evaluateLiveSingleTestAuditDashboardReadiness`의 alias |

### 집계 요약 필드

| 필드 | 설명 |
|------|------|
| `totalCount` | 전체 감사 기록 수 |
| `latestRecordedAt` | 가장 최근 recordedAt |
| `acknowledgedCompleteCount` | missingAcknowledgements.length === 0 인 항목 수 |
| `missingAcknowledgementCount` | ACK 누락 항목 수 |
| `recordedButNotExecutableCount` | status === 'RECORDED_BUT_NOT_EXECUTABLE' 항목 수 |
| `unknownStatusCount` | 그 외 상태 항목 수 |
| (5개 항상-false 플래그) | naverApiCallAllowed, liveExecutionEnabled, operatingDbWriteAllowed, queueAllowed, workerAllowed |

## API 확장 (Selection A)

**경로**: `GET /api/sku-keyword-final-approvals/live-single-test-approval-audits`

### Mode A: batchJobId 있을 때 (기존 동작 유지)

| 파라미터 | 설명 |
|---------|------|
| `batchJobId` (필수) | 조회할 BatchJob ID |
| `finalApprovalId` (선택) | FinalApproval ID 필터 |
| `limit` (선택, 기본 10, 최대 50) | 결과 제한 |

응답:
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
  "summary": { ... },
  "sanitized": true
}
```

### Mode B: batchJobId 없을 때 (신규 — 대시보드 목록)

| 파라미터 | 설명 |
|---------|------|
| `limit` (선택, 기본 50, 최대 100) | 결과 제한 |

동작: 최근 BatchJob을 `limit * 3`건 조회 후 서비스 레이어에서 감사 기록 보유 여부 필터링. DB write 없음.

응답:
```json
{
  "ok": true,
  "mode": "READ_ONLY_AUDIT_DASHBOARD",
  "maxAllowedState": "LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY",
  "naverApiCallAllowed": false,
  "liveExecutionEnabled": false,
  "operatingDbWriteAllowed": false,
  "queueAllowed": false,
  "workerAllowed": false,
  "items": [ ... ],
  "summary": { "totalCount": 5, "acknowledgedCompleteCount": 4, ... },
  "blockingReasons": [],
  "warnings": [],
  "sanitized": true,
  "environmentSafety": { ... }
}
```

HTTP 메서드: GET only. POST/PUT/PATCH/DELETE 없음.
DB 작업: 읽기(SELECT)만 수행. write 없음.

## 대시보드 페이지 (`/dashboard/sku-keyword-final-approval-live-audits`)

### UI 구성 요소

1. **안전 안내 배너**: "Live 단일 테스트 승인 감사 기록 전용 조회 화면" + 실행 비연결 안내
2. **안전 상태 배지 6개**:
   - Naver API 호출 비활성화 (항상 false)
   - Live 실행 비활성화 (항상 false)
   - 운영 DB write 차단 (항상 false)
   - Queue 비활성화 (항상 false)
   - Worker 비활성화 (항상 false)
   - Secret 비노출 (항상 true)
3. **요약 카드 5개**: 전체 감사 기록 수, ACK 완료 수, ACK 누락 수, 최근 기록 시각, maxAllowedState
4. **감사 기록 목록 테이블**: batchJobId별 항목 표시, 상태 배지, ACK 현황, 기록 시각, 승인자, 식별자, 대상 상품 요약
5. **확장 상세**: 클릭 시 acknowledgedItems, missingAcknowledgements, safePayloadSummary, safety flags 표시
6. **BatchJob 상세 링크**: 각 행에서 `/dashboard/sku-keyword-draft-batches/{batchJobId}`로 이동
7. **빈 상태**: 기록 없을 때 안내 + Draft Batch 목록 이동 링크
8. **새로 고침 버튼**: 재조회 (DB write 없음)

"Live 실행" 버튼 없음. "승인 후 실행" 버튼 없음. "재실행" 버튼 없음.

## BatchJob 상세 페이지 수정

"Live 단일 테스트 승인 감사 이력" 섹션 하단에 추가된 항목:

```
[전체 감사 기록 대시보드 →]  (Link: /dashboard/sku-keyword-final-approval-live-audits)
```

## naverApiCallAllowed=false 유지 여부

**항상 false.** 서비스 함수, GET API, 대시보드 페이지 전 레이어에서 강제.

## liveExecutionEnabled=false 유지 여부

**항상 false.** 서비스 결과, API 응답, summary 오브젝트에서 구조적 강제.

## operatingDbWriteAllowed=false 유지 여부

**항상 false.** 서비스 함수, API, 페이지 어디에도 DB write 없음.

## queueAllowed=false / workerAllowed=false 유지 여부

**항상 false.** BullMQ, Worker, enqueue 없음.

## 실제 Naver API 호출 여부

**없음.** HTTP 클라이언트, Naver API endpoint, access token, Live adapter 없음.

## 운영 DB 접근/write 여부

**없음.** DB read(SELECT)만 사용. write 없음.

## schema/migration 변경 여부

**없음.** 기존 `NaverApiBatchJob.metadata Json?` 필드 읽기만 사용.

## Queue / Worker 호출 여부

**없음.**

## 검증 결과

```
dashboard service tests:        23/23 pass
audit history tests:            32/32 pass (기존)
environment safety guard tests: 39/39 pass (기존)
audit service tests:            35/35 pass (기존)
approval guard tests:           31/31 pass (기존)
preflight check tests:          30/30 pass (기존)
replay guard tests:             22/22 pass (기존)
safety gate tests:              28/28 pass (기존)
adapter factory tests:          20/20 pass (기존)
총:                            260/260 pass

npx.cmd tsc --noEmit  → clean
npx.cmd prisma validate → valid
git diff --check        → clean
```
