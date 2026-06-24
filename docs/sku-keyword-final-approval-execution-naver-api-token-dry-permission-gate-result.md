# Naver API Token Dry Permission Gate — 작업 결과

## 작업 목표

모든 선행 서비스(Auth Config, Token Provider, Environment Safety, Live Adapter Skeleton, Live Safety Gate, Live Preflight, Single Test Approval Guard, Approval Audit, Audit History, FinalApproval 상태, BatchJob 상태, Item 수/상태)를 취합하여 token 발급 전 dry-run 최종 점검을 수행하는 게이트 서비스를 구현한다.
dryCheckPassed=true여도 이 단계에서 token은 절대 발급되지 않는다.

## 구현 파일

| 파일 | 종류 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service.ts` | 신규 — Dry Permission Gate 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.test.ts` | 신규 — 테스트 (59 케이스) |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | 수정 — `naverAuthTokenDryPermissionGate` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 수정 — Dry Permission Gate UI 섹션 추가 |

## Dry Permission Gate 동작 방식

- `evaluateNaverApiTokenDryPermissionGate(input?)` 호출 시 16개 섹션에 걸쳐 모든 선행 조건을 점검한다.
- 차단 사유가 없고 검토 필요 항목도 없을 때만 `dryCheckPassed=true`이며, 이때 status=`DISABLED`, resultCode=`NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED`가 반환된다.
- 차단 사유가 있으면 status=`BLOCKED`, 검토 필요 항목만 있으면 status=`NEEDS_REVIEW`.
- `sanitizeNaverApiTokenDryPermissionGateResult()`가 최종 패스에서 모든 불변 필드를 강제로 재설정한다.
- 어떤 입력(null/undefined/malformed)도 throw하지 않는다.

## 점검 섹션 목록 (16개)

1. Token 발급 항상 비활성화 (고정 불변)
2. accessTokenRequested=false 유지 (고정 불변)
3. Secret/Token 원문 비노출 (고정 불변)
4. Environment Safety Guard (naverApiCallAllowed=false 확인)
5. Auth Config Safe Reader (authConfigUsable=false 확인)
6. Token Provider disabled 결과 존재 여부
7. Live Adapter Skeleton 상태
8. Live Safety Gate 결과
9. Live Preflight 결과
10. Live Single Test Approval Guard 결과
11. Approval Audit 기록 존재 여부
12. Audit History read-only 결과
13. FinalApproval 상태 (ACTIVE 필수)
14. BatchJob 상태 (APPROVED 필수, EXECUTING/터미널 상태 차단)
15. Item 수 (정확히 1건)
16. Item 상태 (모두 READY)
17. allowX 입력 무시 확인
18. maxAllowedState disabled 계열 유지

## API/UI 표시 내용

### API (`route.ts`)
- `naverAuthTokenDryPermissionGate` 필드가 read-only 게이트 상태 표시용으로 추가됨
- Token 발급 수행 없음 — 모든 선행 서비스 결과를 취합하여 게이트 평가만 수행

### UI (`page.tsx`)
- "Token Dry Permission Gate — 사전 조건 점검" 섹션 추가
- 게이트 상태(BLOCKED/DISABLED/NEEDS_REVIEW)에 따라 색상 변경
- 안전 배지: Token 발급 차단, Token 요청 차단, Refresh Token 없음, 인증정보 사용 안 함, Authorization header 없음, Endpoint 호출 없음, Naver API 호출 차단, Secret 비노출
- 상태 카드: 8개 주요 불변 필드 표시
- 차단 사유 / 검토 필요 사유 / 경고 목록
- 전체 체크리스트 항목 (key/status/label)
- maxAllowedState 표시

## 안전 불변 조건 유지 여부

| 필드 | 값 | 유지 |
|------|----|------|
| allowed | false | 항상 false |
| tokenRequestAllowed | false | 항상 false |
| accessTokenRequested | false | 항상 false |
| refreshTokenRequested | false | 항상 false |
| credentialsUsed | false | 항상 false |
| tokenIssued | false | 항상 false |
| tokenStored | false | 항상 false |
| authorizationHeaderCreated | false | 항상 false |
| endpointCalled | false | 항상 false |
| httpRequestCreated | false | 항상 false |
| naverApiCallAllowed | false | 항상 false |
| liveExecutionEnabled | false | 항상 false |
| authConfigUsable | false | 항상 false |
| operatingDbWriteAllowed | false | 항상 false |
| queueAllowed | false | 항상 false |
| workerAllowed | false | 항상 false |
| secretVisible | false | 항상 false |
| tokenVisible | false | 항상 false |
| sanitized | true | 항상 true |
| maxAllowedState | NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED | 항상 고정 |

## 검증 결과

- Dry Permission Gate 테스트: **59/59 pass**
- Token Provider disabled 테스트: **36/36 pass**
- TypeScript (`tsc --noEmit`): **clean**
- git diff --check: clean

## 실제 Naver API 호출 여부

없음. HTTP client, fetch/axios, endpoint URL, authorization header, token 발급 코드가 전혀 없다.

## 운영 DB 접근/write 여부

없음.

## schema/migration 변경 여부

없음.

## Queue / Worker 호출 여부

없음.

## 다음 작업 제안

- Task 23: Naver API Token Provider — 실제 발급 구현 (live token 발급 가능 상태로 전환 시)
- 또는: 전체 선행 조건 통과 후 실제 live execution을 위한 최종 승인 gate 구현
