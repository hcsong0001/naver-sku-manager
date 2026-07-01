# Task 404 - Naver API 1회 상품 조회 Fast Connection Mode 전환 복구 화면

## 목적

Task 403까지 진행된 기존 `User Approval Phrase Actual Input Separate Approval Boundary` 흐름을 인정하고,
Task 404부터는 불필요한 Lock/Review/Outcome Certification 반복을 중단한다.

Naver API 상품 조회 1회 성공까지 빠르게 이동하기 위한 Fast Connection Mode를 read-only 화면으로 명확히 전환한다.

이번 Task는 실제 Naver API 호출, secret/env/token 접근, DB write, POST API, 실행/승인 버튼 추가가 아니다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 1e4d012988130f4dc254fe95eb4a2bd435ebe864`
- 워킹 트리: clean

## 기존 Task 403의 방향

- Task 403은 애초 제안대로 Fast Connection Mode가 아니라, 기존 Legacy Boundary 흐름
  (`User Approval Phrase Actual Input Separate Approval Boundary`)으로 완료되었다.
- Task 404에서는 Task 403을 되돌리지 않고, 그 위에 Fast Connection Mode 전환 복구 화면을 추가한다.

## Task 402/403 기준 상태

- Task 402: `User Approval Phrase Final Pre-Input Lock Outcome Certification`
- Task 403: `User Approval Phrase Actual Input Separate Approval Boundary`
- 두 Task 모두 기존 승인 문구 Boundary 흐름이며, Task 404부터는 이 흐름을 반복하지 않는다.

## 목표 변경: Naver API 상품 조회 1회 성공 최우선

- 이전: 승인 문구 Boundary / Lock / Review / Outcome Certification 반복
- 이후: Naver API 상품 조회 1회 성공을 최우선 목표로 하는 Fast Connection Mode

## 입력 ViewModel

- `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView` (Task 403)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView`

## Task 403 → Task 404 상태 매핑

- `..._ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY` → `..._TRANSITION_RECOVERY_READY`
- `..._ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY` → `..._TRANSITION_RECOVERY_PARTIAL_READY`
- `..._ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED` → `..._TRANSITION_RECOVERY_BLOCKED`
- `..._ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED` → `..._TRANSITION_RECOVERY_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다.

## 8개 Fast Connection Transition Recovery 그룹

1. `FAST_CONNECTION_TRANSITION_RECOVERY_READINESS` - Task 404에서 빠른 연결 모드 전환을 복구했는지 표시
2. `TASK_403_LEGACY_BOUNDARY_REFERENCE_SUMMARY` - Task 403이 기존 Boundary 흐름으로 완료되었음을 참조
3. `FAST_CONNECTION_MODE_ENABLED_FROM_TASK_404` - Task 404부터 Fast Connection Mode가 활성화되었음을 표시
4. `NAVER_PRODUCT_LOOKUP_ONE_TIME_PRIMARY_GOAL` - 최우선 목표가 Naver 상품 조회 API 1회 성공임을 표시
5. `SECRET_ENV_ACCESS_REQUIRES_SEPARATE_APPROVAL` - .env / token / secret 접근 전 별도 승인이 필요함을 표시
6. `ACTUAL_API_CALL_REQUIRES_SEPARATE_APPROVAL` - 실제 API 호출 전 별도 승인이 필요함을 표시
7. `REPRESENTATIVE_PRODUCT_LOOKUP_CANDIDATE` - 대표 검증 상품 6597910207을 후보로 표시하되 실제 호출하지 않음
8. `COMPRESSED_FAST_CONNECTION_ROADMAP` - Task 405 이후 압축 로드맵 표시

기존 14개 Lock/Boundary 그룹은 Task 404부터 반복 생성하지 않는다.

## 대표 검증 상품 후보

- 공구이야기직영 대표 검증 상품 후보: `6597910207`
- 이번 Task에서 이 상품번호로 실제 API 호출을 하지 않는다. 화면과 문서에 후보로만 표시한다.

## 압축 로드맵

- Task 404 - Fast Connection Mode 전환 복구 / 1회 상품 조회 목표 정렬
- Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet
- Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면
- Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet
- Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate
- Task 409 - Naver API 상품 조회 1회 실제 호출
- Task 410 - Naver API 상품 조회 1회 결과 증적 화면
- Task 411 - 상품 수정 API 진입 여부 판단 화면

이 로드맵은 목표 경로이며, Task 404에서는 실제 API 호출, secret 접근, token 사용, POST API, DB write를 만들지 않는다.

## 추천값

- `recommendedFastConnectionDecision: NAVER_PRODUCT_LOOKUP_ONE_TIME_FAST_CONNECTION_MODE_RECOVERED`
- `recommendedPrimaryGoal: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedNextStep: NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET`
- `recommendedApprovalMode: SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_SECRET_OR_API_CALL`
- `recommendedExecutionMode: READ_ONLY_NO_API_CALL_YET`
- `recommendedDeploymentMode: FAST_CONNECTION_TRANSITION_RECOVERY_ONLY`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL`

## 실제 API 호출 없음

- `actualNaverApiCall: false`
- `actualProductLookupApiCall: false`
- `actualProductUpdateApiCall: false`
- `actualProductLookupExecuted: false`
- `actualProductUpdateExecuted: false`

## .env / token / secret 접근 없음

- `actualTokenIssue: false`
- `actualTokenReissue: false`
- `actualTokenUse: false`
- `actualEnvRead: false`
- `actualEnvWrite: false`
- `actualSecretAccess: false`
- `actualSecretExposure: false`
- `actualRawApiResponseExposure: false`

## DB write 없음

- `actualDbWrite: false`
- `actualPriceChange: false`
- `actualStockChange: false`
- `actualOperatingTransition: false`

## POST API / 실행 버튼 / 승인 버튼 없음

- `actualPostApiAdded: false`
- `actualSubmitActionAdded: false`
- `actualExecutionButtonAdded: false`
- `actualApprovalButtonAdded: false`
- `actualWorkerRun: false`
- `actualQueueEnqueue: false`
- `actualAdapterConnection: false`
- `actualRuntimeConfiguration: false`

## 범위 밖

- 상품 수정 API는 아직 범위 밖이다.
- 가격 변경은 아직 범위 밖이다.
- 재고 변경은 아직 범위 밖이다.

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 403 ViewModel을 입력으로 Task 404 Fast Connection Transition Recovery ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 404 Fast Connection Transition Recovery 타입 필드 추가
  - Task 403 바로 아래, Task 332 바로 위에 Task 404 패널 추가
  - Fast Connection Mode 전환 복구 상태, 8개 그룹 요약, 압축 로드맵, 안전 금지선을 표시
  - 실행 버튼/승인 버튼/승인 문구 입력창/form submit/POST 호출 추가 없음

## 검증 결과

- Task 404 신규 테스트 22건 통과
- 인접 Task 403 / 402 / 401 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 405 방향

- `Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet`
