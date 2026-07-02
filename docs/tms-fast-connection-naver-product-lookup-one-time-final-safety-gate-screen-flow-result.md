# Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate

## 목적

Naver API 상품 조회 1회 실제 호출 직전에, 실행 조건, 금지 조건, 호출 제한, 응답 처리 제한,
다음 Task 409에서 필요한 별도 사용자 승인 문구를 read-only Final Safety Gate로 정리한다.

이번 화면은 Task 407 Live Test 승인 Packet을 참조하며, 아직 실제 승인 수락, env/secret
접근, token 사용, 실제 Naver API 호출을 하지 않았음을 명확히 표시한다. 이번 화면은
Final Safety Gate일 뿐 실제 호출이 아니다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = e6c39c619e8df478164f0ae4526bdab90f510cdf` (Task 407 커밋)
- 워킹 트리: clean

## Task 407 Live Test 승인 Packet 기준 상태

- 최우선 목표: `NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대표 상품 후보: `6597910207`
- 최대 조회 호출 수: `1`
- 상품 수정/가격 변경/재고 변경/DB write 허용 여부: 모두 `false`
- 추천 다음 단계: `NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE` (Task 407에서 예고된 값, 이번 Task 408로 구현됨)
- 안전 모드: `SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL_AND_FINAL_GATE`

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView` (Task 407)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView`

## Task 407 → Task 408 상태 매핑

- `..._LIVE_TEST_APPROVAL_PACKET_READY` → `..._FINAL_SAFETY_GATE_READY`
- `..._LIVE_TEST_APPROVAL_PACKET_PARTIAL_READY` → `..._FINAL_SAFETY_GATE_PARTIAL_READY`
- `..._LIVE_TEST_APPROVAL_PACKET_BLOCKED` → `..._FINAL_SAFETY_GATE_BLOCKED`
- `..._LIVE_TEST_APPROVAL_PACKET_NOT_STARTED` → `..._FINAL_SAFETY_GATE_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 8개 Final Safety Gate 그룹

1. `FINAL_SAFETY_GATE_READINESS` - Final Safety Gate 준비도 표시
2. `TASK_407_LIVE_TEST_APPROVAL_PACKET_REFERENCE` - Task 407 Live Test 승인 Packet 결과 참조
3. `ONE_TIME_LOOKUP_EXECUTION_SCOPE_GATE` - 상품 조회 1회, 대상 상품 6597910207, 최대 호출 수 1회 조건 표시
4. `ENV_SECRET_TOKEN_ACCESS_STILL_LOCKED_GATE` - env/secret/token 접근이 아직 잠겨 있음을 표시
5. `API_CALL_STILL_LOCKED_GATE` - 실제 API 호출이 아직 잠겨 있음을 표시
6. `RESPONSE_HANDLING_AND_STORAGE_GATE` - raw response 표시/저장 금지, 결과 증적은 마스킹/요약 중심 표시
7. `PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK_GATE` - 상품 수정, 가격 변경, 재고 변경, DB write 금지 표시
8. `TASK_409_EXPLICIT_APPROVAL_REQUIRED_GATE` - Task 409에서 실제 호출 전 별도 사용자 승인이 필요함을 표시

## Final Safety Gate 범위

- `liveTestType: NAVER_PRODUCT_LOOKUP_ONE_TIME`
- `targetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `targetProductNo: 6597910207`
- `targetProductLabel: 공구이야기직영 대표 검증 상품 후보`
- `maxLookupCallCount: 1`
- `finalGatePassedForReadOnlyPlanning: true`
- `actualExecutionUnlocked: false`
- `actualApprovalAccepted: false`
- `actualEnvAccessUnlocked: false`
- `actualSecretAccessUnlocked: false`
- `actualTokenUseUnlocked: false`
- `actualApiCallUnlocked: false`
- `productUpdateAllowed: false`
- `priceChangeAllowed: false`
- `stockChangeAllowed: false`
- `dbWriteAllowed: false`
- `rawResponseDisplayAllowed: false`
- `rawResponseStorageAllowed: false`
- `maskedSummaryOnlyAfterExecution: true`

> 이번 Final Safety Gate는 상품 조회 API 1회 실제 호출 전 최종 read-only 점검입니다. 실제 호출, env 접근, token 사용은 아직 수행하지 않습니다.

## Task 409 별도 승인 문구 안내 (read-only)

- 예시 문구: `Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.`
- 이번 화면은 Final Safety Gate이다.
- 이번 화면은 실제 승인 수락이 아니다.
- 이번 화면에는 승인 입력창이 없다.
- 이번 화면에는 승인 버튼이 없다.
- 이번 화면에는 submit action이 없다.
- 이번 화면에는 POST API가 없다.
- Task 409에서 위 승인 문구가 별도로 확인되기 전까지 실제 env/secret 접근과 API 호출은 금지된다.

## 추천값

- `recommendedFinalSafetyGateDecision: NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY`
- `recommendedPrimaryGoal: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedMaxLookupCallCount: 1`
- `recommendedNextStep: NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL`
- `recommendedTask409RequiredApprovalPhrase: Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.`
- `recommendedApprovalMode: EXPLICIT_SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ACTUAL_CALL`
- `recommendedExecutionMode: READ_ONLY_FINAL_GATE_NO_ENV_READ_NO_API_CALL`
- `recommendedDeploymentMode: FINAL_SAFETY_GATE_ONLY`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_TASK_409_EXPLICIT_APPROVAL`

## 실제 접근/호출/승인 없음

- Final Safety Gate는 준비되었으나 제출/승인/실행은 없다: `finalSafetyGatePrepared: true`, `actualFinalSafetyGateSubmitted: false`, `actualLiveTestApprovalAccepted: false`, `actualLiveTestExecuted: false`, `actualExecutionUnlocked: false`
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

## Task 409~411 압축 로드맵

- Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate
- Task 409 - Naver API 상품 조회 1회 실제 호출
- Task 410 - Naver API 상품 조회 1회 결과 증적 화면
- Task 411 - 상품 수정 API 진입 여부 판단 화면

Task 408에서는 실제 API 호출, secret 접근, token 사용, env 파일 열람, process.env 조회,
POST API, DB write를 만들지 않는다.

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 407 ViewModel을 입력으로 Task 408 Final Safety Gate ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 408 타입 필드 추가
  - Task 407 바로 아래, Task 332 바로 위에 Task 408 패널 추가
  - 상태, Final Safety Gate 범위, 8개 그룹 요약, Task 409 승인 문구 안내, Task 409~411 압축 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음

## 검증 결과

- Task 408 신규 테스트 37건 통과
- 인접 Task 407 / 406 / 405 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 409 방향

- `Task 409 - Naver API 상품 조회 1회 실제 호출`
