# Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet

## 목적

Naver API 상품 조회 1회 Live Test를 실행하기 전에, 실행 목적, 대상 상품, 호출 범위,
금지 범위, 필요한 별도 승인 문구를 read-only Packet으로 정리한다.

이번 화면은 Task 406 No-Secret Preflight를 참조하며, 아직 env/secret 접근, token 사용,
실제 Naver API 호출을 하지 않았음을 명확히 표시한다. 이번 화면은 승인 Packet일 뿐
실제 승인 수락이 아니다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 014c24bf26d4e3ea17bac9149ba0562d65fcbeff` (Task 406 커밋)
- 워킹 트리: clean

## Task 406 No-Secret Preflight 기준 상태

- 최우선 목표: `NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대표 상품 후보: `6597910207`
- 추천 다음 단계: `NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET` (Task 406에서 예고된 값, 이번 Task 407로 구현됨)
- 안전 모드: `SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 입력 ViewModel

- `TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView` (Task 406)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView`

## Task 406 → Task 407 상태 매핑

- `..._NO_SECRET_PREFLIGHT_READY` → `..._LIVE_TEST_APPROVAL_PACKET_READY`
- `..._NO_SECRET_PREFLIGHT_PARTIAL_READY` → `..._LIVE_TEST_APPROVAL_PACKET_PARTIAL_READY`
- `..._NO_SECRET_PREFLIGHT_BLOCKED` → `..._LIVE_TEST_APPROVAL_PACKET_BLOCKED`
- `..._NO_SECRET_PREFLIGHT_NOT_STARTED` → `..._LIVE_TEST_APPROVAL_PACKET_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 8개 Live Test Approval Packet 그룹

1. `LIVE_TEST_APPROVAL_PACKET_READINESS` - Live Test 승인 Packet 준비도 표시
2. `TASK_406_NO_SECRET_PREFLIGHT_REFERENCE` - Task 406 No-Secret Preflight 결과 참조
3. `ONE_TIME_PRODUCT_LOOKUP_PURPOSE` - 상품 조회 API 1회 테스트 목적 표시
4. `ONE_TIME_PRODUCT_LOOKUP_TARGET_SCOPE` - 대상 상품 후보, 조회 1회, 수정/가격/재고 변경 없음 표시
5. `LIVE_TEST_APPROVAL_PHRASE_GUIDANCE` - 다음 단계 별도 승인 문구 read-only 안내
6. `LIVE_TEST_STILL_FORBIDDEN_ACTIONS` - 이번 화면에서 여전히 금지되는 작업 목록 표시
7. `NO_ENV_SECRET_TOKEN_API_CALL_GUARD` - env/secret/token/API 호출이 아직 없다는 점 표시
8. `NEXT_FINAL_SAFETY_GATE_ROADMAP` - Task 408 Final Safety Gate와 Task 409 실제 호출 방향 표시

## Live Test 범위

- `liveTestType: NAVER_PRODUCT_LOOKUP_ONE_TIME`
- `targetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `targetProductNo: 6597910207`
- `targetProductLabel: 공구이야기직영 대표 검증 상품 후보`
- `maxLookupCallCount: 1`
- `productUpdateAllowed: false`
- `priceChangeAllowed: false`
- `stockChangeAllowed: false`
- `dbWriteAllowed: false`
- `rawResponseStorageAllowed: false`

> 이번 Live Test 승인 Packet은 상품 조회 API 1회 후보를 정리하는 read-only 화면입니다. 실제 호출은 아직 수행하지 않습니다.

## 별도 승인 문구 안내 (read-only)

- 예시 문구: `Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.`
- 이번 화면은 Live Test 승인 Packet이다.
- 이번 화면은 실제 승인 수락이 아니다.
- 이번 화면에는 승인 입력창이 없다.
- 이번 화면에는 승인 버튼이 없다.
- 이번 화면에는 submit action이 없다.
- 이번 화면에는 POST API가 없다.
- 실제 env/secret 접근과 API 호출은 이후 별도 승인 및 Final Safety Gate 이후에만 가능하다.

## 추천값

- `recommendedLiveTestApprovalPacketDecision: NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY`
- `recommendedPrimaryGoal: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedMaxLookupCallCount: 1`
- `recommendedNextStep: NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE`
- `recommendedApprovalMode: SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_LIVE_TEST`
- `recommendedExecutionMode: READ_ONLY_NO_ENV_READ_NO_API_CALL`
- `recommendedDeploymentMode: LIVE_TEST_APPROVAL_PACKET_ONLY`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL_AND_FINAL_GATE`

## 실제 접근/호출/승인 없음

- Live Test 승인 Packet은 준비되었으나 실제 승인 수락/실행은 없다: `liveTestApprovalPacketPrepared: true`, `actualLiveTestApprovalAccepted: false`, `actualLiveTestExecuted: false`
- `.env` / `.env.local`을 열지 않았다: `actualEnvRead: false`, `actualEnvWrite: false`, `actualEnvFileOpen: false`
- `process.env`를 조회하지 않았다: `actualProcessEnvRead: false`
- 실제 환경 변수 존재 여부를 확인하지 않았다: `actualEnvExistenceChecked: false`
- secret/token 값을 표시하지 않았다: `actualSecretAccess: false`, `actualSecretExposure: false`, `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`
- 실제 API 호출이 없다: `actualNaverApiCall: false`, `actualProductLookupApiCall: false`, `actualProductUpdateApiCall: false`
- Token 발급/재발급/사용이 없다: `actualTokenIssue: false`, `actualTokenReissue: false`, `actualTokenUse: false`
- raw API response 노출/저장이 없다: `actualRawApiResponseExposure: false`, `actualRawApiResponseStored: false`
- DB write가 없다: `actualDbWrite: false`, `actualPriceChange: false`, `actualStockChange: false`
- POST API / 실행 버튼 / 승인 버튼이 없다: `actualPostApiAdded: false`, `actualSubmitActionAdded: false`, `actualExecutionButtonAdded: false`, `actualApprovalButtonAdded: false`
- 실제 승인 수락이 없다: `actualApprovalAccepted: false`

## Task 408~411 압축 로드맵

- Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet
- Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate
- Task 409 - Naver API 상품 조회 1회 실제 호출
- Task 410 - Naver API 상품 조회 1회 결과 증적 화면
- Task 411 - 상품 수정 API 진입 여부 판단 화면

Task 407에서는 실제 API 호출, secret 접근, token 사용, env 파일 열람, process.env 조회,
POST API, DB write를 만들지 않는다.

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 406 ViewModel을 입력으로 Task 407 Live Test Approval Packet ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 407 타입 필드 추가
  - Task 406 바로 아래, Task 332 바로 위에 Task 407 패널 추가
  - 상태, Live Test 범위, 8개 그룹 요약, 승인 문구 안내, Task 408~411 압축 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음

## 검증 결과

- Task 407 신규 테스트 28건 통과
- 인접 Task 406 / 405 / 404 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 408 방향

- `Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate`
