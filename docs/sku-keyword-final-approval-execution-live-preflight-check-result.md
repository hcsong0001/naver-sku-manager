# Live 단일 테스트 전 점검표 구현 결과

## 작업 목표

실제 Naver API 호출을 구현하거나 실행하기 전에, 사용자가 화면에서 Live 단일 테스트를 위한
모든 선행 조건이 충족됐는지 확인할 수 있는 점검 구조를 구현한다.

실제 Naver API endpoint 호출 코드, access token 발급, Live adapter 구현은 포함하지 않는다.

## 구현 파일

| 파일 | 역할 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-live-preflight-check.service.ts` | Preflight Check 순수 함수 3개 |
| `src/services/sku-keyword-final-approval-execution-live-preflight-check.test.ts` | 30개 테스트 케이스 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `livePreflight` 필드 응답 보강 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | UI에 점검표 섹션 추가 |

## Preflight Check 기준

### 구현된 체크리스트 항목 (10개)

| key | 설명 | 차단 조건 |
|-----|------|-----------|
| `final_approval_exists` | Final Approval 존재 및 ACTIVE 여부 | null이거나 ACTIVE 아닌 경우 |
| `batch_job_not_terminal` | BatchJob 재실행 차단 | EXECUTED / PARTIAL_SUCCESS / FAILED / CANCELLED |
| `batch_job_not_executing` | 동시 실행 차단 | EXECUTING |
| `batch_job_approved` | BatchJob APPROVED 여부 | APPROVED 아닌 경우 |
| `all_items_ready` | BatchJobItem 전체 READY | READY 아닌 항목 있을 때 (terminal/executing 제외) |
| `single_item_only` | 단일 테스트 조건 (1건) | totalItems != 1 |
| `replay_guard` | Replay Guard (재실행 차단) | successItems > 0 또는 failedItems > 0 |
| `live_safety_gate` | Live Safety Gate | 항상 NEEDS_REVIEW (차단이 아님) |
| `adapter_mode_safe` | Adapter Mode 확인 | live/prod/production/operating/bulk/mass |
| `naver_api_not_called` | Naver API 미호출 확인 | naverApiCalled=true면 WARN |
| `execution_mode_safe` | 실행 모드 확인 | executionMode=live면 WARN |
| `no_sensitive_info` | 민감 정보 비노출 | 항상 PASS |

### 체크리스트 항목 상태

| 상태 | 의미 |
|------|------|
| `PASS` | 조건 충족 |
| `WARN` | 주의 필요 (차단은 아님) |
| `BLOCKED` | 조건 불충족 — ready=false 판정 |
| `NEEDS_REVIEW` | 구조적 확인 필요 (Live Safety Gate 등) |

### Readiness Code

| 코드 | 의미 |
|------|------|
| `LIVE_PREFLIGHT_CHECK_READY_BUT_LIVE_CALL_DISABLED` | 구조적 조건 충족, 단 Live 호출은 차단 |
| `LIVE_PREFLIGHT_BLOCKED` | BLOCKED 항목이 1개 이상 존재 |

**`naverApiCallAllowed`는 항상 `false`입니다.**

## UI에서 표시되는 내용

- "Live 단일 테스트 전 점검표" 섹션 (FinalApproval Artifact 섹션 바로 다음)
- 점검 상태 요약 (점검 조건 충족 여부, Naver API 호출 여부, Live 실행 가능 여부, 차단/확인/통과 건수)
- 차단 사유 목록 (BLOCKED 항목의 메시지)
- 항목별 점검 결과 (PASS/BLOCKED/WARN/REVIEW 상태 표시)
- 다음 단계 안내 문구

## 차단/경고 조건

### 차단 (BLOCKED)
- Final Approval이 없거나 ACTIVE가 아닌 경우
- BatchJob이 이미 실행 완료된 terminal 상태
- BatchJob이 현재 실행 중 (동시 실행 방지)
- BatchJob이 APPROVED 상태가 아닌 경우
- READY가 아닌 BatchJobItem이 있는 경우
- totalItems가 1이 아닌 경우 (단일 테스트 조건)
- successItems 또는 failedItems가 0이 아닌 경우 (Replay Guard)
- adapterMode가 live/prod/production/operating인 경우

### 경고 (WARN)
- naverApiCalled=true (실제 Naver API가 호출된 것으로 기록된 경우)
- executionMode가 "live"로 기록된 경우

### 항상 NEEDS_REVIEW
- Live Safety Gate (현재 단계에서 항상 차단 상태 유지)

## 검증 결과

```
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-live-preflight-check.test.ts
→ tests 30 / pass 30 / fail 0

npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-replay-guard.test.ts
→ tests 22 / pass 22 / fail 0

npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-live-safety-gate.test.ts
→ tests 28 / pass 28 / fail 0

npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.test.ts
→ tests 20 / pass 20 / fail 0

npx.cmd tsc --noEmit → clean (오류 없음)
npx.cmd prisma validate → valid
git diff --check → clean (trailing whitespace 없음)
```

## 실제 Naver API 호출 여부

**없음.** 이 작업에서 작성된 코드는 순수 함수로, HTTP 클라이언트, Naver API endpoint,
access token 발급, Live adapter 구현이 전혀 없습니다.

## 운영 DB 접근/write 여부

**없음.** API 라우트에서 기존 BatchJob read에 `finalApprovals` relation을 include하는
read-only 쿼리가 추가되었습니다. DB schema 변경이나 migration은 없습니다.

## 다음 작업 제안

- Task 13: Live Adapter 실제 구현 (실제 Naver API endpoint 호출 — 별도 승인 후)
- 또는: Live 단일 테스트 실행을 위한 추가 승인 흐름 설계
- 현재 단계: Live 호출은 Safety Gate에 의해 계속 차단 상태 유지
