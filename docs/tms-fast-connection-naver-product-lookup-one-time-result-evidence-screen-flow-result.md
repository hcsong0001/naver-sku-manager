# Task 410 - Naver API 상품 조회 1회 결과 증적 화면

## 목적

Task 409에서 사용자의 명시 승인 아래 실제로 수행된 Naver API 상품 조회 1회 Live Test 결과를,
새로운 API 호출 없이 raw response 없는 마스킹/요약 증적으로 read-only 화면에 고정 표시한다.
다음 단계에서 상품 수정 API로 바로 넘어갈지 또는 조회 응답 파싱 보정 단계를 먼저 거칠지
판단할 수 있도록 정리한다.

이번 Task는 새 API 호출이 아니다. Task 409의 실제 호출 결과를 그대로 참조/고정 표시할 뿐이다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 6d0248c71be867f13f13fcafa6e2d6d684a5028e` (Task 409 커밋)
- 워킹 트리: clean

## Task 409 실제 호출 결과 요약

- 실제 호출 실행 여부: 예
- 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대상 상품번호: `6597910207` (공구이야기직영 대표 검증 상품)
- HTTP status: 200
- 성공 여부: true
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- productNoMatched: null
- sanitizedErrorMessage: null
- raw response displayed: false
- raw response stored: false
- secret/token/header/signature exposed: false
- product update called: false / price changed: false / stock changed: false / db written: false

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView` (Task 409)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView`

## Task 409 → Task 410 상태 매핑

- `..._ACTUAL_LIVE_CALL_READY` → `..._RESULT_EVIDENCE_READY`
- `..._ACTUAL_LIVE_CALL_EXECUTED_SUCCESS` → `..._RESULT_EVIDENCE_SUCCESS_CONFIRMED`
- `..._ACTUAL_LIVE_CALL_EXECUTED_FAILED` → `..._RESULT_EVIDENCE_FAILED_CONFIRMED`
- `..._ACTUAL_LIVE_CALL_BLOCKED` → `..._RESULT_EVIDENCE_BLOCKED`
- `..._ACTUAL_LIVE_CALL_NOT_STARTED` → `..._RESULT_EVIDENCE_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현한다 (5개 상태 전체 커버).

## 8개 Result Evidence 그룹

1. `RESULT_EVIDENCE_READINESS` - 결과 증적 화면이 준비되었는지 표시
2. `TASK_409_ACTUAL_LIVE_CALL_REFERENCE` - Task 409 실제 호출 결과를 참조
3. `ONE_TIME_LOOKUP_RESULT_SUMMARY` - HTTP 200, success true, actualLookupCallCount 1 요약
4. `MASKED_RESPONSE_SHAPE_EVIDENCE` - responseShapeKeys만 표시하고 raw response는 표시하지 않음
5. `PRODUCT_NO_MATCHING_INTERPRETATION` - productNoMatched null 사유와 다음 보정 필요 가능성 표시
6. `RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE` - raw response/secret/token/header/signature 미노출 증적
7. `NO_UPDATE_PRICE_STOCK_DB_WRITE_EVIDENCE` - 상품 수정/가격/재고/DB write 미수행 증적
8. `NEXT_PRODUCT_UPDATE_ENTRY_DECISION_ROADMAP` - Task 411 상품 수정 API 진입 여부 판단 화면으로 이동

## productNoMatched null 해석

Naver API 조회는 HTTP 200으로 성공했으며 responseShapeKeys 기준으로 originProduct와
smartstoreChannelProduct 구조가 확인되었다. 다만 productNoMatched는 null이다. 이는 호출
실패가 아니라, 현재 harness의 응답 파싱 로직이 채널상품번호 필드 위치를 확정하지 못했기
때문이다. 따라서 상품 수정 API로 진입하기 전에 smartstoreChannelProduct 내부의 안전한
식별 필드 해석 또는 마스킹된 shape 보강 검토가 필요할 수 있다.

이 보정은 Task 410에서 실제 raw response로 수행하지 않는다. Task 410은 결과 증적과
다음 판단 포인트만 표시한다.

## 추천값

- `recommendedResultEvidenceDecision: NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED`
- `recommendedPrimaryGoalAchieved: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedActualLookupCallCount: 1`
- `recommendedNextStep: NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION` (상품 수정 API 진입 여부 판단)
- `recommendedExecutionMode: READ_ONLY_RESULT_EVIDENCE_NO_API_RECALL`
- `recommendedDeploymentMode: RESULT_EVIDENCE_ONLY_NO_UPDATE_NO_DB_WRITE`
- `recommendedSafetyMode: SAFETY_LOCKED_AFTER_ONE_LOOKUP_SUCCESS`

## Task 410에서 API 재호출 없음

- `actualNaverApiCallInTask410: false`
- `actualProductLookupApiCallInTask410: false`
- `actualProductLookupApiRecall: false`

## Task 410에서 env/process.env/secret/token 접근 없음

- `actualEnvReadInTask410: false`
- `actualEnvFileOpenInTask410: false`
- `actualProcessEnvReadInTask410: false`
- `actualSecretAccessInTask410: false`
- `actualTokenUseInTask410: false`

## raw response/secret/token 노출 없음 (Task 409 결과 증적 기준)

- `rawResponseDisplayed: false`, `rawResponseStored: false`
- `secretExposed: false`, `tokenExposed: false`, `authorizationHeaderExposed: false`, `signatureExposed: false`
- `actualSecretExposure: false`, `actualTokenExposure: false`, `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`
- `actualRawApiResponseExposure: false`, `actualRawApiResponseStored: false`

## 상품 수정/가격/재고/DB write 없음

- `productUpdateCalled: false`, `priceChanged: false`, `stockChanged: false`, `dbWritten: false`
- `actualProductUpdateApiCall: false`, `actualProductUpdateExecuted: false`
- `actualPriceChange: false`, `actualStockChange: false`, `actualDbWrite: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 409 ViewModel을 입력으로 Task 410 Result Evidence ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupOneTimeResultEvidenceView` 추가
  - GET 처리 중 실제 Naver API 호출, env/process.env/secret/token 접근 없음
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 410 타입 필드 추가
  - Task 409 바로 아래, Task 332 바로 위에 Task 410 패널 추가
  - Task 409 결과 증적, responseShapeKeys, productNoMatched 해석, 8개 그룹 요약, Task 411 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음
  - page.tsx는 ViewModel 표시만 담당하며 실제 API를 호출하지 않음

## 검증 결과

- Task 410 신규 테스트 21건 통과
- 인접 Task 409 ViewModel / harness / Task 408 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 411 방향

- `Task 411 - 상품 수정 API 진입 여부 판단 화면`
