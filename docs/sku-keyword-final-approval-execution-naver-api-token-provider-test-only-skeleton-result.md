# Naver API Token Provider Test-Only Skeleton — 작업 결과

## 작업 목표

실제 token 발급 요청을 수행하지 않으면서, token 발급 코드 경로와 결과 구조를 준비한다.
이 단계의 모든 불변 조건은 token 발급과 관련된 모든 boolean이 항상 false이다.

## 구현 파일

| 파일 | 종류 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service.ts` | 신규 — Test-Only Skeleton 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.test.ts` | 신규 — 테스트 (64 케이스) |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | 수정 — `naverAuthTokenTestOnlySkeletonStatus` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 수정 — Token Test-Only Skeleton UI 섹션 추가 |

## Test-Only Skeleton 동작 방식

- `createNaverApiTokenProviderTestOnlySkeleton(input?)` 또는 `prepareNaverApiTokenTestOnlyRequestSkeleton(input?)` 호출 시 `buildNaverApiTokenTestOnlyNotExecutedResult(input)` 로 위임한다.
- 7개 섹션에 걸쳐 입력 조건을 점검한다:
  1. 고정 불변 조건 (testOnlyMode, tokenRequestPrepared, tokenRequestExecuted, tokenIssued, endpointResolved, httpClientCreated, secret 비노출)
  2. allowX 입력 무시 확인
  3. Environment Safety Guard 확인 (naverApiCallAllowed, operatingDbWriteAllowed, queueAllowed, workerAllowed)
  4. Auth Config Safe Reader 확인 (authConfigUsable, credentialConfigured)
  5. Token Provider disabled 확인 (accessTokenRequested, tokenIssued, credentialsUsed)
  6. Token Dry Permission Gate 확인 (dryPermissionPassed 참조)
  7. maxAllowedState 유지 확인
- `sanitizeNaverApiTokenTestOnlySkeletonResult()`가 최종 패스에서 모든 불변 필드를 강제로 재설정한다.
- 어떤 입력(null/undefined/빈 객체)도 throw하지 않는다.

## 결과 코드 결정 로직

| 상태 | resultCode | 조건 |
|------|-----------|------|
| `DISABLED` | `NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED` | blockingReasons 1건 이상 |
| `NOT_EXECUTED` | `NAVER_AUTH_TOKEN_TEST_ONLY_REQUEST_NOT_EXECUTED` | needsReviewReasons 1건 이상 |
| `NOT_EXECUTED` | `NAVER_AUTH_TOKEN_TEST_ONLY_SKELETON_READY_BUT_NO_TOKEN_REQUEST` | 모든 조건 통과 |

## API/UI 표시 내용

### API (`route.ts`)

- `naverAuthTokenTestOnlySkeletonStatus` 필드가 추가됨
- Auth Config Safe Reader, Token Provider Disabled, Dry Permission Gate 결과를 모두 취합하여 test-only skeleton 상태를 평가함
- Token 발급 수행 없음 — 코드 경로 확인만 수행

### UI (`page.tsx`)

- "Token Test-Only Skeleton — 코드 경로 준비 확인" 섹션 추가
- 상태(DISABLED/NOT_EXECUTED)에 따라 색상 변경 (red/amber/violet)
- 안전 배지: testOnlyMode=true, Token 발급 차단, Endpoint 미해석, HTTP Client 없음, Secret 비노출, Naver API 호출 차단
- 상태 카드: 9개 주요 필드 (testOnlyMode, tokenRequestPrepared, tokenRequestExecuted, tokenRequestAllowed, tokenIssued, dryPermissionPassed, endpointResolved, httpClientCreated, naverApiCallAllowed)
- 차단 사유 / 검토 필요 사유 / 경고 목록
- 전체 체크리스트 항목 (key/status/label)
- maxAllowedState 표시

## 안전 불변 조건 유지 여부

| 필드 | 값 | 유지 |
|------|----|------|
| testOnlyMode | true | 항상 true |
| tokenRequestPrepared | false | 항상 false |
| tokenRequestExecuted | false | 항상 false |
| tokenRequestAllowed | false | 항상 false |
| accessTokenRequested | false | 항상 false |
| refreshTokenRequested | false | 항상 false |
| credentialsUsed | false | 항상 false |
| tokenIssued | false | 항상 false |
| tokenStored | false | 항상 false |
| authorizationHeaderCreated | false | 항상 false |
| endpointResolved | false | 항상 false |
| endpointCalled | false | 항상 false |
| httpRequestCreated | false | 항상 false |
| httpClientCreated | false | 항상 false |
| naverApiCallAllowed | false | 항상 false |
| liveExecutionEnabled | false | 항상 false |
| authConfigUsable | false | 항상 false |
| operatingDbWriteAllowed | false | 항상 false |
| queueAllowed | false | 항상 false |
| workerAllowed | false | 항상 false |
| secretVisible | false | 항상 false |
| tokenVisible | false | 항상 false |
| endpointVisible | false | 항상 false |
| sanitized | true | 항상 true |
| maxAllowedState | NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED | 항상 고정 |

## 검증 결과

- Test-Only Skeleton 테스트: **64/64 pass**
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

- Task 25: 실제 token 발급 요청 실행 (live token 발급 가능 상태로 전환 시 — 별도 사용자 승인 필요)
- 또는: 전체 선행 조건 통과 후 실제 token 발급 전 최종 안전 점검 gate 구현
