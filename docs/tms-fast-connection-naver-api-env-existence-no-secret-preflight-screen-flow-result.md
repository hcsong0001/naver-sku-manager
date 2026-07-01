# Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면

## 목적

Naver API 상품 조회 1회 Live Test로 가기 전에, 필요한 환경 변수의 '존재 여부 확인 절차'를
설계하되, 실제 `.env` 파일을 열거나 값을 읽지 않는 No-Secret Preflight 화면을 추가한다.

이번 화면은 Task 405 승인 요청 Packet을 참조하며, 아직 사용자가 실제 env/secret 접근을
승인하지 않았음을 명확히 표시한다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 19b85b21327cc8b0268ee27976df2f4f6dc78f3e` (Task 405 커밋)
- 워킹 트리: clean

## Task 405 Secret/Env 접근 승인 요청 Packet 기준 상태

- 최우선 목표: `NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대표 상품 후보: `6597910207`
- 추천 다음 단계: `NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT` (Task 405에서 예고된 값, 이번 Task 406으로 구현됨)
- 안전 모드: `SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 입력 ViewModel

- `TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView` (Task 405)

## 출력 ViewModel

- `TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView`

## Task 405 → Task 406 상태 매핑

- `..._SEPARATE_APPROVAL_REQUEST_PACKET_READY` → `..._NO_SECRET_PREFLIGHT_READY`
- `..._SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY` → `..._NO_SECRET_PREFLIGHT_PARTIAL_READY`
- `..._SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED` → `..._NO_SECRET_PREFLIGHT_BLOCKED`
- `..._SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED` → `..._NO_SECRET_PREFLIGHT_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 8개 No-Secret Preflight 그룹

1. `NO_SECRET_PREFLIGHT_READINESS` - No-Secret Preflight 화면이 준비되었는지 표시
2. `TASK_405_APPROVAL_REQUEST_PACKET_REFERENCE` - Task 405 승인 요청 Packet 참조
3. `ENV_NAME_CANDIDATE_CHECKLIST` - 환경 변수 이름 후보 체크리스트 표시
4. `NO_ENV_FILE_OPEN_GUARD` - `.env` / `.env.local` 파일을 열지 않았다는 점 표시
5. `NO_PROCESS_ENV_READ_GUARD` - `process.env` 실제 조회를 하지 않았다는 점 표시
6. `NO_SECRET_VALUE_EXPOSURE_GUARD` - secret/token/header/signature/raw response 값 노출 금지 표시
7. `ONE_TIME_PRODUCT_LOOKUP_PREPARED_TARGET` - 대표 상품 후보 6597910207과 상품 조회 1회 목표 표시
8. `NEXT_LIVE_TEST_APPROVAL_ROADMAP` - Task 407 이후 Live Test 승인 흐름 표시

## 환경 변수 이름 후보 체크리스트

각 후보는 아래 형식의 상태를 갖는다.

- `candidateOnly: true`
- `actualExistenceChecked: false`
- `actualValueRead: false`
- `actualValueDisplayed: false`
- `actualSecretAccessed: false`

후보 목록:

- `NAVER_COMMERCE_CLIENT_ID`
- `NAVER_COMMERCE_CLIENT_SECRET`
- `NAVER_COMMERCE_API_BASE_URL`
- `NAVER_COMMERCE_TOKEN_URL`
- `NAVER_COMMERCE_CHANNEL_ID`
- `NAVER_COMMERCE_SELLER_ID`

> 환경 변수 이름 후보만 표시됩니다. 이번 화면에서는 실제 존재 여부와 값을 확인하지 않았습니다.

이번 Task에서 `.env` 파일을 열거나 `process.env`를 조회하여 실제 존재 여부를 확인하지 않았다.
이름 후보 기반의 No-Secret Preflight 화면만 만들었다.

## 다음 승인 단계 안내 (read-only)

- 예시 문구: `Naver API 상품 조회 1회 테스트를 위한 환경 변수 존재 여부 확인을 별도로 승인합니다.`
- 이번 화면은 No-Secret Preflight이다.
- 이번 화면은 실제 env 존재 확인이 아니다.
- 이번 화면은 실제 secret 접근이 아니다.
- 이번 화면에는 승인 입력창이 없다.
- 이번 화면에는 승인 버튼이 없다.
- 이번 화면에는 submit action이 없다.
- 이번 화면에는 POST API가 없다.
- 실제 env 존재 확인은 이후 별도 승인 이후에만 가능하다.

## 추천값

- `recommendedNoSecretPreflightDecision: NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY`
- `recommendedPrimaryGoal: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedNextStep: NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET`
- `recommendedApprovalMode: SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_CHECK_OR_API_CALL`
- `recommendedExecutionMode: READ_ONLY_NO_ENV_READ_NO_API_CALL`
- `recommendedDeploymentMode: ENV_EXISTENCE_NO_SECRET_PREFLIGHT_ONLY`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 실제 접근/확인 없음

- `.env` / `.env.local`을 열지 않았다: `actualEnvRead: false`, `actualEnvWrite: false`, `actualEnvFileOpen: false`
- `process.env`를 조회하지 않았다: `actualProcessEnvRead: false`
- 실제 존재 여부를 확인하지 않았다: `actualEnvExistenceChecked: false`
- secret/token 값을 표시하지 않았다: `actualSecretAccess: false`, `actualSecretExposure: false`, `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`
- 실제 API 호출이 없다: `actualNaverApiCall: false`, `actualProductLookupApiCall: false`, `actualProductUpdateApiCall: false`
- Token 발급/재발급/사용이 없다: `actualTokenIssue: false`, `actualTokenReissue: false`, `actualTokenUse: false`
- DB write가 없다: `actualDbWrite: false`, `actualPriceChange: false`, `actualStockChange: false`
- POST API / 실행 버튼 / 승인 버튼이 없다: `actualPostApiAdded: false`, `actualSubmitActionAdded: false`, `actualExecutionButtonAdded: false`, `actualApprovalButtonAdded: false`
- 실제 승인 수락이 없다: `actualApprovalAccepted: false`

## Task 407~411 압축 로드맵

- Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면
- Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet
- Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate
- Task 409 - Naver API 상품 조회 1회 실제 호출
- Task 410 - Naver API 상품 조회 1회 결과 증적 화면
- Task 411 - 상품 수정 API 진입 여부 판단 화면

Task 406에서는 실제 API 호출, secret 접근, token 사용, env 파일 열람, process.env 조회,
POST API, DB write를 만들지 않는다.

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 405 ViewModel을 입력으로 Task 406 No-Secret Preflight ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 406 타입 필드 추가
  - Task 405 바로 아래, Task 332 바로 위에 Task 406 패널 추가
  - 상태, 환경 변수 이름 후보 체크리스트, 8개 그룹 요약, 승인 문구 안내, Task 407~411 압축 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음

## 검증 결과

- Task 406 신규 테스트 23건 통과
- 인접 Task 405 / 404 / 403 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 407 방향

- `Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet`
