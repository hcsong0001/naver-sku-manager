# Naver API Token Provider Disabled Skeleton — 작업 결과

## 작업 목표

Token Provider 타입/구조/결과 형식을 준비하되, 실제 access token을 발급하지 않는 disabled skeleton을 구현한다.
token 발급 구현이 아니며, Naver API 인증 구현도 아니다.

## 구현 파일

| 파일 | 종류 |
|------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service.ts` | 신규 — Token Provider disabled skeleton 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-provider-disabled.test.ts` | 신규 — 테스트 (36 케이스) |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | 수정 — `naverAuthTokenProviderStatus` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 수정 — Token Provider 상태 UI 섹션 추가 |

## Token Provider Disabled Skeleton 동작 방식

- `createNaverApiTokenProviderDisabled()` / `requestNaverApiAccessTokenDisabled()` / `buildNaverApiTokenRequestDisabledResult()` 중 어느 것을 호출해도 항상 동일한 disabled result를 반환한다.
- 입력값(`allowTokenRequest`, `allowCredentialUse`, `allowEndpointCall`)이 `true`여도 무조건 무시하고 차단한다.
- `sanitizeNaverApiTokenProviderResult()`가 최종 패스에서 invariant 필드를 강제로 재설정한다.
- 체크리스트에 disabled 상태가 명확히 기록된다.
- 함수는 절대 throw하지 않는다. malformed/null 입력도 disabled result로 처리한다.

## Auth Config Safe Reader와의 관계

- Token Provider는 Auth Config Safe Reader 결과를 입력으로 받을 수 있다.
- `authConfigSafety.credentialConfigured=true`여도 token 발급은 disabled이다.
- `authConfigSafety.accessTokenRequested=false` / `credentialsUsed=false` 상태와 충돌하지 않는다.
- Auth Config Safe Reader 결과가 없어도 (null/undefined) token 차단이 유지된다.

## Disabled Result 기준

- `ok: false`
- `success: false`
- `status: "DISABLED"`
- `resultCode: "NAVER_AUTH_TOKEN_REQUEST_DISABLED"`
- `maxAllowedState: "NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED"`

## API/UI 표시 내용

### API (`route.ts`)
- `naverAuthTokenProviderStatus` 필드가 read-only 상태 표시용으로 추가됨
- 실제 token 요청을 수행하지 않음 — `createNaverApiTokenProviderDisabled()` 호출 결과만 포함

### UI (`page.tsx`)
- "Token Provider 준비 상태 — 발급 비활성화" 섹션 추가
- 안전 배지: Token 발급 비활성화, Refresh Token 요청 없음, 인증정보 사용 안 함, Authorization header 없음, Endpoint 호출 없음, Naver API 호출 비활성화, Token 저장 없음, Secret 비노출
- 상태 카드: 8개 invariant 필드 (accessTokenRequested, refreshTokenRequested, tokenIssued, tokenStored, credentialsUsed, authorizationHeaderCreated, endpointCalled, httpRequestCreated) — 모두 false
- 차단/경고 사유 목록
- maxAllowedState 표시
- token/secret/endpoint URL/인증 버튼 없음

## 안전 불변 조건 유지 여부

| 필드 | 값 | 유지 |
|------|----|------|
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
| secretVisible | false | 항상 false |
| tokenVisible | false | 항상 false |
| authConfigUsable | false | 항상 false |
| operatingDbWriteAllowed | false | 항상 false |
| queueAllowed | false | 항상 false |
| workerAllowed | false | 항상 false |
| sanitized | true | 항상 true |

## 검증 결과

- Token Provider disabled 테스트: **36/36 pass**
- Auth Config Safe Reader 테스트: 45/45 pass
- 기존 서비스 테스트 전체: **337/337 pass**
- TypeScript (`tsc --noEmit`): **clean**
- git diff --check: clean

## 실제 Naver API 호출 여부

없음. 이번 구현에 HTTP client, fetch/axios, endpoint URL, authorization header, token 발급 코드가 전혀 없다.

## Naver API endpoint/token/HTTP 코드 작성 여부

없음.

## 운영 DB 접근/write 여부

없음.

## schema/migration 변경 여부

없음.

## Queue / Worker 호출 여부

없음.

## 다음 작업 제안

- Task 22: Naver API Token Provider — 실제 발급 구현 (token 발급 가능 상태로 전환 시)
- 또는: Live Safety Gate와 Token Provider disabled 결과를 연동하여 실행 전 최종 차단 확인 강화
