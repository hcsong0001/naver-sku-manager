# Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet

## 목적

Naver API 상품 조회 1회 Live Test로 가기 전에, `.env` / `.env.local` / secret / token 접근이
왜 필요한지, 어떤 범위까지 별도 승인이 필요한지, 아직 실제 접근은 하지 않았다는 점을
read-only Packet으로 표시한다.

승인 요청 Packet은 실제 승인 제출이 아니고, 실제 승인 수락이 아니고, `.env` 접근이 아니고,
secret 접근이 아니고, token 사용이 아니고, 실제 Naver API 호출이 아니다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 6290e800cc7227777bbf71cc3624c6bb6dc03fa1` (Task 404 커밋)
- 워킹 트리: clean

## Task 404 Fast Connection Mode 전환 복구 기준 상태

- 최우선 목표: `NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대표 상품 후보: `6597910207`
- 추천 다음 단계: `NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET` (Task 404에서 예고된 값, 이번 Task 405로 구현됨)
- 안전 모드: `SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView` (Task 404)

## 출력 ViewModel

- `TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView`

## Task 404 → Task 405 상태 매핑

- `..._TRANSITION_RECOVERY_READY` → `..._SEPARATE_APPROVAL_REQUEST_PACKET_READY`
- `..._TRANSITION_RECOVERY_PARTIAL_READY` → `..._SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY`
- `..._TRANSITION_RECOVERY_BLOCKED` → `..._SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED`
- `..._TRANSITION_RECOVERY_NOT_STARTED` → `..._SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 8개 Secret/Env Access Approval Request Packet 그룹

1. `SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_READINESS` - 승인 요청 Packet 준비도 표시
2. `FAST_CONNECTION_TRANSITION_RECOVERY_REFERENCE` - Task 404 결과 참조
3. `SECRET_ENV_ACCESS_PURPOSE` - 환경 변수/secret 확인이 필요한 이유 표시
4. `SECRET_ENV_ACCESS_SCOPE_CANDIDATES` - 필요한 환경 변수 이름 후보만 표시 (값 없음)
5. `NO_SECRET_VALUE_EXPOSURE_GUARD` - secret/token/authorization/header/signature 값 노출 금지
6. `NO_ACTUAL_ACCESS_OR_API_CALL_GUARD` - 실제 접근/API 호출 없음 표시
7. `REQUIRED_USER_APPROVAL_PHRASE_GUIDANCE` - 다음 단계 별도 승인 필요 안내
8. `NEXT_PREFLIGHT_ROADMAP` - Task 406 이후 No-Secret Preflight/Live Test 흐름 표시

## 환경 변수 이름 후보 목록

- `NAVER_COMMERCE_CLIENT_ID`
- `NAVER_COMMERCE_CLIENT_SECRET`
- `NAVER_COMMERCE_API_BASE_URL`
- `NAVER_COMMERCE_TOKEN_URL`
- `NAVER_COMMERCE_CHANNEL_ID`
- `NAVER_COMMERCE_SELLER_ID`

위 이름들은 후보이며, 실제 `.env` 또는 `.env.local`에 존재하는지 이번 Task에서 확인하지 않는다.
이번 Task에서 `.env` / `.env.local` 파일을 열지 않으며, 실제 값을 표시하지 않는다.

> 환경 변수 이름 후보만 표시됩니다. 실제 값은 읽지 않았고 표시하지 않습니다.

## 승인 문구 안내 (read-only)

- 예시 문구: `Naver API 상품 조회 1회 테스트를 위한 환경 변수 존재 여부 확인을 별도로 승인합니다.`
- 이번 화면은 승인 요청 Packet이다.
- 이번 화면은 실제 승인 수락이 아니다.
- 이번 화면에는 승인 입력창이 없다.
- 이번 화면에는 승인 버튼이 없다.
- 이번 화면에는 submit action이 없다.
- 이번 화면에는 POST API가 없다.
- 실제 `.env` / secret 접근은 이후 별도 승인 이후에만 가능하다.

## 추천값

- `recommendedApprovalRequestPacketDecision: NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY`
- `recommendedPrimaryGoal: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedNextStep: NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT`
- `recommendedApprovalMode: SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_OR_SECRET_ACCESS`
- `recommendedExecutionMode: READ_ONLY_NO_ENV_ACCESS_NO_API_CALL`
- `recommendedDeploymentMode: SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_ONLY`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 실제 접근/호출 없음

- `.env` / `.env.local`을 열지 않았다: `actualEnvRead: false`, `actualEnvWrite: false`, `actualEnvFileOpen: false`
- secret/token 값을 표시하지 않았다: `actualSecretAccess: false`, `actualSecretExposure: false`, `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`
- 실제 API 호출이 없다: `actualNaverApiCall: false`, `actualProductLookupApiCall: false`, `actualProductUpdateApiCall: false`
- Token 발급/재발급/사용이 없다: `actualTokenIssue: false`, `actualTokenReissue: false`, `actualTokenUse: false`
- DB write가 없다: `actualDbWrite: false`, `actualPriceChange: false`, `actualStockChange: false`
- POST API / 실행 버튼 / 승인 버튼이 없다: `actualPostApiAdded: false`, `actualSubmitActionAdded: false`, `actualExecutionButtonAdded: false`, `actualApprovalButtonAdded: false`
- 실제 승인 수락이 없다: `actualApprovalAccepted: false`

## Task 406~411 압축 로드맵

- Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet
- Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면
- Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet
- Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate
- Task 409 - Naver API 상품 조회 1회 실제 호출
- Task 410 - Naver API 상품 조회 1회 결과 증적 화면
- Task 411 - 상품 수정 API 진입 여부 판단 화면

Task 405에서는 실제 API 호출, secret 접근, token 사용, POST API, DB write를 만들지 않는다.

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 404 ViewModel을 입력으로 Task 405 Secret/Env Access Approval Request Packet ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 405 타입 필드 추가
  - Task 404 바로 아래, Task 332 바로 위에 Task 405 패널 추가
  - 상태, 환경 변수 이름 후보, 8개 그룹 요약, 승인 문구 안내, Task 406~411 압축 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음

## 검증 결과

- Task 405 신규 테스트 20건 통과
- 인접 Task 404 / 403 / 402 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 406 방향

- `Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면`
