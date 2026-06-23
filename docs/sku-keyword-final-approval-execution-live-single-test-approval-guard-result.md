# Live 단일 테스트 승인 Guard 구현 결과

## 작업 목표

실제 Naver API 호출 코드를 만들기 전에, 사용자가 "단일 상품 1건에 대해 실제 네이버 상품이
변경될 수 있음을 명확히 확인하는 승인 흐름"을 준비한다.

Live 실행 버튼, Naver API endpoint 호출 코드, access token 발급은 포함하지 않는다.
허용되는 최대 결과: `LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE`

## 구현 파일

| 파일 | 역할 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-live-single-test-approval-guard.service.ts` | 승인 Guard 순수 함수 3개 |
| `src/services/sku-keyword-final-approval-execution-live-single-test-approval-guard.test.ts` | 31개 테스트 케이스 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `liveSingleTestApproval` 필드 응답 추가, targetProductSummary 포함 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | "Live 단일 테스트 승인 준비" UI 섹션 추가 |

## Live 단일 테스트 승인 Guard 기준

### 체크리스트 항목 (11개)

| key | 설명 | 기본 결과 |
|-----|------|-----------|
| `final_approval_exists` | Final Approval 존재 및 ACTIVE | BLOCKED (없거나 ACTIVE 아닌 경우) |
| `batch_job_status` | BatchJob APPROVED / 재실행 차단 | BLOCKED (terminal/executing/미승인) |
| `single_item_count` | item 정확히 1건 | BLOCKED (1건이 아닌 경우) |
| `all_items_ready` | 전체 item READY | BLOCKED (READY 아닌 item 존재) |
| `replay_guard` | 재실행 차단 | BLOCKED (successItems/failedItems > 0) |
| `live_preflight_exists` | Live Preflight Check 결과 존재 | NEEDS_REVIEW (null) / BLOCKED (ready=false) |
| `adapter_mode_safe` | Adapter Mode 확인 | BLOCKED (live/prod/production/operating) |
| `naver_api_not_called` | Naver API 미호출 확인 | WARN (naverApiCalled=true) |
| `naver_api_call_disabled` | naverApiCallAllowed=false (구조적) | 항상 PASS |
| `live_execution_disabled` | liveExecutionEnabled=false (구조적) | 항상 PASS |
| `no_sensitive_info` | 민감 정보 비노출 | 항상 PASS |

### Approval Code

| 코드 | 조건 |
|------|------|
| `LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE` | 구조적 조건 + 전체 acknowledgement 충족 |
| `LIVE_SINGLE_TEST_APPROVAL_PENDING_ACKNOWLEDGEMENT` | 구조적 조건 통과, acknowledgement 미확인 |
| `LIVE_SINGLE_TEST_APPROVAL_BLOCKED` | BLOCKED 항목 1개 이상 |

### 필수 Acknowledgements (6개)

- `CONFIRM_SINGLE_ITEM_ONLY`
- `CONFIRM_TARGET_PRODUCT_REVIEWED`
- `CONFIRM_PAYLOAD_REVIEWED`
- `CONFIRM_NAVER_API_STILL_DISABLED`
- `CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER`
- `CONFIRM_NO_REPLAY_ALLOWED`

API 응답에서 `acknowledgedItems: []`로 고정 (DB 저장 없음). UI에서 목록만 표시.

## UI 표시 내용

- "Live 단일 테스트 승인 준비" 섹션 (Preflight 섹션 바로 아래)
- 승인 준비 단계 안내 (4개 항목)
- 승인 준비 상태 요약 4개 카드
- 대상 item 정보 (상품명, 채널 상품번호, 변경 유형, SKU, 가격/재고 변경 예정)
- 차단 사유 목록
- 항목별 점검 결과 (PASS/BLOCKED/WARN/REVIEW)
- 필수 확인 항목 6개 (requiredAcknowledgements 텍스트 표시)
- "Live 실행 비활성화됨" 배지 + "승인 준비만 가능" 배지
- 다음 단계 안내 문구

## 차단/경고 조건

### 차단 (BLOCKED)
- Final Approval 없거나 ACTIVE 아님
- BatchJob terminal 상태 (EXECUTED/PARTIAL_SUCCESS/FAILED)
- BatchJob EXECUTING 중
- BatchJob APPROVED 아님
- item 수 1건 초과 또는 0건
- READY 아닌 item 존재
- successItems 또는 failedItems > 0 (Replay Guard)
- Live Preflight Check ready=false
- adapterMode가 live/prod/production/operating

### 경고 (WARN)
- naverApiCalled=true

### 항상 NEEDS_REVIEW
- livePreflightResult=null (preflight 결과 없음)

## naverApiCallAllowed=false 유지 여부

**항상 false.** Guard 구현체에서 타입 수준으로 강제됨.

## liveExecutionEnabled=false 유지 여부

**항상 false.** Guard 구현체에서 타입 수준으로 강제됨.

## 검증 결과

```
npx.cmd tsx --test ...live-single-test-approval-guard.test.ts
→ tests 31 / pass 31 / fail 0

npx.cmd tsx --test ...live-preflight-check.test.ts
→ tests 30 / pass 30 / fail 0

npx.cmd tsx --test ...replay-guard.test.ts
→ tests 22 / pass 22 / fail 0

npx.cmd tsx --test ...naver-api-live-safety-gate.test.ts
→ tests 28 / pass 28 / fail 0

npx.cmd tsx --test ...naver-api-adapter-factory.test.ts
→ tests 20 / pass 20 / fail 0

npx.cmd tsc --noEmit → clean
npx.cmd prisma validate → valid
git diff --check → clean
```

## 실제 Naver API 호출 여부

**없음.** 순수 함수만 구현. HTTP 클라이언트/endpoint/token 없음.

## 운영 DB 접근/write 여부

**없음.** acknowledgedItems DB 저장 없음. API 라우트는 read-only.

## schema/migration 변경 여부

**없음.**

## 다음 작업 제안

- Task 14: Live Adapter 실제 구현 검토 (별도 승인 흐름 준비 완료 후)
- 또는: acknowledgedItems를 DB에 저장하는 별도 POST API 구현 (선택적)
- 현재 단계: Live 호출은 여전히 차단, 승인 준비 흐름만 완성된 상태
